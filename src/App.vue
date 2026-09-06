<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import audioLicensesJson from '../content/audio-licenses-v1.json';
import GameplayPanel from './components/GameplayPanel.vue';
import NarrativeMinigame from './components/minigames/NarrativeMinigame.vue';
import PortraitStage from './components/PortraitStage.vue';
import SceneAtmosphere from './components/SceneAtmosphere.vue';
import { AudioLicenseRegistrySchema } from './domain/assets';
import type { MinigameAttempt } from './domain/minigame';
import type { VfxCue } from './domain/vfx-cue';
import { ALBINA_RELEASE_VERSION } from './runtime/asset-resolver';
import { chapterLabel, formatSaveTime, locationLabel, toneLabel } from './runtime/labels';
import { createAlbinaMotionController, type AlbinaMotionController } from './runtime/ui-motion';
import { useGameStore, type SaveSlotSummary } from './stores/game';
import type { VfxQualityPreference } from './vfx/galgame-vfx';

const game = useGameStore();
const appRoot = ref<HTMLElement>();
const transitionVeil = ref<HTMLElement>();
const galleryViewerRoot = ref<HTMLElement>();
const galleryViewerCloseButton = ref<HTMLButtonElement>();
const galleryTrigger = ref<HTMLButtonElement>();
let motion: AlbinaMotionController | undefined;
const audioCredits = AudioLicenseRegistrySchema.parse(audioLicensesJson);
const importText = ref('');
const exportText = ref('');
const exportTextarea = ref<HTMLTextAreaElement>();
const copiedExport = ref(false);
let copiedExportTimer: ReturnType<typeof setTimeout> | undefined;
const importedSave = ref(false);
let importedSaveTimer: ReturnType<typeof setTimeout> | undefined;
const gameplayOpen = ref(false);
const minigameOpen = ref(false);
const minigameBackdrop = ref<HTMLElement>();
const minigameButton = ref<HTMLButtonElement>();
const minigameResult = ref<{ outcome: NonNullable<typeof game.minigameResolution>['outcome']; score: number; assisted: boolean }>();
const minigameResultButton = ref<HTMLButtonElement>();
const gameplayButton = ref<HTMLButtonElement>();
const activeScreen = ref('title');
let requestedScreen: string | undefined;
let screenTransitioning = false;
const saveStatus = ref<HTMLElement>();
const valueStatus = ref<HTMLElement>();
const resultOverlay = ref<HTMLElement>();
const resultRoot = ref<HTMLElement>();
const previousValues = ref({ ...game.effectiveValues });
const hudValues = [
  { key: 'affectionAlbina', label: '好感' },
  { key: 'trust', label: '信任' },
  { key: 'danger', label: '危险' },
  { key: 'artResonance', label: '共鸣' },
] as const;
const sceneAtmosphere = ref<{ emitCue(cue: VfxCue): void }>();
const vfxQuality = ref<VfxQualityPreference>('auto');
const profileDraft = ref({ ...game.profileDraft });
const gallerySelectedId = ref<string>();
const galleryAssets = computed(() => game.galleryIds.map((id) => ({ id, url: game.assetUrl(id) })).filter((asset): asset is { id: string; url: string } => typeof asset.url === 'string' && asset.url.length > 0));
/** Gallery covers that failed to load; they degrade to a labelled placeholder. */
const failedGallery = ref(new Set<string>());
/** Gallery covers that finished loading; pairs with failedGallery to drive the loading skeleton. */
const loadedGallery = ref(new Set<string>());
const retryingGallery = ref(new Set<string>());
const galleryRetryNonce = ref<Record<string, number>>({});
function gallerySrc(id: string, url: string): string {
  const nonce = galleryRetryNonce.value[id];
  return nonce ? `${url}${url.includes('?') ? '&' : '?'}retry=${nonce}` : url;
}
function galleryState(id: string): 'loading' | 'loaded' | 'failed' {
  if (failedGallery.value.has(id)) return 'failed';
  return loadedGallery.value.has(id) ? 'loaded' : 'loading';
}
function markGalleryFailed(id: string): void {
  const nextRetrying = new Set(retryingGallery.value);
  nextRetrying.delete(id);
  retryingGallery.value = nextRetrying;
  if (failedGallery.value.has(id)) return;
  failedGallery.value = new Set(failedGallery.value).add(id);
  if (loadedGallery.value.has(id)) {
    const nextLoaded = new Set(loadedGallery.value);
    nextLoaded.delete(id);
    loadedGallery.value = nextLoaded;
  }
}
function retryGalleryAsset(id: string): void {
  if (retryingGallery.value.has(id)) return;
  retryingGallery.value = new Set(retryingGallery.value).add(id);
  const nextFailed = new Set(failedGallery.value);
  nextFailed.delete(id);
  failedGallery.value = nextFailed;
  const nextLoaded = new Set(loadedGallery.value);
  nextLoaded.delete(id);
  loadedGallery.value = nextLoaded;
  galleryRetryNonce.value = { ...galleryRetryNonce.value, [id]: (galleryRetryNonce.value[id] ?? 0) + 1 };
}
/** Gallery ids whose cover load failed, in the order the grid renders them. */
const failedGalleryIds = computed(() => galleryAssets.value.filter((asset) => failedGallery.value.has(asset.id)).map((asset) => asset.id));
/** Re-requests every failed cover in one action; per-item retry stays available. */
function retryAllGalleryAssets(): void {
  for (const id of failedGalleryIds.value) retryGalleryAsset(id);
}
function markGalleryLoaded(id: string): void {
  const nextRetrying = new Set(retryingGallery.value);
  nextRetrying.delete(id);
  retryingGallery.value = nextRetrying;
  if (failedGallery.value.has(id) || loadedGallery.value.has(id)) return;
  loadedGallery.value = new Set(loadedGallery.value).add(id);
}

