import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const worldbookDir = path.join(root, 'content', 'worldbook');
const readJson = async (file: string) => JSON.parse(await readFile(file, 'utf8'));
const hashFile = async (file: string) =>
  createHash('sha256').update(await readFile(file)).digest('hex');

describe('layered worldbook materialization', () => {
  it('materializes every audited UID exactly once across the full packages', async () => {
    const audit = await readJson(path.join(worldbookDir, 'limbus-world-audit-v1.json'));
    const manifest = await readJson(path.join(worldbookDir, 'albina-worldbook-packages-v1.manifest.json'));
    const seen = new Set<string>();

    for (const report of manifest.packages) {
      const payload = await readJson(path.join(root, report.file));
      expect(payload.entries).toHaveLength(report.entryCount);
      expect(await hashFile(path.join(root, report.file))).toBe(report.sha256);
      for (const entry of payload.entries) {
        expect(seen.has(entry.uid), `duplicate full-package UID: ${entry.uid}`).toBe(false);
        seen.add(entry.uid);
      }
    }

    expect(seen.size).toBe(2481);
    expect(seen).toEqual(new Set(audit.entries.map((entry: { id: string }) => entry.id)));
  });

  it('keeps 599 substantive candidates separate from 1,882 disabled bridges', async () => {
    const manifest = await readJson(path.join(worldbookDir, 'albina-worldbook-packages-v1.manifest.json'));
    const sourceReport = manifest.packages.find((item: { id: string }) => item.id === 'source-index');
    const quarantineReport = manifest.packages.find(
      (item: { id: string }) => item.id === 'quarantine-unverified-rp',
    );
    const sourceIndex = await readJson(path.join(root, sourceReport.file));
    const quarantine = await readJson(path.join(root, quarantineReport.file));

    expect(manifest.totals.substantiveCandidates).toBe(599);
    expect(manifest.totals.sourceIndexBridges).toBe(1882);
    expect(sourceIndex.entries).toHaveLength(1882);
    expect(sourceIndex.entries.every((entry: { disable?: boolean }) => entry.disable === true)).toBe(true);
    expect(sourceIndex.entries.every((entry: any) => entry.extensions.narrative_role === 'source-index-bridge')).toBe(true);
    expect(quarantine.entries).toHaveLength(258);
    expect(quarantine.entries.every((entry: { disable?: boolean }) => entry.disable === true)).toBe(true);
    expect(quarantine.entries.every((entry: any) => entry.extensions.canonicality === 'needs-review')).toBe(true);
  });

  it('enforces package default-enable policy at entry level', async () => {
    const manifest = await readJson(path.join(worldbookDir, 'albina-worldbook-packages-v1.manifest.json'));
    for (const report of manifest.packages) {
      const payload = await readJson(path.join(root, report.file));
      expect(payload.defaultEnabled).toBe(report.defaultEnabled);
      expect(payload.entries.every((entry: { disable?: boolean }) => entry.disable !== report.defaultEnabled)).toBe(true);
      expect(report.enabledEntryCount).toBe(report.defaultEnabled ? report.entryCount : 0);
    }
  });

  it('keeps the default full preset within the declared static budget', async () => {
    const manifest = await readJson(path.join(worldbookDir, 'albina-worldbook-packages-v1.manifest.json'));
    expect(manifest.totals.defaultEnabledInventoryCharacters).toBeLessThanOrEqual(
      manifest.budgetPolicy.defaultEnabledInventoryCharacterLimit,
    );
    expect(manifest.totals.defaultEnabledConstantCharacters).toBeLessThanOrEqual(
      manifest.budgetPolicy.defaultEnabledConstantCharacterLimit,
    );
    expect(manifest.totals.defaultEnabledConstantCharacters).toBe(0);
  });

  it('keeps L0 as an explicitly exclusive 16-entry minimal preset', async () => {
    const manifest = await readJson(path.join(worldbookDir, 'albina-worldbook-packages-v1.manifest.json'));
    const l0 = await readJson(path.join(root, manifest.l0.file));
    expect(l0.entries).toHaveLength(16);
    expect(l0.exclusiveWith).toEqual(manifest.packages.map((item: { id: string }) => item.id));
    expect(manifest.presets.minimal).toEqual(['l0-minimal-card-anchors']);
    expect(manifest.presets.canonicalCore).not.toContain('l0-minimal-card-anchors');
  });

  it('keeps both publication worldbook mirrors synchronized with source packages and L0', async () => {
    const index = await readJson(path.join(worldbookDir, 'limbus-world-coverage-index-v1.json'));
    expect(index.publishedMirrors).toHaveLength(2);
    for (const mirror of index.publishedMirrors) {
      expect(mirror.sourceManifestSha256).toMatch(/^[a-f0-9]{64}$/u);
      expect(mirror.l0).toEqual({ entryCount: 16, entryIdsMatch: true, entryContentMatch: true });
      expect(mirror.packages.every((entry: { matchesSource: boolean }) => entry.matchesSource)).toBe(true);
    }
    expect(index.publishedMirrors.map((mirror: { root: string }) => mirror.root)).toEqual([
      'dist/albina-galgame-card/worldbooks',
      'release/github-cdn-root/dist/albina-galgame-card/worldbooks',
    ]);
  });
});
