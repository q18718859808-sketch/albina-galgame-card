import { expect, test, type Page } from '@playwright/test';

// Long-route specs end on a live WebGL scene. The emulated mobile browser
// renders that atmosphere in software, so context teardown can outlast the
// 30s default; give every spec the same headroom as the explicitly-tuned ones.
test.describe.configure({ timeout: 90_000 });

async function installHarness(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const state: Record<string, unknown> = {};
    Object.defineProperty(window, '__albinaHarnessState', { value: state });
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
  await expect(page.getByTestId('choice-result')).toHaveCount(0);
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

test('collects a sanitized player profile before starting and persists it to chat variables', async ({ page }) => {
  await page.getByTestId('new-game').click();
  await expect(page.getByTestId('profile-screen')).toBeVisible();
  await page.getByTestId('profile-name').fill(' <Morgan> ');
  await page.getByTestId('profile-address').fill('Witness');
  await page.getByTestId('profile-route').selectOption('ring_conspiracy');
  await page.getByTestId('profile-begin').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'canon_recap_9_14');
  await expect(page.getByTestId('route-map')).toBeVisible();
  await expect(page.getByTestId('route-status')).toContainText('junction pending');
  await expect(page.locator('.portrait-slot')).toHaveCount(3);
  await expect(page.getByTestId('scene-atmosphere-mode')).toBeVisible();
  await expect.poll(() => page.evaluate(() => {
    const state = (window as typeof window & { __albinaHarnessState: Record<string, any> }).__albinaHarnessState;
    return state.albinaPlayerProfileV1?.name;
  })).toBe('Morgan');
  await expect.poll(() => page.evaluate(() => {
    const state = (window as typeof window & { __albinaHarnessState: Record<string, any> }).__albinaHarnessState;
    return state.albinaSaveV2?.playerProfile?.routePreference;
  })).toBe('ring_conspiracy');
});

test('imports into a Tavern Helper harness and follows an authoritative route choice', async ({ page }) => {
  // The emulated mobile browser renders the live atmosphere in software; the
  // extra headroom covers both the walked route and the slower context teardown.
  test.setTimeout(90_000);
  await expect(page.getByTestId('title-screen')).toBeVisible();
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await advanceCanonRecapToAuBoundary(page);
  await expect(page.getByTestId('scene-video')).toHaveCount(0);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  await page.getByRole('button', { name: '快速存档' }).click();
  await expect(page.getByTestId('save-status')).toHaveAttribute('data-saving', 'false');
  await page.reload();
  await page.getByTestId('continue-game').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_001');
  // Unload the WebGL scene before the context tears down. The emulated mobile
  // browser renders the live atmosphere in software, so an active rAF loop can
  // otherwise stall the teardown past its 30s deadline.
  await page.goto('about:blank');
});

test('opens gallery and settings with honest media controls', async ({ page }) => {
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await page.getByRole('button', { name: '图鉴' }).click();
  await expect(page.getByTestId('gallery-screen')).toBeVisible();
  await expect(page.getByTestId('gallery-empty')).toBeVisible();
  await page.getByRole('button', { name: '返回' }).click();
  await page.reload();
  await page.getByRole('button', { name: '设置' }).click();
  await expect(page.getByText(/运行时不请求媒体生成接口/u)).toBeVisible();
  await expect(page.getByText(/包内配乐.*再分发许可/u)).toBeVisible();
  await page.getByLabel(/减少动态效果/u).check();
  await page.getByTestId('autoplay-recovery').click();
});

