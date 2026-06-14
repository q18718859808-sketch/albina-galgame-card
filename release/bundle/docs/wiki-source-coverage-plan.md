# Wiki Source Coverage Plan

Primary source domain: `https://limbuscompany.wiki.gg/`

Initial Albina scope:

- Albina character page
- Albina enemy page
- Albina sprites page
- The Ring page
- House of Spiders / Callisto related pages, if present
- Canto IX related pages, if present
- Limbus Company organization pages
- City, Backstreets, Five Fingers, and Sinner pages needed for RP context

Coverage tiers:

- Tier 0: Albina-specific identity, affiliation, enemy mechanics, and appearance.
- Tier 1: The Ring, House of Spiders, Callisto, Fascia, and Canto IX context.
- Tier 2: Limbus Company operations, Dante, Sinners, and bus-side RP context.
- Tier 3: City-wide setting terms required by routes and worldbook triggers.

No tier is complete until the source manifest lists the page metadata and the
worldbook audit maps every canon-facing entry to source references or marks it
as bridge/fanon.

Full-site metadata coverage:

- Use `tools/collect_limbus_wiki_metadata.py --allpages --out docs/limbus_wiki_allpages_manifest.json`.
- This stores page metadata only: title, pageid, length, last revision id, touched time, and URL.
- It does not store article text and is not a substitute for manual paraphrase writing.
- Use `tools/audit_source_coverage.py` to compare worldbook `source_refs` against the manifest.
- Use `tools/build_lore_rewrite_queue.py` to turn page metadata into a manual rewrite queue.
