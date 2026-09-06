#!/usr/bin/env node
/**
 * Contract-bound Albina canonical production entry point.
 *
 * Canonical RGBA owns geometry, silhouette, side assignments and alpha.
 * This entry point delegates to the accepted two-stage high-frequency route;
 * it does not retain the rejected single-stage parameter surface.
 */
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(argument('--source') ?? resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png'));
const contractPath = resolve(root, 'content/media-production/krea2-canonical-production-contract-v1.json');
const contractBytes = await readFile(contractPath);
const contract = JSON.parse(contractBytes.toString('utf8').replace(/^\uFEFF/u, ''));
assertContract(contract);
const jobId = safe(argument('--job-id') ?? 'albina-canonical-krea2-staged-hf-v2');
const stagingDir = resolve(argument('--staging-dir') ?? resolve(root, 'staging/media/krea2-canonical-production/characters'));
const seed = integerArgument('--seed', 2026081901);
const subject = argument('--subject') ?? 'Albina authored adult mechanical fascia design preserving exact canonical geometry';
const highFrequency = contract.highFrequencyStaging;
const delegatedArgs = [
  'scripts/run-krea2-albina-staged-high-frequency.mjs',
  `--job-id=${jobId}`,
  `--source=${sourcePath}`,
  `--staging-dir=${stagingDir}`,
  `--subject=${subject}`,
  `--seed=${seed}`,
  `--stage1=${canvasString(highFrequency.stage1.size)}`,
  `--stage2=${canvasString(highFrequency.stage2.size)}`,
  `--stage1-denoise=${highFrequency.stage1.denoise}`,
  `--stage2-denoise=${highFrequency.stage2.denoise}`,
  `--stage1-steps=${highFrequency.stage1.steps}`,
  `--stage2-steps=${highFrequency.stage2.steps}`,
];
rejectLegacyParameters();

if (hasFlag('--plan')) {
  console.log(JSON.stringify({
    route: 'albina-staged-high-frequency-v1',
    delegatedScript: delegatedArgs[0],
    args: delegatedArgs.slice(1),
    targetReceipt: resolve(stagingDir, `${jobId}.receipt.json`),
    targetIsFresh: await targetIsFresh(stagingDir, jobId),
    gpuInferenceStarted: false,
  }, null, 2));
} else {
  await assertFreshTarget(stagingDir, jobId);
  await runDelegated(delegatedArgs);
}

function argument(name) {
  const equalsPrefix = `${name}=`;
  const equalsValue = process.argv.find((value) => value.startsWith(equalsPrefix));
  if (equalsValue) {
    const value = equalsValue.slice(equalsPrefix.length);
    return value || undefined;
  }
  const index = process.argv.indexOf(name);
  const value = index < 0 ? undefined : process.argv[index + 1];
  return value?.startsWith('--') ? undefined : value;
}

function integerArgument(name, fallback) {
  const value = argument(name);
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new Error(`${name} must be a non-negative safe integer`);
  }
  return parsed;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function safe(value) {
  if (!/^[a-z0-9][a-z0-9._-]{0,95}$/iu.test(value)) throw new Error('--job-id must be a filesystem-safe staging identifier');
  return value;
}

function canvasString({ width, height }) {
  return `${width}x${height}`;
}

function rejectLegacyParameters() {
  const legacy = [
    '--canvas', '--denoise', '--steps', '--detail-staging',
    '--pre-upscale-model', '--pre-upscale-input-scale',
    '--post-style-lora', '--post-style-strength',
  ];
  const supplied = legacy.find((name) => process.argv.includes(name) || process.argv.some((value) => value.startsWith(`${name}=`)));
  if (supplied) {
    throw new Error(`${supplied} is retired; canonical production now delegates the contract-bound two-stage high-frequency route`);
  }
}

async function runDelegated(args) {
  await new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, args, { cwd: root, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) => code === 0
      ? resolveRun()
      : reject(new Error(`canonical delegated Krea2 job exited with ${code ?? signal}`)));
  });
}

async function targetIsFresh(stagingDirectory, id) {
  const suffixes = ['.receipt.json', '.workflow.json', '.input.png', '.rgb.png', '.png', '.direct-review.json'];
  const existing = [];
  for (const suffix of suffixes) {
    const path = resolve(stagingDirectory, `${id}${suffix}`);
    try { await access(path, constants.F_OK); existing.push(path); } catch { /* absent */ }
  }
  return existing.length === 0;
}

async function assertFreshTarget(stagingDirectory, id) {
  if (!(await targetIsFresh(stagingDirectory, id))) {
    throw new Error(`canonical Krea2 job target already exists for ${id}; use a new job ID to preserve prior receipt evidence`);
  }
}

function assertContract(value) {
  if (value?.schemaVersion !== 1 || value.kind !== 'krea2-canonical-production-contract'
    || value.authority?.geometry !== 'canonical-rgba' || value.authority?.material !== 'krea2-rgb'
    || value.render?.method !== 'canonical-latent-origin-six-lora-restyle'
    || value.render?.alphaPolicy !== 'canonical-alpha-restored-after-krea2-rgb-render'
    || value.canonicalRunner?.delegatesTo !== 'scripts/run-krea2-albina-staged-high-frequency.mjs'
    || value.canonicalRunner?.route !== 'albina-staged-high-frequency-v1'
    || value.canonicalRunner?.freshJobTargetRequired !== true) {
    throw new Error('Krea2 canonical production contract is invalid');
  }
  const expected = [
    ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
    ['Krea2Rella_c1-st8000.safetensors', 0.65],
    ['onineko_k2_v1.safetensors', 0.45],
    ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
    ['masterpieces-v51.safetensors', 0.45],
    ['ichika-k2_c1-st5000.safetensors', 0.35],
  ];
  if (JSON.stringify(value.styleLoras?.map(({ name, strength }) => [name, strength])) !== JSON.stringify(expected)) {
    throw new Error('Krea2 canonical production contract changed the locked six-LoRA order or strengths');
  }
  const highFrequency = value.highFrequencyStaging;
  if (highFrequency?.stage1?.denoise !== 0.12 || highFrequency?.stage1?.steps !== 28
    || highFrequency?.stage2?.denoise !== 0.07 || highFrequency?.stage2?.steps !== 24) {
    throw new Error('Krea2 canonical production contract changed the accepted high-frequency sampling profile');
  }
}
