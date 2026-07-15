import type { GameScriptV2 } from '../domain/game-script';
import { createDefaultSaveV2, type SaveV2 } from '../domain/save';
import type { ChoiceAvailability, EligibilityPredicate, SceneChoice, SceneCue } from '../domain/scene-cue';

export interface GameSessionOptions { now?: () => string; save?: SaveV2 }

function predicateMatches(predicate: EligibilityPredicate, save: SaveV2): boolean {
  if (predicate.kind === 'flag') return (save.flags[predicate.flag] ?? false) === predicate.equals;
  const value = save.values[predicate.key];
  if (predicate.operator === 'gte') return value >= predicate.value;
  if (predicate.operator === 'lte') return value <= predicate.value;
  return value === predicate.value;
}

export function isChoiceAvailable(condition: ChoiceAvailability | undefined, save: SaveV2): boolean {
  if (!condition) return true;
  const all = condition.allOf?.every((predicate) => predicateMatches(predicate, save)) ?? true;
  const any = condition.anyOf?.some((predicate) => predicateMatches(predicate, save)) ?? true;
  return condition.fallback === true || (all && any);
}

export class GameSession {
  private readonly sceneById: Map<string, SceneCue>;
  private readonly now: () => string;
  save: SaveV2;

  constructor(readonly script: GameScriptV2, options: GameSessionOptions = {}) {
    this.sceneById = new Map(script.scenes.map((scene) => [scene.id, scene]));
    this.now = options.now ?? (() => new Date().toISOString());
    this.save = structuredClone(options.save ?? createDefaultSaveV2());
    if (!options.save || !this.sceneById.has(this.save.sceneId)) {
      const initialScene = this.sceneById.get(script.initialSceneId);
      if (!initialScene) throw new Error(`Unknown initial scene: ${script.initialSceneId}`);
      this.save.sceneId = initialScene.id;
      this.save.chapter = initialScene.chapter;
      this.save.locationId = initialScene.locationId;
      if (initialScene.route !== null) this.save.route = initialScene.route;
    }
  }

  get scene(): SceneCue {
    const scene = this.sceneById.get(this.save.sceneId);
    if (!scene) throw new Error(`Unknown current scene: ${this.save.sceneId}`);
    return scene;
  }

  get choices(): SceneChoice[] { return this.scene.choices.filter((choice) => isChoiceAvailable(choice.availability, this.save)); }

  replaceSave(save: SaveV2): void {
    if (!this.sceneById.has(save.sceneId)) throw new Error(`Save references unknown scene: ${save.sceneId}`);
    this.save = structuredClone(save);
  }

  choose(choiceId: string): { choice: SceneChoice; resultText?: string; scene: SceneCue } {
    const choice = this.choices.find((candidate) => candidate.id === choiceId);
    if (!choice) throw new Error(`Choice is unavailable: ${choiceId}`);
    const effects = choice.effects;
    if (effects.route) this.save.route = effects.route;
    for (const [key, delta] of Object.entries(effects.values ?? {})) {
      if (delta === undefined) continue;
      if (key in this.save.values) {
        const valueKey = key as 'affectionAlbina' | 'trust' | 'danger' | 'artResonance';
        this.save.values[valueKey] += delta;
      } else {
        const economyKey = key as keyof SaveV2['values']['routeEconomy'];
        this.save.values.routeEconomy[economyKey] += delta;
      }
    }
    effects.setFlags?.forEach((flag) => { this.save.flags[flag] = true; });
    effects.clearFlags?.forEach((flag) => { this.save.flags[flag] = false; });
    effects.unlockCg?.forEach((assetId) => { if (!this.save.unlockedCg.includes(assetId)) this.save.unlockedCg.push(assetId); });
    effects.grantItems?.forEach((itemId) => { if (!this.save.inventory.ownedIds.includes(itemId)) this.save.inventory.ownedIds.push(itemId); });
    effects.completeQuests?.forEach((questId) => { if (!this.save.quests.completedNodeIds.includes(questId)) this.save.quests.completedNodeIds.push(questId); });
    const next = this.sceneById.get(choice.nextSceneId);
    if (!next) throw new Error(`Choice references unknown scene: ${choice.nextSceneId}`);
    this.save.sceneId = next.id;
    this.save.chapter = next.chapter;
    if (next.route !== null) this.save.route = next.route;
    this.save.locationId = next.locationId;
    this.save.updatedAt = this.now();
    this.save.logs.sceneBranches.push({ choiceId, sceneId: next.id, at: this.save.updatedAt });
    return { choice, ...(choice.resultText ? { resultText: choice.resultText } : {}), scene: next };
  }

  interpolate(text: string): string { return text.replaceAll('{{user}}', this.save.playerProfile.name || '你'); }
}
