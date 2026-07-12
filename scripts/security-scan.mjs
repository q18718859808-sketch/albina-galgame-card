import { readFile, readdir } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

const root = process.cwd();
const scanRoots = ['card', 'content', 'dist', 'release', 'src', 'scripts', '.github'];
const textExtensions = new Set(['.css', '.env', '.html', '.ini', '.js', '.json', '.md', '.mjs', '.ps1', '.py', '.sh', '.toml', '.ts', '.tsx', '.txt', '.vue', '.yaml', '.yml']);
const secretPatterns = [
  /(?:api[_-]?key|authorization|token|secret)\s*[:=]\s*["'](?:bearer\s+)?(?!\$\{|<|your[_-]|example|replace|test|fake)[a-z0-9._-]{16,}["']/iu,
  /["']sk-[a-z0-9_-]{20,}["']/iu,
];
const endpointPattern = /(?:api\.pie-xian\.com|closeapi\.top|api\.piapi\.ai|\/v1\/(?:images\/generations|videos|audio\/speech))/iu;

async function walk(folder) {
  const result = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else result.push(path);
  }
  return result;
}

const files = (await Promise.all(scanRoots.map(async (folder) => walk(resolve(root, folder))))).flat();
const findings = [];
for (const file of files.filter((path) => textExtensions.has(extname(path).toLowerCase()) || /(?:^|\/)\.env(?:\.|$)/u.test(path.replaceAll('\\', '/')))) {
  const relativePath = relative(root, file).replaceAll('\\', '/');
  const text = await readFile(file, 'utf8');
  for (const pattern of secretPatterns) if (pattern.test(text)) findings.push(`${relativePath}: credential-shaped value`);
  const isRuntimeSurface = /^(?:card|dist|release|src)\//u.test(relativePath);
  if (isRuntimeSurface && endpointPattern.test(text)) findings.push(`${relativePath}: runtime provider endpoint`);
  if (/^(?:dist|release)\//u.test(relativePath) && (/(?:^|\/)(?:tools?|scripts?)(?:\/|$)/iu.test(relativePath) || /\.(?:bat|cmd|ps1|py|sh)$/iu.test(relativePath))) {
    findings.push(`${relativePath}: generation tool in web release`);
  }
}
if (findings.length) { console.error([...new Set(findings)].join('\n')); process.exitCode = 1; }
else console.log(`Security scan passed across ${files.length} release/source files.`);
