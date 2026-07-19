import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { describe, expect, it, vi } from 'vitest';

import type { AssetManifestV2 } from '../../src/domain/assets';
import { createDefaultSaveV2 } from '../../src/domain/save';
import {
  createAlbinaRuntime,
  TavernHostAdapter,
  type TavernHelperBindings,
} from '../../src/runtime/host-adapter';
import type { RuntimeAudio } from '../../src/runtime/audio';
import type { CanvasLike, ImageLike } from '../../src/runtime/portraits';
import type { StorageBackend } from '../../src/runtime/storage';

const manifest: AssetManifestV2 = {
  version: 2, projectId: 'albina-galgame-card', basePath: 'assets',
  assets: [{ id: 'portrait.static', kind: 'image', path: 'characters/albina.png' }],
  portraits: [{ version: 2, id: 'portrait.animated', characterId: 'albina', path: 'sprite-atlas/albina.png', animation: { kind: 'strip', frameCount: 8, frameWidth: 10, frameHeight: 20, fps: 8 }, fallbackAssetId: 'portrait.static' }],
  mediaJobs: [],
};

class MemoryBackend implements StorageBackend {
  readonly values = new Map<string, unknown>();
  async delete(store: string, key: string): Promise<void> { this.values.delete(`${store}:${key}`); }
  async get<T>(store: string, key: string): Promise<T | undefined> { return this.values.get(`${store}:${key}`) as T | undefined; }
  async keys(): Promise<string[]> { return []; }
  async put<T>(store: string, key: string, value: T): Promise<void> { this.values.set(`${store}:${key}`, value); }
  close(): void {}
}

class FakeAudio implements RuntimeAudio {
  currentTime = 0; loop = false; muted = false; src = ''; volume = 1;
  readonly pause = vi.fn();
  readonly play = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
  addEventListener(): void {}
  removeEventListener(): void {}
}

function createBindings(): TavernHelperBindings & { emit(event: 'chatChanged' | 'load' | 'unmount'): void } {
  const listeners = new Map<string, Set<() => void>>();
  return {
    getChatId: vi.fn(() => 'chat-1'),
    loadSave: vi.fn(async () => createDefaultSaveV2()),
    saveSave: vi.fn(async () => undefined),
    subscribe(event, listener) {
      const current = listeners.get(event) ?? new Set();
      current.add(listener);
      listeners.set(event, current);
      return () => current.delete(listener);
    },
    emit(event) { listeners.get(event)?.forEach((listener) => listener()); },
  };
}

describe('TavernHostAdapter and AlbinaRuntime lifecycle', () => {
  it('contains host calls behind injected Tavern Helper bindings', async () => {
    const bindings = createBindings();
    const host = new TavernHostAdapter(bindings);
    const save = createDefaultSaveV2();

    expect(host.getChatId()).toBe('chat-1');
    await expect(host.loadSave()).resolves.toEqual(save);
    await host.saveSave(save);

    expect(bindings.saveSave).toHaveBeenCalledWith(save);
  });

  it('validates injected host data and migrates recognized v1.0.44 saves', async () => {
    const bindings = createBindings();
    bindings.loadSave = vi.fn(async () => ({
      schemaVersion: 10,
      projectId: 'albina-galgame-card',
      saveId: 'legacy-host',
      sceneId: 'opening_001',
      trust: 23,
    }));
    const host = new TavernHostAdapter(bindings);

    await expect(host.loadSave()).resolves.toMatchObject({
      version: 2,
      saveId: 'legacy-host',
      sceneId: 'opening_001',
      values: { trust: 23 },
    });

    bindings.loadSave = vi.fn(async () => ({ version: 2, projectId: 'albina-galgame-card' }));
    await expect(new TavernHostAdapter(bindings).loadSave()).rejects.toMatchObject({
      code: 'invalid-v2',
      recoverable: true,
    });
  });

  it('uses no parent-page DOM selectors or jQuery', async () => {
    const runtimeDir = fileURLToPath(new URL('../../src/runtime/', import.meta.url));
    const filenames = ['host-adapter.ts', 'typewriter.ts', 'audio.ts', 'portraits.ts', 'gallery.ts', 'storage.ts', 'special-cg.ts'];
    const source = (await Promise.all(filenames.map((name) => readFile(`${runtimeDir}/${name}`, 'utf8')))).join('\n');

    expect(source).not.toMatch(/parent\s*\.|querySelector|\bjQuery\b|\$\s*\(/);
  });

  it.each(['chatChanged', 'load', 'unmount'] as const)('releases transient resources on %s', async (event) => {
    const bindings = createBindings();
    const audio = new FakeAudio();
    const cancelFrame = vi.fn();
    const clearRect = vi.fn();
    const revokeObjectURL = vi.fn();
    const runtime = createAlbinaRuntime({
      manifest,
      host: bindings,
      audioFactory: () => audio,
      storageBackend: new MemoryBackend(),
      objectUrls: { createObjectURL: () => 'blob:cg', revokeObjectURL },
      portraits: {
        loadImage: async (url) => ({ src: url } satisfies ImageLike),
        requestFrame: () => 9,
        cancelFrame,
        reducedMotion: () => false,
      },
    });
    const canvas = { width: 10, height: 20, getContext: () => ({ clearRect, drawImage: vi.fn() }) } satisfies CanvasLike;
    await runtime.portraits.play('portrait.animated', canvas);
    await runtime.storage.cacheAsset('cg', new Blob(['cg']));
    await runtime.storage.getAssetUrl('cg');
    await runtime.audio.playBgm('bgm.mp3', 0);
    runtime.mount();

    bindings.emit(event);

    expect(cancelFrame).toHaveBeenCalledWith(9);
    expect(clearRect).toHaveBeenCalledWith(0, 0, 10, 20);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:cg');
    expect(audio.pause).toHaveBeenCalled();
  });
});
