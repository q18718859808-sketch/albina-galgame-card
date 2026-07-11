import { describe, expect, it, vi } from 'vitest';

import { createDefaultSaveV2 } from '../../src/domain/save';
import { GalleryService } from '../../src/runtime/gallery';
import { SpecialCgService } from '../../src/runtime/special-cg';
import { AlbinaStorage, type StorageBackend } from '../../src/runtime/storage';

class MemoryBackend implements StorageBackend {
  readonly values = new Map<string, unknown>();
  closed = false;
  async delete(store: string, key: string): Promise<void> { this.values.delete(`${store}:${key}`); }
  async get<T>(store: string, key: string): Promise<T | undefined> { return this.values.get(`${store}:${key}`) as T | undefined; }
  async keys(store: string): Promise<string[]> {
    return [...this.values.keys()].filter((key) => key.startsWith(`${store}:`)).map((key) => key.slice(store.length + 1));
  }
  async put<T>(store: string, key: string, value: T): Promise<void> { this.values.set(`${store}:${key}`, value); }
  close(): void { this.closed = true; }
}

describe('runtime persistence services', () => {
  it('caches assets in storage and revokes created Blob URLs', async () => {
    const backend = new MemoryBackend();
    const revokeObjectURL = vi.fn();
    const storage = new AlbinaStorage(backend, {
      createObjectURL: vi.fn(() => 'blob:asset'),
      revokeObjectURL,
    });
    await storage.cacheAsset('cg.opening', new Blob(['cg']));

    await expect(storage.getAssetUrl('cg.opening')).resolves.toBe('blob:asset');
    storage.releaseObjectUrls();

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:asset');
  });

  it('persists gallery unlocks without mutating the authoritative save', async () => {
    const backend = new MemoryBackend();
    const storage = new AlbinaStorage(backend);
    const gallery = new GalleryService(storage);
    const save = createDefaultSaveV2();

    await gallery.unlock('cg.secret', save);

    expect(save.unlockedCg).not.toContain('cg.secret');
    await expect(gallery.list(save)).resolves.toEqual(['opening_rain', 'cg.secret']);
  });

  it('persists a FIFO special-CG queue', async () => {
    const backend = new MemoryBackend();
    const service = new SpecialCgService(new AlbinaStorage(backend));

    await service.enqueue({ id: 'first', assetId: 'cg.first' });
    await service.enqueue({ id: 'second', assetId: 'cg.second' });

    await expect(service.dequeue()).resolves.toEqual({ id: 'first', assetId: 'cg.first' });
    await expect(service.peek()).resolves.toEqual({ id: 'second', assetId: 'cg.second' });
  });

  it('stores save snapshots and thumbnail blobs together', async () => {
    const backend = new MemoryBackend();
    const storage = new AlbinaStorage(backend);
    const save = createDefaultSaveV2();
    const thumbnail = new Blob(['thumb'], { type: 'image/webp' });

    await storage.saveSnapshot(save, thumbnail);

    await expect(storage.loadSnapshot(save.saveId)).resolves.toEqual({ save, thumbnail });
  });

  it('closes IndexedDB-compatible storage during disposal', () => {
    const backend = new MemoryBackend();
    const storage = new AlbinaStorage(backend);

    storage.dispose();

    expect(backend.closed).toBe(true);
  });
});
