#!/usr/bin/env node
/**
 * Rebuild the canonical-restyle ledger from the receipts on disk.
 *
 * Parallel batch runs each hold their own in-memory ledger copy, so the shared
 * ledger file can lose entries. Receipts are the authoritative per-asset record,
 * so the ledger is derived from them and previously recorded direct-review
 * verdicts are carried over when the candidate hash still matches.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-canonical-restyle');
const ledgerPath = resolve(stagingRoot, 'restyle-ledger-v1.json');
const groups = ['characters', 'backgrounds', 'cg', 'auxiliary'];

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function loadJobIndex() {
  const module = await import('./krea2-canonical-restyle-batch.mjs?index=1').catch(() => null);
  return module?.JOBS ?? null;
}

async function main() {
  const previous = (await exists(ledgerPath)) ? await readJson(ledgerPath) : { entries: {} };
  const jobs = await loadJobIndex();
  const jobById = new Map((jobs ?? []).map((job) => [job.id, job]));
  const entries = {};

  for (const group of groups) {
    const dir = resolve(stagingRoot, group);
    if (!(await exists(dir))) continue;
    for (const name of await readdir(dir)) {
      if (!name.endsWith('.receipt.json')) continue;
      const receipt = await readJson(resolve(dir, name));
      if (receipt.status !== 'completed') continue;
      const reference = receipt.references?.inputs?.[0] ?? receipt.referenceInputs?.[0];
      const jobId = name.replace('.receipt.json', '');
      const id = jobId.replace(/^restyle_/u, '').replaceAll('_', '-');
      const outputPath = receipt.output.finalPath;
      const outputSha = sha256(await readFile(outputPath));
      const job = jobById.get(id);
      const carried = previous.entries?.[id];
      const reviewPath = `${outputPath.replace(/\.png$/u, '')}.direct-review.json`;
      let onDisk;
      if (await exists(reviewPath)) {
        const candidate = await readJson(reviewPath);
        if (candidate.candidateSha256 === outputSha) onDisk = { path: reviewPath, review: candidate };
      }
      const reviewValid = onDisk?.review.status === 'accepted'
        || (carried?.directReview === 'accepted' && carried.outputSha256 === outputSha);
      const structureLock = receipt.productionContract?.structureLock === true;
      const v2Production = receipt.method === 'krea2-latent-origin-canonical-restyle-v2'
        && receipt.productionContract?.canonicalLatentOrigin === true
        && receipt.productionContract?.sixLoraBaselineRequired === true
        && receipt.effectiveSampling?.schedulerSteps >= 20
        && (structureLock
          || ['4x_fatal_Anime_500000_G.pth', '4x-UltraSharp.pth'].includes(receipt.effectiveSampling?.preUpscale?.model)
          || receipt.effectiveSampling?.structuralControl?.kind === 'depth');
      entries[id] = {
        group,
        source: reference?.file ?? '',
        target: job?.target ?? carried?.target ?? null,
        denoise: receipt.denoise,
        steps: receipt.effectiveSampling?.schedulerSteps ?? job?.steps ?? null,
        productionEvidence: {
          contract: receipt.method,
          canonicalContentSource: reference?.file ?? '',
          canonicalOnly: job?.group === 'albina-variants',
          fixedSixLoraChainRequired: receipt.productionContract?.sixLoraBaselineRequired === true,
          styleLoraOrder: receipt.styleChain?.map((entry) => entry.nodeId ?? null) ?? [],
          structureLock,
          promptSha256: receipt.promptSha256 ?? null,
          workflowSha256: receipt.workflow?.baselineSha256 ?? null,
          topologySha256: receipt.workflow?.topologySha256 ?? null,
        },
        structuralControl: receipt.effectiveSampling?.structuralControl ?? null,
        preUpscale: receipt.effectiveSampling?.preUpscale ?? null,
        seed: receipt.seed,
        scale: job?.scale ?? carried?.scale ?? null,
        sourceSha256: reference?.sha256,
        outputSha256: outputSha,
        outputPath,
        receiptPath: resolve(dir, name),
        width: receipt.resolution?.width,
        height: receipt.resolution?.height,
        alphaRestored: Boolean(receipt.output.alphaRestored),
        directReview: reviewValid ? 'accepted' : (onDisk?.review.status ?? (carried?.outputSha256 === outputSha ? carried.directReview ?? 'pending' : 'pending')),
        productionVersion: v2Production
          ? (structureLock ? 'v2-structure-lock-20step' : (receipt.effectiveSampling?.preUpscale ? 'v2-anime-pre-upscale-24step' : 'v2-depth-20step'))
          : 'legacy-or-unqualified',
        // A direct human review is necessary but never grants release
        // promotion. Rights and the explicit release policy remain separate
        // gates and must be evaluated by the delivery pipeline.
        promotionAllowed: false,
        directReviewPath: reviewValid ? (onDisk?.path ?? carried?.directReviewPath) : undefined,
        directReviewedAt: reviewValid ? (onDisk?.review.reviewedAt ?? carried?.directReviewedAt) : undefined,
        producedAt: receipt.createdAt ?? carried?.producedAt,
      };
    }
  }

  const ledger = {
    schemaVersion: 1,
    method: 'krea2-latent-origin-canonical-restyle',
    rebuiltFrom: 'per-asset receipts on disk',
    rebuiltAt: new Date().toISOString(),
    entries: Object.fromEntries(Object.entries(entries).sort(([a], [b]) => (a < b ? -1 : 1))),
  };
  await writeFile(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
  const accepted = Object.values(ledger.entries).filter((entry) => entry.promotionAllowed).length;
  console.log(`${Object.keys(ledger.entries).length} entries, ${accepted} accepted -> ${ledgerPath}`);
}

await main();
