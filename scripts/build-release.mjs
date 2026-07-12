import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const buildRoot = resolve(projectRoot, 'build/source');
const canonicalRoot = resolve(projectRoot, 'dist/albina-galgame-card');
const canonicalSourceRoot = resolve(canonicalRoot, 'source');
const releaseRoot = resolve(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card');

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

async function removeWebGenerationTools(root) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) {
      if (/^(?:tools?|scripts?)$/iu.test(entry.name)) await rm(path, { recursive: true, force: true });
      else await removeWebGenerationTools(path);
    } else if (/\.(?:bat|cmd|ps1|py|sh)$/iu.test(entry.name)) await rm(path, { force: true });
  }
}

await rm(canonicalSourceRoot, { recursive: true, force: true });
await copyTree(buildRoot, canonicalSourceRoot);
await normalizeGeneratedText(canonicalSourceRoot);
await removeWebGenerationTools(canonicalRoot);
console.log(`Promoted source build to ${canonicalSourceRoot}`);

await rm(releaseRoot, { recursive: true, force: true });
await copyTree(canonicalRoot, releaseRoot);
console.log(`Mirrored canonical dist tree to ${releaseRoot}`);
