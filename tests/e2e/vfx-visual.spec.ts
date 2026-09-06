import { expect, test, type Page } from '@playwright/test';

import { beginStory, installTavernHelper, STATIC_CANVAS, WEBGL_CANVAS } from './helpers/albina-story';

type PixelSample = {
  width: number;
  height: number;
  nonTransparent: number;
  uniqueLuminance: number;
  pixels: number[];
};

test.beforeEach(async ({ page }) => {
  await installTavernHelper(page);
});

async function sampleCanvas(page: Page): Promise<PixelSample> {
  return page.locator(WEBGL_CANVAS).evaluate((canvas) => {
    const target = canvas as HTMLCanvasElement;
    const webgl = target.getContext('webgl2') ?? target.getContext('webgl');
    if (!webgl) throw new Error('The VFX canvas did not expose a WebGL context.');
    const width = Math.max(1, Math.min(target.width, 96));
    const height = Math.max(1, Math.min(target.height, 64));
    const pixels = new Uint8Array(width * height * 4);
    webgl.readPixels(0, 0, width, height, webgl.RGBA, webgl.UNSIGNED_BYTE, pixels);

    const luminance = new Set<number>();
    let nonTransparent = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      const red = pixels[index] ?? 0;
      const green = pixels[index + 1] ?? 0;
      const blue = pixels[index + 2] ?? 0;
      const alpha = pixels[index + 3] ?? 0;
      if (alpha > 0) nonTransparent += 1;
      luminance.add(Math.round((red * 0.2126) + (green * 0.7152) + (blue * 0.0722)));
    }
    return { width, height, nonTransparent, uniqueLuminance: luminance.size, pixels: Array.from(pixels) };
  });
}

/**
 * Collapses the fallback bitmap to a painted-pixel count and a positional
 * checksum inside the page.
 *
 * The canvas is viewport-sized, so shipping every channel value across the
 * driver boundary to compare them in Node costs minutes; an FNV-1a digest
 * over the same bytes is equally strict about "frozen" and returns at once.
 */
function sampleStaticCanvas(page: Page, selector = STATIC_CANVAS): Promise<{ painted: number; digest: number }> {
  return page.locator(selector).evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
    let painted = 0;
    let digest = 2166136261;
    for (let index = 0; index < data.length; index += 1) {
      if (index % 4 === 3 && data[index]! > 0) painted += 1;
      digest = ((digest ^ data[index]!) * 16777619) >>> 0;
    }
    return { painted, digest };
  });
}

/**
 * Waits until the fallback canvas has stopped repainting.
 *
 * Mounting paints the fallback twice — once on construction, once when the
 * scene state lands — and rasterising a viewport-sized gradient twice is not
 * bit-identical to the last unit (a handful of anti-aliased pixels differ by
 * one). "Frozen" therefore has to be judged from a settled canvas, not from
 * whatever the first observed frame happened to hold.
 */
async function waitForStaticSettled(page: Page, selector = STATIC_CANVAS): Promise<void> {
  let previous = await sampleStaticCanvas(page, selector);
  for (let attempt = 0; attempt < 40; attempt += 1) {
    await page.waitForTimeout(120);
    const current = await sampleStaticCanvas(page, selector);
    if (current.digest === previous.digest) return;
    previous = current;
  }
  throw new Error('The static fallback never stopped repainting.');
}

function pixelDifference(first: number[], second: number[]): number {
  let changed = 0;
  for (let index = 0; index < first.length; index += 1) {
    if (first[index] !== second[index]) changed += 1;
  }
  return changed;
}

