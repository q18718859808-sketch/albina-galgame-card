#!/usr/bin/env node
/** Compare the supplied poster graph with a post-VAEDecode clarity pass. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, '..', 'Image_1787670792754_398.prompt.json');
const outputRoot = resolve(root, 'staging/media/krea2-poster-preserve-tests');
const comfyUrl = process.env.KREA2_TEST_COMFY_URL ?? 'http://127.0.0.1:8199';
const seed = Number(process.env.KREA2_TEST_SEED ?? 1787670795);
if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('KREA2_TEST_SEED must be a non-negative safe integer');
const mode = process.env.KREA2_TEST_MODE ?? 'both';
if (!['direct', 'enhanced', 'both'].includes(mode)) throw new Error('KREA2_TEST_MODE must be direct, enhanced, or both');

await mkdir(outputRoot, { recursive: true });
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const results = [];
if (mode === 'direct' || mode === 'both') results.push(await runCase('direct', source));
if (mode === 'enhanced' || mode === 'both') results.push(await runCase('enhanced', source));
await writeFile(resolve(outputRoot, `summary-${seed}.json`), `${JSON.stringify({ seed, mode, results }, null, 2)}\n`);
console.log(JSON.stringify({ seed, mode, results }, null, 2));

async function runCase(kind, sourceWorkflow) {
  const workflow = structuredClone(sourceWorkflow);
  normalizeModelNames(workflow);
  const save = find(workflow, 'SaveImage');
  const noise = find(workflow, 'RandomNoise');
  if (!save || !noise) throw new Error('poster workflow missing SaveImage or RandomNoise');
  noise.inputs.noise_seed = seed;
  save.inputs.filename_prefix = `krea2-poster-preserve/${kind}-${seed}`;
  if (kind === 'enhanced') addClarityChain(workflow, save);
  const workflowPath = resolve(outputRoot, `${kind}-${seed}.workflow.json`);
  await writeFile(workflowPath, `${JSON.stringify(workflow, null, 2)}\n`);
  const queued = await post('/prompt', { prompt: workflow, client_id: randomUUID(), prompt_id: randomUUID() });
  const history = await wait(queued.prompt_id);
  const image = findImage(history);
  const imagePath = resolve(outputRoot, `${kind}-${seed}.png`);
  await download(image, imagePath);
  const result = { kind, seed, promptId: queued.prompt_id, workflowPath, workflowSha256: hash(workflowPath), imagePath, imageSha256: hash(imagePath), image, status: history.status?.status_str, outputNodes: Object.keys(history.outputs ?? {}) };
  await writeFile(resolve(outputRoot, `${kind}-${seed}.audit.json`), `${JSON.stringify(result, null, 2)}\n`);
  return result;
}

function normalizeModelNames(workflow) {
  const loraNames = new Set([
    'z3zz4-k2-4_c1-st5000.safetensors',
    'Krea2Rella_c1-st8000.safetensors',
    'onineko_k2_v1.safetensors',
    'meion_krea2_style_v7.0_c1-st4000.safetensors',
    'masterpieces-v51.safetensors',
    'ichika-k2_c1-st5000.safetensors',
  ]);
  for (const node of Object.values(workflow)) {
    if (node.class_type !== 'LoraLoaderModelOnly') continue;
    const raw = String(node.inputs?.lora_name ?? '').trim();
    const normalized = raw.replace(/^（krea2?）/u, '').replace(/\s+\.safetensors$/u, '.safetensors').trim();
    if (!loraNames.has(normalized)) throw new Error(`unknown poster LoRA: ${raw}`);
    node.inputs.lora_name = normalized;
  }
}

function addClarityChain(workflow, save) {
  const decoded = findId(workflow, 'VAEDecode');
  const next = Math.max(...Object.keys(workflow).map(Number)) + 1;
  workflow[String(next)] = { class_type: 'UpscaleModelLoader', inputs: { model_name: '4x_fatal_Anime_500000_G.pth' } };
  workflow[String(next + 1)] = { class_type: 'ImageUpscaleWithModel', inputs: { upscale_model: [String(next), 0], image: [decoded, 0] } };
  workflow[String(next + 2)] = { class_type: 'ImageScaleBy', inputs: { upscale_method: 'lanczos', scale_by: 0.375, image: [String(next + 1), 0] } };
  workflow[String(next + 3)] = { class_type: 'ColorsCorrectNode', inputs: { image: [String(next + 2), 0], brightness: 1, contrast: 1, saturation: 1, gamma: 1, hue_degrees: 0, use_color: false, hex_color: '#00FF33' } };
  save.inputs.images = [String(next + 3), 0];
}

function find(workflow, type) { return Object.values(workflow).find((node) => node.class_type === type); }
function findId(workflow, type) { const item = Object.entries(workflow).find(([, node]) => node.class_type === type); if (!item) throw new Error(`missing ${type}`); return item[0]; }
async function post(path, payload) { const r = await fetch(`${comfyUrl}${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }); const data = await r.json(); if (!r.ok || data.error) throw new Error(JSON.stringify(data)); return data; }
async function wait(id) { for (let i = 0; i < 1800; i += 1) { const data = await (await fetch(`${comfyUrl}/history/${encodeURIComponent(id)}`)).json(); if (data[id]) { const item = data[id]; if (item.status?.status_str === 'error') throw new Error(JSON.stringify(item.status)); if (findImage(item)) return item; } await new Promise((r) => setTimeout(r, 1500)); } throw new Error(`timeout: ${id}`); }
function findImage(history) { return Object.values(history.outputs ?? {}).flatMap((output) => output.images ?? [])[0]; }
async function download(image, path) { const q = new URLSearchParams({ filename: image.filename, subfolder: image.subfolder ?? '', type: image.type ?? 'output' }); const r = await fetch(`${comfyUrl}/view?${q}`); if (!r.ok) throw new Error(`download failed: ${r.status}`); await writeFile(path, Buffer.from(await r.arrayBuffer())); }
function hash(path) { return createHash('sha256').update(readFileSync(path)).digest('hex'); }
