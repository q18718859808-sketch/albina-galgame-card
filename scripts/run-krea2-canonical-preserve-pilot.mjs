import { createHash, randomUUID } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const comfyRoot = 'D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI';
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const outputRoot = resolve(root, 'staging/media/krea2-canonical-preserve');
const sourcePath = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const inputName = 'albina_canonical_preserve_unarmored.png';
const outputPath = resolve(outputRoot, 'albina-canonical-preserve-unarmored.png');
const receiptPath = resolve(outputRoot, 'albina-canonical-preserve-unarmored.json');
const instruction = 'Preserve the supplied canonical Albina standing sprite exactly. This is a restoration pass, not a redesign. Keep the identical adult face, eye-side colors, white fringe, cable-bound ponytail, prosthetic details, body proportions, pose, hands, feet, costume construction, line density, flat 2D rendering, palette, and transparent-background character-sprite composition. Only remove compression artifacts and clarify existing edges without changing any authored design fact. No new background, lighting effect, shadow, text, logo, watermark, extra limbs, cropped feet, natural hair, glossy rendering, 3D rendering, beauty retouching, costume changes, or added props.';

await mkdir(outputRoot, { recursive: true });
await copyFile(sourcePath, resolve(comfyRoot, 'input', inputName));
const source = await readFile(sourcePath);
const workflow = buildWorkflow(inputName, instruction);
const promptId = randomUUID();
const response = await fetch(`${comfyUrl}/prompt`, {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ prompt: workflow, client_id: randomUUID(), prompt_id: promptId }),
});
const accepted = await response.json();
if (!response.ok || accepted.error || Object.keys(accepted.node_errors ?? {}).length) throw new Error(`ComfyUI rejected canonical-preserve pilot: ${JSON.stringify(accepted)}`);
const info = await waitForImage(promptId);
const output = await download(info);
await writeFile(outputPath, output);
const receipt = {
  schemaVersion: 1,
  provider: 'comfyui-local-krea2-identity-edit',
  status: 'awaiting-mandatory-image-review',
  purpose: 'single-reference canonical Albina preservation pilot; staging only',
  createdAt: new Date().toISOString(),
  source: { path: sourcePath, sha256: sha256(source), sentToModel: true, role: 'sole identity-style-structure-composition reference' },
  instruction, instructionSha256: sha256(instruction),
  workflow: { sha256: sha256(JSON.stringify(workflow)), identityEditLora: 'krea2_identity_edit_v1_2.safetensors' },
  execution: { comfyUrl, promptId, seed: 2026081022 },
  output: { path: outputPath, sha256: sha256(output), bytes: output.length, dimensions: pngDimensions(output) },
  visualGate: {
    readImageRequired: true,
    promotionAllowed: false,
    passConditions: ['adult identity retained', 'canonical clothing retained', 'flat 2D sprite treatment retained', 'no cropping or anatomy error'],
    decision: 'awaiting-review',
  },
  rights: { generatedOutput: 'review-required', publicRelease: 'prohibited-until-rights-and-visual-review' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function buildWorkflow(image, prompt) {
  return {
    '1': { class_type: 'UNETLoader', inputs: { unet_name: 'krea2_turbo_fp8_scaled.safetensors', weight_dtype: 'default' } },
    '2': { class_type: 'CLIPLoader', inputs: { clip_name: 'qwen3vl_4b_fp8_scaled.safetensors', type: 'krea2', device: 'default' } },
    '3': { class_type: 'VAELoader', inputs: { vae_name: 'qwen_image_vae.safetensors' } },
    '4': { class_type: 'LoraLoaderModelOnly', inputs: { model: ['1', 0], lora_name: 'krea2_identity_edit_v1_2.safetensors', strength_model: 1 } },
    '5': { class_type: 'LoadImage', inputs: { image } },
    '6': { class_type: 'VAEEncode', inputs: { pixels: ['5', 0], vae: ['3', 0] } },
    '7': { class_type: 'EmptySD3LatentImage', inputs: { width: 512, height: 1536, batch_size: 1 } },
    '8': { class_type: 'Krea2EditModelPatch', inputs: { model: ['4', 0], source_latent: ['6', 0], source_image: ['5', 0], target_latent: ['7', 0], vae: ['3', 0], ref_boost: 18, fit_mode: 'fit' } },
    '9': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt, grounding_px: 768, system_prompt: 'Perform a strict source-preserving restoration. Do not redraw or reinterpret the supplied 2D character sprite.' } },
    '10': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt: '', grounding_px: 768, system_prompt: '' } },
    '11': { class_type: 'KSampler', inputs: { model: ['8', 0], positive: ['9', 0], negative: ['10', 0], latent_image: ['7', 0], seed: 2026081022, steps: 10, cfg: 1, sampler_name: 'euler', scheduler: 'simple', denoise: 1 } },
    '12': { class_type: 'VAEDecode', inputs: { samples: ['11', 0], vae: ['3', 0] } },
    '13': { class_type: 'SaveImage', inputs: { images: ['12', 0], filename_prefix: 'albina_canonical_preserve_unarmored' } },
  };
}

async function waitForImage(promptId) {
  const deadline = Date.now() + 900000;
  while (Date.now() < deadline) {
    const history = await (await fetch(`${comfyUrl}/history/${promptId}`)).json();
    const item = history[promptId];
    if (item?.status?.status_str === 'error') throw new Error(`ComfyUI canonical-preserve failed: ${JSON.stringify(item.status)}`);
    const images = Object.values(item?.outputs ?? {}).flatMap((output) => output.images ?? []);
    if (images.length === 1) return images[0];
    await new Promise((resolve_) => setTimeout(resolve_, 1500));
  }
  throw new Error(`ComfyUI canonical-preserve timed out: ${promptId}`);
}

async function download(info) {
  const query = new URLSearchParams({ filename: info.filename, subfolder: info.subfolder ?? '', type: info.type ?? 'output' });
  const response = await fetch(`${comfyUrl}/view?${query}`);
  if (!response.ok) throw new Error(`ComfyUI canonical-preserve download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
function pngDimensions(bytes) { return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), type: 'png' }; }
