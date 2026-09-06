import { execFile } from 'node:child_process';
import { rmSync } from 'node:fs';
import { copyFile, cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { promisify } from 'node:util';

import { loadKrea2Receipt, loadKrea2Review, validateKrea2Candidate, validateKrea2Review } from './lib/krea2-delivery.mjs';
import { loadVerifiedKrea2Baseline, sha256 } from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(projectRoot, 'dist/albina-galgame-card');
const previewRoot = resolve(projectRoot, 'staging/media/krea2-local-preview');
const previewLock = resolve(projectRoot, 'staging/media/.krea2-local-preview.lock');
const stalePreviewLockMs = 3 * 60 * 1000;
const includeAuCg = process.argv.includes('--include-au-cg');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-v1');
const auCharacterRoot = resolve(projectRoot, 'staging/media/krea2-au-character-anchor');
const auCgRoot = resolve(projectRoot, 'staging/media/krea2-au-cg');
const auPortraitCandidates = [
  { variant: 'normal', path: 'characters/albina/normal.png' },
  { variant: 'rain', path: 'characters/albina/rain.png' },
  { variant: 'combat', path: 'characters/albina/combat.png' },
  { variant: 'armored', path: 'characters/albina/armored.png' },
  { variant: 'endgame', path: 'characters/albina/endgame.png' },
  { variant: 'fascia-open', path: 'characters/albina/fascia-open.png' },
  { variant: 'furious', path: 'characters/albina/furious.png' },
  { variant: 'golden-bough', path: 'characters/albina/golden-bough.png' },
  { variant: 'maestro', path: 'characters/albina/maestro.png' },
  { variant: 'ring-conspiracy', path: 'characters/albina/ring-conspiracy.png' },
  { variant: 'shy', path: 'characters/albina/shy.png' },
  { variant: 'surgical', path: 'characters/albina/surgical.png' },
  { variant: 'white-canvas', path: 'characters/albina/white-canvas.png' },
];
const auCgCandidates = [
  { shot: 'white-canvas', assetId: 'cg.white_canvas_choice', path: 'cg/white_canvas_choice.jpg' },
  { shot: 'golden-bough', assetId: 'cg.golden_bough_rebuild', path: 'cg/golden_bough_rebuild.jpg' },
  { shot: 'ring-gallery', assetId: 'cg.ring_conspiracy_ending', path: 'cg/ring_conspiracy_ending.jpg' },
];
const [plan, prompts, verifiedBaseline] = await Promise.all([
  readJson(resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json')),
  readJson(resolve(projectRoot, 'content/media-production/visual-prompts-v2.json')),
  loadVerifiedKrea2Baseline(),
]);
const productionBaseline = {
  workflowSha256: verifiedBaseline.evidence.workflow.sha256,
  topologySha256: verifiedBaseline.evidence.runtime.topologySha256,
};

if (!Array.isArray(plan.imageJobs) || !Array.isArray(prompts.prompts)) throw new Error('Invalid Krea2 preview inputs');
await acquirePreviewLock(previewLock);
// Release the lock on every termination path. The 'exit' handler alone is not
// enough: vitest kills timed-out child processes with SIGTERM, which skips
// 'exit' unless we explicitly route it through process.exit(). On Windows the
// termination is a hard TerminateProcess (no signal hook), so the lock is a
// PID file (see acquirePreviewLock) and an orphaned holder's PID is detected
// as dead by the next acquirer, which takes over immediately. The handlers
// below remain as the POSIX fast path.
const releasePreviewLock = () => { try { rmSync(previewLock, { recursive: true, force: true, maxRetries: 3 }); } catch {} };
process.on('exit', releasePreviewLock);
process.on('SIGINT', () => process.exit(130));
process.on('SIGTERM', () => process.exit(143));
await rm(previewRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
// dist/albina-galgame-card is ~112MB across 264 files. fs.cp defaults to a
// concurrency of 1, which serializes every copy; under a full vitest run the
// parallel workers compete for disk I/O and the copy alone can blow past any
// sane test timeout. Parallelize the copy (Node >=22 supports `concurrency`).
await cp(sourceRoot, previewRoot, { recursive: true, concurrency: 8 });

const manifestPath = resolve(previewRoot, 'assets/asset-manifest-v2.json');
const manifest = await readJson(manifestPath);
const promptById = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));
const bgJobs = plan.imageJobs.filter((candidate) => candidate.category === 'bg');
// Probe every delivery dimension in parallel up front. Under a full vitest run
// the worker's subprocesses are CPU-rate-limited (host job object), so 11
// serial ffprobe spawns alone can exceed any sane test timeout; parallelizing
// collapses the wall-clock to a single probe duration.
await Promise.all(bgJobs.map(async (job) => {
  const deliveryPath = resolve(stagingRoot, 'delivery', `${job.id}.jpg`);
  if (await imageDimensions(deliveryPath) !== '1280x720') throw new Error(`Krea2 delivery dimensions are invalid: ${job.id}`);
}));
const evidence = [];

for (const job of bgJobs) {
  const prompt = promptById.get(job.id);
  if (!prompt) throw new Error(`Missing Krea2 review criteria: ${job.id}`);
  const receipt = validateKrea2Candidate(await loadKrea2Receipt(job.id), job, productionBaseline);
  const review = await loadKrea2Review(job.id);
  if (review?.status === 'rejected') continue;
  validateKrea2Review(review, receipt, prompt.reviewCriteria);
  const deliveryPath = resolve(stagingRoot, 'delivery', `${job.id}.jpg`);
  const delivery = await readFile(deliveryPath);
  const target = resolve(previewRoot, 'assets', job.path);
  await mkdir(resolve(target, '..'), { recursive: true });
  await copyFile(deliveryPath, target);
  const matching = manifest.assets.filter((asset) => asset.path === job.path);
  if (matching.length === 0) throw new Error(`Preview manifest has no background asset: ${job.path}`);
  for (const asset of matching) {
    asset.sha256 = sha256(delivery);
    asset.bytes = delivery.length;
  }
  evidence.push({
    jobId: job.id,
    assetId: job.assetId,
    path: job.path,
    sourceSha256: receipt.output.sha256,
    deliverySha256: sha256(delivery),
    reviewPath: toPosix(relative(projectRoot, resolve(stagingRoot, 'reviews', `${job.id}.json`))),
    status: 'local-preview-only',
    rights: receipt.rights,
  });
}

const portraitEvidence = [];
// Same parallel dimension pre-check as the background set (see above).
await Promise.all(auPortraitCandidates.map(async (candidate) => {
  const sourcePath = resolve(auCharacterRoot, `albina-au-${candidate.variant}.png`);
  if (await imageDimensions(sourcePath) !== '768x1360') throw new Error(`AU ${candidate.variant} candidate dimensions are invalid`);
}));
for (const candidate of auPortraitCandidates) {
  const sourcePath = resolve(auCharacterRoot, `albina-au-${candidate.variant}.png`);
  const receiptPath = resolve(auCharacterRoot, `albina-au-${candidate.variant}.json`);
  const receipt = await readJson(receiptPath);
  if (receipt.status !== 'awaiting-review'
    || receipt.purpose !== 'original AU character variant candidate; local review only'
    || receipt.variant !== candidate.variant
    || receipt.rights?.publicRelease !== 'prohibited-until-originality-and-rights-review') {
    throw new Error(`AU ${candidate.variant} candidate does not meet the local-review-only contract`);
  }
  const image = await readFile(sourcePath);
  if (sha256(image) !== receipt.output?.sha256) throw new Error(`AU ${candidate.variant} candidate hash does not match its receipt`);
  const target = resolve(previewRoot, 'assets', candidate.path);
  await mkdir(resolve(target, '..'), { recursive: true });
  await copyFile(sourcePath, target);
  const manifestAssets = manifest.assets.filter((asset) => asset.path === candidate.path);
  if (manifestAssets.length === 0) throw new Error(`Preview manifest has no AU portrait asset: ${candidate.path}`);
  for (const asset of manifestAssets) {
    asset.sha256 = sha256(image);
    asset.bytes = image.length;
  }
  portraitEvidence.push({
    assetId: `portrait.albina.${candidate.variant}`,
    path: candidate.path,
    sourceReceiptPath: toPosix(relative(projectRoot, receiptPath)),
    sourceSha256: receipt.output.sha256,
    deliverySha256: sha256(image),
    status: 'local-preview-only',
    rights: receipt.rights,
  });
}

const cgEvidence = includeAuCg ? await loadCompleteAuCgSet(auCgCandidates) : [];
for (const candidate of cgEvidence) {
  const image = await readFile(candidate.sourcePath);
  const target = resolve(previewRoot, 'assets', candidate.path);
  await mkdir(resolve(target, '..'), { recursive: true });
  await convertPreviewImage(candidate.sourcePath, target);
  const delivery = await readFile(target);
  const manifestAssets = manifest.assets.filter((asset) => asset.id === candidate.assetId && asset.path === candidate.path);
  if (manifestAssets.length !== 1) throw new Error(`Preview manifest has no unique AU CG asset: ${candidate.assetId}`);
  for (const asset of manifestAssets) {
    asset.sha256 = sha256(delivery);
    asset.bytes = delivery.length;
  }
  candidate.sourceSha256 = sha256(image);
  candidate.deliverySha256 = sha256(delivery);
  delete candidate.sourcePath;
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
await writeFile(resolve(previewRoot, 'KREA2_LOCAL_PREVIEW.json'), `${JSON.stringify({
  version: 1,
  purpose: 'Local galgame visual review only; not a public-release artifact.',
  source: 'verified local ComfyUI Krea2 baseline',
  generatedAt: new Date().toISOString(),
  backgrounds: evidence,
  portraits: portraitEvidence,
  cgs: cgEvidence,
}, null, 2)}\n`, 'utf8');
await writeFile(resolve(previewRoot, 'preview-harness.html'), `<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Albina Krea2 local preview</title></head>
<body><script>window.__ALBINA_LOCAL_ASSET_BASE__="./";window.TavernHelper={getChatId:()=>"krea2-local-preview-"+(new URLSearchParams(location.search).get("run")||"default"),getVariables:()=>window.__previewVars||(window.__previewVars={}),setVariables:(values)=>Object.assign(window.__previewVars||(window.__previewVars={}),values)};</script><script type="module" src="./source/albina-classic-loader.js"></script></body></html>
`, 'utf8');
await writeFile(resolve(previewRoot, 'portrait-review.html'), buildPortraitReviewPage(auPortraitCandidates), 'utf8');
await writeFile(resolve(previewRoot, 'cg-review.html'), buildCgReviewPage(cgEvidence), 'utf8');
console.log(JSON.stringify({ previewRoot, backgrounds: evidence.length, portraits: portraitEvidence.length, cgs: cgEvidence.length, status: 'local-preview-only' }));

async function imageDimensions(path) {
  const source = await stat(path);
  if (source.size === 0) throw new Error(`Krea2 delivery is empty: ${path}`);
  const { stdout } = await promisify(execFile)('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', path,
  ]);
  return stdout.trim();
}

async function convertPreviewImage(source, target) {
  await promisify(execFile)('ffmpeg', ['-v', 'error', '-y', '-i', source, '-frames:v', '1', '-q:v', '2', target]);
  if (await imageDimensions(target) !== '1280x720') throw new Error(`AU CG preview conversion dimensions are invalid: ${source}`);
}

async function loadCompleteAuCgSet(candidates) {
  const reviewed = [];
  for (const candidate of candidates) {
    const sourcePath = resolve(auCgRoot, `albina-au-cg-${candidate.shot}.png`);
    const receiptPath = resolve(auCgRoot, `albina-au-cg-${candidate.shot}.json`);
    try {
      const receipt = await readJson(receiptPath);
      const image = await readFile(sourcePath);
      if (receipt.status !== 'awaiting-review'
        || receipt.purpose !== 'original AU key CG candidate; local review only'
        || receipt.shot !== candidate.shot
        || receipt.assetId !== candidate.assetId
        || receipt.rights?.publicRelease !== 'prohibited-until-originality-and-rights-review'
        || receipt.output?.sha256 !== sha256(image)
        || await imageDimensions(sourcePath) !== '1280x720') {
        throw new Error(`AU ${candidate.shot} CG candidate does not meet the local-review-only contract`);
      }
      reviewed.push({
        shot: candidate.shot,
        assetId: candidate.assetId,
        path: candidate.path,
        sourcePath,
        sourceReceiptPath: toPosix(relative(projectRoot, receiptPath)),
        status: 'local-preview-only',
        rights: receipt.rights,
      });
    } catch (error) {
      if (error?.code === 'ENOENT') return [];
      throw error;
    }
  }
  return reviewed;
}

async function readJson(path) { return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, '')); }
function toPosix(path) { return path.replaceAll('\\', '/'); }

