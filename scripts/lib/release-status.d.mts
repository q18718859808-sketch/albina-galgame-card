import type { MediaReadinessReport } from './media-readiness.mjs';
import type { ReleaseGateResult } from './release-gate.mjs';

export const RELEASE_REQUIREMENTS: Readonly<Record<string, number>>;

export interface ReleaseArtifactSummary {
  content: Record<string, number>;
  completed: Record<string, number>;
  mediaReadiness: MediaReadinessReport;
  pendingMediaJobs: { total: number; image: number; video: number; speech: number };
  providerProbes: unknown;
}

export function summarizeReleaseArtifacts(input: {
  manifest: { assets: Array<Record<string, unknown>>; portraits?: Array<Record<string, unknown>>; mediaJobs?: Array<Record<string, unknown>> };
  story: { scenes: Array<Record<string, unknown>> };
  providerProbes?: unknown;
  productionPlan?: unknown;
}): ReleaseArtifactSummary;

export function deriveReleaseStatus(input: {
  version: string;
  runtimeMediaApis: boolean;
  content?: Record<string, number>;
  completed: Record<string, number>;
  mediaReadiness: MediaReadinessReport;
  providerProbes?: unknown;
  pendingMediaJobs?: number | { total: number; image: number; video: number; speech: number };
  krea2EvidenceAudit?: { total?: number; bound?: number; unbound?: number; failed?: number };
}): {
  version: string;
  releaseCandidate: boolean;
  completeEdition: boolean;
  runtimeMediaApis: boolean;
  completionBlockers: string[];
  providers: Record<'image' | 'video' | 'speech', {
    provider: string;
    model: string;
    available: boolean;
    reason: string;
    testedAt: string | null;
    fallbackProvider?: string;
    fallbackModel?: string;
  }> & {
    imageFallbacks?: Array<{
      provider: string;
      model: string;
      available: boolean;
      reason: string;
      testedAt: string | null;
    }>;
  };
  gates: { rc: ReleaseGateResult; final: ReleaseGateResult };
  [key: string]: unknown;
};
