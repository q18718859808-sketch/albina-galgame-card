import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { AudioLicenseRegistrySchema, parseAssetManifestV2 } from '../../src/domain/assets';

const projectRoot = process.cwd();

async function json(path: string): Promise<unknown> {
  return JSON.parse(await readFile(join(projectRoot, path), 'utf8'));
}

describe('packaged music licensing', () => {
  it('binds every packaged BGM to its registered hash and CC BY 4.0 attribution', async () => {
    const registry = AudioLicenseRegistrySchema.parse(await json('content/audio-licenses-v1.json'));
    const manifest = parseAssetManifestV2(await json('content/asset-manifest-v2.json'));
    const bgmAssets = manifest.assets.filter((asset) => asset.path.startsWith('audio/bgm/'));

    expect(bgmAssets).toHaveLength(registry.tracks.length);
    expect(registry.tracks).toHaveLength(5);
    for (const track of registry.tracks) {
      const bytes = await readFile(join(projectRoot, 'dist/albina-galgame-card/assets', track.path));
      const digest = createHash('sha256').update(bytes).digest('hex');
      const asset = bgmAssets.find((candidate) => candidate.id === track.assetId);
      const { assetId: _assetId, path: _path, sha256: _sha256, ...license } = track;

      expect(digest, track.path).toBe(track.sha256);
      expect(asset?.path).toBe(track.path);
      expect(asset?.sha256).toBe(track.sha256);
      expect(asset?.license).toEqual(license);
    }
  });

  it('publishes matching credits and keeps official OST links external-only', async () => {
    const registry = AudioLicenseRegistrySchema.parse(await json('content/audio-licenses-v1.json'));
    const credits = await json('dist/albina-galgame-card/assets/audio/CREDITS.json');
    const app = await readFile(join(projectRoot, 'src/App.vue'), 'utf8');

    expect(credits).toEqual(registry);
    expect(registry.officialSoundtrack.bundled).toBe(false);
    expect(registry.officialSoundtrack.cached).toBe(false);
    expect(registry.officialSoundtrack.redistributionAllowed).toBe(false);
    expect(registry.officialSoundtrack.channel).toBe('ProjectMoon Official');
    expect(registry.officialSoundtrack.playlistTitle).toBe('LCB OST');
    expect(registry.officialSoundtrack.playlistTrackCount).toBe(35);
    expect(registry.officialSoundtrack.verifiedOn).toBe('2026-07-15');
    expect(registry.officialSoundtrack.rightsNotice).toContain('未授予');
    expect(registry.officialSoundtrack.links).toHaveLength(2);
    expect(registry.officialSoundtrack.links.map((link) => link.url)).toEqual(expect.arrayContaining([
      'https://www.youtube.com/playlist?list=PL9-RBacZ4KMzFjhRY4zD7_GbwL1LgNWXD',
      'https://www.youtube.com/watch?v=n5GI6EkCXCo',
    ]));
    expect(app).not.toContain('Music 2.6');
    expect(app).not.toContain('图像条带仍有 8 项');
    expect(app).toContain('ProjectMoon 官方 OST');
  });
});
