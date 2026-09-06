<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { gsap } from 'gsap';

import type { PortraitCue } from '../domain/scene-cue';
import type { PortraitService } from '../runtime/portraits';

const props = defineProps<{
  portraits: PortraitCue[];
  service: PortraitService;
  reducedMotion: boolean;
  /** Screen-space focus provided by the same scene presentation as WebGL. */
  focus?: [number, number];
  visualProfile?: 'canvas' | 'rain' | 'golden' | 'threat' | 'gallery' | 'ending';
  /** CharacterId of the character currently speaking; drives the speaking-portrait focus. */
  speaker?: string;
}>();
const canvases = new Map<string, HTMLCanvasElement>();
const stage = ref<HTMLElement>();
let stageContext: gsap.Context | undefined;
let portraitTween: gsap.core.Timeline | undefined;
let speakingGlowTween: gsap.core.Tween | undefined;
let transferTween: gsap.core.Timeline | undefined;
/** Monotonic nonce for the speaker handover; observable via data-speaker-transfer. */
const speakerTransferNonce = ref(0);
const slots = ['left', 'center', 'right'] as const;

/** Portraits that left the scene and are playing their exit before removal. */
const exiting = ref<PortraitCue[]>([]);
const exitTweens = new Set<gsap.core.Tween>();
let previousPortraits: PortraitCue[] = [];

function cueKey(portrait: PortraitCue): string {
  return `${portrait.characterId}:${portrait.position}`;
}

/** The currently speaking character: an explicit speaker wins, otherwise the first active portrait. */
const speakingId = computed(() => props.speaker ?? props.portraits.find((portrait) => portrait.active)?.characterId);

const slotPortraits = computed(() => slots.map((position) => props.portraits.find((portrait) => {
  return portrait.position === position || (position === 'left' && portrait.position === 'far-left') || (position === 'right' && portrait.position === 'far-right');
})));

function canvasRef(id: string, element: unknown): void {
  if (element instanceof HTMLCanvasElement) canvases.set(id, element);
  else canvases.delete(id);
}

async function render(): Promise<void> {
  props.service.stopAll();
  await nextTick();
  await Promise.all(props.portraits.map(async (portrait) => {
    const canvas = canvases.get(cueKey(portrait));
    if (canvas) await props.service.play(portrait.portraitAssetId, canvas);
  }));
}

function dropExit(portrait: PortraitCue): void {
  canvases.delete(`${cueKey(portrait)}:exiting`);
  exiting.value = exiting.value.filter((ghost) => cueKey(ghost) !== cueKey(portrait));
}

/** Play the exit animation for portraits that are no longer in the scene, then drop them. */
async function playExits(departed: PortraitCue[]): Promise<void> {
  if (!departed.length) return;
  exiting.value.push(...departed);
  await nextTick();
  await Promise.all(departed.map((portrait) => new Promise<void>((resolve) => {
    if (props.reducedMotion) {
      // Static downgrade: skip the animation and remove deterministically.
      dropExit(portrait);
      resolve();
      return;
    }
    const canvas = canvases.get(`${cueKey(portrait)}:exiting`);
    if (!canvas) {
      dropExit(portrait);
      resolve();
      return;
    }
    const tween = gsap.to(canvas, {
      y: 26,
      autoAlpha: 0,
      duration: .42,
      ease: 'power2.in',
      onComplete: () => {
        exitTweens.delete(tween);
        dropExit(portrait);
        resolve();
      },
    });
    exitTweens.add(tween);
  })));
}

/** Force-complete every pending exit for a deterministic reduced-motion state. */
function cancelExits(): void {
  exitTweens.forEach((tween) => tween.kill());
  exitTweens.clear();
  exiting.value.forEach((portrait) => canvases.delete(`${cueKey(portrait)}:exiting`));
  exiting.value = [];
}

/**
 * Breathing halo for the speaking portrait: a slow, deterministic glow that
 * marks the active speaker without changing the authored layout. Killed on
 * reduced motion so the static path keeps a clean frozen portrait.
 */
