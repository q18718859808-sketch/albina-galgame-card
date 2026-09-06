export interface Krea2AdvancedReadiness {
  ready: boolean;
  status: string;
  upstream: { repository: string; commit: string };
  runtime: Record<string, unknown>;
  weights: { raw: boolean; turbo: boolean };
  checks: Record<string, boolean>;
  fixedStyleLoras: Array<{ name: string; strength: number; order: number }>;
  fallback: Record<string, unknown> | null;
}

export function detectKrea2AdvancedReadiness(input?: Record<string, unknown>): Krea2AdvancedReadiness;
export function inspectKrea2AdvancedWeightPaths(paths?: Record<string, string | undefined>): Promise<Record<string, { present: boolean; path: string | null }>>;
export interface Krea2AdvancedWorkflowDescription {
  schemaVersion: 1;
  kind: 'krea2-advanced-candidate-workflow-description';
  status: string;
  upstream: { repository: string; commit: string };
  stages: Array<Record<string, unknown>>;
  invariants: {
    fixedStyleLoras: Array<{ name: string; strength: number; order: number }>;
    loraMutationAllowed: false;
    canonicalGeometry: 'canonical-rgba';
    materialOutput: 'krea2-rgb';
    noGenerationByAdapter: true;
  };
  readiness: Krea2AdvancedReadiness;
  fallback: Record<string, unknown> | null;
}

export function buildKrea2AdvancedWorkflowDescription(options?: Record<string, unknown>): Krea2AdvancedWorkflowDescription;
export function assertKrea2AdvancedCandidateContract(description: Krea2AdvancedWorkflowDescription): true;
export const KREA2_ADVANCED_UPSTREAM: Readonly<{ repository: string; commit: string }>;
export const KREA2_ADVANCED_REQUIREMENTS: Readonly<Record<string, unknown>>;
export const KREA2_ADVANCED_FALLBACK: Readonly<Record<string, unknown>>;
