import { execFile, spawn } from 'node:child_process';
import { closeSync, openSync } from 'node:fs';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { promisify } from 'node:util';

import { readCharacterCardPng } from './lib/character-card-png.mjs';
import {
  buildSillyTavernChildEnv,
  buildSillyTavernInstallPlan,
  parseSillyTavernBase,
  probeSillyTavern,
} from './lib/sillytavern-host.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const cardPath = resolve(projectRoot, 'card/albina.card.png');
const run = promisify(execFile);

const options = parseArgs(process.argv.slice(2));
const baseConfig = parseSillyTavernBase(options.base);
const installPlan = buildSillyTavernInstallPlan({
  projectRoot,
  base: baseConfig.base,
  dataRoot: options.dataRoot,
  cardPath,
});
const { base, port } = baseConfig;
const { dataRoot, forgeRoot, tavernRoot } = installPlan;
const diagnosticsPath = resolve(options.diagnostics ?? resolve(dataRoot, 'albina-import-diagnostics.json'));
const startedLog = resolve(dataRoot, 'sillytavern.stdout.log');
const errorLog = resolve(dataRoot, 'sillytavern.stderr.log');

await mkdir(dataRoot, { recursive: true });
const diagnostics = {
  schema: 'albina-sillytavern-import-diagnostics-v1',
  startedAt: new Date().toISOString(),
  project: {
    cardPath,
    forgeRoot: forgeRoot ?? null,
    tavernRoot: tavernRoot ?? null,
    localEntrypoint: installPlan,
  },
  instance: { base, port, dataRoot, reused: false, started: false, pid: null, hostProbe: null },
  card: { path: cardPath, script: null },
  cdn: { loader: null, source: null },
  import: { attempted: false, ok: false, output: '', error: null, character: null },
  runtime: { status: 'blocked', checks: [], browser: null },
  verdict: 'not-run',
};

try {
  const card = readCharacterCardPng(await readFile(cardPath));
  const expectedEntries = card?.data?.character_book?.entries;
  diagnostics.card.staticWorldbookEntries = Array.isArray(expectedEntries) ? expectedEntries.length : 0;
  if (diagnostics.card.staticWorldbookEntries !== 16) {
    throw new Error(`Card static worldbook must contain exactly 16 entries; found ${diagnostics.card.staticWorldbookEntries}.`);
  }
  const script = card?.data?.extensions?.tavern_helper?.scripts?.find((item) => item?.enabled && item?.content);
  const cdnUrl = extractImportUrl(script?.content);
  diagnostics.card.script = {
    present: Boolean(script),
    name: script?.name ?? null,
    id: script?.id ?? null,
    enabled: script?.enabled ?? false,
    contentShape: script?.content ? 'single-static-import' : 'missing',
    cdnUrl: cdnUrl ?? null,
  };
  if (!script || !cdnUrl) throw new Error('Card does not contain an enabled TavernHelper CDN import script.');

  const loaderProbe = await probeModule(cdnUrl, 'loader');
  diagnostics.cdn.loader = loaderProbe.result;
  if (loaderProbe.result.ok) {
    const sourceUrl = resolveRelativeModuleUrl(cdnUrl, loaderProbe.body);
    diagnostics.cdn.loader.sourceUrl = sourceUrl;
    diagnostics.cdn.source = (await probeModule(sourceUrl, 'source')).result;
  }

  await ensureSillyTavern(diagnostics);
  if (!forgeRoot) throw new Error(`${missingForgeMessage()}`);
  await access(resolve(forgeRoot, 'scripts/st-verify.mjs'));
  diagnostics.import.attempted = true;
  try {
    const result = await run(process.execPath, ['scripts/st-verify.mjs', '--base', base, cardPath], {
      cwd: forgeRoot, timeout: 120_000, windowsHide: true,
    });
    diagnostics.import.ok = true;
    diagnostics.import.output = redact(result.stdout + result.stderr);
    diagnostics.import.character = await verifyImportedCharacter(expectedEntries);
    diagnostics.runtime = await verifyRuntimeUi(diagnostics.import.character?.character?.avatar);
    process.stdout.write(result.stdout);
    process.stderr.write(result.stderr);
  } catch (error) {
    diagnostics.import.output = redact(error?.stdout ?? '');
    diagnostics.import.error = redact(error?.stderr || error?.message || String(error));
    throw error;
  }

  diagnostics.verdict = summarizeVerdict(diagnostics);
} catch (error) {
  diagnostics.verdict = diagnostics.import.ok ? 'import-ok-diagnostic-failed' : 'failed';
  diagnostics.error = redact(error?.message || String(error));
  process.exitCode = 1;
} finally {
  diagnostics.finishedAt = new Date().toISOString();
  await writeFile(diagnosticsPath, `${JSON.stringify(diagnostics, null, 2)}\n`, 'utf8');
  console.error(`[Albina ST verify] diagnostic: ${diagnosticsPath}`);
  if (diagnostics.instance.started && !options.keepRunning) {
    console.error('[Albina ST verify] isolated instance was started detached; stop it explicitly when finished.');
  }
  if (diagnostics.verdict === 'failed' && diagnostics.error) {
    console.error(`[Albina ST verify] ${diagnostics.error}`);
    console.error(`[Albina ST verify] local entrypoint: ${diagnostics.project.localEntrypoint.command}`);
  }
}

