import { mkdir, open, readFile, rename, unlink, writeFile, type FileHandle } from 'node:fs/promises';
import { dirname } from 'node:path';

export interface LedgerJob {
  status: string;
  attempt?: number;
  output?: string;
  error?: string;
  providerJobId?: string;
  updatedAt?: string;
  leaseOwner?: string;
  leaseUntil?: number;
  claimToken?: number;
  [key: string]: unknown;
}

export interface LedgerState {
  version: 1;
  jobs: Record<string, LedgerJob>;
  music: {
    consecutiveValidProbes: number;
    cooldownUntil: number;
  };
}

export class MusicBulkNotReadyError extends Error {
  constructor() {
    super('Bulk music generation requires three consecutive valid probes');
    this.name = 'MusicBulkNotReadyError';
  }
}

export class MusicCooldownError extends Error {
  constructor(readonly cooldownUntil: number) {
    super(`Music generation is cooling down until ${new Date(cooldownUntil).toISOString()}`);
    this.name = 'MusicCooldownError';
  }
}
export class JobBusyError extends Error { constructor(id: string) { super(`Media job is busy under an active lease: ${id}`); this.name = 'JobBusyError'; } }
export class LostJobClaimError extends Error { constructor(id: string) { super(`Media job claim was lost or reclaimed: ${id}`); this.name = 'LostJobClaimError'; } }

export class Ledger {
  private readonly now: () => number;

  constructor(
    private readonly path: string,
    options: { now?: () => number } = {},
  ) {
    this.now = options.now ?? Date.now;
  }

  async read(): Promise<LedgerState> {
    try {
      return JSON.parse(await readFile(this.path, 'utf8')) as LedgerState;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return emptyLedger();
      throw error;
    }
  }

  async upsertJob(id: string, entry: LedgerJob): Promise<void> {
    await this.update((state) => {
      state.jobs[id] = { ...state.jobs[id], ...entry, updatedAt: new Date(this.now()).toISOString() };
    });
  }

  async claimJob(id: string, owner: string, leaseMilliseconds = 10 * 60 * 1000): Promise<{ status: 'claimed'; token: number } | { status: 'already-completed' } | { status: 'busy' }> {
    return this.update((state) => {
      const existing = state.jobs[id];
      if (existing?.status === 'completed') return { status: 'already-completed' } as const;
      if (existing?.status === 'running' && typeof existing.leaseUntil === 'number' && existing.leaseUntil > this.now()) return { status: 'busy' } as const;
      const token = (existing?.claimToken ?? 0) + 1;
      state.jobs[id] = { ...existing, status: 'running', leaseOwner: owner, leaseUntil: this.now() + leaseMilliseconds, claimToken: token, updatedAt: new Date(this.now()).toISOString() };
      return { status: 'claimed', token } as const;
    });
  }

  async renewClaim(id: string, owner: string, token: number, leaseMilliseconds = 10 * 60 * 1000): Promise<void> {
    await this.update((state) => { const job = requireClaim(state, id, owner, token); job.leaseUntil = this.now() + leaseMilliseconds; job.updatedAt = new Date(this.now()).toISOString(); });
  }

  async updateClaimedJob(id: string, owner: string, token: number, entry: LedgerJob): Promise<void> {
    await this.update((state) => { const job = requireClaim(state, id, owner, token); state.jobs[id] = { ...job, ...entry, updatedAt: new Date(this.now()).toISOString() }; });
  }

  async commitClaimedJob(id: string, owner: string, token: number, commitArtifact: () => Promise<void>, entry: LedgerJob): Promise<void> {
    await this.withLockedState(async (state) => {
      const job = requireClaim(state, id, owner, token);
      await commitArtifact();
      state.jobs[id] = { ...job, ...entry, updatedAt: new Date(this.now()).toISOString() };
    });
  }

  async recordMusicProbe(valid: boolean): Promise<void> {
    await this.update((state) => {
      state.music.consecutiveValidProbes = valid ? state.music.consecutiveValidProbes + 1 : 0;
    });
  }

  async startMusicCooldown(): Promise<void> {
    await this.update((state) => {
      state.music.cooldownUntil = this.now() + 5 * 60 * 1000;
      state.music.consecutiveValidProbes = 0;
    });
  }

  async assertMusicBulkReady(): Promise<void> {
    const state = await this.read();
    if (state.music.consecutiveValidProbes < 3) throw new MusicBulkNotReadyError();
  }

  async assertMusicRequestAllowed(): Promise<void> {
    const state = await this.read();
    if (state.music.cooldownUntil > this.now()) throw new MusicCooldownError(state.music.cooldownUntil);
  }

  private async update<T>(mutator: (state: LedgerState) => T): Promise<T> {
    return this.withLockedState(async (state) => mutator(state));
  }

  private async withLockedState<T>(mutator: (state: LedgerState) => Promise<T>): Promise<T> {
    await mkdir(dirname(this.path), { recursive: true });
    const lock = await acquireLock(`${this.path}.lock`);
    try {
      const state = await this.read();
      const result = await mutator(state);
      const temporary = `${this.path}.${process.pid}.${Date.now()}.tmp`;
      await writeFile(temporary, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
      await rename(temporary, this.path);
      return result;
    } finally {
      await lock.close();
      await unlink(`${this.path}.lock`).catch(() => undefined);
    }
  }
}

function requireClaim(state: LedgerState, id: string, owner: string, token: number): LedgerJob {
  const job = state.jobs[id];
  if (job?.status !== 'running' || job.leaseOwner !== owner || job.claimToken !== token) throw new LostJobClaimError(id);
  return job;
}

function emptyLedger(): LedgerState {
  return { version: 1, jobs: {}, music: { consecutiveValidProbes: 0, cooldownUntil: 0 } };
}

async function acquireLock(path: string): Promise<FileHandle> {
  for (let attempt = 0; attempt < 500; attempt += 1) {
    try {
      return await open(path, 'wx');
    } catch (error) {
      if (!['EEXIST', 'EPERM', 'EACCES'].includes((error as NodeJS.ErrnoException).code ?? '')) throw error;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  throw new Error(`Timed out acquiring ledger lock: ${path}`);
}