function exportCurrentSave(): void { exportText.value = game.exportSave(); }
/** Copies the exported save JSON; falls back to select + execCommand outside secure contexts. */
async function copyExport(): Promise<void> {
  const text = exportText.value;
  if (!text) return;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = exportTextarea.value;
      if (ta) {
        ta.select();
        document.execCommand('copy');
        ta.setSelectionRange(0, 0);
      }
    }
    copiedExport.value = true;
    window.clearTimeout(copiedExportTimer);
    copiedExportTimer = setTimeout(() => { copiedExport.value = false; }, 2000);
  } catch { /* 剪贴板不可用时静默失败，不显示虚假成功态 */ }
}
async function importCurrentSave(): Promise<void> {
  const text = importText.value.trim();
  if (!text) return;
  if (await game.importSave(text)) {
    importText.value = '';
    importedSave.value = true;
    window.clearTimeout(importedSaveTimer);
    importedSaveTimer = setTimeout(() => { importedSave.value = false; }, 2000);
  }
}
/** Syntax-level preflight for pasted SaveV2 JSON; schema validation stays in the store. */
const importPreview = computed(() => {
  const text = importText.value.trim();
  if (!text) return { state: 'empty' as const, error: undefined as string | undefined };
  try {
    JSON.parse(text);
    return { state: 'valid' as const, error: undefined };
  } catch (error) {
    return { state: 'invalid' as const, error: error instanceof Error ? error.message : 'JSON 格式错误' };
  }
});
const importState = computed(() => importPreview.value.state);
const importError = computed(() => importPreview.value.error);
async function openProfile(): Promise<void> {
  game.screen = 'profile';
  await game.prepareProfile();
  profileDraft.value = { ...game.profileDraft };
}
async function beginWithProfile(): Promise<void> { await game.beginWithProfile({ ...profileDraft.value }); }
function selectGalleryAsset(id: string, trigger?: EventTarget | null): void {
  galleryTrigger.value = trigger instanceof HTMLButtonElement ? trigger : undefined;
  gallerySelectedId.value = id;
}
function emitVfx(cue: VfxCue): void { sceneAtmosphere.value?.emitCue(cue); }
function signed(value: number): string { return `${value > 0 ? '+' : ''}${value}`; }
/** Display line for a save slot: chapter + location label when the scene still resolves. */
function sceneLabelOf(slot: SaveSlotSummary): string {
  if (slot.locationId !== undefined) return `${chapterLabel(slot.chapter)} · ${locationLabel(slot.locationId)}`;
  return slot.sceneId;
}
/** Tone badge for the HUD scene label; hidden when the tone id is unmapped. */
const sceneToneLabel = computed(() => (game.scene.tone ? toneLabel(game.scene.tone) : undefined));
/** Two-step delete: first click arms the confirming state, the second commits. */
const confirmingDelete = ref<string | null>(null);
let deleteConfirmTimer: ReturnType<typeof setTimeout> | undefined;
function clearDeleteConfirmTimer(): void {
  if (deleteConfirmTimer !== undefined) {
    clearTimeout(deleteConfirmTimer);
    deleteConfirmTimer = undefined;
  }
}
function requestDeleteSlot(id: string): void {
  if (confirmingDelete.value === id) {
    clearDeleteConfirmTimer();
    confirmingDelete.value = null;
    game.deleteSlot(id);
    return;
  }
  confirmingDelete.value = id;
  clearDeleteConfirmTimer();
  deleteConfirmTimer = setTimeout(() => { confirmingDelete.value = null; }, 3000);
}
function finishGalleryViewerClose(): void {
  gallerySelectedId.value = undefined;
  void nextTick(() => galleryTrigger.value?.focus());
}
function closeGalleryViewer(): void {
  const root = galleryViewerRoot.value;
  if (root && motion && !game.reducedMotion) motion.dismissModal(root, finishGalleryViewerClose);
  else finishGalleryViewerClose();
}
function handleGalleryViewerKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeGalleryViewer();
    return;
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    stepGalleryAsset(event.key === 'ArrowRight' ? 1 : -1);
    return;
  }
  if (event.key === 'Tab') {
    // Roving trap: cycle through whatever the viewer currently exposes (close, retry,
    // prev/next) instead of pinning focus onto a single control.
    event.preventDefault();
    const focusable = [...(galleryViewerRoot.value?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? [])];
    if (focusable.length === 0) return;
    const current = focusable.indexOf(document.activeElement as HTMLButtonElement);
    const offset = event.shiftKey ? -1 : 1;
    const next = current === -1 ? 0 : (current + offset + focusable.length) % focusable.length;
    focusable[next]?.focus();
  }
}
/** Position of the open CG inside the unlocked set; -1 when the viewer is closed. */
const galleryIndex = computed(() => (gallerySelectedId.value === undefined
  ? -1
  : galleryAssets.value.findIndex((asset) => asset.id === gallerySelectedId.value)));
