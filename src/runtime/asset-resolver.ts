import type { AssetManifestV2, AssetRecord } from '../domain/assets';

export const ALBINA_RELEASE_VERSION = '2.0.0-rc.3';
export const ALBINA_CDN_BASE = '.';

export function findAsset(manifest: AssetManifestV2, assetId: string | undefined): AssetRecord | undefined {
  if (!assetId) return undefined;
  return manifest.assets.find((asset) => asset.id === assetId);
}

export function resolveAssetUrl(
  manifest: AssetManifestV2,
  assetId: string | undefined,
  baseUrl = ALBINA_CDN_BASE,
): string | undefined {
  const asset = findAsset(manifest, assetId);
  if (!asset) return undefined;
  const encoded = [manifest.basePath, ...asset.path.split('/')]
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${baseUrl.replace(/\/$/u, '')}/${encoded}`;
}
