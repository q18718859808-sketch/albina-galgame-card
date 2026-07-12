import { describe, expect, it } from 'vitest';

// @ts-expect-error JavaScript release gate is consumed by the Node audit script.
import { hasReleaseDifferences } from '../../scripts/lib/release-integrity.mjs';

describe('release audit failure gate', () => {
  it.each([
    ['missing', { missing: ['dist/albina-galgame-card/source/albina-source.js'], mismatch: [], stale: [] }],
    ['mismatch', { missing: [], mismatch: ['dist/albina-galgame-card/source/albina-source.js'], stale: [] }],
    ['stale', { missing: [], mismatch: [], stale: ['manifest.json'] }],
  ])('rejects a release with %s files', (_kind, release) => {
    expect(hasReleaseDifferences(release)).toBe(true);
  });

  it('accepts an exact release mirror', () => {
    expect(hasReleaseDifferences({ missing: [], mismatch: [], stale: [] })).toBe(false);
  });
});
