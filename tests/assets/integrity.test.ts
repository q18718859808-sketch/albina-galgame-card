import { createHash } from 'node:crypto';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { detectAssetMimeType, validateAssetIntegrity } from '../../scripts/lib/asset-integrity.mjs';

it('detects a completed asset changed after manifest hashing', async () => {
  const root = await mkdtemp(join(tmpdir(), 'albina-integrity-'));
  const path = join(root, 'asset.txt');
  await writeFile(path, 'approved');
  const approved = await readFile(path);
  const asset = { id: 'asset.test', path: 'asset.txt', bytes: approved.length, sha256: createHash('sha256').update(approved).digest('hex') };
  expect(await validateAssetIntegrity(root, [asset])).toEqual([]);
  await writeFile(path, 'tampered');
  expect(await validateAssetIntegrity(root, [asset])).toEqual(expect.arrayContaining([expect.stringMatching(/mismatch/u)]));
});

const signedFormats = [
  ['png', 'image/png', Buffer.from('89504e470d0a1a0a', 'hex')],
  ['jpg', 'image/jpeg', Buffer.from('ffd8ffe000104a464946', 'hex')],
  ['webp', 'image/webp', Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBPVP8 ')])],
  ['mp3', 'audio/mpeg', Buffer.concat([Buffer.from('ID3'), Buffer.from([4, 0, 0]), Buffer.alloc(4)])],
  ['wav', 'audio/wav', Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WAVEfmt ')])],
  ['mp4', 'video/mp4', Buffer.concat([Buffer.from([0, 0, 0, 24]), Buffer.from('ftypisom'), Buffer.alloc(12)])],
  ['json', 'application/json', Buffer.from('{"valid":true}')],
] as const;

describe('asset file signatures', () => {
  it('accepts a Uint8Array through the exported detector contract', () => {
    expect(detectAssetMimeType(Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe('image/png');
  });

  it.each(signedFormats)('accepts a matching .%s signature and MIME type', async (extension, mimeType, bytes) => {
    const root = await mkdtemp(join(tmpdir(), 'albina-signature-'));
    const relativePath = `asset.${extension}`;
    await writeFile(join(root, relativePath), bytes);
    const asset = {
      id: `asset.${extension}`,
      path: relativePath,
      mimeType,
      bytes: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };

    expect(await validateAssetIntegrity(root, [asset])).toEqual([]);
  });

  it('rejects WebP bytes disguised with a PNG extension and MIME type', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-signature-'));
    const bytes = Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBPVP8X'), Buffer.alloc(10)]);
    await writeFile(join(root, 'disguised.png'), bytes);
    const asset = {
      id: 'asset.disguised',
      path: 'disguised.png',
      mimeType: 'image/png',
      bytes: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };

    expect(await validateAssetIntegrity(root, [asset])).toContain('file signature mismatch: asset.disguised expected=image/png actual=image/webp');
  });

  it('rejects a manifest MIME type that disagrees with the extension', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-signature-'));
    const bytes = Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBPVP8 ')]);
    await writeFile(join(root, 'asset.webp'), bytes);
    const asset = {
      id: 'asset.wrong-mime',
      path: 'asset.webp',
      mimeType: 'image/png',
      bytes: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };

    expect(await validateAssetIntegrity(root, [asset])).toContain('MIME/extension mismatch: asset.wrong-mime extension=.webp expected=image/webp actual=image/png');
  });
});
