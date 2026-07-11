import { mkdir, open, readFile, rename, unlink, writeFile, type FileHandle } from 'node:fs/promises';
import { dirname } from 'node:path';

export interface LedgerJob {
  status: string;
  attempt?: number;
  output?: string;
  error?: string;
  providerJobId?: string;
  updatedAt?: string;
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

  private async update(mutator: (state: LedgerState) => void): Promise<void> {
    await mkdir(dirname(this.path), { recursive: true });
    const lock = await acquireLock(`${this.path}.lock`);
    try {
      const state = await this.read();
      mutator(state);
      const temporary = `${this.path}.${process.pid}.${Date.now()}.tmp`;
      await writeFile(temporary, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
      await rename(temporary, this.path);
    } finally {
      await lock.close();
      await unlink(`${this.path}.lock`).catch(() => undefined);
    }
  }
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
