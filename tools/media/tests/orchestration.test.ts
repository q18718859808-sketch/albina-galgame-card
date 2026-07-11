import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, test, vi } from 'vitest';

import { downloadResumable } from '../src/download.js';
import { MediaGenerator } from '../src/generator.js';
import { contentHashJobId } from '../src/hash.js';
import { Ledger, MusicBulkNotReadyError, MusicCooldownError } from '../src/ledger.js';
import { PieClient } from '../src/pie-client.js';
import { retry } from '../src/retry.js';

describe('content hash jobs', () => {
  test('uses canonical content rather than property insertion order', () => {
    const first = contentHashJobId({ kind: 'image', prompt: 'rain', dimensions: { width: 10, height: 20 } });
    const reordered = contentHashJobId({ dimensions: { height: 20, width: 10 }, prompt: 'rain', kind: 'image' });

    expect(first).toMatch(/^job_[a-f0-9]{32}$/);
    expect(reordered).toBe(first);
    expect(contentHashJobId({ kind: 'image', prompt: 'sun' })).not.toBe(first);
  });
});

describe('single-writer ledger', () => {
  test('preserves all concurrent updates', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-ledger-'));
    const ledger = new Ledger(join(directory, 'ledger.json'));

    await Promise.all(
      Array.from({ length: 12 }, (_, index) => ledger.upsertJob(`job_${index}`, { status: 'queued', attempt: index })),
    );

    const state = await ledger.read();
    expect(Object.keys(state.jobs)).toHaveLength(12);
    expect(state.jobs.job_7).toMatchObject({ status: 'queued', attempt: 7 });
  });

  test('requires three consecutive valid music probes and enforces cooldown', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-music-'));
    let now = 1_000_000;
    const ledger = new Ledger(join(directory, 'ledger.json'), { now: () => now });

    await ledger.recordMusicProbe(true);
    await ledger.recordMusicProbe(false);
    await ledger.recordMusicProbe(true);
    await ledger.recordMusicProbe(true);
    await expect(ledger.assertMusicBulkReady()).rejects.toBeInstanceOf(MusicBulkNotReadyError);
    await ledger.recordMusicProbe(true);
    await expect(ledger.assertMusicBulkReady()).resolves.toBeUndefined();

    await ledger.startMusicCooldown();
    await expect(ledger.assertMusicRequestAllowed()).rejects.toBeInstanceOf(MusicCooldownError);
    now += 5 * 60 * 1000;
    await expect(ledger.assertMusicRequestAllowed()).resolves.toBeUndefined();
  });
});

describe('network resilience', () => {
  test('retries transient failures using retry-after or backoff', async () => {
    const sleep = vi.fn(async () => undefined);
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(Object.assign(new Error('busy'), { status: 429, retryAfterMs: 25 }))
      .mockRejectedValueOnce(Object.assign(new Error('gateway'), { status: 502 }))
      .mockResolvedValue('ok');

    await expect(retry(operation, { attempts: 3, sleep, baseDelayMs: 10 })).resolves.toBe('ok');
    expect(sleep).toHaveBeenNthCalledWith(1, 25);
    expect(sleep).toHaveBeenNthCalledWith(2, 20);
  });

  test('resumes a partial download with a byte range', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-download-'));
    const destination = join(directory, 'artifact.bin');
    await writeFile(`${destination}.part`, Buffer.from('hello '));
    const fetcher = vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
      expect(new Headers(init?.headers).get('range')).toBe('bytes=6-');
      return new Response(Buffer.from('world'), { status: 206 });
    });

    await downloadResumable('https://example.invalid/artifact.bin', destination, { fetcher });

    expect(await readFile(destination, 'utf8')).toBe('hello world');
  });
});

describe('artifact generation', () => {
  test('uses the real client instance, stores, validates, and completes a job', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-generate-'));
    const output = join(directory, 'image.png');
    const job = {
      kind: 'image' as const,
      prompt: 'rain',
      width: 100,
      height: 100,
      output,
      validation: { width: 100, height: 100, alpha: true },
    };
    const client = new PieClient({
      env: { PIE_API_KEY: 'test-only' },
      fetcher: async () => new Response(JSON.stringify({ data: [{ url: 'https://example.invalid/image.png' }] }), { status: 200 }),
    });
    const ledger = new Ledger(join(directory, 'ledger.json'));
    const downloader = vi.fn(async (_url: string, destination: string) => writeFile(destination, pngHeader(100, 100, 6)));

    await new MediaGenerator({ client, ledger, downloader }).generate([job]);

    expect(downloader).toHaveBeenCalledOnce();
    expect((await ledger.read()).jobs[contentHashJobId(job)]?.status).toBe('completed');
  });
});

function pngHeader(width: number, height: number, colorType: number): Buffer {
  const buffer = Buffer.alloc(33);
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(buffer, 0);
  buffer.writeUInt32BE(13, 8);
  buffer.write('IHDR', 12, 'ascii');
  buffer.writeUInt32BE(width, 16);
  buffer.writeUInt32BE(height, 20);
  buffer[24] = 8;
  buffer[25] = colorType;
  return buffer;
}
