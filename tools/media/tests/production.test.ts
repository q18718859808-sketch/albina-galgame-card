import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

import { prepareProduction } from '../src/production.js';

describe('production job preparation', () => {
  test('freezes deterministic complete production specs', async () => {
    const root = resolve(import.meta.dirname, '../../..');
    const output = await mkdtemp(join(tmpdir(), 'albina-production-'));
    const summary = await prepareProduction(root, output);
    expect(summary).toEqual({ image: 8, speech: 154, video: 29, musicProbe: 3, music: 81, total: 275 });
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
    expect(index.jobs).toHaveLength(275);
    expect(index.freeze.voices).toMatchObject({ '阿尔比娜': 'nova', '叙事记录': 'onyx' });
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'image')).toHaveLength(8);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'speech')).toHaveLength(154);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'speech').map((job: { id: string }) => job.id)).toEqual(expectedSpeechIds.map((id) => `job.speech.${id}`));
    const allowedVoices = new Set(['alloy', 'echo', 'fable', 'nova', 'onyx', 'shimmer']);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'speech').every((job: { voice: string }) => allowedVoices.has(job.voice))).toBe(true);
    expect(Object.values(index.freeze.voices).every((voice) => allowedVoices.has(String(voice)))).toBe(true);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'video').every((job: { sourceImage?: string }) => job.sourceImage)).toBe(true);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'video').every((job: { durationSeconds: number; masterOutput?: string; desktopOutput?: string }) => job.durationSeconds === 8 && job.masterOutput && job.desktopOutput)).toBe(true);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'image').every((job: { validation: object }) => JSON.stringify(job.validation).includes('frameCount'))).toBe(true);
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
});
