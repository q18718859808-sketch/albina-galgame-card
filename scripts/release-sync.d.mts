export type ReleaseStepId =
  | 'assets:generate'
  | 'story:compile'
  | 'source:build'
  | 'release:promote'
  | 'assets:audit';

export interface ReleaseStep {
  readonly id: ReleaseStepId;
  readonly path: string;
  readonly args: readonly string[];
}

export const RELEASE_STEPS: readonly ReleaseStep[];

export function runReleasePipeline(
  runner?: (step: ReleaseStep) => Promise<void>,
): Promise<void>;
