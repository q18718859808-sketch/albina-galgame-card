# Image Provider Compatibility Audit

## Scope

This audit evaluates the three credential-free compatibility records in
`content/media-production/provider-probes-v1.json`. It does not replay any
generation request, read any credential, or authorize a provider for production.

The OpenAI Image API reference currently exposes synchronous image operations at
`POST /images/generations`, `POST /images/edits`, and `POST /images/variations`.
It does not expose an Image API request-status or result-retrieval endpoint. The
`GET /responses/{response_id}` endpoint belongs to the separate Responses API and
cannot recover a timed-out Image API request. See the official
[image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
and [Images API reference](https://developers.openai.com/api/docs/api-reference/images).

## Findings

| Provider record | Local evidence | Result | Production decision |
| --- | --- | --- | --- |
| `abrdns-openai-compatible` | The model list returned HTTP 200 and listed `gpt-image-2`. The generation call ended as `ambiguous-timeout`; no artifact or provider task ID was recorded, and automatic resubmission is explicitly disabled. | Model discovery works, but generation compatibility is unproven. No standard OpenAI-compatible read-only endpoint can recover this Image API result. Provider-side billing/log inspection or a provider-specific task lookup is required before any new request. | Keep `productionAuthorized=false`; do not resubmit automatically. |
| `huibaolinks-openai-compatible` | The model list returned HTTP 200 and listed `gpt-image-2`. Generation returned HTTP 400 with `bad_response_status_code`; the request ID and response hash are recorded, but no verified artifact exists. | This is a definitive failed compatibility probe, not a successful generation. The summarized record does not preserve enough sanitized upstream detail to distinguish an unsupported request field from an unavailable upstream route. The existing request ID should be used with provider logs or support; a new paid request is not needed for diagnosis. | Keep `productionAuthorized=false`; do not add an adapter based on model-list evidence alone. |
| `asaiuta-openai-compatible` | The model list returned HTTP 200 but did not list `gpt-image-2`; generation was deliberately not attempted. | The requested model is unavailable under the tested credential/catalog. | Keep `productionAuthorized=false`; reconsider only after a later read-only model-list probe shows the exact model ID. |

## Producer Review

`scripts/lib/visual-production.mjs` intentionally binds the frozen plan, ledger,
base URL, credential variable, promotion receipts, and artifact provenance to
`x666-openai-compatible`. That fail-closed design should not be generalized for
the three compatibility records. A nominally OpenAI-compatible model list does
not prove request-field compatibility, successful image bytes, billing behavior,
or redistribution rights.

A future provider adapter should be introduced only after all of the following
are independently recorded: a successful generation response, a decoded and
visually nonblank artifact, explicit production authorization bound to the frozen
content hash, provider-specific request-ID handling, a distinct credential/base
URL contract, and a provider-specific ledger/provenance migration. None of the
three current compatibility records meets that gate.

## Safe Resolution Path

For the abrdns timeout, inspect provider-side logs, billing history, or a documented
provider-specific task endpoint using the original request timestamp or request
metadata. If the provider cannot identify the request, its outcome remains
unknown and must not be silently retried. For huibaolinks, retrieve the sanitized
upstream error for the already recorded request ID. For asaiuta, only a later
read-only model catalog change can justify another compatibility review.
