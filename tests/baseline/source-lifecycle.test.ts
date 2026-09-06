import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('source launcher host lifecycle contract', () => {
  it('keeps installation state on the selected host window and reuses it', async () => {
    const source = await readFile('src/main.ts', 'utf8');
    expect(source).toContain('resolveAlbinaHostDocument');
    expect(source).toContain('__ALBINA_INSTALLATION__');
    expect(source).toContain('if (hostWindow.__ALBINA_INSTALLATION__) return hostWindow.__ALBINA_INSTALLATION__');
    expect(source).toContain('hostWindow.__ALBINA_INSTALLATION__ = installation');
  });

  it('exposes loading, ready, open, error, and closed states with observable failure text', async () => {
    const source = await readFile('src/main.ts', 'utf8');
    for (const state of ['loading', 'ready', 'open', 'error', 'closed']) expect(source).toContain(`'${state}'`);
    expect(source).toContain('launcher.dataset.albinaState');
    expect(source).toContain('stylesheet failed to load');
    expect(source).toContain('application mount failed');
  });

  it('boots the frontend inside a dedicated fullscreen host iframe (self-bootstrap)', async () => {
    const source = await readFile('src/main.ts', 'utf8');
    expect(source).toContain("hostDocument.createElement('iframe')");
    expect(source).toContain("frame.dataset.albinaShell = 'v2'");
    expect(source).toContain("zIndex: '2147483647'");
    expect(source).toContain("root.id = 'albina-v2-root'");
    // Bridge TavernHelper globals into the app frame so chat-variable
    // persistence keeps working inside the dedicated document.
    expect(source).toContain('bridgeFrameGlobals');
    // Bootstrap: the install path opens the frontend without a click.
    expect(source).toMatch(/\n {2}open\(\);\n/u);
  });

  it('removes the app frame, launcher, stylesheet, and host/page lifecycle listeners on uninstall', async () => {
    const source = await readFile('src/main.ts', 'utf8');
    expect(source).toContain('application?.unmount()');
    expect(source).toContain('frame?.remove()');
    expect(source).toContain('launcher.remove()');
    expect(source).toContain('style?.remove()');
    expect(source).toContain("listen(resolveAlbinaPagehideWindow(window, hostWindow), 'pagehide', lifecycleUnmount)");
    expect(source).toContain('listeners.splice(0).forEach');
  });
});
