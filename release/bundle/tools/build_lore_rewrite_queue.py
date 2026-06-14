from __future__ import annotations

import argparse
import json
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


P0_TITLES = {
    "Albina",
    "Albina/Enemy",
    "Albina/Sprites",
    "The Ring",
    "The House of Spiders",
    "Callisto",
    "Canto IX: The Unsevering",
}

P1_TITLES = {
    "Araya",
    "Araya/Enemy",
    "Ren",
    "Kira",
    "Limbus Company",
    "Dante",
    "Vergilius",
    "Charon",
    "Yi Sang",
    "Faust",
    "The City",
    "Backstreets",
    "Five Fingers",
    "Associations",
    "E.G.O",
    "Abnormalities",
}

P1_PREFIXES = (
    "LCB Sinner ",
    "Canto IX:",
)

P2_MARKERS = (
    "/Enemy",
    "/Story Episode",
    "/Story Episodes",
    "/Assist Unit",
    "/Sprites",
    " E.G.O",
    " Theme Pack",
)


def priority_for(title: str) -> str:
    if title in P0_TITLES:
        return "P0_albina_core"
    if title in P1_TITLES or any(title.startswith(prefix) for prefix in P1_PREFIXES):
        return "P1_limbus_core"
    if any(marker in title for marker in P2_MARKERS):
        return "P2_rp_support"
    return "P3_backlog"


def build_queue(manifest_path: Path) -> dict[str, Any]:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    items: list[dict[str, Any]] = []
    for page in manifest.get("pages", []):
        if not isinstance(page, dict):
            continue
        title = page.get("title")
        if not isinstance(title, str):
            continue
        items.append(
            {
                "title": title,
                "priority": priority_for(title),
                "source_url": page.get("fullurl"),
                "revision_id": page.get("lastrevid"),
                "pageid": page.get("pageid"),
                "length": page.get("length"),
                "status": "pending_manual_paraphrase",
                "target_artifact": "source_backed_worldbook_entry",
                "copyright_mode": "metadata_only_until_manual_rewrite",
            }
        )
    priority_order = {
        "P0_albina_core": 0,
        "P1_limbus_core": 1,
        "P2_rp_support": 2,
        "P3_backlog": 3,
    }
    items.sort(key=lambda item: (priority_order[item["priority"]], str(item["title"]).casefold()))
    counts: dict[str, int] = {}
    for item in items:
        counts[item["priority"]] = counts.get(item["priority"], 0) + 1
    return {
        "generated_at": datetime.now(UTC).isoformat(),
        "source_manifest": str(manifest_path),
        "policy": "queue_only_no_article_text_saved",
        "counts": counts,
        "total": len(items),
        "items": items,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Build a manual lore rewrite queue from wiki metadata.")
    parser.add_argument("--manifest", required=True, help="Wiki metadata manifest JSON.")
    parser.add_argument("--out", required=True, help="Output queue JSON path.")
    args = parser.parse_args()

    queue = build_queue(Path(args.manifest))
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(queue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"out": str(out), "total": queue["total"], "counts": queue["counts"]}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
