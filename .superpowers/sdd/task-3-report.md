# Task 3 Report: Deterministic Story Compiler and Endings

## Outcome

Task 3 is complete. The repository now contains a reproducible legacy-story extractor, deterministic dialogue content sources, a schema-valid story compiler, fixed choice-result dialogue, and nine explicitly qualified endings. The compiled runtime artifact is `dist/albina-galgame-card/data/game-script-v2.json`.

The legacy oracle was isolated from `dist/albina-galgame-card/console/index.js`, `//#region src/config.ts`, and evaluated as the `jl` scene object. Independent mechanical counting confirmed exactly 46 scene anchors and 87 unique choices. The distribution is one three-choice opening scene, 39 two-choice scenes, and six one-choice scenes. All legacy scene IDs, choice IDs, speakers, scene text, and choice text are preserved in the v2 graph. The three legacy route-final choices now enter deterministic ending gates instead of looping directly to the opening.

## TDD Record

The first story test run occurred before any content, compiler, or compiled output existed. Vitest reported two failing test files with nine expected failures and one guarded pass. The failures specifically identified the absent authoring manifest, compiler, compiled graph, fixed dialogue results, and ending graph.

After implementing the minimal extractor, content sources, schema extensions, and compiler, the story suite reached 9/10 passing. The sole remaining failure was a Windows `spawn EINVAL` caused by invoking the `.cmd` shim directly; the test was corrected to execute `vite-node.mjs` through the current Node executable. The story suite then passed 10/10.

During self-review, moving the extractor from the ignored SDD workspace into `scripts/` exposed an incorrect project-root calculation. A new regression test was added first and observed failing with `ENOENT` against `D:\创作\dist`. The extractor root was then corrected, after which the story suite passed 11/11.

## Content and Graph Design

`content/game-script-v2.json` is the authoring manifest. It declares the v2 project identity, initial scene, route entry scenes, the legacy oracle counts, and four ordered dialogue chunks. The chunks are `opening.json`, `white-canvas.json`, `golden-bough-rebuild.json`, and `ring-conspiracy.json`.

The compiled graph contains 58 scenes and 96 choices. Of these, 46 scenes and 87 choices are the legacy backbone. Each route adds one ending gate with three qualified choices, plus true, normal, and bad terminal scenes. This produces three gates, nine ending choices, and nine terminal ending nodes. Every graph reference resolves, every scene is structurally reachable from `opening_001`, and only ending nodes are terminal.

True endings use explicit conjunctive value and final-route-flag predicates. Bad endings use the final-route flag plus explicit disjunctive low-trust, low-resonance, or high-danger predicates appropriate to the route. Normal endings are explicit fallbacks after the true and bad qualifications do not match. Each ending-gate choice records a persistent qualification flag.

Every scene contains fixed text and a stable `voice.scene.*` cue ID. Every choice contains deterministic `resultText` and a stable `voice.result.*` cue ID. The compiler contains no runtime generation call, network call, API endpoint, or credential path. The old `generate` and `generateRaw` behavior remains only in the untouched compatibility bundle and is not part of the compiled v2 story artifact.

Every choice changes a persistent effect, availability rule, scene branch, or ending qualification. Legacy numeric effects are normalized into the Task 2 authoritative value map; legacy flags and CG unlocks become arrays in the v2 effect schema. The three route-final branches are redirected to their ending gates while preserving their original IDs, text, numeric effects, and flags.

## Domain and Compiler Changes

`src/domain/scene-cue.ts` now has optional strict schemas for deterministic choice-result text, result voice cues, choice availability predicates, and ending descriptors. Existing Task 2 fixtures remain valid because these additions are optional, while compiled Task 3 content requires them through story tests.

`scripts/extract-legacy-story.mjs` mechanically extracts and normalizes the 46/87 oracle, attaches fixed cue IDs and result records, adds the three ending families, and writes the content sources deterministically. `scripts/compile-story.mjs` reads the authoring manifest and dialogue chunks, checks the declared legacy counts, validates the merged graph with `parseGameScriptV2`, and writes stable pretty-printed JSON. Re-running both extractor and compiler produces byte-identical authoring and compiled outputs.

## Verification

The focused story suite passed with two files and 11 tests. The full Vitest suite passed with seven files and 30 tests. `npm run typecheck` completed successfully under strict `vue-tsc --noEmit`. `npm run build` completed successfully with Vite 7.3.6.

The final audit reported 58 total scenes, 46 legacy scenes, 87 legacy choices, 96 total choices, nine endings, zero unvoiced scenes, zero unvoiced choice results, and zero empty result records. `git diff --check` reported no whitespace errors.

No changes were made to `dist/albina-galgame-card/console/index.js`, `release/`, or `dist/albina-galgame-card/assets`. No media was generated or modified. The only new file under the canonical dist tree is the required compiled data artifact.

## Self-Review

The implementation stays within the deterministic content/compiler scope. Legacy extraction is mechanical rather than hand-transcribed, scene and choice identifiers remain unique, the strict domain parser rejects unknown references, and the final graph has no non-ending dead ends. The extractor and compiler functions remain small and separated by responsibility. The generated story contains no timestamps, randomness, environment-dependent paths, or runtime LLM dependency.

[Verification service unavailable, results not independently verified]
