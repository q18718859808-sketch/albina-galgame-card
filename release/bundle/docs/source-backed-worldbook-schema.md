# Source-Backed Worldbook Schema

Use this structure inside each worldbook entry's `extensions.source_refs`.

```json
{
  "source_refs": [
    {
      "source_title": "Albina",
      "source_url": "https://limbuscompany.wiki.gg/wiki/Albina",
      "revision_id": 167288,
      "verified_at": "2026-06-01T00:00:00Z",
      "evidence_kind": "wiki_page_metadata_plus_manual_notes",
      "claim_status": "paraphrased"
    }
  ],
  "rp_scope": "canon_lore | card_route | ui_protocol | fanon_bridge",
  "copyright_mode": "paraphrase_only",
  "review_status": "needs_review | source_checked | rejected"
}
```

The `content` field remains SillyTavern worldbook prose. Source metadata proves
where the entry was checked; it is not a place to store copied source text.

Validation policy:

- `canon_lore` entries require at least one `source_refs` item.
- `card_route` entries may cite sources plus original route design notes.
- `fanon_bridge` entries must not be described as official canon.
- Entries containing long direct quotations must be rewritten or justified.
