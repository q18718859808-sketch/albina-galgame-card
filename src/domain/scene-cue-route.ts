import { z } from 'zod';

export const RouteIdSchema = z.enum([
  'white_canvas',
  'golden_bough_rebuild',
  'ring_conspiracy',
]);

export type RouteId = z.infer<typeof RouteIdSchema>;
