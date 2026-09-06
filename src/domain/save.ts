import { z } from 'zod';

import {
  defaultWorldbookPackageSelection,
  isRuntimeInstallablePackage,
  LayeredWorldbookPresetIdSchema,
  normalizeWorldbookSelection,
} from './layered-worldbooks';
import { createDefaultPlayerProfile, PlayerProfileSchema } from './player-profile';
import { DOMAIN_VERSION, RouteIdSchema, type RouteId } from './scene-cue';
import { MinigameStateSchema } from './minigame';

const NumericVectorSchema = z
  .object({ intimacy: z.number().finite(), reliance: z.number().finite(), obsession: z.number().finite(), suspicion: z.number().finite() })
  .strict();
const RouteEconomySchema = z
  .object({ composure: z.number().finite(), materials: z.number().finite(), leverage: z.number().finite(), exposure: z.number().finite() })
  .strict();
const ConflictMasterySchema = z
  .object({ blade: z.number().finite(), boundary: z.number().finite(), analysis: z.number().finite(), resonance: z.number().finite() })
  .strict();

export const SaveValuesSchema = z
  .object({
    affectionAlbina: z.number().finite(),
    trust: z.number().finite(),
    danger: z.number().finite(),
    artResonance: z.number().finite(),
    relationshipVectors: NumericVectorSchema,
    routeEconomy: RouteEconomySchema,
    conflictMastery: ConflictMasterySchema,
  })
  .strict();

export { PlayerProfileSchema } from './player-profile';

export const InventorySchema = z
  .object({
    ownedIds: z.array(z.string().min(1)),
    equipped: z
      .object({
        weapon: z.string().min(1).optional(),
        armor: z.string().min(1).optional(),
        accessory: z.string().min(1).optional(),
        tool: z.string().min(1).optional(),
      })
      .strict(),
    outfitIds: z.array(z.string().min(1)),
    activeOutfitId: z.string(),
  })
  .strict();

const BattleStateSchema = z
  .object({
    resolvedIds: z.array(z.string().min(1)),
    outcomes: z.record(z.string().min(1), z.enum(['victory', 'setback'])),
  })
  .strict();

const ProfessionProgressSchema = z
  .object({
    xp: z.number().int().nonnegative(),
    level: z.number().int().positive(),
  })
  .strict();

const ProfessionStateSchema = z
  .object({
    activeId: z.string(),
    progress: z.record(z.string().min(1), ProfessionProgressSchema),
  })
  .strict();

const AchievementStateSchema = z
  .object({ unlockedIds: z.array(z.string().min(1)) })
  .strict();

const defaultWorldbookSelection = defaultWorldbookPackageSelection();

export const WorldbookStateSchema = z
  .object({
    activeEntryIds: z.array(z.string().min(1)),
    seenEntryIds: z.array(z.string().min(1)),
    presetId: LayeredWorldbookPresetIdSchema.default(defaultWorldbookSelection.presetId),
    packageIds: z.array(z.string().min(1).refine(isRuntimeInstallablePackage, 'Worldbook package is not runtime-installable.')).optional(),
  })
  .strict()
  .superRefine((state, context) => {
    if (state.presetId === 'neverRuntime') {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['presetId'], message: 'The neverRuntime preset cannot be persisted as an active selection.' });
    }
  })
  .transform((state) => ({
    ...state,
    ...normalizeWorldbookSelection(state.presetId, state.packageIds),
  }));

export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };

function isJsonValue(value: unknown, seen: WeakSet<object>): value is JsonValue {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'object') return false;
  if (seen.has(value)) return false;
  seen.add(value);
  const valid = Array.isArray(value)
    ? value.every((item) => isJsonValue(item, seen))
    : (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)
      && Object.values(value).every((item) => isJsonValue(item, seen));
  seen.delete(value);
  return valid;
}

const LogEntrySchema = z.custom<JsonObject>((value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && isJsonValue(value, new WeakSet());
}, { message: 'Log entries must contain only finite JSON values' });
const LogArraySchema = z.array(LogEntrySchema);

export const SaveLogsSchema = z
  .object({
    history: LogArraySchema,
    timeline: LogArraySchema,
    routeActions: LogArraySchema,
    routeActivity: LogArraySchema,
    progressionUnlocks: LogArraySchema,
    consequences: LogArraySchema,
    routeEvents: LogArraySchema,
    replayAnchors: LogArraySchema,
    routeObjectives: LogArraySchema,
    watchSignals: LogArraySchema,
    narrativeIndex: LogArraySchema,
    openingDrafts: LogArraySchema,
    conflicts: LogArraySchema,
    exchanges: LogArraySchema,
    contacts: LogArraySchema,
    achievements: LogArraySchema,
    realityOverlays: LogArraySchema,
    sceneBranches: LogArraySchema,
    story: LogArraySchema,
    storySummaries: LogArraySchema,
    dynamicMemories: LogArraySchema,
  })
  .strict();

