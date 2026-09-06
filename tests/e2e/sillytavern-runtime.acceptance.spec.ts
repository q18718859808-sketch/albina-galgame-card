import { expect, test, type Page } from '@playwright/test';

const tavernUrl = process.env.SILLYTAVERN_E2E_URL;

test.describe('real SillyTavern Albina acceptance', () => {
  test.skip(!tavernUrl, 'Set SILLYTAVERN_E2E_URL after importing the Albina card and selecting it in SillyTavern.');

  async function requireMountedAlbina(page: Page): Promise<ReturnType<Page['locator']>> {
    const launcher = page.locator('[data-albina-launcher]').first();
    if (await launcher.count() > 0) return launcher;
    const diagnosis = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      characterList: document.querySelectorAll('#character_list, .character_select, .character-card, [data-character-id]').length,
      characterNames: Array.from(document.querySelectorAll('[data-character-id], .character_select, .character-card')).slice(0, 20).map((element) => element.textContent?.trim().slice(0, 80)),
      iframes: document.querySelectorAll('iframe').length,
    }));
    throw new Error(`Albina launcher is absent; import/select prerequisite is unmet. ${JSON.stringify(diagnosis)}`);
  }

  test('observes the mounted frontend, player profile write, reload, and unmount cleanup', async ({ page }) => {
    await page.goto(tavernUrl!, { waitUntil: 'domcontentloaded' });
    const launcher = await requireMountedAlbina(page);
    await expect(launcher).toBeVisible();
    // Self-bootstrap opens the app frame on install; tolerate an already-open
    // frontend and just wait for it.
    await expect(page.locator('iframe[data-albina-shell="v2"]')).toBeVisible();

    await page.getByTestId('new-game').click();
    await expect(page.getByTestId('profile-screen')).toBeVisible();
    await page.getByTestId('profile-name').fill('Acceptance Witness');
    await page.getByTestId('profile-address').fill('Witness');
    await page.getByTestId('profile-begin').click();
    await expect(page.getByTestId('game-screen')).toBeVisible();

    const variableState = await page.evaluate(async () => {
      const helper = (window as typeof window & { TavernHelper?: { getVariables?: (options?: unknown) => Promise<Record<string, unknown>> | Record<string, unknown> } }).TavernHelper;
      return helper?.getVariables ? await helper.getVariables({ type: 'chat' }) : null;
    });
    expect(variableState).not.toBeNull();
    expect(variableState).toHaveProperty('albinaPlayerProfileV1');

    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('iframe[data-albina-shell="v2"]')).toBeVisible();

    await page.evaluate(() => window.dispatchEvent(new Event('albina:unmount')));
    await expect(page.locator('iframe[data-albina-shell="v2"]')).toHaveCount(0);
    await expect(page.locator('[data-albina-launcher]')).toHaveCount(0);
  });

  test('uses the pure-text/static path when media is unavailable', async ({ page, context }) => {
    await page.goto(tavernUrl!, { waitUntil: 'domcontentloaded' });
    const launcher = await requireMountedAlbina(page);
    await expect(launcher).toBeVisible();
    await expect(page.locator('iframe[data-albina-shell="v2"]')).toBeVisible();
    await page.getByTestId('new-game').click();
    await page.getByTestId('profile-begin').click();
    await context.setOffline(true);
    await expect(page.getByTestId('game-screen')).toBeVisible();
    await expect(page.getByTestId('dialogue-box')).toBeVisible();
    await expect(page.getByTestId('static-fallback')).toBeVisible();
    await expect(page.getByTestId('game-screen').locator('[data-testid="scene-video"], video')).toHaveCount(0);
  });
});