function parseArgs(argv) {
  const value = (flag, fallback) => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] ?? fallback : fallback;
  };
  const portValue = Number(value('--port', '8911'));
  if (!Number.isInteger(portValue) || portValue < 1024 || portValue > 65535) throw new Error('Invalid --port.');
  return {
    base: value('--base', `http://127.0.0.1:${portValue}`),
    dataRoot: value('--data-root'),
    diagnostics: value('--diagnostics'),
    keepRunning: argv.includes('--keep-running'),
    noStart: argv.includes('--no-start'),
    headed: argv.includes('--headed'),
    browserPath: value('--browser-path'),
    retries: Math.max(1, Math.min(5, Number(value('--retries', '3')) || 3)),
    skipBrowser: argv.includes('--skip-browser'),
  };
}

async function ensureSillyTavern(state) {
  const initialProbe = await probeSillyTavern(base);
  state.instance.hostProbe = initialProbe;
  if (initialProbe.status === 'api-ready') {
    state.instance.reused = true;
    return;
  }
  if (options.noStart) throw new Error(`SillyTavern is offline at ${base} and --no-start was supplied.`);
  if (!tavernRoot) {
    throw new Error(`No local SillyTavern server.js was found. ${missingTavernMessage()}`);
  }
  await access(resolve(tavernRoot, 'server.js'));
  const stdout = openSync(startedLog, 'a');
  const stderr = openSync(errorLog, 'a');
  const child = spawn(process.execPath, [
    'server.js', '--dataRoot', dataRoot, '--port', String(port), '--browserLaunchEnabled', 'false',
  ], { cwd: tavernRoot, detached: true, stdio: ['ignore', stdout, stderr], windowsHide: true, env: buildSillyTavernChildEnv() });
  closeSync(stdout);
  closeSync(stderr);
  child.unref();
  state.instance.started = true;
  state.instance.pid = child.pid ?? null;
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    const probe = await probeSillyTavern(base);
    state.instance.hostProbe = probe;
    if (probe.status === 'api-ready') return;
    await new Promise((resolve_) => setTimeout(resolve_, 1_000));
  }
  throw new Error(`Timed out starting isolated SillyTavern at ${base}; see ${errorLog}`);
}

