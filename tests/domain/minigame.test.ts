import { describe, expect, it } from 'vitest';

import compiled from '../../dist/albina-galgame-card/data/game-script-v2.json';
import manifestJson from '../../content/asset-manifest-v2.json';
import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2, type GameRouteId } from '../../src/domain/game-script';
import {
  isBetterMinigameOutcome,
  resolveMinigameAttempt,
  seededOrder,
  type MinigameAttempt,
  type MinigameDefinition,
} from '../../src/domain/minigame';
import { serializeSaveV2, parseSaveV2 } from '../../src/domain/save';
import { decodeSaveJson } from '../../src/domain/migrate-save-v1';
import { GameSession } from '../../src/game/session';

const script = parseGameScriptV2(compiled, parseAssetManifestV2(manifestJson));
const NOW = '2026-08-30T00:00:00.000Z';

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

interface RouteChallenge {
  route: GameRouteId;
  sceneId: string;
  minigameId: string;
  perfect: MinigameAttempt;
  wrong: MinigameAttempt;
}

const routeChallenges: RouteChallenge[] = [
  {
    route: 'white_canvas',
    sceneId: 'white_canvas_003',
    minigameId: 'minigame.white.mirror_thread',
    perfect: { kind: 'mirror_thread', selectedAnchorIds: ['witness', 'consent'], assisted: false },
    wrong: { kind: 'mirror_thread', selectedAnchorIds: ['witness', 'ownership'], assisted: false },
  },
  {
    route: 'golden_bough_rebuild',
    sceneId: 'golden_bough_006',
    minigameId: 'minigame.golden.testimony_cipher',
    perfect: { kind: 'testimony_cipher', orderedFragmentIds: ['name', 'consent', 'copy'], assisted: false },
    wrong: { kind: 'testimony_cipher', orderedFragmentIds: ['copy', 'consent', 'name'], assisted: false },
  },
  {
    route: 'ring_conspiracy',
    sceneId: 'ring_conspiracy_008',
    minigameId: 'minigame.ring.boundary_resonance',
    perfect: { kind: 'boundary_resonance', activeNodeIds: ['authorship', 'revocation', 'trace'], assisted: false },
    wrong: { kind: 'boundary_resonance', activeNodeIds: ['authorship', 'possession'], assisted: false },
  },
];

function definitionOf(id: string): MinigameDefinition {
  const definition = script.gameplay.minigames.find((entry) => entry.id === id);
  if (!definition) throw new Error(`Missing minigame definition: ${id}`);
  return definition;
}

function challengeOf(sceneId: string) {
  const scene = script.scenes.find((entry) => entry.id === sceneId);
  if (!scene?.minigame) throw new Error(`Scene has no minigame challenge: ${sceneId}`);
  return scene.minigame;
}

/** Walks the authored route until the scene that owns the narrative challenge. */
function advanceTo(route: GameRouteId, sceneId: string): GameSession {
  const session = new GameSession(script, { now: () => NOW });
  recapChoices.forEach((choiceId) => session.choose(choiceId));
  session.choose(routeEntryChoices[route]);
  let guard = 0;
  while (session.scene.id !== sceneId) {
    if (guard += 1, guard > 64) throw new Error(`Unable to reach ${sceneId} from ${session.scene.id}`);
    const choice = session.choices.find(({ id }) => !id.startsWith('return_opening_'));
    if (!choice) throw new Error(`No forward choice from ${session.scene.id}`);
    session.choose(choice.id);
  }
  return session;
}

