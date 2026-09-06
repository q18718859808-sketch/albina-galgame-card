import { z } from 'zod';

import { AssetManifestV2Schema, type AssetRecord } from './assets';
import { GameplaySystemsSchema, type GameplaySystems, type StatePredicate } from './gameplay';
import type { SceneMinigameChallenge } from './minigame';
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
    gameplay: GameplaySystemsSchema,
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

interface GameplayReferenceSets {
  quests: Set<string>;
  battles: Set<string>;
  items: Set<string>;
  equipment: Set<string>;
  professions: Set<string>;
  outfits: Set<string>;
  minigames: Set<string>;
  worldbook: Set<string>;
}

function gameplayReferenceSets(gameplay: GameplaySystems): GameplayReferenceSets {
  return {
    quests: new Set(gameplay.quests.map(({ id }) => id)),
    battles: new Set(gameplay.battles.map(({ id }) => id)),
    items: new Set(gameplay.items.map(({ id }) => id)),
    equipment: new Set(gameplay.equipment.map(({ id }) => id)),
    professions: new Set(gameplay.professions.map(({ id }) => id)),
    outfits: new Set(gameplay.outfits.map(({ id }) => id)),
    minigames: new Set(gameplay.minigames.map(({ id }) => id)),
    worldbook: new Set(gameplay.worldbookEntries.map(({ id }) => id)),
  };
}

function addGameplayReferenceIssue(context: z.RefinementCtx, path: PropertyKey[], kind: string, id: string): void {
  context.addIssue({ code: 'custom', path, message: `Unknown ${kind} reference: ${id}` });
}

function validatePredicateReference(
  predicate: StatePredicate,
  refs: GameplayReferenceSets,
  context: z.RefinementCtx,
  path: PropertyKey[],
): void {
  const reference = predicate.kind === 'quest' ? ['quest', predicate.questId, refs.quests]
    : predicate.kind === 'battle' ? ['battle', predicate.battleId, refs.battles]
      : predicate.kind === 'item' ? ['item', predicate.itemId, refs.items]
        : predicate.kind === 'equipment' ? ['equipment', predicate.equipmentId, refs.equipment]
          : predicate.kind === 'outfit' ? ['outfit', predicate.outfitId, refs.outfits]
            : predicate.kind === 'profession' ? ['profession', predicate.professionId, refs.professions]
              : predicate.kind === 'worldbook' ? ['worldbook', predicate.entryId, refs.worldbook]
                : undefined;
  if (reference && !(reference[2] as Set<string>).has(reference[1] as string)) {
    addGameplayReferenceIssue(context, path, reference[0] as string, reference[1] as string);
  }
}

function validateChoiceEffectReferences(
  effects: z.infer<typeof SceneCueSchema>['choices'][number]['effects'],
  refs: GameplayReferenceSets,
  context: z.RefinementCtx,
  path: PropertyKey[],
): void {
  const groups: Array<[string[] | undefined, Set<string>, string, string]> = [
    [effects.startQuests, refs.quests, 'quest', 'startQuests'],
    [effects.completeQuests, refs.quests, 'quest', 'completeQuests'],
    [effects.grantItems, refs.items, 'item', 'grantItems'],
    [effects.equipItems, refs.equipment, 'equipment', 'equipItems'],
    [effects.unlockOutfits, refs.outfits, 'outfit', 'unlockOutfits'],
  ];
  groups.forEach(([ids, known, kind, field]) => ids?.forEach((id, index) => {
    if (!known.has(id)) addGameplayReferenceIssue(context, [...path, field, index], kind, id);
  }));
  effects.resolveBattles?.forEach(({ battleId }, index) => {
    if (!refs.battles.has(battleId)) addGameplayReferenceIssue(context, [...path, 'resolveBattles', index, 'battleId'], 'battle', battleId);
  });
  Object.keys(effects.professionXp ?? {}).forEach((id) => {
    if (!refs.professions.has(id)) addGameplayReferenceIssue(context, [...path, 'professionXp', id], 'profession', id);
  });
  if (effects.activateOutfit && !refs.outfits.has(effects.activateOutfit)) addGameplayReferenceIssue(context, [...path, 'activateOutfit'], 'outfit', effects.activateOutfit);
  if (effects.activateProfession && !refs.professions.has(effects.activateProfession)) addGameplayReferenceIssue(context, [...path, 'activateProfession'], 'profession', effects.activateProfession);
}

