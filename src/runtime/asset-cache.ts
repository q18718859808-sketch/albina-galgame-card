import type { AssetManifestV2 } from '../domain/assets';

import { resolveAssetUrl } from './asset-resolver';
import type { AlbinaStorage } from './storage';

export type FetchAsset = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export class RuntimeAssetCache {
  constructor(
    private readonly manifest: AssetManifestV2,
    private readonly storage: AlbinaStorage,
    private readonly baseUrl: string,
    private readonly fetchAsset: FetchAsset = (input, init) => fetch(input, init),
  ) {}

  remoteUrl(assetId: string): string | undefined { return resolveAssetUrl(this.manifest, assetId, this.baseUrl); }

  async cache(assetId: string): Promise<string | undefined> {
    const cached = await this.storage.getAssetUrl(assetId);
    if (cached) return cached;
    const remote = this.remoteUrl(assetId);
    if (!remote) return undefined;
    try {
      const response = await this.fetchAsset(remote, { credentials: 'omit', mode: 'cors' });
      if (!response.ok) return remote;
      await this.storage.cacheAsset(assetId, await response.blob());
      return await this.storage.getAssetUrl(assetId) ?? remote;
    } catch {
      return remote;
    }
  }

  async cachePortrait(portraitId: string): Promise<string | undefined> {
    const portrait = this.manifest.portraits.find((candidate) => candidate.id === portraitId);
    if (!portrait) return undefined;
    const cached = await this.storage.getAssetUrl(portraitId);
    if (cached) return cached;
    const remote = `${this.baseUrl.replace(/\/$/u, '')}/${this.manifest.basePath}/${portrait.path.split('/').map(encodeURIComponent).join('/')}`;
    try {
      const response = await this.fetchAsset(remote, { credentials: 'omit', mode: 'cors' });
      if (!response.ok) return remote;
      await this.storage.cacheAsset(portraitId, await response.blob());
      return await this.storage.getAssetUrl(portraitId) ?? remote;
    } catch {
      return remote;
    }
  }

  async prefetch(assetIds: Iterable<string>): Promise<Map<string, string>> {
    const result = new Map<string, string>();
    for (const id of new Set(assetIds)) {
      const url = await this.cache(id);
      if (url) result.set(id, url);
    }
    return result;
  }
}
