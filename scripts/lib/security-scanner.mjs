import { extname } from 'node:path';

const textExtensions = new Set(['.cjs', '.conf', '.css', '.env', '.html', '.ini', '.js', '.json', '.jsx', '.md', '.mjs', '.mts', '.ps1', '.py', '.sh', '.toml', '.ts', '.tsx', '.txt', '.vue', '.xml', '.yaml', '.yml']);
const canonicalBase = 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.2/dist/albina-galgame-card';
const approvedRemoteScripts = new Set([`${canonicalBase}/source/albina-classic-loader.js`]);
const secretPatterns = [
  /["']?(?:api[_-]?key|authorization|token|secret|credential)["']?\s*[:=][ \t]*["'`](?:bearer\s+)?(?!\$\{|<|your[_-]|example|replace|test|fake|redacted)[a-z0-9._+/=-]{16,}["'`]/iu,
  /(?:^|[\r\n])[ \t]*(?:[A-Z][A-Z0-9_]*(?:KEY|TOKEN|SECRET|CREDENTIAL)|api[_-]?key|authorization)[ \t]*[:=][ \t]*(?!\$\{|<|your[_-]|example|replace|test|fake|redacted)[a-z0-9._+/=-]{16,}[ \t]*(?=$|[\r\n#])/imu,
  /\bbearer\s+(?!\$\{|<|your[_-]|example|replace|test|fake|redacted)[a-z0-9._+/=-]{16,}/iu,
  /\bsk-[a-z0-9_-]{20,}\b/iu,
];
const endpointPattern = /(?:api\.pie-xian\.com|x666\.me|closeapi\.top|api\.piapi\.ai|ai\.hhhl\.cc|216\.195\.211\.206(?::8317)?|grok-responses\.[a-z0-9.-]+|wallhaven\.cc|corsproxy\.io|api\.allorigins\.win|api\.codetabs\.com|\bhhhlclient\b)/iu;
const generationPattern = /(?:\/v1\/(?:images\/(?:generations|edits)|videos(?:\/|\b)|audio\/speech|music_generation|responses)|\b(?:generateImage|createVideoGeneration|daydream_generate_image|novelai|comfyui)\s*\()/iu;
const remoteModulePattern = /(?:https?:)?\/\/[^\s"'`<>()[\]{},;]+\/[^\s"'`<>()[\]{},;]*\.(?:m?js)(?:[?#][^\s"'`<>()[\]{},;]*)?(?=$|[\s"'`<>()[\]{},;])/giu;
const remoteSinkPatterns = [
  /\bimport\s*(?:\(\s*)?["']((?:https?:)?\/\/[^"']+)["']/giu,
  /\b(?:importScripts|Worker|SharedWorker)\s*\(\s*["']((?:https?:)?\/\/[^"']+)["']/giu,
  /\b[a-z_$][\w$]*\.src\s*=\s*["']((?:https?:)?\/\/[^"']+)["']/giu,
  /\b(?:document\.)?createElement\s*\(\s*["']script["']\s*\)\s*\.src\s*=\s*["']((?:https?:)?\/\/[^"']+)["']/giu,
  /\.setAttribute\s*\(\s*["']src["']\s*,\s*["']((?:https?:)?\/\/[^"']+)["']\s*\)/giu,
  /<script\b[^>]*\bsrc\s*=\s*["']((?:https?:)?\/\/[^"']+)["']/giu,
];

export function isScannableTextPath(path) {
  const normalized = path.replaceAll('\\', '/');
  return extname(normalized) === '' || textExtensions.has(extname(normalized).toLowerCase()) || /(?:^|\/)\.env(?:\.|$)/u.test(normalized);
}

function remoteExecutableUrls(text) {
  const normalized = text.replaceAll('\\/', '/');
  const urls = new Set(normalized.match(remoteModulePattern) ?? []);
  for (const pattern of remoteSinkPatterns) {
    for (const match of normalized.matchAll(pattern)) if (match[1]) urls.add(match[1]);
  }
  return [...urls];
}

function isApprovedRemoteScript(url) {
  if (url.startsWith('//')) return false;
  if (approvedRemoteScripts.has(url)) return true;
  const assetPrefix = `${canonicalBase}/assets/`;
  return url.startsWith(assetPrefix) && /\.(?:jpe?g|png|svg|webp|mp3|wav|ogg|mp4|webm)(?:[?#].*)?$/iu.test(url);
}

export function scanText(path, text) {
  const normalized = path.replaceAll('\\', '/');
  const normalizedText = text.replaceAll('\\/', '/');
  const findings = [];
  for (const pattern of secretPatterns) if (pattern.test(text)) findings.push(`${normalized}: credential-shaped value`);
  const runtimePath = /^(?:card|dist|public|release|src)\//iu.test(normalized);
  if (runtimePath && endpointPattern.test(normalizedText)) findings.push(`${normalized}: runtime provider endpoint`);
  if (runtimePath && generationPattern.test(normalizedText)) findings.push(`${normalized}: runtime generation API`);
  if (runtimePath) {
    if (remoteExecutableUrls(text).some((url) => !isApprovedRemoteScript(url))) {
      findings.push(`${normalized}: untrusted remote executable JavaScript`);
    }
  }
  if (/^(?:dist|release)\//iu.test(normalized) && (/(?:^|\/)(?:tools?|scripts?)(?:\/|$)/iu.test(normalized) || /\.(?:bat|cmd|ps1|py|sh)$/iu.test(normalized))) {
    findings.push(`${normalized}: generation tool in web release`);
  }
  if (/^(?:dist|release)\//iu.test(normalized) && /(?:^|\/)sprite-atlas\/_progress\.json$/iu.test(normalized)) {
    findings.push(`${normalized}: production progress in web release`);
  }
  return [...new Set(findings)];
}
