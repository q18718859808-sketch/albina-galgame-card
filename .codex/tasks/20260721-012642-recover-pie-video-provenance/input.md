# recover-pie-video-provenance

## Goal

Recover auditable provenance for the 24 already-packaged Pie Seedance videos without making provider requests or claiming that the artifacts were generated from the current v2 contracts.

## Scope

- Bind each production-plan video to its historical job specification at commit `bfd4ffc`.
- Require the matching completed entry and real `providerJobId` from `tools/media/production/.ledger.json`.
- Verify the surviving master, runtime, desktop, and packaged delivery hashes.
- Materialize 48 strict promotion receipts plus a recovery evidence index.
- Freeze the 24 production-plan jobs so they are not treated as pending regeneration.
- Keep model-output rights explicitly unverified.

## Acceptance criteria

- [ ] All 24 plan jobs match historical specs and completed ledger records.
- [ ] All 48 packaged runtime/desktop hashes match their staging counterparts.
- [ ] All 48 receipts parse and attach to the manifest.
- [ ] Recovery is idempotent and conflicts fail closed.
- [ ] Frozen historical videos are excluded from pending generation.
- [ ] Rights remain unverified and no provider API is called.
- [ ] All focused verification commands pass.

## Non-goals

- Regenerating or transcoding any video.
- Calling Pie or storing API credentials.
- Changing WisArt image jobs or image files.
- Claiming provider redistribution rights are verified.
