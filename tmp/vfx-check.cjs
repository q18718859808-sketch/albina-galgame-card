"use strict";
var import_test = require("@playwright/test");
var import_albina_story = require("./helpers/albina-story");
import_test.test.beforeEach(async ({ page }) => {
  await (0, import_albina_story.installTavernHelper)(page);
});
async function sampleCanvas(page) {
  return page.locator(import_albina_story.WEBGL_CANVAS).evaluate((canvas) => {
    const target = canvas;
    const webgl = target.getContext("webgl2") ?? target.getContext("webgl");
    if (!webgl) throw new Error("The VFX canvas did not expose a WebGL context.");
    const width = Math.max(1, Math.min(target.width, 96));
    const height = Math.max(1, Math.min(target.height, 64));
    const pixels = new Uint8Array(width * height * 4);
    webgl.readPixels(0, 0, width, height, webgl.RGBA, webgl.UNSIGNED_BYTE, pixels);
    const luminance = /* @__PURE__ */ new Set();
    let nonTransparent = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      const red = pixels[index] ?? 0;
      const green = pixels[index + 1] ?? 0;
      const blue = pixels[index + 2] ?? 0;
      const alpha = pixels[index + 3] ?? 0;
      if (alpha > 0) nonTransparent += 1;
      luminance.add(Math.round(red * 0.2126 + green * 0.7152 + blue * 0.0722));
    }
    return { width, height, nonTransparent, uniqueLuminance: luminance.size, pixels: Array.from(pixels) };
  });
}
function sampleStaticCanvas(page, selector = import_albina_story.STATIC_CANVAS) {
  return page.locator(selector).evaluate((element) => {
    const canvas = element;
    const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
    let painted = 0;
    let digest = 2166136261;
    for (let index = 0; index < data.length; index += 1) {
      if (index % 4 === 3 && data[index] > 0) painted += 1;
      digest = (digest ^ data[index]) * 16777619 >>> 0;
    }
    return { painted, digest };
  });
}
async function waitForStaticSettled(page, selector = import_albina_story.STATIC_CANVAS) {
  let previous = await sampleStaticCanvas(page, selector);
  for (let attempt = 0; attempt < 40; attempt += 1) {
    await page.waitForTimeout(120);
    const current = await sampleStaticCanvas(page, selector);
    if (current.digest === previous.digest) return;
    previous = current;
  }
  throw new Error("The static fallback never stopped repainting.");
}
function pixelDifference(first, second) {
  let changed = 0;
  for (let index = 0; index < first.length; index += 1) {
    if (first[index] !== second[index]) changed += 1;
  }
  return changed;
}
(0, import_test.test)("renders a nonblank animated WebGL VFX canvas without obscuring game controls", async ({ page }) => {
  await (0, import_albina_story.beginStory)(page);
  const atmosphere = page.locator(".scene-atmosphere");
  const canvas = atmosphere.locator(import_albina_story.WEBGL_CANVAS);
  await (0, import_test.expect)(atmosphere).toHaveAttribute("data-vfx-mode", "webgl");
  await (0, import_test.expect)(canvas).toHaveAttribute("data-vfx-effect", "mirror-rain-bough-refraction");
  await (0, import_test.expect)(canvas).toHaveAttribute("data-vfx-quality", import_test.test.info().project.name === "mobile" ? "low" : "high");
  await import_test.expect.poll(async () => canvas.evaluate((element) => {
    const target = element;
    return { width: target.width, height: target.height };
  })).toMatchObject({ width: import_test.expect.any(Number), height: import_test.expect.any(Number) });
  const first = await sampleCanvas(page);
  await page.waitForTimeout(300);
  const second = await sampleCanvas(page);
  (0, import_test.expect)(first.width).toBeGreaterThan(0);
  (0, import_test.expect)(first.height).toBeGreaterThan(0);
  (0, import_test.expect)(first.nonTransparent).toBeGreaterThan(0);
  (0, import_test.expect)(first.uniqueLuminance).toBeGreaterThan(4);
  (0, import_test.expect)(pixelDifference(first.pixels, second.pixels)).toBeGreaterThan(32);
  const layering = await page.evaluate(() => {
    const choice = document.querySelector("[data-choice-id]");
    const dialogue = document.querySelector('[data-testid="dialogue-box"]');
    const canvas2 = document.querySelector('[data-testid="scene-webgl"] canvas[data-vfx-effect="mirror-rain-bough-refraction"]');
    if (!choice || !dialogue || !canvas2) throw new Error("Required VFX/UI nodes are absent.");
    const rect = choice.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return {
      canvasPointerEvents: getComputedStyle(canvas2).pointerEvents,
      dialogueZIndex: getComputedStyle(dialogue).zIndex,
      canvasZIndex: getComputedStyle(canvas2.parentElement).zIndex,
      choiceReceivesHit: hit === choice || Boolean(hit?.closest("[data-choice-id]"))
    };
  });
  (0, import_test.expect)(layering.canvasPointerEvents).toBe("none");
  (0, import_test.expect)(layering.choiceReceivesHit).toBe(true);
  await page.locator('[data-choice-id="canon_recap_continue_9_18"]').click();
  await (0, import_test.expect)(page.getByTestId("choice-result")).toBeVisible();
});
(0, import_test.test)("uses a frozen static canvas for explicit Static quality", async ({ page }) => {
  import_test.test.setTimeout(6e4);
  await (0, import_albina_story.beginStory)(page, "static");
  const atmosphere = page.locator(".scene-atmosphere");
  await (0, import_test.expect)(page.getByTestId("game-screen")).toBeVisible();
  await (0, import_test.expect)(page.getByTestId("scene-webgl")).toBeVisible();
  const canvas = atmosphere.locator(import_albina_story.STATIC_CANVAS);
  await (0, import_test.expect)(canvas).toHaveCount(1, { timeout: 15e3 });
  await (0, import_test.expect)(canvas).toBeVisible();
  await (0, import_test.expect)(canvas).toHaveAttribute("data-vfx-quality", "static");
  await (0, import_test.expect)(canvas).toHaveAttribute("data-vfx-effect", "static-svg-fallback");
  await (0, import_test.expect)(atmosphere.locator(".scene-atmosphere__rain")).toHaveClass(/is-static/u);
  await waitForStaticSettled(page);
  const first = await sampleStaticCanvas(page);
  await page.waitForTimeout(350);
  const second = await sampleStaticCanvas(page);
  (0, import_test.expect)(first.painted).toBeGreaterThan(0);
  (0, import_test.expect)(second.digest).toBe(first.digest);
});
(0, import_test.test)("uses the frozen static fallback when reduced motion is requested", async ({ page }) => {
  import_test.test.setTimeout(6e4);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await (0, import_albina_story.beginStory)(page);
  const atmosphere = page.locator(".scene-atmosphere");
  const canvas = atmosphere.locator(import_albina_story.STATIC_CANVAS);
  await (0, import_test.expect)(page.getByTestId("game-screen")).toBeVisible();
  await (0, import_test.expect)(page.getByTestId("scene-webgl")).toBeVisible();
  await (0, import_test.expect)(atmosphere).toHaveAttribute("data-vfx-mode", "reduced-motion");
  await (0, import_test.expect)(canvas).toHaveCount(1, { timeout: 15e3 });
  await (0, import_test.expect)(canvas).toBeVisible();
  await (0, import_test.expect)(canvas).toHaveAttribute("data-vfx-quality", "static");
  await (0, import_test.expect)(canvas).toHaveAttribute("data-vfx-effect", "static-svg-fallback");
  await (0, import_test.expect)(atmosphere).toHaveAttribute("data-vfx-transition", "idle");
  await (0, import_test.expect)(atmosphere.locator(".scene-atmosphere__rain")).toHaveClass(/is-static/u);
  await waitForStaticSettled(page);
  const first = await sampleStaticCanvas(page);
  await page.waitForTimeout(350);
  const second = await sampleStaticCanvas(page);
  (0, import_test.expect)(first.painted).toBeGreaterThan(0);
  (0, import_test.expect)(second.digest).toBe(first.digest);
});
