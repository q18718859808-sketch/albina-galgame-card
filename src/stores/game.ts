import { computed, markRaw, ref, shallowRef, triggerRef } from 'vue';
import { defineStore } from 'pinia';

import manifestJson from '../../content/asset-manifest-v2.json';
import storyJson from '../../dist/albina-galgame-card/data/game-script-v2.json';
import { parseAssetManifestV2 } from '../domain/assets';
import { parseGameScriptV2 } from '../domain/game-script';
import type { MinigameAttempt, MinigameResolution } from '../domain/minigame';
import { resolveScenePresentation } from '../domain/scene-presentation';
import { worldbookSelectionForPreset, type LayeredWorldbookPresetId } from '../domain/layered-worldbooks';
import {
  decodeSaveJson,
  SaveRecoveryError,
  type SaveRecoveryCode,
} from '../domain/migrate-save-v1';
import { createDefaultSaveV2, serializeSaveV2, type SaveV2 } from '../domain/save';
import type { SceneCue } from '../domain/scene-cue';
import { GameSession } from '../game/session';
import { RuntimeAssetCache } from '../runtime/asset-cache';
import { resolveAssetUrl } from '../runtime/asset-resolver';
import { createDefaultHostBindings, sanitizePlayerProfile } from '../runtime/default-host';
import { ChatVariableWriteError } from '../runtime/default-host';
import { createAlbinaRuntime } from '../runtime/host-adapter';
import { captureSceneThumbnail } from '../runtime/thumbnail';
import { selectSceneMedia } from '../runtime/video';

const manifest = parseAssetManifestV2(manifestJson);
const script = parseGameScriptV2(storyJson, manifest);
const sceneIndex = new Map(script.scenes.map((scene) => [scene.id, scene]));
const outfitPortraitIds = new Set(script.gameplay.outfits.map((outfit) => outfit.portraitAssetId));
const replaceableOutfitPortraitIds = new Set(['portrait.albina.normal', ...outfitPortraitIds]);

function runtimeAssetBaseUrl(): string {
  const localPreviewBase = (globalThis as typeof globalThis & { __ALBINA_LOCAL_ASSET_BASE__?: unknown }).__ALBINA_LOCAL_ASSET_BASE__;
  if (typeof localPreviewBase === 'string' && /^\.\/(?:[a-z0-9._-]+\/)*$/iu.test(localPreviewBase) && typeof location !== 'undefined') {
    return new URL(localPreviewBase, location.href).href;
  }
  if (import.meta.env.DEV && typeof location !== 'undefined') {
    return new URL('/dist/albina-galgame-card/', location.origin).href;
  }
  return new URL(/* @vite-ignore */ '../', import.meta.url).href;
}

export interface SaveSlotSummary {
  id: string;
  sceneId: string;
  updatedAt: string;
  thumbnailUrl?: string;
  /** Enriched from the script index when the saved scene still exists. */
  chapter?: number;
  locationId?: string;
  tone?: string;
}
export interface SaveOperationError { code: SaveRecoveryCode | 'unexpected'; message: string; recoverable: true }

