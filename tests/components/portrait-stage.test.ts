import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('PortraitStage accessibility semantics', () => {
  it('exposes the portrait stage as a named region', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain('class="portrait-stage" role="region" aria-label="角色立绘"');
  });

  it('propagates host reduced motion into portrait playback', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain('reducedMotion: boolean');
    expect(source).toContain('props.service.setReducedMotionOverride(reducedMotion)');
    expect(source).toContain(':data-reduced-motion=');
  });

  it('keeps three stable portrait slots and renders an empty placeholder', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain("const slots = ['left', 'center', 'right'] as const;");
    expect(source).toContain('data-slot="');
    expect(source).toContain('portrait-slot__empty');
    expect(source).toContain('Promise.all(props.portraits.map');
  });

  it('binds the scene speaker to the speaking-portrait focus', async () => {
    const [source, app] = await Promise.all([
      readFile('src/components/PortraitStage.vue', 'utf8'),
      readFile('src/App.vue', 'utf8'),
    ]);
    expect(source).toContain('speaker?: string');
    expect(source).toContain('props.speaker ?? props.portraits.find((portrait) => portrait.active)?.characterId');
    expect(source).toContain("'is-speaking': portrait.active && portrait.characterId === speakingId");
    expect(source).toContain(':data-speaking="portrait.characterId === speakingId ? \'true\' : \'false\'"');
    expect(source).toContain(':data-focus="portrait.active ? \'primary\' : \'supporting\'"');
    expect(app).toContain(':speaker="game.scene.speaker"');
  });

  it('exposes an observable per-portrait stage state for static downgrade', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain('data-state="present"');
    expect(source).toContain('data-state="exiting"');
    expect(source).toContain(':data-reduced-motion="reducedMotion ? \'true\' : \'false\'"');
    expect(source).toContain('cancelExits');
  });

  it('plays an exit for portraits removed from the scene and drops them deterministically', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain('const exiting = ref<PortraitCue[]>([]);');
    expect(source).toContain('const departed = previousPortraits.filter((portrait) => !nextKeys.has(cueKey(portrait)));');
    expect(source).toContain('if (departed.length) void playExits(departed);');
    expect(source).toContain('function dropExit(portrait: PortraitCue): void');
    expect(source).toContain('v-for="portrait in exiting"');
    expect(source).toContain('canvasRef(`${cueKey(portrait)}:exiting`, element)');
  });

  it('enters the speaking portrait first, then cascades active and supporting portraits', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain("query('.portrait-stage__canvas.is-speaking')");
    expect(source).toContain("query('.portrait-stage__canvas.is-active:not(.is-speaking)')");
    expect(source).toContain("query('.portrait-stage__canvas.is-supporting')");
    expect(source).toContain("duration: .5");
    expect(source).toContain('stagger: .09');
    expect(source).toContain("}, .22)");
  });

  it('breathes a glow on the speaking portrait and kills it on reduced motion', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain('let speakingGlowTween: gsap.core.Tween | undefined;');
    expect(source).toContain('function syncSpeakingGlow(): void');
    expect(source).toContain("gsap.fromTo(canvas, { boxShadow: '0 0 0 rgba(230, 190, 96, 0)' }");
    expect(source).toContain('repeat: -1');
    expect(source).toContain("if (props.reducedMotion || !stage.value) return;");
    expect(source).toContain(':data-speaking-glow="portrait.active && portrait.characterId === speakingId ? \'true\' : \'false\'"');
    expect(source).toContain('speakingGlowTween?.kill();');
  });

  it('orchestrates the speaker handover with a settle and an emphasis pulse', async () => {
    const source = await readFile('src/components/PortraitStage.vue', 'utf8');
    expect(source).toContain('function orchestrateSpeakerTransfer(): Promise<void>');
    expect(source).toContain('speakerTransferNonce.value += 1;');
    expect(source).toContain('querySelectorAll<HTMLElement>(\'.portrait-stage__canvas.is-speaking\')');
    expect(source).toContain('querySelectorAll<HTMLElement>(\'.portrait-stage__canvas.is-active:not(.is-speaking)\')');
    expect(source).toContain("filter: 'brightness(1) saturate(1)'");
    expect(source).toContain("filter: 'brightness(1.18) saturate(1.12)'");
    expect(source).toContain('clearProps: \'filter\'');
    // The handover publishes an observable nonce on the stage root and only
    // touches filter — the authored transform stays owned by the template.
    expect(source).toContain(':data-speaker-transfer="speakerTransferNonce"');
    expect(source).toContain('watch(() => speakingId.value, () => {');
    expect(source).toContain("syncSpeakingGlow();\n  void orchestrateSpeakerTransfer();\n}, { flush: 'post' });");
    expect(source).toContain('transferTween?.kill();');
  });
});
