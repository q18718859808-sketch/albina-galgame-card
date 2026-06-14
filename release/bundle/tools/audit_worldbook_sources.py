from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


MOJIBAKE_PATTERN = re.compile(r"(Ã|Â|â€|é˜|å°|æ|鍓|涓|鐨|�)")
QUOTE_PATTERN = re.compile(r"[\"“”「」『』]")


def load_entries(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    entries = data.get("entries")
    if isinstance(entries, list):
        return [entry for entry in entries if isinstance(entry, dict)]
    nested = data.get("data", {}).get("character_book", {}).get("entries")
    if isinstance(nested, list):
        return [entry for entry in nested if isinstance(entry, dict)]
    return []


def source_refs(entry: dict[str, Any]) -> list[dict[str, Any]]:
    extensions = entry.get("extensions")
    if isinstance(extensions, dict):
        refs = extensions.get("source_refs")
        if isinstance(refs, list):
            return [ref for ref in refs if isinstance(ref, dict)]
        metadata = extensions.get("source_manifest")
        if isinstance(metadata, dict):
            return [metadata]
    refs = entry.get("source_refs") or entry.get("sources")
    if isinstance(refs, list):
        return [ref for ref in refs if isinstance(ref, dict)]
    if any(key in entry for key in ["source_url", "revision_id", "source_title"]):
        return [entry]
    return []


def has_required_source_fields(ref: dict[str, Any]) -> bool:
    required = ["source_title", "source_url", "revision_id", "verified_at", "evidence_kind", "claim_status"]
    return all(ref.get(field) not in (None, "") for field in required)


def audit(path: Path) -> dict[str, Any]:
    raw = path.read_text(encoding="utf-8")
    entries = load_entries(path)
    missing_source: list[dict[str, Any]] = []
    incomplete_source: list[dict[str, Any]] = []
    quote_heavy: list[dict[str, Any]] = []
    mojibake: list[dict[str, Any]] = []
    disabled = 0

    for index, entry in enumerate(entries):
        uid = entry.get("uid", index)
        comment = str(entry.get("comment", ""))
        content = str(entry.get("content", ""))
        if entry.get("disable") is True:
            disabled += 1
        refs = source_refs(entry)
        if not refs:
            missing_source.append({"uid": uid, "comment": comment[:120]})
        elif not any(has_required_source_fields(ref) for ref in refs):
            incomplete_source.append({"uid": uid, "comment": comment[:120], "refs": refs[:2]})
        if len(QUOTE_PATTERN.findall(content)) >= 4:
            quote_heavy.append({"uid": uid, "comment": comment[:120], "quote_markers": len(QUOTE_PATTERN.findall(content))})
        if MOJIBAKE_PATTERN.search(comment) or MOJIBAKE_PATTERN.search(content):
            mojibake.append({"uid": uid, "comment": comment[:120]})

    passed = not missing_source and not incomplete_source and not mojibake
    return {
        "generated_at": datetime.now(UTC).isoformat(),
        "path": str(path),
        "passed": passed,
        "char_count": len(raw),
        "byte_count": path.stat().st_size,
        "entry_count": len(entries),
        "disabled_entry_count": disabled,
        "entries_with_required_source_refs": len(entries) - len(missing_source) - len(incomplete_source),
        "missing_source_count": len(missing_source),
        "incomplete_source_count": len(incomplete_source),
        "quote_marker_heavy_count": len(quote_heavy),
        "mojibake_suspect_count": len(mojibake),
        "missing_source_sample": missing_source[:20],
        "incomplete_source_sample": incomplete_source[:20],
        "quote_marker_heavy_sample": quote_heavy[:20],
        "mojibake_suspect_sample": mojibake[:20],
        "policy": {
            "canon_entries_require_source_refs": True,
            "copyright_scan": "heuristic_only",
            "completion_claim_allowed": passed,
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit worldbook entries for source metadata coverage.")
    parser.add_argument("worldbook", help="Worldbook JSON path.")
    parser.add_argument("--json-out", help="Optional output report path.")
    args = parser.parse_args()

    report = audit(Path(args.worldbook))
    if args.json_out:
        out = Path(args.json_out)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 2


if __name__ == "__main__":
    sys.exit(main())
