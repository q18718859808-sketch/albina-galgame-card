export interface Krea2BatchJob {
  id: string;
  group: string;
  source: string;
  target: string | null;
  scale: number;
  denoise: number;
  seed: number;
  steps: number;
  structureLock: boolean;
  preUpscaleModel: string | null;
  preUpscaleInputScale: number | null;
  depthControl: { strength?: number } | null;
  alpha: boolean;
  prompt: string;
  negative: string;
}

export const JOBS: Krea2BatchJob[];
