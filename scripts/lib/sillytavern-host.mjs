import { existsSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';

export const DEFAULT_SILLYTAVERN_BASE = 'http://127.0.0.1:8911';
export const DEFAULT_SILLYTAVERN_PORT = 8911;

export function buildSillyTavernChildEnv(env = process.env) {
  const childEnv = { ...env, NODE_ENV: 'production' };
  for (const key of Object.keys(childEnv)) {
    if (/^CODEBUDDY_SAFE_DELETE_/u.test(key)) delete childEnv[key];
  }
  if (typeof childEnv.NODE_OPTIONS === 'string') {
    const options = tokenizeNodeOptions(childEnv.NODE_OPTIONS);
    const retained = [];
    for (let index = 0; index < options.length; index += 1) {
      const option = options[index];
      if (/^(?:--require=|-r=)/u.test(option)
        && isSafeDeletePreload(option.slice(option.indexOf('=') + 1))) continue;
      if ((option === '--require' || option === '-r') && isSafeDeletePreload(options[index + 1])) {
        index += 1;
        continue;
      }
      retained.push(option);
    }
    if (retained.length > 0) childEnv.NODE_OPTIONS = retained.join(' ');
    else delete childEnv.NODE_OPTIONS;
  }
  return childEnv;
}

function isSafeDeletePreload(value) {
  return /genie-safe-delete\.cjs$/iu.test(String(value ?? ''));
}

function tokenizeNodeOptions(value) {
  const tokens = [];
  let token = '';
  let quote;
  for (const character of String(value)) {
    if (quote) {
      if (character === quote) quote = undefined;
      else token += character;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (/\s/u.test(character)) {
      if (token) {
        tokens.push(token);
        token = '';
      }
    } else token += character;
  }
  if (token) tokens.push(token);
  return tokens;
}

export function isLocalSillyTavernBase(base) {
  return /^https?:\/\/(?:127\.0\.0\.1|localhost|\[::1\])(?::\d+)?(?:\/|$)/iu.test(String(base));
}

export function parseSillyTavernBase(value = DEFAULT_SILLYTAVERN_BASE) {
  const base = String(value).replace(/\/+$/u, '');
  if (!isLocalSillyTavernBase(base)) throw new Error(`SillyTavern base must be local: ${base}`);
  let url;
  try { url = new URL(base); } catch { throw new Error(`Invalid SillyTavern base: ${base}`); }
  const port = url.port ? Number(url.port) : url.protocol === 'https:' ? 443 : 80;
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error(`Invalid SillyTavern port: ${url.port}`);
  return { base, host: url.hostname, port };
}

export function discoverSillyTavernRoot({ env = process.env, candidates = defaultRootCandidates() } = {}) {
  const configured = env.SILLYTAVERN_ROOT ? [env.SILLYTAVERN_ROOT] : [];
  const roots = [...configured, ...candidates].filter(Boolean).map((candidate) => resolve(candidate));
  const seen = new Set();
  for (const root of roots) {
    const key = root.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (existsSync(resolve(root, 'server.js'))) return root;
  }
  return undefined;
}

export function discoverTavernForgeRoot({ env = process.env, candidates = defaultForgeCandidates() } = {}) {
  const configured = env.TAVERN_FORGE_ROOT ? [env.TAVERN_FORGE_ROOT] : [];
  const roots = [...configured, ...candidates].filter(Boolean).map((candidate) => resolve(candidate));
  const seen = new Set();
  for (const root of roots) {
    const key = root.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (existsSync(resolve(root, 'scripts', 'st-verify.mjs'))) return root;
  }
  return undefined;
}

export function buildSillyTavernInstallPlan({ projectRoot, base = DEFAULT_SILLYTAVERN_BASE, dataRoot, cardPath, tavernRoot, forgeRoot } = {}) {
  const root = resolve(projectRoot ?? process.cwd());
  const parsedBase = parseSillyTavernBase(base);
  const resolvedTavernRoot = tavernRoot ? resolve(tavernRoot) : discoverSillyTavernRoot();
  const resolvedForgeRoot = forgeRoot ? resolve(forgeRoot) : discoverTavernForgeRoot();
  const resolvedDataRoot = resolve(dataRoot ?? resolve(root, '.verification', `sillytavern-data-${parsedBase.port}`));
  const resolvedCardPath = resolve(cardPath ?? resolve(root, 'card', 'albina.card.png'));
  const serverPath = resolvedTavernRoot ? resolve(resolvedTavernRoot, 'server.js') : undefined;
  const forgeVerifierPath = resolvedForgeRoot ? resolve(resolvedForgeRoot, 'scripts', 'st-verify.mjs') : undefined;
  const command = [
    `$env:SILLYTAVERN_ROOT='${escapePowerShell(resolvedTavernRoot ?? '<path-to-SillyTavern>')}'`,
    `$env:TAVERN_FORGE_ROOT='${escapePowerShell(resolvedForgeRoot ?? '<path-to-tavern-forge>')}'`,
    `node scripts/verify-sillytavern-import.mjs --base ${parsedBase.base} --data-root '${escapePowerShell(resolvedDataRoot)}' --keep-running`,
  ].join('; ');
  return {
    base: parsedBase.base,
    port: parsedBase.port,
    projectRoot: root,
    tavernRoot: resolvedTavernRoot,
    serverPath,
    forgeRoot: resolvedForgeRoot,
    forgeVerifierPath,
    dataRoot: resolvedDataRoot,
    cardPath: resolvedCardPath,
    command,
    ready: Boolean(serverPath && forgeVerifierPath
      && existsSync(serverPath)
      && existsSync(forgeVerifierPath)
      && existsSync(resolvedCardPath)),
  };
}

export async function probeSillyTavern(base = DEFAULT_SILLYTAVERN_BASE, { fetchImpl = globalThis.fetch, timeoutMs = 3000 } = {}) {
  const parsed = parseSillyTavernBase(base);
  if (typeof fetchImpl !== 'function') return { status: 'offline', base: parsed.base, reason: 'fetch-unavailable' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(`${parsed.base}/csrf-token`, { signal: controller.signal });
    const contentType = response.headers?.get?.('content-type') ?? null;
    return {
      status: response.ok ? 'api-ready' : 'unexpected-response',
      base: parsed.base,
      statusCode: response.status,
      contentType,
      endpoint: `${parsed.base}/csrf-token`,
    };
  } catch (error) {
    return { status: 'offline', base: parsed.base, endpoint: `${parsed.base}/csrf-token`, reason: error?.message ?? String(error) };
  } finally {
    clearTimeout(timer);
  }
}

export function defaultRootCandidates() {
  return [
    'D:/sillytavern/SillyTavernLauncher/SillyTavernLauncher1.3.9/SillyTavern',
    'D:/Downloads/SillyTavern',
  ];
}

function defaultForgeCandidates() {
  const userProfile = process.env.USERPROFILE;
  return userProfile ? [resolve(userProfile, '.agents', 'skills', 'tavern-forge'), resolve(userProfile, '.codex', 'skills', 'tavern-forge')] : [];
}

function escapePowerShell(value) {
  return String(value).replaceAll("'", "''");
}

export function sameResolvedPath(left, right) {
  try { return realpathSync(left).toLowerCase() === realpathSync(right).toLowerCase(); }
  catch { return resolve(left).toLowerCase() === resolve(right).toLowerCase(); }
}
