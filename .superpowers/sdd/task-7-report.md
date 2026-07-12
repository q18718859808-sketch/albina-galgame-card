# Task 7 production report

Status: NEEDS_CONTEXT.

Independent-review follow-up is complete. Every video spec now has a required approved canonical keyframe; preparation fails if its mapped asset is absent. The generator reads that keyframe and Seedance submission sends it as an image data URL. Strip validation uses the validator's enforced `alpha` and `frameCount` fields, job loading rejects unknown validation keys, and video specs use exact width/height/FPS/duration fields supported by the validator. A single non-probe music job can no longer bypass the three-success stability gate.

The production pipeline is prepared and reproducible, but this process did not have `PIE_API_KEY`, so no network request, paid generation, staging artifact, validation, promotion, or binary commit was attempted. Pie remains the only configured media provider; no CloseAPI path was added or used.

The new `media prepare-production` command derives production specs from `content/asset-manifest-v2.json`, the authoritative dialogue files, and canonical asset paths. It freezes the character roster, canonical-source outfit rule, six-color palette, eight strip expressions, speaker-to-probed-voice mapping, and music cue sheet. Generated specs contain no credentials or provider responses.

Prepared inventory: 8 `gpt-image-2` edit-first eight-frame strip jobs, 154 `speech-2.8-hd` fixed-dialogue jobs, 29 `seedance-1.5-pro` jobs (prologue, route scenes 3/5/8/11/15, nine endings, OP, and three EDs), 3 `music-2.6` stability probes, and 81 delivery jobs representing 27 cues in master/instrumental/loop variants. Total: 275 jobs plus one index file.

All output targets point to ignored `staging/media/**`. The ledger and production ledger patterns are ignored. Promotion remains validation-gated through the existing media CLI, and archival masters are not assigned web-bundle destinations. The old bundle was not modified.

Verification passed: media tests 24/24, media typecheck, media build, root tests 70/70, root typecheck, and `git diff --check`. Repeated preparation produced byte-identical `index.json` in the determinism test.

When a funded Pie key is available in the current process, regenerate specs with:

`node tools/media/dist/src/cli.js prepare-production --to tools/media/production/jobs`

Then execute the eight image jobs first:

`Get-ChildItem tools/media/production/jobs/job.strip.*.json | ForEach-Object { node tools/media/dist/src/cli.js generate $_.FullName --ledger staging/media/.ledger.json }`

Execute speech after the strip batch:

`Get-ChildItem tools/media/production/jobs/job.voice.*.json | ForEach-Object { node tools/media/dist/src/cli.js generate $_.FullName --ledger staging/media/.ledger.json }`

Execute music probes one at a time and validate each before continuing; only after all three are recorded successful should bulk music run:

`1..3 | ForEach-Object { node tools/media/dist/src/cli.js generate "tools/media/production/jobs/job.music.probe.$_.json" --ledger staging/media/.ledger.json }`

Video and non-probe music specs are complete but intentionally remain unexecuted until credentials and the music gate permit them. Every generated artifact must be validated before `media promote`; only web delivery encodes belong under `dist/albina-galgame-card/assets`, while archival masters stay outside the web tree.

[Verification service unavailable, results not independently verified by the requested MCP services.]

## Seedance keyframe MIME follow-up

The re-review MIME issue is fixed. Seedance keyframes are now classified from their file signature before request construction: the PNG signature produces `image/png`, the JPEG SOI signature produces `image/jpeg`, and unsupported bytes fail locally before `fetch`. This matches the 29 production keyframes, which currently resolve to canonical JPEG assets, while retaining PNG support for future approved keyframes. No network request was made and no canonical or `dist` asset was modified.

Focused adapter verification command: `npm --prefix tools/media test -- adapters.test.ts`. Result: one test file passed, 6/6 tests passed, including PNG, real JPEG-signature bytes, and unsupported-byte rejection.

Type verification command: `npm --prefix tools/media run typecheck`. Result: passed with no diagnostics.

## Locked Pie channel endpoint follow-up

The default provider origin is now the locked Pie channel `https://api.pie-xian.com`. Adapter coverage asserts a representative bearer request (`/v1/images/generations`) and x-api-key request (`/api/v1/task`) both target that origin, while an explicitly injected `baseUrl` remains available for isolated tests. Repository search confirms `api.piapi.ai` is absent from the media implementation and tests.

The eight current edit-first sources were inspected directly. All eight begin with the PNG signature `89504E470D0A1A0A` and have `.png` canonical paths, so the existing multipart `image/png` and `input.png` metadata is correct for this production inventory; no edit multipart change was necessary.
