import { execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { GameScriptV2Schema } from '../../src/domain/game-script';

const run = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '../..');
const sourceManifestPath = resolve(projectRoot, 'content/game-script-v2.json');
const compiledPath = resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');
const compilerPath = resolve(projectRoot, 'scripts/compile-story.mjs');
const extractorPath = resolve(projectRoot, 'scripts/extract-legacy-story.mjs');
const legacyBundlePath = resolve(projectRoot, 'dist/albina-galgame-card/console/index.js');

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
    const first = readFileSync(sourceManifestPath, 'utf8');
    await run(process.execPath, [extractorPath], { cwd: projectRoot });
    expect(readFileSync(sourceManifestPath, 'utf8')).toBe(first);
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
});
