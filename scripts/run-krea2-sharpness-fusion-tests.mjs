#!/usr/bin/env node
/** Run bounded, single-image Krea2 fusion tests from the supplied poster prompt. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const seed = Number(process.env.KREA2_TEST_SEED ?? 1787670792);
if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('KREA2_TEST_SEED must be a non-negative safe integer');
const outputDir = resolve(root, 'staging/media/krea2-sharpness-fusion-tests', `seed-${seed}`);
const sourcePath = resolve(root, 'staging/media/krea2-sharpness-fusion-source.prompt.json');
const comfyUrl = process.env.KREA2_TEST_COMFY_URL ?? 'http://127.0.0.1:8199';
const profiles = {
  posterSixLora: [
    ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
    ['Krea2Rella_c1-st8000.safetensors', 0.65],
    ['onineko_k2_v1.safetensors', 0.45],
    ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
    ['masterpieces-v51.safetensors', 0.45],
    ['ichika-k2_c1-st5000.safetensors', 0.35],
  ],
  luminousFilm: [
    ['luminous-anime-film-comfy.safetensors', 0.8],
    ['z3zz4-k2-4_c1-st5000.safetensors', 0.45],
    ['masterpieces-v51.safetensors', 0.45],
  ],
  luminousRellaMeion: [
    ['luminous-anime-film-comfy.safetensors', 0.7],
    ['Krea2Rella_c1-st8000.safetensors', 0.5],
    ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.4],
    ['masterpieces-v51.safetensors', 0.45],
  ],
};
const selectedProfiles = process.env.KREA2_TEST_PROFILE
  ? Object.fromEntries(Object.entries(profiles).filter(([name]) => name === process.env.KREA2_TEST_PROFILE))
  : profiles;
if (Object.keys(selectedProfiles).length === 0) throw new Error('KREA2_TEST_PROFILE did not match a known profile');

const { workflow: source } = await prepareSource();
await mkdir(outputDir, { recursive: true });
const results = [];
for (const [profile, loras] of Object.entries(selectedProfiles)) {
  results.push(await runCase(source, profile, loras));
}
await writeFile(resolve(outputDir, 'fusion-test-summary.json'), `${JSON.stringify({ seed, comfyUrl, results }, null, 2)}\n`);
console.log(JSON.stringify({ outputDir, seed, results }, null, 2));

async function prepareSource() {
  const sourcePathInput = resolve(root, '..', 'Image_1787670792754_398.prompt.json');
  const sourceWorkflow = JSON.parse(await readFile(sourcePathInput, 'utf8'));
  await writeFile(sourcePath, `${JSON.stringify(sourceWorkflow, null, 2)}\n`);
  return { workflow: sourceWorkflow, sourcePath: sourcePathInput };
}

async function runCase(sourceWorkflow, profile, loras) {
  const workflow = buildWorkflow(sourceWorkflow, profile, loras);
  const workflowPath = resolve(outputDir, `${profile}.workflow.json`);
  await writeFile(workflowPath, `${JSON.stringify(workflow, null, 2)}\n`);
  const queued = await postJson('/prompt', { prompt: workflow, client_id: randomUUID(), prompt_id: randomUUID() });
  const history = await waitForHistory(queued.prompt_id);
  const image = findImage(history);
  const imagePath = resolve(outputDir, `${profile}.png`);
  await download(image, imagePath);
  const audit = {
    profile, seed, promptId: queued.prompt_id, workflowPath, workflowSha256: hashFile(workflowPath),
    imagePath, imageSha256: hashFile(imagePath), image, status: history.status?.status_str ?? 'success',
    outputNodes: Object.keys(history.outputs ?? {}),
  };
  await writeFile(resolve(outputDir, `${profile}.audit.json`), `${JSON.stringify(audit, null, 2)}\n`);
  return audit;
}

function buildWorkflow(sourceWorkflow, profile, loras) {
  const workflow = structuredClone(sourceWorkflow);
  const nodes = Object.values(workflow);
  const latent = nodes.find((n) => n.class_type === 'EmptyLatentImage');
  const scheduler = nodes.find((n) => n.class_type === 'BasicScheduler');
  const noise = nodes.find((n) => n.class_type === 'RandomNoise');
  const save = nodes.find((n) => n.class_type === 'SaveImage');
  if (!latent || !scheduler || !noise || !save) throw new Error('source workflow missing core nodes');
  latent.inputs.width = 832;
  latent.inputs.height = 1216;
  latent.inputs.batch_size = 1;
  scheduler.inputs.scheduler = 'beta57';
  scheduler.inputs.steps = 8;
  scheduler.inputs.denoise = 1.0;
  noise.inputs.noise_seed = seed;
  save.inputs.filename_prefix = `krea2-sharpness-fusion/${profile}`;
  const loaders = nodes.filter((n) => n.class_type === 'LoraLoaderModelOnly');
  if (loras.length > loaders.length) throw new Error(`profile ${profile} has too many LoRAs for source graph`);
  const byId = Object.fromEntries(Object.entries(workflow));
  const loaderIds = Object.keys(workflow).filter((id) => workflow[id].class_type === 'LoraLoaderModelOnly');
  const ordered = orderLoaders(workflow, loaderIds);
  const kept = ordered.slice(0, loras.length);
  const removed = new Set(ordered.slice(loras.length));
  const finalModel = kept[kept.length - 1];
  for (const id of removed) delete workflow[id];
  for (const node of Object.values(workflow)) {
    for (const [key, value] of Object.entries(node.inputs ?? {})) {
      if (Array.isArray(value) && removed.has(String(value[0]))) node.inputs[key] = [finalModel, value[1]];
    }
  }
  for (let index = 0; index < kept.length; index += 1) {
    const id = kept[index];
    const node = byId[id];
    const pair = loras[index];
    node.inputs.lora_name = pair[0];
    node.inputs.strength_model = pair[1];
    if (index > 0) node.inputs.model = [kept[index - 1], 0];
  }
  for (const node of nodes) {
    for (const [key, value] of Object.entries(node.inputs ?? {})) {
      if (Array.isArray(value) && value[0] === '148') node.inputs[key] = [finalModel, value[1]];
    }
  }
  const next = nextId(workflow);
  workflow[String(next)] = { class_type: 'UpscaleModelLoader', inputs: { model_name: '4x_fatal_Anime_500000_G.pth' } };
  workflow[String(next + 1)] = { class_type: 'ImageUpscaleWithModel', inputs: { upscale_model: [String(next), 0], image: ['137', 0] } };
  workflow[String(next + 2)] = { class_type: 'ImageScaleBy', inputs: { upscale_method: 'lanczos', scale_by: 0.375, image: [String(next + 1), 0] } };
  workflow[String(next + 3)] = { class_type: 'ColorsCorrectNode', inputs: { image: [String(next + 2), 0], brightness: 1, contrast: 1, saturation: 1, gamma: 1, hue_degrees: 0, use_color: false, hex_color: '#00FF33' } };
  save.inputs.images = [String(next + 3), 0];
  return workflow;
}

function orderLoaders(workflow, ids) {
  const set = new Set(ids);
  const start = ids.find((id) => !set.has(String(workflow[id].inputs?.model?.[0])));
  const ordered = [];
  let current = start;
  while (current) {
    ordered.push(current);
    current = ids.find((id) => workflow[id].inputs?.model?.[0] === current);
  }
  if (ordered.length !== ids.length) throw new Error('LoRA chain is not linear');
  return ordered;
}

function nextId(workflow) { return Math.max(...Object.keys(workflow).map(Number)) + 1; }
async function postJson(path, payload) { const response = await fetch(`${comfyUrl}${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }); const data = await response.json(); if (!response.ok || data.error) throw new Error(JSON.stringify(data)); return data; }
async function waitForHistory(id) { for (let i = 0; i < 1200; i += 1) { const response = await fetch(`${comfyUrl}/history/${encodeURIComponent(id)}`); const data = await response.json(); if (data[id]) { const item = data[id]; if (item.status?.status_str === 'error') throw new Error(JSON.stringify(item.status)); if (findImage(item)) return item; } await new Promise((resolveDelay) => setTimeout(resolveDelay, 1500)); } throw new Error(`timeout waiting for ${id}`); }
function findImage(history) { return Object.values(history.outputs ?? {}).flatMap((output) => output.images ?? [])[0]; }
async function download(image, destination) { const query = new URLSearchParams({ filename: image.filename, subfolder: image.subfolder ?? '', type: image.type ?? 'output' }); const response = await fetch(`${comfyUrl}/view?${query}`); if (!response.ok) throw new Error(`download failed: ${response.status}`); await writeFile(destination, Buffer.from(await response.arrayBuffer())); }
function hashFile(path) { return createHash('sha256').update(readFileSync(path)).digest('hex'); }
