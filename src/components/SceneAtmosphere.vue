<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { createGalgameVfx, createStaticGalgameVfx, resolveRouteProgress, type GalgameVfxRuntime, type VfxQualityPreference } from '../vfx/galgame-vfx';
import type { ScenePresentation } from '../domain/scene-presentation';
import type { VfxCue } from '../domain/vfx-cue';
import { createVfxInteractionChannel } from '../runtime/vfx-interaction';
import { resolveAlbinaLifecycleWindow } from '../runtime/lifecycle';

const props = defineProps<{
  reducedMotion: boolean;
  /** The route the save has actually committed to; null before the junction. */
  route: string | null;
  /** Opening-page preference, used only until a route is committed. */
  routePreference: string;
  sceneId: string;
  chapter?: number;
  /** Optional narrative tone from a scene-capable host. */
  tone?: string;
  /** Explicit player choice; auto retains the authored high-quality profile. */
  quality?: VfxQualityPreference;
  presentation: ScenePresentation;
}>();

// Atmosphere must follow the route the story is actually on. The opening-page
// preference is a fallback for the pre-junction scenes only.
const activeRoute = computed(() => props.route ?? props.routePreference);

const host = ref<HTMLElement>();
const staticCanvas = ref<HTMLCanvasElement>();
const webglAvailable = ref(false);
const adaptiveState = ref<'idle' | 'active'>('idle');
const qualityLevel = ref<string>('auto');
const fallbackReason = computed(() => props.reducedMotion ? 'reduced-motion' : props.quality === 'static' ? 'static-quality' : 'webgl-unavailable');
const staticPresentation = computed(() => props.reducedMotion || props.quality === 'static' || !webglAvailable.value);
const routeLabel = computed(() => ({
  white_canvas: 'White Canvas',
  golden_bough_rebuild: 'Golden Bough Rebuild',
  ring_conspiracy: 'Ring Conspiracy',
}[activeRoute.value] ?? 'White Canvas'));
const routeProgress = computed(() => resolveRouteProgress(activeRoute.value, props.sceneId));
const isTransitioning = ref(false);
const semanticCue = ref<VfxCue['kind']>('atmosphere');
const cueNonce = ref(0);
let transitionTimer: ReturnType<typeof setTimeout> | undefined;
let cueTimer: ReturnType<typeof setTimeout> | undefined;

function beginTransition(): void {
  if (props.reducedMotion) {
    isTransitioning.value = false;
    if (transitionTimer) clearTimeout(transitionTimer);
    transitionTimer = undefined;
    return;
  }
  isTransitioning.value = true;
  if (transitionTimer) clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => { isTransitioning.value = false; }, 420);
}

function clearCue(): void {
  if (cueTimer) clearTimeout(cueTimer);
  cueTimer = undefined;
  semanticCue.value = 'atmosphere';
}

function showSemanticCue(cue: VfxCue): void {
  if (cueTimer) clearTimeout(cueTimer);
  semanticCue.value = cue.kind;
  cueNonce.value += 1;
  // The marker remains visible for the authored cue window even when motion
  // is disabled, so reduced-motion still communicates the story event.
  cueTimer = setTimeout(clearCue, Math.max(240, cue.durationMs ?? 900));
}

let runtime: GalgameVfxRuntime | undefined;
let mountGeneration = 0;
let lifecycleWindow: Window | undefined;

function releaseForPageHide(): void {
  mountGeneration += 1;
  webglAvailable.value = false;
  runtime?.dispose();
  runtime = undefined;
}

function restoreAfterPageShow(): void {
  if (!host.value || runtime || mountGeneration < 1) return;
  void mountScene();
}

function allowWebgl(): boolean {
  if (props.reducedMotion || !host.value || typeof WebGLRenderingContext === 'undefined') return false;
  return true;
}

function mountStaticRuntime(container: HTMLElement): void {
  runtime = createStaticGalgameVfx(container, { route: activeRoute.value, sceneId: props.sceneId, canvas: staticCanvas.value });
  runtime.setSceneState({ route: activeRoute.value, sceneId: props.sceneId, ...(props.chapter !== undefined ? { chapter: props.chapter } : {}), ...(props.tone ? { tone: props.tone } : {}), focus: props.presentation.focus });
  runtime.setPresentation(props.presentation);
  webglAvailable.value = false;
  adaptiveState.value = 'idle';
  qualityLevel.value = 'static';
}

