import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { parseAssetManifestV2 } from '../../src/domain/assets';
import { GameScriptV2Schema, parseGameScriptV2 } from '../../src/domain/game-script';
import type { SaveV2 } from '../../src/domain/save';
import { GameSession } from '../../src/game/session';

const run = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '../..');
const sourceManifestPath = resolve(projectRoot, 'content/game-script-v2.json');
const assetManifestPath = resolve(projectRoot, 'content/asset-manifest-v2.json');
const compiledPath = resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');
const compilerPath = resolve(projectRoot, 'scripts/compile-story.mjs');
const extractorPath = resolve(projectRoot, 'scripts/extract-legacy-story.mjs');
const legacyBundlePath = resolve(projectRoot, 'tests/fixtures/legacy-console/index.js');

interface StoryManifest {
  dialogueFiles: string[];
  legacyOracle: { sceneAnchors: number; choices: number };
}

interface StoryScene {
  id: string;
  speaker: string;
  text: string;
  voiceAssetId?: string;
  choices: Array<{ id: string; text: string; nextSceneId: string }>;
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

interface LegacyScene {
  sceneId: string;
  speaker: string;
  text: string;
  choices: Array<{ id: string; text: string }>;
}

function loadJson<T>(path: string): T | undefined {
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function loadLegacyScenes(): LegacyScene[] {
  const source = readFileSync(legacyBundlePath, 'utf8');
  const start = source.indexOf('var El = "albina-galgame-card"');
  const end = source.indexOf('function Ml(e)', start);
  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);
  const context: Record<string, unknown> = {};
  vm.createContext(context);
  vm.runInContext(`${source.slice(start, end)}\n;globalThis.__legacyStory = jl;`, context);
  return Object.values(context.__legacyStory as Record<string, LegacyScene>);
}

describe('deterministic story compilation', () => {
  it('provides the authoring manifest and compiler entry point', () => {
    expect(existsSync(sourceManifestPath)).toBe(true);
    expect(existsSync(compilerPath)).toBe(true);
    expect(existsSync(extractorPath)).toBe(true);
  });

  it('re-extracts byte-identical authoring content from the legacy oracle', async () => {
    if (!existsSync(extractorPath) || !existsSync(sourceManifestPath)) return;
    const manifestBefore = readFileSync(sourceManifestPath);
    const manifest = JSON.parse(manifestBefore.toString('utf8')) as StoryManifest;
    const dialogueBefore = new Map(manifest.dialogueFiles.map((relativePath) => [
      relativePath,
      readFileSync(resolve(projectRoot, 'content', relativePath)),
    ]));

    await run(process.execPath, [extractorPath], { cwd: projectRoot });

    expect(readFileSync(sourceManifestPath)).toEqual(manifestBefore);
    for (const [relativePath, bytes] of dialogueBefore) {
      expect(readFileSync(resolve(projectRoot, 'content', relativePath)), relativePath).toEqual(bytes);
    }
  });

  it('compiles byte-identical output on repeated runs', async () => {
    if (!existsSync(compilerPath) || !existsSync(sourceManifestPath)) return;
    const runner = resolve(projectRoot, 'node_modules/vite-node/vite-node.mjs');
    await run(process.execPath, [runner, compilerPath], { cwd: projectRoot });
    const first = readFileSync(compiledPath, 'utf8');
    await run(process.execPath, [runner, compilerPath], { cwd: projectRoot });
    expect(readFileSync(compiledPath, 'utf8')).toBe(first);
  });
});

describe('compiled story graph', () => {
  it('preserves all 46 legacy scene anchors and 87 legacy choices', () => {
    const manifest = loadJson<StoryManifest>(sourceManifestPath);
    const compiled = loadJson<CompiledStory>(compiledPath);
    expect(manifest).toBeDefined();
    expect(compiled).toBeDefined();
    if (!manifest || !compiled) return;

    const legacyScenes = loadLegacyScenes();
    const legacyChoices = legacyScenes.flatMap((scene) => scene.choices);
    const compiledScenes = new Map(compiled.scenes.map((scene) => [scene.id, scene]));
    const compiledChoices = new Map(compiled.scenes.flatMap((scene) => scene.choices).map((choice) => [choice.id, choice]));

    expect(manifest.legacyOracle).toEqual({ sceneAnchors: 46, choices: 87 });
    expect(legacyScenes).toHaveLength(46);
    expect(legacyChoices).toHaveLength(87);
    for (const legacy of legacyScenes) {
      const scene = compiledScenes.get(legacy.sceneId);
      expect(scene, legacy.sceneId).toBeDefined();
      expect(scene?.speaker).toBe(legacy.speaker);
      expect(scene?.text).toBe(legacy.text);
    }
    for (const legacy of legacyChoices) {
      expect(compiledChoices.get(legacy.id)?.text, legacy.id).toBe(legacy.text);
    }
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
    const relevantFlags = new Set(script.scenes.flatMap((scene) => scene.choices.flatMap((choice) => [
      ...(choice.availability?.allOf ?? []),
      ...(choice.availability?.anyOf ?? []),
    ])).filter((predicate) => predicate.kind === 'flag').map((predicate) => predicate.flag));
    const start = new GameSession(script);
    const queue: Array<{ save: SaveV2; path: string[] }> = [{ save: structuredClone(start.save), path: [] }];
    const visited = new Set<string>();
    const endingPaths = new Map<string, string[]>();

    for (let cursor = 0; cursor < queue.length && endingPaths.size < 9; cursor += 1) {
      const current = queue[cursor]!;
      const currentSession = new GameSession(script, { save: current.save });
      for (const choice of currentSession.choices) {
        const branch = new GameSession(script, { save: current.save });
        const result = branch.choose(choice.id);
        const path = [...current.path, choice.id];
        if (result.scene.ending) {
          endingPaths.set(`${result.scene.ending.route}.${result.scene.ending.kind}`, path);
          continue;
        }
        if (result.scene.id === script.initialSceneId && path.length > 1) continue;
        const values = branch.save.values;
        const flags = [...relevantFlags].sort().map((flag) => `${flag}:${branch.save.flags[flag] === true}`).join(',');
        const signature = [branch.save.sceneId, branch.save.route, values.affectionAlbina, values.trust, values.danger, values.artResonance, flags].join('|');
        if (visited.has(signature)) continue;
        visited.add(signature);
        queue.push({ save: structuredClone(branch.save), path });
      }
    }

    const expected = ['golden_bough_rebuild', 'ring_conspiracy', 'white_canvas']
      .flatMap((route) => ['bad', 'normal', 'true'].map((kind) => `${route}.${kind}`))
      .sort();
    expect([...endingPaths.keys()].sort()).toEqual(expected);
    for (const [ending, path] of endingPaths) {
      expect(path.length, ending).toBeGreaterThan(1);
      expect(path.at(-1), ending).toMatch(/ending/u);
    }
  }, 20_000);
});
