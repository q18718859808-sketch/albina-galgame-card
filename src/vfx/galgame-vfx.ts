import type * as Three from 'three';

import { resolveContinuityBand, type ContinuityBand } from '../domain/story-provenance';
import { resolveScenePresentation, type ScenePresentation } from '../domain/scene-presentation';
import { cueForSceneTone, defaultCueProfile, type VfxCue, type VfxSceneState } from '../domain/vfx-cue';
import { createSceneDirector } from '../runtime/scene-director';

export type VfxQuality = 'high' | 'medium' | 'low' | 'static';
export type VfxQualityPreference = 'auto' | VfxQuality;

export interface VfxDeviceCapabilities {
  coarsePointer?: boolean | undefined;
  deviceMemory?: number | undefined;
  hardwareConcurrency?: number | undefined;
  saveData?: boolean | undefined;
}

const CUE_PRIORITY: Record<VfxCue['kind'], number> = {
  atmosphere: 1,
  'dialogue-emphasis': 2,
  'choice-confirm': 3,
  impact: 4,
  'chapter-transition': 5,
  'route-transition': 6,
  'cg-reveal': 6,
  ending: 7,
};

export interface GalgameVfxOptions {
  route: string;
  sceneId: string;
  tone?: string;
  chapter?: number;
  quality?: VfxQualityPreference;
  presentation?: ScenePresentation;
  onContextLost(): void;
  /** Called when the runtime downshifts its own pixel ratio to hold frame rate. */
  onQualityDownshift?(level: VfxQuality): void;
}

export interface GalgameVfxRuntime {
  canvas: HTMLCanvasElement;
  quality: VfxQuality;
  setSceneState(state: VfxSceneState): void;
  setPresentation(presentation: ScenePresentation): void;
  emit(cue: VfxCue): void;
  setState(route: string, sceneId: string): void;
  dispose(): void;
}

export interface VfxFrameUniforms {
  uTime: { value: number };
  uPulse: { value: number };
  uResolution: { value: Three.Vector2 };
  uFocus: { value: Three.Vector2 };
  uCameraOffset: { value: Three.Vector2 };
  uCameraZoom: { value: number };
  uCameraShake: { value: number };
  /** Authoring progress, not wall-clock time: drives cinematic parallax. */
  uSceneProgress: { value: number };
  uParallax: { value: number };
  uGrain: { value: number };
  uBloom: { value: number };
  uMotifDensity: { value: number };
  uProfile: { value: number };
  /** Deterministic screen-space relationship endpoints derived from portraits. */
  uRibbonSource: { value: Three.Vector2 };
  uRibbonTarget: { value: Three.Vector2 };
  uRibbonStrength: { value: number };
  /** A cue-owned pulse envelope, not a second animation loop. */
  uRipple: { value: number };
  /** Impact-driven RGB split: decays like a shock impulse rather than looping. */
  uAberration: { value: number };
  /** Route-transition palette cross-fade: from the previous route's primary. */
  uPaletteFrom: { value: Three.Color };
  uPaletteTo: { value: Three.Color };
  uPaletteMix: { value: number };
}

export interface RouteProgress {
  band: ContinuityBand;
  branch: 'canon' | 'au-if';
  selected: 'golden_bough_rebuild' | 'white_canvas' | 'ring_conspiracy';
  reached: 'canon' | 'junction' | 'golden_bough_rebuild' | 'white_canvas' | 'ring_conspiracy';
  canonReached: boolean;
  junctionReached: boolean;
}

export function resolveRouteProgress(route: string, sceneId: string): RouteProgress {
  const selected = route === 'golden_bough_rebuild' || route === 'ring_conspiracy' ? route : 'white_canvas';
  // Continuity comes from the reviewed provenance ledger, never from scene-id
  // prefixes: `opening_001` is the explicit AU boundary, not source-game canon.
  const band = resolveContinuityBand(sceneId);
  const branch = band === 'canon' ? 'canon' : 'au-if';
  const reached = band === 'canon' ? 'canon' : band === 'au-boundary' ? 'junction' : selected;
  return { band, branch, selected, reached, canonReached: true, junctionReached: band !== 'canon' };
}

export function createVfxFrameUniforms(three: typeof Three): VfxFrameUniforms {
  return {
    uTime: { value: 0 },
    uPulse: { value: 0 },
    uResolution: { value: new three.Vector2(1, 1) },
    uFocus: { value: new three.Vector2(0.5, 0.44) },
    uCameraOffset: { value: new three.Vector2(0, 0) },
    uCameraZoom: { value: 1 },
    uCameraShake: { value: 0 },
    uSceneProgress: { value: 0 },
    uParallax: { value: 0.4 },
    uGrain: { value: 0.19 },
    uBloom: { value: 0.46 },
    uMotifDensity: { value: 0.54 },
    uProfile: { value: 0 },
    uRibbonSource: { value: new three.Vector2(0.34, 0.43) },
    uRibbonTarget: { value: new three.Vector2(0.66, 0.43) },
    uRibbonStrength: { value: 0 },
    uRipple: { value: 0 },
    uAberration: { value: 0 },
    uPaletteFrom: { value: new three.Color(0.95, 0.73, 0.24) },
    uPaletteTo: { value: new three.Color(0.95, 0.73, 0.24) },
    uPaletteMix: { value: 0 },
  };
}

export function sharedVfxUniforms<T extends Record<string, { value: unknown }>>(
  frame: VfxFrameUniforms,
  authored: T,
): Record<string, Three.IUniform> & VfxFrameUniforms & T {
  return { ...frame, ...authored } as Record<string, Three.IUniform> & VfxFrameUniforms & T;
}

const PALETTES: Record<string, [number, number, number, number, number, number]> = {
  golden_bough_rebuild: [0.95, 0.73, 0.24, 0.38, 0.15, 0.06],
  white_canvas: [0.82, 0.9, 0.95, 0.18, 0.31, 0.38],
  ring_conspiracy: [0.78, 0.12, 0.16, 0.22, 0.03, 0.05],
};

const VISUAL_PROFILE_INDEX: Record<ScenePresentation['visual']['profile'], number> = {
  canvas: 0,
  rain: 1,
  golden: 2,
  threat: 3,
  gallery: 4,
  ending: 5,
};

function applyVisualProfile(frame: VfxFrameUniforms, presentation: ScenePresentation): void {
  const visual = presentation.visual;
  const ribbon = presentation.relationshipRibbon;
  frame.uParallax.value = visual.parallax;
  frame.uGrain.value = visual.grain;
  frame.uBloom.value = visual.bloom;
  frame.uMotifDensity.value = visual.motifDensity;
  frame.uProfile.value = VISUAL_PROFILE_INDEX[visual.profile];
  frame.uRibbonStrength.value = ribbon?.strength ?? 0;
  if (ribbon) {
    frame.uRibbonSource.value.set(ribbon.source[0], ribbon.source[1]);
    frame.uRibbonTarget.value.set(ribbon.target[0], ribbon.target[1]);
  }
}

export const VFX_QUALITY_PROFILES: Record<VfxQuality, Readonly<{ particles: number; branches: number; motifs: number; pixelRatio: number; refraction: number }>> = {
  static: { particles: 0, branches: 0, motifs: 0, pixelRatio: 1, refraction: 0 },
  low: { particles: 180, branches: 22, motifs: 28, pixelRatio: 1.15, refraction: 0.42 },
  medium: { particles: 320, branches: 36, motifs: 52, pixelRatio: 1.4, refraction: 0.7 },
  high: { particles: 520, branches: 56, motifs: 84, pixelRatio: 1.75, refraction: 1 },
};

export function resolveVfxQuality(
  preference: VfxQualityPreference = 'auto',
  reducedMotion = false,
): VfxQuality {
  if (reducedMotion) return 'static';
  return preference === 'auto' ? 'high' : preference;
}

