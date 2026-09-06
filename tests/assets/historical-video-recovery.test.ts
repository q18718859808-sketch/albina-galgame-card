import { mkdtemp, readFile, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { canonicalJobHash, recoverHistoricalVideos } from '../../scripts/lib/historical-video-recovery.mjs';

const bytes = {
  master: Buffer.from('master-video'),
  runtime: Buffer.from('runtime-video'),
  desktop: Buffer.from('desktop-video'),
};

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'albina-historical-video-'));
  const stagingRoot = join(root, 'staging');
  const assetRoot = join(root, 'assets');
  const receiptRoot = join(root, 'receipts');
  for (const variant of ['master', 'runtime', 'desktop']) await mkdir(join(stagingRoot, variant), { recursive: true });
  await mkdir(join(assetRoot, 'video/animated/runtime'), { recursive: true });
  await mkdir(join(assetRoot, 'video/animated/desktop'), { recursive: true });
  await writeFile(join(stagingRoot, 'master/test.mp4'), bytes.master);
  await writeFile(join(stagingRoot, 'runtime/test.mp4'), bytes.runtime);
  await writeFile(join(stagingRoot, 'desktop/test.mp4'), bytes.desktop);
  await writeFile(join(assetRoot, 'video/animated/runtime/test.mp4'), bytes.runtime);
  await writeFile(join(assetRoot, 'video/animated/desktop/test.mp4'), bytes.desktop);
  const historicalJob = {
    kind: 'video', prompt: 'historical prompt', durationSeconds: 8,
    sourceImage: 'D:\\old\\source.jpg', masterOutput: 'D:\\old\\master\\test.mp4',
    output: 'D:\\old\\runtime\\test.mp4', desktopOutput: 'D:\\old\\desktop\\test.mp4',
    validation: { width: 1280, height: 720, fps: 24, durationSeconds: 8, tolerance: 1 },
    desktopValidation: { width: 1920, height: 1080, fps: 24, durationSeconds: 8, tolerance: 1 },
    masterValidation: { minFps: 12, maxFps: 60, minDurationSeconds: 7, maxDurationSeconds: 9 },
  };
  const sourceJobHash = canonicalJobHash(historicalJob);
  const ledgerJobId = `job_${sourceJobHash.slice(0, 32)}`;
  const plan = {
    version: 2, projectId: 'albina-galgame-card', counts: { videoContentJobs: 1 }, imageJobs: [],
    videoJobs: [{
      id: 'visual.video.test', sceneId: 'scene', sourceCgAssetId: 'cg.test', provider: 'pie', model: 'seedance-1.5-pro',
      promptVersion: 'albina-video-v2', status: 'blocked-source-keyframe',
      runtime: { assetId: 'video.animated.runtime.test', path: 'video/animated/runtime/test.mp4' },
      desktop: { assetId: 'video.animated.desktop.test', path: 'video/animated/desktop/test.mp4' },
    }],
  };
  const job = plan.videoJobs[0]!;
  const ledger = { jobs: { [ledgerJobId]: { status: 'completed', providerJobId: 'task_real_provider_id', output: 'D:\\old\\runtime\\test.mp4', updatedAt: '2026-07-12T00:00:00.000Z' } } };
  const hash = (value: Buffer) => canonicalJobHash(value);
  const manifest = { assets: [
    { id: job.runtime.assetId, path: job.runtime.path, sha256: hash(bytes.runtime) },
    { id: job.desktop.assetId, path: job.desktop.path, sha256: hash(bytes.desktop) },
  ] };
  const options = { plan, ledger, manifest, stagingRoot, assetRoot, receiptRoot, sourceCommit: 'bfd4ffc', loadHistoricalJob: async () => historicalJob };
  return { ...options, historicalJob, ledgerJobId };
}

describe('historical Pie video recovery', () => {
  it('recovers hash-bound receipts and is idempotent', async () => {
    const input = await fixture();
    const first = await recoverHistoricalVideos(input);
    expect(first).toMatchObject({ recoveredJobs: 1, receipts: 2, changedFiles: 3 });
    const receiptPath = join(input.receiptRoot, 'video.animated.runtime.test.json');
    const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
    expect(receipt.provenance).toMatchObject({ provider: 'pie', model: 'seedance-1.5-pro', promptVersion: 'albina-video-v1', sourceJobHash: canonicalJobHash(input.historicalJob) });
    expect(receipt.rights).toMatchObject({ status: 'unverified', redistribution: 'unverified' });
    expect(receipt.lineage.inputs).toEqual(expect.arrayContaining([{ sha256: canonicalJobHash(bytes.master), role: 'seedance-master' }]));
    const second = await recoverHistoricalVideos(input);
    expect(second.changedFiles).toBe(0);
  });

  it('fails closed on missing provider evidence, hash mismatch, and receipt conflicts', async () => {
    const missing = await fixture();
    missing.ledger.jobs[missing.ledgerJobId]!.providerJobId = '';
    await expect(recoverHistoricalVideos(missing)).rejects.toThrow(/providerJobId/iu);

    const mismatch = await fixture();
    await writeFile(join(mismatch.assetRoot, 'video/animated/runtime/test.mp4'), 'different');
    await expect(recoverHistoricalVideos(mismatch)).rejects.toThrow(/hash mismatch/iu);

    const conflict = await fixture();
    await recoverHistoricalVideos(conflict);
    await writeFile(join(conflict.receiptRoot, 'video.animated.runtime.test.json'), '{}');
    await expect(recoverHistoricalVideos(conflict)).rejects.toThrow(/conflict/iu);
  });
});
