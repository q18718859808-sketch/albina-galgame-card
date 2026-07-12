import { readFile } from 'node:fs/promises';

import type { AudioExpectation, FlexibleVideoExpectation, ImageExpectation, VideoExpectation } from './validate.js';

interface BaseJob {
  output: string;
  probe?: boolean;
}

export interface ImageJob extends BaseJob {
  kind: 'image';
  prompt: string;
  width: number;
  height: number;
  sourceImage?: string;
  validation?: ImageExpectation;
}

export interface VideoJob extends BaseJob {
  kind: 'video';
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
  input: string;
  voice: string;
  validation?: AudioExpectation;
}

export interface MusicJob extends BaseJob {
  kind: 'music';
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
  assertValidationShape(value, path);
  if (value.kind === 'video' && (typeof value.sourceImage !== 'string' || typeof value.masterOutput !== 'string' || typeof value.desktopOutput !== 'string' || !isRecord(value.desktopValidation) || !isRecord(value.masterValidation))) throw new Error(`Video job is missing approved keyframe, derivative outputs, or validation: ${path}`);
  if (value.kind === 'video') {
    assertAllowed(value.desktopValidation as Record<string, unknown>, new Set(['width', 'height', 'fps', 'durationSeconds', 'tolerance']), path);
    assertAllowed(value.masterValidation as Record<string, unknown>, new Set(['minFps', 'maxFps', 'minDurationSeconds', 'maxDurationSeconds']), path);
  }
  return value as unknown as MediaJob;
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
