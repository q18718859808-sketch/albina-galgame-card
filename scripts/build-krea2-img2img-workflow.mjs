import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildKrea2ImageEditWorkflow, workflowTopology, sha256 } from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const contractPath = resolve(projectRoot, 'content/media-production/krea2-img2img-baseline-v1.json');
const outputPath = resolve(projectRoot, 'staging/media/krea2-img2img-baseline-v1.json');
const contract = JSON.parse(await readFile(contractPath, 'utf8'));

const baselinePath = resolve(projectRoot, contract.baseWorkflow);
const evidencePath = resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json');
const [baseline, evidence] = await Promise.all([
  JSON.parse(await readFile(baselinePath, 'utf8')),
  JSON.parse(await readFile(evidencePath, 'utf8')),
]);
const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt: 'Canonical subject restoration. Preserve identity, clothing, silhouette, anatomy and authored design exactly.',
  negativePrompt: 'text, logo, watermark, redesign, age change, extra limbs, cropped feet',
  systemPrompt: 'The subject image is the sole identity authority. Preserve its canonical design exactly; style input is style-only.',
  seed: 2026081101,
  filenamePrefix: 'albina_krea2_img2img_baseline',
  aspectRatio: '9:16 (Portrait Widescreen)',
  megapixels: 2,
  subjectImage: 'SUBJECT_REFERENCE_REQUIRED.png',
  styleImage: 'STYLE_REFERENCE_OPTIONAL.png',
});
workflow.schemaVersion = 2;
workflow.provider = 'comfyui-local-krea2';
workflow.status = evidence.verified === true ? 'generated-from-verified-six-lora-baseline' : 'blocked-pending-corrected-baseline-proof';
workflow.baseWorkflow = baselinePath;
workflow.baselineWorkflowSha256 = sha256(await readFile(baselinePath));
workflow.baselineEvidencePath = evidencePath;
workflow.baselineEvidenceVerified = evidence.verified === true;
workflow.loraChain = contract.styleLoras;
workflow.references = contract.referenceInputs;
workflow.optionalTextLoras = contract.optionalTextLoras;
workflow.topologySha256 = sha256(JSON.stringify(workflowTopology(workflow)));
workflow.invariants = [
  'The six verified production style LoRAs remain enabled and ordered as recorded.',
  'Subject reference controls identity and authored design facts.',
  'Style reference cannot transfer identity, age, clothing, pose, props, text or logos.',
  'Missing control weights block execution rather than silently dropping a control input.',
  'Every output is staging-only until the image is actually read and reviewed.'
];

await writeFile(outputPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ outputPath, loras: workflow.loraChain.length, status: workflow.status, baselineEvidenceVerified: workflow.baselineEvidenceVerified }, null, 2));
