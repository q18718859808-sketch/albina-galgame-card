import type { GameScriptV2 } from '../domain/game-script';
import type {
  GameplayStatEffects,
  StatePredicate,
  StoryValueKey,
} from '../domain/gameplay';
import type { SaveV2 } from '../domain/save';
import type { ChoiceEffects, SceneCue } from '../domain/scene-cue';

const STORY_VALUE_KEYS = ['affectionAlbina', 'trust', 'danger', 'artResonance'] as const;
const ECONOMY_KEYS = ['composure', 'materials', 'leverage', 'exposure'] as const;

function clamp(value: number, minimum = 0, maximum = 100): number {
  return Math.max(minimum, Math.min(maximum, value));
}

function addUnique(target: string[], ids: readonly string[]): void {
  ids.forEach((id) => { if (!target.includes(id)) target.push(id); });
}

function applyStatEffects(save: SaveV2, effects: GameplayStatEffects | undefined): void {
  if (!effects) return;
  STORY_VALUE_KEYS.forEach((key) => {
    const delta = effects[key];
    if (delta !== undefined) save.values[key] = clamp(save.values[key] + delta);
  });
  ECONOMY_KEYS.forEach((key) => {
    const delta = effects[key];
    if (delta === undefined) return;
    const maximum = key === 'materials' ? 12 : 100;
    save.values.routeEconomy[key] = clamp(save.values.routeEconomy[key] + delta, 0, maximum);
  });
}

function applyRelationshipEffects(script: GameScriptV2, save: SaveV2, effects: ChoiceEffects['relationshipVectors']): void {
  if (!effects) return;
  script.gameplay.relationshipTracks.forEach((track) => {
    const delta = effects[track.id];
    if (delta !== undefined) {
      save.values.relationshipVectors[track.id] = clamp(save.values.relationshipVectors[track.id] + delta, track.minimum, track.maximum);
    }
  });
}

function applyMasteryEffects(save: SaveV2, effects: ChoiceEffects['conflictMastery']): void {
  if (!effects) return;
  for (const key of ['blade', 'boundary', 'analysis', 'resonance'] as const) {
    const delta = effects[key];
    if (delta !== undefined) save.values.conflictMastery[key] = clamp(save.values.conflictMastery[key] + delta, 0, 99);
  }
}

function applyFlags(save: SaveV2, effects: ChoiceEffects): void {
  effects.setFlags?.forEach((flag) => { save.flags[flag] = true; });
  effects.clearFlags?.forEach((flag) => { save.flags[flag] = false; });
}

function startQuests(save: SaveV2, questIds: readonly string[], at: string): void {
  questIds.forEach((questId) => {
    if (save.quests.completedNodeIds.includes(questId) || save.quests.activeNodeIds.includes(questId)) return;
    save.quests.activeNodeIds.push(questId);
    save.quests.currentMapNodeId = questId;
    save.quests.progressLog.push({ questId, status: 'active', at });
  });
}

function completeQuests(save: SaveV2, questIds: readonly string[], at: string): void {
  questIds.forEach((questId) => {
    save.quests.activeNodeIds = save.quests.activeNodeIds.filter((id) => id !== questId);
    if (!save.quests.completedNodeIds.includes(questId)) {
      save.quests.completedNodeIds.push(questId);
      save.quests.progressLog.push({ questId, status: 'completed', at });
    }
    save.quests.currentMapNodeId = questId;
  });
}

function professionLevel(thresholds: number[], xp: number): number {
  return thresholds.reduce((level, threshold, index) => xp >= threshold ? index + 1 : level, 1);
}

function awardProfessionXp(script: GameScriptV2, save: SaveV2, awards: Record<string, number> | undefined): void {
  if (!awards) return;
  Object.entries(awards).forEach(([professionId, amount]) => {
    const definition = script.gameplay.professions.find(({ id }) => id === professionId);
    if (!definition) throw new Error(`Unknown profession: ${professionId}`);
    const current = save.professions.progress[professionId] ?? { xp: 0, level: 1 };
    const xp = Math.max(0, current.xp + amount);
    save.professions.progress[professionId] = { xp, level: professionLevel(definition.xpThresholds, xp) };
  });
}

function routePermits(save: SaveV2, route: string | undefined): boolean {
  return route === undefined || save.route === route;
}

