export interface VisualPlanJob {
  id: string;
  receiptAssetId: string;
  category: 'bg' | 'cg' | 'characters';
  provider: 'wisart-openai-compatible' | 'latent-moe';
  model: 'gpt-image-2' | 'latent-moe-async';
  generationSize: '1920x1080' | '1024x1536' | 'portrait' | 'landscape' | 'square';
  delivery: { format: 'jpg' | 'png'; width: number; height: number; alpha: boolean };
  referenceSourceIds?: string[];
  styleReferenceMode?: 'deidentified-image-last';
  identitySubjects: string[];
  identityBootstrap: VisualIdentityBootstrap | null;
  canonClaimIds?: string[];
}

export interface VisualIdentityBootstrap {
  kind: 'project-authored-root';
  subject: string;
  authority: { kind: 'character-bible'; pointer: string };
  identityReferenceJobIds: [];
  identityReferenceSourceIds: [];
  requiresHumanIdentityApproval: false;
}

export interface VisualPrompt {
  jobId: string;
  mode: 'text-generation' | 'reference-edit';
  referenceJobIds: string[];
  referenceSourceIds?: string[];
  styleReferenceMode?: 'deidentified-image-last';
  identitySubjects: string[];
  identityBootstrap: VisualIdentityBootstrap | null;
  canonClaimIds?: string[];
  positivePrompt: string;
  negativePrompt: string;
  /**
   * Latent 变体（latent-text-prompts-v1）随 prompt 携带的 GenerationRequest 参数。
   * negativePrompt 必须显式转发：Latent 在字段省略时不套用站点默认负面词。
   */
  latentRequest?: {
    prompt: string;
    steps: number;
    resolution: 'square' | 'portrait' | 'landscape';
    sampler: string;
    scheduler: string;
    negativePrompt?: string;
    cgCoverage?: unknown;
  };
}

export const pilotJobIds: string[];
export const latentPilotJobIds: string[];
export const migrationPilotJobIds: string[];

export interface VisualLedgerRecord {
  jobId?: string;
  status?: string;
  activeAttempt?: number;
  attempts?: Array<Record<string, unknown>>;
  httpStatus?: number;
  requestId?: string;
  endpoint?: string;
  responseContentType?: string;
  rawResponsePath?: string;
  responseMetaPath?: string;
  responseSha256?: string;
  error?: string;
  [key: string]: unknown;
}

export function failLedgerJob(
  ledger: { jobs: Record<string, VisualLedgerRecord> },
  jobId: string,
  attempt: number,
  error: unknown,
  ambiguous: boolean,
  rawRecord?: Record<string, unknown>,
): void;

export function jobHash(entry: unknown, references: Array<{ jobId: string; sha256: string }>): string;

