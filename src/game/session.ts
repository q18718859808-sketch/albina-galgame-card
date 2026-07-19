import type { GameScriptV2 } from '../domain/game-script';
import { createDefaultSaveV2, type SaveV2 } from '../domain/save';
import type { ChoiceAvailability, SceneChoice, SceneCue } from '../domain/scene-cue';
import {
  activateOutfit,
  activateProfession,
  activeOutfitPortraitId,
  applyChoiceEffects,
  effectiveStoryValue,
  equipItem,
  evaluateAchievements,
  statePredicateMatches,
  syncWorldbookState,
} from './progression';

export interface GameSessionOptions { now?: () => string; save?: SaveV2 }

export function isChoiceAvailable(condition: ChoiceAvailability | undefined, save: SaveV2, script: GameScriptV2): boolean {
  if (!condition) return true;
  const all = condition.allOf?.every((predicate) => statePredicateMatches(script, save, predicate)) ?? true;
  const any = condition.anyOf?.some((predicate) => statePredicateMatches(script, save, predicate)) ?? true;
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
    syncWorldbookState(this.script, this.save, this.scene);
    evaluateAchievements(this.script, this.save, this.now());
  }

  get scene(): SceneCue {
    const scene = this.sceneById.get(this.save.sceneId);
    if (!scene) throw new Error(`Unknown current scene: ${this.save.sceneId}`);
    return scene;
  }

  get choices(): SceneChoice[] { return this.scene.choices.filter((choice) => isChoiceAvailable(choice.availability, this.save, this.script)); }

  get effectiveValues(): Pick<SaveV2['values'], 'affectionAlbina' | 'trust' | 'danger' | 'artResonance'> {
    return {
      affectionAlbina: effectiveStoryValue(this.script, this.save, 'affectionAlbina'),
      trust: effectiveStoryValue(this.script, this.save, 'trust'),
      danger: effectiveStoryValue(this.script, this.save, 'danger'),
      artResonance: effectiveStoryValue(this.script, this.save, 'artResonance'),
    };
  }

  get outfitPortraitAssetId(): string | undefined { return activeOutfitPortraitId(this.script, this.save); }

  replaceSave(save: SaveV2): void {
    if (!this.sceneById.has(save.sceneId)) throw new Error(`Save references unknown scene: ${save.sceneId}`);
    this.save = structuredClone(save);
    syncWorldbookState(this.script, this.save, this.scene);
    evaluateAchievements(this.script, this.save, this.now());
  }

  choose(choiceId: string): { choice: SceneChoice; resultText?: string; scene: SceneCue } {
    const choice = this.choices.find((candidate) => candidate.id === choiceId);
    if (!choice) throw new Error(`Choice is unavailable: ${choiceId}`);
    const at = this.now();
    applyChoiceEffects(this.script, this.save, choice.effects, at);
    const next = this.sceneById.get(choice.nextSceneId);
    if (!next) throw new Error(`Choice references unknown scene: ${choice.nextSceneId}`);
    this.save.sceneId = next.id;
    this.save.chapter = next.chapter;
    if (next.route !== null) this.save.route = next.route;
    this.save.locationId = next.locationId;
    this.save.updatedAt = at;
    this.save.logs.sceneBranches.push({ choiceId, sceneId: next.id, at: this.save.updatedAt });
    syncWorldbookState(this.script, this.save, next);
    evaluateAchievements(this.script, this.save, at);
    return { choice, ...(choice.resultText ? { resultText: choice.resultText } : {}), scene: next };
  }

  equip(equipmentId: string): void {
    const at = this.now();
    equipItem(this.script, this.save, equipmentId, at);
    this.save.updatedAt = at;
  }

  wearOutfit(outfitId: string): void {
    const at = this.now();
    activateOutfit(this.script, this.save, outfitId, at);
    this.save.updatedAt = at;
  }

  selectProfession(professionId: string): void {
    const at = this.now();
    activateProfession(this.script, this.save, professionId, at);
    this.save.updatedAt = at;
  }

  interpolate(text: string): string { return text.replaceAll('{{user}}', this.save.playerProfile.name || '你'); }
}
