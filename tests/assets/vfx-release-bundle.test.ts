import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const bundles = [
  'dist/albina-galgame-card/source/albina-source.js',
  'release/github-cdn-root/dist/albina-galgame-card/source/albina-source.js',
];

describe('packaged ThreeJS VFX bundles', () => {
  it('contain the current semantic transition and fallback runtime in both delivery trees', async () => {
    const [canonical, cdn] = await Promise.all(bundles.map((path) => readFile(path, 'utf8')));
    const markers = ['uTransitionMode', 'static-svg-fallback', 'vfxQuality', 'SceneAtmosphere'];
    for (const marker of markers) {
      expect(canonical, marker).toContain(marker);
      expect(cdn, marker).toContain(marker);
    }
    expect(cdn).toBe(canonical);
  });
});