async function verifyImportedCharacter(expectedEntries) {
  const session = await createSession();
  const response = await fetch(`${base}/api/characters/all`, { method: 'POST', headers: { ...session.headers, 'Content-Type': 'application/json' }, body: '{}' });
  if (!response.ok) throw new Error(`Unable to inspect imported characters: HTTP ${response.status}.`);
  const characters = await response.json();
  const candidates = Array.isArray(characters) ? characters.filter((item) => {
    const name = String(item?.name ?? '').toLowerCase();
    return name.includes('albina') || name.includes('阿尔比娜') || Array.isArray(item?.data?.character_book?.entries) && item.data.character_book.entries.length === 16;
  }) : [];
  // Repeated acceptance runs leave older Albina imports in the isolated
  // instance. Prefer the candidate that actually carries the full static
  // book; selecting the lexical last item can pick an older 15-entry card.
  const character = candidates.find((item) => Array.isArray(item?.data?.character_book?.entries)
    && item.data.character_book.entries.length === 16) ?? candidates.at(-1);
  const entries = character?.data?.character_book?.entries;
  const count = Array.isArray(entries) ? entries.length : 0;
  const checks = [
    { id: 'imported-character-found', status: character ? 'passed' : 'failed', detail: character?.avatar ?? null },
    { id: 'sixteen-worldbook-entries-landed', status: count === 16 ? 'passed' : 'failed', expected: 16, actual: count },
    { id: 'worldbook-entry-order-preserved', status: sameEntryIds(expectedEntries, entries) ? 'passed' : 'failed' },
  ];
  if (checks.some((check) => check.status === 'failed')) throw new Error(`Imported character verification failed: ${JSON.stringify(checks)}.`);
  return { status: 'passed', character: { name: character.name, avatar: character.avatar }, checks };
}

async function createSession() {
  const response = await fetch(`${base}/csrf-token`);
  if (!response.ok) throw new Error(`SillyTavern CSRF endpoint returned HTTP ${response.status}.`);
  const cookies = response.headers.getSetCookie?.() ?? [];
  const json = await response.json();
  return { headers: { 'X-CSRF-Token': json.token, Cookie: cookies.map((cookie) => cookie.split(';')[0]).join('; ') } };
}

function sameEntryIds(expected, actual) {
  if (!Array.isArray(expected) || !Array.isArray(actual) || expected.length !== actual.length) return false;
  const id = (entry) => entry?.extensions?.entry_id ?? entry?.uid ?? entry?.comment ?? null;
  return expected.every((entry, index) => id(entry) === id(actual[index]));
}

