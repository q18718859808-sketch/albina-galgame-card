export interface Krea2AuditIssue {
  code: string;
  detail: unknown;
}

export interface Krea2AuditResult {
  id: string;
  receiptPath: string;
  outputPath: string | null;
  outputSha: string | null;
  evidence?: { productionEvidence: boolean; directReview: boolean; promotionAllowed: false };
  pass: boolean;
  issues: Krea2AuditIssue[];
}

export function validateKrea2ProductionAuditWorkflow(workflow: Record<string, unknown>): true;
export function auditReceipt(path: string): Promise<Krea2AuditResult>;
export function runAudit(options?: { stagingRoot?: string; outputPath?: string }): Promise<{
  counts: { total: number; passed: number; failed: number };
  results: Krea2AuditResult[];
}>;
