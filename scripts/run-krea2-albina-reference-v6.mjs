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
const source = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const contractPath = resolve(root, 'content/media-production/albina-canonical-design-contract-v1.json');
const controlsPath = resolve(root, 'staging/media/krea2-v6-controls/albina/controls.receipt.json');
const outputRoot = resolve(root, 'staging/media/krea2-reference-v6');
const variant = argument('--variant') ?? 'v6';
if (!/^v[0-9]+$/u.test(variant)) throw new Error('Reference variant must match v<number>');
const targetWidth = Number(argument('--width') ?? 512);
const targetHeight = Number(argument('--height') ?? 1536);
const seed = Number(argument('--seed') ?? 2026081426);
const depthStrength = Number(argument('--depth-strength') ?? 0.35);
if (!Number.isFinite(depthStrength) || depthStrength < 0 || depthStrength > 1) throw new Error('Depth strength must be between 0 and 1');
const outputPath = resolve(outputRoot, `albina-unarmored-reference-v10-${variant}.png`);
const receiptPath = resolve(outputRoot, `albina-unarmored-reference-v10-${variant}.json`);
const contract = JSON.parse((await readFile(contractPath, 'utf8')).replace(/^\uFEFF/u, ''));
const controls = JSON.parse((await readFile(controlsPath, 'utf8')).replace(/^\uFEFF/u, ''));

const prompt = `Faithful full-canvas Krea2 production redraw of the supplied unmirrored canonical adult Albina. Copy the same subject, full-image shape, pose, component topology and image-side assignments. Image-left eye is the white-light structure; image-right eye is the black-dark structure. Preserve the extremely slender adult proportions, rigid segmented silver-grey hair, image-right folded cable bundle, white thoracic shells with black inner construction, open abdominal frame, crossed mechanical forearms and hands, long black lower body and exact white panel divisions. Keep the complete figure and feet at dominant full-canvas occupancy. The six locked Krea2 LoRAs may change only line finish, material rendering, controlled flat color and restrained shading. No redesign, no mirroring and no inset or collage.`;
const negativePrompt = 'child, loli, youthful round face, generic anime beauty face, ordinary heterochromia, swapped eye sides, fluffy natural ponytail, dress, skirt, coat, closed abdomen, organic arms, changed arm pose, cropped feet, small centered figure, inset, collage, pasted patch, seam, text, logo, watermark, UI';

await mkdir(outputRoot, { recursive: true });
const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
const uploaded = await uploadKrea2Image(source);
const workflow = buildKrea2ReferenceConditioningWorkflow(baseline, {
  prompt,
  negativePrompt,
  seed,
  filenamePrefix: `albina_reference_v10_full_canvas_${variant}`,
  aspectRatio: '9:16 (Portrait Widescreen)',
  megapixels: 1,
  targetSize: { width: targetWidth, height: targetHeight },
  subjectImage: uploaded.filename,
  identityStrength: 0.9,
  promptStrength: 0.7,
  krea2Control: depthStrength === 0 ? null : { kind: 'depth', strength: depthStrength },
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
if (Object.values(workflow).some((node) => node.class_type === 'ImageCompositeMasked')) throw new Error('v6 forbids post-generation image compositing');
const queued = await enqueueKrea2Job(workflow);
const result = await waitForKrea2Output(queued.promptId);
if (result.images.length !== 1) throw new Error(`Albina reference v6 expected one image, received ${result.images.length}`);
const output = await downloadKrea2Image(result.images[0], outputPath);
const receipt = {
  schemaVersion: 1,
  purpose: `albina-canonical-krea-reference-v10-${variant}`,
  status: 'awaiting-direct-original-resolution-review',
  promotionAllowed: false,
  source: { path: source, sha256: sha256(await readFile(source)), role: 'sole identity and design authority' },
  designContract: { path: contractPath, sha256: sha256(await readFile(contractPath)), anchors: contract.designAnchors.map(({ id }) => id) },
  structureControls: {
    path: controlsPath,
    sha256: sha256(await readFile(controlsPath)),
    usedAsIdentitySource: false,
    depthDerivedFromCanonicalAtRuntime: depthStrength > 0,
    topologyOverlayUsedAsAuditOnly: true,
    note: depthStrength > 0
      ? 'The complete canonical is the sole reference image. Depth is derived from that same canonical at runtime after the six style LoRAs; topology overlay remains audit-only because no matching Krea2 line/canny Control LoRA is installed.'
      : 'The complete canonical is the sole reference image. No structural control is attached in this variant; topology overlay remains audit-only because no matching Krea2 line/canny Control LoRA is installed.',
  },
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256, styleLoraChain },
  workflow: { sha256: sha256(JSON.stringify(workflow)), topologySha256: sha256(JSON.stringify(workflowTopology(workflow))), targetSize: { width: targetWidth, height: targetHeight }, referenceNode: 'KGKrea2ImageGuideCardV10', identityStrength: 0.9, depthStrength, controlPlacement: depthStrength === 0 ? 'disabled' : 'after-six-style-loras', postGenerationComposite: false },
  prompt, negativePrompt,
  execution: { promptId: queued.promptId, seed },
  output,
  review: { gcli: 'pending-runtime-key', directOriginalResolution: 'required-final-veto' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function argument(name) {
  const inline = process.argv.find((value) => value.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  const value = index < 0 ? undefined : process.argv[index + 1];
  return value?.startsWith('--') ? undefined : value;
}
