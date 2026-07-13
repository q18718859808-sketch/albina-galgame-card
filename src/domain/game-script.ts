import { z } from 'zod';

import { AssetManifestV2Schema, type AssetRecord } from './assets';
import {
  DOMAIN_VERSION,
  RouteIdSchema,
  SceneCueSchema,
} from './scene-cue';

const RouteEntrySceneIdsSchema = z
  .object({
    white_canvas: z.string().min(1),
    golden_bough_rebuild: z.string().min(1),
    ring_conspiracy: z.string().min(1),
  })
  .strict();

const GameScriptV2BaseSchema = z
  .object({
    version: z.literal(DOMAIN_VERSION),
    projectId: z.literal('albina-galgame-card'),
    initialSceneId: z.string().min(1),
    routeEntrySceneIds: RouteEntrySceneIdsSchema,
    scenes: z.array(SceneCueSchema).min(1),
  })
  .strict();

function addReferenceIssue(context: z.RefinementCtx, path: PropertyKey[], id: string): void {
  context.addIssue({
    code: 'custom',
    path,
    message: `Unknown scene reference: ${id}`,
  });
}

export const GameScriptV2Schema = GameScriptV2BaseSchema.superRefine((script, context) => {
  const ids = new Set<string>();
  const choiceIds = new Set<string>();

  script.scenes.forEach((scene, sceneIndex) => {
    if (ids.has(scene.id)) {
      context.addIssue({ code: 'custom', path: ['scenes', sceneIndex, 'id'], message: `Duplicate scene id: ${scene.id}` });
    }
    ids.add(scene.id);
    scene.choices.forEach((choice, choiceIndex) => {
      if (choiceIds.has(choice.id)) {
        context.addIssue({ code: 'custom', path: ['scenes', sceneIndex, 'choices', choiceIndex, 'id'], message: `Duplicate choice id: ${choice.id}` });
      }
      choiceIds.add(choice.id);
    });
  });

  if (!ids.has(script.initialSceneId)) addReferenceIssue(context, ['initialSceneId'], script.initialSceneId);
  Object.entries(script.routeEntrySceneIds).forEach(([route, id]) => {
    if (!ids.has(id)) addReferenceIssue(context, ['routeEntrySceneIds', route], id);
  });
  script.scenes.forEach((scene, sceneIndex) => {
    scene.choices.forEach((choice, choiceIndex) => {
      if (!ids.has(choice.nextSceneId)) addReferenceIssue(context, ['scenes', sceneIndex, 'choices', choiceIndex, 'nextSceneId'], choice.nextSceneId);
    });
  });
});

export type GameScriptV2 = z.infer<typeof GameScriptV2Schema>;
export type GameRouteId = z.infer<typeof RouteIdSchema>;

export function createGameScriptV2Schema(manifestInput: unknown): typeof GameScriptV2Schema {
  const manifest = AssetManifestV2Schema.parse(manifestInput);
  const assets = new Map(manifest.assets.map((asset) => [asset.id, asset]));
  const portraits = new Set(manifest.portraits.map((portrait) => portrait.id));
  return GameScriptV2Schema.superRefine((script, context) => {
    script.scenes.forEach((scene, sceneIndex) => {
      const imageReferences: Array<[string | undefined, PropertyKey[]]> = [
        [scene.backgroundAssetId, ['scenes', sceneIndex, 'backgroundAssetId']],
        [scene.cgAssetId, ['scenes', sceneIndex, 'cgAssetId']],
      ];
      imageReferences.forEach(([id, path]) => id && assertAssetKind(context, assets, id, 'image', path));
      const videoReferences: Array<[string | undefined, PropertyKey[]]> = [
        [scene.videoAssetId, ['scenes', sceneIndex, 'videoAssetId']],
        [scene.desktopVideoAssetId, ['scenes', sceneIndex, 'desktopVideoAssetId']],
      ];
      videoReferences.forEach(([id, path]) => id && assertAssetKind(context, assets, id, 'video', path));
      const audioReferences: Array<[string | undefined, PropertyKey[]]> = [
        [scene.voiceAssetId, ['scenes', sceneIndex, 'voiceAssetId']],
        [scene.bgmAssetId, ['scenes', sceneIndex, 'bgmAssetId']],
      ];
      audioReferences.forEach(([id, path]) => id && assertAssetKind(context, assets, id, 'audio', path));
      scene.sfxAssetIds?.forEach((id, index) => assertAssetKind(context, assets, id, 'audio', ['scenes', sceneIndex, 'sfxAssetIds', index]));
      scene.portraits.forEach((portrait, portraitIndex) => {
        if (!portraits.has(portrait.portraitAssetId)) {
          addAssetReferenceIssue(context, ['scenes', sceneIndex, 'portraits', portraitIndex, 'portraitAssetId'], portrait.portraitAssetId);
        }
      });
      scene.choices.forEach((choice, choiceIndex) => {
        if (choice.resultVoiceAssetId) assertAssetKind(context, assets, choice.resultVoiceAssetId, 'audio', ['scenes', sceneIndex, 'choices', choiceIndex, 'resultVoiceAssetId']);
        choice.effects.unlockCg?.forEach((id, unlockIndex) => assertAssetKind(context, assets, id, 'image', ['scenes', sceneIndex, 'choices', choiceIndex, 'effects', 'unlockCg', unlockIndex]));
      });
    });
  });
}

function addAssetReferenceIssue(context: z.RefinementCtx, path: PropertyKey[], id: string): void {
  context.addIssue({ code: 'custom', path, message: `Unknown asset reference: ${id}` });
}

function assertAssetKind(
  context: z.RefinementCtx,
  assets: Map<string, AssetRecord>,
  id: string,
  expectedKind: AssetRecord['kind'],
  path: PropertyKey[],
): void {
  const asset = assets.get(id);
  if (!asset) {
    addAssetReferenceIssue(context, path, id);
    return;
  }
  if (asset.kind !== expectedKind) {
    context.addIssue({ code: 'custom', path, message: `Asset ${id} must be ${expectedKind}, found ${asset.kind}` });
  }
}

export function parseGameScriptV2(input: unknown, manifest?: unknown): GameScriptV2 {
  return manifest === undefined ? GameScriptV2Schema.parse(input) : createGameScriptV2Schema(manifest).parse(input);
}
