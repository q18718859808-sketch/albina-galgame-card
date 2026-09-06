import { expect, test } from '@playwright/test';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

// Desktop and mobile projects can contend for the preview builder's guarded output directory.
// Match the builder's two-minute lock window instead of treating valid lock contention as failure.
test.describe.configure({ timeout: 120_000 });

test.beforeAll('build the isolated Krea2 local preview', async () => {
  // The builder rebuilds the whole guarded preview root, which outlasts the
  // 30s hook default; give it the same two-minute window as the tests.
  test.setTimeout(120_000);
  await run(process.execPath, ['scripts/build-krea2-local-preview.mjs'], { cwd: process.cwd() });
});

test('runs the reviewed Krea2 background preview in the Tavern Helper frontend', async ({ page }) => {
  const backgroundRequests: string[] = [];
  const portraitRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/staging/media/krea2-local-preview/assets/bg/')) backgroundRequests.push(request.url());
    if (/\/staging\/media\/krea2-local-preview\/assets\/characters\/albina\/(?:normal|rain|combat)\.png$/u.test(request.url())) portraitRequests.push(request.url());
  });
  await page.goto(`/staging/media/krea2-local-preview/preview-harness.html?run=${test.info().project.name}-${Date.now()}`);
  await page.locator('[data-albina-launcher]').click();
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await expect.poll(() => backgroundRequests.some((url) => url.endsWith('/assets/bg/lce_lab.jpg'))).toBe(true);
  await page.locator('[data-choice-id="canon_recap_continue_9_18"]').click();
  await page.getByTestId('choice-result').getByRole('button').click();
  await page.locator('[data-choice-id="canon_recap_continue_9_37"]').click();
  await page.getByTestId('choice-result').getByRole('button').click();
  await expect.poll(() => portraitRequests.length).toBeGreaterThan(0);
  await expect(page.locator('[data-testid="game-screen"]')).toBeVisible();
});

test('loads every isolated Albina AU portrait candidate in the local review wall', async ({ page }) => {
  const expected = [
    'normal', 'rain', 'combat', 'armored', 'endgame', 'fascia-open', 'furious',
    'golden-bough', 'maestro', 'ring-conspiracy', 'shy', 'surgical', 'white-canvas',
  ];
  const portraitRequests: string[] = [];
  page.on('request', (request) => {
    if (/\/staging\/media\/krea2-local-preview\/assets\/characters\/albina\/[^/]+\.png$/u.test(request.url())) portraitRequests.push(request.url());
  });
  await page.goto('/staging/media/krea2-local-preview/portrait-review.html');
  const portraits = page.locator('[data-portrait-variant] img');
  await expect(portraits).toHaveCount(expected.length);
  await expect.poll(() => new Set(portraitRequests.map((url) => new URL(url).pathname.split('/').at(-1)?.replace(/\.png$/u, ''))).size).toBe(expected.length);
  expect(await portraits.evaluateAll((images) => images.every((image) => {
    const portrait = image as HTMLImageElement;
    return portrait.complete && portrait.naturalWidth === 768 && portrait.naturalHeight === 1360;
  }))).toBe(true);
  expect(await page.locator('[data-portrait-variant]').evaluateAll((cards) => cards.map((card) => card.getAttribute('data-portrait-variant')))).toEqual(expected);
});

test('keeps the AU key-CG review wall empty unless an explicit candidate-injection flag is used', async ({ page }) => {
  await page.goto('/staging/media/krea2-local-preview/cg-review.html');
  await expect(page.getByText(/not a public-release artifact/i)).toBeVisible();
  await expect(page.locator('[data-cg-shot]')).toHaveCount(0);
  await expect(page.getByText(/intentionally empty/i)).toBeVisible();
});

test('loads the complete explicitly injected AU key-CG candidate set for local review only', async ({ page }) => {
  await run(process.execPath, ['scripts/build-krea2-local-preview.mjs', '--include-au-cg'], { cwd: process.cwd() });
  await page.goto('/staging/media/krea2-local-preview/cg-review.html');
  const expected = ['white-canvas', 'golden-bough', 'ring-gallery'];
  const cgs = page.locator('[data-cg-shot] img');
  await expect(cgs).toHaveCount(expected.length);
  await expect(page.getByText(/not approved for public release/i)).toHaveCount(expected.length);
  expect(await page.locator('[data-cg-shot]').evaluateAll((cards) => cards.map((card) => card.getAttribute('data-cg-shot')))).toEqual(expected);
  expect(await cgs.evaluateAll((images) => images.every((image) => {
    const cg = image as HTMLImageElement;
    return cg.complete && cg.naturalWidth === 1280 && cg.naturalHeight === 720;
  }))).toBe(true);
});

test('routes injected AU CG candidates through the game fallback slots', async ({ page }) => {
  const fallbackRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/staging/media/krea2-local-preview/assets/cg/')) fallbackRequests.push(request.url());
  });
  await run(process.execPath, ['scripts/build-krea2-local-preview.mjs', '--include-au-cg'], { cwd: process.cwd() });
  await page.goto(`/staging/media/krea2-local-preview/preview-harness.html?run=cg-route-${Date.now()}`);
  await page.locator('[data-albina-launcher]').click();
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();

  const canonSteps = [
    'canon_recap_continue_9_18', 'canon_recap_continue_9_37', 'canon_recap_continue_albina_fascia',
    'canon_recap_continue_9_37_battle', 'canon_recap_continue_9_43', 'canon_recap_enter_AU',
  ];
  for (const choiceId of canonSteps) {
    await page.locator(`[data-choice-id="${choiceId}"]`).click();
    await page.getByTestId('choice-result').getByRole('button').click();
  }
  await page.locator('[data-choice-id="enter_white_canvas"]').click();
  await page.getByTestId('choice-result').getByRole('button').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_001');
  await expect.poll(() => fallbackRequests.some((url) => url.endsWith('/cg/white_canvas_choice.jpg'))).toBe(true);

  await page.locator('[data-choice-id="white_touch_boundary"]').click();
  await page.getByTestId('choice-result').getByRole('button').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_002');
  await page.locator('[data-choice-id="white_follow_to_lab"]').click();
  await page.getByTestId('choice-result').getByRole('button').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_003');
  await page.locator('[data-choice-id="white_sign_witness_protocol"]').click();
  await page.getByTestId('choice-result').getByRole('button').click();
  await page.locator('[data-choice-id="white_keep_empty_seat"]').click();
  await page.getByTestId('choice-result').getByRole('button').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_005');

  await page.goto('/staging/media/krea2-local-preview/cg-review.html');
  await expect(page.locator('[data-cg-shot="white-canvas"] img')).toHaveAttribute('src', './assets/cg/white_canvas_choice.jpg');
});
