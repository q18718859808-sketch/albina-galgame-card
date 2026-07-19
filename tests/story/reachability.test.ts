import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { parseAssetManifestV2 } from '../../src/domain/assets';
import { CanonClaimLedgerSchema, CanonSourceLedgerSchema, StoryProvenanceLedgerSchema } from '../../src/domain/canon';
import { GameScriptV2Schema, parseGameScriptV2 } from '../../src/domain/game-script';
import { GameSession } from '../../src/game/session';

const run = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '../..');
const sourceManifestPath = resolve(projectRoot, 'content/game-script-v2.json');
const assetManifestPath = resolve(projectRoot, 'content/asset-manifest-v2.json');
const compiledPath = resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');
const compilerPath = resolve(projectRoot, 'scripts/compile-story.mjs');
const sourceLedgerPath = resolve(projectRoot, 'content/canon-sources-v1.json');
const claimLedgerPath = resolve(projectRoot, 'content/canon-claims-v1.json');
const provenanceLedgerPath = resolve(projectRoot, 'content/story-provenance-v1.json');

interface StoryManifest {
  dialogueFiles: string[];
  gameplayFile: string;
  worldbookSourceFile: string;
}

interface StoryScene {
  id: string;
  route: string | null;
  speaker: string;
  text: string;
  voiceAssetId?: string;
  choices: Array<{ id: string; text: string; nextSceneId: string }>;
  provenance: {
    classification: 'canon_paraphrase' | 'AU_extension';
    scope: 'canon_recap' | 'AU_boundary' | 'route';
    claimIds: string[];
    sourceIds: string[];
  };
  ending?: {
    route: string;
    kind: 'true' | 'normal' | 'bad';
    eligibility: { allOf?: unknown[]; anyOf?: unknown[]; fallback?: boolean };
  };
}

interface CompiledStory {
  initialSceneId: string;
  scenes: StoryScene[];
}

