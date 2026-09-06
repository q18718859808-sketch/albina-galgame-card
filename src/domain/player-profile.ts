import { z } from 'zod';

import { RouteIdSchema } from './scene-cue';

export const PLAYER_PROFILE_VARIABLE_KEY = 'albinaPlayerProfileV1' as const;
export const PLAYER_PROFILE_FIELDS = [
  'name', 'addressName', 'gender', 'appearance', 'background', 'ability', 'initialRelationship', 'boundaries', 'routePreference',
] as const;

export type PlayerProfileField = typeof PLAYER_PROFILE_FIELDS[number];

export const PlayerProfileSchema = z
  .object({
    name: z.string().min(1).max(80),
    addressName: z.string().min(1).max(80),
    gender: z.string().min(1).max(80),
    appearance: z.string().max(800),
    background: z.string().max(800),
    ability: z.string().max(400),
    initialRelationship: z.string().max(400),
    boundaries: z.string().max(800),
    routePreference: RouteIdSchema,
  })
  .strict();

export type PlayerProfile = z.infer<typeof PlayerProfileSchema>;

export function createDefaultPlayerProfile(): PlayerProfile {
  return {
    name: '{{user}}',
    gender: '成年男性',
    appearance: '修长的实战体态，短黑发，灰褐色眼睛，左耳佩戴简洁金属通讯耳扣。穿深 charcoal 长外套、冷白内层、旧金色窄识别带、黑色长裤和耐磨靴。',
    background: '暂未确认；可由玩家设定。',
    ability: '观察、记录与在危险中保持克制。',
    addressName: '{{user}}',
    initialRelationship: '谨慎观察：不预设亲密、敌意或服从，由故事中的明确行动逐步建立关系。',
    boundaries: '成人自愿，亲密推进需要明确同意；允许黑暗都市暴力，但不允许强迫或失能式亲密。',
    routePreference: 'white_canvas',
  };
}

export const PLAYER_PROFILE_UPDATE_EVENTS = {
  profile_submit: 'replace from sanitized PlayerProfileSchema value',
  save_restore: 'replace from validated SaveV2.playerProfile',
  narrative_turn: 'read only through the verified worldbook EJS entry',
} as const;
