# Albina final card CDN media and release completion

## Goal

Finish the Albina Route A galgame card as a genuinely installable SillyTavern/Tavern Helper artifact with a proven immutable CDN loader, coherent static media fallback, reviewed WisArt gpt-image-2 visual assets, and a reproducible final release gate.

## Scope

Current card/template/build/release artifacts, Tavern Helper loader and 8-bit reference contract, story/media manifests and receipts, WisArt visual production/review pipeline, release/tag verification, PNG metadata round-trip, desktop/mobile runtime smoke tests, and task-package verification evidence.

## Acceptance criteria

- [ ] Card JSON and embedded PNG metadata contain exactly one enabled Tavern Helper script using `import 'immutable-tagged-URL'\n`, with the same object shape as the working 8-bit reference (`button`, empty `data`, empty `variables`).
- [ ] All runtime media references resolve to shipped immutable assets; unavailable Pie video planning is removed from runtime behavior and scenes use their static CG/background fallback.
- [ ] WisArt production stays locked to `gpt-image-2` image edits; identity/style inputs remain role-separated; required pilot images pass strict human review before any bulk promotion.
- [ ] Canonical source, dist, release mirror, card JSON, and card PNG agree byte-for-byte or by defined metadata equivalence.
- [ ] Route A state/save/reload behavior, desktop 1440x900, mobile 390x844, loader mount, MIME, and console-error checks pass against the immutable tag under verification.
- [ ] Project tests, typecheck, build, security scan, strict media readiness, release integrity, and task manifest verification all pass.

## Non-goals

Do not overwrite prior immutable tags, use a moving branch URL, switch image models or providers, auto-approve generated visual identity, reintroduce unavailable video/audio generation, expose API keys, or claim a live SillyTavern import without performing it.
