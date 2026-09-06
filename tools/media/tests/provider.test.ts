import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, test } from 'vitest';

import { loadJob } from '../src/job.js';
import { Ledger } from '../src/ledger.js';
import { HhhlImageClient, GrokResponsesVideoClient, UnverifiedProviderContractError, WisArtImageClient } from '../src/provider-clients.js';
import { assertHandleMatches, assertHttpsArtifactUrl, assertProviderModel, joinApiUrl, normalizeHttpsApiBase, ProviderContractError } from '../src/provider.js';

describe('provider contracts', () => {
  test.each([
    ['image', 'pie', 'gpt-image-2'],
    ['image', 'hhhl', 'gpt-image-2'],
    ['video', 'pie', 'seedance-1.5-pro'],
    ['video', 'grok-responses', 'grok-image-video-1.5-preview'],
    ['speech', 'pie', 'speech-2.8-hd'],
    ['music', 'pie', 'music-2.6'],
  ] as const)('accepts %s via %s/%s', (kind, provider, model) => {
    expect(() => assertProviderModel(kind, provider, model)).not.toThrow();
  });

  test.each([
    ['image', 'grok-responses', 'gpt-image-2'],
    ['video', 'hhhl', 'seedance-1.5-pro'],
    ['video', 'pie', 'grok-image-video-1.5-preview'],
    ['speech', 'hhhl', 'speech-2.8-hd'],
  ] as const)('rejects %s via %s/%s', (kind, provider, model) => {
    expect(() => assertProviderModel(kind, provider, model)).toThrow(ProviderContractError);
  });

  test('normalizes provider roots without creating /v1/v1 paths', () => {
    const root = normalizeHttpsApiBase('https://api.example.invalid/v1/', 'fixture API');
    expect(root).toBe('https://api.example.invalid/v1');
    expect(joinApiUrl(root, '/v1/images/generations')).toBe('https://api.example.invalid/v1/images/generations');
  });

  test.each([
    'http://216.195.211.206:8317/v1/responses',
    'http://api.example.invalid/v1',
    'https://user:secret@api.example.invalid/v1',
    'https://localhost/v1',
    'https://localhost./v1',
    'https://api.localhost/v1',
    'https://0.0.0.0/v1',
    'https://[::]/v1',
    'https://[::1]/v1',
    'https://[::ffff:127.0.0.1]/v1',
    'https://[fc00::1]/v1',
    'https://[fe80::1]/v1',
    'https://192.168.1.8/v1',
    'https://api.example.invalid/v1?token=x',
  ])('rejects unsafe API base %s', (base) => {
    expect(() => normalizeHttpsApiBase(base, 'fixture API')).toThrow(ProviderContractError);
  });

  test.each(['http://cdn.example.invalid/a.png', 'https://127.0.0.1/a.png', 'https://user:secret@cdn.example.invalid/a.png'])('rejects unsafe artifact URL %s', (url) => {
    expect(() => assertHttpsArtifactUrl(url)).toThrow(ProviderContractError);
  });

  test('sends WisArt JSON generation with isolated bearer key and normalizes image output', async () => {
    let requestUrl = '';
    let requestInit: RequestInit | undefined;
    const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const client = new WisArtImageClient({ WISART_API_KEY: 'wisart-secret' }, undefined, async (url, init) => {
      requestUrl = String(url);
      requestInit = init;
      return new Response(JSON.stringify({ data: [{ b64_json: png.toString('base64') }] }), { headers: { 'content-type': 'application/json' } });
    });
    const artifact = await client.generateImage({ model: 'gpt-image-2', prompt: 'test', width: 1024, height: 1536 });
    expect(requestUrl).toBe('https://wisart.kuaileshifu.com/v1/images/generations');
    expect(new Headers(requestInit?.headers).get('authorization')).toBe('Bearer wisart-secret');
    expect(JSON.parse(String(requestInit?.body))).toEqual({ model: 'gpt-image-2', prompt: 'test', size: '1024x1536' });
    expect(artifact).toMatchObject({ provider: 'wisart-openai-compatible', model: 'gpt-image-2', mimeType: 'image/png' });
  });

  test('requires WisArt key before any request', async () => {
    let calls = 0;
    const client = new WisArtImageClient({}, undefined, async () => { calls += 1; return new Response('{}'); });
    await expect(client.generateImage({ model: 'gpt-image-2', prompt: 'test', width: 1, height: 1 })).rejects.toThrow(/WISART_API_KEY/u);
    expect(calls).toBe(0);
  });

  test('keeps unverified HHHL and Grok adapters fail-closed with isolated keys', async () => {
    const hhhlWithoutOwnKey = new HhhlImageClient({ PIE_API_KEY: 'pie-only' });
    await expect(hhhlWithoutOwnKey.generateImage()).rejects.toThrow(/HHHL_API_KEY/u);
    const hhhl = new HhhlImageClient({ HHHL_API_KEY: 'hhhl-only' });
    await expect(hhhl.generateImage()).rejects.toBeInstanceOf(UnverifiedProviderContractError);

    expect(() => new GrokResponsesVideoClient({ GROK_API_KEY: 'grok-only' }, 'http://216.195.211.206:8317/v1/responses')).toThrow(ProviderContractError);
    const grokWithoutOwnKey = new GrokResponsesVideoClient({ PIE_API_KEY: 'pie-only' }, 'https://grok.example.invalid/v1');
    await expect(grokWithoutOwnKey.submitVideo()).rejects.toThrow(/GROK_API_KEY/u);
    const grok = new GrokResponsesVideoClient({ GROK_API_KEY: 'grok-only' }, 'https://grok.example.invalid/v1');
    await expect(grok.submitVideo()).rejects.toBeInstanceOf(UnverifiedProviderContractError);
  });

  test('rejects job files without explicit provenance before provider use', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-provider-job-'));
    const path = join(directory, 'job.json');
    await writeFile(path, JSON.stringify({ kind: 'image', prompt: 'x', width: 1, height: 1, output: 'x.png' }));
    await expect(loadJob(path)).rejects.toThrow(/provider.*model.*promptVersion/iu);
  });

  test('migrates a v1 raw provider ID into a quarantined ledger field', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-provider-ledger-'));
    const path = join(directory, 'ledger.json');
    await writeFile(path, JSON.stringify({ version: 1, jobs: { paid: { status: 'failed', providerJobId: 'raw-id' } }, music: { consecutiveValidProbes: 0, cooldownUntil: 0 } }));
    const state = await new Ledger(path).read();
    expect(state.version).toBe(2);
    expect(state.jobs.paid).toMatchObject({ status: 'failed', legacyProviderJobId: 'raw-id' });
    expect(state.jobs.paid).not.toHaveProperty('providerJobId');
  });

  test('rejects malformed persisted v2 handles instead of treating them as absent', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-provider-v2-ledger-'));
    const path = join(directory, 'ledger.json');
    await writeFile(path, JSON.stringify({ version: 2, jobs: { paid: { status: 'failed', providerJob: null } }, music: { consecutiveValidProbes: 0, cooldownUntil: 0 } }));
    await expect(new Ledger(path).read()).rejects.toThrow(ProviderContractError);
  });

  test('requires a complete, non-empty provider handle', () => {
    const job = { provider: 'pie', model: 'seedance-1.5-pro' } as const;
    expect(() => assertHandleMatches(job, { provider: 'pie', model: 'seedance-1.5-pro', id: '', pollProtocol: 'pie-videos-v1', contractVersion: 1 })).toThrow(/non-empty ID/iu);
    expect(() => assertHandleMatches(job, { provider: 'pie', model: 'seedance-1.5-pro', id: 'ok', pollProtocol: 'pie-videos-v1', contractVersion: 1, apiKey: 'forbidden' })).toThrow(/fields/iu);
  });

  test('rejects non-boolean probes and incomplete video jobs', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-provider-job-fields-'));
    const music = join(directory, 'music.json');
    const video = join(directory, 'video.json');
    await writeFile(music, JSON.stringify({ kind: 'music', provider: 'pie', model: 'music-2.6', promptVersion: 'v1', probe: 'false', prompt: 'x', durationSeconds: 5, output: 'x.mp3' }));
    await writeFile(video, JSON.stringify({ kind: 'video', provider: 'pie', model: 'seedance-1.5-pro', promptVersion: 'v1', sourceImage: 'key.png', masterOutput: 'master.mp4', desktopOutput: 'desktop.mp4', output: 'runtime.mp4', desktopValidation: {}, masterValidation: {} }));
    await expect(loadJob(music)).rejects.toThrow(/probe.*boolean/iu);
    await expect(loadJob(video)).rejects.toThrow(/prompt or duration/iu);
  });
});
