import { afterEach, describe, expect, it, vi } from 'vitest';

import { createDefaultSaveV2 } from '../../src/domain/save';
import {
  createDefaultHostBindings,
  LEGACY_TAVERN_HELPER_SAVE_KEY,
  TAVERN_HELPER_SAVE_KEY,
} from '../../src/runtime/default-host';

function localStorageHarness(initial?: string) {
  let value = initial ?? null;
  return {
    getItem: vi.fn(() => value),
    setItem: vi.fn((_key: string, next: string) => { value = next; }),
  };
}

function installHost(variables: Record<string, unknown>, local?: string) {
  const setVariables = vi.fn(async () => undefined);
  vi.stubGlobal('window', {
    TavernHelper: {
      getVariables: vi.fn(async () => variables),
      setVariables,
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  const storage = localStorageHarness(local);
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
});