export function equipItem(script: GameScriptV2, save: SaveV2, equipmentId: string, at: string): void {
  const equipment = script.gameplay.equipment.find(({ id }) => id === equipmentId);
  if (!equipment) throw new Error(`Unknown equipment: ${equipmentId}`);
  if (!routePermits(save, equipment.route)) throw new Error(`Equipment is unavailable on route: ${equipmentId}`);
  if (!save.inventory.ownedIds.includes(equipment.itemId)) throw new Error(`Equipment item is not owned: ${equipment.itemId}`);
  save.inventory.equipped[equipment.slot] = equipment.id;
  save.logs.progressionUnlocks.push({ kind: 'equipment', id: equipment.id, at });
}

export function activateOutfit(script: GameScriptV2, save: SaveV2, outfitId: string, at: string): void {
  const outfit = script.gameplay.outfits.find(({ id }) => id === outfitId);
  if (!outfit) throw new Error(`Unknown outfit: ${outfitId}`);
  if (!routePermits(save, outfit.route)) throw new Error(`Outfit is unavailable on route: ${outfitId}`);
  if (!save.inventory.outfitIds.includes(outfit.id)) throw new Error(`Outfit is not unlocked: ${outfitId}`);
  save.inventory.activeOutfitId = outfit.id;
  save.logs.progressionUnlocks.push({ kind: 'outfit-active', id: outfit.id, at });
}

export function activateProfession(script: GameScriptV2, save: SaveV2, professionId: string, at: string): void {
  const profession = script.gameplay.professions.find(({ id }) => id === professionId);
  if (!profession) throw new Error(`Unknown profession: ${professionId}`);
  if (!routePermits(save, profession.route)) throw new Error(`Profession is unavailable on route: ${professionId}`);
  save.professions.activeId = profession.id;
  save.professions.progress[profession.id] ??= { xp: 0, level: 1 };
  save.logs.progressionUnlocks.push({ kind: 'profession-active', id: profession.id, at });
}

function applyInventory(script: GameScriptV2, save: SaveV2, effects: ChoiceEffects, at: string): void {
  addUnique(save.inventory.ownedIds, effects.grantItems ?? []);
  addUnique(save.inventory.outfitIds, effects.unlockOutfits ?? []);
  effects.equipItems?.forEach((id) => equipItem(script, save, id, at));
  if (effects.activateOutfit) activateOutfit(script, save, effects.activateOutfit, at);
}

function resolveBattles(save: SaveV2, effects: ChoiceEffects, at: string): void {
  effects.resolveBattles?.forEach(({ battleId, outcome }) => {
    addUnique(save.battles.resolvedIds, [battleId]);
    save.battles.outcomes[battleId] = outcome;
    save.logs.conflicts.push({ battleId, outcome, at });
  });
}

function applyBaseCollections(save: SaveV2, effects: ChoiceEffects): void {
  addUnique(save.unlockedCg, effects.unlockCg ?? []);
  addUnique(save.inventory.ownedIds, effects.grantItems ?? []);
}

export function applyChoiceEffects(script: GameScriptV2, save: SaveV2, effects: ChoiceEffects, at: string): void {
  if (effects.route) save.route = effects.route;
  applyStatEffects(save, effects.values);
  applyRelationshipEffects(script, save, effects.relationshipVectors);
  applyMasteryEffects(save, effects.conflictMastery);
  applyFlags(save, effects);
  applyBaseCollections(save, effects);
  startQuests(save, effects.startQuests ?? [], at);
  completeQuests(save, effects.completeQuests ?? [], at);
  awardProfessionXp(script, save, effects.professionXp);
  if (effects.activateProfession) activateProfession(script, save, effects.activateProfession, at);
  applyInventory(script, save, effects, at);
  resolveBattles(save, effects, at);
}

function equipmentModifier(script: GameScriptV2, save: SaveV2, key: StoryValueKey): number {
  return Object.values(save.inventory.equipped).reduce((total, equipmentId) => {
    const definition = script.gameplay.equipment.find(({ id }) => id === equipmentId);
    return total + (definition?.modifiers[key] ?? 0);
  }, 0);
}

