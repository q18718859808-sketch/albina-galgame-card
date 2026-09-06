#!/usr/bin/env node
/** Optional structural finishing pass; never promoted without direct review. */
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const [canonical, produced, output, opacity = '0.28', mode = 'alpha-line'] = process.argv.slice(2);
if (!canonical || !produced || !output) throw new Error('usage: compose-canonical-linework.mjs <canonical> <produced> <output> [opacity]');
const value = Number(opacity);
if (!Number.isFinite(value) || value < 0 || value > 1) throw new Error('opacity must be between 0 and 1');
if (!['alpha-line', 'legacy-multiply'].includes(mode)) throw new Error('mode must be alpha-line or legacy-multiply');

const python = [
  'import sys',
  'from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps',
  'canonical, produced, output, opacity, mode = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), sys.argv[5]',
  "src = Image.open(canonical).convert('RGBA')",
  "out = Image.open(produced).convert('RGBA')",
  'src = src.resize(out.size, Image.Resampling.LANCZOS)',
  "gray = ImageOps.grayscale(src)",
  'edges = ImageOps.autocontrast(gray.filter(ImageFilter.FIND_EDGES))',
  'edges = ImageEnhance.Contrast(edges).enhance(1.7)',
  'edges = edges.point(lambda pixel: 255 if pixel > 38 else 0)',
  'edges = ImageChops.multiply(edges, src.getchannel("A"))',
  'if mode == "legacy-multiply":',
  '    shade = Image.new("L", out.size, 255)',
  '    shade = ImageChops.subtract(shade, edges.point(lambda pixel: int(round(pixel * opacity))))',
  '    rgb = ImageChops.multiply(out.convert("RGB"), Image.merge("RGB", (shade, shade, shade)))',
  '    result = rgb.convert("RGBA")',
  'else:',
  '    ink_alpha = edges.point(lambda pixel: int(round(pixel * opacity)))',
  '    ink = Image.new("RGBA", out.size, (8, 9, 12, 0))',
  '    ink.putalpha(ink_alpha)',
  '    result = Image.alpha_composite(out, ink)',
  'result.putalpha(src.getchannel("A"))',
  'result.save(output)',
  'print(result.size[0], result.size[1])',
].join('\n');
const result = spawnSync('python', ['-c', python, resolve(canonical), resolve(produced), resolve(output), String(value), mode], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(result.stderr || result.stdout || 'linework composition failed');
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const [canonicalBytes, producedBytes, outputBytes] = await Promise.all([
  readFile(resolve(canonical)), readFile(resolve(produced)), readFile(resolve(output)),
]);
const receipt = {
  schemaVersion: 1,
  purpose: 'krea2-canonical-linework-hybrid-staging',
  status: 'awaiting-direct-review',
  method: 'canonical-edge-preservation-over-krea2-rgb-output',
  inputs: {
    canonical: { path: canonical, sha256: digest(canonicalBytes) },
    krea2Rgb: { path: produced, sha256: digest(producedBytes) },
  },
  operation: { edgeSource: 'canonical', opacity: value, mode, alphaSource: 'canonical' },
  output: { path: output, sha256: digest(outputBytes), bytes: outputBytes.length },
  promotionAllowed: false,
  review: { directImageReadRequired: true, automatedVisionAdvisoryOnly: true },
};
await writeFile(`${resolve(output)}.receipt.json`, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(result.stdout.trim());
