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

it('single-flights concurrent requests and allows a later retry after failure', async () => {
  const backend = new MemoryBackend();
  const revokeObjectURL = vi.fn();
  const storage = new AlbinaStorage(backend, { createObjectURL: () => 'blob:shared', revokeObjectURL });
  let resolveFetch!: (response: Response) => void;
  const pending = new Promise<Response>((resolve) => { resolveFetch = resolve; });
  const fetcher = vi.fn().mockReturnValueOnce(pending).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(new Response(new Blob(['retry']), { status: 200 }));
  const cache = new RuntimeAssetCache(parseAssetManifestV2(manifestJson), storage, 'https://cdn.test', fetcher);
  const first = cache.cache('cg.opening_rain');
  const second = cache.cache('cg.opening_rain');
  expect(first).toBe(second);
  await vi.waitFor(() => expect(fetcher).toHaveBeenCalledOnce());
  resolveFetch(new Response(new Blob(['shared']), { status: 200 }));
  await expect(Promise.all([first, second])).resolves.toEqual(['blob:shared', 'blob:shared']);

  await storage.deleteValue('assets', 'cg.opening_rain');
  storage.releaseObjectUrls();
  expect(revokeObjectURL).toHaveBeenCalledExactlyOnceWith('blob:shared');
  await expect(cache.cache('cg.opening_rain')).resolves.toContain('https://cdn.test/');
  await expect(cache.cache('cg.opening_rain')).resolves.toBe('blob:shared');
  expect(fetcher).toHaveBeenCalledTimes(3);
});

it('cleans a rejected in-flight cache lookup so the same asset can retry', async () => {
  class RejectOnceBackend extends MemoryBackend {
    private shouldReject = true;
    override async get<T>(store: string, key: string): Promise<T | undefined> {
      if (this.shouldReject) {
        this.shouldReject = false;
        throw new Error('IndexedDB unavailable');
      }
      return super.get<T>(store, key);
    }
  }

  const storage = new AlbinaStorage(new RejectOnceBackend(), { createObjectURL: () => 'blob:retry', revokeObjectURL: vi.fn() });
  const fetcher = vi.fn().mockResolvedValue(new Response(new Blob(['retry']), { status: 200 }));
  const cache = new RuntimeAssetCache(parseAssetManifestV2(manifestJson), storage, 'https://cdn.test', fetcher);
  const first = cache.cache('cg.opening_rain');
  const second = cache.cache('cg.opening_rain');

  expect(first).toBe(second);
  const rejected = await Promise.allSettled([first, second]);
  expect(rejected).toHaveLength(2);
  expect(rejected.every((result) => result.status === 'rejected' && result.reason instanceof Error && result.reason.message === 'IndexedDB unavailable')).toBe(true);
  await expect(cache.cache('cg.opening_rain')).resolves.toBe('blob:retry');
  expect(fetcher).toHaveBeenCalledOnce();
});
