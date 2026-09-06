import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import {
  adoptVisualReviewContractRecord,
  approvalCriteriaEvidence,
  atomicWrite,
  createAmbiguousRetryAuthorization,
  currentVisualContractReview,
  editRequest,
  executeAmbiguousRetry,
  inspectPixels,
  inspectPng,
  isAmbiguousProviderResponse,
  isUsableLatentApiKey,
  isUsableWisartApiKey,
  loadProductionInputs,
  resolveLatentBaseUrl,
  resolveCanonVisualSourcePath,
  orderResolvedReferenceInputs,
  orderedReferenceSourceIds,
  preparePortrait,
  productionReviewCriteria,
  resolveDefinitiveFailureRecord,
  resolveReferenceInputs,
  selectImageJobs,
  validateAmbiguousRetryAuthorization,
  validateAmbiguousRetryLink,
  validateAmbiguousRetryOptions,
  validateLedger,
  verifyAmbiguousRetryAuthorizationEvidence,
} from '../../scripts/lib/visual-production.mjs';

const runFile = promisify(execFile);
const ffmpeg = process.env.FFMPEG_PATH || 'C:\\Program Files\\Kdenlive\\bin\\ffmpeg.exe';

async function encodeRgba(path: string, width: number, height: number, pixels: Buffer) {
  const raw = `${path}.rgba`;
  await writeFile(raw, pixels);
  await runFile(ffmpeg, ['-v', 'error', '-y', '-f', 'rawvideo', '-pixel_format', 'rgba', '-video_size', `${width}x${height}`, '-i', raw, '-frames:v', '1', path]);
}

async function decodeRgba(path: string, width: number, height: number) {
  const { stdout } = await runFile(ffmpeg, ['-v', 'error', '-i', path, '-vf', `scale=${width}:${height}:flags=neighbor,format=rgba`, '-frames:v', '1', '-f', 'rawvideo', '-'], { encoding: 'buffer', maxBuffer: width * height * 4 + 1024 });
  return Buffer.from(stdout);
}

function pixel(buffer: Buffer, width: number, x: number, y: number) {
  const offset = (y * width + x) * 4;
  return [...buffer.subarray(offset, offset + 4)];
}

function png(width: number, height: number, colorType = 6): Buffer {
  const bytes = Buffer.alloc(33);
  Buffer.from('89504e470d0a1a0a', 'hex').copy(bytes, 0);
  bytes.write('IHDR', 12, 'ascii');
  bytes.writeUInt32BE(width, 16);
  bytes.writeUInt32BE(height, 20);
  bytes[25] = colorType;
  return bytes;
}

