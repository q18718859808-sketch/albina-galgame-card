import { readFile } from 'node:fs/promises';

import { ProviderContractError } from './provider.js';

export type VideoBenchmarkProvider = 'pie' | 'grok-responses';

export interface VideoBenchmarkCandidate {
  provider: VideoBenchmarkProvider;
  model: 'seedance-1.5-pro' | 'grok-image-video-1.5-preview';
  jobContentHash: string;
  artifactSha256: string;
  artifactPath: string;
  automatedValidation: 'passed';
}

export interface VideoBenchmarkReview {
  status: 'pending' | 'approved' | 'rejected';
  selectedProvider?: VideoBenchmarkProvider;
  reviewer?: string;
  reviewedAt?: string;
  notes?: string;
}

export interface VideoBenchmarkRecord {
  version: 1;
  id: string;
  sceneId: string;
  keyframeSha256: string;
  promptHash: string;
  promptVersion: string;
  durationSeconds: number;
  canonicalBefore: VideoBenchmarkProvider;
  candidates: [VideoBenchmarkCandidate, VideoBenchmarkCandidate];
  visualReview: VideoBenchmarkReview;
}

const HASH = /^[a-f0-9]{64}$/iu;
const PROMPT_VERSION = /^[a-z0-9][a-z0-9._-]*$/iu;
const PROVIDERS = new Set<VideoBenchmarkProvider>(['pie', 'grok-responses']);
const RECORD_KEYS = new Set(['version', 'id', 'sceneId', 'keyframeSha256', 'promptHash', 'promptVersion', 'durationSeconds', 'canonicalBefore', 'candidates', 'visualReview']);
const CANDIDATE_KEYS = new Set(['provider', 'model', 'jobContentHash', 'artifactSha256', 'artifactPath', 'automatedValidation']);
const REVIEW_KEYS = new Set(['status', 'selectedProvider', 'reviewer', 'reviewedAt', 'notes']);

export async function loadVideoBenchmarkRecord(path: string): Promise<VideoBenchmarkRecord> {
  return parseVideoBenchmarkRecord(JSON.parse(await readFile(path, 'utf8')));
}

export function parseVideoBenchmarkRecord(value: unknown): VideoBenchmarkRecord {
  const record = requireRecord(value, 'video benchmark');
  assertOnlyKeys(record, RECORD_KEYS, 'video benchmark');
  if (record.version !== 1 || !isNonEmpty(record.id) || !isNonEmpty(record.sceneId)) fail('Invalid video benchmark identity');
  if (!isHash(record.keyframeSha256) || !isHash(record.promptHash)) fail('Invalid benchmark input hash');
  if (!isPromptVersion(record.promptVersion)) fail('Invalid benchmark promptVersion');
  if (typeof record.durationSeconds !== 'number' || !Number.isFinite(record.durationSeconds) || record.durationSeconds <= 0) fail('Invalid benchmark duration');
  if (!isProvider(record.canonicalBefore)) fail('Invalid benchmark canonical provider');
  const candidates = parseCandidatePair(record.candidates);
  const visualReview = parseReview(record.visualReview);
  return {
    version: 1,
    id: record.id,
    sceneId: record.sceneId,
    keyframeSha256: record.keyframeSha256,
    promptHash: record.promptHash,
    promptVersion: record.promptVersion,
    durationSeconds: record.durationSeconds,
    canonicalBefore: record.canonicalBefore,
    candidates,
    visualReview,
  };
}

export function resolveVideoBenchmarkCanonical(value: unknown): VideoBenchmarkProvider {
  const record = parseVideoBenchmarkRecord(value);
  return record.visualReview.status === 'approved'
    ? record.visualReview.selectedProvider as VideoBenchmarkProvider
    : record.canonicalBefore;
}

function parseCandidatePair(value: unknown): [VideoBenchmarkCandidate, VideoBenchmarkCandidate] {
  if (!Array.isArray(value) || value.length !== 2) fail('Video benchmark requires exactly two candidates');
  const candidates = value.map(parseCandidate);
  if (new Set(candidates.map(({ provider }) => provider)).size !== 2) fail('Video benchmark requires one Pie and one Grok candidate');
  return candidates as [VideoBenchmarkCandidate, VideoBenchmarkCandidate];
}

function parseCandidate(value: unknown): VideoBenchmarkCandidate {
  const candidate = requireRecord(value, 'video benchmark candidate');
  assertOnlyKeys(candidate, CANDIDATE_KEYS, 'video benchmark candidate');
  if (!isProvider(candidate.provider)) fail('Invalid benchmark candidate provider');
  const expectedModel = candidate.provider === 'pie' ? 'seedance-1.5-pro' : 'grok-image-video-1.5-preview';
  if (candidate.model !== expectedModel) fail(`Invalid benchmark model for ${candidate.provider}`);
  if (!isHash(candidate.jobContentHash) || !isHash(candidate.artifactSha256)) fail('Invalid candidate hash');
  if (!isSafeRelativePath(candidate.artifactPath) || candidate.automatedValidation !== 'passed') fail('Candidate must be a validated local artifact');
  return candidate as unknown as VideoBenchmarkCandidate;
}

function parseReview(value: unknown): VideoBenchmarkReview {
  const review = requireRecord(value, 'visual review');
  assertOnlyKeys(review, REVIEW_KEYS, 'visual review');
  if (!['pending', 'approved', 'rejected'].includes(String(review.status))) fail('Invalid visual review status');
  if (review.notes !== undefined && typeof review.notes !== 'string') fail('Invalid visual review notes');
  if (review.status !== 'approved') {
    if (review.selectedProvider !== undefined) fail('Only an approved visual review may select a provider');
    return review as unknown as VideoBenchmarkReview;
  }
  if (!isProvider(review.selectedProvider) || !isNonEmpty(review.reviewer) || !isIsoTimestamp(review.reviewedAt)) {
    fail('Approved visual review requires provider, reviewer, and ISO timestamp');
  }
  return review as unknown as VideoBenchmarkReview;
}

function requireRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`Invalid ${label}`);
  return value as Record<string, unknown>;
}

function assertOnlyKeys(value: Record<string, unknown>, allowed: Set<string>, label: string): void {
  const unexpected = Object.keys(value).filter((key) => !allowed.has(key));
  if (unexpected.length > 0) fail(`Unexpected ${label} fields: ${unexpected.join(', ')}`);
}

function isProvider(value: unknown): value is VideoBenchmarkProvider {
  return typeof value === 'string' && PROVIDERS.has(value as VideoBenchmarkProvider);
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isHash(value: unknown): value is string {
  return typeof value === 'string' && HASH.test(value);
}

function isPromptVersion(value: unknown): value is string {
  return typeof value === 'string' && PROMPT_VERSION.test(value);
}

function isIsoTimestamp(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value) && !Number.isNaN(Date.parse(value));
}

function isSafeRelativePath(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && !/^(?:[a-z]:|[\\/])/iu.test(value)
    && !value.split(/[\\/]/u).includes('..') && !/^https?:/iu.test(value);
}

function fail(message: string): never {
  throw new ProviderContractError(message);
}
