import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const plan = JSON.parse(await readFile(resolve(root,'content/media-production/visual-rebuild-v2.json'),'utf8'));
const prompts = JSON.parse(await readFile(resolve(root,'content/media-production/visual-prompts-v2.json'),'utf8'));
const canonSources = JSON.parse(await readFile(resolve(root,'content/media-production/canon-visual-sources-v1.json'),'utf8'));
const ledger = JSON.parse(await readFile(resolve(root,'staging/media/visual-v2/ledger.json'),'utf8'));

const jobId = 'visual.image.portrait.albina.normal';
const job = ledger.jobs[jobId];
const entry = plan.imageJobs.find(j=>j.id===jobId);
console.log('job status:', job.status, 'attempt:', job.activeAttempt);
console.log('requestKey:', job.requestKey);
console.log('sourceJobHash:', job.sourceJobHash);
console.log('entry references:', JSON.stringify(entry.referenceJobIds));
console.log('entry referenceSourceIds:', JSON.stringify(entry.referenceSourceIds));
