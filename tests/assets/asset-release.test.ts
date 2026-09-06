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

describe('canonical asset release', () => {
  it('retires all strips, unused portraits, and the false Fascia portrait in favor of reachable static portraits', async () => {
    const manifest = parseAssetManifestV2(await readJson('content/asset-manifest-v2.json'));
    const albinaPortraits = manifest.portraits.filter((portrait) => portrait.characterId === 'albina');
    const pendingStripJobs = manifest.mediaJobs.filter((job) => job.id.startsWith('job.strip.'));
    const pendingGalleryJobs = manifest.mediaJobs.filter((job) => job.id.startsWith('job.cg.'));

    expect(albinaPortraits).toHaveLength(13);
    expect(manifest.portraits).toHaveLength(27);
    expect(manifest.portraits.every((portrait) => portrait.animation.kind === 'static')).toBe(true);
    expect(albinaPortraits.every((portrait) => portrait.path.startsWith('characters/albina/'))).toBe(true);
    expect(manifest.portraits.some((portrait) => portrait.id === 'portrait.fascia.normal')).toBe(false);
    expect(manifest.assets.some((asset) => asset.path.startsWith('sprite-atlas/'))).toBe(false);
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

  it('materializes only static story media and resolves every reference', async () => {
    const lookup = await readJson('dist/albina-galgame-card/assets/runtime-lookup.json') as RuntimeLookup;
    const scenes = materializeStoryMedia(await readStoryScenes());
    const references = collectStoryAssetReferences(scenes);
    const videoReferences = references.filter((id) => id.startsWith('video.animated.'));
    expect(videoReferences).toEqual([]);
    expect(scenes.every((scene) => !scene.videoAssetId && !scene.desktopVideoAssetId)).toBe(true);
    expect(findUnresolvedStoryReferences(scenes, lookup)).toEqual([]);
  });

  it('reports a missing static CG as an unresolved story reference', async () => {
    const lookup = structuredClone(await readJson('dist/albina-galgame-card/assets/runtime-lookup.json') as RuntimeLookup);
    const scenes = materializeStoryMedia(await readStoryScenes());
    const missingAssetId = scenes.find((scene) => typeof scene.cgAssetId === 'string')?.cgAssetId as string;
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
