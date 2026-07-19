import { describe, expect, it } from 'vitest';

import compiled from '../../dist/albina-galgame-card/data/game-script-v2.json';
import manifestJson from '../../content/asset-manifest-v2.json';
import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2, type GameRouteId } from '../../src/domain/game-script';
import { serializeSaveV2 } from '../../src/domain/save';
import { GameSession } from '../../src/game/session';

const script = parseGameScriptV2(compiled, parseAssetManifestV2(manifestJson));
const recapChoices = [
  'canon_recap_continue_9_18',
  'canon_recap_continue_9_37',
  'canon_recap_continue_albina_fascia',
  'canon_recap_continue_9_37_battle',
  'canon_recap_continue_9_43',
  'canon_recap_enter_AU',
];
const routeEntryChoices: Record<GameRouteId, string> = {
  white_canvas: 'enter_white_canvas',
  golden_bough_rebuild: 'enter_rebuild',
  ring_conspiracy: 'enter_conspiracy',
};
const routeSystems = {
  white_canvas: {
    quest: 'quest.white.boundary_protocol', battle: 'battle.white.gallery_pressure',
    equipment: 'equipment.white.boundary_charm', outfit: 'outfit.albina.white_canvas',
    profession: 'boundary_mediator', achievement: 'ach_white_boundary_archivist',
  },
  golden_bough_rebuild: {
    quest: 'quest.golden.memory_continuity', battle: 'battle.golden.replacement_protocol',
    equipment: 'equipment.golden.memory_lens', outfit: 'outfit.albina.golden_bough',
    profession: 'memory_surgeon', achievement: 'ach_golden_memory_protocol',
  },
  ring_conspiracy: {
    quest: 'quest.ring.counter_contract', battle: 'battle.ring.authorship_frame',
    equipment: 'equipment.ring.counter_signet', outfit: 'outfit.albina.ring_disguise',
    profession: 'ring_counterforger', achievement: 'ach_ring_counter_clause',
  },
} as const;

function enterRoute(route: GameRouteId): GameSession {
  const session = new GameSession(script, { now: () => '2026-07-15T00:00:00.000Z' });
  recapChoices.forEach((choiceId) => session.choose(choiceId));
  session.choose(routeEntryChoices[route]);
  return session;
}

function advanceToEndingGate(session: GameSession, preferSetback: boolean): void {
  while (!session.scene.id.endsWith('_ending_gate')) {
    const choices = session.choices.filter(({ id }) => !id.startsWith('return_opening_'));
    const choice = preferSetback ? choices.at(-1) : choices[0];
    if (!choice) throw new Error(`No route choice from ${session.scene.id}`);
    session.choose(choice.id);
  }
}

describe('compiled authoritative gameplay systems', () => {
  it('compiles every planned system and all authoritative worldbook entries', () => {
    expect(script.gameplay.relationshipTracks.map(({ id }) => id).sort()).toEqual(['intimacy', 'obsession', 'reliance', 'suspicion']);
    expect(script.gameplay.quests).toHaveLength(3);
    expect(script.gameplay.battles).toHaveLength(3);
    expect(script.gameplay.equipment).toHaveLength(4);
    expect(script.gameplay.professions).toHaveLength(4);
    expect(script.gameplay.achievements).toHaveLength(4);
    expect(script.gameplay.outfits).toHaveLength(4);
    expect(script.gameplay.worldbookEntries).toHaveLength(15);
  });

  it('references every gameplay definition from deterministic choice effects', () => {
    const effects = script.scenes.flatMap((scene) => scene.choices.map((choice) => choice.effects));
    const ids = (values: Array<string[] | undefined>) => new Set(values.flatMap((value) => value ?? []));
    const started = ids(effects.map(({ startQuests }) => startQuests));
    const completed = ids(effects.map(({ completeQuests }) => completeQuests));
    const granted = ids(effects.map(({ grantItems }) => grantItems));
    const equipped = ids(effects.map(({ equipItems }) => equipItems));
    const outfits = ids(effects.map(({ unlockOutfits }) => unlockOutfits));
    const battles = new Set(effects.flatMap(({ resolveBattles }) => resolveBattles?.map(({ battleId }) => battleId) ?? []));
    const professions = new Set(effects.flatMap(({ professionXp }) => Object.keys(professionXp ?? {})));

    expect(started).toEqual(new Set(script.gameplay.quests.map(({ id }) => id)));
    expect(completed).toEqual(started);
    expect(battles).toEqual(new Set(script.gameplay.battles.map(({ id }) => id)));
    expect(granted).toEqual(new Set(script.gameplay.items.map(({ id }) => id)));
    expect(equipped).toEqual(new Set(script.gameplay.equipment.map(({ id }) => id)));
    expect(outfits).toEqual(new Set(script.gameplay.outfits.map(({ id }) => id)));
    expect(professions).toEqual(new Set(script.gameplay.professions.map(({ id }) => id)));
  });

  it('rejects dangling references inside achievement rewards', () => {
    const invalid = structuredClone(compiled) as unknown as {
      gameplay: { achievements: Array<{ reward: Record<string, unknown> }> };
    };
    invalid.gameplay.achievements[0]!.reward.grantItems = ['item.missing'];
    expect(() => parseGameScriptV2(invalid, manifestJson)).toThrow(/unknown item reference/iu);
  });

  it.each(Object.keys(routeSystems) as GameRouteId[])('closes quest, battle, loadout, profession, achievement, relationship, and worldbook state on %s', (route) => {
    const session = enterRoute(route);
    const expected = routeSystems[route];
    expect(session.save.quests.activeNodeIds).toContain(expected.quest);
    expect(session.save.professions.activeId).toBe(expected.profession);
    expect(session.save.worldbook.seenEntryIds).toContain('albina_routes_endings_au_if');
    expect(session.save.achievements.unlockedIds).toContain('ach_au_boundary_witness');

    advanceToEndingGate(session, false);
    expect(session.save.quests.completedNodeIds).toContain(expected.quest);
    expect(session.save.battles.outcomes[expected.battle]).toBe('victory');
    expect(Object.values(session.save.inventory.equipped)).toContain(expected.equipment);
    expect(session.save.inventory.activeOutfitId).toBe(expected.outfit);
    expect(session.save.professions.progress[expected.profession]?.level).toBeGreaterThanOrEqual(2);
    expect(session.save.achievements.unlockedIds).toContain(expected.achievement);
    expect(session.save.values.relationshipVectors.reliance).toBeGreaterThanOrEqual(7);
    expect(() => JSON.parse(serializeSaveV2(session.save))).not.toThrow();
  });

  it('applies equipment and active-profession modifiers without mutating stored base values', () => {
    const session = enterRoute('white_canvas');
    while (session.scene.id !== 'white_canvas_004') session.choose(session.choices[0]!.id);
    expect(session.effectiveValues.trust).toBeGreaterThan(session.save.values.trust);
    const serialized = serializeSaveV2(session.save);
    const restored = new GameSession(script, { save: JSON.parse(serialized) });
    expect(restored.effectiveValues).toEqual(session.effectiveValues);
    expect(restored.outfitPortraitAssetId).toBe('portrait.albina.white-canvas');
  });
});
