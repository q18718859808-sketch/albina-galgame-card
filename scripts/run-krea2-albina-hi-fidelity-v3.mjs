#!/usr/bin/env node
/** Albina final boundary probe: native source, maximum approved low-denoise pass. */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { produceCanonicalRestyle } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const stagingDir = resolve(root, 'staging/media/krea2-hi-fidelity-v3/characters');
const jobId = 'albina_unarmored_hi_fidelity_v3';
const prompt = [
  'Krea2 rendering of the supplied authored adult Albina mechanical character, preserve exact canonical design,',
  'exact silhouette and pose, adult elongated proportions, asymmetric mechanical eyes and left-right assignment,',
  'segmented hair plates, image-right conduit bundle, open abdominal frame, crossed mechanical forearms,',
  'black-white lower-body partition; only add crisp high-frequency ink, clean hard-surface edges and controlled shading, no redesign',
].join(' ');
const negativePrompt = [
  'child, loli, chibi, young girl, generic anime girl, round face, oversized eyes, symmetric eyes, natural hair,',
  'costume redesign, missing mechanical parts, closed abdomen, organic arms, fused arms, extra limbs, bad hands,',
  'broken joints, warped perspective, cropped feet, blurry, soft focus, smeared linework, muddy details, low contrast, text, logo, watermark, UI',
].join(' ');

await mkdir(stagingDir, { recursive: true });
const result = await produceCanonicalRestyle({
  jobId, sourcePath, stagingDir, prompt, negativePrompt,
  seed: 2026081943, scale: 1.7, denoise: 0.18, steps: 28,
  preUpscaleModel: '4x_fatal_Anime_500000_G.pth', preUpscaleInputScale: 1,
  preserveAlpha: true,
});
const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
await writeFile(receiptPath, `${JSON.stringify({ ...result.receipt, productionContract: { ...result.receipt.productionContract, fidelityProfile: 'albina-hi-fidelity-v3-boundary', nativeCanonicalInputPreserved: true, sixLoraBaselineRequired: true, outputQualityReviewRequired: true } }, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId, output: result.finalPath, receipt: receiptPath, sha256: result.finalSha256, styleChain: result.receipt.styleChain, effectiveSampling: result.receipt.effectiveSampling }, null, 2));