function syncSpeakingGlow(): void {
  speakingGlowTween?.kill();
  speakingGlowTween = undefined;
  if (props.reducedMotion || !stage.value) return;
  const canvas = stage.value.querySelector<HTMLElement>('.portrait-stage__canvas.is-speaking');
  if (!canvas) return;
  speakingGlowTween = gsap.fromTo(canvas, { boxShadow: '0 0 0 rgba(230, 190, 96, 0)' }, {
    boxShadow: '0 0 44px rgba(230, 190, 96, .4)',
    duration: 1.7,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

/**
 * Speaker handover: the previous speaker settles back to the neutral active
 * tone while the new speaker brightens with a quick emphasis pulse. The
 * transfer animates filter only — the authored `transform` (translateX/scale)
 * stays owned by the template binding, so the two never fight. Reduced motion
 * still publishes the nonce so consumers observe the handover.
 */
async function orchestrateSpeakerTransfer(): Promise<void> {
  speakerTransferNonce.value += 1;
  transferTween?.kill();
  transferTween = undefined;
  if (props.reducedMotion || !stage.value) return;
  await nextTick();
  if (!stage.value) return;
  const speaking = stage.value.querySelectorAll<HTMLElement>('.portrait-stage__canvas.is-speaking');
  const activeOthers = stage.value.querySelectorAll<HTMLElement>('.portrait-stage__canvas.is-active:not(.is-speaking)');
  transferTween = gsap.timeline({ defaults: { ease: 'power2.out' } });
  if (activeOthers.length) {
    transferTween.to(activeOthers, { filter: 'brightness(1) saturate(1)', duration: .22, clearProps: 'filter' }, 0);
  }
  if (speaking.length) {
    transferTween.fromTo(speaking, { filter: 'brightness(1.08) saturate(1.06)' }, {
      filter: 'brightness(1.18) saturate(1.12)',
      duration: .34,
      ease: 'power3.out',
      yoyo: true,
      repeat: 1,
      clearProps: 'filter',
    }, .06);
  }
}

// App-level reduced motion must reach portrait playback, not only the media
// query the service reads internally. Re-render when the preference flips so
// running strips fall back to their static frames.
watch(() => props.reducedMotion, (reducedMotion) => {
  props.service.setReducedMotionOverride(reducedMotion);
  if (reducedMotion) {
    cancelExits();
    syncSpeakingGlow();
  }
  void render();
}, { immediate: true });
watch(() => props.portraits, async (next) => {
  const nextKeys = new Set(next.map(cueKey));
  const departed = previousPortraits.filter((portrait) => !nextKeys.has(cueKey(portrait)));
  previousPortraits = [...next];
  if (departed.length) void playExits(departed);
  await render();
  await nextTick();
  syncSpeakingGlow();
  if (props.reducedMotion || !stage.value) return;
  portraitTween?.kill();
  const query = gsap.utils.selector(stage.value);
  // The speaking portrait enters first with a quicker beat, then the rest of
  // the active stage follows in a staggered cascade; supporting portraits
  // trail behind. Staggered entry keeps the authored focus readable instead
  // of animating every portrait at the same instant.
  portraitTween = gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo(query('.portrait-stage__canvas.is-speaking'), { y: 24, autoAlpha: 0, scale: .97 }, { y: 0, autoAlpha: 1, scale: 1, duration: .5 })
    .fromTo(query('.portrait-stage__canvas.is-active:not(.is-speaking)'), { y: 20, autoAlpha: 0, scale: .98 }, { y: 0, autoAlpha: 1, scale: 1, duration: .56, stagger: .09 }, .1)
    .fromTo(query('.portrait-stage__canvas.is-supporting'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: .46, duration: .44, stagger: .055 }, .22);
}, { deep: true, immediate: true });
watch(() => speakingId.value, () => {
  syncSpeakingGlow();
  void orchestrateSpeakerTransfer();
}, { flush: 'post' });
onMounted(() => {
  if (!stage.value || props.reducedMotion) return;
  stageContext = gsap.context(() => {
    gsap.fromTo('.portrait-stage__canvas', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .42, stagger: .06, ease: 'power3.out' });
  }, stage.value);
});
onBeforeUnmount(() => {
  portraitTween?.kill();
  speakingGlowTween?.kill();
  transferTween?.kill();
  exitTweens.forEach((tween) => tween.kill());
  exitTweens.clear();
  stageContext?.revert();
  props.service.stopAll();
});
</script>

<template>
  <div ref="stage" class="portrait-stage" role="region" aria-label="角色立绘" :data-reduced-motion="reducedMotion ? 'true' : 'false'" :data-visual-profile="visualProfile ?? 'canvas'" :data-speaker="speaker ?? ''" :data-speaker-transfer="speakerTransferNonce" :style="{ '--scene-focus-x': `${(focus?.[0] ?? .5) * 100}%` }">
    <div v-for="(portrait, index) in slotPortraits" :key="slots[index]" class="portrait-slot" :class="`portrait-slot--${slots[index]}`" :data-slot="slots[index]">
      <canvas
        v-if="portrait"
        :key="`${portrait.characterId}:${portrait.portraitAssetId}`"
        :ref="(element) => canvasRef(cueKey(portrait), element)"
        class="portrait-stage__canvas"
        :class="[`portrait-stage__canvas--${portrait.position}`, { 'is-active': portrait.active, 'is-speaking': portrait.active && portrait.characterId === speakingId, 'is-supporting': !portrait.active }]"
        :data-reduced-motion="reducedMotion ? 'true' : 'false'"
        data-state="present"
        :data-speaking="portrait.characterId === speakingId ? 'true' : 'false'"
        :data-speaking-glow="portrait.active && portrait.characterId === speakingId ? 'true' : 'false'"
        :data-focus="portrait.active ? 'primary' : 'supporting'"
        :data-character-id="portrait.characterId"
        width="512"
        height="768"
        :style="{ transform: `translateX(-50%) translateX(${portrait.active ? 0 : (focus?.[0] ?? .5) < .5 ? '0.45rem' : '-0.45rem'}) scale(${portrait.scale})` }"
      />
      <span v-else class="portrait-slot__empty" aria-hidden="true" />
    </div>
    <div v-for="portrait in exiting" :key="`exiting:${cueKey(portrait)}`" class="portrait-slot portrait-slot--exiting" :data-slot="portrait.position">
      <canvas
        :ref="(element) => canvasRef(`${cueKey(portrait)}:exiting`, element)"
        class="portrait-stage__canvas"
        :class="[`portrait-stage__canvas--${portrait.position}`, 'is-exiting']"
        :data-reduced-motion="reducedMotion ? 'true' : 'false'"
        data-state="exiting"
        data-speaking="false"
        data-focus="supporting"
        :data-character-id="portrait.characterId"
        width="512"
        height="768"
        :style="{ transform: `translateX(-50%) scale(${portrait.scale})` }"
      />
    </div>
  </div>
</template>

<style scoped>
.portrait-stage__canvas { transition: filter 180ms ease, opacity 180ms ease; }
.portrait-slot { position: absolute; inset: 0; pointer-events: none; }
.portrait-slot__empty { display: block; position: absolute; inset: 18% 15% 0; border: 1px solid rgb(215 175 70 / 10%); opacity: .25; }
.portrait-stage__canvas.is-speaking { filter: brightness(1.08) saturate(1.06); opacity: 1; z-index: 2; }
.portrait-stage__canvas:not(.is-active) { opacity: .86; }
.portrait-stage__canvas[data-state='exiting'] { pointer-events: none; opacity: .54; }
.portrait-stage[data-reduced-motion='true'] .portrait-stage__canvas { transition: none; }
.portrait-stage[data-reduced-motion='true'] .portrait-slot--exiting { display: none; }
@media (prefers-reduced-motion: reduce) {
  .portrait-stage__canvas { transition: none; }
  .portrait-slot--exiting { display: none; }
}
</style>
