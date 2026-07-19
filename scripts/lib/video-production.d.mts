export interface VideoRunOptions {
  all?: boolean;
  ids?: string[];
  maxPolls?: number;
  pollIntervalMs?: number;
  regenerate?: boolean;
  recoverStaleLock?: boolean;
}

export interface VideoReviewOptions {
  ids: string[];
  decision: 'approved' | 'rejected';
  reviewer: string;
  notes?: string;
  recoverStaleLock?: boolean;
}

export interface VideoPromotionOptions {
  all?: boolean;
  ids?: string[];
  rights?: Record<string, unknown>;
  recoverStaleLock?: boolean;
}

export interface VideoProductionDependencies extends Record<string, any> {
  writeAtomic?: (path: string, bytes: Uint8Array) => Promise<void>;
}

export function hash(value: Uint8Array | string): string;
export function isUsablePieApiKey(value: unknown): boolean;
export function loadVideoInputs(options?: Record<string, string>): Promise<{ plan: any; story: any }>;
export function selectVideoJobs(plan: any, options?: VideoRunOptions): any[];
export function resolveApprovedKeyframe(job: any, imageJob: any, options?: Record<string, string>): Promise<any>;
export function runVideoBatch(options: VideoRunOptions, environment?: Record<string, string | undefined>, dependencies?: VideoProductionDependencies): Promise<any[]>;
export function reviewVideoArtifacts(options: VideoReviewOptions, dependencies?: VideoProductionDependencies): Promise<any[]>;
export function promoteVideoArtifacts(options: VideoPromotionOptions, dependencies?: VideoProductionDependencies): Promise<any[]>;
export function buildVideoPromotionReceipt(candidate: any, variant: 'runtime' | 'desktop', rights?: Record<string, unknown>): any;
export function validateVideoLedger(value: unknown): any;
export function buildTranscodeArgs(sourcePath: string, targetPath: string, delivery: { variant: 'runtime' | 'desktop'; width: number; height: number; fps: number }): string[];
