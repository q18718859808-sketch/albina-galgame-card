import { computed, markRaw, ref, shallowRef, triggerRef } from 'vue';
import { defineStore } from 'pinia';

import manifestJson from '../../content/asset-manifest-v2.json';
import storyJson from '../../dist/albina-galgame-card/data/game-script-v2.json';
import { parseAssetManifestV2 } from '../domain/assets';
import { parseGameScriptV2 } from '../domain/game-script';
import { parseSaveV2, serializeSaveV2, type SaveV2 } from '../domain/save';
import type { SceneCue } from '../domain/scene-cue';
import { GameSession } from '../game/session';
import { RuntimeAssetCache } from '../runtime/asset-cache';
import { ALBINA_CDN_BASE, resolveAssetUrl } from '../runtime/asset-resolver';
import { createDefaultHostBindings } from '../runtime/default-host';
import { createAlbinaRuntime } from '../runtime/host-adapter';
import { captureSceneThumbnail } from '../runtime/thumbnail';
import { chosenSceneVideoId, selectSceneMedia } from '../runtime/video';

const script = parseGameScriptV2(storyJson);
const manifest = parseAssetManifestV2(manifestJson);
const sceneIndex = new Map(script.scenes.map((scene) => [scene.id, scene]));

export interface SaveSlotSummary { id: string; sceneId: string; updatedAt: string; thumbnailUrl?: string }

