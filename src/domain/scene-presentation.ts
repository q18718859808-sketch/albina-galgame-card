import { z } from 'zod';

import type { PortraitCue } from './scene-cue';

export const SceneBeatPhaseSchema = z.enum(['enter', 'establish', 'dialogue', 'choice', 'exit']);
export type SceneBeatPhase = z.infer<typeof SceneBeatPhaseSchema>;

export const ScreenSpacePortraitAnchorSchema = z.object({
  characterId: z.string().min(1),
  position: z.enum(['far-left', 'left', 'center', 'right', 'far-right']),
  point: z.tuple([z.number().min(0).max(1), z.number().min(0).max(1)]),
  active: z.boolean(),
}).strict();

export type ScreenSpacePortraitAnchor = z.infer<typeof ScreenSpacePortraitAnchorSchema>;

export const RelationshipRibbonPlanSchema = z.object({
  sourceCharacterId: z.string().min(1),
  targetCharacterId: z.string().min(1),
  source: z.tuple([z.number().min(0).max(1), z.number().min(0).max(1)]),
  target: z.tuple([z.number().min(0).max(1), z.number().min(0).max(1)]),
  strength: z.number().min(0).max(1),
}).strict();

export type RelationshipRibbonPlan = z.infer<typeof RelationshipRibbonPlanSchema>;