export function resolveAutoVfxQuality(capabilities: VfxDeviceCapabilities = {}): VfxQuality {
  // Saving data and very low memory are an intentional low-cost profile, not
  // merely a weaker desktop quality tier.
  if (capabilities.saveData || (capabilities.deviceMemory !== undefined && capabilities.deviceMemory <= 2)) return 'low';
  if (capabilities.coarsePointer) return 'low';
  // Moderate devices retain the authored medium profile instead of jumping
  // straight from high to low.
  if ((capabilities.hardwareConcurrency ?? 8) <= 4 || (capabilities.deviceMemory !== undefined && capabilities.deviceMemory <= 4)) return 'medium';
  return 'high';
}

export function shouldAcceptVfxCue(activePriority: number, cue: Pick<VfxCue, 'kind'>): boolean {
  return CUE_PRIORITY[cue.kind] >= activePriority;
}

export interface ResolvedVfxCue {
  kind: VfxCue['kind'];
  priority: number;
  intensity: number;
  durationMs: number;
  focus: [number, number];
}

/**
 * The transition veil is deliberately cue-aware rather than a generic fade.
 * Keeping this mapping beside the semantic cue contract means each authored
 * story beat remains inspectable on the canvas without exposing shader details
 * to callers.
 */
export function transitionModeForCue(kind: VfxCue['kind']): number {
  const modes: Record<VfxCue['kind'], number> = {
    atmosphere: 0,
    'dialogue-emphasis': 0,
    'choice-confirm': 1,
    impact: 2,
    'chapter-transition': 3,
    'route-transition': 3,
    'cg-reveal': 4,
    ending: 5,
  };
  return modes[kind];
}

export function resolveVfxCue(activePriority: number, cue: VfxCue): ResolvedVfxCue | undefined {
  if (!shouldAcceptVfxCue(activePriority, cue)) return undefined;
  const profile = defaultCueProfile(cue.kind);
  return {
    kind: cue.kind,
    priority: CUE_PRIORITY[cue.kind],
    intensity: cue.intensity ?? profile.intensity!,
    durationMs: cue.durationMs ?? profile.durationMs!,
    focus: cue.focus ?? profile.focus!,
  };
}

function qualityBudget(quality: VfxQuality): Readonly<{ particles: number; branches: number; motifs: number; pixelRatio: number; refraction: number }> {
  return VFX_QUALITY_PROFILES[quality];
}

function runtimeQuality(preference: VfxQualityPreference | undefined): VfxQuality {
  const media = typeof globalThis.matchMedia === 'function'
    ? globalThis.matchMedia('(prefers-reduced-motion: reduce)')
    : undefined;
  const reducedMotion = media?.matches ?? false;
  if (preference !== undefined && preference !== 'auto') return resolveVfxQuality(preference, reducedMotion);
  if (reducedMotion) return 'static';
  const navigatorLike = typeof navigator !== 'undefined'
    ? navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    : undefined;
  const coarsePointer = typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(pointer: coarse)').matches;
  return resolveAutoVfxQuality({
    coarsePointer,
    deviceMemory: navigatorLike?.deviceMemory,
    hardwareConcurrency: navigatorLike?.hardwareConcurrency,
    saveData: navigatorLike?.connection?.saveData,
  });
}

