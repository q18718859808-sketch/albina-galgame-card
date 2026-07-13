# Albina v2 Complete Edition Re-anchor Plan

## Current checkpoint

The local branch contains the rebuilt authoritative runtime, deterministic story graph,
fixed voice library, and approved Seedance video delivery profiles. It is still a preview:
eight portrait strips and the Music 2.6 catalog remain unproduced, the public v2 tag does
not exist, and the current asset audit does not validate every authoritative reference.

## Non-negotiable constraints

- Albina remains the story and state authority. The runtime consumes approved local/CDN
  assets only and never contains credentials or media-provider endpoints.
- Provider code, request ledgers, raw prompts, and staging artifacts stay outside the
  publishable card tree.
- Never send a credential to a plaintext HTTP endpoint. HHHl and Grok remain disabled
  until an HTTPS contract is verified with redacted fixtures.
- Preserve user-generated production specs already present in the worktree.

## Tasks

### Task 1: Repair authoritative story-to-gallery asset references

- [ ] Normalize every `effects.unlockCg` to a manifest image ID.
- [ ] Generate semantic aliases for physical CGs that are intentionally unlockable.
- [ ] Add explicit pending production records for `cg.mirror_broken` and
  `cg.rain_reflection`; do not silently substitute unrelated art.
- [ ] Validate choice result voice, video, desktop video, and gallery unlock references
  against the manifest and include them in the asset auditor.
- [ ] Add eligibility-path and gallery-unlock regression tests.

### Task 2: Enforce the offline release boundary and credential hygiene

- [ ] Remove legacy runtime image-generation and untrusted remote-script paths from the
  publishable tree.
- [ ] Ignore real environment files while retaining the redacted example.
- [ ] Strengthen secret and runtime-provider endpoint scanning, including generated release
  trees.
- [ ] Update release documentation so preview and immutable release state cannot disagree.

### Task 3: Make offline production provider-explicit

- [ ] Add provider/model/prompt-version fields to every new production job and ledger
  handle, preserving existing Pie jobs as the compatibility baseline.
- [ ] Add a resolver that has no cross-provider fallback and never reaches the runtime.
- [ ] Add a benchmark record format for paired Seedance/Grok candidates, with visual review
  required before a canonical video changes.
- [ ] Keep HHHl and Grok adapters fail-closed until a redacted HTTPS request/response
  fixture proves each contract.

### Task 4: Re-validate Pie and produce image assets

- [ ] Run a bounded Pie `gpt-image-2` probe using an ephemeral local credential.
- [ ] Generate and validate eight pending portrait strips plus the two missing static CGs.
- [ ] Promote only reviewed, hash-verified output and rebuild the manifest/release mirror.

### Task 5: Open the music gate and complete the cue library

- [ ] Require three consecutive decoded, non-silent Pie Music 2.6 probes.
- [ ] Produce all 81 master/instrumental/loop deliverables with resumable per-track review.
- [ ] Register approved cues in the story and manifest rather than leaving only four BGM
  references.

### Task 6: Evaluate video provider and release publicly

- [ ] Run a paired, HTTPS-only Seedance/Grok benchmark on representative approved keyframes.
- [ ] Keep Seedance unless visual review proves Grok is better; then regenerate only the
  approved scope and retain comparison evidence outside the release tree.
- [ ] Run full local and public CDN/Tavern Helper checks, publish an immutable v2 tag, and
  verify public files against manifest hashes before setting `completeEdition` true.
