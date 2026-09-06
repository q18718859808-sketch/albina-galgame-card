#!/usr/bin/env node
/**
 * Single-variable Albina production probe.
 *
 * This intentionally retains the verified six-LoRA baseline and the canonical
 * latent-origin route, while correcting the failed candidates' geometry loss:
 * the original 1:3 canvas is retained, no reference/edit/control branch is
 * attached, and sampling makes only a low-denoise material pass.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { produceCanonicalRestyle } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const stagingDir = resolve(root, 'staging/media/krea2-hi-fidelity-v4/characters');
const jobId = 'albina_unarmored_hi_fidelity_v4';

const prompt = [
  'material-only Krea2 rendering pass over the supplied authored adult Albina character; preserve every source pixel relationship and exact full-body 1:3 framing,',
  'adult narrow face; preserve asymmetric black-and-white mechanical eyes with their original left-right assignment,',
  'preserve segmented silver-grey hair plates, the image-right conduit bundle, the open abdominal frame,',
  'the crossed mechanical forearms, black-and-white lower-body partitions, feet, silhouette and pose,',
  'only resolve existing authored linework into crisp controlled hard-surface ink and restrained Krea2 material shading; no invented details and no redesign',
].join(' ');

const negativePrompt = [
  'child, loli, chibi, young girl, round face, oversized eyes, generic anime face, symmetric eyes, natural hair,',
  'different character, costume redesign, missing mechanical parts, closed abdomen, organic arms, fused forearms, extra limbs, broken joints,',
  'cropped feet, altered proportions, altered pose, soft focus, blurry, smeared linework, muddy details, low contrast,',
  'text, logo, watermark, UI, signature',
].join(' ');

await mkdir(stagingDir, { recursive: true });
const result = await produceCanonicalRestyle({
  jobId,
  sourcePath,
  stagingDir,
  prompt,
  negativePrompt,
  seed: 2026081954,
  // Preserve the authored tall plate rather than forcing the earlier 9:16 layout.
  targetSize: { width: 672, height: 2016 },
  denoise: 0.12,
  steps: 26,
  structureLock: true,
  preserveAlpha: true,
});

const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
await writeFile(receiptPath, `${JSON.stringify({
  ...result.receipt,
  productionContract: {
    ...result.receipt.productionContract,
    fidelityProfile: 'albina-hi-fidelity-v4-native-1x3-low-denoise',
    identityEditDisabled: true,
    referenceControlDisabled: true,
    canonicalAspectRatioPreserved: true,
    sixLoraBaselineRequired: true,
    outputQualityReviewRequired: true,
  },
}, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  jobId,
  output: result.finalPath,
  receipt: receiptPath,
  sha256: result.finalSha256,
  resolution: { width: result.width, height: result.height },
  styleChain: result.receipt.styleChain,
}, null, 2));
