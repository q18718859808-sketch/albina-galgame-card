# Worldbook Coverage Index

`content/worldbook/limbus-world-coverage-index-v1.json` is the machine-readable coverage index for the full Limbus worldbook audit and its unresolved substantive entries. It is generated from `content/worldbook/limbus-world-audit-v1.json` and the materialized package boundaries by `node scripts/build-worldbook-coverage-index.mjs`.

The current ledger records 304 `canon-candidate` entries and 258 `needs-review` entries. The first group has source references but still requires current-source and atomic-claim rechecking. The second group remains quarantined when a source reference is absent or runtime separation is unresolved. The index copies source references, source-package SHA-256 values, timeline placement, and review reasons from the audit; it does not invent URLs, revision IDs, checked dates, or canonical decisions.

The `fullCoverage` block covers all 2,481 audited records, split into 599 substantive entries and 1,882 source-index bridges. Its timeline tables preserve the audit's Canto I-X, Intervallo-or-core, and cross-timeline counts. The AU section deliberately separates 1,213 AU-marked records from the 6 substantive entries in the disabled AU/IF package; the other 1,207 records are bridge/index records and are not narrative AU content. The package boundary block records the 258-entry disabled quarantine and 1,882-entry disabled source index.

The `preservedL0` block records the SHA-256 and entry IDs of `content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json`. Its entry count must remain exactly 16. Those entries are the compact embedded card anchors and are intentionally separate from the unresolved coverage queue.

The `publishedMirrors` block checks both `dist/albina-galgame-card/worldbooks` and `release/github-cdn-root/dist/albina-galgame-card/worldbooks`. It verifies the release manifest source hash, the published core/Plot/AU package hashes and entry counts, and the published L0 UID order. A stale or missing publication file fails index generation rather than silently treating an unsynchronized release tree as complete.

Regenerate the index after changing the audit or L0 package, then run the focused worldbook tests:

```text
npm run worldbook:coverage
npx vitest run tests/worldbook/limbus-audit.test.ts tests/worldbook/layered-worldbooks.test.ts
```
