import { z } from 'zod';

import { SceneProvenanceSchema } from './canon';

export const DOMAIN_VERSION = 2 as const;

export const RouteIdSchema = z.enum([
  'white_canvas',
  'golden_bough_rebuild',
  'ring_conspiracy',
]);

export const AuthoritativeValueEffectsSchema = z
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

export const ChoiceEffectsSchema = z
  .object({
    route: RouteIdSchema.optional(),
    values: AuthoritativeValueEffectsSchema.optional(),
    setFlags: z.array(z.string().min(1)).optional(),
    clearFlags: z.array(z.string().min(1)).optional(),
    unlockCg: z.array(z.string().min(1)).optional(),
    grantItems: z.array(z.string().min(1)).optional(),
    completeQuests: z.array(z.string().min(1)).optional(),
  })
  .strict();

export const StoryValueKeySchema = z.enum([
  'affectionAlbina',
  'trust',
  'danger',
  'artResonance',
]);

export const EligibilityPredicateSchema = z.discriminatedUnion('kind', [
  z
    .object({
      kind: z.literal('value'),
      key: StoryValueKeySchema,
      operator: z.enum(['gte', 'lte', 'eq']),
      value: z.number().finite(),
    })
    .strict(),
  z
    .object({
      kind: z.literal('flag'),
      flag: z.string().min(1),
      equals: z.boolean(),
    })
    .strict(),
]);

export const ChoiceAvailabilitySchema = z
  .object({
    allOf: z.array(EligibilityPredicateSchema).min(1).optional(),
    anyOf: z.array(EligibilityPredicateSchema).min(1).optional(),
    fallback: z.boolean().optional(),
  })
  .strict()
  .refine((condition) => condition.allOf || condition.anyOf || condition.fallback === true, {
    message: 'Choice availability must declare predicates or a fallback',
  });

export const EndingDescriptorSchema = z
  .object({
    route: RouteIdSchema,
    kind: z.enum(['true', 'normal', 'bad']),
    eligibility: ChoiceAvailabilitySchema,
  })
  .strict();

export const SceneChoiceSchema = z
  .object({
    id: z.string().min(1),
    text: z.string().min(1),
    nextSceneId: z.string().min(1),
    resultText: z.string().min(1).optional(),
    resultVoiceAssetId: z.string().min(1).optional(),
    availability: ChoiceAvailabilitySchema.optional(),
    effects: ChoiceEffectsSchema,
  })
  .strict();

export const PortraitCueSchema = z
  .object({
    characterId: z.string().min(1),
    portraitAssetId: z.string().min(1),
    position: z.enum(['far-left', 'left', 'center', 'right', 'far-right']),
    active: z.boolean(),
    scale: z.number().positive().finite(),
  })
  .strict();

const SceneCueBaseSchema = z
  .object({
    version: z.literal(DOMAIN_VERSION),
    id: z.string().min(1),
    chapter: z.number().int().nonnegative(),
    route: RouteIdSchema.nullable(),
    provenance: SceneProvenanceSchema,
    locationId: z.string().min(1),
    backgroundAssetId: z.string().min(1),
    cgAssetId: z.string().min(1).optional(),
    videoAssetId: z.string().min(1).optional(),
    desktopVideoAssetId: z.string().min(1).optional(),
    tone: z.string().min(1),
    portraits: z.array(PortraitCueSchema),
    speaker: z.string().min(1),
    text: z.string(),
    voiceAssetId: z.string().min(1).optional(),
    bgmAssetId: z.string().min(1).optional(),
    sfxAssetIds: z.array(z.string().min(1)).optional(),
    choices: z.array(SceneChoiceSchema),
    ending: EndingDescriptorSchema.optional(),
  })
  .strict();

export const SceneCueSchema = SceneCueBaseSchema.superRefine((scene, context) => {
  if (scene.provenance.scope !== 'route' && scene.route !== null) {
    context.addIssue({ code: 'custom', path: ['route'], message: 'Canon recap and AU boundary scenes must use a null route' });
  }
  if (scene.provenance.scope === 'route' && scene.route === null) {
    context.addIssue({ code: 'custom', path: ['route'], message: 'Only canon recap and AU boundary scenes may use a null route' });
  }
});

export type RouteId = z.infer<typeof RouteIdSchema>;
export type ChoiceEffects = z.infer<typeof ChoiceEffectsSchema>;
export type EligibilityPredicate = z.infer<typeof EligibilityPredicateSchema>;
export type ChoiceAvailability = z.infer<typeof ChoiceAvailabilitySchema>;
export type EndingDescriptor = z.infer<typeof EndingDescriptorSchema>;
export type SceneChoice = z.infer<typeof SceneChoiceSchema>;
export type PortraitCue = z.infer<typeof PortraitCueSchema>;
export type SceneCue = z.infer<typeof SceneCueSchema>;

export function parseSceneCue(input: unknown): SceneCue {
  return SceneCueSchema.parse(input);
}
