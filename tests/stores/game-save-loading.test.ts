import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SaveRecoveryError } from '../../src/domain/migrate-save-v1';
import { createDefaultSaveV2 } from '../../src/domain/save';
import { useGameStore } from '../../src/stores/game';

function legacySave(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    schemaVersion: 10,
    projectId: 'albina-galgame-card',
    saveId: 'legacy-import',
    sceneId: 'opening_001',
    route: 'white_canvas',
    trust: 37,
    ...overrides,
  });
}

function prepareScenePresentation(game: ReturnType<typeof useGameStore>): void {
  vi.spyOn(game.runtime.storage, 'getAssetUrl').mockResolvedValue(undefined);
  vi.spyOn(game.runtime.storage, 'cacheAsset').mockResolvedValue(undefined);
  vi.spyOn(game.runtime.gallery, 'unlock').mockResolvedValue(true);
  vi.spyOn(game.runtime.gallery, 'list').mockResolvedValue([]);
  vi.spyOn(game.runtime.specialCg, 'enqueue').mockResolvedValue(undefined);
  vi.spyOn(game.runtime.audio, 'playBgm').mockResolvedValue(true);
  vi.spyOn(game.runtime.audio, 'playSfx').mockResolvedValue(true);
  vi.spyOn(game.runtime.audio, 'enqueueVoice').mockResolvedValue(true);
  vi.spyOn(game.runtime.typewriter, 'write').mockImplementation(async (text, sink) => {
    sink(text);
    return text;
  });
  vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 404 })));
}

beforeEach(() => {
  vi.stubGlobal('indexedDB', {});
  setActivePinia(createPinia());
});

afterEach(async () => {
  await new Promise<void>((resolve) => { setTimeout(resolve, 0); });
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('game store save loading', () => {
  it('keeps the active session intact when JSON import is damaged or unknown', async () => {
    const game = useGameStore();
    const original = structuredClone(game.save);

    await expect(game.importSave('{')).resolves.toBe(false);
    expect(game.saveError).toMatchObject({ code: 'invalid-json', recoverable: true });
    expect(game.save).toEqual(original);

    await expect(game.importSave('{"unrelated":true}')).resolves.toBe(false);
    expect(game.saveError).toMatchObject({ code: 'unknown-format', recoverable: true });
    expect(game.save).toEqual(original);
  });

  it('migrates a recognized v1.0.44 JSON import before replacing the session', async () => {
    const game = useGameStore();
    prepareScenePresentation(game);

    await expect(game.importSave(legacySave())).resolves.toBe(true);

    expect(game.save).toMatchObject({
      version: 2,
      saveId: 'legacy-import',
      sceneId: 'opening_001',
      values: { trust: 37 },
    });
    expect(game.saveError).toBeUndefined();
  });

  it('rejects a migrated save that references a scene absent from GameScriptV2', async () => {
    const game = useGameStore();
    const original = structuredClone(game.save);

    await expect(game.importSave(legacySave({ sceneId: 'removed_scene' }))).resolves.toBe(false);

    expect(game.saveError).toMatchObject({ code: 'unknown-scene', recoverable: true });
    expect(game.save).toEqual(original);
  });

  it('falls back to the IndexedDB quick snapshot when host continue data is damaged', async () => {
    const game = useGameStore();
    prepareScenePresentation(game);
    const quick = createDefaultSaveV2();
    quick.saveId = 'quick-save';
    quick.sceneId = 'opening_001';
    vi.spyOn(game.runtime.host, 'loadSave').mockRejectedValue(
      new SaveRecoveryError('invalid-v2', 'Damaged host SaveV2.'),
    );
    vi.spyOn(game.runtime.storage, 'loadSnapshot').mockResolvedValue({
      save: quick,
      thumbnail: new Blob(),
    });

    await expect(game.continueGame()).resolves.toBe(true);

    expect(game.save.saveId).toBe('quick-save');
    expect(game.saveError).toBeUndefined();
  });

  it('reports failed continue and slot reads without replacing the session', async () => {
    const game = useGameStore();
    const original = structuredClone(game.save);
    vi.spyOn(game.runtime.host, 'loadSave').mockRejectedValue(
      new SaveRecoveryError('invalid-v2', 'Damaged host SaveV2.'),
    );
    vi.spyOn(game.runtime.storage, 'loadSnapshot').mockRejectedValue(
      new SaveRecoveryError('unknown-format', 'Damaged snapshot.'),
    );

    await expect(game.continueGame()).resolves.toBe(false);
    expect(game.saveError).toMatchObject({ code: 'invalid-v2', recoverable: true });
    expect(game.save).toEqual(original);

    await expect(game.restoreSlot('slot-1')).resolves.toBe(false);
    expect(game.saveError).toMatchObject({ code: 'unknown-format', recoverable: true });
    expect(game.save).toEqual(original);
  });

  it('skips a damaged slot while listing the remaining usable saves', async () => {
    const game = useGameStore();
    const valid = createDefaultSaveV2();
    valid.saveId = 'slot-2';
    vi.spyOn(game.runtime.storage, 'keys').mockResolvedValue(['slot-broken', 'slot-2']);
    vi.spyOn(game.runtime.storage, 'loadSnapshot').mockImplementation(async (id) => {
      if (id === 'slot-broken') throw new SaveRecoveryError('unknown-format', 'Damaged snapshot.');
      return { save: valid, thumbnail: new Blob() };
    });

    await expect(game.openSaves()).resolves.toBeUndefined();

    expect(game.saveSlots).toEqual([{ id: 'slot-2', sceneId: valid.sceneId, updatedAt: valid.updatedAt }]);
    expect(game.saveError).toMatchObject({ code: 'unknown-format', recoverable: true });
  });
});
