# albina-production-completion

## Goal

Complete the Albina v2 Galgame character card as an importable, CDN-backed Tavern Helper card with a coherent and publishable media plan.

## Scope

- Use WisArt OpenAI-compatible `gpt-image-2` as the only image-generation provider.
- Use Pie for speech, audio/music, and video only when live probes prove the configured model is usable.
- Remove or degrade unavailable Pie media consistently across plans, manifests, runtime references, readiness, and release status.
- Produce, review, promote, and index required visual assets.
- Preserve the Tavern Helper `data.extensions.tavern_helper.scripts[]` CDN import contract proven by the 8-bit reference card.
- Rebuild the canonical card, PNG card, distribution tree, and release mirror.

## Acceptance criteria

- [ ] WisArt `gpt-image-2` live generation succeeds and every promoted image has verified bytes, dimensions, provenance, and review state.
- [ ] Pie speech/audio/video models are proven usable or the unavailable asset category is removed/degraded without dangling runtime references.
- [ ] Strict media readiness reports no blockers for the final declared scope.
- [ ] `card/albina.card.json` and the PNG character card embed the correct Tavern Helper CDN script object and match the 8-bit structural pattern.
- [ ] CDN loader and card URLs resolve successfully from the release tag.
- [ ] Canonical dist, release mirror, manifests, and release status agree.
- [ ] Project verification commands required by the final release gate pass.

## Non-goals

- Substituting any image model other than `gpt-image-2`.
- Claiming redistribution rights that are not evidenced.
- Preserving optional music/video features when their production provider is persistently unavailable.
- Reverting unrelated user-authored worktree changes.
