import { RouteIdSchema, type RouteId } from './scene-cue';
import {
  SaveV2Schema,
  createDefaultSaveV2,
  type JsonObject,
  type JsonValue,
  type SaveV2,
} from './save';

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | undefined {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null ? value as UnknownRecord : undefined;
}

function finiteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

function stringIds(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) return [...fallback];
  return [...new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0))];
}

function sanitizeJson(value: unknown, seen: WeakSet<object>): JsonValue | undefined {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (Array.isArray(value)) return value.map((item) => sanitizeJson(item, seen)).filter((item) => item !== undefined);
  const record = asRecord(value);
  if (!record || seen.has(record)) return undefined;
  seen.add(record);
  const entries = Object.entries(record).sort(([left], [right]) => left.localeCompare(right));
  const sanitized: JsonObject = {};
  for (const [key, item] of entries) {
    const jsonValue = sanitizeJson(item, seen);
    if (jsonValue !== undefined) sanitized[key] = jsonValue;
  }
  seen.delete(record);
  return sanitized;
}

function isJsonObject(value: JsonValue | undefined): value is JsonObject {
  return value !== undefined && value !== null && typeof value === 'object' && !Array.isArray(value);
}

function logEntries(value: unknown): JsonObject[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => sanitizeJson(entry, new WeakSet())).filter(isJsonObject);
}

function inferRoute(value: unknown, sceneId: unknown): RouteId {
  const parsed = RouteIdSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  if (typeof sceneId === 'string' && sceneId.startsWith('golden_bough_')) return 'golden_bough_rebuild';
  if (typeof sceneId === 'string' && sceneId.startsWith('ring_conspiracy_')) return 'ring_conspiracy';
  return 'white_canvas';
}

function migrateProfile(record: UnknownRecord, route: RouteId, defaults: SaveV2['playerProfile']): SaveV2['playerProfile'] {
  const source = asRecord(record.playerProfile) ?? {};
  const preferredRoute = RouteIdSchema.safeParse(source.routePreference);
  return {
    name: stringValue(source.name, defaults.name),
    gender: stringValue(source.gender, defaults.gender),
    appearance: stringValue(source.appearance, defaults.appearance),
    background: stringValue(source.background, defaults.background),
    addressName: stringValue(source.addressName, defaults.addressName),
    boundaries: stringValue(source.boundaries, defaults.boundaries),
    routePreference: preferredRoute.success ? preferredRoute.data : route,
  };
}

function migrateValues(record: UnknownRecord, defaults: SaveV2['values']): SaveV2['values'] {
  const affection = asRecord(record.affection) ?? {};
  const vectors = asRecord(record.relationshipVectors) ?? {};
  const economy = asRecord(record.routeEconomy) ?? {};
  const mastery = asRecord(record.conflictMastery) ?? {};
  return {
    affectionAlbina: finiteNumber(affection.albina, defaults.affectionAlbina),
    trust: finiteNumber(record.trust, defaults.trust),
    danger: finiteNumber(record.danger, defaults.danger),
    artResonance: finiteNumber(record.artResonance, defaults.artResonance),
    relationshipVectors: {
      intimacy: finiteNumber(vectors.intimacy, defaults.relationshipVectors.intimacy),
      reliance: finiteNumber(vectors.reliance, defaults.relationshipVectors.reliance),
      obsession: finiteNumber(vectors.obsession, defaults.relationshipVectors.obsession),
      suspicion: finiteNumber(vectors.suspicion, defaults.relationshipVectors.suspicion),
    },
    routeEconomy: {
      composure: finiteNumber(economy.composure, defaults.routeEconomy.composure),
      materials: finiteNumber(economy.materials, defaults.routeEconomy.materials),
      leverage: finiteNumber(economy.leverage, defaults.routeEconomy.leverage),
      exposure: finiteNumber(economy.exposure, defaults.routeEconomy.exposure),
    },
    conflictMastery: {
      blade: finiteNumber(mastery.blade, defaults.conflictMastery.blade),
      boundary: finiteNumber(mastery.boundary, defaults.conflictMastery.boundary),
      analysis: finiteNumber(mastery.analysis, defaults.conflictMastery.analysis),
      resonance: finiteNumber(mastery.resonance, defaults.conflictMastery.resonance),
    },
  };
}