async function mountScene(): Promise<void> {
  const generation = ++mountGeneration;
  runtime?.dispose();
  runtime = undefined;
  webglAvailable.value = false;
  const container = host.value;
  if (!container) return;
  // Static and reduced-motion presentation must not wait for the optional
  // Three.js chunk. Immediate mounting removes a blank-frame race during
  // route changes and keeps the accessibility fallback dependency-free.
  if (props.quality === 'static' || !allowWebgl()) {
    mountStaticRuntime(container);
    return;
  }

  await nextTick();
  try {
    const three = await import('three');
    if (generation !== mountGeneration || !allowWebgl() || !host.value) return;
    let nextRuntime: GalgameVfxRuntime | undefined;
    nextRuntime = createGalgameVfx(three, container, {
      route: activeRoute.value,
      sceneId: props.sceneId,
      ...(props.chapter !== undefined ? { chapter: props.chapter } : {}),
      ...(props.quality ? { quality: props.quality } : {}),
      ...(props.tone ? { tone: props.tone } : {}),
      presentation: props.presentation,
      onContextLost: () => {
        if (generation !== mountGeneration || !host.value) return;
        nextRuntime?.dispose();
        if (runtime === nextRuntime) {
          runtime = undefined;
          mountStaticRuntime(container);
        }
      },
      onQualityDownshift: (level) => {
        if (generation !== mountGeneration) return;
        adaptiveState.value = 'active';
        qualityLevel.value = level;
      },
    });
    if (generation !== mountGeneration || !allowWebgl()) {
      nextRuntime.dispose();
      return;
    }
    runtime = nextRuntime;
    webglAvailable.value = true;
    adaptiveState.value = 'idle';
    qualityLevel.value = nextRuntime.quality;
  } catch {
    if (generation === mountGeneration && host.value) mountStaticRuntime(host.value);
  }
}

function emitCue(cue: VfxCue): void {
  showSemanticCue(cue);
  if (props.reducedMotion || props.quality === 'static' || !webglAvailable.value) {
    isTransitioning.value = false;
    runtime?.emit(cue);
    return;
  }
  beginTransition();
  runtime?.emit(cue);
}

const interaction = createVfxInteractionChannel(emitCue);

onMounted(() => {
  lifecycleWindow = resolveAlbinaLifecycleWindow(window);
  lifecycleWindow.addEventListener('pagehide', releaseForPageHide);
  lifecycleWindow.addEventListener('pageshow', restoreAfterPageShow);
  void mountScene();
  // Warm the optional Three.js chunk while the launcher is idle: the module
  // registry caches it, so the first WebGL scene mounts without paying the
  // parse cost mid-conversation. Skipped for static/reduced-motion profiles.
  if (!props.reducedMotion && props.quality !== 'static') {
    const idle = window as Window & { requestIdleCallback?: (callback: () => void) => number };
    const schedule = idle.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1200));
    schedule(() => { void import('three').catch(() => { /* static fallback already live */ }); });
  }
});
watch(() => [props.reducedMotion, props.quality] as const, ([reducedMotion]) => {
  if (reducedMotion) {
    isTransitioning.value = false;
    if (transitionTimer) clearTimeout(transitionTimer);
    transitionTimer = undefined;
  }
  void mountScene();
});
watch(() => [activeRoute.value, props.sceneId, props.chapter, props.tone] as const, ([route, sceneId, chapter, tone], [previousRoute, previousSceneId, previousChapter]) => {
  if (props.reducedMotion) {
    isTransitioning.value = false;
    if (transitionTimer) clearTimeout(transitionTimer);
    transitionTimer = undefined;
  }
  runtime?.setSceneState({ route, sceneId, ...(chapter !== undefined ? { chapter } : {}), ...(tone ? { tone } : {}), focus: props.presentation.focus });
  runtime?.setPresentation(props.presentation);
  interaction.commitScene({
    route,
    sceneId,
    ...(chapter !== undefined ? { chapter } : {}),
    ...(tone ? { tone } : {}),
    previousRoute,
    previousSceneId,
    ...(previousChapter !== undefined ? { previousChapter } : {}),
  });
  if (props.reducedMotion || props.quality === 'static' || !webglAvailable.value) {
    isTransitioning.value = false;
    return;
  }
  beginTransition();
});
onBeforeUnmount(() => {
  mountGeneration += 1;
  webglAvailable.value = false;
  lifecycleWindow?.removeEventListener('pagehide', releaseForPageHide);
  lifecycleWindow?.removeEventListener('pageshow', restoreAfterPageShow);
  lifecycleWindow = undefined;
  if (transitionTimer) clearTimeout(transitionTimer);
  if (cueTimer) clearTimeout(cueTimer);
  runtime?.dispose();
  interaction.dispose();
});

