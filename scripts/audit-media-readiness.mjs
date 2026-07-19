import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { analyzeMediaReadiness } from './lib/media-readiness.mjs';

const manifest = JSON.parse(await readFile(resolve('content/asset-manifest-v2.json'), 'utf8'));
const report = analyzeMediaReadiness(manifest);
console.log(JSON.stringify(report, null, 2));
if (process.argv.includes('--strict') && report.blocked > 0) process.exitCode = 1;
