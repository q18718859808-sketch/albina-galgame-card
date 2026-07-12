import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, test, vi } from 'vitest';

import { downloadResumable } from '../src/download.js';
import { MediaGenerator } from '../src/generator.js';
import { contentHashJobId } from '../src/hash.js';
import { JobBusyError, Ledger, MusicBulkNotReadyError, MusicCooldownError } from '../src/ledger.js';
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

    const cooldownClaim = await ledger.claimJob('cooldown-probe', 'test');
    if (cooldownClaim.status !== 'claimed') throw new Error('expected cooldown claim');
    await ledger.markClaimedMusicAmbiguous('cooldown-probe', 'test', cooldownClaim.token, 'gateway-timeout');
    await expect(ledger.assertMusicRequestAllowed()).rejects.toBeInstanceOf(MusicCooldownError);
    now += 5 * 60 * 1000;
    await expect(ledger.assertMusicRequestAllowed()).resolves.toBeUndefined();
  });

  test('keeps a fresh running lease busy and explicitly reclaims it after expiry', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-lease-'));
    let now = 1_000;
    const ledger = new Ledger(join(directory, 'ledger.json'), { now: () => now });
    await expect(ledger.claimJob('paid', 'first', 100)).resolves.toMatchObject({ status: 'claimed', token: 1 });
    await expect(ledger.claimJob('paid', 'second', 100)).resolves.toEqual({ status: 'busy' });
    now = 1_101;
    await expect(ledger.claimJob('paid', 'second', 100)).resolves.toMatchObject({ status: 'claimed', token: 2 });
    expect((await ledger.read()).jobs.paid).toMatchObject({ status: 'running', leaseOwner: 'second', leaseUntil: 1_201 });
  });

  test('does not let a lost probe claim increment or reset consecutive probe state', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-probe-fence-'));
    let now = 1_000;
    const ledger = new Ledger(join(directory, 'ledger.json'), { now: () => now });
    const first = await ledger.claimJob('probe', 'a', 100);
    if (first.status !== 'claimed') throw new Error('expected claim');
    await ledger.recordMusicProbe(true);
    now = 1_101;
    const second = await ledger.claimJob('probe', 'b', 100);
    expect(second.status).toBe('claimed');
    await expect(ledger.updateClaimedJob('probe', 'a', first.token, { status: 'failed' }, false)).rejects.toThrow(/claim was lost/i);
    expect((await ledger.read()).music.consecutiveValidProbes).toBe(1);
  });

  test('does not let a lost ambiguous claimant alter the reclaimed job, cooldown, or probe streak', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-ambiguous-fence-'));
    let now = 1_000;
    const ledger = new Ledger(join(directory, 'ledger.json'), { now: () => now });
    await ledger.recordMusicProbe(true);
    await ledger.recordMusicProbe(true);
    const first = await ledger.claimJob('music', 'a', 100);
    if (first.status !== 'claimed') throw new Error('expected first claim');
    now = 1_101;
    const second = await ledger.claimJob('music', 'b', 100);
    if (second.status !== 'claimed') throw new Error('expected second claim');
    await expect(ledger.markClaimedMusicAmbiguous('music', 'a', first.token, 'gateway-timeout')).rejects.toThrow(/claim was lost/i);
    const state = await ledger.read();
    expect(state.jobs.music).toMatchObject({ status: 'running', leaseOwner: 'b', claimToken: second.token });
    expect(state.music).toEqual({ consecutiveValidProbes: 2, cooldownUntil: 0 });
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

  test('retries network transport failures', async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNRESET' } }))
      .mockResolvedValue('ok');

    await expect(retry(operation, { attempts: 2, sleep: async () => undefined })).resolves.toBe('ok');
    expect(operation).toHaveBeenCalledTimes(2);
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
  test('allows only one provider call across concurrent generators', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-concurrent-'));
    const output = join(directory, 'image.png');
    const job = { kind: 'image' as const, prompt: 'rain', width: 100, height: 100, output, validation: { width: 100, height: 100, alpha: true } };
    const ledger = new Ledger(join(directory, 'ledger.json'));
    let release!: () => void;
    const held = new Promise<void>((resolve) => { release = resolve; });
    const generateImage = vi.fn(async () => { await held; return { kind: 'image' as const, model: 'gpt-image-2', bytes: pngHeader(100, 100, 6) }; });
    const first = new MediaGenerator({ client: { generateImage }, ledger }).generate([job]);
    await vi.waitFor(() => expect(generateImage).toHaveBeenCalledOnce());
    const second = new MediaGenerator({ client: { generateImage }, ledger }).generate([job]);
    await expect(second).rejects.toBeInstanceOf(JobBusyError);
    release();
    await first;
    expect(generateImage).toHaveBeenCalledOnce();
  });

  test('fences an expired worker from overwriting a reclaimed worker output or ledger state', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-fencing-'));
    const output = join(directory, 'image.png');
    const job = { kind: 'image' as const, prompt: 'rain', width: 100, height: 100, output, validation: { width: 100, height: 100, alpha: true } };
    let now = 1_000;
    const ledger = new Ledger(join(directory, 'ledger.json'), { now: () => now });
    let releaseA!: () => void;
    const heldA = new Promise<void>((resolve) => { releaseA = resolve; });
    const oldBytes = pngHeader(100, 100, 6); oldBytes[30] = 1;
    const newBytes = pngHeader(100, 100, 6); newBytes[30] = 2;
    const firstProvider = vi.fn(async () => { await heldA; return { kind: 'image' as const, model: 'gpt-image-2', bytes: oldBytes }; });
    const first = new MediaGenerator({ client: { generateImage: firstProvider }, ledger }).generate([job]);
    await vi.waitFor(() => expect(firstProvider).toHaveBeenCalledOnce());
    now += 10 * 60 * 1000 + 1;
    const secondProvider = vi.fn(async () => ({ kind: 'image' as const, model: 'gpt-image-2', bytes: newBytes }));
    await new MediaGenerator({ client: { generateImage: secondProvider }, ledger }).generate([job]);
    releaseA();
    await expect(first).rejects.toThrow(/claim was lost/i);
    expect(await readFile(output)).toEqual(newBytes);
    expect((await ledger.read()).jobs[contentHashJobId(job)]).toMatchObject({ status: 'completed', claimToken: 2 });
  });

  test('does not restart a job with a fresh running lease', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-running-resume-'));
    const job = { kind: 'image' as const, prompt: 'rain', width: 100, height: 100, output: join(directory, 'image.png'), validation: { width: 100, height: 100, alpha: true } };
    const ledger = new Ledger(join(directory, 'ledger.json'));
    await ledger.claimJob(contentHashJobId(job), 'other-process');
    const generateImage = vi.fn();
    await expect(new MediaGenerator({ client: { generateImage }, ledger }).generate([job])).rejects.toBeInstanceOf(JobBusyError);
    expect(generateImage).not.toHaveBeenCalled();
  });
  test('skips a completed job with a still-valid output without provider billing', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-completed-valid-'));
    const output = join(directory, 'image.png');
    const job = { kind: 'image' as const, prompt: 'rain', width: 100, height: 100, output, validation: { width: 100, height: 100, alpha: true } };
    await writeFile(output, pngHeader(100, 100, 6));
    const ledger = new Ledger(join(directory, 'ledger.json'));
    await ledger.upsertJob(contentHashJobId(job), { status: 'completed', output });
    const generateImage = vi.fn();
    await new MediaGenerator({ client: { generateImage }, ledger }).generate([job]);
    expect(generateImage).not.toHaveBeenCalled();
  });

  test('CAS-protects completed-invalid stale marking from a newer completion', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-stale-cas-'));
    const output = join(directory, 'image.png');
    const job = { kind: 'image' as const, prompt: 'rain', width: 100, height: 100, output, validation: { width: 100, height: 100, alpha: true } };
    await writeFile(output, Buffer.from('invalid'));
    const ledger = new Ledger(join(directory, 'ledger.json'));
    await ledger.upsertJob(contentHashJobId(job), { status: 'completed', claimToken: 1, output });
    let releaseA!: () => void;
    let reachedA!: () => void;
    const reached = new Promise<void>((resolve) => { reachedA = resolve; });
    const held = new Promise<void>((resolve) => { releaseA = resolve; });
    const providerA = vi.fn();
    const workerA = new MediaGenerator({ client: { generateImage: providerA }, ledger, afterCompletedValidationFailure: async () => { reachedA(); await held; } }).generate([job]);
    await reached;
    const providerB = vi.fn(async () => ({ kind: 'image' as const, model: 'gpt-image-2', bytes: pngHeader(100, 100, 6) }));
    await new MediaGenerator({ client: { generateImage: providerB }, ledger }).generate([job]);
    releaseA();
    await workerA;
    expect(providerA).not.toHaveBeenCalled();
    expect(providerB).toHaveBeenCalledOnce();
    expect((await ledger.read()).jobs[contentHashJobId(job)]).toMatchObject({ status: 'completed', claimToken: 2 });
  });

  test.each(['missing', 'invalid'])('regenerates a completed job when its output is %s', async (state) => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-completed-stale-'));
    const output = join(directory, 'image.png');
    const job = { kind: 'image' as const, prompt: 'rain', width: 100, height: 100, output, validation: { width: 100, height: 100, alpha: true } };
    if (state === 'invalid') await writeFile(output, Buffer.from('bad'));
    const ledger = new Ledger(join(directory, 'ledger.json'));
    await ledger.upsertJob(contentHashJobId(job), { status: 'completed', output });
    const generateImage = vi.fn().mockResolvedValue({ kind: 'image', model: 'gpt-image-2', bytes: pngHeader(100, 100, 6) });
    await new MediaGenerator({ client: { generateImage }, ledger }).generate([job]);
    expect(generateImage).toHaveBeenCalledOnce();
    expect((await ledger.read()).jobs[contentHashJobId(job)]?.status).toBe('completed');
  });

  test('retries a previously failed job through the normal transient retry path', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-failed-retry-'));
    const output = join(directory, 'image.png');
    const job = { kind: 'image' as const, prompt: 'rain', width: 100, height: 100, output, validation: { width: 100, height: 100, alpha: true } };
    const ledger = new Ledger(join(directory, 'ledger.json'));
    await ledger.upsertJob(contentHashJobId(job), { status: 'failed', error: '503' });
    const generateImage = vi.fn().mockRejectedValueOnce(Object.assign(new Error('busy'), { status: 503 })).mockResolvedValueOnce({ kind: 'image', model: 'gpt-image-2', bytes: pngHeader(100, 100, 6) });
    await new MediaGenerator({ client: { generateImage }, ledger, sleep: async () => undefined }).generate([job]);
    expect(generateImage).toHaveBeenCalledTimes(2);
  });

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

  test('does not resubmit after a transient poll failure', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-video-retry-'));
    const output = join(directory, 'video.mp4');
    const keyframe = join(directory, 'keyframe.png');
    await writeFile(keyframe, pngHeader(100, 100, 6));
    const job = { kind: 'video' as const, prompt: 'rain', durationSeconds: 5, sourceImage: keyframe, output };
    const ledger = new Ledger(join(directory, 'ledger.json'));
    const submitVideo = vi.fn().mockResolvedValue({ providerJobId: 'provider_once', status: 'pending' });
    const pollVideo = vi
      .fn()
      .mockImplementationOnce(async () => {
        expect((await ledger.read()).jobs[contentHashJobId(job)]?.providerJobId).toBe('provider_once');
        throw Object.assign(new Error('gateway'), { status: 500 });
      })
      .mockResolvedValueOnce({
        kind: 'video',
        model: 'seedance-1.5-pro',
        mimeType: 'video/mp4',
        bytes: new Uint8Array([1, 2, 3]),
      });

    await expect(
      new MediaGenerator({ client: { submitVideo, pollVideo }, ledger, sleep: async () => undefined }).generate([job]),
    ).rejects.toThrow(/validation/i);

    expect(submitVideo).toHaveBeenCalledOnce();
    expect(submitVideo).toHaveBeenCalledWith(expect.objectContaining({ image: expect.any(Uint8Array) }));
    expect(pollVideo).toHaveBeenCalledTimes(2);
    expect((await ledger.read()).jobs[contentHashJobId(job)]?.providerJobId).toBe('provider_once');
  });

  test('resumes polling a persisted provider job without submitting again', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-video-resume-'));
    const job = { kind: 'video' as const, prompt: 'rain', durationSeconds: 5, sourceImage: join(directory, 'keyframe.png'), output: join(directory, 'video.mp4') };
    const ledger = new Ledger(join(directory, 'ledger.json'));
    await ledger.upsertJob(contentHashJobId(job), { status: 'failed', providerJobId: 'provider_existing' });
    const submitVideo = vi.fn();
    const pollVideo = vi.fn().mockResolvedValue({ providerJobId: 'provider_existing', status: 'failed' });

    await expect(
      new MediaGenerator({ client: { submitVideo, pollVideo }, ledger, sleep: async () => undefined }).generate([job]),
    ).rejects.toThrow(/provider_existing/);

    expect(submitVideo).not.toHaveBeenCalled();
    expect(pollVideo).toHaveBeenCalledWith('provider_existing');
  });

  test('blocks even one non-probe music job until three probes pass', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-single-music-'));
    const generateMusic = vi.fn();
    const job = { kind: 'music' as const, prompt: 'cue', durationSeconds: 30, output: join(directory, 'cue.mp3'), validation: { minDurationSeconds: 20, maxDurationSeconds: 40 } };
    await expect(new MediaGenerator({ client: { generateMusic }, ledger: new Ledger(join(directory, 'ledger.json')) }).generate([job])).rejects.toBeInstanceOf(MusicBulkNotReadyError);
    expect(generateMusic).not.toHaveBeenCalled();
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