describe('WisArt visual production', () => {
  it('uses the documented Latent base URL across legacy and client environment names', () => {
    expect(resolveLatentBaseUrl({})).toBe('https://latent.moe');
    expect(resolveLatentBaseUrl({ LATENT_MOE_BASE_URL: 'https://latent.moe/' })).toBe('https://latent.moe');
    expect(resolveLatentBaseUrl({ LATENT_BASE_URL: 'https://latent.moe' })).toBe('https://latent.moe');
    expect(() => resolveLatentBaseUrl({ LATENT_MOE_BASE_URL: 'https://example.invalid' })).toThrow(/LATENT_MOE_BASE_URL/u);
    expect(() => resolveLatentBaseUrl({ LATENT_MOE_BASE_URL: 'https://latent.moe', LATENT_BASE_URL: 'https://example.invalid' })).toThrow(/conflict/u);
  });

  it('requires a non-empty manual note and evidence for every approved current review criterion', () => {
    const entry = {
      job: { category: 'characters' },
      prompt: { reviewCriteria: ['identity remains frozen'] },
    } as any;
    const criteria = productionReviewCriteria(entry);
    const completeEvidence = criteria.map((criterion, index) => ({
      criterion,
      note: `Manual inspection ${index + 1}`,
      evidence: `asset://portrait/crop-${index + 1}`,
    }));

    expect(() => approvalCriteriaEvidence(criteria, completeEvidence.slice(0, -1))).toThrow(/every current review criterion/u);
    expect(() => approvalCriteriaEvidence(criteria, completeEvidence.map((item, index) => (
      index === 0 ? { ...item, note: ' ' } : item
    )))).toThrow(/incomplete/u);
    expect(() => approvalCriteriaEvidence(criteria, completeEvidence.map((item, index) => (
      index === 1 ? { ...item, evidence: '' } : item
    )))).toThrow(/incomplete/u);
    expect(approvalCriteriaEvidence(criteria, completeEvidence)).toEqual(completeEvidence);
  });

  it('rejects an approve command before review when criterion evidence is absent', async () => {
    await expect(runFile(process.execPath, [
      'scripts/review-visual-images.mjs', '--approve', '--ids', 'visual.image.portrait.albina.normal',
      '--reviewer', 'strict-visual-qa',
    ])).rejects.toMatchObject({ stderr: expect.stringContaining('--criteria-evidence requires a value') });
  });

  it('requires a fresh, explicit authorization before an ambiguous paid request can be resubmitted', () => {
    const jobId = 'visual.image.portrait.albina.normal';
    const sourceJobHash = 'a'.repeat(64);
    const previousRequestKey = 'b'.repeat(64);
    const authorizationOptions = {
      id: jobId,
      operator: 'release-operator',
      reason: 'WisArt connectivity recovered; authorize one new request after an unknown outcome.',
      expectedAttempt: 11,
      expectedRequestKey: previousRequestKey,
      expectedSourceJobHash: sourceJobHash,
      acknowledgePossibleDuplicateCharge: true,
    };
    const record = {
      jobId, status: 'ambiguous', sourceJobHash, requestKey: previousRequestKey,
      receiptAssetId: 'file.characters.albina.normal.png', activeAttempt: 11,
      attempts: [{ attempt: 11, status: 'ambiguous', startedAt: '2026-07-24T01:00:00.000Z', failedAt: '2026-07-24T01:05:00.000Z', error: 'Request submitting failed: fetch failed' }],
      error: 'Request submitting failed: fetch failed',
    };
    const entry = {
      job: {
        id: jobId, receiptAssetId: record.receiptAssetId, provider: 'wisart-openai-compatible', model: 'gpt-image-2',
        generationSize: '1024x1536', delivery: { format: 'png', width: 1024, height: 1536, alpha: true },
      },
      prompt: { mode: 'reference-edit' },
      finalPrompt: 'Keep Albina identity invariant and do not add text.',
    };
    const references = [{ jobId: 'canon.visual.albina.unarmored-standing', sha256: 'c'.repeat(64) }];

    expect(() => validateAmbiguousRetryOptions({ ...authorizationOptions, reason: ' ' })).toThrow(/reason/u);
    expect(() => validateAmbiguousRetryOptions({ ...authorizationOptions, acknowledgePossibleDuplicateCharge: false })).toThrow(/acknowledge/u);

    const authorization = createAmbiguousRetryAuthorization(entry, record, sourceJobHash, references, authorizationOptions, {
      authorizedAt: '2026-07-24T02:00:00.000Z', authorizationId: 'retry-11-to-12-test', requestKey: 'd'.repeat(64),
    });
    expect(validateAmbiguousRetryAuthorization(authorization)).toEqual(authorization);
    expect(authorization).toMatchObject({
      provider: 'wisart-openai-compatible', baseUrl: 'https://wisart.kuaileshifu.com/v1', model: 'gpt-image-2',
      endpoint: '/images/edits', responseFormat: 'b64_json', supersededAttempt: 11, supersededRequestKey: previousRequestKey,
      authorizedNextAttempt: 12, authorizedNewRequestKey: 'd'.repeat(64), acknowledgedPossibleDuplicateCharge: true,
    });
    expect(() => validateAmbiguousRetryAuthorization({ ...authorization, model: 'other-model' })).toThrow(/authorization/u);
    const retryRecord = {
      jobId, status: 'running', sourceJobHash, requestKey: authorization.authorizedNewRequestKey,
      receiptAssetId: record.receiptAssetId, activeAttempt: 12,
      attempts: [...record.attempts, { attempt: 12, status: 'running' }],
      history: [{ ...record, archivedAt: '2026-07-24T02:00:00.000Z' }],
      resubmission: {
        version: 1, authorizationId: authorization.authorizationId,
        authorizationPath: `staging/media/visual-v2/${jobId}/ambiguous-retry-authorization-11-to-12-${authorization.authorizationId}.json`,
        authorizationSha256: authorization.authorizationSha256, supersededAttempt: 11,
        supersededRequestKey: previousRequestKey, supersededSourceJobHash: sourceJobHash,
        acknowledgedPossibleDuplicateCharge: true, authorizedNewRequestKey: authorization.authorizedNewRequestKey,
        finalPromptSha256: authorization.finalPromptSha256, referenceInputs: authorization.referenceInputs,
      },
    };
    expect(validateAmbiguousRetryLink(jobId, retryRecord, authorization)).toEqual(authorization);
    expect(() => validateAmbiguousRetryLink(jobId, retryRecord, {
      ...authorization, authorizedNewRequestKey: 'e'.repeat(64),
    })).toThrow(/authorization|duplicate paid request/u);
  });

  it('authorizes an exact migration from an ambiguous old contract to the current ordered two-image contract', () => {
    const jobId = 'visual.image.portrait.albina.normal';
    const supersededSourceJobHash = 'a'.repeat(64);
    const currentContractSha256 = 'd'.repeat(64);
    const supersededRequestKey = 'b'.repeat(64);
    const authorizedNewRequestKey = 'e'.repeat(64);
    const finalPrompt = 'Keep Albina identity invariant and apply the deidentified style board without text.';
    const finalPromptSha256 = '02689fb99cc39364e51e8f9194046f6b3fac9da0a2c207a2cd30d07f12f94092';
    const referenceInputs = [
      { jobId: 'canon.visual.albina.unarmored-standing', sha256: 'c'.repeat(64) },
      { jobId: 'reference.user.albina-style-board', sha256: 'f'.repeat(64) },
    ];
    const previous = {
      jobId, status: 'ambiguous', sourceJobHash: supersededSourceJobHash, requestKey: supersededRequestKey,
      receiptAssetId: 'file.characters.albina.normal.png', activeAttempt: 11,
      attempts: [{ attempt: 11, status: 'ambiguous' }],
    };
    const entry = {
      job: {
        id: jobId, receiptAssetId: previous.receiptAssetId, provider: 'wisart-openai-compatible', model: 'gpt-image-2',
        generationSize: '1024x1536', delivery: { format: 'png', width: 1024, height: 1536, alpha: true },
      },
      prompt: { mode: 'reference-edit' },
      finalPrompt,
    };
    const options = {
      id: jobId,
      operator: 'release-operator',
      reason: 'Authorize attempt 12 against the reviewed two-image contract.',
      expectedAttempt: 11,
      expectedRequestKey: supersededRequestKey,
      expectedSourceJobHash: supersededSourceJobHash,
      expectedCurrentContractSha256: currentContractSha256,
      expectedFinalPromptSha256: finalPromptSha256,
      expectedReferenceInputs: referenceInputs,
      acknowledgePossibleDuplicateCharge: true,
    };

    const authorization = createAmbiguousRetryAuthorization(
      entry, previous, currentContractSha256, referenceInputs, options,
      { authorizedAt: '2026-07-27T00:00:00.000Z', authorizationId: 'retry-11-to-12-cross-contract', requestKey: authorizedNewRequestKey },
    );
    const retryRecord = {
      jobId, status: 'running', sourceJobHash: currentContractSha256, requestKey: authorizedNewRequestKey,
      receiptAssetId: previous.receiptAssetId, activeAttempt: 12,
      attempts: [...previous.attempts, { attempt: 12, status: 'running' }],
      history: [{ ...previous, archivedAt: '2026-07-27T00:00:00.000Z' }],
      resubmission: {
        version: 1,
        authorizationId: authorization.authorizationId,
        authorizationPath: `staging/media/visual-v2/${jobId}/ambiguous-retry-authorization-11-to-12-${authorization.authorizationId}.json`,
        authorizationSha256: authorization.authorizationSha256,
        supersededAttempt: 11,
        supersededRequestKey,
        supersededSourceJobHash,
        currentContractSha256,
        acknowledgedPossibleDuplicateCharge: true,
        authorizedNewRequestKey,
        finalPromptSha256,
        referenceInputs,
      },
    };

    expect(validateAmbiguousRetryAuthorization(authorization)).toEqual(authorization);
    expect(validateAmbiguousRetryLink(jobId, retryRecord, authorization)).toEqual(authorization);
    expect(validateLedger({
      version: 2, projectId: 'albina-galgame-card', provider: 'wisart-openai-compatible', model: 'gpt-image-2',
      jobs: { [jobId]: retryRecord },
    })).toBeTruthy();
    expect(retryRecord.history[0]).toMatchObject({
      activeAttempt: 11,
      sourceJobHash: supersededSourceJobHash,
      requestKey: supersededRequestKey,
    });
    expect(() => createAmbiguousRetryAuthorization(
      entry, previous, currentContractSha256, referenceInputs, {
        ...options, expectedReferenceInputs: [...referenceInputs].reverse(),
      },
      { authorizedAt: '2026-07-27T00:00:00.000Z', authorizationId: 'retry-11-to-12-reordered', requestKey: authorizedNewRequestKey },
    )).toThrow(/current contract/u);
    expect(() => createAmbiguousRetryAuthorization(
      entry, previous, currentContractSha256, referenceInputs, {
        ...options,
        expectedReferenceInputs: [referenceInputs[0]!, { ...referenceInputs[1]!, sha256: '9'.repeat(64) }],
      },
      { authorizedAt: '2026-07-27T00:00:00.000Z', authorizationId: 'retry-11-to-12-reference-hash', requestKey: authorizedNewRequestKey },
    )).toThrow(/current contract/u);
    expect(() => createAmbiguousRetryAuthorization(
      entry, previous, currentContractSha256, referenceInputs, {
        ...options, expectedCurrentContractSha256: '8'.repeat(64),
      },
      { authorizedAt: '2026-07-27T00:00:00.000Z', authorizationId: 'retry-11-to-12-contract-hash', requestKey: authorizedNewRequestKey },
    )).toThrow(/current contract/u);
    expect(() => createAmbiguousRetryAuthorization(
      entry, previous, currentContractSha256, referenceInputs, {
        ...options, expectedFinalPromptSha256: '7'.repeat(64),
      },
      { authorizedAt: '2026-07-27T00:00:00.000Z', authorizationId: 'retry-11-to-12-prompt-hash', requestKey: authorizedNewRequestKey },
    )).toThrow(/current contract/u);
    expect(() => validateAmbiguousRetryLink(jobId, {
      ...retryRecord,
      requestKey: '6'.repeat(64),
      resubmission: { ...retryRecord.resubmission, authorizedNewRequestKey: '6'.repeat(64) },
    }, authorization)).toThrow(/duplicate paid request/u);
    expect(() => validateAmbiguousRetryLink(jobId, {
      ...retryRecord,
      sourceJobHash: '5'.repeat(64),
      resubmission: { ...retryRecord.resubmission, currentContractSha256: '5'.repeat(64) },
    }, authorization)).toThrow(/duplicate paid request/u);
    expect(() => validateAmbiguousRetryLink(jobId, {
      ...retryRecord,
      resubmission: { ...retryRecord.resubmission, finalPromptSha256: '4'.repeat(64) },
    }, authorization)).toThrow(/duplicate paid request/u);
    expect(() => validateAmbiguousRetryLink(jobId, {
      ...retryRecord,
      resubmission: { ...retryRecord.resubmission, referenceInputs: [...referenceInputs].reverse() },
    }, authorization)).toThrow(/duplicate paid request/u);
  });

  it('fails closed on legacy url-format ambiguous retry authorizations and invalid execution options', async () => {
    const legacy: Record<string, unknown> = {
      version: 1, authorizationId: 'retry-1-to-2-legacy', authorizedAt: '2026-09-01T00:00:00.000Z',
      operator: 'release-operator', reason: 'legacy artifact', jobId: 'visual.image.bg.mirror_corridor',
      provider: 'wisart-openai-compatible', baseUrl: 'https://wisart.kuaileshifu.com/v1', model: 'gpt-image-2',
      endpoint: '/images/edits', responseFormat: 'url', supersededAttempt: 1, supersededRequestKey: 'b'.repeat(64),
      supersededSourceJobHash: 'a'.repeat(64), currentContractSha256: 'a'.repeat(64),
      finalPromptSha256: 'c'.repeat(64), referenceInputs: [],
      authorizedNextAttempt: 2, authorizedNewRequestKey: 'd'.repeat(64), acknowledgedPossibleDuplicateCharge: true,
    };
    legacy.authorizationSha256 = createHash('sha256').update(JSON.stringify(
      Object.fromEntries(Object.entries(legacy).filter(([key]) => key !== 'authorizationSha256')),
    )).digest('hex');
    expect(() => validateAmbiguousRetryAuthorization(legacy)).toThrow(/Invalid ambiguous retry authorization/u);

    const validOptions = {
      id: 'visual.image.bg.mirror_corridor',
      operator: 'workbuddy-agent',
      reason: 'authorize attempt 3 after provider gateway recovered',
      expectedAttempt: 2,
      expectedRequestKey: 'b'.repeat(64),
      expectedSourceJobHash: 'a'.repeat(64),
      acknowledgePossibleDuplicateCharge: true,
    };
    await expect(executeAmbiguousRetry({ ...validOptions, planVariant: 'bogus' as unknown as 'frozen' })).rejects.toThrow(/Unsupported plan variant/u);
    // 缺少可用 key 必须在取锁与读 ledger 之前 fail-closed，绝不留下半截付费历史
    await expect(executeAmbiguousRetry({ ...validOptions, planVariant: 'migration' }, {})).rejects.toThrow(/API key is required for the authorized retry/u);
    await expect(executeAmbiguousRetry({ ...validOptions, planVariant: 'migration', id: 'visual.image.bg.does_not_exist' }, {})).rejects.toThrow(/Unknown image jobs/u);
  });

  it('treats an interrupted running record without response evidence as an uncertain paid outcome', () => {
    const jobId = 'visual.image.cg.art_resonance';
    const entry = {
      job: {
        id: jobId, receiptAssetId: 'cg.art_resonance', provider: 'latent-moe', model: 'latent-moe-async',
        generationSize: 'landscape', delivery: { format: 'jpg', width: 1280, height: 720, alpha: false },
      },
      prompt: { mode: 'text-generation' },
      finalPrompt: 'latent self-contained prompt',
    };
    const options = {
      id: jobId,
      operator: 'workbuddy-agent',
      reason: 'Produce process was killed mid-request; outcome uncertain',
      expectedAttempt: 4,
      expectedRequestKey: 'b'.repeat(64),
      expectedSourceJobHash: 'a'.repeat(64),
      acknowledgePossibleDuplicateCharge: true,
    };
    const interrupted = {
      jobId, status: 'running', sourceJobHash: 'a'.repeat(64), requestKey: 'b'.repeat(64),
      receiptAssetId: 'cg.art_resonance', activeAttempt: 4,
      attempts: [{ attempt: 4, status: 'running' }],
    };
    // 无响应证据的 running：授权链必须接受（与 ambiguous 同语义）
    const authorization = createAmbiguousRetryAuthorization(
      entry, interrupted, 'd'.repeat(64), [], options,
      { authorizedAt: '2026-09-03T00:00:00.000Z', authorizationId: 'retry-4-to-5-interrupted', requestKey: 'c'.repeat(64) },
    );
    expect(authorization.supersededAttempt).toBe(4);
    // 已拿到响应证据的 running：结果确定，绝不走重试授权
    expect(() => createAmbiguousRetryAuthorization(
      entry, { ...interrupted, responseSha256: 'f'.repeat(64) }, 'd'.repeat(64), [], options,
      { authorizedAt: '2026-09-03T00:00:00.000Z', authorizationId: 'retry-4-to-5-responded', requestKey: 'c'.repeat(64) },
    )).toThrow(/superseded paid request/u);
  });

  it('rejects ledger provenance when an ambiguous retry does not match its archived paid request', () => {
    const jobId = 'visual.image.portrait.albina.normal';
    const sourceJobHash = 'a'.repeat(64);
    const original = {
      jobId, status: 'ambiguous', sourceJobHash, requestKey: 'b'.repeat(64),
      receiptAssetId: 'file.characters.albina.normal.png', activeAttempt: 11,
      attempts: [{ attempt: 11, status: 'ambiguous' }],
    };
    const resubmitted = {
      jobId, status: 'running', sourceJobHash, requestKey: 'c'.repeat(64),
      receiptAssetId: original.receiptAssetId, activeAttempt: 12,
      attempts: [...original.attempts, { attempt: 12, status: 'running' }],
      history: [{ ...original, archivedAt: '2026-07-24T02:00:00.000Z' }],
      resubmission: {
        version: 1, authorizationId: 'retry-11-to-12-test',
        authorizationPath: 'staging/media/visual-v2/visual.image.portrait.albina.normal/ambiguous-retry-authorization-11-to-12-retry-11-to-12-test.json',
        authorizationSha256: 'd'.repeat(64),
        supersededAttempt: 11, supersededRequestKey: original.requestKey, supersededSourceJobHash: sourceJobHash,
        acknowledgedPossibleDuplicateCharge: true, authorizedNewRequestKey: 'c'.repeat(64),
        finalPromptSha256: 'e'.repeat(64), referenceInputs: [{ jobId: 'canon.visual.albina.unarmored-standing', sha256: 'f'.repeat(64) }],
      },
    };
    const ledger = {
      version: 2, projectId: 'albina-galgame-card', provider: 'wisart-openai-compatible', model: 'gpt-image-2',
      jobs: { [jobId]: resubmitted },
    };
    expect(validateLedger(ledger)).toEqual(ledger);
    expect(() => validateLedger({ ...ledger, jobs: { [jobId]: {
      ...resubmitted, resubmission: { ...resubmitted.resubmission, supersededRequestKey: 'e'.repeat(64) },
    } } })).toThrow(/duplicate paid request/u);
  });

  it('serializes reference edits with WisArt repeated image fields, preserving reference order', async () => {
    const request = await editRequest({
      finalPrompt: 'Preserve the official character identity.',
      job: { generationSize: '1024x1536' },
    }, [
      { jobId: 'canon.visual.albina.unarmored-standing', path: 'canon.png', bytes: Buffer.from('canon') },
      { jobId: 'canon.visual.albina.armored-standing', path: 'armor.jpeg', bytes: Buffer.from('armor') },
    ]);
    const fields = [...request.body.entries()];
    expect(fields.filter(([key]) => key === 'image')).toHaveLength(2);
    expect(fields.some(([key]) => key === 'image[]')).toBe(false);
    expect(fields.some(([key]) => key === 'input_fidelity')).toBe(false);
    expect(fields.some(([key]) => key === 'mask')).toBe(false);
    expect(fields.find(([key]) => key === 'model')?.[1]).toBe('gpt-image-2');
    expect(fields.find(([key]) => key === 'prompt')?.[1]).toBe('Preserve the official character identity.');
    expect(fields.find(([key]) => key === 'size')?.[1]).toBe('1024x1536');
    expect(fields.some(([key]) => key === 'quality')).toBe(false);
    expect(fields.find(([key]) => key === 'n')?.[1]).toBe('1');
    expect(fields.find(([key]) => key === 'response_format')?.[1]).toBe('b64_json');
    expect(fields.filter(([key]) => key === 'image').map(([, value]) => (value as File).name)).toEqual([
      'canon.visual.albina.unarmored-standing.png',
      'canon.visual.albina.armored-standing.jpg',
    ]);
    expect((fields.filter(([key]) => key === 'image')[1]?.[1] as File).type).toBe('image/jpeg');
  });

  it('rejects edit requests outside WisArt\'s documented one-to-sixteen input range', async () => {
    const entry = { finalPrompt: 'Keep the target identity unchanged.', job: { generationSize: '1024x1536' } };
    await expect(editRequest(entry, [])).rejects.toThrow(/between 1 and 16/u);
    await expect(editRequest(entry, Array.from({ length: 17 }, (_, index) => ({
      jobId: `reference-${index}`, path: 'reference.png', bytes: Buffer.from('reference'),
    })))).rejects.toThrow(/between 1 and 16/u);
  });

  it('keeps identity and scene sources before the final anonymous style board', () => {
    expect(orderedReferenceSourceIds({
      referenceSourceIds: [
        'canon.visual.albina.unarmored-standing',
        'canon.visual.albina.armored-standing',
        'reference.user.albina-style-board',
      ],
      styleReferenceMode: 'deidentified-image-last',
    } as any)).toEqual([
      'canon.visual.albina.unarmored-standing',
      'canon.visual.albina.armored-standing',
      'reference.user.albina-style-board',
    ]);
  });

  it('requires the explicit anonymous-board mode and its final source position', () => {
    expect(() => orderedReferenceSourceIds({
      jobId: 'visual.image.portrait.albina.normal',
      referenceSourceIds: ['canon.visual.albina.unarmored-standing'],
      styleReferenceMode: 'deidentified-image-last',
    } as any)).toThrow(/final source input/u);
    expect(() => orderedReferenceSourceIds({
      jobId: 'visual.image.bg.backstreets_rain',
      referenceSourceIds: ['reference.user.albina-style-board'],
      styleReferenceMode: 'text-only',
    } as any)).toThrow(/anonymized image board/u);
  });

  it('accepts only the approved style board among user-provided image inputs', () => {
    expect(orderedReferenceSourceIds({
      jobId: 'visual.image.portrait.protagonist.serious',
      referenceSourceIds: ['reference.user.albina-style-board'],
      styleReferenceMode: 'deidentified-image-last',
    } as any)).toEqual(['reference.user.albina-style-board']);
    expect(() => orderedReferenceSourceIds({
      jobId: 'visual.image.bg.backstreets_rain',
      referenceSourceIds: ['reference.user.albina-style-board', 'reference.user.unapproved-style-reference'],
      styleReferenceMode: 'deidentified-image-last',
    } as any)).toThrow(/final source input|User-provided visual reference/u);
  });

  it('rejects the raw baseline and every other user-provided visual reference', () => {
    expect(() => orderedReferenceSourceIds({
      referenceSourceIds: ['reference.user.albina-style-baseline', 'reference.user.albina-style-board'],
      styleReferenceMode: 'deidentified-image-last',
    } as any)).toThrow(/User-provided visual reference is forbidden/u);
    expect(() => orderedReferenceSourceIds({
      referenceSourceIds: ['reference.user.unapproved-style-reference', 'reference.user.albina-style-board'],
      styleReferenceMode: 'deidentified-image-last',
    } as any)).toThrow(/User-provided visual reference is forbidden/u);
  });

  it('orders resolved inputs as canon sources then approved parent jobs then the style board', () => {
    const canonInput = {
      jobId: 'canon.visual.albina.unarmored-standing',
      sourceId: 'canon.visual.albina.unarmored-standing',
      path: 'canon.png',
      bytes: Buffer.from('canon'),
      sha256: 'a'.repeat(64),
    };
    const parentInput = {
      jobId: 'visual.image.portrait.albina.normal',
      receiptAssetId: 'file.characters.albina.normal.png',
      path: 'parent.png',
      bytes: Buffer.from('parent'),
      sha256: 'c'.repeat(64),
    };
    const styleInput = {
      jobId: 'reference.user.albina-style-board',
      sourceId: 'reference.user.albina-style-board',
      path: 'style.png',
      bytes: Buffer.from('style'),
      sha256: 'f'.repeat(64),
    };

    expect(orderResolvedReferenceInputs([canonInput, styleInput], [parentInput])).toEqual([
      canonInput,
      parentInput,
      styleInput,
    ]);
    expect(orderResolvedReferenceInputs([], [])).toEqual([]);
  });

  it('serializes the Albina identity image first and the style-only board second', async () => {
    const request = await editRequest({
      finalPrompt: 'Image 1 controls identity. Image 2 supplies style only.',
      job: { generationSize: '1024x1536' },
    }, [
      { jobId: 'canon.visual.albina.unarmored-standing', path: 'canon.png', bytes: Buffer.from('canon') },
      { jobId: 'reference.user.albina-style-board', path: 'style.png', bytes: Buffer.from('style') },
    ]);
    const imageFields = [...request.body.entries()].filter(([key]) => key === 'image');

    expect(imageFields).toHaveLength(2);
    expect(imageFields.map(([, value]) => (value as File).name)).toEqual([
      'canon.visual.albina.unarmored-standing.png',
      'reference.user.albina-style-board.png',
    ]);
  });

  it('adopts a stale artifact under a stricter review contract without rewriting generation history', () => {
    const generationJobHash = 'a'.repeat(64);
    const currentJobHash = 'b'.repeat(64);
    const artifactSha256 = 'c'.repeat(64);
    const criteria = ['identity is unchanged', 'hands and feet pass strict anatomy review'];
    const criteriaEvidence = criteria.map((criterion, index) => ({
      criterion, note: `Manual inspection ${index + 1}`, evidence: `asset://review/crop-${index + 1}`,
    }));
    const record = {
      jobId: 'visual.image.portrait.albina.normal', status: 'awaiting-review', generationEvidence: 'preserved',
      sourceJobHash: generationJobHash, artifactSha256, requestKey: 'd'.repeat(64),
    };
    expect(() => adoptVisualReviewContractRecord(record, currentJobHash, criteria, {
      decision: 'approved', reviewer: 'strict-visual-qa', reason: 'Review contract gained anatomy requirements.',
      notes: 'Existing artifact was inspected again against every current criterion.',
    }, '2026-07-21T16:00:00.000Z')).toThrow(/every current review criterion/u);
    const adopted = adoptVisualReviewContractRecord(record, currentJobHash, criteria, {
      decision: 'approved',
      reviewer: 'strict-visual-qa', reason: 'Review contract gained anatomy requirements.',
      notes: 'Existing artifact was inspected again against every current criterion.',
      criteriaEvidence,
    }, '2026-07-21T16:00:00.000Z');

    expect(adopted.sourceJobHash).toBe(generationJobHash);
    expect(adopted.generationEvidence).toBe('preserved');
    expect(adopted.reviewContractRevision).toMatchObject({
      version: 1, status: 'approved', generationJobHash, currentJobHash, artifactSha256,
      reviewer: 'strict-visual-qa', reason: 'Review contract gained anatomy requirements.',
      notes: 'Existing artifact was inspected again against every current criterion.',
      generationHistoryPreserved: true,
    });
    expect(currentVisualContractReview(adopted, currentJobHash, criteria)?.kind).toBe('revision');
    expect(currentVisualContractReview({ ...adopted, artifactSha256: 'e'.repeat(64) }, currentJobHash, criteria)).toBeUndefined();
    expect(currentVisualContractReview(adopted, 'f'.repeat(64), criteria)).toBeUndefined();
    expect(currentVisualContractReview({
      ...adopted,
      reviewContractRevision: { ...adopted.reviewContractRevision, status: 'rejected' },
    }, currentJobHash, criteria)).toBeUndefined();
    expect(currentVisualContractReview({
      ...adopted,
      reviewContractRevision: { ...adopted.reviewContractRevision, criteria: adopted.reviewContractRevision.criteria.slice(0, 1) },
    }, currentJobHash, criteria)).toBeUndefined();
  });

  it('keeps ordinary stale contracts fail closed without an exact revision', () => {
    const record = {
      sourceJobHash: 'a'.repeat(64), artifactSha256: 'b'.repeat(64),
      review: {
        status: 'approved', reviewer: 'legacy-qa', reviewedAt: '2026-07-20T00:00:00.000Z',
        criteria: [{ criterion: 'legacy criterion', status: 'passed' }],
      },
    };
    expect(currentVisualContractReview(record, 'c'.repeat(64), ['legacy criterion', 'new strict criterion'])).toBeUndefined();
    expect(currentVisualContractReview({ ...record, sourceJobHash: 'c'.repeat(64) }, 'c'.repeat(64), [
      'legacy criterion', 'new strict criterion',
    ])).toBeUndefined();
  });

  it('requires evidence on each passed criterion before a review can cover the current contract', () => {
    const criteria = ['identity', 'anatomy'];
    const record = {
      sourceJobHash: 'a'.repeat(64),
      review: {
        status: 'approved', reviewer: 'strict-qa', reviewedAt: '2026-07-21T00:00:00.000Z',
        criteria: criteria.map((criterion) => ({ criterion, status: 'passed' })),
      },
    };
    expect(currentVisualContractReview(record, 'a'.repeat(64), criteria)).toBeUndefined();
    const evidence = approvalCriteriaEvidence(criteria, criteria.map((criterion, index) => ({
      criterion, note: `Manual check ${index + 1}`, evidence: `asset://review/${index + 1}`,
    })));
    expect(currentVisualContractReview({
      ...record,
      review: { ...record.review, criteria: evidence.map(({ criterion, note, evidence: itemEvidence }) => ({
        criterion, status: 'passed', note, evidence: itemEvidence,
      })) },
    }, 'a'.repeat(64), criteria)?.kind).toBe('generation');
  });

  it('reads PNG dimensions and alpha capability without trusting extensions', () => {
    expect(inspectPng(png(1024, 1536))).toEqual({ width: 1024, height: 1536, colorType: 6, alphaCapable: true });
    expect(inspectPng(png(1536, 1024, 2)).alphaCapable).toBe(false);
    expect(() => inspectPng(Buffer.from('not-an-image'))).toThrow(/valid PNG/iu);
  });

  it('selects and dependency-orders all fixed generation and edit pilots', () => {
    const base = {
      receiptAssetId: 'file.test', category: 'characters' as const, provider: 'wisart-openai-compatible' as const,
      model: 'gpt-image-2' as const, generationSize: '1024x1536' as const,
      delivery: { format: 'png' as const, width: 1024, height: 1536, alpha: true },
      identitySubjects: [], identityBootstrap: null,
    };
    const jobs = [
      { ...base, id: 'visual.image.portrait.albina.normal' },
      { ...base, id: 'visual.image.portrait.protagonist.serious' },
      { ...base, id: 'visual.image.portrait.albina.armored' },
      { ...base, id: 'visual.image.bg.city_rooftop', category: 'bg' as const },
      { ...base, id: 'visual.image.cg.opening_rain', category: 'cg' as const },
    ];
    const references = new Map([
      ['visual.image.portrait.albina.armored', ['visual.image.portrait.albina.normal']],
      ['visual.image.cg.opening_rain', ['visual.image.portrait.albina.normal', 'visual.image.portrait.protagonist.serious']],
    ]);
    const prompts = { prompts: jobs.map((job) => {
      const referenceJobIds = references.get(job.id) ?? [];
      return {
        jobId: job.id, mode: 'reference-edit' as const, referenceJobIds,
        referenceSourceIds: ['reference.user.albina-style-board'], styleReferenceMode: 'deidentified-image-last' as const,
        identitySubjects: [], identityBootstrap: null, positivePrompt: 'test prompt', negativePrompt: '',
      };
    }) };
    const selected = selectImageJobs({ imageJobs: jobs }, prompts, { mode: 'pilot' });
    expect(selected).toHaveLength(5);
    expect(selectImageJobs({ imageJobs: jobs }, prompts, {
      mode: 'pilot', ids: ['visual.image.portrait.albina.normal'],
    }).map(({ job }) => job.id)).toEqual(['visual.image.portrait.albina.normal']);
    expect(selected.findIndex(({ job }) => job.id === 'visual.image.portrait.albina.normal'))
      .toBeLessThan(selected.findIndex(({ job }) => job.id === 'visual.image.portrait.albina.armored'));
    expect(selected.findIndex(({ job }) => job.id === 'visual.image.portrait.protagonist.serious'))
      .toBeLessThan(selected.findIndex(({ job }) => job.id === 'visual.image.cg.opening_rain'));
    expect(() => selectImageJobs({ imageJobs: jobs }, prompts, { ids: ['unknown'] })).toThrow(/unknown image jobs/iu);
  });

  it('loads a production authorization bound to both canon claims and visual sources', async () => {
    const inputs = await loadProductionInputs();
    expect((inputs as any).canonClaims.version).toBe(1);
    const entries = selectImageJobs((inputs as any).plan, (inputs as any).prompts, { mode: 'all' });
    expect(entries).toHaveLength(67);
    expect(entries.every(({ finalPrompt }) => finalPrompt.includes('House style: dense precise 2D anime linework'))).toBe(true);
    const edits = entries.filter(({ prompt }) => prompt?.mode === 'reference-edit');
    const generated = entries.filter(({ prompt }) => prompt?.mode === 'text-generation');
    expect(edits).toHaveLength(67);
    expect(generated).toHaveLength(0);
    expect(edits.every(({ finalPrompt }) => finalPrompt.includes('Input-image contract:')
      && finalPrompt.includes('anonymized style board'))).toBe(true);
    const recapJobs = (inputs as any).plan.imageJobs.filter((job: any) => job.id.startsWith('visual.image.cg.canon_recap_'));
    expect(recapJobs).toHaveLength(6);
    expect(recapJobs.every((job: any) => job.canonClaimIds.length > 0)).toBe(true);
  });

  it('keeps an Albina portrait edit scoped to Albina rather than the complete character bible', async () => {
    const inputs = await loadProductionInputs();
    const portrait = selectImageJobs((inputs as any).plan, (inputs as any).prompts, {
      ids: ['visual.image.portrait.albina.normal'],
    })[0];

    if (!portrait) throw new Error('Albina normal portrait prompt is missing');
    expect(portrait.finalPrompt).toContain('"albina"');
    expect(portrait.finalPrompt).not.toContain('"protagonist"');
    expect(portrait.finalPrompt).not.toContain('"ring_agent"');
  });

  it('adds the anatomy and Live2D quality contract to every non-background final prompt', async () => {
    const inputs = await loadProductionInputs();
    const entries = selectImageJobs((inputs as any).plan, (inputs as any).prompts, { mode: 'all' });
    const anatomyTerms = ['每只五根手指', '半透明指甲', '五趾清晰分离', 'Live2D', '不得改变任何其他部位'];
    const illustrated = entries.filter(({ job }) => job.category !== 'bg');
    const backgrounds = entries.filter(({ job }) => job.category === 'bg');
    expect(illustrated.length).toBeGreaterThan(0);
    expect(backgrounds.length).toBeGreaterThan(0);
    for (const entry of illustrated) {
      for (const term of anatomyTerms) expect(entry.finalPrompt, `${entry.job.id}: ${term}`).toContain(term);
    }
    for (const entry of backgrounds) {
      for (const term of anatomyTerms) expect(entry.finalPrompt, `${entry.job.id}: ${term}`).not.toContain(term);
    }
  });

  it('requires every anatomy and Live2D concern as an independently passed review criterion', async () => {
    const inputs = await loadProductionInputs();
    const entries = selectImageJobs((inputs as any).plan, (inputs as any).prompts, { mode: 'all' });
    const portrait = entries.find(({ job }) => job.category === 'characters')!;
    const criteria = productionReviewCriteria(portrait as any);
    expect(criteria.some((criterion) => criterion.includes('中指最长') && criterion.includes('三段结构'))).toBe(true);
    expect(criteria.some((criterion) => criterion.includes('自然分离不粘连') && criterion.includes('甲床'))).toBe(true);
    expect(criteria.some((criterion) => criterion.includes('五趾清晰分离') && criterion.includes('大脚趾内侧'))).toBe(true);
    expect(criteria.some((criterion) => criterion.includes('机械手') && criterion.includes('鞋靴') && criterion.includes('承重'))).toBe(true);
    expect(criteria.some((criterion) => criterion.includes('Live2D') && criterion.includes('无漂移'))).toBe(true);
  });

  it('atomically replaces an existing ledger file on Windows', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-visual-ledger-'));
    const path = join(directory, 'ledger.json');
    await atomicWrite(path, Buffer.from('first'));
    await atomicWrite(path, Buffer.from('second'));
    expect(await readFile(path, 'utf8')).toBe('second');
  });

  it('fails closed instead of forgetting an invalid paid-request ledger', () => {
    const valid = {
      version: 2, projectId: 'albina-galgame-card', provider: 'wisart-openai-compatible',
      model: 'gpt-image-2', jobs: {},
    };
    expect(validateLedger(valid)).toEqual(valid);
    expect(() => validateLedger({ version: 1, jobs: {} })).toThrow(/refusing to forget paid request history/iu);
    expect(() => validateLedger({ ...valid, jobs: [] })).toThrow(/refusing to forget paid request history/iu);
    expect(() => validateLedger({ ...valid, provider: 'pie' })).toThrow(/refusing to forget paid request history/iu);
    const invalidJob = {
      jobId: 'visual.image.test', status: 'unknown', sourceJobHash: 'a'.repeat(64), requestKey: 'b'.repeat(64),
      receiptAssetId: 'cg.test', activeAttempt: 1, attempts: [{ attempt: 1, status: 'running' }],
    };
    expect(() => validateLedger({ ...valid, jobs: { [invalidJob.jobId]: invalidJob } })).toThrow(/duplicate paid request/iu);
    expect(() => validateLedger({ ...valid, jobs: { 'visual.image.test': { ...invalidJob, status: 'running', attempts: [] } } })).toThrow(/duplicate paid request/iu);
    expect(() => validateLedger({ ...valid, jobs: { 'visual.image.test': { ...invalidJob, status: 'running', sourceJobHash: 'bad' } } })).toThrow(/duplicate paid request/iu);

    const criteria = ['identity', 'strict anatomy'];
    const adoptedJob = {
      jobId: 'visual.image.test', status: 'completed', sourceJobHash: 'a'.repeat(64), requestKey: 'b'.repeat(64),
      receiptAssetId: 'cg.test', activeAttempt: 1, attempts: [{ attempt: 1, status: 'completed' }],
      responseSha256: 'c'.repeat(64), rawResponsePath: 'response', artifactSha256: 'd'.repeat(64), deliveryPath: 'delivery',
      reviewContractRevisionPath: 'staging/media/visual-v2/visual.image.test/review-contract-01-eeeeeeeeeeee.json',
      reviewContractRevision: {
        version: 1, status: 'approved', generationHistoryPreserved: true,
        generationJobHash: 'a'.repeat(64), currentJobHash: 'e'.repeat(64), artifactSha256: 'd'.repeat(64),
        reviewer: 'strict-qa', reviewedAt: '2026-07-21T16:00:00.000Z', reason: 'Contract changed.', notes: 'Re-reviewed.',
        criteria: criteria.map((criterion, index) => ({
          criterion, status: 'passed', note: `Manual check ${index + 1}`, evidence: `asset://review/${index + 1}`,
        })),
      },
    };
    expect(validateLedger({ ...valid, jobs: { [adoptedJob.jobId]: adoptedJob } })).toBeTruthy();
  });

  it('treats an explicit model routing rejection as a definitive failed request', () => {
    expect(isAmbiguousProviderResponse(503, {
      error: { code: 'model_not_found', type: 'new_api_error' },
    })).toBe(false);
    expect(isAmbiguousProviderResponse(503, {
      error: { code: 'upstream_unavailable', type: 'new_api_error' },
    })).toBe(true);
    expect(isAmbiguousProviderResponse(500, {
      error: { code: null, type: 'image_generation_error' },
    })).toBe(false);
  });

  it('resolves only a hash-bound stored definitive rejection without resubmitting', () => {
    const rawBytes = Buffer.from(JSON.stringify({ error: { code: null, type: 'image_generation_error' } }));
    const responseSha256 = createHash('sha256').update(rawBytes).digest('hex');
    const record = {
      jobId: 'visual.image.portrait.albina.normal', status: 'ambiguous', sourceJobHash: 'a'.repeat(64),
      requestKey: 'b'.repeat(64), receiptAssetId: 'file.characters.albina.normal.png', activeAttempt: 3,
      attempts: [{ attempt: 3, status: 'ambiguous' }], responseSha256,
    };
    const metadata = { status: 500, responseSha256 };
    const resolved = resolveDefinitiveFailureRecord(record, rawBytes, metadata, '2026-07-21T00:00:00.000Z');
    expect(resolved).toMatchObject({
      status: 'failed', resolution: { status: 'definitive-failure', providerErrorType: 'image_generation_error' },
      attempts: [{ attempt: 3, status: 'failed' }],
    });
    const gatewayBytes = Buffer.from('<html><h1>502 Bad Gateway</h1></html>');
    const gatewaySha256 = createHash('sha256').update(gatewayBytes).digest('hex');
    expect(() => resolveDefinitiveFailureRecord(
      { ...record, responseSha256: gatewaySha256 }, gatewayBytes,
      { status: 502, responseSha256: gatewaySha256 }, '2026-07-21T00:00:00.000Z',
    )).toThrow(/not a definitive failure/iu);
  });

  it('rejects placeholder credentials before a WisArt request can be submitted', () => {
    expect(isUsableWisartApiKey(undefined)).toBe(false);
    expect(isUsableWisartApiKey('abc')).toBe(false);
    expect(isUsableWisartApiKey('sk-placeholder')).toBe(false);
    expect(isUsableWisartApiKey(`sk-${'aB9_'.repeat(8)}`)).toBe(true);
    expect(isUsableWisartApiKey(` sk-${'a'.repeat(24)}`)).toBe(false);
  });

  it('uses the pinned WisArt credential and endpoint contract for new production requests', async () => {
    const source = await readFile('scripts/lib/visual-production.mjs', 'utf8');
    expect(source).toContain("const defaultBaseUrl = 'https://wisart.kuaileshifu.com/v1'");
    expect(source).toContain('environment.WISART_API_KEY');
    expect(source).toContain('environment.WISART_BASE_URL');
    expect(source).toContain("provider: 'wisart-openai-compatible'");
    expect(source).not.toContain('environment.X666_API_KEY;');
  });

  it('removes an opaque magenta portrait background even when the RGBA source has a stray transparent pixel', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-portrait-key-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const subject = x >= 16 && x < 48 && y >= 12 && y < 56;
      const nearMagentaDetail = x >= 24 && x < 40 && y >= 24 && y < 40;
      const rgba = nearMagentaDetail ? [224, 32, 224, 255] : subject ? [24, 180, 210, 255] : [255, 0, 255, 255];
      pixels.set(rgba, offset);
    }
    pixels[3] = 0;
    await encodeRgba(source, width, height, pixels);
    await preparePortrait(
      { delivery: { width, height } }, source, delivery,
      { width, height, alphaCapable: true }, { hasTransparency: true },
    );
    const result = await decodeRgba(delivery, width, height);
    expect(pixel(result, width, 63, 63)).toEqual([0, 0, 0, 0]);
    expect(pixel(result, width, 32, 32)[3]).toBeGreaterThan(247);
    const deliveryPixels = await inspectPixels(delivery);
    expect(deliveryPixels.transparentMagentaRatio).toBeLessThanOrEqual(0.08);
  });

  it('removes a border-connected near-white checkerboard without erasing enclosed white subject pixels', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-checkerboard-portrait-key-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const checker = (Math.floor(x / 8) + Math.floor(y / 8)) % 2 === 0;
      const subject = x >= 20 && x < 44 && y >= 12 && y < 56;
      const outlinedWhiteSubject = subject && (x === 20 || x === 43 || y === 12 || y === 55) ? [24, 24, 24, 255]
        : subject ? [255, 255, 255, 255] : checker ? [254, 254, 254, 255] : [243, 243, 243, 255];
      pixels.set(outlinedWhiteSubject, offset);
    }
    await encodeRgba(source, width, height, pixels);
    await preparePortrait(
      { delivery: { width, height } }, source, delivery,
      { width, height, alphaCapable: false }, { hasTransparency: false, nonBlank: true } as any,
    );
    const result = await decodeRgba(delivery, width, height);
    expect(pixel(result, width, 0, 0)[3]).toBeLessThan(8);
    expect(pixel(result, width, 32, 32)).toEqual([255, 255, 255, 255]);
    const deliveryPixels = await inspectPixels(delivery);
    expect(deliveryPixels.hasTransparency).toBe(true);
    expect(deliveryPixels.borderTransparencyRatio).toBeGreaterThanOrEqual(0.85);
  });

  it('samples and removes a non-standard magenta border without erasing subject colors', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-adaptive-portrait-key-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const subject = x >= 16 && x < 48 && y >= 12 && y < 56;
      pixels.set(subject ? [245, 198, 24, 255] : [237, 13, 194, 255], offset);
    }
    await encodeRgba(source, width, height, pixels);
    await preparePortrait(
      { delivery: { width, height } }, source, delivery,
      { width, height, alphaCapable: true }, { hasTransparency: false },
    );
    const result = await decodeRgba(delivery, width, height);
    expect(pixel(result, width, 63, 63)[3]).toBeLessThan(8);
    expect(pixel(result, width, 32, 32)[3]).toBeGreaterThan(247);
    const subjectRgb = pixel(result, width, 32, 32).slice(0, 3);
    expect(subjectRgb.every((channel, index) => Math.abs(channel - [245, 198, 24][index]!) <= 1)).toBe(true);
  });

  it('removes a large internal magenta gradient even when the canvas boundary is already transparent', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-internal-gradient-key-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const transparentBorder = x < 4 || x >= 60 || y < 4 || y >= 60;
      const subject = x >= 22 && x < 42 && y >= 14 && y < 54;
      const redSubjectDetail = x >= 34 && x < 40 && y >= 28 && y < 42;
      const gradient = [236 + Math.floor(x / 8), 28 + Math.floor(y / 3), 214 + Math.floor(x / 4), 255];
      pixels.set(transparentBorder ? [0, 0, 0, 0] : redSubjectDetail ? [224, 32, 48, 255]
        : subject ? [42, 166, 202, 255] : gradient, offset);
    }
    await encodeRgba(source, width, height, pixels);
    const sourceInfo = { width, height, alphaCapable: true };
    const sourcePixels = await inspectPixels(source);
    expect(sourcePixels.borderTransparencyRatio).toBeGreaterThanOrEqual(0.85);
    expect(sourcePixels.opaqueKeyRatio).toBeLessThanOrEqual(0.01);
    expect(sourcePixels.residualMagentaRatio).toBeGreaterThan(0.08);
    await preparePortrait({ delivery: { width, height } }, source, delivery, sourceInfo, sourcePixels);
    const result = await decodeRgba(delivery, width, height);
    expect(pixel(result, width, 8, 8)[3]).toBeLessThan(8);
    expect(pixel(result, width, 32, 32)[3]).toBeGreaterThan(247);
    expect(pixel(result, width, 36, 34)).toEqual([224, 32, 48, 255]);
    const deliveryPixels = await inspectPixels(delivery);
    expect(deliveryPixels.transparentMagentaRatio).toBeLessThanOrEqual(0.08);
  });

  it('hardens native-alpha sources with semi-transparent residue and insets edge-touching subjects', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-native-alpha-portrait-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      // 原生 alpha 源：背景全透明；人物柱状主体贴住底边；底部另有半透明灰底残留
      const subject = x >= 24 && x < 40 && y >= 8 && y < 64;
      const grayResidue = !subject && y >= 56 && y < 64;
      pixels.set(subject ? [42, 166, 202, 255] : grayResidue ? [205, 205, 200, 120] : [0, 0, 0, 0], offset);
    }
    await encodeRgba(source, width, height, pixels);
    const sourceInfo = { width, height, alphaCapable: true };
    const sourcePixels = await inspectPixels(source);
    expect(sourcePixels.transparentRatio).toBeGreaterThan(0);
    expect(sourcePixels.borderTransparencyRatio).toBeLessThan(0.85);
    await preparePortrait({ delivery: { width, height } }, source, delivery, sourceInfo, sourcePixels);
    const deliveryPixels = await inspectPixels(delivery);
    expect(deliveryPixels.hasTransparency).toBe(true);
    expect(deliveryPixels.borderTransparencyRatio).toBeGreaterThanOrEqual(0.85);
    expect(deliveryPixels.opaqueKeyRatio).toBeLessThanOrEqual(0.01);
    // 硬化后灰底残留必须清零；等比缩进后底边两行必须全透明（人物不再贴边）
    const result = await decodeRgba(delivery, width, height);
    expect(pixel(result, width, 4, 62)[3]).toBeLessThan(8);
    expect(pixel(result, width, 32, 34)[3]).toBeGreaterThan(200);
  });

  it('keeps a clean transparent portrait with a small red subject detail on the fast path', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-clean-red-detail-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const subject = x >= 18 && x < 46 && y >= 10 && y < 58;
      const redDetail = x >= 34 && x < 42 && y >= 30 && y < 44;
      pixels.set(redDetail ? [224, 32, 48, 255] : subject ? [238, 224, 210, 255] : [0, 0, 0, 0], offset);
    }
    await encodeRgba(source, width, height, pixels);
    const sourceBytes = await readFile(source);
    const sourcePixels = await inspectPixels(source);
    expect(sourcePixels.residualMagentaRatio).toBeLessThanOrEqual(0.08);
    expect(sourcePixels.transparentMagentaRatio).toBeLessThanOrEqual(0.08);
    await preparePortrait(
      { delivery: { width, height } }, source, delivery,
      { width, height, alphaCapable: true }, sourcePixels,
    );
    expect(await readFile(delivery)).toEqual(sourceBytes);
    const deliveryPixels = await inspectPixels(delivery);
    expect(deliveryPixels.transparentMagentaRatio).toBeLessThanOrEqual(0.08);
  });

  it('pads a Latent 920x1536 opaque portrait into the 1024x1536 delivery canvas and keys the chroma background', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-latent-portrait-pad-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 46; const height = 60;
    const deliveryWidth = 50; const deliveryHeight = 60;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const subject = x >= 10 && x < 36 && y >= 8 && y < 56;
      pixels.set(subject ? [24, 180, 210, 255] : [255, 0, 255, 255], offset);
    }
    await encodeRgba(source, width, height, pixels);
    await preparePortrait(
      { provider: 'latent-moe', delivery: { width: deliveryWidth, height: deliveryHeight } }, source, delivery,
      { width, height, alphaCapable: false }, { hasTransparency: false, nonBlank: true } as any,
    );
    const result = await decodeRgba(delivery, deliveryWidth, deliveryHeight);
    expect(result.length).toBe(deliveryWidth * deliveryHeight * 4);
    // The chroma pad must be transparent while the scaled subject remains opaque.
    expect(pixel(result, deliveryWidth, 0, 30)[3]).toBeLessThan(8);
    expect(pixel(result, deliveryWidth, 49, 30)[3]).toBeLessThan(8);
    const subjectRgb = pixel(result, deliveryWidth, 25, 30).slice(0, 3);
    expect(subjectRgb.every((channel, index) => Math.abs(channel - [24, 180, 210][index]!) <= 6)).toBe(true);
    const subjectAlpha = pixel(result, deliveryWidth, 25, 30)[3];
    expect(subjectAlpha).toBeGreaterThan(247);
  });

  it('keys an already delivery-sized Latent opaque magenta portrait into transparency', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-latent-portrait-exact-'));
    const source = join(directory, 'source.png');
    const delivery = join(directory, 'delivery.png');
    const width = 64; const height = 64;
    const pixels = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const subject = x >= 16 && x < 48 && y >= 12 && y < 56;
      pixels.set(subject ? [24, 180, 210, 255] : [255, 0, 255, 255], offset);
    }
    await encodeRgba(source, width, height, pixels);
    await preparePortrait(
      { provider: 'latent-moe', delivery: { width, height } }, source, delivery,
      { width, height, alphaCapable: false }, { hasTransparency: false, nonBlank: true } as any,
    );
    const result = await decodeRgba(delivery, width, height);
    expect(pixel(result, width, 0, 0)[3]).toBeLessThan(8);
    expect(pixel(result, width, 32, 32)[3]).toBeGreaterThan(247);
  });
});

