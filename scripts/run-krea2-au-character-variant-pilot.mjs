import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { validateKrea2ProductionStyleChain } from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const comfyRoot = 'D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI';
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const root = resolve(projectRoot, 'staging/media/krea2-au-character-anchor');
const anchorPath = resolve(root, 'albina-au-anchor.png');
const variant = readArgument('--variant') ?? 'normal';
const prompts = {
  normal: 'Preserve the exact original AU heroine identity and full body. Refine into a calm neutral visual-novel standing portrait with relaxed hands, clean ivory artisan armor, cold white industrial rim light, plain charcoal backdrop. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
  rain: 'Preserve the exact original AU heroine identity and full body. Change the setting to a restrained rain-soaked industrial rooftop at night; add a charcoal rain cape over the ivory artisan armor and wet reflective pavement, while keeping calm expression and readable full-body silhouette. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
  combat: 'Preserve the exact original AU heroine identity and full body. Give her a stable defensive visual-novel combat stance, with folded mechanical artisan forearm tools opened into precise non-branded tools, cold industrial backlight, controlled warning-red accents, and clear feet on the ground. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
  armored: 'Preserve the exact original AU heroine identity and full body. Give her an elaborate ceremonial ivory artisan armor configuration with restrained gold filigree, precise charcoal seamwork, a composed command posture, and cold museum-industrial backlight. Keep the silhouette elegant and original, with both hands and boot tips clearly visible. Do not add text, logos, watermarks, published character costumes, additional people, extra limbs, or crop the feet.',
  endgame: 'Preserve the exact original AU heroine identity and full body. Show a calm resolved ending-state portrait at pale industrial dawn, with her forearm tools safely folded, a clean ivory-and-ash palette, and a subtle warm horizon rim light. Keep her poised and visibly whole, with both hands and boot tips clearly visible. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
  'fascia-open': 'Preserve the exact original AU heroine identity and full body. Depict a non-graphic artisan maintenance state: an original mechanical torso access panel is carefully open, revealing abstract ceramic inner workings and charcoal cables, while her expression remains focused and dignified. No gore, organs, branded weapon, text, logos, watermarks, additional people, extra limbs, or cropped feet.',
  furious: 'Preserve the exact original AU heroine identity and full body. Create a controlled furious visual-novel portrait: a sharply focused expression, tense but stable stance, subtle warning-red industrial light, and mechanical artisan tools still clearly non-branded. Both hands and boot tips must be visible. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
  'golden-bough': 'Preserve the exact original AU heroine identity and full body. Place her beside an original unbranded brass-root art installation with warm amber light, in an industrial archive setting; use a contemplative stance and keep the ivory artisan armor readable. Both hands and boot tips must be visible. Do not add text, logos, watermarks, published game props, additional people, extra limbs, or crop the feet.',
  maestro: 'Preserve the exact original AU heroine identity and full body. Create an original atelier-leader portrait: a tailored ivory artisan mantle, restrained gold tooling, a poised directing gesture with one hand, and a dark industrial studio backdrop. Keep the identity, anatomy, hands, and full silhouette clear. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
  'ring-conspiracy': 'Preserve the exact original AU heroine identity and full body. Give her an original covert industrial-gallery disguise: charcoal overcoat over ivory artisan armor, restrained metallic accessories, soft side light, and a guarded but calm expression. Keep both hands and boot tips clearly visible. Do not add text, logos, watermarks, published costumes, additional people, extra limbs, or crop the feet.',
  shy: 'Preserve the exact original AU heroine identity and full body. Create a gentle shy visual-novel portrait with a small averted smile, relaxed shoulders, soft cool studio light, and the same ivory artisan armor silhouette. Keep the identity, both hands, and boot tips clear. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
  surgical: 'Preserve the exact original AU heroine identity and full body. Create an original precision-restoration workshop portrait: clean ivory artisan apron panels, folded non-branded mechanical forearm tools, sterile cold lamps, and a focused professional expression. No medical gore, text, logos, watermarks, additional people, extra limbs, or cropped feet.',
  'white-canvas': 'Preserve the exact original AU heroine identity and full body. Stage her in an original white industrial art hall with a blank unmarked canvas wall, quiet pale lighting, and a contemplative neutral pose. Keep the ivory armor silhouette, hands, and boot tips clearly visible. Do not add text, logos, watermarks, additional people, extra limbs, or crop the feet.',
};
const instruction = prompts[variant];
if (!instruction) throw new Error(`Unsupported --variant: ${variant}. Use one of: ${Object.keys(prompts).join(', ')}.`);
const inputName = `albina_au_anchor_${variant}.png`;
const outputPath = resolve(root, `albina-au-${variant}.png`);
const receiptPath = resolve(root, `albina-au-${variant}.json`);

