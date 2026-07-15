import { describe, expect, it } from 'vitest';

import { GameScriptV2Schema, parseGameScriptV2 } from '../../src/domain/game-script';
import { SceneCueSchema } from '../../src/domain/scene-cue';

const recapProvenance = {
  classification: 'canon_paraphrase',
  scope: 'canon_recap',
  claimIds: ['canon.recap'],
  sourceIds: ['source.official'],
  note: 'Short sourced paraphrase.',
} as const;

const routeProvenance = {
  classification: 'AU_extension',
  scope: 'route',
  claimIds: ['boundary.au'],
  sourceIds: ['source.project'],
  note: 'Explicit project-authored AU.',
} as const;

const boundaryProvenance = {
  ...routeProvenance,
  scope: 'AU_boundary',
  note: 'Explicit continuity boundary before route selection.',
} as const;

const recapScene = {
  version: 2,
  id: 'canon_recap_001',
  chapter: 0,
  route: null,
  provenance: recapProvenance,
  locationId: 'source_scene',
  backgroundAssetId: 'bg.white_canvas',
  tone: 'recap',
  portraits: [],
  speaker: '正史复盘',
  text: '短中文意译。',
  choices: [{
    id: 'continue_to_AU',
    text: '进入 AU',
    nextSceneId: 'opening_001',
    effects: { setFlags: ['recap_complete'] },
  }],
} as const;

const openingScene = {
  version: 2,
  id: 'opening_001',
  chapter: 1,
  route: null,
  provenance: boundaryProvenance,
  locationId: 'white_canvas_room',
  backgroundAssetId: 'bg.white_canvas',
  cgAssetId: 'cg.white_canvas_choice',
  tone: 'AU-boundary',
  portraits: [{
    characterId: 'albina',
    portraitAssetId: 'portrait.albina.normal',
    position: 'center',
    active: true,
    scale: 1,
  }],
  speaker: 'AU/IF 分歧',
  text: '本卡原创 AU。',
  choices: [{
    id: 'enter_white_canvas',
    text: '进入路线',
    nextSceneId: 'white_canvas_001',
    effects: {
      route: 'white_canvas',
      values: { affectionAlbina: 2, trust: 2 },
      setFlags: ['route_white_canvas_seen'],
      unlockCg: ['cg.white_canvas_choice'],
    },
  }],
} as const;

const whiteRouteScene = {
  ...openingScene,
  id: 'white_canvas_001',
  route: 'white_canvas',
  provenance: routeProvenance,
  choices: [],
} as const;

const goldenRouteScene = {
  ...whiteRouteScene,
  id: 'golden_bough_001',
  route: 'golden_bough_rebuild',
} as const;

const ringRouteScene = {
  ...whiteRouteScene,
  id: 'ring_conspiracy_001',
  route: 'ring_conspiracy',
} as const;

function validScript(scenes: unknown[] = [recapScene, openingScene, whiteRouteScene, goldenRouteScene, ringRouteScene]) {
  return {
    version: 2,
    projectId: 'albina-galgame-card',
    initialSceneId: 'canon_recap_001',
    routeEntrySceneIds: {
      white_canvas: 'white_canvas_001',
      golden_bough_rebuild: 'golden_bough_001',
      ring_conspiracy: 'ring_conspiracy_001',
    },
    scenes,
  };
}

describe('SceneCueSchema', () => {
  it('accepts strictly classified recap and AU scenes', () => {
    expect(SceneCueSchema.parse(recapScene)).toEqual(recapScene);
    expect(SceneCueSchema.parse(openingScene)).toEqual(openingScene);
  });

  it('rejects unknown authoritative fields and wrong versions', () => {
    expect(() => SceneCueSchema.parse({ ...openingScene, version: 1 })).toThrow();
    expect(() => SceneCueSchema.parse({ ...openingScene, trust: 99 })).toThrow();
    expect(() => SceneCueSchema.parse({
      ...openingScene,
      choices: [{ ...openingScene.choices[0], effects: { values: { godMode: 1 } } }],
    })).toThrow();
  });

  it('allows null routes only on recap and AU boundary scenes and rejects rejected content', () => {
    expect(() => SceneCueSchema.parse({ ...openingScene, route: 'white_canvas' })).toThrow(/null route/i);
    expect(() => SceneCueSchema.parse({ ...whiteRouteScene, route: null })).toThrow(/only canon recap and AU boundary/i);
    expect(() => SceneCueSchema.parse({ ...recapScene, route: 'white_canvas' })).toThrow(/null route/i);
    expect(() => SceneCueSchema.parse({
      ...openingScene,
      provenance: { ...routeProvenance, classification: 'rejected' },
    })).toThrow(/rejected content/i);
  });
});

