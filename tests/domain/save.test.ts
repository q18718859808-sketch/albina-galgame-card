import { describe, expect, it } from 'vitest';

import {
  decodeSaveJson,
  decodeSaveV2OrV1,
  isKnownSaveV1,
  migrateSaveV1,
} from '../../src/domain/migrate-save-v1';
import {
  SaveV2Schema,
  createDefaultSaveV2,
  serializeSaveV2,
} from '../../src/domain/save';

describe('migrateSaveV1', () => {
  it('preserves v1.0.44 route, scene, values, collections, logs, and player profile', () => {
    const migrated = migrateSaveV1({
      schemaVersion: 10,
      projectId: 'albina-galgame-card',
      saveId: 'legacy-save',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-02T00:00:00.000Z',
      route: 'ring_conspiracy',
      chapter: 9,
      sceneId: 'ring_conspiracy_009',
      locationId: 'spider_gallery',
      affection: { albina: 47 },
      trust: 31,
      danger: 62,
      artResonance: 55,
      relationshipVectors: { intimacy: 47, reliance: 31, obsession: 71, suspicion: 54 },
      routeEconomy: { composure: 45, materials: 7, leverage: 3, exposure: 9 },
      conflictMastery: { blade: 2, boundary: 4, analysis: 6, resonance: 8 },
      clearedConflictIds: ['ring_contract_enforcer'],
      unlockedAchievementIds: ['ach_ring_counter_clause'],
      activeProfessionId: 'ring_counterforger',
      professionProgress: { ring_counterforger: { id: 'ring_counterforger', xp: 17, level: 2 } },
      worldbookMemory: { records: [{ id: 'albina_routes_endings_au_if' }] },
      flags: { met_albina: true, signed_contract: true },
      inventoryItemIds: ['ring_guest_list', 'fascia_fragment'],
      equippedItemIds: { weapon: 'fascia_fragment', tool: 'ring_guest_list' },
      wardrobeOutfitIds: ['albina_raincoat'],
      activeWardrobeOutfitId: 'albina_raincoat',
      completedQuestNodeIds: ['ring_accept_terms'],
      currentMapNodeId: 'spider_gallery',
      questProgressLog: [{ id: 'quest-log', status: 'completed' }],
      unlockedCg: ['opening_rain', 'ring_invitation'],
      history: [{ id: 'history-1', text: '选择已确认' }],
      timeline: [{ id: 'timeline-1', kind: 'choice' }],
      routeActionLog: [{ id: 'action-1', action: 'counterfeit' }],
      routeActivityLog: [{ id: 'activity-1', activity: 'gallery' }],
      progressionUnlockLog: [{ id: 'unlock-1', targetId: 'ring_guest_list' }],
      routeObjectives: [{ id: 'ring-survive', status: 'completed', progress: 3, target: 3 }],
      watchSignals: [{ id: 'watch-danger', level: 'warning', pressure: 62 }],
      narrativeIndex: [{ title: 'Ring Conspiracy', coverage: 7, total: 10 }],
      openingDrafts: [{ id: 'draft-1', status: 'confirmed', constraints: ['consent'] }],
      storyLog: [{ id: 'story-1', title: '进入环指共谋' }],
      storyLogSummaries: [{ id: 'summary-1', summary: '保留条款。' }],
      playerProfile: {
        name: 'Yifan',
        gender: '成年男性',
        appearance: '黑发',
        background: '都市幸存者',
        addressName: '先生',
        initialRelationship: '谨慎结识',
        boundaries: '明确同意',
        routePreference: 'ring_conspiracy',
      },
      injectedAuthority: { trust: 999 },
    });

    expect(migrated).toMatchObject({
      version: 2,
      saveId: 'legacy-save',
      route: 'ring_conspiracy',
      sceneId: 'ring_conspiracy_009',
      chapter: 9,
      locationId: 'spider_gallery',
      values: {
        affectionAlbina: 47,
        trust: 31,
        danger: 62,
        artResonance: 55,
        relationshipVectors: { intimacy: 47, reliance: 31, obsession: 71, suspicion: 54 },
        routeEconomy: { composure: 45, materials: 7, leverage: 3, exposure: 9 },
        conflictMastery: { blade: 2, boundary: 4, analysis: 6, resonance: 8 },
      },
      inventory: {
        ownedIds: ['ring_guest_list', 'fascia_fragment'],
        equipped: { weapon: 'fascia_fragment', tool: 'ring_guest_list' },
        outfitIds: ['albina_raincoat'],
        activeOutfitId: 'albina_raincoat',
      },
      quests: {
        activeNodeIds: [],
        completedNodeIds: ['ring_accept_terms'],
        currentMapNodeId: 'spider_gallery',
        progressLog: [{ id: 'quest-log', status: 'completed' }],
      },
      battles: {
        resolvedIds: ['ring_contract_enforcer'],
        outcomes: { ring_contract_enforcer: 'victory' },
      },
      professions: {
        activeId: 'ring_counterforger',
        progress: { ring_counterforger: { xp: 17, level: 2 } },
      },
      achievements: { unlockedIds: ['ach_ring_counter_clause'] },
      worldbook: { activeEntryIds: [], seenEntryIds: ['albina_routes_endings_au_if'] },
      unlockedCg: ['opening_rain', 'ring_invitation'],
      logs: {
        history: [{ id: 'history-1', text: '选择已确认' }],
        timeline: [{ id: 'timeline-1', kind: 'choice' }],
        routeActions: [{ id: 'action-1', action: 'counterfeit' }],
        routeActivity: [{ id: 'activity-1', activity: 'gallery' }],
        progressionUnlocks: [{ id: 'unlock-1', targetId: 'ring_guest_list' }],
        routeObjectives: [{ id: 'ring-survive', status: 'completed', progress: 3, target: 3 }],
        watchSignals: [{ id: 'watch-danger', level: 'warning', pressure: 62 }],
        narrativeIndex: [{ title: 'Ring Conspiracy', coverage: 7, total: 10 }],
        openingDrafts: [{ id: 'draft-1', status: 'confirmed', constraints: ['consent'] }],
        story: [{ id: 'story-1', title: '进入环指共谋' }],
        storySummaries: [{ id: 'summary-1', summary: '保留条款。' }],
      },
      playerProfile: { name: 'Yifan', initialRelationship: '谨慎结识', routePreference: 'ring_conspiracy' },
    });
    expect('injectedAuthority' in migrated).toBe(false);
    expect(SaveV2Schema.parse(migrated)).toEqual(migrated);
  });

  it('recovers safely from damaged input without passing unknown state through', () => {
    const migrated = migrateSaveV1({
      schemaVersion: 10,
      route: 'not-a-route',
      sceneId: 42,
      trust: Number.NaN,
      inventoryItemIds: ['valid', 12, 'valid'],
      completedQuestNodeIds: null,
      unlockedCg: ['opening_rain', {}, 'opening_rain'],
      playerProfile: { name: 123, routePreference: 'not-a-route', admin: true },
      unknownState: { route: 'ring_conspiracy' },
    });

    expect(migrated).toEqual({
      ...createDefaultSaveV2(),
      inventory: { ...createDefaultSaveV2().inventory, ownedIds: ['valid'] },
      unlockedCg: ['opening_rain'],
    });
  });

  it('does not throw when damaged input cannot be inspected', () => {
    const hostile = new Proxy({}, {
      ownKeys() {
        throw new Error('corrupt proxy');
      },
    });

    expect(() => migrateSaveV1(hostile)).not.toThrow();
    expect(migrateSaveV1(hostile)).toEqual(createDefaultSaveV2());
  });
});

