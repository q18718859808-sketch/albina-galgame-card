import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { expect, it } from 'vitest';

import { RELEASE_STEPS, runReleasePipeline } from '../../scripts/release-sync.mjs';

const run = promisify(execFile);

it('promotes only the approved v2 release surface before mirroring it', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'albina-release-sync-'));
  const script = join(projectRoot, 'scripts/build-release.mjs');
  const buildSource = join(projectRoot, 'build/source/albina-source.js');
  const canonicalData = join(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');
  const deniedPaths = [
    'albina-bridge/albina-bridge.js',
    'cinema/cinematic-engine.js',
    'console/index.js',
    'sfe/sfe-engine.js',
    'video-injector.js',
    'source/nested/cinema/cinematic-engine.js',
    'source/plugins/albina-bridge/bridge.js',
    'source/compat/video-injector.js',
    'assets/legacy/sfe/director.js',
    'worldbooks/archive/console/index.json',
  ];
  const leakedTool = join(projectRoot, 'dist/albina-galgame-card/source/tools/leak.py');
  const historicalReleaseFile = join(projectRoot, 'release/github-cdn-root/docs/install.md');

  try {
    await mkdir(dirname(script), { recursive: true });
    await mkdir(dirname(buildSource), { recursive: true });
    await mkdir(dirname(canonicalData), { recursive: true });
    await mkdir(dirname(leakedTool), { recursive: true });
    await mkdir(dirname(historicalReleaseFile), { recursive: true });
    await copyFile(
      fileURLToPath(new URL('../../scripts/build-release.mjs', import.meta.url)),
      script,
    );
    const helper = join(projectRoot, 'scripts/lib/release-integrity.mjs');
    await mkdir(dirname(helper), { recursive: true });
    await copyFile(fileURLToPath(new URL('../../scripts/lib/release-integrity.mjs', import.meta.url)), helper);
    await writeFile(buildSource, 'source-build');
    await writeFile(canonicalData, 'canonical-data');
    for (const path of deniedPaths) {
      const target = join(projectRoot, 'dist/albina-galgame-card', path);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, 'legacy-runtime');
    }
    await writeFile(leakedTool, `API_KEY = "${['sk', 'this-must-never-ship-123456789'].join('-')}"`);
    await writeFile(historicalReleaseFile, 'historical-release-file');

    await run(process.execPath, [script]);

    expect(existsSync(join(projectRoot, 'dist/albina-galgame-card/source/albina-source.js'))).toBe(true);
    expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/source/albina-source.js'))).toBe(true);
    expect(await readFile(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/data/game-script-v2.json'), 'utf8')).toBe('canonical-data');
    for (const path of deniedPaths) {
      expect(existsSync(join(projectRoot, 'dist/albina-galgame-card', path)), path).toBe(false);
      expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card', path)), path).toBe(false);
    }
    expect(existsSync(historicalReleaseFile)).toBe(false);
    expect(existsSync(leakedTool)).toBe(false);
    expect(existsSync(join(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/source/tools/leak.py'))).toBe(false);
  } finally {
    await rm(projectRoot, { recursive: true, force: true });
  }
});

it('regenerates authoritative assets and story before bundling a release', async () => {
  const observed: string[] = [];
  let manifest = 'stale';
  let story = 'stale';
  let bundle = 'missing';

  await runReleasePipeline(async (step) => {
    observed.push(step.id);
    if (step.id === 'assets:generate') manifest = 'fresh';
    if (step.id === 'story:compile') {
      expect(manifest).toBe('fresh');
      story = 'fresh';
    }
    if (step.id === 'source:build') bundle = story;
    if (step.id === 'release:promote') expect(bundle).toBe('fresh');
  });

  expect(observed).toEqual(RELEASE_STEPS.map((step) => step.id));
});
