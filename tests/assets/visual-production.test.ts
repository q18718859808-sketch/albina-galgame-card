import { execFile } from 'node:child_process';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import {
  atomicWrite,
  inspectPng,
  isAmbiguousProviderResponse,
  isUsableX666ApiKey,
  loadProductionInputs,
  preparePortrait,
  selectImageJobs,
  validateLedger,
} from '../../scripts/lib/visual-production.mjs';

const runFile = promisify(execFile);
const ffmpeg = process.env.FFMPEG_PATH || 'C:\\Program Files\\Kdenlive\\bin\\ffmpeg.exe';

async function encodeRgba(path: string, width: number, height: number, pixels: Buffer) {
  const raw = `${path}.rgba`;
  await writeFile(raw, pixels);
  await runFile(ffmpeg, ['-v', 'error', '-y', '-f', 'rawvideo', '-pixel_format', 'rgba', '-video_size', `${width}x${height}`, '-i', raw, '-frames:v', '1', path]);
}

async function decodeRgba(path: string, width: number, height: number) {
  const { stdout } = await runFile(ffmpeg, ['-v', 'error', '-i', path, '-vf', `scale=${width}:${height}:flags=neighbor,format=rgba`, '-frames:v', '1', '-f', 'rawvideo', '-'], { encoding: 'buffer', maxBuffer: width * height * 4 + 1024 });
  return Buffer.from(stdout);
}

function pixel(buffer: Buffer, width: number, x: number, y: number) {
  const offset = (y * width + x) * 4;
  return [...buffer.subarray(offset, offset + 4)];
}

function png(width: number, height: number, colorType = 6): Buffer {
  const bytes = Buffer.alloc(33);
  Buffer.from('89504e470d0a1a0a', 'hex').copy(bytes, 0);
  bytes.write('IHDR', 12, 'ascii');
  bytes.writeUInt32BE(width, 16);
  bytes.writeUInt32BE(height, 20);
  bytes[25] = colorType;
  return bytes;
}

