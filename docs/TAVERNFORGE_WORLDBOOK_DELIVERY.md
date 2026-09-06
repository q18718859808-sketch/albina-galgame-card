# TavernForge Worldbook Delivery

This delivery is limited to the worldbook contract and its audit evidence. The writable scope is `docs`, `content/worldbook`, and `scripts/forge`. `card/albina.card.json` is protected and must remain unchanged.

The player profile is delivered as five linked contract surfaces: schema, InitVar/defaults, update rules, runtime read/display entry, and chat-scoped persistence. The local source materials are the four `player-profile-*.json` files plus `src/domain/player-profile.ts` and the runtime host references named by `player-profile-runtime-matrix-v1.json`. The delivery does not infer extra fields or player actions.

The full plot timeline is the 22-entry `plot-full-timeline` package. It is separate from the 16-entry L0 card anchor preset. L0 is a minimal card mirror, not the complete worldbook; the package manifest remains the authority for layered package membership and default-enable policy.

The sixteen original entries are auditable through exact UID order and canonical entry digests between the card and the L0 mirror. The protected card baseline is recorded in `content/worldbook/tavernforge-delivery-manifest-v1.json`; any change fails the focused audit and requires an explicit card-scope decision outside this delivery.

The runtime boundary is explicit: `SaveV2.worldbook` is the application source of truth. Selecting a layered preset writes the normalized selection both into that save and into the chat-scoped `albinaWorldbookSelectionV1` projection consumed by `content/worldbook/player-profile-runtime-v1.json`. The projection must equal the normalized save selection before the EJS reader is used; a failed projection write may leave the external reader stale or unavailable and is not evidence of injection.

This selection path still does not import, enable, register, or inject a worldbook into SillyTavern. Injection belongs to the user's normal SillyTavern worldbook UI. The authoritative boundary is `content/worldbook/worldbook-runtime-boundary-v1.json`; a selected preset or chat projection is metadata and must not be reported as an active external worldbook.

Run the focused audit from the project root:

```text
node scripts/forge/audit-tavernforge-delivery.mjs
node scripts/verification/verify-player-profile.mjs
```

The audit is static and local. It does not start TavernForge or SillyTavern, call an unknown endpoint, or claim that an external API, TavernHelper runtime, EJS model context, or real-host import was observed. Those surfaces remain `contract-declared`, `not-executed`, or `unverified` until separately exercised with the documented environment and evidence.
