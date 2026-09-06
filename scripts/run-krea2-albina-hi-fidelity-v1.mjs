#!/usr/bin/env node
/**
 * Albina high-fidelity probe.
 *
 * This is a separate production contract from the conservative geometry lock:
 * the canonical image is still the VAE latent origin and the six-LoRA Krea2
 * chain is unchanged, while a bounded local anime upscaler supplies extra
 * source pixels before encoding. The output remains staging-only until it is
 * directly reviewed at original resolution.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { produceCanonicalRestyle } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const stagingDir = resolve(root, 'staging/media/krea2-hi-fidelity-v1/characters');
const jobId = 'albina_unarmored_hi_fidelity_v1';

const prompt = [
  'Krea2 high fidelity rendering of the supplied authored adult Albina mechanical character,',
  'preserve the exact canonical silhouette, pose, adult proportions and all mechanical design facts,',
  'preserve the asymmetric mechanical eyes and exact left-right assignment, segmented hair plates,',
  'image-right conduit bundle, open abdominal frame, crossed mechanical forearms, black-white lower-body partition,',
  'render only: exceptionally crisp high-frequency linework, hard-surface edge definition, readable small components,',
  'controlled flat colors, restrained material shading, clean anime illustration finish, no redesign',
].join(' ');
const negativePrompt = [
  'child, loli, chibi, young girl, generic anime girl, round face, oversized eyes, symmetric eyes,',
  'natural hair, costume redesign, missing mechanical parts, closed abdomen, organic arms, fused arms,',
  'extra limbs, bad hands, broken joints, warped perspective, cropped feet, blurry, soft focus, smeared linework,',
  'muddy details, low contrast, text, logo, watermark, UI, signature',
].join(' ');

await mkdir(stagingDir, { recursive: true });
const result = await produceCanonicalRestyle({
  jobId,
  sourcePath,
  stagingDir,
  prompt,
  negativePrompt,
  seed: 2026081941,
  scale: 1.7,
  denoise: 0.12,
  steps: 24,
  preUpscaleModel: '4x_fatal_Anime_500000_G.pth',
  preUpscaleInputScale: 0.5,
  preserveAlpha: true,
});

const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
const receipt = {
  ...result.receipt,
  productionContract: {
    ...result.receipt.productionContract,
    fidelityProfile: 'albina-hi-fidelity-v1',
    canonicalLatentOrigin: true,
    sixLoraBaselineRequired: true,
    preUpscale: {
      model: '4x_fatal_Anime_500000_G.pth',
      inputScale: 0.5,
      bounded: true,
      purpose: 'linework-detail-preservation',
    },
    outputQualityReviewRequired: true,
  },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  jobId,
  output: result.finalPath,
  receipt: receiptPath,
  sha256: result.finalSha256,
  fidelityProfile: receipt.productionContract.fidelityProfile,
  styleChain: receipt.styleChain,
  effectiveSampling: receipt.effectiveSampling,
}, null, 2));
