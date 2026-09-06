import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';
import * as three from 'three';

import { createVfxFrameUniforms, resolveRouteProgress, sharedVfxUniforms } from '../../src/vfx/galgame-vfx';
import { resolveContinuityBand } from '../../src/domain/story-provenance';

describe('SceneAtmosphere contracts', () => {
  it('keeps a static SVG route map beside the lifecycle-owned WebGL layer', async () => {
    const source = await readFile('src/components/SceneAtmosphere.vue', 'utf8');
    expect(source).toContain("await import('three')");
    expect(source).toContain('createGalgameVfx');
    expect(source).toContain('onMounted(() => {');
    expect(source).toContain('void mountScene();');
    expect(source).toContain('mountGeneration');
    expect(source).toContain('data-testid="route-map"');
    expect(source).toContain('data-testid="static-refraction"');
    expect(source).toContain("'reduced-motion'");
    expect(source).toContain("'webgl-unavailable'");
    expect(source).toContain(':data-vfx-mode=');
    expect(source).toContain("'is-static': staticPresentation");
    expect(source).toContain('data-vfx-transition');
    expect(source).toContain('data-semantic-cue');
    expect(source).toContain('data-testid="semantic-cue"');
    expect(source).toContain("const semanticCue = ref<VfxCue['kind']>('atmosphere')");
    expect(source).toContain('function showSemanticCue(cue: VfxCue)');
    expect(source).toContain('createVfxInteractionChannel');
    expect(source).toContain('interaction.commitScene');
    expect(source).toContain('interaction.dispose();');
    expect(source).toContain('runtime?.emit(cue);');
    expect(source).toContain(':key="cueNonce"');
    expect(source).toContain('routeProgress');
    expect(source).toContain('Scene transition');
    expect(source).toContain('if (props.reducedMotion)');
    expect(source).toContain('transitionTimer = undefined');
    expect(source).not.toContain("matchMedia('(max-width: 800px)')");
    // Atmosphere follows the committed save route, not the opening preference.
    expect(source).toContain('const activeRoute = computed(() => props.route ?? props.routePreference)');
    expect(source).toContain('route: activeRoute.value,');
    expect(source).toContain(':data-continuity-band="routeProgress.band"');
    expect(source).toContain(':data-visual-profile="presentation.visual.profile"');
    expect(source).toContain('scene-atmosphere__static-motif');
    expect(source).toContain('data-testid="route-status"');
    expect(source).toContain('data-testid="scene-atmosphere-mode" role="status" aria-live="polite"');
    expect(source).toContain(':data-vfx-status="isTransitioning ? \'transitioning\' : webglAvailable ? \'live\' : \'static\'"');
    expect(source).toContain('props.quality === \'static\' ? \'static-quality\'');
    // Route-map progression: canon is always traversed, branch legs light up
    // only after the save commits, and reached nodes carry a lit core + halo.
    expect(source).toContain(':data-route-reached="routeProgress.reached"');
    expect(source).toContain(':data-route-scene="sceneId"');
    expect(source).toContain('scene-atmosphere__route-leg is-traversed');
    expect(source).toContain("'is-traversed': routeProgress.reached === 'golden_bough_rebuild'");
    expect(source).toContain("'is-traversed': routeProgress.reached === 'white_canvas'");
    expect(source).toContain("'is-traversed': routeProgress.reached === 'ring_conspiracy'");
    expect(source).toContain("'scene-atmosphere__route-core'");
    expect(source).not.toContain('M20 42H120M120 42L218');
    expect(source).toContain('runtime?.setSceneState({ route, sceneId, ...(chapter !== undefined ? { chapter } : {}), ...(tone ? { tone } : {}), focus: props.presentation.focus });');
    expect(source).toContain('runtime?.setPresentation(props.presentation);');
    expect(source).toContain('chapter?: number;');
    expect(source).toContain('generation !== mountGeneration || !host.value');
    // The traversed-leg styling lives in the global stylesheet beside the
    // other route-map primitives, not in the component's scoped styles.
    const styles = await readFile('src/styles.css', 'utf8');
    expect(styles).toContain('.scene-atmosphere__route-line.is-traversed');
    expect(styles).toContain('.scene-atmosphere__route-core.is-reached');
    expect(styles).toContain('.scene-atmosphere__route-node.is-reached');
  });

  it('renders the route status as labelled chips with observable states', async () => {
    const [source, styles] = await Promise.all([
      readFile('src/components/SceneAtmosphere.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(source).toContain('data-testid="route-status" data-route-status');
    expect(source).toContain('scene-atmosphere__status-chip--route');
    expect(source).toContain('scene-atmosphere__status-chip--band');
    expect(source).toContain('scene-atmosphere__status-chip--junction');
    expect(source).toContain(":data-junction=\"routeProgress.junctionReached ? 'reached' : 'pending'\"");
    expect(styles).toContain('.scene-atmosphere__status-chip {');
    expect(styles).toContain(".scene-atmosphere__status-chip[data-junction='reached']");
    expect(styles).toContain(".scene-atmosphere__status-chip[data-junction='pending']");
    // Band variants carry continuity semantics: canon teal, AU boundary magenta, AU route violet.
    expect(styles).toContain(".scene-atmosphere__status-chip--band[data-band='canon']");
    expect(styles).toContain(".scene-atmosphere__status-chip--band[data-band='au-boundary']");
    expect(styles).toContain(".scene-atmosphere__status-chip--band[data-band='au-route']");
  });

  it('exposes the scene tone on the container and tints the static refraction composition', async () => {
    const [source, styles] = await Promise.all([
      readFile('src/components/SceneAtmosphere.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(source).toContain(":data-scene-tone=\"tone ?? ''\"");
    expect(source).toContain('stop-color="var(--atmo-core)"');
    expect(source).toContain('stop-color="var(--atmo-rim)"');
    expect(source).toContain('stop-color="var(--atmo-mirror)"');
    expect(source).toContain('stroke="var(--atmo-line)"');
    expect(styles).toContain('.scene-atmosphere { --atmo-core: #d7af46;');
    expect(styles).toContain(".scene-atmosphere[data-scene-tone='threat']");
    expect(styles).toContain(".scene-atmosphere[data-scene-tone='rain']");
    expect(styles).toContain(".scene-atmosphere[data-scene-tone='AU-boundary']");
  });

  it('releases the remote-host renderer on pagehide and remounts after pageshow', async () => {
    const source = await readFile('src/components/SceneAtmosphere.vue', 'utf8');
    expect(source).toContain("lifecycleWindow.addEventListener('pagehide', releaseForPageHide);");
    expect(source).toContain("lifecycleWindow.addEventListener('pageshow', restoreAfterPageShow);");
    expect(source).toContain('runtime?.dispose();');
    expect(source).toContain('mountGeneration += 1;');
    expect(source).toContain('if (!host.value || runtime || mountGeneration < 1) return;');
    expect(source).toContain('void mountScene();');
    expect(source).toContain("lifecycleWindow?.removeEventListener('pagehide', releaseForPageHide);");
    expect(source).toContain("lifecycleWindow?.removeEventListener('pageshow', restoreAfterPageShow);");
  });

  it('keeps semantic cue feedback visible when WebGL is unavailable or motion is reduced', async () => {
    const source = await readFile('src/components/SceneAtmosphere.vue', 'utf8');
    expect(source).toContain("showSemanticCue(cue);");
    expect(source).toContain("props.reducedMotion || props.quality === 'static' || !webglAvailable.value");
    expect(source).toContain("semanticCue.value = cue.kind;");
    expect(source).toContain("cueTimer = setTimeout(clearCue, Math.max(240, cue.durationMs ?? 900));");
    expect(source).toContain(".scene-atmosphere[data-semantic-cue='choice-confirm']");
    expect(source).toContain(".scene-atmosphere[data-semantic-cue='impact']");
    expect(source).toContain(".scene-atmosphere[data-semantic-cue='cg-reveal']");
    expect(source).toContain(".scene-atmosphere[data-vfx-mode='reduced-motion'] .scene-atmosphere__semantic-cue");
    expect(source).toContain('if (cueTimer) clearTimeout(cueTimer);');
  });

  it('uses procedural route effects, quality budgets, context loss handling, and explicit teardown', async () => {
    const source = await readFile('src/vfx/galgame-vfx.ts', 'utf8');
    expect(source).toContain('ShaderMaterial');
    expect(source).toContain('qualityBudget');
    expect(source).toContain("export type VfxQuality = 'high' | 'medium' | 'low' | 'static'");
    expect(source).toContain("globalThis.matchMedia('(prefers-reduced-motion: reduce)')");
    expect(source).toContain("canvas.dataset.vfxEffect = 'static-svg-fallback'");
    expect(source).toContain("has('vfx-proof')");
    expect(source).toContain('webglcontextlost');
    expect(source).toContain('renderer.setAnimationLoop(null)');
    expect(source).toContain('renderer.dispose()');
    expect(source).toContain('renderer.forceContextLoss()');
    expect(source).toContain("dataset.vfxEffect = 'mirror-rain-bough-refraction'");
    expect(source).toContain('focusProtection');
    expect(source).toContain('refractedRipple');
    expect(source).toContain('portraitClarity');
    expect(source).toContain('uRefraction: { value: refraction }');
    expect(source).toContain('function createForegroundMotifs');
    expect(source).toContain('function createRelationshipRibbon');
    expect(source).toContain('function createFocusRipple');
    expect(source).toContain('uRibbonStrength');
    expect(source).toContain('uSceneProgress');
    expect(source).toContain('uMotifDensity');
    expect(source).toContain("dataset.vfxLayerStack = 'stage,atmosphere,particles,motifs,ribbon,ripple,transition'");
    expect(source).toContain('relationshipRibbon.geometry.dispose(); relationshipRibbon.material.dispose();');
    expect(source).toContain('focusRipple.geometry.dispose(); focusRipple.material.dispose();');
    expect(source.match(/new three\.WebGLRenderer/g)).toHaveLength(1);
    expect(source).not.toContain('WebGLRenderTarget');
    expect(source).not.toContain('EffectComposer');
    expect(source).not.toContain('smoothstep(.68,.1');
    expect(source).not.toContain('smoothstep(.018,.0');
    expect(source).not.toContain('smoothstep(.5,.03');
  });

  it('shares frame uniform boxes by identity across VFX materials', () => {
    const frame = createVfxFrameUniforms(three);
    const atmosphere = sharedVfxUniforms(frame, { uRoute: { value: 0 } });
    const particles = sharedVfxUniforms(frame, { uPrimary: { value: new three.Color() } });

    expect(atmosphere.uTime).toBe(particles.uTime);
    expect(atmosphere.uPulse).toBe(particles.uPulse);
    expect(atmosphere.uResolution).toBe(particles.uResolution);
    expect(atmosphere.uFocus).toBe(particles.uFocus);

    frame.uTime.value = 12.5;
    frame.uPulse.value = 0.4;
    frame.uResolution.value.set(1920, 1080);
    frame.uFocus.value.set(0.48, 0.4);

    expect(particles.uTime.value).toBe(12.5);
    expect(atmosphere.uPulse.value).toBe(0.4);
    expect(particles.uResolution.value.toArray()).toEqual([1920, 1080]);
    expect(particles.uFocus.value.toArray()).toEqual([0.48, 0.4]);
  });

  it('resolves continuity from the reviewed provenance ledger, not scene-id prefixes', () => {
    // The ledger classifies opening_001 as the AU boundary, so it must never be
    // presented as source-game canon.
    expect(resolveContinuityBand('opening_001')).toBe('au-boundary');
    expect(resolveContinuityBand('canon_recap_9_43_outcome')).toBe('canon');
    expect(resolveContinuityBand('ring_conspiracy_006')).toBe('au-route');

    expect(resolveRouteProgress('white_canvas', 'canon_recap_9_43_outcome')).toEqual({
      band: 'canon', branch: 'canon', selected: 'white_canvas', reached: 'canon',
      canonReached: true, junctionReached: false,
    });
    expect(resolveRouteProgress('unknown', 'opening_001')).toEqual({
      band: 'au-boundary', branch: 'au-if', selected: 'white_canvas', reached: 'junction',
      canonReached: true, junctionReached: true,
    });
    expect(resolveRouteProgress('ring_conspiracy', 'ring_conspiracy_006')).toEqual({
      band: 'au-route', branch: 'au-if', selected: 'ring_conspiracy', reached: 'ring_conspiracy',
      canonReached: true, junctionReached: true,
    });
  });
});
