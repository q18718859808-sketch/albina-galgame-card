import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

const mimeByExtension = new Map([
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.json', 'application/json'],
  ['.mp3', 'audio/mpeg'],
  ['.mp4', 'video/mp4'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.wav', 'audio/wav'],
  ['.webp', 'image/webp'],
]);

const startsWith = (bytes, signature) => signature.every((byte, index) => bytes[index] === byte);
const asciiAt = (bytes, start, value) => bytes.length >= start + value.length && bytes.toString('ascii', start, start + value.length) === value;

function isMp3(bytes) {
  if (asciiAt(bytes, 0, 'ID3')) return bytes.length >= 10 && [6, 7, 8, 9].every((index) => (bytes[index] & 0x80) === 0);
  return bytes.length >= 2 && bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0 && (bytes[1] & 0x18) !== 0x08 && (bytes[1] & 0x06) !== 0;
}

function isJson(bytes) {
  try {
    JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/u, ''));
    return true;
  } catch {
    return false;
  }
}

function isSvg(bytes) {
  const text = bytes.toString('utf8').replace(/^\uFEFF/u, '');
  return /^\s*(?:<\?xml[\s\S]*?\?>\s*)?(?:<!--[\s\S]*?-->\s*)*<svg(?:\s|>)/iu.test(text);
}

export function detectAssetMimeType(input) {
  const bytes = Buffer.isBuffer(input) ? input : Buffer.from(input);
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png';
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return 'image/jpeg';
  if (asciiAt(bytes, 0, 'RIFF') && asciiAt(bytes, 8, 'WEBP')) return 'image/webp';
  if (asciiAt(bytes, 0, 'RIFF') && asciiAt(bytes, 8, 'WAVE')) return 'audio/wav';
  if (bytes.length >= 12 && asciiAt(bytes, 4, 'ftyp')) return 'video/mp4';
  if (isMp3(bytes)) return 'audio/mpeg';
  if (isJson(bytes)) return 'application/json';
  if (isSvg(bytes)) return 'image/svg+xml';
  return undefined;
}

function validateAssetFormat(asset, bytes) {
  const expectedMimeType = mimeByExtension.get(extname(asset.path).toLowerCase());
  if (!expectedMimeType) return [];
  const findings = [];
  if (asset.mimeType !== expectedMimeType) {
    findings.push(`MIME/extension mismatch: ${asset.id} extension=${extname(asset.path).toLowerCase()} expected=${expectedMimeType} actual=${asset.mimeType ?? 'missing'}`);
  }
  const detectedMimeType = detectAssetMimeType(bytes);
  if (detectedMimeType !== expectedMimeType) {
    findings.push(`file signature mismatch: ${asset.id} expected=${expectedMimeType} actual=${detectedMimeType ?? 'unknown'}`);
  }
  return findings;
}

export async function validateAssetIntegrity(assetRoot, assets, pendingIds = new Set()) {
  const findings = [];
  for (const asset of assets) {
    if (pendingIds.has(asset.id)) continue;
    if (!asset.sha256 || asset.bytes === undefined) {
      findings.push(`missing integrity metadata: ${asset.id}`);
      continue;
    }
    try {
      const bytes = await readFile(resolve(assetRoot, asset.path));
      if (bytes.length !== asset.bytes) findings.push(`byte mismatch: ${asset.id} expected=${asset.bytes} actual=${bytes.length}`);
      const actualHash = sha256(bytes);
      if (actualHash !== asset.sha256) findings.push(`hash mismatch: ${asset.id} expected=${asset.sha256} actual=${actualHash}`);
      findings.push(...validateAssetFormat(asset, bytes));
    } catch {
      findings.push(`missing asset: ${asset.id} -> ${asset.path}`);
    }
  }
  return findings;
}
