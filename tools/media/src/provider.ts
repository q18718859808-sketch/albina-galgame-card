export type ProviderId = 'pie' | 'hhhl' | 'wisart-openai-compatible' | 'grok-responses';
export type ImageProviderId = 'pie' | 'hhhl' | 'wisart-openai-compatible';
export type VideoProviderId = 'pie' | 'grok-responses';
export type ImageModel = 'gpt-image-2';
export type VideoModel = 'seedance-1.5-pro' | 'grok-image-video-1.5-preview';
export type SpeechModel = 'speech-2.8-hd';
export type MusicModel = 'music-2.6';
export type MediaModel = ImageModel | VideoModel | SpeechModel | MusicModel;
export type MediaKind = 'image' | 'video' | 'speech' | 'music';
export type PollProtocol = 'pie-videos-v1' | 'openai-responses-v1';

export interface ProviderJobHandle {
  provider: VideoProviderId;
  model: VideoModel;
  id: string;
  pollProtocol: PollProtocol;
  contractVersion: 1;
}

export class ProviderContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProviderContractError';
  }
}

const allowedModels: Record<MediaKind, Partial<Record<ProviderId, readonly MediaModel[]>>> = {
  image: { pie: ['gpt-image-2'], hhhl: ['gpt-image-2'], 'wisart-openai-compatible': ['gpt-image-2'] },
  video: { pie: ['seedance-1.5-pro'], 'grok-responses': ['grok-image-video-1.5-preview'] },
  speech: { pie: ['speech-2.8-hd'] },
  music: { pie: ['music-2.6'] },
};

export function assertProviderModel(kind: MediaKind, provider: string, model: string): asserts provider is ProviderId {
  const models = allowedModels[kind][provider as ProviderId];
  if (!models?.includes(model as MediaModel)) {
    throw new ProviderContractError(`Unsupported provider/model for ${kind}: ${provider}/${model}`);
  }
}

export function assertHandleMatches(
  job: { provider: ProviderId; model: MediaModel },
  handle: unknown,
): asserts handle is ProviderJobHandle {
  assertProviderJobHandle(handle);
  const protocol = job.provider === 'pie' ? 'pie-videos-v1' : 'openai-responses-v1';
  if (handle.contractVersion !== 1 || handle.provider !== job.provider || handle.model !== job.model || handle.pollProtocol !== protocol) {
    throw new ProviderContractError(`Remote handle does not match ${job.provider}/${job.model}`);
  }
}

export function assertProviderJobHandle(value: unknown): asserts value is ProviderJobHandle {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ProviderContractError('Invalid remote provider handle');
  const handle = value as Record<string, unknown>;
  const expectedKeys = ['contractVersion', 'id', 'model', 'pollProtocol', 'provider'];
  if (Object.keys(handle).sort().join(',') !== expectedKeys.join(',')) throw new ProviderContractError('Invalid remote provider handle fields');
  if (typeof handle.id !== 'string' || !/^\S{1,512}$/u.test(handle.id)) throw new ProviderContractError('Remote provider handle requires a non-empty ID');
  if (handle.contractVersion !== 1 || typeof handle.provider !== 'string' || typeof handle.model !== 'string') throw new ProviderContractError('Invalid remote provider handle version');
  assertProviderModel('video', handle.provider, handle.model);
  const protocol = handle.provider === 'pie' ? 'pie-videos-v1' : 'openai-responses-v1';
  if (handle.pollProtocol !== protocol) throw new ProviderContractError('Remote provider handle has an invalid poll protocol');
}

export function normalizeHttpsApiBase(value: string, label: string): string {
  let url: URL;
  try { url = new URL(value); } catch { throw new ProviderContractError(`${label} must be an absolute HTTPS URL`); }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new ProviderContractError(`${label} must use HTTPS without credentials, query, or fragment`);
  }
  assertPublicHost(url.hostname, label);
  return `${url.origin}${url.pathname.replace(/\/+$/u, '')}`;
}

export function joinApiUrl(base: string, versionedPath: string): string {
  const normalizedPath = versionedPath.startsWith('/') ? versionedPath : `/${versionedPath}`;
  if (base.endsWith('/v1') && normalizedPath.startsWith('/v1/')) return `${base}${normalizedPath.slice(3)}`;
  return `${base}${normalizedPath}`;
}

export function assertHttpsArtifactUrl(value: string): URL {
  let url: URL;
  try { url = new URL(value); } catch { throw new ProviderContractError('Artifact URL must be an absolute HTTPS URL'); }
  if (url.protocol !== 'https:' || url.username || url.password) throw new ProviderContractError('Artifact URL must use HTTPS without embedded credentials');
  assertPublicHost(url.hostname, 'Artifact URL');
  return url;
}

function assertPublicHost(hostname: string, label: string): void {
  const host = hostname.toLowerCase().replace(/^\[|\]$/gu, '').replace(/\.$/u, '');
  const localName = host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.home.arpa');
  const addressKind = isIP(host);
  if (localName || (addressKind === 4 && isNonPublicIpv4(host)) || (addressKind === 6 && isNonPublicIpv6(host))) {
    throw new ProviderContractError(`${label} must not target a local or private-network host`);
  }
}

function isNonPublicIpv4(host: string): boolean {
  const [first = -1, second = -1, third = -1] = host.split('.').map(Number);
  return first === 0 || first === 10 || first === 127 || first >= 224
    || (first === 100 && second >= 64 && second <= 127)
    || (first === 169 && second === 254) || (first === 172 && second >= 16 && second <= 31)
    || (first === 192 && second === 168) || (first === 192 && second === 0 && [0, 2].includes(third))
    || (first === 198 && [18, 19].includes(second)) || (first === 198 && second === 51 && third === 100)
    || (first === 203 && second === 0 && third === 113);
}

function isNonPublicIpv6(host: string): boolean {
  const mapped = ipv4FromMappedIpv6(host);
  if (mapped) return isNonPublicIpv4(mapped);
  if (host === '::' || host === '::1' || host.startsWith('::')) return true;
  const first = Number.parseInt(host.split(':')[0] ?? '', 16);
  return (first & 0xfe00) === 0xfc00 || (first & 0xffc0) === 0xfe80
    || (first & 0xffc0) === 0xfec0 || (first & 0xff00) === 0xff00
    || host.startsWith('2001:db8:');
}

function ipv4FromMappedIpv6(host: string): string | undefined {
  if (!host.startsWith('::ffff:')) return undefined;
  const tail = host.slice('::ffff:'.length);
  if (isIP(tail) === 4) return tail;
  const match = /^([a-f0-9]{1,4}):([a-f0-9]{1,4})$/iu.exec(tail);
  if (!match) return undefined;
  const high = Number.parseInt(match[1] ?? '', 16);
  const low = Number.parseInt(match[2] ?? '', 16);
  return `${high >>> 8}.${high & 255}.${low >>> 8}.${low & 255}`;
}
import { isIP } from 'node:net';