describe('narrative minigame resolver', () => {
  it.each(routeChallenges)('scores perfect, assisted, setback, and skipped for $minigameId', (entry) => {
    const definition = definitionOf(entry.minigameId);
    const challenge = challengeOf(entry.sceneId);

    expect(resolveMinigameAttempt(definition, challenge, entry.perfect))
      .toEqual({ outcome: 'perfect', score: 100, assisted: false });
    expect(resolveMinigameAttempt(definition, challenge, { ...entry.perfect, assisted: true }))
      .toEqual({ outcome: 'assisted', score: 60, assisted: true });
    expect(resolveMinigameAttempt(definition, challenge, entry.wrong))
      .toEqual({ outcome: 'setback', score: 0, assisted: false });
    expect(resolveMinigameAttempt(definition, challenge, { kind: 'skip', assisted: true }))
      .toEqual({ outcome: 'skipped', score: 0, assisted: true });
  });

  it('rejects attempts whose kind does not match the authored puzzle', () => {
    const definition = definitionOf('minigame.white.mirror_thread');
    const challenge = challengeOf('white_canvas_003');
    expect(() => resolveMinigameAttempt(definition, challenge, {
      kind: 'boundary_resonance', activeNodeIds: ['witness'], assisted: false,
    })).toThrow(/does not match/iu);
  });

  it('rejects malformed attempt payloads', () => {
    const definition = definitionOf('minigame.white.mirror_thread');
    const challenge = challengeOf('white_canvas_003');
    expect(() => resolveMinigameAttempt(definition, challenge, { kind: 'mirror_thread', selectedAnchorIds: ['witness'], assisted: false })).toThrow();
    expect(() => resolveMinigameAttempt(definition, challenge, { kind: 'unknown', assisted: false })).toThrow();
  });

  it('refuses to skip when the authored challenge forbids it', () => {
    const definition = definitionOf('minigame.white.mirror_thread');
    const challenge = { ...challengeOf('white_canvas_003'), allowSkip: false };
    expect(() => resolveMinigameAttempt(definition, challenge, { kind: 'skip', assisted: true })).toThrow(/skipping is unavailable/iu);
  });

  it('ranks outcomes so a later setback never downgrades a stored best result', () => {
    expect(isBetterMinigameOutcome('perfect', undefined)).toBe(true);
    expect(isBetterMinigameOutcome('assisted', 'perfect')).toBe(false);
    expect(isBetterMinigameOutcome('setback', 'skipped')).toBe(true);
    expect(isBetterMinigameOutcome('skipped', 'setback')).toBe(false);
  });

  it('produces a deterministic presentation order without altering membership', () => {
    const entries = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
    const first = seededOrder(entries, 'white-canvas-lce-witness-v1');
    const second = seededOrder(entries, 'white-canvas-lce-witness-v1');
    expect(first.map(({ id }) => id)).toEqual(second.map(({ id }) => id));
    expect([...first].map(({ id }) => id).sort()).toEqual(['a', 'b', 'c', 'd']);
    expect(seededOrder(entries, 'ring-counter-contract-v1').map(({ id }) => id)).not.toEqual(first.map(({ id }) => id));
  });
});

describe('authored minigame catalog', () => {
  it('binds exactly one challenge per route to a reachable scene', () => {
    const bound = script.scenes.filter((scene) => scene.minigame);
    expect(bound.map((scene) => scene.id).sort()).toEqual(['golden_bough_006', 'ring_conspiracy_008', 'white_canvas_003']);
    expect(script.gameplay.minigames).toHaveLength(3);
    expect(script.gameplay.minigames.map(({ route }) => route).sort())
      .toEqual(['golden_bough_rebuild', 'ring_conspiracy', 'white_canvas']);
  });

  it('keeps the main path unlockable by allowing skip and rewarding every outcome branch', () => {
    for (const scene of script.scenes) {
      if (!scene.minigame) continue;
      expect(scene.minigame.allowSkip).toBe(true);
      const definition = definitionOf(scene.minigame.minigameId);
      expect(Object.keys(definition.outcomes).sort()).toEqual(['assisted', 'perfect', 'setback', 'skipped']);
      expect(definition.outcomes.perfect).not.toEqual(definition.outcomes.setback);
    }
  });
});

