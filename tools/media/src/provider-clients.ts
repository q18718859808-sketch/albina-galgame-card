import type { MediaClient, ProviderClientResolver } from './media-client.js';
import { PieClient, type FetchLike } from './pie-client.js';
import { assertHttpsArtifactUrl, joinApiUrl, normalizeHttpsApiBase, ProviderContractError, type ProviderId } from './provider.js';
import type { NormalizedArtifact } from './types.js';

type Environment = NodeJS.ProcessEnv | Record<string, string | undefined>;

export class UnverifiedProviderContractError extends ProviderContractError {
  constructor(provider: ProviderId) {
    super(`${provider} is disabled until redacted HTTPS request/response fixtures verify its contract`);
    this.name = 'UnverifiedProviderContractError';
  }
}

export class HhhlImageClient implements MediaClient {
  readonly baseUrl: string;
  constructor(private readonly env: Environment, baseUrl = env.HHHL_BASE_URL ?? 'https://ai.hhhl.cc/v1') {
    this.baseUrl = normalizeHttpsApiBase(baseUrl, 'HHHL API base URL');
  }
  async generateImage(): Promise<never> { this.requireKey(); throw new UnverifiedProviderContractError('hhhl'); }
  async editImage(): Promise<never> { this.requireKey(); throw new UnverifiedProviderContractError('hhhl'); }
  private requireKey(): void { if (!this.env.HHHL_API_KEY) throw new ProviderContractError('HHHL_API_KEY is required before any HHHL request'); }
}

export class WisArtImageClient implements MediaClient {
  readonly baseUrl: string;
  private readonly fetcher: FetchLike;
  constructor(
    private readonly env: Environment,
    baseUrl = env.WISART_BASE_URL ?? 'https://wisart.kuaileshifu.com/v1',
    fetcher: FetchLike = fetch,
  ) {
    this.baseUrl = normalizeHttpsApiBase(baseUrl, 'WisArt API base URL');
    this.fetcher = fetcher;
  }

  async generateImage(input: { model: 'gpt-image-2'; prompt: string; width: number; height: number }): Promise<NormalizedArtifact> {
    const response = await this.postJson('/v1/images/generations', {
      model: input.model,
      prompt: input.prompt,
      size: `${input.width}x${input.height}`,
    });
    return imageArtifact(response);
  }

  async editImage(input: { model: 'gpt-image-2'; prompt: string; image: Uint8Array; width: number; height: number }): Promise<NormalizedArtifact> {
    const form = new FormData();
    form.set('model', input.model);
    form.set('prompt', input.prompt);
    form.set('image', new Blob([Buffer.from(input.image)]), 'input.png');
    form.set('size', `${input.width}x${input.height}`);
    const response = await this.request('/v1/images/edits', { method: 'POST', body: form });
    return imageArtifact(response);
  }

  private async postJson(path: string, body: unknown): Promise<Response> {
    return this.request(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
  }

  private async request(path: string, init: RequestInit = {}): Promise<Response> {
    const apiKey = this.env.WISART_API_KEY;
    if (!apiKey) throw new ProviderContractError('WISART_API_KEY is required before any WisArt request');
    const headers = new Headers(init.headers);
    headers.set('authorization', `Bearer ${apiKey}`);
    const response = await this.fetcher(joinApiUrl(this.baseUrl, path), { ...init, headers });
    if (!response.ok) throw new WisArtApiError(response.status);
    return response;
  }
}

export class WisArtApiError extends Error {
  constructor(readonly status: number) {
    super(`WisArt API request failed with HTTP ${status}`);
    this.name = 'WisArtApiError';
  }
}

async function imageArtifact(response: Response): Promise<NormalizedArtifact> {
  const body = await response.json() as {
    created?: unknown;
    data?: Array<{ url?: unknown; b64_json?: unknown; mime_type?: unknown; revised_prompt?: unknown }>;
  };
  const item = body.data?.[0];
  const metadata = responseMetadata(response, body.created, item?.revised_prompt);
  if (typeof item?.url === 'string') {
    return {
      kind: 'image', provider: 'wisart-openai-compatible', model: 'gpt-image-2',
      sourceUrl: assertHttpsArtifactUrl(item.url).href,
      ...(typeof item.mime_type === 'string' ? { mimeType: item.mime_type } : {}),
      ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
    };
  }
  if (typeof item?.b64_json === 'string') {
    const bytes = Buffer.from(item.b64_json, 'base64');
    return {
      kind: 'image', provider: 'wisart-openai-compatible', model: 'gpt-image-2', bytes,
      mimeType: detectImageMimeType(bytes),
      ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
    };
  }
  throw new Error('Invalid WisArt image response');
}

function responseMetadata(response: Response, created: unknown, revisedPrompt: unknown): Record<string, unknown> {
  const requestId = response.headers.get('x-request-id') ?? response.headers.get('openai-request-id');
  return {
    ...(requestId ? { requestId } : {}),
    ...(typeof created === 'number' || typeof created === 'string' ? { created } : {}),
    ...(typeof revisedPrompt === 'string' ? { revisedPrompt } : {}),
  };
}

function detectImageMimeType(bytes: Uint8Array): 'image/png' | 'image/jpeg' | 'image/webp' {
  const data = Buffer.from(bytes);
  if (data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'image/png';
  if (data.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) return 'image/jpeg';
  if (data.subarray(0, 4).toString('ascii') === 'RIFF' && data.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
  throw new Error('Unsupported WisArt image bytes; expected PNG, JPEG, or WebP');
}

export class GrokResponsesVideoClient implements MediaClient {
  readonly baseUrl: string;
  constructor(private readonly env: Environment, baseUrl = env.GROK_BASE_URL ?? '') {
    if (!baseUrl) throw new ProviderContractError('GROK_BASE_URL must name a verified HTTPS Responses endpoint');
    this.baseUrl = normalizeHttpsApiBase(baseUrl, 'Grok API base URL');
  }
  async submitVideo(): Promise<never> { this.requireKey(); throw new UnverifiedProviderContractError('grok-responses'); }
  async pollVideo(): Promise<never> { this.requireKey(); throw new UnverifiedProviderContractError('grok-responses'); }
  private requireKey(): void { if (!this.env.GROK_API_KEY) throw new ProviderContractError('GROK_API_KEY is required before any Grok request'); }
}

export function createProviderClientResolver(env: Environment = process.env, fetcher?: FetchLike): ProviderClientResolver {
  const clients = new Map<ProviderId, MediaClient>();
  return (provider) => {
    const existing = clients.get(provider);
    if (existing) return existing;
    const client = createClient(provider, env, fetcher);
    clients.set(provider, client);
    return client;
  };
}

function createClient(provider: ProviderId, env: Environment, fetcher?: FetchLike): MediaClient {
  if (provider === 'pie') return new PieClient({ env, ...(fetcher ? { fetcher } : {}) });
  if (provider === 'hhhl') return new HhhlImageClient(env);
  if (provider === 'wisart-openai-compatible') return new WisArtImageClient(env, undefined, fetcher);
  return new GrokResponsesVideoClient(env);
}
