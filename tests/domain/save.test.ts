import { describe, expect, it } from 'vitest';

import { migrateSaveV1 } from '../../src/domain/migrate-save-v1';
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
      storyLog: [{ id: 'story-1', title: '进入环指共谋' }],
      storyLogSummaries: [{ id: 'summary-1', summary: '保留条款。' }],
      playerProfile: {
        name: 'Yifan',
        gender: '成年男性',
        appearance: '黑发',
        background: '都市幸存者',
        addressName: '先生',
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
        completedNodeIds: ['ring_accept_terms'],
        currentMapNodeId: 'spider_gallery',
        progressLog: [{ id: 'quest-log', status: 'completed' }],
      },
      unlockedCg: ['opening_rain', 'ring_invitation'],
      logs: {
        history: [{ id: 'history-1', text: '选择已确认' }],
        timeline: [{ id: 'timeline-1', kind: 'choice' }],
        routeActions: [{ id: 'action-1', action: 'counterfeit' }],
        routeActivity: [{ id: 'activity-1', activity: 'gallery' }],
        progressionUnlocks: [{ id: 'unlock-1', targetId: 'ring_guest_list' }],
        story: [{ id: 'story-1', title: '进入环指共谋' }],
        storySummaries: [{ id: 'summary-1', summary: '保留条款。' }],
      },
      playerProfile: { name: 'Yifan', routePreference: 'ring_conspiracy' },
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
