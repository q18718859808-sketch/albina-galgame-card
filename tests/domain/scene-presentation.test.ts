import { describe, expect, it } from 'vitest';

import {
  resolveRelationshipRibbon,
  resolveScenePresentation,
  ScenePresentationSchema,
  screenSpacePortraitAnchors,
} from '../../src/domain/scene-presentation';

function scene(overrides: Record<string, unknown> = {}) {
  return {
    id: 'white_canvas_001',
    route: 'white_canvas',
    tone: 'quiet',
    portraits: [{ characterId: 'albina', position: 'right', active: true }],
    ending: undefined,
    ...overrides,
  } as Parameters<typeof resolveScenePresentation>[0];
}

describe('Scene Presentation Contract', () => {
  it('derives a stable focus camera from the active portrait position', () => {
    const presentation = resolveScenePresentation(scene());

    expect(presentation.focusCharacterId).toBe('albina');
    expect(presentation.focus).toEqual([0.66, 0.43]);
    expect(presentation.camera.mode).toBe('focus');
    expect(presentation.camera.zoom).toBeGreaterThan(1);
    expect(ScenePresentationSchema.parse(presentation)).toEqual(presentation);
  });

  it('maps authored tone and ending state to distinct camera modes', () => {
    expect(resolveScenePresentation(scene({ tone: 'threat' })).camera.mode).toBe('impact');
    expect(resolveScenePresentation(scene({ tone: 'rain' })).camera.mode).toBe('drift');
    expect(resolveScenePresentation(scene({ tone: 'neutral' })).camera.mode).toBe('establish');
    expect(resolveScenePresentation(scene({ tone: 'quiet', ending: { kind: 'true' } })).camera.mode).toBe('ending');
  });

  it('keeps route palettes deterministic and falls back for canon scenes', () => {
    expect(resolveScenePresentation(scene({ route: 'golden_bough_rebuild' })).palette).toEqual({ primary: '#f2c95f', shadow: '#382611' });
    expect(resolveScenePresentation(scene({ route: 'ring_conspiracy' })).palette).toEqual({ primary: '#d85f67', shadow: '#341116' });
    expect(resolveScenePresentation(scene({ route: null })).route).toBe('white_canvas');
  });

  it('derives deterministic screen-space relationship anchors without changing story cues', () => {
    const portraits = [
      { characterId: 'iris', position: 'left' as const, active: false },
      { characterId: 'albina', position: 'right' as const, active: true },
    ];
    const anchors = screenSpacePortraitAnchors(portraits.map((portrait) => ({ ...portrait, portraitAssetId: `${portrait.characterId}-cue`, scale: 1 })));
    const ribbon = resolveRelationshipRibbon(anchors, 'albina');
    const presentation = resolveScenePresentation(scene({ portraits: portraits.map((portrait) => ({ ...portrait, portraitAssetId: `${portrait.characterId}-cue`, scale: 1 })) }));

    expect(anchors).toEqual([
      expect.objectContaining({ characterId: 'iris', point: [0.34, 0.43], active: false }),
      expect.objectContaining({ characterId: 'albina', point: [0.66, 0.43], active: true }),
    ]);
    expect(ribbon).toMatchObject({ sourceCharacterId: 'iris', targetCharacterId: 'albina', source: [0.34, 0.43], target: [0.66, 0.43] });
    expect(presentation.relationshipRibbon).toEqual(ribbon);
  });

  it('omits the relationship line for a solo portrait composition', () => {
    expect(resolveScenePresentation(scene()).relationshipRibbon).toBeUndefined();
  });

  it('derives a cinematic visual profile alongside the camera plan', () => {
    const quiet = resolveScenePresentation(scene());
    const rain = resolveScenePresentation(scene({ tone: 'rain' }));
    const threat = resolveScenePresentation(scene({ tone: 'threat' }));
    const ending = resolveScenePresentation(scene({ ending: { kind: 'true' } }));

    expect(quiet.visual.profile).toBe('canvas');
    expect(quiet.visual.parallax).toBeGreaterThan(0);
    expect(rain.visual.profile).toBe('rain');
    expect(rain.visual.motifDensity).toBeGreaterThan(quiet.visual.motifDensity);
    expect(threat.visual.profile).toBe('threat');
    expect(threat.visual.bloom).toBeGreaterThan(quiet.visual.bloom);
    expect(ending.visual.profile).toBe('ending');
    expect(ending.visual.grain).toBeLessThanOrEqual(quiet.visual.grain);
  });
});
