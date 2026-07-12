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
const OPENAI_VOICES = new Set(['alloy', 'ash', 'ballad', 'coral', 'echo', 'fable', 'nova', 'onyx', 'sage', 'shimmer', 'verse']);

interface PieClientOptions {
  env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  fetcher?: FetchLike;
  baseUrl?: string;
}

export class PieClient {
  private readonly env: NodeJS.ProcessEnv | Record<string, string | undefined>;
  private readonly fetcher: FetchLike;
  private readonly baseUrl: string;

  constructor(options: PieClientOptions = {}) {
    this.env = options.env ?? process.env;
    this.fetcher = options.fetcher ?? fetch;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
  }

  async generateImage(input: { prompt: string; width: number; height: number }): Promise<NormalizedArtifact> {
    const response = await this.postJson('/v1/images/generations', {
      model: 'gpt-image-2',
      prompt: input.prompt,
      size: `${input.width}x${input.height}`,
    });
    return imageArtifact(await response.json());
  }

  async editImage(input: { prompt: string; image: Uint8Array; width: number; height: number }): Promise<NormalizedArtifact> {
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

  async submitVideo(input: { prompt: string; durationSeconds: number; image: Uint8Array }): Promise<{ providerJobId: string; status: string }> {
    const imageMimeType = detectImageMimeType(input.image);
    const response = await this.request('/api/v1/task', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        model: 'seedance',
        task_type: 'seedance-1.5-pro',
        input: { prompt: input.prompt, duration: input.durationSeconds, images: [`data:${imageMimeType};base64,${Buffer.from(input.image).toString('base64')}`] },
      }),
    }, [], 'x-api-key');
    const body = (await response.json()) as { data?: { task_id?: unknown; status?: unknown } };
    if (typeof body.data?.task_id !== 'string' || typeof body.data.status !== 'string') throw new Error('Invalid Pie video submit response');
    return { providerJobId: body.data.task_id, status: body.data.status };
  }

  async pollVideo(providerJobId: string): Promise<NormalizedArtifact | { providerJobId: string; status: string }> {
    const response = await this.request(`/api/v1/task/${encodeURIComponent(providerJobId)}`, {}, [], 'x-api-key');
    const body = (await response.json()) as { data?: { status?: unknown; output?: { video?: unknown } } };
    if (!['success', 'completed', 'succeeded'].includes(String(body.data?.status))) {
      return { providerJobId, status: String(body.data?.status ?? 'unknown') };
    }
    if (typeof body.data?.output?.video !== 'string') throw new Error('Invalid Pie video poll response');
    return {
      kind: 'video',
      model: 'seedance-1.5-pro',
      sourceUrl: body.data.output.video,
      mimeType: 'video/mp4',
    };
  }

  async generateSpeech(input: { input: string; voice: string }): Promise<NormalizedArtifact> {
    if (!OPENAI_VOICES.has(input.voice)) throw new Error(`Unsupported or unprobed OpenAI voice ID: ${input.voice}`);
    const response = await this.postJson('/v1/audio/speech', {
      model: 'speech-2.8-hd',
      input: input.input,
      voice: input.voice,
    });
    return {
      kind: 'audio',
      model: 'speech-2.8-hd',
      mimeType: response.headers.get('content-type') ?? 'audio/mpeg',
      bytes: new Uint8Array(await response.arrayBuffer()),
    };
  }

  async generateMusic(input: { prompt: string; durationSeconds: number }): Promise<NormalizedArtifact | AmbiguousArtifact> {
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
    if (response.status === 504) return { kind: 'ambiguous', model: 'music-2.6', reason: 'gateway-timeout' };
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
    const response = await this.fetcher(`${this.baseUrl}${path}`, { ...init, headers });
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
  if (typeof item?.url === 'string') return { kind: 'image', model: 'gpt-image-2', sourceUrl: item.url, mimeType: 'image/png' };
  if (typeof item?.b64_json === 'string') {
    return { kind: 'image', model: 'gpt-image-2', bytes: Buffer.from(item.b64_json, 'base64'), mimeType: 'image/png' };
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
  if (/^https?:\/\//i.test(audio)) return { kind: 'audio', model: 'music-2.6', sourceUrl: audio, mimeType: 'audio/mpeg', metadata };
  const bytes = /^[0-9a-f]+$/i.test(audio) && audio.length % 2 === 0 ? Buffer.from(audio, 'hex') : Buffer.from(audio, 'base64');
  return { kind: 'audio', model: 'music-2.6', bytes, mimeType: 'audio/mpeg', metadata };
}

function pieApiError(response: Response): PieApiError {
  const retryAfter = response.headers.get('retry-after');
  const seconds = retryAfter === null ? undefined : Number(retryAfter);
  return new PieApiError(response.status, seconds !== undefined && Number.isFinite(seconds) ? seconds * 1000 : undefined);
}
