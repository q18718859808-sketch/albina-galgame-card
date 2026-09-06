import { z } from 'zod';

import { RouteIdSchema } from './scene-cue-route';

const GameplayStatEffectsSchema = z
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

const RelationshipVectorEffectsSchema = z
  .object({
    intimacy: z.number().finite().optional(),
    reliance: z.number().finite().optional(),
    obsession: z.number().finite().optional(),
    suspicion: z.number().finite().optional(),
  })
  .strict();

const ConflictMasteryEffectsSchema = z
  .object({
    blade: z.number().finite().optional(),
    boundary: z.number().finite().optional(),
    analysis: z.number().finite().optional(),
    resonance: z.number().finite().optional(),
  })
  .strict();

const ProgressionEffectsSchema = z
  .object({
    values: GameplayStatEffectsSchema.optional(),
    relationshipVectors: RelationshipVectorEffectsSchema.optional(),
    conflictMastery: ConflictMasteryEffectsSchema.optional(),
    setFlags: z.array(z.string().min(1)).optional(),
    clearFlags: z.array(z.string().min(1)).optional(),
    unlockCg: z.array(z.string().min(1)).optional(),
    grantItems: z.array(z.string().min(1)).optional(),
    equipItems: z.array(z.string().min(1)).optional(),
    unlockOutfits: z.array(z.string().min(1)).optional(),
    activateOutfit: z.string().min(1).optional(),
    startQuests: z.array(z.string().min(1)).optional(),
    completeQuests: z.array(z.string().min(1)).optional(),
    resolveBattles: z.array(z.object({ battleId: z.string().min(1), outcome: z.enum(['victory', 'setback']) }).strict()).optional(),
    professionXp: z.record(z.string().min(1), z.number().int().positive()).optional(),
    activateProfession: z.string().min(1).optional(),
  })
  .strict();

const MinigameIdSchema = z.string().min(1);
const PuzzleIdSchema = z.string().min(1);

export const MinigameKindSchema = z.enum([
  'mirror_thread',
  'testimony_cipher',
  'boundary_resonance',
]);

export const MinigameOutcomeSchema = z.enum([
  'perfect',
  'assisted',
  'setback',
  'skipped',
]);

export const MinigameRecordSchema = z
  .object({
    attempts: z.number().int().nonnegative(),
    resolved: z.boolean(),
    completed: z.boolean(),
    rewardClaimed: z.boolean(),
    bestOutcome: MinigameOutcomeSchema.optional(),
    lastOutcome: MinigameOutcomeSchema.optional(),
    bestScore: z.number().int().min(0).max(100),
    assisted: z.boolean(),
    seed: z.string().min(1).optional(),
    resolvedAt: z.string().min(1).optional(),
  })
  .strict();

export const MinigameStateSchema = z
  .object({
    records: z.record(MinigameIdSchema, MinigameRecordSchema),
  })
  .strict();

const PuzzleAnchorSchema = z
  .object({
    id: PuzzleIdSchema,
    label: z.string().min(1),
    description: z.string().min(1),
  })
  .strict();

const MirrorThreadPuzzleSchema = z
  .object({
    kind: z.literal('mirror_thread'),
    anchors: z.array(PuzzleAnchorSchema).min(2),
    correctPair: z.tuple([PuzzleIdSchema, PuzzleIdSchema]),
  })
  .strict()
  .superRefine((puzzle, context) => {
    const ids = new Set(puzzle.anchors.map(({ id }) => id));
    if (puzzle.correctPair[0] === puzzle.correctPair[1]) {
      context.addIssue({ code: 'custom', path: ['correctPair'], message: 'Mirror thread targets must be distinct.' });
    }
    puzzle.correctPair.forEach((id, index) => {
      if (!ids.has(id)) context.addIssue({ code: 'custom', path: ['correctPair', index], message: `Unknown mirror anchor: ${id}` });
    });
  });

const TestimonyFragmentSchema = z
  .object({
    id: PuzzleIdSchema,
    text: z.string().min(1),
  })
  .strict();

const TestimonyCipherPuzzleSchema = z
  .object({
    kind: z.literal('testimony_cipher'),
    fragments: z.array(TestimonyFragmentSchema).min(2),
    solutionOrder: z.array(PuzzleIdSchema).min(2),
  })
  .strict()
  .superRefine((puzzle, context) => {
    const ids = new Set(puzzle.fragments.map(({ id }) => id));
    if (new Set(puzzle.solutionOrder).size !== puzzle.solutionOrder.length) {
      context.addIssue({ code: 'custom', path: ['solutionOrder'], message: 'Cipher solution order may not repeat fragments.' });
    }
    puzzle.solutionOrder.forEach((id, index) => {
      if (!ids.has(id)) context.addIssue({ code: 'custom', path: ['solutionOrder', index], message: `Unknown testimony fragment: ${id}` });
    });
  });

const ResonanceNodeSchema = z
  .object({
    id: PuzzleIdSchema,
    label: z.string().min(1),
  })
  .strict();

const BoundaryResonancePuzzleSchema = z
  .object({
    kind: z.literal('boundary_resonance'),
    nodes: z.array(ResonanceNodeSchema).min(2),
    targetActiveIds: z.array(PuzzleIdSchema).min(1),
  })
  .strict()
  .superRefine((puzzle, context) => {
    const ids = new Set(puzzle.nodes.map(({ id }) => id));
    if (new Set(puzzle.targetActiveIds).size !== puzzle.targetActiveIds.length) {
      context.addIssue({ code: 'custom', path: ['targetActiveIds'], message: 'Resonance targets may not repeat nodes.' });
    }
    puzzle.targetActiveIds.forEach((id, index) => {
      if (!ids.has(id)) context.addIssue({ code: 'custom', path: ['targetActiveIds', index], message: `Unknown resonance node: ${id}` });
    });
  });

