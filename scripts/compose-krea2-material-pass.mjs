#!/usr/bin/env node
/**
 * Canonical-structure material pass.
 *
 * This is deliberately a deterministic compositor, not a second generative
 * claim: the canonical RGBA drawing remains the structure/alpha authority and
 * a reviewed Krea2 RGB render contributes only restrained material variation.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith('--'));
const receiptArg = args.find((arg) => arg.startsWith('--krea2-receipt='))?.slice('--krea2-receipt='.length) ?? null;
const [canonicalArg, materialArg, outputArg] = positional;
if (!canonicalArg || !materialArg || !outputArg) throw new Error('usage: compose-krea2-material-pass.mjs <canonical> <krea2-rgb> <output>');
const root = resolve(import.meta.dirname, '..');
const canonical = resolve(root, canonicalArg);
const material = resolve(root, materialArg);
const output = resolve(root, outputArg);
const python = [
  'import sys',
  'from PIL import Image, ImageChops, ImageEnhance',
  'canonical, material, output = sys.argv[1:4]',
  'base = Image.open(canonical).convert("RGBA")',
  'surface = Image.open(material).convert("RGB").resize(base.size, Image.Resampling.LANCZOS)',
  'base_rgb = base.convert("RGB")',
  'surface = ImageEnhance.Contrast(surface).enhance(1.05)',
  'surface = ImageEnhance.Sharpness(surface).enhance(1.12)',
  'alpha = base.getchannel("A")',
  '# Krea2 contributes a restrained finish only. Preserve canonical dark mechanical',
  '# construction lines so the generator cannot rewrite Albina\'s geometry.',
  'mixed = Image.blend(base_rgb, surface, 0.34)',
  'line_mask = base_rgb.convert("L").point(lambda value: 255 if value < 105 else 0, mode="L")',
  'line_mask = ImageEnhance.Contrast(line_mask).enhance(1.35)',
  'result = Image.composite(base_rgb, mixed, ImageChops.invert(line_mask)).convert("RGBA")',
  'result.putalpha(alpha)',
  'result.save(output)',
].join('\n');
const result = spawnSync('python', ['-c', python, canonical, material, output], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(result.stderr || result.stdout || 'material pass failed');
const digest = (value) => createHash('sha256').update(value).digest('hex');
const [canonicalBytes, materialBytes, outputBytes] = await Promise.all([readFile(canonical), readFile(material), readFile(output)]);
const krea2Receipt = receiptArg ? JSON.parse(await readFile(resolve(root, receiptArg), 'utf8')) : null;
if (krea2Receipt && krea2Receipt.provider !== 'comfyui-local-krea2') throw new Error('material pass receipt must be a local Krea2 receipt');
if (krea2Receipt && (!Array.isArray(krea2Receipt.styleChain) || krea2Receipt.styleChain.length !== 6)) throw new Error('material pass receipt must prove the six-LoRA chain');
const receipt = {
  schemaVersion: 1,
  kind: 'canonical-structure-krea2-material-pass',
  status: 'awaiting-direct-review',
  canonical: { path: canonicalArg, sha256: digest(canonicalBytes) },
  krea2Material: { path: materialArg, sha256: digest(materialBytes), productionReceipt: receiptArg ?? null },
  output: { path: outputArg, sha256: digest(outputBytes), bytes: outputBytes.length },
  invariant: { structureSource: 'canonical-rgba', alphaSource: 'canonical', materialSource: 'krea2-rgb', generatedText: false, sixLoraReceiptRequired: true },
  promotionAllowed: false,
  review: { directImageReadRequired: true, automatedVisionAdvisoryOnly: true },
};
await writeFile(`${output}.receipt.json`, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
