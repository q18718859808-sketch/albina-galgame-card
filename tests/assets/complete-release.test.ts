import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { parseAssetManifestV2 } from '../../src/domain/assets';
import { parseGameScriptV2 } from '../../src/domain/game-script';
import { TAVERN_HELPER_SAVE_KEY } from '../../src/runtime/default-host';

async function json(path: string): Promise<unknown> { return JSON.parse(await readFile(join(process.cwd(), path), 'utf8')); }

describe('v2 release-candidate completeness with explicit limitations', () => {
  it('ships all fixed dialogue voices as hashed assets, not pending jobs', async () => {
    const manifest = parseAssetManifestV2(await json('content/asset-manifest-v2.json'));
    const story = parseGameScriptV2(await json('dist/albina-galgame-card/data/game-script-v2.json'));
    const voiceIds = new Set(story.scenes.flatMap((scene) => [scene.voiceAssetId, ...scene.choices.map((choice) => choice.resultVoiceAssetId)]).filter((id): id is string => Boolean(id)));
    expect(voiceIds.size).toBe(166);
    for (const id of voiceIds) {
      const asset = manifest.assets.find((candidate) => candidate.id === id);
      expect(asset?.sha256, id).toMatch(/^[a-f0-9]{64}$/u);
      expect(asset?.bytes, id).toBeGreaterThan(0);
      expect(asset?.provenance, id).toMatchObject({ provider: 'pie', model: 'speech-2.8-hd', review: { status: 'approved' } });
      expect(asset?.lineage, id).toMatchObject({ kind: 'conversion', inputs: [{ sha256: expect.stringMatching(/^[a-f0-9]{64}$/u) }] });
    }
    const boundaryVoiceIds = [...voiceIds].filter((id) => id.includes('canon_recap') || id === 'voice.scene.opening_001' || id.startsWith('voice.result.enter_'));
    expect(boundaryVoiceIds).toHaveLength(16);
    for (const id of boundaryVoiceIds) {
      const asset = manifest.assets.find((candidate) => candidate.id === id);
      expect(asset?.provenance, id).toMatchObject({ provider: 'pie', model: 'speech-2.8-hd', promptVersion: 'albina-speech-v2', review: { status: 'approved' } });
    }
    const placeholderVoiceIds = story.scenes.flatMap((scene) => [
      ...(scene.text.includes('{{user}}') && scene.voiceAssetId ? [scene.voiceAssetId] : []),
      ...scene.choices.filter((choice) => choice.resultText?.includes('{{user}}') && choice.resultVoiceAssetId).map((choice) => choice.resultVoiceAssetId as string),
    ]);
    expect(placeholderVoiceIds).toHaveLength(5);
    for (const id of placeholderVoiceIds) {
      const asset = manifest.assets.find((candidate) => candidate.id === id);
      expect(asset?.provenance?.promptVersion, id).toBe('albina-speech-v2');
    }
    expect(manifest.mediaJobs.filter((job) => job.kind === 'speech')).toEqual([]);
  });

  it('uses static CG fallbacks without publishing or cueing retired videos', async () => {
    const manifest = parseAssetManifestV2(await json('content/asset-manifest-v2.json'));
    const story = parseGameScriptV2(await json('dist/albina-galgame-card/data/game-script-v2.json'));
    const runtime = manifest.assets.filter((asset) => asset.id.startsWith('video.animated.runtime.'));
    const desktop = manifest.assets.filter((asset) => asset.id.startsWith('video.animated.desktop.'));
    expect(runtime).toHaveLength(0);
    expect(desktop).toHaveLength(0);
    expect(story.scenes.every((scene) => !scene.videoAssetId && !scene.desktopVideoAssetId)).toBe(true);
    expect(story.scenes.filter((scene) => scene.cgAssetId)).not.toHaveLength(0);
    expect(story.scenes.every((scene) => Boolean(scene.bgmAssetId))).toBe(true);
    expect(story.scenes.filter((scene) => scene.tone === 'threat').every((scene) => (scene.sfxAssetIds?.length ?? 0) > 0)).toBe(true);
  });

  it('documents retired production routes and remaining limitations without pretending completion', async () => {
    const status = await json('dist/albina-galgame-card/release-status.json') as {
      runtimeMediaApis: boolean;
      completeEdition: boolean;
      substitutions: { music: string; portraitMotion: string };
      knownLimitations: { officialOst: string; canonDialogue: string; visualProvenance: string };
      completed: { fixedVoiceAssets: number; pieProvenancedVoiceAssets: number; staticCharacterPortraits: number; staticAlbinaPortraits: number };
    };
    expect(status.runtimeMediaApis).toBe(false);
    expect(status.completeEdition).toBe(false);
    expect(status.substitutions.music).toContain('Music 2.6 production is retired');
    expect(status.substitutions.portraitMotion).toContain('All legacy portrait strips are retired');
    expect(status.knownLimitations.officialOst).toContain('not a redistribution license');
    expect(status.knownLimitations.canonDialogue).toContain('paraphrases');
    expect(status.knownLimitations.visualProvenance).toContain('media:readiness:strict');
    expect(status.completed).toMatchObject({ fixedVoiceAssets: 166, pieProvenancedVoiceAssets: 166, staticCharacterPortraits: 27, staticAlbinaPortraits: 13 });
  });

  it('keeps one identical approved Tavern Helper loader in card JSON and template', async () => {
    type Card = { data: { character_version: string; creator_notes?: string; tags: string[]; extensions: { albina_galgame_card: { save_key: string }; tavern_helper: { scripts: Array<{ enabled: boolean; content: string }> } } } };
    const card = await json('card/albina.card.json') as Card;
    const template = await json('card/character-card.template.json') as Card;
    const scripts = card.data.extensions.tavern_helper.scripts;
    expect(card.data.character_version).toBe('2.0.0-rc.3');
    expect(template.data.character_version).toBe('2.0.0-rc.3');
    expect(card.data.tags).toContain('v2.0.0-rc.3');
    expect(template.data.tags).toContain('v2.0.0-rc.3');
    expect(card.data.tags).not.toContain('v2.0.0');
    expect(template.data.tags).not.toContain('v2.0.0');
    expect(card.data.extensions.albina_galgame_card.save_key).toBe(TAVERN_HELPER_SAVE_KEY);
    expect(template.data.extensions.albina_galgame_card.save_key).toBe(TAVERN_HELPER_SAVE_KEY);
    expect(scripts).toHaveLength(1);
    expect(scripts).toEqual(template.data.extensions.tavern_helper.scripts);
    expect(scripts[0]?.enabled).toBe(true);
    expect(card.data.creator_notes).toContain('v2.0.0-rc.3');
    expect(scripts[0]?.content).toBe("import 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.3/dist/albina-galgame-card/source/albina-classic-loader.js'\n");
    expect(scripts[0]?.content).not.toContain('/console/index.js');
    expect(existsSync('dist/albina-galgame-card/source/albina-classic-loader.js')).toBe(true);
    const loader = await readFile('public/albina-classic-loader.js', 'utf8');
    const source = await readFile('dist/albina-galgame-card/source/albina-source.js', 'utf8');
    expect(loader).toContain('import.meta.url');
    expect(loader).toContain('import(/* @vite-ignore */ sourceUrl)');
    expect(loader).not.toContain('__ALBINA_BASE_URL__');
    expect(loader).not.toContain('cdn.jsdelivr.net');
    expect(source).not.toMatch(/\bprocess(?:\.|\[)/u);
  });

  it('marks the current build as a non-final release candidate', async () => {
    const status = await json('dist/albina-galgame-card/release-status.json') as { completeEdition: boolean; releaseCandidate: boolean; version: string };
    expect(status.completeEdition).toBe(false);
    expect(status.releaseCandidate).toBe(true);
    expect(status.version).toBe('2.0.0-rc.3');
  });
});