describe('SaveV2 serialization', () => {
  it('rejects wrong versions and unknown authoritative state', () => {
    const save = createDefaultSaveV2();
    expect(() => SaveV2Schema.parse({ ...save, version: 1 })).toThrow();
    expect(() => SaveV2Schema.parse({ ...save, godMode: true })).toThrow();
  });

  it('serializes equivalent saves deterministically', () => {
    const first = createDefaultSaveV2();
    first.flags = { zeta: true, alpha: false };
    first.inventory.equipped = { tool: 'lens', weapon: 'fascia' };

    const second = createDefaultSaveV2();
    second.flags = { alpha: false, zeta: true };
    second.inventory.equipped = { weapon: 'fascia', tool: 'lens' };

    expect(serializeSaveV2(first)).toBe(serializeSaveV2(second));
  });

  it('upgrades early SaveV2 payloads with deterministic gameplay-state defaults', () => {
    const current = createDefaultSaveV2();
    const early = structuredClone(current) as Partial<typeof current>;
    delete early.battles;
    delete early.professions;
    delete early.achievements;
    delete early.worldbook;
    if (early.quests) delete (early.quests as Partial<typeof current.quests>).activeNodeIds;

    expect(SaveV2Schema.parse(early)).toMatchObject({
      quests: { activeNodeIds: [] },
      battles: { resolvedIds: [], outcomes: {} },
      professions: { activeId: '', progress: {} },
      achievements: { unlockedIds: [] },
      worldbook: { activeEntryIds: [], seenEntryIds: [] },
    });
  });

  it('rejects non-JSON log state before serialization', () => {
    const invalidValues: unknown[] = [BigInt(1), Number.NaN, new Date(), () => undefined];
    for (const value of invalidValues) {
      const save = createDefaultSaveV2() as unknown as Record<string, unknown>;
      (save.logs as Record<string, unknown>).history = [{ value }];
      expect(() => SaveV2Schema.parse(save)).toThrow();
    }

    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    const save = createDefaultSaveV2() as unknown as Record<string, unknown>;
    (save.logs as Record<string, unknown>).history = [cycle];
    expect(() => serializeSaveV2(save as never)).toThrow();
  });
});

