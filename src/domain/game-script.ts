import { z } from 'zod';

import { AssetManifestV2Schema, type AssetManifestV2 } from './assets';
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

function declaredAssetIds(manifest: AssetManifestV2): Set<string> {
  return new Set([...manifest.assets.map((asset) => asset.id), ...manifest.portraits.map((portrait) => portrait.id)]);
}

export function createGameScriptV2Schema(manifestInput: unknown): typeof GameScriptV2Schema {
  const manifest = AssetManifestV2Schema.parse(manifestInput);
  const assets = declaredAssetIds(manifest);
  const portraits = new Set(manifest.portraits.map((portrait) => portrait.id));
  return GameScriptV2Schema.superRefine((script, context) => {
    script.scenes.forEach((scene, sceneIndex) => {
      const references: Array<[string | undefined, PropertyKey[]]> = [
        [scene.backgroundAssetId, ['scenes', sceneIndex, 'backgroundAssetId']],
        [scene.cgAssetId, ['scenes', sceneIndex, 'cgAssetId']],
        [scene.voiceAssetId, ['scenes', sceneIndex, 'voiceAssetId']],
        [scene.bgmAssetId, ['scenes', sceneIndex, 'bgmAssetId']],
      ];
      scene.sfxAssetIds?.forEach((id, index) => references.push([id, ['scenes', sceneIndex, 'sfxAssetIds', index]]));
      references.forEach(([id, path]) => {
        if (id && !assets.has(id)) addAssetReferenceIssue(context, path, id);
      });
      scene.portraits.forEach((portrait, portraitIndex) => {
        if (!portraits.has(portrait.portraitAssetId)) {
          addAssetReferenceIssue(context, ['scenes', sceneIndex, 'portraits', portraitIndex, 'portraitAssetId'], portrait.portraitAssetId);
        }
      });
    });
  });
}

function addAssetReferenceIssue(context: z.RefinementCtx, path: PropertyKey[], id: string): void {
  context.addIssue({ code: 'custom', path, message: `Unknown asset reference: ${id}` });
}

export function parseGameScriptV2(input: unknown, manifest?: unknown): GameScriptV2 {
  return manifest === undefined ? GameScriptV2Schema.parse(input) : createGameScriptV2Schema(manifest).parse(input);
}
