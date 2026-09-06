import type { MediaClient, ProviderJobUpdate } from './media-client.js';
import { assertHandleMatches, assertHttpsArtifactUrl, joinApiUrl, normalizeHttpsApiBase, type ProviderJobHandle } from './provider.js';
import type { AmbiguousArtifact, NormalizedArtifact } from './types.js';

export type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export class MissingPieApiKeyError extends Error {
  constructor() {
    super('PIE_API_KEY is required before any Pie network request');
    this.name = 'MissingPieApiKeyError';
  }
}

export class PieApiError extends Error {
  constructor(
    readonly status: number,
    readonly retryAfterMs?: number,
  ) {
    super(`Pie API request failed with HTTP ${status}`);
    this.name = 'PieApiError';
  }
}

const DEFAULT_BASE_URL = 'https://api.pie-xian.com';
const OPENAI_VOICES = new Set(['alloy', 'echo', 'fable', 'nova', 'onyx', 'shimmer']);

export interface PieClientOptions {
  env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  fetcher?: FetchLike;
  baseUrl?: string;
}

export class PieClient implements MediaClient {
  private readonly env: NodeJS.ProcessEnv | Record<string, string | undefined>;
  private readonly fetcher: FetchLike;
  private readonly baseUrl: string;

  constructor(options: PieClientOptions = {}) {
    this.env = options.env ?? process.env;
    this.fetcher = options.fetcher ?? fetch;
    this.baseUrl = normalizeHttpsApiBase(options.baseUrl ?? DEFAULT_BASE_URL, 'Pie API base URL');
  }

  async generateImage(input: { model?: 'gpt-image-2'; prompt: string; width: number; height: number }): Promise<NormalizedArtifact> {
    assertModel(input.model, 'gpt-image-2');
    const response = await this.postJson('/v1/images/generations', {
      model: 'gpt-image-2',
      prompt: input.prompt,
      size: `${input.width}x${input.height}`,
    });
    return imageArtifact(await response.json());
  }

  async editImage(input: { model?: 'gpt-image-2'; prompt: string; image: Uint8Array; width: number; height: number }): Promise<NormalizedArtifact> {
    assertModel(input.model, 'gpt-image-2');
    const form = new FormData();
    form.set('model', 'gpt-image-2');
    form.set('prompt', input.prompt);
    form.set('image', new Blob([Buffer.from(input.image)]), 'input.png');
    form.set('size', `${input.width}x${input.height}`);
    form.set('n', '1');
    form.set('quality', 'high');
    form.set('output_format', 'png');
    const response = await this.request('/v1/images/edits', { method: 'POST', body: form });
    return imageArtifact(await response.json());
  }

  async submitVideo(input: { model?: 'seedance-1.5-pro' | 'grok-image-video-1.5-preview'; prompt: string; durationSeconds: number; image: Uint8Array }): Promise<ProviderJobUpdate> {
    assertModel(input.model, 'seedance-1.5-pro');
    const imageMimeType = detectImageMimeType(input.image);
    const response = await this.request('/v1/videos', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        model: 'seedance-1.5-pro', prompt: input.prompt, seconds: String(input.durationSeconds), resolution_name: '720p', images: [`data:${imageMimeType};base64,${Buffer.from(input.image).toString('base64')}`],
      }),
    });
    const body = (await response.json()) as { id?: unknown; task_id?: unknown; status?: unknown; state?: unknown; data?: { id?: unknown } };
    const id = body.id ?? body.task_id ?? body.data?.id;
    if (typeof id !== 'string') throw new Error('Invalid Pie video submit response');
    return {
      handle: { provider: 'pie', model: 'seedance-1.5-pro', id, pollProtocol: 'pie-videos-v1', contractVersion: 1 },
      status: String(body.status ?? body.state ?? 'pending'),
    };
  }

  async pollVideo(handle: ProviderJobHandle): Promise<NormalizedArtifact | ProviderJobUpdate> {
    assertHandleMatches({ provider: 'pie', model: 'seedance-1.5-pro' }, handle);
    const response = await this.request(`/v1/videos/${encodeURIComponent(handle.id)}`);
    const body = (await response.json()) as { status?: unknown; state?: unknown; metadata?: { url?: unknown }; video_url?: unknown; result?: { video_url?: unknown } };
    const status = String(body.status ?? body.state ?? 'unknown');
    if (!['success', 'completed', 'succeeded', 'complete'].includes(status)) {
      return { handle, status };
    }
    const video = body.metadata?.url ?? body.video_url ?? body.result?.video_url;
    if (typeof video !== 'string') throw new Error('Invalid Pie video poll response');
    return {
      kind: 'video',
      provider: 'pie',
      model: 'seedance-1.5-pro',
      sourceUrl: assertHttpsArtifactUrl(video).href,
      mimeType: 'video/mp4',
    };
  }

  async generateSpeech(input: { model?: 'speech-2.8-hd'; input: string; voice: string }): Promise<NormalizedArtifact> {
    assertModel(input.model, 'speech-2.8-hd');
    if (!OPENAI_VOICES.has(input.voice)) throw new Error(`Unsupported or unprobed OpenAI voice ID: ${input.voice}`);
    const response = await this.postJson('/v1/audio/speech', {
      model: 'speech-2.8-hd',
      input: input.input,
      voice: input.voice,
    });
    return {
      kind: 'audio',
      provider: 'pie',
      model: 'speech-2.8-hd',
      mimeType: response.headers.get('content-type') ?? 'audio/mpeg',
      bytes: new Uint8Array(await response.arrayBuffer()),
    };
  }

  async generateMusic(input: { model?: 'music-2.6'; prompt: string; durationSeconds: number }): Promise<NormalizedArtifact | AmbiguousArtifact> {
    assertModel(input.model, 'music-2.6');
    const response = await this.request('/v1/music_generation', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        model: 'music-2.6',
        prompt: input.prompt,
        is_instrumental: true,
        output_format: 'url',
        stream: false,
        audio_setting: { format: 'mp3', sample_rate: 44_100, bitrate: 256_000 },
      }),
    }, [504]);
    if (response.status === 504) return { kind: 'ambiguous', provider: 'pie', model: 'music-2.6', reason: 'gateway-timeout' };
    return musicArtifact(await response.json(), input.durationSeconds);
  }

  private async postJson(path: string, body: unknown): Promise<Response> {
    return this.request(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
  }

  private async request(
    path: string,
    init: RequestInit = {},
    allowedStatuses: number[] = [],
    authentication: 'bearer' | 'x-api-key' = 'bearer',
  ): Promise<Response> {
    const apiKey = this.env.PIE_API_KEY;
    if (!apiKey) throw new MissingPieApiKeyError();
    const headers = new Headers(init.headers);
    if (authentication === 'bearer') headers.set('authorization', `Bearer ${apiKey}`);
    else headers.set('x-api-key', apiKey);
    const response = await this.fetcher(joinApiUrl(this.baseUrl, path), { ...init, headers });
    if (!response.ok && !allowedStatuses.includes(response.status)) throw pieApiError(response);
    return response;
  }
}

