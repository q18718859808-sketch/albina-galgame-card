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

function deferred<T>(): { promise: Promise<T>; resolve(value: T): void } {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((next) => { resolve = next; });
  return { promise, resolve };
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

    // The summary is enriched from the script index when the scene still exists.
    expect(game.saveSlots).toHaveLength(1);
    expect(game.saveSlots[0]).toMatchObject({
      id: 'slot-2',
      sceneId: valid.sceneId,
      updatedAt: valid.updatedAt,
      chapter: expect.any(Number),
      locationId: expect.any(String),
      tone: expect.any(String),
    });
    expect(game.saveError).toMatchObject({ code: 'unknown-format', recoverable: true });
  });

  it('reloads the session and profile when the host chat changes', async () => {
    let emitChatChanged: (() => void) | undefined;
    vi.stubGlobal('eventOn', vi.fn((_event: string, listener: () => void) => {
      emitChatChanged = listener;
      return () => undefined;
    }));
    vi.stubGlobal('tavern_events', { CHAT_CHANGED: 'chat_id_changed' });
    vi.stubGlobal('window', { addEventListener: vi.fn(), removeEventListener: vi.fn() });
    const game = useGameStore();
    const next = createDefaultSaveV2();
    next.saveId = 'chat-two';
    next.sceneId = 'white_canvas_005';
    next.playerProfile.name = 'Second Player';
    vi.spyOn(game.runtime.host, 'loadSave').mockResolvedValue(next);
    vi.spyOn(game.runtime.host, 'loadPlayerProfile').mockResolvedValue(next.playerProfile);
    vi.spyOn(game.runtime.storage, 'keys').mockResolvedValue([]);
    game.runtime.mount();

    emitChatChanged?.();
    await vi.waitFor(() => expect(game.loading).toBe(false));

    expect(game.save.saveId).toBe('chat-two');
    expect(game.save.sceneId).toBe('white_canvas_005');
    expect(game.profileDraft.name).toBe('Second Player');
  });

  it('keeps the newest host reload when chat changes arrive during async loading', async () => {
    const listeners: (() => void)[] = [];
    vi.stubGlobal('eventOn', vi.fn((_event: string, listener: () => void) => {
      listeners.push(listener);
      return () => undefined;
    }));
    vi.stubGlobal('tavern_events', { CHAT_CHANGED: 'chat_id_changed' });
    vi.stubGlobal('window', { addEventListener: vi.fn(), removeEventListener: vi.fn() });
    const game = useGameStore();
    const first = createDefaultSaveV2();
    first.saveId = 'chat-one';
    first.sceneId = 'opening_001';
    const second = createDefaultSaveV2();
    second.saveId = 'chat-two';
    second.sceneId = 'white_canvas_005';
    const firstLoad = deferred<typeof first>();
    const secondLoad = deferred<typeof second>();
    const loadSave = vi.spyOn(game.runtime.host, 'loadSave')
      .mockReturnValueOnce(firstLoad.promise)
      .mockReturnValueOnce(secondLoad.promise);
    vi.spyOn(game.runtime.host, 'loadPlayerProfile')
      .mockResolvedValueOnce(first.playerProfile)
      .mockResolvedValueOnce(second.playerProfile);
    vi.spyOn(game.runtime.storage, 'keys').mockResolvedValue([]);
    game.runtime.mount();

    listeners[0]?.();
    listeners[0]?.();
    secondLoad.resolve(second);
    await vi.waitFor(() => expect(game.save.saveId).toBe('chat-two'));
    firstLoad.resolve(first);
    await Promise.resolve();

    expect(loadSave).toHaveBeenCalledTimes(2);
    expect(game.save.saveId).toBe('chat-two');
    expect(game.save.sceneId).toBe('white_canvas_005');
  });

  it('omits enriched fields when the saved scene no longer resolves', async () => {
    const game = useGameStore();
    const orphan = createDefaultSaveV2();
    orphan.saveId = 'slot-9';
    orphan.sceneId = 'scene_that_was_removed_001';
    vi.spyOn(game.runtime.storage, 'keys').mockResolvedValue(['slot-9']);
    vi.spyOn(game.runtime.storage, 'loadSnapshot').mockResolvedValue({
      save: orphan,
      thumbnail: new Blob(),
    });

    await expect(game.openSaves()).resolves.toBeUndefined();

    expect(game.saveSlots).toEqual([{ id: 'slot-9', sceneId: orphan.sceneId, updatedAt: orphan.updatedAt }]);
  });
});
