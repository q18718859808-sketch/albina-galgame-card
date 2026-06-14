# Next Batch Integration Plan

Scope: release integration preflight for the next 4 source-backed worldbook batches after they land. This file is the only file changed in this pass.

## Shortest Main-Thread Steps

1. Freeze the handoff set before editing generated or shared files.
   - Record the 4 new source worldbook paths, their matching source manifests, and the exact queue titles each batch claims.
   - Do not merge a batch unless every new canon-facing entry has `extensions.source_refs` with `source_title`, `source_url`, `revision_id`, `verified_at`, `evidence_kind`, and `claim_status`.
   - Do not store article text, tables, dialogue dumps, or long quote runs in worldbook content. Entries must be original RP-ready paraphrase.

2. Add the 4 source worldbooks to `tools/build_pure_import_artifacts.py`.
   - Extend `WORLD_BOOK_OUTPUTS` with one mapping per new source file:

```python
"albina_<batch_slug>_worldbook.json": (
    "albina_<batch_slug>_worldbook.pure.json",
    "<immersive user-facing pack name>",
    "<immersive user-facing pack description>",
),
```

   - Keep the source key equal to the filename under `worldbooks/`.
   - Keep the pure output filename under `worldbooks/pure/`.
   - Do not put "source", "metadata", "wiki", "worldbook", "来源", "审计", "制卡", or similar engineering terms in the pure pack name or description. Those strings are audited in pure import artifacts.
   - No separate pure-import manifest edit is normally needed: `scripts/build_pure_import_bundle.py` regenerates `release/pure-import/manifest.json` and its `background_packs` from `worldbooks/pure/*.json`.

3. Update `docs/limbus_lore_rewrite_queue.json` after audits pass.
   - For each covered item, replace `status: "pending_manual_paraphrase"` with a stable batch-specific status, following the existing pattern:
     - `source_backed_p2_identity_association_written`
     - `source_backed_p2_<batch_slug>_written`
     - `source_backed_p3_<batch_slug>_written`
   - Add or append `covered_by: ["worldbooks/albina_<batch_slug>_worldbook.json"]`.
   - Add `review_status: "source_checked_paraphrase_seed"` or the stricter status used by that batch.
   - Preserve `copyright_mode: "metadata_only_until_manual_rewrite"`.
   - Recompute `status_summary`: decrement `pending_manual_paraphrase`, increment the new batch status counts, and leave unrelated statuses untouched.
   - If a title is already covered by another batch, append to `covered_by`; do not remove the earlier path unless the earlier coverage was wrong and reviewed.

4. Keep pure import clean.
   - Source worldbooks may keep source metadata in `extensions.source_refs`; pure artifacts must not.
   - `tools/build_pure_import_artifacts.py` strips these keys recursively: `source`, `sources`, `source_ref`, `source_refs`, `source_title`, `source_url`, `revision`, `revision_id`, `verified_at`, `evidence_kind`, `claim_status`, `copyright_mode`, `review_status`, `rp_scope`, and `metadata`.
   - The pure audit also scans JSON keys and string values for forbidden engineering terms including `wiki`, `source`, `Source`, `SOURCE`, `revision`, `metadata`, `source_refs`, `source_title`, `source_url`, `verified_at`, `evidence_kind`, `claim_status`, `copyright_mode`, `review_status`, `Worldbook`, and `worldbook`, plus Chinese equivalents such as "来源", "资料来源", "源文件", "官方资料", "审计", "追溯", "归档", "制卡", "页面元数据", "世界书", "条目", "系统提示", and "设定集".
   - Treat pure names, descriptions, comments, entry content, card notes, and generated manifest strings as user-facing RP text only.

## Validation Command Order

Use this order after all 4 new batches are merged and `WORLD_BOOK_OUTPUTS` / queue updates are made:

