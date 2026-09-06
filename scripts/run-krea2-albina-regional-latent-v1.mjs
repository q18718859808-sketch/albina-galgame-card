#!/usr/bin/env node
/**
 * Generate one Albina repair region from the canonical latent-origin route.
 * The output is a staged patch only; it is never promoted automatically.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { produceCanonicalRestyle } from './lib/krea2-restyle.mjs';
import { sha256 } from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const stagingDir = resolve(root, 'staging/media/krea2-regional-latent-v1');
const regionName = process.argv.find((arg) => arg.startsWith('--region='))?.slice(9) ?? 'face-mechanical';
const regions = {
  'face-mechanical': { x: 58, y: 46, width: 472, height: 430 },
  'torso-forearm': { x: 42, y: 330, width: 510, height: 720 },
};
const sourceCrop = regions[regionName];
if (!sourceCrop) throw new Error(`Unknown region ${regionName}; use face-mechanical or torso-forearm`);
const jobId = `albina_regional_${regionName.replaceAll('-', '_')}_v1`;
const outputPath = resolve(stagingDir, `${jobId}.patch.png`);
const compositePath = resolve(stagingDir, `${jobId}.composite.png`);

const prompt = [
  'Krea2 rendering of the exact supplied Albina canonical crop, adult industrial biomechanical woman,',
  'preserve every visible design anchor and pixel position in this crop,',
  'preserve asymmetric mechanical eyes, segmented hair plates, conduit interfaces, open abdominal frame,',
  'crossed mechanical forearms and formal black-white partition where visible,',
  'only improve crisp dense linework, hard-surface edge definition, clean flat color and restrained shading',
].join(' ');
const negativePrompt = [
  'child, loli, chibi, generic anime girl, round face, symmetric eyes, natural hair, costume redesign,',
  'missing machinery, organic arms, fused limbs, extra limbs, altered crop composition, blurry, soft focus,',
  'muddy details, low contrast, text, logo, watermark, UI',
].join(' ');

const pythonComposite = [
  'import sys',
  'from PIL import Image',
  'canonical, patch, output, x, y, width, height = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6]), int(sys.argv[7])',
  'base = Image.open(canonical).convert("RGBA")',
  'src = Image.open(patch).convert("RGBA")',
  'src = src.resize((width, height), Image.Resampling.LANCZOS)',
  'base.alpha_composite(src, (x, y))',
  'base.save(output)',
].join('\n');

await mkdir(stagingDir, { recursive: true });
const result = await produceCanonicalRestyle({
  jobId,
  sourcePath,
  stagingDir,
  prompt,
  negativePrompt,
  seed: 2026081931 + (regionName === 'torso-forearm' ? 1 : 0),
  sourceCrop,
  scale: 2,
  denoise: 0.12,
  steps: 24,
  structureLock: true,
  preserveAlpha: true,
});
spawnSync('python', ['-c', pythonComposite, sourcePath, result.finalPath, compositePath, String(sourceCrop.x), String(sourceCrop.y), String(sourceCrop.width), String(sourceCrop.height)], { stdio: 'inherit' });
const patchBytes = await readFile(result.finalPath);
const compositeBytes = await readFile(compositePath);
const receipt = {
  schemaVersion: 1,
  kind: 'krea2-canonical-regional-latent-patch',
  status: 'awaiting-direct-review',
  jobId,
  canonical: { path: sourcePath, sha256: sha256(await readFile(sourcePath)) },
  sourceCrop,
  krea2Receipt: result.receiptPath,
  patch: { path: result.finalPath, sha256: sha256(patchBytes), bytes: patchBytes.length },
  composite: { path: compositePath, sha256: sha256(compositeBytes), bytes: compositeBytes.length, method: 'canonical-base-plus-region-patch' },
  directReview: { required: true, promotionAllowed: false },
};
await writeFile(`${compositePath}.receipt.json`, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId, regionName, patch: result.finalPath, composite: compositePath, receipt: `${compositePath}.receipt.json` }, null, 2));