export const useGameStore = defineStore('albina-game', () => {
  const baseUrl = runtimeAssetBaseUrl();
  const runtime = markRaw(createAlbinaRuntime({
    manifest,
    host: createDefaultHostBindings(),
    assetBaseUrl: baseUrl,
    onLifecycle: (event) => {
      if (event === 'chatChanged' || event === 'load') return reloadFromHost(event);
    },
  }));
  const assetCache = markRaw(new RuntimeAssetCache(manifest, runtime.storage, baseUrl));
  runtime.portraits.setUrlResolver(async (id) => manifest.portraits.some((portrait) => portrait.id === id) ? assetCache.cachePortrait(id) : assetCache.cache(id));
  const session = shallowRef(new GameSession(script));
  const screen = ref<'title' | 'profile' | 'game' | 'gallery' | 'settings' | 'credits' | 'saves'>('title');
  const profileDraft = ref(structuredClone(session.value.save.playerProfile));
  const visibleText = ref('');
  const dialogueLength = ref(0);
  const dialogueProgress = ref(1);
  // Mirrors the typewriter lifecycle so the dialogue box can expose whether a
  // line is still revealing (advance disabled) or fully shown (advance ready).
  const typewriterState = ref<'idle' | 'typing'>('idle');
  runtime.typewriter.subscribe((state) => { typewriterState.value = state; });
  const resultText = ref<string>();
  const loading = ref(false);
  const muted = ref(false);
  const autoplayBlocked = ref(false);
  const galleryIds = ref<string[]>([]);
  const cachedUrls = ref<Record<string, string>>({});
  const saveSlots = ref<SaveSlotSummary[]>([]);
  const saveError = ref<SaveOperationError>();
  const saving = ref(false);
  const preloadState = ref<'idle' | 'loading' | 'ready'>('idle');
  const preloadSceneId = ref<string>();
  const gameplayError = ref<string>();
  const minigameResolution = ref<MinigameResolution>();
  const minigameBusy = ref(false);
  const thumbnailUrls = new Set<string>();
  const motionQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : undefined;
  const reducedMotion = ref(motionQuery?.matches ?? false);
  let currentBgmId: string | undefined;
  let lastSpecialCgScene: string | undefined;
  let pendingSlotThumbnail: Blob | undefined;
  let lifecycleRevision = 0;

  const handleMotion = (event: MediaQueryListEvent) => {
    reducedMotion.value = event.matches;
    if (event.matches) void hydrateAsset(scene.value.cgAssetId ?? scene.value.backgroundAssetId);
  };
  motionQuery?.addEventListener('change', handleMotion);

  const scene = computed<SceneCue>(() => {
    const authored = session.value.scene;
    const outfitPortraitId = session.value.outfitPortraitAssetId;
    if (!outfitPortraitId) return authored;
    return {
      ...authored,
      portraits: authored.portraits.map((portrait) => portrait.characterId === 'albina'
        && replaceableOutfitPortraitIds.has(portrait.portraitAssetId)
        ? { ...portrait, portraitAssetId: outfitPortraitId }
        : portrait),
    };
  });
  const presentation = computed(() => resolveScenePresentation(scene.value));
  const save = computed(() => session.value.save);
  const choices = computed(() => session.value.choices);
  const effectiveValues = computed(() => session.value.effectiveValues);
  const currentMinigame = computed(() => session.value.currentMinigame);
  const activeMinigame = computed(() => session.value.activeMinigame);
  const media = computed(() => selectSceneMedia(scene.value, manifest, assetUrl));

  function reportSaveError(operation: string, error: unknown): void {
    const known = error instanceof SaveRecoveryError;
    saveError.value = {
      code: known ? error.code : 'unexpected',
      message: `${operation}: ${known ? error.message : 'The save operation could not be completed.'}`,
      recoverable: true,
    };
  }

  function validateSaveScene(candidate: SaveV2): SaveV2 {
    if (!sceneIndex.has(candidate.sceneId)) {
      throw new SaveRecoveryError('unknown-scene', `The save references unavailable scene "${candidate.sceneId}".`);
    }
    return candidate;
  }

  function replaceSession(candidate: SaveV2): void {
    session.value = new GameSession(script, { save: validateSaveScene(candidate) });
    profileDraft.value = structuredClone(candidate.playerProfile);
    saveError.value = undefined;
  }

  async function reloadFromHost(event: 'chatChanged' | 'load'): Promise<void> {
    const revision = ++lifecycleRevision;
    loading.value = true;
    resultText.value = undefined;
    gameplayError.value = undefined;
    minigameResolution.value = undefined;
    minigameBusy.value = false;
    screen.value = 'title';
    currentBgmId = undefined;
    cachedUrls.value = {};
    const fallback = createDefaultSaveV2();
    try {
      const [hostSave, hostProfile] = await Promise.all([
        runtime.host.loadSave().catch((error: unknown) => {
          if (error instanceof SaveRecoveryError && error.code === 'invalid-json') throw error;
          return undefined;
        }),
        runtime.host.loadPlayerProfile().catch(() => undefined),
      ]);
      if (revision !== lifecycleRevision) return;
      const next = hostSave ?? fallback;
      replaceSession(hostProfile ? { ...next, playerProfile: hostProfile } : next);
      await refreshSaveSlots();
    } catch (error) {
      if (revision !== lifecycleRevision) return;
      replaceSession(fallback);
      reportSaveError(`Unable to reload after ${event}`, error);
    } finally {
      if (revision === lifecycleRevision) loading.value = false;
    }
  }

  function assetUrl(assetId: string | undefined): string | undefined {
    if (!assetId) return undefined;
    return cachedUrls.value[assetId] ?? resolveAssetUrl(manifest, assetId, baseUrl);
  }

  async function hydrateAsset(assetId: string | undefined): Promise<void> {
    if (!assetId) return;
    const url = await assetCache.cache(assetId);
    if (url) cachedUrls.value = { ...cachedUrls.value, [assetId]: url };
  }

  async function hydrateScene(target: SceneCue): Promise<void> {
    preloadState.value = 'loading';
    preloadSceneId.value = target.id;
    const ids = [target.backgroundAssetId, target.cgAssetId, target.voiceAssetId, target.bgmAssetId,
      ...(target.sfxAssetIds ?? [])].filter((id): id is string => Boolean(id));
    const urls = await assetCache.prefetch(ids);
    if (urls.size) cachedUrls.value = { ...cachedUrls.value, ...Object.fromEntries(urls) };
    await Promise.all(target.portraits.map((portrait) => assetCache.cachePortrait(portrait.portraitAssetId)));
    if (preloadSceneId.value === target.id) preloadState.value = 'ready';
  }

  function prefetchNextScenes(): void {
    const next = scene.value.choices.map((choice) => sceneIndex.get(choice.nextSceneId)).filter((candidate): candidate is SceneCue => Boolean(candidate));
    void (async () => { for (const target of next) await hydrateScene(target); })();
  }

  async function playSceneAudio(): Promise<void> {
    if (muted.value) return;
    if (scene.value.bgmAssetId && currentBgmId !== scene.value.bgmAssetId) {
      currentBgmId = scene.value.bgmAssetId;
      const source = assetUrl(currentBgmId);
      if (source) autoplayBlocked.value = !(await runtime.audio.playBgm(source));
    }
    for (const id of scene.value.sfxAssetIds ?? []) {
      const source = assetUrl(id);
      if (source) void runtime.audio.playSfx(source);
    }
    if (scene.value.voiceAssetId) {
      const source = assetUrl(scene.value.voiceAssetId);
      if (source) void runtime.audio.enqueueVoice(source);
    }
  }

  async function presentScene(): Promise<void> {
    await hydrateScene(scene.value);
    visibleText.value = '';
    const text = session.value.interpolate(scene.value.text);
    dialogueLength.value = text.length;
    dialogueProgress.value = text.length === 0 ? 1 : 0;
    void runtime.typewriter.write(text, (next) => {
      visibleText.value = next;
      dialogueProgress.value = text.length === 0 ? 1 : next.length / text.length;
    }, reducedMotion.value ? 0 : 18);
    void playSceneAudio();
    if (scene.value.cgAssetId) {
      await runtime.gallery.unlock(scene.value.cgAssetId, save.value);
      if (lastSpecialCgScene !== scene.value.id) {
        lastSpecialCgScene = scene.value.id;
        await runtime.specialCg.enqueue({ id: scene.value.id, assetId: scene.value.cgAssetId });
      }
      galleryIds.value = await runtime.gallery.list(save.value);
    }
    prefetchNextScenes();
  }

  async function start(): Promise<void> {
    saveError.value = undefined;
    runtime.mount();
    screen.value = 'game';
    await presentScene();
  }

  async function savePlayerProfile(profile: SaveV2['playerProfile']): Promise<void> {
    const sanitized = sanitizePlayerProfile(profile);
    const stored = { ...structuredClone(session.value.save), playerProfile: sanitized };
    replaceSession(stored);
    profileDraft.value = structuredClone(sanitized);
    try {
      await runtime.host.savePlayerProfile(sanitized);
    } catch (error) {
      if (!(error instanceof ChatVariableWriteError) || !error.fallbackStored) throw error;
    }
    try {
      await runtime.host.saveSave(stored);
    } catch (error) {
      if (!(error instanceof ChatVariableWriteError) || !error.fallbackStored) throw error;
    }
  }

  async function beginWithProfile(profile: SaveV2['playerProfile']): Promise<void> {
    await savePlayerProfile(profile);
    await start();
  }

  async function prepareProfile(): Promise<void> {
    try {
      const profile = await runtime.host.loadPlayerProfile();
      if (profile) profileDraft.value = structuredClone(profile);
    } catch (error) {
      reportSaveError('Unable to load player profile', error);
    }
  }

  async function loadContinueSave(): Promise<SaveV2 | undefined> {
    let failure: unknown;
    try {
      const hostSave = await runtime.host.loadSave();
      if (hostSave) return validateSaveScene(hostSave);
    } catch (error) {
      failure = error;
    }
    try {
      const quick = await runtime.storage.loadSnapshot('quick-save');
      if (quick) return validateSaveScene(quick.save);
    } catch (error) {
      failure ??= error;
    }
    if (failure !== undefined) throw failure;
    return undefined;
  }

  async function continueGame(): Promise<boolean> {
    loading.value = true;
    saveError.value = undefined;
    try {
      const loaded = await loadContinueSave();
      if (!loaded) return false;
      replaceSession(loaded);
      await start();
      return true;
    } catch (error) {
      reportSaveError('Unable to continue', error);
      return false;
    } finally { loading.value = false; }
  }

  async function choose(choiceId: string): Promise<void> {
    runtime.typewriter.completeNow();
    minigameResolution.value = undefined;
    const result = session.value.choose(choiceId);
    triggerRef(session);
    resultText.value = result.resultText ? session.value.interpolate(result.resultText) : undefined;
    const voiceId = result.choice.resultVoiceAssetId;
    await hydrateAsset(voiceId);
    const voice = assetUrl(voiceId);
    if (!muted.value && voice) void runtime.audio.enqueueVoice(voice);
    if (!resultText.value) await presentScene();
  }

  async function dismissResult(): Promise<void> { resultText.value = undefined; await presentScene(); }

  function clearMinigameResolution(): void { minigameResolution.value = undefined; }

  function resolveMinigame(attempt: MinigameAttempt): boolean {
    if (minigameBusy.value) return false;
    minigameBusy.value = true;
    gameplayError.value = undefined;
    try {
      minigameResolution.value = session.value.resolveMinigame(attempt);
      triggerRef(session);
      return true;
    } catch (error) {
      gameplayError.value = minigameActionMessage(error);
      return false;
    } finally {
      minigameBusy.value = false;
    }
  }

  async function snapshot(saveId: string, persistHost: boolean): Promise<void> {
    saving.value = true;
    try {
      const now = new Date().toISOString();
      const stored: SaveV2 = { ...structuredClone(save.value), saveId, updatedAt: now };
      const thumbnail = pendingSlotThumbnail ?? (await captureSceneThumbnail()).blob;
      await runtime.storage.saveSnapshot(stored, thumbnail);
      if (persistHost) await runtime.host.saveSave(stored);
      await refreshSaveSlots();
      saveError.value = undefined;
    } finally {
      saving.value = false;
    }
  }

  async function quickSave(): Promise<void> { await snapshot('quick-save', true); }
  async function saveSlot(slot: number): Promise<void> { await snapshot(`slot-${slot}`, false); }

  async function refreshSaveSlots(): Promise<void> {
    thumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrls.clear();
    const summaries: SaveSlotSummary[] = [];
    let failure: unknown;
    let ids: string[];
    try {
      ids = await runtime.storage.keys('saves');
    } catch (error) {
      saveSlots.value = [];
      reportSaveError('Save slots could not be listed', error);
      return;
    }
    for (const id of ids) {
      let stored;
      try {
        stored = await runtime.storage.loadSnapshot(id);
      } catch (error) {
        failure ??= error;
        continue;
      }
      if (!stored) continue;
      const thumbnailUrl = stored.thumbnail.type.startsWith('image/') ? URL.createObjectURL(stored.thumbnail) : undefined;
      if (thumbnailUrl) thumbnailUrls.add(thumbnailUrl);
      const scene = sceneIndex.get(stored.save.sceneId);
      summaries.push({
        id,
        sceneId: stored.save.sceneId,
        updatedAt: stored.save.updatedAt,
        ...(thumbnailUrl ? { thumbnailUrl } : {}),
        ...(scene ? { chapter: scene.chapter, locationId: scene.locationId, tone: scene.tone } : {}),
      });
    }
    saveSlots.value = summaries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    if (failure !== undefined) reportSaveError('Some save slots could not be read', failure);
    else saveError.value = undefined;
  }

  async function openSaves(): Promise<void> {
    if (screen.value === 'game') pendingSlotThumbnail = (await captureSceneThumbnail()).blob;
    await refreshSaveSlots();
    screen.value = 'saves';
  }
  async function restoreSlot(id: string): Promise<boolean> {
    try {
      const stored = await runtime.storage.loadSnapshot(id);
      if (!stored) return false;
      replaceSession(stored.save);
      screen.value = 'game';
      await presentScene();
      return true;
    } catch (error) {
      reportSaveError(`Unable to load ${id}`, error);
      return false;
    }
  }
  async function deleteSlot(id: string): Promise<void> { await runtime.storage.deleteValue('saves', id); await refreshSaveSlots(); }

  function exportSave(): string { return serializeSaveV2(save.value); }
  async function importSave(text: string): Promise<boolean> {
    const decoded = decodeSaveJson(text);
    if (!decoded.ok) {
      reportSaveError('Unable to import save', decoded.error);
      return false;
    }
    try {
      replaceSession(decoded.save);
      screen.value = 'game';
      await presentScene();
      return true;
    } catch (error) {
      reportSaveError('Unable to import save', error);
      return false;
    }
  }

  async function openGallery(): Promise<void> {
    galleryIds.value = await runtime.gallery.list(save.value);
    await Promise.all(galleryIds.value.map(hydrateAsset));
    screen.value = 'gallery';
  }
  function backToGame(): void { screen.value = 'game'; }
  async function recoverAutoplay(): Promise<void> { autoplayBlocked.value = !(await runtime.audio.recoverAutoplay()); }
  function completeText(): void { runtime.typewriter.completeNow(); }
  function toggleMute(): void { muted.value = !muted.value; if (muted.value) { runtime.audio.stopAll(); currentBgmId = undefined; } else void playSceneAudio(); }
  function gameplayActionMessage(error: unknown): string {
    if (!(error instanceof Error)) return '玩法状态无法更新。';
    if (/not owned|not unlocked/iu.test(error.message)) return '尚未获得或解锁该项目。';
    if (/unavailable on route/iu.test(error.message)) return '当前路线不能使用该项目。';
    if (/unknown/iu.test(error.message)) return '该项目不存在于当前版本。';
    return '玩法状态无法更新。';
  }

  function minigameActionMessage(error: unknown): string {
    if (!(error instanceof Error)) return '这次介入没有生效，请再试一次。';
    if (/already resolved/iu.test(error.message)) return '这场挑战已经结算过了。';
    if (/no minigame is active/iu.test(error.message)) return '当前场景没有可进行的挑战。';
    if (/skipping is unavailable/iu.test(error.message)) return '这场挑战不能跳过。';
    if (/does not match/iu.test(error.message)) return '提交的答案与当前挑战类型不符。';
    if (/unavailable on route/iu.test(error.message)) return '当前路线不能进行这场挑战。';
    return '这次介入没有生效，请再试一次。';
  }

  function runGameplayAction(action: () => void): boolean {
    gameplayError.value = undefined;
    try {
      action();
      triggerRef(session);
      return true;
    } catch (error) {
      gameplayError.value = gameplayActionMessage(error);
      return false;
    }
  }

  function equip(equipmentId: string): boolean { return runGameplayAction(() => session.value.equip(equipmentId)); }
  function wearOutfit(outfitId: string): boolean { return runGameplayAction(() => session.value.wearOutfit(outfitId)); }
  function selectProfession(professionId: string): boolean { return runGameplayAction(() => session.value.selectProfession(professionId)); }

  async function selectWorldbookPreset(presetId: LayeredWorldbookPresetId): Promise<void> {
    const previous = structuredClone(save.value);
    const selection = worldbookSelectionForPreset(presetId);
    const next = structuredClone(save.value);
    next.worldbook = { ...next.worldbook, ...selection };
    next.updatedAt = new Date().toISOString();
    session.value.replaceSave(next);
    triggerRef(session);
    try {
      await runtime.host.saveSave(session.value.save);
      await runtime.host.saveWorldbookSelection(selection);
    } catch (error) {
      if (error instanceof ChatVariableWriteError && error.fallbackStored) return;
      session.value.replaceSave(previous);
      triggerRef(session);
      reportSaveError('Unable to persist worldbook preset', error);
    }
  }

  function disposeUiListeners(): void {
    motionQuery?.removeEventListener('change', handleMotion);
    thumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrls.clear();
  }

  return {
    runtime, manifest, gameplay: script.gameplay, screen, visibleText, dialogueLength, dialogueProgress, typewriterState, resultText, loading, muted, reducedMotion,
    preloadState, preloadSceneId, currentMinigame, activeMinigame, minigameResolution, minigameBusy,
    profileDraft, prepareProfile, beginWithProfile,
    autoplayBlocked, galleryIds, saveSlots, saveError, saving, scene, save, effectiveValues, choices, media, assetUrl, start, continueGame,
    choose, dismissResult, resolveMinigame, clearMinigameResolution, quickSave, saveSlot, openSaves, restoreSlot, deleteSlot, exportSave, importSave,
    openGallery, backToGame, recoverAutoplay, completeText, toggleMute, equip, wearOutfit, presentation,
    selectProfession, gameplayError, disposeUiListeners,
    selectWorldbookPreset,
  };
});
