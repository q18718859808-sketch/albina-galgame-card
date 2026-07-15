# Albina v2 Release Candidate

The installable release candidate is pinned to `v2.0.0-rc.1`. Import the tagged card PNG into SillyTavern:

`https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.1/card/albina.card.png`

Tavern Helper runs the card's single enabled script, which loads:

`https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.1/dist/albina-galgame-card/source/albina-classic-loader.js`

The runtime resolves all media relative to that immutable tag and calls no generation API. The final `v2.0.0` address remains reserved until `completeEdition` is true and the final public verification protocol in `TAGGING.md` passes.