defineExpose({ emitCue });
</script>

<template>
  <aside class="scene-atmosphere" aria-label="Route atmosphere and progress" :data-vfx-mode="webglAvailable ? 'webgl' : fallbackReason" :data-vfx-adaptive="adaptiveState" :data-vfx-quality-level="qualityLevel" :data-vfx-transition="isTransitioning ? 'active' : 'idle'" :data-semantic-cue="semanticCue" :data-cue-nonce="cueNonce" :data-scene-id="sceneId" :data-continuity-band="routeProgress.band" :data-route-reached="routeProgress.reached" :data-active-route="activeRoute" :data-scene-tone="tone ?? ''" :data-visual-profile="presentation.visual.profile">
    <div ref="host" class="scene-atmosphere__webgl" aria-hidden="true" data-testid="scene-webgl">
      <canvas ref="staticCanvas" class="scene-atmosphere__static-canvas" aria-hidden="true" :style="{ display: webglAvailable ? 'none' : 'block' }" />
    </div>
    <div class="scene-atmosphere__rain" aria-hidden="true" :class="{ 'is-static': staticPresentation }" />
    <svg class="scene-atmosphere__static-refraction" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true" data-testid="static-refraction" :data-visual-profile="presentation.visual.profile" :style="{ position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', opacity: webglAvailable ? '0.16' : '0.5' }">
      <defs>
        <radialGradient id="bough-focus" cx="50%" cy="44%" r="48%">
          <stop offset="0" stop-color="#f5d879" stop-opacity="0" />
          <stop offset="0.38" stop-color="var(--atmo-core)" stop-opacity="0.08" />
          <stop offset="0.72" stop-color="var(--atmo-rim)" stop-opacity="0.34" />
          <stop offset="1" stop-color="#111722" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="rain-mirror" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.58" stop-color="#cce6f4" stop-opacity="0" />
          <stop offset="0.76" stop-color="var(--atmo-mirror)" stop-opacity="0.22" />
          <stop offset="1" stop-color="#40292a" stop-opacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="500" cy="264" rx="286" ry="230" fill="url(#bough-focus)" />
      <path d="M0 350 Q250 324 500 354 T1000 350 V600 H0Z" fill="url(#rain-mirror)" />
      <g class="scene-atmosphere__static-motif" fill="none" stroke="var(--atmo-line)" stroke-opacity="0.22">
        <ellipse cx="500" cy="264" rx="205" ry="166" />
        <ellipse cx="500" cy="264" rx="258" ry="205" stroke-opacity="0.12" />
      </g>
    </svg>
    <svg :key="cueNonce" class="scene-atmosphere__semantic-cue" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true" data-testid="semantic-cue">
      <g class="scene-atmosphere__cue-choice">
        <path d="M348 428h92M560 428h92M386 390l46 0M568 390l46 0" />
        <path d="M404 452l28-18M596 452l-28-18" />
      </g>
      <g class="scene-atmosphere__cue-impact">
        <path d="M500 246v86M456 290h88M468 258l64 64M532 258l-64 64" />
        <path d="M500 212v-24M500 364v24M422 290h-24M578 290h24" />
      </g>
      <g class="scene-atmosphere__cue-reveal">
        <rect x="318" y="126" width="364" height="328" rx="8" />
        <path d="M350 158h92M558 158h92M350 422h92M558 422h92" />
      </g>
      <g class="scene-atmosphere__cue-transition">
        <ellipse cx="500" cy="264" rx="186" ry="148" />
        <ellipse cx="500" cy="264" rx="238" ry="192" />
      </g>
    </svg>
    <svg class="scene-atmosphere__route" viewBox="0 0 320 84" role="img" aria-labelledby="route-map-title route-map-description" data-testid="route-map" :data-route-scene="sceneId">
      <title id="route-map-title">Route map</title>
      <desc id="route-map-description">The selected player route is {{ routeLabel }}. Current progress: {{ sceneId }}.</desc>
      <!-- Canon is always traversed: the reviewed ledger treats canon chapters
           as read before the junction. Branch legs traverse only once the save
           has actually committed to that route. -->
      <path d="M20 42H120" class="scene-atmosphere__route-line scene-atmosphere__route-leg is-traversed" />
      <path d="M120 42L218 16" :class="['scene-atmosphere__route-line', 'scene-atmosphere__route-leg', { 'is-traversed': routeProgress.reached === 'golden_bough_rebuild' }]" />
      <path d="M120 42L218 42" :class="['scene-atmosphere__route-line', 'scene-atmosphere__route-leg', { 'is-traversed': routeProgress.reached === 'white_canvas' }]" />
      <path d="M120 42L218 68" :class="['scene-atmosphere__route-line', 'scene-atmosphere__route-leg', { 'is-traversed': routeProgress.reached === 'ring_conspiracy' }]" />
      <circle cx="20" cy="42" r="5" :class="['scene-atmosphere__route-node', { 'is-reached': routeProgress.canonReached }]" />
      <circle cx="20" cy="42" r="2.1" :class="['scene-atmosphere__route-core', { 'is-reached': routeProgress.canonReached }]" />
      <circle cx="120" cy="42" r="5" :class="['scene-atmosphere__route-node', { 'is-reached': routeProgress.junctionReached }]" />
      <circle cx="120" cy="42" r="2.1" :class="['scene-atmosphere__route-core', { 'is-reached': routeProgress.junctionReached }]" />
      <circle cx="218" cy="16" r="5" :class="['scene-atmosphere__route-node', { 'is-selected': routeProgress.selected === 'golden_bough_rebuild', 'is-reached': routeProgress.reached === 'golden_bough_rebuild' }]" />
      <circle cx="218" cy="16" r="2.1" :class="['scene-atmosphere__route-core', { 'is-reached': routeProgress.reached === 'golden_bough_rebuild' }]" />
      <circle cx="218" cy="42" r="5" :class="['scene-atmosphere__route-node', { 'is-selected': routeProgress.selected === 'white_canvas', 'is-reached': routeProgress.reached === 'white_canvas' }]" />
      <circle cx="218" cy="42" r="2.1" :class="['scene-atmosphere__route-core', { 'is-reached': routeProgress.reached === 'white_canvas' }]" />
      <circle cx="218" cy="68" r="5" :class="['scene-atmosphere__route-node', { 'is-selected': routeProgress.selected === 'ring_conspiracy', 'is-reached': routeProgress.reached === 'ring_conspiracy' }]" />
      <circle cx="218" cy="68" r="2.1" :class="['scene-atmosphere__route-core', { 'is-reached': routeProgress.reached === 'ring_conspiracy' }]" />
      <text x="8" y="72">Canon</text><text x="104" y="72">AU/IF</text>
      <text x="230" y="20">Rebuild</text><text x="230" y="46">Canvas</text><text x="230" y="72">Ring</text>
    </svg>
    <p class="scene-atmosphere__route-status" data-testid="route-status" data-route-status>
      <span class="scene-atmosphere__status-chip scene-atmosphere__status-chip--route" :data-route="activeRoute">{{ routeLabel }}</span>
      <span class="scene-atmosphere__status-chip scene-atmosphere__status-chip--band" :data-band="routeProgress.band">{{ routeProgress.branch === 'canon' ? 'Canon recap' : 'AU / IF route' }}</span>
      <span class="scene-atmosphere__status-chip scene-atmosphere__status-chip--junction" :data-junction="routeProgress.junctionReached ? 'reached' : 'pending'">{{ routeProgress.junctionReached ? 'junction reached' : 'junction pending' }}</span>
    </p>
    <span class="scene-atmosphere__mode" data-testid="scene-atmosphere-mode" role="status" aria-live="polite" :data-vfx-status="isTransitioning ? 'transitioning' : webglAvailable ? 'live' : 'static'">{{ isTransitioning ? 'Scene transition' : webglAvailable ? 'VFX live' : 'Static composition' }}</span>
  </aside>
</template>

<style scoped>
.scene-atmosphere__semantic-cue {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  overflow: visible;
}
.scene-atmosphere[data-semantic-cue='choice-confirm'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-semantic-cue='impact'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-semantic-cue='cg-reveal'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-semantic-cue='chapter-transition'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-semantic-cue='route-transition'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-semantic-cue='ending'] .scene-atmosphere__semantic-cue {
  opacity: .8;
}
.scene-atmosphere__semantic-cue g { display: none; fill: none; stroke: #f5d879; stroke-width: 2; vector-effect: non-scaling-stroke; }
.scene-atmosphere[data-semantic-cue='choice-confirm'] .scene-atmosphere__cue-choice,
.scene-atmosphere[data-semantic-cue='impact'] .scene-atmosphere__cue-impact,
.scene-atmosphere[data-semantic-cue='cg-reveal'] .scene-atmosphere__cue-reveal,
.scene-atmosphere[data-semantic-cue='chapter-transition'] .scene-atmosphere__cue-transition,
.scene-atmosphere[data-semantic-cue='route-transition'] .scene-atmosphere__cue-transition,
.scene-atmosphere[data-semantic-cue='ending'] .scene-atmosphere__cue-transition { display: block; }
.scene-atmosphere[data-semantic-cue='impact'] .scene-atmosphere__semantic-cue { stroke: #ec765f; }
.scene-atmosphere[data-semantic-cue='cg-reveal'] .scene-atmosphere__semantic-cue { stroke: #e7f3ff; }
.scene-atmosphere[data-semantic-cue='choice-confirm'] .scene-atmosphere__semantic-cue { animation: cue-choice .52s ease-out both; }
.scene-atmosphere[data-semantic-cue='impact'] .scene-atmosphere__semantic-cue { animation: cue-impact .42s ease-out both; }
.scene-atmosphere[data-semantic-cue='cg-reveal'] .scene-atmosphere__semantic-cue { animation: cue-reveal 1s ease-out both; }
.scene-atmosphere[data-semantic-cue='chapter-transition'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-semantic-cue='route-transition'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-semantic-cue='ending'] .scene-atmosphere__semantic-cue { animation: cue-transition 1.1s ease-out both; }
@keyframes cue-choice { 0% { opacity: 0; transform: scale(.96); } 24% { opacity: .9; } 100% { opacity: 0; transform: scale(1.03); } }
@keyframes cue-impact { 0% { opacity: 0; transform: scale(.82); } 16% { opacity: 1; } 100% { opacity: 0; transform: scale(1.06); } }
@keyframes cue-reveal { 0% { opacity: 0; transform: scale(1.05); } 30% { opacity: .9; } 100% { opacity: 0; transform: scale(1); } }
@keyframes cue-transition { 0% { opacity: 0; transform: scale(.92); } 30% { opacity: .78; } 100% { opacity: 0; transform: scale(1.04); } }
.scene-atmosphere__route-node.is-reached { stroke: #f5e5ad; stroke-width: 2; }
.scene-atmosphere[data-vfx-transition='active'] .scene-atmosphere__route { animation: route-transition .42s ease both; }
@keyframes route-transition { 0% { opacity: .45; transform: translateX(4px); } 100% { opacity: .84; transform: translateX(0); } }
@media (prefers-reduced-motion: reduce) {
  .scene-atmosphere[data-vfx-transition='active'] .scene-atmosphere__route { animation: none; }
  .scene-atmosphere[data-semantic-cue] .scene-atmosphere__semantic-cue { animation: none; opacity: .72; }
}
.scene-atmosphere[data-vfx-mode='reduced-motion'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-vfx-mode='static-quality'] .scene-atmosphere__semantic-cue,
.scene-atmosphere[data-vfx-mode='webgl-unavailable'] .scene-atmosphere__semantic-cue { animation: none; }
</style>
