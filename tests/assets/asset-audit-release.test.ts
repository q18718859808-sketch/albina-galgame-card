import { describe, expect, it } from 'vitest';

// @ts-expect-error JavaScript release gate is consumed by the Node audit script.
import { hasReleaseDifferences, isLegacyPublishablePath, isPrivateEnvironmentPath } from '../../scripts/lib/release-integrity.mjs';

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

  it.each([
    'albina-bridge/albina-bridge.js',
    'cinema/cinematic-engine.js',
    'console/index.js',
    'sfe/sfe-director.js',
    'video-injector.js',
    'source/nested/cinema/engine.js',
    'source/plugins/albina-bridge/bridge.js',
    'assets/legacy/sfe/director.js',
    'source/compat/video-injector.js',
  ])('identifies %s as a forbidden legacy publishable path', (path) => {
    expect(isLegacyPublishablePath(path)).toBe(true);
  });

  it.each(['assets/cg/opening_rain.jpg', 'data/game-script-v2.json', 'source/albina-source.js'])('allows %s in the v2 release surface', (path) => {
    expect(isLegacyPublishablePath(path)).toBe(false);
  });

  it.each(['assets/.env', 'assets/config/.env.production', 'source/nested/.ENV.local'])('identifies %s as a private environment file', (path) => {
    expect(isPrivateEnvironmentPath(path)).toBe(true);
  });

  it('retains only the redacted environment example name', () => {
    expect(isPrivateEnvironmentPath('docs/.env.example')).toBe(false);
  });
});
