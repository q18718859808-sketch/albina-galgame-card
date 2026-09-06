export type StagedRegion = { label: string; x: number; y: number; width: number; height: number };
export type StagedMask = { dimensions: { width: number; height: number }; regions: StagedRegion[] };
export type StagedKrea2Stage = { id: string; kind: string; mask: StagedMask | null; preserveOnly?: boolean; prompt: string; negative: string };

export const canonicalGeometry: { width: number; height: number };
export const stageGeometry: { width: number; height: number };
export const stages: StagedKrea2Stage[];
export function parseArgs(argv: string[]): { execute: boolean; source: string; seed: number; stage?: number };
export function hashPrompt(stage: StagedKrea2Stage): string;
export function makeWorkflow(baseline: any, stage: StagedKrea2Stage, inputImage: string, seed: number, prefix: string, canonicalImage?: string): any;
export function freeComfyModels(): Promise<{ status: string; httpStatus?: number; capturedAt: string; error?: string }>;
