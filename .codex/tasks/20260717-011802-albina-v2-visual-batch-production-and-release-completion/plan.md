# Implementation plan: Albina v2 visual batch production and release completion

1. Explore: freeze the dirty-worktree and protected `tools/**` baselines; audit the visual producer, prompt plan, canon-source index, receipts, readiness and current release status.
2. RED: run syntax, type, visual-production and security tests against the newly added chroma-key path; capture any actual failure before changing behavior.
3. GREEN: fix only demonstrated defects in prompt override, chroma-key conversion, alpha validation, ledger or review state handling.
4. Provider probe and pilot: run redacted model-list checks for all user-supplied candidate endpoints, then exactly one original-AU `protagonist.serious` image job on a channel whose generation contract is proven; inspect the source and alpha delivery, then approve or reject it through the independent review command. Never retry an ambiguous request automatically.
5. Canon lock: bind each canon character to fixed official visual references and hashes; keep unverified canon jobs paused; correct CG scene mappings and add missing canon-recap visual tasks.
6. Batch production: generate and review reference roots first, then portrait edits, then CG edits; stop on ambiguous API results or quality failures and never auto-promote.
7. Video production: use only approved image keyframes for Pie Seedance, preserving masters and generating 1080p/720p plus static fallback.
8. Integration: update manifest, receipts, card/build outputs, release status and tests without modifying the protected `tools/**` production site.
9. Verification: run `npm run verify`, visual/media readiness checks, full E2E and Tavern Helper import checks; perform an independent security and rights review.
10. Release: use the user's explicit push authorization for RC checkpoints; only after every final gate is true, explicitly stage product files, commit, push, create `v2.0.0`, verify jsDelivr, and run the Codex engineering verifier to `verified`.
