import type { SceneBeatPhase, ScenePresentation } from '../domain/scene-presentation';
import type { VfxCueKind } from '../domain/vfx-cue';

export interface SceneDirectorSnapshot {
  phase: SceneBeatPhase;
  progress: number;
  offset: [number, number];
  zoom: number;
  shake: number;
  /** Damped screen-space focus: follows the authored target instead of cutting. */
  focus: [number, number];
}

export interface SceneDirector {
  setScene(presentation: ScenePresentation): void;
  /** Retargets the damped focus to an authored screen-space point. */
  setFocus(target: [number, number]): void;
  trigger(kind: VfxCueKind, intensity: number, durationMs: number): void;
  advance(deltaMs: number): SceneDirectorSnapshot;
  snapshot(): SceneDirectorSnapshot;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function phaseFor(elapsedMs: number, presentation: ScenePresentation): SceneBeatPhase {
  if (elapsedMs < presentation.timing.enterMs) return 'enter';
  if (elapsedMs < presentation.timing.enterMs + presentation.timing.establishMs) return 'establish';
  return 'dialogue';
}

/**
 * Ease-out with a light overshoot (easeOutBack family). The camera enters
 * past its authored zoom and settles back, giving the beat a cinematic
 * overshoot without randomness. Deterministic: 0 -> 0 and 1 -> 1 exactly.
 * The peak sits around t=0.62 with overshoot=1.3, well inside the enter beat.
 */
function easeOutOvershoot(progress: number, overshoot = 1.3): number {
  const c3 = overshoot + 1;
  const shift = progress - 1;
  return 1 + c3 * shift * shift * shift + overshoot * shift * shift;
}

/** Maps authored camera damping (0.01..1) to a frame-rate independent focus time constant. */
function focusTimeConstantMs(damping: number): number {
  return clamp(560 - damping * 2600, 90, 600);
}

export function createSceneDirector(initial: ScenePresentation): SceneDirector {
  let presentation = initial;
  let elapsedMs = 0;
  let pulseUntil = 0;
  let pulseStartedAt = 0;
  let pulseIntensity = 0;
  let forcedPhase: SceneBeatPhase | undefined;
  let forcedPhaseUntil = 0;
  let focusTarget: [number, number] = [...initial.focus];
  let focus: [number, number] = [...initial.focus];
  let state: SceneDirectorSnapshot = {
    phase: 'enter',
    progress: 0,
    offset: [0, 0],
    zoom: 1,
    shake: 0,
    focus: [...focus],
  };

  const update = (deltaMs: number): SceneDirectorSnapshot => {
    const phase = forcedPhase && elapsedMs < forcedPhaseUntil ? forcedPhase : phaseFor(elapsedMs, presentation);
    const enterProgress = clamp(elapsedMs / presentation.timing.enterMs, 0, 1);
    const eased = easeOutOvershoot(enterProgress);
    const pulse = elapsedMs < pulseUntil
      ? pulseIntensity * (1 - (elapsedMs - pulseStartedAt) / Math.max(1, pulseUntil - pulseStartedAt))
      : 0;
    const phaseZoom = phase === 'enter' ? 1 + (presentation.camera.zoom - 1) * eased : presentation.camera.zoom;
    const drift = phase === 'establish' ? Math.sin(elapsedMs * 0.0017) * 0.006 : 0;
    // Exponential damping is frame-rate independent: the same convergence in
    // ~tau regardless of the render loop's delta. Clamp so a 250ms advance cap
    // never teleports the focus in a single step.
    if (deltaMs > 0) {
      const tau = focusTimeConstantMs(presentation.camera.damping);
      const weight = 1 - Math.exp(-Math.min(deltaMs, 250) / tau);
      focus = [
        focus[0] + (focusTarget[0] - focus[0]) * weight,
        focus[1] + (focusTarget[1] - focus[1]) * weight,
      ];
    }
    state = {
      phase,
      progress: clamp(elapsedMs / (presentation.timing.enterMs + presentation.timing.establishMs), 0, 1),
      offset: [presentation.camera.offset[0] + drift, presentation.camera.offset[1]],
      zoom: phaseZoom + pulse * 0.012,
      shake: Math.max(presentation.camera.shake * pulse, pulse * 0.025),
      focus: [...focus],
    };
    return state;
  };

  return {
    setScene(next) {
      presentation = next;
      elapsedMs = 0;
      pulseUntil = 0;
      pulseStartedAt = 0;
      pulseIntensity = 0;
      forcedPhase = undefined;
      forcedPhaseUntil = 0;
      focusTarget = [...next.focus];
      // The camera glides from the previous focus to the new scene's focus
      // rather than cutting, so route and scene changes read as one motion.
      update(0);
    },
    setFocus(target) {
      focusTarget = [clamp(target[0], 0, 1), clamp(target[1], 0, 1)];
      update(0);
    },
    trigger(kind, intensity, durationMs) {
      const phase: SceneBeatPhase = kind === 'choice-confirm'
        ? 'choice'
        : kind === 'route-transition' || kind === 'chapter-transition' || kind === 'cg-reveal' || kind === 'ending'
          ? 'exit'
          : state.phase;
      if (phase === 'choice' || phase === 'exit') {
        forcedPhase = phase;
        forcedPhaseUntil = Math.max(forcedPhaseUntil, elapsedMs + durationMs);
      }
      pulseStartedAt = elapsedMs;
      pulseIntensity = Math.max(pulseIntensity, clamp(intensity, 0, 1));
      pulseUntil = Math.max(pulseUntil, elapsedMs + durationMs);
      update(0);
    },
    advance(deltaMs) {
      elapsedMs += Math.max(0, Math.min(deltaMs, 250));
      return update(deltaMs);
    },
    snapshot() { return state; },
  };
}
