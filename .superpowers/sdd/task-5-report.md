# Task 5 Report: Offline Pie media orchestrator

## Outcome

Implemented an isolated TypeScript package at `tools/media` with the four requested commands: `media inventory`, `media generate`, `media validate`, and `media promote`. The runtime application and the existing `build`, `dist`, `release`, and card media trees were not modified.

The package supports normalized `gpt-image-2` generation and multipart image editing, asynchronous `seedance-1.5-pro` submit/poll jobs, UTF-8 `speech-2.8-hd` requests through `/v1/audio/speech`, and `music-2.6` requests through `/v1/music_generation`. Credentials are read only from `PIE_API_KEY`; the client checks it before invoking `fetch`. No paid API request was made during development or testing.

## Reliability and safety behavior

Jobs receive deterministic SHA-256 content IDs over canonical JSON. The JSON ledger uses an exclusive lock file and atomic replacement so concurrent writers do not lose updates. Transient HTTP failures use bounded retry with `Retry-After` support and exponential backoff. Artifact downloads preserve `.part` files and resume with HTTP byte ranges.

Music HTTP 504 responses are recorded as ambiguous rather than failed or retried blindly. They start a fixed five-minute cooldown and reset the probe streak. Bulk music generation is rejected before provider access until three consecutive jobs marked as probes have generated, downloaded, and validated successfully.

Speech requests use JSON declared as UTF-8 and restrict voice selection to the explicit probed OpenAI-compatible voice ID set. Repository fixtures contain only redacted IDs, placeholder URLs, and minimal recorded response shapes; no API key or real provider payload is stored.

## Validation

PNG validation checks signature, dimensions, alpha support, and square-cell horizontal strip frame count, including the required eight-frame case. WAV validation calculates duration, peak/non-silence, and RMS dBFS. Compressed audio uses `ffprobe` for duration and `ffmpeg` volume detection for loudness and peak. Video validation uses `ffprobe` metadata for dimensions, FPS, and duration.

Promotion validates first, writes a temporary copy, and atomically renames it to the requested destination. Tests use temporary directories only.

## Recorded-fixture and TDD evidence

The implementation was developed test-first. The initial adapter suite failed because `src/pie-client.ts` did not exist; orchestration, validation, and CLI suites likewise failed before their production modules were added. A later real-client generator regression test exposed an unbound method bug (`this.postJson` was undefined); the implementation was corrected to preserve the client instance.

Fixtures cover image generation/edit, Seedance submit/poll, speech binary output, music success, and music 504 behavior. All fixtures are redacted and all network boundaries are injected in tests.

## Verification

`npm --prefix tools/media test`: 4 files, 19 tests passed.

`npm --prefix tools/media run typecheck`: passed.

`npm --prefix tools/media run build`: passed.

`npm test`: 12 files, 65 tests passed.

`npm run typecheck`: passed.

`npm run build`: passed.

The temporary `tools/media/node_modules/.vite*` caches created by Vitest were removed before commit. No tracked files under the old bundle or release media trees changed.

## External verification and uncertainty

Anysearch verification against current PiAPI documentation confirmed `https://api.piapi.ai/v1/images/generations`, `/v1/images/edits`, and the unified video task endpoints `POST /api/v1/task` plus `GET /api/v1/task/{task_id}`. The task brief is authoritative for the requested `seedance-1.5-pro`, `/v1/audio/speech`, and `/v1/music_generation` model routes. The implementation remains fixture-driven because no live paid request was authorized. Music duration is therefore treated as a requested validation target, not a provider guarantee.

[Logic Verifier service unavailable; numerical and code-security results were not independently verified by that MCP.]
