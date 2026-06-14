from __future__ import annotations

import argparse
import hashlib
import json
import re
import unicodedata
from datetime import UTC, datetime
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse


KNOWN_DISPLAY_REPLACEMENTS = {
    "Ry艒sh奴": "Ryoshu",
    "脰ufi": "Oufi",
    "脡mile Beno卯t": "Emile Benoit",
    "Z脿ng Hu膩 Y铆n": "Zang Hua Yin",
    "艢奴nyat膩 Tad R奴pam": "Sunyata Tad Rupam",
    "缇呯敓铦?": "Entangled Lives Butterfly",
    "Wiki": "Canon Index",
    "wiki": "canon index",
    "鈥?": "",
}


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def source_titles_from_entry(entry: dict[str, Any]) -> set[str]:
    titles: set[str] = set()
    refs: list[Any] = []
    extensions = entry.get("extensions")
    if isinstance(extensions, dict) and isinstance(extensions.get("source_refs"), list):
        refs.extend(extensions["source_refs"])
    if isinstance(entry.get("source_refs"), list):
        refs.extend(entry["source_refs"])
    if isinstance(entry.get("sources"), list):
        refs.extend(entry["sources"])
    for ref in refs:
        if isinstance(ref, dict) and isinstance(ref.get("source_title"), str):
            titles.add(ref["source_title"])
    return titles


def load_covered_titles(worldbook_paths: list[Path]) -> set[str]:
    covered: set[str] = set()
    for path in worldbook_paths:
        if not path.exists():
            continue
        data = load_json(path)
        entries = data.get("entries")
        if not isinstance(entries, list):
            entries = data.get("data", {}).get("character_book", {}).get("entries")
        if not isinstance(entries, list):
            continue
        for entry in entries:
            if isinstance(entry, dict):
                covered.update(source_titles_from_entry(entry))
    return covered


def display_from_url(url: str) -> str:
    path = unquote(urlparse(url).path.rsplit("/", 1)[-1]).replace("_", " ")
    return path.strip()


def clean_display_title(title: str, url: str) -> str:
    text = title
    for old, new in KNOWN_DISPLAY_REPLACEMENTS.items():
        text = text.replace(old, new)
    if re.fullmatch(r"[\s?]+", text):
        return "Unknown canon term"
    normalized = unicodedata.normalize("NFKD", text)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii")
    ascii_text = re.sub(r"\s+", " ", ascii_text).strip(" -_/")
    if re.search(r"\?{2,}", ascii_text):
        ascii_text = "Unknown canon term"
    if len(ascii_text) >= 3:
        return ascii_text
    fallback = display_from_url(url)
    for old, new in KNOWN_DISPLAY_REPLACEMENTS.items():
        fallback = fallback.replace(old, new)
    if re.fullmatch(r"[\s?]+", fallback):
        return "Unknown canon term"
    normalized = unicodedata.normalize("NFKD", fallback)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii")
    ascii_text = re.sub(r"\s+", " ", ascii_text).strip(" -_/")
    if re.search(r"\?{2,}", ascii_text):
        ascii_text = "Unknown canon term"
    return ascii_text or "Unnamed canon term"


def slug_for(title: str) -> str:
    text = clean_display_title(title, "")
    text = re.sub(r"[^a-zA-Z0-9]+", "_", text).strip("_").lower()
    digest = hashlib.sha1(title.encode("utf-8")).hexdigest()[:10]
    if not text:
        text = "canon_term"
    return f"{text[:54]}_{digest}"