export const MinigamePuzzleSchema = z.discriminatedUnion('kind', [
  MirrorThreadPuzzleSchema,
  TestimonyCipherPuzzleSchema,
  BoundaryResonancePuzzleSchema,
]);

export const MinigameOutcomeEffectsSchema = z
  .object({
    perfect: ProgressionEffectsSchema,
    assisted: ProgressionEffectsSchema,
    setback: ProgressionEffectsSchema,
    skipped: ProgressionEffectsSchema,
  })
  .strict();

export const MinigameDefinitionSchema = z
  .object({
    id: MinigameIdSchema,
    route: RouteIdSchema.optional(),
    label: z.string().min(1),
    description: z.string().min(1),
    puzzle: MinigamePuzzleSchema,
    outcomes: MinigameOutcomeEffectsSchema,
  })
  .strict();

export const SceneMinigameChallengeSchema = z
  .object({
    minigameId: MinigameIdSchema,
    seed: z.string().min(1),
    prompt: z.string().min(1),
    assistLabel: z.string().min(1),
    allowSkip: z.boolean(),
  })
  .strict();

export const MinigameAttemptSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('mirror_thread'), selectedAnchorIds: z.array(PuzzleIdSchema).length(2), assisted: z.boolean() }).strict(),
  z.object({ kind: z.literal('testimony_cipher'), orderedFragmentIds: z.array(PuzzleIdSchema).min(1), assisted: z.boolean() }).strict(),
  z.object({ kind: z.literal('boundary_resonance'), activeNodeIds: z.array(PuzzleIdSchema), assisted: z.boolean() }).strict(),
  z.object({ kind: z.literal('skip'), assisted: z.literal(true) }).strict(),
]);

export type MinigameDefinition = z.infer<typeof MinigameDefinitionSchema>;
export type MinigameOutcome = z.infer<typeof MinigameOutcomeSchema>;
export type MinigameRecord = z.infer<typeof MinigameRecordSchema>;
export type SceneMinigameChallenge = z.infer<typeof SceneMinigameChallengeSchema>;
export type MinigameAttempt = z.infer<typeof MinigameAttemptSchema>;

export interface MinigameResolution {
  outcome: MinigameOutcome;
  score: number;
  assisted: boolean;
}

const OUTCOME_WEIGHT: Record<MinigameOutcome, number> = {
  skipped: 0,
  setback: 1,
  assisted: 2,
  perfect: 3,
};

export function isBetterMinigameOutcome(
  candidate: MinigameOutcome,
  existing: MinigameOutcome | undefined,
): boolean {
  return existing === undefined || OUTCOME_WEIGHT[candidate] > OUTCOME_WEIGHT[existing];
}

function sameSet(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((id) => right.includes(id));
}

function sameOrder(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((id, index) => right[index] === id);
}

export function resolveMinigameAttempt(
  definition: MinigameDefinition,
  challenge: SceneMinigameChallenge,
  input: unknown,
): MinigameResolution {
  const attempt = MinigameAttemptSchema.parse(input);
  if (attempt.kind === 'skip') {
    if (!challenge.allowSkip) throw new Error(`Skipping is unavailable for minigame: ${definition.id}`);
    return { outcome: 'skipped', score: 0, assisted: true };
  }
  if (attempt.kind !== definition.puzzle.kind) {
    throw new Error(`Attempt kind does not match minigame: ${definition.id}`);
  }

  let correct = false;
  if (definition.puzzle.kind === 'mirror_thread' && attempt.kind === 'mirror_thread') {
    correct = sameSet(attempt.selectedAnchorIds, definition.puzzle.correctPair);
  } else if (definition.puzzle.kind === 'testimony_cipher' && attempt.kind === 'testimony_cipher') {
    correct = sameOrder(attempt.orderedFragmentIds, definition.puzzle.solutionOrder);
  } else if (definition.puzzle.kind === 'boundary_resonance' && attempt.kind === 'boundary_resonance') {
    correct = sameSet(attempt.activeNodeIds, definition.puzzle.targetActiveIds);
  }

  if (!correct) return { outcome: 'setback', score: 0, assisted: attempt.assisted };
  return attempt.assisted
    ? { outcome: 'assisted', score: 60, assisted: true }
    : { outcome: 'perfect', score: 100, assisted: false };
}

/** Stable, local ordering only. The authored solution is never randomized. */
export function seededOrder<T extends { id: string }>(entries: readonly T[], seed: string): T[] {
  let value = 2166136261;
  for (const character of seed) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  const next = () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
  const ordered = [...entries];
  for (let index = ordered.length - 1; index > 0; index -= 1) {
    const target = Math.floor(next() * (index + 1));
    const current = ordered[index];
    ordered[index] = ordered[target]!;
    ordered[target] = current!;
  }
  return ordered;
}

export const MinigameEffectSchemas = {
  values: GameplayStatEffectsSchema,
  relationshipVectors: RelationshipVectorEffectsSchema,
  conflictMastery: ConflictMasteryEffectsSchema,
} as const;
