import { describe, expect, it } from 'vitest';

import compiled from '../../dist/albina-galgame-card/data/game-script-v2.json';
import manifestJson from '../../content/asset-manifest-v2.json';
import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2 } from '../../src/domain/game-script';
import { GameSession } from '../../src/game/session';

describe('authoritative game session', () => {
  it('completes the canon recap and explicit AU boundary before applying route effects', () => {
    const manifest = parseAssetManifestV2(manifestJson);
    const session = new GameSession(parseGameScriptV2(compiled, manifest), { now: () => '2026-07-12T00:00:00.000Z' });
    const recapSteps = [
      ['canon_recap_9_14', 'canon_recap_continue_9_18', 'canon_recap_9_18'],
      ['canon_recap_9_18', 'canon_recap_continue_9_37', 'canon_recap_9_37'],
      ['canon_recap_9_37', 'canon_recap_continue_albina_fascia', 'canon_recap_albina_fascia'],
      ['canon_recap_albina_fascia', 'canon_recap_continue_9_37_battle', 'canon_recap_9_37_battle'],
      ['canon_recap_9_37_battle', 'canon_recap_continue_9_43', 'canon_recap_9_43_outcome'],
    ] as const;

    for (const [sceneId, choiceId, nextSceneId] of recapSteps) {
      expect(session.scene.id).toBe(sceneId);
      expect(session.scene.provenance.scope).toBe('canon_recap');
      expect(session.scene.provenance.classification).toBe('canon_paraphrase');
      expect(session.save.route).toBeNull();
      expect(() => session.choose('enter_rebuild')).toThrow(/unavailable/u);
      expect(session.choose(choiceId).scene.id).toBe(nextSceneId);
    }

    expect(session.scene.id).toBe('canon_recap_9_43_outcome');
    expect(session.scene.provenance.scope).toBe('canon_recap');
    expect(session.save.route).toBeNull();
    expect(session.choose('canon_recap_enter_AU').scene.id).toBe('opening_001');
    expect(session.scene.provenance.scope).toBe('AU_boundary');
    expect(session.scene.provenance.classification).toBe('AU_extension');
    expect(session.save.flags.canon_recap_complete).toBe(true);
    expect(session.save.flags.AU_boundary_acknowledged).toBe(true);
    expect(session.save.route).toBeNull();

    const result = session.choose('enter_rebuild');
    expect(result.scene.id).toBe('golden_bough_001');
    expect(session.save.route).toBe('golden_bough_rebuild');
    expect(session.save.values.trust).toBe(3);
    expect(session.save.flags.route_rebuild_seen).toBe(true);
    expect(session.save.unlockedCg).toContain('cg.golden_bough_rebuild');
    expect(manifest.assets.find((asset) => asset.id === 'cg.golden_bough_rebuild')?.kind).toBe('image');
    expect(session.save.logs.sceneBranches.map(({ choiceId, sceneId }) => ({ choiceId, sceneId }))).toEqual([
      { choiceId: 'canon_recap_continue_9_18', sceneId: 'canon_recap_9_18' },
      { choiceId: 'canon_recap_continue_9_37', sceneId: 'canon_recap_9_37' },
      { choiceId: 'canon_recap_continue_albina_fascia', sceneId: 'canon_recap_albina_fascia' },
      { choiceId: 'canon_recap_continue_9_37_battle', sceneId: 'canon_recap_9_37_battle' },
      { choiceId: 'canon_recap_continue_9_43', sceneId: 'canon_recap_9_43_outcome' },
      { choiceId: 'canon_recap_enter_AU', sceneId: 'opening_001' },
      { choiceId: 'enter_rebuild', sceneId: 'golden_bough_001' },
    ]);
    expect(session.save.logs.sceneBranches.every((entry) => entry.at === '2026-07-12T00:00:00.000Z')).toBe(true);
  });

  it('rejects choices that are not available from the current scene', () => {
    const manifest = parseAssetManifestV2(manifestJson);
    const session = new GameSession(parseGameScriptV2(compiled, manifest));
    expect(() => session.choose('white_006_name_silence')).toThrow(/unavailable/u);
  });
});
