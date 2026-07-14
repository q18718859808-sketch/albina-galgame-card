import { extname } from 'node:path';

const textExtensions = new Set(['.css', '.env', '.html', '.ini', '.js', '.json', '.md', '.mjs', '.mts', '.ps1', '.py', '.sh', '.toml', '.ts', '.tsx', '.txt', '.vue', '.yaml', '.yml']);
const canonicalBase = 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card';
const approvedRemoteScripts = new Set([`${canonicalBase}/source/albina-classic-loader.js`]);
const secretPatterns = [
  /["']?(?:api[_-]?key|authorization|token|secret|credential)["']?\s*[:=][ \t]*["'`](?:bearer\s+)?(?!\$\{|<|your[_-]|example|replace|test|fake|redacted)[a-z0-9._-]{16,}["'`]/iu,
  /(?:^|[\r\n])[ \t]*(?:[A-Z][A-Z0-9_]*(?:KEY|TOKEN|SECRET|CREDENTIAL)|api[_-]?key|authorization)[ \t]*[:=][ \t]*(?!\$\{|<|your[_-]|example|replace|test|fake|redacted)[a-z0-9._-]{16,}[ \t]*(?=$|[\r\n#])/imu,
  /\bbearer\s+(?!\$\{|<|your[_-]|example|replace|test|fake|redacted)[a-z0-9._-]{16,}\b/iu,
  /\bsk-[a-z0-9_-]{20,}\b/iu,
];
const endpointPattern = /(?:api\.pie-xian\.com|closeapi\.top|api\.piapi\.ai|ai\.hhhl\.cc|216\.195\.211\.206(?::8317)?|grok-responses|wallhaven\.cc|corsproxy\.io|api\.allorigins\.win|api\.codetabs\.com|\bhhhlclient\b)/iu;
const generationPattern = /(?:\/v1\/(?:images\/(?:generations|edits)|videos(?:\/|\b)|audio\/speech|music_generation|responses)|\b(?:generateImage|createVideoGeneration|daydream_generate_image|novelai|comfyui)\s*\()/iu;
const remoteScriptPattern = /https?:\/\/[^\s"'`<>()[\]{},;]+\/[^\s"'`<>()[\]{},;]*\.js(?:[?#][^\s"'`<>()[\]{},;]*)?(?=$|[\s"'`<>()[\]{},;])/giu;

export function isScannableTextPath(path) {
  const normalized = path.replaceAll('\\', '/');
  return textExtensions.has(extname(normalized).toLowerCase()) || /(?:^|\/)\.env(?:\.|$)/u.test(normalized);
}

export function scanText(path, text) {
  const normalized = path.replaceAll('\\', '/');
  const findings = [];
  for (const pattern of secretPatterns) if (pattern.test(text)) findings.push(`${normalized}: credential-shaped value`);
  const runtimePath = /^(?:card|dist|public|release|src)\//u.test(normalized);
  if (runtimePath && endpointPattern.test(text)) findings.push(`${normalized}: runtime provider endpoint`);
  if (runtimePath && generationPattern.test(text)) findings.push(`${normalized}: runtime generation API`);
  if (runtimePath) {
    const remoteScripts = text.match(remoteScriptPattern) ?? [];
    if (remoteScripts.some((url) => !approvedRemoteScripts.has(url))) {
      findings.push(`${normalized}: untrusted remote executable JavaScript`);
    }
  }
  if (/^(?:dist|release)\//u.test(normalized) && (/(?:^|\/)(?:tools?|scripts?)(?:\/|$)/iu.test(normalized) || /\.(?:bat|cmd|ps1|py|sh)$/iu.test(normalized))) {
    findings.push(`${normalized}: generation tool in web release`);
  }
  return [...new Set(findings)];
}
