import { expect, it } from 'vitest';

import manifestJson from '../../content/asset-manifest-v2.json';
import storyJson from '../../dist/albina-galgame-card/data/game-script-v2.json';
import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2 } from '../../src/domain/game-script';
import { selectSceneMedia } from '../../src/runtime/video';

it('uses the static CG/background fallback for every released scene', () => {
  const manifest = parseAssetManifestV2(manifestJson);
  const scene = parseGameScriptV2(storyJson).scenes.find((candidate) => candidate.id === 'white_canvas_003');
  expect(scene).toBeDefined();
  if (!scene) return;
  const staticMedia = selectSceneMedia(scene, manifest, (assetId) => assetId ? `http://test/assets/${assetId}` : undefined);
  expect(staticMedia.fallbackUrl).toMatch(/^http:\/\/test\/assets\/(?:cg|bg)\./u);
  expect(staticMedia).not.toHaveProperty('videoUrl');
});
