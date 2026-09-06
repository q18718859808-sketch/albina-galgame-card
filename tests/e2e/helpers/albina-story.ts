import { expect, test, type Page } from '@playwright/test';

/**
 * Shared bootstrapping for Albina e2e specs.
 *
 * The page is a standalone Vite app, so every spec has to (1) fake the
 * TavernHelper host objects the save layer reads and (2) walk the title ->
 * profile -> story screens. Keeping both in one place stops the boot sequence
 * from drifting between specs.
 */
export function installTavernHelper(page: Page): Promise<unknown> {
  return page.addInitScript(() => {
    const state: Record<string, unknown> = {};
    Object.defineProperty(window, '__albinaHarnessState', { value: state });
    window.TavernHelper = {
      getChatId: () => `vfx-${Date.now()}`,
      getVariables: () => state,
      setVariables: (values) => { Object.assign(state, values); },
    };
  });
}

export async function beginStory(page: Page, quality?: string): Promise<void> {
  await page.goto(`/?vfx-proof=1&run=${test.info().project.name}-${Date.now()}`);
  if (quality) {
    await page.getByTestId('title-settings').click();
    await page.getByTestId('vfx-quality').selectOption(quality);
    await page.locator('[data-testid="settings-screen"] header button').click();
  }
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'canon_recap_9_14');
  await expect(page.getByTestId('scene-webgl')).toBeVisible();
}

export const WEBGL_CANVAS = '[data-testid="scene-webgl"] canvas[data-vfx-effect="mirror-rain-bough-refraction"]';
export const STATIC_CANVAS = '[data-testid="scene-webgl"] canvas[data-vfx-effect="static-svg-fallback"]';

export interface CameraObservation {
  phase: string;
  progress: number;
  zoom: number;
  shake: number;
  focus: string;
  mode: string;
}

export async function readCamera(page: Page, selector = WEBGL_CANVAS): Promise<CameraObservation> {
  return page.locator(selector).evaluate((element) => {
    const { vfxCameraPhase = '', vfxCameraProgress = '0', vfxCameraZoom = '0', vfxCameraShake = '0', vfxCameraFocus = '', vfxCameraMode = '' } = (element as HTMLElement).dataset;
    return {
      phase: vfxCameraPhase,
      progress: Number.parseFloat(vfxCameraProgress),
      zoom: Number.parseFloat(vfxCameraZoom),
      shake: Number.parseFloat(vfxCameraShake),
      focus: vfxCameraFocus,
      mode: vfxCameraMode,
    };
  });
}

export interface CameraTrace {
  /** Ordered list of distinct phases published during the window. */
  phases: string[];
  peakShake: number;
  peakZoom: number;
}

/**
 * Records the camera director's output frame by frame, optionally clicking a
 * story choice at the start of the window.
 *
 * Sampling from inside the page is deliberate: a cue window is only a few
 * hundred milliseconds and a Playwright round-trip is far too coarse to
 * observe one, so every animation frame is inspected instead.
 */
export async function recordCameraTrace(
  page: Page,
  options: { durationMs: number; click?: string; selector?: string },
): Promise<CameraTrace> {
  const selector = options.selector ?? WEBGL_CANVAS;
  return page.locator(selector).evaluate((element, { duration, click }) => new Promise<CameraTrace>((resolve, reject) => {
    const canvas = element as HTMLElement;
    const phases: string[] = [];
    let peakShake = 0;
    let peakZoom = 0;
    const deadline = performance.now() + duration;
    const step = () => {
      const phase = canvas.dataset.vfxCameraPhase ?? '';
      if (phases[phases.length - 1] !== phase) phases.push(phase);
      peakShake = Math.max(peakShake, Number.parseFloat(canvas.dataset.vfxCameraShake ?? '0'));
      peakZoom = Math.max(peakZoom, Number.parseFloat(canvas.dataset.vfxCameraZoom ?? '0'));
      if (performance.now() < deadline) requestAnimationFrame(step);
      else if (phases.length === 0) reject(new Error('The camera director published no phase within the sampling window.'));
      else resolve({ phases, peakShake, peakZoom });
    };
    requestAnimationFrame(step);
    if (click) document.querySelector<HTMLButtonElement>(click)?.click();
  }), { duration: options.durationMs, click: options.click ?? null });
}

export async function traceCameraPhases(page: Page, durationMs: number, selector = WEBGL_CANVAS): Promise<string[]> {
  return (await recordCameraTrace(page, { durationMs, selector })).phases;
}
