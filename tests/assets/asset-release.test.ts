import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { parseAssetManifestV2 } from '../../src/domain/assets';

const run = promisify(execFile);
const projectRoot = process.cwd();

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await readFile(join(projectRoot, path), 'utf8'));
}

describe('canonical asset release', () => {
  it('registers every completed strip and preserves eight unfinished strips as pending jobs', async () => {
    const manifest = parseAssetManifestV2(await readJson('content/asset-manifest-v2.json'));
    const progress = await readJson('dist/albina-galgame-card/assets/sprite-atlas/_progress.json') as Record<string, { status: string }>;
    const completed = Object.entries(progress).filter(([, entry]) => entry.status === 'done');
    const pendingStripJobs = manifest.mediaJobs.filter((job) => job.id.startsWith('job.strip.'));

    expect(manifest.portraits).toHaveLength(completed.length + 1);
    expect(manifest.portraits.map((portrait) => portrait.id)).toContain('portrait.fascia.normal');
    expect(pendingStripJobs).toHaveLength(8);
    expect(pendingStripJobs.every((job) => job.status === 'pending')).toBe(true);
  });

  it('resolves every story asset id through the generated runtime lookup', async () => {
    const lookup = await readJson('dist/albina-galgame-card/assets/runtime-lookup.json') as {
      assetsById: Record<string, string>;
      portraitsById: Record<string, string>;
      pendingById: Record<string, string>;
    };
    const index = await readJson('content/game-script-v2.json') as { dialogueFiles: string[] };
    const references = new Set<string>();

    for (const dialogueFile of index.dialogueFiles) {
      const scenes = await readJson(join('content', dialogueFile)) as Array<Record<string, unknown>>;
      for (const scene of scenes) {
        for (const key of ['backgroundAssetId', 'cgAssetId', 'voiceAssetId', 'bgmAssetId']) {
          if (typeof scene[key] === 'string') references.add(scene[key] as string);
        }
        for (const portrait of (scene.portraits ?? []) as Array<{ portraitAssetId: string }>) references.add(portrait.portraitAssetId);
        for (const assetId of (scene.sfxAssetIds ?? []) as string[]) references.add(assetId);
        for (const choice of (scene.choices ?? []) as Array<{ resultVoiceAssetId?: string }>) {
          if (choice.resultVoiceAssetId) references.add(choice.resultVoiceAssetId);
        }
      }
    }

    const resolvable = new Set([
      ...Object.keys(lookup.assetsById),
      ...Object.keys(lookup.portraitsById),
      ...Object.keys(lookup.pendingById),
    ]);
    expect([...references].filter((id) => !resolvable.has(id))).toEqual([]);
  });

  it('audits the canonical manifest with zero unresolved references', async () => {
    const { stdout } = await run(process.execPath, ['scripts/audit-assets.mjs', '--json'], { cwd: projectRoot });
    const report = JSON.parse(stdout) as { unresolved: unknown[]; release: { missing: string[]; mismatch: string[]; stale: string[] } };

    expect(report.unresolved).toEqual([]);
    expect(report.release.missing).toEqual([]);
    expect(report.release.mismatch).toEqual(expect.any(Array));
    expect(report.release.stale).toEqual(expect.any(Array));
  });

  it('uses one versioned CDN root in card and mutable bridge loaders', async () => {
    const files = [
      'card/albina.card.json',
      'card/character-card.template.json',
      'card/card-protocol.md',
      'card/character_card_protocol.md',
      'dist/albina-galgame-card/albina-bridge/albina-bridge.js',
      'dist/albina-galgame-card/albina-bridge/albina-sprite-atlas.js',
      'dist/albina-galgame-card/sfe/sfe-director.js',
      'dist/albina-galgame-card/video-injector.js',
    ];
    const text = (await Promise.all(files.map((file) => readFile(join(projectRoot, file), 'utf8')))).join('\n');

    expect(text).not.toMatch(/@v1\.0\.(?:22|26|34|40|41)\b/u);
    expect(text).not.toContain('/release/github-cdn-root/');
    expect(text).not.toContain('https://cdn.jsdelivr.net/gh/malove/foo');
    expect(text).not.toMatch(/["'`]\/assets\/audio\//u);
  });

  it('lets the bridge register every generated portrait strip lookup', async () => {
    const loader = await readFile(join(projectRoot, 'dist/albina-galgame-card/albina-bridge/albina-sprite-atlas.js'), 'utf8');

    expect(loader).toContain('assets/runtime-lookup.json');
    expect(loader).toContain('portrait.original_cg.albina_debut');
    expect(loader).toContain('img[src*="characters/"]');
  });
});
