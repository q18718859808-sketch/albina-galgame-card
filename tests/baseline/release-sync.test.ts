import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { expect, it } from 'vitest';

import { RELEASE_STEPS } from '../../scripts/release-sync.mjs';

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
    'assets/config/.env.production',
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

async function writeModule(root: string, path: string, source: string): Promise<void> {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, source);
}

it('regenerates real stale inputs before bundling and promoting a release', async () => {
  const root = await mkdtemp(join(tmpdir(), 'albina-release-pipeline-'));
  const statePath = join(root, 'state.json');
  const releaseSyncPath = join(root, 'scripts/release-sync.mjs');
  const stateModule = `import { readFile, writeFile } from 'node:fs/promises';\nimport { resolve } from 'node:path';\nconst statePath = resolve(import.meta.dirname, '../state.json');\nconst state = JSON.parse(await readFile(statePath, 'utf8'));\n`;

  try {
    await mkdir(dirname(releaseSyncPath), { recursive: true });
    await copyFile(fileURLToPath(new URL('../../scripts/release-sync.mjs', import.meta.url)), releaseSyncPath);
    await writeFile(statePath, JSON.stringify({ manifest: 'stale', story: 'stale', bundle: 'stale', promoted: 'stale', audited: 'stale' }));
    await writeModule(root, 'scripts/sync-canon-card.mjs', "// fixture no-op\n");
    await writeModule(root, 'scripts/sync-character-card-png.mjs', "// fixture no-op\n");
    await writeModule(root, 'scripts/audit-assets.mjs', `${stateModule}if (process.argv.includes('--write')) state.manifest = 'fresh'; else { if (state.promoted !== 'fresh') throw new Error('promoted output is stale'); state.audited = 'fresh'; }\nawait writeFile(statePath, JSON.stringify(state));\n`);
    await writeModule(root, 'scripts/compile-story.mjs', `${stateModule}if (state.manifest !== 'fresh') throw new Error('manifest is stale');\nstate.story = 'fresh';\nawait writeFile(statePath, JSON.stringify(state));\n`);
    await writeModule(root, 'scripts/build-release.mjs', `${stateModule}if (state.bundle !== 'fresh') throw new Error('bundle is stale');\nstate.promoted = 'fresh';\nawait writeFile(statePath, JSON.stringify(state));\n`);
    await writeModule(root, 'node_modules/vite-node/vite-node.mjs', "import { pathToFileURL } from 'node:url';\nawait import(pathToFileURL(process.argv[2]).href);\n");
    await writeModule(root, 'node_modules/vite/bin/vite.js', "import { readFile, writeFile } from 'node:fs/promises';\nimport { resolve } from 'node:path';\nif (process.argv[2] !== 'build') throw new Error('missing build argument');\nconst statePath = resolve(import.meta.dirname, '../../../state.json');\nconst state = JSON.parse(await readFile(statePath, 'utf8'));\nif (state.story !== 'fresh') throw new Error('story is stale');\nstate.bundle = 'fresh';\nawait writeFile(statePath, JSON.stringify(state));\n");

    await run(process.execPath, [releaseSyncPath], { cwd: root });

    expect(JSON.parse(await readFile(statePath, 'utf8'))).toEqual({ manifest: 'fresh', story: 'fresh', bundle: 'fresh', promoted: 'fresh', audited: 'fresh' });
    expect(RELEASE_STEPS.map((step) => step.id)).toEqual([
      'canon:sync',
      'card:sync',
      'assets:generate',
      'story:compile',
      'source:build',
      'release:promote',
      'assets:audit',
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}, 15_000);
