import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createDefaultSaveV2, serializeSaveV2, type SaveV2 } from '../../src/domain/save';
import { useGameStore } from '../../src/stores/game';

let game: ReturnType<typeof useGameStore>;

function prepareScenePresentation(): void {
  vi.spyOn(game.runtime.storage, 'getAssetUrl').mockResolvedValue(undefined);
  vi.spyOn(game.runtime.storage, 'cacheAsset').mockResolvedValue(undefined);
  vi.spyOn(game.runtime.gallery, 'unlock').mockResolvedValue(true);
  vi.spyOn(game.runtime.gallery, 'list').mockResolvedValue([]);
  vi.spyOn(game.runtime.specialCg, 'enqueue').mockResolvedValue(undefined);
  vi.spyOn(game.runtime.audio, 'playBgm').mockResolvedValue(true);
  vi.spyOn(game.runtime.audio, 'playSfx').mockResolvedValue(true);
  vi.spyOn(game.runtime.audio, 'enqueueVoice').mockResolvedValue(true);
  vi.spyOn(game.runtime.typewriter, 'write').mockImplementation(async (text: string, sink: (value: string) => void) => {
    sink(text);
    return text;
  });
  vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 404 })));
}

function challengeSave(route: SaveV2['route'], sceneId: string, chapter: number): SaveV2 {
  const save = createDefaultSaveV2();
  save.saveId = 'minigame-ui-test';
  save.route = route;
  save.sceneId = sceneId;
  save.chapter = chapter;
  return save;
}

beforeEach(() => {
  vi.stubGlobal('indexedDB', {});
  setActivePinia(createPinia());
  game = useGameStore();
});

afterEach(async () => {
  game.disposeUiListeners();
  game.runtime.unmount();
  game.$dispose();
  await new Promise<void>((resolve) => { setTimeout(resolve, 0); });
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('minigame store contract', () => {
  it('exposes a pending challenge only while it is unresolved and keeps the record visible afterwards', async () => {
    prepareScenePresentation();
    await expect(game.importSave(serializeSaveV2(challengeSave('white_canvas', 'white_canvas_003', 1)))).resolves.toBe(true);

    expect(game.currentMinigame?.definition.id).toBe('minigame.white.mirror_thread');
    expect(game.activeMinigame?.definition.id).toBe('minigame.white.mirror_thread');
    expect(game.currentMinigame?.record).toBeUndefined();

    const trustBefore = game.save.values.trust;
    expect(game.resolveMinigame({ kind: 'mirror_thread', selectedAnchorIds: ['witness', 'consent'], assisted: false })).toBe(true);
    expect(game.minigameResolution).toEqual({ outcome: 'perfect', score: 100, assisted: false });
    expect(game.save.values.trust).toBeGreaterThan(trustBefore);
    expect(game.gameplayError).toBeUndefined();

    // Entry disappears, record stays observable for the status panel and HUD.
    expect(game.activeMinigame).toBeUndefined();
    expect(game.currentMinigame?.record).toMatchObject({ resolved: true, completed: true, lastOutcome: 'perfect', bestScore: 100 });

    game.clearMinigameResolution();
    expect(game.minigameResolution).toBeUndefined();
  });

  it('turns a repeated resolution into a readable message instead of throwing', async () => {
    prepareScenePresentation();
    await expect(game.importSave(serializeSaveV2(challengeSave('white_canvas', 'white_canvas_003', 1)))).resolves.toBe(true);

    expect(game.resolveMinigame({ kind: 'skip', assisted: true })).toBe(true);
    expect(game.minigameResolution?.outcome).toBe('skipped');

    expect(game.resolveMinigame({ kind: 'mirror_thread', selectedAnchorIds: ['witness', 'consent'], assisted: false })).toBe(false);
    expect(game.gameplayError).toBe('这场挑战已经结算过了。');
    expect(game.save.minigames.records['minigame.white.mirror_thread']?.attempts).toBe(1);
  });

  it('reports a readable message when no challenge belongs to the current scene', async () => {
    prepareScenePresentation();
    await expect(game.importSave(serializeSaveV2(challengeSave('white_canvas', 'white_canvas_002', 1)))).resolves.toBe(true);

    expect(game.currentMinigame).toBeUndefined();
    expect(game.activeMinigame).toBeUndefined();
    expect(game.resolveMinigame({ kind: 'mirror_thread', selectedAnchorIds: ['witness', 'consent'], assisted: false })).toBe(false);
    expect(game.gameplayError).toBe('当前场景没有可进行的挑战。');
  });

  it('rejects an attempt whose kind does not match the authored puzzle', async () => {
    prepareScenePresentation();
    await expect(game.importSave(serializeSaveV2(challengeSave('golden_bough_rebuild', 'golden_bough_006', 2)))).resolves.toBe(true);

    expect(game.currentMinigame?.definition.id).toBe('minigame.golden.testimony_cipher');
    expect(game.resolveMinigame({ kind: 'mirror_thread', selectedAnchorIds: ['name', 'consent'], assisted: false })).toBe(false);
    expect(game.gameplayError).toBe('提交的答案与当前挑战类型不符。');
    expect(game.save.minigames.records['minigame.golden.testimony_cipher']).toBeUndefined();
  });

  it('persists a setback and lets the authored story continue', async () => {
    prepareScenePresentation();
    await expect(game.importSave(serializeSaveV2(challengeSave('ring_conspiracy', 'ring_conspiracy_008', 3)))).resolves.toBe(true);

    expect(game.resolveMinigame({ kind: 'boundary_resonance', activeNodeIds: ['authorship', 'possession'], assisted: false })).toBe(true);
    expect(game.minigameResolution?.outcome).toBe('setback');
    expect(game.save.minigames.records['minigame.ring.boundary_resonance']).toMatchObject({ resolved: true, completed: false, lastOutcome: 'setback' });

    const forward = game.choices.find(({ id }) => !id.startsWith('return_opening_'));
    expect(forward).toBeDefined();
    await game.choose(forward!.id);
    expect(game.currentMinigame).toBeUndefined();
    expect(game.save.sceneId).toBe('ring_conspiracy_009');
  });
});
