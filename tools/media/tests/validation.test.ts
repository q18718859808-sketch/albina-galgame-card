import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, test } from 'vitest';

import { MediaValidationError, validateAudio, validateImage, validateVideo } from '../src/validate.js';
import { loadJob } from '../src/job.js';

describe('media validation', () => {
  test('validates image dimensions, alpha, and eight-frame strips', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-image-'));
    const path = join(directory, 'strip.png');
    await writeFile(path, pngHeader(800, 100, 6));

    await expect(validateImage(path, { width: 800, height: 100, alpha: true, frameCount: 8 })).resolves.toMatchObject({
      width: 800,
      height: 100,
      alpha: true,
      frameCount: 8,
    });
    await expect(validateImage(path, { width: 800, height: 100, alpha: false, frameCount: 8 })).rejects.toBeInstanceOf(
      MediaValidationError,
    );
  });

  test('validates WAV duration, non-silence, and loudness', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-audio-'));
    const voiced = join(directory, 'voiced.wav');
    const silent = join(directory, 'silent.wav');
    await writeFile(voiced, wavPcm16(8_000, 8_000, 7_000));
    await writeFile(silent, wavPcm16(8_000, 8_000, 0));

    await expect(
      validateAudio(voiced, { minDurationSeconds: 0.9, maxDurationSeconds: 1.1, minLoudnessDbfs: -20, maxLoudnessDbfs: -5 }),
    ).resolves.toMatchObject({ durationSeconds: 1, nonSilent: true });
    await expect(validateAudio(silent, { minDurationSeconds: 0.9, maxDurationSeconds: 1.1 })).rejects.toThrow(/silence/i);
  });

  test('validates compressed audio through ffprobe and volume metadata', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-compressed-audio-'));
    const path = join(directory, 'voice.mp3');
    await writeFile(path, Buffer.from('ID3 recorded fixture placeholder'));

    await expect(
      validateAudio(
        path,
        { minDurationSeconds: 1.9, maxDurationSeconds: 2.1, minLoudnessDbfs: -24, maxLoudnessDbfs: -10 },
        async () => ({ durationSeconds: 2, loudnessDbfs: -18, peakDbfs: -3 }),
      ),
    ).resolves.toMatchObject({ durationSeconds: 2, loudnessDbfs: -18, nonSilent: true });
  });

  test('validates video dimensions, FPS, and duration from ffprobe data', async () => {
    const fixturePath = fileURLToPath(new URL('./fixtures/video-probe.json', import.meta.url));
    const probe = JSON.parse(await readFile(fixturePath, 'utf8')) as unknown;

    await expect(
      validateVideo('recorded.mp4', { width: 1280, height: 720, fps: 24, durationSeconds: 5, tolerance: 0.01 }, async () => probe),
    ).resolves.toMatchObject({ width: 1280, height: 720, fps: 24, durationSeconds: 5 });
    await expect(
      validateVideo('recorded.mp4', { width: 1920, height: 1080, fps: 24, durationSeconds: 5 }, async () => probe),
    ).rejects.toThrow(/dimensions/i);
  });

  test('rejects unknown validation fields instead of silently ignoring them', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-media-invalid-validation-'));
    const path = join(directory, 'job.json');
    await writeFile(path, JSON.stringify({ kind: 'image', provider: 'pie', model: 'gpt-image-2', promptVersion: 'test-image-v1', prompt: 'x', width: 8, height: 1, output: 'x.png', validation: { width: 8, height: 1, stripFrames: 8 } }));
    await expect(loadJob(path)).rejects.toThrow(/unknown validation fields/i);
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

function wavPcm16(sampleRate: number, samples: number, amplitude: number): Buffer {
  const dataLength = samples * 2;
  const buffer = Buffer.alloc(44 + dataLength);
  buffer.write('RIFF', 0, 'ascii');
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write('WAVEfmt ', 8, 'ascii');
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36, 'ascii');
  buffer.writeUInt32LE(dataLength, 40);
  for (let index = 0; index < samples; index += 1) buffer.writeInt16LE(index % 2 === 0 ? amplitude : -amplitude, 44 + index * 2);
  return buffer;
}
