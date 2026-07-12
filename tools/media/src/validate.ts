import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export class MediaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MediaValidationError';
  }
}

export interface ImageExpectation {
  width: number;
  height: number;
  alpha?: boolean;
  frameCount?: number;
}

export interface AudioExpectation {
  minDurationSeconds: number;
  maxDurationSeconds: number;
  minLoudnessDbfs?: number;
  maxLoudnessDbfs?: number;
}

export interface VideoExpectation {
  width: number;
  height: number;
  fps: number;
  durationSeconds: number;
  tolerance?: number;
}
export interface FlexibleVideoExpectation { minFps: number; maxFps: number; minDurationSeconds: number; maxDurationSeconds: number; }

export interface AudioInspection {
  durationSeconds: number;
  loudnessDbfs: number;
  peakDbfs: number;
}

export async function validateImage(path: string, expectation: ImageExpectation) {
  const bytes = await readFile(path);
  const actual = inspectPng(bytes);
  assert(actual.width === expectation.width && actual.height === expectation.height, 'Image dimensions do not match expectation');
  if (expectation.alpha !== undefined) assert(actual.alpha === expectation.alpha, 'Image alpha channel does not match expectation');
  const frameCount = expectation.frameCount === undefined ? undefined : actual.width / actual.height;
  if (expectation.frameCount !== undefined) {
    assert(Number.isInteger(frameCount) && frameCount === expectation.frameCount, 'Image strip frame count does not match expectation');
  }
  return { ...actual, ...(frameCount === undefined ? {} : { frameCount }) };
}

export async function validateAudio(
  path: string,
  expectation: AudioExpectation,
  probe: (path: string) => Promise<AudioInspection> = inspectCompressedAudio,
) {
  const bytes = await readFile(path);
  const inspection = bytes.toString('ascii', 0, 4) === 'RIFF' ? inspectWav(bytes) : await probe(path);
  const actual = { ...inspection, nonSilent: inspection.peakDbfs > -60 };
  assert(actual.durationSeconds >= expectation.minDurationSeconds, 'Audio duration is shorter than expected');
  assert(actual.durationSeconds <= expectation.maxDurationSeconds, 'Audio duration is longer than expected');
  assert(actual.nonSilent, 'Audio is silence');
  if (expectation.minLoudnessDbfs !== undefined) assert(actual.loudnessDbfs >= expectation.minLoudnessDbfs, 'Audio loudness is too low');
  if (expectation.maxLoudnessDbfs !== undefined) assert(actual.loudnessDbfs <= expectation.maxLoudnessDbfs, 'Audio loudness is too high');
  return actual;
}

export async function validateVideo(
  path: string,
  expectation: VideoExpectation,
  probe: (path: string) => Promise<unknown> = ffprobe,
) {
  const actual = inspectVideoProbe(await probe(path));
  const tolerance = expectation.tolerance ?? 0.05;
  assert(actual.width === expectation.width && actual.height === expectation.height, 'Video dimensions do not match expectation');
  assert(Math.abs(actual.fps - expectation.fps) <= tolerance, 'Video FPS does not match expectation');
  assert(Math.abs(actual.durationSeconds - expectation.durationSeconds) <= tolerance, 'Video duration does not match expectation');
  return actual;
}
export async function validateVideoFlexible(path: string, expectation: FlexibleVideoExpectation, probe: (path: string) => Promise<unknown> = ffprobe) {
  const actual = inspectVideoProbe(await probe(path));
  assert(actual.width > 0 && actual.height > 0, 'Video dimensions are invalid');
  assert(actual.fps >= expectation.minFps && actual.fps <= expectation.maxFps, 'Video FPS is outside the accepted range');
  assert(actual.durationSeconds >= expectation.minDurationSeconds && actual.durationSeconds <= expectation.maxDurationSeconds, 'Video duration is outside the accepted range');
  return actual;
}

function inspectPng(bytes: Buffer): { width: number; height: number; alpha: boolean } {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert(bytes.length >= 26 && bytes.subarray(0, 8).equals(signature), 'Image is not a PNG');
  assert(bytes.toString('ascii', 12, 16) === 'IHDR', 'PNG is missing IHDR');
  const colorType = bytes[25];
  const alpha = colorType === 4 || colorType === 6 || bytes.includes(Buffer.from('tRNS', 'ascii'));
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), alpha };
}