async function verifyRuntimeUi(importedAvatar) {
  if (options.skipBrowser) return { status: 'blocked', reason: '--skip-browser supplied', checks: [] };
  let chromium;
  try { ({ chromium } = await import('playwright')); }
  catch { return { status: 'blocked', reason: 'Playwright is unavailable; API import was verified but the real UI was not exercised.', checks: [] }; }
  let browser;
  try {
    browser = await chromium.launch({
      ...browserLaunchOptions(),
      handleSIGINT: false,
      handleSIGTERM: false,
      handleSIGHUP: false,
    });
  } catch (error) {
    return { status: 'blocked', reason: `Playwright browser is unavailable: ${error?.message ?? String(error)}`, checks: [] };
  }
  const page = await browser.newPage();
  const checks = [];
  const browserEvidence = { consoleErrors: [], pageErrors: [], localCdnReplay: false };
  page.on('console', (message) => {
    if (message.type() === 'error') browserEvidence.consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => browserEvidence.pageErrors.push(error.message));
  try {
    await installLocalCdnReplay(page, browserEvidence);
    await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.locator('#loader').waitFor({ state: 'hidden', timeout: 30_000 }).catch(() => {});
    checks.push(await uiCheck('tavern-page-reachable', () => page.title().then((title) => Boolean(title)), 'SillyTavern page is reachable'));
    const selection = await selectImportedCharacter(page, importedAvatar);
    checks.push(selection.check);
    if (selection.check.status !== 'passed') {
      checks.push({ id: 'card-frontend-mounted', status: 'unverified', reason: 'Requires the newly imported character to be selected in the SillyTavern character list.' });
      checks.push({ id: 'player-profile-and-chat-variable', status: 'unverified', reason: 'Requires a mounted Albina frontend.' });
      checks.push({ id: 'reload-restoration', status: 'unverified', reason: 'Requires a mounted Albina frontend.' });
      checks.push({ id: 'unmount-cleanup', status: 'unverified', reason: 'Requires a mounted Albina frontend.' });
      checks.push({ id: 'pure-text-fallback', status: 'unverified', reason: 'Requires an observable card runtime with media disabled.' });
      return { status: summarizeChecks(checks), checks, browserEvidence, page: { url: page.url(), title: await page.title() } };
    }
    await page.waitForTimeout(750);
    const launcher = page.locator('[data-albina-launcher]').first();
    checks.push(await uiCheck('card-frontend-mounted', () => launcher.count().then(Boolean), 'Albina launcher is present after selecting the imported character'));
    if (await launcher.count() > 0) {
      await launcher.click();
      checks.push(await uiCheck('albina-shell-open', () => page.locator('[data-albina-shell]').count().then(Boolean), 'Albina frontend shell opened'));
      checks.push(await verifyProfileChatVariable(page));
      checks.push(await verifyPureTextFallback(page));
      await page.context().setOffline(false);
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 30_000 });
      const reloadSelection = await selectImportedCharacter(page, importedAvatar);
      checks.push({ id: 'reload-character-selection', ...reloadSelection.check });
      await page.waitForTimeout(750);
      checks.push(await uiCheck('reload-restoration', () => page.locator('[data-albina-launcher]').count().then(Boolean), 'Albina launcher returned after reload and reselecting the imported character'));
      await page.evaluate(() => window.dispatchEvent(new Event('albina:unmount')));
      checks.push(await uiCheck('unmount-cleanup', () => Promise.all([page.locator('[data-albina-shell]').count(), page.locator('[data-albina-launcher]').count()]).then(([shell, button]) => shell === 0 && button === 0), 'Albina frontend unmounted cleanly'));
    } else {
      checks.push({ id: 'player-profile-and-chat-variable', status: 'unverified', reason: 'The imported character was selected but the Albina launcher was not observed.' });
      checks.push({ id: 'reload-restoration', status: 'unverified', reason: 'Requires a mounted Albina frontend.' });
      checks.push({ id: 'unmount-cleanup', status: 'unverified', reason: 'Requires a mounted Albina frontend.' });
      checks.push({ id: 'pure-text-fallback', status: 'unverified', reason: 'Requires an observable card runtime with media disabled.' });
    }
    return { status: summarizeChecks(checks), checks, browserEvidence, page: { url: page.url(), title: await page.title() } };
  } catch (error) {
    checks.push({ id: 'tavern-ui-error', status: 'failed', reason: error?.message ?? String(error) });
    return { status: 'failed', checks, browserEvidence };
  } finally {
    try { await browser.close(); } catch (error) { browserEvidence.closeError = error?.message ?? String(error); }
  }
}

async function installLocalCdnReplay(page, evidence) {
  const sourceRoot = resolve(projectRoot, 'dist/albina-galgame-card/source');
  await page.route('https://cdn.jsdelivr.net/**', async (route) => {
    const url = new URL(route.request().url());
    const marker = '/dist/albina-galgame-card/source/';
    const index = url.pathname.indexOf(marker);
    if (index < 0) return route.continue();
    const relativePath = url.pathname.slice(index + marker.length);
    if (!/^[A-Za-z0-9._-]+$/u.test(relativePath)) return route.continue();
    try {
      const body = await readFile(resolve(sourceRoot, relativePath));
      const contentType = relativePath.endsWith('.css') ? 'text/css' : 'application/javascript';
      evidence.localCdnReplay = true;
      await route.fulfill({ body, contentType, headers: { 'access-control-allow-origin': '*' } });
    } catch {
      await route.continue();
    }
  });
}

function browserLaunchOptions() {
  const executablePath = options.browserPath ?? process.env.PLAYWRIGHT_BROWSER_PATH;
  if (executablePath) return { headless: !options.headed, executablePath };
  if (process.env.PLAYWRIGHT_CHANNEL) return { headless: !options.headed, channel: process.env.PLAYWRIGHT_CHANNEL };
  return { headless: !options.headed, channel: 'chrome' };
}

