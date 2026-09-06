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
const source = resolve(root, 'staging/research/canon-visual/anchor-probes/albina-face-eye-anchor.png');
const output = resolve(root, 'staging/media/krea2-canonical-sample/albina-face-eye-anchor-six-lora-v1.png');
const receiptPath = output.replace(/\.png$/u, '.json');
const prompt = 'One coherent adult woman upper-body visual-novel portrait, facing the viewer. This is an identity-anchor preservation test. Preserve the supplied canonical face exactly: mature cold face structure, narrow black-and-white asymmetrical eyes, pale silver-grey fringe, cable-bound high ponytail structure, black-and-white formal tailoring, and visible prosthetic or mechanical construction language. Keep the original authoritative, restrained expression and adult proportions. Re-render only in a polished, dense Krea2 2D visual-novel illustration treatment. Neutral light background. No redesign, no beauty retouch, no youthful face, no natural-hair substitution, no ordinary anime eyes, no text, logo, watermark, UI, extra person, extra limbs, weapon, crop through the face, or collage.';
const negativePrompt = 'child, loli, young girl, chibi, smiling idol, round baby face, normal anime eyes, natural hair, fantasy dress, text, logo, watermark, ui, extra person, extra limbs, collage, tiled image';
const systemPrompt = 'The supplied crop is the sole identity authority. Give priority to its adult face, black-and-white eyes, structured silver fringe, cable-bound hair construction, and formal mechanical tailoring. Preserve these authored facts exactly.';

const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
await mkdir(resolve(root, 'staging/media/krea2-canonical-sample'), { recursive: true });
const sourceUpload = await uploadKrea2Image(source, { comfyUrl });
const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt, negativePrompt, systemPrompt, seed: 2026081202,
  filenamePrefix: 'albina_face_eye_anchor_six_lora_v1', aspectRatio: '3:4 (Portrait Standard)', megapixels: 1,
  subjectImage: sourceUpload.filename, subjectReferenceBoost: 4, fitMode: 'fit', groundingPixels: 1024,
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error('Albina face anchor expected one image, received ' + result.images.length);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1, purpose: 'albina-face-and-eyes-identity-anchor-probe-six-lora', status: 'awaiting-human-visual-review', createdAt: new Date().toISOString(),
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  references: { canonicalAnchorCrop: { path: source, sha256: sha256(await readFile(source)), input: sourceUpload.filename, uploadedSha256: sourceUpload.sha256, role: 'face-eye-hair-tailoring identity anchor only' } },
  prompt, negativePrompt, systemPrompt, styleLoraChain,
  workflow: { sha256: sha256(JSON.stringify(workflow)), topologySha256: sha256(JSON.stringify(workflowTopology(workflow))), dualReferenceGrounding: false },
  execution: { comfyUrl, promptId: queued.promptId, seed: 2026081202, experiment: 'identity-anchor probe; not a production asset' }, output: saved,
  acceptance: ['Read beside the anchor crop at 100 percent.', 'Pass only if mature face, black-and-white eyes, silver fringe, cable hair construction, black-and-white tailoring, and mechanical design language are recognizably preserved.', 'This probe cannot promote any asset and only authorizes the next anchor probe when visually approved.'],
};
await writeFile(receiptPath, JSON.stringify(receipt, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(receipt, null, 2));
