import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

const styleBoardSourceId = 'reference.user.albina-style-board';
const rawBaselineSourceId = 'reference.user.albina-style-baseline';
const styleReferenceMode = 'deidentified-image-last';

async function json(path: string): Promise<any> {
  return JSON.parse(await readFile(path, 'utf8'));
}

function assertPromptStyleContract(prompt: any) {
  const sources = prompt.referenceSourceIds ?? [];
  expect(prompt.mode, prompt.jobId).toBe('reference-edit');
  expect(prompt.styleReferenceMode, prompt.jobId).toBe(styleReferenceMode);
  expect(sources.filter((id: string) => id === styleBoardSourceId), prompt.jobId).toHaveLength(1);
  expect(sources.at(-1), prompt.jobId).toBe(styleBoardSourceId);
  expect(sources, prompt.jobId).not.toContain(rawBaselineSourceId);
  expect(sources.filter((id: string) => id.startsWith('reference.user.') && id !== styleBoardSourceId), prompt.jobId).toEqual([]);
}

describe('style reference isolation contract', () => {
  it('uses the sole permitted deidentified board exactly once and as the final input on all 67 prompts', async () => {
    const freeze = await json('content/media-production/visual-prompts-v2.json');
    expect(freeze.prompts).toHaveLength(67);
    for (const prompt of freeze.prompts) assertPromptStyleContract(prompt);
  });

  it('binds the global contract to the deidentified board while retaining identity isolation', async () => {
    const freeze = await json('content/media-production/visual-prompts-v2.json');
    expect(freeze.styleReference).toMatchObject({ mode: styleReferenceMode, sourceId: styleBoardSourceId });
    expect(typeof freeze.styleReference.instruction).toBe('string');
    expect(freeze.styleReference.instruction).toContain('no text');
    expect(freeze.styleReference.identityIsolation).toContain('must never transfer a person');
  });

  it('keeps every generated plan job aligned with the frozen prompt contract', async () => {
    const plan = await json('content/media-production/visual-rebuild-v2.json');
    expect(plan.imageJobs).toHaveLength(67);
    for (const job of plan.imageJobs) {
      assertPromptStyleContract({ ...job, jobId: job.id, mode: job.inputMode });
    }
  });

  it('renders every background through edits with only the deidentified board attached', async () => {
    const freeze = await json('content/media-production/visual-prompts-v2.json');
    const backgrounds = freeze.prompts.filter((prompt: any) => prompt.jobId.startsWith('visual.image.bg.'));
    expect(backgrounds).toHaveLength(12);
    for (const prompt of backgrounds) {
      expect(prompt.mode, prompt.jobId).toBe('reference-edit');
      expect(prompt.referenceJobIds, prompt.jobId).toEqual([]);
      expect(prompt.referenceSourceIds, prompt.jobId).toEqual([styleBoardSourceId]);
    }
  });
});