describe('x666 visual production', () => {
  it('reads PNG dimensions and alpha capability without trusting extensions', () => {
    expect(inspectPng(png(1024, 1536))).toEqual({ width: 1024, height: 1536, colorType: 6, alphaCapable: true });
    expect(inspectPng(png(1536, 1024, 2)).alphaCapable).toBe(false);
    expect(() => inspectPng(Buffer.from('not-an-image'))).toThrow(/valid PNG/iu);
  });

  it('selects and dependency-orders all fixed generation and edit pilots', () => {
    const base = {
      receiptAssetId: 'file.test', category: 'characters' as const, provider: 'x666-openai-compatible' as const,
      model: 'gpt-image-2' as const, upstreamPieVerified: false as const, generationSize: '1024x1536' as const,
      delivery: { format: 'png' as const, width: 1024, height: 1536, alpha: true },
    };
    const jobs = [
      { ...base, id: 'visual.image.portrait.albina.normal' },
      { ...base, id: 'visual.image.portrait.protagonist.serious' },
      { ...base, id: 'visual.image.portrait.albina.armored' },
      { ...base, id: 'visual.image.bg.backstreets_rain', category: 'bg' as const },
      { ...base, id: 'visual.image.cg.opening_rain', category: 'cg' as const },
    ];
    const references = new Map([
      ['visual.image.portrait.albina.armored', ['visual.image.portrait.albina.normal']],
      ['visual.image.cg.opening_rain', ['visual.image.portrait.albina.normal', 'visual.image.portrait.protagonist.serious']],
    ]);
    const prompts = { prompts: jobs.map((job) => {
      const referenceJobIds = references.get(job.id) ?? [];
      return {
        jobId: job.id, mode: referenceJobIds.length > 0 ? 'reference-edit' as const : 'text-generation' as const,
        referenceJobIds, positivePrompt: 'test prompt', negativePrompt: '',
      };
    }) };
    const selected = selectImageJobs({ imageJobs: jobs }, prompts, { mode: 'pilot' });
    expect(selected).toHaveLength(5);
    expect(selectImageJobs({ imageJobs: jobs }, prompts, {
      mode: 'pilot', ids: ['visual.image.portrait.albina.normal'],
    }).map(({ job }) => job.id)).toEqual(['visual.image.portrait.albina.normal']);
    expect(selected.findIndex(({ job }) => job.id === 'visual.image.portrait.albina.normal'))
      .toBeLessThan(selected.findIndex(({ job }) => job.id === 'visual.image.portrait.albina.armored'));
    expect(selected.findIndex(({ job }) => job.id === 'visual.image.portrait.protagonist.serious'))
      .toBeLessThan(selected.findIndex(({ job }) => job.id === 'visual.image.cg.opening_rain'));
    expect(() => selectImageJobs({ imageJobs: jobs }, prompts, { ids: ['unknown'] })).toThrow(/unknown image jobs/iu);
  });

  it('loads a production authorization bound to both canon claims and visual sources', async () => {
    const inputs = await loadProductionInputs();
    expect((inputs as any).canonClaims.version).toBe(1);
    const recapJobs = (inputs as any).plan.imageJobs.filter((job: any) => job.id.startsWith('visual.image.cg.canon_recap_'));
    expect(recapJobs).toHaveLength(6);
    expect(recapJobs.every((job: any) => job.canonClaimIds.length > 0)).toBe(true);
  });

  it('atomically replaces an existing ledger file on Windows', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-visual-ledger-'));
    const path = join(directory, 'ledger.json');
    await atomicWrite(path, Buffer.from('first'));
    await atomicWrite(path, Buffer.from('second'));
    expect(await readFile(path, 'utf8')).toBe('second');
  });

  it('fails closed instead of forgetting an invalid paid-request ledger', () => {
    const valid = {
      version: 2, projectId: 'albina-galgame-card', provider: 'x666-openai-compatible',
      model: 'gpt-image-2', upstreamPieVerified: false, jobs: {},
    };
    expect(validateLedger(valid)).toEqual(valid);
    expect(() => validateLedger({ version: 1, jobs: {} })).toThrow(/refusing to forget paid request history/iu);
    expect(() => validateLedger({ ...valid, jobs: [] })).toThrow(/refusing to forget paid request history/iu);
    expect(() => validateLedger({ ...valid, provider: 'pie' })).toThrow(/refusing to forget paid request history/iu);
    const invalidJob = {
      jobId: 'visual.image.test', status: 'unknown', sourceJobHash: 'a'.repeat(64), requestKey: 'b'.repeat(64),
      receiptAssetId: 'cg.test', activeAttempt: 1, attempts: [{ attempt: 1, status: 'running' }],
    };
    expect(() => validateLedger({ ...valid, jobs: { [invalidJob.jobId]: invalidJob } })).toThrow(/duplicate paid request/iu);
    expect(() => validateLedger({ ...valid, jobs: { 'visual.image.test': { ...invalidJob, status: 'running', attempts: [] } } })).toThrow(/duplicate paid request/iu);
    expect(() => validateLedger({ ...valid, jobs: { 'visual.image.test': { ...invalidJob, status: 'running', sourceJobHash: 'bad' } } })).toThrow(/duplicate paid request/iu);
  });

  it('treats an explicit model routing rejection as a definitive failed request', () => {
    expect(isAmbiguousProviderResponse(503, {
      error: { code: 'model_not_found', type: 'new_api_error' },
    })).toBe(false);
    expect(isAmbiguousProviderResponse(503, {
      error: { code: 'upstream_unavailable', type: 'new_api_error' },
    })).toBe(true);
  });

  it('rejects placeholder credentials before an x666 request can be submitted', () => {
    expect(isUsableX666ApiKey(undefined)).toBe(false);
    expect(isUsableX666ApiKey('abc')).toBe(false);
    expect(isUsableX666ApiKey('sk-placeholder')).toBe(false);
    expect(isUsableX666ApiKey(`sk-${'aB9_'.repeat(8)}`)).toBe(true);
    expect(isUsableX666ApiKey(` sk-${'a'.repeat(24)}`)).toBe(false);
  });

  it('removes an opaque magenta portrait background even when the RGBA source has a stray transparent pixel', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-portrait-key-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const subject = x >= 16 && x < 48 && y >= 12 && y < 56;
      const nearMagentaDetail = x >= 24 && x < 40 && y >= 24 && y < 40;
      const rgba = nearMagentaDetail ? [224, 32, 224, 255] : subject ? [24, 180, 210, 255] : [255, 0, 255, 255];
      pixels.set(rgba, offset);
    }
    pixels[3] = 0;
    await encodeRgba(source, width, height, pixels);
    await preparePortrait(
      { delivery: { width, height } }, source, delivery,
      { width, height, alphaCapable: true }, { hasTransparency: true },
    );
    const result = await decodeRgba(delivery, width, height);
    expect(pixel(result, width, 63, 63)[3]).toBeLessThan(8);
    expect(pixel(result, width, 32, 32)[3]).toBeGreaterThan(247);
  });
});
