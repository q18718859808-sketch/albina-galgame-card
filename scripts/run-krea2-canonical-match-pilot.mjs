import { createHash, randomUUID } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const comfyRoot = 'D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI';
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const outputRoot = resolve(root, 'staging/media/krea2-canonical-match');
const styleSource = resolve(root, 'staging/research/style-reference/albina-style-board-deidentified-mosaic.png');
const characterSource = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const outputPath = resolve(outputRoot, 'albina-canonical-match-normal.png');
const receiptPath = resolve(outputRoot, 'albina-canonical-match-normal.json');
const styleInput = 'albina_canonical_match_style_board.png';
const characterInput = 'albina_canonical_match_character.png';
const instruction = `STRICT CANONICAL MATCH EDIT. Image 1 is an anonymized style board and controls only dense 2D linework, flat-color transitions, limited painterly shading, cool white and charcoal structure, restrained gold accents, warning-red energy, biomechanical material edges, and industrial cold lighting. Image 2 is the only identity reference and is the canonical Albina unarmored standing sprite. Preserve Image 2 exactly: same face construction, flat white fringe, black/right and white/left eyes, pale grey cable-bound high ponytail, prosthetic seams, body proportions, hand and foot anatomy, silhouette, pose, and clothing structure. Do not redesign, beautify, photorealize, glossy-render, add natural hair, change facial proportions, or invent costume details. Produce a clean full-body visual-novel standing portrait with transparent background and the same design-sheet-like flat 2D finish as Image 2, only improving clarity and material separation. No text, logo, watermark, background, shadow, extra people, extra limbs, cropped feet, or third-party costume.`;

await mkdir(outputRoot, { recursive: true });
await copyFile(styleSource, resolve(comfyRoot, 'input', styleInput));
await copyFile(characterSource, resolve(comfyRoot, 'input', characterInput));
const workflow = buildWorkflow(styleInput, characterInput, instruction);
const promptId = randomUUID();
const response = await fetch(`${comfyUrl}/prompt`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: workflow, client_id: randomUUID(), prompt_id: promptId }) });
const accepted = await response.json();
if (!response.ok || accepted.error || Object.keys(accepted.node_errors ?? {}).length) throw new Error(`ComfyUI rejected canonical-match pilot: ${JSON.stringify(accepted)}`);
const imageInfo = await waitForImage(promptId);
const image = await download(imageInfo);
await writeFile(outputPath, image);
const receipt = {
  schemaVersion: 1,
  provider: 'comfyui-local-krea2-identity-edit',
  status: 'awaiting-human-visual-review',
  purpose: 'canonical Albina style-match pilot; staging only',
  createdAt: new Date().toISOString(),
  comfyui: { url: comfyUrl },
  references: {
    styleBoard: { path: styleSource, sha256: sha256(await readFile(styleSource)), sentToModel: true, role: 'style-only' },
    canonicalAlbina: { path: characterSource, sha256: sha256(await readFile(characterSource)), sentToModel: true, role: 'identity-and-structure-only' },
  },
  instructionSha256: sha256(instruction),
  instruction,
  workflowSha256: sha256(JSON.stringify(workflow)),
  execution: { promptId, seed: 2026081011 },
  output: { path: outputPath, sha256: sha256(image), bytes: image.length, dimensions: pngDimensions(image) },
  rights: { generatedOutput: 'review-required', publicRelease: 'prohibited-until-originality-and-rights-review' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function buildWorkflow(style, character, prompt) {
  return {
    '1': { class_type: 'UNETLoader', inputs: { unet_name: 'krea2_turbo_fp8_scaled.safetensors', weight_dtype: 'default' } },
    '2': { class_type: 'CLIPLoader', inputs: { clip_name: 'qwen3vl_4b_fp8_scaled.safetensors', type: 'krea2', device: 'default' } },
    '3': { class_type: 'VAELoader', inputs: { vae_name: 'qwen_image_vae.safetensors' } },
    '4': { class_type: 'LoraLoaderModelOnly', inputs: { model: ['1', 0], lora_name: 'krea2_identity_edit_v1_2.safetensors', strength_model: 1 } },
    '5': { class_type: 'LoadImage', inputs: { image: style } },
    '6': { class_type: 'VAEEncode', inputs: { pixels: ['5', 0], vae: ['3', 0] } },
    '7': { class_type: 'LoadImage', inputs: { image: character } },
    '8': { class_type: 'VAEEncode', inputs: { pixels: ['7', 0], vae: ['3', 0] } },
    '9': { class_type: 'EmptySD3LatentImage', inputs: { width: 768, height: 1360, batch_size: 1 } },
    '10': { class_type: 'Krea2EditModelPatch', inputs: { model: ['4', 0], source_latent: ['6', 0], source_latent_b: ['8', 0], source_image: ['5', 0], source_image_b: ['7', 0], target_latent: ['9', 0], vae: ['3', 0], ref_boost: 4, ref_boost_a: 1, fit_mode: 'fit' } },
    '11': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], image_b: ['7', 0], prompt, grounding_px: 768, system_prompt: 'Image 1 is style-only. Image 2 is the sole identity reference. Preserve the canonical character design exactly.' } },
    '12': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], image_b: ['7', 0], prompt: '', grounding_px: 768, system_prompt: '' } },
    '13': { class_type: 'KSampler', inputs: { model: ['10', 0], positive: ['11', 0], negative: ['12', 0], latent_image: ['9', 0], seed: 2026081011, steps: 12, cfg: 1, sampler_name: 'euler', scheduler: 'simple', denoise: 1 } },
    '14': { class_type: 'VAEDecode', inputs: { samples: ['13', 0], vae: ['3', 0] } },
    '15': { class_type: 'SaveImage', inputs: { images: ['14', 0], filename_prefix: 'albina_canonical_match_normal' } },
  };
}

async function waitForImage(promptId) {
  const deadline = Date.now() + 900000;
  while (Date.now() < deadline) {
    const history = await (await fetch(`${comfyUrl}/history/${promptId}`)).json();
    const item = history[promptId];
    if (item?.status?.status_str === 'error') throw new Error(`ComfyUI canonical-match failed: ${JSON.stringify(item.status)}`);
    const images = Object.values(item?.outputs ?? {}).flatMap((output) => output.images ?? []);
    if (images.length === 1) return images[0];
    await new Promise((resolve_) => setTimeout(resolve_, 1500));
  }
  throw new Error(`ComfyUI canonical-match timed out: ${promptId}`);
}

async function download(info) {
  const query = new URLSearchParams({ filename: info.filename, subfolder: info.subfolder ?? '', type: info.type ?? 'output' });
  const response = await fetch(`${comfyUrl}/view?${query}`);
  if (!response.ok) throw new Error(`ComfyUI canonical-match download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
function pngDimensions(bytes) { return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), type: 'png' }; }
