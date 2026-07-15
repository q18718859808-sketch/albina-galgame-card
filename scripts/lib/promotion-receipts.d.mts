export interface PromotionReceipt {
  version: 1;
  assetId: string;
  artifactSha256: string;
  provenance: {
    provider: 'pie';
    model: 'gpt-image-2' | 'seedance-1.5-pro' | 'speech-2.8-hd';
    promptVersion: string;
    sourceJobHash: string;
    review: { status: 'approved'; reviewer: string; reviewedAt: string };
  };
}

export function loadPromotionReceipts(paths: string[]): Promise<Map<string, PromotionReceipt>>;
export function attachPromotionProvenance<T extends { id: string; sha256?: string }>(assets: T[], receipts: Map<string, PromotionReceipt>): Array<T & { provenance?: PromotionReceipt['provenance'] }>;
export function parsePromotionReceipt(value: unknown): PromotionReceipt;
