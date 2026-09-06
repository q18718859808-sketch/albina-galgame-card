#!/usr/bin/env node
/**
 * Validate or print the static single-anchor sharpness plan.
 * No ComfyUI endpoint, model loader, image helper, or GPU inference is used.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  assertKrea2SharpSingleAnchorPlan,
  buildKrea2SharpSingleAnchorPlan,
  summarizeKrea2SharpSingleAnchorPlan,
} from './lib/krea2-single-anchor-experiment.mjs';

const root = resolve(import.meta.dirname, '..');
const contractPath = resolve(root, argument('--contract') ?? 'content/media-production/krea2-canonical-production-contract-v1.json');
const planPath = argument('--plan');
const seed = argument('--seed') === undefined ? undefined : Number(argument('--seed'));
if (seed !== undefined && (!Number.isSafeInteger(seed) || seed <= 0)) throw new Error('--seed must be a positive safe integer');

const plan = planPath
  ? JSON.parse(await readFile(resolve(root, planPath), 'utf8'))
  : buildKrea2SharpSingleAnchorPlan(JSON.parse(await readFile(contractPath, 'utf8')), { fixedSeed: seed });

assertKrea2SharpSingleAnchorPlan(plan);
console.log(JSON.stringify({
  mode: planPath ? 'validate-existing-static-plan' : 'build-static-plan',
  contractPath,
  planPath: planPath ?? null,
  ...summarizeKrea2SharpSingleAnchorPlan(plan),
}, null, 2));

function argument(name) {
  const prefix = `${name}=`;
  const inline = process.argv.find((value) => value.startsWith(prefix));
  if (inline) return inline.slice(prefix.length) || undefined;
  const index = process.argv.indexOf(name);
  const value = index < 0 ? undefined : process.argv[index + 1];
  return value?.startsWith('--') ? undefined : value;
}
