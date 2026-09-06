# Implementation plan: albina-production-completion

1. Audit current media plans, provider contracts, release gates, card/CDN structure, and dirty-worktree ownership.
2. Prove WisArt image2 and Pie media capabilities with minimal live requests and captured receipts.
3. Migrate the full image provider contract from X666 to WisArt, including production, promotion, readiness, domain schemas, and release status.
4. Generate and review required image assets in dependency order; use chroma-key removal for character portraits.
5. Generate viable Pie assets or consistently remove/degrade unavailable categories and runtime references.
6. Rebuild manifests, canonical dist, card JSON/PNG, release tree, and CDN loader metadata.
7. Run completion audit and every release verification command, fixing regressions until green.