export const SaveV2Schema = z
  .object({
    version: z.literal(DOMAIN_VERSION),
    projectId: z.literal('albina-galgame-card'),
    saveId: z.string().min(1),
    createdAt: z.string().min(1),
    updatedAt: z.string().min(1),
    playerProfile: PlayerProfileSchema,
    route: RouteIdSchema.nullable(),
    chapter: z.number().int().nonnegative(),
    sceneId: z.string().min(1),
    locationId: z.string(),
    values: SaveValuesSchema,
    flags: z.record(z.string().min(1), z.boolean()),
    inventory: InventorySchema,
    quests: z
      .object({
        activeNodeIds: z.array(z.string().min(1)).default([]),
        completedNodeIds: z.array(z.string().min(1)),
        currentMapNodeId: z.string(),
        progressLog: LogArraySchema,
      })
      .strict(),
    battles: BattleStateSchema.default({ resolvedIds: [], outcomes: {} }),
    minigames: MinigameStateSchema.default({ records: {} }),
    professions: ProfessionStateSchema.default({ activeId: '', progress: {} }),
    achievements: AchievementStateSchema.default({ unlockedIds: [] }),
    worldbook: WorldbookStateSchema.default({
      activeEntryIds: [], seenEntryIds: [],
      presetId: defaultWorldbookSelection.presetId,
      packageIds: defaultWorldbookSelection.packageIds,
    }),
    unlockedCg: z.array(z.string().min(1)),
    logs: SaveLogsSchema,
  })
  .strict();

export type SaveV2 = z.infer<typeof SaveV2Schema>;

const DEFAULT_TIMESTAMP = '1970-01-01T00:00:00.000Z';

function createDefaultLogs(): SaveV2['logs'] {
  return {
    history: [], timeline: [], routeActions: [], routeActivity: [], progressionUnlocks: [],
    consequences: [], routeEvents: [], replayAnchors: [], routeObjectives: [], watchSignals: [],
    narrativeIndex: [], openingDrafts: [], conflicts: [], exchanges: [], contacts: [],
    achievements: [], realityOverlays: [], sceneBranches: [], story: [], storySummaries: [], dynamicMemories: [],
  };
}

export function createDefaultSaveV2(): SaveV2 {
  return {
    version: DOMAIN_VERSION,
    projectId: 'albina-galgame-card',
    saveId: 'albina-v2-recovered',
    createdAt: DEFAULT_TIMESTAMP,
    updatedAt: DEFAULT_TIMESTAMP,
    playerProfile: createDefaultPlayerProfile(),
    route: null, chapter: 0, sceneId: 'canon_recap_9_14', locationId: 'lce_research_hallway',
    values: {
      affectionAlbina: 0, trust: 0, danger: 0, artResonance: 0,
      relationshipVectors: { intimacy: 0, reliance: 0, obsession: 0, suspicion: 0 },
      routeEconomy: { composure: 60, materials: 3, leverage: 0, exposure: 0 },
      conflictMastery: { blade: 0, boundary: 0, analysis: 0, resonance: 0 },
    },
    flags: {},
    inventory: { ownedIds: [], equipped: {}, outfitIds: [], activeOutfitId: '' },
    quests: { activeNodeIds: [], completedNodeIds: [], currentMapNodeId: '', progressLog: [] },
    battles: { resolvedIds: [], outcomes: {} },
    minigames: { records: {} },
    professions: {
      activeId: 'narrative_curator',
      progress: {
        narrative_curator: { xp: 0, level: 1 },
        boundary_mediator: { xp: 0, level: 1 },
        memory_surgeon: { xp: 0, level: 1 },
        ring_counterforger: { xp: 0, level: 1 },
      },
    },
    achievements: { unlockedIds: [] },
    worldbook: {
      activeEntryIds: [], seenEntryIds: [],
      presetId: defaultWorldbookSelection.presetId,
      packageIds: [...defaultWorldbookSelection.packageIds],
    },
    unlockedCg: [],
    logs: createDefaultLogs(),
  };
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0).map(([key, item]) => [key, canonicalize(item)]));
  }
  return value;
}

export function serializeSaveV2(input: SaveV2): string {
  return JSON.stringify(canonicalize(SaveV2Schema.parse(input)), null, 2);
}

export function parseSaveV2(input: unknown): SaveV2 {
  return SaveV2Schema.parse(input);
}

export function routeEntrySceneId(route: RouteId): string {
  if (route === 'golden_bough_rebuild') return 'golden_bough_001';
  if (route === 'ring_conspiracy') return 'ring_conspiracy_001';
  return 'white_canvas_001';
}
