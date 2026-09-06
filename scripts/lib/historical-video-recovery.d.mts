export function canonicalJson(value: unknown): string;
export function canonicalJobHash(value: unknown): string;

export interface HistoricalRecoveryInput {
  plan: { version: number; projectId: string; videoJobs: any[] };
  ledger: { jobs: Record<string, any> };
  manifest: { assets: any[] };
  stagingRoot: string;
  assetRoot: string;
  receiptRoot: string;
  auditPath?: string;
  sourceCommit?: string;
  loadHistoricalJob(job: any): Promise<any>;
}

export function recoverHistoricalVideos(
  input: HistoricalRecoveryInput,
  dependencies?: Record<string, unknown>,
): Promise<{ recoveredJobs: number; receipts: number; changedFiles: number; evidence: any[] }>;
