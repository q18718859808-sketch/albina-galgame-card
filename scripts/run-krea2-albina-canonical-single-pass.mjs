#!/usr/bin/env node
/**
 * One-image, single-pass Krea2 canonical anchor run.
 * The PNG source is the only identity input and is used as the latent origin.
 * This script never promotes or batches output.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { basename, relative, resolve } from 'node:path';
import {
  buildKrea2CanonicalSinglePassWorkflow,
  loadVerifiedKrea2Baseline,
  sha256,
  stableJson,
  uploadKrea2Image,
  enqueueKrea2Job,
  waitForKrea2Output,
  downloadKrea2Image,
  validateKrea2CanonicalSinglePassWorkflow,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(argument('--source') ?? 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const jobId = safe(argument('--job-id') ?? `albina-canonical-single-pass-${Date.now()}`);
const stagingDir = resolve(argument('--staging-dir') ?? 'staging/media/krea2-canonical-production/characters');
const width = integer('--width', 1184);
const height = integer('--height', 3536);
const steps = integer('--steps', 16);
const denoise = number('--denoise', 0.18);
const seed = integer('--seed', 2026082701);
const prompt = argument('--prompt') ?? [
  'Strict full-canvas Krea2 rendering of the supplied authored adult Albina canonical design.',
  'The source controls identity, exact silhouette, mature narrow face, image-left white luminous eye, image-right black eye, segmented silver-gray hair, image-right conduit bundle, white thoracic shell, black internal mechanics, open abdominal frame, crossed mechanical forearms, black-and-white lower-body partition, complete feet, pose, composition and side assignments.',
  'Render one complete standalone character with crisp dense linework, hard-surface material separation and controlled cool value blocks.',
  'This is rendering treatment of the original design, never a redesign or reinterpretation. No crop, mirror, inset, collage, text, logo or watermark.',
].join(' ');
const negativePrompt = argument('--negative') ?? 'child, loli, chibi, youthful round face, generic anime girl, ordinary heterochromia, mirrored eye assignment, fluffy ponytail, costume redesign, dress, skirt, closed abdomen, organic arms, extra limbs, bad hands, cropped head, cropped cable, cropped feet, blurry, soft focus, smeared linework, low detail, text, logo, watermark, inset, collage, pasted patch, seam';

if (prompt.length < 200) throw new Error('single-pass prompt must be at least 200 characters');
if (width % 8 !== 0 || height % 8 !== 0) throw new Error('single-pass dimensions must be 8-aligned');
await mkdir(stagingDir, { recursive: true });
const sourceBytes = await readFile(sourcePath);
const baseline = await loadVerifiedKrea2Baseline();
const upload = await uploadKrea2Image(sourcePath);
const built = buildKrea2CanonicalSinglePassWorkflow(baseline.workflow, {
  prompt, negativePrompt, sourceFilename: upload.filename, filenamePrefix: jobId,
  width, height, steps, denoise, seed,
});
validateKrea2CanonicalSinglePassWorkflow(built.workflow);
const workflowPath = resolve(stagingDir, `${jobId}.workflow.json`);
const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
await writeFile(workflowPath, `${JSON.stringify(built.workflow, null, 2)}\n`, 'utf8');
const queued = await enqueueKrea2Job(built.workflow);
const result = await waitForKrea2Output(queued.promptId, { timeoutMs: 7_200_000 });
if (result.images.length !== 1) throw new Error('single-pass run must produce exactly one image');
const rgbPath = resolve(stagingDir, `${jobId}.rgb.png`);
const output = await downloadKrea2Image(result.images[0], rgbPath);
const outputPath = resolve(stagingDir, `${jobId}.png`);
restoreCanonicalAlpha(sourcePath, rgbPath, outputPath);
const workflowBytes = await readFile(workflowPath);
const receipt = {
  schemaVersion: 1,
  kind: 'krea2-canonical-single-pass-receipt',
  provider: 'comfyui-local-krea2',
  model: 'redcraft23FP8_30Krea2.safetensors',
  jobId,
  profile: 'albina-krea2-canonical-single-pass-v1',
  status: 'completed-awaiting-direct-review',
  source: { path: relative(root, sourcePath).replaceAll('\\', '/'), sha256: sha256(sourceBytes), role: 'canonical-source-only' },
  uploadedCanonical: { filename: upload.filename, sha256: upload.sha256, sentToModel: true },
  workflow: { path: relative(root, workflowPath).replaceAll('\\', '/'), sha256: sha256(workflowBytes), topologySha256: sha256(stableJson(built.workflow)) },
  baseline: {
    workflowPath: baseline.workflowPath,
    workflowSha256: baseline.workflowSha256,
    evidencePath: baseline.evidencePath,
    evidenceSha256: baseline.evidenceSha256,
    topologySha256: baseline.topologySha256,
  },
  prompt: { sha256: sha256(prompt), text: prompt, negativeSha256: sha256(negativePrompt) },
  seed,
  sampling: { steps, denoise, sampler: 'er_sde', scheduler: 'beta' },
  loraChain: baseline.evidence?.executionContract?.loraChain ?? [],
  productionContract: { canonicalLatentOrigin: true, sixLoraBaselineRequired: true, singleImageStaging: true, outputQualityReviewRequired: true },
  execution: { promptId: queued.promptId, historySha256: sha256(JSON.stringify(result.history)), outputBinding: result.images[0] },
  output: {
    path: outputPath,
    rgbPath,
    sha256: sha256(await readFile(outputPath)),
    bytes: (await readFile(outputPath)).length,
    alphaRestored: true,
    intermediary: output,
  },
  directReview: { required: true, automatedVisionAdvisoryOnly: true, promotionAllowed: false },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId, status: receipt.status, outputPath, receiptPath }, null, 2));

function argument(name) {
  const inline = process.argv.find((value) => value.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1) || undefined;
  const index = process.argv.indexOf(name);
  const value = index < 0 ? undefined : process.argv[index + 1];
  return value?.startsWith('--') ? undefined : value;
}
function integer(name, fallback) {
  const value = argument(name);
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) throw new Error(`${name} must be a non-negative safe integer`);
  return parsed;
}
function number(name, fallback) {
  const value = argument(name);
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 1) throw new Error(`${name} must be greater than 0 and at most 1`);
  return parsed;
}
function safe(value) {
  if (!/^[a-z0-9][a-z0-9._-]{0,95}$/iu.test(value)) throw new Error('--job-id must be filesystem-safe');
  return value;
}

function restoreCanonicalAlpha(canonical, rgb, destination) {
  const script = [
    'from PIL import Image',
    'import sys',
    'canonical = Image.open(sys.argv[1]).convert("RGBA")',
    'render = Image.open(sys.argv[2]).convert("RGB")',
    'alpha = canonical.getchannel("A").resize(render.size, Image.Resampling.LANCZOS)',
    'result = render.convert("RGBA")',
    'result.putalpha(alpha)',
    'result.save(sys.argv[3], "PNG")',
  ].join('; ');
  const result = spawnSync('python', ['-c', script, canonical, rgb, destination], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`canonical alpha restoration failed: ${result.stderr || result.stdout}`);
}
