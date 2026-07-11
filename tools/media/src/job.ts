import { readFile } from 'node:fs/promises';

import type { AudioExpectation, ImageExpectation, VideoExpectation } from './validate.js';

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
  validation?: VideoExpectation;
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
  return value as unknown as MediaJob;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