describe('ambiguous retry authorization evidence', () => {
  async function fixture() {
    const jobId = `visual.image.portrait.retry-evidence-${process.pid}-${Date.now()}`;
    const sourceJobHash = 'a'.repeat(64);
    const supersededRequestKey = 'b'.repeat(64);
    const previous = {
      jobId,
      status: 'ambiguous',
      sourceJobHash,
      requestKey: supersededRequestKey,
      receiptAssetId: 'file.characters.retry-evidence.png',
      activeAttempt: 11,
      attempts: [{ attempt: 11, status: 'ambiguous' }],
    };
    const entry = {
      job: {
        id: jobId,
        receiptAssetId: previous.receiptAssetId,
        provider: 'wisart-openai-compatible',
        model: 'gpt-image-2',
        generationSize: '1024x1536',
        delivery: { format: 'png', width: 1024, height: 1536, alpha: true },
      },
      prompt: { mode: 'reference-edit' },
      finalPrompt: 'Preserve the approved target identity and render no text.',
    };
    const authorization = createAmbiguousRetryAuthorization(entry, previous, sourceJobHash, [{
      jobId: 'canon.visual.albina.unarmored-standing', sha256: 'c'.repeat(64),
    }], {
      id: jobId,
      operator: 'regression-test',
      reason: 'Exercise fail-closed authorization evidence validation.',
      expectedAttempt: 11,
      expectedRequestKey: supersededRequestKey,
      expectedSourceJobHash: sourceJobHash,
      acknowledgePossibleDuplicateCharge: true,
    }, {
      authorizationId: `retry-11-to-12-evidence-${process.pid}-${Date.now()}`,
      authorizedAt: '2026-07-24T03:00:00.000Z',
      requestKey: 'd'.repeat(64),
    });
    const authorizationName = `ambiguous-retry-authorization-11-to-12-${authorization.authorizationId}.json`;
    const authorizationPath = `staging/media/visual-v2/${jobId}/${authorizationName}`;
    const directory = join(process.cwd(), 'staging', 'media', 'visual-v2', jobId);
    const record = {
      jobId,
      status: 'running',
      sourceJobHash,
      requestKey: authorization.authorizedNewRequestKey,
      receiptAssetId: previous.receiptAssetId,
      activeAttempt: 12,
      attempts: [...previous.attempts, { attempt: 12, status: 'running' }],
      history: [{ ...previous, archivedAt: '2026-07-24T03:00:00.000Z' }],
      resubmission: {
        version: 1,
        authorizationId: authorization.authorizationId,
        authorizationPath,
        authorizationSha256: authorization.authorizationSha256,
        supersededAttempt: 11,
        supersededRequestKey,
        supersededSourceJobHash: sourceJobHash,
        acknowledgedPossibleDuplicateCharge: true,
        authorizedNewRequestKey: authorization.authorizedNewRequestKey,
        finalPromptSha256: authorization.finalPromptSha256,
        referenceInputs: authorization.referenceInputs,
      },
    };
    return {
      authorization,
      directory,
      record,
      async writeAuthorization(value = authorization) {
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, authorizationName), JSON.stringify(value), 'utf8');
      },
      async cleanup() {
        // Fixture directories are uniquely keyed by pid+timestamp and are never
        // referenced by the ledger, so a sandboxed delete shim that refuses the
        // trash operation must not fail the assertion it was cleaning up after.
        try {
          await rm(directory, { recursive: true, force: true });
        } catch (error) {
          if (!/safe-delete|trash/iu.test(String((error as Error)?.message))) throw error;
        }
      },
    };
  }

  it('fails closed when a retry ledger record has no persisted authorization JSON', async () => {
    const evidence = await fixture();
    try {
      await expect(verifyAmbiguousRetryAuthorizationEvidence(evidence.record.jobId, evidence.record)).rejects.toThrow(/ENOENT/u);
    } finally {
      await evidence.cleanup();
    }
  });

  it('fails closed when persisted authorization JSON or its hash is tampered', async () => {
    const evidence = await fixture();
    try {
      await evidence.writeAuthorization({ ...evidence.authorization, reason: 'Tampered after operator approval.' });
      await expect(verifyAmbiguousRetryAuthorizationEvidence(evidence.record.jobId, evidence.record)).rejects.toThrow(/authorization hash/u);
      await evidence.writeAuthorization({ ...evidence.authorization, authorizationSha256: 'e'.repeat(64) });
      await expect(verifyAmbiguousRetryAuthorizationEvidence(evidence.record.jobId, evidence.record)).rejects.toThrow(/authorization hash/u);
    } finally {
      await evidence.cleanup();
    }
  });

  it('fails closed when a valid authorization JSON no longer matches ledger bindings', async () => {
    const evidence = await fixture();
    try {
      await evidence.writeAuthorization();
      const mismatchedRecord = {
        ...evidence.record,
        resubmission: { ...evidence.record.resubmission, finalPromptSha256: 'e'.repeat(64) },
      };
      await expect(verifyAmbiguousRetryAuthorizationEvidence(mismatchedRecord.jobId, mismatchedRecord)).rejects.toThrow(/duplicate paid request/u);
    } finally {
      await evidence.cleanup();
    }
  });
});

