import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseGameScriptV2 } from '../src/domain/game-script.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(projectRoot, 'content/game-script-v2.json');
const outputPath = resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');

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

function assertLegacyOracle(scenes, oracle) {
  const anchors = scenes.filter((scene) => !scene.ending && !scene.id.endsWith('_ending_gate'));
  const choices = anchors.flatMap((scene) => scene.choices);
  if (anchors.length !== oracle.sceneAnchors || choices.length !== oracle.choices) {
    throw new Error(`Legacy oracle mismatch: expected ${oracle.sceneAnchors}/${oracle.choices}, got ${anchors.length}/${choices.length}`);
  }
}

function videoNameForScene(scene) {
  if (scene.id === 'opening_001') return 'prologue';
  if (scene.ending) return scene.id.replaceAll('-', '_');
  const match = /^(white_canvas|golden_bough|ring_conspiracy)_(003|005|008|011|015)$/u.exec(scene.id);
  if (!match) return undefined;
  const route = match[1] === 'golden_bough' ? 'golden_bough_rebuild' : match[1];
  return `${route}_scene_${Number(match[2])}`;
}

function addVideoCues(scenes) {
  return scenes.map((scene) => {
    const name = videoNameForScene(scene);
    if (!name) return scene;
    return {
      ...scene,
      videoAssetId: `video.animated.runtime.${name}`,
      desktopVideoAssetId: `video.animated.desktop.${name}`,
    };
  });
}

async function compileStory() {
  const manifest = await readJson(manifestPath);
  const scenes = addVideoCues(await loadDialogueFiles(manifest.dialogueFiles));
  assertLegacyOracle(scenes, manifest.legacyOracle);
  const compiled = parseGameScriptV2({
    version: manifest.version,
    projectId: manifest.projectId,
    initialSceneId: manifest.initialSceneId,
    routeEntrySceneIds: manifest.routeEntrySceneIds,
    scenes,
  });
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(compiled, null, 2)}\n`, 'utf8');
}

await compileStory();
