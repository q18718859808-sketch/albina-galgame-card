import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dialoguePaths = [
  'content/dialogue/canon-recap.json',
  'content/dialogue/opening.json',
  'content/dialogue/white-canvas.json',
  'content/dialogue/golden-bough-rebuild.json',
  'content/dialogue/ring-conspiracy.json',
];
const releaseRoot = resolve(projectRoot, 'dist/albina-galgame-card/assets');
const stagingRoot = resolve(projectRoot, 'staging/media/audio/voice-boundary-v2');
const receiptRoot = resolve(projectRoot, 'content/media-receipts');
const ledgerPath = resolve(projectRoot, 'content/media-production/voice-boundary-v2.json');
const model = 'speech-2.8-hd';
const provider = 'pie';
const promptVersion = 'albina-speech-v2';
const targetIds = new Set([
  'voice.scene.opening_001',
  'voice.scene.white_canvas_001',
  'voice.result.enter_white_canvas',
  'voice.result.enter_rebuild',
  'voice.result.enter_conspiracy',
  'voice.result.return_opening_from_white',
  'voice.result.return_opening_from_rebuild',
  'voice.result.return_opening_from_ring',
]);

function isTarget(id) {
  return id.startsWith('voice.scene.canon_recap_')
    || id.startsWith('voice.result.canon_recap_')
    || targetIds.has(id);
}

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
  return JSON.parse(await readFile(resolve(projectRoot, path), 'utf8'));
}

async function collectCues() {
  const scenes = (await Promise.all(dialoguePaths.map(readJson))).flat();
  const cues = [];
  for (const scene of scenes) {
    if (isTarget(scene.voiceAssetId)) cues.push({ assetId: scene.voiceAssetId, text: scene.text, speaker: scene.speaker });
    for (const choice of scene.choices ?? []) {
      if (isTarget(choice.resultVoiceAssetId)) cues.push({ assetId: choice.resultVoiceAssetId, text: choice.resultText, speaker: scene.speaker });
    }
  }
  cues.sort((left, right) => left.assetId.localeCompare(right.assetId));
  if (cues.length !== 20 || new Set(cues.map((cue) => cue.assetId)).size !== 20) {
    throw new Error(`Expected 20 unique boundary and placeholder voice cues, received ${cues.length}`);
  }
  return cues;
}

function requestDescriptor(cue) {
  const spokenText = cue.text.replaceAll('{{user}}', '角色');
  const voice = cue.speaker === '阿尔比娜' ? 'nova' : 'onyx';
  const job = { version: 2, assetId: cue.assetId, kind: 'speech', provider, model, promptVersion, voice, sourceText: cue.text, spokenText };
  return { ...job, sourceJobHash: hash(canonicalJson(job)), sourceTextSha256: hash(cue.text), spokenTextSha256: hash(spokenText) };
}

async function downloadSpeech(apiKey, descriptor) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      return await speechAttempt(apiKey, descriptor);
    } catch (error) {
      lastError = error;
      if (attempt === 4) break;
      await new Promise((done) => setTimeout(done, 1_500 * (2 ** (attempt - 1))));
    }
  }
  throw lastError;
}

async function speechAttempt(apiKey, descriptor) {
  const baseUrl = (process.env.PIE_BASE_URL ?? 'https://api.pie-xian.com').replace(/\/$/u, '');
  const response = await fetch(`${baseUrl}/v1/audio/speech`, {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ model, input: descriptor.spokenText, voice: descriptor.voice }),
    signal: AbortSignal.timeout(240_000),
  });
  if (!response.ok) throw new Error(`Pie speech request failed with HTTP ${response.status}`);
  const requestId = response.headers.get('x-request-id') ?? response.headers.get('request-id');
  const { bytes, providerTaskId } = await speechBytes(response);
  if (bytes.length < 1_024) throw new Error(`Pie speech response was too small (${bytes.length} bytes)`);
  return { bytes, requestId, providerTaskId };
}

async function speechBytes(response) {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.includes('json')) return { bytes: new Uint8Array(await response.arrayBuffer()), providerTaskId: null };
  const body = await response.json();
  const url = body.audio_url ?? body.url ?? body.data?.[0]?.url;
  const encoded = body.b64_json ?? body.audio ?? body.data?.[0]?.b64_json;
  const providerTaskId = body.id ?? body.task_id ?? null;
  if (typeof encoded === 'string') return { bytes: Buffer.from(encoded, 'base64'), providerTaskId };
  if (typeof url !== 'string' || !url.startsWith('https://')) throw new Error('Pie speech JSON response did not contain an HTTPS audio URL');
  const artifact = await fetch(url, { signal: AbortSignal.timeout(240_000) });
  if (!artifact.ok) throw new Error(`Pie speech artifact download failed with HTTP ${artifact.status}`);
  return { bytes: new Uint8Array(await artifact.arrayBuffer()), providerTaskId };
}

async function normalizeAudio(rawPath, normalizedPath) {
  const filter = [
    'silenceremove=start_periods=1:start_duration=0.05:start_threshold=-50dB:start_silence=0.10',
    'areverse',
    'silenceremove=start_periods=1:start_duration=0.05:start_threshold=-50dB:start_silence=0.20',
    'areverse',
    'loudnorm=I=-16:LRA=11:TP=-1.5',
  ].join(',');
  await run('ffmpeg', ['-y', '-v', 'error', '-i', rawPath, '-af', filter, '-codec:a', 'libmp3lame', '-b:a', '192k', normalizedPath], { maxBuffer: 8 * 1024 * 1024 });
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

async function readLedger() {
  try {
    const ledger = JSON.parse(await readFile(ledgerPath, 'utf8'));
    if (ledger.version !== 1 || !Array.isArray(ledger.entries)) throw new Error('Invalid boundary voice ledger');
    return ledger;
  } catch (error) {
    if (error.code === 'ENOENT') return { version: 1, entries: [] };
    throw error;
  }
}

async function writeJsonAtomic(path, value) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rm(path, { force: true });
  await rename(temporary, path);
}

