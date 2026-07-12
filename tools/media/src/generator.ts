import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { downloadResumable } from './download.js';
import { contentHashJobId } from './hash.js';
import type { MediaJob } from './job.js';
import { Ledger } from './ledger.js';
import { PieClient } from './pie-client.js';
import { retry } from './retry.js';
import type { AmbiguousArtifact, NormalizedArtifact } from './types.js';
import { validateAudio, validateImage, validateVideo } from './validate.js';

export interface MediaClient {
  generateImage?(input: { prompt: string; width: number; height: number }): Promise<NormalizedArtifact>;
  editImage?(input: { prompt: string; image: Uint8Array; width: number; height: number }): Promise<NormalizedArtifact>;
  submitVideo?(input: { prompt: string; durationSeconds: number; image: Uint8Array }): Promise<{ providerJobId: string; status: string }>;
  pollVideo?(id: string): Promise<NormalizedArtifact | { providerJobId: string; status: string }>;
  generateSpeech?(input: { input: string; voice: string }): Promise<NormalizedArtifact>;
  generateMusic?(input: { prompt: string; durationSeconds: number }): Promise<NormalizedArtifact | AmbiguousArtifact>;
}

interface GeneratorOptions {
  client?: MediaClient;
  ledger: Ledger;
  downloader?: typeof downloadResumable;
  sleep?: (milliseconds: number) => Promise<void>;
}

export class MediaGenerator {
  private readonly client: MediaClient;
  private readonly downloader: typeof downloadResumable;
  private readonly sleep: (milliseconds: number) => Promise<void>;

  constructor(private readonly options: GeneratorOptions) {
    this.client = options.client ?? new PieClient();
    this.downloader = options.downloader ?? downloadResumable;
    this.sleep = options.sleep ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));
  }

  async generate(jobs: MediaJob[]): Promise<void> {
    for (const job of jobs) await this.generateOne(job);
  }

  private async generateOne(job: MediaJob): Promise<void> {
    const id = contentHashJobId(job);
    const existing = (await this.options.ledger.read()).jobs[id];
    if (existing?.status === 'completed') {
      try {
        await validateJobArtifact(job);
        return;
      } catch (error) {
        await this.options.ledger.upsertJob(id, { status: 'stale', error: `Completed artifact requires regeneration: ${error instanceof Error ? error.message : String(error)}` });
      }
    }
    if (job.kind === 'music' && !job.probe) await this.options.ledger.assertMusicBulkReady();
    await this.options.ledger.upsertJob(id, { status: 'running' });
    try {
      if (job.kind === 'music') await this.options.ledger.assertMusicRequestAllowed();
      const artifact =
        job.kind === 'video'
          ? await this.generateVideo(job, id)
          : await retry(() => this.requestArtifact(job), { sleep: this.sleep });
      if (artifact.kind === 'ambiguous') {
        await this.options.ledger.startMusicCooldown();
        await this.options.ledger.upsertJob(id, { status: 'ambiguous', error: artifact.reason });
        throw new Error('Music request outcome is ambiguous after HTTP 504');
      }
      await this.storeArtifact(artifact, job.output);
      await validateJobArtifact(job);
      if (job.kind === 'music' && job.probe) await this.options.ledger.recordMusicProbe(true);
      await this.options.ledger.upsertJob(id, { status: 'completed', output: job.output });
    } catch (error) {
      if (job.kind === 'music' && job.probe) await this.options.ledger.recordMusicProbe(false);
      const current = (await this.options.ledger.read()).jobs[id];
      if (current?.status !== 'ambiguous') {
        await this.options.ledger.upsertJob(id, { status: 'failed', error: error instanceof Error ? error.message : String(error) });
      }
      throw error;
    }
  }

  private async requestArtifact(job: MediaJob): Promise<NormalizedArtifact | AmbiguousArtifact> {
    if (job.kind === 'image' && job.sourceImage) {
      if (!this.client.editImage) throw new Error('Media client does not implement editImage');
      return this.client.editImage({ prompt: job.prompt, image: await readFile(job.sourceImage), width: job.width, height: job.height });
    }
    if (job.kind === 'image') {
      if (!this.client.generateImage) throw new Error('Media client does not implement generateImage');
      return this.client.generateImage(job);
    }
    if (job.kind === 'speech') {
      if (!this.client.generateSpeech) throw new Error('Media client does not implement generateSpeech');
      return this.client.generateSpeech(job);
    }
    if (job.kind === 'music') {
      if (!this.client.generateMusic) throw new Error('Media client does not implement generateMusic');
      return this.client.generateMusic(job);
    }
    throw new Error(`Unsupported media job kind: ${String(job.kind)}`);
  }

  private async generateVideo(job: Extract<MediaJob, { kind: 'video' }>, jobId: string): Promise<NormalizedArtifact> {
    if (!this.client.submitVideo || !this.client.pollVideo) throw new Error('Media client does not implement video submit/poll');
    const persisted = (await this.options.ledger.read()).jobs[jobId]?.providerJobId;
    let providerJobId = typeof persisted === 'string' ? persisted : undefined;
    if (!providerJobId) {
      const image = await readFile(job.sourceImage);
      const submitted = await retry(() => this.client.submitVideo!({ ...job, image }), { sleep: this.sleep });
      providerJobId = submitted.providerJobId;
      await this.options.ledger.upsertJob(jobId, { status: 'polling', providerJobId });
    }
    for (let attempt = 0; attempt < 120; attempt += 1) {
      const result = await retry(() => this.client.pollVideo!(providerJobId), { sleep: this.sleep });
      if ('kind' in result) return result;
      if (result.status === 'failed') throw new Error(`Pie video job failed: ${providerJobId}`);
      await this.sleep(5_000);
    }
    throw new Error(`Pie video job timed out: ${providerJobId}`);
  }

  private async storeArtifact(artifact: NormalizedArtifact, output: string): Promise<void> {
    await mkdir(dirname(output), { recursive: true });
    if (artifact.bytes) await writeFile(output, artifact.bytes);
    else if (artifact.sourceUrl) await this.downloader(artifact.sourceUrl, output);
    else throw new Error('Pie artifact contains neither bytes nor a download URL');
  }
}

export async function validateJobArtifact(job: MediaJob): Promise<unknown> {
  if (!job.validation) throw new Error('Media job must declare validation before validation or promotion');
  if (job.kind === 'image') return validateImage(job.output, job.validation);
  if (job.kind === 'video') return validateVideo(job.output, job.validation);
  return validateAudio(job.output, job.validation);
}
