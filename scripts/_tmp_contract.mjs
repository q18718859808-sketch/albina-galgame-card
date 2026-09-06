import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const plan = JSON.parse(await readFile(resolve(root,'content/media-production/visual-rebuild-v2.json'),'utf8'));
const prompts = JSON.parse(await readFile(resolve(root,'content/media-production/visual-prompts-v2.json'),'utf8'));
const canonSources = JSON.parse(await readFile(resolve(root,'content/media-production/canon-visual-sources-v1.json'),'utf8'));
const ledger = JSON.parse(await readFile(resolve(root,'staging/media/visual-v2/ledger.json'),'utf8'));

const jobId = 'visual.image.portrait.albina.normal';
const entry = plan.imageJobs.find(j=>j.id===jobId);

// Resolve final prompt
const promptKey = entry.promptVersion;
const promptDef = prompts[promptKey];
if(!promptDef) { console.log('prompt not found for', promptKey); process.exit(1); }

// Get the job's prompt entry
const jobPrompt = promptDef[jobId] || promptDef[entry.assetId];
console.log('prompt entry keys:', jobPrompt ? Object.keys(jobPrompt) : 'NOT FOUND');
console.log('entry assetId:', entry.assetId);
console.log('entry.id:', entry.id);
console.log('promptDef keys (first 5):', Object.keys(promptDef).slice(0,5));
