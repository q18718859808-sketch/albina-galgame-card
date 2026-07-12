import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, it } from 'vitest';

import { validateAssetIntegrity } from '../../scripts/lib/asset-integrity.mjs';

it('detects a completed asset changed after manifest hashing', async () => {
  const root = await mkdtemp(join(tmpdir(), 'albina-integrity-'));
  const path = join(root, 'asset.txt');
  await writeFile(path, 'approved');
  const crypto = await import('node:crypto');
  const approved = await readFile(path);
  const asset = { id: 'asset.test', path: 'asset.txt', bytes: approved.length, sha256: crypto.createHash('sha256').update(approved).digest('hex') };
  expect(await validateAssetIntegrity(root, [asset])).toEqual([]);
  await writeFile(path, 'tampered');
  expect(await validateAssetIntegrity(root, [asset])).toEqual(expect.arrayContaining([expect.stringMatching(/mismatch/u)]));
});
