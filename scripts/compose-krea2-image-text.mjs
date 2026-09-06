import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, extname, relative, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import {
  buildKrea2TextOverlayWorkflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  waitForKrea2Output,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const stagingRoot = resolve(root, 'staging/media');
const comfyRoot = 'D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI';
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const args = parseArgs(process.argv.slice(2));
const execFileAsync = promisify(execFile);
const required = ['id', 'source', 'source-receipt', 'text', 'font', 'width', 'height', 'x', 'y', 'font-size', 'color'];

for (const name of required) if (!args[name]) throw new Error(`Missing required --${name}`);

const id = safeId(args.id);
const sourcePath = assertStagingFile(args.source, 'source');
const sourceReceiptPath = assertStagingFile(args['source-receipt'], 'source receipt');
const fontPath = resolve(args.font);
const dimensions = numericOptions(args);
const source = await readFile(sourcePath);
const sourceReceipt = JSON.parse(await readFile(sourceReceiptPath, 'utf8'));
const font = await readFile(fontPath);
const { evidence } = await loadVerifiedKrea2Baseline();
assertSourceReceipt(sourceReceipt, sourcePath, source);
await stat(fontPath);

const comfyFont = `Albina-${id}${extname(fontPath) || '.otf'}`;
const comfyInput = `albina-${id}-source${extname(sourcePath) || '.png'}`;
const output = resolve(stagingRoot, 'krea2-text-staging', `${id}.png`);
const receiptPath = output.replace(/\.png$/u, '.json');
await mkdir(resolve(comfyRoot, 'input'), { recursive: true });
await mkdir(resolve(comfyRoot, 'custom_nodes/ComfyUI-KJNodes/fonts'), { recursive: true });
await copyFile(sourcePath, resolve(comfyRoot, 'input', comfyInput));
await copyFile(fontPath, resolve(comfyRoot, 'custom_nodes/ComfyUI-KJNodes/fonts', comfyFont));

const workflow = buildKrea2TextOverlayWorkflow({
  sourceImage: comfyInput, font: comfyFont, text: args.text,
  ...dimensions, filenamePrefix: `albina_krea2_text_${id}`,
});
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Text composition expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const roi = textRoi(args, dimensions);
const pixelIsolation = await verifyPixelIsolation(sourcePath, saved.path, roi);
const receipt = buildReceipt({ id, sourcePath, sourceReceiptPath, sourceReceipt, source, fontPath, font, comfyFont, workflow, queued, saved, evidence, dimensions, text: args.text, roi, pixelIsolation });
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function parseArgs(tokens) {
  const values = {};
  for (let index = 0; index < tokens.length; index += 2) {
    const key = tokens[index];
    const value = tokens[index + 1];
    if (!key?.startsWith('--') || value === undefined || value.startsWith('--')) throw new Error('Use only --key value arguments');
    values[key.slice(2)] = value;
  }
  return values;
}

function numericOptions(values) {
  const number = (name, minimum) => {
    const value = Number(values[name]);
    if (!Number.isSafeInteger(value) || value < minimum) throw new Error(`Invalid --${name}`);
    return value;
  };
  return { width: number('width', 16), height: number('height', 16), x: number('x', 0), y: number('y', 0), fontSize: number('font-size', 8), color: values.color };
}

function textRoi(values, dimensions) {
  const width = values['roi-width'] === undefined ? dimensions.width - dimensions.x : Number(values['roi-width']);
  const height = values['roi-height'] === undefined ? dimensions.height - dimensions.y : Number(values['roi-height']);
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 1 || height < 1) throw new Error('Invalid text ROI dimensions');
  if (dimensions.x + width > dimensions.width || dimensions.y + height > dimensions.height) throw new Error('Text ROI exceeds image bounds');
  return { x: dimensions.x, y: dimensions.y, width, height };
}

async function verifyPixelIsolation(sourcePath, outputPath, roi) {
  const python = process.env.ALBINA_PYTHON ?? 'python';
  const verifier = resolve(import.meta.dirname, 'verify-image-roi.py');
  const options = ['--source', sourcePath, '--output', outputPath, '--x', String(roi.x), '--y', String(roi.y), '--width', String(roi.width), '--height', String(roi.height)];
  const { stdout } = await execFileAsync(python, [verifier, ...options], { windowsHide: true });
  const proof = JSON.parse(stdout);
  if (proof.status !== 'passed' || proof.outsideRoiChangedPixelCount !== 0) throw new Error('Text composition failed ROI pixel isolation');
  return proof;
}

function assertStagingFile(value, label) {
  const path = resolve(value);
  if (path !== stagingRoot && !path.startsWith(`${stagingRoot}\\`) && !path.startsWith(`${stagingRoot}/`)) throw new Error(`${label} must be inside staging/media`);
  return path;
}

function assertSourceReceipt(receipt, sourcePath, source) {
  if (receipt?.status !== 'approved' && receipt?.status !== 'awaiting-human-image-review' && receipt?.status !== 'awaiting-human-glyph-review') throw new Error('source receipt is not review-eligible');
  if (receipt?.output?.sha256 !== sha256(source)) throw new Error('source receipt output hash does not match source image');
  const baselineHash = receipt?.baseline?.workflowSha256 ?? receipt?.workflow?.baselineSha256 ?? receipt?.workflowSha256;
  if (typeof baselineHash !== 'string' || !/^[a-f0-9]{64}$/u.test(baselineHash)) throw new Error('source receipt has no Krea2 baseline hash');
  if (receipt.output.path && basename(receipt.output.path) !== basename(sourcePath)) throw new Error('source receipt does not name the source image');
}

function buildReceipt(input) {
  return {
    schemaVersion: 1,
    purpose: 'krea2-deterministic-image-text-composition',
    status: 'awaiting-human-glyph-review',
    createdAt: new Date().toISOString(),
    baseline: { workflowSha256: input.evidence.workflow.sha256, topologySha256: input.evidence.runtime.topologySha256, sourceImageSha256: sha256(input.source) },
    source: { image: relative(root, input.sourcePath).replaceAll('\\', '/'), receipt: relative(root, input.sourceReceiptPath).replaceAll('\\', '/'), receiptSha256: sha256(JSON.stringify(input.sourceReceipt)) },
    composition: { mode: 'deterministic-comfyui-text-mask', generatedText: false, text: input.text, dimensions: input.dimensions, roi: input.roi },
    pixelIsolation: input.pixelIsolation,
    font: { name: input.comfyFont, source: input.fontPath, sha256: sha256(input.font) },
    promptId: input.queued.promptId,
    workflowSha256: sha256(JSON.stringify(input.workflow)),
    output: input.saved,
    acceptance: 'Read at 100 percent. Verify every glyph, line break, contrast, and crop. Reject any corruption, clipping, logo, watermark, or unintended text. This asset remains staging-only until the review receipt is approved.',
  };
}

function safeId(value) {
  const id = value.replaceAll(/[^a-z0-9._-]/giu, '-').replaceAll(/-+/gu, '-').replaceAll(/^-|-$/gu, '');
  if (id.length < 3 || id.length > 80) throw new Error('Invalid --id');
  return id;
}
