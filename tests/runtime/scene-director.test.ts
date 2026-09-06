import { describe, expect, it } from 'vitest';

import { resolveScenePresentation } from '../../src/domain/scene-presentation';
import { createSceneDirector } from '../../src/runtime/scene-director';

const presentation = resolveScenePresentation({
  id: 'ring_conspiracy_001',
  route: 'ring_conspiracy',
  tone: 'quiet',
  portraits: [{ characterId: 'albina', portraitAssetId: 'portrait.albina.normal', position: 'center', active: true, scale: 1 }],
});

function advance(director: ReturnType<typeof createSceneDirector>, durationMs: number) {
  let remaining = durationMs;
  while (remaining > 0) {
    const step = Math.min(250, remaining);
    director.advance(step);
    remaining -= step;
  }
  return director.snapshot();
}

describe('SceneDirector', () => {
  it('advances the authored enter and establish beats deterministically', () => {
    const director = createSceneDirector(presentation);

    expect(director.snapshot()).toMatchObject({ phase: 'enter', progress: 0, zoom: 1 });
    const entered = advance(director, 520);
    expect(entered.phase).toBe('establish');
    expect(entered.progress).toBeGreaterThan(0);
    expect(entered.zoom).toBeCloseTo(presentation.camera.zoom);
    expect(advance(director, 1450).phase).toBe('dialogue');
  });

  it('owns a cue phase for its authored window and then returns to dialogue', () => {
    const director = createSceneDirector(presentation);
    advance(director, 2000);
    director.trigger('choice-confirm', 0.72, 520);

    expect(director.snapshot().phase).toBe('choice');
    expect(director.snapshot().shake).toBeGreaterThan(0);
    expect(advance(director, 520).phase).toBe('dialogue');
  });

  it('resets the camera timeline when a new scene is committed', () => {
    const director = createSceneDirector(presentation);
    director.advance(2000);
    director.trigger('ending', 0.86, 1500);
    director.setScene({ ...presentation, sceneId: 'ending_001', tone: 'gallery' });

    expect(director.snapshot()).toMatchObject({ phase: 'enter', progress: 0, offset: presentation.camera.offset });
  });

  it('damps the focus toward a retargeted point instead of cutting', () => {
    const director = createSceneDirector(presentation);
    director.setFocus([0.2, 0.8]);

    const firstTick = director.advance(16.67);
    expect(firstTick.focus[0]).toBeGreaterThan(0.2);
    expect(firstTick.focus[0]).toBeLessThan(presentation.focus[0]);
    expect(firstTick.focus[1]).toBeLessThan(0.8);
    expect(firstTick.focus[1]).toBeGreaterThan(presentation.focus[1]);

    let current = director.snapshot();
    for (let index = 0; index < 120; index += 1) current = director.advance(16.67);
    expect(current.focus[0]).toBeCloseTo(0.2, 2);
    expect(current.focus[1]).toBeCloseTo(0.8, 2);
  });

  it('glides into a new scene focus instead of jumping on setScene', () => {
    const director = createSceneDirector(presentation);
    director.advance(16.67);
    const next = resolveScenePresentation({
      id: 'white_canvas_001',
      route: 'white_canvas',
      tone: 'quiet',
      portraits: [{ characterId: 'albina', portraitAssetId: 'portrait.albina.normal', position: 'left', active: true, scale: 1 }],
    });
    director.setScene(next);

    const first = director.advance(16.67);
    expect(first.focus[0]).not.toBeCloseTo(next.focus[0], 3);
    for (let index = 0; index < 150; index += 1) director.advance(16.67);
    expect(director.snapshot().focus[0]).toBeCloseTo(next.focus[0], 2);
  });

  it('overshoots the authored zoom briefly during the enter beat and settles exactly on it', () => {
    expect(presentation.camera.zoom).toBeGreaterThan(1);
    const director = createSceneDirector(presentation);
    // The overshoot peak sits around t=0.62 of the enter beat; sample past it.
    director.advance(250);
    director.advance(80);

    const mid = director.snapshot();
    expect(mid.phase).toBe('enter');
    expect(mid.zoom).toBeGreaterThan(presentation.camera.zoom);

    const settled = advance(director, presentation.timing.enterMs);
    expect(settled.zoom).toBeCloseTo(presentation.camera.zoom, 5);
  });
});
