import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('Three.js route transition veil', () => {
  it('has a bounded enter, hold, and exit lifecycle owned by the VFX runtime', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');

    expect(source).toContain('function createTransitionVeil');
    expect(source).toContain("dataset.vfxTransitionPhase = 'enter'");
    expect(source).toContain("progress < .24 ? 'enter' : progress < .72 ? 'hold' : 'exit'");
    expect(source).toContain("dataset.vfxTransitionPhase = 'idle'");
    expect(source).toContain('transitionVeil.mesh.visible = false');
    expect(source).toContain('transitionVeil.geometry.dispose(); transitionVeil.material.dispose();');
  });

  it('keeps reduced-motion and context-loss fallback paths static', async () => {
    const [source, styles] = await Promise.all([
      readFile('src/vfx/galgame-vfx.ts', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);

    expect(source).toContain("if (quality === 'static')");
    expect(source).toContain("vfxTransition = cue.kind === 'route-transition' || cue.kind === 'chapter-transition'");
    expect(source).toContain("renderer.domElement.dataset.vfxContext = 'lost'");
    expect(source).toContain('options.onContextLost();');
    expect(styles).toContain("canvas[data-vfx-transition='static']");
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
