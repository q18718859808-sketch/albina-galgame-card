# Release Tagging

`v2.0.0-rc.2` is an immutable release-candidate tag. It may be published while `completeEdition` is false because the card and status file identify it as an RC and disclose its remaining limits. Never move or overwrite a published tag.

The final `v2.0.0` name remains reserved and uses four ordered phases against one reviewed commit:

1. **Pre-tag gate:** finish every complete-edition requirement, set `completeEdition` true, and pass local tests, Tavern Helper E2E, asset hashes, security scan, and canonical/release mirror checks.
2. **Immutable tag:** create `v2.0.0` once, pointing at that exact reviewed commit.
3. **Public verification:** after jsDelivr resolves the tag, compare CDN bytes and hashes with the tagged tree and run a real SillyTavern plus Tavern Helper import check.
4. **Release attestation:** publish final import instructions and proof only after public verification passes.

A failed public check does not permit moving the tag; corrected artifacts receive a new version.