describe('ambiguous retry CLI argument gate', () => {
  async function expectCliRejection(arguments_: string[], message: RegExp) {
    await expect(runFile(process.execPath, ['scripts/retry-ambiguous-visual.mjs', ...arguments_], {
      cwd: process.cwd(), maxBuffer: 1024 * 1024,
    })).rejects.toMatchObject({ stderr: expect.stringMatching(message) });
  }

  it('rejects a duplicate value option before attempting a retry', async () => {
    await expectCliRejection(['--id', 'visual.image.portrait.albina.normal', '--id', 'visual.image.portrait.albina.armored'], /provided only once/u);
  });

  it('rejects a duplicate acknowledgement flag before attempting a retry', async () => {
    await expectCliRejection(['--acknowledge-possible-duplicate-charge', '--acknowledge-possible-duplicate-charge'], /provided only once/u);
  });

  it('rejects extra positional arguments before attempting a retry', async () => {
    await expectCliRejection(['unexpected-positional-argument'], /Unexpected ambiguous retry argument/u);
  });

  it('accepts repeated ordered reference expectations before retry option validation', async () => {
    await expectCliRejection([
      '--expected-current-contract-sha256', 'd'.repeat(64),
      '--expected-final-prompt-sha256', '02689fb99cc39364e51e8f9194046f6b3fac9da0a2c207a2cd30d07f12f94092',
      '--expected-reference', `canon.visual.albina.unarmored-standing:${'c'.repeat(64)}`,
      '--expected-reference', `reference.user.albina-style-board:${'f'.repeat(64)}`,
    ], /--id is required/u);
  });
});

