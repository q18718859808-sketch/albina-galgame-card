# Implementation plan: Albina final card CDN media and release completion

1. Inspect the dirty worktree, current media readiness output, card/template/PNG metadata, release mirror, public verifier, and working 8-bit Tavern Helper contract.
2. Add focused failing regression tests for every current mismatch: helper script shape, stale video runtime references, and hard-coded release tag verification.
3. Remove runtime video coupling in the authoritative story/media compile path and preserve static CG/background presentation.
4. Consolidate the Tavern Helper contract in the canonical card builder and regenerate derived artifacts without moving an old tag.
5. Keep WisArt gpt-image-2 pilot generation behind strict human review; only promote reviewed production assets.
6. Rebuild canonical dist/release/card artifacts, then run focused and full verification including desktop/mobile browser checks.
7. Audit every acceptance item against current-state evidence and record verified artifacts, failures, and any genuine external blocker.
