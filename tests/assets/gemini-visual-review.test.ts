import { describe, expect, it } from 'vitest';

import { defaultGateway, defaultModel, defaultPrompt, normalizeGateway } from '../../scripts/lib/gemini-visual-review.mjs';

describe('Gemini visual review adapter', () => {
  it('pins the approved gateway and real model identifier', () => {
    expect(normalizeGateway()).toBe(defaultGateway);
    expect(defaultModel).toBe('gemini-3-flash-preview');
  });

  it('rejects arbitrary or non-HTTPS review endpoints', () => {
    expect(() => normalizeGateway('http://gcli.ggchan.dev/v1')).toThrow(/HTTPS/);
    expect(() => normalizeGateway('https://example.com/v1')).toThrow(/configured HTTPS host/);
  });

  it('makes canonical identity anchors explicit in the review prompt', () => {
    const prompt = defaultPrompt();
    expect(prompt).toContain('black-white asymmetrical eyes');
    expect(prompt).toContain('cable/conduit high ponytail');
    expect(prompt).toContain('advisory only');
  });

  it('pins visual review to the verified Gemini model', async () => {
    const { reviewImagePair } = await import('../../scripts/lib/gemini-visual-review.mjs');
    await expect(reviewImagePair({ apiKey: 'test', model: 'unverified-model', referencePath: 'missing.png', candidatePath: 'missing.png' })).rejects.toThrow(/pinned/);
  });
});
