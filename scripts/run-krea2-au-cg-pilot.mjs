import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { validateKrea2ProductionStyleChain } from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const comfyRoot = 'D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI';
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const characterRoot = resolve(projectRoot, 'staging/media/krea2-au-character-anchor');
const root = resolve(projectRoot, 'staging/media/krea2-au-cg');
const anchorPath = resolve(characterRoot, 'albina-au-anchor.png');
const shots = {
  'white-canvas': {
    assetId: 'cg.white_canvas_choice', seed: 2026080927,
    instruction: 'Preserve the exact original AU heroine identity. Create an original 16:9 visual-novel key CG in a quiet white industrial art hall. Albina stands beside an unmarked blank canvas and traces one unfinished charcoal line in the air with an unbranded brush-tool. An empty chair and a second untouched brush imply a player choice without showing another person. Layered grey-white light, restrained charcoal seams and small gold accents, dignified calm tension. No text, logos, watermarks, published character costumes, extra people, extra limbs, or gore.',
  },
  'golden-bough': {
    assetId: 'cg.golden_bough_rebuild', seed: 2026080928,
    instruction: 'Preserve the exact original AU heroine identity. Create an original 16:9 visual-novel key CG in a damaged industrial archive. Albina kneels beside an abstract brass-root light installation and carefully reconnects a detached ivory ceramic panel with a precision artisan tool. A distant empty viewer platform implies a player witness without showing another person. Cold white architecture, charcoal shadow, contained amber energy, readable hands and tool contact. No text, logos, watermarks, published props, extra people, extra limbs, or gore.',
  },
  'ring-gallery': {
    assetId: 'cg.ring_conspiracy_ending', seed: 2026080929,
    instruction: 'Preserve the exact original AU heroine identity. Create an original 16:9 visual-novel key CG in a dark industrial gallery at dawn. Albina places an unmarked empty frame upright on wet stone beside a folded ivory mechanical blade-tool; a second dry footprint path stops one step away to imply an unresolved alliance without depicting another person. Cold white light, charcoal gallery walls, restrained gold reflections and warning-red trace accents. No text, logos, watermarks, published character costumes, extra people, extra limbs, or gore.',
  },
};
const requested = argument('--shots')?.split(',').map((value) => value.trim()).filter(Boolean) ?? Object.keys(shots);
if (requested.length === 0 || requested.some((name) => !shots[name])) throw new Error(`Unsupported --shots. Use: ${Object.keys(shots).join(', ')}.`);

await mkdir(root, { recursive: true });
const anchor = await readFile(anchorPath);
for (const name of requested) await createShot(name, shots[name], anchor);

async function createShot(name, shot, anchor) {
  const inputName = `albina_au_cg_anchor_${name}.png`;
  const outputPath = resolve(root, `albina-au-cg-${name}.png`);
  const receiptPath = resolve(root, `albina-au-cg-${name}.json`);
  const workflow = workflowFor(inputName, shot.instruction, shot.seed, name);
  // Historical single-LoRA pilot retained for audit only. Refuse before copying
  // an input or sending a workflow that bypasses the six-LoRA production baseline.
  validateKrea2ProductionStyleChain(workflow);
  await copyFile(anchorPath, resolve(comfyRoot, 'input', inputName));
  const promptId = randomUUID();
  const response = await fetch(`${comfyUrl}/prompt`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: workflow, client_id: randomUUID(), prompt_id: promptId }) });
  const body = await response.json();
  if (!response.ok || body.prompt_id !== promptId || body.error || Object.keys(body.node_errors ?? {}).length) throw new Error(`ComfyUI rejected AU CG ${name}: ${JSON.stringify(body)}`);
  const image = await waitForImage(promptId);
  const output = await download(image);
  await writeFile(outputPath, output);
  const receipt = {
    schemaVersion: 1, provider: 'comfyui-local-krea2-identity-edit', status: 'awaiting-review',
    purpose: 'original AU key CG candidate; local review only', shot: name, assetId: shot.assetId, createdAt: new Date().toISOString(),
    instruction: shot.instruction, instructionSha256: sha256(shot.instruction),
    reference: { path: anchorPath, sha256: sha256(anchor), sentToModel: true, provenance: 'local-original-au-anchor-candidate' },
    workflow: { sha256: sha256(JSON.stringify(workflow)), identityEditLora: 'krea2_identity_edit_v1_2.safetensors' },
    execution: { promptId, seed: shot.seed, comfyUrl },
    output: { path: outputPath, sha256: sha256(output), bytes: output.length, dimensions: pngDimensions(output) },
    rights: { generatedOutput: 'review-required', publicRelease: 'prohibited-until-originality-and-rights-review' },
  };
  await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(receipt, null, 2));
}

