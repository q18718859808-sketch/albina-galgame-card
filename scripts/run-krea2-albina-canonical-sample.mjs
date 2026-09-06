import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildKrea2ImageEditWorkflow,
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
const style = resolve(root, 'staging/research/style-reference/albina-style-board-deidentified-mosaic.png');
const output = resolve(root, 'staging/media/krea2-canonical-sample/albina-unarmored-six-lora-v4-reference-boost-control.png');
const receiptPath = output.replace(/\.png$/u, '.json');
const prompt = 'A single coherent full-body adult woman visual-novel standing portrait. Preserve this canonical subject exactly: adult proportions, face structure, pale silver-grey hair with the original side fringe and cable-bound high ponytail, original black-and-white eyes, prosthetic seams, the complete black-and-white tailored longcoat and dress construction, gloves, stockings, footwear, silhouette, color blocks, pose, and grounded full feet. Render as crisp dense 2D linework with restrained cool industrial shading, precise material edges, cool white and charcoal palette treatment, limited old-gold accents, and controlled warning-red energy. Plain neutral light background only. No text, logo, watermark, UI, extra person, altered anatomy, childlike proportions, natural-hair substitution, costume redesign, crop, weapon, decorative background, collage, tiles, panels, split screen, repeated body, or duplicated figure.';
const negativePrompt = 'child, loli, young girl, chibi, photorealistic, glossy 3d, doll, text, logo, watermark, ui, extra limbs, extra fingers, missing fingers, cropped feet, cropped hands, altered costume, natural hair, extra character, background scene';
const systemPrompt = 'This is the sole identity and design authority. Preserve its adult character design, face, structured hair and cable motif, mechanical details, clothing, pose, and full figure exactly. Produce one cohesive image only.';

const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
await mkdir(resolve(root, 'staging/media/krea2-canonical-sample'), { recursive: true });
const sourceUpload = await uploadKrea2Image(source, { comfyUrl });

const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt, negativePrompt, systemPrompt, seed: 2026081201,
  // The canonical source is approximately 1:3; 2:3 is the closest supported portrait ratio.
  // v4 changes only reference fidelity from the rejected v3 trial.
  filenamePrefix: 'albina_unarmored_six_lora_v4_reference_boost_control', aspectRatio: '2:3 (Portrait Photo)', megapixels: 1,
  subjectImage: sourceUpload.filename, subjectReferenceBoost: 4,
  fitMode: 'fit', groundingPixels: 1024,
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Albina canonical sample expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1,
  purpose: 'albina-single-canonical-sample-six-lora-gate-v4-reference-boost-controlled-retry',
  status: 'awaiting-human-visual-review',
  createdAt: new Date().toISOString(),
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  references: {
    canonicalSubject: { path: source, sha256: sha256(await readFile(source)), input: sourceUpload.filename, uploadedSha256: sourceUpload.sha256, role: 'sole-identity-and-authored-design' },
    rejectedPriorExperiments: [
      { receipt: 'albina-unarmored-six-lora-v1.json', reason: 'Dual-reference style-board mode produced tiled corruption and is prohibited for canonical portrait production.' },
      { receipt: 'albina-unarmored-six-lora-v2-single-reference.json', reason: 'Single-reference v2 used a 9:16 target against an approximately 1:3 source and failed identity preservation.' },
      { receipt: 'albina-unarmored-six-lora-v3-2x3-aspect-control.json', reason: 'Corrected 2:3 composition improved coherence but failed canonical identity preservation; v4 changes only the reference fidelity dial.' },
    ],
  },
  prompt, negativePrompt, systemPrompt,
  styleLoraChain,
  workflow: { sha256: sha256(JSON.stringify(workflow)), topologySha256: sha256(JSON.stringify(workflowTopology(workflow))), dualReferenceGrounding: false },
  execution: { comfyUrl, promptId: queued.promptId, seed: 2026081201, controlledChange: 'subjectReferenceBoost: 3 -> 4; all other v3 generation parameters unchanged' },
  output: saved,
  acceptance: [
    'Read the output at 100 percent beside the canonical source.',
    'Reject childlike proportions, face or eye drift, hair or cable drift, prosthetic or clothing redesign, missing feet or hands, anatomy defects, text, logo, watermark, or style-reference identity transfer.',
    'Do not batch produce any character asset until this single canonical gate is approved.',
  ],
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