export function createStaticGalgameVfx(
  container: HTMLElement,
  options: Pick<GalgameVfxOptions, 'route' | 'sceneId' | 'tone'> & { canvas?: HTMLCanvasElement | undefined },
): GalgameVfxRuntime {
  const canvas = options.canvas ?? document.createElement('canvas');
  // Keep the fallback canvas deterministic even when Vue reuses the node
  // across a quality toggle or a route transition.
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.dataset.vfxQuality = 'static';
  canvas.dataset.vfxQualityLevel = 'static';
  canvas.dataset.vfxAdaptive = 'idle';
  canvas.dataset.vfxEffect = 'static-svg-fallback';
  canvas.dataset.vfxRoute = options.route;
  canvas.dataset.vfxSceneId = options.sceneId;
  canvas.dataset.vfxPaused = 'true';
  canvas.dataset.vfxTransition = 'idle';
  canvas.dataset.vfxTransitionPhase = 'idle';
  // The fallback never animates, so its phase is `static` from construction:
  // `enter` would imply a beat the frozen path is never going to run.
  canvas.dataset.vfxCameraPhase = 'static';
  canvas.dataset.vfxCameraZoom = '1';
  canvas.dataset.vfxCameraShake = '0';
  canvas.dataset.vfxVisualProfile = 'canvas';
  canvas.setAttribute('aria-hidden', 'true');
  let visual: ScenePresentation['visual'] | undefined;
  let ribbon: ScenePresentation['relationshipRibbon'] | undefined;
  let rippleCue: VfxCue['kind'] | undefined;
  // The frozen path follows the authored camera focus instead of drawing the
  // ripple around a hard-coded centre. Defaults match the authored cue profile
  // so a bare emit (no setPresentation yet) still lands on the stage focus.
  let cameraFocus: [number, number] = [0.5, 0.44];
  // Authored cue energy. The WebGL ring breathes through uTime; the frozen
  // path has no clock, so it scales the ring radius/ghost offset with the cue
  // intensity instead — same energy grammar, deterministic framing.
  let rippleIntensity = 0.6;
  // The frozen path cannot animate a cross-fade, but it can publish the same
  // palette travel semantics as the WebGL veil: the departing route's primary,
  // the incoming route's primary, and a settled mix of 1 (fully arrived).
  let veilPaletteFrom: [number, number, number] | undefined;
  let veilPaletteTo: [number, number, number] | undefined;
  const render = (route = options.route) => {
    const width = Math.max(1, container.clientWidth || 1000);
    const height = Math.max(1, container.clientHeight || 600);
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) return;
    // Resizing resets the bitmap, but an already-sized canvas survives route
    // changes. Clear explicitly so static fallback scenes never accumulate
    // gradients from the previous route.
    context.clearRect(0, 0, width, height);
    const [r, g, b, sr, sg, sb] = PALETTES[route] ?? PALETTES.white_canvas!;
    const visualState = visual ?? { profile: 'canvas', parallax: 0.4, grain: 0.19, bloom: 0.46, motifDensity: 0.54 };
    // Palette entries are shader-normalised floats, so alpha has to be applied
    // through `rgba()`. Appending a hex alpha pair to `rgb(r g b)` yields
    // `rgb(209 230 242)44`, which the canvas API rejects outright.
    const channel = (value: number): number => Math.round(Math.min(1, Math.max(0, value)) * 255);
    const primary = (alpha: number): string => `rgba(${channel(r)}, ${channel(g)}, ${channel(b)}, ${alpha})`;
    const secondary = (alpha: number): string => `rgba(${channel(sr)}, ${channel(sg)}, ${channel(sb)}, ${alpha})`;
    const wash = context.createRadialGradient(width * .5, height * .44, 0, width * .5, height * .44, Math.max(width, height) * .52);
    wash.addColorStop(0, primary(.27));
    wash.addColorStop(.65, secondary(.14));
    wash.addColorStop(1, 'rgba(2, 3, 8, 0)');
    context.fillStyle = wash;
    context.fillRect(0, 0, width, height);
    context.strokeStyle = primary(.4);
    context.lineWidth = Math.max(1, width / 900);
    context.beginPath();
    context.ellipse(width * .5, height * .44, width * .22, height * .28, 0, 0, Math.PI * 2);
    context.stroke();

    // The reduced/static path keeps the same composition grammar as WebGL:
    // a distant stage horizon, a focus halo, and route-specific foreground
    // motifs. It is deliberately still, not a lower-information blank state.
    const focus = [width * .5, height * .44] as const;
    const motifCount = Math.round(8 + visualState.motifDensity * 18);
    context.save();
    context.globalCompositeOperation = 'screen';
    context.lineWidth = Math.max(1, width / 1500);
    context.strokeStyle = primary(.13 + visualState.bloom * .18);
    if (visualState.profile === 'rain') {
      for (let index = 0; index < motifCount; index += 1) {
        const x = ((index * 97) % width) + width * .02;
        const y = ((index * 151) % Math.max(1, height * .72)) - height * .1;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - width * .045, y + height * (.13 + (index % 4) * .018));
        context.stroke();
      }
    } else if (visualState.profile === 'golden' || visualState.profile === 'ending') {
      for (let index = 0; index < motifCount; index += 1) {
        const angle = (index / motifCount) * Math.PI * 2;
        const radius = Math.min(width, height) * (.19 + (index % 3) * .045);
        context.beginPath();
        context.arc(focus[0], focus[1], radius, angle, angle + .32);
        context.stroke();
      }
    } else {
      for (let index = 0; index < motifCount; index += 1) {
        const x = ((index * 131) % width) + width * .01;
        const y = ((index * 71) % Math.max(1, height * .8)) + height * .04;
        const size = Math.max(1, width * (.0014 + (index % 4) * .0005));
        context.fillStyle = primary(.08 + visualState.bloom * .16);
        context.fillRect(x, y, size, size);
      }
    }
    // Accessibility-equivalent relationship cue: frozen composition instead
    // of a timer-driven pulse. The scene-derived anchors retain the same
    // speaker/counterpart semantics as the live shader layer.
    if (ribbon) {
      const source: [number, number] = [ribbon.source[0] * width, ribbon.source[1] * height];
      const target: [number, number] = [ribbon.target[0] * width, ribbon.target[1] * height];
      const controlX = (source[0] + target[0]) * .5;
      const controlY = Math.min(source[1], target[1]) - height * (.1 + ribbon.strength * .13);
      context.lineWidth = Math.max(1, width / 1100) * (0.7 + ribbon.strength);
      context.strokeStyle = primary(.16 + visualState.bloom * .18);
      context.beginPath();
      context.moveTo(source[0], source[1]);
      context.quadraticCurveTo(controlX, controlY, target[0], target[1]);
      context.stroke();
    }
    if (rippleCue) {
      const rippleFocus = [cameraFocus[0] * width, cameraFocus[1] * height] as const;
      const isImpact = rippleCue === 'impact';
      // Impact and reveal read as a chromatic aberration in the live layer;
      // the frozen path draws a second, offset ghost edge with the secondary
      // palette so the static composition keeps the same shock grammar. The
      // ring and its ghost grow with the authored cue energy, mirroring the
      // WebGL ring radius without borrowing its wall clock.
      if (isImpact) {
        context.strokeStyle = secondary(.26);
        context.lineWidth = Math.max(1, width / 1200);
        context.beginPath();
        context.ellipse(rippleFocus[0] - width * .012 * rippleIntensity, rippleFocus[1], width * .12 * rippleIntensity, height * .16 * rippleIntensity, 0, 0, Math.PI * 2);
        context.stroke();
      }
      context.strokeStyle = isImpact ? 'rgba(245, 112, 88, .38)' : primary(.28);
      context.lineWidth = Math.max(1, width / 1300);
      context.beginPath();
      context.ellipse(rippleFocus[0], rippleFocus[1], width * .12 * rippleIntensity, height * .16 * rippleIntensity, 0, 0, Math.PI * 2);
      context.stroke();
    }
    context.restore();
  };
  if (!canvas.parentNode) container.append(canvas);
  let route = options.route;
  let disposed = false;
  // The fallback is the accessibility path, so a paint failure must not abort
  // construction: throwing here used to leave the canvas mounted but blank and
  // the camera plan unpublished, taking out every static scene at once.
  const renderSafely = (nextRoute = route): void => {
    if (disposed) return;
    try {
      render(nextRoute);
    } catch (error) {
      console.error('Albina static VFX fallback failed to paint', error);
    }
  };
  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => renderSafely())
    : undefined;
  resizeObserver?.observe(container);
  renderSafely();
  const setToneState = (tone: string | undefined) => {
    if (tone) canvas.dataset.vfxTone = tone;
    else delete canvas.dataset.vfxTone;
    const toneCue = cueForSceneTone(tone);
    if (toneCue) canvas.dataset.vfxCue = toneCue.kind;
  };
  setToneState(options.tone);
  return {
    canvas,
    quality: 'static',
    setSceneState(state) {
      if (disposed) return;
      const routeChanged = route !== state.route;
      const previousRoute = route;
      route = state.route;
      canvas.dataset.vfxSceneId = state.sceneId;
      canvas.dataset.vfxRoute = state.route;
      canvas.dataset.vfxCameraPhase = 'static';
      canvas.dataset.vfxCameraZoom = '1';
      canvas.dataset.vfxCameraShake = '0';
      if (state.focus) {
        cameraFocus = state.focus;
        canvas.dataset.vfxCameraFocus = `${state.focus[0]},${state.focus[1]}`;
      }
      setToneState(state.tone);
      if (routeChanged) {
        // Publish the same palette-travel semantics as the WebGL veil: the
        // frozen canvas settles on the incoming primary, with the departure
        // and arrival primaries exposed for consumers.
        veilPaletteFrom = PALETTES[previousRoute]?.slice(0, 3) as [number, number, number] | undefined
          ?? PALETTES.white_canvas!.slice(0, 3) as [number, number, number];
        veilPaletteTo = PALETTES[state.route]?.slice(0, 3) as [number, number, number] | undefined
          ?? PALETTES.white_canvas!.slice(0, 3) as [number, number, number];
        canvas.dataset.vfxPaletteFrom = veilPaletteFrom.join(',');
        canvas.dataset.vfxPaletteTo = veilPaletteTo.join(',');
        canvas.dataset.vfxPaletteMix = '1';
        canvas.dataset.vfxTransition = 'static';
      }
      renderSafely(state.route);
    },
    setPresentation(presentation) {
      if (disposed) return;
      visual = presentation.visual;
      ribbon = presentation.relationshipRibbon;
      cameraFocus = presentation.focus;
      canvas.dataset.vfxVisualProfile = presentation.visual.profile;
      canvas.dataset.vfxRibbon = ribbon ? 'active' : 'idle';
      if (ribbon) {
        canvas.dataset.vfxRibbonSource = ribbon.sourceCharacterId;
        canvas.dataset.vfxRibbonTarget = ribbon.targetCharacterId;
      } else {
        delete canvas.dataset.vfxRibbonSource;
        delete canvas.dataset.vfxRibbonTarget;
      }
      // The authored plan is published identically on both runtimes so a
      // consumer can read the camera contract without caring which path is
      // live. Time-derived beat state (progress) is deliberately omitted:
      // the frozen fallback has no clock to derive it from.
      canvas.dataset.vfxCameraPhase = 'static';
      canvas.dataset.vfxCameraMode = presentation.camera.mode;
      canvas.dataset.vfxCameraZoom = String(presentation.camera.zoom);
      canvas.dataset.vfxCameraShake = String(presentation.camera.shake);
      canvas.dataset.vfxCameraFocus = `${presentation.focus[0]},${presentation.focus[1]}`;
      renderSafely(route);
    },
    emit(cue) {
      if (disposed) return;
      rippleCue = cue.kind === 'impact' || cue.kind === 'choice-confirm' || cue.kind === 'cg-reveal' ? cue.kind : undefined;
      rippleIntensity = cue.intensity ?? defaultCueProfile(cue.kind).intensity!;
      canvas.dataset.vfxCue = cue.kind;
      canvas.dataset.vfxRipple = rippleCue ? 'static' : 'idle';
      // Publish the same energy observables as the live layer: the static ring
      // radius follows the authored cue intensity (frozen, deterministic).
      canvas.dataset.vfxRippleIntensity = rippleIntensity.toFixed(3);
      // The chromatic-aberration shock is expressed as an offset ghost edge
      // in the frozen composition (impact) or the plain reveal ring; expose
      // the same observable as the live layer without starting a timer.
      canvas.dataset.vfxAberration = cue.kind === 'impact' || cue.kind === 'cg-reveal' ? 'static' : 'idle';
      // The static path is intentionally frozen; expose the same lifecycle
      // contract without starting a timer or animation loop.
      canvas.dataset.vfxTransition = cue.kind === 'route-transition' || cue.kind === 'chapter-transition' || cue.kind === 'cg-reveal' || cue.kind === 'ending' ? 'static' : 'idle';
      canvas.dataset.vfxTransitionPhase = 'idle';
      renderSafely();
    },
    setState(nextRoute, nextSceneId) {
      if (disposed) return;
      route = nextRoute;
      canvas.dataset.vfxRoute = nextRoute;
      canvas.dataset.vfxSceneId = nextSceneId;
      renderSafely(nextRoute);
    },
    // Vue owns the canvas node when the static fallback is rendered by the
    // component. Disposal only clears its drawing surface; unmount removes it.
    dispose() {
      if (disposed) return;
      disposed = true;
      resizeObserver?.disconnect();
      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
      canvas.dataset.vfxContext = 'disposed';
    },
  };
}

