export type TypewriterSink = (visibleText: string) => void;

interface ActiveWrite {
  timer?: ReturnType<typeof setTimeout>;
  text: string;
  sink: TypewriterSink;
  visible: string;
  resolve(value: string): void;
}

export class TypewriterService {
  private active: ActiveWrite | undefined;

  write(text: string, sink: TypewriterSink, intervalMs = 24): Promise<string> {
    this.cancel();
    if (text.length === 0) {
      sink('');
      return Promise.resolve('');
    }
    return new Promise((resolve) => {
      let index = 0;
      const active: ActiveWrite = { text, sink, visible: '', resolve };
      const reveal = () => {
        active.visible = text.slice(0, index + 1);
        index += 1;
        sink(active.visible);
        if (index >= text.length) this.settle(active, text);
        else active.timer = setTimeout(reveal, Math.max(0, intervalMs));
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
  }

  private settle(active: ActiveWrite, result: string): void {
    if (this.active !== active) return;
    if (active.timer !== undefined) clearTimeout(active.timer);
    this.active = undefined;
    active.resolve(result);
  }
}
