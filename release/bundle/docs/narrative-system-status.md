# Narrative System Status

Audit date: 2026-06-04

This document records the current narrative coverage boundary for v1.0.17 local iteration. It is based only on:

- `docs/worldbook-source-status.md`
- `docs/worldbook-source-coverage-audit.json`
- `docs/p4-expanded-bridge-report.json`
- `docs/p4-article-reviewed-deep-report.json`
- `frontend/src/core/scenes.ts`

## Current Coverage

| Area | Status | Evidence |
| --- | --- | --- |
| Title-index coverage | Pass | `worldbook-source-coverage-audit.json` reports `referenced_source_title_count == manifest_page_count == 2142`, `unreferenced_manifest_title_count == 0`, and `passed == true`. |
| Audited source refs | Pass | The audited source/bridge layer has 2089 entries across 20 worldbooks, and all 2089 entries have source refs. This includes the v1.0.17 P4 article-reviewed identity pack. |
| Deep-written coverage | Partial | Non-P4 hand-written/source-backed packs contain 195 entries covering 260 source titles. The P4 bridge pack contains 1882 entries/titles; all 1882 are now expanded bridge prompts. v1.0.17 promotes 12 high-impact P4 identity-story titles into article-reviewed paraphrase seeds. This is stronger than title-taxonomy bridge prose, but still not full P4 article-level restoration. |
| Frontend scene coverage | Limited | `frontend/src/core/scenes.ts` currently defines 15 scenes across 3 routes. |

## Frontend Scene Index

`frontend/src/core/scenes.ts` currently defines these scene IDs:

- `opening_001`
- `white_canvas_001`
- `white_canvas_002`
- `white_canvas_003`
- `white_canvas_004`
- `white_canvas_005`
- `golden_bough_001`
- `golden_bough_002`
- `golden_bough_003`
- `golden_bough_004`
- `golden_bough_005`
- `ring_conspiracy_001`
- `ring_conspiracy_002`
- `ring_conspiracy_003`
- `ring_conspiracy_004`

Routes present in the scene file:

- `white_canvas`
- `golden_bough_rebuild`
- `ring_conspiracy`

The frontend scene count is therefore 15. This is an expanded interactive route shell, not a full frontend adaptation of every indexed wiki title.

## Why This Is Not Full Restoration

The project may claim full manifest-title coverage for the audited source/bridge layer, because all 2142 manifest titles are referenced.

The project must not claim full deep-lore restoration yet, because:

- The allpages manifest stores page metadata only; it does not store raw article text.
- The P4 bridge layer has 1882 entries; all 1882 are expanded bridge prompts. A v1.0.17 subset of 12 high-impact identity-story titles now has raw-page review evidence and original paraphrase seeds, but the remaining P4 bridge layer still needs article-level review.
- The current non-P4 deep/source-backed layer covers 260 titles through 195 entries, which is meaningful coverage but not enough to claim full article-level restoration.
- `worldbook-source-status.md` still lists the main static worldbook as not source-certified.
- `worldbook-source-status.md` still lists 123 quote-marker-heavy static entries needing manual copyright/style review.
- Full deep-lore completion still requires replacing or reviewing bridge entries against article-level evidence where title-taxonomy prompts are insufficient.
- The frontend currently exposes 15 scenes, so it does not represent a full playable restoration of the 2142-title source index.

## v1.0.17 Local Iteration Items

- Pass: title-index coverage is auditable at 2142/2142 manifest titles.
- Pass: no unreferenced manifest titles remain in `worldbook-source-coverage-audit.json`.
- Pass: source/bridge entries are auditable through source refs at 2089/2089 entries.
- Pass: all 1882 P4 entries are expanded into denser RP-ready bridge prompts and tracked in `docs/p4-expanded-bridge-report.json`.
- Pass: 12 high-impact P4 identity-story titles are promoted into article-reviewed paraphrase seeds in `worldbooks/albina_p4_article_reviewed_identity_worldbook.json`; raw article text is not stored.
- Pass with wording constraint: release notes may say "full manifest-title coverage" and "all P4 bridge prompts expanded"; they must not imply every P4 entry is a deep hand-written article paraphrase.
- Pass with scope constraint: frontend scene coverage is documented as 15 scenes across 3 routes.
- Not accepted as complete: any claim of full deep-lore restoration, full article-level paraphrase, or full frontend story implementation.

## Maintenance Rule

When a P4 bridge entry is expanded into deeper source-backed prose, keep `extensions.source_refs`, rerun the source audits, and update this file plus `docs/narrative-system-status.json` with the new deep-written and bridge counts.