function migrateEquipped(value: unknown): SaveV2['inventory']['equipped'] {
  const record = asRecord(value) ?? {};
  const equipped: SaveV2['inventory']['equipped'] = {};
  for (const slot of ['weapon', 'armor', 'accessory', 'tool'] as const) {
    if (typeof record[slot] === 'string' && record[slot].length > 0) equipped[slot] = record[slot];
  }
  return equipped;
}

function migrateFlags(value: unknown, fallback: SaveV2['flags']): SaveV2['flags'] {
  const record = asRecord(value);
  if (!record) return { ...fallback };
  return Object.fromEntries(Object.entries(record).filter((entry): entry is [string, boolean] => entry[0].length > 0 && typeof entry[1] === 'boolean'));
}

function migrateLogs(record: UnknownRecord): SaveV2['logs'] {
  return {
    history: logEntries(record.history), timeline: logEntries(record.timeline),
    routeActions: logEntries(record.routeActionLog), routeActivity: logEntries(record.routeActivityLog),
    progressionUnlocks: logEntries(record.progressionUnlockLog), consequences: logEntries(record.consequences),
    routeEvents: logEntries(record.routeEvents), replayAnchors: logEntries(record.replayAnchors),
    conflicts: logEntries(record.conflictResolutionLog), exchanges: logEntries(record.exchangeLog),
    contacts: logEntries(record.contactLog), achievements: logEntries(record.achievementLog),
    realityOverlays: logEntries(record.realityOverlayLog), sceneBranches: logEntries(record.sceneBranchLog),
    story: logEntries(record.storyLog), storySummaries: logEntries(record.storyLogSummaries),
    dynamicMemories: logEntries(record.dynamicMemories),
  };
}

function migrateRecord(record: UnknownRecord): SaveV2 {
  const defaults = createDefaultSaveV2();
  if (typeof record.schemaVersion === 'number' && record.schemaVersion > 10) return defaults;
  const route = inferRoute(record.route, record.sceneId);
  const sceneId = typeof record.sceneId === 'string' && record.sceneId.length > 0 ? record.sceneId : defaults.sceneId;
  return SaveV2Schema.parse({
    ...defaults,
    saveId: stringValue(record.saveId, defaults.saveId),
    createdAt: stringValue(record.createdAt, defaults.createdAt),
    updatedAt: stringValue(record.updatedAt, defaults.updatedAt),
    playerProfile: migrateProfile(record, route, defaults.playerProfile),
    route,
    chapter: typeof record.chapter === 'number' && Number.isInteger(record.chapter) && record.chapter >= 0 ? record.chapter : defaults.chapter,
    sceneId,
    locationId: stringValue(record.locationId, defaults.locationId),
    values: migrateValues(record, defaults.values),
    flags: migrateFlags(record.flags, defaults.flags),
    inventory: {
      ownedIds: stringIds(record.inventoryItemIds), equipped: migrateEquipped(record.equippedItemIds),
      outfitIds: stringIds(record.wardrobeOutfitIds), activeOutfitId: stringValue(record.activeWardrobeOutfitId, ''),
    },
    quests: {
      completedNodeIds: stringIds(record.completedQuestNodeIds),
      currentMapNodeId: stringValue(record.currentMapNodeId, ''), progressLog: logEntries(record.questProgressLog),
    },
    unlockedCg: stringIds(record.unlockedCg, defaults.unlockedCg),
    logs: migrateLogs(record),
  });
}

export function migrateSaveV1(input: unknown): SaveV2 {
  try {
    const existing = SaveV2Schema.safeParse(input);
    if (existing.success) return existing.data;
    const record = asRecord(input);
    return record ? migrateRecord(record) : createDefaultSaveV2();
  } catch {
    return createDefaultSaveV2();
  }
}
