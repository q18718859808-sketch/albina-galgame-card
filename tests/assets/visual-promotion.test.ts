import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { parsePromotionReceipt } from '../../scripts/lib/promotion-receipts.mjs';
import { promoteVisualArtifacts } from '../../scripts/lib/visual-promotion.mjs';

const hash = (value: Uint8Array | string) => createHash('sha256').update(value).digest('hex');

function approvedCandidate(deliveryPath: string, bytes: Buffer) {
  const sourceJobHash = 'a'.repeat(64);
  return {
    jobId: 'visual.image.cg.test',
    receiptAssetId: 'cg.test',
    outputPath: 'cg/test.jpg',
    provider: 'x666-openai-compatible' as const,
    model: 'gpt-image-2' as const,
    upstreamPieVerified: false as const,
    promptVersion: 'albina-visual-v2',
    status: 'completed' as const,
    sourceJobHash,
    currentSourceJobHash: sourceJobHash,
    artifactSha256: hash(bytes),
    deliveryPath,
    review: {
      status: 'approved' as const,
      reviewer: 'visual-reviewer',
      reviewedAt: '2026-07-19T00:00:00.000Z',
    },
    inputs: [{
      jobId: 'visual.image.portrait.albina.normal',
      receiptAssetId: 'file.characters.albina.normal.png',
      sha256: 'b'.repeat(64),
    }],
  };
}

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'albina-visual-promotion-'));
  const deliveryPath = join(root, 'delivery.jpg');
  const bytes = Buffer.from('approved visual artifact');
  await writeFile(deliveryPath, bytes);
  return {
    root,
    bytes,
    assetRoot: join(root, 'dist-assets'),
    receiptRoot: join(root, 'receipts'),
    candidate: approvedCandidate(deliveryPath, bytes),
  };
}

function options() {
  return {
    ids: ['visual.image.cg.test'],
    all: false,
    recoverStaleLock: false,
  };
}

describe('visual artifact promotion', () => {
  it('atomically promotes an approved current-contract delivery and writes a strict receipt', async () => {
    const value = await fixture();
    const withCandidates = async (_selection: unknown, action: (candidates: unknown[]) => Promise<unknown>) => action([value.candidate]);

    const first = await promoteVisualArtifacts(options(), {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
    });
    const targetPath = join(value.assetRoot, 'cg/test.jpg');
    const receiptPath = join(value.receiptRoot, 'visual.image.cg.test.json');
    expect(first).toEqual([{ id: value.candidate.jobId, status: 'promoted', assetId: 'cg.test' }]);
    expect(await readFile(targetPath)).toEqual(value.bytes);

    const receipt = parsePromotionReceipt(JSON.parse(await readFile(receiptPath, 'utf8')));
    expect(receipt).toMatchObject({
      assetId: 'cg.test',
      artifactSha256: hash(value.bytes),
      provenance: {
        provider: 'x666-openai-compatible',
        model: 'gpt-image-2',
        upstreamPieVerified: false,
        promptVersion: 'albina-visual-v2',
        sourceJobHash: 'a'.repeat(64),
        review: value.candidate.review,
      },
      rights: {
        status: 'unverified',
        sourceType: 'model-output',
        redistribution: 'unverified',
        rightsBasis: 'Redistribution rights for this model output have not been independently verified.',
      },
      lineage: {
        kind: 'derivative',
        processVersion: 'albina-visual-promotion-v1',
        inputs: [{
          assetId: 'file.characters.albina.normal.png',
          sha256: 'b'.repeat(64),
          role: 'approved-generated-reference',
        }],
      },
    });

    const modifiedAt = (await stat(targetPath)).mtimeMs;
    const second = await promoteVisualArtifacts(options(), {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
    });
    expect(second).toEqual([{ id: value.candidate.jobId, status: 'skipped', assetId: 'cg.test' }]);
    expect((await stat(targetPath)).mtimeMs).toBe(modifiedAt);
  });

  it.each([
    ['unreviewed', { status: 'awaiting-review', review: undefined }],
    ['rejected', { status: 'rejected', review: { status: 'rejected', reviewer: 'qa', reviewedAt: '2026-07-19T00:00:00.000Z' } }],
    ['stale contract', { currentSourceJobHash: 'c'.repeat(64) }],
  ])('rejects a %s ledger candidate before copying', async (_label, overrides) => {
    const value = await fixture();
    const candidate = { ...value.candidate, ...overrides };
    const withCandidates = async (_selection: unknown, action: (candidates: unknown[]) => Promise<unknown>) => action([candidate]);
    await expect(promoteVisualArtifacts(options(), {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
    })).rejects.toThrow(/not eligible|current contract/iu);
  });

  it('rejects a changed delivery hash and an existing conflicting receipt', async () => {
    const value = await fixture();
    const withCandidates = async (_selection: unknown, action: (candidates: unknown[]) => Promise<unknown>) => action([value.candidate]);
    await writeFile(value.candidate.deliveryPath, Buffer.from('tampered'));
    await expect(promoteVisualArtifacts(options(), {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
    })).rejects.toThrow(/artifact hash/iu);

    await writeFile(value.candidate.deliveryPath, value.bytes);
    await promoteVisualArtifacts(options(), { assetRoot: value.assetRoot, receiptRoot: value.receiptRoot, withCandidates });
    const receiptPath = join(value.receiptRoot, 'visual.image.cg.test.json');
    const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
    receipt.rights.rightsBasis = 'conflicting assertion';
    await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
    await expect(promoteVisualArtifacts(options(), {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
    })).rejects.toThrow(/receipt conflict/iu);
  });

  it('rolls back the delivery when the receipt write fails', async () => {
    const value = await fixture();
    const withCandidates = async (_selection: unknown, action: (candidates: unknown[]) => Promise<unknown>) => action([value.candidate]);
    let writes = 0;
    const writeAtomic = async (path: string, bytes: Uint8Array) => {
      writes += 1;
      if (writes === 2) throw new Error('simulated receipt write failure');
      await writeFile(path, bytes);
    };

    await expect(promoteVisualArtifacts(options(), {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
      writeAtomic,
    })).rejects.toThrow(/simulated receipt write failure/iu);
    await expect(readFile(join(value.assetRoot, 'cg/test.jpg'))).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it('rejects a pre-existing half promotion without overwriting it', async () => {
    const value = await fixture();
    const targetPath = join(value.assetRoot, 'cg/test.jpg');
    const existing = Buffer.from('orphaned delivery');
    await mkdir(join(value.assetRoot, 'cg'), { recursive: true });
    await writeFile(targetPath, existing);
    const withCandidates = async (_selection: unknown, action: (candidates: unknown[]) => Promise<unknown>) => action([value.candidate]);

    await expect(promoteVisualArtifacts(options(), {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
    })).rejects.toThrow(/partial|conflict/iu);
    expect(await readFile(targetPath)).toEqual(existing);
  });

  it('refuses to fabricate verified redistribution rights', async () => {
    const value = await fixture();
    const withCandidates = async (_selection: unknown, action: (candidates: unknown[]) => Promise<unknown>) => action([value.candidate]);
    await expect(promoteVisualArtifacts({
      ...options(),
      rights: { status: 'verified', redistribution: 'allowed' },
    }, {
      assetRoot: value.assetRoot,
      receiptRoot: value.receiptRoot,
      withCandidates,
    })).rejects.toThrow(/cannot mark.*verified/iu);
  });
});
