# Public verification: v2.0.0-rc.2

Verified on 2026-07-20 after publishing annotated tag `v2.0.0-rc.2`.

- Release commit: `35ba08f345d6062438ea3e9f5e0560fbf226c02d`
- Annotated tag object: `b285baa60d06be910e9f0adf46634aff5c3f4c07`
- Remote branch and peeled tag both resolve to the release commit.
- Public card PNG, card JSON, loader JavaScript, source JavaScript, and source CSS return HTTP 200 with correct MIME types.
- All five public bodies are byte-identical to the local canonical release artifacts.
- Desktop (1440x900) and mobile (390x844) Chrome loaded the exact enabled script content from the final card without request interception.
- The Tavern Helper iframe mounted one launcher, one stylesheet, and the opened shell into the parent document, with no launcher left in the iframe and no page or console errors.

The RC remains intentionally marked `completeEdition=false`. The final `v2.0.0` gate remains blocked by media provenance/readiness and pending provider work; those limitations do not invalidate this RC's Tavern Helper/CDN integration.
