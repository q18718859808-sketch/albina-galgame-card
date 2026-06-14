# Worldbook Source Status

Generated during the 2026-06-01 source-audit pass. Updated on 2026-06-04 after the v1.0.17 P4 article-reviewed identity-story pass.

Current validated facts:

- Route A frontend card verification passes with zero hard failures.
- `limbus_wiki_allpages_manifest.json` covers 2142 unique main-namespace wiki pages.
- The allpages manifest stores metadata only and does not store article text.
- `albina_verified_seed_worldbook.json` has 15 hand-written source-backed entries.
- The verified seed references 35 wiki source titles and passes source-ref audit.
- `albina_p0_core_worldbook.json` has 8 additional P0 hand-written entries and passes source-ref audit.
- `albina_p1_limbus_core_worldbook.json` has 14 additional P1 hand-written entries and passes source-ref audit.
- `albina_p1_sinner_voice_worldbook.json` has 12 additional P1 voice-calibration entries and passes source-ref audit.
- `albina_p1_canto_ix_scene_worldbook.json` has 7 additional Canto IX scene-structure entries and passes source-ref audit.
- `albina_p2_canto_backbone_worldbook.json` has 10 additional P2 main-canto backbone entries and passes source-ref audit.
- `albina_p2_enemy_ecology_worldbook.json` has 9 additional P2 enemy-ecology entries, covers 17 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p2_identity_association_worldbook.json` has 10 additional P2 identity/association entries, covers 24 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p2_event_support_worldbook.json` has 14 additional P2 event/support entries, covers 14 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p2_urban_factions_worldbook.json` has 9 additional P2 urban-faction entries, covers 14 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p3_bloodfiend_abnormality_worldbook.json` has 7 additional P3 bloodfiend/abnormality entries, covers 14 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p3_ego_sin_worldbook.json` has 10 additional P3 E.G.O/sin/status entries, covers 14 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p3_ego_abnormality_anchors_worldbook.json` has 10 additional P3 E.G.O/abnormality-anchor entries, covers 14 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p2_named_character_ecology_worldbook.json` has 10 additional P2 named-character visual ecology entries, covers 18 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p2_theme_atmosphere_worldbook.json` has 20 additional P2 theme-atmosphere entries, covers 20 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p2_ego_identities_worldbook.json` has 8 additional P2 E.G.O identity-performance entries, covers 12 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p3_combat_mechanics_worldbook.json` has 10 additional P3 combat-mechanics entries, covers 15 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p2_intervallo_story_worldbook.json` has 12 additional P2 Intervallo story-structure entries, covers 12 wiki pages, and passes both source-ref and source-coverage audits.
- `albina_p4_manifest_bridge_worldbook.json` has 1882 additional original route-bridge entries for the remaining manifest titles and passes source-ref audit; all 1882 entries are now expanded bridge prompts tracked by `docs/p4-expanded-bridge-report.json`.
- `albina_p4_article_reviewed_identity_worldbook.json` has 12 additional high-impact P4 identity-story entries, each checked against raw page content and rewritten as original RP-ready paraphrase seeds; it passes source-ref audit and stores no raw article text.
- Source-backed/bridge worldbooks now contain 2089 audited entries across 20 worldbooks and all 2142 referenced wiki titles.
- `worldbook-source-coverage-audit.json` now verifies `referenced_source_title_count == manifest_page_count == 2142` and `unreferenced_manifest_title_count == 0`.
- `albina_rp_static_worldbook.json` is large enough for the 200k+ character target, but is not yet source-certified.

Current one-hour delivery scope:

- The current deliverable is a rebuilt/importable frontend card with the validated source-backed and P4 bridge packs listed above.
- The source-backed/bridge layer currently covers 2142 of 2142 manifest titles.
- The 1882 P4 entries are original RP route-bridge prompts built from title taxonomy and page metadata, not raw article text; all 1882 are expanded bridge prompts. A v1.0.17 subset of 12 identity-story titles now has raw-page review evidence and original paraphrase seeds.
- Release wording may claim full manifest-title coverage, but must not imply every P4 entry is a deep hand-written article paraphrase.

Current blockers to completion:

- Main static worldbook: 258 entries, 0 entries with required source refs.
- Main static worldbook: 123 quote-marker-heavy entries need manual copyright/style review.
- Full deep-lore completion requires replacing or reviewing bridge entries against stronger evidence where the title-taxonomy prompt is not enough. Raw article dumps remain forbidden; v1.0.17 proves the no-dump article-review workflow for 12 P4 identity-story titles.

Rewrite queue:

- `P0_albina_core`: 7 pages
- `P1_limbus_core`: 47 pages
- `P2_rp_support`: 472 pages
- `P3_backlog`: 1616 pages
- Queue status: 260 titles are covered by seed/P0/P1/P2/P3 source-backed entries; the remaining 1882 titles are covered by P4 bridge entries and no longer fail manifest-title coverage. All 1882 P4 titles are expanded bridge prompts; 12 of those P4 titles now have article-reviewed paraphrase seeds, leaving 1870 P4 titles still needing article-level review before any deep-lore restoration claim.

Canonical next rule:

For each P4 bridge entry that needs higher fidelity, replace the compact route-bridge prose with richer original RP-ready paraphrase, keep `extensions.source_refs`, record whether it is expanded-bridge or article-reviewed deep prose, and rerun both source audits. Do not store source article text in the card.
