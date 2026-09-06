import type { MediaModel, ProviderId, ProviderJobHandle } from './provider.js';
import type { AmbiguousArtifact, NormalizedArtifact } from './types.js';

export interface ProviderJobUpdate {
  handle: ProviderJobHandle;
  status: string;
}

export interface MediaClient {
  generateImage?(input: { model: 'gpt-image-2'; prompt: string; width: number; height: number }): Promise<NormalizedArtifact>;
  editImage?(input: { model: 'gpt-image-2'; prompt: string; image: Uint8Array; width: number; height: number }): Promise<NormalizedArtifact>;
  submitVideo?(input: { model: 'seedance-1.5-pro' | 'grok-image-video-1.5-preview'; prompt: string; durationSeconds: number; image: Uint8Array }): Promise<ProviderJobUpdate>;
  pollVideo?(handle: ProviderJobHandle): Promise<NormalizedArtifact | ProviderJobUpdate>;
  generateSpeech?(input: { model: 'speech-2.8-hd'; input: string; voice: string }): Promise<NormalizedArtifact>;
  generateMusic?(input: { model: 'music-2.6'; prompt: string; durationSeconds: number }): Promise<NormalizedArtifact | AmbiguousArtifact>;
}

export type ProviderClientResolver = (provider: ProviderId) => MediaClient;

export function assertArtifactMatches(
  job: { provider: ProviderId; model: MediaModel },
  artifact: NormalizedArtifact | AmbiguousArtifact,
): void {
  if (artifact.provider !== job.provider || artifact.model !== job.model) {
    throw new Error(`Provider artifact does not match job: ${artifact.provider}/${artifact.model} != ${job.provider}/${job.model}`);
  }
}
