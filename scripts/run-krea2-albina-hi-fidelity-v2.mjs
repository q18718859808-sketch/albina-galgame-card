#!/usr/bin/env node
/**
 * Albina high-fidelity probe v2: preserve native canonical pixels before the
 * local detail model. v1 deliberately bounded the input below source size and
 * is retained as a rejected experiment; v2 avoids that information loss.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { produceCanonicalRestyle } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const stagingDir = resolve(root, 'staging/media/krea2-hi-fidelity-v2/characters');
const jobId = 'albina_unarmored_hi_fidelity_v2';
const prompt = [
  'Krea2 high fidelity rendering of the supplied authored adult Albina mechanical character,',
  'preserve the exact canonical silhouette, pose, adult proportions and every mechanical design fact,',
  'preserve asymmetric mechanical eyes with exact left-right assignment, segmented hair plates,',
  'image-right conduit bundle, open abdominal frame, crossed mechanical forearms, black-white lower-body partition,',
  'render only: crisp high-frequency ink, precise hard-surface edges, readable small components,',
  'controlled flat colors, restrained material shading, clean industrial anime finish, no redesign',
].join(' ');
const negativePrompt = [
  'child, loli, chibi, young girl, generic anime girl, round face, oversized eyes, symmetric eyes,',
  'natural hair, costume redesign, missing mechanical parts, closed abdomen, organic arms, fused arms,',
  'extra limbs, bad hands, broken joints, warped perspective, cropped feet, blurry, soft focus, smeared linework,',
  'muddy details, low contrast, text, logo, watermark, UI, signature',
].join(' ');

await mkdir(stagingDir, { recursive: true });
const result = await produceCanonicalRestyle({
  jobId, sourcePath, stagingDir, prompt, negativePrompt,
  seed: 2026081942, scale: 1.7, denoise: 0.12, steps: 24,
  preUpscaleModel: '4x_fatal_Anime_500000_G.pth', preUpscaleInputScale: 1,
  preserveAlpha: true,
});
const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
const receipt = {
  ...result.receipt,
  productionContract: {
    ...result.receipt.productionContract,
    fidelityProfile: 'albina-hi-fidelity-v2',
    nativeCanonicalInputPreserved: true,
    sixLoraBaselineRequired: true,
    outputQualityReviewRequired: true,
  },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId, output: result.finalPath, receipt: receiptPath, sha256: result.finalSha256, styleChain: receipt.styleChain, effectiveSampling: receipt.effectiveSampling }, null, 2));
