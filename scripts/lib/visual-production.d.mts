export interface VisualPlanJob {
  id: string;
  receiptAssetId: string;
  category: 'bg' | 'cg' | 'characters';
  provider: 'x666-openai-compatible';
  model: 'gpt-image-2';
  upstreamPieVerified: false;
  generationSize: '1536x1024' | '1024x1536';
  delivery: { format: 'jpg' | 'png'; width: number; height: number; alpha: boolean };
  referenceSourceIds?: string[];
  canonClaimIds?: string[];
}

export interface VisualPrompt {
  jobId: string;
  mode: 'text-generation' | 'reference-edit';
  referenceJobIds: string[];
  referenceSourceIds?: string[];
  canonClaimIds?: string[];
  positivePrompt: string;
  negativePrompt: string;
}

export const pilotJobIds: string[];

export function hash(value: string | Uint8Array): string;
export function atomicWrite(path: string, bytes: Uint8Array): Promise<void>;
export function inspectPng(buffer: Buffer): { width: number; height: number; colorType: number; alphaCapable: boolean };
export function isAmbiguousProviderResponse(status: number, body: unknown): boolean;
export function isUsableX666ApiKey(value: unknown): boolean;
export function preparePortrait(
  job: { delivery: { width: number; height: number } },
  sourcePath: string,
  deliveryPath: string,
  sourceInfo: { width: number; height: number; alphaCapable: boolean },
  pixels: { hasTransparency: boolean; borderTransparencyRatio?: number; opaqueKeyRatio?: number },
): Promise<void>;
export function validateLedger(value: unknown): { version: 2; jobs: Record<string, unknown> };
export function selectImageJobs(
  plan: { imageJobs: VisualPlanJob[] },
  prompts: { prompts: VisualPrompt[] },
  options?: { mode?: 'pilot' | 'all'; ids?: string[] },
): Array<{ job: VisualPlanJob; prompt: VisualPrompt | undefined; finalPrompt: string }>;
export function loadProductionInputs(): Promise<{ plan: unknown; prompts: unknown; canonVisualSources: unknown; canonClaims: unknown }>;
export function runVisualBatch(
  options: { mode: 'pilot' | 'all'; ids: string[]; intervalMs: number; regenerate: boolean; recoverStaleLock: boolean },
  environment?: NodeJS.ProcessEnv,
): Promise<{
  total: number; completed: number; skipped: number; failed: number; ambiguous: number;
  needsReview: number; awaitingReview: number; blocked: number; contractChanged: number; results: unknown[];
}>;
export function reviewVisualArtifacts(options: {
  ids: string[];
  decision: 'approved' | 'rejected';
  reviewer: string;
  notes?: string;
  recoverStaleLock: boolean;
}): Promise<Array<{ id: string; status: 'approved' | 'rejected' }>>;
