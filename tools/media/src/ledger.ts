import { mkdir, open, readFile, rename, unlink, writeFile, type FileHandle } from 'node:fs/promises';
import { dirname } from 'node:path';

import { assertProviderJobHandle, type ProviderJobHandle } from './provider.js';

export interface LedgerJob {
  status: string;
  attempt?: number;
  output?: string;
  error?: string;
  providerJob?: ProviderJobHandle;
  legacyProviderJobId?: string;
  updatedAt?: string;
  leaseOwner?: string;
  leaseUntil?: number;
  claimToken?: number;
  migratedToJobId?: string;
  [key: string]: unknown;
}

export interface LedgerState {
  version: 2;
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
      return migrateLedger(JSON.parse(await readFile(this.path, 'utf8')));
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

  async adoptLegacyJob(legacyId: string, currentId: string): Promise<void> {
    if (legacyId === currentId) return;
    await this.update((state) => {
      const legacy = state.jobs[legacyId];
      if (!legacy || legacy.migratedToJobId) return;
      const current = state.jobs[currentId];
      state.jobs[currentId] = current ? mergeLegacySafety(current, legacy) : { ...legacy };
      legacy.migratedToJobId = currentId;
      legacy.updatedAt = new Date(this.now()).toISOString();
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

  async markCompletedArtifactStale(id: string, expected: { claimToken: number | undefined; updatedAt: string | undefined }, error: string): Promise<'marked' | 'conflict'> {
    return this.update((state) => {
      const job = state.jobs[id];
      if (job?.status !== 'completed' || job.claimToken !== expected.claimToken || job.updatedAt !== expected.updatedAt) return 'conflict';
      state.jobs[id] = { ...job, status: 'stale', error, updatedAt: new Date(this.now()).toISOString() };
      return 'marked';
    });
  }

  async updateClaimedJob(id: string, owner: string, token: number, entry: LedgerJob, probeValid?: boolean): Promise<void> {
    await this.update((state) => { const job = requireClaim(state, id, owner, token); state.jobs[id] = { ...job, ...entry, updatedAt: new Date(this.now()).toISOString() }; updateProbe(state, probeValid); });
  }

  async commitClaimedJob(id: string, owner: string, token: number, commitArtifact: () => Promise<void>, entry: LedgerJob, probeValid?: boolean): Promise<void> {
    await this.withLockedState(async (state) => {
      const job = requireClaim(state, id, owner, token);
      await commitArtifact();
      state.jobs[id] = { ...job, ...entry, updatedAt: new Date(this.now()).toISOString() };
      updateProbe(state, probeValid);
    });
  }

  async recordMusicProbe(valid: boolean): Promise<void> {
    await this.update((state) => {
      state.music.consecutiveValidProbes = valid ? state.music.consecutiveValidProbes + 1 : 0;
    });
  }

  async markClaimedMusicAmbiguous(id: string, owner: string, token: number, reason: string): Promise<void> {
    await this.update((state) => {
      const job = requireClaim(state, id, owner, token);
      state.jobs[id] = { ...job, status: 'ambiguous', error: reason, updatedAt: new Date(this.now()).toISOString() };
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
function updateProbe(state: LedgerState, valid?: boolean): void { if (valid !== undefined) state.music.consecutiveValidProbes = valid ? state.music.consecutiveValidProbes + 1 : 0; }

function emptyLedger(): LedgerState {
  return { version: 2, jobs: {}, music: { consecutiveValidProbes: 0, cooldownUntil: 0 } };
}

function migrateLedger(value: unknown): LedgerState {
  const source = requireRecord(value, 'media ledger');
  if (source.version === 2) return parseLedgerState(source);
  if (source.version !== 1) throw new Error('Unsupported media ledger version');
  const jobs = requireRecord(source.jobs, 'media ledger jobs');
  const migrated = Object.fromEntries(Object.entries(jobs).map(([id, job]) => [id, migrateV1Job(job, id)]));
  return parseLedgerState({ version: 2, jobs: migrated, music: source.music });
}

function parseLedgerState(source: Record<string, unknown>): LedgerState {
  const jobs = requireRecord(source.jobs, 'media ledger jobs');
  const music = requireRecord(source.music, 'media ledger music state');
  if (!isFiniteNonNegative(music.consecutiveValidProbes) || !isFiniteNonNegative(music.cooldownUntil)) throw new Error('Invalid media ledger music state');
  return {
    version: 2,
    jobs: Object.fromEntries(Object.entries(jobs).map(([id, job]) => [id, parseLedgerJob(job, id)])),
    music: { consecutiveValidProbes: music.consecutiveValidProbes, cooldownUntil: music.cooldownUntil },
  };
}

function parseLedgerJob(value: unknown, id: string): LedgerJob {
  const job = requireRecord(value, `media ledger job ${id}`);
  if (typeof job.status !== 'string' || job.status.length === 0) throw new Error(`Invalid media ledger job ${id}`);
  if (Object.hasOwn(job, 'providerJob')) assertProviderJobHandle(job.providerJob);
  if (Object.hasOwn(job, 'legacyProviderJobId') && typeof job.legacyProviderJobId !== 'string') throw new Error(`Invalid legacy provider handle in ${id}`);
  if (job.migratedToJobId !== undefined && typeof job.migratedToJobId !== 'string') throw new Error(`Invalid legacy migration target in ${id}`);
  return job as LedgerJob;
}

function migrateV1Job(value: unknown, id: string): LedgerJob {
  const source = requireRecord(value, `v1 media ledger job ${id}`);
  const migrated = { ...source };
  if (Object.hasOwn(source, 'providerJob')) throw new Error(`Unexpected typed provider handle in v1 media ledger job ${id}`);
  if (Object.hasOwn(source, 'providerJobId')) {
    migrated.legacyProviderJobId = typeof source.providerJobId === 'string' ? source.providerJobId : '';
    delete migrated.providerJobId;
  }
  return parseLedgerJob(migrated, id);
}

function mergeLegacySafety(current: LedgerJob, legacy: LedgerJob): LedgerJob {
  const legacyProviderJobId = legacy.legacyProviderJobId;
  if (typeof legacyProviderJobId === 'string' && !Object.hasOwn(current, 'legacyProviderJobId')) {
    return { ...current, legacyProviderJobId };
  }
  return current;
}

function requireRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid ${label}`);
  return value as Record<string, unknown>;
}

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
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
