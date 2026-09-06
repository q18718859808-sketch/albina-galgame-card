import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('NarrativeMinigame accessibility and interaction contract', () => {
  it('uses native buttons with pressed state instead of drag, hover, or timers', async () => {
    const source = await readFile('src/components/minigames/NarrativeMinigame.vue', 'utf8');
    expect(source).toContain(':aria-pressed="selectedMirrorIds.includes(anchor.id)"');
    expect(source).toContain(':aria-pressed="selectedCipherIds.includes(fragment.id)"');
    expect(source).toContain(':aria-pressed="activeResonanceIds.includes(node.id)"');
    expect(source).toContain('aria-label="上移"');
    expect(source).toContain('aria-label="下移"');
    expect(source).toContain('aria-live="polite"');
    // No pointer-only or time-pressured interaction is allowed in a narrative challenge.
    expect(source).not.toContain('draggable');
    expect(source).not.toContain('setInterval');
    expect(source).not.toContain('setTimeout');
    expect(source).not.toContain('@mouseover');
    expect(source).not.toContain('@mouseenter');
  });

  it('renders one authored surface per puzzle kind and can always be closed or skipped', async () => {
    const source = await readFile('src/components/minigames/NarrativeMinigame.vue', 'utf8');
    expect(source).toContain("definition.puzzle.kind === 'mirror_thread'");
    expect(source).toContain("definition.puzzle.kind === 'testimony_cipher'");
    expect(source).toContain('class="minigame-resonance"');
    expect(source).toContain('class="minigame-panel__close"');
    expect(source).toContain("emit('close')");
    expect(source).toContain('v-if="challenge.allowSkip"');
    expect(source).toContain('data-testid="minigame-skip"');
  });

  it('blocks an incomplete submission with a readable reason rather than silently ignoring it', async () => {
    const source = await readFile('src/components/minigames/NarrativeMinigame.vue', 'utf8');
    expect(source).toContain('const blockingReason = computed<string | undefined>');
    expect(source).toContain('data-testid="minigame-blocked"');
    expect(source).toContain(':disabled="busy || Boolean(blockingReason)"');
    expect(source).toContain('if (props.busy || blockingReason.value) return;');
  });

  it('derives assist hints from the authored solution instead of inventing them', async () => {
    const source = await readFile('src/components/minigames/NarrativeMinigame.vue', 'utf8');
    expect(source).toContain('props.definition.puzzle.correctPair.includes(id)');
    expect(source).toContain('props.definition.puzzle.solutionOrder.indexOf(id)');
    expect(source).toContain('props.definition.puzzle.targetActiveIds.includes(id)');
    expect(source).toContain('if (!assisted.value');
    expect(source).toContain('class="minigame-hint-tag"');
  });

  it('presents authored entries in a deterministic seeded order', async () => {
    const source = await readFile('src/components/minigames/NarrativeMinigame.vue', 'utf8');
    expect(source).toContain('seededOrder(props.definition.puzzle.anchors, props.challenge.seed)');
    expect(source).toContain('seededOrder(props.definition.puzzle.fragments, props.challenge.seed)');
    expect(source).toContain('seededOrder(props.definition.puzzle.nodes, props.challenge.seed)');
    expect(source).not.toContain('Math.random');
  });

  it('gives immediate press feedback on option toggles with a reduced-motion escape', async () => {
    const [source, styles] = await Promise.all([
      readFile('src/components/minigames/NarrativeMinigame.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(source).toContain("import { gsap } from 'gsap'");
    expect(source).toContain('optionFeedback(event)');
    expect(source).toContain('props.reducedMotion || props.busy');
    expect(source).toContain('optionTweens.forEach((tween) => tween.kill())');
    expect(source).toContain(':data-can-submit="canSubmit ? \'true\' : \'false\'"');
    expect(source).toContain('const canSubmit = computed(() => !props.busy && blockingReason.value === undefined);');
    expect(source).toContain("'is-ready': canSubmit");
    expect(styles).toContain('.minigame-panel__actions button.is-ready');
    expect(styles).toContain('submit-breathe');
    expect(styles).toContain('.minigame-panel__actions button.is-ready { animation: none; }');
  });
});

describe('minigame host integration contract', () => {
  it('routes the challenge modal through the shared GSAP choreography and returns focus', async () => {
    const [app, motion] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/runtime/ui-motion.ts', 'utf8'),
    ]);
    expect(app).toContain('data-testid="minigame-modal"');
    expect(app).toContain('data-motion-modal');
    expect(app).toContain("motion?.reveal('modal', minigameBackdrop.value)");
    expect(app).toContain('motion.dismissModal(root, finish)');
    expect(app).toContain('minigameButton.value?.focus()');
    // The modal must reuse the existing timeline; no second render loop is introduced.
    expect(motion).toContain('.minigame-panel');
    expect(app).not.toContain('new THREE.WebGLRenderer');
  });

  it('separates a pending challenge from a resolved record in the HUD', async () => {
    const app = await readFile('src/App.vue', 'utf8');
    expect(app).toContain('v-if="game.currentMinigame"');
    expect(app).toContain('v-if="game.activeMinigame"');
    expect(app).toContain("'is-resolved': game.currentMinigame.record?.resolved");
    expect(app).toContain('data-testid="minigame-open"');
    expect(app).toContain('data-testid="minigame-result"');
    expect(app).toContain('ref="minigameResultButton"');
    expect(app).toContain('minigameResultButton.value?.focus();');
    expect(app).toContain('aria-live="polite"');
  });

  it('shows the authoritative challenge record inside the status panel', async () => {
    const panel = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(panel).toContain("{ id: 'challenges', label: '叙事挑战' }");
    expect(panel).toContain('data-testid="gameplay-page-challenges"');
    expect(panel).toContain('gameplay-minigame-list');
    expect(panel).toContain('props.save.minigames.records[id]');
    expect(panel).toContain('function minigameSourceScene(id: string)');
  });

  it('defines every stylistic hook the challenge UI relies on', async () => {
    const styles = await readFile('src/styles.css', 'utf8');
    for (const selector of [
      '.minigame-panel__close',
      '.minigame-panel__blocked',
      '.minigame-hint-tag',
      '.minigame-cipher__placeholder',
      '.minigame-result',
      '.minigame-result--perfect',
      '.minigame-result--assisted',
      '.minigame-result--setback',
      '.minigame-result--skipped',
      '.game-hud__challenge.is-resolved',
      '.gameplay-minigame-list',
    ]) {
      expect(styles, `missing style hook: ${selector}`).toContain(selector);
    }
    // Reduced-motion users must not get the pulsing pending indicator or the submit breath.
    expect(styles).toContain("@media (prefers-reduced-motion: reduce) { .game-hud__challenge[data-minigame-outcome='pending'] { animation: none; } .minigame-panel__actions button.is-ready { animation: none; } .choice-list button { transition: border-color .2s ease, background-color .2s ease, color .2s ease; } .choice-list button:hover, .choice-list button:focus-visible { transform: none; } }");
  });
});
