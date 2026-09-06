import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

interface Card {
  data: {
    extensions: {
      tavern_helper: { scripts: Array<{ enabled: boolean; content: string }> };
    };
  };
}

test('imports the final card script inside a Tavern Helper frame and mounts in the host page', async ({ page }) => {
  const root = process.cwd();
  const card = JSON.parse(await readFile(join(root, 'card/albina.card.json'), 'utf8')) as Card;
  const content = card.data.extensions.tavern_helper.scripts.filter((script) => script.enabled)[0]?.content;
  if (typeof content !== 'string') throw new Error('Final card is missing its enabled Tavern Helper script content.');
  expect(content).toMatch(/^import 'https:\/\/cdn\.jsdelivr\.net\/.+\/albina-classic-loader\.js'\n$/u);

  const requests: string[] = [];
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.route('https://cdn.jsdelivr.net/**', async (route) => {
    const url = new URL(route.request().url());
    const name = url.pathname.split('/').at(-1);
    const files: Record<string, { path: string; contentType: string }> = {
      'albina-classic-loader.js': {
        path: 'dist/albina-galgame-card/source/albina-classic-loader.js',
        contentType: 'application/javascript',
      },
      'albina-source.js': {
        path: 'dist/albina-galgame-card/source/albina-source.js',
        contentType: 'application/javascript',
      },
      'albina-source.css': {
        path: 'dist/albina-galgame-card/source/albina-source.css',
        contentType: 'text/css',
      },
    };
    const file = name ? files[name] : undefined;
    if (!file) return route.abort();
    requests.push(name!);
    await route.fulfill({
      body: await readFile(join(root, file.path)),
      contentType: file.contentType,
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  await page.setContent('<!doctype html><html><head><meta charset="UTF-8"></head><body><main id="sillytavern-host"></main></body></html>');
  const frameHandle = await page.evaluateHandle(() => {
    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.dataset.tavernHelperScriptFrame = 'albina';
    document.body.append(frame);
    return frame;
  });
  const frame = await frameHandle.asElement()?.contentFrame();
  expect(frame).toBeTruthy();
  await frame!.addScriptTag({ type: 'module', content });

  await expect.poll(() => requests).toContain('albina-source.js');
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  const sourceResult = await frame!.evaluate(async () => {
    const loading = (window as unknown as { __albinaV2SourcePromise__?: Promise<unknown> }).__albinaV2SourcePromise__;
    if (!loading) return { ok: false, error: 'missing source promise' };
    try {
      await loading;
      return { ok: true, disabled: Boolean((window as unknown as { __ALBINA_DISABLE_AUTOINSTALL__?: boolean }).__ALBINA_DISABLE_AUTOINSTALL__) };
    } catch (error) {
      return { ok: false, error: String(error) };
    }
  });
  expect(sourceResult).toEqual({ ok: true, disabled: false });

  await expect.poll(() => frame!.evaluate(() => ({
    isChild: window.parent !== window,
    hostLaunchers: window.parent.document.querySelectorAll('[data-albina-launcher]').length,
    frameLaunchers: document.querySelectorAll('[data-albina-launcher]').length,
  }))).toEqual({ isChild: true, hostLaunchers: 1, frameLaunchers: 0 });

  const launcher = page.locator('body > [data-albina-launcher]');
  await expect(launcher).toBeVisible();
  await expect(page.locator('head > link[data-albina-style]')).toHaveCount(1);
  expect(requests.filter((name) => name === 'albina-classic-loader.js')).toHaveLength(1);
  expect(requests.filter((name) => name === 'albina-source.js')).toHaveLength(1);

  // Self-bootstrap: the install path opens the fullscreen app frame without
  // waiting for a launcher click.
  await expect(page.locator('body > iframe[data-albina-shell="v2"]')).toBeVisible();
  await expect(page.locator('iframe[data-albina-shell="v2"] [data-testid="title-screen"]')).toBeVisible();
});
