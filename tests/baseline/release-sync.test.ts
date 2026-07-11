import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { expect, it } from 'vitest';

const run = promisify(execFile);

it('promotes source into canonical dist before mirroring the complete dist tree', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'albina-release-sync-'));
  const script = join(projectRoot, 'scripts/build-release.mjs');
  const buildSource = join(projectRoot, 'build/source/albina-source.js');
  const canonicalLegacy = join(projectRoot, 'dist/albina-galgame-card/console/index.js');

  try {
    await mkdir(dirname(script), { recursive: true });
    await mkdir(dirname(buildSource), { recursive: true });
    await mkdir(dirname(canonicalLegacy), { recursive: true });
    await copyFile(
      fileURLToPath(new URL('../../scripts/build-release.mjs', import.meta.url)),
      script,
    );
    await writeFile(buildSource, 'source-build');
    await writeFile(canonicalLegacy, 'legacy-bundle');

    await run(process.execPath, [script]);

    expect(existsSync(join(projectRoot, 'dist/albina-galgame-card/source/albina-source.js'))).toBe(true);
    expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/source/albina-source.js'))).toBe(true);
    expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/console/index.js'))).toBe(true);
  } finally {
    await rm(projectRoot, { recursive: true, force: true });
  }
});
