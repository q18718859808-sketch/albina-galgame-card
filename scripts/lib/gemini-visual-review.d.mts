export const defaultGateway: 'https://gcli.ggchan.dev/v1';
export const defaultModel: 'gemini-3-flash-preview';
export function normalizeGateway(value?: string): string;
export function defaultPrompt(): string;
export function reviewImagePair(options: {
  apiKey?: string;
  gateway?: string;
  model?: string;
  referencePath: string;
  candidatePath: string;
  prompt?: string;
  timeoutMs?: number;
}): Promise<{
  schemaVersion: 1;
  status: 'external-review-complete';
  reviewer: 'gemini-visual-review';
  gateway: string;
  model: 'gemini-3-flash-preview';
  reviewedAt: string;
  reference: { path: string; sha256: string; mimeType: string };
  candidate: { path: string; sha256: string; mimeType: string };
  prompt: string;
  verdict: string;
  promotion: string;
}>;
