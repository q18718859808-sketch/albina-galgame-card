import { describe, expect, it } from 'vitest';

import compiled from '../../dist/albina-galgame-card/data/game-script-v2.json';
import manifestJson from '../../content/asset-manifest-v2.json';
import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2 } from '../../src/domain/game-script';
import { GameSession } from '../../src/game/session';

describe('authoritative game session', () => {
  it('applies choice effects and advances only through GameScriptV2', () => {
    const manifest = parseAssetManifestV2(manifestJson);
    const session = new GameSession(parseGameScriptV2(compiled, manifest), { now: () => '2026-07-12T00:00:00.000Z' });
    const result = session.choose('enter_rebuild');
    expect(result.scene.id).toBe('golden_bough_001');
    expect(session.save.route).toBe('golden_bough_rebuild');
    expect(session.save.values.trust).toBe(3);
    expect(session.save.flags.route_rebuild_seen).toBe(true);
    expect(session.save.unlockedCg).toContain('cg.golden_bough_rebuild');
    expect(manifest.assets.find((asset) => asset.id === 'cg.golden_bough_rebuild')?.kind).toBe('image');
    expect(session.save.logs.sceneBranches).toEqual([{ choiceId: 'enter_rebuild', sceneId: 'golden_bough_001', at: '2026-07-12T00:00:00.000Z' }]);
  });

  it('rejects choices that are not available from the current scene', () => {
    const manifest = parseAssetManifestV2(manifestJson);
    const session = new GameSession(parseGameScriptV2(compiled, manifest));
    expect(() => session.choose('white_006_name_silence')).toThrow(/unavailable/u);
  });
});
