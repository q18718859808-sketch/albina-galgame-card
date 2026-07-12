import { execFile } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

import { isScannableTextPath, scanText } from './lib/security-scanner.mjs';

const run = promisify(execFile);
const { stdout } = await run('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard']);
const candidates = [...new Set(stdout.split('\0').filter(Boolean))];
const files = [];
for (const path of candidates) {
  if (!isScannableTextPath(path)) continue;
  try { await access(path); files.push(path); } catch { /* tracked deletion */ }
}
const findings = [];
for (const path of files) findings.push(...scanText(path.replaceAll('\\', '/'), await readFile(path, 'utf8')));
if (findings.length) { console.error([...new Set(findings)].join('\n')); process.exitCode = 1; }
else console.log(`Security scan passed across ${files.length} repository text files.`);
