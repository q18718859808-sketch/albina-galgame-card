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
  vi.spyOn(game.runtime.typewriter, 'write').mockImplementation(async (text, sink) => {
    sink(text);
    return text;
  });
  vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 404 })));
}

function whiteRouteSave(sceneId: string): SaveV2 {
  const save = createDefaultSaveV2();
  save.saveId = 'gameplay-panel-test';
  save.route = 'white_canvas';
  save.sceneId = sceneId;
  save.chapter = 1;
  save.inventory.ownedIds = ['item.rain_room_badge', 'item.white.boundary_contract'];
  save.inventory.equipped = { accessory: 'equipment.rain_room_badge' };
  save.inventory.outfitIds = ['outfit.albina.rain', 'outfit.albina.white_canvas'];
  save.inventory.activeOutfitId = 'outfit.albina.rain';
  save.professions.activeId = 'boundary_mediator';
  save.professions.progress.boundary_mediator = { xp: 10, level: 2 };
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

describe('gameplay panel store contract', () => {
  it('only applies an active outfit to replaceable base portraits', async () => {
    prepareScenePresentation();

    await expect(game.importSave(serializeSaveV2(whiteRouteSave('white_canvas_001')))).resolves.toBe(true);
    expect(game.scene.portraits.find(({ characterId }) => characterId === 'albina')?.portraitAssetId)
      .toBe('portrait.albina.rain');

    await expect(game.importSave(serializeSaveV2(whiteRouteSave('white_canvas_002')))).resolves.toBe(true);
    expect(game.scene.portraits.find(({ characterId }) => characterId === 'albina')?.portraitAssetId)
      .toBe('portrait.albina.shy');
  });

  it('converts invalid UI actions into recoverable state and applies valid switches', async () => {
    let failed: boolean | undefined;
    expect(() => { failed = game.equip('equipment.white.boundary_charm'); }).not.toThrow();
    expect(failed).toBe(false);
    expect(game.gameplayError).toMatch(/当前路线/u);

    prepareScenePresentation();
    await expect(game.importSave(serializeSaveV2(whiteRouteSave('white_canvas_002')))).resolves.toBe(true);

    expect(game.equip('equipment.white.boundary_charm')).toBe(true);
    expect(game.save.inventory.equipped.accessory).toBe('equipment.white.boundary_charm');
    expect(game.effectiveValues.trust).toBeGreaterThan(game.save.values.trust);
    expect(game.gameplayError).toBeUndefined();

    expect(game.wearOutfit('outfit.albina.white_canvas')).toBe(true);
    expect(game.save.inventory.activeOutfitId).toBe('outfit.albina.white_canvas');
    expect(game.scene.portraits.find(({ characterId }) => characterId === 'albina')?.portraitAssetId)
      .toBe('portrait.albina.shy');

    expect(game.selectProfession('narrative_curator')).toBe(true);
    expect(game.save.professions.activeId).toBe('narrative_curator');
    expect(game.selectProfession('ring_counterforger')).toBe(false);
    expect(game.save.professions.activeId).toBe('narrative_curator');
    expect(game.gameplayError).toMatch(/当前路线/u);
  });
});
