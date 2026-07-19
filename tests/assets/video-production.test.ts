import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  buildVideoPromotionReceipt,
  loadVideoInputs,
  promoteVideoArtifacts,
  resolveApprovedKeyframe,
  reviewVideoArtifacts,
  runVideoBatch,
} from '../../scripts/lib/video-production.mjs';

const sha256 = (value: Uint8Array | string) => createHash('sha256').update(value).digest('hex');
const mp4 = Buffer.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x00]);

function sourceReceipt(assetId: string, artifactSha256: string, overrides: Record<string, unknown> = {}) {
  return {
    version: 1,
    assetId,
    artifactSha256,
    provenance: {
      provider: 'x666-openai-compatible',
      model: 'gpt-image-2',
      upstreamPieVerified: false,
      promptVersion: 'albina-visual-v2',
      sourceJobHash: 'a'.repeat(64),
      review: { status: 'approved', reviewer: 'image-reviewer', reviewedAt: '2026-07-19T00:00:00.000Z' },
    },
    rights: {
      status: 'unverified',
      sourceType: 'model-output',
      redistribution: 'unverified',
      rightsBasis: 'Provider output terms were not independently verified.',
    },
    lineage: { kind: 'original', processVersion: 'albina-image-v2', inputs: [] },
    ...overrides,
  };
}

async function sourceFixture() {
  const root = await mkdtemp(join(tmpdir(), 'albina-video-source-'));
  const assetRoot = join(root, 'assets');
  const receiptRoot = join(root, 'receipts');
  const keyframe = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
  const assetId = 'cg.test';
  await mkdir(join(assetRoot, 'cg'), { recursive: true });
  await mkdir(receiptRoot, { recursive: true });
  await writeFile(join(assetRoot, 'cg', 'test.jpg'), keyframe);
  await writeFile(join(receiptRoot, 'visual.image.cg.test.json'), JSON.stringify(sourceReceipt(assetId, sha256(keyframe))));
  return { root, assetRoot, receiptRoot, keyframe, assetId };
}

function videoJob(sourceCgAssetId = 'cg.test') {
  return {
    id: 'visual.video.test',
    sceneId: 'scene.test',
    sourceCgAssetId,
    sourceTextHash: sha256('A frozen test scene.'),
    provider: 'pie',
    model: 'seedance-1.5-pro',
    promptVersion: 'albina-video-v2',
    durationSeconds: 8,
    masterDelivery: { retainedOffline: true },
    runtime: { assetId: 'video.runtime.test', path: 'video/animated/runtime/test.mp4', width: 1280, height: 720, fps: 24 },
    desktop: { assetId: 'video.desktop.test', path: 'video/animated/desktop/test.mp4', width: 1920, height: 1080, fps: 24 },
    status: 'blocked-source-keyframe',
  };
}

function inputs(fixture: Awaited<ReturnType<typeof sourceFixture>>) {
  const job = videoJob(fixture.assetId);
  return {
    plan: { version: 2, projectId: 'albina-galgame-card', counts: { videoContentJobs: 1 }, imageJobs: [{ id: 'visual.image.cg.test', assetId: fixture.assetId, category: 'cg', path: 'cg/test.jpg', provider: 'x666-openai-compatible', model: 'gpt-image-2', upstreamPieVerified: false, promptVersion: 'albina-visual-v2', status: 'authorized-prompt-frozen' }], videoJobs: [job] },
    story: { version: 2, scenes: [{ id: 'scene.test', text: 'A frozen test scene.', cgAssetId: fixture.assetId }] },
  };
}

function dependencies(fixture: Awaited<ReturnType<typeof sourceFixture>>, testInputs: ReturnType<typeof inputs>, client: any) {
  return {
    stagingRoot: join(fixture.root, 'staging'),
    assetRoot: fixture.assetRoot,
    receiptRoot: fixture.receiptRoot,
    loadInputs: async () => testInputs,
    client,
    sleep: async () => undefined,
    transcode: async ({ targetPath }: { targetPath: string }) => { await writeFile(targetPath, mp4); },
    probeVideo: async (path: string) => path.includes('runtime') ? { width: 1280, height: 720, fps: 24, durationSeconds: 8 } : { width: 1920, height: 1080, fps: 24, durationSeconds: 8 },
  };
}

