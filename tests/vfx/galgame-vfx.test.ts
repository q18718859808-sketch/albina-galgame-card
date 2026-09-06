import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

import { VFX_QUALITY_PROFILES, resolveAutoVfxQuality, resolveRouteProgress, resolveVfxCue, resolveVfxQuality, shouldAcceptVfxCue, transitionModeForCue } from '../../src/vfx/galgame-vfx';
import { defaultCueProfile, VfxCueSchema, VfxSceneStateSchema } from '../../src/domain/vfx-cue';

describe('galgame VFX quality and lifecycle contract', () => {
  it('uses high as the authored auto profile and keeps all explicit fallbacks available', () => {
    expect(resolveVfxQuality()).toBe('high');
    expect(resolveVfxQuality('medium')).toBe('medium');
    expect(resolveVfxQuality('low')).toBe('low');
    expect(resolveVfxQuality('static')).toBe('static');
    expect(resolveVfxQuality('high', true)).toBe('static');
    expect(VFX_QUALITY_PROFILES.high.particles).toBeGreaterThan(VFX_QUALITY_PROFILES.medium.particles);
    expect(VFX_QUALITY_PROFILES.medium.particles).toBeGreaterThan(VFX_QUALITY_PROFILES.low.particles);
  });

  it('maps AU boundaries to the AU/IF route while retaining the junction milestone', () => {
    expect(resolveRouteProgress('white_canvas', 'opening_001')).toMatchObject({
      band: 'au-boundary', branch: 'au-if', reached: 'junction', canonReached: true, junctionReached: true,
    });
  });

  it('selects low only for data-saving or very constrained devices and retains medium for moderate capability', () => {
    expect(resolveAutoVfxQuality({ saveData: true, hardwareConcurrency: 8, deviceMemory: 8 })).toBe('low');
    expect(resolveAutoVfxQuality({ deviceMemory: 2, hardwareConcurrency: 8 })).toBe('low');
    expect(resolveAutoVfxQuality({ deviceMemory: 4, hardwareConcurrency: 8 })).toBe('medium');
    expect(resolveAutoVfxQuality({ hardwareConcurrency: 4, deviceMemory: 8 })).toBe('medium');
    expect(resolveAutoVfxQuality({ hardwareConcurrency: 8, deviceMemory: 8 })).toBe('high');
  });

  it('rejects a lower-priority cue without allowing it to replace an active authored transition', () => {
    expect(shouldAcceptVfxCue(7, { kind: 'dialogue-emphasis' })).toBe(false);
    expect(shouldAcceptVfxCue(6, { kind: 'route-transition' })).toBe(true);
    expect(shouldAcceptVfxCue(5, { kind: 'ending' })).toBe(true);
    expect(resolveVfxCue(7, { kind: 'dialogue-emphasis', intensity: 1, focus: [0.1, 0.9] })).toBeUndefined();
    expect(resolveVfxCue(6, { kind: 'route-transition', intensity: 0.9, durationMs: 1200, focus: [0.2, 0.8] })).toEqual({
      kind: 'route-transition', priority: 6, intensity: 0.9, durationMs: 1200, focus: [0.2, 0.8],
    });
  });

  it('keeps context-loss pause sticky until an owner remounts the renderer', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('let contextLost = false;');
    expect(source).toContain('contextLost = true;');
    expect(source).toContain('if (disposed || contextLost || (typeof document !== \'undefined\' && document.hidden) || animationRunning) return;');
  });

  it('adds a screen-space relationship ribbon and cue-owned focus ripple to the shared runtime', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('function createRelationshipRibbon');
    expect(source).toContain('function createFocusRipple');
    expect(source).toContain('uRibbonSource');
    expect(source).toContain('uRibbonTarget');
    expect(source).toContain('uRipple');
    expect(source).toContain("dataset.vfxRibbon = presentation.relationshipRibbon ? 'active' : 'idle'");
    expect(source).toContain("dataset.vfxRipple = shouldRipple ? 'active' : 'idle'");
    expect(source).toContain("dataset.vfxLayerStack = 'stage,atmosphere,particles,motifs,ribbon,ripple,transition'");
    expect(source).toContain('relationshipRibbon.geometry.dispose(); relationshipRibbon.material.dispose();');
    expect(source).toContain('focusRipple.geometry.dispose(); focusRipple.material.dispose();');
  });

  it('builds a layered cinematic stage from one shared frame-uniform source', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('function createStageField');
    expect(source).toContain('function createForegroundMotifs');
    expect(source).toContain('uSceneProgress');
    expect(source).toContain('uParallax');
    expect(source).toContain('uMotifDensity');
    expect(source).toContain("dataset.vfxLayerStack = 'stage,atmosphere,particles,motifs,ribbon,ripple,transition'");
    expect(source).toContain('applyVisualProfile(frame, presentation);');
    expect(source).toContain('stage.geometry.dispose(); stage.material.dispose();');
    expect(source).toContain('motifs.geometry.dispose(); motifs.material.dispose();');
  });

  it('keeps the static runtime aligned with the initial route and makes disposal idempotent', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain("Pick<GalgameVfxOptions, 'route' | 'sceneId' | 'tone'>");
    expect(source).toContain('canvas.dataset.vfxRoute = options.route;');
    expect(source).toContain('if (disposed) return;');
    expect(source).toContain("canvas.dataset.vfxContext = 'disposed';");
  });

  it('keeps the static setState API safe when passed as an unbound callback', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain("setState(nextRoute, nextSceneId) {");
    expect(source).toContain('canvas.dataset.vfxRoute = nextRoute;');
    expect(source).not.toContain('this.setSceneState({ route: nextRoute, sceneId: nextSceneId });');
  });

  it('clears the static canvas before redrawing a changed route', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('context.clearRect(0, 0, width, height);');
  });

  it('maps semantic scene state and cues while pausing rather than spinning RAF in hidden tabs', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain("export type VfxQualityPreference = 'auto' | VfxQuality");
    expect(source).toContain('setSceneState(state: VfxSceneState): void;');
    expect(source).toContain('emit(cue: VfxCue): void;');
    expect(source).toContain('const emit = (cue: VfxCue) =>');
    expect(source).toContain('const setSceneState = (state: VfxSceneState) =>');
    expect(source).toContain('cueForSceneTone(state.tone)');
    expect(source).toContain("document.addEventListener('visibilitychange', onVisibilityChange)");
    expect(source).toContain('renderer.setAnimationLoop(null);');
    expect(source).toContain('clock.stop();');
    expect(source).toContain("renderer.domElement.dataset.vfxTransition = 'idle';");
    expect(source).toContain('document.removeEventListener(\'visibilitychange\', onVisibilityChange);');
  });

  it('connects the optional scene tone and visible speaking focus without requiring a host API change', async () => {
    const [atmosphere, portraits] = await Promise.all([
      readFile('src/components/SceneAtmosphere.vue', 'utf8'),
      readFile('src/components/PortraitStage.vue', 'utf8'),
    ]);
    expect(atmosphere).toContain('tone?: string;');
    expect(atmosphere).toContain('runtime?.setSceneState({ route, sceneId, ...(chapter !== undefined ? { chapter } : {}), ...(tone ? { tone } : {}), focus: props.presentation.focus });');
    expect(atmosphere).toContain('runtime?.setPresentation(props.presentation);');
    expect(portraits).toContain("'is-speaking': portrait.active && portrait.characterId === speakingId");
    expect(portraits).toContain(':data-speaking="portrait.characterId === speakingId ? \'true\' : \'false\'"');
    expect(portraits).toContain('.portrait-stage__canvas.is-speaking');
  });

  it('mounts a usable static runtime for reduced motion, unavailable WebGL, and context loss', async () => {
    const [vfx, source] = await Promise.all([
      readFile('src/vfx/galgame-vfx.ts', 'utf8'),
      readFile('src/components/SceneAtmosphere.vue', 'utf8'),
    ]);
    expect(vfx).toContain('export function createStaticGalgameVfx');
    expect(vfx).toContain("canvas.dataset.vfxEffect = 'static-svg-fallback';");
    expect(vfx).toContain("quality: 'static'");
    expect(source).toContain('mountStaticRuntime(container);');
    expect(source).toContain('onContextLost: () =>');
    expect(source).toContain('aria-hidden="true"');
  });

  it('keeps route, pause, context-loss, and disposal state observable', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain("canvas.dataset.vfxPaused = 'true';");
    expect(source).toContain("canvas.dataset.vfxRoute = state.route;");
    expect(source).toContain("renderer.domElement.dataset.vfxRoute = route;");
    expect(source).toContain("renderer.domElement.dataset.vfxContext = 'lost';");
    expect(source).toContain("renderer.domElement.dataset.vfxContext = 'disposed';");
    expect(source).toContain('pauseAnimation();');
  });

  it('guards browser APIs and connects gameplay events to semantic VFX cues', async () => {
    const [vfx, app, portraits] = await Promise.all([
      readFile('src/vfx/galgame-vfx.ts', 'utf8'),
      readFile('src/App.vue', 'utf8'),
      readFile('src/components/PortraitStage.vue', 'utf8'),
    ]);
    expect(vfx).toContain("typeof globalThis.matchMedia === 'function'");
    expect(vfx).toContain("typeof ResizeObserver !== 'undefined'");
    expect(vfx).toContain("typeof document !== 'undefined'");
    expect(app).toContain("emitVfx({ kind: 'choice-confirm' })");
    expect(app).toContain("emitVfx({ kind: 'dialogue-emphasis'");
    expect(app).toContain("emitVfx({ kind: 'cg-reveal' })");
    expect(app).toContain("emitVfx({ kind: 'ending' })");
    expect(app).toContain('data-testid="vfx-quality"');
    expect(portraits).toContain(".portrait-stage[data-reduced-motion='true'] .portrait-stage__canvas");
  });

  it('keeps media readiness and parallel preloading visible to the frontend', async () => {
    const [app, store, cache] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/stores/game.ts', 'utf8'),
      readFile('src/runtime/asset-cache.ts', 'utf8'),
    ]);
    expect(app).toContain('data-testid="preload-status"');
    expect(store).toContain("const preloadState = ref<'idle' | 'loading' | 'ready'>('idle');");
    expect(store).toContain('await Promise.all(target.portraits.map');
    expect(cache).toContain('await Promise.all([...new Set(assetIds)].map');
  });

  it('provides a keyboard-accessible gallery viewer and honest empty state', async () => {
    const source = await readFile('src/App.vue', 'utf8');
    expect(source).toContain('data-testid="gallery-empty"');
    expect(source).toContain('data-testid="gallery-viewer"');
    expect(source).toContain('class="gallery-item__open" type="button"');
    expect(source).toContain('aria-modal="true"');
  });

  it('keeps authored cue priority and static fallback semantics explicit', async () => {
    const [vfx, atmosphere] = await Promise.all([
      readFile('src/vfx/galgame-vfx.ts', 'utf8'),
      readFile('src/components/SceneAtmosphere.vue', 'utf8'),
    ]);
    expect(vfx).toContain('const CUE_PRIORITY: Record<VfxCue[\'kind\'], number>');
    expect(vfx).toContain('const resolved = transitionVeil.mesh.visible ? resolveVfxCue(transitionPriority, cue) : resolveVfxCue(0, cue);');
    expect(vfx).toContain('if (!resolved) return;');
    expect(vfx).toContain('beginTransition(resolved.durationMs, resolved.priority, resolved.kind);');
    expect(vfx).toContain("cue.kind === 'route-transition' || cue.kind === 'chapter-transition'");
    expect(atmosphere).toContain("props.quality === 'static' ? 'static-quality'");
    expect(atmosphere).toContain('if (props.reducedMotion || props.quality === \'static\' || !webglAvailable.value)');
  });

  it('keeps route and chapter transitions distinct in the authored cue contract', () => {
    expect(VfxCueSchema.parse({ kind: 'route-transition' }).kind).toBe('route-transition');
    expect(defaultCueProfile('route-transition').durationMs!).toBeGreaterThan(defaultCueProfile('chapter-transition').durationMs!);
    expect(VfxSceneStateSchema.parse({ route: 'white_canvas', sceneId: 'white_canvas_001', chapter: 1 }).chapter).toBe(1);
  });

  it('maps story cues to distinct procedural transition modes instead of a single generic fade', async () => {
    expect(transitionModeForCue('choice-confirm')).toBe(1);
    expect(transitionModeForCue('impact')).toBe(2);
    expect(transitionModeForCue('route-transition')).toBe(3);
    expect(transitionModeForCue('cg-reveal')).toBe(4);
    expect(transitionModeForCue('ending')).toBe(5);
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('uTransitionMode');
    expect(source).toContain("renderer.domElement.dataset.vfxTransitionKind = kind;");
    expect(source).toContain('beginTransition(resolved.durationMs, resolved.priority, resolved.kind);');
  });

  it('documents mobile and unload-safe quality selection', async () => {
    const [vfx, atmosphere, app] = await Promise.all([
      readFile('src/vfx/galgame-vfx.ts', 'utf8'),
      readFile('src/components/SceneAtmosphere.vue', 'utf8'),
      readFile('src/App.vue', 'utf8'),
    ]);
    expect(vfx).toContain("globalThis.matchMedia('(pointer: coarse)')");
    expect(vfx).toContain('hardwareConcurrency');
    expect(vfx).toContain('deviceMemory');
    expect(atmosphere).toContain('generation !== mountGeneration || !host.value');
    expect(atmosphere).toContain('webglAvailable.value = false;');
    expect(app).toContain(':chapter="game.scene.chapter"');
  });

  it('publishes an adaptive quality contract and downshifts the pixel ratio under sustained low FPS', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('function createFpsGovernor');
    expect(source).toContain('const ADAPTIVE_FPS_TARGET = 42;');
    expect(source).toContain('const ADAPTIVE_SETTLE_MS = 3000;');
    expect(source).toContain('fpsGovernor.tick(');
    expect(source).toContain("renderer.domElement.dataset.vfxAdaptive = 'active';");
    expect(source).toContain('renderer.domElement.dataset.vfxQualityLevel = adaptiveQuality;');
    expect(source).toContain('options.onQualityDownshift?.(adaptiveQuality);');
    expect(source).toContain("canvas.dataset.vfxAdaptive = 'idle';");
    expect(source).toContain("canvas.dataset.vfxQualityLevel = 'static';");
  });

  it('drives impact and CG reveals with a decaying chromatic aberration envelope', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('uAberration');
    expect(source).toContain("resolved.kind === 'impact'");
    expect(source).toContain('Math.exp(-deltaSeconds / .09)');
    expect(source).toContain('uAberration*.016');
  });

  it('cross-fades the transition veil between the departed and incoming route palettes', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('uPaletteFrom');
    expect(source).toContain('uPaletteTo');
    expect(source).toContain('uPaletteMix');
    expect(source).toContain('veilPaletteFrom = palettePrimaryColor(three, previousRoute);');
    expect(source).toContain('veilPaletteTo = palettePrimaryColor(three, state.route);');
    expect(source).toContain('Math.min(1, progress * 2)');
    expect(source).toContain('paletteColor=mix(uPaletteFrom,uPaletteTo,uPaletteMix)');
  });

  it('lets the director own damped focus while the frame loop only publishes it', async () => {
    const [vfx, director] = await Promise.all([
      readFile('src/vfx/galgame-vfx.ts', 'utf8'),
      readFile('src/runtime/scene-director.ts', 'utf8'),
    ]);
    expect(director).toContain('setFocus(target: [number, number]): void;');
    expect(director).toContain('focus: [number, number];');
    expect(director).toContain('Math.exp(-Math.min(deltaMs, 250) / tau)');
    expect(vfx).toContain('director.setFocus(resolved.focus);');
    expect(vfx).toContain('frame.uFocus.value.set(directorState.focus[0], directorState.focus[1]);');
    // The frame loop publishes the damped focus through the cached dataset
    // writer: same observable, written only when the damped value moves.
    expect(vfx).toContain("publish('vfxCameraFocus', `${directorState.focus[0].toFixed(4)},${directorState.focus[1].toFixed(4)}`);");
  });

  it('enters scenes with a deterministic overshoot ease and settles exactly on the authored zoom', async () => {
    const source = await readFile('src/runtime/scene-director.ts', 'utf8');
    expect(source).toContain('function easeOutOvershoot');
    expect(source).toContain('const eased = easeOutOvershoot(enterProgress);');
    expect(source).toContain('1 + c3 * shift * shift * shift + overshoot * shift * shift');
  });

  it('exposes the adaptive downshift through the atmosphere host for debugging and testing', async () => {
    const source = await readFile('src/components/SceneAtmosphere.vue', 'utf8');
    expect(source).toContain("const adaptiveState = ref<'idle' | 'active'>('idle');");
    expect(source).toContain(':data-vfx-adaptive="adaptiveState"');
    expect(source).toContain(':data-vfx-quality-level="qualityLevel"');
    expect(source).toContain('onQualityDownshift: (level) =>');
    expect(source).toContain("qualityLevel.value = 'static';");
  });

  it('publishes frozen palette travel and chromatic aberration observables on the static path', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('let veilPaletteFrom: [number, number, number] | undefined;');
    expect(source).toContain("canvas.dataset.vfxPaletteFrom = veilPaletteFrom.join(',');");
    expect(source).toContain("canvas.dataset.vfxPaletteTo = veilPaletteTo.join(',');");
    expect(source).toContain("canvas.dataset.vfxPaletteMix = '1';");
    expect(source).toContain("canvas.dataset.vfxAberration = cue.kind === 'impact' || cue.kind === 'cg-reveal' ? 'static' : 'idle';");
    // The frozen composition expresses the shock as an offset ghost edge
    // instead of a timer-driven split, and anchors it on the authored camera
    // focus with the ring radius scaled to the cue energy.
    expect(source).toContain('ellipse(rippleFocus[0] - width * .012 * rippleIntensity, rippleFocus[1], width * .12 * rippleIntensity, height * .16 * rippleIntensity');
    expect(source).toContain("const isImpact = rippleCue === 'impact';");
    expect(source).toContain('const rippleFocus = [cameraFocus[0] * width, cameraFocus[1] * height] as const;');
    expect(source).toContain("canvas.dataset.vfxRippleIntensity = rippleIntensity.toFixed(3);");
    expect(source).toContain('rippleIntensity = cue.intensity ?? defaultCueProfile(cue.kind).intensity!;');
  });

  it('pauses the WebGL loop when the canvas leaves the viewport and throttles per-frame DOM writes', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    // Tavern transcripts scroll the card far below the fold while the
    // document stays visible: the loop must stop when the canvas is offscreen.
    expect(source).toContain('let viewportVisible = true;');
    expect(source).toContain('typeof IntersectionObserver !== \'undefined\'');
    expect(source).toContain('viewportObserver.observe(container);');
    expect(source).toContain('const syncAnimationState = () => {');
    expect(source).toContain('renderer.domElement.dataset.vfxViewport = renderable ? \'visible\' : \'hidden\';');
    expect(source).toContain('viewportObserver?.disconnect();');
    // Visibility pause and viewport pause share one decision point so neither
    // resurrection path can fight the other.
    expect(source).toContain('const onVisibilityChange = () => {\n    syncAnimationState();\n  };');
    // Per-frame dataset writes are cached: five camera attributes only change
    // on director beats, so steady-state frames must not touch the DOM.
    expect(source).toContain('const publishedObservables: Record<string, string> = {};');
    expect(source).toContain('if (publishedObservables[key] === value) return;');
    expect(source).toContain("publish('vfxCameraFocus', `${directorState.focus[0].toFixed(4)},${directorState.focus[1].toFixed(4)}`);");
    expect(source).not.toContain('renderer.domElement.dataset.vfxCameraPhase = directorState.phase;');
    expect(source).not.toContain('renderer.domElement.dataset.vfxCameraProgress = directorState.progress.toFixed(3);');
    expect(source).not.toContain('renderer.domElement.dataset.vfxCameraZoom = directorState.zoom.toFixed(4);');
    expect(source).not.toContain('renderer.domElement.dataset.vfxCameraShake = directorState.shake.toFixed(4);');
  });

  it('warms the three chunk on idle so the first WebGL scene avoids a parse stall', async () => {
    const source = await readFile('src/components/SceneAtmosphere.vue', 'utf8');
    expect(source).toContain("void import('three').catch(() => { /* static fallback already live */ });");
    expect(source).toContain('idle.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1200))');
    expect(source).toContain("if (!props.reducedMotion && props.quality !== 'static') {");
  });
});
