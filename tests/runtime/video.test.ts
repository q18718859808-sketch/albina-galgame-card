import { expect, it } from 'vitest';

import manifestJson from '../../content/asset-manifest-v2.json';
import storyJson from '../../dist/albina-galgame-card/data/game-script-v2.json';
import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2 } from '../../src/domain/game-script';
import { chosenSceneVideoId, selectSceneMedia } from '../../src/runtime/video';

it('uses generated video only when policy allows and always keeps a static fallback', () => {
  const manifest = parseAssetManifestV2(manifestJson);
  const scene = parseGameScriptV2(storyJson).scenes.find((candidate) => candidate.id === 'white_canvas_003');
  expect(scene).toBeDefined();
  if (!scene) return;
  const animated = selectSceneMedia(scene, manifest, { baseUrl: 'http://test', desktop: true, reducedMotion: false, videoEnabled: true });
  expect(animated.videoUrl).toContain('/assets/video/animated/desktop/white_canvas_scene_3.mp4');
  expect(animated.fallbackUrl).toMatch(/\/assets\/(?:cg|bg)\//u);
  const reduced = selectSceneMedia(scene, manifest, { baseUrl: 'http://test', desktop: false, reducedMotion: true, videoEnabled: true });
  expect(reduced.videoUrl).toBeUndefined();
  expect(reduced.fallbackUrl).toBe(animated.fallbackUrl);
});

it('chooses exactly one profile and chooses none when video policy is disabled', () => {
  const scene = parseGameScriptV2(storyJson).scenes.find((candidate) => candidate.id === 'opening_001');
  expect(scene).toBeDefined();
  if (!scene) return;
  expect(chosenSceneVideoId(scene, { desktop: true, reducedMotion: false, videoEnabled: true })).toBe('video.animated.desktop.prologue');
  expect(chosenSceneVideoId(scene, { desktop: false, reducedMotion: false, videoEnabled: true })).toBe('video.animated.runtime.prologue');
  expect(chosenSceneVideoId(scene, { desktop: true, reducedMotion: true, videoEnabled: true })).toBeUndefined();
  expect(chosenSceneVideoId(scene, { desktop: true, reducedMotion: false, videoEnabled: false })).toBeUndefined();
});
