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
    expect(index.jobs).toHaveLength(275);
    expect(index.freeze.voices).toMatchObject({ '阿尔比娜': 'coral', '叙事记录': 'onyx' });
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'image')).toHaveLength(8);
    expect(index.jobs.filter((job: { kind: string }) => job.kind === 'speech')).toHaveLength(154);
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
