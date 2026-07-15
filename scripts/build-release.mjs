import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

import { isExcludedReleaseAssetPath, isLegacyPublishablePath, isPrivateEnvironmentPath } from './lib/release-integrity.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const buildRoot = resolve(projectRoot, 'build/source');
const canonicalRoot = resolve(projectRoot, 'dist/albina-galgame-card');
const canonicalSourceRoot = resolve(canonicalRoot, 'source');
const releaseTreeRoot = resolve(projectRoot, 'release/github-cdn-root');
const releaseRoot = resolve(releaseTreeRoot, 'dist/albina-galgame-card');
const approvedRootEntries = new Set(['assets', 'data', 'manifest.json', 'release-status.json', 'source', 'worldbooks']);

async function copyTree(source, destination) {
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const sourcePath = resolve(source, entry.name);
    const destinationPath = resolve(destination, entry.name);

    if (entry.isDirectory()) {
      await copyTree(sourcePath, destinationPath);
    } else {
      await copyFile(sourcePath, destinationPath);
    }
  }
}

async function normalizeGeneratedText(root) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) await normalizeGeneratedText(path);
    else if (/\.(?:css|js)$/u.test(entry.name)) {
      const text = await readFile(path, 'utf8');
      await writeFile(path, `${text.replace(/[ \t]+$/gmu, '').replace(/\s*$/u, '')}\n`, 'utf8');
    }
  }
}

async function removeForbiddenWebContent(root, boundaryRoot = root) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = resolve(root, entry.name);
    const releasePath = relative(boundaryRoot, path).replaceAll('\\', '/');
    if (entry.isDirectory()) {
      if (/^(?:tools?|scripts?)$/iu.test(entry.name) || isLegacyPublishablePath(releasePath) || isExcludedReleaseAssetPath(releasePath)) {
        await rm(path, { recursive: true, force: true });
      } else await removeForbiddenWebContent(path, boundaryRoot);
    } else if (/\.(?:bat|cmd|ps1|py|sh)$/iu.test(entry.name) || isLegacyPublishablePath(releasePath)
      || isExcludedReleaseAssetPath(releasePath) || isPrivateEnvironmentPath(entry.name)) {
      await rm(path, { force: true });
    }
  }
}

async function enforceApprovedReleaseSurface(root) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (approvedRootEntries.has(entry.name)) continue;
    await rm(resolve(root, entry.name), { recursive: entry.isDirectory(), force: true });
  }
}

async function sanitizeRootManifest(root) {
  const path = resolve(root, 'manifest.json');
  let source;
  try {
    source = await readFile(path, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }
  const manifest = JSON.parse(source);
  for (const key of [
    'original_cg',
    'original_albina_sprites',
    'original_bg_story',
    'original_bg_battle',
    'bgm_metadata',
    '_removed_official_resources_note',
  ]) delete manifest[key];
  await writeFile(path, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

await rm(canonicalSourceRoot, { recursive: true, force: true });
await copyTree(buildRoot, canonicalSourceRoot);
await normalizeGeneratedText(canonicalSourceRoot);
await enforceApprovedReleaseSurface(canonicalRoot);
await removeForbiddenWebContent(canonicalRoot);
await sanitizeRootManifest(canonicalRoot);
console.log(`Promoted source build to ${canonicalSourceRoot}`);

await rm(releaseTreeRoot, { recursive: true, force: true });
await copyTree(canonicalRoot, releaseRoot);
console.log(`Mirrored canonical dist tree to ${releaseRoot}`);
