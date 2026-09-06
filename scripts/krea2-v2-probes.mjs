#!/usr/bin/env node
/**
 * Produce isolated v2 sharpness probes without touching the v1 batch ledger.
 * Candidates are intentionally staged only; promotion still requires direct review.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { JOBS } from './krea2-canonical-restyle-batch.mjs';
import { PRE_UPSCALE_MODELS, produceCanonicalRestyle } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const canonRoot = resolve(root, 'staging/research/canon-visual/wiki-game-assets');
const probeRoot = resolve(root, 'staging/media/krea2-v2-probes');
const rawArgs = process.argv.slice(2);
const requestedArg = rawArgs.find((value) => value.startsWith('--only='));
const separatedOnlyIndex = rawArgs.indexOf('--only');
const requested = new Set(requestedArg
  ? requestedArg.slice(7).split(',').filter(Boolean)
  : separatedOnlyIndex >= 0
    ? String(rawArgs[separatedOnlyIndex + 1] ?? '').split(',').filter(Boolean)
    : []);
if (separatedOnlyIndex >= 0 && requested.size === 0) throw new Error('--only requires one or more job ids');
const knownOptions = new Set(['--only', '--variant', '--pre-upscale-model', '--pre-upscale-input-scale', '--denoise', '--depth-strength', '--steps', '--scale', '--post-style-lora', '--post-style-strength', '--no-pre-upscale', '--no-depth-control', '--tiled-vae']);
for (const [index, value] of rawArgs.entries()) {
  if (!value.startsWith('--')) continue;
  const key = value.includes('=') ? value.slice(0, value.indexOf('=')) : value;
  if (!knownOptions.has(key)) throw new Error(`Unknown probe option: ${value}`);
  if (key === '--only' && index + 1 >= rawArgs.length) throw new Error('--only requires one or more job ids');
}
const selected = JOBS.filter((job) => requested.size === 0 || requested.has(job.id));
const withoutPreUpscale = process.argv.includes('--no-pre-upscale');
const tiledVae = process.argv.includes('--tiled-vae');
const option = (name, fallback) => {
  const raw = process.argv.slice(2).find((value) => value.startsWith(`--${name}=`));
  return raw ? raw.slice(name.length + 3) : fallback;
};
const numberOption = (name, fallback) => {
  const value = Number(option(name, fallback));
  if (!Number.isFinite(value)) throw new Error(`Invalid --${name} value`);
  return value;
};
const variant = option('variant', 'manual');
const preUpscaleModel = withoutPreUpscale ? null : option('pre-upscale-model', PRE_UPSCALE_MODELS.anime);
const preUpscaleInputScale = preUpscaleModel ? numberOption('pre-upscale-input-scale', 0.5) : null;
const denoiseOverride = option('denoise', null);
const depthStrength = process.argv.includes('--no-depth-control') ? null : numberOption('depth-strength', 0.55);
const stepsOverride = numberOption('steps', 20);
const scaleOverride = option('scale', null);
const postStyleName = option('post-style-lora', null);
const postStyleStrength = postStyleName ? numberOption('post-style-strength', 0.2) : null;
if (!Number.isInteger(stepsOverride) || stepsOverride < 1) throw new Error('--steps must be a positive integer');
if (denoiseOverride !== null && (Number(denoiseOverride) < 0 || Number(denoiseOverride) > 1)) throw new Error('--denoise must be between 0 and 1');
if (scaleOverride !== null && Number(scaleOverride) <= 0) throw new Error('--scale must be positive');
  if (preUpscaleInputScale !== null && preUpscaleInputScale <= 0) throw new Error('--pre-upscale-input-scale must be positive');
if (postStyleStrength !== null && (postStyleStrength < 0 || postStyleStrength > 1)) throw new Error('--post-style-strength must be between 0 and 1');

if (selected.length === 0) throw new Error('No v2 probe jobs selected');

await mkdir(probeRoot, { recursive: true });
const summary = [];
for (const job of selected) {
  const jobId = `v2probe_${variant.replaceAll(/[^a-zA-Z0-9_-]/gu, '_')}_${job.id.replaceAll('-', '_')}`;
  const denoise = denoiseOverride === null ? job.denoise : Number(denoiseOverride);
  const scale = scaleOverride === null ? job.scale : Number(scaleOverride);
  console.log(`Starting ${job.id}`);
  const result = await produceCanonicalRestyle({
    jobId,
    sourcePath: resolve(canonRoot, job.source),
    stagingDir: probeRoot,
    prompt: job.prompt,
    negativePrompt: job.negative,
    seed: job.seed,
    denoise,
    steps: stepsOverride,
    scale,
    preUpscaleModel,
    preUpscaleInputScale,
    depthControl: depthStrength === null ? null : { strength: depthStrength },
    vaeTiled: tiledVae,
    postStyleLora: postStyleName ? { name: postStyleName, strength: postStyleStrength } : undefined,
    preserveAlpha: job.alpha,
  });
  summary.push({
    id: job.id,
    variant,
    source: job.source,
    output: result.finalPath,
    receipt: result.receiptPath,
    sha256: result.finalSha256,
    parameters: { denoise, steps: stepsOverride, scale, preUpscaleModel, preUpscaleInputScale, depthStrength, tiledVae, postStyleLora: postStyleName ? { name: postStyleName, strength: postStyleStrength } : null },
  });
  console.log(`Completed ${job.id}: ${result.finalPath}`);
}
await writeFile(resolve(probeRoot, 'v2-probes-summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