function receipt(descriptor, artifactSha256, rawArtifactSha256, reviewedAt) {
  return {
    version: 1,
    assetId: descriptor.assetId,
    artifactSha256,
    provenance: {
      provider,
      model,
      promptVersion,
      sourceJobHash: descriptor.sourceJobHash,
      review: { status: 'approved', reviewer: 'automated-audio-qc', reviewedAt },
    },
    lineage: {
      kind: 'conversion', processVersion: 'speech-loudnorm-v2',
      inputs: [{ sha256: rawArtifactSha256, role: 'pie-speech-api-output' }],
    },
  };
}

async function produceCue(apiKey, cue, ledger) {
  const descriptor = requestDescriptor(cue);
  const outputPath = assetPath(cue.assetId);
  const rawPath = resolve(stagingRoot, `${safeName(cue.assetId)}.raw.mp3`);
  const normalizedPath = resolve(stagingRoot, `${safeName(cue.assetId)}.normalized.mp3`);
  const downloaded = await downloadSpeech(apiKey, descriptor);
  const rawArtifactSha256 = hash(downloaded.bytes);
  await mkdir(dirname(outputPath), { recursive: true });
  await mkdir(stagingRoot, { recursive: true });
  await writeFile(rawPath, downloaded.bytes);
  await normalizeAudio(rawPath, normalizedPath);
  const metrics = await inspectAudio(normalizedPath);
  await copyFile(normalizedPath, outputPath);
  const artifactSha256 = hash(await readFile(outputPath));
  const completedAt = new Date().toISOString();
  const nextEntry = { ...descriptor, rawArtifactSha256, artifactSha256, outputPath: outputPath.slice(projectRoot.length + 1).replaceAll('\\', '/'), ...metrics, productionId: `voice-v2-${descriptor.sourceJobHash.slice(0, 24)}`, providerRequestId: downloaded.requestId, providerTaskId: downloaded.providerTaskId, completedAt };
  ledger.entries = [...ledger.entries.filter((entry) => entry.assetId !== cue.assetId), nextEntry].sort((a, b) => a.assetId.localeCompare(b.assetId));
  await writeJsonAtomic(resolve(receiptRoot, `${safeName(cue.assetId)}.json`), receipt(descriptor, artifactSha256, rawArtifactSha256, completedAt));
  await writeJsonAtomic(ledgerPath, ledger);
  return { assetId: cue.assetId, durationSeconds: metrics.durationSeconds, artifactSha256 };
}

async function currentEntry(cue, ledger) {
  const descriptor = requestDescriptor(cue);
  const entry = ledger.entries.find((candidate) => candidate.assetId === cue.assetId && candidate.sourceJobHash === descriptor.sourceJobHash);
  if (!entry) return undefined;
  try {
    const artifactSha256 = hash(await readFile(assetPath(cue.assetId)));
    return artifactSha256 === entry.artifactSha256 ? entry : undefined;
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

async function repairReceiptLineage(cues, ledger) {
  for (const cue of cues) {
    const entry = ledger.entries.find((candidate) => candidate.assetId === cue.assetId);
    if (!entry) throw new Error(`Missing v2 voice ledger entry for ${cue.assetId}`);
    const rawPath = resolve(stagingRoot, `${safeName(cue.assetId)}.raw.mp3`);
    const rawArtifactSha256 = hash(await readFile(rawPath));
    const descriptor = requestDescriptor(cue);
    if (descriptor.sourceJobHash !== entry.sourceJobHash) throw new Error(`Stale v2 voice ledger entry for ${cue.assetId}`);
    entry.rawArtifactSha256 = rawArtifactSha256;
    await writeJsonAtomic(resolve(receiptRoot, `${safeName(cue.assetId)}.json`), receipt(descriptor, entry.artifactSha256, rawArtifactSha256, entry.completedAt));
  }
  ledger.entries.sort((a, b) => a.assetId.localeCompare(b.assetId));
  await writeJsonAtomic(ledgerPath, ledger);
  console.log(JSON.stringify({ repaired: cues.length }, null, 2));
}

const cues = await collectCues();
if (process.argv.includes('--repair-receipts')) {
  await repairReceiptLineage(cues, await readLedger());
} else if (process.argv.includes('--dry-run')) {
  console.log(JSON.stringify({ count: cues.length, assetIds: cues.map((cue) => cue.assetId) }, null, 2));
} else {
  const apiKey = process.env.PIE_API_KEY;
  if (!apiKey) throw new Error('PIE_API_KEY is required');
  const ledger = await readLedger();
  for (const cue of cues) {
    const current = await currentEntry(cue, ledger);
    if (current) {
      console.log(`${cue.assetId}: current ${current.artifactSha256.slice(0, 12)}`);
      continue;
    }
    const result = await produceCue(apiKey, cue, ledger);
    console.log(`${result.assetId}: ${result.durationSeconds.toFixed(2)}s ${result.artifactSha256.slice(0, 12)}`);
  }
}
