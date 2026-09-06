export type TypewriterSink = (visibleText: string) => void;

export type TypewriterState = 'idle' | 'typing';

export type TypewriterStateListener = (state: TypewriterState) => void;

interface ActiveWrite {
  timer?: ReturnType<typeof setTimeout>;
  text: string;
  sink: TypewriterSink;
  visible: string;
  resolve(value: string): void;
}

/**
 * Sentence-aware pacing: full stops hold the beat so the player can parse the
 * line, while mid-sentence pauses are shorter. The mapping is a fixed table so
 * the reveal order stays deterministic across runs and tests.
 */
function delayAfter(character: string, intervalMs: number): number {
  if (intervalMs <= 0) return 0;
  // Full stops close a beat: . ！ ？ … and their half-width cousins.
  if ('.。！？…!?'.includes(character)) return intervalMs * 6;
  // Mid-sentence separators pause briefly: ，、；： and half-width , ;
  if (',，、；:;'.includes(character)) return intervalMs * 2.5;
  return intervalMs;
}

export class TypewriterService {
  private active: ActiveWrite | undefined;
  private readonly stateListeners = new Set<TypewriterStateListener>();

  /**
   * Subscribes to typing/idle transitions. Returns an unsubscribe function.
   * State events fire around every write: 'typing' once a write starts,
   * 'idle' when it settles (naturally, via cancel, or via completeNow).
   * Empty writes never transition away from 'idle'.
   */
  subscribe(listener: TypewriterStateListener): () => void {
    this.stateListeners.add(listener);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  write(text: string, sink: TypewriterSink, intervalMs = 24): Promise<string> {
    this.cancel();
    if (text.length === 0) {
      sink('');
      this.notifyState('idle');
      return Promise.resolve('');
    }
    this.notifyState('typing');
    return new Promise((resolve) => {
      let index = 0;
      const active: ActiveWrite = { text, sink, visible: '', resolve };
      const reveal = () => {
        active.visible = text.slice(0, index + 1);
        const revealed = text[index] ?? '';
        index += 1;
        sink(active.visible);
        if (index >= text.length) this.settle(active, text);
        else active.timer = setTimeout(reveal, delayAfter(revealed, intervalMs));
      };
      this.active = active;
      active.timer = setTimeout(reveal, Math.max(0, intervalMs));
    });
  }

  cancel(): void {
    const active = this.active;
    if (!active) return;
    this.settle(active, active.visible);
  }

  completeNow(): void {
    const active = this.active;
    if (!active) return;
    if (active.visible !== active.text) active.sink(active.text);
    this.settle(active, active.text);
  }

  dispose(): void {
    this.cancel();
    this.stateListeners.clear();
  }

  private settle(active: ActiveWrite, result: string): void {
    if (this.active !== active) return;
    if (active.timer !== undefined) clearTimeout(active.timer);
    this.active = undefined;
    active.resolve(result);
    this.notifyState('idle');
  }

  private notifyState(state: TypewriterState): void {
    for (const listener of this.stateListeners) {
      try {
        listener(state);
      } catch {
        // Observer exceptions never break the writer itself.
      }
    }
  }
}
