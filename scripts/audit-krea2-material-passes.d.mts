export interface MaterialAuditIssue {
  code: string;
  detail: unknown;
}

export interface MaterialAuditResult {
  id: string;
  receiptPath: string;
  group: string | null;
  status?: string;
  promotionAllowed: false;
  pass: boolean;
  issues: MaterialAuditIssue[];
}

export interface MaterialAuditManifest {
  schemaVersion: 1;
  kind: 'krea2-canonical-material-pass-manifest';
  method: string;
  promotionPolicy: string;
  auditedAt: string;
  counts: { total: number; passed: number; failed: number };
  byGroup: Record<string, { total: number; passed: number; failed: number }>;
  results: MaterialAuditResult[];
}

export function auditMaterialReceipt(
  receiptFile: string,
  options?: { root?: string; stagingRoot?: string },
): Promise<MaterialAuditResult | null>;

export function runAudit(options?: { root?: string; stagingRoot?: string; outputPath?: string }): Promise<MaterialAuditManifest>;
