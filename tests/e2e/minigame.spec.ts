import { expect, test, type Page } from '@playwright/test';

import { beginStory, installTavernHelper } from './helpers/albina-story';

/**
 * Narrative minigame acceptance: the challenge is a scene-bound story beat,
 * not a detached score page. These specs walk the authored white-canvas route
 * to white_canvas_003 and exercise the full modal loop on desktop and mobile.
 */

const CANON_STEPS = [
  'canon_recap_continue_9_18', 'canon_recap_continue_9_37', 'canon_recap_continue_albina_fascia',
  'canon_recap_continue_9_37_battle', 'canon_recap_continue_9_43', 'canon_recap_enter_AU',
];

async function choose(page: Page, choiceId: string): Promise<void> {
  await page.locator(`[data-choice-id="${choiceId}"]`).click();
  await page.getByTestId('choice-result').getByRole('button').click();
}

async function walkToChallenge(page: Page): Promise<void> {
  await beginStory(page);
  for (const choiceId of CANON_STEPS) await choose(page, choiceId);
  await choose(page, 'enter_white_canvas');
  await choose(page, 'white_touch_boundary');
  await choose(page, 'white_follow_to_lab');
  await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_003');
}

test.beforeEach(async ({ page }) => {
  await installTavernHelper(page);
});

test.describe('narrative minigame loop', () => {
  test('resolves the mirror-thread challenge with a perfect outcome', async ({ page }) => {
    test.setTimeout(90_000);
    await walkToChallenge(page);

    // Pending challenge is visible in the HUD and offers a single entry point.
    const challenge = page.locator('[data-testid="game-screen"] .game-hud__challenge');
    await expect(challenge).toHaveAttribute('data-minigame-outcome', 'pending');
    await expect(challenge).toHaveText('挑战待处理');
    const entry = page.getByTestId('minigame-open');
    await expect(entry).toHaveText('镜面连线');

    // An incomplete selection cannot be submitted.
    await entry.click();
    const modal = page.getByTestId('minigame-modal');
    await expect(modal).toBeVisible();
    await expect(modal.locator('[data-minigame-kind="mirror_thread"]')).toBeVisible();
    const submit = page.getByTestId('minigame-submit');
    await expect(submit).toBeDisabled();
    await expect(page.getByTestId('minigame-blocked')).toHaveText('请选择两个锚点后再提交。');

    // Assist reveals authored hints without changing the solution.
    await modal.locator('.minigame-panel__assist input').check();
    await expect(modal.locator('[data-anchor-id="witness"]')).toHaveAttribute('data-assist', 'keep');
    await expect(modal.locator('[data-anchor-id="consent"]')).toHaveAttribute('data-assist', 'keep');
    await expect(modal.locator('[data-anchor-id="ownership"]')).toHaveAttribute('data-assist', 'drop');
    await modal.locator('.minigame-panel__assist input').uncheck();
    await expect(modal.locator('[data-anchor-id="witness"]')).not.toHaveAttribute('data-assist', /.+/u);

    // The authored correct pair scores a perfect resolution.
    await modal.locator('[data-anchor-id="witness"]').click();
    await modal.locator('[data-anchor-id="consent"]').click();
    await expect(submit).toBeEnabled();
    await submit.click();

    const result = page.getByTestId('minigame-result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/minigame-result--perfect/u);
    await expect(result).toContainText('评分 100');
    await result.getByRole('button').click();
    await expect(result).toBeHidden();

    // The entry disappears, the HUD flips to the resolved state.
    await expect(page.getByTestId('minigame-open')).toHaveCount(0);
    await expect(challenge).toHaveAttribute('data-minigame-outcome', 'perfect');
    await expect(challenge).toHaveText('挑战已结算 · 完美介入');
    await expect(challenge).toHaveClass(/is-resolved/u);

    // The authoritative record is browsable in the status panel.
    await page.getByTestId('gameplay-open').click();
    await page.getByRole('tab', { name: '叙事挑战' }).click();
    const record = page.locator('[data-testid="gameplay-page-challenges"] article[data-minigame-id="minigame.white.mirror_thread"]');
    await expect(record).toHaveAttribute('data-minigame-outcome', 'perfect');
    await expect(record).toContainText('尝试 1 次');
    await expect(record).toContainText('剧情来源：white_canvas_003');

    // The story continues past the resolved scene.
    await page.getByRole('button', { name: '关闭状态档案' }).click();
    await choose(page, 'white_sign_witness_protocol');
    await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_004');
    await expect(page.locator('[data-testid="game-screen"] .game-hud__challenge')).toHaveCount(0);
  });

  test('keeps a skipped challenge survivable and recorded', async ({ page }) => {
    test.setTimeout(90_000);
    await walkToChallenge(page);

    await page.getByTestId('minigame-open').click();
    await page.getByTestId('minigame-skip').click();

    const result = page.getByTestId('minigame-result');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/minigame-result--skipped/u);
    await expect(result).toContainText('评分 0');
    await result.getByRole('button').click();

    const challenge = page.locator('[data-testid="game-screen"] .game-hud__challenge');
    await expect(challenge).toHaveAttribute('data-minigame-outcome', 'skipped');

    await page.getByTestId('gameplay-open').click();
    await page.getByRole('tab', { name: '叙事挑战' }).click();
    const record = page.locator('[data-testid="gameplay-page-challenges"] article[data-minigame-id="minigame.white.mirror_thread"]');
    await expect(record).toHaveAttribute('data-minigame-outcome', 'skipped');

    // Main path is never hard-locked by a skipped challenge.
    await page.getByRole('button', { name: '关闭状态档案' }).click();
    await choose(page, 'white_sign_witness_protocol');
    await expect(page.getByTestId('game-screen')).toHaveAttribute('data-scene-id', 'white_canvas_004');
  });
});
