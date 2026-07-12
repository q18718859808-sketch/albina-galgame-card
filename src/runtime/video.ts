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
  resolve = (assetId: string | undefined) => resolveAssetUrl(manifest, assetId, policy.baseUrl),
): SceneMediaSelection {
  const fallbackId = scene.cgAssetId ?? scene.backgroundAssetId;
  const fallbackUrl = resolve(fallbackId);
  const backgroundUrl = resolve(scene.backgroundAssetId);
  const videoId = policy.desktop && scene.desktopVideoAssetId ? scene.desktopVideoAssetId : scene.videoAssetId;
  const videoUrl = policy.videoEnabled && !policy.reducedMotion
    ? resolve(videoId)
    : undefined;
  return { ...(backgroundUrl ? { backgroundUrl } : {}), ...(fallbackUrl ? { fallbackUrl } : {}), ...(videoUrl ? { videoUrl } : {}) };
}