def category_for(title: str) -> tuple[str, str, list[str], list[str]]:
    if "/Voicelines" in title:
        return (
            "voice",
            "a voice and response calibration point",
            ["voice", "dialogue", "tone"],
            ["Albina", "Limbus Company", "conversation"],
        )
    if "/Identity Story" in title:
        return (
            "identity_story",
            "an identity-side memory or persona pressure point",
            ["identity story", "Mirror", "persona"],
            ["Albina", "Mirror World", "Limbus Company"],
        )
    if "/Story Episode" in title or "/Story Episodes" in title:
        return (
            "story",
            "a scene-structure anchor for route pacing",
            ["story episode", "scene", "route"],
            ["Albina", "Dante", "Limbus Company"],
        )
    if title.startswith("Canto ") or "/Battle Chapters" in title:
        return (
            "canto",
            "a main-route chapter pressure point",
            ["canto", "battle chapter", "route stage"],
            ["Albina", "Sinners", "The City"],
        )
    if "/Enemy" in title or title.endswith(" Enemy") or "Bloodbag" in title:
        return (
            "enemy",
            "an encounter threat or hostile presence",
            ["enemy", "encounter", "combat pressure"],
            ["Albina", "battlefield", "risk"],
        )
    if "/Assist Unit" in title:
        return (
            "assist",
            "a temporary ally or field-support pressure point",
            ["assist unit", "support", "field aid"],
            ["Albina", "Limbus Company", "operation"],
        )
    if "/Sprites" in title or "/Gallery" in title:
        return (
            "visual",
            "a visual continuity and staging reference",
            ["visual", "sprite", "appearance"],
            ["Albina", "staging", "recognition"],
        )
    if "Theme Pack" in title:
        return (
            "atmosphere",
            "an atmosphere palette for a dangerous floor or scene",
            ["theme pack", "atmosphere", "floor"],
            ["Albina", "Mirror Dungeon", "sensory pressure"],
        )
    if "E.G.O" in title or "Passives" in title:
        return (
            "ego",
            "a psychological force, gear motif, or abnormal pressure",
            ["E.G.O", "psychic pressure", "corrosion"],
            ["Albina", "Abnormality", "risk"],
        )
    if "/Floor " in title or title.startswith("Branch "):
        return (
            "dungeon",
            "an exploration layer with location and pacing constraints",
            ["floor", "branch", "exploration"],
            ["Albina", "navigation", "hazard"],
        )
    if any(word in title for word in ["Association", "Assoc.", "Office", "Syndicate", "Fixer", "Fingers", "Clan"]):
        return (
            "faction",
            "a social-power or contract pressure point in the City",
            ["faction", "contract", "City order"],
            ["Albina", "The City", "Backstreets"],
        )
    return (
        "canon_term",
        "a compact setting, character, or mechanic anchor",
        ["canon term", "route support", "setting"],
        ["Albina", "Limbus Company", "The City"],
    )


def content_for(display_title: str, category_desc: str) -> str:
    return (
        f"{display_title} can enter the Albina route as {category_desc}. "
        "Use it to ground the scene in the Limbus Company tone while keeping the focus on player choice, "
        "Albina's controlled courtesy, her body-art aesthetics, and the risks created by proximity to her. "
        "Do not turn the term into an automatic victory, a trivia lecture, or a detached explanation. "
        "When it appears, tie it to sensory pressure, group reaction, route boundaries, tactical cost, "
        "or an observable change in the current scene."
    )


def build_entry(page: dict[str, Any], order: int, verified_at: str) -> dict[str, Any]:
    title = str(page["title"])
    url = str(page.get("fullurl") or "")
    display_title = clean_display_title(title, url)
    category, category_desc, extra_keys, secondary = category_for(title)
    keys = [display_title]
    base = display_title.split("/", 1)[0].strip()
    if base and base != display_title:
        keys.append(base)
    keys.extend(extra_keys)
    return {
        "uid": f"p4_{category}_{slug_for(title)}",
        "key": list(dict.fromkeys(keys)),
        "keysecondary": list(dict.fromkeys(secondary)),
        "comment": f"P4 canon bridge: {display_title}",
        "content": content_for(display_title, category_desc),
        "constant": False,
        "selective": True,
        "position": "after_character_definition",
        "order": order,
        "disable": False,
        "extensions": {
            "source_refs": [
                {
                    "source_title": title,
                    "source_url": url,
                    "revision_id": page.get("lastrevid"),
                    "verified_at": verified_at,
                    "evidence_kind": "page_info_manifest",
                    "claim_status": "bridge",
                }
            ],
            "rp_scope": "fanon_bridge",
            "copyright_mode": "original",
            "review_status": "needs_review",
        },
    }


