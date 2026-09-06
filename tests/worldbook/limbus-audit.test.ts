import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// The audit script is intentionally executable JavaScript; its runtime contract is tested here.
// @ts-expect-error No declaration file is needed for this script-only test import.
import { auditLimbusWorldbook, SOURCE_FILES } from '../../scripts/audit-limbus-worldbook.mjs';

describe('Limbus worldbook source audit', () => {
  it('fails closed when any required legacy source is missing and does not write output', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-limbus-audit-'));
    try {
      const sourceRoot = join(root, 'sources');
      const output = join(root, 'audit.json');
      await (await import('node:fs/promises')).mkdir(sourceRoot, { recursive: true });
      for (const file of SOURCE_FILES.slice(0, -1)) await writeFile(join(sourceRoot, file), JSON.stringify({ entries: [] }));
      await expect(auditLimbusWorldbook({ legacyRoot: sourceRoot, output })).rejects.toThrow(/source set is incomplete/i);
      await expect(access(output)).rejects.toThrow();
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('audits the complete ordered source set', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-limbus-audit-complete-'));
    try {
      const sourceRoot = join(root, 'sources');
      const output = join(root, 'audit.json');
      await (await import('node:fs/promises')).mkdir(sourceRoot, { recursive: true });
      for (const file of SOURCE_FILES) await writeFile(join(sourceRoot, file), JSON.stringify({ entries: [] }));
      const result = await auditLimbusWorldbook({ legacyRoot: sourceRoot, output });
      const audit = JSON.parse(await readFile(output, 'utf8'));
      expect(result.files).toBe(SOURCE_FILES.length);
      expect(audit.sourceFiles).toEqual(SOURCE_FILES);
      expect(audit.completionGate.completeLivingWorldVerified).toBe(true);
      expect(audit.summary.substantiveOnly).toEqual({
        'canon-candidate': 0,
        AU_extension: 0,
        'needs-review': 0,
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('separates provenance bridges from substantive coverage claims', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-limbus-audit-bridge-'));
    try {
      const sourceRoot = join(root, 'sources');
      const output = join(root, 'audit.json');
      await (await import('node:fs/promises')).mkdir(sourceRoot, { recursive: true });
      for (const file of SOURCE_FILES) {
        const bridge = file.includes('manifest_bridge');
        await writeFile(join(sourceRoot, file), JSON.stringify({ entries: [{
          uid: file,
          content: 'Canto IX',
          extensions: bridge
            ? { source_refs: [{ title: 'x' }] }
            : { source_refs: [{ title: 'x', url: 'https://example.test/source', revision_id: 1, verified_at: '2026-08-18T00:00:00Z' }] },
        }] }));
      }
      const result = await auditLimbusWorldbook({ legacyRoot: sourceRoot, output });
      expect(result.completionGate.sourceIndexBridgeEntries).toBe(1);
      expect(result.completionGate.substantiveEntries).toBe(SOURCE_FILES.length - 1);
      expect(result.summary.substantiveOnly['needs-review']).toBe(1);
      expect(result.summary.allRecords['canon-candidate']).toBe(SOURCE_FILES.length - 1);
      const audit = JSON.parse(await readFile(output, 'utf8'));
      expect(audit.refreshQueue).toMatchObject({ status: 'awaiting-source-refresh', total: SOURCE_FILES.length - 2 });
      expect(audit.refreshQueue.entries[0]).toMatchObject({
        action: 'refresh-current-source-split-atomic-claims-and-re-review',
        priority: 1,
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('loads and verifies the Albina/Canto IX refresh overlay as evidence', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-limbus-refresh-'));
    try {
      const refresh = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/albina-canto-ix-refresh-v1.json'), 'utf8'));
      expect(refresh.records).toHaveLength(8);
      expect(refresh.records.map((record: { id: string }) => record.id)).toEqual([
        'refresh.albina.identity',
        'refresh.albina.body-and-fascia',
        'refresh.canto-ix.9-14',
        'refresh.canto-ix.9-18',
        'refresh.canto-ix.9-37',
        'refresh.canto-ix.9-43',
        'refresh.albina.personality-and-ambition',
        'refresh.au-boundary',
      ]);
      for (const record of refresh.records) {
        expect(record.atomicFacts.length).toBeGreaterThanOrEqual(2);
        expect(record.narrativeBoundary.length).toBeGreaterThan(20);
        expect(record.claimIds.length).toBeGreaterThan(0);
        expect(record.sourceRefs.every((source: { sourceId: string; locator: string; checkedAt: string }) =>
          source.sourceId && source.locator && source.checkedAt)).toBe(true);
      }
      expect(refresh.records.find((record: { id: string }) => record.id === 'refresh.albina.identity').targetIds)
        .toContain('albina_identity_status');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('loads the Canto I-VIII, X and Intervallo refresh overlay with atomic evidence', async () => {
    const refresh = JSON.parse(await readFile(
      join(process.cwd(), 'content/worldbook/albina-canto-i-viii-x-intervallo-refresh-v1.json'),
      'utf8',
    ));
    expect(refresh.records).toHaveLength(29);
    expect(new Set(refresh.records.flatMap((record: { targetIds: string[] }) => record.targetIds)).size)
      .toBe(29);
    for (const record of refresh.records) {
      expect(record.atomicFacts.length).toBeGreaterThanOrEqual(2);
      expect(record.narrativeBoundary.length).toBeGreaterThan(20);
      expect(record.claimIds.length).toBeGreaterThan(0);
      expect(record.sourceRefs.length).toBeGreaterThan(0);
      expect(record.sourceRefs.every((source: { sourceId: string; locator: string; revisionId: number; checkedAt: string }) =>
        source.sourceId && source.locator && Number.isInteger(source.revisionId) && source.checkedAt)).toBe(true);
    }
    expect(refresh.records.find((record: { id: string }) => record.id === 'refresh.canto-x.fault-frame')
      .narrativeBoundary).toMatch(/保守刷新/);
    expect(refresh.records.some((record: { narrativeBoundary: string }) =>
      /AU\/IF|AU.*正史/iu.test(record.narrativeBoundary))).toBe(true);
  });

  it('keeps the unresolved coverage index evidence-backed and preserves the 16-entry L0 package', async () => {
    const audit = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/limbus-world-audit-v1.json'), 'utf8'));
    const index = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/limbus-world-coverage-index-v1.json'), 'utf8'));
    expect(index.counts).toMatchObject({
      canonCandidates: 304,
      needsReview: 258,
      sourceBackedCandidateQueue: 304,
      quarantinedMissingSourceOrRuntimeReview: 258,
    });
    expect(index.entries).toHaveLength(562);
    const candidateIds = new Set(audit.refreshQueue.entries.map((entry: { id: string }) => entry.id));
    const expectedIds = [
      ...audit.refreshQueue.entries.map((entry: { id: string }) => entry.id),
      ...audit.entries
        .filter((entry: { narrativeRole: string; canonicality: string }) =>
          entry.narrativeRole !== 'source-index-bridge' && entry.canonicality === 'needs-review')
        .map((entry: { id: string }) => entry.id),
    ];
    expect(index.entries.map((entry: { id: string }) => entry.id)).toEqual(expectedIds);
    expect(index.entries.filter((entry: { canonicality: string }) => entry.canonicality === 'canon-candidate'))
      .toHaveLength(304);
    expect(index.entries.filter((entry: { canonicality: string }) => entry.canonicality === 'needs-review'))
      .toHaveLength(258);
    expect(index.entries.filter((entry: { canonicality: string; id: string }) =>
      entry.canonicality === 'canon-candidate' && !candidateIds.has(entry.id))).toHaveLength(0);
    expect(index.entries.filter((entry: { canonicality: string; sourceRefs: unknown[] }) =>
      entry.canonicality === 'needs-review' && entry.sourceRefs.length === 0)).not.toHaveLength(0);
    expect(index.preservedL0.entryCount).toBe(16);
    expect(index.preservedL0.entryIds).toHaveLength(16);
  });

  it('closes full timeline and Albina AU coverage without merging bridge records', async () => {
    const audit = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/limbus-world-audit-v1.json'), 'utf8'));
    const index = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/limbus-world-coverage-index-v1.json'), 'utf8'));
    const au = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/albina-worldbook-au-if-v1.json'), 'utf8'));
    const substantive = audit.entries.filter((entry: { narrativeRole: string }) => entry.narrativeRole !== 'source-index-bridge');
    expect(index.fullCoverage).toMatchObject({
      auditedEntries: 2481,
      substantiveEntries: 599,
      sourceIndexBridgeEntries: 1882,
      au: {
        allRecords: 1213,
        substantiveOnly: 6,
        sourceIndexBridgeRecords: 1207,
        packageEntries: 6,
        packageIdsMatchSubstantiveAudit: true,
      },
    });
    expect(index.fullCoverage.timeline.allRecords).toEqual(audit.timeline.allRecords);
    expect(index.fullCoverage.timeline.substantiveOnly).toEqual(audit.timeline.substantiveOnly);
    expect(index.fullCoverage.au.packageIds).toEqual(au.entries.map((entry: { uid: string }) => entry.uid));
    expect(index.fullCoverage.au.substantiveEntries.map((entry: { id: string }) => entry.id).sort())
      .toEqual(au.entries.map((entry: { uid: string }) => entry.uid).sort());
    expect(index.packageBoundaries).toMatchObject({
      l0Standalone: true,
      quarantine: { entryCount: 258, defaultEnabled: false },
      sourceIndex: { entryCount: 1882, defaultEnabled: false },
      auIf: { entryCount: 6, defaultEnabled: false },
    });
    expect(index.fullCoverage.substantiveOnly).toBeUndefined();
    expect(substantive).toHaveLength(599);
  });

  it('proves coverage entries copy only audited evidence and package IDs', async () => {
    const audit = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/limbus-world-audit-v1.json'), 'utf8'));
    const index = JSON.parse(await readFile(join(process.cwd(), 'content/worldbook/limbus-world-coverage-index-v1.json'), 'utf8'));
    const auditById = new Map(audit.entries.map((entry: { id: string }) => [entry.id, entry]));

    expect(index.fullCoverage.integrity).toEqual({
      auditIdsUnique: true,
      unresolvedIdsUnique: true,
      unresolvedIdsAreAudited: true,
      sourceRefsCopiedFromAudit: true,
      timelineCountsDerivedFromAudit: true,
      packageIdsMatchAudit: true,
    });
    for (const entry of index.entries) {
      const audited = auditById.get(entry.id) as { sourceRefs: unknown; legacyFileSha256: string } | undefined;
      expect(audited).toBeDefined();
      expect(entry.sourceRefs).toEqual(audited?.sourceRefs);
      expect(entry.legacyFileSha256).toBe(audited?.legacyFileSha256);
    }
  });

  it('keeps the canonical card worldbook at the original 16 entries', async () => {
    const card = JSON.parse(await readFile(join(process.cwd(), 'card/albina.card.json'), 'utf8'));
    expect(card.data.character_book.entries).toHaveLength(16);
  });
});