function inspectWav(bytes: Buffer) {
  assert(bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WAVE', 'Audio is not PCM WAV');
  const channels = bytes.readUInt16LE(22);
  const sampleRate = bytes.readUInt32LE(24);
  const bitsPerSample = bytes.readUInt16LE(34);
  assert(bitsPerSample === 16, 'Only 16-bit PCM WAV validation is supported');
  const dataOffset = findWaveData(bytes);
  const dataLength = bytes.readUInt32LE(dataOffset + 4);
  const sampleCount = dataLength / 2;
  let sumSquares = 0;
  let peak = 0;
  for (let offset = dataOffset + 8; offset < dataOffset + 8 + dataLength; offset += 2) {
    const normalized = bytes.readInt16LE(offset) / 32768;
    sumSquares += normalized * normalized;
    peak = Math.max(peak, Math.abs(normalized));
  }
  const rms = Math.sqrt(sumSquares / sampleCount);
  const loudnessDbfs = rms === 0 ? Number.NEGATIVE_INFINITY : 20 * Math.log10(rms);
  const peakDbfs = peak === 0 ? Number.NEGATIVE_INFINITY : 20 * Math.log10(peak);
  return { durationSeconds: sampleCount / channels / sampleRate, loudnessDbfs, peakDbfs };
}

function findWaveData(bytes: Buffer): number {
  for (let offset = 12; offset + 8 <= bytes.length; ) {
    if (bytes.toString('ascii', offset, offset + 4) === 'data') return offset;
    offset += 8 + bytes.readUInt32LE(offset + 4);
  }
  throw new MediaValidationError('WAV data chunk is missing');
}

function inspectVideoProbe(probe: unknown) {
  const body = probe as { streams?: Array<Record<string, unknown>>; format?: Record<string, unknown> };
  const stream = body.streams?.find((item) => item.codec_type === 'video');
  assert(stream !== undefined, 'Video stream is missing');
  const width = Number(stream.width);
  const height = Number(stream.height);
  const fps = parseRate(String(stream.avg_frame_rate ?? '0'));
  const durationSeconds = Number(stream.duration ?? body.format?.duration);
  assert([width, height, fps, durationSeconds].every(Number.isFinite), 'Video probe metadata is invalid');
  return { width, height, fps, durationSeconds };
}

function parseRate(rate: string): number {
  const [numeratorText, denominatorText] = rate.split('/');
  const numerator = Number(numeratorText);
  const denominator = Number(denominatorText ?? 1);
  return denominator === 0 ? Number.NaN : numerator / denominator;
}

async function ffprobe(path: string): Promise<unknown> {
  const { stdout } = await execFileAsync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', path], {
    encoding: 'utf8',
  });
  return JSON.parse(stdout) as unknown;
}

async function inspectCompressedAudio(path: string): Promise<AudioInspection> {
  const [probeResult, volumeResult] = await Promise.all([
    execFileAsync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', path], { encoding: 'utf8' }),
    execFileAsync('ffmpeg', ['-hide_banner', '-nostats', '-i', path, '-af', 'volumedetect', '-f', 'null', '-'], { encoding: 'utf8' }),
  ]);
  const probe = JSON.parse(probeResult.stdout) as { format?: { duration?: unknown } };
  const loudnessDbfs = parseVolume(volumeResult.stderr, 'mean_volume');
  const peakDbfs = parseVolume(volumeResult.stderr, 'max_volume');
  const durationSeconds = Number(probe.format?.duration);
  assert([durationSeconds, loudnessDbfs, peakDbfs].every(Number.isFinite), 'Compressed audio metadata is invalid');
  return { durationSeconds, loudnessDbfs, peakDbfs };
}

function parseVolume(output: string, name: string): number {
  const match = output.match(new RegExp(`${name}:\\s*(-?\\d+(?:\\.\\d+)?)\\s*dB`));
  return match?.[1] === undefined ? Number.NaN : Number(match[1]);
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new MediaValidationError(message);
}
