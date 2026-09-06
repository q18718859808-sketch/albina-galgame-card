import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

export const defaultGateway = 'https://gcli.ggchan.dev/v1';
export const defaultModel = 'gemini-3-flash-preview';

export async function analyzeCanonicalImage(options) {
  const apiKey = options.apiKey ?? process.env.GCLI_API_KEY;
  if (!apiKey) throw new Error('GCLI_API_KEY is required');
  const model = options.model ?? defaultModel;
  if (model !== defaultModel) throw new Error(`Gemini canonical analysis model is pinned to ${defaultModel}`);
  const source = await imagePart(options.imagePath);
  const prompt = options.prompt ?? canonicalAnalysisPrompt();
  const response = await requestVision({
    apiKey,
    gateway: options.gateway,
    model,
    timeoutMs: options.timeoutMs,
    maxTokens: 2200,
    content: [
      { type: 'text', text: prompt },
      { type: 'image_url', image_url: { url: source.dataUrl } },
    ],
  });
  return {
    schemaVersion: 1,
    status: 'canonical-analysis-complete',
    analyst: 'gemini-canonical-vision',
    gateway: normalizeGateway(options.gateway),
    model,
    analyzedAt: new Date().toISOString(),
    source: { path: options.imagePath, sha256: source.sha256, mimeType: source.mimeType },
    prompt,
    analysis: response,
  };
}

export async function reviewImagePair(options) {
  const apiKey = options.apiKey ?? process.env.GCLI_API_KEY;
  if (!apiKey) throw new Error('GCLI_API_KEY is required');
  const model = options.model ?? defaultModel;
  if (model !== defaultModel) throw new Error(`Gemini visual review model is pinned to ${defaultModel}`);
  const reference = await imagePart(options.referencePath);
  const candidate = await imagePart(options.candidatePath);
  const verdict = await requestVision({
    apiKey,
    gateway: options.gateway,
    model,
    timeoutMs: options.timeoutMs,
    maxTokens: 1600,
    content: [
      { type: 'text', text: options.prompt ?? defaultPrompt() },
      { type: 'image_url', image_url: { url: reference.dataUrl } },
      { type: 'image_url', image_url: { url: candidate.dataUrl } },
    ],
  });
  return {
    schemaVersion: 1,
    status: 'external-review-complete',
    reviewer: 'gemini-visual-review',
    gateway: normalizeGateway(options.gateway),
    model,
    reviewedAt: new Date().toISOString(),
    reference: { path: options.referencePath, sha256: reference.sha256, mimeType: reference.mimeType },
    candidate: { path: options.candidatePath, sha256: candidate.sha256, mimeType: candidate.mimeType },
    prompt: options.prompt ?? defaultPrompt(),
    verdict,
    promotion: 'advisory-only; human direct-image review remains required',
  };
}

export function normalizeGateway(value = defaultGateway) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.hostname !== 'gcli.ggchan.dev') throw new Error('Gemini review gateway must be the configured HTTPS host');
  return url.toString().replace(/\/$/u, '');
}

export function defaultPrompt() {
  return `You are an independent visual QA reviewer. Image 1 is the canonical Albina design reference from Limbus Company. Image 2 is a Krea2 redraw candidate. Inspect both images directly and give a strict verdict using exactly these headings: DECISION (PASS or REJECT), IDENTITY, AGE, EYES, HAIR, CLOTHING_AND_MECHANICAL_DETAILS, ANATOMY_AND_COMPOSITION, STYLE, and REASONS. PASS only if image 2 clearly preserves all of: mature cold adult face; black-white asymmetrical eyes; structured silver fringe and cable/conduit high ponytail; formal black-white mechanical institutional tailoring; readable torso or forearm prosthetic/interface language; adult restrained authoritative body language. Reject any collage, childlike/loli appearance, generic silver-haired substitution, missing anchor, anatomy defect, logo, watermark, or unreadable composition. Do not infer missing details. This result is advisory only and must be evidence-based.`;
}

export function canonicalAnalysisPrompt() {
  return `Inspect this canonical game character image directly. Produce a source-faithful Krea2 image-edit specification using exactly these headings: SUBJECT_IDENTITY, ADULT_AGE_AND_FACE, EYES, HAIR_OR_CABLE_STRUCTURE, BODY_AND_PROSTHETICS, CLOTHING_CONSTRUCTION, COLOR_BLOCKING, POSE_AND_SILHOUETTE, COMPOSITION, PRESERVE_PROMPT, NEGATIVE_PROMPT, REVIEW_CHECKLIST. Describe only visible facts; mark hidden or ambiguous details UNKNOWN. PRESERVE_PROMPT must be a compact English prompt suitable for a Krea2 canonical img2img edit and must preserve identity, clothing, anatomy, pose, and composition before applying a polished dense 2D visual-novel finish. NEGATIVE_PROMPT must reject childlike/loli proportions, generic anime substitution, altered eye-side assignment, natural-hair substitution, costume redesign, anatomy errors, text, logos, watermarks, collage, and cropping. Do not identify traits from outside the supplied image and do not redesign the character.`;
}

async function requestVision(options) {
  const model = options.model ?? defaultModel;
  const response = await fetch(`${normalizeGateway(options.gateway)}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${options.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      max_tokens: options.maxTokens,
      messages: [{ role: 'user', content: options.content }],
    }),
    signal: AbortSignal.timeout(options.timeoutMs ?? 120_000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Gemini visual request HTTP ${response.status}: ${safeError(body)}`);
  const content = body?.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Gemini visual request returned no content');
  return content;
}

async function imagePart(path) {
  const absolutePath = resolve(path);
  const bytes = await readFile(absolutePath);
  const mimeType = mimeFor(absolutePath);
  return {
    mimeType,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    dataUrl: `data:${mimeType};base64,${bytes.toString('base64')}`,
  };
}

function mimeFor(path) {
  const extension = extname(path).toLowerCase();
  if (extension === '.png') return 'image/png';
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg';
  if (extension === '.webp') return 'image/webp';
  throw new Error(`Unsupported review image type: ${extension || 'none'}`);
}

function safeError(body) {
  return JSON.stringify(body)
    .replaceAll(/gg-gcli-[A-Za-z0-9_-]+/gu, '[REDACTED]')
    .replaceAll(/(?:authorization|api[_-]?key|token)\s*["':=]+\s*[^,}\s"]+/giu, '[REDACTED]')
    .replaceAll(/data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+/giu, '[IMAGE_DATA_REDACTED]')
    .slice(0, 500);
}
