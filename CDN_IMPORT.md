# Albina v2 Local Preview

There is no live public CDN import for the current build. The immutable `v2.0.0` CDN location is reserved until the complete edition is reviewed, tagged, and independently verified.

For local preview, run the repository development server and open `built-harness.html`. The harness loads the built module from the local `dist/albina-galgame-card/source` tree and exercises the same Tavern Helper loader contract without pretending that a public tag exists.

The runtime does not call media-generation APIs and contains no provider credentials.