function createStageField(three: typeof Three, frame: VfxFrameUniforms) {
  const geometry = new three.PlaneGeometry(2, 2);
  const material = new three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: three.AdditiveBlending,
    uniforms: sharedVfxUniforms(frame, {
      uPrimary: { value: new three.Color() },
      uSecondary: { value: new three.Color() },
    }),
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
    // A back-stage layer inspired by the scroll demo's camera journey: the
    // authored scene progress creates depth drift while the focus preserves a
    // quiet readable pocket for the character portrait and dialogue.
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform float uSceneProgress; uniform float uParallax; uniform float uBloom; uniform float uProfile;
      uniform vec2 uResolution; uniform vec2 uFocus; uniform vec3 uPrimary; uniform vec3 uSecondary;
      float hash(vec2 p){return fract(sin(dot(p,vec2(27.17,91.73)))*43758.5453);}
      float grid(vec2 p, float scale, float width){vec2 q=abs(fract(p*scale)-.5);return 1.0-smoothstep(width,width+.012,min(q.x,q.y));}
      void main(){
        vec2 aspect=vec2(uResolution.x/max(1.0,uResolution.y),1.0);
        vec2 uv=vUv;
        vec2 p=(uv-.5)*aspect;
        vec2 focal=(uv-uFocus)*aspect;
        float distanceToFocus=length(focal);
        float progress=uSceneProgress*uParallax;
        float horizon=smoothstep(.64,.12,uv.y);
        float arc=1.0-smoothstep(.003,.018,abs(length(p+vec2(progress*.08,0.12))-0.42));
        float gridLines=grid(uv+vec2(progress*.035,-progress*.02),mix(7.0,17.0,uParallax),.015);
        float stars=step(.986,hash(floor((uv+progress*.03)*vec2(118.0,74.0))))*(.45+.55*sin(uTime*1.3+hash(floor(uv*67.0))*6.28));
        float gallery=step(.5,uProfile)*step(uProfile,4.5)*(1.0-smoothstep(.04,.32,abs(fract(uv.x*8.0+progress)-.5)));
        float protected=smoothstep(.12,.48,distanceToFocus);
        float alpha=(horizon*.055+arc*.13+gridLines*.025+stars*.11+gallery*.035)*(0.3+uBloom*.7)*protected;
        vec3 color=mix(uSecondary,uPrimary,clamp(horizon+arc+stars,0.0,1.0));
        gl_FragColor=vec4(color,alpha);
      }`,
  });
  const mesh = new three.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -2;
  return { mesh, geometry, material };
}

function createForegroundMotifs(three: typeof Three, count: number, frame: VfxFrameUniforms) {
  const geometry = new three.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = Math.random() * 2 - 1;
    positions[index * 3 + 1] = Math.random() * 2 - 1;
    positions[index * 3 + 2] = .25 + Math.random() * .5;
    seeds[index] = Math.random();
  }
  geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new three.BufferAttribute(seeds, 1));
  const material = new three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: three.AdditiveBlending,
    uniforms: sharedVfxUniforms(frame, { uPrimary: { value: new three.Color() }, uSecondary: { value: new three.Color() } }),
    vertexShader: `
      attribute float aSeed; varying float vSeed; varying float vAlpha;
      uniform float uTime; uniform float uPulse; uniform float uSceneProgress; uniform float uMotifDensity; uniform float uParallax; uniform vec2 uFocus;
      void main(){
        vec3 p=position;
        float drift=(uTime*.035+uSceneProgress*.1)*(0.35+uParallax);
        p.x+=sin(uTime*.23+aSeed*43.0)*(.028+uParallax*.045);
        p.y+=cos(uTime*.18+aSeed*29.0)*(.018+uParallax*.032);
        p.y=mod(p.y+drift,2.18)-1.09;
        float focusFade=smoothstep(.06,.34,length(p.xy-uFocus*2.0+1.0));
        vSeed=aSeed;
        vAlpha=(.06+aSeed*.22+uPulse*.35)*uMotifDensity*focusFade;
        gl_Position=vec4(p.xy,p.z*.16,1.0);
        gl_PointSize=(2.0+aSeed*7.0+uPulse*13.0)*(0.45+uMotifDensity*.8);
      }`,
    fragmentShader: `
      uniform vec3 uPrimary; uniform vec3 uSecondary; uniform float uProfile; varying float vSeed; varying float vAlpha;
      void main(){
        vec2 p=gl_PointCoord-.5;
        float d=length(p);
        float petal=abs(p.x)*.7+abs(p.y*1.35);
        float disc=1.0-smoothstep(.12,.5,d);
        float shard=1.0-smoothstep(.13,.52,petal);
        float rain=mix(disc,shard,step(.45,uProfile));
        vec3 color=mix(uSecondary,uPrimary,fract(vSeed*7.13));
        gl_FragColor=vec4(color,rain*vAlpha);
      }`,
  });
  const points = new three.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 1;
  return { points, geometry, material };
}

function createRelationshipRibbon(three: typeof Three, frame: VfxFrameUniforms) {
  const geometry = new three.PlaneGeometry(2, 2);
  const material = new three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: three.AdditiveBlending,
    uniforms: sharedVfxUniforms(frame, {
      uPrimary: { value: new three.Color() },
      uSecondary: { value: new three.Color() },
    }),
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
    // Screen-space only: the line has narrative meaning (staged counterpart to
    // speaker), but does not claim a 3D character rig or gameplay targeting.
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform float uPulse; uniform float uRibbonStrength; uniform float uProfile; uniform vec2 uResolution; uniform vec2 uRibbonSource; uniform vec2 uRibbonTarget; uniform vec3 uPrimary; uniform vec3 uSecondary;
      float segment(vec2 point, vec2 start, vec2 end){vec2 pa=point-start, ba=end-start;float h=clamp(dot(pa,ba)/max(dot(ba,ba),.0001),0.0,1.0);return length(pa-ba*h);}
      void main(){
        vec2 aspect=vec2(uResolution.x/max(uResolution.y,1.0),1.0);
        vec2 source=(uRibbonSource-.5)*aspect;
        vec2 target=(uRibbonTarget-.5)*aspect;
        vec2 point=(vUv-.5)*aspect;
        vec2 middle=(source+target)*.5;
        vec2 direction=target-source;
        vec2 normal=normalize(vec2(-direction.y,direction.x)+.00001);
        float arc=(.055+uRibbonStrength*.1)*(0.72+.28*sin(uTime*.7));
        vec2 bowed=point-normal*arc*(1.0-clamp(abs(dot(point-middle,normalize(direction)+.00001))/max(length(direction)*.5,.001),0.0,1.0));
        float distanceToRibbon=segment(bowed,source,target);
        float width=.0018+uRibbonStrength*.004+uPulse*.002;
        float core=1.0-smoothstep(width,width+.0035,distanceToRibbon);
        float halo=1.0-smoothstep(width,width+.019,distanceToRibbon);
        float profileGlow=.72+.28*step(2.5,uProfile);
        vec3 color=mix(uSecondary,uPrimary,.72);
        gl_FragColor=vec4(color,(core*.7+halo*.16)*uRibbonStrength*profileGlow);
      }`,
  });
  const mesh = new three.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;
  return { mesh, geometry, material };
}

