#!/usr/bin/env node
/**
 * Build a no-GPU promotion queue from existing Krea2 receipts and reviews.
 * This is a scheduling artifact, not a promotion command: every item remains
 * blocked until the independent rights and release gates pass.
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { workflowTopologySha256 } from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const ledgerPath = resolve(root, 'staging/media/krea2-canonical-restyle/restyle-ledger-v1.json');
const manifestPath = resolve(root, 'content/asset-manifest-v2.json');
const workflowPath = resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline.api.json');
const baselineEvidencePath = resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json');
const provenanceReceiptRoot = resolve(root, 'content/media-receipts');
const outputPath = resolve(root, 'staging/media/krea2-canonical-restyle/krea2-promotion-queue-v1.json');
const stagingAnchorIds = new Set([
  'albina-canonical-single-pass-v1',
  'albina-canonical-krea2-staged-hf-ab1',
  'albina-armored-krea2-staged-hf-v1',
]);

const [ledger, manifest, baselineEvidence, workflowBytes, evidenceBytes, provenanceReceipts] = await Promise.all([
  readJson(ledgerPath), readJson(manifestPath), readJson(baselineEvidencePath),
  readFile(workflowPath), readFile(baselineEvidencePath), loadKrea2ProvenanceReceipts(),
]);
const workflow = JSON.parse(workflowBytes.toString('utf8').replace(/^\uFEFF/u, ''));
const currentBaseline = {
  workflowPath: 'staging/media/embedded-baseline/embedded-production-baseline.api.json',
  workflowSha256: sha256(workflowBytes),
  evidencePath: 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json',
  evidenceSha256: sha256(evidenceBytes),
  topologySha256: workflowTopologySha256(workflow),
};
if (baselineEvidence.verified !== true
  || resolve(baselineEvidence.workflow?.path ?? '') !== workflowPath
  || baselineEvidence.workflow?.sha256 !== currentBaseline.workflowSha256
  || baselineEvidence.runtime?.topologySha256 !== currentBaseline.topologySha256) {
  throw new Error('Embedded Krea2 baseline evidence is stale or does not match the current workflow');
}
// Character portraits live in manifest.portraits while scene media lives in
// manifest.assets. Treat both as release targets when joining the ledger.
const manifestByPath = new Map([
  ...(manifest.assets ?? []),
  ...(manifest.portraits ?? []),
].map((asset) => [asset.path, asset]));
const entries = Object.entries(ledger.entries ?? {}).filter(([id]) => !stagingAnchorIds.has(id)).map(([id, entry]) => {
  const asset = entry.target ? manifestByPath.get(entry.target) : undefined;
  const reasons = [];
  const receipt = asset ? provenanceReceipts.get(asset.id) : undefined;
  const receiptArtifactMatches = Boolean(receipt && receipt.artifactSha256 === asset.sha256);
  const receiptBaselineBound = receiptArtifactMatches && hasCurrentBaselineBinding(receipt.provenance?.baseline);
  const manifestBaselineBound = Boolean(asset && hasCurrentBaselineBinding(asset.provenance?.baseline));
  if (entry.productionEvidence?.workflowSha256 !== currentBaseline.workflowSha256) reasons.push('reproduce-with-current-embedded-baseline');
  if (entry.directReview !== 'accepted') reasons.push('direct-original-resolution-review-required');
  if (entry.promotionAllowed !== false) reasons.push('invalid-promotion-state');
  if (!asset) reasons.push('manifest-target-missing');
  else {
    if (asset.rights?.status !== 'verified' || asset.rights?.redistribution !== 'allowed') reasons.push('rights-review-required');
    if (!asset.lineage) reasons.push('lineage-required');
    if (asset.provenance?.provider !== 'comfyui-local-krea2') reasons.push('current-krea2-provenance-required');
    if (!receiptBaselineBound) reasons.push('current-krea2-receipt-baseline-binding-required');
    if (!manifestBaselineBound) reasons.push('manifest-baseline-binding-required');
  }
  const status = reasons.length === 0 ? 'ready-for-independent-release-review' : entry.directReview === 'rejected'
    ? 'reproduce' : entry.directReview === 'accepted' ? 'rights-or-provenance' : 'human-review';
  return {
    id, group: entry.group, target: entry.target ?? null, source: entry.source,
    productionVersion: entry.productionVersion, directReview: entry.directReview,
    outputSha256: entry.outputSha256,
    baselineWorkflowSha256: entry.productionEvidence?.workflowSha256 ?? null,
    currentBaselineSha256: currentBaseline.workflowSha256,
    currentBaseline: {
      ...currentBaseline,
      receiptBaselineBound,
      manifestBaselineBound,
      receiptArtifactMatches,
    },
    status, reasons,
  };
}).sort((left, right) => left.id.localeCompare(right.id));

const queue = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  method: 'ledger-manifest-review-rights-evidence-queue',
  policy: {
    noGpuExecution: true, noAutomaticPromotion: true,
    directImageReviewRequired: true, rightsReviewRequired: true,
    currentBaseline: currentBaseline.workflowPath,
    currentBaselineBinding: currentBaseline,
  },
  counts: Object.fromEntries(['reproduce', 'human-review', 'rights-or-provenance', 'ready-for-independent-release-review']
    .map((status) => [status, entries.filter((entry) => entry.status === status).length])),
  entries,
};
await writeFile(outputPath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ outputPath, total: entries.length, counts: queue.counts }, null, 2));

async function readJson(path) {
  return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
}

async function loadKrea2ProvenanceReceipts() {
  const receipts = new Map();
  for (const name of await readdir(provenanceReceiptRoot)) {
    if (!name.endsWith('.json')) continue;
    const receipt = await readJson(resolve(provenanceReceiptRoot, name));
    if (receipt.provenance?.provider !== 'comfyui-local-krea2') continue;
    if (receipts.has(receipt.assetId)) throw new Error(`Duplicate Krea2 provenance receipt for ${receipt.assetId}`);
    receipts.set(receipt.assetId, receipt);
  }
  return receipts;
}

function hasCurrentBaselineBinding(binding) {
  return Boolean(binding
    && binding.workflowPath === currentBaseline.workflowPath
    && binding.workflowSha256 === currentBaseline.workflowSha256
    && binding.evidencePath === currentBaseline.evidencePath
    && binding.evidenceSha256 === currentBaseline.evidenceSha256
    && binding.topologySha256 === currentBaseline.topologySha256);
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}
