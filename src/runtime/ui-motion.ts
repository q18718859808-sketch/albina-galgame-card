import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue';
import { gsap } from 'gsap';

const EASE_ENTER = 'power3.out';

export type AlbinaMotionKind =
  | 'title'
  | 'profile'
  | 'panel'
  | 'game'
  | 'dialogue'
  | 'scene'
  | 'modal'
  | 'gameplay-panel';

export interface AlbinaMotionController {
  reveal(kind: AlbinaMotionKind, root: HTMLElement): void;
  enterScreen(kind: AlbinaMotionKind, root: HTMLElement, done: () => void): void;
  leaveScreen(root: HTMLElement, done: () => void): void;
  revealDialogue(root: HTMLElement): void;
  /** Handover choreography for the speaker label when the speaker changes. */
  switchSpeaker(root: HTMLElement): void;
  /** Scene-label badge entrance on scene change, distinct from the dialogue. */
  revealSceneLabel(root: HTMLElement): void;
  /** Light kinetic feedback on text advance, distinct from a scene change. */
  pulseDialogue(root: HTMLElement): void;
  transitionScene(root: HTMLElement): void;
  wipeScene(root: HTMLElement): void;
  pulseChoice(button: HTMLButtonElement): void;
  pulseHud(button: HTMLButtonElement): void;
  pulseStatus(root: HTMLElement, tone?: 'golden' | 'danger' | 'cool'): void;
  /** Pulses one labelled HUD value segment, distinct from the whole strip. */
  pulseHudValue(root: HTMLElement, tone?: 'golden' | 'danger'): void;
  revealResult(root: HTMLElement): void;
  /** Settlement-card pop-in after a minigame, toned by the outcome. */
  revealMinigameResult(root: HTMLElement, outcome?: string): void;
  /** Settlement-card exit; the caller clears state in onComplete. */
  dismissMinigameResult(root: HTMLElement, onComplete: () => void): void;
  switchPanelTab(root: HTMLElement): void;
  dismissModal(root: HTMLElement, onComplete: () => void): void;
  dispose(): void;
}

function runReducedMotion(kind: AlbinaMotionKind, root: HTMLElement): void {
  root.dataset.motionState = 'settled';
  root.dataset.motionKind = kind;
  gsap.set(root, { autoAlpha: 1, clearProps: 'transform,filter' });
}

function screenTimeline(kind: AlbinaMotionKind, root: HTMLElement) {
  const timeline = gsap.timeline({ defaults: { ease: EASE_ENTER } });
  const query = gsap.utils.selector(root);
  root.dataset.motionState = 'entering';
  root.dataset.motionKind = kind;
  timeline.set(root, { autoAlpha: 1 });

  if (kind === 'title') {
    timeline
      .fromTo(query('.title-screen__veil'), { scaleX: 1.15, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.05 })
      .fromTo(query('.eyebrow'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .42 }, .16)
      .fromTo(query('h1'), { yPercent: 18, autoAlpha: 0, scale: 1.035 }, { yPercent: 0, autoAlpha: 1, scale: 1, duration: 1.05 }, .24)
      .fromTo(query('.subtitle'), { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .62 }, .68)
      .fromTo(query('.title-actions button'), { x: -26, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .42, stagger: .075 }, .78)
      .fromTo(query('.build-state'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .4 }, 1.16);
  } else if (kind === 'game') {
    timeline
      .fromTo(query('.game-hud'), { yPercent: -110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .68 })
      .fromTo(query('.portrait-stage'), { scale: 1.035, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .9 }, .08)
      .fromTo(query('.dialogue-box'), { y: 36, autoAlpha: 0, filter: 'blur(8px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: .7 }, .3)
      .fromTo(query('.dialogue-box h2'), { x: -16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .36 }, .54)
      .fromTo(query('.dialogue-box p'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .4 }, .6)
      .fromTo(query('.choice-list button'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .36, stagger: .075 }, .72);
  } else if (kind === 'dialogue') {
    timeline
      .fromTo(query('h2'), { x: -12, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .32 })
      .fromTo(query('p'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .38 }, .1)
      .fromTo(query('.choice-list button, .result-overlay button'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .32, stagger: .07 }, .2);
  } else if (kind === 'gameplay-panel' || kind === 'modal') {
    timeline
      .fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: .22 })
      .fromTo(query('.gameplay-panel, .gallery-viewer, .minigame-panel'), { y: 28, scale: .975, autoAlpha: 0, filter: 'blur(8px)' }, { y: 0, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: .5 }, 0)
      .fromTo(query('.gameplay-panel__header, .gallery-viewer > *, .minigame-panel > *'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .32, stagger: .055 }, .2);
  } else {
    timeline
      .fromTo(query('header'), { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .46 })
      .fromTo(query('form, .slot-actions, .save-slot, .gallery-item, .panel-empty, .credits-notice, .credits-list, .official-listening, label, .asset-status'), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .42, stagger: .055 }, .12);
  }

  return timeline.eventCallback('onComplete', () => { root.dataset.motionState = 'settled'; });
}

