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

async function compileStory() {
  const [manifest, assets, sources, claims, provenance] = await Promise.all([
    readJson(manifestPath),
    readJson(assetManifestPath),
    readJson(canonSourcesPath),
    readJson(canonClaimsPath),
    readJson(storyProvenancePath),
  ]);
  const authoredScenes = materializeStoryMedia(await loadDialogueFiles(manifest.dialogueFiles));
  const scenes = materializeSceneProvenance(authoredScenes, sources, claims, provenance);
  const compiled = parseGameScriptV2({
    version: manifest.version,
    projectId: manifest.projectId,
    initialSceneId: manifest.initialSceneId,
    routeEntrySceneIds: manifest.routeEntrySceneIds,
    scenes,
  }, assets);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(compiled, null, 2)}\n`, 'utf8');
}

await compileStory();