test('renders a nonblank animated WebGL VFX canvas without obscuring game controls', async ({ page }) => {
  await beginStory(page);

  const atmosphere = page.locator('.scene-atmosphere');
  const canvas = atmosphere.locator(WEBGL_CANVAS);
  await expect(atmosphere).toHaveAttribute('data-vfx-mode', 'webgl');
  await expect(canvas).toHaveAttribute('data-vfx-effect', 'mirror-rain-bough-refraction');
  await expect(canvas).toHaveAttribute('data-vfx-quality', test.info().project.name === 'mobile' ? 'low' : 'high');
  await expect.poll(async () => canvas.evaluate((element) => {
    const target = element as HTMLCanvasElement;
    return { width: target.width, height: target.height };
  })).toMatchObject({ width: expect.any(Number), height: expect.any(Number) });

  const first = await sampleCanvas(page);
  await page.waitForTimeout(300);
  const second = await sampleCanvas(page);
  expect(first.width).toBeGreaterThan(0);
  expect(first.height).toBeGreaterThan(0);
  expect(first.nonTransparent).toBeGreaterThan(0);
  expect(first.uniqueLuminance).toBeGreaterThan(4);
  expect(pixelDifference(first.pixels, second.pixels)).toBeGreaterThan(32);

  const layering = await page.evaluate(() => {
    const choice = document.querySelector<HTMLButtonElement>('[data-choice-id]');
    const dialogue = document.querySelector<HTMLElement>('[data-testid="dialogue-box"]');
    const canvas = document.querySelector<HTMLCanvasElement>('[data-testid="scene-webgl"] canvas[data-vfx-effect="mirror-rain-bough-refraction"]');
    if (!choice || !dialogue || !canvas) throw new Error('Required VFX/UI nodes are absent.');
    const rect = choice.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.left + (rect.width / 2), rect.top + (rect.height / 2));
    return {
      canvasPointerEvents: getComputedStyle(canvas).pointerEvents,
      dialogueZIndex: getComputedStyle(dialogue).zIndex,
      canvasZIndex: getComputedStyle(canvas.parentElement!).zIndex,
      choiceReceivesHit: hit === choice || Boolean(hit?.closest('[data-choice-id]')),
    };
  });
  // The atmosphere is intentionally non-interactive so story choices remain
  // clickable through the visual layer.
  expect(layering.canvasPointerEvents).toBe('none');
  expect(layering.choiceReceivesHit).toBe(true);
  await page.locator('[data-choice-id="canon_recap_continue_9_18"]').click();
  await expect(page.getByTestId('choice-result')).toBeVisible();
});

test('uses a frozen static canvas for explicit Static quality', async ({ page }) => {
  test.setTimeout(60_000);
  await beginStory(page, 'static');
  const atmosphere = page.locator('.scene-atmosphere');
  await expect(page.getByTestId('game-screen')).toBeVisible();
  await expect(page.getByTestId('scene-webgl')).toBeVisible();
  const canvas = atmosphere.locator(STATIC_CANVAS);
  await expect(canvas).toHaveCount(1, { timeout: 15_000 });
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute('data-vfx-quality', 'static');
  await expect(canvas).toHaveAttribute('data-vfx-effect', 'static-svg-fallback');
  await expect(atmosphere.locator('.scene-atmosphere__rain')).toHaveClass(/is-static/u);
  await waitForStaticSettled(page);
  const first = await sampleStaticCanvas(page);
  await page.waitForTimeout(350);
  const second = await sampleStaticCanvas(page);
  // Frozen is not enough on its own: a blank canvas is also frozen. The
  // fallback only counts as a composition once it has actually painted.
  expect(first.painted).toBeGreaterThan(0);
  expect(second.digest).toBe(first.digest);
});

test('uses the frozen static fallback when reduced motion is requested', async ({ page }) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await beginStory(page);

  const atmosphere = page.locator('.scene-atmosphere');
  const canvas = atmosphere.locator(STATIC_CANVAS);
  await expect(page.getByTestId('game-screen')).toBeVisible();
  await expect(page.getByTestId('scene-webgl')).toBeVisible();
  await expect(atmosphere).toHaveAttribute('data-vfx-mode', 'reduced-motion');
  await expect(canvas).toHaveCount(1, { timeout: 15_000 });
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute('data-vfx-quality', 'static');
  await expect(canvas).toHaveAttribute('data-vfx-effect', 'static-svg-fallback');
  await expect(atmosphere).toHaveAttribute('data-vfx-transition', 'idle');
  await expect(atmosphere.locator('.scene-atmosphere__rain')).toHaveClass(/is-static/u);
  await waitForStaticSettled(page);
  const first = await sampleStaticCanvas(page);
  await page.waitForTimeout(350);
  const second = await sampleStaticCanvas(page);
  // Frozen is not enough on its own: a blank canvas is also frozen. The
  // fallback only counts as a composition once it has actually painted.
  expect(first.painted).toBeGreaterThan(0);
  expect(second.digest).toBe(first.digest);
});
