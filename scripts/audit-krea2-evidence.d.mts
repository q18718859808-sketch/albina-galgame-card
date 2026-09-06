export interface Krea2EvidenceAuditIssue {
  code: string;
  detail: unknown;
}

export interface Krea2EvidenceAuditResult {
  id: string;
  receiptPath: string;
  pass: boolean;
  issues: Krea2EvidenceAuditIssue[];
  outputPath: string | null;
  outputSha: string | null;
  [key: string]: unknown;
}

export function validateFormalKrea2BaselineBinding(receipt: unknown, baseline: unknown): boolean;
export function auditShippedAssets(input: {
  manifest: Record<string, unknown>;
  results: Array<Partial<Krea2EvidenceAuditResult> & Record<string, unknown>>;
  baseline?: unknown;
}): {
  total: number;
  bound: number;
  unbound: number;
  failed?: number;
  entries: Array<Record<string, unknown>>;
};
export function runAudit(options?: Record<string, unknown>): Promise<Record<string, unknown>>;