await mkdir(root, { recursive: true });
const workflow = workflowFor(inputName, instruction, seedFor(variant));
// This historical pilot has no six-LoRA style chain. Keep it auditable, but do not
// permit it to copy inputs or submit a non-production workflow to ComfyUI.
validateKrea2ProductionStyleChain(workflow);
await copyFile(anchorPath, resolve(comfyRoot, 'input', inputName));
const source = await readFile(anchorPath);
const promptId = randomUUID();
const response = await fetch(`${comfyUrl}/prompt`, {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: workflow, client_id: randomUUID(), prompt_id: promptId }),
});
const body = await response.json();
if (!response.ok || body.prompt_id !== promptId || body.error || Object.keys(body.node_errors ?? {}).length) throw new Error(`ComfyUI rejected AU variant: ${JSON.stringify(body)}`);
const image = await waitForImage(promptId);
const output = await download(image);
await writeFile(outputPath, output);
const receipt = {
  schemaVersion: 1, provider: 'comfyui-local-krea2-identity-edit', status: 'awaiting-review',
  purpose: 'original AU character variant candidate; local review only', createdAt: new Date().toISOString(),
  variant, instruction, instructionSha256: sha256(instruction),
  reference: { path: anchorPath, sha256: sha256(source), sentToModel: true, provenance: 'local-original-au-anchor-candidate' },
  workflow: { sha256: sha256(JSON.stringify(workflow)), identityEditLora: 'krea2_identity_edit_v1_2.safetensors' },
  execution: { promptId, seed: seedFor(variant), comfyUrl },
  output: { path: outputPath, sha256: sha256(output), bytes: output.length, dimensions: pngDimensions(output) },
  rights: { generatedOutput: 'review-required', publicRelease: 'prohibited-until-originality-and-rights-review' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function workflowFor(image, prompt, seed) {
  return {
    '1': { class_type: 'UNETLoader', inputs: { unet_name: 'krea2_turbo_fp8_scaled.safetensors', weight_dtype: 'default' } },
    '2': { class_type: 'CLIPLoader', inputs: { clip_name: 'qwen3vl_4b_fp8_scaled.safetensors', type: 'krea2', device: 'default' } },
    '3': { class_type: 'VAELoader', inputs: { vae_name: 'qwen_image_vae.safetensors' } },
    '4': { class_type: 'LoraLoaderModelOnly', inputs: { model: ['1', 0], lora_name: 'krea2_identity_edit_v1_2.safetensors', strength_model: 1 } },
    '5': { class_type: 'LoadImage', inputs: { image } },
    '6': { class_type: 'VAEEncode', inputs: { pixels: ['5', 0], vae: ['3', 0] } },
    '7': { class_type: 'EmptySD3LatentImage', inputs: { width: 768, height: 1360, batch_size: 1 } },
    '8': { class_type: 'Krea2EditModelPatch', inputs: { model: ['4', 0], source_latent: ['6', 0], ref_boost: 4, fit_mode: 'fit', vae: ['3', 0], source_image: ['5', 0], target_latent: ['7', 0] } },
    '9': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt, grounding_px: 768, system_prompt: 'Preserve the original AU character identity and full-body silhouette.' } },
    '10': { class_type: 'Krea2EditGroundedEncode', inputs: { clip: ['2', 0], image: ['5', 0], prompt: '', grounding_px: 768, system_prompt: '' } },
    '11': { class_type: 'KSampler', inputs: { model: ['8', 0], positive: ['9', 0], negative: ['10', 0], latent_image: ['7', 0], seed, steps: 10, cfg: 1, sampler_name: 'euler', scheduler: 'simple', denoise: 1 } },
    '12': { class_type: 'VAEDecode', inputs: { samples: ['11', 0], vae: ['3', 0] } },
    '13': { class_type: 'SaveImage', inputs: { images: ['12', 0], filename_prefix: `albina_au_variant_${variant}` } },
  };
}

async function waitForImage(promptId) {
  const deadline = Date.now() + 15 * 60_000;
  while (Date.now() < deadline) {
    const history = await (await fetch(`${comfyUrl}/history/${promptId}`)).json();
    const item = history[promptId];
    if (item?.status?.status_str === 'error') throw new Error(`ComfyUI AU variant failed: ${JSON.stringify(item.status)}`);
    const images = Object.values(item?.outputs ?? {}).flatMap((output) => output.images ?? []);
    if (images.length === 1) return images[0];
    await new Promise((resolve_) => setTimeout(resolve_, 1_500));
  }
  throw new Error(`ComfyUI AU variant timed out: ${promptId}`);
}

async function download(image) {
  const query = new URLSearchParams({ filename: image.filename, subfolder: image.subfolder ?? '', type: image.type ?? 'output' });
  const response = await fetch(`${comfyUrl}/view?${query}`);
  if (!response.ok) throw new Error(`ComfyUI output download failed: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

function pngDimensions(bytes) {
  if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Expected PNG output');
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), type: 'png' };
}
function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
function readArgument(name) { const index = process.argv.indexOf(name); return index < 0 ? undefined : process.argv[index + 1]; }
function seedFor(name) {
  const index = Object.keys(prompts).indexOf(name);
  if (index < 0) throw new Error(`No deterministic seed configured for ${name}`);
  return 2026080914 + index;
}