export const ScenePresentationSchema = z.object({
  sceneId: z.string().min(1),
  route: z.string().min(1),
  tone: z.string().min(1),
  focusCharacterId: z.string().min(1).optional(),
  portraitAnchors: z.array(ScreenSpacePortraitAnchorSchema),
  relationshipRibbon: RelationshipRibbonPlanSchema.optional(),
  focus: z.tuple([z.number().min(0).max(1), z.number().min(0).max(1)]),
  camera: z.object({
    mode: z.enum(['establish', 'focus', 'drift', 'impact', 'ending']),
    offset: z.tuple([z.number().min(-0.18).max(0.18), z.number().min(-0.18).max(0.18)]),
    zoom: z.number().min(0.9).max(1.2),
    damping: z.number().min(0.01).max(1),
    shake: z.number().min(0).max(1),
  }).strict(),
  timing: z.object({
    enterMs: z.number().int().positive().max(4000),
    establishMs: z.number().int().positive().max(4000),
    dialogueMs: z.number().int().positive().max(4000),
    choiceMs: z.number().int().positive().max(4000),
    exitMs: z.number().int().positive().max(4000),
  }).strict(),
  palette: z.object({
    primary: z.string().regex(/^#[0-9a-f]{6}$/iu),
    shadow: z.string().regex(/^#[0-9a-f]{6}$/iu),
  }).strict(),
  /**
   * Route and tone resolve to a compact director-facing style preset. The
   * renderer consumes this as ordinary uniforms: Vue never participates in a
   * frame-by-frame animation loop.
   */
  visual: z.object({
    profile: z.enum(['canvas', 'rain', 'golden', 'threat', 'gallery', 'ending']),
    parallax: z.number().min(0).max(1),
    grain: z.number().min(0).max(1),
    bloom: z.number().min(0).max(1),
    motifDensity: z.number().min(0).max(1),
  }).strict(),
}).strict();

export type ScenePresentation = z.infer<typeof ScenePresentationSchema>;

const POSITION_FOCUS: Record<PortraitCue['position'], [number, number]> = {
  'far-left': [0.22, 0.43],
  left: [0.34, 0.43],
  center: [0.5, 0.42],
  right: [0.66, 0.43],
  'far-right': [0.78, 0.43],
};

/**
 * Portraits are rendered by an independent DOM/canvas stage rather than a 3D
 * world. This screen-space adapter gives VFX deterministic semantic anchors
 * without inventing camera-space character transforms or changing story JSON.
 */
export function screenSpacePortraitAnchors(portraits: PortraitCue[]): ScreenSpacePortraitAnchor[] {
  return portraits.map((portrait) => ScreenSpacePortraitAnchorSchema.parse({
    characterId: portrait.characterId,
    position: portrait.position,
    point: POSITION_FOCUS[portrait.position],
    active: portrait.active,
  }));
}

/**
 * A relationship line exists only when a speaking portrait has another staged
 * counterpart. It is intentionally derived from the current scene, never
 * stored in the script, so legacy scene data remains valid and deterministic.
 */
export function resolveRelationshipRibbon(
  anchors: ScreenSpacePortraitAnchor[],
  focusCharacterId: string | undefined,
): RelationshipRibbonPlan | undefined {
  const target = anchors.find((anchor) => anchor.characterId === focusCharacterId && anchor.active);
  const source = anchors.find((anchor) => anchor.characterId !== target?.characterId);
  if (!target || !source) return undefined;
  const spread = Math.abs(target.point[0] - source.point[0]);
  return RelationshipRibbonPlanSchema.parse({
    sourceCharacterId: source.characterId,
    targetCharacterId: target.characterId,
    source: source.point,
    target: target.point,
    strength: Number(Math.min(1, 0.44 + spread * 0.72).toFixed(3)),
  });
}

const ROUTE_PALETTES: Record<string, ScenePresentation['palette']> = {
  white_canvas: { primary: '#d9eef7', shadow: '#12222c' },
  golden_bough_rebuild: { primary: '#f2c95f', shadow: '#382611' },
  ring_conspiracy: { primary: '#d85f67', shadow: '#341116' },
};

function cameraMode(tone: string, ending: boolean): ScenePresentation['camera']['mode'] {
  if (ending) return 'ending';
  if (tone === 'threat') return 'impact';
  if (tone === 'quiet') return 'focus';
  if (tone === 'rain' || tone === 'gallery') return 'drift';
  return 'establish';
}

function resolveVisualProfile(route: string, tone: string, ending: boolean): ScenePresentation['visual'] {
  if (ending) return { profile: 'ending', parallax: 0.22, grain: 0.04, bloom: 0.76, motifDensity: 0.88 };
  if (tone === 'threat') return { profile: 'threat', parallax: 0.58, grain: 0.42, bloom: 0.67, motifDensity: 0.74 };
  if (tone === 'gallery') return { profile: 'gallery', parallax: 0.44, grain: 0.16, bloom: 0.72, motifDensity: 0.62 };
  if (tone === 'rain') return { profile: 'rain', parallax: 0.68, grain: 0.28, bloom: 0.38, motifDensity: 0.86 };
  if (route === 'golden_bough_rebuild') return { profile: 'golden', parallax: 0.52, grain: 0.22, bloom: 0.64, motifDensity: 0.74 };
  return { profile: 'canvas', parallax: 0.4, grain: 0.19, bloom: 0.46, motifDensity: 0.54 };
}

/**
 * Derives a deterministic presentation from authored scene semantics. It is
 * intentionally separate from SceneCue so old story files remain valid while
 * every scene still receives a stable camera plan.
 */
export function resolveScenePresentation(scene: {
  id: string;
  route: string | null;
  tone: string;
  portraits: PortraitCue[];
  ending?: unknown;
}): ScenePresentation {
  const active = scene.portraits.find((portrait) => portrait.active);
  const portraitAnchors = screenSpacePortraitAnchors(scene.portraits);
  const focus = active ? POSITION_FOCUS[active.position] : [0.5, 0.42] as [number, number];
  const relationshipRibbon = resolveRelationshipRibbon(portraitAnchors, active?.characterId);
  const route = scene.route ?? 'white_canvas';
  const tone = scene.tone.toLowerCase();
  const mode = cameraMode(tone, Boolean(scene.ending));
  const zoom = mode === 'impact' ? 1.055 : mode === 'focus' ? 1.035 : mode === 'ending' ? 1.02 : 1;
  const offset: [number, number] = [Number(((focus[0] - 0.5) * -0.12).toFixed(4)), Number(((focus[1] - 0.42) * -0.08).toFixed(4))];
  return ScenePresentationSchema.parse({
    sceneId: scene.id,
    route,
    tone: scene.tone,
    ...(active ? { focusCharacterId: active.characterId } : {}),
    portraitAnchors,
    ...(relationshipRibbon ? { relationshipRibbon } : {}),
    focus,
    camera: {
      mode,
      offset,
      zoom,
      damping: mode === 'impact' ? 0.16 : mode === 'ending' ? 0.08 : 0.12,
      shake: mode === 'impact' ? 0.28 : mode === 'ending' ? 0.04 : 0,
    },
    timing: {
      enterMs: mode === 'impact' ? 320 : 520,
      establishMs: mode === 'drift' ? 1450 : 1050,
      dialogueMs: 360,
      choiceMs: 520,
      exitMs: mode === 'ending' ? 1500 : 520,
    },
    palette: ROUTE_PALETTES[route] ?? ROUTE_PALETTES.white_canvas!,
    visual: resolveVisualProfile(route, tone, Boolean(scene.ending)),
  });
}