/**
 * UI motion is intentionally separate from Three.js VFX: GSAP owns episodic
 * interface choreography, while the WebGL runtime remains the sole per-frame
 * renderer. Every timeline is scoped to the supplied root and killed on exit.
 */
export function createAlbinaMotionController(reducedMotion: Ref<boolean>): AlbinaMotionController {
  const timelines = new Set<gsap.core.Timeline | gsap.core.Tween>();
  const kill = () => { timelines.forEach((timeline) => timeline.kill()); timelines.clear(); };
  const track = <T extends gsap.core.Timeline | gsap.core.Tween>(timeline: T): T => { timelines.add(timeline); return timeline; };
  const replace = () => kill();

  return {
    reveal(kind, root) {
      replace();
      if (reducedMotion.value) return runReducedMotion(kind, root);
      track(screenTimeline(kind, root));
    },
    enterScreen(kind, root, done) {
      replace();
      if (reducedMotion.value) { runReducedMotion(kind, root); done(); return; }
      const timeline = screenTimeline(kind, root);
      track(timeline);
      timeline.eventCallback('onComplete', done);
    },
    leaveScreen(root, done) {
      replace();
      if (reducedMotion.value) { done(); return; }
      root.dataset.motionState = 'leaving';
      track(gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete: done })
        .to(root, { autoAlpha: 0, scale: .992, filter: 'brightness(.72) saturate(.82)', duration: .3 })
        .set(root, { clearProps: 'transform,filter' }));
    },
    revealDialogue(root) {
      if (reducedMotion.value) return runReducedMotion('dialogue', root);
      const query = gsap.utils.selector(root);
      track(gsap.timeline({ defaults: { ease: EASE_ENTER } })
        .fromTo(query('h2'), { x: -12, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .32 })
        .fromTo(query('p'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .38 }, .1)
        .fromTo(query('.choice-list button, .result-overlay button'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .32, stagger: .07 }, .2));
    },
    transitionScene(root) {
      if (reducedMotion.value) return runReducedMotion('scene', root);
      root.dataset.motionState = 'transitioning';
      track(gsap.timeline({ defaults: { ease: EASE_ENTER } })
        .to(root, { scale: .992, filter: 'brightness(.78) saturate(.88)', duration: .14 })
        .to(root, { scale: 1.008, filter: 'brightness(1.12) saturate(1.06)', duration: .2 })
        .to(root, { scale: 1, filter: 'brightness(1) saturate(1)', duration: .38, ease: 'power2.out' })
        .eventCallback('onComplete', () => { root.dataset.motionState = 'settled'; }));
    },
    pulseDialogue(root) {
      if (reducedMotion.value) return;
      track(gsap.timeline({ defaults: { ease: 'power2.out' } })
        .to(root, { y: -2, scale: 1.004, duration: .1 })
        .to(root, { y: 0, scale: 1, duration: .32 }));
    },
    switchSpeaker(root) {
      if (reducedMotion.value) return runReducedMotion('dialogue', root);
      const query = gsap.utils.selector(root);
      track(gsap.timeline({ defaults: { ease: EASE_ENTER } })
        .fromTo(query('h2'), { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .22 }));
    },
    revealSceneLabel(root) {
      if (reducedMotion.value) return runReducedMotion('dialogue', root);
      track(gsap.timeline({ defaults: { ease: EASE_ENTER } })
        .fromTo(root, { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .3 }));
    },
    wipeScene(root) {
      if (reducedMotion.value) return runReducedMotion('scene', root);
      track(gsap.timeline({ defaults: { ease: 'power3.inOut' } })
        .set(root, { autoAlpha: .9, clipPath: 'inset(0 0 0 0)' })
        .to(root, { clipPath: 'inset(0 0 0 100%)', autoAlpha: 0, duration: .58 }));
    },
    pulseChoice(button) {
      if (reducedMotion.value) return;
      track(gsap.timeline({ defaults: { ease: 'power2.out' } })
        .to(button, { scale: .975, duration: .09 })
        .to(button, { scale: 1.025, filter: 'brightness(1.22)', duration: .18 })
        .to(button, { scale: 1, filter: 'brightness(1)', duration: .26 }));
    },
    pulseHud(button) {
      if (reducedMotion.value) return;
      track(gsap.fromTo(button, { scale: 1 }, { scale: 1.08, duration: .16, yoyo: true, repeat: 1, ease: 'power2.out' }));
    },
    pulseStatus(root, tone = 'golden') {
      if (reducedMotion.value) return;
      const color = tone === 'danger' ? '#ec765f' : tone === 'cool' ? '#a7d7ef' : '#efd27c';
      track(gsap.timeline({ defaults: { ease: 'power2.out' } })
        .to(root, { scale: 1.08, color, duration: .16 })
        .to(root, { scale: 1, color: '', duration: .46 }));
    },
    pulseHudValue(root, tone = 'golden') {
      if (reducedMotion.value) return;
      const color = tone === 'danger' ? '#ec765f' : '#efd27c';
      track(gsap.timeline({ defaults: { ease: 'power2.out' } })
        .to(root, { scale: 1.1, color, duration: .18 })
        .to(root, { scale: 1, color: '', duration: .5 }));
    },
    revealResult(root) {
      if (reducedMotion.value) return runReducedMotion('dialogue', root);
      track(gsap.timeline({ defaults: { ease: EASE_ENTER } })
        .fromTo(root, { y: 12, autoAlpha: 0, filter: 'blur(5px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: .4 })
        .fromTo(root.querySelectorAll('p, button'), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .07, duration: .28 }, .12));
    },
    revealMinigameResult(root, outcome = 'perfect') {
      if (reducedMotion.value) return runReducedMotion('modal', root);
      const tone = outcome === 'assisted' ? '#9fd6ea' : outcome === 'setback' ? '#e39aa0' : outcome === 'skipped' ? '#b6c1cb' : '#f1d782';
      track(gsap.timeline({ defaults: { ease: EASE_ENTER } })
        .fromTo(root, { y: 24, scale: .96, autoAlpha: 0, filter: 'blur(6px) brightness(1.3)' }, { y: 0, scale: 1, autoAlpha: 1, filter: 'blur(0px) brightness(1)', duration: .42 })
        .fromTo(root.querySelectorAll('h3'), { color: '#8b98a6' }, { color: tone, duration: .38 }, .1)
        .fromTo(root.querySelectorAll('p, small, button'), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .06, duration: .3 }, .16));
    },
    dismissMinigameResult(root, onComplete) {
      if (reducedMotion.value) { onComplete(); return; }
      track(gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete })
        .to(root, { y: 18, scale: .98, autoAlpha: 0, filter: 'blur(4px)', duration: .22 }));
    },
    switchPanelTab(root) {
      if (reducedMotion.value) return runReducedMotion('panel', root);
      const query = gsap.utils.selector(root);
      track(gsap.fromTo(query('[role="tabpanel"]:not([style*="display: none"]) > *'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .34, stagger: .045, ease: EASE_ENTER }));
    },
    dismissModal(root, onComplete) {
      if (reducedMotion.value) { onComplete(); return; }
      track(gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete })
        .to(root.querySelector('.gameplay-panel, .gallery-viewer, .minigame-panel') ?? root, { y: 18, scale: .985, autoAlpha: 0, filter: 'blur(6px)', duration: .24 })
        .to(root, { autoAlpha: 0, duration: .16 }, 0));
    },
    dispose: kill,
  };
}

export function useAlbinaScreenMotion(
  root: Ref<HTMLElement | undefined>,
  screen: Ref<string>,
  reducedMotion: Ref<boolean>,
): AlbinaMotionController {
  const controller = createAlbinaMotionController(reducedMotion);
  watch(screen, async (next) => {
    await nextTick();
    if (!root.value) return;
    const kind: AlbinaMotionKind = next === 'title' ? 'title' : next === 'game' ? 'game' : next === 'profile' ? 'profile' : 'panel';
    controller.reveal(kind, root.value);
  }, { immediate: true, flush: 'post' });
  onBeforeUnmount(() => controller.dispose());
  return controller;
}
