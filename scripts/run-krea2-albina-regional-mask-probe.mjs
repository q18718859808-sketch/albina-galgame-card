import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildKrea2ImageEditWorkflow, downloadKrea2Image, enqueueKrea2Job, loadVerifiedKrea2Baseline,
  sha256, uploadKrea2Image, validateKrea2ProductionStyleChain, waitForKrea2Output, workflowTopology,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const source = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const output = resolve(root, 'staging/media/krea2-canonical-sample/albina-upper-body-regional-mask-six-lora-v3-refboost-12.png');
const receiptPath = output.replace(/\.png$/u, '.json');
// 588x882 is exactly 2:3, matching the target selector and avoiding Krea2 fit drift.
const subjectCrop = { width: 588, height: 882, x: 0, y: 70 };
const subjectReferenceRegions = [
  { label: 'face-eyes', x: 110, y: 90, width: 370, height: 270 },
  { label: 'fringe-cable-root', x: 60, y: 0, width: 470, height: 250 },
  { label: 'chest-tailoring', x: 105, y: 350, width: 380, height: 320 },
  { label: 'mechanical-forearm', x: 350, y: 500, width: 200, height: 330 },
];
const prompt = 'One coherent adult woman upper-body visual-novel portrait. Preserve the supplied canonical subject exactly: mature cold narrow face, clearly black-and-white asymmetrical eyes, structured pale silver-grey fringe, cable-bound high ponytail with visible conduit geometry, black-and-white formal institutional tailoring with hard chest panels, and readable mechanical or prosthetic construction at the torso and forearm. Keep the original restrained authoritative expression and adult proportions. Re-render only in a dense polished Krea2 2D visual-novel treatment. Neutral background. No redesign, youthful face, natural fluffy hair, ordinary same-color anime eyes, generic dress, generic coat, text, logo, watermark, UI, extra person, extra limbs, weapon, or collage.';
const negativePrompt = 'child, loli, young girl, chibi, round baby face, idol, smile, same-color eyes, natural hair, fantasy dress, casual coat, text, logo, watermark, ui, extra person, extra limbs, collage, tiled image';
const systemPrompt = 'The source image is canonical. The regional reference mask deliberately boosts only face and eyes, cable-root hair, chest tailoring, and mechanical forearm areas. Preserve every authored identity fact in those regions and do not replace them with generic anime features.';

const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
await mkdir(resolve(root, 'staging/media/krea2-canonical-sample'), { recursive: true });
const sourceUpload = await uploadKrea2Image(source, { comfyUrl });
const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt, negativePrompt, systemPrompt, seed: 2026081209,
  filenamePrefix: 'albina_upper_body_regional_mask_six_lora_v3_refboost_12', aspectRatio: '2:3 (Portrait Photo)', megapixels: 1,
  subjectImage: sourceUpload.filename, subjectCrop, subjectReferenceMask: 'regions', subjectReferenceRegions, subjectReferenceBoost: 12,
  fitMode: 'fit', groundingPixels: 1024,
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Albina regional mask probe expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1, purpose: 'albina-upper-body-regional-identity-mask-probe-six-lora', status: 'awaiting-human-visual-review', createdAt: new Date().toISOString(),
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  references: { canonicalSource: { path: source, sha256: sha256(await readFile(source)), input: sourceUpload.filename, uploadedSha256: sourceUpload.sha256, role: 'sole canonical identity and authored design authority', crop: subjectCrop, regions: subjectReferenceRegions } },
  prompt, negativePrompt, systemPrompt, styleLoraChain,
  workflow: { sha256: sha256(JSON.stringify(workflow)), topologySha256: sha256(JSON.stringify(workflowTopology(workflow))), dualReferenceGrounding: false, refBoostMask: 'SolidMask + MaskComposite union of named identity regions' },
  execution: { comfyUrl, promptId: queued.promptId, seed: 2026081209, experiment: 'purpose-built regional identity mask with exact 2:3 source/target geometry; controlled change: ref_boost 4 -> 12; not a production asset' }, output: saved,
  acceptance: ['Read beside the original canonical at 100 percent.', 'Pass only if mature face, black-white asymmetric eyes, cable hair, structured black-white tailoring, and mechanical language are all immediately legible.', 'This staging probe never promotes an asset.'],
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