/** Wrap-around step between unlocked CGs, keeping the reopen focus target intact. */
function stepGalleryAsset(delta: number): void {
  const assets = galleryAssets.value;
  if (assets.length < 2 || galleryIndex.value === -1) return;
  const next = assets[(galleryIndex.value + delta + assets.length) % assets.length];
  if (next) gallerySelectedId.value = next.id;
}
function closeGameplay(): void {
  const root = appRoot.value?.querySelector<HTMLElement>('[data-motion-modal]');
  const finish = () => {
    gameplayOpen.value = false;
    void nextTick(() => gameplayButton.value?.focus());
  };
  if (root && motion && !game.reducedMotion) motion.dismissModal(root, finish);
  else finish();
}
function closeMinigame(): void {
  const root = minigameBackdrop.value;
  const finish = () => {
    minigameOpen.value = false;
    void nextTick(() => minigameButton.value?.focus());
  };
  if (root && motion && !game.reducedMotion) motion.dismissModal(root, finish);
  else finish();
}
function openMinigame(): void {
  if (!game.activeMinigame) return;
  minigameResult.value = undefined;
  game.clearMinigameResolution();
  minigameOpen.value = true;
  void nextTick(() => {
    if (minigameBackdrop.value) motion?.reveal('modal', minigameBackdrop.value);
  });
}
function dismissMinigameResult(): void {
  const root = resultRoot.value;
  const done = () => { minigameResult.value = undefined; game.clearMinigameResolution(); };
  if (root && motion && !game.reducedMotion) motion.dismissMinigameResult(root, done);
  else done();
}
function minigameOutcomeLabel(outcome: 'perfect' | 'assisted' | 'setback' | 'skipped'): string {
  return ({ perfect: '完美介入', assisted: '辅助完成', setback: '介入受挫', skipped: '已跳过' })[outcome];
}
function resolveMinigame(attempt: MinigameAttempt): void {
  if (!game.resolveMinigame(attempt) || !game.minigameResolution) return;
  const resolution = game.minigameResolution;
  minigameResult.value = { ...resolution };
  emitVfx({ kind: resolution.outcome === 'perfect' ? 'cg-reveal' : resolution.outcome === 'setback' ? 'impact' : 'choice-confirm' });
  closeMinigame();
}
async function choose(choiceId: string, event?: MouseEvent): Promise<void> {
  const button = event?.currentTarget instanceof HTMLButtonElement ? event.currentTarget : undefined;
  if (button) motion?.pulseChoice(button);
  emitVfx({ kind: 'choice-confirm' });
  await game.choose(choiceId);
}
function completeText(): void {
  if (game.typewriterState !== 'typing') return;
  game.completeText();
  emitVfx({ kind: 'dialogue-emphasis', intensity: 0.28, durationMs: 220 });
  const dialogue = appRoot.value?.querySelector<HTMLElement>('.dialogue-box');
  if (dialogue) motion?.pulseDialogue(dialogue);
}
function handleInteractivePress(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest<HTMLButtonElement>('button:not([disabled])');
  if (button && !button.closest('.choice-list')) motion?.pulseHud(button);
}
function motionKindForScreen(screen: string): 'title' | 'profile' | 'panel' | 'game' {
  if (screen === 'title') return 'title';
  if (screen === 'profile') return 'profile';
  return screen === 'game' ? 'game' : 'panel';
}
async function runScreenTransition(next: string): Promise<void> {
  if (screenTransitioning) {
    requestedScreen = next;
    return;
  }
  if (next === activeScreen.value) return;
  screenTransitioning = true;
  const current = appRoot.value?.querySelector<HTMLElement>('[data-motion-screen]');
  const commit = async () => {
    activeScreen.value = next;
    await nextTick();
    const incoming = appRoot.value?.querySelector<HTMLElement>('[data-motion-screen]');
    if (incoming) motion?.enterScreen(motionKindForScreen(next), incoming, finish);
    else finish();
  };
  const finish = () => {
    screenTransitioning = false;
    const queued = requestedScreen;
    requestedScreen = undefined;
    if (queued && queued !== activeScreen.value) void runScreenTransition(queued);
  };
  if (current && motion) motion.leaveScreen(current, () => { void commit(); });
  else await commit();
}
watch(() => game.screen, (screen) => { void runScreenTransition(screen); }, { flush: 'post' });
watch(() => game.saving, async (saving) => {
  await nextTick();
  if (saveStatus.value) motion?.pulseStatus(saveStatus.value, saving ? 'cool' : 'golden');
});
watch(() => game.effectiveValues, async (values) => {
  const previous = previousValues.value;
  previousValues.value = { ...values };
  if (Object.keys(values).every((key) => values[key as keyof typeof values] === previous[key as keyof typeof previous])) return;
  await nextTick();
  const dangerRaised = values.danger > previous.danger;
  if (valueStatus.value) motion?.pulseStatus(valueStatus.value, dangerRaised ? 'danger' : 'golden');
  // Pulse only the segments whose authored value actually shifted, so a
  // single stat change reads as one movement instead of a whole-strip flash.
  for (const entry of hudValues) {
    const key = entry.key;
    const segment = valueStatus.value?.querySelector<HTMLElement>(`[data-hud-value-key="${key}"]`);
    if (!segment) continue;
    if (values[key] === previous[key]) continue;
    segment.dataset.hudChanged = 'true';
    motion?.pulseHudValue(segment, key === 'danger' && values.danger > previous.danger ? 'danger' : 'golden');
    const clear = () => { segment.dataset.hudChanged = 'false'; };
    window.setTimeout(clear, 420);
  }
}, { deep: true });
watch(() => game.resultText, async (result) => {
  if (!result) return;
  await nextTick();
  if (resultOverlay.value) motion?.revealResult(resultOverlay.value);
});
watch(() => game.scene.id, () => {
  minigameOpen.value = false;
  minigameResult.value = undefined;
  game.clearMinigameResolution();
  void nextTick(() => {
    if (appRoot.value) motion?.transitionScene(appRoot.value);
    const dialogue = appRoot.value?.querySelector<HTMLElement>('.dialogue-box');
    if (dialogue) motion?.revealDialogue(dialogue);
    const sceneLabel = appRoot.value?.querySelector<HTMLElement>('[data-testid="scene-label"]');
    if (sceneLabel) motion?.revealSceneLabel(sceneLabel);
    if (transitionVeil.value && !game.reducedMotion) {
      motion?.wipeScene(transitionVeil.value);
    }
    if (game.scene.cgAssetId) emitVfx({ kind: 'cg-reveal' });
    if (game.scene.ending) emitVfx({ kind: 'ending' });
  });
});
watch(() => game.scene.speaker, async () => {
  await nextTick();
  const dialogue = appRoot.value?.querySelector<HTMLElement>('.dialogue-box');
  if (dialogue) motion?.switchSpeaker(dialogue);
}, { flush: 'post' });
watch(() => minigameResult.value, async (result) => {
  if (!result) return;
  await nextTick();
  const root = appRoot.value?.querySelector<HTMLElement>('.minigame-result');
  minigameResultButton.value?.focus();
  if (root) motion?.revealMinigameResult(root, result.outcome);
});
watch(() => gameplayOpen.value, async () => {
  await nextTick();
});
watch(() => gallerySelectedId.value, async (id, previous) => {
  await nextTick();
  // Only the initial open plays the modal reveal and claims focus. Stepping between
  // CGs must not replay the entrance or yank focus off the nav button in use.
  if (id && previous === undefined && galleryViewerRoot.value) {
    motion?.reveal('modal', galleryViewerRoot.value);
    galleryViewerCloseButton.value?.focus();
  }
});
onMounted(() => {
  motion = createAlbinaMotionController(computed(() => game.reducedMotion));
  void nextTick(() => {
    const root = appRoot.value?.querySelector<HTMLElement>('[data-motion-screen]');
    if (root) motion?.reveal(motionKindForScreen(activeScreen.value), root);
  });
});
onBeforeUnmount(() => { clearDeleteConfirmTimer(); clearTimeout(copiedExportTimer); clearTimeout(importedSaveTimer); motion?.dispose(); game.disposeUiListeners(); game.runtime.unmount(); });
</script>