function createFocusRipple(three: typeof Three, frame: VfxFrameUniforms) {
  const geometry = new three.PlaneGeometry(2, 2);
  const material = new three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: three.AdditiveBlending,
    uniforms: sharedVfxUniforms(frame, { uPrimary: { value: new three.Color() }, uRippleMode: { value: 0 } }),
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uRipple; uniform float uRippleMode; uniform vec2 uResolution; uniform vec2 uFocus; uniform vec3 uPrimary;
      void main(){
        vec2 aspect=vec2(uResolution.x/max(uResolution.y,1.0),1.0);
        float distanceToFocus=length((vUv-uFocus)*aspect);
        float radius=mix(.035,.62,1.0-uRipple);
        float band=1.0-smoothstep(.004,.024,abs(distanceToFocus-radius));
        float inner=1.0-smoothstep(.02,.32,distanceToFocus)*(1.0-uRipple)*.14;
        vec3 color=mix(uPrimary,vec3(.96,.28,.2),step(1.5,uRippleMode));
        gl_FragColor=vec4(color,(band*.64+inner)*uRipple);
      }`,
  });
  const mesh = new three.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 4;
  return { mesh, geometry, material };
}

function createAtmosphere(three: typeof Three, frame: VfxFrameUniforms, refraction: number) {
  const geometry = new three.PlaneGeometry(2, 2);
  const material = new three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    uniforms: sharedVfxUniforms(frame, {
      uPrimary: { value: new three.Color() },
      uSecondary: { value: new three.Color() },
      uRoute: { value: 0 },
      uRefraction: { value: refraction },
    }),
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform float uPulse; uniform float uRoute; uniform float uRefraction; uniform float uAberration;
      uniform float uCameraZoom; uniform float uCameraShake;
      uniform vec2 uResolution; uniform vec2 uFocus; uniform vec2 uCameraOffset; uniform vec3 uPrimary; uniform vec3 uSecondary;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
      void main(){
      vec2 uv=(vUv-.5)/max(uCameraZoom,.001)+.5+uCameraOffset;
      vec2 p=(uv-.5)*vec2(uResolution.x/max(uResolution.y,1.0),1.0);
      vec2 focusDelta=(uv-uFocus)*vec2(uResolution.x/max(uResolution.y,1.0),1.0);
        float focusDistance=length(focusDelta);
        float focusProtection=smoothstep(.16,.42,focusDistance);
        // Impact aberration splits the atmospheric layers per RGB channel with
        // a decaying shock envelope; it stays zero for ordinary scenes so the
        // channel samples collapse to the single authored composition.
        float aberr=uAberration*.016;
        vec2 pr=uv+vec2(aberr,0.0);
        vec2 pb=uv-vec2(aberr,0.0);
        float mistR=noise(pr*3.2+vec2(uTime*.025,-uTime*.04))*noise(pr*6.0-vec2(uTime*.03,0.0));
        float mistG=noise(uv*3.2+vec2(uTime*.025,-uTime*.04))*noise(uv*6.0-vec2(uTime*.03,0.0));
        float mistB=noise(pb*3.2+vec2(uTime*.025,-uTime*.04))*noise(pb*6.0-vec2(uTime*.03,0.0));
        vec2 rainCell=vec2(floor(uv.x*94.0),floor((uv.y-uTime*.36)*7.0));
        float rainSeed=hash(rainCell);
        float rain=pow(max(0.0,1.0-abs(fract((uv.x+uv.y*.12)*94.0-uTime*1.7+rainSeed)-.5)*18.0),5.0);
        rain*=1.0-smoothstep(.1,.68,fract(uv.y*2.3-uTime*1.1+hash(vec2(floor(uv.x*94.0),0.0))));
        rain*=mix(.16,1.0,focusProtection);
        float mirrorBand=exp(-abs(uv.y-.72)*18.0);
        float mirrorR=mirrorBand*(noise(vec2(pr.x*18.0,uTime*.12))*.55+.2);
        float mirrorG=mirrorBand*(noise(vec2(uv.x*18.0,uTime*.12))*.55+.2);
        float mirrorB=mirrorBand*(noise(vec2(pb.x*18.0,uTime*.12))*.55+.2);
        float ripplePhase=focusDistance*34.0-uTime*1.35;
        float refractedRipple=(.5+.5*sin(ripplePhase))*exp(-focusDistance*3.8);
        refractedRipple*=smoothstep(.12,.3,focusDistance)*uRefraction;
        float rainPrism=rain*uRefraction*(.32+.68*mirrorBand);
        float ring=abs(length(p)-(.22+sin(uTime*.3)*.012)); ring=(1.0-smoothstep(0.0,.018,ring))*(uRoute>.65?1.0:.18);
        float canvasGrid=(1.0-smoothstep(0.0,.018,abs(fract(uv.x*12.0)-.5)))*(uRoute>.2&&uRoute<.65?.13:.025);
        float boughLens=(1.0-smoothstep(.0,.025,abs(fract(ripplePhase*.14)-.5)))*(1.0-smoothstep(.02,.28,uRoute));
        boughLens*=refractedRipple*focusProtection;
        float energy=mistG*.28+rain*.2+mirrorG*.24+ring*.38+canvasGrid+boughLens*.34;
        vec3 color=vec3(
          mix(uSecondary.r,uPrimary.r,clamp(mistR+mirrorR+ring,0.0,1.0)),
          mix(uSecondary.g,uPrimary.g,clamp(mistG+mirrorG+ring,0.0,1.0)),
          mix(uSecondary.b,uPrimary.b,clamp(mistB+mirrorB+ring,0.0,1.0))
        );
        color+=vec3(rainPrism*.11,rainPrism*.04,rainPrism*.16);
        color+=mix(uPrimary,vec3(1.0,.82,.36),.44)*boughLens;
        color+=uPrimary*uPulse*.55*(1.0-length(p)*.65);
        float vignette=1.0-smoothstep(.28,.82,length(p));
        float portraitClarity=mix(.38,1.0,focusProtection);
        gl_FragColor=vec4(color,energy*vignette*portraitClarity+uPulse*.11*focusProtection);
      }`,
  });
  const mesh = new three.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return { mesh, geometry, material };
}

