export interface ReleaseGateStatus {
  version: string;
  releaseCandidate: boolean;
  completeEdition: boolean;
  completionBlockers?: string[];
}

export interface ReleaseRepositoryState {
  workingTreeClean?: boolean;
  branch?: string;
  head?: string;
  localReleaseTagCommit?: string | null;
  remoteReleaseTagExists?: boolean;
  localFinalTagCommit?: string;
  remoteFinalTagExists?: boolean;
}

export interface ReleaseGateResult {
  channel: 'rc' | 'final';
  allowed: boolean;
  incomplete: boolean;
  blockers: string[];
}

export function isPrereleaseVersion(version: string): boolean;
export function hasPublishableWorktreeChanges(porcelain: string): boolean;
export function evaluateReleaseGate(input: {
  channel: 'rc' | 'final';
  status: ReleaseGateStatus;
  repository?: ReleaseRepositoryState;
}): ReleaseGateResult;
export function buildReleaseCommands(input: {
  channel: 'rc' | 'final';
  status: ReleaseGateStatus;
  repository: ReleaseRepositoryState & { branch: string; head: string };
  remote?: string;
}): ReleaseGateResult & { commands: string[][] };
