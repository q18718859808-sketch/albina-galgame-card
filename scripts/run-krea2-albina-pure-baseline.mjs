import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildKrea2Workflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  validateKrea2ProductionStyleChain,
  waitForKrea2Output,
  workflowTopology,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const contractPath = resolve(root, 'content/media-production/albina-canonical-design-contract-v1.json');
const canonicalPath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const outputRoot = resolve(root, 'staging/media/krea2-pure-baseline/albina-canonical');
const variant = argument('--variant') ?? 'v1';
if (!/^v[0-9]+$/u.test(variant)) throw new Error('Variant must match v<number>');
const seed = Number(argument('--seed') ?? 2026081427);
if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('Seed must be a non-negative safe integer');
const contract = JSON.parse((await readFile(contractPath, 'utf8')).replace(/^\uFEFF/u, ''));
const anchorText = contract.designAnchors.map(({ requirement }) => requirement).join(' ');
const prompt = `Original full-body visual-novel character illustration on a plain neutral background. One adult woman named Albina, extremely slender and vertically elongated, restrained authoritative standing pose. ${anchorText} Preserve image-coordinate design facts: the eye on image-left is a white-light mechanical eye structure; the eye on image-right is a black-dark mechanical eye structure; a thick conduit bundle extends toward image-right and folds back. Show the entire body and feet. Precise coherent anatomy, mechanically plausible torso depth, clear crossed-arm layer order, correct hands and joints. Dense polished Krea2 production linework, controlled flat color and restrained material shading. No text, logo, watermark or UI.`;
const negativePrompt = 'child, loli, young girl, chibi, round face, oversized eyes, generic anime beauty, normal heterochromia, mirrored eye assignment, fluffy natural ponytail, ordinary clothing, dress, skirt, coat, closed abdomen, organic arms, fused arms, extra limbs, bad hands, broken joints, impossible torso depth, cropped feet, small centered figure, inset, collage, text, logo, watermark, UI';

await mkdir(outputRoot, { recursive: true });
const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
const workflow = buildKrea2Workflow(baseline, {
  prompt: `${prompt}\nAvoid: ${negativePrompt}`,
  seed,
  filenamePrefix: `albina_pure_krea2_baseline_${variant}`,
  aspectRatio: '9:16 (Portrait Widescreen)',
  megapixels: 2,
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const forbidden = ['KGKrea2ImageGuideCardV10', 'KGTextEncodeKreaImageReferencesV10', 'Krea2EditModelPatch', 'Krea2ControlLoRALoader', 'Krea2ControlApply', 'ImageCompositeMasked'];
const present = new Set(Object.values(workflow).map((node) => node.class_type));
for (const node of forbidden) if (present.has(node)) throw new Error(`Pure Krea2 baseline forbids ${node}`);
if (Object.keys(workflow).length !== 20) throw new Error(`Pure Krea2 baseline must retain exactly 20 nodes, received ${Object.keys(workflow).length}`);
const queued = await enqueueKrea2Job(workflow);
const result = await waitForKrea2Output(queued.promptId);
if (result.images.length !== 1) throw new Error(`Pure baseline Albina run expected one image, received ${result.images.length}`);
const outputPath = resolve(outputRoot, `albina-pure-baseline-${variant}.png`);
const output = await downloadKrea2Image(result.images[0], outputPath);
const receipt = {
  schemaVersion: 1,
  purpose: 'albina-character-pure-verified-krea2-baseline',
  status: 'awaiting-canonical-paired-and-direct-review',
  promotionAllowed: false,
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256, invocationTopologySha256: sha256(JSON.stringify(workflowTopology(workflow))), nodeCount: Object.keys(workflow).length, styleLoraChain },
  constraints: { imageInputs: 0, referenceNodes: 0, editNodes: 0, controlNodes: 0, identityEdit: false, postGenerationComposite: false },
  canonicalReviewAuthority: { path: canonicalPath, sha256: sha256(await readFile(canonicalPath)), injectedIntoWorkflow: false },
  designContract: { path: contractPath, sha256: sha256(await readFile(contractPath)) },
  prompt, negativePrompt, execution: { promptId: queued.promptId, seed, aspectRatio: '9:16', megapixels: 2 }, output,
};
const receiptPath = resolve(outputRoot, `albina-pure-baseline-${variant}.json`);
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function argument(name) {
  const index = process.argv.indexOf(name);
  const value = index < 0 ? undefined : process.argv[index + 1];
  return value?.startsWith('--') ? undefined : value;
}
