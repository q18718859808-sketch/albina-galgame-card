import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { sha256 } from './lib/krea2-comfyui.mjs';

const args = parseArgs(process.argv.slice(2));
const required = ['receipt', 'reviewer', 'result', 'evidence', 'review-width', 'review-height'];
for (const name of required) if (!args[name]) throw new Error(`Missing required --${name}`);
if (!['approved', 'rejected'].includes(args.result)) throw new Error('--result must be approved or rejected');

const receiptPath = resolve(args.receipt);
const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
if (receipt?.purpose !== 'krea2-deterministic-image-text-composition') throw new Error('Not a deterministic Krea2 text composition receipt');
if (receipt.status !== 'awaiting-human-glyph-review') throw new Error('Text composition is not awaiting glyph review');
if (!receipt.output?.path || !receipt.output?.sha256) throw new Error('Text composition has no output evidence');
if (receipt.pixelIsolation?.status !== 'passed' || receipt.pixelIsolation?.outsideRoiChangedPixelCount !== 0) throw new Error('Text composition has no passing ROI pixel-isolation evidence');
const bytes = await readFile(receipt.output.path);
if (sha256(bytes) !== receipt.output.sha256) throw new Error('Output image hash no longer matches its receipt');
const reviewWidth = positiveInteger(args['review-width'], '--review-width');
const reviewHeight = positiveInteger(args['review-height'], '--review-height');
if (reviewWidth !== receipt.pixelIsolation.canvas.width || reviewHeight !== receipt.pixelIsolation.canvas.height) throw new Error('Review dimensions do not match the original output resolution');
if (args.evidence.trim().length < 24) throw new Error('--evidence must contain a concrete direct-image review record');

const reviewPath = receiptPath.replace(/\.json$/u, '.review.json');
const review = {
  schemaVersion: 1,
  purpose: 'krea2-deterministic-image-text-human-review',
  status: args.result,
  reviewedAt: new Date().toISOString(),
  reviewer: args.reviewer,
  compositionReceipt: receiptPath,
  compositionReceiptSha256: sha256(JSON.stringify(receipt)),
  outputSha256: receipt.output.sha256,
  reviewMethod: 'direct-original-resolution-glyph-by-glyph',
  reviewResolution: { width: reviewWidth, height: reviewHeight, scalePercent: 100 },
  evidence: args.evidence.trim(),
  promotion: args.result === 'approved' ? 'eligible-for-explicit-promotion-only' : 'blocked',
};
await writeFile(reviewPath, `${JSON.stringify(review, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(review, null, 2));

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

function positiveInteger(value, label) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) throw new Error(`${label} must be a positive integer`);
  return parsed;
}
