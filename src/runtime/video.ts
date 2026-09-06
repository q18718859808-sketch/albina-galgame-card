import type { AssetManifestV2 } from '../domain/assets';
import type { SceneCue } from '../domain/scene-cue';

import { resolveAssetUrl } from './asset-resolver';

export interface SceneMediaSelection {
  backgroundUrl?: string;
  fallbackUrl?: string;
}

export function selectSceneMedia(
  scene: SceneCue,
  manifest: AssetManifestV2,
  resolve = (assetId: string | undefined) => resolveAssetUrl(manifest, assetId),
): SceneMediaSelection {
  const fallbackId = scene.cgAssetId ?? scene.backgroundAssetId;
  const fallbackUrl = resolve(fallbackId);
  const backgroundUrl = resolve(scene.backgroundAssetId);
  return { ...(backgroundUrl ? { backgroundUrl } : {}), ...(fallbackUrl ? { fallbackUrl } : {}) };
}
