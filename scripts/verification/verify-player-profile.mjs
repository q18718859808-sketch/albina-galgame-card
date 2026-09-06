import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const defaultReport = resolve(root, '.verification/player-profile-acceptance.json');

const args = parseArgs(process.argv.slice(2));
const report = {
  schema: 'albina-player-profile-acceptance-v1',
  startedAt: new Date().toISOString(),
  projectRoot: root,
  mode: args.contractOnly ? 'contract-only' : args.tavernUrl ? 'real-tavern-ui' : 'contract-only',
  evidence: {},
  verdict: 'not-run',
};

try {
  report.evidence.contract = await checkContract();
  report.evidence.previousIsolation = await readPreviousIsolation();
  if (args.tavernUrl) report.evidence.tavernUi = await verifyTavernUi(args.tavernUrl);
  else report.evidence.tavernUi = blocked('No --tavern-url supplied; real SillyTavern UI was not exercised.');

  const statuses = collectStatuses(report.evidence);
  report.verdict = statuses.includes('failed') ? 'failed'
    : statuses.includes('blocked') || statuses.includes('unverified') ? 'incomplete'
      : 'passed';
} catch (error) {
  report.verdict = 'failed';
  report.error = error instanceof Error ? error.message : String(error);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  const output = resolve(args.report ?? defaultReport);
  await mkdir(resolve(output, '..'), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(report, null, 2));
  console.error(`[Albina player profile acceptance] report: ${output}`);
}

function parseArgs(argv) {
  const value = (name) => {
    const index = argv.indexOf(name);
    return index >= 0 ? argv[index + 1] : undefined;
  };
  return {
    tavernUrl: value('--tavern-url'),
    report: value('--report'),
    contractOnly: argv.includes('--contract-only'),
    headed: argv.includes('--headed'),
    browserPath: value('--browser-path'),
    timeout: Math.max(5_000, Number(value('--timeout') ?? 30_000)),
  };
}

async function checkContract() {
  const checks = [];
  const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
  const schema = await json('content/worldbook/player-profile-schema-v1.json');
  const initvar = await json('content/worldbook/player-profile-initvar-v1.json');
  const rules = await json('content/worldbook/player-profile-update-rules-v1.json');
  const matrix = await json('content/worldbook/player-profile-runtime-matrix-v1.json');
  const runtime = await json('content/worldbook/player-profile-runtime-v1.json');
  const card = await json('card/albina.card.json');
  const entries = card.data?.character_book?.entries ?? [];
  const fields = schema.fields.map((field) => field.path);

  checks.push(assert('schema-initvar-fields', fields.every((field) => field in initvar.defaults), 'schema fields are covered by InitVar defaults'));
  checks.push(assert('update-rules', rules.rules.length === 3 && rules.rules.every((rule) => rule.target === schema.variableKey), 'three update rules target the profile variable'));
  checks.push(assert('chat-write-contract', matrix.chains.persistence.contract.includes("{ type: 'chat' }"), 'chat-scoped TavernHelper write contract is present'));
  checks.push(assert('ejs-runtime-entry', runtime.content.includes("getvar('albinaPlayerProfileV1'"), 'EJS runtime entry reads the profile variable'));
  checks.push(assert('worldbook-selection-runtime-entry', runtime.content.includes("getvar('albinaWorldbookSelectionV1'"), 'EJS runtime entry reads the selected worldbook package variable'));
  checks.push(assert('sixteen-entries-preserved', entries.length === 16, 'the embedded 16-entry worldbook remains intact'));
  checks.push(assert('optional-tool-boundary', matrix.acceptance.toolCallRequiredForStartup === false, 'tool calling is optional for startup'));
  const hostSource = await readFile(resolve(root, 'src/runtime/default-host.ts'), 'utf8');
  checks.push(assert('fallback-contract', hostSource.includes("albina-player-profile-v1"), 'local profile fallback key is present'));
  checks.push(assert('worldbook-selection-write', hostSource.includes('albinaWorldbookSelectionV1'), 'worldbook selection chat-variable key is present'));
  return { status: checks.every((check) => check.status === 'passed') ? 'passed' : 'failed', checks };
}

