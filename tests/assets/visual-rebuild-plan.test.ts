import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

async function json(path: string): Promise<any> {
  return JSON.parse(await readFile(path, 'utf8'));
}

describe('visual rebuild production plan', () => {
  it('enumerates the complete clean-rebuild surface without silently changing providers', async () => {
    const plan = await json('content/media-production/visual-rebuild-v2.json');
    expect(plan.counts).toEqual({ imageJobs: 67, videoContentJobs: 24, videoDeliveryEncodes: 48 });
    expect(plan.imageJobs).toHaveLength(67);
    expect(plan.videoJobs).toHaveLength(24);
    expect(plan.imageJobs.every((job: any) => ['text-generation', 'reference-edit'].includes(job.inputMode)
      && job.status === 'authorized-prompt-frozen'
      && job.provider === 'x666-openai-compatible'
      && job.model === 'gpt-image-2'
      && job.upstreamPieVerified === false)).toBe(true);
    expect(plan.imageJobs.filter((job: any) => job.inputMode === 'text-generation')).toHaveLength(15);
    expect(plan.imageJobs.filter((job: any) => job.inputMode === 'reference-edit')).toHaveLength(52);
    const canonRoots = plan.imageJobs.filter((job: any) => job.category === 'characters' && job.referenceSourceIds.length > 0);
    expect(canonRoots.map((job: any) => job.id).sort()).toEqual([
      'visual.image.portrait.albina.normal',
      'visual.image.portrait.callisto.normal',
      'visual.image.portrait.dante.normal',
      'visual.image.portrait.faust.normal',
      'visual.image.portrait.ren.normal',
      'visual.image.portrait.vergilius.normal',
    ]);
    expect(canonRoots.every((job: any) => job.inputMode === 'reference-edit' && job.referenceJobIds.length === 0)).toBe(true);
    const recapJobs = plan.imageJobs.filter((job: any) => job.id.startsWith('visual.image.cg.canon_recap_'));
    expect(recapJobs).toHaveLength(6);
    expect(recapJobs.every((job: any) => job.referenceSourceIds.length > 0 && job.sceneIds.length === 1 && job.canonClaimIds.length > 0)).toBe(true);
    expect(plan.policy.canonClaimsSha256).toMatch(/^[a-f0-9]{64}$/u);
    expect(plan.videoJobs.every((job: any) => job.provider === 'pie' && job.model === 'seedance-1.5-pro' && job.status === 'blocked-source-keyframe')).toBe(true);
    expect(plan.policy.verifiedCandidate).toMatchObject({
      provider: 'x666-openai-compatible',
      generationVerified: true,
      currentlyAvailable: false,
      availabilityErrorCode: 'model_not_found',
      upstreamPieVerified: false,
      authorizedForProduction: true,
    });
    expect(plan.policy.verifiedCandidate.availabilityCheckedAt).toBeTruthy();
    const manifest = await json('content/asset-manifest-v2.json');
    const assetIds = new Set(manifest.assets.map((asset: any) => asset.id));
    const portraitIds = new Set(manifest.portraits.map((portrait: any) => portrait.id));
    expect(plan.imageJobs.every((job: any) => assetIds.has(job.receiptAssetId) || job.id.startsWith('visual.image.cg.canon_recap_'))).toBe(true);
    expect(plan.imageJobs.filter((job: any) => job.category === 'characters').every((job: any) => portraitIds.has(job.portraitAssetId))).toBe(true);
  });

  it('records probe evidence without credentials', async () => {
    const probes = await json('content/media-production/provider-probes-v1.json');
    const text = JSON.stringify(probes);
    expect(text).not.toMatch(/sk-[a-z0-9_-]{20,}/iu);
    expect(probes.probes.find((probe: any) => probe.provider === 'pie').models['gpt-image-2']).toBe(false);
    expect(probes.probes.find((probe: any) => probe.provider === 'x666-openai-compatible')).toMatchObject({
      upstreamPieVerified: false,
      gatewayEvidence: { homepageGenerator: 'new-api', publicPieAttribution: false },
      generation: { width: 1024, height: 1024, visuallyNonBlank: true },
      currentAvailability: {
        available: false,
        modelList: { http: 200, modelCount: 0 },
        generationAttempt: { http: 503, errorCode: 'model_not_found', group: 'huatu' },
      },
      productionAuthorization: { authorized: true, scope: 'albina-v2-image-batch' },
    });
    expect(probes.compatibilityProbes).toEqual(expect.arrayContaining([
      expect.objectContaining({
        provider: 'abrdns-openai-compatible',
        modelList: expect.objectContaining({ http: 200, modelCount: 1, models: { 'gpt-image-2': true } }),
        generation: expect.objectContaining({ outcome: 'ambiguous-timeout' }),
        productionAuthorized: false,
      }),
      expect.objectContaining({
        provider: 'huibaolinks-openai-compatible',
        modelList: expect.objectContaining({ http: 200, modelCount: 16, models: { 'gpt-image-2': true } }),
        generation: expect.objectContaining({ http: 400, errorCode: 'bad_response_status_code' }),
        productionAuthorized: false,
      }),
      expect.objectContaining({
        provider: 'asaiuta-openai-compatible',
        modelList: expect.objectContaining({ http: 200, modelCount: 4, models: { 'gpt-image-2': false } }),
        generation: expect.objectContaining({ outcome: 'not-attempted-model-not-listed' }),
        productionAuthorized: false,
      }),
    ]));
  });
});
