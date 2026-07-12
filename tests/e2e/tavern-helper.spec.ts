import { expect, test, type Page } from '@playwright/test';

async function installHarness(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const state: Record<string, unknown> = {};
    window.TavernHelper = {
      getChatId: () => 'playwright-chat',
      getVariables: () => state,
      setVariables: (values) => { Object.assign(state, values); },
    };
  });
}

test.beforeEach(async ({ page }) => { await installHarness(page); await page.goto('/'); });

test('imports into a Tavern Helper harness and follows an authoritative route choice', async ({ page }) => {
  await expect(page.getByTestId('title-screen')).toBeVisible();
  await page.getByTestId('new-game').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'opening_001');
  await expect(page.getByTestId('scene-video')).toBeVisible();
  await page.locator('[data-choice-id="enter_white_canvas"]').click();
  await expect(page.getByTestId('choice-result')).toBeVisible();
  await page.getByTestId('choice-result').getByRole('button', { name: '继续' }).click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_001');
  await page.getByRole('button', { name: '快速存档' }).click();
  await page.reload();
  await page.getByTestId('continue-game').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_001');
});

test('opens gallery and settings with honest media controls', async ({ page }) => {
  await page.getByTestId('new-game').click();
  await page.getByRole('button', { name: '图鉴' }).click();
  await expect(page.getByTestId('gallery-screen')).toBeVisible();
  await page.getByRole('button', { name: '返回' }).click();
  await page.reload();
  await page.getByRole('button', { name: '设置' }).click();
  await expect(page.getByText(/8 项等待 Pie/u)).toBeVisible();
  await page.getByLabel(/减少动态效果/u).check();
  await page.getByTestId('autoplay-recovery').click();
});

test('keeps the UI usable offline after first load', async ({ page, context }) => {
  await page.getByTestId('new-game').click();
  await expect.poll(async () => page.getByTestId('scene-video').getAttribute('src'), { timeout: 15_000 }).toMatch(/^blob:/u);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(async () => page.getByTestId('static-fallback').getAttribute('src'), { timeout: 15_000 }).toMatch(/^blob:/u);
  await context.setOffline(true);
  await page.locator('[data-choice-id="enter_rebuild"]').click();
  await expect(page.getByTestId('choice-result')).toBeVisible();
  await expect(page.getByTestId('game-screen')).toBeVisible();
});

test('creates, restores, and deletes a normal save slot with an image thumbnail', async ({ page }) => {
  await page.getByTestId('new-game').click();
  await page.getByTestId('game-saves').click();
  await page.getByTestId('save-slot-1').click();
  const slot = page.locator('[data-save-id="slot-1"]');
  await expect(slot).toBeVisible();
  await expect(slot.locator('img')).toHaveAttribute('src', /^blob:/u);
  await slot.getByRole('button', { name: '读取' }).click();
  await expect(page.getByTestId('game-screen')).toBeVisible();
  await page.getByTestId('game-saves').click();
  await page.locator('[data-save-id="slot-1"]').getByRole('button', { name: '删除' }).click();
  await expect(page.locator('[data-save-id="slot-1"]')).toHaveCount(0);
});

test('wires gallery unlock, special-CG queue, and cached asset URLs', async ({ page }) => {
  await page.getByTestId('new-game').click();
  await expect.poll(async () => page.getByTestId('scene-video').getAttribute('src'), { timeout: 15_000 }).toMatch(/^blob:/u);
  await page.getByRole('button', { name: '图鉴' }).click();
  await expect(page.getByTestId('gallery-screen').locator('img').first()).toHaveAttribute('src', /^blob:/u);
  const queued = await page.evaluate(async () => new Promise<number>((resolve, reject) => {
    const request = indexedDB.open('albina-runtime-v2');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const get = request.result.transaction('specialCg', 'readonly').objectStore('specialCg').get('queue');
      get.onerror = () => reject(get.error);
      get.onsuccess = () => resolve(Array.isArray(get.result) ? get.result.length : 0);
    };
  }));
  expect(queued).toBeGreaterThan(0);
  const portraitCached = await page.evaluate(async () => new Promise<boolean>((resolve, reject) => {
    const request = indexedDB.open('albina-runtime-v2');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const keys = request.result.transaction('assets', 'readonly').objectStore('assets').getAllKeys();
      keys.onerror = () => reject(keys.error);
      keys.onsuccess = () => resolve(keys.result.some((key) => String(key).startsWith('portrait.')));
    };
  }));
  expect(portraitCached).toBe(true);
});

test('mobile users can disable video independently of reduced-motion', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile policy only');
  await expect(page.getByTestId('title-screen')).toBeVisible();
  await page.getByTestId('title-settings').click();
  await page.getByLabel(/启用动画 CG/u).uncheck();
  await page.getByRole('button', { name: '返回' }).click();
  await page.getByTestId('new-game').click();
  await expect(page.getByTestId('scene-video')).toHaveCount(0);
  await expect(page.getByTestId('static-fallback')).toBeVisible();
});

test('mobile and reduced-motion policy use a static fallback instead of scene video', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByTestId('new-game').click();
  await page.locator('[data-choice-id="enter_white_canvas"]').click();
  await page.getByTestId('choice-result').getByRole('button', { name: '继续' }).click();
  for (const choiceId of ['white_touch_boundary', 'white_follow_to_lab']) {
    await page.locator(`[data-choice-id="${choiceId}"]`).click();
    await page.getByTestId('choice-result').getByRole('button', { name: '继续' }).click();
  }
  await expect(page.getByTestId('scene-video')).toHaveCount(0);
  await expect(page.getByTestId('static-fallback')).toBeVisible();
});
