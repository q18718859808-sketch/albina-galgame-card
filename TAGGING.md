# Release Tagging

Public tagging is disabled while `dist/albina-galgame-card/release-status.json` reports a local preview or `completeEdition` is false.

The `v2.0.0` name is reserved for the first immutable complete-edition release. Before a maintainer creates that tag, every production channel, local test, release mirror check, public CDN hash check, and Tavern Helper import check must pass against one reviewed commit.

Never move or overwrite a published version tag.
