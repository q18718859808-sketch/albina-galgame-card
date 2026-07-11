export type ArtifactKind = 'image' | 'audio' | 'video';

export interface NormalizedArtifact {
  kind: ArtifactKind;
  model: string;
  mimeType?: string;
  sourceUrl?: string;
  bytes?: Uint8Array;
  metadata?: Record<string, unknown>;
}

export interface AmbiguousArtifact {
  kind: 'ambiguous';
  model: 'music-2.6';
  reason: 'gateway-timeout';
}
