import { readFile } from 'node:fs/promises';

import { ref } from 'vue';
import { describe, expect, it } from 'vitest';

import { createAlbinaMotionController } from '../../src/runtime/ui-motion';

describe('Albina UI motion contract', () => {
  it('keeps all cinematic UI choreography in a scoped GSAP controller with teardown', async () => {
    const source = await readFile('src/runtime/ui-motion.ts', 'utf8');
    expect(source).toContain("import { gsap } from 'gsap'");
    expect(source).toContain('export function createAlbinaMotionController');
    expect(source).toContain("kind === 'title'");
    expect(source).toContain("kind === 'game'");
    expect(source).toContain("kind === 'dialogue'");
    expect(source).toContain("kind === 'modal'");
    expect(source).toContain('wipeScene(root)');
    expect(source).toContain('dismissModal(root, onComplete)');
    expect(source).toContain('timelines.forEach((timeline) => timeline.kill())');
  });

  it('exposes animation functions without requiring a DOM at module evaluation time', () => {
    const controller = createAlbinaMotionController(ref(true));
    expect(controller).toMatchObject({
      reveal: expect.any(Function),
      enterScreen: expect.any(Function),
      leaveScreen: expect.any(Function),
      revealDialogue: expect.any(Function),
      transitionScene: expect.any(Function),
      wipeScene: expect.any(Function),
      pulseChoice: expect.any(Function),
      pulseHud: expect.any(Function),
      pulseStatus: expect.any(Function),
      pulseHudValue: expect.any(Function),
      revealResult: expect.any(Function),
      switchPanelTab: expect.any(Function),
      dismissModal: expect.any(Function),
      dispose: expect.any(Function),
    });
    controller.dispose();
  });

  it('wires screen, dialogue, choice, modal and gameplay-panel motion into Vue components', async () => {
    const [app, gameplay, portraits] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/components/GameplayPanel.vue', 'utf8'),
      readFile('src/components/PortraitStage.vue', 'utf8'),
    ]);
    expect(app).toContain("import { createAlbinaMotionController");
    expect(app).toContain('data-motion-screen');
    expect(app).toContain('motion?.transitionScene(appRoot.value)');
    expect(app).toContain('motion?.revealDialogue(dialogue)');
    expect(app).toContain('motion?.pulseStatus(saveStatus.value');
    expect(app).toContain('motion?.revealResult(resultOverlay.value)');
    expect(app).toContain('motion?.wipeScene(transitionVeil.value)');
    expect(app).toContain('motion?.pulseChoice(button)');
    expect(app).toContain('motion.dismissModal(root');
    expect(app).toContain(':reduced-motion="game.reducedMotion"');
    expect(gameplay).toContain("import { gsap } from 'gsap'");
    expect(gameplay).toContain('panelContext?.revert()');
    expect(gameplay).toContain('props.reducedMotion');
    expect(portraits).toContain("import { gsap } from 'gsap'");
    expect(portraits).toContain('portraitTween?.kill()');
    expect(portraits).toContain('stageContext?.revert()');
  });

  it('exposes a dialogue-advance pulse and wires it into text completion', async () => {
    const [motion, app] = await Promise.all([
      readFile('src/runtime/ui-motion.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
    ]);
    expect(motion).toContain('pulseDialogue(root: HTMLElement): void;');
    expect(motion).toContain('pulseDialogue(root) {');
    expect(motion).toContain('if (reducedMotion.value) return;');
    expect(app).toContain('motion?.pulseDialogue(dialogue)');
    expect(app).toContain("const dialogue = appRoot.value?.querySelector<HTMLElement>('.dialogue-box');");
  });

  it('pulses only the HUD value segments that actually changed', async () => {
    const [motion, app] = await Promise.all([
      readFile('src/runtime/ui-motion.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
    ]);
    expect(motion).toContain('pulseHudValue(root: HTMLElement, tone?: \'golden\' | \'danger\'): void;');
    expect(motion).toContain('pulseHudValue(root, tone = \'golden\') {');
    expect(app).toContain('const hudValues = [');
    expect(app).toContain('{ key: \'affectionAlbina\', label: \'好感\' }');
    expect(app).toContain('{ key: \'trust\', label: \'信任\' }');
    expect(app).toContain('data-hud-value-key');
    expect(app).toContain('segment.dataset.hudChanged = \'true\';');
    expect(app).toContain('motion?.pulseHudValue(segment,');
    expect(app).toContain('values[key] === previous[key]');
  });

  it('exposes typewriter state and an advance hint on the dialogue box', async () => {
    const [typewriter, game, app, styles] = await Promise.all([
      readFile('src/runtime/typewriter.ts', 'utf8'),
      readFile('src/stores/game.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(typewriter).toContain("export type TypewriterState = 'idle' | 'typing';");
    expect(typewriter).toContain('subscribe(listener: TypewriterStateListener): () => void');
    expect(typewriter).toContain("this.notifyState('typing');");
    expect(typewriter).toContain("this.notifyState('idle');");
    expect(game).toContain("const typewriterState = ref<'idle' | 'typing'>('idle');");
    expect(game).toContain('runtime.typewriter.subscribe((state) => { typewriterState.value = state; });');
    expect(game).toContain('typewriterState, resultText');
    expect(app).toContain(':data-typing="game.typewriterState"');
    expect(app).toContain('class="dialogue-box__progress"');
    expect(app).toContain(':data-dialogue-progress="Math.round(game.dialogueProgress * 100)"');
    expect(app).toContain('role="progressbar"');
    expect(game).toContain('const dialogueProgress = ref(1);');
    expect(game).toContain('dialogueProgress.value = text.length === 0 ? 1 : next.length / text.length;');
    expect(app).toContain('data-testid="dialogue-advance"');
    expect(app).toContain('data-testid="dialogue-skip"');
    expect(app).toContain('跳过打字');
    expect(app).toContain("game.typewriterState === 'idle'");
    expect(app).toContain("!game.resultText && game.choices.length === 0");
    expect(styles).toContain('.dialogue-box__advance');
    expect(styles).toContain('advance-breathe');
    expect(styles).toContain(".dialogue-box[data-typing='typing'] p::after");
    expect(styles).toContain('caret-blink');
    expect(styles).toContain(".dialogue-box[data-typing='typing'] p::after { animation: none; opacity: .85; }");
  });

  it('hands the speaker label over with a dedicated transition on speaker change', async () => {
    const [motion, app, styles] = await Promise.all([
      readFile('src/runtime/ui-motion.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(motion).toContain('switchSpeaker(root: HTMLElement): void;');
    expect(motion).toContain('switchSpeaker(root) {');
    expect(motion).toContain("query('h2')");
    expect(motion).toContain('runReducedMotion(\'dialogue\', root)');
    expect(app).toContain('motion?.switchSpeaker(dialogue)');
    expect(app).toContain('watch(() => game.scene.speaker');
    expect(app).toContain(':data-speaker="game.scene.speaker"');
    expect(styles).toContain('.dialogue-box h2::before');
    expect(styles).toContain('letter-spacing: .06em');
    expect(app).toContain(":data-narration=\"game.scene.speaker ? 'false' : 'true'\"");
    expect(app).toContain("{{ game.scene.speaker || '旁白' }}");
    expect(styles).toContain(".dialogue-box h2[data-narration='true'] { color: #8b98a6; font-style: italic; }");
    expect(styles).toContain(".dialogue-box h2[data-narration='true']::before { background: #4a5662; box-shadow: none; }");
  });

  it('exposes the ending mark as an observable capsule with kind semantics', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('class="ending-mark"');
    expect(app).toContain(':data-ending-route="game.scene.ending.route"');
    expect(app).toContain(':data-ending-kind="game.scene.ending.kind"');
    expect(app).toContain("{{ game.scene.ending.route }} · {{ game.scene.ending.kind }} END");
    expect(styles).toContain('.ending-mark {');
    expect(styles).toContain('--ending-accent: #e2c46e;');
    expect(styles).toContain('display: block; width: fit-content;');
    expect(styles).toContain('border-radius: 999px;');
    expect(styles).toContain(".ending-mark[data-ending-kind='true'] {");
    expect(styles).toContain(".ending-mark[data-ending-kind='normal'] { --ending-accent: #8fd0c8;");
    expect(styles).toContain(".ending-mark[data-ending-kind='bad'] { --ending-accent: #ec765f;");
  });

  it('choreographs the minigame settlement card entry with an outcome tone', async () => {
    const [motion, app] = await Promise.all([
      readFile('src/runtime/ui-motion.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
    ]);
    expect(motion).toContain('revealMinigameResult(root: HTMLElement, outcome?: string): void;');
    expect(motion).toContain('revealMinigameResult(root, outcome = \'perfect\') {');
    expect(motion).toContain("outcome === 'assisted' ? '#9fd6ea'");
    expect(motion).toContain("outcome === 'setback' ? '#e39aa0'");
    expect(motion).toContain('runReducedMotion(\'modal\', root)');
    expect(app).toContain('motion?.revealMinigameResult(root, result.outcome)');
    expect(app).toContain('watch(() => minigameResult.value');
    expect(app).toContain(':data-result-outcome="minigameResult.outcome"');
  });

  it('variables the settlement card chrome per outcome while the entry animation keeps its own tones', async () => {
    const styles = await readFile('src/styles.css', 'utf8');
    // Static CSS now consumes the --result-* variable group; the animated h3 tones in
    // ui-motion.ts stay as authored so the entry flash matches the settled state.
    expect(styles).toContain('.minigame-result { --result-accent: #f1d782; --result-border: rgb(215 175 70 / 46%); --result-soft: #8b98a6;');
    expect(styles).toContain('border: 1px solid var(--result-border);');
    expect(styles).toContain('.minigame-result h3 { margin: 0; color: var(--result-accent);');
    expect(styles).toContain('color: var(--result-soft); font-size: .7rem;');
    expect(styles).toContain('.minigame-result--perfect { --result-accent: #f1d782; --result-border: rgb(215 175 70 / 62%); }');
    expect(styles).toContain('.minigame-result--assisted { --result-accent: #9fd6ea; --result-border: rgb(128 199 223 / 46%); }');
    expect(styles).toContain('.minigame-result--setback { --result-accent: #e39aa0; --result-border: rgb(182 74 82 / 56%); }');
    expect(styles).toContain('.minigame-result--skipped { --result-accent: #b6c1cb; --result-border: rgb(170 182 194 / 34%); }');
    // The per-outcome h3 colour overrides were folded into the variable group.
    expect(styles).not.toContain('.minigame-result--assisted h3 { color: #9fd6ea; }');
  });

  it('reveals the scene-label badge on scene change with an observable scene id', async () => {
    const [motion, app, styles] = await Promise.all([
      readFile('src/runtime/ui-motion.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(motion).toContain('revealSceneLabel(root: HTMLElement): void;');
    expect(motion).toContain('revealSceneLabel(root) {');
    expect(motion).toContain('runReducedMotion(\'dialogue\', root)');
    expect(app).toContain('motion?.revealSceneLabel(sceneLabel)');
    expect(app).toContain('data-testid="scene-label"');
    expect(app).toContain(':data-scene-label="game.scene.id"');
    expect(app).toContain('game-hud__scene-label');
    expect(styles).toContain('.game-hud__scene-label {');
    expect(styles).toContain('letter-spacing: .1em');
  });

  it('styles dialogue choices with a directional golden indicator', async () => {
    const styles = await readFile('src/styles.css', 'utf8');
    expect(styles).toContain('.choice-list button::before');
    expect(styles).toContain('linear-gradient(180deg, var(--tone-accent), var(--tone-accent-deep))');
    expect(styles).toContain('--tone-accent: #efd27c');
    expect(styles).toContain('transform: scaleY(.35)');
    expect(styles).toContain('.choice-list button:hover, .choice-list button:focus-visible { transform: translateX(3px); }');
    expect(styles).toContain('.choice-list button:hover::before, .choice-list button:focus-visible::before');
    expect(styles).toContain('.choice-list button:hover, .choice-list button:focus-visible { transform: none; }');
  });

  it('dismisses the minigame settlement card with a choreographed exit', async () => {
    const [motion, app] = await Promise.all([
      readFile('src/runtime/ui-motion.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
    ]);
    expect(motion).toContain('dismissMinigameResult(root: HTMLElement, onComplete: () => void): void;');
    expect(motion).toContain('dismissMinigameResult(root, onComplete) {');
    expect(motion).toContain('if (reducedMotion.value) { onComplete(); return; }');
    expect(app).toContain('motion.dismissMinigameResult(root, done)');
    expect(app).toContain('ref="resultRoot"');
  });

  it('exposes an HUD value detail tooltip and a waiting-for-choice label', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('function signed(value: number): string');
    expect(app).toContain(':title="`基础 ${game.save.values[entry.key]} · 修正 ${signed(game.effectiveValues[entry.key] - game.save.values[entry.key])}`"');
    expect(styles).toContain('.game-hud__value { cursor: help;');
    expect(styles).toContain('text-decoration: underline dotted 1px rgb(215 175 70 / 30%)');
    expect(app).toContain('class="choice-list__wait"');
    expect(app).toContain('data-testid="choice-wait"');
    expect(app).toContain('你的选择将决定走向');
    expect(styles).toContain('.choice-list__wait {');
    expect(styles).toContain('letter-spacing: .18em');
  });

  it('enriches save-slot cards with thumbnail placeholders, scene labels and formatted times', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('save-slot__thumbnail-empty');
    expect(app).toContain(":data-slot-has-thumbnail=\"slot.thumbnailUrl ? 'true' : 'false'\"");
    expect(app).toContain(':data-slot-scene="slot.sceneId"');
    expect(app).toContain('sceneLabelOf(slot)');
    expect(app).toContain('save-slot__tone');
    expect(app).toContain('formatSaveTime(slot.updatedAt)');
    expect(app).toContain(':datetime="slot.updatedAt"');
    // The e2e save flow still reaches the slot buttons through this anchor.
    expect(app).toContain('data-testid="save-slot-1"');
    expect(styles).toContain('.save-slot__thumbnail-empty {');
    expect(styles).toContain('.save-slot:hover, .save-slot:focus-within');
    expect(styles).toContain('.save-slot__tone {');
  });

  it('upgrades the HUD scene badge with a location label and a tone chip', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('locationLabel(game.scene.locationId)');
    expect(app).toContain('chapterLabel(game.scene.chapter)');
    expect(app).toContain('class="game-hud__scene-tone"');
    expect(app).toContain(':data-scene-tone="game.scene.tone"');
    expect(styles).toContain('.game-hud__scene-tone {');
  });

  it('tints the dialogue chrome and scene badge by the authored scene tone', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain(':data-scene-tone="game.scene.tone" @click="completeText"');
    expect(styles).toContain(".dialogue-box[data-scene-tone='threat']");
    expect(styles).toContain(".dialogue-box[data-scene-tone='rain']");
    expect(styles).toContain(".dialogue-box[data-scene-tone='quiet']");
    expect(styles).toContain(".dialogue-box[data-scene-tone='gallery']");
    expect(styles).toContain(".dialogue-box[data-scene-tone='canon-recap']");
    expect(styles).toContain(".dialogue-box[data-scene-tone='canon-recap-outcome']");
    expect(styles).toContain(".dialogue-box[data-scene-tone='AU-boundary']");
    expect(styles).toContain("border: 1px solid var(--tone-accent-soft);");
    expect(styles).toContain('background: linear-gradient(180deg, var(--tone-accent), var(--tone-accent-deep)); box-shadow: 0 0 8px var(--tone-glow);');
  });

  it('marks the slot matching the current session save as active', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain(":data-slot-active=\"slot.id === game.save.saveId ? 'true' : 'false'\"");
    expect(app).toContain("'is-active': slot.id === game.save.saveId");
    expect(app).toContain('当前');
    expect(styles).toContain('.save-slot[data-slot-active=\'true\'] {');
  });

  it('guards save deletion with a two-step confirming state', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('function requestDeleteSlot(id: string): void');
    expect(app).toContain('requestDeleteSlot(slot.id)');
    expect(app).toContain(":data-confirming=\"confirmingDelete === slot.id ? 'true' : 'false'\"");
    expect(app).toContain('is-confirming');
    expect(app).toContain('确认删除?');
    expect(styles).toContain('.save-slot button.is-confirming {');
    // The independent reduced-motion block must stay out of the shared single-line block.
    expect(styles).toContain('@media (prefers-reduced-motion: reduce) { .save-slot { transition: none; } }');
  });

  it('tints the choice-result overlay with the scene tone and flags a critical danger reading', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    // The overlay lives inside .dialogue-box, so it inherits the authored tone variables.
    expect(app).toContain('class="result-overlay" data-testid="choice-result" role="status" aria-live="polite"');
    expect(styles).toContain('.result-overlay { margin-top: 1rem; padding-top: .8rem; border-top: 1px solid var(--tone-accent-soft); }');
    // A raised danger (>0) stays visibly red beyond the transient change pulse.
    expect(app).toContain(":data-hud-critical=\"entry.key === 'danger' && game.effectiveValues.danger > 0 ? 'true' : 'false'\"");
    expect(styles).toContain(".game-hud__value[data-hud-critical='true'] { color: #ec765f; }");
  });

  it('badges the title build state, groups settings, and tints the preload status', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    // Title build line is now an observable golden capsule carrying the release version.
    expect(app).toContain('data-testid="build-state"');
    expect(app).toContain(':data-build-version="ALBINA_RELEASE_VERSION"');
    expect(styles).toContain('.build-state { display: block; width: fit-content; margin: 2rem auto 0;');
    expect(styles).toContain('border-radius: 999px;');
    // Settings screen splits performance and audio into labelled groups; the
    // e2e return-button anchor lives in the untouched header.
    expect(app).toContain('<fieldset class="settings-group">');
    expect(app).toContain('<legend>演出</legend>');
    expect(app).toContain('<legend>音频</legend>');
    expect(styles).toContain('.settings-group {');
    expect(styles).toContain('.settings-group legend {');
    // Media readiness state is observable and tinted per state.
    expect(app).toContain(':data-preload-state="game.preloadState"');
    expect(styles).toContain(".preload-status[data-preload-state='loading'] { color: #e2c46e; }");
    expect(styles).toContain(".preload-status[data-preload-state='ready'] { color: #8fd0c8; }");
    expect(styles).toContain(".preload-status[data-preload-state='idle'] { color: #8b98a6; }");
  });

  it('degrades gallery covers that fail to load to a labelled placeholder', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('const failedGallery = ref(new Set<string>());');
    expect(app).toContain('function markGalleryFailed(id: string): void');
    expect(app).toContain('@error="markGalleryFailed(asset.id)"');
    expect(app).toContain('class="gallery-item__placeholder"');
    expect(app).toContain(':data-gallery-failed="asset.id"');
    expect(app).toContain('>封面缺失</span>');
    expect(app).toContain('function retryGalleryAsset(id: string): void');
    expect(app).toContain('const retryingGallery = ref(new Set<string>());');
    expect(app).toContain(':data-gallery-retrying="retryingGallery.has(asset.id) ? \'true\' : \'false\'"');
    expect(app).toContain('gallerySrc(asset.id, asset.url)');
    expect(app).toContain('重试加载');
    expect(app).toContain(':data-gallery-retrying="retryingGallery.has(asset.id) ? \'true\' : \'false\'"');
    expect(styles).toContain('.gallery-item__placeholder {');
    expect(styles).toContain('border: 1px dashed rgb(215 175 70 / 30%);');
    expect(styles).toContain('.gallery-item__placeholder::before {');
    expect(styles).toContain("content: '✕';");
    // Batch recovery: one action re-requests every failed cover, hidden when
    // nothing failed so the header stays a count instead of a dead control.
    expect(app).toContain('const failedGalleryIds = computed(() => galleryAssets.value.filter((asset) => failedGallery.value.has(asset.id)).map((asset) => asset.id));');
    expect(app).toContain('function retryAllGalleryAssets(): void {');
    expect(app).toContain('for (const id of failedGalleryIds.value) retryGalleryAsset(id);');
    expect(app).toContain('v-if="failedGalleryIds.length"');
    expect(app).toContain('data-testid="gallery-retry-all"');
    expect(app).toContain(':data-gallery-failed-count="failedGalleryIds.length"');
    expect(app).toContain('@click="retryAllGalleryAssets"');
    expect(app).toContain('重试全部失败封面（{{ failedGalleryIds.length }}）');
    expect(styles).toContain('.gallery-retry-all { margin-left: auto;');
    expect(styles).toContain('.gallery-retry-all:hover, .gallery-retry-all:focus-visible {');
    // The header gains a wrapping action, so it must wrap instead of squashing.
    expect(styles).toContain('.panel-screen header { display: flex; flex-wrap: wrap;');
  });

  it('shows a shimmering skeleton while gallery covers load and fades them in', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('const loadedGallery = ref(new Set<string>());');
    expect(app).toContain('function markGalleryLoaded(id: string): void');
    expect(app).toContain('@load="markGalleryLoaded(asset.id)"');
    expect(app).toContain('class="gallery-item__skeleton"');
    expect(app).toContain(':data-gallery-loading="asset.id"');
    expect(app).toContain(":class=\"{ 'is-loaded': galleryState(asset.id) === 'loaded' }\"");
    // The three cover states must be driven by one exclusive selector, not by two
    // independent Set lookups that could both be false or both be true.
    expect(app).toContain(":data-gallery-state=\"galleryState(asset.id)\"");
    expect(app).toContain(":aria-busy=\"galleryState(asset.id) === 'loading' ? 'true' : 'false'\"");
    expect(app).toContain("v-if=\"galleryState(asset.id) === 'loading'\"");
    expect(app).toContain("v-if=\"galleryState(asset.id) !== 'failed'\"");
    expect(styles).toContain(".gallery-item[data-gallery-state='loading'] {");
    expect(styles).toContain(".gallery-item[data-gallery-state='loaded'] {");
    expect(styles).toContain(".gallery-item[data-gallery-state='failed'] {");
    expect(styles).toContain('.gallery-item__skeleton {');
    expect(styles).toContain('@keyframes gallery-shimmer');
    expect(styles).toContain('.gallery-item img.is-loaded { opacity: 1; }');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce) { .gallery-item__skeleton { animation: none;');
    expect(styles).toContain('.dialogue-box__progress span { display: block; width: 100%;');
  });

  it('keeps gallery preview failures and keyboard modal flow accessible', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('const galleryViewerCloseButton = ref<HTMLButtonElement>();');
    expect(app).toContain('function handleGalleryViewerKeydown(event: KeyboardEvent): void');
    expect(app).toContain('function gallerySrc(id: string, url: string): string');
    expect(app).toContain('function retryGalleryAsset(id: string): void');
    expect(app).toContain('galleryRetryNonce.value');
    expect(app).toContain("@click=\"retryGalleryAsset(gallerySelectedId)\"");
    expect(app).toContain("if (event.key === 'Escape') {");
    expect(app).toContain("if (event.key === 'Tab') {");
    // Focus stays inside the dialog but rotates across every enabled control, so the
    // retry and prev/next buttons remain keyboard reachable.
    expect(app).toContain("galleryViewerRoot.value?.querySelectorAll<HTMLButtonElement>('button:not([disabled])')");
    expect(app).toContain('const offset = event.shiftKey ? -1 : 1;');
    expect(app).toContain('focusable[next]?.focus();');
    expect(app).toContain('galleryViewerCloseButton.value?.focus();');
    expect(app).toContain('void nextTick(() => galleryTrigger.value?.focus());');
    // Stepping between CGs must not replay the modal entrance nor steal focus back.
    expect(app).toContain('if (id && previous === undefined && galleryViewerRoot.value) {');
    // Arrow keys walk the unlocked set with wrap-around, mirrored by an explicit
    // prev/next control pair plus a position counter.
    expect(app).toContain("if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {");
    expect(app).toContain('function stepGalleryAsset(delta: number): void');
    expect(app).toContain('const galleryIndex = computed(');
    expect(app).toContain('class="gallery-viewer__nav"');
    expect(app).toContain(':data-gallery-index="galleryIndex + 1"');
    expect(app).toContain(':data-gallery-total="galleryAssets.length"');
    expect(app).toContain('aria-label="上一张 CG"');
    expect(app).toContain('aria-label="下一张 CG"');
    expect(styles).toContain('.gallery-viewer__nav {');
    expect(styles).toContain('.gallery-viewer__counter {');
    expect(app).toContain('@keydown="handleGalleryViewerKeydown"');
    expect(app).toContain('ref="galleryViewerCloseButton"');
    expect(app).toContain('function selectGalleryAsset(id: string, trigger?: EventTarget | null): void');
    expect(app).toContain("@click=\"selectGalleryAsset(asset.id, $event.currentTarget)\"");
    expect(app).toContain('v-if="!failedGallery.has(gallerySelectedId)"');
    expect(app).toContain('@load="markGalleryLoaded(gallerySelectedId)" @error="markGalleryFailed(gallerySelectedId)"');
    expect(app).toContain('class="gallery-viewer__placeholder"');
    expect(app).toContain(':data-gallery-preview-failed="gallerySelectedId"');
    expect(styles).toContain('.gallery-viewer__placeholder {');
    expect(styles).toContain('border: 1px dashed rgb(236 118 95 / 42%);');
  });
});