function professionModifier(script: GameScriptV2, save: SaveV2, key: StoryValueKey): number {
  const definition = script.gameplay.professions.find(({ id }) => id === save.professions.activeId);
  if (!definition) return 0;
  const level = save.professions.progress[definition.id]?.level ?? 1;
  return (definition.modifiersPerLevel[key] ?? 0) * level;
}

export function effectiveStoryValue(script: GameScriptV2, save: SaveV2, key: StoryValueKey): number {
  return save.values[key] + equipmentModifier(script, save, key) + professionModifier(script, save, key);
}

function numericMatches(actual: number, predicate: { operator: 'gte' | 'lte' | 'eq'; value: number }): boolean {
  if (predicate.operator === 'gte') return actual >= predicate.value;
  if (predicate.operator === 'lte') return actual <= predicate.value;
  return actual === predicate.value;
}

export function statePredicateMatches(script: GameScriptV2, save: SaveV2, predicate: StatePredicate): boolean {
  if (predicate.kind === 'value') return numericMatches(effectiveStoryValue(script, save, predicate.key), predicate);
  if (predicate.kind === 'relationship') return numericMatches(save.values.relationshipVectors[predicate.key], predicate);
  if (predicate.kind === 'flag') return (save.flags[predicate.flag] ?? false) === predicate.equals;
  if (predicate.kind === 'quest') return (predicate.status === 'active' ? save.quests.activeNodeIds : save.quests.completedNodeIds).includes(predicate.questId);
  if (predicate.kind === 'battle') return save.battles.resolvedIds.includes(predicate.battleId) && (!predicate.outcome || save.battles.outcomes[predicate.battleId] === predicate.outcome);
  if (predicate.kind === 'item') return save.inventory.ownedIds.includes(predicate.itemId);
  if (predicate.kind === 'equipment') return Object.values(save.inventory.equipped).includes(predicate.equipmentId);
  if (predicate.kind === 'outfit') return save.inventory.outfitIds.includes(predicate.outfitId);
  if (predicate.kind === 'profession') return (save.professions.progress[predicate.professionId]?.level ?? 0) >= predicate.levelGte;
  return (predicate.status === 'active' ? save.worldbook.activeEntryIds : save.worldbook.seenEntryIds).includes(predicate.entryId);
}

export function syncWorldbookState(script: GameScriptV2, save: SaveV2, scene: SceneCue): void {
  const claims = new Set(scene.provenance.claimIds);
  const active = script.gameplay.worldbookEntries
    .filter((entry) => entry.constant || entry.claimIds.some((claimId) => claims.has(claimId)))
    .map(({ id }) => id);
  save.worldbook.activeEntryIds = active;
  addUnique(save.worldbook.seenEntryIds, active);
}

function achievementEligible(script: GameScriptV2, save: SaveV2, achievement: GameScriptV2['gameplay']['achievements'][number]): boolean {
  if (achievement.route && save.route !== achievement.route) return false;
  return achievement.eligibility.every((predicate) => statePredicateMatches(script, save, predicate));
}

function applyAchievementReward(script: GameScriptV2, save: SaveV2, achievement: GameScriptV2['gameplay']['achievements'][number], at: string): void {
  const reward = achievement.reward;
  applyStatEffects(save, reward.values);
  applyRelationshipEffects(script, save, reward.relationshipVectors);
  awardProfessionXp(script, save, reward.professionXp);
  reward.setFlags?.forEach((flag) => { save.flags[flag] = true; });
  addUnique(save.inventory.ownedIds, reward.grantItems ?? []);
  addUnique(save.inventory.outfitIds, reward.unlockOutfits ?? []);
  save.achievements.unlockedIds.push(achievement.id);
  save.logs.achievements.push({ achievementId: achievement.id, at });
}

export function evaluateAchievements(script: GameScriptV2, save: SaveV2, at: string): void {
  for (const achievement of script.gameplay.achievements) {
    if (save.achievements.unlockedIds.includes(achievement.id)) continue;
    if (achievementEligible(script, save, achievement)) applyAchievementReward(script, save, achievement, at);
  }
}

export function activeOutfitPortraitId(script: GameScriptV2, save: SaveV2): string | undefined {
  if (!save.inventory.outfitIds.includes(save.inventory.activeOutfitId)) return undefined;
  return script.gameplay.outfits.find(({ id }) => id === save.inventory.activeOutfitId)?.portraitAssetId;
}
