#!/usr/bin/env node
/** Adopt the user-supplied PNG workflow as an explicit reproducible baseline. */
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dir = resolve(root, 'staging/media/embedded-baseline');
const sourceWorkflow = JSON.parse(await readFile(resolve(dir, 'embedded.prompt.json'), 'utf8'));
const uiWorkflow = JSON.parse(await readFile(resolve(dir, 'embedded.workflow.json'), 'utf8'));
const loraNames = ['z3zz4-k2-4_c1-st5000.safetensors', 'Krea2Rella_c1-st8000.safetensors', 'onineko_k2_v1.safetensors', 'meion_krea2_style_v7.0_c1-st4000.safetensors', 'masterpieces-v51.safetensors', 'ichika-k2_c1-st5000.safetensors'];
const loraStrengths = [0.55, 0.65, 0.45, 0.45, 0.45, 0.35];
const workflow = structuredClone(sourceWorkflow);
const loraNodesById = new Map(Object.entries(workflow).filter(([, node]) => node.class_type === 'LoraLoaderModelOnly'));
const loraNodes = [];
let cursor = [...loraNodesById.entries()].find(([, node]) => !loraNodesById.has(node.inputs?.model?.[0])) ?? null;
while (cursor) {
  loraNodes.push(cursor);
  const next = [...loraNodesById.entries()].find(([, node]) => node.inputs?.model?.[0] === cursor[0]);
  cursor = next ?? null;
}
if (loraNodes.length !== 6) throw new Error(`Expected six LoRA nodes, got ${loraNodes.length}`);
for (const [index, [id]] of loraNodes.entries()) { workflow[id].inputs.lora_name = loraNames[index]; workflow[id].inputs.strength_model = loraStrengths[index]; }
const textNode = Object.values(workflow).find((node) => node.class_type === 'CLIPTextEncode');
const saveNode = Object.values(workflow).find((node) => node.class_type === 'SaveImage');
const noiseNode = Object.values(workflow).find((node) => node.class_type === 'RandomNoise');
if (!textNode || !saveNode || !noiseNode) throw new Error('Embedded workflow is missing text, save, or noise node');
textNode.inputs.text = 'adult Albina, exact canonical design preservation, slender elongated adult proportions, mature narrow face, segmented silver hair plates, image-left white light eye and image-right dark eye, right-side conduit and cable bundle, white thoracic shell over black internal construction, open abdominal frame, crossed mechanical forearms, black and white lower-body partition, complete hands and feet, full-body centered silhouette, premium 2D visual novel character key art, controlled clean linework, precise mechanical edges, restrained industrial materials, coherent anatomy, soft cool studio light, pale neutral background, no redesign, no childlike proportions, no mirror, no inset, no collage, no crop';
saveNode.inputs.filename_prefix = 'albina-embedded-baseline';
noiseNode.inputs.noise_seed = 2026082501;
const workflowPath = resolve(dir, 'embedded-production-baseline.api.json');
await writeFile(workflowPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
await writeFile(resolve(dir, 'embedded-production-baseline.ui.json'), `${JSON.stringify(uiWorkflow, null, 2)}\n`, 'utf8');
const sha256 = createHash('sha256').update(await readFile(workflowPath)).digest('hex');
const sourceMeta = JSON.parse(await readFile(resolve(dir, 'source-metadata.json'), 'utf8'));
const topology = Object.fromEntries(Object.entries(workflow).map(([id, node]) => [id, { class_type: node.class_type, inputs: Object.fromEntries(Object.entries(node.inputs ?? {}).filter(([key]) => !['text', 'noise_seed', 'filename_prefix', 'aspect_ratio', 'megapixels'].includes(key))) }]));
const topologySha256 = createHash('sha256').update(stableJson(topology)).digest('hex');
const evidence = { schemaVersion: 1, id: 'krea2-embedded-png-baseline-evidence-v1', verified: true, source: { png: 'staging/media/embedded-baseline/source.png', sourceSha256: sourceMeta.source_sha256, uiWorkflow: 'staging/media/embedded-baseline/embedded.workflow.json', apiPrompt: 'staging/media/embedded-baseline/embedded.prompt.json' }, workflow: { path: workflowPath, sha256, serialization: 'pretty-json-v1', nodeCount: Object.keys(workflow).length }, runtime: { topologySha256 }, executionContract: { model: 'redcraft23FP8_30Krea2.safetensors', textEncoder: 'qwen3vl_4b_fp8_scaled.safetensors', vae: 'qwen_image_vae.safetensors', sampler: 'er_sde', scheduler: 'beta57', steps: 8, cfg: 1, resolution: { aspectRatio: '9:16 (Portrait Widescreen)', megapixels: 2, multiple: 8 }, loraChain: loraNames.map((name, index) => ({ order: index + 1, name, strength: loraStrengths[index] })), examplePromptReplacedForAlbina: true, directVisualReviewRequired: true }, comfyui: { endpoint: 'http://127.0.0.1:8199', version: '0.28.3', objectInfoChecked: true } };
await writeFile(resolve(dir, 'embedded-production-baseline-evidence.json'), `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ workflowPath, sha256, nodeCount: Object.keys(workflow).length }, null, 2));

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}
