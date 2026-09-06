#!/usr/bin/env node
/**
 * One auditable Albina structure-lock production run.
 *
 * This is intentionally a single-asset entry point. It must be reviewed at
 * original resolution before it can be used by the batch producer.
 */
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { produceCanonicalRestyle } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const stagingDir = resolve(root, 'staging/media/krea2-structure-lock-v3/characters');
const jobId = 'albina_unarmored_structure_lock_v3';

const prompt = [
  'Krea2 rendering pass over the supplied authored Albina design,',
  'adult industrial biomechanical woman, preserve the exact source silhouette,',
  'preserve the asymmetric mechanical eyes and their left-right assignment,',
  'preserve segmented hair plates, image-right conduit bundle, open abdominal frame,',
  'preserve crossed mechanical forearms, black-white lower-body partition, pose and feet,',
  'only improve the Krea2 finish with crisp dense linework, precise hard-surface edges,',
  'clean flat colour separation, restrained material shading, high local contrast, no redesign',
].join(' ');
const negativePrompt = [
  'child, loli, chibi, young girl, generic anime girl, round face, oversized eyes,',
  'symmetric eyes, natural hair, costume redesign, missing mechanical parts, closed abdomen,',
  'organic arms, fused arms, extra limbs, broken joints, warped perspective, cropped feet,',
  'blurry, soft focus, smeared linework, muddy details, low contrast, text, logo, watermark, UI',
].join(' ');

await mkdir(stagingDir, { recursive: true });
const result = await produceCanonicalRestyle({
  jobId,
  sourcePath,
  stagingDir,
  prompt,
  negativePrompt,
  seed: 2026081924,
  // 1.7x yields a 1000x3008-ish target from the canonical 588x1766 plate.
  scale: 1.7,
  denoise: 0.10,
  steps: 24,
  structureLock: true,
  preserveAlpha: true,
});

console.log(JSON.stringify({
  jobId,
  output: result.finalPath,
  receipt: result.receiptPath,
  sha256: result.finalSha256,
  contract: result.receipt.productionContract,
  styleChain: result.receipt.styleChain,
}, null, 2));
