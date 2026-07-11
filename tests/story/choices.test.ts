import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '../..');
const compiledPath = resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');
const compilerPath = resolve(projectRoot, 'scripts/compile-story.mjs');

interface StoryChoice {
  id: string;
  nextSceneId: string;
  resultText?: string;
  resultVoiceAssetId?: string;
  availability?: unknown;
  effects: {
    route?: string;
    values?: Record<string, number>;
    setFlags?: string[];
    clearFlags?: string[];
    unlockCg?: string[];
    grantItems?: string[];
    completeQuests?: string[];
  };
}

interface StoryScene {
  id: string;
  text: string;
  voiceAssetId?: string;
  choices: StoryChoice[];
  ending?: unknown;
}

interface CompiledStory {
  scenes: StoryScene[];
}

function loadStory(): CompiledStory | undefined {
  if (!existsSync(compiledPath)) return undefined;
  return JSON.parse(readFileSync(compiledPath, 'utf8')) as CompiledStory;
}

function changesPersistentState(choice: StoryChoice): boolean {
  const effects = choice.effects;
  return Boolean(
    effects.route
      || Object.keys(effects.values ?? {}).length
      || effects.setFlags?.length
      || effects.clearFlags?.length
      || effects.unlockCg?.length
      || effects.grantItems?.length
      || effects.completeQuests?.length,
  );
}

describe('deterministic dialogue', () => {
  it('stores fixed voiced dialogue and voiced choice-result text for the main story', () => {
    const story = loadStory();
    expect(story).toBeDefined();
    if (!story) return;

    for (const scene of story.scenes) {
      expect(scene.text.trim().length, scene.id).toBeGreaterThan(0);
      expect(scene.voiceAssetId, scene.id).toMatch(/^voice\.scene\./u);
      for (const choice of scene.choices) {
        expect(choice.resultText?.trim().length, choice.id).toBeGreaterThan(0);
        expect(choice.resultVoiceAssetId, choice.id).toMatch(/^voice\.result\./u);
      }
    }
  });

  it('does not contain runtime generation or network calls in the story compiler', () => {
    expect(existsSync(compilerPath)).toBe(true);
    if (!existsSync(compilerPath)) return;
    const source = readFileSync(compilerPath, 'utf8');
    expect(source).not.toMatch(/\bgenerate(?:Raw)?\s*\(/u);
    expect(source).not.toMatch(/\bfetch\s*\(|XMLHttpRequest|chat\/completions/iu);
  });
});

describe('consequential choices', () => {
  it('makes every choice change state, availability, branch, or ending qualification', () => {
    const story = loadStory();
    expect(story).toBeDefined();
    if (!story) return;

    for (const scene of story.scenes) {
      for (const choice of scene.choices) {
        const changesBranch = choice.nextSceneId !== scene.id;
        expect(
          changesPersistentState(choice) || Boolean(choice.availability) || changesBranch,
          choice.id,
        ).toBe(true);
      }
    }
  });

  it('puts three qualified choices on each route ending gate', () => {
    const story = loadStory();
    expect(story).toBeDefined();
    if (!story) return;

    const gates = story.scenes.filter((scene) => scene.id.endsWith('_ending_gate'));
    expect(gates).toHaveLength(3);
    for (const gate of gates) {
      expect(gate.choices).toHaveLength(3);
      expect(gate.choices.every((choice) => Boolean(choice.availability))).toBe(true);
      expect(gate.choices.every((choice) => choice.effects.setFlags?.length === 1)).toBe(true);
    }
  });
});