<template>
  <main ref="appRoot" class="albina-app" data-albina-application :data-screen="activeScreen" :data-requested-screen="game.screen" :data-motion-ready="motion ? 'true' : 'false'" @click.capture="handleInteractivePress">
    <p v-if="game.saveError" class="save-error" role="alert" data-testid="save-error">{{ game.saveError.message }}</p>
    <section v-if="activeScreen === 'title'" class="title-screen" data-testid="title-screen" data-motion-screen>
      <div class="title-screen__veil" />
      <div class="title-screen__content">
        <p class="eyebrow">Canto IX · 独立前端卡</p>
        <h1>ALBINA</h1>
        <p class="subtitle">白色画布上的残响</p>
        <nav class="title-actions" aria-label="主菜单">
        <button data-testid="new-game" @click="openProfile">开始新篇</button>
          <button data-testid="continue-game" :disabled="game.loading" @click="game.continueGame">继续</button>
          <button data-testid="title-saves" @click="game.openSaves">存档</button>
          <button @click="game.openGallery">CG 图鉴</button>
          <button data-testid="title-settings" @click="game.screen = 'settings'">设置</button>
          <button data-testid="title-credits" @click="game.screen = 'credits'">版权与鸣谢</button>
        </nav>
        <p class="build-state" data-testid="build-state" :data-build-version="ALBINA_RELEASE_VERSION">v{{ ALBINA_RELEASE_VERSION }} · 确定性主剧情 · 运行时零媒体 API</p>
      </div>
    </section>

    <section v-else-if="activeScreen === 'profile'" class="profile-screen" data-testid="profile-screen" data-motion-screen>
      <header class="profile-screen__header">
        <button data-testid="profile-back" @click="game.screen = 'title'">返回</button>
        <div><p class="eyebrow">PLAYER PROFILE</p><h2>开始新篇</h2></div>
        <span class="profile-screen__fixed">Fixed protagonist portrait</span>
      </header>
      <form class="profile-form" @submit.prevent="beginWithProfile">
        <p class="profile-form__notice">The adult male protagonist keeps a fixed visual design. These fields guide narrative and the chat-scoped profile record.</p>
        <label><span>姓名</span><input v-model="profileDraft.name" data-testid="profile-name" maxlength="80" required></label>
        <label><span>称呼</span><input v-model="profileDraft.addressName" data-testid="profile-address" maxlength="80" required></label>
        <label><span>性别表达</span><input v-model="profileDraft.gender" maxlength="80" required></label>
        <label><span>外观描述</span><textarea v-model="profileDraft.appearance" maxlength="800" rows="3" /></label>
        <label><span>背景</span><textarea v-model="profileDraft.background" maxlength="800" rows="3" /></label>
        <label><span>职业或能力倾向</span><textarea v-model="profileDraft.ability" maxlength="400" rows="2" /></label>
        <label><span>与阿尔比娜的初始关系倾向</span><textarea v-model="profileDraft.initialRelationship" data-testid="profile-relationship" maxlength="400" rows="2" /></label>
        <label><span>内容边界</span><textarea v-model="profileDraft.boundaries" maxlength="800" rows="3" /></label>
        <label><span>路线偏好</span><select v-model="profileDraft.routePreference" data-testid="profile-route"><option value="white_canvas">White Canvas</option><option value="golden_bough_rebuild">Golden Bough Rebuild</option><option value="ring_conspiracy">Ring Conspiracy</option></select></label>
        <footer class="profile-form__actions"><button type="button" @click="game.screen = 'title'">取消</button><button type="submit" data-testid="profile-begin" :disabled="game.preloadState === 'loading'">{{ game.preloadState === 'loading' ? '准备媒体…' : '确认档案并开始' }}</button></footer>
      </form>
    </section>

    <section v-else-if="activeScreen === 'saves'" class="panel-screen" data-testid="saves-screen" data-motion-screen>
      <header><button @click="game.screen = 'title'">返回</button><h2>存档管理</h2></header>
      <div class="slot-actions"><button data-testid="save-slot-1" @click="game.saveSlot(1)">保存到槽位 1</button><button @click="game.saveSlot(2)">保存到槽位 2</button><button @click="game.saveSlot(3)">保存到槽位 3</button></div>
      <div class="save-slot-grid">
        <article v-for="slot in game.saveSlots" :key="slot.id" class="save-slot" :class="{ 'is-active': slot.id === game.save.saveId }" :data-save-id="slot.id" :data-slot-active="slot.id === game.save.saveId ? 'true' : 'false'" :data-slot-has-thumbnail="slot.thumbnailUrl ? 'true' : 'false'" :data-slot-scene="slot.sceneId">
          <div class="save-slot__thumbnail">
            <img v-if="slot.thumbnailUrl" :src="slot.thumbnailUrl" alt="存档缩略图">
            <span v-else class="save-slot__thumbnail-empty" aria-hidden="true">·</span>
          </div>
          <div class="save-slot__meta">
            <strong>{{ slot.id }}</strong>
            <span v-if="slot.id === game.save.saveId" class="save-slot__active-badge" data-testid="slot-active-badge">当前</span>
            <p class="save-slot__scene" :data-slot-chapter="slot.chapter ?? null">{{ sceneLabelOf(slot) }}</p>
            <span v-if="slot.tone" class="save-slot__tone" :data-slot-tone="slot.tone">{{ toneLabel(slot.tone) }}</span>
            <time :datetime="slot.updatedAt">{{ formatSaveTime(slot.updatedAt) }}</time>
          </div>
          <button @click="game.restoreSlot(slot.id)">读取</button>
          <button @click="requestDeleteSlot(slot.id)" :class="{ 'is-confirming': confirmingDelete === slot.id }" :data-confirming="confirmingDelete === slot.id ? 'true' : 'false'">{{ confirmingDelete === slot.id ? '确认删除?' : '删除' }}</button>
        </article>
        <p v-if="game.saveSlots.length === 0">暂无普通存档。</p>
      </div>
    </section>

    <section v-else-if="activeScreen === 'gallery'" class="panel-screen" data-testid="gallery-screen" data-motion-screen>
      <header><button @click="game.backToGame">返回</button><h2>CG 图鉴</h2><span class="panel-status" aria-live="polite">{{ galleryAssets.length }} unlocked</span><button v-if="failedGalleryIds.length" type="button" class="gallery-retry-all" data-testid="gallery-retry-all" :data-gallery-failed-count="failedGalleryIds.length" @click="retryAllGalleryAssets">重试全部失败封面（{{ failedGalleryIds.length }}）</button></header>
      <div v-if="galleryAssets.length" class="gallery-grid" data-testid="gallery-grid">
        <article v-for="asset in galleryAssets" :key="asset.id" class="gallery-item" :data-gallery-item="asset.id" :data-gallery-state="galleryState(asset.id)" :aria-busy="galleryState(asset.id) === 'loading' ? 'true' : 'false'">
          <button class="gallery-item__open" type="button" :aria-label="`查看 ${asset.id}`" @click="selectGalleryAsset(asset.id, $event.currentTarget)">
            <span v-if="galleryState(asset.id) === 'loading'" class="gallery-item__skeleton" aria-hidden="true" :data-gallery-loading="asset.id"></span>
            <img v-if="galleryState(asset.id) !== 'failed'" :src="gallerySrc(asset.id, asset.url)" :alt="asset.id" crossorigin="anonymous" :class="{ 'is-loaded': galleryState(asset.id) === 'loaded' }" @load="markGalleryLoaded(asset.id)" @error="markGalleryFailed(asset.id)">
            <span v-else class="gallery-item__placeholder" :data-gallery-failed="asset.id">封面缺失</span>
            <span>{{ asset.id }}</span>
          </button>
          <button v-if="galleryState(asset.id) === 'failed'" type="button" class="gallery-item__retry" :disabled="retryingGallery.has(asset.id)" :data-gallery-retrying="retryingGallery.has(asset.id) ? 'true' : 'false'" @click="retryGalleryAsset(asset.id)">{{ retryingGallery.has(asset.id) ? '加载中' : '重试加载' }}</button>
        </article>
      </div>
      <p v-else class="panel-empty" data-testid="gallery-empty">尚未解锁 CG。</p>
      <div v-if="gallerySelectedId" ref="galleryViewerRoot" class="gallery-viewer-backdrop" data-testid="gallery-viewer" data-motion-modal @click.self="closeGalleryViewer" @keydown="handleGalleryViewerKeydown">
        <figure class="gallery-viewer" role="dialog" aria-modal="true" aria-label="CG 预览">
          <button ref="galleryViewerCloseButton" type="button" aria-label="关闭 CG 预览" @click="closeGalleryViewer">关闭</button>
          <img v-if="!failedGallery.has(gallerySelectedId)" :src="gallerySrc(gallerySelectedId, game.assetUrl(gallerySelectedId) ?? '')" :alt="gallerySelectedId" crossorigin="anonymous" @load="markGalleryLoaded(gallerySelectedId)" @error="markGalleryFailed(gallerySelectedId)">
          <span v-else class="gallery-viewer__placeholder" role="status" aria-live="polite" :data-gallery-preview-failed="gallerySelectedId">预览图不可用<button type="button" :disabled="retryingGallery.has(gallerySelectedId)" :data-gallery-retrying="retryingGallery.has(gallerySelectedId) ? 'true' : 'false'" @click="retryGalleryAsset(gallerySelectedId)">{{ retryingGallery.has(gallerySelectedId) ? '加载中' : '重试加载' }}</button></span>
          <figcaption>
            <span>{{ gallerySelectedId }}</span>
            <nav v-if="galleryAssets.length > 1" class="gallery-viewer__nav" :data-gallery-index="galleryIndex + 1" :data-gallery-total="galleryAssets.length">
              <button type="button" aria-label="上一张 CG" @click="stepGalleryAsset(-1)">‹</button>
              <span class="gallery-viewer__counter">{{ galleryIndex + 1 }} / {{ galleryAssets.length }}</span>
              <button type="button" aria-label="下一张 CG" @click="stepGalleryAsset(1)">›</button>
            </nav>
          </figcaption>
        </figure>
      </div>
    </section>

    <section v-else-if="activeScreen === 'settings'" class="panel-screen" data-testid="settings-screen" data-motion-screen>
      <header><button @click="game.screen = 'title'">返回</button><h2>演出设置</h2></header>
      <fieldset class="settings-group">
        <legend>演出</legend>
        <label><input v-model="game.reducedMotion" type="checkbox"> 减少动态效果</label>
        <label>VFX quality
          <select v-model="vfxQuality" data-testid="vfx-quality">
            <option value="auto">Auto (authored high)</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option><option value="static">Static</option>
          </select>
        </label>
      </fieldset>
      <fieldset class="settings-group">
        <legend>音频</legend>
        <label><input :checked="game.muted" type="checkbox" @change="game.toggleMute"> 静音</label>
        <button data-testid="autoplay-recovery" @click="game.recoverAutoplay">恢复音频播放</button>
      </fieldset>
      <button data-testid="settings-credits" @click="game.screen = 'credits'">查看版权与鸣谢</button>
      <p class="asset-status">运行时不请求媒体生成接口。包内配乐均已登记来源、文件校验值与再分发许可。</p>
    </section>

    <section v-else-if="activeScreen === 'credits'" class="panel-screen credits-screen" data-testid="credits-screen" data-motion-screen>
      <header><button @click="game.screen = 'title'">返回</button><h2>版权与鸣谢</h2></header>
      <p class="credits-notice">{{ audioCredits.packagedNotice }}</p>
      <ol class="credits-list" aria-label="包内配乐">
        <li v-for="track in audioCredits.tracks" :key="track.assetId">
          <h3>{{ track.title }}</h3>
          <p>{{ track.creator }} · ISRC {{ track.isrc }} · cue: {{ track.cueAlias }}</p>
          <p>{{ track.attribution }}</p>
          <nav aria-label="曲目版权链接">
            <a :href="track.sourceUrl" target="_blank" rel="noopener noreferrer">曲目来源</a>
            <a :href="track.licenseUrl" target="_blank" rel="noopener noreferrer">CC BY 4.0 许可</a>
          </nav>
        </li>
      </ol>
      <section class="official-listening" aria-labelledby="official-soundtrack-title">
        <h3 id="official-soundtrack-title">ProjectMoon 官方 OST</h3>
        <p><strong>{{ audioCredits.officialSoundtrack.playlistTitle }}</strong> · {{ audioCredits.officialSoundtrack.channel }} · {{ audioCredits.officialSoundtrack.playlistTrackCount }} 首</p>
        <p>{{ audioCredits.officialSoundtrack.notice }}</p>
        <p>{{ audioCredits.officialSoundtrack.rightsNotice }}</p>
        <nav aria-label="官方 OST 外部试听">
          <a v-for="link in audioCredits.officialSoundtrack.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
          <a :href="audioCredits.officialSoundtrack.termsUrl" target="_blank" rel="noopener noreferrer">ProjectMoon 服务条款</a>
        </nav>
      </section>
    </section>

    <section v-else-if="activeScreen === 'game'" class="game-screen" data-testid="game-screen" :data-scene-id="game.scene.id" data-motion-screen>
      <div class="game-screen__transition-veil" :class="{ 'is-active': !game.reducedMotion }" ref="transitionVeil" aria-hidden="true" />
      <img v-if="game.media.backgroundUrl" class="game-screen__background" :src="game.media.backgroundUrl" alt="" crossorigin="anonymous">
      <img v-if="game.media.fallbackUrl" class="game-screen__cg" :src="game.media.fallbackUrl" alt="剧情 CG" data-testid="static-fallback" crossorigin="anonymous">
      <SceneAtmosphere ref="sceneAtmosphere" :reduced-motion="game.reducedMotion" :route="game.save.route" :route-preference="game.save.playerProfile.routePreference" :scene-id="game.scene.id" :chapter="game.scene.chapter" :tone="game.scene.tone" :quality="vfxQuality" :presentation="game.presentation" />
      <PortraitStage :portraits="game.scene.portraits" :service="game.runtime.portraits" :reduced-motion="game.reducedMotion" :focus="game.presentation.focus" :visual-profile="game.presentation.visual.profile" :speaker="game.scene.speaker" />

      <header class="game-hud">
        <span ref="saveStatus" class="game-hud__save-status" data-testid="save-status" :data-saving="game.saving" aria-live="polite">{{ game.saving ? 'saving' : 'saved' }}</span>
        <span class="preload-status" data-testid="preload-status" :data-preload-state="game.preloadState" aria-live="polite">{{ game.preloadState === 'loading' ? 'preloading' : game.preloadState === 'ready' ? 'media ready' : 'media idle' }}</span>
        <span class="game-hud__scene-label" data-testid="scene-label" :data-scene-label="game.scene.id" :data-scene-tone="game.scene.tone">{{ chapterLabel(game.scene.chapter) }} · {{ locationLabel(game.scene.locationId) }}<em v-if="sceneToneLabel" class="game-hud__scene-tone" :data-scene-tone="game.scene.tone">{{ sceneToneLabel }}</em></span>
        <span ref="valueStatus" class="game-hud__values" aria-label="剧情数值" data-testid="hud-values"><template v-for="(entry, index) in hudValues" :key="entry.key"><span v-if="index > 0"> / </span><span class="game-hud__value" :data-hud-value-key="entry.key" :data-hud-changed="'false'" :data-hud-critical="entry.key === 'danger' && game.effectiveValues.danger > 0 ? 'true' : 'false'" :title="`基础 ${game.save.values[entry.key]} · 修正 ${signed(game.effectiveValues[entry.key] - game.save.values[entry.key])}`">{{ entry.label }} {{ game.effectiveValues[entry.key] }}</span></template></span>
          <span
            v-if="game.currentMinigame"
            class="game-hud__challenge"
            :class="{ 'is-resolved': game.currentMinigame.record?.resolved }"
            :data-minigame-id="game.currentMinigame.definition.id"
            :data-minigame-outcome="game.currentMinigame.record?.lastOutcome ?? 'pending'"
          >
            {{ game.currentMinigame.record?.resolved ? `挑战已结算 · ${minigameOutcomeLabel(game.currentMinigame.record.lastOutcome!)}` : '挑战待处理' }}
          </span>
        <nav><button ref="gameplayButton" data-testid="gameplay-open" @click="gameplayOpen = true">状态</button><button v-if="game.activeMinigame" ref="minigameButton" data-testid="minigame-open" @click="openMinigame">{{ game.activeMinigame.definition.label }}</button><button @click="game.quickSave">快速存档</button><button data-testid="game-saves" @click="game.openSaves">存档</button><button @click="game.openGallery">图鉴</button><button data-testid="game-settings" @click="game.screen = 'settings'">设置</button><button @click="game.toggleMute">{{ game.muted ? '启音' : '静音' }}</button></nav>
      </header>

      <div v-if="minigameOpen && game.activeMinigame" ref="minigameBackdrop" class="minigame-backdrop" data-testid="minigame-modal" data-motion-modal @click.self="closeMinigame">
        <NarrativeMinigame
          :definition="game.activeMinigame.definition"
          :challenge="game.activeMinigame.challenge"
          :reduced-motion="game.reducedMotion"
          :busy="game.minigameBusy"
          @close="closeMinigame"
          @resolve="resolveMinigame"
        />
      </div>

      <section
        v-if="minigameResult"
        ref="resultRoot"
        class="minigame-result"
        :class="`minigame-result--${minigameResult.outcome}`"
        :data-result-outcome="minigameResult.outcome"
        role="status"
        aria-live="polite"
        data-testid="minigame-result"
      >
        <p>叙事挑战结算</p>
        <h3>{{ minigameOutcomeLabel(minigameResult.outcome) }}</h3>
        <p>{{ minigameResult.outcome === 'perfect' ? '你保住了此刻的主动权，完整奖励已写入角色成长记录。' : minigameResult.outcome === 'assisted' ? '提示协助你完成了介入，低阶奖励已写入成长记录。' : minigameResult.outcome === 'setback' ? '你的判断留下了代价；主线仍可继续，后果已写入存档。' : '你选择暂缓介入；主线继续，跳过记录已写入存档。' }}</p>
        <small>评分 {{ minigameResult.score }} · {{ minigameResult.assisted ? '已使用辅助' : '未使用辅助' }}</small>
        <button ref="minigameResultButton" type="button" @click="dismissMinigameResult">确认并继续</button>
      </section>

      <div v-if="gameplayOpen" data-motion-modal>
        <GameplayPanel
          :gameplay="game.gameplay"
          :save="game.save"
          :effective-values="game.effectiveValues"
          :interaction-error="game.gameplayError"
          :reduced-motion="game.reducedMotion"
          @close="closeGameplay"
          @equip="game.equip"
          @wear-outfit="game.wearOutfit"
          @select-profession="game.selectProfession"
          @select-worldbook-preset="game.selectWorldbookPreset"
        />
      </div>

      <article class="dialogue-box" data-testid="dialogue-box" :data-typing="game.typewriterState" :data-speaker="game.scene.speaker" :data-scene-tone="game.scene.tone" @click="completeText">
        <h2 :data-narration="game.scene.speaker ? 'false' : 'true'">{{ game.scene.speaker || '旁白' }}</h2>
        <button v-if="game.typewriterState === 'typing'" type="button" class="dialogue-box__skip" data-testid="dialogue-skip" @click.stop="completeText">跳过打字</button>
        <div class="dialogue-box__progress" role="progressbar" aria-label="当前对话阅读进度" :aria-valuenow="Math.round(game.dialogueProgress * 100)" aria-valuemin="0" aria-valuemax="100" :data-dialogue-progress="Math.round(game.dialogueProgress * 100)">
          <span :style="{ transform: `scaleX(${game.dialogueProgress})` }" />
        </div>
        <p>{{ game.visibleText }}</p>
        <div v-if="game.resultText" ref="resultOverlay" class="result-overlay" data-testid="choice-result" role="status" aria-live="polite">
          <p>{{ game.resultText }}</p><button @click.stop="game.dismissResult">继续</button>
        </div>
        <div v-else class="choice-list">
          <p v-if="game.choices.length" class="choice-list__wait" data-testid="choice-wait">你的选择将决定走向</p>
          <button v-for="choice in game.choices" :key="choice.id" :data-choice-id="choice.id" @click.stop="choose(choice.id, $event)">{{ choice.text }}</button>
          <p v-if="game.scene.ending" class="ending-mark" :data-ending-route="game.scene.ending.route" :data-ending-kind="game.scene.ending.kind">{{ game.scene.ending.route }} · {{ game.scene.ending.kind }} END</p>
        </div>
        <span
          v-if="!game.resultText && game.choices.length === 0 && game.typewriterState === 'idle'"
          class="dialogue-box__advance"
          aria-hidden="true"
          data-testid="dialogue-advance"
        >▼</span>
      </article>

      <details class="save-tools" data-testid="save-tools"><summary>存档导入 / 导出</summary>
        <div class="save-tools__export">
          <div class="save-tools__export-actions">
            <button @click="exportCurrentSave">导出当前存档</button>
            <button type="button" class="save-tools__copy" @click="copyExport" :disabled="!exportText" :data-copied="copiedExport ? 'true' : 'false'">{{ copiedExport ? '已复制' : '复制' }}</button>
          </div>
          <textarea ref="exportTextarea" v-model="exportText" readonly aria-label="导出存档" />
        </div>
        <div class="save-tools__import">
          <textarea v-model="importText" aria-label="导入存档" placeholder="粘贴 SaveV2 JSON" :data-import-state="importState" />
          <p v-if="importError" class="save-tools__import-error" role="alert" data-testid="import-error">{{ importError }}</p>
          <p v-if="importedSave" class="save-tools__import-ok" data-testid="import-ok" aria-live="polite">已导入</p>
          <button @click="importCurrentSave" :disabled="importState !== 'valid'">导入</button>
        </div>
      </details>
    </section>
  </main>
</template>
