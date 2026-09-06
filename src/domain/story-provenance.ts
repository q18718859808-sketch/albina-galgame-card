import provenanceJson from '../../content/story-provenance-v1.json';

export type StoryClassification = 'canon_paraphrase' | 'AU_extension';
export type StoryScope = 'canon_recap' | 'AU_boundary' | 'route';

export interface SceneProvenance {
  classification: StoryClassification;
  scope: StoryScope;
  claimIds: readonly string[];
  sourceIds: readonly string[];
  note: string;
}

interface ProvenanceFile {
  version: number;
  entries: Array<{ sceneIds: string[]; provenance: SceneProvenance }>;
}

const provenanceFile = provenanceJson as ProvenanceFile;

const sceneProvenance = new Map<string, SceneProvenance>(
  provenanceFile.entries.flatMap((entry) => entry.sceneIds.map((sceneId) => [sceneId, entry.provenance] as const)),
);

export function lookupSceneProvenance(sceneId: string): SceneProvenance | undefined {
  return sceneProvenance.get(sceneId);
}

/**
 * Continuity band used by presentation layers. This is derived from the
 * reviewed provenance ledger rather than scene-id prefixes, so the AU boundary
 * scene is never presented as source-game canon.
 */
export type ContinuityBand = 'canon' | 'au-boundary' | 'au-route';

export function resolveContinuityBand(sceneId: string): ContinuityBand {
  const provenance = lookupSceneProvenance(sceneId);
  if (provenance) {
    if (provenance.scope === 'canon_recap') return 'canon';
    if (provenance.scope === 'AU_boundary') return 'au-boundary';
    return 'au-route';
  }
  // Unledgered scenes are treated conservatively: only explicit canon-prefixed
  // recaps may claim canon, everything else stays inside authored AU space.
  if (sceneId.startsWith('canon_') || sceneId.startsWith('canon-')) return 'canon';
  if (sceneId.startsWith('opening_')) return 'au-boundary';
  return 'au-route';
}
