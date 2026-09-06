type PromotionReview = { status: 'approved'; reviewer: string; reviewedAt: string };

type PromotionProvenance =
  | {
      provider: 'pie';
      model: 'seedance-1.5-pro' | 'speech-2.8-hd';
      promptVersion: string;
      sourceJobHash: string;
      review: PromotionReview;
    }
  | {
      provider: 'comfyui-local-krea2';
      model: 'redcraft23FP8_30Krea2.safetensors';
      promptVersion: string;
      sourceJobHash: string;
      review: PromotionReview;
      baseline?: {
        workflowPath: string;
        workflowSha256: string;
        evidencePath: string;
        evidenceSha256: string;
        topologySha256: string;
      };
    }
  | {
      provider: 'wisart-openai-compatible';
      model: 'gpt-image-2';
      promptVersion: string;
      sourceJobHash: string;
      review: PromotionReview;
    };

export interface PromotionReceipt {
  version: 1;
  assetId: string;
  artifactSha256: string;
  provenance: PromotionProvenance;
  rights?: {
    status: 'verified' | 'unverified';
    sourceType: 'model-output' | 'project-authored' | 'licensed-source' | 'third-party-source';
    redistribution: 'allowed' | 'restricted' | 'unverified';
    rightsBasis: string;
    holder?: string;
    sourceUrl?: string;
  };
  lineage?: {
    kind: 'original' | 'derivative' | 'transcode' | 'conversion';
    processVersion: string;
    inputs: Array<{ assetId?: string; sha256: string; role: string }>;
  };
}

export function loadPromotionReceipts(paths: string[]): Promise<Map<string, PromotionReceipt>>;
export function attachPromotionProvenance<T extends { id: string; sha256?: string }>(assets: T[], receipts: Map<string, PromotionReceipt>): Array<T & { provenance?: PromotionReceipt['provenance']; rights?: PromotionReceipt['rights']; lineage?: PromotionReceipt['lineage'] }>;
export function parsePromotionReceipt(value: unknown): PromotionReceipt;