describe('Seedance video production', () => {
  it('loads the frozen product plan with 24 video jobs and validates the scene hash', async () => {
    const loaded = await loadVideoInputs();
    expect(loaded.plan.videoJobs).toHaveLength(24);
    expect(loaded.plan.videoJobs.every((job: any) => job.provider === 'pie' && job.model === 'seedance-1.5-pro')).toBe(true);
  });

  it('accepts only a hash-bound, approved CG promotion receipt', async () => {
    const fixture = await sourceFixture();
    const job = videoJob(fixture.assetId);
    const imageJob = { assetId: fixture.assetId, category: 'cg', path: 'cg/test.jpg' };
    const keyframe = await resolveApprovedKeyframe(job, imageJob, { assetRoot: fixture.assetRoot, receiptRoot: fixture.receiptRoot });
    expect(keyframe.sha256).toBe(sha256(fixture.keyframe));
    await writeFile(join(fixture.receiptRoot, 'visual.image.cg.test.json'), JSON.stringify(sourceReceipt(fixture.assetId, 'c'.repeat(64))));
    await expect(resolveApprovedKeyframe(job, imageJob, { assetRoot: fixture.assetRoot, receiptRoot: fixture.receiptRoot })).rejects.toThrow(/hash mismatch/iu);
  });

  it('fails before any provider call when PIE_API_KEY is absent', async () => {
    const fixture = await sourceFixture();
    const testInputs = inputs(fixture);
    let submits = 0;
    const client = { submit: async () => { submits += 1; throw new Error('must not call provider'); } };
    await expect(runVideoBatch({ ids: ['visual.video.test'], maxPolls: 0 }, { PIE_API_KEY: undefined }, dependencies(fixture, testInputs, client))).rejects.toThrow(/PIE_API_KEY/iu);
    expect(submits).toBe(0);
  });

  it('resumes a submitted job by polling without submitting a second time', async () => {
    const fixture = await sourceFixture();
    const testInputs = inputs(fixture);
    let submits = 0;
    let polls = 0;
    const client = {
      submit: async () => { submits += 1; return { id: 'seedance-task-1', status: 'pending' }; },
      poll: async () => { polls += 1; return { status: 'completed', sourceUrl: 'https://cdn.example.test/seedance-task-1.mp4' }; },
      download: async () => mp4,
    };
    const deps = dependencies(fixture, testInputs, client);
    const first = await runVideoBatch({ ids: ['visual.video.test'], maxPolls: 0 }, { PIE_API_KEY: 'sk-' + 'a'.repeat(32) }, deps);
    expect(first[0].status).toBe('polling');
    const second = await runVideoBatch({ ids: ['visual.video.test'], maxPolls: 1 }, { PIE_API_KEY: 'sk-' + 'a'.repeat(32) }, deps);
    expect(second[0].status).toBe('awaiting-review');
    expect(submits).toBe(1);
    expect(polls).toBe(1);
  });

  it('requires review before producing unverified-rights receipts and copying deliveries', async () => {
    const fixture = await sourceFixture();
    const testInputs = inputs(fixture);
    const client = {
      submit: async () => ({ id: 'seedance-task-2', status: 'pending' }),
      poll: async () => ({ status: 'completed', sourceUrl: 'https://cdn.example.test/seedance-task-2.mp4' }),
      download: async () => mp4,
    };
    const deps = dependencies(fixture, testInputs, client);
    await runVideoBatch({ ids: ['visual.video.test'], maxPolls: 1 }, { PIE_API_KEY: 'sk-' + 'b'.repeat(32) }, deps);
    await expect(promoteVideoArtifacts({ ids: ['visual.video.test'] }, deps)).rejects.toThrow(/approved|eligible/iu);
    await reviewVideoArtifacts({ ids: ['visual.video.test'], decision: 'approved', reviewer: 'video-reviewer' }, deps);
    const promoted = await promoteVideoArtifacts({ ids: ['visual.video.test'] }, deps);
    expect(promoted).toHaveLength(2);
    const receipt = JSON.parse(await readFile(join(fixture.receiptRoot, 'visual.video.test.runtime.json'), 'utf8'));
    expect(receipt.rights).toMatchObject({ status: 'unverified', sourceType: 'model-output', redistribution: 'unverified' });
    expect(receipt.provenance).toMatchObject({ provider: 'pie', model: 'seedance-1.5-pro' });
    expect(receipt.provenance).not.toHaveProperty('upstreamPieVerified');
    await expect(stat(join(fixture.assetRoot, 'video', 'animated', 'runtime', 'test.mp4'))).resolves.toBeTruthy();
  });

  it('binds video receipts to the approved source and transcode lineage', () => {
    const receipt = buildVideoPromotionReceipt({
      jobId: 'visual.video.test', receiptAssetId: 'video.runtime.test', artifactSha256: 'd'.repeat(64),
      sourceCgAssetId: 'cg.test', sourceArtifactSha256: 'e'.repeat(64), masterSha256: 'f'.repeat(64),
      sourceJobHash: 'a'.repeat(64), promptVersion: 'albina-video-v2',
      review: { status: 'approved', reviewer: 'video-reviewer', reviewedAt: '2026-07-19T00:00:00.000Z' },
    }, 'runtime');
    expect(receipt.lineage.inputs).toEqual(expect.arrayContaining([
      { assetId: 'cg.test', sha256: 'e'.repeat(64), role: 'approved-static-cg-keyframe' },
      { sha256: 'f'.repeat(64), role: 'seedance-master' },
    ]));
  });

  it('refuses a pre-existing target/receipt half-state without overwriting it', async () => {
    const fixture = await sourceFixture();
    const testInputs = inputs(fixture);
    const client = {
      submit: async () => ({ id: 'seedance-task-half', status: 'pending' }),
      poll: async () => ({ status: 'completed', sourceUrl: 'https://cdn.example.test/seedance-task-half.mp4' }),
      download: async () => mp4,
    };
    const deps = dependencies(fixture, testInputs, client);
    await runVideoBatch({ ids: ['visual.video.test'], maxPolls: 1 }, { PIE_API_KEY: 'sk-' + 'c'.repeat(32) }, deps);
    await reviewVideoArtifacts({ ids: ['visual.video.test'], decision: 'approved', reviewer: 'video-reviewer' }, deps);
    const target = join(fixture.assetRoot, 'video', 'animated', 'runtime', 'test.mp4');
    await mkdir(join(target, '..'), { recursive: true });
    await writeFile(target, 'pre-existing delivery');
    await expect(promoteVideoArtifacts({ ids: ['visual.video.test'] }, deps)).rejects.toThrow(/half-written/iu);
    expect(await readFile(target, 'utf8')).toBe('pre-existing delivery');
  });

  it('rolls back the target when the matching receipt write fails', async () => {
    const fixture = await sourceFixture();
    const testInputs = inputs(fixture);
    const client = {
      submit: async () => ({ id: 'seedance-task-rollback', status: 'pending' }),
      poll: async () => ({ status: 'completed', sourceUrl: 'https://cdn.example.test/seedance-task-rollback.mp4' }),
      download: async () => mp4,
    };
    const deps = dependencies(fixture, testInputs, client);
    await runVideoBatch({ ids: ['visual.video.test'], maxPolls: 1 }, { PIE_API_KEY: 'sk-' + 'd'.repeat(32) }, deps);
    await reviewVideoArtifacts({ ids: ['visual.video.test'], decision: 'approved', reviewer: 'video-reviewer' }, deps);
    let writes = 0;
    const writeAtomic = async (path: string, bytes: Uint8Array) => {
      writes += 1;
      if (writes === 2) throw new Error('simulated receipt write failure');
      await writeFile(path, bytes);
    };
    await expect(promoteVideoArtifacts({ ids: ['visual.video.test'] }, { ...deps, writeAtomic })).rejects.toThrow(/simulated receipt/iu);
    await expect(stat(join(fixture.assetRoot, 'video', 'animated', 'runtime', 'test.mp4'))).rejects.toMatchObject({ code: 'ENOENT' });
    await expect(stat(join(fixture.receiptRoot, 'visual.video.test.runtime.json'))).rejects.toMatchObject({ code: 'ENOENT' });
  });
});
