import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { describe, expect, test, vi } from 'vitest';

import { MissingPieApiKeyError, PieClient, type FetchLike } from '../src/pie-client.js';

const fixturePath = (name: string) => fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url));

async function fixture(name: string): Promise<unknown> {
  return JSON.parse(await readFile(fixturePath(name), 'utf8')) as unknown;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('PieClient', () => {
  test('fails before network access when PIE_API_KEY is absent', async () => {
    const fetcher = vi.fn<FetchLike>();
    const client = new PieClient({ env: {}, fetcher });

    await expect(client.generateImage({ prompt: 'rain', width: 1024, height: 1024 })).rejects.toBeInstanceOf(
      MissingPieApiKeyError,
    );
    expect(fetcher).not.toHaveBeenCalled();
  });

  test('normalizes recorded image generation and edit responses', async () => {
    const fetcher = vi
      .fn<FetchLike>()
      .mockImplementationOnce(async (url, init) => {
        expect(String(url)).toBe('https://api.pie-xian.com/v1/images/generations');
        expect(new Headers(init?.headers).get('authorization')).toBe('Bearer test-only');
        return jsonResponse(await fixture('image-generation.json'));
      })
      .mockImplementationOnce(async (url) => {
        expect(String(url)).toBe('https://api.pie-xian.com/v1/images/edits');
        return jsonResponse(await fixture('image-edit.json'));
      });
    const client = new PieClient({ env: { PIE_API_KEY: 'test-only' }, fetcher });

    const generated = await client.generateImage({ prompt: 'rain', width: 1024, height: 1536 });
    const edited = await client.editImage({ prompt: 'transparent portrait', image: new Uint8Array([1, 2, 3]) });

    expect(generated).toMatchObject({ kind: 'image', model: 'gpt-image-2', sourceUrl: expect.stringContaining('generated-image') });
    expect(edited).toMatchObject({ kind: 'image', model: 'gpt-image-2', sourceUrl: expect.stringContaining('edited-image') });
  });

  test('submits PNG keyframes and polls recorded Seedance video jobs', async () => {
    const fetcher = vi
      .fn<FetchLike>()
      .mockImplementationOnce(async (url, init) => {
        expect(String(url)).toBe('https://api.pie-xian.com/api/v1/task');
        expect(new Headers(init?.headers).get('x-api-key')).toBe('test-only');
        expect(JSON.parse(String(init?.body))).toMatchObject({
          model: 'seedance',
          task_type: 'seedance-1.5-pro',
          input: { prompt: 'slow rain', duration: 5, images: ['data:image/png;base64,iVBORw0KGgo='] },
        });
        return jsonResponse(await fixture('video-submit.json'));
      })
      .mockResolvedValueOnce(jsonResponse(await fixture('video-poll.json')));
    const client = new PieClient({ env: { PIE_API_KEY: 'test-only' }, fetcher });

    const submitted = await client.submitVideo({ prompt: 'slow rain', durationSeconds: 5, image: new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]) });
    const completed = await client.pollVideo(submitted.providerJobId);

    expect(submitted).toEqual({ providerJobId: 'job_[REDACTED]', status: 'pending' });
    expect(completed).toMatchObject({ kind: 'video', model: 'seedance-1.5-pro', sourceUrl: expect.stringContaining('video.mp4') });
  });

  test('keeps an explicitly injected base URL for isolated tests', async () => {
    const fetcher = vi.fn<FetchLike>().mockImplementation(async (url) => {
      expect(String(url)).toBe('https://example.invalid/v1/images/generations');
      return jsonResponse(await fixture('image-generation.json'));
    });
    await new PieClient({ env: { PIE_API_KEY: 'test-only' }, fetcher, baseUrl: 'https://example.invalid/' }).generateImage({ prompt: 'x', width: 1, height: 1 });
  });

  test('labels JPEG Seedance keyframes from their byte signature and rejects unsupported bytes', async () => {
    const fetcher = vi.fn<FetchLike>().mockImplementation(async (_url, init) => {
      expect(JSON.parse(String(init?.body))).toMatchObject({ input: { images: ['data:image/jpeg;base64,/9j/4AAQ'] } });
      return jsonResponse(await fixture('video-submit.json'));
    });
    const client = new PieClient({ env: { PIE_API_KEY: 'test-only' }, fetcher });
    await client.submitVideo({ prompt: 'jpeg', durationSeconds: 5, image: new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 16]) });
    await expect(client.submitVideo({ prompt: 'bad', durationSeconds: 5, image: new Uint8Array([1, 2, 3]) })).rejects.toThrow(/unsupported/i);
    expect(fetcher).toHaveBeenCalledOnce();
  });

  test('encodes speech JSON as UTF-8 and accepts only probed OpenAI voice IDs', async () => {
    const recorded = (await fixture('speech.json')) as { status: number; headers: Record<string, string>; body_base64: string };
    const fetcher = vi.fn<FetchLike>().mockImplementation(async (_url, init) => {
      const body = Buffer.from(String(init?.body), 'utf8').toString('utf8');
      expect(JSON.parse(body)).toMatchObject({ input: '雨夜里的阿尔比娜', voice: 'alloy' });
      return new Response(Buffer.from(recorded.body_base64, 'base64'), { status: recorded.status, headers: recorded.headers });
    });
    const client = new PieClient({ env: { PIE_API_KEY: 'test-only' }, fetcher });

    const speech = await client.generateSpeech({ input: '雨夜里的阿尔比娜', voice: 'alloy' });

    expect(speech).toMatchObject({ kind: 'audio', model: 'speech-2.8-hd', mimeType: 'audio/mpeg' });
    expect(speech.bytes).toEqual(new Uint8Array(Buffer.from(recorded.body_base64, 'base64')));
    await expect(client.generateSpeech({ input: 'no', voice: 'unprobed-voice' })).rejects.toThrow(/voice/i);
  });

  test('normalizes recorded music responses and treats 504 as ambiguous', async () => {
    const fetcher = vi
      .fn<FetchLike>()
      .mockImplementationOnce(async (_url, init) => {
        expect(JSON.parse(String(init?.body))).toMatchObject({ model: 'music-2.6', output_format: 'url', is_instrumental: true });
        return jsonResponse(await fixture('music.json'));
      })
      .mockResolvedValueOnce(jsonResponse({ message: '[REDACTED]' }, 504));
    const client = new PieClient({ env: { PIE_API_KEY: 'test-only' }, fetcher });

    const music = await client.generateMusic({ prompt: 'somber strings', durationSeconds: 12.5 });
    const ambiguous = await client.generateMusic({ prompt: 'somber strings', durationSeconds: 12.5 });

    expect(music).toMatchObject({ kind: 'audio', model: 'music-2.6', sourceUrl: expect.stringContaining('music.mp3') });
    expect(ambiguous).toEqual({ kind: 'ambiguous', model: 'music-2.6', reason: 'gateway-timeout' });
  });
});
