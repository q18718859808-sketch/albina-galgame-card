import { expect, it, vi } from 'vitest';

import manifestJson from '../../content/asset-manifest-v2.json';
import { parseAssetManifestV2 } from '../../src/domain/assets';
import { RuntimeAssetCache } from '../../src/runtime/asset-cache';
import { AlbinaStorage, type StorageBackend } from '../../src/runtime/storage';

class MemoryBackend implements StorageBackend {
  readonly values = new Map<string, Map<string, unknown>>();
  async get<T>(store: string, key: string): Promise<T | undefined> { return this.values.get(store)?.get(key) as T | undefined; }
  async put<T>(store: string, key: string, value: T): Promise<void> { const values = this.values.get(store) ?? new Map(); values.set(key, value); this.values.set(store, values); }
  async delete(store: string, key: string): Promise<void> { this.values.get(store)?.delete(key); }
  async keys(store: string): Promise<string[]> { return [...(this.values.get(store)?.keys() ?? [])]; }
  close(): void {}
}

it('promotes fetched media to IndexedDB-backed blob URLs and reuses it offline', async () => {
  const backend = new MemoryBackend();
  let counter = 0;
  const storage = new AlbinaStorage(backend, { createObjectURL: () => `blob:cached-${++counter}`, revokeObjectURL: vi.fn() });
  const fetcher = vi.fn().mockResolvedValue(new Response(new Blob(['image'], { type: 'image/jpeg' }), { status: 200 }));
  const cache = new RuntimeAssetCache(parseAssetManifestV2(manifestJson), storage, 'https://cdn.test', fetcher);
  await expect(cache.cache('cg.opening_rain')).resolves.toBe('blob:cached-1');
  fetcher.mockRejectedValue(new Error('offline'));
  await expect(cache.cache('cg.opening_rain')).resolves.toBe('blob:cached-1');
  expect(fetcher).toHaveBeenCalledOnce();
});