describe('GameScriptV2Schema', () => {
  it('accepts a complete script that starts with canon recap', () => {
    const script = validScript();
    expect(GameScriptV2Schema.parse(script)).toEqual(script);
  });

  it('rejects dangling references and an AU initial scene', () => {
    expect(() => GameScriptV2Schema.parse({ ...validScript(), initialSceneId: 'missing_scene' })).toThrow(/scene reference/i);
    expect(() => GameScriptV2Schema.parse({ ...validScript(), initialSceneId: 'opening_001' })).toThrow(/canon recap/i);
  });

  it('rejects route entries assigned to a different route', () => {
    const script = validScript();
    expect(() => GameScriptV2Schema.parse({
      ...script,
      routeEntrySceneIds: { ...script.routeEntrySceneIds, ring_conspiracy: 'white_canvas_001' },
    })).toThrow(/route entry/i);
  });

  it('rejects scene media references missing from the asset manifest', () => {
    const mediaScene = {
      ...whiteRouteScene,
      voiceAssetId: 'voice.opening.albina',
      bgmAssetId: 'audio.bgm.title',
      sfxAssetIds: ['audio.sfx.rain'],
      videoAssetId: 'video.runtime.opening',
      desktopVideoAssetId: 'video.desktop.opening',
      choices: [{
        ...openingScene.choices[0],
        id: 'media_choice',
        nextSceneId: 'white_canvas_001',
        resultVoiceAssetId: 'voice.result.opening',
      }],
    };
    const script = validScript([recapScene, openingScene, mediaScene, goldenRouteScene, ringRouteScene]);
    const manifest = {
      version: 2,
      projectId: 'albina-galgame-card',
      basePath: 'assets',
      assets: [
        { id: mediaScene.backgroundAssetId, kind: 'image', path: 'bg/white-canvas.png' },
        { id: mediaScene.cgAssetId, kind: 'image', path: 'cg/white-canvas.png' },
        { id: mediaScene.voiceAssetId, kind: 'audio', path: 'voice/opening.ogg' },
        { id: mediaScene.bgmAssetId, kind: 'audio', path: 'bgm/title.ogg' },
        { id: mediaScene.sfxAssetIds[0], kind: 'audio', path: 'sfx/rain.ogg' },
        { id: mediaScene.videoAssetId, kind: 'video', path: 'video/opening.mp4' },
        { id: mediaScene.desktopVideoAssetId, kind: 'video', path: 'video/opening-desktop.mp4' },
        { id: mediaScene.choices[0]!.resultVoiceAssetId, kind: 'audio', path: 'voice/result.ogg' },
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
      mediaScene.backgroundAssetId,
      mediaScene.cgAssetId,
      mediaScene.portraits[0].portraitAssetId,
      mediaScene.voiceAssetId,
      mediaScene.bgmAssetId,
      mediaScene.sfxAssetIds[0],
      mediaScene.videoAssetId,
      mediaScene.desktopVideoAssetId,
      mediaScene.choices[0]!.resultVoiceAssetId,
    ]) {
      const incomplete = {
        ...manifest,
        assets: manifest.assets.filter((asset) => asset.id !== missingId),
        portraits: manifest.portraits.filter((asset) => asset.id !== missingId),
      };
      expect(() => parseGameScriptV2(script, incomplete)).toThrow(/asset reference/i);
    }

    const wrongKind = {
      ...manifest,
      assets: manifest.assets.map((asset) => asset.id === mediaScene.cgAssetId ? { ...asset, kind: 'audio' } : asset),
    };
    expect(() => parseGameScriptV2(script, wrongKind)).toThrow(/must be image/i);
  });
});
