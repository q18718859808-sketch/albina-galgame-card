import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const legacyRoot = resolve(projectRoot, '..', 'albina-cdn-release', 'dist', 'albina-galgame-card', 'worldbooks');
const researchRoot = resolve(projectRoot, 'research', 'legacy-worldbooks');
const contentRoot = resolve(projectRoot, 'content');
const snapshotPath = resolve(researchRoot, 'inventory-v1.json');
const migrationPath = resolve(contentRoot, 'worldbook', 'legacy-worldbook-migration-v1.json');

const jsonFiles = async (dir) => {
  const result = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = resolve(dir, item.name);
    if (item.isDirectory()) result.push(...await jsonFiles(full));
    else if (item.isFile() && extname(item.name).toLowerCase() === '.json') result.push(full);
  }
  return result;
};

const parseEntries = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.entries)) return value.entries;
  if (Array.isArray(value?.data?.entries)) return value.data.entries;
  return [];
};

const entryId = (entry) => entry.uid ?? entry.id ?? entry.extensions?.entry_id ?? null;
const entryText = (entry) => [entry.comment, entry.content, entry.name].filter(Boolean).join('\n');
const reviewStatus = (entry) => entry.review_status ?? entry.extensions?.review_status ?? 'unknown';
const sourceRefs = (entry) => {
  const refs = entry.extensions?.source_refs ?? entry.source_refs ?? [];
  return Array.isArray(refs) ? refs : [];
};
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const loadCurrentIds = async () => {
  const current = await readJson(resolve(projectRoot, 'dist', 'albina-galgame-card', 'worldbooks', 'albina_canon_worldbook_v1.json'));
  return new Set((current.entries ?? []).map(entryId).filter(Boolean));
};

const loadCurrentRevisions = async () => {
  const ledger = await readJson(resolve(contentRoot, 'canon-sources-v1.json'));
  const revisions = new Set();
  for (const source of ledger.sources ?? []) if (source.revisionId != null) revisions.add(String(source.revisionId));
  return revisions;
};

const classify = (entry, currentIds, currentRevisions) => {
  const id = entryId(entry);
  const text = entryText(entry);
  const refs = sourceRefs(entry);
  const hasAu = /\b(?:AU|IF|RP|同人|原创|镜像|重构|存活|路线|玩家|{{user}})\b/i.test(text);
  const hasOldRevision = refs.some((ref) => {
    const revision = ref.revision_id ?? ref.revisionId;
    return revision != null && !currentRevisions.has(String(revision));
  });
  if (id && currentIds.has(id)) return { decision: 'needs-review', reason: 'duplicate-id-with-current-compact-package' };
  if (hasAu) return { decision: 'au-migrate', reason: 'contains-explicit-AU-IF-or-RP-guidance' };
  if (hasOldRevision) return { decision: 'needs-review', reason: 'source-revision-not-present-in-current-ledger' };
  if (reviewStatus(entry) === 'source_checked') return { decision: 'canon-migrate', reason: 'legacy-entry-is-source-checked-and-has-no-AU-marker' };
  return { decision: 'needs-review', reason: 'missing-current-source-backed-review-status' };
};

const main = async () => {
  await mkdir(researchRoot, { recursive: true });
  await mkdir(dirname(migrationPath), { recursive: true });
  const files = await jsonFiles(legacyRoot);
  const currentIds = await loadCurrentIds();
  const currentRevisions = await loadCurrentRevisions();
  const records = [];
  const allEntries = [];
  for (const file of files) {
    const buffer = await readFile(file);
    let parsed;
    try { parsed = JSON.parse(buffer.toString('utf8')); } catch (error) {
      records.push({ file: relative(legacyRoot, file), sha256: sha256(buffer), parseError: String(error) });
      continue;
    }
    const entries = parseEntries(parsed);
    const fileRecord = { file: relative(legacyRoot, file), sha256: sha256(buffer), bytes: buffer.byteLength, entries: entries.length, enabled: 0, disabled: 0 };
    for (const entry of entries) {
      const id = entryId(entry) ?? `${basename(file)}#${allEntries.length}`;
      const status = classify(entry, currentIds, currentRevisions);
      if (entry.disable === true || entry.enabled === false) fileRecord.disabled += 1;
      else fileRecord.enabled += 1;
      allEntries.push({ file: fileRecord.file, id, comment: entry.comment ?? entry.name ?? '', decision: status.decision, reason: status.reason, reviewStatus: reviewStatus(entry), sourceRevisions: sourceRefs(entry).map((ref) => ref.revision_id ?? ref.revisionId).filter(Boolean).map(String) });
    }
    records.push(fileRecord);
  }
  const byId = new Map();
  for (const entry of allEntries) byId.set(entry.id, [...(byId.get(entry.id) ?? []), entry]);
  const duplicates = [...byId.entries()].filter(([, values]) => values.length > 1).map(([id, values]) => ({ id, files: values.map((value) => value.file) }));
  const decisions = Object.fromEntries(['canon-migrate', 'au-migrate', 'needs-review', 'reject'].map((decision) => [decision, allEntries.filter((entry) => entry.decision === decision).length]));
  const inventory = { schemaVersion: 1, generatedAt: new Date().toISOString(), legacyRoot, policy: 'read-only-research-snapshot; no legacy entry is release-approved by this inventory alone', fileCount: files.length, entryCount: allEntries.length, decisions, duplicates, files: records };
  const migration = { schemaVersion: 1, generatedAt: inventory.generatedAt, sourceInventory: 'research/legacy-worldbooks/inventory-v1.json', currentCompactPackage: { path: 'dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json', entryIds: [...currentIds] }, policy: { canon: 'Only entries mapped to current content/canon-claims-v1.json and current source revisions may enter formal release.', au: 'AU/IF and RP guidance remain separate layered packages.', needsReview: 'Legacy source revisions and unsupported claims require manual claim-level audit.', reject: 'Use only after an explicit audit decision; this run does not infer rejection.' }, entries: allEntries };
  await writeFile(snapshotPath, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
  await writeFile(migrationPath, `${JSON.stringify(migration, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ snapshotPath, migrationPath, fileCount: files.length, entryCount: allEntries.length, decisions, duplicateIds: duplicates.length }, null, 2));
};

await main();
