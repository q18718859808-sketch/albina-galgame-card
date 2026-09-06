#!/usr/bin/env node
/**
 * Build a fail-closed review queue for the 156 substantive P4 candidates.
 *
 * This is a work queue, not a refresh overlay. Legacy source references are
 * preserved as context, but they never satisfy the current-source review
 * contract. A record must be independently reviewed before it can be moved
 * into an overlay consumed by the Limbus audit.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const auditPath = resolve(root, 'content/worldbook/limbus-world-audit-v1.json');
const outputPath = resolve(root, 'content/worldbook/albina-p4-refresh-queue-v1.json');
const P4_FILE = 'albina_p4_article_reviewed_identity_worldbook.json';

export async function buildP4RefreshQueue({ auditFile = auditPath, output = outputPath } = {}) {
  const audit = JSON.parse(await readFile(auditFile, 'utf8'));
  const entries = (audit.refreshQueue?.entries ?? []).filter((entry) => entry.legacyFile === P4_FILE);
  const ids = entries.map((entry) => entry.id);
  if (entries.length === 0) throw new Error(`No pending substantive P4 candidates found for ${P4_FILE}`);
  if (new Set(ids).size !== ids.length) throw new Error('P4 refresh queue contains duplicate target IDs');
  const queue = {
    schemaVersion: 1,
    id: 'albina-p4-refresh-queue-v1',
    status: 'awaiting-current-source-review',
    purpose: 'Fail-closed work queue for current-source review of P4 Identity Story entries.',
    policy: {
      legacyReferencesAreContextOnly: true,
      legacyReferencesSatisfyReview: false,
      overlayPromotionRequires: [
        'current source URL and revision or immutable locator',
        'checkedAt timestamp',
        'at least two atomic facts',
        'narrative boundary separating canon from AU/IF',
        'validated claimIds and targetIds',
        'copyrightMode=paraphrase_only',
      ],
      sourceIndexBridgesExcluded: true,
    },
    sourceFile: P4_FILE,
    targetCount: entries.length,
    targets: entries.map((entry) => ({
      id: entry.id,
      timelinePlacement: entry.timelinePlacement,
      narrativeRole: entry.narrativeRole,
      comment: entry.comment,
      legacySourceRefs: entry.sourceRefs,
      review: {
        status: 'unreviewed',
        currentSourceRefs: [],
        atomicFacts: [],
        narrativeBoundary: '',
        claimIds: [],
        copyrightMode: 'paraphrase_only',
        reviewer: null,
        checkedAt: null,
      },
    })),
  };
  await writeFile(output, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
  return { output, targetCount: queue.targetCount, status: queue.status };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(await buildP4RefreshQueue(), null, 2));
}
