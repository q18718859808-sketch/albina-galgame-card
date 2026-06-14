# Lore Authoring Policy

This project uses public wiki pages as research references, but it must not store
or redistribute full wiki article text as card content.

Hard rules:

- Do not copy whole articles, tables, dialogue pages, or long contiguous passages.
- Do not treat a worldbook entry as verified unless it has source metadata.
- Keep source metadata separate from RP prose.
- Write RP entries as original paraphrase and scene-usable synthesis.
- Mark uncertain or inferred material as `fanon`, `bridge`, or `needs_review`.
- Keep official facts and fan-created Albina route material separated.
- Prefer page metadata, revision ids, URLs, and short fact notes over source dumps.

Required source fields for each source-backed entry:

- `source_title`
- `source_url`
- `revision_id`
- `verified_at`
- `evidence_kind`
- `claim_status`

Allowed `claim_status` values:

- `verified`: directly supported by the cited source metadata and checked notes.
- `paraphrased`: derived from source facts, rewritten for RP use.
- `bridge`: connective RP logic needed by the card, not stated by a source.
- `fanon`: intentionally original card content.
- `needs_review`: not yet source-checked.

Completion cannot be claimed until every canon-facing worldbook entry is either
source-backed or explicitly marked as bridge/fanon with no claim of canon status.
