import { z } from 'zod';

import { RouteIdSchema } from './scene-cue-route';

const GameplayIdSchema = z.string().min(1);

export const StoryValueKeySchema = z.enum([
  'affectionAlbina',
  'trust',
  'danger',
  'artResonance',
]);

export const RelationshipVectorKeySchema = z.enum([
  'intimacy',
  'reliance',
  'obsession',
  'suspicion',
]);

export const ConflictMasteryKeySchema = z.enum([
  'blade',
  'boundary',
  'analysis',
  'resonance',
]);

export const GameplayStatEffectsSchema = z
  .object({
    affectionAlbina: z.number().finite().optional(),
    trust: z.number().finite().optional(),
    danger: z.number().finite().optional(),
    artResonance: z.number().finite().optional(),
    composure: z.number().finite().optional(),
    materials: z.number().finite().optional(),
    leverage: z.number().finite().optional(),
    exposure: z.number().finite().optional(),
  })
  .strict();

export const RelationshipVectorEffectsSchema = z
  .object({
    intimacy: z.number().finite().optional(),
    reliance: z.number().finite().optional(),
    obsession: z.number().finite().optional(),
    suspicion: z.number().finite().optional(),
  })
  .strict();

export const ConflictMasteryEffectsSchema = z
  .object({
    blade: z.number().finite().optional(),
    boundary: z.number().finite().optional(),
    analysis: z.number().finite().optional(),
    resonance: z.number().finite().optional(),
  })
  .strict();

export const BattleResolutionEffectSchema = z
  .object({
    battleId: GameplayIdSchema,
    outcome: z.enum(['victory', 'setback']),
  })
  .strict();

const NumericPredicateFields = {
  operator: z.enum(['gte', 'lte', 'eq']),
  value: z.number().finite(),
} as const;

export const StatePredicateSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('value'), key: StoryValueKeySchema, ...NumericPredicateFields }).strict(),
  z.object({ kind: z.literal('relationship'), key: RelationshipVectorKeySchema, ...NumericPredicateFields }).strict(),
  z.object({ kind: z.literal('flag'), flag: GameplayIdSchema, equals: z.boolean() }).strict(),
  z.object({ kind: z.literal('quest'), questId: GameplayIdSchema, status: z.enum(['active', 'completed']) }).strict(),
  z.object({ kind: z.literal('battle'), battleId: GameplayIdSchema, outcome: z.enum(['victory', 'setback']).optional() }).strict(),
  z.object({ kind: z.literal('item'), itemId: GameplayIdSchema }).strict(),
  z.object({ kind: z.literal('equipment'), equipmentId: GameplayIdSchema }).strict(),
  z.object({ kind: z.literal('outfit'), outfitId: GameplayIdSchema }).strict(),
  z.object({ kind: z.literal('profession'), professionId: GameplayIdSchema, levelGte: z.number().int().positive() }).strict(),
  z.object({ kind: z.literal('worldbook'), entryId: GameplayIdSchema, status: z.enum(['active', 'seen']) }).strict(),
]);

export const RelationshipTrackDefinitionSchema = z
  .object({
    id: RelationshipVectorKeySchema,
    label: z.string().min(1),
    minimum: z.number().finite(),
    maximum: z.number().finite(),
  })
  .strict()
  .refine((track) => track.minimum < track.maximum, { message: 'Relationship track minimum must be below maximum' });

export const QuestDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    route: RouteIdSchema,
    label: z.string().min(1),
    description: z.string().min(1),
  })
  .strict();

export const BattleDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    route: RouteIdSchema,
    label: z.string().min(1),
    description: z.string().min(1),
    recommendedMastery: ConflictMasteryKeySchema,
  })
  .strict();

export const ItemDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    route: RouteIdSchema.optional(),
    label: z.string().min(1),
    description: z.string().min(1),
  })
  .strict();

export const EquipmentDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    itemId: GameplayIdSchema,
    route: RouteIdSchema.optional(),
    slot: z.enum(['weapon', 'armor', 'accessory', 'tool']),
    label: z.string().min(1),
    modifiers: GameplayStatEffectsSchema,
  })
  .strict();

export const OutfitDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    route: RouteIdSchema.optional(),
    label: z.string().min(1),
    portraitAssetId: GameplayIdSchema,
  })
  .strict();

