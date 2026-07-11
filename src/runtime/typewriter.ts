export type TypewriterSink = (visibleText: string) => void;

export class TypewriterService {
  private active: { timer?: ReturnType<typeof setTimeout>; finish: () => void } | undefined;

  write(text: string, sink: TypewriterSink, intervalMs = 24): Promise<string> {
    this.cancel();
    if (text.length === 0) {
      sink('');
      return Promise.resolve('');
    }
    return new Promise((resolve) => {
      let index = 0;
      let visible = '';
      const finish = () => {
        const result = visible;
        this.active = undefined;
        resolve(result);
      };
      const reveal = () => {
        visible = text.slice(0, index + 1);
        index += 1;
        sink(visible);
        if (index >= text.length) finish();
        else this.active!.timer = setTimeout(reveal, Math.max(0, intervalMs));
      };
      this.active = { finish };
      this.active.timer = setTimeout(reveal, Math.max(0, intervalMs));
    });
  }

  cancel(): void {
    const active = this.active;
    if (!active) return;
    if (active.timer !== undefined) clearTimeout(active.timer);
    active.finish();
  }

  dispose(): void {
    this.cancel();
  }
}
