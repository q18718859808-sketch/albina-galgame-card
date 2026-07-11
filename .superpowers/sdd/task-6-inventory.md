# Task 6 release inventory baseline

Captured before any canonical or release-tree asset was modified or removed.

Comparison maps every file below `release/github-cdn-root` to the same canonical-relative path below `dist/albina-galgame-card`. Files below `release/github-cdn-root/dist/albina-galgame-card` have that prefix removed before comparison. Classification uses SHA-256 equality.

| Classification | Count | Meaning |
| --- | ---: | --- |
| duplicate | 509 | Release file has an identical canonical counterpart. |
| missing | 1 | Canonical file is absent from the generated nested release mirror. |
| mismatch | 19 | Release file maps to a canonical path but differs by hash. |
| stale | 10 | Historical release-root file has no canonical counterpart. |

## Missing from generated mirror

`dist/albina-galgame-card/data/game-script-v2.json`

## Mismatched historical root files

`assets/characters/albina/amused.png`
`assets/characters/albina/armored.png`
`assets/characters/albina/combat.png`
`assets/characters/albina/endgame.png`
`assets/characters/albina/fascia-open.png`
`assets/characters/albina/focused.png`
`assets/characters/albina/furious.png`
`assets/characters/albina/golden-bough.png`
`assets/characters/albina/maestro.png`
`assets/characters/albina/normal.png`
`assets/characters/albina/rain.png`
`assets/characters/albina/ring-conspiracy.png`
`assets/characters/albina/shy.png`
`assets/characters/albina/smile.png`
`assets/characters/albina/surgical.png`
`assets/characters/albina/unarmored.png`
`assets/characters/albina/white-canvas.png`
`assets/characters/albina/wounded.png`
`manifest.json`

## Stale historical root files

`README.md`
`card/albina.card.json`
`card/albina.card.png`
`docs/CDN_IMPORT.md`
`docs/import-notes.md`
`docs/install.md`
`presets/generation_profiles.json`
`regex/regex-scripts.json`
`scenes/opening.example.json`
`scenes/scene.schema.json`

The 509 duplicate records are the complete union of identical canonical files in the nested generated mirror and historical root-level flat copies. The inventory auditor reproduces the per-file classification deterministically; historical root files remain untouched by Task 6 release synchronization.