function workflowFor(image, prompt, seed, name) {
  return {
    '1': { class_type: 'UNETLoader', inputs: { unet_name: 'krea2_turbo_fp8_scaled.safetensors', weight_dtype: 'default' } },
    '2': { class_type: 'CLIPLoader', inputs: { clip_name: 'qwen3vl_4b_fp8_scaled.safetensors', type: 'krea2', device: 'default' } },
    '3': { class_type: 'VAELoader', inputs: { vae_name: 'qwen_image_vae.safetensors' } },
    '4': { class_type: 'LoraLoaderModelOnly', inputs: { model: ['1', 0], lora_name: 'krea2_identity_edit_v1_2.safetensors', strength_model: 1 } },
    '5': { class_type: 'LoadImage', inputs: { image } },
    '6': { class_type: 'VAEEncode', inputs: { pixels: ['5', 0], vae: ['3', 0] } },
    '7': { class_type: 'EmptySD3LatentImage', inputs: { width: 1280, height: 720, batch_size: 1 } },
    '8': { class_type: 'Krea2EditModelPatch', inputs: { model: ['4', 0], source_latent: ['6', 0], ref_boost: 3.5, fit_mode: 'fit', vae: ['3', 0], source_image: ['5', 0], target_latent: ['7', 0] } },
    '9': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt, grounding_px: 768, system_prompt: 'Preserve only the original AU heroine identity. Follow the authored scene direction; do not recreate published characters or images.' } },
    '10': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt: '', grounding_px: 768, system_prompt: '' } },
    '11': { class_type: 'KSampler', inputs: { model: ['8', 0], positive: ['9', 0], negative: ['10', 0], latent_image: ['7', 0], seed, steps: 10, cfg: 1, sampler_name: 'euler', scheduler: 'simple', denoise: 1 } },
    '12': { class_type: 'VAEDecode', inputs: { samples: ['11', 0], vae: ['3', 0] } },
    '13': { class_type: 'SaveImage', inputs: { images: ['12', 0], filename_prefix: `albina_au_cg_${name}` } },
  };
}

async function waitForImage(promptId) {
  const deadline = Date.now() + 15 * 60_000;
  while (Date.now() < deadline) {
    const history = await (await fetch(`${comfyUrl}/history/${promptId}`)).json();
    const item = history[promptId];
    if (item?.status?.status_str === 'error') throw new Error(`ComfyUI AU CG failed: ${JSON.stringify(item.status)}`);
    const images = Object.values(item?.outputs ?? {}).flatMap((output) => output.images ?? []);
    if (images.length === 1) return images[0];
    await new Promise((resolve_) => setTimeout(resolve_, 1_500));
  }
  throw new Error(`ComfyUI AU CG timed out: ${promptId}`);
}

async function download(image) {
  const query = new URLSearchParams({ filename: image.filename, subfolder: image.subfolder ?? '', type: image.type ?? 'output' });
  const response = await fetch(`${comfyUrl}/view?${query}`);
  if (!response.ok) throw new Error(`ComfyUI output download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

function pngDimensions(bytes) { if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Expected PNG output'); return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), type: 'png' }; }
function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
function argument(name) { const index = process.argv.indexOf(name); return index < 0 ? undefined : process.argv[index + 1]; }
