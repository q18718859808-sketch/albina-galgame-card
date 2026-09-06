import { afterEach, describe, expect, it, vi } from 'vitest';

import { createDefaultSaveV2 } from '../../src/domain/save';
import {
  ChatVariableWriteError,
  createDefaultHostBindings,
  LEGACY_TAVERN_HELPER_SAVE_KEY,
  TAVERN_HELPER_PLAYER_PROFILE_KEY,
  TAVERN_HELPER_SAVE_KEY,
} from '../../src/runtime/default-host';

function localStorageHarness(initial?: string) {
  const values = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => values.get(key) ?? initial ?? null),
    setItem: vi.fn((key: string, next: string) => { values.set(key, next); }),
  };
}

function installHost(variables: Record<string, unknown>, local?: string, chatId = 'standalone', storage = localStorageHarness(local)) {
  const setVariables = vi.fn(async () => undefined);
  vi.stubGlobal('window', {
    TavernHelper: {
      getChatId: vi.fn(() => chatId),
      getVariables: vi.fn(async () => variables),
      setVariables,
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  vi.stubGlobal('localStorage', storage);
  return { setVariables, storage };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('default Tavern Helper save bindings', () => {
  it('loads a valid SaveV2 without invoking legacy migration', async () => {
    const save = createDefaultSaveV2();
    save.saveId = 'helper-v2';
    const { setVariables } = installHost({ [TAVERN_HELPER_SAVE_KEY]: save });

    await expect(createDefaultHostBindings().loadSave()).resolves.toEqual(save);
    expect(setVariables).not.toHaveBeenCalled();
  });

  it('migrates the real v1.0.44 Tavern Helper key and writes SaveV2 back', async () => {
    const legacy = {
      schemaVersion: 10,
      projectId: 'albina-galgame-card',
      saveId: 'helper-v1',
      sceneId: 'white_canvas_005',
      route: 'white_canvas',
      trust: 31,
    };
    const { setVariables, storage } = installHost({ [LEGACY_TAVERN_HELPER_SAVE_KEY]: legacy });

    await expect(createDefaultHostBindings().loadSave()).resolves.toMatchObject({
      version: 2,
      saveId: 'helper-v1',
      sceneId: 'white_canvas_005',
      values: { trust: 31 },
    });
    expect(setVariables).toHaveBeenCalledWith(
      { [TAVERN_HELPER_SAVE_KEY]: expect.objectContaining({ version: 2, saveId: 'helper-v1' }) },
      { type: 'chat' },
    );
    expect(storage.setItem).toHaveBeenCalledWith('albina-v2-save', expect.any(String));
  });

  it('falls back to a valid local save when Tavern Helper data is damaged', async () => {
    const local = createDefaultSaveV2();
    local.saveId = 'local-fallback';
    installHost(
      { [TAVERN_HELPER_SAVE_KEY]: { version: 2, projectId: 'albina-galgame-card' } },
      JSON.stringify(local),
    );

    await expect(createDefaultHostBindings().loadSave()).resolves.toEqual(local);
  });

  it('migrates a local v1.0.44 save when Tavern Helper has no chat save', async () => {
    const legacy = JSON.stringify({
      schemaVersion: 10,
      projectId: 'albina-galgame-card',
      saveId: 'local-v1',
      sceneId: 'golden_bough_003',
      route: 'golden_bough_rebuild',
      trust: 19,
    });
    const { setVariables, storage } = installHost({}, legacy);

    await expect(createDefaultHostBindings().loadSave()).resolves.toMatchObject({
      version: 2,
      saveId: 'local-v1',
      sceneId: 'golden_bough_003',
      values: { trust: 19 },
    });
    expect(setVariables).toHaveBeenCalledWith(
      { [TAVERN_HELPER_SAVE_KEY]: expect.objectContaining({ version: 2, saveId: 'local-v1' }) },
      { type: 'chat' },
    );
    expect(JSON.parse(storage.setItem.mock.calls.at(-1)?.[1] ?? '{}')).toMatchObject({
      version: 2,
      saveId: 'local-v1',
    });
  });

  it('returns recoverable errors instead of throwing raw JSON or schema failures', async () => {
    installHost({ [TAVERN_HELPER_SAVE_KEY]: { version: 2, projectId: 'albina-galgame-card' } });
    await expect(createDefaultHostBindings().loadSave()).rejects.toMatchObject({
      code: 'invalid-v2',
      recoverable: true,
    });

    vi.unstubAllGlobals();
    vi.stubGlobal('window', { addEventListener: vi.fn(), removeEventListener: vi.fn() });
    vi.stubGlobal('localStorage', localStorageHarness('{'));
    await expect(createDefaultHostBindings().loadSave()).rejects.toMatchObject({
      code: 'invalid-json',
      recoverable: true,
    });
  });

  it('returns undefined when no host or local save exists', async () => {
    installHost({});
    await expect(createDefaultHostBindings().loadSave()).resolves.toBeUndefined();
  });

  it('keeps local fallback saves isolated by chat id', async () => {
    const first = createDefaultSaveV2();
    first.saveId = 'chat-one';
    installHost({}, undefined, 'chat-one');
    await createDefaultHostBindings().saveSave(first);

    const second = createDefaultSaveV2();
    second.saveId = 'chat-two';
    installHost({}, undefined, 'chat-two');
    await expect(createDefaultHostBindings().loadSave()).resolves.toBeUndefined();
  });

  it('sanitizes and persists the player profile in chat variables and local fallback storage', async () => {
    const { setVariables, storage } = installHost({});
    const profile = createDefaultSaveV2().playerProfile;
    profile.name = ' <Morgan> ';
    profile.appearance = `adult\u0000 investigator`;
    profile.initialRelationship = ' <cautious\u0000 observer> ';

    await createDefaultHostBindings().savePlayerProfile(profile);

    expect(setVariables).toHaveBeenCalledWith(
      { [TAVERN_HELPER_PLAYER_PROFILE_KEY]: expect.objectContaining({ name: 'Morgan', appearance: 'adult investigator', initialRelationship: 'cautious observer' }) },
      { type: 'chat' },
    );
    expect(storage.setItem).toHaveBeenCalledWith('albina-player-profile-v1', expect.any(String));
  });

  it('reports a distinguishable chat-write fallback when no chat setter exists', async () => {
    const storage = localStorageHarness();
    vi.stubGlobal('window', {
      TavernHelper: { getVariables: vi.fn(async () => ({})) },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal('localStorage', storage);

    await expect(createDefaultHostBindings().savePlayerProfile(createDefaultSaveV2().playerProfile))
      .rejects.toBeInstanceOf(ChatVariableWriteError);
    expect(storage.setItem).toHaveBeenCalledWith('albina-player-profile-v1', expect.any(String));
  });

  it('prefers iframe free functions and merges without replacing unrelated chat variables', async () => {
    const save = createDefaultSaveV2();
    save.saveId = 'iframe-free-functions';
    const getVariables = vi.fn(() => ({ [TAVERN_HELPER_SAVE_KEY]: save, unrelated: true }));
    const insertOrAssignVariables = vi.fn();
    vi.stubGlobal('getVariables', getVariables);
    vi.stubGlobal('insertOrAssignVariables', insertOrAssignVariables);
    vi.stubGlobal('window', { addEventListener: vi.fn(), removeEventListener: vi.fn() });
    vi.stubGlobal('localStorage', localStorageHarness());

    await expect(createDefaultHostBindings().loadSave()).resolves.toEqual(save);
    const next = createDefaultSaveV2();
    next.saveId = 'merged-save';
    await createDefaultHostBindings().saveSave(next);

    expect(getVariables).toHaveBeenCalledWith({ type: 'chat' });
    expect(insertOrAssignVariables).toHaveBeenCalledWith(
      { [TAVERN_HELPER_SAVE_KEY]: expect.objectContaining({ saveId: 'merged-save' }) },
      { type: 'chat' },
    );
  });

  it('subscribes to confirmed Tavern events and releases the returned disposer', () => {
    const stop = vi.fn();
    const eventOn = vi.fn(() => ({ stop }));
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.stubGlobal('eventOn', eventOn);
    vi.stubGlobal('tavern_events', { CHAT_CHANGED: 'chat_id_changed', APP_READY: 'app_ready' });
    vi.stubGlobal('window', { addEventListener, removeEventListener });

    const listener = vi.fn();
    const unsubscribe = createDefaultHostBindings().subscribe('chatChanged', listener);
    expect(eventOn).toHaveBeenCalledWith('chat_id_changed', listener);
    unsubscribe();
    expect(stop).toHaveBeenCalledOnce();
    expect(removeEventListener).not.toHaveBeenCalledWith('albina:chatChanged', listener);
  });

  it('accepts function disposers without double-registering bridged chat changes', () => {
    const stop = vi.fn();
    const eventOn = vi.fn(() => stop);
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.stubGlobal('eventOn', eventOn);
    vi.stubGlobal('tavern_events', { CHAT_CHANGED: 'chat_id_changed' });
    vi.stubGlobal('window', { addEventListener, removeEventListener });

    const listener = vi.fn();
    const unsubscribe = createDefaultHostBindings().subscribe('chatChanged', listener);

    expect(eventOn).toHaveBeenCalledWith('chat_id_changed', listener);
    expect(addEventListener).not.toHaveBeenCalledWith('albina:chatChanged', listener);
    unsubscribe();
    expect(stop).toHaveBeenCalledOnce();
    expect(removeEventListener).not.toHaveBeenCalledWith('albina:chatChanged', listener);
  });

  it('uses TavernHelper.eventOn when iframe globals are unavailable', () => {
    const eventOn = vi.fn(() => ({ stop: vi.fn() }));
    vi.stubGlobal('window', {
      TavernHelper: { eventOn },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.stubGlobal('tavern_events', { CHAT_CHANGED: 'chat_id_changed' });

    createDefaultHostBindings().subscribe('chatChanged', vi.fn());

    expect(eventOn).toHaveBeenCalledWith('chat_id_changed', expect.any(Function));
  });
});
