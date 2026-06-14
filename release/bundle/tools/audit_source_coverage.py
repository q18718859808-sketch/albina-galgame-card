from __future__ import annotations

import argparse
import json
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


def load_entries(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    entries = data.get("entries")
    if isinstance(entries, list):
        return [entry for entry in entries if isinstance(entry, dict)]
    nested = data.get("data", {}).get("character_book", {}).get("entries")
    if isinstance(nested, list):
        return [entry for entry in nested if isinstance(entry, dict)]
    return []


def extract_source_titles(entry: dict[str, Any]) -> set[str]:
    titles: set[str] = set()
    extensions = entry.get("extensions")
    refs: list[Any] = []
    if isinstance(extensions, dict):
        raw = extensions.get("source_refs")
        if isinstance(raw, list):
            refs.extend(raw)
    raw_entry = entry.get("source_refs") or entry.get("sources")
    if isinstance(raw_entry, list):
        refs.extend(raw_entry)
    for ref in refs:
        if isinstance(ref, dict) and isinstance(ref.get("source_title"), str):
            titles.add(ref["source_title"])
    return titles


def audit(manifest_path: Path, worldbook_paths: list[Path]) -> dict[str, Any]:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    pages = manifest.get("pages", [])
    page_titles = {page.get("title") for page in pages if isinstance(page, dict)}
    page_titles = {title for title in page_titles if isinstance(title, str)}

    referenced_titles: set[str] = set()
    worldbooks: list[dict[str, Any]] = []
    total_entries = 0
    entries_with_refs = 0
    for path in worldbook_paths:
        entries = load_entries(path)
        total_entries += len(entries)
        wb_refs: set[str] = set()
        with_refs = 0
        for entry in entries:
            titles = extract_source_titles(entry)
            if titles:
                with_refs += 1
            wb_refs.update(titles)
        entries_with_refs += with_refs
        referenced_titles.update(wb_refs)
        worldbooks.append(
            {
                "path": str(path),
                "entry_count": len(entries),
                "entries_with_source_refs": with_refs,
                "source_title_count": len(wb_refs),
                "source_titles": sorted(wb_refs),
            }
        )

    missing_from_manifest = sorted(referenced_titles - page_titles)
    referenced_in_manifest = sorted(referenced_titles & page_titles)
    unreferenced_manifest_titles = sorted(page_titles - referenced_titles)
    return {
        "generated_at": datetime.now(UTC).isoformat(),
        "manifest": str(manifest_path),
        "manifest_collection_mode": manifest.get("collection_mode"),
        "manifest_page_count": len(page_titles),
        "worldbooks": worldbooks,
        "total_worldbook_entries": total_entries,
        "entries_with_source_refs": entries_with_refs,
        "referenced_source_title_count": len(referenced_titles),
        "referenced_source_titles_in_manifest": referenced_in_manifest,
        "source_titles_missing_from_manifest": missing_from_manifest,
        "unreferenced_manifest_title_count": len(unreferenced_manifest_titles),
        "unreferenced_manifest_title_sample": unreferenced_manifest_titles[:100],
        "passed": not missing_from_manifest and entries_with_refs == total_entries,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Compare worldbook source refs against a wiki metadata manifest.")
    parser.add_argument("--manifest", required=True, help="Wiki metadata manifest JSON.")
    parser.add_argument("--worldbook", action="append", required=True, help="Worldbook JSON to audit. Repeatable.")
    parser.add_argument("--json-out", help="Optional output report path.")
    args = parser.parse_args()

    report = audit(Path(args.manifest), [Path(path) for path in args.worldbook])
    if args.json_out:
        out = Path(args.json_out)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 2


if __name__ == "__main__":
    sys.exit(main())
