import { expect, test, type Page } from '@playwright/test';

import { beginStory, installTavernHelper, readCamera, recordCameraTrace, STATIC_CANVAS, traceCameraPhases, WEBGL_CANVAS } from './helpers/albina-story';

test.beforeEach(async ({ page }) => {
  await installTavernHelper(page);
});

// The camera observation surface is the contract between the story beat layer
// and the renderer. It has to be readable without WebGL too, because the
// static and reduced-motion paths are the ones accessibility actually ships on.
test.describe('scene director camera observation', () => {
  test('publishes a well-formed camera plan on the WebGL canvas', async ({ page }) => {
    test.setTimeout(60_000);
    await beginStory(page);
    const canvas = page.locator(WEBGL_CANVAS);
    await expect(canvas).toBeVisible();

    const camera = await readCamera(page);

    expect(camera.mode).toMatch(/^(establish|focus|drift|impact|ending)$/u);
    // Authored focus is normalised viewport coordinates, so the published pair
    // has to stay inside the unit square whatever the route does.
    expect(camera.focus).toMatch(/^0(\.\d+)?,0(\.\d+)?$/u);
    const [focusX, focusY] = camera.focus.split(',').map(Number);
    expect(focusX).toBeGreaterThanOrEqual(0);
    expect(focusX).toBeLessThanOrEqual(1);
    expect(focusY).toBeGreaterThanOrEqual(0);
    expect(focusY).toBeLessThanOrEqual(1);
    expect(camera.zoom).toBeGreaterThanOrEqual(0.9);
    expect(camera.zoom).toBeLessThanOrEqual(1.3);
    expect(camera.shake).toBeGreaterThanOrEqual(0);
  });

  test('advances the beat phase enter -> establish -> dialogue as the scene holds', async ({ page }) => {
    test.setTimeout(60_000);
    await beginStory(page);

    const trace = await traceCameraPhases(page, 2600);

    // Order matters more than exact timing: a scene that never leaves `enter`
    // would leave every later beat unobservable to the renderer.
    expect(trace).toContain('establish');
    expect(trace).toContain('dialogue');
    expect(trace.indexOf('establish')).toBeLessThan(trace.indexOf('dialogue'));
    expect(trace.at(-1)).toBe('dialogue');
  });

  test('drives progress monotonically to a settled composition', async ({ page }) => {
    test.setTimeout(60_000);
    await beginStory(page);

    const samples: number[] = [];
    for (let index = 0; index < 12; index += 1) {
      samples.push((await readCamera(page)).progress);
      await page.waitForTimeout(120);
    }

    for (let index = 1; index < samples.length; index += 1) {
      // A new scene resets the director, so the only guarantee inside one
      // scene is that progress never rewinds.
      expect(samples[index]!).toBeGreaterThanOrEqual(samples[index - 1]!);
    }
    expect(samples.at(-1)!).toBeGreaterThan(0.9);
  });

  test('answers a confirmed choice with a transition-owned camera pulse', async ({ page }) => {
    test.setTimeout(90_000);
    await beginStory(page);

    // Sample from the settled scene: the authored camera for a quiet opening
    // is perfectly still, so any pulse can only come from the confirmation.
    await expect.poll(async () => (await readCamera(page)).phase).toBe('dialogue');
    const settled = await readCamera(page);
    expect(settled.shake).toBe(0);

    const { phases, peakShake, peakZoom } = await recordCameraTrace(page, {
      durationMs: 1400,
      click: '[data-choice-id="canon_recap_continue_9_18"]',
    });

    // `chapter-transition` outranks `choice-confirm` (priority 5 vs 3) and one
    // authored transition owns the stage, so the beat the player sees is the
    // scene change rather than the 520ms confirmation window. The confirmation
    // is still what starts the beat, and it has to be felt.
    expect(phases).toContain('exit');
    expect(peakShake).toBeGreaterThan(settled.shake);
    expect(peakZoom).toBeGreaterThanOrEqual(settled.zoom);
    await expect(page.getByTestId('choice-result')).toBeVisible();
  });

  test('keeps the camera plan readable on the static fallback', async ({ page }) => {
    test.setTimeout(90_000);
    await beginStory(page, 'static');

    const canvas = page.locator(STATIC_CANVAS);
    await expect(canvas).toHaveCount(1, { timeout: 15_000 });
    const camera = await readCamera(page, STATIC_CANVAS);

    // The fallback has no animation loop, so it publishes the authored plan
    // verbatim instead of an evolving beat.
    expect(camera.phase).toBe('static');
    expect(camera.mode).toMatch(/^(establish|focus|drift|impact|ending)$/u);
    expect(camera.focus).toMatch(/^0(\.\d+)?,0(\.\d+)?$/u);
    expect(camera.zoom).toBeGreaterThanOrEqual(0.9);
    expect(camera.zoom).toBeLessThanOrEqual(1.2);
  });

  test('keeps the camera plan readable when reduced motion is requested', async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await beginStory(page);

    const canvas = page.locator(STATIC_CANVAS);
    await expect(canvas).toHaveCount(1, { timeout: 15_000 });
    const camera = await readCamera(page, STATIC_CANVAS);

    expect(camera.phase).toBe('static');
    expect(camera.mode).toMatch(/^(establish|focus|drift|impact|ending)$/u);
    // Reduced motion removes the pulse, so shake must stay at the authored
    // value rather than inheriting anything from an abandoned animation.
    expect(camera.shake).toBeGreaterThanOrEqual(0);
    expect(camera.shake).toBeLessThanOrEqual(1);
    await expect(page.locator('.scene-atmosphere')).toHaveAttribute('data-vfx-mode', 'reduced-motion');
  });
});

