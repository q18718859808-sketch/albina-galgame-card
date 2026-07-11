import { describe, expect, it } from 'vitest';

import { GameScriptV2Schema, parseGameScriptV2 } from '../../src/domain/game-script';
import { SceneCueSchema } from '../../src/domain/scene-cue';

const openingScene = {
  version: 2,
  id: 'opening_001',
  chapter: 1,
  route: 'white_canvas',
  locationId: 'backstreets_rain',
  backgroundAssetId: 'bg.backstreets_rain',
  cgAssetId: 'cg.opening_rain',
  tone: 'rain',
  portraits: [
    {
      characterId: 'albina',
      portraitAssetId: 'portrait.albina.normal',
      position: 'center',
      active: true,
      scale: 1,
    },
  ],
  speaker: '阿尔比娜',
  text: '晚上好。',
  choices: [
    {
      id: 'enter_white_canvas',
      text: '留下',
      nextSceneId: 'white_canvas_001',
      effects: {
        route: 'white_canvas',
        values: { affectionAlbina: 2, trust: 2 },
        setFlags: ['route_white_canvas_seen'],
        unlockCg: ['opening_rain'],
      },
    },
  ],
} as const;

const routeScene = {
  ...openingScene,
  id: 'white_canvas_001',
  locationId: 'white_canvas_room',
  backgroundAssetId: 'bg.white_canvas',
  cgAssetId: 'cg.white_canvas_choice',
  choices: [],
} as const;

describe('SceneCueSchema', () => {
  it('accepts a strictly versioned scene cue', () => {
    expect(SceneCueSchema.parse(openingScene)).toEqual(openingScene);
  });

  it('rejects unknown authoritative fields and wrong versions', () => {
    expect(() => SceneCueSchema.parse({ ...openingScene, version: 1 })).toThrow();
    expect(() => SceneCueSchema.parse({ ...openingScene, trust: 99 })).toThrow();
    expect(() => SceneCueSchema.parse({
      ...openingScene,
      choices: [{
        ...openingScene.choices[0],
        effects: { values: { godMode: 1 } },
      }],
    })).toThrow();
  });
});

describe('GameScriptV2Schema', () => {
  it('accepts a complete script with valid scene references', () => {
    const script = {
      version: 2,
      projectId: 'albina-galgame-card',
      initialSceneId: 'opening_001',
      routeEntrySceneIds: {
        white_canvas: 'white_canvas_001',
        golden_bough_rebuild: 'opening_001',
        ring_conspiracy: 'opening_001',
      },
      scenes: [openingScene, routeScene],
    };

    expect(GameScriptV2Schema.parse(script)).toEqual(script);
  });

  it('rejects dangling scene references', () => {
    const script = {
      version: 2,
      projectId: 'albina-galgame-card',
      initialSceneId: 'missing_scene',
      routeEntrySceneIds: {
        white_canvas: 'white_canvas_001',
        golden_bough_rebuild: 'opening_001',
        ring_conspiracy: 'opening_001',
      },
      scenes: [openingScene, routeScene],
    };

    expect(() => GameScriptV2Schema.parse(script)).toThrow(/scene reference/i);
  });

  it('rejects scene media references missing from the asset manifest', () => {
    const scene = {
      ...routeScene,
      id: 'opening_001',
      voiceAssetId: 'voice.opening.albina',
      bgmAssetId: 'audio.bgm.title',
      sfxAssetIds: ['audio.sfx.rain'],
    };
    const script = {
      version: 2,
      projectId: 'albina-galgame-card',
      initialSceneId: 'opening_001',
      routeEntrySceneIds: {
        white_canvas: 'opening_001',
        golden_bough_rebuild: 'opening_001',
        ring_conspiracy: 'opening_001',
      },
      scenes: [scene],
    };
    const manifest = {
      version: 2,
      projectId: 'albina-galgame-card',
      basePath: 'assets',
      assets: [
        { id: scene.backgroundAssetId, kind: 'image', path: 'bg/white-canvas.png' },
        { id: scene.cgAssetId, kind: 'image', path: 'cg/white-canvas.png' },
        { id: scene.voiceAssetId, kind: 'audio', path: 'voice/opening.ogg' },
        { id: scene.bgmAssetId, kind: 'audio', path: 'bgm/title.ogg' },
        { id: scene.sfxAssetIds[0], kind: 'audio', path: 'sfx/rain.ogg' },
      ],
      portraits: [{
        version: 2,
        id: 'portrait.albina.normal',
        characterId: 'albina',
        path: 'characters/albina/normal.png',
        animation: { kind: 'static' },
      }],
      mediaJobs: [],
    };

    expect(parseGameScriptV2(script, manifest)).toEqual(script);
    for (const missingId of [
      scene.backgroundAssetId,
      scene.cgAssetId,
      scene.portraits[0].portraitAssetId,
      scene.voiceAssetId,
      scene.bgmAssetId,
      scene.sfxAssetIds[0],
    ]) {
      const incomplete = {
        ...manifest,
        assets: manifest.assets.filter((asset) => asset.id !== missingId),
        portraits: manifest.portraits.filter((asset) => asset.id !== missingId),
      };
      expect(() => parseGameScriptV2(script, incomplete)).toThrow(/asset reference/i);
    }
  });
});
