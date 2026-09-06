import { describe, expect, test } from 'vitest';

import { parseVideoBenchmarkRecord, resolveVideoBenchmarkCanonical } from '../src/benchmark.js';
import { ProviderContractError } from '../src/provider.js';

const HASHES = {
  keyframe: '1'.repeat(64),
  prompt: '2'.repeat(64),
  pieJob: '3'.repeat(64),
  pieArtifact: '4'.repeat(64),
  grokJob: '5'.repeat(64),
  grokArtifact: '6'.repeat(64),
};

function record() {
  return {
    version: 1,
    id: 'benchmark.prologue.v1',
    sceneId: 'prologue',
    keyframeSha256: HASHES.keyframe,
    promptHash: HASHES.prompt,
    promptVersion: 'albina-video-v1',
    durationSeconds: 8,
    canonicalBefore: 'pie',
    candidates: [
      {
        provider: 'pie', model: 'seedance-1.5-pro', jobContentHash: HASHES.pieJob,
        artifactSha256: HASHES.pieArtifact, artifactPath: 'staging/benchmarks/prologue/pie.mp4', automatedValidation: 'passed',
      },
      {
        provider: 'grok-responses', model: 'grok-image-video-1.5-preview', jobContentHash: HASHES.grokJob,
        artifactSha256: HASHES.grokArtifact, artifactPath: 'staging/benchmarks/prologue/grok.mp4', automatedValidation: 'passed',
      },
    ],
    visualReview: { status: 'pending' },
  };
}

describe('paired video benchmark contract', () => {
  test('keeps the existing canonical while visual review is pending', () => {
    expect(parseVideoBenchmarkRecord(record()).candidates).toHaveLength(2);
    expect(resolveVideoBenchmarkCanonical(record())).toBe('pie');
  });

  test('requires one validated candidate from each locked provider/model pair', () => {
    const duplicate = record();
    duplicate.candidates[1] = { ...duplicate.candidates[0]! };
    expect(() => parseVideoBenchmarkRecord(duplicate)).toThrow(/one Pie and one Grok/iu);

    const wrongModel = record();
    wrongModel.candidates[1]!.model = 'seedance-1.5-pro';
    expect(() => parseVideoBenchmarkRecord(wrongModel)).toThrow(/model/iu);
  });

  test('rejects a provider selection without approved human visual review', () => {
    const unapproved = record();
    unapproved.visualReview = { status: 'pending', selectedProvider: 'grok-responses' } as never;
    expect(() => resolveVideoBenchmarkCanonical(unapproved)).toThrow(ProviderContractError);
  });

  test('allows a canonical change only with an attributable visual approval', () => {
    const approved = record();
    approved.visualReview = {
      status: 'approved',
      selectedProvider: 'grok-responses',
      reviewer: 'visual-reviewer',
      reviewedAt: '2026-07-15T00:00:00Z',
      notes: 'Identity and motion continuity reviewed side by side.',
    } as never;
    expect(resolveVideoBenchmarkCanonical(approved)).toBe('grok-responses');

    const anonymous = record();
    anonymous.visualReview = { status: 'approved', selectedProvider: 'grok-responses' } as never;
    expect(() => resolveVideoBenchmarkCanonical(anonymous)).toThrow(/reviewer/iu);
  });

  test('rejects remote artifact paths and unrecognized fields', () => {
    const remote = record();
    remote.candidates[0]!.artifactPath = 'https://cdn.example.invalid/pie.mp4';
    expect(() => parseVideoBenchmarkRecord(remote)).toThrow(/local artifact/iu);
    expect(() => parseVideoBenchmarkRecord({ ...record(), apiKey: 'not-allowed' })).toThrow(/unexpected/iu);
  });
});
