import { createHash } from 'node:crypto';

export type LatentResolution = 'square' | 'portrait' | 'landscape';
export type LatentSampler = 'euler' | 'euler_ancestral' | 'dpmpp_2s_ancestral' | 'dpmpp_2m' | 'dpmpp_sde' | 'dpmpp_2m_sde' | 'ddim';
export type LatentScheduler = 'karras' | 'beta' | 'normal' | 'simple' | 'exponential';
export type LatentJobStatus = 'queued' | 'leased' | 'running' | 'succeeded' | 'failed' | 'cancelled';

type Env = NodeJS.ProcessEnv | Record<string, string | undefined>;
export type Fetcher = (input: string | URL, init?: RequestInit) => Promise<Response>;

export interface LatentClientOptions {
  env?: Env;
  baseUrl?: string;
  fetcher?: Fetcher;
  sleep?: (ms: number) => Promise<void>;
  now?: () => number;
}

export interface GenerationInput {
  prompt: string;
  negativePrompt?: string;
  seed?: number;
  resolution?: LatentResolution;
  steps?: number;
  sampler?: LatentSampler;
  scheduler?: LatentScheduler;
}

export interface Capacity { workersOnline: number; queued: number }
export interface GenerationJob { id: string; status: LatentJobStatus; artworkId?: string | null; progress?: number | null; errorCode?: string | null; [key: string]: unknown }
export interface DownloadedMedia { bytes: Uint8Array; mimeType: 'image/png' | 'image/jpeg' | 'image/webp'; sha256: string; artworkId: string }

export class LatentMoeError extends Error {
  constructor(readonly code: string, readonly status?: number, message = code) {
    super(message);
    this.name = 'LatentMoeError';
  }
}

let activeGenerationJobId: string | undefined;

export class LatentMoeClient {
  private readonly env: Env;
  private readonly baseUrl: string;
  private readonly fetcher: Fetcher;
  private readonly sleep: (ms: number) => Promise<void>;
  private readonly now: () => number;

