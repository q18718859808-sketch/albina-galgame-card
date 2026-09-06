#!/usr/bin/env node
/**
 * Persist a compact, evidence-linked production checkpoint.
 * This is intentionally read-only with respect to assets: it records current
 * state and blockers so production can resume without repeating discovery.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const paths = {
  baseline: 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json',
  queue: 'staging/media/krea2-canonical-restyle/krea2-promotion-queue-v1.json',
  worldbooks: 'content/worldbook/albina-worldbook-packages-v1.manifest.json',
  release: 'dist/albina-galgame-card/release-status.json',
};
const [baseline, queue, worldbooks, release] = await Promise.all(Object.values(paths).map((path) => readJson(path)));
const snapshot = {
  schemaVersion: 1,
  id: 'albina-production-state-snapshot-v1',
  generatedAt: new Date().toISOString(),
  policy: {
    noAutomaticPromotion: true,
    noGpuExecution: true,
    directImageReviewRequired: true,
    finalFullSuiteDeferredUntilAllModulesLand: true,
  },
  krea2Baseline: {
    workflow: baseline.workflow,
    topology: baseline.runtime?.topologySha256 ?? null,
    model: baseline.executionContract?.model ?? null,
    textEncoder: baseline.executionContract?.textEncoder ?? null,
    vae: baseline.executionContract?.vae ?? null,
    sampler: baseline.executionContract?.sampler ?? null,
    scheduler: baseline.executionContract?.scheduler ?? null,
    steps: baseline.executionContract?.steps ?? null,
    loraChain: baseline.executionContract?.loraChain ?? [],
    endpoint: baseline.comfyui?.endpoint ?? null,
  },
  promotionQueue: {
    source: paths.queue,
    counts: queue.counts,
    total: queue.entries?.length ?? 0,
  },
  worldbooks: {
    source: paths.worldbooks,
    l0Entries: worldbooks.l0?.entryCount ?? 0,
    substantiveCandidates: worldbooks.invariants?.substantiveCandidates ?? 0,
    packages: (worldbooks.packages ?? []).map((item) => ({ id: item.id, entryCount: item.entryCount, defaultEnabled: item.defaultEnabled })),
  },
  release: {
    version: release.version,
    completeEdition: release.completeEdition,
    blockers: release.completionBlockers ?? [],
  },
  nextAction: 'Produce only entries in the Krea2 queue with status reproduce, then directly inspect each output before any receipt promotion.',
};
const output = resolve(root, 'staging/media/production-state-snapshot-v1.json');
await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ output, baseline: snapshot.krea2Baseline.workflow.sha256, queue: snapshot.promotionQueue.counts, blockers: snapshot.release.blockers.length }, null, 2));

async function readJson(path) {
  return JSON.parse((await readFile(resolve(root, path), 'utf8')).replace(/^\uFEFF/u, ''));
}
