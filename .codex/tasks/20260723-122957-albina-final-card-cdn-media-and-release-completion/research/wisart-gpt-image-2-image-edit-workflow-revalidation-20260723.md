# WisArt `gpt-image-2` image-edit workflow revalidation

Checked: 2026-07-23 (Asia/Shanghai). Scope: public, read-only provider and
upstream documentation only. No image-generation request was submitted, and
no API key was read, recorded, or printed.

## Decision

Use WisArt's provider-specific multipart edit contract for an Albina asset
that has an allowed official identity reference:

```text
POST https://wisart.kuaileshifu.com/v1/images/edits
Content-Type: multipart/form-data

model=gpt-image-2
prompt=<frozen approved prompt>
size=<requested size>
n=1
response_format=url
image=@<first allowed official reference>
image=@<optional second allowed reference>
```

Each uploaded source is a separate multipart field with the exact field name
`image`. Do not use `image[]` against WisArt. The sole authoritative source
for character identity must remain an allowed official character source; the
user-provided heroine image and all of its derivatives remain text-only style
observations and must never be attached to this request.

## Provider Evidence

The authenticated documentation route is
`https://wisart.kuaileshifu.com/#/member/api-docs`. It redirects an anonymous
reader to login, but the public front-end currently loads the API-documents
bundle below. This is a first-party representation of the provider's current
published contract.

- Shell entry: `https://wisart.kuaileshifu.com/assets/index-RHZKLVXb.js`
  dynamically imports `ApiDocs-BPB-uO0Q.js`.
- Documentation bundle:
  `https://wisart.kuaileshifu.com/assets/ApiDocs-BPB-uO0Q.js`
- Downloaded bundle SHA-256:
  `5ae4baef9061eac33c9e09b882c4416c6a2bd3ed23c8473ddb38b2080bdb670c`.
- The bundle's `POST /v1/images/edits` entry documents
  `multipart/form-data`, a curl example using `-F "image=@..."`, and this
  image parameter: `file | file[]`, `jpg / jpeg / png / webp / gif`, no more
  than 16 inputs, and "repeat the image field".
- The same edit table exposes `prompt` (required), `model`, `size`, `n`
  (1--5), and `response_format` (`url` or `b64_json`). It lists `mask` only
  as an OpenAI-SDK compatibility field and explicitly says it does not
  currently participate in generation.
- The documented response is synchronous OpenAI-shaped JSON with a `data`
  item containing either `url` or `b64_json`. The edit entry does not document
  a job ID, a status field, or a status/poll endpoint. Therefore the
  implementation must consume and validate the returned `data` result rather
  than inventing a polling workflow.

## Field Boundaries

| Field | WisArt edit decision | Reason |
| --- | --- | --- |
| `image` | Send once per allowed source, in deterministic order. | This is the provider's documented repeated multipart field. |
| `image[]` | Do not send. | This spelling is not in the WisArt edit example or parameter definition. |
| `model` | Send `gpt-image-2` explicitly. | The card must not silently select another image model. |
| `prompt`, `size`, `n=1`, `response_format=url` | Send. | Both documented response forms were evaluated. The provider returned HTTP 504 for the high-resolution `b64_json` pilot, while URL generation returned HTTP 200. Production retains the URL form and uses a bounded 15-minute post-generation download because a signed URL streamed at roughly 17 KB/s for a 9.6 MB trial image. The received file remains hash- and dimension-checked locally. |
| `quality` | Omit from multipart edits. | The current edit parameter table does not contain it. WisArt documents it for JSON `/v1/images/generations`, which is a different transport. |
| `input_fidelity` | Omit. | It is not a WisArt edit parameter and upstream `gpt-image-2` does not allow setting it. |
| `mask` | Omit. | WisArt says it is compatibility-only and does not participate in generation. |
| `background=transparent` | Omit. | It is not a documented edit parameter; upstream documentation says `gpt-image-2` does not support native transparent backgrounds. Use approved local chroma-key-to-alpha processing and validate the delivery file instead. |

## Upstream Cross-Check

OpenAI's current official guide is
`https://developers.openai.com/api/docs/guides/image-generation`.
The independent upstream evidence note is
`research/openai-image-edits-official-evidence-20260723.md`.

The upstream guide confirms that `gpt-image-2` can edit with image inputs,
that its native multi-image multipart curl example repeats `image[]`, that a
maximum of 16 inputs applies, that `input_fidelity` must be omitted for this
model, and that native transparent output is unavailable. It also documents
mask behavior upstream. Those facts are useful model semantics, but the
different upstream field spelling must not override the endpoint actually
called. For WisArt, its own published `image` contract is controlling.

## Implementation Audit

At the time of this check, the repository adapter already matches the
provider-specific rule:

- `scripts/lib/visual-production.mjs` builds a `FormData` request, appends
  the documented edit fields, then appends every source as `image`.
- `tests/assets/visual-production.test.ts` asserts repeated `image` fields
  and rejects `image[]`, `quality`, `input_fidelity`, and `mask` for edits.

This proves request construction only. It does not prove a generated result
is publishable: every returned file still requires provider/model receipt,
download and dimension checks, required human anatomy/identity/no-text review,
rights and lineage records, and strict-media readiness before promotion.
