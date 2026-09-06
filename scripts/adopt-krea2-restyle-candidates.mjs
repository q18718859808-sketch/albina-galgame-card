#!/usr/bin/env node
/**
 * Adopt directly reviewed Krea2 restyle candidates into the canonical asset
 * tree while keeping the release rights gate closed. This is deliberately
 * separate from the final release promotion command: a reviewed render may
 * become the current local candidate without becoming redistributable.
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { relative, resolve } from 'node:path';
import { workflowTopologySha256 } from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const ledgerPath = resolve(projectRoot, 'staging/media/krea2-canonical-restyle/restyle-ledger-v1.json');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-canonical-restyle');
const assetRoot = resolve(projectRoot, 'dist/albina-galgame-card/assets');
const receiptRoot = resolve(projectRoot, 'content/media-receipts');
const hashPattern = /^[a-f0-9]{64}$/iu;
const fixedLoras = [
  ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
  ['Krea2Rella_c1-st8000.safetensors', 0.65],
  ['onineko_k2_v1.safetensors', 0.45],
  ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
  ['masterpieces-v51.safetensors', 0.45],
  ['ichika-k2_c1-st5000.safetensors', 0.35],
];
const embeddedBaselineBinding = {
  workflowPath: 'staging/media/embedded-baseline/embedded-production-baseline.api.json',
  evidencePath: 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json',
};
const embeddedWorkflowBytes = await readFile(resolve(projectRoot, embeddedBaselineBinding.workflowPath));
const embeddedEvidenceBytes = await readFile(resolve(projectRoot, embeddedBaselineBinding.evidencePath));
const currentEmbeddedBaseline = {
  ...embeddedBaselineBinding,
  workflowSha256: sha256(embeddedWorkflowBytes),
  evidenceSha256: sha256(embeddedEvidenceBytes),
  topologySha256: workflowTopologySha256(JSON.parse(embeddedWorkflowBytes.toString('utf8').replace(/^\uFEFF/u, ''))),
};
const stagingAnchors = {
  'albina-canonical-krea2-staged-hf-ab1': { target: 'characters/albina/normal.png', file: 'albina-canonical-krea2-staged-hf-ab1' },
  'albina-armored-krea2-staged-hf-v1': { target: 'characters/albina/armored.png', file: 'albina-armored-krea2-staged-hf-v1' },
  'albina-canonical-single-pass-v1': { target: 'characters/albina/normal.png', file: 'albina-canonical-single-pass-v1' },
};

const ids = process.argv.slice(2).filter((value) => !value.startsWith('--'));
if (ids.length === 0) throw new Error('Usage: node scripts/adopt-krea2-restyle-candidates.mjs <ledger-id> [<ledger-id> ...]');

const ledger = JSON.parse(await readFile(ledgerPath, 'utf8'));
const results = [];
for (const id of ids) results.push(await adopt(id, ledger.entries?.[id]));
console.log(JSON.stringify({ adopted: results }, null, 2));

async function adopt(id, entry) {
  if (stagingAnchors[id]) return adoptStagingAnchor(id, stagingAnchors[id]);
  if (!entry || entry.directReview !== 'accepted') throw new Error(`${id} is not directly accepted in the restyle ledger`);
  if (entry.promotionAllowed === true) throw new Error(`${id} has an invalid promotionAllowed=true staging record`);
  if (typeof entry.target !== 'string' || !/^(?:bg|cg|characters)\/[a-z0-9._-]+(?:\/[a-z0-9._-]+)*\.(?:jpg|jpeg|png)$/iu.test(entry.target)) {
    throw new Error(`${id} has no safe canonical target`);
  }
  const receiptPath = stagingPath(entry.receiptPath, entry.outputPath, '.receipt.json');
  const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
  assertReceipt(id, entry, receipt);
  assertCurrentEmbeddedBaseline(id, receipt);
  const reviewPath = stagingPath(entry.directReviewPath, entry.outputPath, '.direct-review.json');
  const review = JSON.parse(await readFile(reviewPath, 'utf8'));
  if (review.status !== 'accepted' || review.promotionAllowed === true || review.candidateSha256 !== entry.outputSha256) {
    throw new Error(`${id} direct review is missing, stale, or incorrectly allows promotion`);
  }
  const source = stagingPath(entry.outputPath, entry.outputPath, '');
  const bytes = await readFile(source);
  const artifactSha256 = sha256(bytes);
  if (artifactSha256 !== entry.outputSha256 || artifactSha256 !== review.candidateSha256) throw new Error(`${id} output hash does not match ledger and review`);
  const destination = resolveChild(assetRoot, entry.target);
  await mkdir(resolve(destination, '..'), { recursive: true });
  await copyFile(source, destination);
  const promotion = {
    version: 1,
    assetId: fileId(entry.target),
    artifactSha256,
    provenance: {
      provider: 'comfyui-local-krea2',
      model: 'redcraft23FP8_30Krea2.safetensors',
      promptVersion: 'albina-krea2-canonical-restyle-v2',
      sourceJobHash: sha256(JSON.stringify({ id, receipt, review })),
      ...((receipt.baseline ?? receipt.workflow)?.workflowSha256
        && (receipt.baseline ?? receipt.workflow)?.topologySha256
        && (receipt.baseline ?? receipt.workflow)?.evidenceSha256 ? {
        baseline: {
          ...embeddedBaselineBinding,
          workflowSha256: (receipt.baseline ?? receipt.workflow).workflowSha256 ?? (receipt.baseline ?? receipt.workflow).baselineSha256,
          evidenceSha256: (receipt.baseline ?? receipt.workflow).evidenceSha256,
          topologySha256: (receipt.baseline ?? receipt.workflow).topologySha256,
        },
      } : {}),
      review: { status: 'approved', reviewer: review.reviewer, reviewedAt: review.reviewedAt },
    },
    rights: {
      status: 'unverified', sourceType: 'model-output', redistribution: 'unverified',
      rightsBasis: 'Directly reviewed local Krea2 output; redistribution terms remain unverified.',
    },
    lineage: {
      kind: 'derivative', processVersion: 'albina-krea2-restyle-adoption-v1',
      inputs: [{ sha256: entry.sourceSha256, role: 'canonical-visual-source' }],
    },
  };
  const outputReceipt = resolveChild(receiptRoot, `${safe(id)}.json`);
  await mkdir(resolve(outputReceipt, '..'), { recursive: true });
  await writeFile(outputReceipt, `${JSON.stringify(promotion, null, 2)}\n`, 'utf8');
  return { id, assetId: promotion.assetId, target: entry.target, artifactSha256, rights: 'unverified', promotionAllowed: false };
}

async function adoptStagingAnchor(id, anchor) {
  const base = resolve(projectRoot, 'staging/media/krea2-canonical-production/characters', anchor.file);
  const receipt = JSON.parse(await readFile(`${base}.receipt.json`, 'utf8'));
  const review = JSON.parse(await readFile(`${base}.direct-review.json`, 'utf8'));
  const bytes = await readFile(`${base}.png`);
  const artifactSha256 = sha256(bytes);
  if (receipt.provider !== 'comfyui-local-krea2' || receipt.model !== 'redcraft23FP8_30Krea2.safetensors') throw new Error(`${id} is not a local Krea2 receipt`);
  const loraChain = receipt.material?.loraChain ?? receipt.loraChain;
  if (JSON.stringify(loraChain?.map((lora) => [lora.name, lora.strength])) !== JSON.stringify(fixedLoras)) throw new Error(`${id} does not prove the fixed six-LoRA chain`);
  if (review.status !== 'accepted' && review.status !== 'accepted-as-staging-anchor' && review.status !== 'accepted-as-staging-asset') throw new Error(`${id} has no direct accepted review`);
  if (review.promotionAllowed === true || review.candidateSha256 !== artifactSha256) throw new Error(`${id} review is stale or allows promotion`);
  if (receipt.output?.sha256 !== artifactSha256 || !hashPattern.test(receipt.source?.sha256 ?? '')) throw new Error(`${id} output/source hash binding is incomplete`);
  assertCurrentEmbeddedBaseline(id, receipt);
  const destination = resolveChild(assetRoot, anchor.target);
  await mkdir(resolve(destination, '..'), { recursive: true });
  await copyFile(`${base}.png`, destination);
  const promotion = {
    version: 1, assetId: fileId(anchor.target), artifactSha256,
    provenance: {
      provider: 'comfyui-local-krea2', model: 'redcraft23FP8_30Krea2.safetensors',
      promptVersion: receipt.profile ?? 'albina-krea2-staged-high-frequency-v1',
      sourceJobHash: sha256(JSON.stringify(receipt)),
      ...((receipt.baseline ?? receipt.workflow)?.workflowSha256
        && (receipt.baseline ?? receipt.workflow)?.topologySha256
        && (receipt.baseline ?? receipt.workflow)?.evidenceSha256 ? {
        baseline: {
          ...embeddedBaselineBinding,
          workflowSha256: (receipt.baseline ?? receipt.workflow).workflowSha256 ?? (receipt.baseline ?? receipt.workflow).baselineSha256,
          evidenceSha256: (receipt.baseline ?? receipt.workflow).evidenceSha256,
          topologySha256: (receipt.baseline ?? receipt.workflow).topologySha256,
        },
      } : {}),
      review: { status: 'approved', reviewer: review.reviewer, reviewedAt: receipt.createdAt ?? new Date().toISOString() },
    },
    rights: { status: 'unverified', sourceType: 'model-output', redistribution: 'unverified', rightsBasis: 'Directly reviewed local Krea2 output; redistribution terms remain unverified.' },
    lineage: { kind: 'derivative', processVersion: 'albina-krea2-staged-anchor-adoption-v1', inputs: [{ sha256: receipt.source.sha256, role: 'canonical-visual-source' }] },
  };
  const outputReceipt = resolveChild(receiptRoot, `${safe(id)}.json`);
  await mkdir(resolve(outputReceipt, '..'), { recursive: true });
  await writeFile(outputReceipt, `${JSON.stringify(promotion, null, 2)}\n`, 'utf8');
  return { id, assetId: promotion.assetId, target: anchor.target, artifactSha256, rights: 'unverified', promotionAllowed: false };
}

function assertReceipt(id, entry, receipt) {
  if (receipt.provider !== 'comfyui-local-krea2' || receipt.model !== 'redcraft23FP8_30Krea2.safetensors') throw new Error(`${id} is not a local Krea2 receipt`);
  const chain = receipt.styleChain ?? receipt.material?.loraChain ?? receipt.loraChain;
  const sixLoraProven = receipt.productionContract?.sixLoraBaselineRequired === true
    || (Array.isArray(chain) && chain.length === 6);
  if (!sixLoraProven
    || JSON.stringify(chain?.map((lora) => [lora.name, lora.strength])) !== JSON.stringify(fixedLoras)) throw new Error(`${id} does not prove the fixed six-LoRA chain`);
  if (receipt.output?.finalSha256 !== entry.outputSha256 || !hashPattern.test(entry.sourceSha256)) throw new Error(`${id} receipt hash binding is incomplete`);
}

function assertCurrentEmbeddedBaseline(id, receipt) {
  const workflow = receipt.baseline ?? receipt.workflow;
  if (!workflow || (workflow.workflowPath ?? workflow.path)?.replaceAll('\\', '/') !== currentEmbeddedBaseline.workflowPath
    || (workflow.baselineSha256 ?? workflow.workflowSha256) !== currentEmbeddedBaseline.workflowSha256
    || workflow.evidencePath?.replaceAll('\\', '/') !== currentEmbeddedBaseline.evidencePath
    || workflow.evidenceSha256 !== currentEmbeddedBaseline.evidenceSha256
    || workflow.topologySha256 !== currentEmbeddedBaseline.topologySha256) {
    throw new Error(`${id} is not bound to the current embedded Krea2 baseline`);
  }
}

function resolveChild(root, child) {
  const target = resolve(root, child);
  const local = relative(root, target).replaceAll('\\', '/');
  if (!child || local !== child || local.startsWith('../') || local.includes('/../') || child.includes(':') || child.startsWith('/')) throw new Error(`Unsafe adoption path: ${child}`);
  return target;
}

function stagingPath(declared, fallbackOutput, suffix) {
  const value = typeof declared === 'string' && declared.length > 0 ? declared : fallbackOutput;
  const normalized = value.replaceAll('\\', '/');
  const marker = '/staging/media/krea2-canonical-restyle/';
  const index = normalized.lastIndexOf(marker);
  if (index < 0) throw new Error(`Path is outside the Krea2 staging root: ${value}`);
  const relativePath = normalized.slice(index + marker.length);
  if (suffix && !relativePath.endsWith(suffix)) return resolve(stagingRoot, `${relativePath}${suffix}`);
  return resolveChild(stagingRoot, relativePath);
}

function fileId(path) { return `file.${path.toLowerCase().replace(/[^a-z0-9]+/gu, '.').replace(/^\.|\.$/gu, '')}`; }
function safe(value) { return value.replaceAll(/[^a-z0-9._-]/giu, '-'); }
function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
