import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { materializeSceneProvenance } from '../src/domain/canon.ts';
import { parseGameScriptV2 } from '../src/domain/game-script.ts';
import { materializeStoryMedia } from './lib/story-media.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(projectRoot, 'content/game-script-v2.json');
const assetManifestPath = resolve(projectRoot, 'content/asset-manifest-v2.json');
const canonSourcesPath = resolve(projectRoot, 'content/canon-sources-v1.json');
const canonClaimsPath = resolve(projectRoot, 'content/canon-claims-v1.json');
const storyProvenancePath = resolve(projectRoot, 'content/story-provenance-v1.json');
const outputPath = process.env.ALBINA_STORY_OUTPUT_PATH
  ? resolve(projectRoot, process.env.ALBINA_STORY_OUTPUT_PATH)
  : resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function loadDialogueFiles(paths) {
  const chunks = await Promise.all(paths.map((path) => readJson(resolve(projectRoot, 'content', path))));
  for (const [index, chunk] of chunks.entries()) {
    if (!Array.isArray(chunk)) throw new TypeError(`Dialogue file ${paths[index]} must contain an array`);
  }
  return chunks.flat();
}

function mergeNumericEffects(base = {}, patch = {}) {
  const keys = new Set([...Object.keys(base), ...Object.keys(patch)]);
  return Object.fromEntries([...keys].map((key) => [key, (base[key] ?? 0) + (patch[key] ?? 0)]));
}

function mergeIds(base, patch) {
  if (!base && !patch) return undefined;
  return [...new Set([...(base ?? []), ...(patch ?? [])])];
}

function mergeChoiceEffects(base, patch = {}) {
  const merged = { ...base, ...patch };
  for (const key of ['values', 'relationshipVectors', 'conflictMastery', 'professionXp']) {
    if (base[key] || patch[key]) merged[key] = mergeNumericEffects(base[key], patch[key]);
  }
  for (const key of ['setFlags', 'clearFlags', 'unlockCg', 'grantItems', 'equipItems', 'unlockOutfits', 'startQuests', 'completeQuests']) {
    const value = mergeIds(base[key], patch[key]);
    if (value) merged[key] = value;
  }
  if (base.resolveBattles || patch.resolveBattles) merged.resolveBattles = [...(base.resolveBattles ?? []), ...(patch.resolveBattles ?? [])];
  return merged;
}

function mergeAvailability(base, patch) {
  if (!patch) return base;
  if (!base) return patch;
  const merged = { ...base, ...patch };
  if (base.allOf || patch.allOf) merged.allOf = [...(base.allOf ?? []), ...(patch.allOf ?? [])];
  if (base.anyOf || patch.anyOf) merged.anyOf = [...(base.anyOf ?? []), ...(patch.anyOf ?? [])];
  return merged;
}

function materializeChoicePatches(scenes, choicePatches) {
  if (!choicePatches || typeof choicePatches !== 'object' || Array.isArray(choicePatches)) {
    throw new TypeError('Gameplay choicePatches must be an object');
  }
  Object.entries(choicePatches).forEach(([choiceId, patch]) => {
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw new TypeError(`Choice patch ${choiceId} must be an object`);
    const unknown = Object.keys(patch).filter((key) => key !== 'effects' && key !== 'availability');
    if (unknown.length > 0) throw new TypeError(`Choice patch ${choiceId} has unknown fields: ${unknown.join(', ')}`);
  });
  const remaining = new Set(Object.keys(choicePatches));
  const patched = scenes.map((scene) => ({
    ...scene,
    choices: scene.choices.map((choice) => {
      const patch = choicePatches[choice.id];
      if (!patch) return choice;
      remaining.delete(choice.id);
      return {
        ...choice,
        effects: mergeChoiceEffects(choice.effects, patch.effects),
        ...(patch.availability ? { availability: mergeAvailability(choice.availability, patch.availability) } : {}),
      };
    }),
  }));
  if (remaining.size > 0) throw new Error(`Unknown gameplay choice patches: ${[...remaining].join(', ')}`);
  return patched;
}

function materializeWorldbookEntries(source) {
  const entries = source?.card?.character_book?.entries;
  if (!Array.isArray(entries)) throw new TypeError('Worldbook source must contain card.character_book.entries');
  return entries.map((entry) => ({
    id: entry.id,
    claimIds: entry.claimIds,
    constant: entry.constant,
    selective: entry.selective,
    content: entry.content,
  }));
}

async function compileStory() {
  const [manifest, assets, sources, claims, provenance] = await Promise.all([
    readJson(manifestPath),
    readJson(assetManifestPath),
    readJson(canonSourcesPath),
    readJson(canonClaimsPath),
    readJson(storyProvenancePath),
  ]);
  const [gameplaySource, worldbookSource] = await Promise.all([
    readJson(resolve(projectRoot, 'content', manifest.gameplayFile)),
    readJson(resolve(projectRoot, 'content', manifest.worldbookSourceFile)),
  ]);
  if (gameplaySource.version !== manifest.version) throw new TypeError('Gameplay source version must match GameScriptV2');
  const { version: _gameplayVersion, choicePatches, ...gameplayCatalogs } = gameplaySource;
  const authoredScenes = materializeStoryMedia(await loadDialogueFiles(manifest.dialogueFiles));
  const sourcedScenes = materializeSceneProvenance(authoredScenes, sources, claims, provenance);
  const scenes = materializeChoicePatches(sourcedScenes, choicePatches);
  const compiled = parseGameScriptV2({
    version: manifest.version,
    projectId: manifest.projectId,
    initialSceneId: manifest.initialSceneId,
    routeEntrySceneIds: manifest.routeEntrySceneIds,
    gameplay: {
      ...gameplayCatalogs,
      worldbookEntries: materializeWorldbookEntries(worldbookSource),
    },
    scenes,
  }, assets);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(compiled, null, 2)}\n`, 'utf8');
}

await compileStory();
