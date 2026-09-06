import { VfxCueSchema, type VfxCue, type VfxCueKind, type VfxSceneState } from '../domain/vfx-cue';

export interface VfxSceneCommit extends VfxSceneState {
  previousRoute?: string | null;
  previousSceneId?: string;
  previousChapter?: number;
}

export interface VfxInteractionChannel {
  emit(cue: VfxCue): void;
  commitScene(next: VfxSceneCommit): void;
  dispose(): void;
}

export type VfxCueSink = (cue: VfxCue) => void;

/**
 * Interaction-driven pulses that can repeat quickly under a rapid click or a
 * scripted beat. Only these kinds are rate-limited; authored transitions
 * (route/chapter/CG/ending/impact) are low-frequency story beats that must
 * never be swallowed by a cooldown window.
 */
const COOLDOWN_KINDS: ReadonlySet<VfxCueKind> = new Set(['atmosphere', 'dialogue-emphasis', 'choice-confirm']);
const COOLDOWN_MS = 180;

/**
 * Small, host-independent event boundary between game interaction and VFX.
 * The channel owns validation, pulse de-duplication and teardown; rendering
 * implementations remain free to be WebGL, SVG, or a static canvas.
 */
export function createVfxInteractionChannel(
  sink: VfxCueSink,
  now: () => number = () => (typeof performance !== 'undefined' ? performance.now() : Date.now()),
): VfxInteractionChannel {
  let disposed = false;
  const lastEmittedAt = new Map<VfxCueKind, number>();

  const emit = (cue: VfxCue): void => {
    if (disposed) return;
    const parsed = VfxCueSchema.safeParse(cue);
    if (!parsed.success) return;
    const timestamp = now();
    if (COOLDOWN_KINDS.has(parsed.data.kind)) {
      const last = lastEmittedAt.get(parsed.data.kind);
      if (last !== undefined && timestamp - last < COOLDOWN_MS) return;
      lastEmittedAt.set(parsed.data.kind, timestamp);
    }
    sink(parsed.data);
  };

  return {
    emit,
    commitScene(next) {
      if (disposed) return;
      const routeChanged = next.previousRoute !== undefined && next.previousRoute !== next.route;
      const sceneChanged = next.previousSceneId !== undefined && next.previousSceneId !== next.sceneId;
      const chapterChanged = next.previousChapter !== undefined && next.chapter !== undefined && next.previousChapter !== next.chapter;

      // One authored transition owns the stage. More specific story beats
      // take precedence so a CG/ending never gets hidden by a chapter pulse.
      if (next.tone === 'threat') emit({ kind: 'impact' });
      else if (next.tone === 'gallery') emit({ kind: 'cg-reveal' });
      else if (next.tone === 'golden' || routeChanged) emit({ kind: routeChanged ? 'route-transition' : 'chapter-transition' });
      else if (sceneChanged || chapterChanged) emit({ kind: 'chapter-transition' });
      else if (next.tone === 'quiet') emit({ kind: 'dialogue-emphasis' });
    },
    dispose() {
      disposed = true;
      lastEmittedAt.clear();
    },
  };
}
