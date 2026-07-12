import { describe, expect, it } from 'vitest';

type SourceEntry = {
  CANONICAL_CDN_BASE?: unknown;
  mountAlbinaApplication?: unknown;
  resolveCanonicalCdnAsset?: unknown;
};

async function loadSourceEntry(): Promise<SourceEntry> {
  return import('../../src/main');
}

describe('reproducible source baseline', () => {
  it('exposes the Albina application mount', async () => {
    const source = await loadSourceEntry();

    expect(source.mountAlbinaApplication).toBeTypeOf('function');
  });

  it('keeps the legacy bundle path while resolving assets through the canonical v2 CDN', async () => {
    const source = await loadSourceEntry();

    expect(source.CANONICAL_CDN_BASE).toBe(
      'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card',
    );
    expect(source.resolveCanonicalCdnAsset).toBeTypeOf('function');

    const resolveAsset = source.resolveCanonicalCdnAsset as (path: string) => string;
    expect(resolveAsset('cg/opening rain.jpg')).toBe(
      `${source.CANONICAL_CDN_BASE}/assets/cg/opening%20rain.jpg`,
    );
    expect(resolveAsset('https://example.com/albina.png')).toBe(
      'https://example.com/albina.png',
    );
  });
});