async function readPreviousIsolation() {
  const path = resolve(root, '.verification/sillytavern-fresh-run-2/diagnostics.json');
  try {
    const data = JSON.parse(await readFile(path, 'utf8'));
    const live = data.import?.ok === true && data.cdn?.source?.ok === true;
    return {
      status: live ? 'unverified' : 'blocked',
      source: path,
      verdict: data.verdict ?? null,
      scope: 'card import/CDN chain only; diagnostics explicitly require manual UI confirmation',
      checks: [
        { id: 'card-import', status: data.import?.ok === true ? 'passed' : 'failed' },
        { id: 'cdn-chain', status: live ? 'passed' : 'failed' },
        { id: 'profile-ui', status: 'unverified', reason: 'previous diagnostic has no profile form, reload, variable, EJS, fallback, or unload observation' },
      ],
    };
  } catch (error) {
    return blocked(`Previous isolation diagnostic is unavailable: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function verifyTavernUi(baseUrl) {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    return blocked('Playwright package is unavailable; install project dependencies before real UI verification.');
  }
  const browser = await chromium.launch({
    headless: !args.headed,
    ...(args.browserPath
      ? { executablePath: args.browserPath }
      : { channel: process.env.PLAYWRIGHT_CHANNEL ?? 'chrome' }),
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const checks = [];
  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: args.timeout });
    checks.push(await observe('tavern-reachable', async () => {
      const title = await page.title();
      return title.length > 0;
    }, 'SillyTavern page loaded'));

    const launcher = page.locator('[data-albina-launcher]').first();
    checks.push(await observe('card-frontend-mounted', async () => await launcher.count() > 0, 'Albina launcher is present in the real host document'));
    if (await launcher.count() === 0) return { status: 'blocked', checks, reason: 'Card frontend is not mounted in this Tavern page; open/import the Albina character in the browser session and rerun.' };

    await launcher.click();
    const shell = page.locator('[data-albina-shell]').first();
    checks.push(await observe('shell-open', async () => await shell.count() > 0, 'Albina shell opened'));
    if (await shell.count() === 0) return { status: 'failed', checks, reason: 'Launcher exists but did not open the Albina shell.' };

    await page.getByTestId('new-game').click();
    checks.push(await observe('profile-form', async () => await page.getByTestId('profile-screen').count() > 0, 'player profile form is visible'));
    if (await page.getByTestId('profile-screen').count() === 0) return { status: 'failed', checks, reason: 'Profile form did not open.' };

    await page.getByTestId('profile-name').fill('Acceptance Witness');
    await page.getByTestId('profile-address').fill('Witness');
    await page.getByTestId('profile-route').selectOption('ring_conspiracy');
    await page.getByTestId('profile-begin').click();
    checks.push(await observe('game-started', async () => await page.getByTestId('game-screen').count() > 0, 'game started after profile submission'));

    const variableObservation = await observeChatProfile(page);
    checks.push(variableObservation);
    await page.reload({ waitUntil: 'domcontentloaded', timeout: args.timeout });
    checks.push(await observe('reload-restoration-signal', async () => {
      const helper = await discoverHelper(page);
      return helper.hasGetVariables || await page.locator('[data-albina-launcher]').count() > 0;
    }, 'page reload completed and host/profile observation remained available'));

    await page.evaluate(() => window.dispatchEvent(new Event('albina:unmount')));
    checks.push(await observe('unmount-cleanup', async () => await page.locator('[data-albina-shell]').count() === 0 && await page.locator('[data-albina-launcher]').count() === 0, 'Albina shell and launcher were removed after unmount'));
    checks.push({ id: 'ejs-injection', status: 'unverified', reason: 'EJS evaluation is performed by the model context; no public browser DOM signal proves its rendered value.' });
    checks.push({ id: 'fallback', status: 'unverified', reason: 'TavernHelper absence/failure cannot be toggled safely in an already running host session; see standalone fallback spec.' });
    return { status: summarize(checks), checks, host: await discoverHelper(page) };
  } catch (error) {
    checks.push({ id: 'unexpected-error', status: 'failed', reason: error instanceof Error ? error.message : String(error) });
    return { status: 'failed', checks };
  } finally {
    await browser.close();
  }
}

async function observeChatProfile(page) {
  for (const frame of page.frames()) {
    try {
      const observation = await frame.evaluate(async () => {
        const helper = window.TavernHelper;
        const getVariables = typeof helper?.getVariables === 'function'
          ? helper.getVariables.bind(helper)
          : typeof globalThis.getVariables === 'function'
            ? globalThis.getVariables
            : null;
        if (!getVariables) return { available: false, href: location.href };

        const variables = await getVariables({ type: 'chat' });
        const profile = variables?.albinaPlayerProfileV1;
        if (!profile || typeof profile !== 'object') {
          return { available: true, href: location.href, profilePresent: false };
        }
        return {
          available: true,
          href: location.href,
          profilePresent: true,
          // Report only deterministic acceptance values; never export free-text profile fields.
          observed: {
            name: profile.name,
            addressName: profile.addressName,
            routePreference: profile.routePreference,
          },
        };
      });
      if (!observation.available) continue;
      if (!observation.profilePresent) {
        return { id: 'chat-variable-write', status: 'failed', reason: `TavernHelper chat variables were readable in ${observation.href}, but albinaPlayerProfileV1 was absent.` };
      }
      const expected = {
        name: 'Acceptance Witness',
        addressName: 'Witness',
        routePreference: 'ring_conspiracy',
      };
      const matches = Object.entries(expected).every(([key, value]) => observation.observed?.[key] === value);
      return matches
        ? { id: 'chat-variable-write', status: 'passed', description: 'TavernHelper.getVariables({ type: \'chat\' }) returned the submitted deterministic player profile fields.' }
        : { id: 'chat-variable-write', status: 'failed', reason: `Chat profile values did not match the submitted acceptance fixture in ${observation.href}.`, observed: observation.observed };
    } catch (error) {
      // A cross-origin or detached frame is not evidence that the host lacks TavernHelper.
    }
  }
  return { id: 'chat-variable-write', status: 'unverified', reason: 'TavernHelper.getVariables({ type: \'chat\' }) was not callable from any accessible host frame.' };
}

async function discoverHelper(page) {
  const frames = page.frames();
  const observations = [];
  for (const frame of frames) {
    try {
      observations.push(await frame.evaluate(() => ({
        href: location.href,
        hasTavernHelper: typeof window.TavernHelper !== 'undefined',
        hasGetVariables: typeof window.TavernHelper?.getVariables === 'function',
        hasSetVariables: typeof window.TavernHelper?.setVariables === 'function',
        hasIframeGetVariables: typeof (globalThis).getVariables === 'function',
      })));
    } catch { /* cross-origin or detached frame */ }
  }
  return { frames: observations, hasGetVariables: observations.some((item) => item.hasGetVariables || item.hasIframeGetVariables), hasTavernHelper: observations.some((item) => item.hasTavernHelper) };
}

async function observe(id, probe, description) {
  try { return { id, status: (await probe()) ? 'passed' : 'failed', description }; }
  catch (error) { return { id, status: 'failed', reason: error instanceof Error ? error.message : String(error) }; }
}

function assert(id, condition, description) { return { id, status: condition ? 'passed' : 'failed', description }; }
function blocked(reason) { return { status: 'blocked', reason }; }
function summarize(checks) { return checks.some((check) => check.status === 'failed') ? 'failed' : checks.some((check) => ['blocked', 'unverified'].includes(check.status)) ? 'incomplete' : 'passed'; }
function collectStatuses(value) { return Object.values(value ?? {}).flatMap((item) => item && typeof item === 'object' ? [item.status, ...collectStatuses(item.checks)] : []).filter(Boolean); }
