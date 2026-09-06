import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname } from 'node:path';

import { downloadResumable } from './download.js';
import { contentHashJobId, legacyContentHashJobId } from './hash.js';
import type { MediaJob } from './job.js';
import { JobBusyError, Ledger, LostJobClaimError } from './ledger.js';
import { assertArtifactMatches, type MediaClient, type ProviderClientResolver } from './media-client.js';
import { assertHandleMatches, ProviderContractError } from './provider.js';
import { createProviderClientResolver } from './provider-clients.js';
import { retry } from './retry.js';
import type { AmbiguousArtifact, NormalizedArtifact } from './types.js';
import { validateAudio, validateImage, validateVideo, validateVideoFlexible } from './validate.js';

interface GeneratorOptions {
  client?: MediaClient;
  resolveClient?: ProviderClientResolver;
  ledger: Ledger;
  downloader?: typeof downloadResumable;
  sleep?: (milliseconds: number) => Promise<void>;
  afterCompletedValidationFailure?: () => Promise<void>;
  videoPostprocess?: (master: string, runtime: string, desktop: string) => Promise<void>;
  validateArtifact?: (job: MediaJob) => Promise<unknown>;
}

export class MediaGenerator {
  private readonly resolveClient: ProviderClientResolver;
  private readonly downloader: typeof downloadResumable;
  private readonly sleep: (milliseconds: number) => Promise<void>;
  private readonly owner = `${process.pid}-${randomUUID()}`;

