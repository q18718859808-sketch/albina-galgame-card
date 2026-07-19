import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = resolve(projectRoot, 'tools/media/production/jobs/index.json');
const legacyLedgerPath = resolve(projectRoot, 'tools/media/production/.ledger.json');
const v2LedgerPath = resolve(projectRoot, 'content/media-production/voice-boundary-v2.json');
const outputLedgerPath = resolve(projectRoot, 'content/media-production/voice-legacy-v1.json');
const receiptRoot = resolve(projectRoot, 'content/media-receipts');
const releaseRoot = resolve(projectRoot, 'dist/albina-galgame-card/assets');
const temporaryRoot = resolve(projectRoot, 'staging/media/audio/voice-legacy-normalized');
const promptVersion = 'albina-speech-legacy-v1';

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function canonicalJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  return `{${Object.keys(value).filter((key) => value[key] !== undefined).sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
}

function safeName(id) {
  return id.replaceAll(/[^a-z0-9._-]/giu, '-');
}

function assetPath(assetId) {
  return resolve(releaseRoot, 'audio/voice', `${assetId.replace(/^voice\./u, '').replaceAll('.', '/')}.mp3`);
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function collectCues() {
  const storyIndex = await readJson(resolve(projectRoot, 'content/game-script-v2.json'));
  const scenes = (await Promise.all(storyIndex.dialogueFiles.map((path) => readJson(resolve(projectRoot, 'content', path))))).flat();
  const cues = [];
  for (const scene of scenes) {
    if (scene.voiceAssetId) cues.push({ assetId: scene.voiceAssetId, text: scene.text });
    for (const choice of scene.choices ?? []) {
      if (choice.resultVoiceAssetId) cues.push({ assetId: choice.resultVoiceAssetId, text: choice.resultText });
    }
  }
  const v2 = await readJson(v2LedgerPath);
  const replaced = new Set(v2.entries.map((entry) => entry.assetId));
  const legacy = cues.filter((cue) => !replaced.has(cue.assetId)).sort((a, b) => a.assetId.localeCompare(b.assetId));
  if (cues.length !== 166 || legacy.length !== 146 || new Set(cues.map((cue) => cue.assetId)).size !== 166) {
    throw new Error(`Expected 166 unique cues with 146 legacy promotions; received ${cues.length}/${legacy.length}`);
  }
  return legacy;
}

function jobSpec(job) {
  const { id: _id, ...spec } = job;
  return spec;
}

function legacyJobId(spec) {
  return `job_${hash(canonicalJson(spec)).slice(0, 32)}`;
}

function validateEvidence(cue, job, ledger) {
  if (!job || job.kind !== 'speech' || job.input !== cue.text) throw new Error(`Legacy job text mismatch for ${cue.assetId}`);
  const spec = jobSpec(job);
  const id = legacyJobId(spec);
  const state = ledger.jobs?.[id];
  if (state?.status !== 'completed' || state.output !== job.output) throw new Error(`Legacy completion evidence mismatch for ${cue.assetId}`);
  return { spec, id, sourceJobHash: hash(canonicalJson(spec)) };
}

async function normalizeAudio(input, output) {
  const filter = [
    'silenceremove=start_periods=1:start_duration=0.05:start_threshold=-50dB:start_silence=0.10',
    'areverse',
    'silenceremove=start_periods=1:start_duration=0.05:start_threshold=-50dB:start_silence=0.20',
    'areverse',
    'loudnorm=I=-16:LRA=11:TP=-1.5',
  ].join(',');
  await mkdir(dirname(output), { recursive: true });
  await run('ffmpeg', ['-y', '-v', 'error', '-i', input, '-af', filter, '-codec:a', 'libmp3lame', '-b:a', '192k', output], { maxBuffer: 8 * 1024 * 1024 });
}

async function inspectAudio(path) {
  const probe = await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', path]);
  const durationSeconds = Number(JSON.parse(probe.stdout).format?.duration);
  const volume = await run('ffmpeg', ['-hide_banner', '-i', path, '-af', 'volumedetect', '-f', 'null', '-'], { maxBuffer: 8 * 1024 * 1024 });
  const meanVolumeDb = Number(/mean_volume:\s*(-?[\d.]+)\s*dB/iu.exec(volume.stderr)?.[1]);
  const maxVolumeDb = Number(/max_volume:\s*(-?[\d.]+)\s*dB/iu.exec(volume.stderr)?.[1]);
  if (!Number.isFinite(durationSeconds) || durationSeconds < 0.2) throw new Error(`Invalid speech duration: ${durationSeconds}`);
  if (!Number.isFinite(meanVolumeDb) || meanVolumeDb < -35 || meanVolumeDb > -6) throw new Error(`Invalid speech mean volume: ${meanVolumeDb}`);
  if (!Number.isFinite(maxVolumeDb) || maxVolumeDb > 0) throw new Error(`Invalid speech peak volume: ${maxVolumeDb}`);
  return { durationSeconds, meanVolumeDb, maxVolumeDb };
}

async function readOutputLedger(evidence) {
  try {
    const ledger = await readJson(outputLedgerPath);
    if (ledger.version !== 1 || !Array.isArray(ledger.entries)) throw new Error('Invalid legacy voice promotion ledger');
    if (ledger.evidence.indexSha256 !== evidence.indexSha256 || ledger.evidence.ledgerSha256 !== evidence.ledgerSha256) throw new Error('Legacy evidence files changed after promotion began');
    return ledger;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { version: 1, evidence, entries: [] };
  }
}

async function writeJsonAtomic(path, value) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rm(path, { force: true });
  await rename(temporary, path);
}

async function currentEntry(cue, ledger) {
  const entry = ledger.entries.find((candidate) => candidate.assetId === cue.assetId);
  if (!entry) return undefined;
  try {
    return hash(await readFile(assetPath(cue.assetId))) === entry.artifactSha256 ? entry : undefined;
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

function promotionReceipt(entry) {
  return {
    version: 1,
    assetId: entry.assetId,
    artifactSha256: entry.artifactSha256,
    provenance: {
      provider: 'pie', model: 'speech-2.8-hd', promptVersion, sourceJobHash: entry.sourceJobHash,
      review: { status: 'approved', reviewer: 'automated-audio-qc', reviewedAt: entry.completedAt },
    },
    lineage: {
      kind: 'conversion', processVersion: 'speech-loudnorm-v1',
      inputs: [{ sha256: entry.rawArtifactSha256, role: 'validated-pie-speech-output' }],
    },
  };
}

async function promoteCue(cue, job, legacyLedger, outputLedger) {
  const jobEvidence = validateEvidence(cue, job, legacyLedger);
  const raw = await readFile(job.output);
  const outputPath = assetPath(cue.assetId);
  const current = await readFile(outputPath);
  if (hash(raw) !== hash(current)) throw new Error(`Staging/dist hash mismatch before promotion for ${cue.assetId}`);
  const temporary = resolve(temporaryRoot, `${safeName(cue.assetId)}.mp3`);
  await normalizeAudio(job.output, temporary);
  const metrics = await inspectAudio(temporary);
  await copyFile(temporary, outputPath);
  const completedAt = new Date().toISOString();
  const entry = {
    assetId: cue.assetId,
    legacyJobId: jobEvidence.id,
    sourceJobHash: jobEvidence.sourceJobHash,
    inputTextSha256: hash(cue.text),
    rawArtifactSha256: hash(raw),
    artifactSha256: hash(await readFile(outputPath)),
    outputPath: outputPath.slice(projectRoot.length + 1).replaceAll('\\', '/'),
    ...metrics,
    completedAt,
  };
  outputLedger.entries = [...outputLedger.entries.filter((candidate) => candidate.assetId !== cue.assetId), entry].sort((a, b) => a.assetId.localeCompare(b.assetId));
  await writeJsonAtomic(resolve(receiptRoot, `${safeName(cue.assetId)}.json`), promotionReceipt(entry));
  await writeJsonAtomic(outputLedgerPath, outputLedger);
  return entry;
}

const [cues, indexBytes, ledgerBytes] = await Promise.all([collectCues(), readFile(indexPath), readFile(legacyLedgerPath)]);
const index = JSON.parse(indexBytes.toString('utf8'));
const legacyLedger = JSON.parse(ledgerBytes.toString('utf8'));
const jobs = new Map(index.jobs.filter((job) => job.kind === 'speech').map((job) => [job.id, job]));
const evidence = { indexSha256: hash(indexBytes), ledgerSha256: hash(ledgerBytes) };
const outputLedger = await readOutputLedger(evidence);
if (process.argv.includes('--dry-run')) {
  for (const cue of cues) {
    const job = jobs.get(`job.speech.${cue.assetId}`);
    validateEvidence(cue, job, legacyLedger);
    if (hash(await readFile(job.output)) !== hash(await readFile(assetPath(cue.assetId)))) throw new Error(`Staging/dist hash mismatch for ${cue.assetId}`);
  }
  console.log(JSON.stringify({ promotable: cues.length, evidence }, null, 2));
} else {
  for (const cue of cues) {
    const current = await currentEntry(cue, outputLedger);
    if (current) {
      console.log(`${cue.assetId}: current ${current.artifactSha256.slice(0, 12)}`);
      continue;
    }
    const entry = await promoteCue(cue, jobs.get(`job.speech.${cue.assetId}`), legacyLedger, outputLedger);
    console.log(`${cue.assetId}: ${entry.durationSeconds.toFixed(2)}s ${entry.artifactSha256.slice(0, 12)}`);
  }
}
