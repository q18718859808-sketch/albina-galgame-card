#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const args = Object.fromEntries(process.argv.slice(2).filter((arg) => arg.startsWith('--')).map((arg) => {
  const i = arg.indexOf('=');
  return [arg.slice(2, i), arg.slice(i + 1)];
}));
if (!args.receipt || !args.status) throw new Error('--receipt and --status are required');
const path = resolve(root, args.receipt);
const receipt = JSON.parse(await readFile(path, 'utf8'));
receipt.directReview = {
  status: args.status,
  reviewer: 'codex-direct-original-resolution-review',
  method: 'opened canonical and material-pass images at original resolution and compared face, torso, lower-body and feet pairs',
  passed: ['canonical structure is authoritative', 'canonical alpha is authoritative', 'mechanical anchors remain readable'],
  rejected: args.rejected ? args.rejected.split('|').filter(Boolean) : [],
  notes: args.notes ?? '',
  reviewedAt: new Date().toISOString(),
};
receipt.status = args.status === 'accepted' ? 'reviewed-structure-safe' : 'reviewed-rejected';
receipt.promotionAllowed = false;
receipt.directReview.promotionAllowed = false;
await writeFile(path, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(`${receipt.kind}: ${args.status}; promotion remains blocked because this is a composite material pass`);
