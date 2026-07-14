# Release Tagging

Public tagging is disabled while `dist/albina-galgame-card/release-status.json` reports a local preview or `completeEdition` is false.

The `v2.0.0` name is reserved for the first immutable complete-edition release. Promotion uses four ordered phases against one reviewed commit:

1. **Pre-tag gate:** finish every production channel, set `completeEdition` true, stamp the release card, and pass local tests, the local Tavern Helper harness, asset hashes, and the canonical/release mirror check.
2. **Immutable tag:** create `v2.0.0` once, pointing at that exact reviewed commit.
3. **Public verification:** after jsDelivr can resolve the tag, compare CDN bytes and hashes with the tagged tree and run the real SillyTavern + Tavern Helper import check.
4. **Release attestation:** publish the import instructions and release proof only after public verification passes. A failed public check does not permit moving the tag; any corrected artifact receives a new version.

Never move or overwrite a published version tag.
