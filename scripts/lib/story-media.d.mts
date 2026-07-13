export interface StoryReferenceLookup {
  assetsById: Record<string, string>;
  portraitsById: Record<string, string>;
  pendingById: Record<string, string>;
}

export type StoryMediaScene = Record<string, unknown>;

export function videoNameForScene(scene: StoryMediaScene): string | undefined;
export function materializeStoryMedia(scenes: StoryMediaScene[]): StoryMediaScene[];
export function collectStoryAssetReferences(scenes: StoryMediaScene[]): string[];
export function findUnresolvedStoryReferences(scenes: StoryMediaScene[], lookup: StoryReferenceLookup): string[];