  constructor(options: LatentClientOptions = {}) {
    this.env = options.env ?? process.env;
    this.baseUrl = (options.baseUrl ?? this.env.LATENT_MOE_BASE_URL ?? 'https://latent.moe').replace(/\/+$/u, '');
    const parsed = new URL(this.baseUrl);
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'latent.moe') throw new LatentMoeError('invalid_base_url', undefined, 'Latent.moe base URL must be https://latent.moe');
    this.fetcher = options.fetcher ?? fetch;
    this.sleep = options.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
    this.now = options.now ?? Date.now;
  }

  async status(): Promise<Capacity> {
    const body = await this.requestJson('/api/generate/status', true);
    if (!Number.isInteger(body.workersOnline) || !Number.isInteger(body.queued)) throw new LatentMoeError('invalid_capacity');
    return { workersOnline: body.workersOnline as number, queued: body.queued as number };
  }

  async generate(input: GenerationInput, options: { execute?: boolean; timeoutMs?: number } = {}): Promise<GenerationJob | { dryRun: true; request: GenerationInput }> {
    const request = validateInput(input);
    if (!options.execute) return { dryRun: true, request };
    const key = this.requireKey();
    if (activeGenerationJobId) throw new LatentMoeError('local_generation_lock', undefined, 'Another Latent.moe generation is already active');
    const capacity = await this.status();
    if (capacity.workersOnline < 1) throw new LatentMoeError('no_workers', undefined, 'Latent.moe has no online workers; generation was not submitted');
    const job = await this.requestJson('/api/generate', true, { method: 'POST', body: JSON.stringify(request), headers: { 'content-type': 'application/json' } }, key) as GenerationJob;
    if (typeof job.id !== 'string') throw new LatentMoeError('invalid_job');
    activeGenerationJobId = job.id;
    return job;
  }

  async poll(jobId: string, options: { timeoutMs?: number; intervalMs?: number } = {}): Promise<GenerationJob> {
    if (!/^[-a-z0-9]{8,}$/iu.test(jobId)) throw new LatentMoeError('invalid_job_id');
    const deadline = this.now() + (options.timeoutMs ?? 10 * 60_000);
    for (;;) {
      const job = await this.requestJson(`/api/generate/${encodeURIComponent(jobId)}`, true) as GenerationJob;
      if (!['queued', 'leased', 'running'].includes(job.status)) {
        if (activeGenerationJobId === job.id) activeGenerationJobId = undefined;
        return job;
      }
      if (this.now() >= deadline) throw new LatentMoeError('poll_timeout');
      await this.sleep(options.intervalMs ?? 2_000);
    }
  }

  async fetchMedia(artworkId: string, size: 'preview' | 'original' = 'preview'): Promise<DownloadedMedia> {
    if (!/^[-a-z0-9]{8,}$/iu.test(artworkId)) throw new LatentMoeError('invalid_artwork_id');
    const response = await this.request(`/api/media/${encodeURIComponent(artworkId)}?size=${size}`, true);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const mimeType = detectMime(bytes);
    return { bytes, mimeType, artworkId, sha256: createHash('sha256').update(bytes).digest('hex') };
  }

  async cancel(jobId: string): Promise<{ ok: boolean }> {
    if (!/^[-a-z0-9]{8,}$/iu.test(jobId)) throw new LatentMoeError('invalid_job_id');
    const body = await this.requestJson(`/api/generate/${encodeURIComponent(jobId)}/cancel`, true, { method: 'POST' }) as { ok?: unknown };
    if (body.ok !== true) throw new LatentMoeError('cancel_not_confirmed');
    if (activeGenerationJobId === jobId) activeGenerationJobId = undefined;
    return { ok: true };
  }

  async resolvePublic(query: { tags: string[]; source?: string; model?: string; rank?: number; size?: 'thumb' | 'preview' | 'original' }): Promise<unknown> {
    if (query.tags.length === 0 || query.tags.length > 12) throw new LatentMoeError('invalid_tags');
    const params = new URLSearchParams();
    query.tags.forEach((tag) => params.append('tag', tag));
    if (query.source) params.set('source', query.source);
    if (query.model) params.set('model', query.model);
    if (query.rank) params.set('rank', String(query.rank));
    params.set('size', query.size ?? 'preview');
    params.set('format', 'json');
    return this.requestJson(`/api/v1/images/resolve?${params}`, false);
  }

  private requireKey(): string { const key = this.env.LATENT_MOE_API_KEY; if (!key) throw new LatentMoeError('missing_api_key', undefined, 'LATENT_MOE_API_KEY is required'); return key; }

  private async requestJson(path: string, authenticated: boolean, init: RequestInit = {}, existingKey?: string): Promise<Record<string, unknown>> {
    const response = await this.request(path, authenticated, init, existingKey);
    const body = await response.json() as unknown;
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new LatentMoeError('invalid_json_response', response.status);
    return body as Record<string, unknown>;
  }

  private async request(path: string, authenticated: boolean, init: RequestInit = {}, existingKey?: string): Promise<Response> {
    const headers = new Headers(init.headers);
    if (authenticated) headers.set('authorization', `Bearer ${existingKey ?? this.requireKey()}`);
    const response = await this.fetcher(`${this.baseUrl}${path}`, { ...init, headers });
    if (!response.ok) {
      const retryAfter = response.headers.get('retry-after');
      throw new LatentMoeError(retryAfter ? `http_${response.status}_retry_${retryAfter}` : `http_${response.status}`, response.status);
    }
    return response;
  }
}

function validateInput(input: GenerationInput): GenerationInput {
  if (typeof input.prompt !== 'string' || input.prompt.length < 1 || input.prompt.length > 2000) throw new LatentMoeError('invalid_prompt');
  if (input.negativePrompt !== undefined && input.negativePrompt.length > 2000) throw new LatentMoeError('invalid_negative_prompt');
  if (input.steps !== undefined && (!Number.isInteger(input.steps) || input.steps < 8 || input.steps > 16)) throw new LatentMoeError('steps_out_of_range');
  if (input.seed !== undefined && (!Number.isSafeInteger(input.seed) || input.seed < 0)) throw new LatentMoeError('seed_out_of_range');
  return { resolution: 'portrait', steps: 12, sampler: 'euler', scheduler: 'normal', ...input };
}

function detectMime(bytes: Uint8Array): DownloadedMedia['mimeType'] {
  if (bytes.subarray(0, 8).every((value, index) => value === [137, 80, 78, 71, 13, 10, 26, 10][index])) return 'image/png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if (new TextDecoder().decode(bytes.subarray(0, 4)) === 'RIFF' && new TextDecoder().decode(bytes.subarray(8, 12)) === 'WEBP') return 'image/webp';
  throw new LatentMoeError('unsupported_media');
}
