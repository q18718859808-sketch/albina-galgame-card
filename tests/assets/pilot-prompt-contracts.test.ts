import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

type VisualPrompt = {
  jobId: string;
  mode?: string;
  referenceJobIds?: string[];
  styleReferenceMode?: string;
  referenceSourceIds?: string[];
};

type PromptContract = {
  styleReference: { mode: string; sourceId: string; instruction: string; identityIsolation: string };
  prompts: VisualPrompt[];
};

async function promptContract(): Promise<{ contract: PromptContract; prompts: Map<string, VisualPrompt> }> {
  const contract = JSON.parse(await readFile('content/media-production/visual-prompts-v2.json', 'utf8')) as PromptContract;
  const prompts = new Map<string, VisualPrompt>(contract.prompts.map((prompt) => [prompt.jobId, prompt]));
  return { contract, prompts };
}

describe('strict visual pilot prompt contracts', () => {
  it('attaches the approved anonymous board as the final image on every visual job', async () => {
    const { contract, prompts } = await promptContract();
    const plan = JSON.parse(await readFile('content/media-production/visual-rebuild-v2.json', 'utf8'));
    const jobs = new Map<string, any>(plan.imageJobs.map((job: any) => [job.id, job]));

    expect(contract.styleReference.mode).toBe('deidentified-image-last');
    expect(contract.styleReference.sourceId).toBe('reference.user.albina-style-board');
    expect(contract.styleReference.instruction).toMatch(/House style: dense precise 2D anime linework/iu);
    expect(contract.styleReference.identityIsolation).toMatch(/final attached input/iu);
    expect(prompts.size).toBe(67);
    for (const prompt of prompts.values()) {
      const sourceIds = prompt.referenceSourceIds ?? [];
      const job = jobs.get(prompt.jobId);
      expect(prompt.styleReferenceMode, prompt.jobId).toBe('deidentified-image-last');
      expect(sourceIds.filter((id) => id === 'reference.user.albina-style-board'), prompt.jobId).toEqual(['reference.user.albina-style-board']);
      expect(sourceIds.at(-1), prompt.jobId).toBe('reference.user.albina-style-board');
      expect(sourceIds.filter((id) => id.startsWith('reference.user.') && id !== 'reference.user.albina-style-board'), prompt.jobId).toEqual([]);
      expect(prompt.mode, prompt.jobId).toBe('reference-edit');
      expect(job.inputMode, prompt.jobId).toBe(prompt.mode);
      expect(job.styleReferenceMode, prompt.jobId).toBe('deidentified-image-last');
      expect(job.referenceSourceIds, prompt.jobId).toEqual(sourceIds);
    }
  });

  it('gives the official identity image priority over the style-only second image', async () => {
    const { prompts } = await promptContract();
    const prompt: any = prompts.get('visual.image.portrait.albina.normal');
    const completePrompt = `${prompt.positivePrompt}\n${prompt.negativePrompt}`;

    expect(prompt.positivePrompt).toMatch(/Image 1.*唯一权威|Image 1.*identity.*authorit/iu);
    expect(prompt.positivePrompt).toMatch(/Image 2.*仅.*画风|Image 2.*style only/iu);
    expect(prompt.positivePrompt).toMatch(/不得.*Image 2.*脸|do not.*Image 2.*face/iu);
    expect(prompt.positivePrompt).toMatch(/线缆.*高马尾/iu);
    expect(prompt.positivePrompt).toMatch(/Fascia/iu);
    expect(completePrompt).toMatch(/文字|text/iu);
  });

  it('keeps background and non-Albina portrait jobs outside Albina identity-image inputs', async () => {
    const { prompts } = await promptContract();
    const plan = JSON.parse(await readFile('content/media-production/visual-rebuild-v2.json', 'utf8'));
    const jobs = new Map<string, any>(plan.imageJobs.map((job: any) => [job.id, job]));

    for (const prompt of prompts.values()) {
      const job = jobs.get(prompt.jobId);
      if (prompt.jobId.startsWith('visual.image.bg.')) {
        expect(prompt.mode, prompt.jobId).toBe('reference-edit');
        expect(prompt.referenceJobIds ?? [], prompt.jobId).toEqual([]);
        expect(prompt.referenceSourceIds ?? [], prompt.jobId).toEqual(['reference.user.albina-style-board']);
      }
      if (prompt.jobId.startsWith('visual.image.portrait.') && !prompt.jobId.startsWith('visual.image.portrait.albina.')) {
        expect(prompt.referenceJobIds ?? [], prompt.jobId).not.toContain('visual.image.portrait.albina.normal');
        expect(prompt.referenceSourceIds ?? [], prompt.jobId).not.toContain('canon.visual.albina.unarmored-standing');
      }
      expect(job.inputMode, prompt.jobId).toBe(prompt.mode);
    }
    const golden = prompts.get('visual.image.portrait.golden_apparition.normal');
    expect(golden?.mode).toBe('reference-edit');
    expect(golden?.referenceJobIds ?? []).toEqual([]);
    expect(golden?.referenceSourceIds ?? []).toEqual(['reference.user.albina-style-board']);
  });

  it('keeps the protagonist serious, hand-auditable, hand-drawn, and distinct from Albina', async () => {
    const { contract, prompts } = await promptContract();
    const prompt: any = prompts.get('visual.image.portrait.protagonist.serious');
    const review = prompt.reviewCriteria.join('\n');

    expect(contract.styleReference.instruction).toMatch(/House style: dense precise 2D anime linework/iu);
    expect(prompt.referenceSourceIds ?? []).not.toContain('canon.visual.albina.unarmored-standing');
    expect(prompt.positivePrompt).toMatch(/闭口严肃|closed-mouth serious/iu);
    expect(prompt.positivePrompt).toMatch(/不微笑|no smile/iu);
    expect(prompt.positivePrompt).toMatch(/至少一只.*完整.*五根.*手指/iu);
    expect(`${prompt.positivePrompt}\n${prompt.negativePrompt}`).toMatch(/手绘.*线稿.*平涂/iu);
    expect(prompt.negativePrompt).toMatch(/3D.*人偶|人偶.*3D/iu);
    expect(`${prompt.positivePrompt}\n${prompt.negativePrompt}`).toMatch(/不得复制 Albina|Albina.*身份/iu);
    expect(review).toMatch(/闭口.*严肃.*无笑/iu);
    expect(review).toMatch(/至少一只.*五指.*逐根计数/iu);
    expect(review).toMatch(/二维.*手绘|手绘.*二维/iu);
    expect(review).toMatch(/Albina.*身份|身份.*Albina/iu);
  });

  it('requires armored Albina to have exactly two arms and two five-fingered armored hands', async () => {
    const { prompts } = await promptContract();
    const prompt: any = prompts.get('visual.image.portrait.albina.armored');
    const review = prompt.reviewCriteria.join('\n');

    expect(prompt.referenceSourceIds).toContain('canon.visual.albina.armored-standing');
    expect(prompt.positivePrompt).toMatch(/恰好两条手臂.*两只手|exactly two arms.*two hands/iu);
    expect(prompt.positivePrompt).toMatch(/装甲手套.*五指.*逐根计数/iu);
    expect(prompt.negativePrompt).toMatch(/额外肢体.*额外手|额外手.*额外肢体/iu);
    expect(review).toMatch(/恰好两条手臂.*两只手/iu);
    expect(review).toMatch(/装甲手套.*五指.*逐根计数/iu);
  });

  it('keeps both opening-rain identities separate with exactly two arms and two hands each', async () => {
    const { prompts } = await promptContract();
    const prompt: any = prompts.get('visual.image.cg.opening_rain');
    const review = prompt.reviewCriteria.join('\n');

    expect(prompt.referenceJobIds).toEqual([
      'visual.image.portrait.albina.normal',
      'visual.image.portrait.protagonist.serious',
    ]);
    expect(prompt.positivePrompt).toMatch(/每人.*恰好两条手臂.*两只手/iu);
    expect(prompt.negativePrompt).toMatch(/肢体融合|融合肢体/iu);
    expect(prompt.negativePrompt).toMatch(/身份复制|复制身份/iu);
    expect(review).toMatch(/两人各自.*恰好两条手臂.*两只手/iu);
    expect(review).toMatch(/无融合.*无身份复制|无身份复制.*无融合/iu);
  });
});
