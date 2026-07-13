import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { collectStoryAssetReferences, findUnresolvedStoryReferences, materializeStoryMedia } from '../../scripts/lib/story-media.mjs';
import { parseAssetManifestV2 } from '../../src/domain/assets';

const run = promisify(execFile);
const projectRoot = process.cwd();

interface RuntimeLookup {
  assetsById: Record<string, string>;
  portraitsById: Record<string, string>;
  pendingById: Record<string, string>;
}

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await readFile(join(projectRoot, path), 'utf8'));
}

async function readStoryScenes(): Promise<Array<Record<string, unknown>>> {
  const index = await readJson('content/game-script-v2.json') as { dialogueFiles: string[] };
  const chunks = await Promise.all(index.dialogueFiles.map(async (path) => (
    await readJson(join('content', path)) as Array<Record<string, unknown>>
  )));
  return chunks.flat();
}

const synthesizedVideoNames = [
  'prologue',
  'golden_bough_rebuild_scene_3',
  'golden_bough_rebuild_scene_5',
  'golden_bough_rebuild_scene_8',
  'golden_bough_rebuild_scene_11',
  'golden_bough_rebuild_scene_15',
  'ring_conspiracy_scene_3',
  'ring_conspiracy_scene_5',
  'ring_conspiracy_scene_8',
  'ring_conspiracy_scene_11',
  'ring_conspiracy_scene_15',
  'white_canvas_scene_3',
  'white_canvas_scene_5',
  'white_canvas_scene_8',
  'white_canvas_scene_11',
  'white_canvas_scene_15',
  'golden_bough_rebuild_ending_bad',
  'golden_bough_rebuild_ending_normal',
  'golden_bough_rebuild_ending_true',
  'ring_conspiracy_ending_bad',
  'ring_conspiracy_ending_normal',
  'ring_conspiracy_ending_true',
  'white_canvas_ending_bad',
  'white_canvas_ending_normal',
  'white_canvas_ending_true',
];

describe('canonical asset release', () => {
  it('registers every completed strip and preserves eight unfinished strips as pending jobs', async () => {
    const manifest = parseAssetManifestV2(await readJson('content/asset-manifest-v2.json'));
    const progress = await readJson('dist/albina-galgame-card/assets/sprite-atlas/_progress.json') as Record<string, { status: string }>;
    const completed = Object.entries(progress).filter(([, entry]) => entry.status === 'done');
    const pendingStripJobs = manifest.mediaJobs.filter((job) => job.id.startsWith('job.strip.'));
    const pendingGalleryJobs = manifest.mediaJobs.filter((job) => job.id.startsWith('job.cg.'));

    expect(manifest.portraits).toHaveLength(completed.length + 1);
    expect(manifest.portraits.map((portrait) => portrait.id)).toContain('portrait.fascia.normal');
    expect(pendingStripJobs).toHaveLength(8);
    expect(pendingStripJobs.every((job) => job.status === 'pending')).toBe(true);
    expect(pendingGalleryJobs.map((job) => job.assetId).sort()).toEqual(['cg.mirror_broken', 'cg.rain_reflection']);
    expect(pendingGalleryJobs.every((job) => job.status === 'pending')).toBe(true);
  });

  it('collects and validates every synthesized runtime and desktop video reference', async () => {
    const lookup = await readJson('dist/albina-galgame-card/assets/runtime-lookup.json') as RuntimeLookup;
    const scenes = materializeStoryMedia(await readStoryScenes());
    const references = collectStoryAssetReferences(scenes);
    const videoReferences = references.filter((id) => id.startsWith('video.animated.'));
    const expected = ['desktop', 'runtime']
      .flatMap((profile) => synthesizedVideoNames.map((name) => `video.animated.${profile}.${name}`))
      .sort();

    expect(videoReferences).toEqual(expected);
    expect(findUnresolvedStoryReferences(scenes, lookup)).toEqual([]);
  });

  it('reports a missing synthesized video asset as an unresolved story reference', async () => {
    const lookup = structuredClone(await readJson('dist/albina-galgame-card/assets/runtime-lookup.json') as RuntimeLookup);
    const scenes = materializeStoryMedia(await readStoryScenes());
    const missingAssetId = 'video.animated.runtime.prologue';
    delete lookup.assetsById[missingAssetId];

    expect(findUnresolvedStoryReferences(scenes, lookup)).toEqual([missingAssetId]);
  });

  it('audits the canonical manifest with zero unresolved references', async () => {
    const { stdout } = await run(process.execPath, ['scripts/audit-assets.mjs', '--json'], { cwd: projectRoot });
    const report = JSON.parse(stdout) as { unresolved: unknown[]; release: { missing: string[]; mismatch: string[]; stale: string[] } };

    expect(report.unresolved).toEqual([]);
    expect(report.release.missing).toEqual([]);
    expect(report.release.mismatch).toEqual(expect.any(Array));
    expect(report.release.stale).toEqual(expect.any(Array));
  // The audit hashes both canonical and mirrored media trees (over 1 GB).
  // Keep this as a full integrity check, but allow slower CI disks to finish.
  }, 60_000);

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