async function advanceScene(page: Page): Promise<string | null> {
  const before = await page.getByTestId('game-screen').getAttribute('data-scene-id');
  const choice = page.locator('[data-choice-id]').first();
  if (await choice.count() === 0) return null;
  await choice.click();
  const advanced = page.getByTestId('game-screen');
  await expect(advanced).not.toHaveAttribute('data-scene-id', before ?? '', { timeout: 10_000 }).catch(() => undefined);
  await page.waitForTimeout(320);
  return advanced.getAttribute('data-scene-id');
}

test.describe('scene director camera continuity', () => {
  test('republishes a valid camera plan for every scene the story advances to', async ({ page }) => {
    test.setTimeout(120_000);
    await beginStory(page);

    const visited: Array<{ sceneId: string | null; camera: Awaited<ReturnType<typeof readCamera>> }> = [];

    for (let step = 0; step < 5; step += 1) {
      const sceneId = await page.getByTestId('game-screen').getAttribute('data-scene-id');
      visited.push({ sceneId, camera: await readCamera(page) });
      const next = await advanceScene(page);
      // Stop as soon as the story has nothing left to offer (ending reached).
      if (next === null || next === sceneId) break;
    }

    expect(visited.length).toBeGreaterThan(1);
    for (const { sceneId, camera } of visited) {
      // An empty mode or focus would mean the presentation contract silently
      // failed to resolve for that particular scene.
      expect(sceneId, 'every visited scene must expose its id').toBeTruthy();
      expect(camera.mode, `scene ${sceneId} must publish a camera mode`).toMatch(/^(establish|focus|drift|impact|ending)$/u);
      expect(camera.focus, `scene ${sceneId} must publish a normalised focus`).toMatch(/^0(\.\d+)?,0(\.\d+)?$/u);
      expect(camera.zoom, `scene ${sceneId} must publish an in-range zoom`).toBeGreaterThanOrEqual(0.9);
      expect(camera.zoom).toBeLessThanOrEqual(1.3);
    }
    // A director that never re-published would freeze the camera on the first
    // scene's plan, so at least one observed scene must differ from the start.
    expect(new Set(visited.map((entry) => entry.sceneId)).size).toBeGreaterThan(1);
  });
});