async function selectImportedCharacter(page, importedAvatar) {
  if (!importedAvatar) return { check: { id: 'imported-character-selection', status: 'unverified', reason: 'Import did not report an avatar filename.' } };
  // A fresh SillyTavern data root can leave its startup/update dialog open
  // after #loader is hidden. Dismiss it before clicking the character drawer.
  for (let attempt = 0; attempt < 3 && await page.locator('dialog[open]:visible').count(); attempt += 1) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
  }
  const drawer = page.locator('#rightNavDrawerIcon:visible').first();
  if (await page.locator('.character_select:visible').count() === 0 && await drawer.count()) {
    await drawer.click();
    await page.waitForTimeout(750);
  }
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    const candidates = page.locator('.character_select');
    const count = await candidates.count();
    for (let index = 0; index < count; index += 1) {
      const candidate = candidates.nth(index);
      const match = await candidate.evaluate((element, avatar) => {
        const values = [
          element.getAttribute('avatar'), element.getAttribute('data-avatar'), element.getAttribute('chid'),
          element.querySelector('img')?.getAttribute('src'), element.querySelector('.ch_name')?.textContent,
          element.getAttribute('title'),
        ].filter(Boolean).map((value) => String(value));
        return values.some((value) => value.includes(String(avatar)) || value.includes(decodeURIComponent(String(avatar))));
      }, importedAvatar);
      if (match) {
        await candidate.click();
        return { check: { id: 'imported-character-selection', status: 'passed', detail: importedAvatar } };
      }
    }
    await page.waitForTimeout(500);
  }
  const albina = page.locator('.character_select:visible').filter({ hasText: '阿尔比娜' }).first();
  if (await albina.count()) {
    await albina.scrollIntoViewIfNeeded();
    await albina.click();
    return { check: { id: 'imported-character-selection', status: 'passed', detail: 'matched Albina by character name fallback' } };
  }
  return { check: { id: 'imported-character-selection', status: 'unverified', reason: `No visible character card matched imported avatar ${importedAvatar}.` } };
}

async function verifyPureTextFallback(page) {
  const context = page.context();
  try {
    await context.setOffline(true);
    const gameScreen = page.getByTestId('game-screen');
    const dialogue = page.getByTestId('dialogue-box');
    const fallback = page.getByTestId('static-fallback');
    await gameScreen.waitFor({ state: 'visible', timeout: 10_000 });
    await dialogue.waitFor({ state: 'visible', timeout: 10_000 });
    await fallback.waitFor({ state: 'visible', timeout: 10_000 });
    const videoCount = await gameScreen.locator('[data-testid="scene-video"], video').count();
    return videoCount === 0
      ? { id: 'pure-text-fallback', status: 'passed', detail: 'Game screen and dialogue remain usable offline with a static media fallback and no video element.' }
      : { id: 'pure-text-fallback', status: 'failed', reason: `Unexpected video elements remained in offline mode: ${videoCount}.` };
  } catch (error) {
    return { id: 'pure-text-fallback', status: 'failed', reason: error?.message ?? String(error) };
  } finally {
    await context.setOffline(false).catch(() => {});
  }
}

async function verifyProfileChatVariable(page) {
  const newGame = page.getByTestId('new-game');
  if (await newGame.count() === 0) return { id: 'player-profile-and-chat-variable', status: 'unverified', reason: 'Mounted frontend did not expose the new-game control.' };
  await newGame.click();
  const profile = page.getByTestId('profile-screen');
  if (await profile.count() === 0) return { id: 'player-profile-and-chat-variable', status: 'failed', reason: 'New game did not show the player profile screen.' };
  await page.getByTestId('profile-name').fill('Acceptance Witness');
  await page.getByTestId('profile-address').fill('Witness');
  await page.getByTestId('profile-route').selectOption('ring_conspiracy');
  await page.getByTestId('profile-begin').click();
  const observation = await readChatProfile(page);
  const expected = { name: 'Acceptance Witness', addressName: 'Witness', routePreference: 'ring_conspiracy' };
  const matches = observation.profile && Object.entries(expected).every(([key, value]) => observation.profile[key] === value);
  return matches
    ? { id: 'player-profile-and-chat-variable', status: 'passed', detail: 'Submitted profile was written to TavernHelper chat variables.' }
    : { id: 'player-profile-and-chat-variable', status: observation.available ? 'failed' : 'unverified', reason: observation.available ? 'TavernHelper chat variables did not contain the submitted profile.' : 'TavernHelper.getVariables({ type: chat }) was not accessible from the host page.' };
}

