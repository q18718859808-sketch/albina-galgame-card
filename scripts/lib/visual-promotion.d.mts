import type { PromotionReceipt } from './promotion-receipts.mjs';

export interface VisualPromotionRights {
  rightsBasis?: string;
  sourceUrl?: string;
  status?: 'verified' | 'unverified';
  redistribution?: 'allowed' | 'restricted' | 'unverified';
  redistributionAllowed?: boolean;
}

export interface VisualPromotionCandidate {
  jobId: string;
  receiptAssetId: string;
  outputPath: string;
  provider: 'wisart-openai-compatible';
  model: 'gpt-image-2';
  promptVersion: string;
  status: 'completed';
  sourceJobHash: string;
  currentSourceJobHash: string;
  currentReviewCriteria: string[];
  artifactSha256: string;
  deliveryPath: string;
  review: { status: 'approved'; reviewer: string; reviewedAt: string; criteria: Array<{ criterion: string; status: 'passed' }> };
  reviewContractRevision?: {
    version: 1;
    status: 'approved';
    generationJobHash: string;
    currentJobHash: string;
    artifactSha256: string;
    reviewer: string;
    reviewedAt: string;
    reason: string;
    notes: string;
    generationHistoryPreserved: true;
    criteria: Array<{ criterion: string; status: 'passed' }>;
  };
  inputs?: Array<{ jobId?: string; receiptAssetId?: string; sourceId?: string; sha256: string }>;
}

export interface VisualPromotionResult {
  id: string;
  status: 'promoted' | 'skipped';
  assetId: string;
}

export interface VisualPromotionDependencies {
  assetRoot?: string;
  receiptRoot?: string;
  withCandidates?: (selection: unknown, action: (candidates: unknown[]) => Promise<unknown>) => Promise<unknown>;
  writeAtomic?: (path: string, bytes: Uint8Array) => Promise<void>;
}

export function promoteVisualArtifacts(
  options: { ids?: string[]; all?: boolean; recoverStaleLock?: boolean; rights?: VisualPromotionRights },
  dependencies?: VisualPromotionDependencies,
): Promise<VisualPromotionResult[]>;

export function buildVisualPromotionReceipt(
  candidate: VisualPromotionCandidate,
  rights?: VisualPromotionRights,
): PromotionReceipt;
