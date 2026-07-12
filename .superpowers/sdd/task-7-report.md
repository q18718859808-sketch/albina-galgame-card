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

## Billing-safe resume and image-edit dimensions follow-up

Completed ledger jobs are now billing-safe to resume. A completed job is skipped only after its declared output is revalidated successfully. Missing or invalid completed output is marked stale and regenerated; failed jobs continue through the normal bounded retry path. Video resume behavior remains unchanged because an existing provider job ID is still reused by the video polling path.

Production inventory now skips non-job JSON such as `index.json` and emits a `status: "skipped"` row with the validation reason rather than aborting the entire listing.

Image editing now carries each job's width and height through the generator into Pie multipart fields. The request includes exact `size`, `n=1`, `quality=high`, and `output_format=png`; the `high` setting matches the repository's existing locked Pie image implementation. Adapter tests assert the eight-frame production size `4096x512` exactly.

Focused verification command: `npm --prefix tools/media test -- adapters.test.ts orchestration.test.ts cli.test.ts`. Result: 3 files passed, 25/25 tests passed. Type verification command: `npm --prefix tools/media run typecheck`. Result: passed.

## Atomic paid-job claims follow-up

Paid jobs now enter through a single ledger-lock claim operation. The claim returns `claimed`, `already-completed`, or `busy`, records a lease owner and expiry, prevents concurrent generators from issuing duplicate provider calls, and permits explicit reclaim only after lease expiry. Completed artifacts remain validation-gated, stale outputs regenerate, and existing Seedance provider job IDs continue to resume polling.

There remains an unavoidable narrow crash window after a provider accepts a new asynchronous video submission but before its returned provider job ID is persisted. The implementation continues to minimize this window by writing the ID immediately after submission and before polling. Synchronous image, speech, and music calls are protected against concurrent and fresh-running duplicate execution by the lease, though an operator should investigate rather than reclaim a lease after an uncertain process crash.

Inventory now skips only the exact production `index.json`. Any other malformed or invalid job JSON throws and causes a nonzero CLI exit instead of being silently omitted.

Focused verification command: `npm --prefix tools/media test -- orchestration.test.ts cli.test.ts`. Result: 2 files passed, 22/22 tests passed. Type verification command: `npm --prefix tools/media run typecheck`. Result: passed.

## Lease fencing and explicit busy follow-up

Claims now carry a monotonic fencing token in addition to owner and expiry. Every owner-sensitive provider-ID, ambiguous, failed, and completed ledger write verifies the current owner/token atomically. Final artifacts are downloaded or written to an owner-unique temporary path, validated there, and renamed to the delivery path only while holding the ledger lock after a successful fence check. A reclaimed old worker therefore cannot overwrite the newer worker's output or ledger state.

Video polling renews its lease on every poll cycle, and the initial claim covers synchronous paid operations. If a synchronous provider call remains in flight beyond the lease and an operator explicitly reclaims it, duplicate provider execution cannot be prevented because the remote call cannot be cancelled transactionally; fencing guarantees the older result is discarded and cannot commit. Reclaiming an uncertain synchronous lease should therefore remain an explicit operator decision.

Active leases now surface as `JobBusyError`. CLI generation rejects, emits no success output, and exits nonzero instead of silently pretending the job was generated.

The deterministic fencing test expires worker A's lease, lets worker B reclaim and commit, then resolves A. A receives a lost-claim error, B's bytes remain in the final output, and the ledger retains B's completed token.

Focused verification command: `npm --prefix tools/media test -- orchestration.test.ts cli.test.ts`. Result: 2 files passed, 24/24 tests passed. Type verification command: `npm --prefix tools/media run typecheck`. Result: passed.

## Completed-artifact CAS and probe fencing follow-up

The completed-invalid transition is now compare-and-swap protected by the exact completed `claimToken` and `updatedAt` observed before validation. If another worker marks stale, regenerates, and completes while the first worker is paused, the first worker's stale CAS conflicts; it re-reads, validates the new artifact, and exits without a provider call or ledger overwrite.

Music probe streak changes are now coupled to the fenced outcome transaction. A successful probe increments the streak in the same locked transaction that commits its validated artifact and completed state. Failed or ambiguous probes reset the streak only while their owner/token remains current. A lost-claim worker can neither increment nor reset the global probe gate.

The deterministic CAS test pauses worker A after validating an old completed artifact as invalid, lets worker B regenerate and complete, then resumes A. A makes zero provider calls and preserves B's completed token and artifact. A separate lost-claim probe test confirms the global streak remains unchanged.

Focused verification command: `npm --prefix tools/media test -- orchestration.test.ts`. Result: 1 file passed, 20/20 tests passed. Type verification command: `npm --prefix tools/media run typecheck`. Result: passed.

## Ambiguous music cooldown fencing follow-up

Ambiguous music handling is now one atomic claim-fenced ledger transaction. `markClaimedMusicAmbiguous` first verifies the current owner/token, then marks the job ambiguous, sets the five-minute cooldown, and resets consecutive valid probes together. The former unfenced cooldown mutation entry point was removed.

The deterministic lost-claim test lets B reclaim the music job before A attempts its ambiguous write. A receives a lost-claim error, while B's running job, the zero cooldown, and the existing probe streak remain unchanged.

Focused verification command: `npm --prefix tools/media test -- orchestration.test.ts cli.test.ts`. Result: 2 files passed, 27/27 tests passed. Type verification command: `npm --prefix tools/media run typecheck`. Result: passed.
