import { describe, expect, it } from 'vitest';

import { loadProductionInputs, selectImageJobs } from '../../scripts/lib/visual-production.mjs';

// Pipeline-only directives are acceptance criteria for local post-processing and human
// review. They are meaningless to the image model, so they must stay in styleBible
// .pipelineDirectives instead of being spent on the model input.
const pipelineOnlyPhrases = [
  'referenceJobIds',
  '未审核',
  'x=512',
  'y=1492',
];

describe('model prompt composition contract', () => {
  it('excludes pipeline-only engineering directives from the model input', async () => {
    const inputs: any = await loadProductionInputs();
    const entries = selectImageJobs(inputs.plan, inputs.prompts, { mode: 'all' });
    expect(entries).toHaveLength(67);
    const leaked: string[] = [];
    for (const entry of entries) {
      for (const phrase of pipelineOnlyPhrases) {
        if (entry.finalPrompt.includes(phrase)) leaked.push(`${entry.job.id}:${phrase}`);
      }
    }
    expect(leaked).toEqual([]);
  });

  it('retains the pipeline directives as contract metadata rather than deleting them', async () => {
    const inputs: any = await loadProductionInputs();
    const directives = inputs.prompts.styleBible.pipelineDirectives;
    expect(directives.referenceDiscipline).toContain('referenceJobIds');
    expect(directives.canonBoundary).toContain('canon');
    expect(directives.portraitAnchors).toContain('x=512');
  });

  it('still carries house style, scene direction, and exclusions to the model', async () => {
    const inputs: any = await loadProductionInputs();
    const entries = selectImageJobs(inputs.plan, inputs.prompts, { mode: 'all' });
    for (const entry of entries) {
      expect(entry.finalPrompt, entry.job.id).toContain('2D anime linework');
      expect(entry.finalPrompt, entry.job.id).toContain('任务画面：');
      expect(entry.finalPrompt, entry.job.id).toContain('强制排除：');
      expect(entry.finalPrompt, entry.job.id).toMatch(/no text|无可读文字|可读文字|文字/u);
    }
  });
});
