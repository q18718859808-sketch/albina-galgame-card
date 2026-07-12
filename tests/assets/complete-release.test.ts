import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2 } from '../../src/domain/game-script';

async function json(path: string): Promise<unknown> { return JSON.parse(await readFile(join(process.cwd(), path), 'utf8')); }

describe('v2 release completeness with explicit blocked channels', () => {
  it('ships all fixed dialogue voices as hashed assets, not pending jobs', async () => {
    const manifest = parseAssetManifestV2(await json('content/asset-manifest-v2.json'));
    const story = parseGameScriptV2(await json('dist/albina-galgame-card/data/game-script-v2.json'));
    const voiceIds = new Set(story.scenes.flatMap((scene) => [scene.voiceAssetId, ...scene.choices.map((choice) => choice.resultVoiceAssetId)]).filter((id): id is string => Boolean(id)));
    expect(voiceIds.size).toBe(154);
    for (const id of voiceIds) {
      const asset = manifest.assets.find((candidate) => candidate.id === id);
      expect(asset?.sha256, id).toMatch(/^[a-f0-9]{64}$/u);
      expect(asset?.bytes, id).toBeGreaterThan(0);
    }
    expect(manifest.mediaJobs.filter((job) => job.kind === 'speech')).toEqual([]);
  });

  it('registers both web encodes for all 29 animations and cues every applicable scene', async () => {
    const manifest = parseAssetManifestV2(await json('content/asset-manifest-v2.json'));
    const story = parseGameScriptV2(await json('dist/albina-galgame-card/data/game-script-v2.json'));
    const runtime = manifest.assets.filter((asset) => asset.id.startsWith('video.animated.runtime.'));
    const desktop = manifest.assets.filter((asset) => asset.id.startsWith('video.animated.desktop.'));
    expect(runtime).toHaveLength(29);
    expect(desktop).toHaveLength(29);
    expect(story.scenes.filter((scene) => scene.videoAssetId && scene.desktopVideoAssetId)).toHaveLength(25);
    expect(story.scenes.every((scene) => Boolean(scene.bgmAssetId))).toBe(true);
    expect(story.scenes.filter((scene) => scene.tone === 'threat').every((scene) => (scene.sfxAssetIds?.length ?? 0) > 0)).toBe(true);
  });

  it('publishes blocked production channels without pretending completion', async () => {
    const status = await json('dist/albina-galgame-card/release-status.json') as { runtimeMediaApis: boolean; blocked: { portraitStrips: { count: number }; music26: { count: number } } };
    expect(status.runtimeMediaApis).toBe(false);
    expect(status.blocked.portraitStrips.count).toBe(8);
    expect(status.blocked.music26.count).toBe(81);
  });

  it('makes the v2 source UI the only enabled Tavern Helper script', async () => {
    const card = await json('card/albina.card.json') as { data: { extensions: { tavern_helper: { scripts: Array<{ enabled: boolean; content: string }> } } } };
    const enabled = card.data.extensions.tavern_helper.scripts.filter((script) => script.enabled);
    expect(enabled).toHaveLength(1);
    expect(enabled[0]?.content).toContain('@v2.0.0/dist/albina-galgame-card/source/albina-classic-loader.js');
    expect(enabled[0]?.content).not.toMatch(/^\s*import\s/mu);
    expect(enabled[0]?.content).not.toContain('/console/index.js');
    expect(existsSync('dist/albina-galgame-card/source/albina-classic-loader.js')).toBe(true);
    const loader = await readFile('public/albina-classic-loader.js', 'utf8');
    expect(loader).not.toMatch(/^\s*import\s/mu);
    expect(loader).toContain('import(sourceUrl)');
  });
});
