#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '../..');
const contract = JSON.parse(await readFile(resolve(root, 'content/media-production/albina-reference-conditioned-pilot-v1.json'), 'utf8'));
if (contract.prompt.length < 400 || contract.negativePrompt.length < 200 || contract.identityStrength !== 0.9) throw new Error('pilot contract incomplete');
console.log(JSON.stringify({ ok: true, profile: contract.profile, jobId: contract.jobId, promptLength: contract.prompt.length, negativeLength: contract.negativePrompt.length, executeRequired: true }, null, 2));
