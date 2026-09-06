import { z } from 'zod';

export const VfxCueKindSchema = z.enum([
  'atmosphere',
  'dialogue-emphasis',
  'choice-confirm',
  'route-transition',
  'chapter-transition',
  'cg-reveal',
  'impact',
  'ending',
]);

export type VfxCueKind = z.infer<typeof VfxCueKindSchema>;

export const VfxSceneStateSchema = z.object({
  route: z.string().min(1),
  sceneId: z.string().min(1),
  chapter: z.number().int().nonnegative().optional(),
  tone: z.string().min(1).optional(),
  focus: z.tuple([z.number().min(0).max(1), z.number().min(0).max(1)]).optional(),
}).strict();

export type VfxSceneState = z.infer<typeof VfxSceneStateSchema>;

export const VfxCueSchema = z.object({
  kind: VfxCueKindSchema,
  intensity: z.number().min(0).max(1).optional(),
  durationMs: z.number().int().positive().max(4000).optional(),
  focus: z.tuple([z.number().min(0).max(1), z.number().min(0).max(1)]).optional(),
}).strict();

export type VfxCue = z.infer<typeof VfxCueSchema>;

type CompleteVfxCueProfile = Required<Omit<VfxCue, 'kind'>>;

const TONE_CUES: Record<string, VfxCueKind> = {
  rain: 'atmosphere',
  quiet: 'dialogue-emphasis',
  gallery: 'cg-reveal',
  golden: 'chapter-transition',
  threat: 'impact',
};

export function cueForSceneTone(tone: string | undefined): VfxCue | undefined {
  const kind = tone ? TONE_CUES[tone.toLowerCase()] : undefined;
  return kind ? { kind } : undefined;
}

export function defaultCueProfile(kind: VfxCueKind): CompleteVfxCueProfile {
  const profiles: Record<VfxCueKind, CompleteVfxCueProfile> = {
    atmosphere: { intensity: 0.35, durationMs: 900, focus: [0.5, 0.44] },
    'dialogue-emphasis': { intensity: 0.42, durationMs: 360, focus: [0.5, 0.44] },
    'choice-confirm': { intensity: 0.72, durationMs: 520, focus: [0.5, 0.58] },
    'route-transition': { intensity: 0.92, durationMs: 1250, focus: [0.5, 0.44] },
    'chapter-transition': { intensity: 0.9, durationMs: 1100, focus: [0.5, 0.44] },
    'cg-reveal': { intensity: 0.78, durationMs: 1000, focus: [0.5, 0.44] },
    impact: { intensity: 0.95, durationMs: 420, focus: [0.5, 0.48] },
    ending: { intensity: 0.86, durationMs: 1500, focus: [0.5, 0.44] },
  };
  return profiles[kind];
}
