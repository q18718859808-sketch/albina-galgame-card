import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

const provenGenerationSizes = new Set(['1920x1080', '1024x1536']);

async function json(path: string): Promise<any> {
  return JSON.parse(await readFile(path, 'utf8'));
}

describe('wisart generation size capability contract', () => {
  it('only requests generation sizes proven to complete on the channel', async () => {
    const plan = await json('content/media-production/visual-rebuild-v2.json');
    const offenders = plan.imageJobs
      .filter((job: any) => !provenGenerationSizes.has(job.generationSize))
      .map((job: any) => `${job.id}:${job.generationSize}`);
    expect(offenders).toEqual([]);
  });

  it('never requests the 3840x2160 master that times out upstream', async () => {
    const plan = await json('content/media-production/visual-rebuild-v2.json');
    expect(plan.imageJobs.filter((job: any) => job.generationSize === '3840x2160')).toEqual([]);
  });

  it('keeps every landscape master at least as large as its delivered asset', async () => {
    const plan = await json('content/media-production/visual-rebuild-v2.json');
    for (const job of plan.imageJobs) {
      const [width, height] = job.generationSize.split('x').map(Number);
      expect(width, job.id).toBeGreaterThanOrEqual(job.delivery.width);
      expect(height, job.id).toBeGreaterThanOrEqual(job.delivery.height);
    }
  });

  it('still separates portrait masters from landscape masters', async () => {
    const plan = await json('content/media-production/visual-rebuild-v2.json');
    for (const job of plan.imageJobs) {
      expect(job.generationSize, job.id).toBe(job.category === 'characters' ? '1024x1536' : '1920x1080');
    }
  });
});
