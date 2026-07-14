import { readFile, readdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

import { expect, it } from 'vitest';

import { isScannableTextPath, scanText } from '../../scripts/lib/security-scanner.mjs';

async function walk(folder: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path)); else result.push(path);
  }
  return result;
}

it('ships no forbidden paths, secrets, provider calls, or remote executables in either generated tree', async () => {
  const roots = ['dist/albina-galgame-card', 'release/github-cdn-root/dist/albina-galgame-card'].map((path) => resolve(process.cwd(), path));
  for (const root of roots) {
    for (const path of await walk(root)) {
      const local = relative(root, path).replaceAll('\\', '/');
      expect(local).not.toMatch(/^(?:albina-bridge|cinema|console|sfe)(?:\/|$)|^video-injector\.js$/iu);
      expect(local).not.toMatch(/(?:^|\/)(?:tools?|scripts?)(?:\/|$)|\.(?:bat|cmd|ps1|py|sh)$/iu);
      if (!isScannableTextPath(path)) continue;
      const text = await readFile(path, 'utf8');
      expect(scanText(relative(process.cwd(), path).replaceAll('\\', '/'), text), local).toEqual([]);
    }
  }
}, 30_000);
