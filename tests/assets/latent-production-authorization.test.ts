import { describe, expect, it } from 'vitest';

import {
  assertLatentProductionAuthorized,
  hash,
  latentJobSetSha256,
} from '../../scripts/lib/visual-production.mjs';

// This suite is deliberately synthetic: it exercises the gate logic on hand-built
// inputs only. Assertions against the committed artifacts live in
// visual-production-generators.test.ts, which rebuilds those files in place and must
// therefore be the single owner of them (concurrent readers would race the rebuild).

function syntheticInputs() {
  const plan = {
    version: '2.1.0-latent-v1',
    policy: { latentProductionAuthorization: { required: false, humanIdentityApprovalRequired: false } },
    imageJobs: [
      {
        id: 'visual.image.cg.beta', provider: 'latent-moe', assetId: 'cg.beta', receiptAssetId: 'cg.beta',
        category: 'cg', model: 'latent-moe-async', inputMode: 'text-generation', latentResolution: 'landscape',
        delivery: { format: 'jpg', width: 1280, height: 720, alpha: false }, promptVersion: 'latent-text-v1',
      },
      {
        id: 'visual.image.cg.alpha', provider: 'latent-moe', assetId: 'cg.alpha', receiptAssetId: 'cg.alpha',
        category: 'cg', model: 'latent-moe-async', inputMode: 'text-generation', latentResolution: 'landscape',
        delivery: { format: 'jpg', width: 1280, height: 720, alpha: false }, promptVersion: 'latent-text-v1',
      },
      // A WisArt job in the same plan variant must never leak into the latent job-set hash.
      {
        id: 'visual.image.bg.gamma', provider: 'wisart-openai-compatible', assetId: 'bg.gamma',
        category: 'bg', model: 'gpt-image-2', inputMode: 'reference-edit',
        delivery: { format: 'jpg', width: 1920, height: 1080, alpha: false }, promptVersion: 'albina-visual-v2',
      },
    ],
  };
  const prompts = {
    schemaVersion: 1,
    promptVersion: 'latent-text-v1',
    prompts: [
      { jobId: 'visual.image.cg.alpha', latentRequest: { prompt: 'alpha prose' } },
      { jobId: 'visual.image.cg.beta', latentRequest: { prompt: 'beta prose' } },
    ],
  };
  return { plan, prompts };
}

describe('latent production human identity authorization gate', () => {
  it('accepts the explicit no-authorization policy and returns content bindings', () => {
    const { plan, prompts } = syntheticInputs();
    const result = assertLatentProductionAuthorized(plan, prompts);
    expect(result.status).toBe('not-required');
    expect(result.promptFreezeSha256).toBe(hash(JSON.stringify(prompts)));
    expect(result.latentJobSetSha256).toBe(latentJobSetSha256(plan));
  });

  it('hashes only the latent job subset, ignoring co-planned WisArt jobs', () => {
    const { plan } = syntheticInputs();
    const withoutWisart = { ...plan, imageJobs: plan.imageJobs.filter((job) => job.provider === 'latent-moe') };
    expect(latentJobSetSha256(withoutWisart)).toBe(latentJobSetSha256(plan));
    // Order must not matter: approval hashes bind content, not authoring order.
    const reordered = { ...plan, imageJobs: [...plan.imageJobs].reverse() };
    expect(latentJobSetSha256(reordered)).toBe(latentJobSetSha256(plan));
  });

  it('fails closed when the plan does not explicitly disable human authorization', () => {
    const { plan, prompts } = syntheticInputs();
    const legacy = { ...plan, policy: { latentProductionAuthorization: { authorized: false, requiresHumanIdentityApproval: true } } };
    expect(() => assertLatentProductionAuthorized(legacy, prompts))
      .toThrow(/must explicitly disable human authorization/u);
  });

  it('returns updated prompt binding after a prompt freeze rebuild', () => {
    const { plan, prompts } = syntheticInputs();
    const rebuilt = {
      ...prompts,
      prompts: prompts.prompts.map((entry) => (entry.jobId === 'visual.image.cg.alpha'
        ? { ...entry, latentRequest: { prompt: 'alpha prose, revised' } }
        : entry)),
    };
    expect(assertLatentProductionAuthorized(plan, rebuilt).promptFreezeSha256)
      .toBe(hash(JSON.stringify(rebuilt)));
  });

  it('returns updated job-set binding when the latent plan changes', () => {
    const { plan, prompts } = syntheticInputs();
    const retargeted = {
      ...plan,
      imageJobs: plan.imageJobs.map((job) => (job.id === 'visual.image.cg.alpha'
        ? { ...job, delivery: { ...job.delivery, width: 1920, height: 1080 } }
        : job)),
    };
    expect(assertLatentProductionAuthorized(retargeted, prompts).latentJobSetSha256)
      .toBe(latentJobSetSha256(retargeted));
  });

  it('does not require or inspect an obsolete approval payload once policy disables authorization', () => {
    const { plan, prompts } = syntheticInputs();
    expect(assertLatentProductionAuthorized(plan, prompts).status).toBe('not-required');
  });
});
