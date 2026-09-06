#!/usr/bin/env node
/** Recover an image that ComfyUI completed after the client-side queue timeout. */
import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { downloadKrea2Image, sha256 } from './lib/krea2-comfyui.mjs';

const id = process.argv.find((arg) => arg.startsWith('--id='))?.slice(5);
const promptId = process.argv.find((arg) => arg.startsWith('--prompt='))?.slice(9);
const outputName = process.argv.find((arg) => arg.startsWith('--output='))?.slice(9);
if (!id || !promptId || !outputName) throw new Error('Usage: --id=<id> --prompt=<promptId> --output=<filename>');

const root = resolve(import.meta.dirname, '..');
const group = id.startsWith('bg-') ? 'backgrounds' : id.startsWith('cg-') ? 'cg' : 'characters';
const jobId = `restyle_${id.replaceAll('-', '_')}`;
const dir = resolve(root, 'staging/media/krea2-canonical-restyle', group);
const receiptPath = resolve(dir, `${jobId}.receipt.json`);
const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
const rgbPath = resolve(dir, `${jobId}.rgb.png`);
const image = await downloadKrea2Image({ filename: outputName, subfolder: '', type: 'output' }, rgbPath);
let finalPath = rgbPath;
if (group === 'characters') {
  const jobModule = await import('./krea2-canonical-restyle-batch.mjs?recover=1');
  const job = jobModule.JOBS.find((entry) => entry.id === id);
  if (!job) throw new Error(`No canonical job exists for ${id}`);
  const canonical = resolve(root, 'staging/research/canon-visual/wiki-game-assets', job.source);
  finalPath = resolve(dir, `${jobId}.png`);
  const program = [
    'import sys',
    'from PIL import Image',
    'src,out,dst=sys.argv[1:4]',
    "alpha=Image.open(src).convert('RGBA').split()[3]",
    "image=Image.open(out).convert('RGB').convert('RGBA')",
    'image.putalpha(alpha.resize(image.size, Image.LANCZOS))',
    'image.save(dst)',
  ].join('\n');
  const result = spawnSync('python', ['-c', program, canonical, rgbPath, finalPath], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`alpha recovery failed: ${result.stderr || result.stdout}`);
}
const bytes = await readFile(finalPath);
receipt.status = 'completed';
receipt.recoveredFromComfyHistory = { promptId, outputName, recoveredAt: new Date().toISOString() };
receipt.output = { ...image, finalPath, finalSha256: sha256(bytes), alphaRestored: group === 'characters' };
delete receipt.failedAt;
delete receipt.failure;
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(`${id}: recovered ${basename(finalPath)}`);