export function hash(value: string | Uint8Array): string;
export function atomicWrite(path: string, bytes: Uint8Array): Promise<void>;
export function inspectPng(buffer: Buffer): { width: number; height: number; colorType: number; alphaCapable: boolean };
export function inspectPixels(path: string): Promise<{
  nonBlank: boolean;
  hasTransparency: boolean;
  transparentRatio: number;
  borderTransparencyRatio: number;
  opaqueKeyRatio: number;
  residualMagentaRatio: number;
  transparentMagentaRatio: number;
  minAlpha: number;
  maxAlpha: number;
  minRgb: number;
  maxRgb: number;
}>;
export function orderedReferenceSourceIds(prompt: Pick<VisualPrompt, 'jobId' | 'referenceSourceIds' | 'styleReferenceMode'>): string[];
export function orderResolvedReferenceInputs<T, U>(sourceInputs: T[], jobInputs: U[]): Array<T | U>;
export function resolveReferenceInputs(prompt: any, ledger: any, entryById: Map<string, unknown>, canonVisualSources: {
  assets: Array<{ id: string; reviewStatus: string; localPath: string; sha256: string; bytes: number }>;
}, ancestors?: Set<string>, allowUnreviewedReferences?: boolean): Promise<Array<{ jobId: string; sha256: string }>>;
export function isAmbiguousProviderResponse(status: number, body: unknown): boolean;
export function resolveDefinitiveFailureRecord(record: any, rawBytes: Buffer, metadata: any, resolvedAt?: string): any;
export function currentVisualContractReview(record: any, currentJobHash: string, currentCriteria: string[]): { kind: 'generation' | 'revision'; review: any } | undefined;
export function adoptVisualReviewContractRecord(record: any, currentJobHash: string, currentCriteria: string[], options: {
  reviewer: string; reason: string; notes: string; decision: 'approved';
  criteriaEvidence?: Array<{ criterion: string; note: string; evidence: string }>;
}, reviewedAt?: string): any;
export function approvalCriteriaEvidence(currentCriteria: string[], criteriaEvidence: Array<{
  criterion: string; note: string; evidence: string;
}>): Array<{ criterion: string; note: string; evidence: string }>;
export function resolveDefinitiveVisualFailures(ids: string[]): Promise<Array<{ id: string; status: 'failed'; resolution: Record<string, unknown> }>>;
export function isUsableWisartApiKey(value: unknown): boolean;
export function isUsableLatentApiKey(value: unknown): boolean;
export function resolveLatentBaseUrl(environment: NodeJS.ProcessEnv | Record<string, string | undefined>): string;
export function resolveCanonVisualSourcePath(localPath: unknown): string;
export interface LatentProviderConfig {
  apiKey: string | undefined;
  invalidApiKey: boolean;
  baseUrl: string;
  submitTimeoutMs: number;
  pollIntervalMs: number;
  maxPolls: number;
}
export interface WisartProviderConfig {
  apiKey: string | undefined;
  invalidApiKey: boolean;
  baseUrl: string;
  timeoutMs: number;
}
export interface AmbiguousRetryOptions {
  id: string;
  operator: string;
  reason: string;
  expectedAttempt: number;
  expectedRequestKey: string;
  expectedSourceJobHash: string;
  expectedCurrentContractSha256?: string;
  expectedFinalPromptSha256?: string;
  expectedReferenceInputs?: Array<{ jobId: string; sha256: string }>;
  planVariant?: 'frozen' | 'latent' | 'migration';
  acknowledgePossibleDuplicateCharge: boolean;
  recoverStaleLock?: boolean;
  execute?: boolean;
  allowUnreviewedReferences?: boolean;
}
export function validateAmbiguousRetryOptions(options: AmbiguousRetryOptions): AmbiguousRetryOptions;
export function isUncertainPaidOutcome(record: {
  status: string;
  responseSha256?: string | null;
} | null | undefined): boolean;
export function createAmbiguousRetryAuthorization(entry: any, record: any, sourceJobHash: string, references: Array<{ jobId: string; sha256: string }>, options: AmbiguousRetryOptions, generated: {
  authorizationId: string; authorizedAt: string; requestKey: string;
}): Record<string, unknown>;
export function validateAmbiguousRetryAuthorization(value: unknown): Record<string, unknown>;
export function validateAmbiguousRetryLink(jobId: string, record: unknown, authorization: unknown): Record<string, unknown>;
export function verifyAmbiguousRetryAuthorizationEvidence(jobId: string, record: unknown): Promise<void>;
export function retryAmbiguousVisual(options: AmbiguousRetryOptions, environment?: NodeJS.ProcessEnv): Promise<{
  id: string; status: string; error?: string; artifactSha256?: string; planVariant?: string;
  authorizationId?: string; authorizationPath?: string;
  supersededAttempt?: number; authorizedNextAttempt?: number;
}>;
export function executeAmbiguousRetry(options: AmbiguousRetryOptions, environment?: NodeJS.ProcessEnv): Promise<{
  id: string; status: string; error?: string; artifactSha256?: string; planVariant: string;
  authorizationId: string; authorizationPath: string;
}>;
export function editRequest(
  entry: { finalPrompt: string; job: { generationSize: string } },
  references: Array<{ jobId: string; path: string; bytes: Uint8Array }>,
): Promise<{ headers: Record<string, never>; body: FormData }>;
export interface LatentImageRequestResult {
  status: number;
  endpoint: string;
  contentType: string;
  rawBytes: Buffer;
  body: { data: Array<{ b64_json: string }> };
  latentJobId: string;
  latentArtworkId: string;
  latentSubmitResponse?: unknown;
  latentFinalJob?: unknown;
}
export function requestLatentImageForTest(
  entry: { job: { generationSize: '1920x1080' | '1024x1536' | 'portrait' | 'landscape' | 'square' }; finalPrompt: string },
  config: LatentProviderConfig,
  idempotencyKey: string,
): Promise<LatentImageRequestResult>;
export function preparePortrait(
  job: { provider?: 'wisart-openai-compatible' | 'latent-moe'; delivery: { width: number; height: number } },
  sourcePath: string,
  deliveryPath: string,
  sourceInfo: { width: number; height: number; alphaCapable: boolean },
  pixels: { hasTransparency: boolean; borderTransparencyRatio?: number; opaqueKeyRatio?: number; residualMagentaRatio?: number; transparentMagentaRatio?: number },
): Promise<void>;
export function recordLocallyReprocessedArtifact(record: any, entry: any, artifact: any, reprocessedAt?: string): any;
export function validateLedger(value: unknown): { version: 2; jobs: Record<string, unknown> };
export function selectImageJobs(
  plan: { imageJobs: VisualPlanJob[] },
  prompts: { prompts: VisualPrompt[] },
  options?: { mode?: 'pilot' | 'all'; ids?: string[]; planVariant?: 'frozen' | 'latent' | 'migration' },
): Array<{ job: VisualPlanJob; prompt: VisualPrompt | undefined; finalPrompt: string }>;
export function productionReviewCriteria(entry: { job: VisualPlanJob; prompt: VisualPrompt }): string[];
export function loadProductionInputs(options?: { planVariant?: 'frozen' | 'latent' | 'migration' }): Promise<{
  plan: unknown; prompts: unknown; canonVisualSources: unknown; canonClaims: unknown;
  authorization: LatentProductionAuthorization | WisartMigrationAuthorization | undefined; planVariant: 'frozen' | 'latent' | 'migration';
}>;
export interface LatentPromptApproval {
  jobId: string;
  promptSha256: string;
  decision: 'approved' | 'rejected' | 'not-required';
  notes: string;
}
export interface LatentProductionAuthorization {
  status: 'not-required';
  promptFreezeSha256: string;
  latentJobSetSha256: string;
}
export function latentJobSetSha256(plan: unknown): string;
export function latentPromptApprovalManifest(prompts: unknown): Array<{ jobId: string; promptSha256: string }>;
export function migrationContentSha256(plan: unknown, prompts: unknown, canonVisualSources: unknown, canonClaims: unknown): string;
export interface WisartMigrationAuthorization {
  status: 'not-required';
  migrationContentSha256: string;
  styleBoardSha256: string;
}
export function assertWisartMigrationAuthorized(
  plan: unknown,
  prompts: unknown,
  canonVisualSources: unknown,
  canonClaims: unknown,
): WisartMigrationAuthorization;
export function assertLatentProductionAuthorized(
  plan: unknown,
  prompts: unknown,
): LatentProductionAuthorization;
export function runVisualBatch(
  options: { mode: 'pilot' | 'all'; ids: string[]; intervalMs: number; regenerate: boolean; recoverStaleLock: boolean; skipPilotGate?: boolean; allowUnreviewedReferences?: boolean; planVariant?: 'frozen' | 'latent' | 'migration' },
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
  criteriaEvidence?: Record<string, Array<{ criterion: string; note: string; evidence: string }>>;
  recoverStaleLock: boolean;
  planVariant?: 'frozen' | 'latent' | 'migration';
  allowUnreviewedReferences?: boolean;
}): Promise<Array<{ id: string; status: 'approved' | 'rejected' }>>;
export function adoptVisualReviewContract(options: {
  ids: string[];
  decision: 'approved';
  reviewer: string;
  reason: string;
  notes: string;
  criteriaEvidence: Record<string, Array<{ criterion: string; note: string; evidence: string }>>;
  recoverStaleLock: boolean;
}): Promise<Array<{ id: string; status: 'approved'; currentJobHash: string; artifactSha256: string }>>;
