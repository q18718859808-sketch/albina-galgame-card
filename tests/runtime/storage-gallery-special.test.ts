import { describe, expect, it, vi } from 'vitest';

import { createDefaultSaveV2 } from '../../src/domain/save';
import { GalleryService } from '../../src/runtime/gallery';
import { SpecialCgService } from '../../src/runtime/special-cg';
import { AlbinaStorage, MemoryStorageBackend, ResilientStorageBackend, type StorageBackend } from '../../src/runtime/storage';

class MemoryBackend implements StorageBackend {
  readonly values = new Map<string, unknown>();
  closed = false;
  async delete(store: string, key: string): Promise<void> { this.values.delete(`${store}:${key}`); }
  async get<T>(store: string, key: string): Promise<T | undefined> {
    const value = this.values.get(`${store}:${key}`);
    return value === undefined ? undefined : structuredClone(value) as T;
  }
  async keys(store: string): Promise<string[]> {
    return [...this.values.keys()].filter((key) => key.startsWith(`${store}:`)).map((key) => key.slice(store.length + 1));
  }
  async put<T>(store: string, key: string, value: T): Promise<void> {
    this.values.set(`${store}:${key}`, structuredClone(value));
  }
  close(): void { this.closed = true; }
}

class UnavailableBackend implements StorageBackend {
  closed = false;
  async get<T>(): Promise<T | undefined> { throw new Error('IndexedDB unavailable'); }
  async put<_T>(): Promise<void> { throw new Error('IndexedDB unavailable'); }
  async delete(): Promise<void> { throw new Error('IndexedDB unavailable'); }
  async keys(): Promise<string[]> { throw new Error('IndexedDB unavailable'); }
  close(): void { this.closed = true; }
}

class DeferredAssetBackend extends MemoryBackend {
  resolveAsset!: (blob: Blob | undefined) => void;
  private readonly asset = new Promise<Blob | undefined>((resolve) => { this.resolveAsset = resolve; });

  override async get<T>(store: string, key: string): Promise<T | undefined> {
    if (store === 'assets') return this.asset as Promise<T | undefined>;
    return super.get(store, key);
  }
}

describe('runtime persistence services', () => {
  it('falls back to in-memory persistence when IndexedDB is unavailable', async () => {
    const primary = new UnavailableBackend();
    const backend = new ResilientStorageBackend(primary, new MemoryStorageBackend());

    await backend.put('saves', 'slot-1', { sceneId: 'canon_recap_9_14' });
    await expect(backend.get('saves', 'slot-1')).resolves.toEqual({ sceneId: 'canon_recap_9_14' });
    await expect(backend.keys('saves')).resolves.toEqual(['slot-1']);
    await backend.delete('saves', 'slot-1');
    await expect(backend.get('saves', 'slot-1')).resolves.toBeUndefined();
    expect(primary.closed).toBe(true);
  });

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
    await expect(gallery.list(save)).resolves.toEqual(['cg.secret']);
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

  it('migrates v1.0.44 snapshots in place and preserves their thumbnails', async () => {
    const backend = new MemoryBackend();
    const storage = new AlbinaStorage(backend);
    const thumbnail = new Blob(['legacy-thumb'], { type: 'image/webp' });
    backend.values.set('saves:slot-1', structuredClone({
      save: {
        schemaVersion: 10,
        projectId: 'albina-galgame-card',
        saveId: 'slot-1',
        sceneId: 'ring_conspiracy_006',
        route: 'ring_conspiracy',
        trust: 29,
      },
      thumbnail,
    }));

    await expect(storage.loadSnapshot('slot-1')).resolves.toMatchObject({
      save: { version: 2, saveId: 'slot-1', sceneId: 'ring_conspiracy_006', values: { trust: 29 } },
      thumbnail,
    });
    expect(backend.values.get('saves:slot-1')).toMatchObject({ save: { version: 2, saveId: 'slot-1' } });
  });

  it('recovers a missing thumbnail but rejects an unknown snapshot save', async () => {
    const backend = new MemoryBackend();
    const storage = new AlbinaStorage(backend);
    const save = createDefaultSaveV2();
    backend.values.set('saves:quick-save', { save });
    backend.values.set('saves:broken', { save: { unrelated: true }, thumbnail: new Blob() });

    const recovered = await storage.loadSnapshot('quick-save');
    expect(recovered?.save).toEqual(save);
    expect(recovered?.thumbnail).toBeInstanceOf(Blob);
    expect(recovered?.thumbnail.size).toBe(0);
    await expect(storage.loadSnapshot('broken')).rejects.toMatchObject({
      code: 'unknown-format',
      recoverable: true,
    });
  });

  it('closes IndexedDB-compatible storage during disposal', () => {
    const backend = new MemoryBackend();
    const storage = new AlbinaStorage(backend);

    storage.dispose();

    expect(backend.closed).toBe(true);
  });

  it('single-flights concurrent Blob URL requests for the same asset', async () => {
    const backend = new DeferredAssetBackend();
    const createObjectURL = vi.fn(() => 'blob:shared');
    const storage = new AlbinaStorage(backend, { createObjectURL, revokeObjectURL: vi.fn() });

    const first = storage.getAssetUrl('cg');
    const second = storage.getAssetUrl('cg');
    backend.resolveAsset(new Blob(['cg']));

    await expect(Promise.all([first, second])).resolves.toEqual(['blob:shared', 'blob:shared']);
    expect(createObjectURL).toHaveBeenCalledOnce();
  });

  it('does not publish a Blob URL when release occurs during cache lookup', async () => {
    const backend = new DeferredAssetBackend();
    const createObjectURL = vi.fn(() => 'blob:late');
    const revokeObjectURL = vi.fn();
    const storage = new AlbinaStorage(backend, { createObjectURL, revokeObjectURL });

    const pending = storage.getAssetUrl('cg');
    storage.releaseObjectUrls();
    backend.resolveAsset(new Blob(['cg']));

    await expect(pending).resolves.toBeUndefined();
    expect(createObjectURL).not.toHaveBeenCalled();
    expect(revokeObjectURL).not.toHaveBeenCalled();
  });

  it('preserves FIFO order across concurrent special-CG enqueues', async () => {
    const service = new SpecialCgService(new AlbinaStorage(new MemoryBackend()));

    await Promise.all([
      service.enqueue({ id: 'first', assetId: 'cg.first' }),
      service.enqueue({ id: 'second', assetId: 'cg.second' }),
    ]);

    await expect(service.dequeue()).resolves.toEqual({ id: 'first', assetId: 'cg.first' });
    await expect(service.dequeue()).resolves.toEqual({ id: 'second', assetId: 'cg.second' });
  });

  it('does not duplicate entries across concurrent special-CG dequeues', async () => {
    const service = new SpecialCgService(new AlbinaStorage(new MemoryBackend()));
    await service.enqueue({ id: 'first', assetId: 'cg.first' });
    await service.enqueue({ id: 'second', assetId: 'cg.second' });

    const results = await Promise.all([service.dequeue(), service.dequeue()]);

    expect(results).toEqual([
      { id: 'first', assetId: 'cg.first' },
      { id: 'second', assetId: 'cg.second' },
    ]);
    await expect(service.peek()).resolves.toBeUndefined();
  });
});
