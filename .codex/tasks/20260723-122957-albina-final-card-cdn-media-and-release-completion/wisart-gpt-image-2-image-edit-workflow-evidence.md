# WisArt `gpt-image-2` image-edit workflow evidence

Checked on 2026-07-23 against two primary public sources:

- WisArt's delivered API-documentation bundle: `https://wisart.kuaileshifu.com/assets/ApiDocs-BPB-uO0Q.js` (the JavaScript bundle loaded by `https://wisart.kuaileshifu.com/#/member/api-docs`).
- OpenAI's current image-generation guide: `https://platform.openai.com/docs/guides/image-generation`.

## Provider-specific transport contract

For this project, the controlling transport specification is **WisArt's own document**, not an upstream OpenAI curl example.  The document says that `POST /v1/images/edits` accepts `multipart/form-data`, with `model`, `prompt`, `size`, optional `n` and `response_format`, and an `image` file field.  Multiple inputs are sent by repeating the exact `image` field name; the document calls this `file | file[]` and permits up to 16 images.  Its published example is:

```sh
curl -X POST https://wisart.kuaileshifu.com/v1/images/edits \
  -H "Authorization: Bearer $WISART_API_KEY" \
  -F "model=gpt-image-2" \
  -F "prompt=<explicit image-edit instruction>" \
  -F "size=<target size>" \
  -F "image=@<first-input.png>" \
  -F "image=@<second-input.png>"
```

Do **not** send `image[]` to WisArt.  OpenAI's upstream document uses that different field spelling in one multi-input curl example, but WisArt's public documentation expressly publishes repeated `image`, and the provider adapter must follow the endpoint actually called.  The current WisArt edit parameter table does not list `quality`; the production adapter therefore omits it for multipart edit requests and relies on the explicit requested `size`, followed by delivery-dimension verification.  `quality: high` remains restricted to JSON `/images/generations` requests, where WisArt documents it.  The local production implementation and regression test enforce this split contract:

- `scripts/lib/visual-production.mjs` appends each input as `form.append('image', ...)`.
- `tests/assets/visual-production.test.ts` asserts two `image` fields and asserts that `image[]` is absent.

The same WisArt document lists `gpt-image-2` in `/v1/models`, supports output responses as either `url` or `b64_json`, and says that a concrete size is normalized to a supported ratio/1K, 2K, or 4K tier.  Therefore the post-download delivery-dimension inspection is required; a requested master dimension is not proof by itself.

## `gpt-image-2` semantics relevant to this card

OpenAI's current guide confirms that `gpt-image-2` uses input images at high fidelity automatically.  `input_fidelity` must be omitted for this model; the API does not allow changing it.  The guide also states that masks act as guidance and, when multiple inputs are supplied, a mask applies to the first input.  WisArt documents its `mask` field as compatibility-only and says it currently does not participate in generation, so it must not be used as an identity-lock mechanism for this project.

The correct card workflow is thus image-reference editing plus textual role locking, never a claim that a mask or a low-level fidelity setting can guarantee anatomy or identity.

## Reference order and role separation

The card needs two different kinds of visual evidence, which must not be conflated:

1. For a canonical/named character asset, Image 1 is the applicable official character source and is the only identity authority.  Additional official source images may follow when a second canonical pose or costume is essential.
2. The user-supplied heroine illustration, and every derivative of it including `reference.user.albina-style-board`, are **text-only style sources**.  They must never be attached to an image-edit request.  Even a de-identified derivative can retain silhouette, composition, or character-detail influence that would violate the requested separation.
3. For a background with no character, use no visual reference input.  The prompt must derive linework, palette, material edges, lighting, and rendering discipline exclusively from the frozen written style bible, and must still say that the scene is unpopulated and contains no reflected human figures.
4. Prompts must name each permitted input role and repeat the negative boundary: no user illustration or derivative may supply face, hair, clothing, body, weapon, pose, prop, typography, logo, barcode, composition, or any other visual information.  A canonical official source may supply only the identity or scene role that is explicitly declared for that job.

Current code implements this stricter rule through `styleReferenceMode: text-only`: it refuses any user style-board source in the production request parser, and the frozen 67-job plan contains none.  This rule must not be relaxed by appending a de-identified style board as an image input.

## Per-asset quality gate (not model-prompt wishful thinking)

`gpt-image-2` produces a candidate, not a release asset.  Before promotion, every candidate must be checked against the frozen prompt and an evidence receipt for all of the following:

- no text, watermark, logo, UI overlay, barcode, or source-character leakage;
- official identity anchors preserved for Albina (heterochromia, cable high ponytail, full mechanical body, Fascia, mechanical hand, official costume/silhouette);
- each visible hand has five separate fingers, natural length ordering, distinct three-joint structure, and the requested nail detail; each visible bare foot has five separated toes, natural load/volume, and requested nail detail;
- no extra/missing limbs or fused bodies in multi-character CGs;
- source image is nonblank and delivery image has the specified final dimensions; portrait alpha/chroma-key removal has clean boundaries;
- layer-friendly silhouette and occlusion boundaries remain suitable for later Live2D cutting;
- an explicit human review is `approved` under the current prompt/review hash.  A generated file without this approval remains blocked.

This gate is the mechanism that makes the anatomy, no-text, and Live2D requirements enforceable.  It also prevents a broad batch from being promoted merely because an endpoint returned HTTP 200.
