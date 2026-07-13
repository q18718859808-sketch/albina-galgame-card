import { describe, expect, it } from 'vitest';

type SourceEntry = {
  CANONICAL_CDN_BASE?: unknown;
  LEGACY_BUNDLE_PATH?: unknown;
  LEGACY_BUNDLE_VERSION?: unknown;
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

  it('does not export the removed legacy runtime compatibility surface', async () => {
    const source = await loadSourceEntry();

    expect(source.CANONICAL_CDN_BASE).toBeUndefined();
    expect(source.LEGACY_BUNDLE_PATH).toBeUndefined();
    expect(source.LEGACY_BUNDLE_VERSION).toBeUndefined();
    expect(source.resolveCanonicalCdnAsset).toBeUndefined();
  });
});
