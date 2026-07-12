import { extname } from 'node:path';

const textExtensions = new Set(['.css', '.env', '.html', '.ini', '.js', '.json', '.md', '.mjs', '.mts', '.ps1', '.py', '.sh', '.toml', '.ts', '.tsx', '.txt', '.vue', '.yaml', '.yml']);
const secretPatterns = [
  /(?:api[_-]?key|authorization|token|secret)\s*[:=]\s*["'](?:bearer\s+)?(?!\$\{|<|your[_-]|example|replace|test|fake)[a-z0-9._-]{16,}["']/iu,
  /["']sk-[a-z0-9_-]{20,}["']/iu,
];
const endpointPattern = /(?:api\.pie-xian\.com|closeapi\.top|api\.piapi\.ai|\/v1\/(?:images\/generations|videos|audio\/speech))/iu;

export function isScannableTextPath(path) {
  const normalized = path.replaceAll('\\', '/');
  return textExtensions.has(extname(normalized).toLowerCase()) || /(?:^|\/)\.env(?:\.|$)/u.test(normalized);
}

export function scanText(path, text) {
  const normalized = path.replaceAll('\\', '/');
  const findings = [];
  for (const pattern of secretPatterns) if (pattern.test(text)) findings.push(`${normalized}: credential-shaped value`);
  if (/^(?:card|dist|release|src)\//u.test(normalized) && endpointPattern.test(text)) findings.push(`${normalized}: runtime provider endpoint`);
  if (/^(?:dist|release)\//u.test(normalized) && (/(?:^|\/)(?:tools?|scripts?)(?:\/|$)/iu.test(normalized) || /\.(?:bat|cmd|ps1|py|sh)$/iu.test(normalized))) {
    findings.push(`${normalized}: generation tool in web release`);
  }
  return [...new Set(findings)];
}
