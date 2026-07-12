import type { AssetManifestV2 } from '../domain/assets';
import type { SceneCue } from '../domain/scene-cue';

import { resolveAssetUrl } from './asset-resolver';

export interface VideoPlaybackPolicy {
  baseUrl?: string;
  desktop: boolean;
  reducedMotion: boolean;
  videoEnabled: boolean;
}

export interface SceneMediaSelection {
  backgroundUrl?: string;
  fallbackUrl?: string;
  videoUrl?: string;
}

export function selectSceneMedia(
  scene: SceneCue,
  manifest: AssetManifestV2,
  policy: VideoPlaybackPolicy,
): SceneMediaSelection {
  const fallbackId = scene.cgAssetId ?? scene.backgroundAssetId;
  const fallbackUrl = resolveAssetUrl(manifest, fallbackId, policy.baseUrl);
  const backgroundUrl = resolveAssetUrl(manifest, scene.backgroundAssetId, policy.baseUrl);
  const videoId = policy.desktop && scene.desktopVideoAssetId ? scene.desktopVideoAssetId : scene.videoAssetId;
  const videoUrl = policy.videoEnabled && !policy.reducedMotion
    ? resolveAssetUrl(manifest, videoId, policy.baseUrl)
    : undefined;
  return { ...(backgroundUrl ? { backgroundUrl } : {}), ...(fallbackUrl ? { fallbackUrl } : {}), ...(videoUrl ? { videoUrl } : {}) };
}
