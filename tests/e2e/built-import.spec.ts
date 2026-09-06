import { expect, test } from '@playwright/test';

test('executes the published Tavern Helper module, injects CSS, mounts, recovers audio, and unmounts', async ({ page }) => {
  let sourceModuleRequests = 0;
  page.on('request', (request) => {
    if (request.url().endsWith('/dist/albina-galgame-card/source/albina-source.js')) sourceModuleRequests += 1;
  });
  await page.addInitScript(() => {
    let plays = 0;
    let pauses = 0;
    let listenerAdds = 0;
    let listenerRemoves = 0;
    let motionAdds = 0;
    let motionRemoves = 0;
    Object.defineProperty(window, '__mediaCounts', { value: { get plays() { return plays; }, get pauses() { return pauses; } } });
    Object.defineProperty(window, '__listenerCounts', { value: { get adds() { return listenerAdds; }, get removes() { return listenerRemoves; } } });
    Object.defineProperty(window, '__motionCounts', { value: { get adds() { return motionAdds; }, get removes() { return motionRemoves; } } });
    const add = window.addEventListener.bind(window);
    const remove = window.removeEventListener.bind(window);
    window.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => { if (['resize', 'orientationchange'].includes(type)) listenerAdds += 1; add(type, listener, options); }) as typeof window.addEventListener;
    window.removeEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => { if (['resize', 'orientationchange'].includes(type)) listenerRemoves += 1; remove(type, listener, options); }) as typeof window.removeEventListener;
    const nativeMatchMedia = window.matchMedia.bind(window);
    window.matchMedia = ((query: string) => {
      const result = nativeMatchMedia(query);
      return new Proxy(result, { get(target, property) {
        if (property === 'addEventListener') return (...args: Parameters<MediaQueryList['addEventListener']>) => { motionAdds += 1; return target.addEventListener(...args); };
        if (property === 'removeEventListener') return (...args: Parameters<MediaQueryList['removeEventListener']>) => { motionRemoves += 1; return target.removeEventListener(...args); };
        const value = Reflect.get(target, property, target);
        return typeof value === 'function' ? value.bind(target) : value;
      } });
    }) as typeof window.matchMedia;
    HTMLMediaElement.prototype.play = function () { plays += 1; return plays === 1 ? Promise.reject(new DOMException('blocked', 'NotAllowedError')) : Promise.resolve(); };
    HTMLMediaElement.prototype.pause = function () { pauses += 1; };
  });
  await page.goto('/built-harness.html');
  await page.evaluate(() => {
    const duplicate = document.createElement('script');
    duplicate.type = 'module';
    duplicate.src = '/dist/albina-galgame-card/source/albina-classic-loader.js';
    document.head.append(duplicate);
  });
  const launcher = page.locator('[data-albina-launcher]');
  await expect(launcher).toBeVisible();
  expect(sourceModuleRequests).toBe(1);
  await expect(page.locator('link[data-albina-style]')).toHaveAttribute('href', /albina-source\.css$/u);
  // Self-bootstrap: the frontend opens its dedicated fullscreen frame on
  // install; the launcher acts as the session toggle.
  await expect(page.locator('iframe[data-albina-shell="v2"]')).toBeVisible();
  await expect(page.getByTestId('title-screen')).toBeVisible();
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await page.getByRole('button', { name: '设置' }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { __mediaCounts: { plays: number } }).__mediaCounts.plays)).toBeGreaterThanOrEqual(1);
  await page.getByTestId('autoplay-recovery').click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { __mediaCounts: { plays: number } }).__mediaCounts.plays)).toBeGreaterThanOrEqual(2);
  await launcher.click();
  await expect(page.locator('iframe[data-albina-shell="v2"]')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => (window as unknown as { __mediaCounts: { pauses: number } }).__mediaCounts.pauses)).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => (window as unknown as { __listenerCounts: { adds: number; removes: number } }).__listenerCounts)).toEqual({ adds: 0, removes: 0 });
  await expect.poll(() => page.evaluate(() => (window as unknown as { __motionCounts: { adds: number; removes: number } }).__motionCounts)).toEqual({ adds: 1, removes: 1 });
});
