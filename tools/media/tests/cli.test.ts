import { access, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, test, vi } from 'vitest';

import { runCli } from '../src/cli.js';
import { contentHashJobId } from '../src/hash.js';
import { Ledger } from '../src/ledger.js';

describe('media CLI', () => {
  test('inventory reports canonical IDs and ledger status without credentials', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-cli-inventory-'));
    const jobsDirectory = join(directory, 'jobs');
    const jobPath = join(jobsDirectory, 'image.json');
    await writeJson(join(jobsDirectory, 'index.json'), { version: 1, jobs: [] });
    await writeJson(jobPath, { kind: 'image', prompt: 'rain', width: 800, height: 100, output: 'artifacts/rain.png' });
    const job = JSON.parse(await readFile(jobPath, 'utf8')) as unknown;
    const id = contentHashJobId(job);
    const ledgerPath = join(jobsDirectory, '.ledger.json');
    await new Ledger(ledgerPath).upsertJob(id, { status: 'completed' });
    const output: string[] = [];

    const code = await runCli(['inventory', '--jobs', jobsDirectory, '--ledger', ledgerPath], {
      stdout: (line) => output.push(line),
      env: {},
    });

    expect(code).toBe(0);
    expect(JSON.parse(output.join('\n'))).toEqual(expect.arrayContaining([
      expect.objectContaining({ id, file: jobPath, kind: 'image', status: 'completed' }),
      expect.objectContaining({ file: join(jobsDirectory, 'index.json'), status: 'skipped' }),
    ]));
  });

  test('validate and promote copy only a validated artifact', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-cli-promote-'));
    const source = join(directory, 'strip.png');
    const destination = join(directory, 'canonical', 'strip.png');
    const jobPath = join(directory, 'strip.job.json');
    await writeFile(source, pngHeader(800, 100, 6));
    await writeJson(jobPath, {
      kind: 'image',
      prompt: 'portrait',
      width: 800,
      height: 100,
      output: source,
      validation: { width: 800, height: 100, alpha: true, frameCount: 8 },
    });

    await expect(runCli(['validate', jobPath], { stdout: () => undefined })).resolves.toBe(0);
    await expect(runCli(['promote', jobPath, '--to', destination], { stdout: () => undefined })).resolves.toBe(0);
    expect(await readFile(destination)).toEqual(await readFile(source));
  });

  test('bulk music generation is blocked before any provider call until three probes pass', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-cli-music-'));
    const first = join(directory, 'first.json');
    const second = join(directory, 'second.json');
    await writeJson(first, { kind: 'music', prompt: 'one', durationSeconds: 5, output: join(directory, 'one.mp3') });
    await writeJson(second, { kind: 'music', prompt: 'two', durationSeconds: 5, output: join(directory, 'two.mp3') });
    const client = { generateMusic: vi.fn() };

    await expect(
      runCli(['generate', first, second, '--ledger', join(directory, 'ledger.json')], { client, stdout: () => undefined }),
    ).rejects.toThrow(/three consecutive/i);
    expect(client.generateMusic).not.toHaveBeenCalled();
  });

  test('an ambiguous music 504 records cooldown before returning failure', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-cli-ambiguous-'));
    const jobPath = join(directory, 'music.json');
    const ledgerPath = join(directory, 'ledger.json');
    await writeJson(jobPath, { kind: 'music', probe: true, prompt: 'one', durationSeconds: 5, output: join(directory, 'one.mp3') });
    const client = {
      generateMusic: vi.fn().mockResolvedValue({ kind: 'ambiguous', model: 'music-2.6', reason: 'gateway-timeout' }),
    };

    await expect(runCli(['generate', jobPath, '--ledger', ledgerPath], { client, stdout: () => undefined })).rejects.toThrow(
      /ambiguous/i,
    );
    const state = await new Ledger(ledgerPath).read();
    expect(state.music.cooldownUntil).toBeGreaterThan(Date.now());
  });
});

async function writeJson(path: string, value: unknown): Promise<void> {
  const directory = path.slice(0, Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\')));
  if (directory) await import('node:fs/promises').then(({ mkdir }) => mkdir(directory, { recursive: true }));
  await writeFile(path, `${JSON.stringify(value)}\n`, 'utf8');
  await access(path);
}

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
