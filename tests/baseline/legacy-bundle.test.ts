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
  // Importing src/main pulls the whole Vue + Three.js module graph through Vite's
  // transform. That exceeds the 5s default whenever the full suite has workers
  // competing for CPU, so both cases get an explicit transform-aware budget.
  it('exposes the Albina application mount', async () => {
    const source = await loadSourceEntry();

    expect(source.mountAlbinaApplication).toBeTypeOf('function');
  }, 30_000);

  it('does not export the removed legacy runtime compatibility surface', async () => {
    const source = await loadSourceEntry();

    expect(source.CANONICAL_CDN_BASE).toBeUndefined();
    expect(source.LEGACY_BUNDLE_PATH).toBeUndefined();
    expect(source.LEGACY_BUNDLE_VERSION).toBeUndefined();
    expect(source.resolveCanonicalCdnAsset).toBeUndefined();
  }, 30_000);
});
