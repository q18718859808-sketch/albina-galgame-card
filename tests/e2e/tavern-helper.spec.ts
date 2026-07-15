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

async function chooseAndContinue(page: Page, choiceId: string, nextSceneId: string): Promise<void> {
  await page.locator(`[data-choice-id="${choiceId}"]`).click();
  await expect(page.getByTestId('choice-result')).toBeVisible();
  await page.getByTestId('choice-result').getByRole('button').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', nextSceneId);
}

async function advanceCanonRecapToAuBoundary(page: Page): Promise<void> {
  const steps = [
    ['canon_recap_9_14', 'canon_recap_continue_9_18', 'canon_recap_9_18'],
    ['canon_recap_9_18', 'canon_recap_continue_9_37', 'canon_recap_9_37'],
    ['canon_recap_9_37', 'canon_recap_continue_albina_fascia', 'canon_recap_albina_fascia'],
    ['canon_recap_albina_fascia', 'canon_recap_continue_9_37_battle', 'canon_recap_9_37_battle'],
    ['canon_recap_9_37_battle', 'canon_recap_continue_9_43', 'canon_recap_9_43_outcome'],
    ['canon_recap_9_43_outcome', 'canon_recap_enter_AU', 'opening_001'],
  ] as const;

  for (const [sceneId, choiceId, nextSceneId] of steps) {
    await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', sceneId);
    await expect(page.locator('[data-choice-id^="enter_"]')).toHaveCount(0);
    await chooseAndContinue(page, choiceId, nextSceneId);
  }

  await expect(page.locator('[data-choice-id^="enter_"]')).toHaveCount(3);
}

test.beforeEach(async ({ page }) => { await installHarness(page); await page.goto('/'); });

test('imports into a Tavern Helper harness and follows an authoritative route choice', async ({ page }) => {
  await expect(page.getByTestId('title-screen')).toBeVisible();
  await page.getByTestId('new-game').click();
  await advanceCanonRecapToAuBoundary(page);
  await expect(page.getByTestId('scene-video')).toHaveCount(0);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
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
  await expect(page.getByText(/运行时不请求媒体生成接口/u)).toBeVisible();
  await expect(page.getByText(/包内配乐.*再分发许可/u)).toBeVisible();
  await page.getByLabel(/减少动态效果/u).check();
  await page.getByTestId('autoplay-recovery').click();
});

test('keeps the UI usable offline after first load', async ({ page, context }) => {
  await page.getByTestId('new-game').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  await chooseAndContinue(page, 'white_touch_boundary', 'white_canvas_002');
  await chooseAndContinue(page, 'white_follow_to_lab', 'white_canvas_003');
  await expect.poll(async () => page.getByTestId('scene-video').getAttribute('src'), { timeout: 15_000 }).toMatch(/^blob:/u);
  await context.setOffline(true);
  await chooseAndContinue(page, 'white_sign_witness_protocol', 'white_canvas_004');
  await expect.poll(async () => page.getByTestId('static-fallback').getAttribute('src'), { timeout: 15_000 }).toMatch(/^blob:/u);
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
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
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
  const videoRequests: string[] = [];
  page.on('request', (request) => { if (request.url().includes('/assets/video/')) videoRequests.push(request.url()); });
  await expect(page.getByTestId('title-screen')).toBeVisible();
  await page.getByTestId('title-settings').click();
  await page.getByLabel(/启用动画 CG/u).uncheck();
  await page.getByRole('button', { name: '返回' }).click();
  await page.getByTestId('new-game').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  await chooseAndContinue(page, 'white_touch_boundary', 'white_canvas_002');
  await chooseAndContinue(page, 'white_follow_to_lab', 'white_canvas_003');
  await expect(page.getByTestId('scene-video')).toHaveCount(0);
  await expect(page.getByTestId('static-fallback')).toBeVisible();
  await page.waitForTimeout(300);
  expect(videoRequests).toEqual([]);
});

test('mobile and reduced-motion policy use a static fallback instead of scene video', async ({ page }) => {
  const videoRequests: string[] = [];
  page.on('request', (request) => { if (request.url().includes('/assets/video/')) videoRequests.push(request.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByTestId('new-game').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  for (const choiceId of ['white_touch_boundary', 'white_follow_to_lab']) {
    const nextSceneId = choiceId === 'white_touch_boundary' ? 'white_canvas_002' : 'white_canvas_003';
    await chooseAndContinue(page, choiceId, nextSceneId);
  }
  await expect(page.getByTestId('scene-video')).toHaveCount(0);
  await expect(page.getByTestId('static-fallback')).toBeVisible();
  expect(videoRequests).toEqual([]);
});

test('enabled video requests only the delivery profile selected for the viewport', async ({ page }, testInfo) => {
  const videoRequests: string[] = [];
  page.on('request', (request) => { if (request.url().includes('/assets/video/')) videoRequests.push(request.url()); });
  await page.getByTestId('new-game').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  await chooseAndContinue(page, 'white_touch_boundary', 'white_canvas_002');
  await chooseAndContinue(page, 'white_follow_to_lab', 'white_canvas_003');
  const video = page.getByTestId('scene-video');
  await expect(video).toBeVisible();
  await expect.poll(() => video.getAttribute('poster')).toMatch(/^blob:/u);
  await expect(page.getByTestId('static-fallback')).toHaveCount(0);
  await expect.poll(() => videoRequests.length).toBeGreaterThan(0);
  const expected = testInfo.project.name === 'desktop' ? '/desktop/white_canvas_scene_3.mp4' : '/runtime/white_canvas_scene_3.mp4';
  const forbidden = testInfo.project.name === 'desktop' ? '/runtime/' : '/desktop/';
  expect(videoRequests.every((url) => url.includes(expected))).toBe(true);
  expect(videoRequests.some((url) => url.includes(forbidden))).toBe(false);
});
