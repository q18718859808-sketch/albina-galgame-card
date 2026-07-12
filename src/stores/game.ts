import { computed, markRaw, ref, shallowRef, triggerRef } from 'vue';
import { defineStore } from 'pinia';

import manifestJson from '../../content/asset-manifest-v2.json';
import storyJson from '../../dist/albina-galgame-card/data/game-script-v2.json';
import { parseAssetManifestV2 } from '../domain/assets';
import { parseGameScriptV2 } from '../domain/game-script';
import { parseSaveV2, serializeSaveV2 } from '../domain/save';
import { GameSession } from '../game/session';
import { ALBINA_CDN_BASE, resolveAssetUrl } from '../runtime/asset-resolver';
import { createDefaultHostBindings } from '../runtime/default-host';
import { createAlbinaRuntime } from '../runtime/host-adapter';
import { selectSceneMedia } from '../runtime/video';

const script = parseGameScriptV2(storyJson);
const manifest = parseAssetManifestV2(manifestJson);

export const useGameStore = defineStore('albina-game', () => {
  const baseUrl = typeof window !== 'undefined' ? window.__ALBINA_BASE_URL__ ?? ALBINA_CDN_BASE : ALBINA_CDN_BASE;
  const runtime = markRaw(createAlbinaRuntime({ manifest, host: createDefaultHostBindings(), assetBaseUrl: baseUrl }));
  const session = shallowRef(new GameSession(script));
  const screen = ref<'title' | 'game' | 'gallery' | 'settings'>('title');
  const visibleText = ref('');
  const resultText = ref<string>();
  const loading = ref(false);
  const muted = ref(false);
  const videoEnabled = ref(true);
  const motionQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : undefined;
  const reducedMotion = ref(motionQuery?.matches ?? false);
  motionQuery?.addEventListener('change', (event) => { reducedMotion.value = event.matches; });
  const autoplayBlocked = ref(false);
  const videoFailed = ref(false);
  const galleryIds = ref<string[]>([]);

  const scene = computed(() => session.value.scene);
  const save = computed(() => session.value.save);
  const choices = computed(() => session.value.choices);
  const desktop = ref(typeof innerWidth === 'number' ? innerWidth > 800 : true);
  const media = computed(() => selectSceneMedia(scene.value, manifest, {
    baseUrl,
    desktop: desktop.value,
    reducedMotion: reducedMotion.value,
    videoEnabled: videoEnabled.value && !videoFailed.value,
  }));

  function assetUrl(assetId: string | undefined): string | undefined { return resolveAssetUrl(manifest, assetId, baseUrl); }

  async function presentScene(): Promise<void> {
    videoFailed.value = false;
    visibleText.value = '';
    const text = session.value.interpolate(scene.value.text);
    void runtime.typewriter.write(text, (next) => { visibleText.value = next; }, reducedMotion.value ? 0 : 18);
    if (!muted.value && scene.value.voiceAssetId) {
      const source = assetUrl(scene.value.voiceAssetId);
      if (source) void runtime.audio.enqueueVoice(source);
    }
    if (scene.value.cgAssetId) {
      await runtime.gallery.unlock(scene.value.cgAssetId, save.value);
      galleryIds.value = await runtime.gallery.list(save.value);
    }
  }

  async function start(): Promise<void> {
    runtime.mount();
    screen.value = 'game';
    await presentScene();
  }

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
    const voice = result.choice.resultVoiceAssetId && assetUrl(result.choice.resultVoiceAssetId);
    if (!muted.value && voice) void runtime.audio.enqueueVoice(voice);
    if (!resultText.value) await presentScene();
  }

  async function dismissResult(): Promise<void> { resultText.value = undefined; await presentScene(); }

  async function quickSave(): Promise<void> {
    await runtime.host.saveSave(save.value);
    await runtime.storage.saveSnapshot(save.value, new Blob([scene.value.id], { type: 'text/plain' }));
  }

  function exportSave(): string { return serializeSaveV2(save.value); }

  async function importSave(text: string): Promise<void> {
    const imported = parseSaveV2(JSON.parse(text));
    session.value = new GameSession(script, { save: imported });
    screen.value = 'game';
    await presentScene();
  }

  async function openGallery(): Promise<void> { galleryIds.value = await runtime.gallery.list(save.value); screen.value = 'gallery'; }
  function backToGame(): void { screen.value = 'game'; }
  async function recoverAutoplay(): Promise<void> { autoplayBlocked.value = !(await runtime.audio.recoverAutoplay()); }
  function completeText(): void { runtime.typewriter.completeNow(); }
  function setVideoFailed(): void { videoFailed.value = true; }
  function toggleMute(): void { muted.value = !muted.value; if (muted.value) runtime.audio.stopAll(); }

  return {
    runtime, manifest, screen, visibleText, resultText, loading, muted, videoEnabled, reducedMotion,
    autoplayBlocked, galleryIds, scene, save, choices, media, assetUrl, start, continueGame, choose,
    dismissResult, quickSave, exportSave, importSave, openGallery, backToGame, recoverAutoplay,
    completeText, setVideoFailed, toggleMute,
  };
});
