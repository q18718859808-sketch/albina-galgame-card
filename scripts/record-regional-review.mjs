#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const args = Object.fromEntries(process.argv.slice(2).filter((arg) => arg.startsWith('--')).map((arg) => {
  const index = arg.indexOf('=');
  return [arg.slice(2, index), arg.slice(index + 1)];
}));
if (!args.receipt || !args.status) throw new Error('--receipt and --status are required');
const receiptPath = resolve(root, args.receipt);
const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
const review = {
  status: args.status,
  reviewer: 'codex-direct-original-resolution-review',
  method: 'opened patch and canonical composite at original resolution and compared paired face, torso and lower crops',
  passed: args.passed ? args.passed.split('|').filter(Boolean) : [],
  rejected: args.rejected ? args.rejected.split('|').filter(Boolean) : [],
  notes: args.notes ?? '',
  reviewedAt: new Date().toISOString(),
};
receipt.directReview = { ...review, promotionAllowed: args.status === 'accepted' };
receipt.status = args.status === 'accepted' ? 'reviewed-approved' : 'reviewed-rejected';
receipt.promotionAllowed = args.status === 'accepted';
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(`${receipt.jobId}: ${args.status}`);
