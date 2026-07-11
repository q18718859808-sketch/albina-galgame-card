import { copyFile, mkdir, readdir, rm } from 'node:fs/promises';
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

await rm(canonicalSourceRoot, { recursive: true, force: true });
await copyTree(buildRoot, canonicalSourceRoot);
console.log(`Promoted source build to ${canonicalSourceRoot}`);

await rm(releaseRoot, { recursive: true, force: true });
await copyTree(canonicalRoot, releaseRoot);
console.log(`Mirrored canonical dist tree to ${releaseRoot}`);
