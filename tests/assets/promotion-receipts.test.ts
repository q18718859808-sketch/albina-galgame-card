import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { attachPromotionProvenance, loadPromotionReceipts } from '../../scripts/lib/promotion-receipts.mjs';

function receipt(assetId = 'cg.test', artifactSha256 = 'a'.repeat(64)) {
  return {
    version: 1,
    assetId,
    artifactSha256,
    provenance: {
      provider: 'x666-openai-compatible',
      model: 'gpt-image-2',
      upstreamPieVerified: false,
      promptVersion: 'test-image-v1',
      sourceJobHash: 'b'.repeat(64),
      review: { status: 'approved', reviewer: 'visual-reviewer', reviewedAt: '2026-07-15T00:00:00.000Z' },
    },
  };
}

describe('promotion receipts', () => {
  it('attaches approved provenance only when the promoted artifact hash matches', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-promotion-receipt-'));
    const path = join(directory, 'cg.test.json');
    await writeFile(path, JSON.stringify(receipt()));
    const receipts = await loadPromotionReceipts([path]);
    expect(attachPromotionProvenance([{ id: 'cg.test', sha256: 'a'.repeat(64) }], receipts)).toMatchObject([
      { id: 'cg.test', provenance: { provider: 'x666-openai-compatible', model: 'gpt-image-2', upstreamPieVerified: false, review: { status: 'approved' } } },
    ]);
    expect(() => attachPromotionProvenance([{ id: 'cg.test', sha256: 'c'.repeat(64) }], receipts)).toThrow(/hash mismatch/iu);
  });

  it('rejects unsupported provider pairs and missing x666 upstream evidence', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-promotion-provider-'));
    const pieImage = join(directory, 'pie-image.json');
    const missingEvidence = join(directory, 'missing-evidence.json');
    await writeFile(pieImage, JSON.stringify({ ...receipt(), provenance: { ...receipt().provenance, provider: 'pie', upstreamPieVerified: undefined } }));
    await writeFile(missingEvidence, JSON.stringify({ ...receipt(), provenance: { ...receipt().provenance, upstreamPieVerified: undefined } }));
    await expect(loadPromotionReceipts([pieImage])).rejects.toThrow(/provider\/model/iu);
    await expect(loadPromotionReceipts([missingEvidence])).rejects.toThrow(/upstream pie/iu);
  });

  it('rejects unknown assets, secret fields, and incomplete human review', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-promotion-invalid-'));
    const secretPath = join(directory, 'secret.json');
    const anonymousPath = join(directory, 'anonymous.json');
    await writeFile(secretPath, JSON.stringify({ ...receipt(), apiKey: 'forbidden' }));
    await writeFile(anonymousPath, JSON.stringify({ ...receipt(), provenance: { ...receipt().provenance, review: { status: 'approved' } } }));
    await expect(loadPromotionReceipts([secretPath])).rejects.toThrow(/fields/iu);
    await expect(loadPromotionReceipts([anonymousPath])).rejects.toThrow(/media review/iu);
    const validPath = join(directory, 'valid.json');
    await writeFile(validPath, JSON.stringify(receipt('cg.unknown')));
    await expect(loadPromotionReceipts([validPath]).then((receipts) => attachPromotionProvenance([], receipts))).rejects.toThrow(/unknown asset/iu);
  });

  it('attaches strict rights and lineage metadata from the same hash-bound receipt', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'albina-promotion-rights-'));
    const path = join(directory, 'cg.test.json');
    const value = {
      ...receipt(),
      rights: { status: 'verified', sourceType: 'model-output', redistribution: 'allowed', rightsBasis: 'Verified provider output terms.', holder: 'Albina project', sourceUrl: 'https://example.com/terms' },
      lineage: { kind: 'original', processVersion: 'image-text-v1', inputs: [] },
    };
    await writeFile(path, JSON.stringify(value));
    const receipts = await loadPromotionReceipts([path]);
    expect(attachPromotionProvenance([{ id: 'cg.test', sha256: 'a'.repeat(64) }], receipts)).toMatchObject([
      { rights: { redistribution: 'allowed' }, lineage: { kind: 'original', inputs: [] } },
    ]);
  });
});
