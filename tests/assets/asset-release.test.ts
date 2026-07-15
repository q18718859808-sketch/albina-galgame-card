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
  it('retires all 18 Albina strips and the false Fascia portrait in favor of static portraits', async () => {
    const manifest = parseAssetManifestV2(await readJson('content/asset-manifest-v2.json'));
    const albinaPortraits = manifest.portraits.filter((portrait) => portrait.characterId === 'albina');
    const pendingStripJobs = manifest.mediaJobs.filter((job) => job.id.startsWith('job.strip.'));
    const pendingGalleryJobs = manifest.mediaJobs.filter((job) => job.id.startsWith('job.cg.'));

    expect(albinaPortraits).toHaveLength(18);
    expect(albinaPortraits.every((portrait) => portrait.animation.kind === 'static')).toBe(true);
    expect(albinaPortraits.every((portrait) => portrait.path.startsWith('characters/albina/'))).toBe(true);
    expect(manifest.portraits.some((portrait) => portrait.id === 'portrait.fascia.normal')).toBe(false);
    expect(manifest.assets.some((asset) => asset.path.startsWith('sprite-atlas/albina/'))).toBe(false);
    expect(pendingStripJobs).toHaveLength(0);
    expect(pendingGalleryJobs).toEqual([]);
  });

  it('uses only verified static Albina art in the canon recap and no Fascia portrait anywhere', async () => {
    const manifest = parseAssetManifestV2(await readJson('content/asset-manifest-v2.json'));
    const canonScenes = await readJson('content/dialogue/canon-recap.json') as Array<{
      portraits: Array<{ characterId: string; portraitAssetId: string }>;
    }>;
    const storyScenes = await readStoryScenes() as Array<{
      portraits?: Array<{ characterId: string; portraitAssetId: string }>;
    }>;
    const canonAlbinaIds = canonScenes.flatMap((scene) => scene.portraits)
      .filter((portrait) => portrait.characterId === 'albina')
      .map((portrait) => portrait.portraitAssetId);
    const portraitPaths = new Map(manifest.portraits.map((portrait) => [portrait.id, portrait.path]));

    expect(new Set(canonAlbinaIds)).toEqual(new Set(['portrait.albina.normal', 'portrait.albina.armored']));
    expect(new Set(canonAlbinaIds.map((id) => portraitPaths.get(id)))).toEqual(new Set([
      'characters/albina/normal.png',
      'characters/albina/armored.png',
    ]));
    expect(storyScenes.flatMap((scene) => scene.portraits ?? [])
      .some((portrait) => portrait.characterId === 'fascia' || portrait.portraitAssetId === 'portrait.fascia.normal')).toBe(false);
  });

  it('reuses approved gallery CGs without pending aliases', async () => {
    const scenes = await readStoryScenes();
    const references = collectStoryAssetReferences(scenes);
    const pending = await readJson('content/pending-gallery-cgs.json') as { assets: unknown[] };

    expect(references).not.toContain('cg.mirror_broken');
    expect(references).not.toContain('cg.rain_reflection');
    expect(references).toContain('cg.art_resonance');
    expect(references).toContain('cg.rain_confession');
    expect(pending.assets).toEqual([]);
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

  it('reports a missing referenced AU animation as an unresolved story reference', async () => {
    const lookup = structuredClone(await readJson('dist/albina-galgame-card/assets/runtime-lookup.json') as RuntimeLookup);
    const scenes = materializeStoryMedia(await readStoryScenes());
    const missingAssetId = 'video.animated.runtime.white_canvas_scene_3';
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

  it('uses one reserved immutable CDN root only in the approved card loader', async () => {
    const files = [
      'card/albina.card.json',
      'card/character-card.template.json',
      'card/card-protocol.md',
      'card/character_card_protocol.md',
    ];
    const text = (await Promise.all(files.map((file) => readFile(join(projectRoot, file), 'utf8')))).join('\n');

    expect(text).not.toMatch(/@v1\.0\.(?:22|26|34|40|41)\b/u);
    expect(text).not.toContain('/release/github-cdn-root/');
    expect(text).not.toContain('https://cdn.jsdelivr.net/gh/malove/foo');
    expect(text).not.toMatch(/["'`]\/assets\/audio\//u);
  });

});