function loadJson<T>(path: string): T | undefined {
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

describe('deterministic story compilation', () => {
  it('provides the authoring manifest, provenance ledgers, and compiler entry point', () => {
    expect(existsSync(sourceManifestPath)).toBe(true);
    expect(existsSync(compilerPath)).toBe(true);
    expect(existsSync(sourceLedgerPath)).toBe(true);
    expect(existsSync(claimLedgerPath)).toBe(true);
    expect(existsSync(provenanceLedgerPath)).toBe(true);
    expect(() => CanonSourceLedgerSchema.parse(loadJson<unknown>(sourceLedgerPath))).not.toThrow();
    expect(() => CanonClaimLedgerSchema.parse(loadJson<unknown>(claimLedgerPath))).not.toThrow();
    expect(() => StoryProvenanceLedgerSchema.parse(loadJson<unknown>(provenanceLedgerPath))).not.toThrow();
    const manifest = loadJson<StoryManifest & Record<string, unknown>>(sourceManifestPath);
    expect(manifest?.dialogueFiles[0]).toBe('dialogue/canon-recap.json');
    expect(manifest?.gameplayFile).toBe('gameplay-systems-v2.json');
    expect(manifest?.worldbookSourceFile).toBe('albina-card-canon-v1.json');
    expect(manifest).not.toHaveProperty('legacyOracle');
  });

  it('compiles byte-identical output on repeated runs', async () => {
    if (!existsSync(compilerPath) || !existsSync(sourceManifestPath)) return;
    const runner = resolve(projectRoot, 'node_modules/vite-node/vite-node.mjs');
    await run(process.execPath, [runner, compilerPath], { cwd: projectRoot });
    const first = readFileSync(compiledPath, 'utf8');
    await run(process.execPath, [runner, compilerPath], { cwd: projectRoot });
    expect(readFileSync(compiledPath, 'utf8')).toBe(first);
  }, 20_000);
});

describe('compiled story graph', () => {
  it('starts with six sourced canon paraphrases and crosses an explicit AU boundary', () => {
    const compiled = loadJson<CompiledStory>(compiledPath);
    expect(compiled).toBeDefined();
    if (!compiled) return;

    const scenes = new Map(compiled.scenes.map((scene) => [scene.id, scene]));
    const recapIds = [
      'canon_recap_9_14',
      'canon_recap_9_18',
      'canon_recap_9_37',
      'canon_recap_albina_fascia',
      'canon_recap_9_37_battle',
      'canon_recap_9_43_outcome',
    ];
    expect(compiled.initialSceneId).toBe(recapIds[0]);
    expect(compiled.scenes).toHaveLength(64);
    expect(compiled.scenes.filter((scene) => scene.provenance.classification === 'canon_paraphrase')).toHaveLength(6);
    expect(compiled.scenes.filter((scene) => scene.provenance.classification === 'AU_extension')).toHaveLength(58);
    recapIds.forEach((id, index) => {
      const scene = scenes.get(id);
      expect(scene?.route, id).toBeNull();
      expect(scene?.provenance.scope, id).toBe('canon_recap');
      expect(scene?.provenance.claimIds.length, id).toBeGreaterThan(0);
      expect(scene?.provenance.sourceIds.length, id).toBeGreaterThan(0);
      expect(scene?.choices[0]?.nextSceneId, id).toBe(recapIds[index + 1] ?? 'opening_001');
    });
    const opening = scenes.get('opening_001');
    expect(opening?.route).toBeNull();
    expect(opening?.provenance.scope).toBe('AU_boundary');
    expect(opening?.provenance.classification).toBe('AU_extension');
    expect(opening?.text).toMatch(/原创 AU\/IF/u);
    expect(opening?.choices).toHaveLength(3);
  });

  it('matches the strict game-script schema and contains no unknown references', () => {
    const compiled = loadJson<unknown>(compiledPath);
    expect(compiled).toBeDefined();
    if (!compiled) return;
    expect(() => GameScriptV2Schema.parse(compiled)).not.toThrow();
  });

  it('makes every scene structurally reachable and permits terminal nodes only for endings', () => {
    const compiled = loadJson<CompiledStory>(compiledPath);
    expect(compiled).toBeDefined();
    if (!compiled) return;

    const scenes = new Map(compiled.scenes.map((scene) => [scene.id, scene]));
    const reachable = new Set<string>();
    const pending = [compiled.initialSceneId];
    while (pending.length > 0) {
      const id = pending.pop();
      if (!id || reachable.has(id)) continue;
      reachable.add(id);
      const scene = scenes.get(id);
      expect(scene, `unknown scene ${id}`).toBeDefined();
      scene?.choices.forEach((choice) => pending.push(choice.nextSceneId));
    }

    expect(reachable).toEqual(new Set(scenes.keys()));
    for (const scene of compiled.scenes) {
      if (scene.choices.length === 0) expect(scene.ending, scene.id).toBeDefined();
    }
  });

  it('provides true, normal, and bad ending nodes with explicit eligibility for every route', () => {
    const compiled = loadJson<CompiledStory>(compiledPath);
    expect(compiled).toBeDefined();
    if (!compiled) return;

    const endings = compiled.scenes.filter((scene) => scene.ending);
    expect(endings).toHaveLength(9);
    for (const route of ['white_canvas', 'golden_bough_rebuild', 'ring_conspiracy']) {
      const routeEndings = endings.filter((scene) => scene.ending?.route === route);
      expect(routeEndings.map((scene) => scene.ending?.kind).sort()).toEqual(['bad', 'normal', 'true']);
      for (const ending of routeEndings) {
        const eligibility = ending.ending?.eligibility;
        expect(eligibility).toBeDefined();
        if (ending.ending?.kind === 'true') expect(eligibility?.allOf?.length).toBeGreaterThan(0);
        if (ending.ending?.kind === 'bad') expect(eligibility?.anyOf?.length).toBeGreaterThan(0);
        if (ending.ending?.kind === 'normal') expect(eligibility?.fallback).toBe(true);
      }
    }
  });

  it('reaches all nine endings through choices available from authoritative save state', () => {
    const compiled = loadJson<unknown>(compiledPath);
    const assetManifest = loadJson<unknown>(assetManifestPath);
    expect(compiled).toBeDefined();
    expect(assetManifest).toBeDefined();
    if (!compiled || !assetManifest) return;

    const manifest = parseAssetManifestV2(assetManifest);
    const script = parseGameScriptV2(compiled, manifest);
    const recap = [
      'canon_recap_continue_9_18', 'canon_recap_continue_9_37',
      'canon_recap_continue_albina_fascia', 'canon_recap_continue_9_37_battle',
      'canon_recap_continue_9_43', 'canon_recap_enter_AU',
    ];
    const routes = {
      white_canvas: {
        entry: 'enter_white_canvas',
        true: ['white_tease_back', 'white_follow_to_lab', 'white_interrupt_lab_terms', 'white_share_rain_window', 'white_canvas_route_complete', 'white_006_refuse_naming', 'white_007_ask_fascia_term', 'white_008_stay_witness_only', 'white_009_keep_half_step', 'white_010_offer_return_ticket', 'white_011_walk_beside', 'white_012_refuse_exhibit', 'white_013_point_to_mirror', 'white_014_keep_base_color', 'white_canvas_route_final'],
        bad: ['white_tease_back', 'white_follow_to_lab', 'white_sign_witness_protocol', 'white_keep_empty_seat', 'white_canvas_route_complete', 'white_006_refuse_naming', 'white_007_ask_fascia_term', 'white_008_hold_fascia', 'white_009_share_umbrella_edge', 'white_010_offer_return_ticket', 'white_011_walk_beside', 'white_012_refuse_exhibit', 'white_013_refuse_to_choose', 'white_014_keep_base_color', 'white_canvas_route_final'],
      },
      golden_bough_rebuild: {
        entry: 'enter_rebuild',
        true: ['rebuild_question_fascia', 'rebuild_push_into_raid', 'rebuild_guard_fascia_pulse', 'rebuild_use_rooftop_signal', 'golden_bough_route_complete', 'rebuild_006_keep_silent_anchor', 'rebuild_007_stay_own_rhythm', 'rebuild_008_trade_old_memory', 'rebuild_009_refuse_perfect_copy', 'rebuild_010_ask_her_choice', 'rebuild_011_ask_next_revision', 'rebuild_012_break_contract', 'rebuild_013_offer_witness', 'rebuild_014_ask_when_to_light', 'golden_bough_route_final'],
        bad: ['rebuild_question_fascia', 'rebuild_push_into_raid', 'rebuild_guard_fascia_pulse', 'rebuild_use_rooftop_signal', 'golden_bough_route_complete', 'rebuild_006_keep_silent_anchor', 'rebuild_007_stay_own_rhythm', 'rebuild_008_trade_old_memory', 'rebuild_009_hand_question_back', 'rebuild_010_ask_her_choice', 'rebuild_011_ask_next_revision', 'rebuild_012_negotiate_terms', 'rebuild_013_offer_witness', 'rebuild_014_ask_when_to_light', 'golden_bough_route_final'],
      },
      ring_conspiracy: {
        entry: 'enter_conspiracy',
        true: ['conspiracy_accept', 'conspiracy_escape_to_backstreets', 'conspiracy_break_pursuit_frame', 'ring_conspiracy_route_complete', 'conspiracy_005_refuse_duo', 'conspiracy_006_stand_with_her', 'conspiracy_007_break_frame', 'conspiracy_008_refuse_testimony', 'conspiracy_009_choose_present', 'conspiracy_010_throw_badge', 'conspiracy_011_rewrite_ending', 'conspiracy_012_keep_blade', 'conspiracy_013_return_gently', 'conspiracy_014_keep_one_line', 'ring_conspiracy_route_final'],
        bad: ['conspiracy_accept', 'conspiracy_escape_to_backstreets', 'conspiracy_break_pursuit_frame', 'ring_conspiracy_route_complete', 'conspiracy_005_refuse_duo', 'conspiracy_006_stand_with_her', 'conspiracy_007_break_frame', 'conspiracy_008_refuse_testimony', 'conspiracy_009_choose_present', 'conspiracy_010_throw_badge', 'conspiracy_011_burn_film', 'conspiracy_012_end_tonight', 'conspiracy_013_hold_one_second', 'conspiracy_014_keep_one_line', 'ring_conspiracy_route_final'],
      },
    } as const;

    for (const [route, paths] of Object.entries(routes)) {
      for (const kind of ['true', 'normal', 'bad'] as const) {
        const session = new GameSession(script);
        [...recap, paths.entry, ...(kind === 'true' ? paths.true : paths.bad)].forEach((choiceId) => session.choose(choiceId));
        const endingChoice = session.choices.find(({ nextSceneId }) => nextSceneId.endsWith(`_ending_${kind}`));
        expect(endingChoice, `${route}.${kind}`).toBeDefined();
        expect(session.choose(endingChoice!.id).scene.ending).toMatchObject({ route, kind });
      }
    }
  });
});
