#!/usr/bin/env node
/**
 * Single-image two-pass Albina Krea2 staging run.
 *
 * The canonical image is the only source. The fixed six-LoRA chain is shared
 * by both passes. This script never batches and never promotes its output.
 */
import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';
import {
  buildAlbinaStagedHighFrequencyWorkflow,
  buildAlbinaStagedHighFrequencyReceiptFields,
  NEUTRAL_FIELD,
} from './lib/krea2-restyle.mjs';
import {
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  stableJson,
  uploadKrea2Image,
  validateKrea2StagedHighFrequencyWorkflow,
  waitForKrea2Output,
  downloadKrea2Image,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const variant = await loadVariant(argument('--variant-job'));
const sourcePath = resolve(argument('--source') ?? variant?.source ?? 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const jobId = safe(argument('--job-id') ?? variant?.outputId ?? 'albina-canonical-krea2-staged-high-frequency-v1');
const stagingDir = resolve(argument('--staging-dir') ?? 'staging/media/krea2-canonical-production/characters');
const seed = integerArgument('--seed', variant?.seed ?? 2026081921);
const stage1Denoise = numberArgument('--stage1-denoise', 0.12);
const stage2Denoise = numberArgument('--stage2-denoise', 0.07);
const stage1Steps = integerArgument('--stage1-steps', 28);
const stage2Steps = integerArgument('--stage2-steps', 24);
const sourceBytes = await readFile(sourcePath);
const sourceSha = sha256(sourceBytes);
const inputPath = resolve(stagingDir, `${jobId}.input.png`);
const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
const workflowPath = resolve(stagingDir, `${jobId}.workflow.json`);
await mkdir(stagingDir, { recursive: true });
flatten(sourcePath, inputPath);
const baseline = await loadVerifiedKrea2Baseline();
const upload = await uploadKrea2Image(inputPath);
const subject = argument('--subject') ?? 'the supplied authored adult character design';
const prompt = argument('--prompt') ?? variant?.prompt ?? `strict canonical geometry-preserving two-pass Krea2 material refinement of ${subject}; preserve the exact source silhouette, face, eye-side assignments, hair construction, clothing, mechanical or prosthetic components, pose, hands, feet, composition and color blocking; add only crisp dense 2D linework and coherent hard-surface/material separation; no redesign, no mirror, no crop, no text`;
const negativePrompt = argument('--negative') ?? variant?.negative ?? 'child, loli, chibi, generic anime face, redesigned costume, mirrored eyes, organic replacement limbs, fused limbs, cropped feet, blurry, soft focus, smeared linework, text, logo, watermark';
if (prompt.length < 200) throw new Error('Krea2 staged production refuses a truncated prompt (<200 characters)');
if (variant && !prompt.includes(`State variant only: ${variant.variant}`)) throw new Error('Krea2 staged production prompt is missing the queued state marker');
const built = buildAlbinaStagedHighFrequencyWorkflow(baseline.workflow, {
  prompt,
  negativePrompt,
  sourceFilename: upload.filename,
  filenamePrefix: jobId,
  seed,
  stage1Size: parseCanvas(argument('--stage1')) ?? undefined,
  stage2Size: parseCanvas(argument('--stage2')) ?? undefined,
  stage1Denoise,
  stage2Denoise,
  stage1Steps,
  stage2Steps,
});
validateKrea2StagedHighFrequencyWorkflow(built.workflow);
const positiveText = Object.values(built.workflow).find((node) => node.class_type === 'CLIPTextEncode' && node.inputs?.text === prompt);
if (!positiveText) throw new Error('Krea2 staged production prompt is not bound to a CLIPTextEncode node');
await writeFile(workflowPath, `${JSON.stringify(built.workflow, null, 2)}\n`, 'utf8');
const queued = await enqueueKrea2Job(built.workflow);
const result = await waitForKrea2Output(queued.promptId, { timeoutMs: 7_200_000 });
if (result.images.length !== 1) throw new Error('staged high-frequency run must produce exactly one image');
const rgbPath = resolve(stagingDir, `${jobId}.rgb.png`);
const output = await downloadKrea2Image(result.images[0], rgbPath);
const finalPath = resolve(stagingDir, `${jobId}.png`);
restoreAlpha(sourcePath, rgbPath, finalPath);
const finalBytes = await readFile(finalPath);
const workflowBytes = await readFile(workflowPath);
const receipt = {
  schemaVersion: 1,
  kind: 'krea2-staged-high-frequency-receipt',
  provider: 'comfyui-local-krea2',
  model: 'redcraft23FP8_30Krea2.safetensors',
  jobId,
  status: 'completed-awaiting-direct-review',
  source: { path: relative(root, sourcePath).replaceAll('\\', '/'), sha256: sourceSha, canvas: { width: 588, height: 1766, alpha: true } },
  uploadedCanonical: { filename: upload.filename, sha256: upload.sha256, transform: 'flatten-alpha-over-neutral-field-34-34-38' },
  workflow: { path: relative(root, workflowPath).replaceAll('\\', '/'), sha256: sha256(workflowBytes), topologySha256: sha256(stableJson(built.workflow)) },
  prompt: { sha256: sha256(prompt), text: prompt, negativeSha256: sha256(negativePrompt) },
  seed,
  ...buildAlbinaStagedHighFrequencyReceiptFields({}, built, { path: relative(root, sourcePath).replaceAll('\\', '/'), sha256: sourceSha }),
  execution: { promptId: queued.promptId, historySha256: sha256(JSON.stringify(result.history)), outputBinding: result.images[0] },
  output: { path: finalPath, rgbPath, sha256: sha256(finalBytes), bytes: finalBytes.length, alphaRestored: true, intermediary: output },
  rights: { generatedOutput: 'review-required', thirdPartySourceRights: 'unverified' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId, status: receipt.status, finalPath, receiptPath, resolution: built.stages.stage2.size }, null, 2));

function argument(name) {
  const prefix = `${name}=`;
  const inline = process.argv.find(value => value.startsWith(prefix));
  if (inline) return inline.slice(prefix.length) || undefined;
  const index = process.argv.indexOf(name);
  const value = index < 0 ? undefined : process.argv[index + 1];
  return value?.startsWith('--') ? undefined : value;
}
function integerArgument(name, fallback) {
  const value = argument(name);
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) throw new Error(`${name} must be a non-negative safe integer`);
  return parsed;
}
function numberArgument(name, fallback) {
  const value = argument(name);
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) throw new Error(`${name} must be a number between 0 and 1`);
  return parsed;
}
function safe(value) {
  if (!/^[a-z0-9][a-z0-9._-]{0,95}$/iu.test(value)) throw new Error('--job-id must be filesystem-safe');
  return value;
}
function parseCanvas(value) {
  if (value === undefined) return undefined;
  const match = /^(\d+)x(\d+)$/u.exec(value);
  if (!match) throw new Error('canvas must use WIDTHxHEIGHT');
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 384 || height < 384 || width % 8 !== 0 || height % 8 !== 0) {
    throw new Error('canvas dimensions must be 8-aligned integers of at least 384 pixels');
  }
  return { width, height };
}
function runPython(code, args) {
  const result = spawnSync('python', ['-c', code, ...args], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || 'image helper failed');
}
function flatten(source, destination) {
  runPython("from PIL import Image; import sys; im=Image.open(sys.argv[1]).convert('RGBA'); bg=Image.new('RGBA', im.size, (34,34,38,255)); bg.alpha_composite(im); bg.convert('RGB').save(sys.argv[2])", [source, destination]);
}
function restoreAlpha(canonical, produced, destination) {
  runPython("from PIL import Image; import sys; src=Image.open(sys.argv[1]).convert('RGBA'); out=Image.open(sys.argv[2]).convert('RGB'); out=out.convert('RGBA'); out.putalpha(src.getchannel('A').resize(out.size, Image.LANCZOS)); out.save(sys.argv[3])", [canonical, produced, destination]);
}

async function loadVariant(jobId) {
  if (jobId === undefined) return null;
  if (!/^[a-z0-9-]+$/u.test(jobId)) throw new Error('--variant-job must be a known filesystem-safe identifier');
  const queuePath = resolve(root, 'content/media-production/albina-staged-variant-queue-v1.json');
  const queue = JSON.parse(await readFile(queuePath, 'utf8'));
  if (queue.profile !== 'albina-staged-high-frequency-v1') throw new Error('variant queue profile mismatch');
  const entry = queue.variants?.find((item) => item.jobId === jobId);
  if (!entry) throw new Error(`unknown staged Albina variant: ${jobId}`);
  if (entry.source !== 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png') throw new Error('variant source is not canonical');
  if (typeof entry.prompt !== 'string' || entry.prompt.length < 200 || typeof entry.negative !== 'string' || entry.negative.length < 32) throw new Error('variant prompt contract is incomplete');
  return entry;
}
