import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
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
  const canonicalData = join(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');
  const leakedTool = join(projectRoot, 'dist/albina-galgame-card/albina-bridge/tools/leak.py');
  const historicalReleaseFile = join(projectRoot, 'release/github-cdn-root/docs/install.md');

  try {
    await mkdir(dirname(script), { recursive: true });
    await mkdir(dirname(buildSource), { recursive: true });
    await mkdir(dirname(canonicalLegacy), { recursive: true });
    await mkdir(dirname(canonicalData), { recursive: true });
    await mkdir(dirname(leakedTool), { recursive: true });
    await mkdir(dirname(historicalReleaseFile), { recursive: true });
    await copyFile(
      fileURLToPath(new URL('../../scripts/build-release.mjs', import.meta.url)),
      script,
    );
    await writeFile(buildSource, 'source-build');
    await writeFile(canonicalLegacy, 'legacy-bundle');
    await writeFile(canonicalData, 'canonical-data');
    await writeFile(leakedTool, 'API_KEY = "sk-this-must-never-ship-123456789"');
    await writeFile(historicalReleaseFile, 'historical-release-file');

    await run(process.execPath, [script]);

    expect(existsSync(join(projectRoot, 'dist/albina-galgame-card/source/albina-source.js'))).toBe(true);
    expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/source/albina-source.js'))).toBe(true);
    expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/console/index.js'))).toBe(true);
    expect(await readFile(canonicalLegacy, 'utf8')).toBe('legacy-bundle');
    expect(await readFile(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/data/game-script-v2.json'), 'utf8')).toBe('canonical-data');
    expect(await readFile(historicalReleaseFile, 'utf8')).toBe('historical-release-file');
    expect(existsSync(leakedTool)).toBe(false);
    expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/albina-bridge/tools/leak.py'))).toBe(false);
  } finally {
    await rm(projectRoot, { recursive: true, force: true });
  }
});
