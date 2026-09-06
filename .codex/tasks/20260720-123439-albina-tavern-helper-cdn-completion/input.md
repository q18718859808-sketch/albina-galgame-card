# Albina Tavern Helper CDN Completion

## Goal

Complete the importable Albina galgame card's Tavern Helper CDN integration using proven local card formats, including the previously working Albina releases and the 8-bit reference card, then produce verified canonical card and release artifacts.

## Scope

- Inspect card PNG/JSON embedded metadata and extension fields in current and proven references.
- Correct Tavern Helper script records, enabled flags, load ordering, CDN URLs, and immutable/fallback URL policy.
- Keep `dist/albina-galgame-card` authoritative and regenerate `card/` plus `release/github-cdn-root` through existing build scripts.
- Add regression tests for the exact import payload and CDN bootstrap contract.
- Verify unit tests, typecheck, production build, release audit, card round-trip, and browser harness behavior.

## Acceptance criteria

- [x] Capability tests are defined and pass.
- [x] Regression checks are defined and pass.
- [x] All verification commands pass.
- [x] The final PNG and JSON card contain the same valid Tavern Helper script payload.
- [x] CDN script URLs use the proven format and resolve to expected JavaScript/CSS assets.
- [x] Existing story/media references and user-generated production jobs are preserved.

## Non-goals

- Regenerating portraits, CGs, music, speech, or videos.
- Changing provider credentials or regenerating media.
- Refactoring the Albina runtime beyond failures required to make the card import and CDN bootstrap work.