```powershell
python -m json.tool docs\limbus_lore_rewrite_queue.json

python tools\audit_worldbook_sources.py worldbooks\albina_<batch_1>_worldbook.json --json-out docs\<batch_1>-worldbook-source-audit.json
python tools\audit_worldbook_sources.py worldbooks\albina_<batch_2>_worldbook.json --json-out docs\<batch_2>-worldbook-source-audit.json
python tools\audit_worldbook_sources.py worldbooks\albina_<batch_3>_worldbook.json --json-out docs\<batch_3>-worldbook-source-audit.json
python tools\audit_worldbook_sources.py worldbooks\albina_<batch_4>_worldbook.json --json-out docs\<batch_4>-worldbook-source-audit.json

python tools\audit_source_coverage.py --manifest docs\limbus_wiki_allpages_manifest.json `
  --worldbook worldbooks\albina_verified_seed_worldbook.json `
  --worldbook worldbooks\albina_p0_core_worldbook.json `
  --worldbook worldbooks\albina_p1_limbus_core_worldbook.json `
  --worldbook worldbooks\albina_p1_sinner_voice_worldbook.json `
  --worldbook worldbooks\albina_p1_canto_ix_scene_worldbook.json `
  --worldbook worldbooks\albina_p2_canto_backbone_worldbook.json `
  --worldbook worldbooks\albina_p2_enemy_ecology_worldbook.json `
  --worldbook worldbooks\albina_<batch_1>_worldbook.json `
  --worldbook worldbooks\albina_<batch_2>_worldbook.json `
  --worldbook worldbooks\albina_<batch_3>_worldbook.json `
  --worldbook worldbooks\albina_<batch_4>_worldbook.json `
  --json-out docs\worldbook-source-coverage-audit.json

python tools\build_pure_import_artifacts.py --root .
python tools\audit_pure_import_artifacts.py --root . --json-out docs\pure-import-audit.json

python scripts\validate_assets.py .
python scripts\st_card_tool.py validate card\albina.card.png
python scripts\validate_project.py .

python scripts\build_release_bundle.py .
python scripts\build_pure_import_bundle.py

python scripts\audit_release.py .
python scripts\audit_cdn_bundle.py .
python tools\audit_pure_import_artifacts.py --root release\pure-import --json-out docs\pure-import-release-audit.json
```

Notes:

- `scripts/build_release_bundle.py` runs `npm install --no-audit --no-fund` and `npm run build` in `frontend/`, then overwrites `dist/<projectId>` and `release/bundle`.
- `scripts/build_pure_import_bundle.py` overwrites `release/pure-import`, copies `worldbooks/pure`, and regenerates `release/pure-import/manifest.json`.
- Run `tools/build_pure_import_artifacts.py` before either bundle script so generated pure files are included in `dist`, `release/bundle`, and `release/pure-import`.

## Risks

- Concurrent writers: bundle scripts delete and recreate `dist`, `release/bundle`, and `release/pure-import`. Main thread should coordinate a short write freeze before running them.
- Missing `WORLD_BOOK_OUTPUTS` entries: source worldbooks will be copied into the full release bundle, but no matching `.pure.json` will be generated or listed in the pure-import manifest.
- Queue drift: `status_summary` can become false if items are marked covered without recomputing counts, or if `covered_by` paths do not exactly match `worldbooks/<filename>.json`.
- Metadata leakage: adding clean source refs to source files is correct, but any user-facing pure name, description, card note, or entry prose containing "wiki/source/metadata/worldbook" or Chinese equivalents can fail `audit_pure_import_artifacts.py`.
- Source audit false confidence: `tools/audit_worldbook_sources.py` verifies required metadata fields and quote/mojibake heuristics; it does not prove the prose is a good paraphrase. Human review remains required for copied structure, long quotes, or canon/bridge confusion.
- Release-copy surface: `scripts/build_release_bundle.py` copies `docs` and `tools` into `release/bundle`. Do not put raw article text or private scratch material in docs before building.
- Existing blocker remains unless explicitly fixed: `albina_rp_static_worldbook.json` is large but not source-certified; do not claim full source completion while its canon-facing entries lack required source refs.
