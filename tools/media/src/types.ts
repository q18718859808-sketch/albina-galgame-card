import type { MediaModel, ProviderId } from './provider.js';

export type ArtifactKind = 'image' | 'audio' | 'video';

export interface NormalizedArtifact {
  kind: ArtifactKind;
  provider: ProviderId;
  model: MediaModel;
  mimeType?: string;
  sourceUrl?: string;
  bytes?: Uint8Array;
  metadata?: Record<string, unknown>;
}

export interface AmbiguousArtifact {
  kind: 'ambiguous';
  provider: 'pie';
  model: 'music-2.6';
  reason: 'gateway-timeout';
}