function detectImageMimeType(image: Uint8Array): 'image/png' | 'image/jpeg' {
  const bytes = Buffer.from(image);
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'image/png';
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  throw new Error('Unsupported Seedance keyframe image format; expected PNG or JPEG bytes');
}

function imageArtifact(body: unknown): NormalizedArtifact {
  const item = (body as { data?: Array<{ url?: unknown; b64_json?: unknown }> }).data?.[0];
  if (typeof item?.url === 'string') return { kind: 'image', provider: 'pie', model: 'gpt-image-2', sourceUrl: assertHttpsArtifactUrl(item.url).href, mimeType: 'image/png' };
  if (typeof item?.b64_json === 'string') {
    return { kind: 'image', provider: 'pie', model: 'gpt-image-2', bytes: Buffer.from(item.b64_json, 'base64'), mimeType: 'image/png' };
  }
  throw new Error('Invalid Pie image response');
}

function musicArtifact(body: unknown, requestedDurationSeconds: number): NormalizedArtifact {
  const response = body as {
    data?: { audio?: unknown } | Array<{ url?: unknown; duration?: unknown }>;
    extra_info?: { music_duration?: unknown };
    base_resp?: { status_code?: unknown; status_msg?: unknown };
  };
  if (typeof response.base_resp?.status_code === 'number' && response.base_resp.status_code !== 0) {
    throw new Error(`Pie music API error: ${String(response.base_resp.status_msg ?? response.base_resp.status_code)}`);
  }
  const audio = Array.isArray(response.data) ? response.data[0]?.url : response.data?.audio;
  if (typeof audio !== 'string') throw new Error('Invalid Pie music response');
  const metadata = { requestedDurationSeconds, providerDurationMilliseconds: response.extra_info?.music_duration };
  if (/^https?:\/\//i.test(audio)) return { kind: 'audio', provider: 'pie', model: 'music-2.6', sourceUrl: assertHttpsArtifactUrl(audio).href, mimeType: 'audio/mpeg', metadata };
  const bytes = /^[0-9a-f]+$/i.test(audio) && audio.length % 2 === 0 ? Buffer.from(audio, 'hex') : Buffer.from(audio, 'base64');
  return { kind: 'audio', provider: 'pie', model: 'music-2.6', bytes, mimeType: 'audio/mpeg', metadata };
}

function assertModel(actual: string | undefined, expected: string): void {
  if (actual !== undefined && actual !== expected) throw new Error(`Pie client does not support model ${actual} for this operation`);
}

function pieApiError(response: Response): PieApiError {
  const retryAfter = response.headers.get('retry-after');
  const seconds = retryAfter === null ? undefined : Number(retryAfter);
  return new PieApiError(response.status, seconds !== undefined && Number.isFinite(seconds) ? seconds * 1000 : undefined);
}
