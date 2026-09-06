import { mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

import { prepareProduction } from '../src/production.js';

describe('production job preparation', () => {
  test('freezes deterministic complete production specs', async () => {
    const root = resolve(import.meta.dirname, '../../..');
    const output = await mkdtemp(join(tmpdir(), 'albina-production-'));
    const summary = await prepareProduction(root, output);
    expect(summary).toEqual({ image: 0, speech: 166, video: 0, total: 166 });
    const index = JSON.parse(await readFile(join(output, 'index.json'), 'utf8'));
    const manifest = JSON.parse(await readFile(join(root, 'content/asset-manifest-v2.json'), 'utf8'));
    const script = JSON.parse(await readFile(join(root, 'content/game-script-v2.json'), 'utf8'));
    const scenes = (await Promise.all(script.dialogueFiles.map((file: string) => readFile(join(root, 'content', file), 'utf8').then(JSON.parse)))).flat();
    const expectedSpeechIds = [...new Set(scenes.flatMap((scene: { voiceAssetId?: string; choices?: { resultVoiceAssetId?: string }[] }) => [
      scene.voiceAssetId,
      ...(scene.choices ?? []).map((choice) => choice.resultVoiceAssetId),
    ].filter((id): id is string => Boolean(id))))].sort((a, b) => a.localeCompare(b));
    // Speech must be planned from the fixed script, even after all manifest jobs are approved.
    expect(manifest.mediaJobs.filter((job: { kind: string }) => job.kind === 'speech')).toHaveLength(0);
    expect(index.jobs).toHaveLength(166);
    expect(index.version).toBe(2);
    expect(index.providerPolicy).toEqual({ selected: { image: 'wisart-openai-compatible', speech: 'pie' }, candidates: { image: [] }, fallback: false });
    expect(index.musicPolicy).toEqual({ mode: 'official-soundtrack', generation: false, redistributionRequiresVerifiedLicense: true });
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'music')).toHaveLength(0);
    expect(index.jobs.every((job: { provider?: string; model?: string; promptVersion?: string }) => job.provider === 'pie' && Boolean(job.model) && Boolean(job.promptVersion))).toBe(true);
    expect(index.freeze.voices).toMatchObject({ '阿尔比娜': 'nova', '叙事记录': 'onyx' });
    const imageJobs = index.jobs.filter((job: { kind: string }) => job.kind === 'image');
    expect(imageJobs).toHaveLength(0);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'speech')).toHaveLength(166);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'speech').map((job: { id: string }) => job.id)).toEqual(expectedSpeechIds.map((id) => `job.speech.${id}`));
    const allowedVoices = new Set(['alloy', 'echo', 'fable', 'nova', 'onyx', 'shimmer']);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'speech').every((job: { voice: string }) => allowedVoices.has(job.voice))).toBe(true);
    expect(Object.values(index.freeze.voices).every((voice) => allowedVoices.has(String(voice)))).toBe(true);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'video')).toHaveLength(0);
    expect(imageJobs.filter((job: { id: string }) => job.id.startsWith('job.strip.'))).toHaveLength(0);
    expect(imageJobs.filter((job: { id: string }) => job.id.startsWith('job.cg.')).every((job: { validation: object }) => !JSON.stringify(job.validation).includes('frameCount'))).toBe(true);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'music').every((job: { validation: { minDurationSeconds: number; maxDurationSeconds: number } }) => job.validation.minDurationSeconds === 5 && job.validation.maxDurationSeconds === 300)).toBe(true);
  });

  test('is byte reproducible', async () => {
    const root = resolve(import.meta.dirname, '../../..');
    const a = await mkdtemp(join(tmpdir(), 'albina-production-a-'));
    const b = await mkdtemp(join(tmpdir(), 'albina-production-b-'));
    await prepareProduction(root, a);
    await prepareProduction(root, b);
    expect(await readFile(join(a, 'index.json'), 'utf8')).toBe(await readFile(join(b, 'index.json'), 'utf8'));
  });

  test('routes image jobs only to WisArt while keeping speech on Pie', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-production-provider-'));
    const content = join(root, 'content');
    await mkdir(join(content, 'dialogue'), { recursive: true });
    await Promise.all([
      writeFile(join(content, 'asset-manifest-v2.json'), `${JSON.stringify({
        assets: [{ id: 'original.test', path: 'original/test.png' }],
        mediaJobs: [{ id: 'job.cg.mirror_broken', kind: 'image-edit', inputAssetIds: ['original.test'], assetId: 'cg.mirror_broken', outputPath: 'cg/mirror_broken.jpg' }],
      })}\n`),
      writeFile(join(content, 'pending-gallery-cgs.json'), `${JSON.stringify({ assets: [{ id: 'cg.mirror_broken', width: 1280, height: 720 }] })}\n`),
      writeFile(join(content, 'game-script-v2.json'), `${JSON.stringify({ dialogueFiles: ['dialogue/empty.json'] })}\n`),
      writeFile(join(content, 'dialogue/empty.json'), '[]\n'),
    ]);
    const output = join(root, 'jobs');
    expect(await prepareProduction(root, output)).toEqual({ image: 1, speech: 0, video: 0, total: 1 });
    const index = JSON.parse(await readFile(join(output, 'index.json'), 'utf8'));
    expect(index.providerPolicy.selected).toEqual({ image: 'wisart-openai-compatible', speech: 'pie' });
    expect(index.jobs).toEqual([expect.objectContaining({ kind: 'image', provider: 'wisart-openai-compatible', model: 'gpt-image-2' })]);
  });

  test('removes stale generated job specs without touching ledgers', async () => {
    const root = resolve(import.meta.dirname, '../../..');
    const output = await mkdtemp(join(tmpdir(), 'albina-production-stale-'));
    await writeFile(join(output, 'job.music.retired.json'), '{}\n');
    await writeFile(join(output, 'job.video.retired.json'), '{}\n');
    await writeFile(join(output, '.ledger.json'), '{"preserved":true}\n');
    await prepareProduction(root, output);
    const files = await readdir(output);
    expect(files.filter((file) => file.endsWith('.json'))).toHaveLength(168);
    expect(files).not.toContain('job.music.retired.json');
    expect(files).not.toContain('job.video.retired.json');
    expect(await readFile(join(output, '.ledger.json'), 'utf8')).toBe('{"preserved":true}\n');
  });
});