function buildPortraitReviewPage(candidates) {
  const cards = candidates.map(({ variant, path }) => `<figure data-portrait-variant="${variant}">
  <img src="./assets/${path}" alt="Albina AU ${variant} review candidate" loading="eager">
  <figcaption>${variant}<small>Local review candidate. Not approved for public release.</small></figcaption>
</figure>`).join('\n');
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Albina Krea2 portrait review</title>
<style>
:root { color-scheme: dark; font-family: system-ui, sans-serif; background: #11151b; color: #edf1f5; }
body { margin: 0; padding: 24px; }
header { max-width: 1400px; margin: 0 auto 20px; }
h1 { margin: 0 0 8px; font-size: 24px; }
p { margin: 0; color: #b9c1ca; }
main { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; max-width: 1400px; margin: 0 auto; }
figure { margin: 0; border: 1px solid #3a4652; background: #18202a; }
img { display: block; width: 100%; height: auto; aspect-ratio: 48 / 85; object-fit: contain; background: #080b0f; }
figcaption { padding: 8px; font-weight: 650; }
small { display: block; margin-top: 4px; color: #aeb8c2; font-weight: 400; line-height: 1.35; }
</style></head><body><header><h1>Albina AU portrait review</h1><p>Verified local Krea2 candidate set. Local visual review only; not a public-release artifact.</p></header><main>${cards}</main></body></html>\n`;
}

function buildCgReviewPage(candidates) {
  const cards = candidates.length === 0
    ? '<p class="empty">No AU CG candidates were injected. This review surface remains intentionally empty.</p>'
    : candidates.map(({ shot, path }) => `<figure data-cg-shot="${shot}">
  <img src="./assets/${path}" alt="Albina AU ${shot} key CG review candidate" loading="eager">
  <figcaption>${shot}<small>Local review candidate. Not approved for public release.</small></figcaption>
</figure>`).join('\n');
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Albina Krea2 CG review</title>
<style>
:root { color-scheme: dark; font-family: system-ui, sans-serif; background: #11151b; color: #edf1f5; }
body { margin: 0; padding: 24px; } header, main { max-width: 1400px; margin: 0 auto; } header { margin-bottom: 20px; } h1 { margin: 0 0 8px; font-size: 24px; } p { margin: 0; color: #b9c1ca; } main { display: grid; gap: 16px; } figure { margin: 0; border: 1px solid #3a4652; background: #18202a; } img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: contain; background: #080b0f; } figcaption { padding: 10px; font-weight: 650; } small { display: block; margin-top: 4px; color: #aeb8c2; font-weight: 400; line-height: 1.35; } .empty { border: 1px dashed #3a4652; padding: 18px; }
</style></head><body><header><h1>Albina AU key CG review</h1><p>Verified local Krea2 candidate set. Local visual review only; not a public-release artifact.</p></header><main>${cards}</main></body></html>\n`;
}

async function acquirePreviewLock(path) {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    try {
      await writeFile(path, `${JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() })}\n`, { flag: 'wx' });
      return;
    } catch (error) {
      if (error?.code !== 'EEXIST') throw error;
      if (await isStaleOrOrphanLock(path)) {
        await rm(path, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
        continue;
      }
      await new Promise((resolve_) => setTimeout(resolve_, 200));
    }
  }
  throw new Error(`Timed out waiting for Krea2 local preview lock: ${path}`);
}

async function isStaleOrOrphanLock(path) {
  // Legacy directory lock (pre-PID format): stale only when empty and old.
  try {
    const info = await stat(path);
    if (info.isDirectory()) {
      if (Date.now() - info.mtimeMs < stalePreviewLockMs) return false;
      const entries = await readdir(path);
      return entries.length === 0;
    }
  } catch (error) {
    if (error?.code === 'ENOENT') return true; // vanished between checks
    throw error;
  }
  // PID file lock: an orphaned holder (killed without any chance to clean up,
  // e.g. vitest timeout on Windows terminates the child without signals) is
  // released immediately. A live holder is only displaced after the stale
  // window, and a corrupt lock is treated as orphaned.
  try {
    const lock = JSON.parse(await readFile(path, 'utf8'));
    if (typeof lock.pid !== 'number' || typeof lock.createdAt !== 'string') return true;
    if (!isProcessAlive(lock.pid)) return true;
    return Date.now() - Date.parse(lock.createdAt) > stalePreviewLockMs;
  } catch {
    return true;
  }
}

function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code === 'EPERM'; // exists but not ours to signal
  }
}
