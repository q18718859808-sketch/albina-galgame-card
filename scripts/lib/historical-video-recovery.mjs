import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

import { parsePromotionReceipt } from './promotion-receipts.mjs';

const hashPattern = /^[a-f0-9]{64}$/u;

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object' && !Buffer.isBuffer(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function canonicalJobHash(value) {
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) return createHash('sha256').update(value).digest('hex');
  return createHash('sha256').update(canonicalJson(value), 'utf8').digest('hex');
}

function posix(value) { return String(value).replaceAll('\\', '/'); }
function outputName(path) { return basename(posix(path)); }

async function readArtifact(path, dependencies) {
  return dependencies.readArtifact ? dependencies.readArtifact(path) : readFile(path);
}

async function writeJson(path, value, dependencies) {
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
  const existing = await dependencies.readOptional?.(path) ?? null;
  if (existing && !existing.equals(bytes)) throw new Error(`Historical recovery receipt conflict: ${path}`);
  if (!existing) {
    if (dependencies.checkOnly) throw new Error(`Historical recovery artifact is missing: ${path}`);
    await mkdir(resolve(path, '..'), { recursive: true });
    await (dependencies.writeArtifact ? dependencies.writeArtifact(path, bytes) : writeFile(path, bytes));
    return true;
  }
  return false;
}

function receipt(asset, masterSha, sourceJobHash, reviewedAt) {
  return parsePromotionReceipt({
    version: 1, assetId: asset.assetId, artifactSha256: asset.sha256,
    provenance: {
      provider: 'pie', model: 'seedance-1.5-pro', promptVersion: 'albina-video-v1', sourceJobHash,
      review: { status: 'approved', reviewer: 'historical-pie-video-qc-recovery', reviewedAt },
    },
    rights: { status: 'unverified', sourceType: 'model-output', redistribution: 'unverified', rightsBasis: 'Historical provider output; redistribution terms were not independently verified.' },
    lineage: { kind: 'transcode', processVersion: 'albina-historical-pie-video-recovery-v1', inputs: [
      { sha256: sourceJobHash, role: 'historical-pie-job-contract' },
      { sha256: masterSha, role: 'seedance-master' },
    ] },
  });
}

export async function recoverHistoricalVideos(input, dependencies = {}) {
  const plan = input.plan;
  const ledger = input.ledger;
  const manifest = input.manifest ?? { assets: [] };
  if (!plan || plan.version !== 2 || plan.projectId !== 'albina-galgame-card' || !Array.isArray(plan.videoJobs)) throw new Error('Invalid historical video recovery plan');
  if (!ledger?.jobs || typeof ledger.jobs !== 'object') throw new Error('Invalid historical video ledger');
  const manifestByPath = new Map((manifest.assets ?? []).map((asset) => [posix(asset.path), asset]));
  const evidence = [];
  const receipts = [];
  for (const job of plan.videoJobs) {
    const historical = await input.loadHistoricalJob(job);
    if (!historical || historical.kind !== 'video') throw new Error(`Missing historical video job: ${job.id}`);
    const sourceJobHash = canonicalJobHash(historical);
    const ledgerJobId = `job_${sourceJobHash.slice(0, 32)}`;
    const record = ledger.jobs[ledgerJobId];
    if (!record || record.status !== 'completed' || typeof record.providerJobId !== 'string' || record.providerJobId.trim() === '') throw new Error(`Historical ledger lacks completed providerJobId: ${job.id}`);
    const masterName = outputName(historical.masterOutput);
    const runtimeName = outputName(historical.output);
    const desktopName = outputName(historical.desktopOutput);
    if (runtimeName !== outputName(job.runtime.path) || desktopName !== outputName(job.desktop.path) || masterName !== runtimeName) throw new Error(`Historical output contract mismatch: ${job.id}`);
    const masterPath = join(input.stagingRoot, 'master', masterName);
    const runtimePath = join(input.stagingRoot, 'runtime', runtimeName);
    const desktopPath = join(input.stagingRoot, 'desktop', desktopName);
    const packaged = [
      { variant: 'runtime', asset: job.runtime, path: resolve(input.assetRoot, job.runtime.path), staging: runtimePath },
      { variant: 'desktop', asset: job.desktop, path: resolve(input.assetRoot, job.desktop.path), staging: desktopPath },
    ];
    const masterBytes = await readArtifact(masterPath, dependencies);
    const masterSha = canonicalJobHash(masterBytes);
    for (const item of packaged) {
      const [stagedBytes, packagedBytes] = await Promise.all([readArtifact(item.staging, dependencies), readArtifact(item.path, dependencies)]);
      const stagedSha = canonicalJobHash(stagedBytes);
      const packagedSha = canonicalJobHash(packagedBytes);
      const manifestAsset = manifestByPath.get(posix(item.asset.path));
      if (!manifestAsset || (manifestAsset.sha256 && manifestAsset.sha256 !== packagedSha) || stagedSha !== packagedSha) throw new Error(`Historical video artifact hash mismatch: ${job.id}/${item.variant}`);
      const asset = { assetId: item.asset.assetId, sha256: packagedSha };
      receipts.push({ path: join(input.receiptRoot, `${item.asset.assetId}.json`), value: receipt(asset, masterSha, sourceJobHash, record.updatedAt ?? '2026-07-12T00:00:00.000Z') });
      evidence.push({ jobId: job.id, ledgerJobId, providerJobId: record.providerJobId, sourceCommit: input.sourceCommit ?? 'bfd4ffc', historicalJobSha256: sourceJobHash, masterSha256: masterSha, variant: item.variant, path: item.asset.path, artifactSha256: packagedSha });
    }
  }
  let changedFiles = 0;
  for (const item of receipts) if (await writeJson(item.path, item.value, { ...dependencies, readOptional: dependencies.readOptional ?? (async (path) => { try { return await readFile(path); } catch { return null; } }) })) changedFiles += 1;
  const audit = { version: 1, sourceCommit: input.sourceCommit ?? 'bfd4ffc', provider: 'pie', model: 'seedance-1.5-pro', rights: { status: 'unverified', redistribution: 'unverified' }, entries: evidence };
  if (await writeJson(input.auditPath ?? join(input.receiptRoot, 'historical-video-recovery.json'), audit, { ...dependencies, readOptional: dependencies.readOptional ?? (async (path) => { try { return await readFile(path); } catch { return null; } }) })) changedFiles += 1;
  return { recoveredJobs: plan.videoJobs.length, receipts: receipts.length, changedFiles, evidence };
}
