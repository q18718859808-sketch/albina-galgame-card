import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

import { chromium } from '@playwright/test';

function readTag(argv) {
  const index = argv.indexOf('--tag');
  if (index !== -1) {
    if (!argv[index + 1] || argv[index + 1].startsWith('--')) throw new Error('--tag requires a value.');
    return argv[index + 1];
  }
  const inline = argv.find((value) => value.startsWith('--tag='));
  return inline?.slice('--tag='.length);
}

const tag = readTag(process.argv.slice(2)) ?? process.env.ALBINA_CDN_TAG ?? 'v2.0.0';
if (!/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u.test(tag)) {
  throw new Error(`Invalid CDN tag '${tag}'. Expected a version tag such as v2.0.0.`);
}
const releasePrefix = `https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@${tag}/`;
const card = JSON.parse(await readFile('card/albina.card.json', 'utf8'));
const content = card.data.extensions.tavern_helper.scripts.find((script) => script.enabled)?.content;
const expectedImport = `import '${releasePrefix}dist/albina-galgame-card/source/albina-classic-loader.js'\n`;
if (content !== expectedImport) {
  throw new Error('The final card is missing its direct Tavern Helper CDN import.');
}

function configuredProxy() {
  const value = process.env.ALBINA_PROXY
    ?? execFileSync('git', ['config', '--get', 'http.proxy'], { encoding: 'utf8' }).trim();
  return value ? { server: value } : undefined;
}

async function verifyProfile(browser, profile) {
  const context = await browser.newContext(profile.use);
  const page = await context.newPage();
  const errors = [];
  const responses = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('response', (response) => {
    if (response.url().startsWith(releasePrefix)) {
      responses.push({ url: response.url(), status: response.status(), type: response.headers()['content-type'] ?? '' });
    }
  });
  await page.setContent('<!doctype html><html><head><meta charset="UTF-8"></head><body><main id="sillytavern-host"></main></body></html>');
  const handle = await page.evaluateHandle(() => {
    const frame = document.createElement('iframe');
    frame.hidden = true;
    document.body.append(frame);
    return frame;
  });
  const frame = await handle.asElement()?.contentFrame();
  if (!frame) throw new Error(`${profile.name}: Tavern Helper frame was not created`);
  await frame.addScriptTag({ type: 'module', content });
  await page.waitForSelector('body > [data-albina-launcher]', { state: 'visible', timeout: 60_000 });
  await page.waitForFunction(() => Boolean(document.querySelector('link[data-albina-style]')?.sheet), null, { timeout: 60_000 });
  const mount = await frame.evaluate(() => ({
    parentLauncher: window.parent.document.querySelectorAll('[data-albina-launcher]').length,
    frameLauncher: document.querySelectorAll('[data-albina-launcher]').length,
    parentStyle: window.parent.document.querySelectorAll('link[data-albina-style]').length,
  }));
  await page.click('body > [data-albina-launcher]');
  await page.waitForSelector('body > [data-albina-shell] [data-testid="title-screen"]', { state: 'visible', timeout: 60_000 });
  await page.waitForLoadState('networkidle', { timeout: 60_000 });
  if (mount.parentLauncher !== 1 || mount.frameLauncher !== 0 || mount.parentStyle !== 1) {
    throw new Error(`${profile.name}: incorrect host mount ${JSON.stringify(mount)}`);
  }
  for (const name of ['albina-classic-loader.js', 'albina-source.js', 'albina-source.css']) {
    const response = responses.find((entry) => new URL(entry.url).pathname.endsWith(`/${name}`));
    if (!response || response.status !== 200) throw new Error(`${profile.name}: ${name} did not return HTTP 200`);
  }
  if (errors.length) throw new Error(`${profile.name}: ${errors.join(' | ')}`);
  await context.close();
  return { profile: profile.name, mount, responses };
}

const browser = await chromium.launch({ headless: true, channel: 'chrome', proxy: configuredProxy() });
try {
  const results = [];
  for (const profile of [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true } },
  ]) {
    results.push(await verifyProfile(browser, profile));
  }
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
