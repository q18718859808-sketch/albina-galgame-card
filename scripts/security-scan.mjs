import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const run = promisify(execFile);
const { stdout } = await run('git', ['ls-files', '-z']);
const files = stdout.split('\0').filter(Boolean);
const textExtensions = /\.(?:css|html|js|json|md|mjs|ts|tsx|vue|yaml|yml)$/u;
const secretPatterns = [
  /(?:PIE_API_KEY|CLOSEAPI_API_KEY)\s*[:=]\s*["'][^"']{8,}["']/iu,
  /(?:sk|pk)-[a-z0-9_-]{20,}/iu,
  /authorization\s*:\s*["']Bearer\s+[a-z0-9._-]{16,}/iu,
];
const findings = [];
for (const file of files.filter((path) => textExtensions.test(path))) {
  const text = await readFile(file, 'utf8');
  if (!/^(?:tools\/media\/tests|tests)\//u.test(file)) {
    for (const pattern of secretPatterns) if (pattern.test(text)) findings.push(`${file}: ${pattern}`);
  }
  if (/^(?:src|card|dist\/albina-galgame-card\/source)\//u.test(file) && /api\.pie-xian\.com|\/v1\/(?:images|videos|audio)|\/audio\/speech/iu.test(text)) {
    findings.push(`${file}: runtime media-provider endpoint`);
  }
}
if (findings.length) { console.error(findings.join('\n')); process.exitCode = 1; }
else console.log(`Security scan passed across ${files.length} tracked files.`);
