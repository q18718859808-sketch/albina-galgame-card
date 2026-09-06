#!/usr/bin/env node
/**
 * Albina v5: Krea2Edit v1.2 dual-reference probe.
 *
 * The six-LoRA production chain is built first and remains intact. Krea2Edit
 * is added only as the reference-aware edit layer, with the canonical image
 * supplied to both latent and grounded semantic paths and the same target
 * latent wired for pre-encoding. This is a single-asset probe, not a batch
 * route, and it remains blocked from promotion until direct image review.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  buildKrea2ImageEditWorkflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  makeKrea2Receipt,
  sha256,
  uploadKrea2Image,
  validateKrea2ProductionStyleChain,
  waitForKrea2Output,
  workflowTopologySha256,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const stagingDir = resolve(root, 'staging/media/krea2-hi-fidelity-v5/characters');
const jobId = 'albina_unarmored_hi_fidelity_v5';
const targetSize = { width: 672, height: 2016 };
const prompt = [
  'strict source-preserving Krea2Edit pass over the supplied authored adult Albina character,',
  'preserve the exact unmirrored full-body 1:3 composition, silhouette, pose, feet and all component topology,',
  'preserve the asymmetric mechanical eyes with their original left-right assignment, segmented silver-grey hair plates, image-right conduit bundle,',
  'open abdominal frame, crossed mechanical forearms, black-white lower-body partition and every hard-surface boundary,',
  'only add crisp Krea2 line finish, controlled material separation and restrained shading; do not invent, simplify, mirror or redesign',
].join(' ');
const negativePrompt = [
  'child, loli, chibi, young girl, generic anime face, round face, oversized eyes, symmetric eyes, mirrored eye assignment,',
  'natural hair, clothing redesign, missing machinery, closed abdomen, organic arms, fused arms, extra limbs, broken joints,',
  'changed pose, changed proportions, cropped feet, collage, inset, pasted patch, seam, blurry, soft focus, smeared linework,',
  'muddy details, text, logo, watermark, UI, signature',
].join(' ');

await mkdir(stagingDir, { recursive: true });
const { workflow: baseline, workflowPath, evidencePath } = await loadVerifiedKrea2Baseline();
const sourceSha = sha256(await readFile(sourcePath));
const uploaded = await uploadKrea2Image(sourcePath, { filename: `${jobId}-canonical.png` });
const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt,
  negativePrompt,
  systemPrompt: 'The supplied canonical image is the sole identity and geometry authority. Perform a rendering finish only; preserve every authored mechanical boundary.',
  seed: 2026081955,
  filenamePrefix: jobId,
  targetSize,
  subjectImage: uploaded.filename,
  fitMode: 'fit',
  groundingPixels: 1024,
  subjectReferenceBoost: 1.25,
  postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1.0 },
});
const styleChain = validateKrea2ProductionStyleChain(workflow);
const invocationPath = resolve(stagingDir, `${jobId}.workflow.json`);
await writeFile(invocationPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
const invocationBytes = await readFile(invocationPath);
const workflowHash = sha256(JSON.stringify(workflow));
const receipt = makeKrea2Receipt({
  jobId,
  promptSha256: sha256(prompt),
  baselineWorkflowSha256: sha256(await readFile(workflowPath)),
  invocationWorkflowSha256: workflowHash,
  invocationFileSha256: sha256(invocationBytes),
  invocationWorkflowPath: `staging/media/krea2-hi-fidelity-v5/characters/${jobId}.workflow.json`,
  topologySha256: workflowTopologySha256(workflow),
  workflowPath,
  prompt,
  seed: 2026081955,
  filenamePrefix: jobId,
  workflowSerialization: 'stable-json-v1',
  evidencePath,
  evidenceSha256: sha256(await readFile(evidencePath)),
  resolution: targetSize,
  referenceInputs: [{
    role: 'canonical-identity-and-geometry',
    file: sourcePath.split(/[\\/]/u).pop(),
    path: 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png',
    sha256: sourceSha,
  }],
  referencesSentToModel: true,
  referenceNote: 'Krea2Edit v1.2 dual path: canonical image is supplied to VAE latent reference and grounded semantic encoder; target latent is connected for pre-encoding.',
});
receipt.method = 'krea2edit-v1.2-dual-reference-canonical-finish-v1';
receipt.productionContract = {
  structureLock: true,
  sixLoraBaselineRequired: true,
  outputQualityReviewRequired: true,
  identityEditUsed: true,
  groundedSemanticReference: true,
  targetLatentConnected: true,
  canonicalAspectRatioPreserved: true,
  promotionAllowed: false,
};
receipt.styleChain = styleChain;
receipt.effectiveSampling = { identityReferenceBoost: 1.25, groundingPixels: 1024, fitMode: 'fit', targetSize, postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1.0 } };
const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
try {
  const queued = await enqueueKrea2Job(workflow);
  const result = await waitForKrea2Output(queued.promptId);
  if (result.images.length !== 1) throw new Error(`Expected exactly one output, received ${result.images.length}`);
  const outputPath = resolve(stagingDir, `${jobId}.png`);
  const output = await downloadKrea2Image(result.images[0], outputPath);
  receipt.status = 'completed';
  receipt.execution = { promptId: queued.promptId, historySha256: sha256(JSON.stringify(result.history)), history: result.history, outputBinding: result.images[0] };
  receipt.output = { path: outputPath, finalPath: outputPath, ...output, finalSha256: output.sha256 };
  await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ jobId, output: outputPath, receipt: receiptPath, resolution: targetSize, styleChain }, null, 2));
} catch (error) {
  receipt.status = 'failed';
  receipt.error = error instanceof Error ? error.message : String(error);
  await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  throw error;
}
