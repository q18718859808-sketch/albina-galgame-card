#!/usr/bin/env node
/** Focused static contract check for the review-gated Albina variant queue. */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const indexPath = resolve(projectRoot, 'content/media-production/albina-variant-source-index-v1.json');
const queuePath = resolve(projectRoot, 'content/media-production/albina-staged-variant-queue-v1.json');
const sourcePath = resolve(projectRoot, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const expectedChain = [
  ['z3zz4-k2-4_c1-st5000.safetensors', 0.55], ['Krea2Rella_c1-st8000.safetensors', 0.65],
  ['onineko_k2_v1.safetensors', 0.45], ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
  ['masterpieces-v51.safetensors', 0.45], ['ichika-k2_c1-st5000.safetensors', 0.35],
];
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const index = JSON.parse(await readFile(indexPath, 'utf8'));
const queue = JSON.parse(await readFile(queuePath, 'utf8'));
const sourceHash = sha256(await readFile(sourcePath));
if (index.canonicalSource?.sha256 !== sourceHash) throw new Error('Albina canonical source hash mismatch');
if (index.canonicalSource?.role !== 'sole-content-and-latent-origin') throw new Error('Albina canonical source role is not exclusive');
if (JSON.stringify(index.productionContract?.fixedSixLoraChainRequired) !== 'true') throw new Error('fixed six-LoRA gate is absent');
if (index.productionContract?.forbiddenInputs?.length < 6) throw new Error('variant forbidden-input boundary is incomplete');
const variants = index.variants ?? [];
if (variants.length !== 11) throw new Error('Albina variant count must be exactly 11');
if (queue.profile !== 'albina-staged-high-frequency-v1' || queue.canonicalSourceSha256 !== sourceHash || queue.variants?.length !== 11) {
  throw new Error('Albina staged variant queue is incomplete or detached from the canonical source');
}
const profile = index.productionContract?.structureLock;
if (profile?.stage1?.denoise !== 0.12 || profile?.stage1?.steps !== 28 || profile?.stage2?.denoise !== 0.07 || profile?.stage2?.steps !== 24) {
  throw new Error('Albina staged high-frequency profile mismatch');
}
for (const entry of variants) {
  if (!/^[a-z0-9-]+$/u.test(entry.jobId) || entry.target !== `characters/albina/${entry.jobId.slice('albina-'.length)}.png`) {
    throw new Error(`variant index target mismatch: ${entry.jobId}`);
  }
  if (entry.productionStatus !== 'pending-krea2-six-lora-rerender') throw new Error(`unexpected variant production state: ${entry.jobId}`);
  if (entry.researchReference?.role !== 'research-only-not-sent-to-canonical-production') throw new Error(`AU reference role is unsafe: ${entry.jobId}`);
  const queued = queue.variants.find((candidate) => candidate.jobId === entry.jobId);
  if (!queued || queued.source !== index.canonicalSource.path || !queued.outputId?.startsWith(`${entry.jobId}-staged-hf-`)) throw new Error(`queue binding missing: ${entry.jobId}`);
  if (typeof queued.prompt !== 'string' || queued.prompt.length < 400 || !queued.prompt.includes(`State variant only: ${entry.jobId.slice('albina-'.length)}`)) throw new Error(`state prompt missing: ${entry.jobId}`);
  if (!queued.prompt.includes('sole content and latent origin') || !queued.prompt.includes('No AU, identity edit, second reference')) throw new Error(`canonical-only prompt boundary missing: ${entry.jobId}`);
  if (typeof queued.negative !== 'string' || !queued.negative.includes('child') || !queued.negative.includes('blurry')) throw new Error(`negative prompt missing: ${entry.jobId}`);
}
const baseline = JSON.parse(await readFile(resolve(projectRoot, 'content/media-production/krea2-verified-baseline-v1.json'), 'utf8'));
if (JSON.stringify(baseline.styleLoraChain.map(({ name, strength }) => [name, strength])) !== JSON.stringify(expectedChain)) throw new Error('fixed six-LoRA baseline drift');
console.log(JSON.stringify({ ok: true, route: index.productionContract.route, variants: variants.length, canonicalSourceSha256: sourceHash, sixLoraChain: expectedChain.length }, null, 2));