describe('review-contract adoption CLI argument gate', () => {
  const id = 'visual.image.not-a-real-job';
  const baseArguments = [
    '--approve', '--ids', id, '--reviewer', 'strict-visual-qa',
    '--reason', 'Regression check.', '--notes', 'No artifact is adopted by this parser test.',
  ];

  async function expectCliRejection(arguments_: string[], message: RegExp) {
    await expect(runFile(process.execPath, ['scripts/adopt-visual-review-contract.mjs', ...arguments_], {
      cwd: process.cwd(), maxBuffer: 1024 * 1024,
    })).rejects.toMatchObject({ stderr: expect.stringMatching(message) });
  }

  it('requires criterion evidence before an adoption command can run', async () => {
    await expectCliRejection(baseArguments, /--criteria-evidence requires a value/u);
  });

  it('rejects a missing or empty job id before adoption', async () => {
    await expectCliRejection([
      '--approve', '--reviewer', 'strict-visual-qa', '--reason', 'Regression check.', '--notes', 'Parser test.',
      '--criteria-evidence', '{}',
    ], /--ids requires a value/u);
    await expectCliRejection([
      '--approve', '--ids', ' , ', '--reviewer', 'strict-visual-qa', '--reason', 'Regression check.', '--notes', 'Parser test.',
      '--criteria-evidence', '{}',
    ], /at least one job id/u);
  });

  it('rejects non-object, missing-job, and non-array criterion evidence mappings', async () => {
    await expectCliRejection([...baseArguments, '--criteria-evidence', '[]'], /JSON object keyed by every --ids job id/u);
    await expectCliRejection([...baseArguments, '--criteria-evidence', '{}'], /JSON object keyed by every --ids job id/u);
    await expectCliRejection([...baseArguments, '--criteria-evidence', JSON.stringify({ [id]: {} })], /JSON object keyed by every --ids job id/u);
  });

  it('rejects duplicate flags and positional arguments before adoption', async () => {
    await expectCliRejection([...baseArguments, '--approve', '--criteria-evidence', JSON.stringify({ [id]: [] })], /--approve may be provided only once/u);
    await expectCliRejection([...baseArguments, '--criteria-evidence', JSON.stringify({ [id]: [] }), 'unexpected'], /Unexpected review-contract adoption argument/u);
  });

  it('accepts a job-keyed evidence array through parsing before the unknown job is rejected', async () => {
    await expectCliRejection([...baseArguments, '--criteria-evidence', JSON.stringify({ [id]: [] })], /Unknown image jobs/u);
  });

  it('reports the unknown job even while another operator holds the ledger lock', async () => {
    // Contract-level validation must never depend on, or occupy, the exclusive ledger
    // lock: a malformed command has to fail on its own merits so a held lock cannot
    // mask the real error (and a rejected command cannot strand the lock).
    const stagingRoot = join(process.cwd(), 'staging', 'media', 'visual-v2');
    const lockPath = join(stagingRoot, 'ledger.lock');
    await mkdir(stagingRoot, { recursive: true });
    let heldLock = false;
    try {
      await writeFile(lockPath, `${JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() })}\n`, { flag: 'wx' });
      heldLock = true;
    } catch (error) {
      if ((error as { code?: string }).code !== 'EEXIST') throw error;
    }
try {
    await expectCliRejection([...baseArguments, '--criteria-evidence', JSON.stringify({ [id]: [] })], /Unknown image jobs/u);
  } finally {
    // Release by renaming into the archived-stale naming the product already treats
    // as a non-artifact, so the lock is freed without depending on a delete path.
    if (heldLock) await rename(lockPath, `${lockPath}.stale-${Date.now()}`);
  }
});

describe('Latent visual production configuration', () => {
  it('recognizes lat_sk_ keys and rejects wisart-shaped or empty candidates', () => {
    expect(isUsableLatentApiKey('lat_sk_zPjPIbEngwFxtjmUrW6dc4oW14zWv1jGRgBzw7RSlPs')).toBe(true);
    expect(isUsableLatentApiKey('sk-b98695fcfe0dda74011581784a30541f')).toBe(false);
    expect(isUsableLatentApiKey('lat_sk_short')).toBe(false);
    expect(isUsableLatentApiKey('')).toBe(false);
    expect(isUsableLatentApiKey(undefined)).toBe(false);
  });
});

describe('Latent async image request flow', () => {
  it('submits, polls, and downloads the media bytes through the documented endpoints', async () => {
    const { requestLatentImageForTest } = await import('../../scripts/lib/visual-production.mjs');
const calls: Array<{ url: string; method: string; headers: Record<string, string>; body?: string | undefined }> = [];
      const pollResponses = [
        { status: 'running', progress: 25 },
        { status: 'running', progress: 60 },
        { status: 'succeeded', progress: 100, artworkId: 'art-001' },
      ];
      let pollIndex = 0;
      const fetchStub: typeof fetch = async (input, init) => {
        const url = typeof input === 'string' ? input : input.toString();
        const method = init?.method ?? 'GET';
        const headers: Record<string, string> = {};
        for (const [k, v] of Object.entries(init?.headers ?? {})) headers[k] = String(v);
        const body = typeof init?.body === 'string' ? init.body : undefined;
        calls.push({ url, method, headers, body });
      if (url.endsWith('/api/generate') && method === 'POST') {
        return new Response(JSON.stringify({ id: 'job-abc', status: 'queued', width: 920, height: 1536, steps: 8, sampler: 'euler', scheduler: 'normal', resolution: 'portrait' }), { status: 202, headers: { 'content-type': 'application/json' } });
      }
      if (url.endsWith('/api/generate/job-abc') && method === 'GET') {
        const r = pollResponses[pollIndex++] ?? pollResponses[pollResponses.length - 1];
        return new Response(JSON.stringify({ id: 'job-abc', ...r }), { status: 200, headers: { 'content-type': 'application/json' } });
      }
      if (url.endsWith('/api/media/art-001') && method === 'GET') {
        return new Response(new Uint8Array(png(8, 8)), { status: 200, headers: { 'content-type': 'image/png' } });
      }
      return new Response('not-found', { status: 404 });
    };
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchStub;
    try {
      const entry = {
        job: { id: 'visual.image.cg.test', provider: 'latent-moe', model: 'latent-moe-async', generationSize: '1024x1536' },
        finalPrompt: 'flat gradient test prompt',
        prompt: {},
      } as any;
      const config = {
        provider: 'latent-moe', apiKey: 'lat_sk_zPjPIbEngwFxtjmUrW6dc4oW14zWv1jGRgBzw7RSlPs',
        invalidApiKey: false, baseUrl: 'https://latent.moe',
        submitTimeoutMs: 30_000, pollIntervalMs: 1, maxPolls: 5,
      } as any;
      const response = await requestLatentImageForTest(entry, config, 'idem-key');
      expect(response.status).toBe(200);
      expect(response.endpoint).toBe('latent-async');
      expect(response.latentJobId).toBe('job-abc');
      expect(response.latentArtworkId).toBe('art-001');
      expect(response.contentType).toBe('image/png');
      expect(response.rawBytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
      const submitCall = calls.find((call) => call.url.endsWith('/api/generate') && call.method === 'POST');
      expect(submitCall?.body).toContain('"resolution":"portrait"');
      expect(submitCall?.headers['Authorization']).toBe('Bearer lat_sk_zPjPIbEngwFxtjmUrW6dc4oW14zWv1jGRgBzw7RSlPs');
      expect(submitCall?.headers['Idempotency-Key']).toBe('idem-key');
      // freeze 未声明 negativePrompt 时不得凭空塞入字段
      expect(submitCall?.body).not.toContain('negativePrompt');
      const pollCalls = calls.filter((call) => call.url.endsWith('/api/generate/job-abc'));
      expect(pollCalls.length).toBeGreaterThan(0);
      const mediaCall = calls.find((call) => call.url.endsWith('/api/media/art-001'));
      expect(mediaCall?.headers['Authorization']).toBe('Bearer lat_sk_zPjPIbEngwFxtjmUrW6dc4oW14zWv1jGRgBzw7RSlPs');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('forwards the frozen negativePrompt because the site default is not applied when omitted', async () => {
    const { requestLatentImageForTest } = await import('../../scripts/lib/visual-production.mjs');
    const bodies: string[] = [];
    const fetchStub: typeof fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.toString();
      const method = init?.method ?? 'GET';
      if (typeof init?.body === 'string') bodies.push(init.body);
      if (url.endsWith('/api/generate') && method === 'POST') {
        return new Response(JSON.stringify({ id: 'job-neg', status: 'queued' }), { status: 202, headers: { 'content-type': 'application/json' } });
      }
      if (url.endsWith('/api/generate/job-neg')) {
        return new Response(JSON.stringify({ id: 'job-neg', status: 'succeeded', artworkId: 'art-neg' }), { status: 200, headers: { 'content-type': 'application/json' } });
      }
      if (url.endsWith('/api/media/art-neg')) {
        return new Response(new Uint8Array(png(8, 8)), { status: 200, headers: { 'content-type': 'image/png' } });
      }
      return new Response('not-found', { status: 404 });
    };
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchStub;
    try {
      const entry = {
        job: { id: 'visual.image.cg.neg', provider: 'latent-moe', model: 'latent-moe-async', generationSize: '1024x1536' },
        finalPrompt: 'flat gradient test prompt',
        prompt: { latentRequest: { negativePrompt: '畸形手、额外人物、可读文字', steps: 8, resolution: 'portrait', sampler: 'euler', scheduler: 'normal' } },
      } as any;
      const config = {
        provider: 'latent-moe', apiKey: 'lat_sk_zPjPIbEngwFxtjmUrW6dc4oW14zWv1jGRgBzw7RSlPs',
        invalidApiKey: false, baseUrl: 'https://latent.moe',
        submitTimeoutMs: 30_000, pollIntervalMs: 1, maxPolls: 5,
      } as any;
      await requestLatentImageForTest(entry, config, 'idem-neg');
      const submitted = JSON.parse(bodies[0] ?? '{}');
      expect(submitted.negativePrompt).toBe('畸形手、额外人物、可读文字');
      expect(submitted.prompt).toBe('flat gradient test prompt');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('fails closed when the provider returns too_many_active (single-concurrency)', async () => {
    const { requestLatentImageForTest } = await import('../../scripts/lib/visual-production.mjs');
    const fetchStub: typeof fetch = async () => new Response(JSON.stringify({ error: 'too_many_active', message: 'Wait for your current image to finish.' }), { status: 409, headers: { 'content-type': 'application/json' } });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchStub;
    try {
      const entry = {
        job: { id: 'visual.image.cg.busy', provider: 'latent-moe', model: 'latent-moe-async', generationSize: '1024x1536' },
        finalPrompt: 'flat',
        prompt: {},
      } as any;
      const config = {
        provider: 'latent-moe', apiKey: 'lat_sk_zPjPIbEngwFxtjmUrW6dc4oW14zWv1jGRgBzw7RSlPs',
        invalidApiKey: false, baseUrl: 'https://latent.moe',
        submitTimeoutMs: 30_000, pollIntervalMs: 1, maxPolls: 5,
      } as any;
      await expect(requestLatentImageForTest(entry, config, 'idem')).rejects.toMatchObject({ status: 409 });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
});

describe('canon visual source path resolution', () => {
  it('resolves every migration source inside the research asset directories', async () => {
    const migration = JSON.parse(await readFile('content/media-production/canon-visual-sources-migration-v1.json', 'utf8'));
    const wikiFiles = (await readdir('staging/research/canon-visual/wiki-game-assets')).filter((name) => /\.(?:jpg|jpeg|png)$/iu.test(name));
    expect(migration.assets).toHaveLength(wikiFiles.length + 2);
    for (const asset of migration.assets) {
      expect(resolveCanonVisualSourcePath(asset.localPath)).toBe(join(process.cwd(), asset.localPath));
    }
  });

  it('rejects source paths outside the research asset directories', () => {
    // 归一化后仍落在白名单目录内的 .. 路径应视为合法，不得误杀。
    expect(resolveCanonVisualSourcePath('staging/research/canon-visual/wiki-game-assets/../../style-reference/albina-style-baseline.jpg'))
      .toBe(join(process.cwd(), 'staging/research/style-reference/albina-style-baseline.jpg'));
    // 归一化后越界的路径必须拒绝，即使段数凑巧相同。
    expect(() => resolveCanonVisualSourcePath('staging/research/style-reference/../media/visual-v2/ledger.json')).toThrow(/escaped the research asset directory/u);
    expect(() => resolveCanonVisualSourcePath('staging/research/notes/board.png')).toThrow(/escaped the research asset directory/u);
    expect(() => resolveCanonVisualSourcePath('staging/research/style-reference/nested/board.png')).toThrow(/escaped the research asset directory/u);
    expect(() => resolveCanonVisualSourcePath('staging/research/style-reference/board.txt')).toThrow(/escaped the research asset directory/u);
    expect(() => resolveCanonVisualSourcePath('staging/media/visual-v2/ledger.json')).toThrow(/escaped the research asset directory/u);
    expect(() => resolveCanonVisualSourcePath('/etc/passwd')).toThrow(/Invalid canon visual source path/u);
    expect(() => resolveCanonVisualSourcePath('C://secrets//board.png')).toThrow(/Invalid canon visual source path/u);
    expect(() => resolveCanonVisualSourcePath(undefined)).toThrow(/Invalid canon visual source path/u);
  });
});

describe('CLI local env loader', () => {
  it('parses KEY=VALUE lines and rejects malformed entries fail-closed', async () => {
    const { parseLocalEnvFile } = await import('../../scripts/produce-visual-images.mjs');
    expect(parseLocalEnvFile('# comment\nWISART_API_KEY=sk-abc123\nLATENT_MOE_API_KEY="lat_sk_xyz"\nFOO_BAR=a=b\n')).toEqual([
      ['WISART_API_KEY', 'sk-abc123'],
      ['LATENT_MOE_API_KEY', 'lat_sk_xyz'],
      ['FOO_BAR', 'a=b'],
    ]);
    for (const malformed of ['BARE', '=x', 'KEY=', 'KEY="unclosed', 'lower=x']) {
      expect(() => parseLocalEnvFile(malformed)).toThrow(/\.env\.local/u);
    }
  });

  it('does not trigger a batch run when the CLI module is imported', async () => {
    const before = await readFile('staging/media/visual-v2/ledger.json', 'utf8').catch(() => null);
    await import('../../scripts/produce-visual-images.mjs');
    const after = await readFile('staging/media/visual-v2/ledger.json', 'utf8').catch(() => null);
    expect(after).toBe(before);
  });
});

describe('reference input resolution', () => {
  it('resolves latent text-only prompts without reference fields to zero reference inputs instead of throwing', async () => {
    // Latent prompt records are text-only by contract: referenceJobIds and
    // referenceSourceIds are absent. The resolver must treat a missing field
    // as zero inputs — runJob surfaces a thrown error here as a blocked job,
    // which used to block every Latent CG at once.
    const references = await resolveReferenceInputs(
      { promptVersion: 'latent-text-v1', mode: 'text-generation', latentRequest: { prompt: 'x' } },
      { jobs: {} },
      new Map(),
      { assets: [] },
    );
    expect(references).toEqual([]);
  });

  it('still requires reference jobs to exist when the prompt declares them', async () => {
    await expect(resolveReferenceInputs(
      { promptVersion: 'albina-visual-v2', mode: 'reference-edit', referenceJobIds: ['visual.image.portrait.missing'], referenceSourceIds: [] },
      { jobs: {} },
      new Map(),
      { assets: [] },
    )).rejects.toThrow(/absent or cyclic/u);
  });
});
