import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { contentHashJobDigest } from './hash.js';
import type { MediaJob } from './job.js';

export interface PromotionReceipt {
  version: 1;
  assetId: string;
  artifactSha256: string;
  provenance: {
    provider: MediaJob['provider'];
    model: MediaJob['model'];
    promptVersion: string;
    sourceJobHash: string;
    review: { status: 'approved'; reviewer: string; reviewedAt: string };
  };
}

export async function promoteApprovedArtifact(
  job: MediaJob,
  destination: string,
  receiptPath: string,
  assetId: string,
  reviewer: string,
): Promise<PromotionReceipt> {
  assertReviewIdentity(assetId, reviewer);
  const artifact = await readFile(job.output);
  const receipt = buildReceipt(job, assetId, reviewer, artifact);
  const artifactTemporary = `${destination}.${process.pid}.tmp`;
  const receiptTemporary = `${receiptPath}.${process.pid}.tmp`;
  await Promise.all([mkdir(dirname(destination), { recursive: true }), mkdir(dirname(receiptPath), { recursive: true })]);
  try {
    await Promise.all([copyFile(job.output, artifactTemporary), writeFile(receiptTemporary, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8')]);
    await rename(artifactTemporary, destination);
    await rename(receiptTemporary, receiptPath);
    return receipt;
  } catch (error) {
    await Promise.all([unlink(artifactTemporary).catch(() => undefined), unlink(receiptTemporary).catch(() => undefined)]);
    throw error;
  }
}

function buildReceipt(job: MediaJob, assetId: string, reviewer: string, artifact: Uint8Array): PromotionReceipt {
  return {
    version: 1,
    assetId,
    artifactSha256: createHash('sha256').update(artifact).digest('hex'),
    provenance: {
      provider: job.provider,
      model: job.model,
      promptVersion: job.promptVersion,
      sourceJobHash: contentHashJobDigest(job),
      review: { status: 'approved', reviewer: reviewer.trim(), reviewedAt: new Date().toISOString() },
    },
  };
}

function assertReviewIdentity(assetId: string, reviewer: string): void {
  if (!/^[a-z0-9][a-z0-9._-]*$/iu.test(assetId)) throw new Error('Promotion requires a stable asset ID');
  if (reviewer.trim().length === 0) throw new Error('Promotion requires an attributable visual reviewer');
}