test('exposes the authoritative gameplay state and safe loadout controls', async ({ page }) => {
  test.setTimeout(90_000);
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');

  const hudText = await page.locator('.game-hud__values').textContent();
  const shownTrust = Number(hudText?.match(/信任 (\d+)/u)?.[1]);
  expect(Number.isFinite(shownTrust)).toBe(true);
  await expect(page.locator('.game-hud__values')).toBeVisible();

  const openButton = page.getByTestId('gameplay-open');
  await openButton.click();
  const panel = page.getByTestId('gameplay-panel');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('tab')).toHaveCount(7);
  await expect(page.getByTestId('gameplay-page-status').getByText('信赖')).toBeVisible();
  const trustStat = page.locator('[data-stat-key="trust"]');
  await expect(trustStat).toHaveText(String(shownTrust));
  await expect(trustStat.locator('..')).toContainText(/基础 .*修正 \+/u);

  const statusTab = page.getByTestId('gameplay-tab-status');
  await statusTab.focus();
  await statusTab.press('ArrowRight');
  await expect(page.getByTestId('gameplay-tab-objectives')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-quest-id="quest.white.boundary_protocol"]')).toContainText('进行中');
  await expect(page.locator('[data-battle-id="battle.white.gallery_pressure"]')).toContainText('未解决');

  await page.getByTestId('gameplay-tab-progression').click();
  await expect(page.locator('[data-profession-id="boundary_mediator"]')).toContainText('当前职业');
  await expect(page.locator('[data-achievement-id="ach_au_boundary_witness"]')).toContainText('已解锁');

  await page.getByTestId('gameplay-tab-codex').click();
  await expect(page.locator('[data-worldbook-id="albina_routes_endings_au_if"]')).toContainText(/当前激活|已阅/u);
  const scrolling = await page.locator('.gameplay-panel__content').evaluate((element) => {
    const style = getComputedStyle(element);
    return { overflowY: style.overflowY, scrollHeight: element.scrollHeight, clientHeight: element.clientHeight };
  });
  expect(scrolling.overflowY).toBe('auto');
  expect(scrolling.scrollHeight).toBeGreaterThanOrEqual(scrolling.clientHeight);

  await panel.getByRole('button', { name: '关闭状态档案' }).click();
  await expect(openButton).toBeFocused();
  await chooseAndContinue(page, 'white_touch_boundary', 'white_canvas_002');
  await chooseAndContinue(page, 'white_follow_to_lab', 'white_canvas_003');
  await chooseAndContinue(page, 'white_sign_witness_protocol', 'white_canvas_004');

  await openButton.click();
  await page.getByTestId('gameplay-tab-objectives').click();
  await expect(page.locator('[data-quest-id="quest.white.boundary_protocol"]')).toContainText('已完成');

  await page.getByTestId('gameplay-tab-loadout').click();
  const boundaryCharm = page.locator('[data-equipment-id="equipment.white.boundary_charm"]');
  await expect(boundaryCharm).toContainText('装备中');
  const rainBadge = page.locator('[data-equipment-id="equipment.rain_room_badge"]');
  await rainBadge.getByRole('button', { name: '装备' }).click();
  await expect(rainBadge).toContainText('装备中');

  const rainOutfit = page.locator('[data-outfit-id="outfit.albina.rain"]');
  await rainOutfit.getByRole('button', { name: '更换' }).click();
  await expect(rainOutfit).toContainText('穿着中');

  await page.getByTestId('gameplay-tab-progression').click();
  const curator = page.locator('[data-profession-id="narrative_curator"]');
  await curator.getByRole('button', { name: '设为当前' }).click();
  await expect(curator).toContainText('当前职业');
});

test('keeps the UI usable offline after first load', async ({ page, context }) => {
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  await chooseAndContinue(page, 'white_touch_boundary', 'white_canvas_002');
  await chooseAndContinue(page, 'white_follow_to_lab', 'white_canvas_003');
  await expect.poll(async () => page.getByTestId('static-fallback').getAttribute('src'), { timeout: 15_000 }).toMatch(/^blob:/u);
  await context.setOffline(true);
  await chooseAndContinue(page, 'white_sign_witness_protocol', 'white_canvas_004');
  await expect.poll(async () => page.getByTestId('static-fallback').getAttribute('src'), { timeout: 15_000 }).toMatch(/^blob:/u);
});

test('creates, restores, and deletes a normal save slot with an image thumbnail', async ({ page }) => {
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
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
  await page.getByTestId('profile-begin').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  await page.getByRole('button', { name: '图鉴' }).click();
  const galleryImage = page.getByTestId('gallery-screen').locator('img').first();
  await expect(galleryImage).toHaveAttribute('src', /^blob:/u);
  await page.getByTestId('gallery-grid').getByRole('button').first().click();
  await expect(page.getByTestId('gallery-viewer')).toBeVisible();
  await page.getByTestId('gallery-viewer').getByRole('button', { name: /关闭 CG/u }).click();
  await expect(page.getByTestId('gallery-viewer')).toHaveCount(0);
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

test('uses the static CG fallback and never requests retired video assets', async ({ page }) => {
  const videoRequests: string[] = [];
  page.on('request', (request) => { if (request.url().includes('/assets/video/')) videoRequests.push(request.url()); });
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
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
  await page.getByTestId('profile-begin').click();
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

test('uses a static CG fallback on every viewport profile', async ({ page }) => {
  const videoRequests: string[] = [];
  page.on('request', (request) => { if (request.url().includes('/assets/video/')) videoRequests.push(request.url()); });
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await advanceCanonRecapToAuBoundary(page);
  await chooseAndContinue(page, 'enter_white_canvas', 'white_canvas_001');
  await chooseAndContinue(page, 'white_touch_boundary', 'white_canvas_002');
  await chooseAndContinue(page, 'white_follow_to_lab', 'white_canvas_003');
  await expect(page.getByTestId('scene-video')).toHaveCount(0);
  await expect(page.getByTestId('static-fallback')).toBeVisible();
  expect(videoRequests).toEqual([]);
});
