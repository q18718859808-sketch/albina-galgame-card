import { describe, expect, it } from 'vitest';

import { auditShippedAssets, validateFormalKrea2BaselineBinding } from '../../scripts/audit-krea2-evidence.mjs';
import { deriveReleaseStatus } from '../../scripts/lib/release-status.mjs';

describe('Krea2 evidence audit', () => {
  it('requires a unique receipt output hash with canonical direct-review bindings for shipped assets', () => {
    const manifest = { assets: [{ id: 'bg.bound', path: 'bg/bound.png', sha256: 'a'.repeat(64), provenance: { provider: 'comfyui-local-krea2' } }] };
    const baseline = { workflowSha256: 'c'.repeat(64), evidenceSha256: 'd'.repeat(64), topologySha256: 'e'.repeat(64) };
    const bound = auditShippedAssets({ manifest, results: [{
      id: 'receipt.bound', receiptPath: 'staging/receipt.bound.json', pass: true,
      output: { sha256: 'a'.repeat(64) }, canonical: { recorded: 'canon.png', sha256: 'b'.repeat(64) },
      directReview: { status: 'accepted', candidateSha256: 'a'.repeat(64), referenceSha256: 'b'.repeat(64) },
    }], baseline });
    expect(bound).toMatchObject({ total: 1, bound: 1, unbound: 0 });

    const unbound = auditShippedAssets({ manifest, results: [] });
    expect(unbound.entries[0]).toMatchObject({ pass: false, issues: ['receipt-output-unbound'] });
  });

  it('requires the formal Krea2 receipt to carry the current embedded baseline binding', () => {
    const baseline = { workflowSha256: 'c'.repeat(64), evidenceSha256: 'd'.repeat(64), topologySha256: 'e'.repeat(64) };
    const receipt = {
      provenance: {
        baseline: {
          workflowPath: 'staging/media/embedded-baseline/embedded-production-baseline.api.json',
          workflowSha256: baseline.workflowSha256,
          evidencePath: 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json',
          evidenceSha256: 'f'.repeat(64),
          topologySha256: baseline.topologySha256,
        },
      },
    };
    expect(validateFormalKrea2BaselineBinding(receipt, baseline)).toBe(false);
    receipt.provenance.baseline.evidenceSha256 = baseline.evidenceSha256;
    expect(validateFormalKrea2BaselineBinding(receipt, baseline)).toBe(true);
  });

  it('makes evidence audit failures and unbound shipped assets release blockers', () => {
    const status = deriveReleaseStatus({
      version: '2.0.0', runtimeMediaApis: false, completed: {}, mediaReadiness: { total: 0, ready: 0, blocked: 0, byRoot: {}, blockers: [] },
      krea2EvidenceAudit: { failed: 2, unbound: 3 },
    });
    expect(status.completionBlockers).toEqual(expect.arrayContaining(['krea2-evidence-audit:2-failed', 'krea2-unbound-shipped-assets:3']));
  });

  it('preserves the audit summary in release status', () => {
    const status = deriveReleaseStatus({
      version: '2.0.0', runtimeMediaApis: false, completed: {}, mediaReadiness: { total: 0, ready: 0, blocked: 0, byRoot: {}, blockers: [] },
      krea2EvidenceAudit: { total: 12, bound: 4, unbound: 8, failed: 3 },
    });
    expect(status.krea2EvidenceAudit).toMatchObject({ total: 12, bound: 4, unbound: 8, failed: 3 });
  });
});