async function readChatProfile(page) {
  return page.evaluate(async () => {
    const helper = window.TavernHelper;
    const getVariables = typeof helper?.getVariables === 'function'
      ? helper.getVariables.bind(helper)
      : typeof globalThis.getVariables === 'function' ? globalThis.getVariables : undefined;
    if (!getVariables) return { available: false };
    const variables = await getVariables({ type: 'chat' });
    const profile = variables?.albinaPlayerProfileV1;
    return { available: true, profile: profile && typeof profile === 'object' ? {
      name: profile.name, addressName: profile.addressName, routePreference: profile.routePreference,
    } : undefined };
  });
}

async function uiCheck(id, probe, description) {
  try { return { id, status: (await probe()) ? 'passed' : 'failed', description }; }
  catch (error) { return { id, status: 'failed', reason: error?.message ?? String(error) }; }
}

function summarizeChecks(checks) {
  return checks.some((check) => check.status === 'failed') ? 'failed'
    : checks.some((check) => ['blocked', 'unverified'].includes(check.status)) ? 'incomplete' : 'passed';
}

function summarizeVerdict(state) {
  const checks = [
    state.import.ok ? 'passed' : 'failed',
    state.cdn.loader?.ok && state.cdn.source?.ok ? 'passed' : 'failed',
    state.import.character?.status ?? 'failed',
    state.runtime.status,
  ];
  if (checks.includes('failed')) return 'failed';
  if (checks.some((status) => ['blocked', 'unverified', 'incomplete'].includes(status))) return 'incomplete-runtime-ui';
  return 'passed';
}

function missingForgeMessage() {
  return `No TavernForge verifier was found. Set TAVERN_FORGE_ROOT to a directory containing scripts/st-verify.mjs, then run: ${installPlan.command}`;
}

function missingTavernMessage() {
  return `Set SILLYTAVERN_ROOT to the directory containing server.js, then run: ${installPlan.command}`;
}

async function probeModule(url, label) {
  let lastError = null;
  for (let attempt = 1; attempt <= options.retries; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: 'follow' });
      const body = await response.text();
      const contentType = response.headers.get('content-type');
      const ok = response.ok && body.length > 0 && /(?:javascript|ecmascript|text\/plain)/iu.test(contentType ?? '');
      if (ok) return {
        body,
        result: { ok: true, label, url, attempts: attempt, status: response.status, contentType, bytes: body.length },
      };
      lastError = `${label} returned ${response.status} ${contentType ?? 'no-content-type'}`;
    } catch (error) { lastError = error?.message || String(error); }
    await new Promise((resolve_) => setTimeout(resolve_, 250 * attempt));
  }
  return { result: { ok: false, label, url, attempts: options.retries, error: lastError } };
}

function resolveRelativeModuleUrl(loaderUrl, body) {
  const match = body.match(/new URL\(['"](\.\/[^'"]+)['"],\s*import\.meta\.url\)/u);
  if (!match) throw new Error('CDN loader did not expose the expected relative source module URL.');
  return new URL(match[1], loaderUrl).href;
}

function extractImportUrl(content) {
  const match = String(content ?? '').match(/^import\s+['"](https:\/\/[^'"]+)['"]\s*$/mu);
  return match?.[1];
}

function redact(value) {
  return String(value ?? '')
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/giu, 'Bearer [REDACTED]')
    .replace(/(?:api[_-]?key|token|authorization)\s*[:=]\s*['"]?[^\s,'"}]+/giu, '$1=[REDACTED]');
}
