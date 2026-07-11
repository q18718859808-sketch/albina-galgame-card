# Task 4 Report: Isolated Albina Runtime Services

## Outcome

Task 4 is complete. The source tree now provides a scoped `AlbinaRuntime` composed from a Tavern Helper host adapter, cancellable typewriter, audio service, portrait renderer, IndexedDB-backed storage, gallery unlock service, and persistent special-CG queue. Host integration is injected through `TavernHelperBindings`; runtime modules contain no parent-page DOM selector, jQuery takeover, dynamic script execution, runtime media generation, credential, or API-key path.

The runtime subscribes to chat-change, load, and unmount lifecycle events. Each boundary cancels typewriter timers, stops portrait RAF loops, clears owned canvases, releases audio elements and pending voice work, and revokes cached Blob URLs. Unmount also removes host subscriptions and closes the storage backend.

## Runtime Behavior

`AudioService` supports BGM replacement with crossfade, FIFO voice playback, automatic BGM ducking while voice has focus, recovery after autoplay rejection, and deterministic disposal. A blocked BGM transition retains the old track until user-gesture recovery succeeds, then releases it. Active and queued voice promises are settled during teardown.

`PortraitService` consumes manifest portrait definitions, plays validated eight-frame strips with `requestAnimationFrame`, uses manifest static fallbacks when reduced motion is requested or strip loading fails, and clears/cancels all owned rendering resources.

`IndexedDbBackend` creates isolated `assets`, `gallery`, `specialCg`, and `saves` object stores. `AlbinaStorage` caches asset Blobs, manages and revokes object URLs, persists `SaveV2` snapshots together with thumbnail Blobs, and exposes the narrow storage operations used by gallery and special-CG services. Gallery unlocks are persisted without mutating the authoritative save object. Special CG requests are persisted and dequeued FIFO.

## TDD Evidence

The initial RED command was `npm test -- tests/runtime`. All five runtime suites failed because the seven runtime modules did not yet exist, confirming the tests preceded production implementation.

After the first GREEN implementation, five files and 19 tests passed. Self-review then added two audio regressions first: retaining the prior BGM across blocked crossfade recovery and settling the active voice promise on disposal. The focused RED run failed both tests, including the expected unresolved-promise timeout. The minimal fix made the audio suite pass six of six and the runtime suite pass 21 tests total.

## Verification

`npm test -- tests/runtime` passed with five files and 21 tests.

`npm test` passed with 12 files and 51 tests.

`npm run typecheck` passed with no diagnostics.

`npm run build` passed with Vite 7.3.6, transforming 17 modules and emitting only the ignored `build/source` output.

The runtime source audit found no `parent` DOM access, selector queries, jQuery calls, fetch/XHR calls, runtime generation hooks, API keys, or model/provider credentials. `git status -- release dist` remained clean, so the legacy bundle and release/media trees were not modified.

## Self-Review

The services depend on injected browser/host capabilities and domain types rather than global page ownership. Resource ownership is explicit: every timer, RAF handle, canvas, audio element, Blob URL, subscription, and database connection has a release path. The implementation re-creates requested behavior from tests and interfaces without copying BigMalove source.

[Verification service unavailable, results not independently verified by the project-specified Logic Verifier MCP; verification used Vitest, strict TypeScript, Vite build, source-pattern audit, and Git boundary checks.]
