export interface LatentRestyleWorkflowOptions {
  prompt: string;
  negativePrompt?: string;
  seed: number;
  width: number;
  height: number;
  filenamePrefix: string;
  sourceFilename: string;
  denoise?: number;
  steps?: number;
  preUpscaleModel?: string | null;
  preUpscaleInputSize?: { width: number; height: number } | null;
  depthControl?: { strength?: number } | null;
  vaeTiled?: boolean;
  postStyleLora?: { name: string; strength: number };
  structureLock?: boolean;
}

export const ALBINA_STRUCTURE_LOCK_PROFILE: {
  denoise: number;
  steps: number;
  vaeTiled: boolean;
  preUpscaleModel: null;
  depthControl: null;
  preserveAlpha: boolean;
  minDenoise: number;
  maxDenoise: number;
  minSteps: number;
  maxSteps: number;
};

export const ALBINA_CANONICAL_CONTROL_PROFILE: {
  identityStrength: number;
  promptStrength: number;
  depthStrength: number;
};

export function resolveAlbinaStructureLock(options?: Record<string, unknown>): Record<string, unknown>;

export function buildLatentRestyleWorkflow(
  baseline: Record<string, unknown>,
  options: LatentRestyleWorkflowOptions,
): {
  workflow: Record<string, unknown>;
  topology: {
    structuralControl: { controlled: string } | null;
  };
};

export function buildCanonicalControlRestyleWorkflow(
  baseline: Record<string, unknown>,
  options: {
    prompt: string;
    negativePrompt?: string;
    seed: number;
    width: number;
    height: number;
    filenamePrefix: string;
    sourceFilename: string;
    identityStrength?: number;
    promptStrength?: number;
    krea2Control?: { kind: 'depth'; strength?: number };
  },
): Record<string, unknown>;

export function buildCanonicalControlRepairWorkflow(
  baseline: Record<string, unknown>,
  options: {
    prompt: string;
    negativePrompt?: string;
    seed: number;
    width: number;
    height: number;
    filenamePrefix: string;
    sourceFilename: string;
    identityStrength?: number;
    promptStrength?: number;
    krea2Control?: { kind: 'depth'; strength?: number };
    denoise?: number;
    steps?: number;
  },
): Record<string, unknown>;

export function validateCanonicalControlRepairWorkflow(
  workflow: Record<string, unknown>,
  options?: { denoise?: number; steps?: number },
): true;

export function validateKrea2ReferenceStyleWorkflow(workflow: Record<string, unknown>): true;

export function validateAlbinaRawEditDetailWorkflow(workflow: Record<string, unknown>): true;

export const ALBINA_CANONICAL_CONTROL_REPAIR_PROFILE: {
  identityStrength: number;
  promptStrength: number;
  depthStrength: number;
  denoise: number;
  steps: number;
};
