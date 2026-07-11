# Task 2 Report: Authoritative schemas and save migration

## Outcome

Task 2 is complete. The source tree now provides strict Zod validators and inferred TypeScript types for `GameScriptV2`, `SceneCue`, `AssetManifestV2`, `PortraitAsset`, `MediaJob`, and `SaveV2`. Every authoritative schema requires the literal domain version `2`, rejects unknown object fields, and constrains dynamic authoritative value changes to an explicit allow-list.

`GameScriptV2Schema` validates unique scene and choice identifiers plus initial, route-entry, and choice destination references. `parseGameScriptV2(input, manifest)` additionally validates every background, CG, portrait, voice, BGM, and sound-effect reference against a strict `AssetManifestV2`. Asset manifests reject duplicate identifiers, unresolved job or portrait references, remote paths, traversal, Windows drive paths, UNC paths, root paths, and backslash-separated paths.

`SaveV2Schema` stores route and scene identity separately from normalized numeric values, inventory, quests, CG unlocks, flags, player profile, and named legacy log collections. Log payloads are restricted to finite, acyclic JSON values, so BigInt, NaN, functions, Date instances, circular values, and other non-JSON state cannot enter a valid save. `serializeSaveV2` validates first and recursively orders object keys while retaining array order, producing deterministic JSON for equivalent saves.

## v1.0.44 migration

`migrateSaveV1(input)` recognizes an already-valid V2 save and otherwise performs an explicit field-by-field migration from the v1.0.44 `schemaVersion: 10` shape. It preserves the valid legacy route, scene ID, chapter, location, affection, trust, danger, art resonance, relationship vectors, route economy, conflict mastery, flags, inventory and equipment, outfits, completed quest nodes and quest progress, unlocked CG IDs, player profile, history, timeline, route actions and activity, progression unlocks, consequences, route events, replay anchors, conflict/exchange/contact/achievement/reality/scene-branch logs, story logs and summaries, and dynamic memories.

Unknown top-level authority is never spread into the result. Invalid strings, non-finite numbers, malformed collections, duplicate IDs, unsupported routes, non-plain log objects, future legacy schema versions, hostile proxies, and other damaged inputs recover to deterministic safe defaults or sanitized known values without throwing.

## TDD evidence

The first domain test run failed in all three suites because `src/domain/assets.ts`, `src/domain/game-script.ts`, and `src/domain/migrate-save-v1.ts` did not exist. Subsequent RED cycles demonstrated failures for damaged-scene recovery, unknown numeric authority such as `godMode`, duplicate asset IDs, hostile proxy input, non-JSON log state, Windows/UNC asset paths, and GameScript media references missing from the manifest. Each behavior was implemented only after its failing test was observed.

The final domain suite contains 16 tests across three files. It covers valid and invalid schemas, strict versions and unknown fields, scene and asset references, v1.0.44 preservation, damaged-save recovery, hostile inputs, non-JSON state rejection, and deterministic serialization.

## Verification

`npm test -- tests/domain` passed with 3 files and 16 tests. `npm test` passed with 5 files and 19 tests. `npm run typecheck` completed successfully with `vue-tsc --noEmit`. `npm run build` completed successfully with Vite and emitted only to the existing ignored `build/source` directory. `git diff --check` reported no whitespace errors. `git status -- release dist` remained clean, so neither the release media tree nor the v1.0.44 compatibility bundle was modified.

An independent read-only review initially identified three Important issues: permissive non-JSON logs, missing combined GameScript/manifest validation, and Windows absolute-path acceptance. All three were reproduced with RED tests and resolved before final verification.

[Verification service unavailable, results not independently verified by the project-specified Logic Verifier MCP; verification used the repository test, typecheck, build, diff, and independent agent review gates available in this environment.]

## Independent review follow-up

The independent Task 2 review requested two additional contract tightenings. `RelativeAssetPathSchema` now accepts only canonical `/`-separated relative paths whose segments are non-empty and neither `.` nor `..`. It rejects leading or trailing separators, repeated separators, current-directory segments, parent-directory segments, drive or URI colons, backslashes, root paths, and UNC paths. Manifest test fixtures now use the canonical base path `assets` rather than `assets/`.

`SaveLogsSchema` now includes strict JSON-array slots for the v1.0.44 `routeObjectives`, `watchSignals`, `narrativeIndex`, and `openingDrafts` collections. `createDefaultSaveV2` initializes all four slots, and `migrateSaveV1` explicitly sanitizes and preserves each legacy collection. The v1 preservation test now verifies representative nested JSON records for all four fields.

The follow-up RED run failed on the non-canonical path cases and the four missing migration collections before implementation. After the focused fix, `npm test -- tests/domain` passed with 3 files and 16 tests; `npm test` passed with 5 files and 19 tests; `npm run typecheck` and `npm run build` both completed successfully. The release and dist media trees remained unchanged.