describe('safe save decoding', () => {
  it('accepts SaveV2 before considering legacy migration', () => {
    const save = createDefaultSaveV2();
    save.saveId = 'current-save';

    expect(decodeSaveV2OrV1(save)).toEqual({ ok: true, save, source: 'v2' });
  });

  it('recognizes only the Albina v1.0.44 schema marker for migration', () => {
    const legacy = {
      schemaVersion: 10,
      projectId: 'albina-galgame-card',
      saveId: 'legacy-decoded',
      sceneId: 'white_canvas_004',
      route: 'white_canvas',
      trust: 17,
    };

    expect(isKnownSaveV1(legacy)).toBe(true);
    expect(decodeSaveV2OrV1(legacy)).toMatchObject({
      ok: true,
      source: 'v1.0.44',
      save: { saveId: 'legacy-decoded', sceneId: 'white_canvas_004', values: { trust: 17 } },
    });
    expect(isKnownSaveV1({ ...legacy, schemaVersion: 9 })).toBe(false);
    expect(isKnownSaveV1({ ...legacy, projectId: 'another-project' })).toBe(false);
  });

  it.each([
    [{ arbitrary: true }, 'unknown-format'],
    [{ ...createDefaultSaveV2(), values: undefined }, 'invalid-v2'],
    [{ version: 3, projectId: 'albina-galgame-card' }, 'unsupported-version'],
    [{ schemaVersion: 11, projectId: 'albina-galgame-card' }, 'unsupported-version'],
  ] as const)('returns a recoverable error for unsupported input %#', (input, code) => {
    expect(decodeSaveV2OrV1(input)).toMatchObject({ ok: false, error: { code, recoverable: true } });
  });

  it('distinguishes malformed JSON from an unknown JSON save format', () => {
    expect(decodeSaveJson('{')).toMatchObject({ ok: false, error: { code: 'invalid-json' } });
    expect(decodeSaveJson('{"unrelated":true}')).toMatchObject({ ok: false, error: { code: 'unknown-format' } });
  });
});