export const ProfessionDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    route: RouteIdSchema.optional(),
    label: z.string().min(1),
    xpThresholds: z.array(z.number().int().nonnegative()).min(1),
    modifiersPerLevel: GameplayStatEffectsSchema,
  })
  .strict()
  .superRefine((profession, context) => {
    if (profession.xpThresholds[0] !== 0) {
      context.addIssue({ code: 'custom', path: ['xpThresholds', 0], message: 'The first profession threshold must be zero' });
    }
    profession.xpThresholds.slice(1).forEach((threshold, index) => {
      if (threshold <= profession.xpThresholds[index]!) {
        context.addIssue({ code: 'custom', path: ['xpThresholds', index + 1], message: 'Profession thresholds must increase' });
      }
    });
  });

export const AchievementRewardSchema = z
  .object({
    values: GameplayStatEffectsSchema.optional(),
    relationshipVectors: RelationshipVectorEffectsSchema.optional(),
    professionXp: z.record(GameplayIdSchema, z.number().int().positive()).optional(),
    setFlags: z.array(GameplayIdSchema).optional(),
    grantItems: z.array(GameplayIdSchema).optional(),
    unlockOutfits: z.array(GameplayIdSchema).optional(),
  })
  .strict();

export const AchievementDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    route: RouteIdSchema.optional(),
    label: z.string().min(1),
    description: z.string().min(1),
    eligibility: z.array(StatePredicateSchema).min(1),
    reward: AchievementRewardSchema,
  })
  .strict();

export const WorldbookEntryDefinitionSchema = z
  .object({
    id: GameplayIdSchema,
    claimIds: z.array(GameplayIdSchema),
    constant: z.boolean(),
    selective: z.boolean(),
    content: z.string().min(1),
  })
  .strict();

const GameplaySystemsBaseSchema = z
  .object({
    relationshipTracks: z.array(RelationshipTrackDefinitionSchema),
    quests: z.array(QuestDefinitionSchema),
    battles: z.array(BattleDefinitionSchema),
    items: z.array(ItemDefinitionSchema),
    equipment: z.array(EquipmentDefinitionSchema),
    professions: z.array(ProfessionDefinitionSchema),
    achievements: z.array(AchievementDefinitionSchema),
    outfits: z.array(OutfitDefinitionSchema),
    worldbookEntries: z.array(WorldbookEntryDefinitionSchema),
  })
  .strict();

type IdRecord = { id: string };

function addDuplicateIssues(entries: IdRecord[], group: string, context: z.RefinementCtx): void {
  const ids = new Set<string>();
  entries.forEach((entry, index) => {
    if (ids.has(entry.id)) context.addIssue({ code: 'custom', path: [group, index, 'id'], message: `Duplicate ${group} id: ${entry.id}` });
    ids.add(entry.id);
  });
}

function validateDefinitionReferences(gameplay: z.infer<typeof GameplaySystemsBaseSchema>, context: z.RefinementCtx): void {
  const itemIds = new Set(gameplay.items.map(({ id }) => id));
  gameplay.equipment.forEach((entry, index) => {
    if (!itemIds.has(entry.itemId)) context.addIssue({ code: 'custom', path: ['equipment', index, 'itemId'], message: `Unknown item reference: ${entry.itemId}` });
  });
}

export const GameplaySystemsSchema = GameplaySystemsBaseSchema.superRefine((gameplay, context) => {
  for (const group of ['relationshipTracks', 'quests', 'battles', 'items', 'equipment', 'professions', 'achievements', 'outfits', 'worldbookEntries'] as const) {
    addDuplicateIssues(gameplay[group], group, context);
  }
  validateDefinitionReferences(gameplay, context);
});

export type StoryValueKey = z.infer<typeof StoryValueKeySchema>;
export type RelationshipVectorKey = z.infer<typeof RelationshipVectorKeySchema>;
export type ConflictMasteryKey = z.infer<typeof ConflictMasteryKeySchema>;
export type StatePredicate = z.infer<typeof StatePredicateSchema>;
export type GameplayStatEffects = z.infer<typeof GameplayStatEffectsSchema>;
export type GameplaySystems = z.infer<typeof GameplaySystemsSchema>;
export type BattleResolutionEffect = z.infer<typeof BattleResolutionEffectSchema>;
