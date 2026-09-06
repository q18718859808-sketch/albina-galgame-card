import { createHash, randomUUID } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const comfyRoot = 'D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI';
const source = resolve(projectRoot, 'staging/media/krea2-v1/delivery/visual.image.bg.lce_lab.jpg');
const inputName = 'albina_identity_edit_pilot_lce_lab.jpg';
const receiptPath = resolve(projectRoot, 'staging/media/krea2-identity-edit/pilot-lce-lab.json');
const outputPath = resolve(projectRoot, 'staging/media/krea2-identity-edit/pilot-lce-lab.png');
const prompt = 'Preserve the unoccupied industrial laboratory exactly. Make the cold white overhead light slightly more dramatic, add restrained warning-red practical light accents, maintain clean visual-novel background composition. Do not add people, silhouettes, readable text, logos, watermarks, or interface elements.';
const recoveryPromptId = argument('--recover');

await mkdir(resolve(projectRoot, 'staging/media/krea2-identity-edit'), { recursive: true });
await copyFile(source, resolve(comfyRoot, 'input', inputName));
const sourceBytes = await readFile(source);
const workflow = makeWorkflow(inputName, prompt);
const promptId = recoveryPromptId ?? randomUUID();
if (!recoveryPromptId) await enqueue(workflow, promptId);
const image = await waitForImage(promptId);
const bytes = await download(image);
await writeFile(outputPath, bytes);
const dimensions = await imageDimensions(bytes);
const receipt = {
  schemaVersion: 1,
  provider: 'comfyui-local-krea2-identity-edit',
  status: 'awaiting-review',
  purpose: 'non-public single-reference workflow pilot; no character or third-party reference input',
  createdAt: new Date().toISOString(),
  source: { path: source, sha256: sha256(sourceBytes), sentToModel: true, rights: 'local-krea2-candidate-review-required' },
  prompt, promptSha256: sha256(prompt),
  workflow: { sha256: sha256(JSON.stringify(workflow)), identityEditLora: 'krea2_identity_edit_v1_2.safetensors' },
  execution: { comfyUrl, promptId, seed: workflow['10'].inputs.seed, recovered: Boolean(recoveryPromptId) },
  output: { path: outputPath, sha256: sha256(bytes), bytes: bytes.length, dimensions },
  rights: { generatedOutput: 'review-required', publicRelease: 'prohibited-until-rights-and-visual-review' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function makeWorkflow(imageName, instruction) {
  return {
    '1': { class_type: 'UNETLoader', inputs: { unet_name: 'krea2_turbo_fp8_scaled.safetensors', weight_dtype: 'default' } },
    '2': { class_type: 'CLIPLoader', inputs: { clip_name: 'qwen3vl_4b_fp8_scaled.safetensors', type: 'krea2', device: 'default' } },
    '3': { class_type: 'VAELoader', inputs: { vae_name: 'qwen_image_vae.safetensors' } },
    '4': { class_type: 'LoraLoaderModelOnly', inputs: { model: ['1', 0], lora_name: 'krea2_identity_edit_v1_2.safetensors', strength_model: 1 } },
    '5': { class_type: 'LoadImage', inputs: { image: imageName } },
    '6': { class_type: 'VAEEncode', inputs: { pixels: ['5', 0], vae: ['3', 0] } },
    '7': { class_type: 'EmptySD3LatentImage', inputs: { width: 1280, height: 720, batch_size: 1 } },
    '8': { class_type: 'Krea2EditModelPatch', inputs: { model: ['4', 0], source_latent: ['6', 0], ref_boost: 1.25, fit_mode: 'fit', vae: ['3', 0], source_image: ['5', 0], target_latent: ['7', 0] } },
    '9': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt: instruction, grounding_px: 768, system_prompt: '' } },
    '11': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt: '', grounding_px: 768, system_prompt: '' } },
    '10': { class_type: 'KSampler', inputs: { model: ['8', 0], positive: ['9', 0], negative: ['11', 0], latent_image: ['7', 0], seed: 2026080912, steps: 10, cfg: 1, sampler_name: 'euler', scheduler: 'simple', denoise: 1 } },
    '12': { class_type: 'VAEDecode', inputs: { samples: ['10', 0], vae: ['3', 0] } },
    '13': { class_type: 'SaveImage', inputs: { images: ['12', 0], filename_prefix: 'albina_identity_edit_pilot_lce_lab' } },
  };
}

async function enqueue(workflow, promptId) {
  const response = await fetch(`${comfyUrl}/prompt`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: workflow, client_id: randomUUID(), prompt_id: promptId }) });
  const body = await response.json();
  if (!response.ok || body.error || Object.keys(body.node_errors ?? {}).length) throw new Error(`ComfyUI rejected identity-edit pilot: ${JSON.stringify(body)}`);
  if (body.prompt_id !== promptId) throw new Error(`ComfyUI accepted the pilot without the requested prompt_id: ${JSON.stringify(body)}`);
}

async function waitForImage(promptId) {
  const deadline = Date.now() + 15 * 60_000;
  while (Date.now() < deadline) {
    const response = await fetch(`${comfyUrl}/history/${encodeURIComponent(promptId)}`);
    const history = await response.json();
    const item = history[promptId];
    if (item?.status?.status_str === 'error') throw new Error(`ComfyUI identity-edit pilot failed: ${JSON.stringify(item.status)}`);
    const images = Object.values(item?.outputs ?? {}).flatMap((output) => output.images ?? []);
    if (images.length === 1) return images[0];
    await new Promise((resolve_) => setTimeout(resolve_, 1500));
  }
  throw new Error(`ComfyUI identity-edit pilot timed out: ${promptId}`);
}

async function download(image) {
  const query = new URLSearchParams({ filename: image.filename, subfolder: image.subfolder ?? '', type: image.type ?? 'output' });
  const response = await fetch(`${comfyUrl}/view?${query}`);
  if (!response.ok) throw new Error(`ComfyUI output download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

function imageDimensions(bytes) {
  const signature = '89504e470d0a1a0a';
  if (bytes.subarray(0, 8).toString('hex') !== signature || bytes.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('Identity-edit pilot output is not a PNG with an IHDR header');
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), type: 'png' };
}

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
function argument(name) {
  const index = process.argv.indexOf(name);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a prompt id`);
  return value;
}
