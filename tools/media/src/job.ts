import { readFile } from 'node:fs/promises';

import { assertProviderModel, type ImageProviderId, type VideoProviderId } from './provider.js';
import type { AudioExpectation, FlexibleVideoExpectation, ImageExpectation, VideoExpectation } from './validate.js';

interface BaseJob {
  output: string;
  promptVersion: string;
  probe?: boolean;
}

export interface ImageJob extends BaseJob {
  kind: 'image';
  provider: ImageProviderId;
  model: 'gpt-image-2';
  prompt: string;
  width: number;
  height: number;
  sourceImage?: string;
  validation?: ImageExpectation;
}

export interface VideoJob extends BaseJob {
  kind: 'video';
  provider: VideoProviderId;
  model: 'seedance-1.5-pro' | 'grok-image-video-1.5-preview';
  prompt: string;
  durationSeconds: number;
  sourceImage: string;
  masterOutput: string;
  desktopOutput: string;
  validation?: VideoExpectation;
  desktopValidation: VideoExpectation;
  masterValidation: FlexibleVideoExpectation;
}

export interface SpeechJob extends BaseJob {
  kind: 'speech';
  provider: 'pie';
  model: 'speech-2.8-hd';
  input: string;
  voice: string;
  validation?: AudioExpectation;
}

export interface MusicJob extends BaseJob {
  kind: 'music';
  provider: 'pie';
  model: 'music-2.6';
  prompt: string;
  durationSeconds: number;
  validation?: AudioExpectation;
}

export type MediaJob = ImageJob | VideoJob | SpeechJob | MusicJob;

export async function loadJob(path: string): Promise<MediaJob> {
  const value = JSON.parse(await readFile(path, 'utf8')) as unknown;
  if (!isRecord(value) || !['image', 'video', 'speech', 'music'].includes(String(value.kind))) {
    throw new Error(`Invalid media job: ${path}`);
  }
  if (typeof value.output !== 'string') throw new Error(`Media job is missing output: ${path}`);
  if (typeof value.provider !== 'string' || typeof value.model !== 'string' || typeof value.promptVersion !== 'string' || !/^[a-z0-9][a-z0-9._-]*$/iu.test(value.promptVersion)) {
    throw new Error(`Media job is missing explicit provider, model, or promptVersion: ${path}`);
  }
  if (Object.hasOwn(value, 'probe') && typeof value.probe !== 'boolean') throw new Error(`Media job probe must be boolean: ${path}`);
  assertProviderModel(value.kind as MediaJob['kind'], value.provider, value.model);
  assertKindFields(value, path);
  assertValidationShape(value, path);
  if (value.kind === 'video' && (typeof value.sourceImage !== 'string' || typeof value.masterOutput !== 'string' || typeof value.desktopOutput !== 'string' || !isRecord(value.desktopValidation) || !isRecord(value.masterValidation))) throw new Error(`Video job is missing approved keyframe, derivative outputs, or validation: ${path}`);
  if (value.kind === 'video') {
    assertAllowed(value.desktopValidation as Record<string, unknown>, new Set(['width', 'height', 'fps', 'durationSeconds', 'tolerance']), path);
    assertAllowed(value.masterValidation as Record<string, unknown>, new Set(['minFps', 'maxFps', 'minDurationSeconds', 'maxDurationSeconds']), path);
  }
  return value as unknown as MediaJob;
}

function assertKindFields(value: Record<string, unknown>, path: string): void {
  if (value.kind === 'image' && (typeof value.prompt !== 'string' || typeof value.width !== 'number' || typeof value.height !== 'number')) {
    throw new Error(`Image job is missing prompt or dimensions: ${path}`);
  }
  if (value.kind === 'video' && (typeof value.prompt !== 'string' || typeof value.durationSeconds !== 'number' || value.durationSeconds <= 0)) {
    throw new Error(`Video job is missing prompt or duration: ${path}`);
  }
  if (value.kind === 'speech' && (typeof value.input !== 'string' || typeof value.voice !== 'string')) {
    throw new Error(`Speech job is missing input or voice: ${path}`);
  }
  if (value.kind === 'music' && (typeof value.prompt !== 'string' || typeof value.durationSeconds !== 'number')) {
    throw new Error(`Music job is missing prompt or duration: ${path}`);
  }
}

function assertValidationShape(value: Record<string, unknown>, path: string): void {
  if (!isRecord(value.validation)) return;
  const allowed = value.kind === 'image'
    ? new Set(['width', 'height', 'alpha', 'frameCount'])
    : value.kind === 'video'
      ? new Set(['width', 'height', 'fps', 'durationSeconds', 'tolerance'])
      : new Set(['minDurationSeconds', 'maxDurationSeconds', 'minLoudnessDbfs', 'maxLoudnessDbfs']);
  assertAllowed(value.validation, allowed, path);
}
function assertAllowed(value: Record<string, unknown>, allowed: Set<string>, path: string): void {
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`Unknown validation fields in ${path}: ${unknown.join(', ')}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
