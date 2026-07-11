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

  it('exposes the canonical v1.0.44 CDN asset resolver', async () => {
    const source = await loadSourceEntry();

    expect(source.CANONICAL_CDN_BASE).toBe(
      'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v1.0.44/dist/albina-galgame-card',
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
