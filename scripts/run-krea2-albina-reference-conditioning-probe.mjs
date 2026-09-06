import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildKrea2ReferenceConditioningWorkflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  uploadKrea2Image,
  validateKrea2ProductionStyleChain,
  waitForKrea2Output,
  workflowTopology,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const source = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const output = resolve(root, 'staging/media/krea2-canonical-sample/albina-unarmored-six-lora-v15-reference-conditioning.png');
const receiptPath = output.replace(/\.png$/u, '.json');
const prompt = 'A single coherent full-body adult woman visual-novel standing portrait. Preserve the canonical subject exactly: mature cold adult face, original black-and-white asymmetrical eyes, structured pale silver-grey side fringe and cable-bound high ponytail, formal black-and-white mechanical institutional tailoring, readable torso and forearm prosthetic interface language, restrained authoritative adult body language, original silhouette, color blocks, pose, and grounded full feet. Render through the current Krea2 six-LoRA production style chain with crisp dense 2D linework, restrained cool industrial shading, precise material edges, a cool white and charcoal palette, limited old-gold accents, and controlled warning-red energy. Plain neutral light background only. No text, logo, watermark, UI, extra person, altered anatomy, childlike proportions, natural-hair substitution, costume redesign, crop, weapon, decorative background, collage, tiles, panels, split screen, repeated body, or duplicated figure.';
const negativePrompt = 'child, loli, young girl, chibi, photorealistic, glossy 3d, doll, text, logo, watermark, ui, extra limbs, extra fingers, missing fingers, cropped feet, cropped hands, altered costume, natural hair, extra character, background scene';
const referencePackage = {
  repository: 'https://github.com/kgilper/krea-reference',
  ref: 'v10',
  commit: '9ac00b2d8896483997ce83b278d2774e5ccab6a1',
  archiveSha256: '0e4da7228bd77e6e4e110c45875dbe6bf4f7d238312e2afe55dc181c0461a155',
  nodePackage: 'comfyui-krea-reference-v10',
  version: '0.2.1',
  license: 'MIT',
};

const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
await mkdir(resolve(root, 'staging/media/krea2-canonical-sample'), { recursive: true });
const sourceUpload = await uploadKrea2Image(source, { comfyUrl });
const workflow = buildKrea2ReferenceConditioningWorkflow(baseline, {
  prompt,
  negativePrompt,
  seed: 2026081301,
  filenamePrefix: 'albina_unarmored_six_lora_v15_reference_conditioning',
  aspectRatio: '2:3 (Portrait Photo)',
  megapixels: 1,
  subjectImage: sourceUpload.filename,
  identityStrength: 0.9,
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Albina reference-conditioning probe expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1,
  purpose: 'albina-single-canonical-reference-conditioning-staging-probe-v15',
  status: 'awaiting-human-visual-review',
  stagingOnly: true,
  batchProductionForbidden: true,
  createdAt: new Date().toISOString(),
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  referenceConditioner: referencePackage,
  references: {
    canonicalSubject: {
      path: source,
      sha256: sha256(await readFile(source)),
      input: sourceUpload.filename,
      uploadedSha256: sourceUpload.sha256,
      role: 'sole-identity-and-authored-design',
    },
    forbidden: ['style reference', 'dual reference', 'generated image reference', 'identity-edit LoRA', 'depth control', 'crop or regional mask'],
  },
  prompt,
  negativePrompt,
  styleLoraChain,
  workflow: {
    sha256: sha256(JSON.stringify(workflow)),
    topologySha256: sha256(JSON.stringify(workflowTopology(workflow))),
    conditioningNodes: ['KGKrea2ImageGuideCardV10', 'KGTextEncodeKreaImageReferencesV10'],
    identityRecipe: 'keep the same subject',
    identityStrength: 0.9,
  },
  execution: { comfyUrl, promptId: queued.promptId, seed: 2026081301 },
  output: saved,
  acceptance: [
    'Open the output at 100 percent beside the canonical source.',
    'Reject any failed mature face, black-white eye, cable hair, tailoring, prosthetic interface, body-language, anatomy, text, logo, watermark, or composition anchor.',
    'Require a hash-bound Gemini paired review as advisory evidence after direct image review.',
    'A passing result is only evidence for a later canonical gate decision. It cannot enable batch character, protagonist, or CG production.',
  ],
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