function validateAchievementReferences(
  achievement: GameplaySystems['achievements'][number],
  refs: GameplayReferenceSets,
  context: z.RefinementCtx,
  path: PropertyKey[],
): void {
  achievement.eligibility.forEach((item, index) => validatePredicateReference(item, refs, context, [...path, 'eligibility', index]));
  Object.keys(achievement.reward.professionXp ?? {}).forEach((id) => {
    if (!refs.professions.has(id)) addGameplayReferenceIssue(context, [...path, 'reward', 'professionXp', id], 'profession', id);
  });
  achievement.reward.grantItems?.forEach((id, index) => {
    if (!refs.items.has(id)) addGameplayReferenceIssue(context, [...path, 'reward', 'grantItems', index], 'item', id);
  });
  achievement.reward.unlockOutfits?.forEach((id, index) => {
    if (!refs.outfits.has(id)) addGameplayReferenceIssue(context, [...path, 'reward', 'unlockOutfits', index], 'outfit', id);
  });
}

function validateSceneMinigameReference(
  challenge: SceneMinigameChallenge | undefined,
  refs: GameplayReferenceSets,
  context: z.RefinementCtx,
  path: PropertyKey[],
): void {
  if (challenge && !refs.minigames.has(challenge.minigameId)) {
    addGameplayReferenceIssue(context, [...path, 'minigameId'], 'minigame', challenge.minigameId);
  }
}

function validateGameplayReferences(script: z.infer<typeof GameScriptV2BaseSchema>, context: z.RefinementCtx): void {
  const refs = gameplayReferenceSets(script.gameplay);
  script.scenes.forEach((scene, sceneIndex) => scene.choices.forEach((choice, choiceIndex) => {
    const root = ['scenes', sceneIndex, 'choices', choiceIndex] as PropertyKey[];
    validateChoiceEffectReferences(choice.effects, refs, context, [...root, 'effects']);
    choice.availability?.allOf?.forEach((item, index) => validatePredicateReference(item, refs, context, [...root, 'availability', 'allOf', index]));
    choice.availability?.anyOf?.forEach((item, index) => validatePredicateReference(item, refs, context, [...root, 'availability', 'anyOf', index]));
  }));
  script.scenes.forEach((scene, sceneIndex) => {
    validateSceneMinigameReference(scene.minigame, refs, context, ['scenes', sceneIndex, 'minigame']);
    scene.ending?.eligibility.allOf?.forEach((item, index) => validatePredicateReference(item, refs, context, ['scenes', sceneIndex, 'ending', 'eligibility', 'allOf', index]));
    scene.ending?.eligibility.anyOf?.forEach((item, index) => validatePredicateReference(item, refs, context, ['scenes', sceneIndex, 'ending', 'eligibility', 'anyOf', index]));
  });
  script.gameplay.achievements.forEach((achievement, achievementIndex) => {
    validateAchievementReferences(achievement, refs, context, ['gameplay', 'achievements', achievementIndex]);
  });
}

export const GameScriptV2Schema = GameScriptV2BaseSchema.superRefine((script, context) => {
  const ids = new Set<string>();
  const choiceIds = new Set<string>();
  const scenesById = new Map(script.scenes.map((scene) => [scene.id, scene]));

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
  const initialScene = scenesById.get(script.initialSceneId);
  if (initialScene && initialScene.provenance.scope !== 'canon_recap') {
    context.addIssue({ code: 'custom', path: ['initialSceneId'], message: 'Initial scene must begin the canon recap' });
  }
  Object.entries(script.routeEntrySceneIds).forEach(([route, id]) => {
    if (!ids.has(id)) addReferenceIssue(context, ['routeEntrySceneIds', route], id);
    const scene = scenesById.get(id);
    if (scene && (scene.route !== route || scene.provenance.classification !== 'AU_extension')) {
      context.addIssue({ code: 'custom', path: ['routeEntrySceneIds', route], message: `Route entry must be AU_extension content for ${route}` });
    }
  });
  script.scenes.forEach((scene, sceneIndex) => {
    scene.choices.forEach((choice, choiceIndex) => {
      if (!ids.has(choice.nextSceneId)) addReferenceIssue(context, ['scenes', sceneIndex, 'choices', choiceIndex, 'nextSceneId'], choice.nextSceneId);
    });
  });
  validateGameplayReferences(script, context);
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
    script.gameplay.outfits.forEach((outfit, outfitIndex) => {
      if (!portraits.has(outfit.portraitAssetId)) {
        addAssetReferenceIssue(context, ['gameplay', 'outfits', outfitIndex, 'portraitAssetId'], outfit.portraitAssetId);
      }
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