def update_queue(queue_path: Path, bridge_titles: set[str], bridge_worldbook: str) -> int:
    if not queue_path.exists():
        return 0
    queue = load_json(queue_path)
    items = queue.get("items")
    if not isinstance(items, list):
        return 0
    updated = 0
    for item in items:
        if not isinstance(item, dict) or item.get("title") not in bridge_titles:
            continue
        item["status"] = "source_backed_p4_bridge_written"
        item["target_artifact"] = "source_backed_worldbook_entry"
        item["copyright_mode"] = "original_route_bridge_no_article_text"
        item["covered_by"] = [bridge_worldbook]
        item["review_status"] = "bridge_needs_manual_expansion"
        updated += 1
    summary: dict[str, int] = {}
    for item in items:
        if not isinstance(item, dict):
            continue
        status = str(item.get("status") or "unknown")
        summary[status] = summary.get(status, 0) + 1
    queue["status_summary"] = dict(sorted(summary.items()))
    queue["p4_bridge_updated_at"] = datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    write_json(queue_path, queue)
    return updated


def build(
    manifest_path: Path,
    worldbook_paths: list[Path],
    out_path: Path,
    report_path: Path | None,
    queue_path: Path | None,
) -> dict[str, Any]:
    manifest = load_json(manifest_path)
    pages = [page for page in manifest.get("pages", []) if isinstance(page, dict) and isinstance(page.get("title"), str)]
    covered = load_covered_titles(worldbook_paths)
    missing = [page for page in pages if page["title"] not in covered]
    verified_at = datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    entries = [build_entry(page, 9000 + index, verified_at) for index, page in enumerate(missing)]
    output = {
        "name": "Albina P4 Full Canon Bridge Pack",
        "description": "Broad RP support pack for remaining canon-index terms. Entries are original route prompts built from title taxonomy and kept separate from hand-reviewed lore packs.",
        "entries": entries,
    }
    write_json(out_path, output)
    bridge_titles = {entry["extensions"]["source_refs"][0]["source_title"] for entry in entries}
    queue_updated = update_queue(queue_path, bridge_titles, str(out_path.as_posix())) if queue_path else 0
    report = {
        "generated_at": verified_at,
        "manifest": str(manifest_path),
        "out": str(out_path),
        "manifest_page_count": len(pages),
        "already_covered_count": len(covered),
        "generated_entry_count": len(entries),
        "generated_source_title_count": len(bridge_titles),
        "queue_updated_count": queue_updated,
        "policy": "original_route_bridge_no_article_text",
    }
    if report_path:
        write_json(report_path, report)
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate a full canon-index bridge worldbook for uncovered manifest titles.")
    parser.add_argument("--manifest", default="docs/limbus_wiki_allpages_manifest.json")
    parser.add_argument("--worldbook", action="append", default=[])
    parser.add_argument("--out", default="worldbooks/albina_p4_manifest_bridge_worldbook.json")
    parser.add_argument("--report", default="docs/p4-manifest-bridge-report.json")
    parser.add_argument("--queue", default="docs/limbus_lore_rewrite_queue.json")
    args = parser.parse_args()

    root = Path.cwd()
    worldbooks = [root / path for path in args.worldbook]
    if not worldbooks:
        worldbooks = sorted(
            path
            for path in (root / "worldbooks").glob("albina_p*_worldbook.json")
            if path.name != "albina_p4_manifest_bridge_worldbook.json"
        )
        seed = root / "worldbooks" / "albina_verified_seed_worldbook.json"
        if seed.exists():
            worldbooks.append(seed)
    report = build(
        root / args.manifest,
        worldbooks,
        root / args.out,
        root / args.report if args.report else None,
        root / args.queue if args.queue else None,
    )
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