describe('GameSession minigame integration', () => {
  it.each(routeChallenges)('writes an authoritative record and rewards on $route', (entry) => {
    const session = advanceTo(entry.route, entry.sceneId);
    const definition = definitionOf(entry.minigameId);

    expect(session.currentMinigame?.definition.id).toBe(entry.minigameId);
    expect(session.activeMinigame?.definition.id).toBe(entry.minigameId);
    expect(session.currentMinigame?.record).toBeUndefined();

    const before = structuredClone(session.save.values);
    const resolution = session.resolveMinigame(entry.perfect);
    expect(resolution).toEqual({ outcome: 'perfect', score: 100, assisted: false });

    const record = session.save.minigames.records[entry.minigameId];
    expect(record).toMatchObject({
      attempts: 1, resolved: true, completed: true, rewardClaimed: true,
      bestOutcome: 'perfect', lastOutcome: 'perfect', bestScore: 100, assisted: false,
      seed: challengeOf(entry.sceneId).seed, resolvedAt: NOW,
    });

    const trustDelta = definition.outcomes.perfect.values?.trust ?? 0;
    expect(session.save.values.trust).toBe(before.trust + trustDelta);
    for (const flag of definition.outcomes.perfect.setFlags ?? []) {
      expect(session.save.flags[flag]).toBe(true);
    }
    for (const [profession, xp] of Object.entries(definition.outcomes.perfect.professionXp ?? {})) {
      expect(session.save.professions.progress[profession]?.xp ?? 0).toBeGreaterThanOrEqual(xp);
    }

    const log = session.save.logs.story.at(-1);
    expect(log).toMatchObject({ kind: 'minigame', minigameId: entry.minigameId, sceneId: entry.sceneId, outcome: 'perfect', score: 100 });

    // The entry disappears once resolved, but the record stays observable.
    expect(session.activeMinigame).toBeUndefined();
    expect(session.currentMinigame?.record?.resolved).toBe(true);
    expect(() => session.resolveMinigame(entry.perfect)).toThrow(/already resolved/iu);
  });

  it('keeps a setback survivable and still advances the authored story', () => {
    const entry = routeChallenges[0]!;
    const session = advanceTo(entry.route, entry.sceneId);
    const beforeDanger = session.save.values.danger;

    const resolution = session.resolveMinigame(entry.wrong);
    expect(resolution.outcome).toBe('setback');
    expect(session.save.minigames.records[entry.minigameId]).toMatchObject({ resolved: true, completed: false, bestScore: 0, lastOutcome: 'setback' });
    expect(session.save.values.danger).toBeGreaterThan(beforeDanger);
    expect(session.save.flags.minigame_white_boundary_setback).toBe(true);

    const forward = session.choices.find(({ id }) => !id.startsWith('return_opening_'));
    expect(forward).toBeDefined();
    expect(() => session.choose(forward!.id)).not.toThrow();
    expect(session.currentMinigame).toBeUndefined();
  });

  it('records a skip without granting completion rewards', () => {
    const entry = routeChallenges[1]!;
    const session = advanceTo(entry.route, entry.sceneId);
    const beforeTrust = session.save.values.trust;

    expect(session.resolveMinigame({ kind: 'skip', assisted: true })).toEqual({ outcome: 'skipped', score: 0, assisted: true });
    expect(session.save.minigames.records[entry.minigameId]).toMatchObject({ resolved: true, completed: false, lastOutcome: 'skipped', bestScore: 0 });
    expect(session.save.values.trust).toBe(beforeTrust);
  });

  it('rejects resolving a minigame outside its authored scene', () => {
    const session = new GameSession(script, { now: () => NOW });
    expect(session.currentMinigame).toBeUndefined();
    expect(session.activeMinigame).toBeUndefined();
    expect(() => session.resolveMinigame(routeChallenges[0]!.perfect)).toThrow(/no minigame is active/iu);
  });

  it('round-trips minigame records through save serialization and restore', () => {
    const entry = routeChallenges[2]!;
    const session = advanceTo(entry.route, entry.sceneId);
    session.resolveMinigame({ ...entry.perfect, assisted: true });

    const serialized = serializeSaveV2(session.save);
    const restored = new GameSession(script, { save: JSON.parse(serialized), now: () => NOW });
    expect(restored.save.minigames.records[entry.minigameId]).toEqual(session.save.minigames.records[entry.minigameId]);
    expect(restored.activeMinigame).toBeUndefined();
    expect(restored.currentMinigame?.record?.lastOutcome).toBe('assisted');
    expect(restored.effectiveValues).toEqual(session.effectiveValues);
  });

  it('defaults legacy SaveV2 payloads without a minigame block to an empty record set', () => {
    const session = new GameSession(script, { now: () => NOW });
    const raw = JSON.parse(serializeSaveV2(session.save)) as Record<string, unknown>;
    delete raw.minigames;

    // Every real load path (host bindings, IndexedDB snapshots, import) funnels through these.
    expect(parseSaveV2(raw).minigames).toEqual({ records: {} });
    const decoded = decodeSaveJson(JSON.stringify(raw));
    expect(decoded.ok).toBe(true);
    if (decoded.ok) expect(decoded.save.minigames).toEqual({ records: {} });

    const restored = new GameSession(script, { save: parseSaveV2(raw), now: () => NOW });
    expect(restored.save.minigames).toEqual({ records: {} });
    expect(restored.activeMinigame).toBeUndefined();
  });
});
