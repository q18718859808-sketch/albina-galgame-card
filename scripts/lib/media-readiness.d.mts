export interface MediaReadinessAsset {
  path: string;
  assetIds: string[];
  ready: boolean;
  issues: string[];
}

export interface MediaReadinessReport {
  total: number;
  ready: number;
  blocked: number;
  byRoot: Record<string, { total: number; ready: number; blocked: number }>;
  blockers: MediaReadinessAsset[];
}

export function analyzeMediaReadiness(manifest: {
  assets: Array<Record<string, unknown> & { id: string; kind: string; path: string }>;
}): MediaReadinessReport;
