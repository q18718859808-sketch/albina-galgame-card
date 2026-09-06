import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildKrea2TextOverlayWorkflow, downloadKrea2Image, enqueueKrea2Job, sha256, waitForKrea2Output } from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const comfyRoot = 'D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI';
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const systemFont = 'C:/Windows/Fonts/Noto Sans SC (TrueType).otf';
const fontName = 'Albina-NotoSansSC.otf';
const comfyFont = `${comfyRoot}/custom_nodes/ComfyUI-KJNodes/fonts/${fontName}`;
const output = resolve(root, 'staging/media/krea2-text-proof/krea2-text-overlay-proof.png');
const receiptPath = output.replace(/\.png$/u, '.json');
const evidence = JSON.parse(await readFile(resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json'), 'utf8'));
const chineseTitle = String.fromCodePoint(0x963f, 0x5c14, 0x6bd4, 0x5a1c, 0x0020, 0x002f, 0x0020, 0x7b2c, 0x4e5d, 0x7ae0);
const sampleText = `${chineseTitle}\nAlbina / Canto IX`;

if (evidence.verified !== true) throw new Error('Krea2 text proof requires verified baseline evidence');
await mkdir(resolve(root, 'staging/media/krea2-text-proof'), { recursive: true });
await copyFile(systemFont, comfyFont);

const workflow = buildKrea2TextOverlayWorkflow({
  backgroundColor: 0x101216, font: fontName, text: sampleText, width: 1928, height: 1088,
  x: 80, y: 72, fontSize: 74, color: '#d8bb72', filenamePrefix: 'albina_krea2_text_overlay_proof',
});
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Krea2 text proof expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1,
  purpose: 'krea2-deterministic-image-text-composition',
  status: 'awaiting-human-glyph-review',
  createdAt: new Date().toISOString(),
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  composition: { mode: 'deterministic-comfyui-text-mask-proof', generatedText: false, backgroundColor: '#101216' },
  font: { name: fontName, source: systemFont, sha256: sha256(await readFile(systemFont)) },
  samples: [chineseTitle, 'Albina / Canto IX'],
  promptId: queued.promptId,
  workflowSha256: sha256(JSON.stringify(workflow)),
  output: saved,
  acceptance: 'Read at 100 percent. Every Chinese and Latin glyph must be correct; reject any corruption, clipping, logo, watermark, or unintended text.',
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
