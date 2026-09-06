import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('GameplayPanel stat-change feedback', () => {
  it('exposes an observable stat key on each authoritative value card', async () => {
    const source = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(source).toContain("storyValues = [");
    expect(source).toContain(":data-stat-key=\"entry.key\"");
    expect(source).toContain('effectiveValues[entry.key]');
  });

  it('pulses stat cards when effective values change and marks the change', async () => {
    const source = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(source).toContain('function publishStatChange(');
    expect(source).toContain('stat.dataset.statChanged = \'true\'');
    expect(source).toContain('gsap.fromTo(stat, { scale: 1, filter: \'brightness(1)\' }');
    expect(source).toContain('yoyo: true');
    expect(source).toContain('onComplete: () => { stat.dataset.statChanged = \'false\'; }');
  });

  it('keeps the observable change marker on reduced motion without the tween', async () => {
    const source = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(source).toContain('stat.dataset.statChanged = \'true\';');
    expect(source).toContain('if (props.reducedMotion) return;');
    expect(source).toContain('watch(() => props.effectiveValues');
    expect(source).toContain('previousEffectiveValues = { ...values };');
    expect(source).toContain('statTweens');
  });

  it('clears pending stat tweens on unmount and on reduced-motion flip', async () => {
    const source = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(source).toContain('watch(() => props.reducedMotion, (reducedMotion) => {');
    expect(source).toContain('statTweens.forEach((tween) => tween.kill());');
    expect(source).toContain('statTweens.clear();');
    expect(source).toContain("panel.value?.querySelectorAll<HTMLElement>('[data-stat-key]')");
    expect(source).toContain('stat.dataset.statChanged = \'false\';');
    expect(source).toContain('onBeforeUnmount(() => {');
  });

  it('slides a tab indicator to the newly selected tab and exposes the active tab', async () => {
    const source = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(source).toContain('const tabsNav = ref<HTMLElement>();');
    expect(source).toContain('const tabIndicator = ref<HTMLElement>();');
    expect(source).toContain('function syncTabIndicator(');
    expect(source).toContain('indicatorTween?.kill();');
    expect(source).toContain('gsap.to(indicator, { left: offsetLeft, width: offsetWidth, duration: .3');
    expect(source).toContain(':data-active-tab="activeTab"');
    expect(source).toContain('selectTab(tab.id);');
    expect(source).toContain('ref="tabIndicator" class="gameplay-tabs__indicator"');
    expect(source).toContain("void nextTick(() => syncTabIndicator(activeTab.value, false));");
  });

  it('styles the indicator as an absolute golden underline', async () => {
    const source = await readFile('src/styles.css', 'utf8');
    expect(source).toContain('.gameplay-tabs { position: relative;');
    expect(source).toContain('.gameplay-tabs__indicator { position: absolute; bottom: 0; left: 0; width: 0; height: 2px;');
    expect(source).toContain('pointer-events: none; will-change: left, width;');
  });

  it('renders an XP progress bar per profession level with an observable level', async () => {
    const [panel, styles] = await Promise.all([
      readFile('src/components/GameplayPanel.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(panel).toContain('class="gameplay-xp-progress"');
    expect(panel).toContain(':value="professionProgress(profession.id).xp"');
    expect(panel).toContain(':max="nextProfessionThreshold(profession.id) ?? 0"');
    expect(panel).toContain(':data-xp-level="professionProgress(profession.id).level"');
    expect(panel).toContain('v-if="nextProfessionThreshold(profession.id) !== undefined"');
    expect(styles).toContain('.gameplay-xp-progress { width: 100%; height: .55rem;');
    expect(styles).toContain('accent-color: #d7af46;');
  });

  it('glows unlocked achievements without touching quest or battle cards', async () => {
    const styles = await readFile('src/styles.css', 'utf8');
    expect(styles).toContain('.gameplay-entry-list article[data-achievement-id].completed {');
    expect(styles).toContain('box-shadow: 0 0 14px rgb(215 175 70 / 16%);');
    expect(styles).toContain('.gameplay-entry-list article[data-achievement-id].completed small { color: #e2c46e; }');
  });

  it('badges quest, battle and minigame states with observable data attributes', async () => {
    const [panel, styles] = await Promise.all([
      readFile('src/components/GameplayPanel.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(panel).toContain(':data-quest-state="questState(quest.id)"');
    expect(panel).toContain(':data-battle-state="battleState(battle.id)"');
    expect(panel).toContain('const objectiveSummary = computed(() => ({');
    expect(panel).toContain('data-objective-summary');
    expect(panel).toContain('任务 {{ objectiveSummary.questsDone }} / {{ objectiveSummary.questsTotal }}');
    expect(panel).toContain('挑战完成 {{ objectiveSummary.challengesDone }} / {{ objectiveSummary.challengesTotal }}');
    expect(panel).toContain('class="gameplay-state-badge"');
    expect(styles).toContain('.gameplay-entry-list header span.gameplay-state-badge {');
    expect(styles).toContain('--badge-accent: #d7af46;');
    expect(styles).toContain('border-radius: 999px;');
    expect(styles).toContain('article.active .gameplay-state-badge { --badge-accent: #e2c46e;');
    expect(styles).toContain('article.completed .gameplay-state-badge, .gameplay-entry-list article.victory .gameplay-state-badge');
    expect(styles).toContain('article.setback .gameplay-state-badge { --badge-accent: #ec765f;');
    expect(styles).toContain('article.locked .gameplay-state-badge');
    expect(styles).toContain('article.pending .gameplay-state-badge { --badge-accent: #b6c1cb;');
  });

  it('summarises progression from real save data instead of projected progress', async () => {
    const [panel, styles] = await Promise.all([
      readFile('src/components/GameplayPanel.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(panel).toContain('const progressionSummary = computed(() => {');
    expect(panel).toContain('professionsAdvanced: professions.value.filter((entry) => professionProgress(entry.id).level > 1).length,');
    expect(panel).toContain('professionLevels: professions.value.reduce((total, entry) => total + professionProgress(entry.id).level, 0),');
    expect(panel).toContain('achievementsUnlocked: achievements.value.filter((entry) => unlocked.has(entry.id)).length,');
    expect(panel).toContain("activeProfessionLabel: professions.value.find((entry) => entry.id === props.save.professions.activeId)?.label ?? '未选择',");
    expect(panel).toContain('data-testid="progression-summary"');
    expect(panel).toContain('data-progression-summary');
    expect(panel).toContain(':data-professions-advanced="progressionSummary.professionsAdvanced"');
    expect(panel).toContain(':data-profession-levels="progressionSummary.professionLevels"');
    expect(panel).toContain(':data-achievements-unlocked="progressionSummary.achievementsUnlocked"');
    expect(panel).toContain(':data-achievements-total="progressionSummary.achievementsTotal"');
    expect(panel).toContain('当前职业 {{ progressionSummary.activeProfessionLabel }}');
    expect(panel).toContain('成就 {{ progressionSummary.achievementsUnlocked }} / {{ progressionSummary.achievementsTotal }}');
    expect(styles).toContain('.gameplay-progression-summary, .gameplay-codex-summary { border-block-color: rgb(215 175 70 / 34%); color: #c6ced7; }');
    expect(styles).toContain(".gameplay-progression-summary span::before, .gameplay-codex-summary span::before { content: '◆'; font-size: .6rem; }");
  });

  it('summarises worldbook discovery from the save instead of the authored catalogue', async () => {
    const panel = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(panel).toContain('const codexSummary = computed(() => {');
    expect(panel).toContain('const states = entries.map((entry) => worldbookState(entry.id));');
    expect(panel).toContain('locked: states.filter((state) => state === \'locked\').length,');
    expect(panel).toContain('data-testid="codex-summary"');
    expect(panel).toContain('data-codex-summary');
    expect(panel).toContain(':data-codex-discovered="codexSummary.active + codexSummary.seen"');
    expect(panel).toContain(':data-codex-locked="codexSummary.locked"');
    expect(panel).toContain('已发现 {{ codexSummary.active + codexSummary.seen }} / {{ codexSummary.total }}');
  });
});
