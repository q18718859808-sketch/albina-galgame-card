# Task 6 implementation report

Status: complete.

The canonical asset source is `dist/albina-galgame-card`. Release synchronization regenerates only `release/github-cdn-root/dist/albina-galgame-card`, preserves classified historical root files, and keeps the legacy `console/index.js` bundle unchanged.

The pre-change two-tree inventory is recorded in `task-6-inventory.md`: 509 duplicate files, one missing generated-mirror file, 19 mismatched historical root files, and 10 stale historical root files. After synchronization, the generated mirror has zero missing files. The 19 mismatches and 10 stale files remain intentionally untouched and classified.

`scripts/audit-assets.mjs` now deterministically generates `content/asset-manifest-v2.json`, the canonical published manifest copy, `assets/runtime-lookup.json`, and corrected legacy lookup aliases from real canonical paths. The manifest registers 435 asset records, 45 portraits (44 completed strips plus the Fascia compatibility alias), and 162 pending media jobs. Eight unfinished legacy strips are pending image-edit jobs; 154 deterministic story voice references are pending speech jobs for the later production task.

Mutable card and bridge loaders use the single v1.0.44 canonical CDN root. The sprite bridge loads the generated runtime lookup, registers supporting-character and original-CG strips, and observes all character image paths. Root-relative audio references remain only inside the protected legacy compatibility bundle; mutable loaders resolve through the canonical versioned base.

Verification completed successfully: `npm run typecheck`; `npm test` with 13 files and 70 tests; `npm run build`; `npm run release:sync`; `npm run assets:audit`. Final auditor result is zero unresolved references, zero missing generated-mirror files, 19 classified historical mismatches, and 10 classified historical stale files. Re-running generation produced byte-identical manifest and lookup hashes. The normalized Git blob for `dist/albina-galgame-card/console/index.js` matches the index.
