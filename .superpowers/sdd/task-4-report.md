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

## Important Review Fixes

The independent Task 4 review identified lifecycle and concurrency gaps. The typewriter now exposes separate `cancel()` and `completeNow()` semantics: cancellation resolves with only the visible prefix, while complete-now emits and resolves with the full text immediately. Both paths clear the active timer.

Portrait loading now carries both a runtime lifecycle generation and a per-canvas generation. A chat change, load, unmount, explicit stop, or superseding play invalidates pending image work, so a late image resolution cannot draw, register a playback, or schedule RAF. Reduced-motion rendering and strip-load failure use a declared static fallback when available. When no fallback exists, reduced motion loads the strip once and crops its first frame instead of compressing the complete strip or retrying the same URL.

Blob URL lookup is now single-flight per asset and guarded by an object-URL generation. Release, cache replacement, and disposal invalidate pending lookups. A stale lookup cannot publish a URL; every URL that is created is either entered into the tracked map or revoked immediately. Concurrent callers receive the same tracked URL.

Audio BGM operations now use lifecycle and BGM generations. Pending `play()` and autoplay-recovery completions verify current ownership before changing state, so teardown cannot be followed by stale state writes. Starting a newer track discards a blocked obsolete track and its pending transition rather than making it recoverable. Crossfade attenuation begins at the outgoing track's actual volume, preserving voice ducking without an upward jump. Voice autoplay work uses the same lifecycle ownership guard, and teardown still settles active and queued voice promises.

Special-CG queue reads and writes now run through a serial promise lock. Concurrent enqueue, dequeue, peek, and clear operations observe FIFO order without lost updates or duplicate delivery under IndexedDB-style structured-clone behavior.

### Review TDD Evidence

The review RED suite added delayed image/audio completions, concurrent Blob URL reads, release-during-read, blocked-track replacement, ducked crossfade, and concurrent special-CG operations. The initial focused run contained 28 tests: 10 failed for the expected missing or unsafe behaviors and 18 passed. The failures included missing complete-now behavior, RAF resurrection after stop, incorrect strip fallback rendering, duplicate/untracked Blob URLs, stale audio completion writes, obsolete blocked-track replay, crossfade volume jump, and lost concurrent queue writes. The exact public `completeNow()` name was separately observed RED before implementation.

After the fixes, `npm test -- tests/runtime` passed with five files and 33 tests. `npm test` passed with 12 files and 63 tests. `npm run typecheck` completed without diagnostics, and `npm run build` completed successfully with Vite 7.3.6. `git diff --check` reported no whitespace errors, and `git status -- release dist` remained clean.

[Verification service unavailable, results not independently verified]

## Final BGM Ownership Follow-up

The final review found one remaining await-window ownership gap. After track A was active and `playBgm(B)` had assigned B as current but was still awaiting `B.play()`, A existed only in the suspended method's local variable. A concurrent `stopAll()` or `playBgm(C)` therefore could not enumerate and release A.

Two delayed-promise tests reproduced the issue before implementation. In both A-to-B-to-stop and A-to-B-to-C sequences, A had zero pause calls while B remained pending. `playBgm` now records the outgoing track in `pendingBgmPrevious` before awaiting the replacement's `play()`. Successful replacement transfers that ownership immediately into direct release or the tracked crossfade; blocked replacement retains it for recovery; teardown and superseding replacement can always release both tracks. A stale B promise is rejected by the existing lifecycle/BGM generation checks and returns `false` without restoring either released track.

Final verification passed: runtime five files and 35 tests, full suite 12 files and 65 tests, strict typecheck, and production build. The release and dist trees remained unchanged.
