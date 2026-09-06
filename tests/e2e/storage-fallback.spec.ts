import { expect, test } from '@playwright/test';

test('keeps playing and saving with an in-memory fallback when IndexedDB is unavailable', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    const state: Record<string, unknown> = {};
    window.TavernHelper = {
      getChatId: () => 'playwright-idb-fallback',
      getVariables: () => state,
      setVariables: (values) => { Object.assign(state, values); },
    };
    Object.defineProperty(Object.getPrototypeOf(indexedDB), 'open', {
      configurable: true,
      value: () => { throw new DOMException('IndexedDB blocked by host policy', 'SecurityError'); },
    });
  });

  await page.goto('/');
  await page.getByTestId('new-game').click();
  await page.getByTestId('profile-begin').click();
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'canon_recap_9_14');
  await page.getByTestId('game-saves').click();
  await page.getByTestId('save-slot-1').click();
  await expect(page.locator('[data-save-id="slot-1"]')).toBeVisible();
  await page.locator('[data-save-id="slot-1"]').getByRole('button', { name: '读取' }).click();
  await expect(page.getByTestId('game-screen')).toBeVisible();
  expect(pageErrors).toEqual([]);
});