  constructor(private readonly options: GeneratorOptions) {
    this.resolveClient = options.resolveClient ?? (options.client ? injectedPieResolver(options.client) : createProviderClientResolver());
    this.downloader = options.downloader ?? downloadResumable;
    this.sleep = options.sleep ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));
  }

  async generate(jobs: MediaJob[]): Promise<void> {
    for (const job of jobs) await this.generateOne(job);
  }

  private async generateOne(job: MediaJob): Promise<void> {
    const id = contentHashJobId(job);
    if (job.provider === 'pie') await this.options.ledger.adoptLegacyJob(legacyContentHashJobId(job), id);
    let token: number;
    for (;;) {
      const existing = (await this.options.ledger.read()).jobs[id];
      if (existing?.status === 'completed') {
        try { await (this.options.validateArtifact ?? validateJobArtifact)(job); return; }
        catch (error) {
          await this.options.afterCompletedValidationFailure?.();
          const result = await this.options.ledger.markCompletedArtifactStale(id, { claimToken: existing.claimToken, updatedAt: existing.updatedAt }, `Completed artifact requires regeneration: ${error instanceof Error ? error.message : String(error)}`);
          if (result === 'conflict') continue;
        }
      }
      if (job.kind === 'music' && !job.probe) await this.options.ledger.assertMusicBulkReady();
      const claim = await this.options.ledger.claimJob(id, this.owner);
      if (claim.status === 'busy') throw new JobBusyError(id);
      if (claim.status === 'already-completed') continue;
      token = claim.token;
      break;
    }
    let temporaryOutput: string | undefined;
    let masterTemporary: string | undefined;
    let desktopTemporary: string | undefined;
    try {
      if (job.kind === 'music') await this.options.ledger.assertMusicRequestAllowed();
      const artifact =
        job.kind === 'video'
          ? await this.generateVideo(job, id, token)
          : await retry(() => this.requestArtifact(job), { sleep: this.sleep });
      if (artifact.kind === 'ambiguous') {
        await this.options.ledger.markClaimedMusicAmbiguous(id, this.owner, token, artifact.reason);
        throw new Error('Music request outcome is ambiguous after HTTP 504');
      }
      assertArtifactMatches(job, artifact);
      temporaryOutput = await this.storeArtifact(artifact, job.output);
      if (job.kind === 'video') {
        masterTemporary = temporaryOutput;
        temporaryOutput = `${job.output}.${this.owner}.normalized.mp4`;
        desktopTemporary = `${job.desktopOutput}.${this.owner}.normalized.mp4`;
        await mkdir(dirname(job.desktopOutput), { recursive: true });
        await (this.options.videoPostprocess ?? normalizeVideo)(masterTemporary, temporaryOutput, desktopTemporary);
      }
      await (this.options.validateArtifact ?? validateJobArtifact)(job.kind === 'video' ? { ...job, output: temporaryOutput, masterOutput: masterTemporary!, desktopOutput: desktopTemporary! } : { ...job, output: temporaryOutput });
      await this.options.ledger.commitClaimedJob(id, this.owner, token, async () => {
        if (job.kind === 'video') {
          await mkdir(dirname(job.masterOutput), { recursive: true });
          await rename(masterTemporary!, job.masterOutput);
          await rename(desktopTemporary!, job.desktopOutput);
        }
        await rename(temporaryOutput!, job.output);
      }, { status: 'completed', output: job.output }, job.kind === 'music' && job.probe ? true : undefined);
      temporaryOutput = undefined;
      masterTemporary = undefined;
      desktopTemporary = undefined;
    } catch (error) {
      if (temporaryOutput) await unlink(temporaryOutput).catch(() => undefined);
      if (masterTemporary) await unlink(masterTemporary).catch(() => undefined);
      if (desktopTemporary) await unlink(desktopTemporary).catch(() => undefined);
      const current = (await this.options.ledger.read()).jobs[id];
      if (current?.status !== 'ambiguous') {
        await this.options.ledger.updateClaimedJob(id, this.owner, token, { status: 'failed', error: error instanceof Error ? error.message : String(error) }, job.kind === 'music' && job.probe ? false : undefined).catch((claimError) => { if (!(claimError instanceof LostJobClaimError)) throw claimError; });
      }
      throw error;
    }
  }

  private async requestArtifact(job: MediaJob): Promise<NormalizedArtifact | AmbiguousArtifact> {
    const client = this.resolveClient(job.provider);
    if (job.kind === 'image' && job.sourceImage) {
      if (!client.editImage) throw new Error(`${job.provider} does not implement editImage`);
      return client.editImage({ model: job.model, prompt: job.prompt, image: await readFile(job.sourceImage), width: job.width, height: job.height });
    }
    if (job.kind === 'image') {
      if (!client.generateImage) throw new Error(`${job.provider} does not implement generateImage`);
      return client.generateImage(job);
    }
    if (job.kind === 'speech') {
      if (!client.generateSpeech) throw new Error(`${job.provider} does not implement generateSpeech`);
      return client.generateSpeech(job);
    }
    if (job.kind === 'music') {
      if (!client.generateMusic) throw new Error(`${job.provider} does not implement generateMusic`);
      return client.generateMusic(job);
    }
    throw new Error(`Unsupported media job kind: ${String(job.kind)}`);
  }

  private async generateVideo(job: Extract<MediaJob, { kind: 'video' }>, jobId: string, token: number): Promise<NormalizedArtifact> {
    const client = this.resolveClient(job.provider);
    if (!client.submitVideo || !client.pollVideo) throw new Error(`${job.provider} does not implement video submit/poll`);
    const ledgerJob = (await this.options.ledger.read()).jobs[jobId];
    if (ledgerJob && Object.hasOwn(ledgerJob, 'legacyProviderJobId')) throw new ProviderContractError('Legacy unqualified providerJobId is quarantined; migrate it before resuming');
    const persistedHandle = ledgerJob && Object.hasOwn(ledgerJob, 'providerJob') ? ledgerJob.providerJob : undefined;
    if (ledgerJob && Object.hasOwn(ledgerJob, 'providerJob')) assertHandleMatches(job, persistedHandle);
    let handle = persistedHandle;
    if (handle === undefined) {
      const image = await readFile(job.sourceImage);
      const submitted = await retry(() => client.submitVideo!({ model: job.model, prompt: job.prompt, durationSeconds: job.durationSeconds, image }), { sleep: this.sleep });
      assertHandleMatches(job, submitted.handle);
      handle = submitted.handle;
      await this.options.ledger.updateClaimedJob(jobId, this.owner, token, { status: 'running', providerJob: handle });
    }
    for (let attempt = 0; attempt < 120; attempt += 1) {
      await this.options.ledger.renewClaim(jobId, this.owner, token);
      const result = await retry(() => client.pollVideo!(handle), { sleep: this.sleep });
      if ('kind' in result) return result;
      assertHandleMatches(job, result.handle);
      if (result.status === 'failed') throw new Error(`${job.provider} video job failed: ${handle.id}`);
      await this.sleep(5_000);
    }
    throw new Error(`${job.provider} video job timed out: ${handle.id}`);
  }

  private async storeArtifact(artifact: NormalizedArtifact, output: string): Promise<string> {
    await mkdir(dirname(output), { recursive: true });
    const temporary = `${output}.${this.owner}.part`;
    if (artifact.bytes) await writeFile(temporary, artifact.bytes);
    else if (artifact.sourceUrl) await this.downloader(artifact.sourceUrl, temporary);
    else throw new Error('Provider artifact contains neither bytes nor a download URL');
    return temporary;
  }
}

function injectedPieResolver(client: MediaClient): ProviderClientResolver {
  return (provider) => {
    if (provider !== 'pie') throw new ProviderContractError(`Injected Pie test client cannot service ${provider}`);
    return client;
  };
}

const execFileAsync = promisify(execFile);
export async function normalizeVideo(master: string, runtime: string, desktop: string, execute: (file: string, args: string[]) => Promise<unknown> = execFileAsync): Promise<void> {
  await execute('ffmpeg', ['-y', '-i', master, '-vf', 'fps=24,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2', '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-f', 'mp4', runtime]);
  await execute('ffmpeg', ['-y', '-i', master, '-vf', 'fps=24,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2', '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-f', 'mp4', desktop]);
}

export async function validateJobArtifact(job: MediaJob): Promise<unknown> {
  if (!job.validation) throw new Error('Media job must declare validation before validation or promotion');
  if (job.kind === 'image') return validateImage(job.output, job.validation);
  if (job.kind === 'video') return Promise.all([validateVideo(job.output, job.validation), validateVideo(job.desktopOutput, job.desktopValidation), validateVideoFlexible(job.masterOutput, job.masterValidation)]);
  return validateAudio(job.output, job.validation);
}
