import { mkdir, rename } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const buildRoot = resolve(projectRoot, 'build');
const sourceRoot = resolve(buildRoot, 'source');

try {
  const suffix = new Date().toISOString().replace(/[^0-9]/gu, '').slice(0, 17);
  await rename(sourceRoot, resolve(buildRoot, `source-previous-${suffix}`));
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}
await mkdir(sourceRoot, { recursive: true });