export const useGameStore = defineStore('albina-game', () => {
  const baseUrl = typeof window !== 'undefined' ? window.__ALBINA_BASE_URL__ ?? ALBINA_CDN_BASE : ALBINA_CDN_BASE;
  const runtime = markRaw(createAlbinaRuntime({ manifest, host: createDefaultHostBindings(), assetBaseUrl: baseUrl }));
  const assetCache = markRaw(new RuntimeAssetCache(manifest, runtime.storage, baseUrl));
  runtime.portraits.setUrlResolver(async (id) => manifest.portraits.some((portrait) => portrait.id === id) ? assetCache.cachePortrait(id) : assetCache.cache(id));
  const session = shallowRef(new GameSession(script));
  const screen = ref<'title' | 'game' | 'gallery' | 'settings' | 'saves'>('title');
  const visibleText = ref('');
  const resultText = ref<string>();
  const loading = ref(false);
  const muted = ref(false);
  const videoEnabled = ref(true);
  const autoplayBlocked = ref(false);
  const videoFailed = ref(false);
  const galleryIds = ref<string[]>([]);
  const cachedUrls = ref<Record<string, string>>({});
  const readyVideoIds = ref<Record<string, boolean>>({});
  const saveSlots = ref<SaveSlotSummary[]>([]);
  const thumbnailUrls = new Set<string>();
  const motionQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : undefined;
  const reducedMotion = ref(motionQuery?.matches ?? false);
  const desktop = ref(typeof innerWidth === 'number' ? innerWidth > 800 : true);
  let currentBgmId: string | undefined;
  let lastSpecialCgScene: string | undefined;
  let pendingSlotThumbnail: Blob | undefined;

  const handleMotion = (event: MediaQueryListEvent) => {
    reducedMotion.value = event.matches;
    if (event.matches) void hydrateAsset(scene.value.cgAssetId ?? scene.value.backgroundAssetId);
    else void prefetchChosenVideo(scene.value);
  };
  const handleResize = () => { desktop.value = innerWidth > 800; void prefetchChosenVideo(scene.value); };
  motionQuery?.addEventListener('change', handleMotion);
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
  }

  const scene = computed(() => session.value.scene);
  const save = computed(() => session.value.save);
  const choices = computed(() => session.value.choices);
  const media = computed(() => selectSceneMedia(scene.value, manifest, {
    baseUrl, desktop: desktop.value, reducedMotion: reducedMotion.value,
    videoEnabled: videoEnabled.value && !videoFailed.value,
  }, (assetId) => assetId?.startsWith('video.') && !readyVideoIds.value[assetId] ? undefined : assetUrl(assetId)));

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
    const ids = [target.backgroundAssetId, target.cgAssetId, target.voiceAssetId, target.bgmAssetId,
      ...(target.sfxAssetIds ?? [])].filter((id): id is string => Boolean(id));
    const urls = await assetCache.prefetch(ids);
    if (urls.size) cachedUrls.value = { ...cachedUrls.value, ...Object.fromEntries(urls) };
    for (const portrait of target.portraits) await assetCache.cachePortrait(portrait.portraitAssetId);
  }

  function playbackPolicy() {
    return { baseUrl, desktop: desktop.value, reducedMotion: reducedMotion.value, videoEnabled: videoEnabled.value && !videoFailed.value };
  }

  async function prefetchChosenVideo(target: SceneCue): Promise<void> {
    const videoId = chosenSceneVideoId(target, playbackPolicy());
    if (!videoId || readyVideoIds.value[videoId]) return;
    const url = await assetCache.cache(videoId);
    if (!url) return;
    cachedUrls.value = { ...cachedUrls.value, [videoId]: url };
    readyVideoIds.value = { ...readyVideoIds.value, [videoId]: true };
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
    videoFailed.value = false;
    await hydrateScene(scene.value);
    visibleText.value = '';
    const text = session.value.interpolate(scene.value.text);
    void runtime.typewriter.write(text, (next) => { visibleText.value = next; }, reducedMotion.value ? 0 : 18);
    void playSceneAudio();
    if (scene.value.cgAssetId) {
      await runtime.gallery.unlock(scene.value.cgAssetId, save.value);
      if (lastSpecialCgScene !== scene.value.id) {
        lastSpecialCgScene = scene.value.id;
        await runtime.specialCg.enqueue({ id: scene.value.id, assetId: scene.value.cgAssetId });
      }
      galleryIds.value = await runtime.gallery.list(save.value);
    }
    void prefetchChosenVideo(scene.value);
    prefetchNextScenes();
  }

  async function start(): Promise<void> { runtime.mount(); screen.value = 'game'; await presentScene(); }

  async function continueGame(): Promise<boolean> {
    loading.value = true;
    try {
      const loaded = await runtime.host.loadSave();
      if (!loaded) return false;
      session.value = new GameSession(script, { save: loaded });
      await start();
      return true;
    } finally { loading.value = false; }
  }

  async function choose(choiceId: string): Promise<void> {
    runtime.typewriter.completeNow();
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

  async function snapshot(saveId: string, persistHost: boolean): Promise<void> {
    const now = new Date().toISOString();
    const stored: SaveV2 = { ...structuredClone(save.value), saveId, updatedAt: now };
    const thumbnail = pendingSlotThumbnail ?? (await captureSceneThumbnail()).blob;
    await runtime.storage.saveSnapshot(stored, thumbnail);
    if (persistHost) await runtime.host.saveSave(stored);
    await refreshSaveSlots();
  }

  async function quickSave(): Promise<void> { await snapshot('quick-save', true); }
  async function saveSlot(slot: number): Promise<void> { await snapshot(`slot-${slot}`, false); }

  async function refreshSaveSlots(): Promise<void> {
    thumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrls.clear();
    const summaries: SaveSlotSummary[] = [];
    for (const id of await runtime.storage.keys('saves')) {
      const stored = await runtime.storage.loadSnapshot(id);
      if (!stored) continue;
      const thumbnailUrl = stored.thumbnail.type.startsWith('image/') ? URL.createObjectURL(stored.thumbnail) : undefined;
      if (thumbnailUrl) thumbnailUrls.add(thumbnailUrl);
      summaries.push({ id, sceneId: stored.save.sceneId, updatedAt: stored.save.updatedAt, ...(thumbnailUrl ? { thumbnailUrl } : {}) });
    }
    saveSlots.value = summaries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }

  async function openSaves(): Promise<void> {
    if (screen.value === 'game') pendingSlotThumbnail = (await captureSceneThumbnail()).blob;
    await refreshSaveSlots();
    screen.value = 'saves';
  }
  async function restoreSlot(id: string): Promise<void> {
    const stored = await runtime.storage.loadSnapshot(id);
    if (!stored) return;
    session.value = new GameSession(script, { save: parseSaveV2(stored.save) });
    screen.value = 'game';
    await presentScene();
  }
  async function deleteSlot(id: string): Promise<void> { await runtime.storage.deleteValue('saves', id); await refreshSaveSlots(); }

  function exportSave(): string { return serializeSaveV2(save.value); }
  async function importSave(text: string): Promise<void> {
    session.value = new GameSession(script, { save: parseSaveV2(JSON.parse(text)) });
    screen.value = 'game';
    await presentScene();
  }

  async function openGallery(): Promise<void> {
    galleryIds.value = await runtime.gallery.list(save.value);
    await Promise.all(galleryIds.value.map(hydrateAsset));
    screen.value = 'gallery';
  }
  function backToGame(): void { screen.value = 'game'; }
  async function recoverAutoplay(): Promise<void> { autoplayBlocked.value = !(await runtime.audio.recoverAutoplay()); }
  function completeText(): void { runtime.typewriter.completeNow(); }
  function setVideoFailed(): void { videoFailed.value = true; }
  function toggleMute(): void { muted.value = !muted.value; if (muted.value) { runtime.audio.stopAll(); currentBgmId = undefined; } else void playSceneAudio(); }
  function disposeUiListeners(): void {
    motionQuery?.removeEventListener('change', handleMotion);
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    }
    thumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrls.clear();
  }

  return {
    runtime, manifest, screen, visibleText, resultText, loading, muted, videoEnabled, reducedMotion,
    autoplayBlocked, galleryIds, saveSlots, scene, save, choices, media, assetUrl, start, continueGame,
    choose, dismissResult, quickSave, saveSlot, openSaves, restoreSlot, deleteSlot, exportSave, importSave,
    openGallery, backToGame, recoverAutoplay, completeText, setVideoFailed, toggleMute, disposeUiListeners,
  };
});