function createTransitionVeil(three: typeof Three, frame: VfxFrameUniforms) {
  const geometry = new three.PlaneGeometry(2, 2);
  const material = new three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    uniforms: sharedVfxUniforms(frame, {
      uTransition: { value: 0 },
      uTransitionMode: { value: 0 },
      uPrimary: { value: new three.Color() },
    }),
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTransition; uniform float uTransitionMode; uniform float uPulse; uniform float uCameraZoom; uniform vec2 uCameraOffset; uniform vec2 uFocus; uniform vec3 uPrimary;
      uniform vec3 uPaletteFrom; uniform vec3 uPaletteTo; uniform float uPaletteMix;
      float lineMask(float value, float width){return 1.0-smoothstep(0.0,width,abs(fract(value)-.5));}
      void main(){
      vec2 delta=(vUv-.5)/max(uCameraZoom,.001)+.5+uCameraOffset-uFocus;
      float distanceFromFocus=length(delta*vec2(1.25,1.0));
        float edge=smoothstep(.18,.86,distanceFromFocus);
        float scan=0.72+0.28*sin((vUv.y+vUv.x*.08)*48.0);
        float radial=1.0-smoothstep(.06,.78,distanceFromFocus);
        float choice=lineMask(vUv.x*9.0+vUv.y*2.0, .055)*(.32+.68*edge);
        float impact=lineMask(vUv.x*18.0-vUv.y*7.0, .035)*smoothstep(.72,.05,distanceFromFocus);
        float chapter=lineMask(distanceFromFocus*7.0, .045)*(.2+.8*edge);
        float reveal=smoothstep(.12,.72,distanceFromFocus)*scan;
        float ending=pow(max(0.0,1.0-distanceFromFocus),2.2)+chapter*.4;
        float pattern=scan;
        if (uTransitionMode > .5 && uTransitionMode < 1.5) pattern=choice;
        else if (uTransitionMode > 1.5 && uTransitionMode < 2.5) pattern=impact;
        else if (uTransitionMode > 2.5 && uTransitionMode < 3.5) pattern=chapter;
        else if (uTransitionMode > 3.5 && uTransitionMode < 4.5) pattern=reveal;
        else if (uTransitionMode > 4.5) pattern=ending;
        float alpha=uTransition*(.12+.29*edge)*pattern;
        alpha+=uTransition*radial*(uTransitionMode > 4.5 ? .30 : 0.0);
        alpha+=uPulse*.035*(1.0-smoothstep(.0,.9,distanceFromFocus));
        // Route transitions cross-fade the veil tint from the previous route's
        // palette to the incoming one, so a route change reads as continuous
        // colour travel instead of an abrupt palette swap.
        vec3 paletteColor=mix(uPaletteFrom,uPaletteTo,uPaletteMix);
        vec3 color=mix(paletteColor,vec3(.02,.025,.04),.32);
        if (uTransitionMode > 1.5 && uTransitionMode < 2.5) color=mix(color,vec3(.96,.32,.22),.42);
        if (uTransitionMode > 3.5 && uTransitionMode < 4.5) color=mix(color,vec3(.92,.97,1.0),.46);
        gl_FragColor=vec4(color,alpha);
      }`,
  });
  const mesh = new three.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return { mesh, geometry, material };
}

function createParticleField(three: typeof Three, count: number, frame: VfxFrameUniforms) {
  const geometry = new three.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = Math.random() * 2 - 1;
    positions[index * 3 + 1] = Math.random() * 2 - 1;
    positions[index * 3 + 2] = Math.random();
    seeds[index] = Math.random();
  }
  geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new three.BufferAttribute(seeds, 1));
  const material = new three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: three.AdditiveBlending,
    uniforms: sharedVfxUniforms(frame, { uPrimary: { value: new three.Color() } }),
    vertexShader: `
      attribute float aSeed; uniform float uTime; uniform float uPulse; varying float vAlpha;
      void main(){vec3 p=position;p.y=mod(p.y+uTime*(.018+aSeed*.035)+1.0,2.0)-1.0;p.x+=sin(uTime*.17+aSeed*31.0)*.045;vAlpha=.18+aSeed*.42+uPulse*.3;gl_Position=vec4(p.xy,p.z*.2,1.0);gl_PointSize=(1.2+aSeed*2.7)*(1.0+uPulse*.45);}`,
    fragmentShader: `uniform vec3 uPrimary; varying float vAlpha; void main(){vec2 p=gl_PointCoord-.5;float d=length(p);float a=(1.0-smoothstep(.03,.5,d))*vAlpha;gl_FragColor=vec4(uPrimary,a);}`,
  });
  const points = new three.Points(geometry, material);
  points.frustumCulled = false;
  return { points, geometry, material };
}

function createBoughLines(three: typeof Three, count: number) {
  const vertices = new Float32Array(count * 6);
  for (let index = 0; index < count; index += 1) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    vertices.set([x, y, 0, x + (Math.random() - .5) * .34, y + Math.random() * .42, 0], index * 6);
  }
  const geometry = new three.BufferGeometry();
  geometry.setAttribute('position', new three.BufferAttribute(vertices, 3));
  const material = new three.LineBasicMaterial({ color: 0xd6ab3a, transparent: true, opacity: .18, blending: three.AdditiveBlending });
  const lines = new three.LineSegments(geometry, material);
  return { lines, geometry, material };
}

function applyPalette(three: typeof Three, route: string, materials: Array<Three.ShaderMaterial | Three.LineBasicMaterial>) {
  const values = PALETTES[route] ?? PALETTES.white_canvas!;
  const primary = new three.Color(values[0], values[1], values[2]);
  const secondary = new three.Color(values[3], values[4], values[5]);
  for (const material of materials) {
    if ('uniforms' in material) {
      material.uniforms.uPrimary?.value.copy(primary);
      material.uniforms.uSecondary?.value.copy(secondary);
      material.uniforms.uRoute && (material.uniforms.uRoute.value = route === 'ring_conspiracy' ? 1 : route === 'white_canvas' ? .45 : 0);
    } else material.color.copy(primary);
  }
}

function palettePrimaryColor(three: typeof Three, route: string): Three.Color {
  const values = PALETTES[route] ?? PALETTES.white_canvas!;
  return new three.Color(values[0], values[1], values[2]);
}

/**
 * Frame-rate governor: a rolling one-second FPS sample downshifts the runtime
 * pixel ratio once sustained low frame rate has settled (not a single hiccup).
 * Kept deterministic and side-effect free until the callback actually fires.
 */
function createFpsGovernor(targetFps: number, settleMs: number, onDownshift: () => void) {
  let frames = 0;
  let windowStartedAt = 0;
  let lowFpsSince: number | undefined;
  return {
    tick(now: number) {
      if (windowStartedAt === 0) {
        windowStartedAt = now;
        return;
      }
      frames += 1;
      const elapsed = now - windowStartedAt;
      if (elapsed < 1000) return;
      const fps = (frames * 1000) / elapsed;
      frames = 0;
      windowStartedAt = now;
      if (fps < targetFps) {
        if (lowFpsSince === undefined) lowFpsSince = now;
        else if (now - lowFpsSince >= settleMs) {
          lowFpsSince = now;
          onDownshift();
        }
      } else lowFpsSince = undefined;
    },
  };
}

const ADAPTIVE_FPS_TARGET = 42;
const ADAPTIVE_SETTLE_MS = 3000;
const ADAPTIVE_PIXEL_RATIOS: Record<VfxQuality, number> = { high: 1.75, medium: 1.4, low: 1.15, static: 1 };

function isBoughRoute(route: string): boolean {
  return route === 'golden_bough_rebuild';
}

export function createGalgameVfx(three: typeof Three, container: HTMLElement, options: GalgameVfxOptions): GalgameVfxRuntime {
  const quality = runtimeQuality(options.quality);
  if (quality === 'static') {
    return createStaticGalgameVfx(container, options);
  }
  const budget = qualityBudget(quality);
  const preserveDrawingBuffer = typeof globalThis.location !== 'undefined'
    && new URLSearchParams(globalThis.location.search).has('vfx-proof');
  const renderer = new three.WebGLRenderer({
    alpha: true,
    antialias: quality === 'high',
    powerPreference: 'high-performance',
    preserveDrawingBuffer,
  });
  const scene = new three.Scene();
  const camera = new three.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  const clock = new three.Clock();
  const frame = createVfxFrameUniforms(three);
  const stage = createStageField(three, frame);
  const atmosphere = createAtmosphere(three, frame, budget.refraction);
  const particles = createParticleField(three, budget.particles, frame);
  const motifs = createForegroundMotifs(three, budget.motifs, frame);
  const bough = createBoughLines(three, budget.branches);
  const relationshipRibbon = createRelationshipRibbon(three, frame);
  const focusRipple = createFocusRipple(three, frame);
  const transitionVeil = createTransitionVeil(three, frame);
  const rippleModeUniform = focusRipple.material.uniforms.uRippleMode;
  if (!rippleModeUniform) throw new Error('Focus ripple mode uniform was not created.');
  const transitionUniform = transitionVeil.material.uniforms.uTransition;
  const transitionModeUniform = transitionVeil.material.uniforms.uTransitionMode;
  if (!transitionUniform) throw new Error('Transition veil uniform was not created.');
  if (!transitionModeUniform) throw new Error('Transition veil mode uniform was not created.');
  let pulse = 1;
  let disposed = false;
  let animationRunning = false;
  let transitionTimer: ReturnType<typeof setTimeout> | undefined;
  let transitionStartedAt = 0;
  let transitionDurationMs = 1;
  let transitionPriority = 0;
  let contextLost = false;
  let route = options.route;
  let sceneId = options.sceneId;
  let chapter = options.chapter;
  let presentation = options.presentation ?? resolveScenePresentation({ id: sceneId, route, tone: options.tone ?? 'quiet', portraits: [], ending: undefined });
  const director = createSceneDirector(presentation);
  let adaptiveQuality = quality;
  let veilPaletteFrom: Three.Color | undefined;
  let veilPaletteTo: Three.Color | undefined;
  const veilPaletteFromUniform = transitionVeil.material.uniforms.uPaletteFrom;
  const veilPaletteToUniform = transitionVeil.material.uniforms.uPaletteTo;
  const veilPaletteMixUniform = transitionVeil.material.uniforms.uPaletteMix;
  if (!veilPaletteFromUniform || !veilPaletteToUniform || !veilPaletteMixUniform) throw new Error('Transition veil palette uniforms were not created.');
  const fpsGovernor = createFpsGovernor(ADAPTIVE_FPS_TARGET, ADAPTIVE_SETTLE_MS, () => {
    if (adaptiveQuality === 'high') adaptiveQuality = 'medium';
    else if (adaptiveQuality === 'medium') adaptiveQuality = 'low';
    else return;
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, ADAPTIVE_PIXEL_RATIOS[adaptiveQuality]));
    resize();
    renderer.domElement.dataset.vfxAdaptive = 'active';
    renderer.domElement.dataset.vfxQualityLevel = adaptiveQuality;
    options.onQualityDownshift?.(adaptiveQuality);
  });

  camera.position.z = 1;
  scene.add(
    stage.mesh,
    atmosphere.mesh,
    particles.points,
    bough.lines,
    motifs.points,
    relationshipRibbon.mesh,
    focusRipple.mesh,
    transitionVeil.mesh,
  );
  relationshipRibbon.mesh.visible = frame.uRibbonStrength.value > 0;
  focusRipple.mesh.visible = false;
  transitionVeil.mesh.renderOrder = 3;
  transitionVeil.mesh.visible = false;
  bough.lines.visible = isBoughRoute(options.route);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, budget.pixelRatio));
  renderer.domElement.dataset.vfxQuality = quality;
  renderer.domElement.dataset.vfxQualityLevel = quality;
  renderer.domElement.dataset.vfxAdaptive = 'idle';
  renderer.domElement.dataset.vfxEffect = 'mirror-rain-bough-refraction';
  renderer.domElement.dataset.vfxSceneId = sceneId;
  renderer.domElement.dataset.vfxRoute = route;
  renderer.domElement.dataset.vfxPaused = 'true';
  renderer.domElement.dataset.vfxCameraPhase = 'enter';
  renderer.domElement.dataset.vfxCameraProgress = '0';
  renderer.domElement.dataset.vfxCameraZoom = '1';
  renderer.domElement.dataset.vfxCameraShake = '0';
  renderer.domElement.dataset.vfxVisualProfile = presentation.visual.profile;
  renderer.domElement.dataset.vfxLayerStack = 'stage,atmosphere,particles,motifs,ribbon,ripple,transition';
  renderer.domElement.dataset.vfxRibbon = presentation.relationshipRibbon ? 'active' : 'idle';
  renderer.domElement.dataset.vfxRipple = 'idle';
  if (presentation.relationshipRibbon) {
    renderer.domElement.dataset.vfxRibbonSource = presentation.relationshipRibbon.sourceCharacterId;
    renderer.domElement.dataset.vfxRibbonTarget = presentation.relationshipRibbon.targetCharacterId;
  }
  renderer.domElement.setAttribute('aria-hidden', 'true');
  frame.uFocus.value.set(presentation.focus[0], presentation.focus[1]);
  applyVisualProfile(frame, presentation);
  renderer.domElement.dataset.vfxCameraFocus = `${presentation.focus[0]},${presentation.focus[1]}`;
  renderer.domElement.dataset.vfxCameraMode = presentation.camera.mode;
  // The component owns its fallback canvas. Keep it in place while the
  // optional WebGL canvas is appended during an async renderer load.
  container.append(renderer.domElement);
  applyPalette(three, options.route, [stage.material, atmosphere.material, particles.material, motifs.material, bough.material, relationshipRibbon.material, focusRipple.material, transitionVeil.material]);

  const resize = () => {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);
    frame.uResolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
  };
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : undefined;
  observer?.observe(container);
  resize();

  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    renderer.domElement.dataset.vfxContext = 'lost';
    pauseAnimation();
    options.onContextLost();
  };
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);

  // Tavern-hosted cards scroll inside long chat transcripts: a WebGL canvas
  // that left the viewport must stop burning GPU even though the document is
  // still visible. The observer composes with the visibilitychange pause via
  // one shared decision so neither path can silently resurrect the other.
  let viewportVisible = true;
  let viewportObserver: IntersectionObserver | undefined;
  const syncAnimationState = () => {
    const documentHidden = typeof document !== 'undefined' && document.hidden;
    const renderable = viewportVisible && !documentHidden;
    renderer.domElement.dataset.vfxViewport = renderable ? 'visible' : 'hidden';
    if (renderable) resumeAnimation();
    else pauseAnimation();
  };
  if (typeof IntersectionObserver !== 'undefined') {
    viewportObserver = new IntersectionObserver((entries) => {
      viewportVisible = entries.some((entry) => entry.isIntersecting);
      syncAnimationState();
    }, { threshold: 0.02 });
    viewportObserver.observe(container);
  }

  const clearTransition = () => {
    if (transitionTimer !== undefined) globalThis.clearTimeout(transitionTimer);
    transitionTimer = undefined;
    transitionPriority = 0;
  };
  const beginTransition = (durationMs: number, priority: number, kind: VfxCue['kind']) => {
    if (transitionVeil.mesh.visible && priority < transitionPriority) return;
    clearTransition();
    transitionPriority = priority;
    transitionStartedAt = clock.getElapsedTime();
    transitionDurationMs = Math.max(1, durationMs);
    transitionVeil.mesh.visible = true;
    transitionUniform.value = 0;
    transitionModeUniform.value = transitionModeForCue(kind);
    renderer.domElement.dataset.vfxTransition = 'active';
    renderer.domElement.dataset.vfxTransitionKind = kind;
    renderer.domElement.dataset.vfxTransitionPhase = 'enter';
    transitionTimer = globalThis.setTimeout(() => {
      transitionTimer = undefined;
      if (!disposed) {
        renderer.domElement.dataset.vfxTransition = 'idle';
        renderer.domElement.dataset.vfxTransitionPhase = 'idle';
        transitionVeil.mesh.visible = false;
        transitionUniform.value = 0;
      }
    }, durationMs);
  };
  const nowMs = (): number => (typeof globalThis.performance !== 'undefined' && typeof globalThis.performance.now === 'function'
    ? globalThis.performance.now()
    : Date.now());
  // The frame loop used to write five camera/transition dataset attributes
  // every rendered frame even though they only change on director beats —
  // in a tavern transcript that is continuous DOM attribute churn beside the
  // chat text. Cache the last published value; write on real change only.
  const publishedObservables: Record<string, string> = {};
  const publish = (key: string, value: string) => {
    if (publishedObservables[key] === value) return;
    publishedObservables[key] = value;
    renderer.domElement.dataset[key] = value;
  };
  const renderFrame = () => {
    if (disposed) return;
    const deltaSeconds = Math.min(clock.getDelta(), 0.25);
    const time = clock.getElapsedTime();
    const directorState = director.advance(deltaSeconds * 1000);
    pulse = Math.max(0, pulse - .018);
    frame.uTime.value = time;
    frame.uPulse.value = Math.max(pulse, directorState.shake);
    frame.uCameraOffset.value.set(directorState.offset[0], directorState.offset[1]);
    frame.uCameraZoom.value = directorState.zoom;
    frame.uCameraShake.value = directorState.shake;
    frame.uSceneProgress.value = directorState.progress;
    // The director owns the damped focus; the frame loop only publishes it.
    frame.uFocus.value.set(directorState.focus[0], directorState.focus[1]);
    frame.uAberration.value = frame.uAberration.value < .004
      ? 0
      : frame.uAberration.value * Math.exp(-deltaSeconds / .09);
    frame.uRipple.value = Math.max(0, pulse - .08) * (focusRipple.mesh.visible ? 1 : 0);
    if (frame.uRipple.value < .015) {
      focusRipple.mesh.visible = false;
      renderer.domElement.dataset.vfxRipple = 'idle';
    }
    publish('vfxCameraPhase', directorState.phase);
    publish('vfxCameraProgress', directorState.progress.toFixed(3));
    publish('vfxCameraZoom', directorState.zoom.toFixed(4));
    publish('vfxCameraShake', directorState.shake.toFixed(4));
    publish('vfxCameraFocus', `${directorState.focus[0].toFixed(4)},${directorState.focus[1].toFixed(4)}`);
    if (transitionVeil.mesh.visible) {
      const progress = Math.min(1, Math.max(0, ((time - transitionStartedAt) * 1000) / transitionDurationMs));
      const envelope = Math.sin(Math.PI * progress);
      transitionUniform.value = envelope;
      if (veilPaletteFrom && veilPaletteTo) {
        veilPaletteFromUniform.value.copy(veilPaletteFrom);
        veilPaletteToUniform.value.copy(veilPaletteTo);
        veilPaletteMixUniform.value = Math.min(1, progress * 2);
      } else veilPaletteMixUniform.value = 0;
      publish('vfxTransitionPhase', progress < .24 ? 'enter' : progress < .72 ? 'hold' : 'exit');
    }
    bough.lines.rotation.z = Math.sin(time * .07) * .018;
    fpsGovernor.tick(nowMs());
    renderer.render(scene, camera);
  };
  const resumeAnimation = () => {
    if (disposed || contextLost || (typeof document !== 'undefined' && document.hidden) || animationRunning) return;
    animationRunning = true;
    clock.start();
    renderer.setAnimationLoop(renderFrame);
    renderer.domElement.dataset.vfxPaused = 'false';
  };
  const pauseAnimation = () => {
    if (!animationRunning) return;
    animationRunning = false;
    clock.stop();
    renderer.setAnimationLoop(null);
    renderer.domElement.dataset.vfxPaused = 'true';
  };
  const onVisibilityChange = () => {
    syncAnimationState();
  };
  if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisibilityChange);

  const emit = (cue: VfxCue) => {
    // A lower-priority cue must be a no-op while a stronger authored
    // transition owns the stage: do not steal focus, pulse, or observability.
    const resolved = transitionVeil.mesh.visible ? resolveVfxCue(transitionPriority, cue) : resolveVfxCue(0, cue);
    if (!resolved) return;
    director.setFocus(resolved.focus);
    frame.uAberration.value = resolved.kind === 'impact'
      ? resolved.intensity * .85
      : resolved.kind === 'cg-reveal' ? resolved.intensity * .4 : 0;
    const shouldRipple = resolved.kind === 'impact' || resolved.kind === 'choice-confirm' || resolved.kind === 'cg-reveal';
    focusRipple.mesh.visible = shouldRipple;
    frame.uRipple.value = shouldRipple ? resolved.intensity : 0;
    rippleModeUniform.value = resolved.kind === 'impact' ? 2 : resolved.kind === 'cg-reveal' ? 1 : 0;
    renderer.domElement.dataset.vfxRipple = shouldRipple ? 'active' : 'idle';
    director.trigger(resolved.kind, resolved.intensity, resolved.durationMs);
    pulse = Math.max(pulse, resolved.intensity);
    renderer.domElement.dataset.vfxCue = resolved.kind;
    beginTransition(resolved.durationMs, resolved.priority, resolved.kind);
  };
  const setPresentation = (next: ScenePresentation) => {
    presentation = next;
    director.setScene(next);
    applyVisualProfile(frame, next);
    relationshipRibbon.mesh.visible = frame.uRibbonStrength.value > 0;
    renderer.domElement.dataset.vfxVisualProfile = next.visual.profile;
    renderer.domElement.dataset.vfxRibbon = next.relationshipRibbon ? 'active' : 'idle';
    if (next.relationshipRibbon) {
      renderer.domElement.dataset.vfxRibbonSource = next.relationshipRibbon.sourceCharacterId;
      renderer.domElement.dataset.vfxRibbonTarget = next.relationshipRibbon.targetCharacterId;
    } else {
      delete renderer.domElement.dataset.vfxRibbonSource;
      delete renderer.domElement.dataset.vfxRibbonTarget;
    }
    renderer.domElement.dataset.vfxCameraFocus = `${next.focus[0]},${next.focus[1]}`;
    renderer.domElement.dataset.vfxCameraMode = next.camera.mode;
  };
  const setSceneState = (state: VfxSceneState) => {
    const previousRoute = route;
    applyPalette(three, state.route, [stage.material, atmosphere.material, particles.material, motifs.material, bough.material, relationshipRibbon.material, focusRipple.material, transitionVeil.material]);
    bough.lines.visible = isBoughRoute(state.route);
    route = state.route;
    sceneId = state.sceneId;
    chapter = state.chapter;
    if (previousRoute !== state.route) {
      // The veil cross-fades from the departed route's palette into the new
      // one; the next route-transition cue drives the mix in the frame loop.
      veilPaletteFrom = palettePrimaryColor(three, previousRoute);
      veilPaletteTo = palettePrimaryColor(three, state.route);
      veilPaletteMixUniform.value = 0;
    } else {
      // Same-route transitions tint the veil with the current route, so a
      // stale cross-fade target can never leak into an ordinary chapter beat.
      veilPaletteFrom = undefined;
      veilPaletteTo = undefined;
      veilPaletteMixUniform.value = 0;
      const current = palettePrimaryColor(three, state.route);
      veilPaletteFromUniform.value.copy(current);
      veilPaletteToUniform.value.copy(current);
    }
    renderer.domElement.dataset.vfxSceneId = sceneId;
    renderer.domElement.dataset.vfxRoute = route;
    if (state.tone) {
      renderer.domElement.dataset.vfxTone = state.tone;
      const toneCue = cueForSceneTone(state.tone);
      if (toneCue) emit(toneCue);
    } else delete renderer.domElement.dataset.vfxTone;
  };
  if (options.tone) {
    const toneCue = cueForSceneTone(options.tone);
    if (toneCue) emit(toneCue);
  }
  syncAnimationState();

  return {
    canvas: renderer.domElement,
    quality,
    setSceneState,
    setPresentation,
    emit,
    setState(nextRoute, nextSceneId) { setSceneState({ route: nextRoute, sceneId: nextSceneId, ...(chapter !== undefined ? { chapter } : {}) }); },
    dispose() {
      if (disposed) return;
      disposed = true;
      clearTransition();
      observer?.disconnect();
      viewportObserver?.disconnect();
      if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisibilityChange);
      pauseAnimation();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.dataset.vfxContext = 'disposed';
      stage.geometry.dispose(); stage.material.dispose();
      atmosphere.geometry.dispose(); atmosphere.material.dispose();
      transitionVeil.geometry.dispose(); transitionVeil.material.dispose();
      particles.geometry.dispose(); particles.material.dispose();
      motifs.geometry.dispose(); motifs.material.dispose();
      relationshipRibbon.geometry.dispose(); relationshipRibbon.material.dispose();
      focusRipple.geometry.dispose(); focusRipple.material.dispose();
      bough.geometry.dispose(); bough.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
