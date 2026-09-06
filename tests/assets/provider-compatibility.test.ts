import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

async function json(path: string): Promise<any> {
  return JSON.parse(await readFile(path, 'utf8'));
}

describe('image provider compatibility probes', () => {
  it('keeps unverified candidates outside the production provider contract', async () => {
    const [probes, plan] = await Promise.all([
      json('content/media-production/provider-probes-v1.json'),
      json('content/media-production/visual-rebuild-v2.json'),
    ]);
    const candidates = probes.compatibilityProbes;
    const candidateIds = new Set(candidates.map((probe: any) => probe.provider));

    expect(candidates).toHaveLength(3);
    expect(candidates.every((probe: any) => probe.productionAuthorized === false)).toBe(true);
    expect(candidates.every((probe: any) => probe.generation.artifactVerified === false)).toBe(true);
    expect(plan.imageJobs.every((job: any) => !candidateIds.has(job.provider))).toBe(true);
    expect(plan.policy.requiredImageProvider).toBe('wisart-openai-compatible');
  });

  it('fails closed for an image request whose timeout has an unknown outcome', async () => {
    const probes = await json('content/media-production/provider-probes-v1.json');
    const probe = probes.compatibilityProbes.find((entry: any) => entry.provider === 'abrdns-openai-compatible');

    expect(probe.modelList).toMatchObject({ http: 200, models: { 'gpt-image-2': true } });
    expect(probe.generation).toMatchObject({
      model: 'gpt-image-2',
      outcome: 'ambiguous-timeout',
      artifactVerified: false,
      automaticResubmissionAllowed: false,
    });
    expect(probe.generation).not.toHaveProperty('artifactSha256');
    expect(probe.productionAuthorized).toBe(false);
  });

  it('preserves definitive failure and model-catalog evidence without promoting either provider', async () => {
    const probes = await json('content/media-production/provider-probes-v1.json');
    const huibao = probes.compatibilityProbes.find((entry: any) => entry.provider === 'huibaolinks-openai-compatible');
    const asaiuta = probes.compatibilityProbes.find((entry: any) => entry.provider === 'asaiuta-openai-compatible');

    expect(huibao.modelList).toMatchObject({ http: 200, models: { 'gpt-image-2': true } });
    expect(huibao.generation).toMatchObject({
      model: 'gpt-image-2',
      http: 400,
      errorCode: 'bad_response_status_code',
      errorType: 'bad_response_status_code',
      artifactVerified: false,
    });
    expect(huibao.generation.requestId).toMatch(/^[a-z0-9]+$/iu);
    expect(huibao.generation.responseSha256).toMatch(/^[a-f0-9]{64}$/u);
    expect(huibao.productionAuthorized).toBe(false);

    expect(asaiuta.modelList).toMatchObject({ http: 200, models: { 'gpt-image-2': false } });
    expect(asaiuta.generation).toEqual({
      model: 'gpt-image-2',
      outcome: 'not-attempted-model-not-listed',
      artifactVerified: false,
    });
    expect(asaiuta.productionAuthorized).toBe(false);
  });
});
