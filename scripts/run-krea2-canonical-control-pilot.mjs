#!/usr/bin/env node
/** Run one auditable Albina canonical/reference/depth-control pilot. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import {
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  uploadKrea2Image,
  waitForKrea2Output,
  workflowTopology,
} from './lib/krea2-comfyui.mjs';
import { buildCanonicalControlRestyleWorkflow } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'staging/media/krea2-canonical-restyle/characters/restyle_albina_unarmored_v3.input.png');
const canonicalPath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const outputRoot = resolve(root, 'staging/media/krea2-canonical-control/characters');
const jobId = 'albina_unarmored_control_v1';

const prompt = [
  'adult Albina canonical character restoration, exact original silhouette and pose,',
  'asymmetric mechanical eyes fixed left-right, segmented rigid hair plates,',
  'image-right conduit bundle, open abdominal frame, crossed mechanical forearms,',
  'black-white lower-body partition, crisp dense linework, sharp mechanical edges,',
  'clean flat color separation, restrained material shading, neutral studio background',
].join(' ');
const negativePrompt = [
  'child, loli, chibi, young girl, generic anime girl, round face, oversized eyes,',
  'symmetric eyes, natural hair, redesigned costume, closed abdomen, organic arms,',
  'fused arms, missing conduit, missing mechanical eyes, extra limbs, broken joints,',
  'soft focus, blurry, muddy details, low contrast, text, logo, watermark, UI, collage, cropped feet',
].join(' ');

await mkdir(outputRoot, { recursive: true });
const { workflow: baseline, workflowPath } = await loadVerifiedKrea2Baseline();
const upload = await uploadKrea2Image(sourcePath);
const workflow = buildCanonicalControlRestyleWorkflow(baseline, {
  prompt,
  negativePrompt,
  seed: 2026081911,
  width: 1024,
  height: 3072,
  filenamePrefix: jobId,
  sourceFilename: upload.filename,
  identityStrength: 0.95,
  promptStrength: 0.7,
  krea2Control: { kind: 'depth', strength: 0.35 },
});

const invocationPath = resolve(outputRoot, `${jobId}.workflow.json`);
await writeFile(invocationPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
const queued = await enqueueKrea2Job(workflow);
const result = await waitForKrea2Output(queued.promptId, { timeoutMs: 7_200_000 });
const outputPath = resolve(outputRoot, `${jobId}.rgb.png`);
const output = await downloadKrea2Image(result.images[0], outputPath);
const receipt = {
  schemaVersion: 1,
  provider: 'comfyui-local-krea2',
  model: 'redcraft23FP8_30Krea2.safetensors',
  jobId,
  status: 'completed',
  createdAt: new Date().toISOString(),
  comfyui: { url: process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199' },
  workflow: {
    path: workflowPath,
    baselineSha256: sha256(await readFile(workflowPath)),
    invocationSha256: sha256(JSON.stringify(workflow)),
    invocationFileSha256: sha256(await readFile(invocationPath)),
    invocationPath: relative(root, invocationPath).replaceAll('\\', '/'),
    topologySha256: sha256(JSON.stringify(workflowTopology(workflow))),
  },
  promptSha256: sha256(prompt),
  prompt,
  negativePrompt,
  seed: 2026081911,
  resolution: { width: 1024, height: 3072 },
  references: {
    sentToModel: true,
    inputs: [{
      role: 'canonical-reference-and-depth-control',
      path: relative(root, canonicalPath).replaceAll('\\', '/'),
      sha256: sha256(await readFile(canonicalPath)),
    }],
    uploadedCanonical: { comfyFilename: upload.filename, sha256: upload.sha256, bytes: upload.bytes },
  },
  execution: {
    promptId: queued.promptId,
    historySha256: sha256(JSON.stringify(result.history)),
    history: result.history,
    outputBinding: result.images[0],
  },
  output: {
    path: outputPath,
    finalPath: outputPath,
    sha256: output.sha256,
    finalSha256: output.sha256,
    bytes: output.bytes,
    filename: output.filename,
    alphaRestored: false,
  },
  method: 'krea2-canonical-reference-v10-depth-control-v1',
  productionContract: {
    sixLoraBaselineRequired: true,
    canonicalReference: true,
    depthControl: true,
    visualReviewRequired: true,
  },
  control: { kind: 'depth', strength: 0.35 },
  promotionAllowed: false,
};
const receiptPath = resolve(outputRoot, `${jobId}.receipt.json`);
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId, promptId: queued.promptId, outputPath, receiptPath, sha256: output.sha256 }, null, 2));
