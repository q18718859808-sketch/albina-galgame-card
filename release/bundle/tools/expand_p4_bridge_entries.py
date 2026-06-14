from __future__ import annotations

import argparse
import json
import re
import unicodedata
from collections import Counter
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


DEFAULT_SELECTED_TITLES = [
    "Canto I: The Outcast",
    "Canto II: The Unloving",
    "Canto III: The Unconfronting",
    "Canto IV: The Unchanging",
    "Canto V: The Evil Defining",
    "Canto VI: The Heartbreaking",
    "Canto VII: The Dream Ending",
    "Canto VIII: The Surrendered Witnessing",
    "A Certain Library's General Invitation I",
    "Into a Certain Library's Book Theme Pack",
    "A Certain Sinclair",
    "A Midspring Night's Dream",
    "Dungeons",
    "Branch D-02",
    "Branch J-03",
    "Branch K-02",
    "List of E.G.O",
    "List of E.G.O Gifts",
    "Category:ZAYIN Level E.G.O",
    "Category:TETH Level E.G.O",
    "Category:HE Level E.G.O",
    "Category:WAW Level E.G.O",
    "Category:E.G.O with HP Healing",
    "Command : Meltdown Faust",
    "Lobotomy E.G.O::In the Name of Love and Hate Don Quixote",
    "Lobotomy E.G.O::Regret Faust",
    "Lobotomy E.G.O::Solemn Lament Yi Sang",
    "Lobotomy E.G.O::Magic Bullet Outis",
    "Lobotomy E.G.O::Red Eyes & Penitence Ry\u014dsh\u016b",
    "Lobotomy E.G.O::Sunshower Heathcliff",
    "Lobotomy E.G.O::The Sword Sharpened with Tears Rodion",
    "Lobotomy E.G.O::Red Sheet Sinclair",
    "Don Quixote",
    "Blade Lineage Mentor Meursault",
    "Blade Lineage Salsu Don Quixote",
    "Blade Lineage Salsu Faust",
    "Blade Lineage Salsu Outis",
    "Blade Lineage Salsu Sinclair",
    "Blade Lineage Salsu Yi Sang",
    "Cinq Assoc. East Section 3 Don Quixote",
    "Bloodbag Prosthetic Fixer",
    "Despairing Bloodbag",
    "Who Couldn't Be Bloodfiends Theme Pack",
    "Enamored Researcher of the Ring?",
    "Dawn Office Fixer Sinclair",
    "District 8 (Hongyuan Bioengineering Group)",
    "District 20 Yurodivy Hong Lu",
    "The Index Proxy - Effloresced E.G.O::Procuration Don Quixote",
]

SINNERS = [
    "Don Quixote",
    "Faust",
    "Yi Sang",
    "Ryoshu",
    "Ryoshū",
    "Heathcliff",
    "Ishmael",
    "Rodion",
    "Gregor",
    "Outis",
    "Meursault",
    "Hong Lu",
    "Sinclair",
]

FACTION_MARKERS = {
    "Blade Lineage": "a disciplined violence lineage where etiquette, skill, and grudges can all become route pressure",
    "Cinq": "a dueling-contract frame that fits negotiation, tempo control, and public reputation",
    "Dieci": "a knowledge-and-archive frame that fits memory, debt, and disciplined testimony",
    "Devyat": "a courier-and-logistics frame that fits pursuit, handoff timing, and contested deliveries",
    "Dawn Office": "a fixer-office frame that fits professional duty, symbolic fire, and public sacrifice",
    "Ring": "an art-crime frame that fits forgery, consent boundaries, and hostile aesthetic control",
    "Index": "an instruction-and-prescript frame that fits coerced obedience and counter-clause play",
    "N Corp": "an ideological violence frame that fits purity language, revulsion, and social pressure",
    "Hongyuan Bioengineering Group": "a corporate-biotech frame that fits body modification, privacy, and manufactured dependency",
    "Yurodivy": "a radical street-politics frame that fits public speech, surveillance, and unstable solidarity",
}

TITLE_DISPLAY_OVERRIDES = {
    "???": "Unknown Canon Speaker",
    "Limbus Company Wiki": "Limbus Canon Index",
}

HIGH_IMPACT_PATTERNS = [
    (re.compile(r"Canto|Intervallo|Prologue|Episode|Chapter|Story|Dungeon|Mirror|Railway", re.I), 80),
    (
        re.compile(
            r"Don Quixote|Faust|Yi Sang|Ryoshu|Ryōshū|Heathcliff|Ishmael|Rodion|Gregor|Outis|Meursault|Hong Lu|Sinclair|Dante|Vergilius|Charon",
            re.I,
        ),
        70,
    ),
    (re.compile(r"E\.G\.O|Identity|Lobotomy|Abnormalit|Distortion|Corrosion|Sin|Gift", re.I), 65),
    (
        re.compile(
            r"Association|Assoc\.|Office|Section|Lineage|Corp|Wing|District|Backstreets|Fixer|Finger|Ring|Index|N Corp|W Corp|K Corp|R Corp|T Corp",
            re.I,
        ),
        55,
    ),
    (re.compile(r"Bloodfiend|Bloodbag|La Manchaland|Prosthetic|Body|Surgery|Researcher", re.I), 50),
    (re.compile(r"Theme Pack|Event|Walpurgis|Season|000|00", re.I), 35),
]


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def ascii_slug(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    text = normalized.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^A-Za-z0-9]+", "_", text).strip("_").lower()
    return text[:80] or "canon_term"


def clean_title(title: str) -> str:
    normalized = re.sub(r"\s+", " ", title.replace("_", " ")).strip()
    return TITLE_DISPLAY_OVERRIDES.get(normalized, normalized)


def detect_category(title: str, uid: str) -> str:
    lower = title.lower()
    if title.startswith("Canto "):
        return "canto"
    if "library" in lower or "book theme" in lower:
        return "library"
    if title.startswith("Branch ") or title == "Dungeons":
        return "dungeon"
    if "e.g.o" in lower or "meltdown" in lower:
        return "ego"
    if "bloodbag" in lower or "bloodfiend" in lower:
        return "bloodfiend"
    if any(marker.lower() in lower for marker in FACTION_MARKERS):
        return "faction"
    if uid.startswith("p4_faction_"):
        return "faction"
    return "canon_term"


def detect_sinners(title: str) -> list[str]:
    normalized = unicodedata.normalize("NFKD", title)
    ascii_title = normalized.encode("ascii", "ignore").decode("ascii")
    found: list[str] = []
    for name in SINNERS:
        if name in title or name in ascii_title:
            normalized_name = "Ryoshu" if name in {"Ryoshū", "Ryoshu"} else name
            if normalized_name not in found:
                found.append(normalized_name)
    return found


def detect_frames(title: str) -> list[str]:
    frames: list[str] = []
    for marker, description in FACTION_MARKERS.items():
        if marker.lower() in title.lower():
            frames.append(description)
    return frames


def score_queue_item(item: dict[str, Any]) -> int:
    title = str(item.get("title") or "")
    score = 0
    for pattern, weight in HIGH_IMPACT_PATTERNS:
        if pattern.search(title):
            score += weight
    length = item.get("length")
    if isinstance(length, int):
        score += min(30, length // 1000)
    if item.get("priority") == "P2_rp_support":
        score += 20
    if "/Identity Story" in title:
        score += 25
    if "/Story Episodes/" in title:
        score += 25
    return score


def select_auto_titles(queue_path: Path, count: int) -> list[str]:
    queue = load_json(queue_path)
    items = queue.get("items")
    if not isinstance(items, list):
        raise ValueError(f"{queue_path} does not contain an items list")
    candidates = [
        item
        for item in items
        if isinstance(item, dict)
        and item.get("review_status") == "bridge_needs_manual_expansion"
        and isinstance(item.get("title"), str)
    ]
    ranked = sorted(
        candidates,
        key=lambda item: (
            -score_queue_item(item),
            -int(item.get("length") or 0),
            str(item.get("title") or ""),
        ),
    )
    return [str(item["title"]) for item in ranked[:count]]


def route_uses(category: str) -> tuple[str, str, str]:
    if category == "canto":
        return (
            "Use it as a chapter-pressure lens rather than a recap. Let the title mood decide what the current route is testing: exile, withheld affection, refusal to face facts, frozen change, self-justifying evil, heartbreak, dream collapse, or surrendered testimony.",
            "White Canvas can translate the pressure into consent and selfhood checks; Golden Bough Rebuild can translate it into memory repair costs; Ring Conspiracy can translate it into hostile authorship and contract traps.",
            "Trigger it when a route scene needs a main-story echo, a party reaction, or a reminder that Albina's intimacy must coexist with the larger City machinery.",
        )
    if category == "library":
        return (
            "Use it as an invitation/archive pressure frame. The scene should feel like a formal threshold: entry terms, reading rights, borrowed voices, and the danger of becoming material for someone else's catalog.",
            "White Canvas can turn the invitation into a consent form; Golden Bough Rebuild can turn it into a memory index; Ring Conspiracy can turn it into a forged guest-list or a counterfeit artistic summons.",
            "Trigger it around doors, tickets, books, displays, invitations, or any moment where a polite request might actually be a binding structure.",
        )
    if category == "dungeon":
        return (
            "Use it as an exploration topology frame. Do not explain the dungeon as trivia; make it visible through navigation pressure, branching corridors, supply attrition, locked choices, and the way Albina marks safe return paths.",
            "White Canvas can emphasize protected rooms and non-invasive mapping; Golden Bough Rebuild can emphasize unstable memory geometry; Ring Conspiracy can emphasize staged routes, surveillance, and traps disguised as exhibits.",
            "Trigger it when the player chooses a path, loses certainty about the route, spends supplies, or asks Albina to draw a map that may change after being observed.",
        )
    if category == "ego":
        return (
            "Use it as an E.G.O pressure frame: resonance, corrosion risk, symbolic gear, abnormal emotion, and battle utility should all remain costs instead of free spectacle.",
            "White Canvas can focus on whether power expression preserves bodily integrity; Golden Bough Rebuild can focus on self-recognition after resonance; Ring Conspiracy can focus on stolen aesthetics and counterfeit identity performance.",
            "Trigger it during combat preparation, panic, identity switching, gift choice, healing, meltdown language, or any scene where the party tries to make a dangerous symbol obey a human boundary.",
        )
    if category == "bloodfiend":
        return (
            "Use it as a bloodfiend/body-horror pressure frame. Keep the horror grounded in hunger, prosthetics, dependence, shame, and social containment instead of gore for its own sake.",
            "White Canvas can stress consent around touch and feeding; Golden Bough Rebuild can stress body continuity after repair; Ring Conspiracy can stress the way monstrous imagery can be curated, sold, or weaponized.",
            "Trigger it when blood, prosthetics, thirst, panic, aristocratic etiquette, or public fear changes how the scene treats Albina's art and the player's safety.",
        )
    if category == "faction":
        return (
            "Use it as an organizational pressure frame. Let ranks, uniforms, contracts, section numbers, and reputations shape what characters can risk in public.",
            "White Canvas can stress negotiated boundaries; Golden Bough Rebuild can stress records, witnesses, and professional memory; Ring Conspiracy can stress hostile contracts, counterfeits, and leverage.",
            "Trigger it when an identity, office, association, faction order, or named professional style gives the scene a tactical rule the player can exploit or violate.",
        )
    return (
        "Use it as a focused canon-term anchor. It should add scene texture, stakes, and character reaction without pretending to summarize a full article.",
        "White Canvas can stress consent and self-definition; Golden Bough Rebuild can stress memory continuity; Ring Conspiracy can stress authorship, forgery, and control.",
        "Trigger it only when the term naturally appears in dialogue, investigation, combat, or route bookkeeping.",
    )


def build_content(title: str, uid: str) -> str:
    display = clean_title(title)
    category = detect_category(display, uid)
    category_line, route_line, trigger_line = route_uses(category)
    sinners = detect_sinners(display)
    frames = detect_frames(display)
    sinner_line = (
        f"Character pressure: when {', '.join(sinners)} is present or referenced, keep the focus on observable behavior, speech rhythm, hesitation, and how Albina's attention changes the room."
        if sinners
        else "Character pressure: if no named Sinner is onstage, let nearby witnesses react through practical caution, rumor, or tactical shorthand."
    )
    frame_line = (
        "Faction/identity frame: " + " ".join(frames)
        if frames
        else "Faction/identity frame: treat the title as a route-facing constraint, not as a detached glossary term."
    )
    if category == "canto":
        beat_line = "Scene beats: echo the chapter title through one concrete choice, one emotional cost, and one consequence that can be logged by the story journal."
    elif category == "ego":
        beat_line = "Scene beats: show a visible resonance cue, name the tactical temptation, then require a stabilizing choice before the power helps."
    elif category == "dungeon":
        beat_line = "Scene beats: mark the route, spend or save a supply, and record what changed after the party crossed the threshold."
    elif category == "bloodfiend":
        beat_line = "Scene beats: introduce bodily need or public fear, give the player a boundary-preserving response, and let Albina's art register the cost."
    elif category == "faction":
        beat_line = "Scene beats: show the professional rule, show the social penalty for breaking it, then offer a player-facing exploit or refusal."
    elif category == "library":
        beat_line = "Scene beats: present the invitation, clarify what entry would cost, and let the player decide whether Albina may treat the record as art."
    else:
        beat_line = "Scene beats: attach the term to a sensory detail, a social reaction, and a route consequence."
    return "\n".join(
        [
            f"{display} is an expanded P4 bridge anchor for the Albina route.",
            category_line,
            route_line,
            trigger_line,
            sinner_line,
            frame_line,
            beat_line,
            "Safety boundary: this entry is original route support built from title taxonomy and page index facts only. Do not present it as full canon retelling, do not quote external text, and do not claim full plot restoration from this trigger alone.",
        ]
    )


def is_expanded_bridge_entry(entry: dict[str, Any]) -> bool:
    extensions = entry.get("extensions")
    if isinstance(extensions, dict) and extensions.get("review_status") == "expanded_bridge_needs_article_review":
        return True
    refs = extensions.get("source_refs") if isinstance(extensions, dict) else None
    if isinstance(refs, list):
        return any(isinstance(ref, dict) and ref.get("claim_status") == "expanded_bridge" for ref in refs)
    return False


def count_expanded_bridge_entries(entries: list[Any]) -> int:
    return sum(1 for entry in entries if isinstance(entry, dict) and is_expanded_bridge_entry(entry))


def update_worldbook(path: Path, selected: set[str], version: str, now: str) -> dict[str, Any]:
    data = load_json(path)
    entries = data.get("entries")
    if not isinstance(entries, list):
        raise ValueError(f"{path} does not contain a top-level entries list")
    found: list[str] = []
    missing = sorted(selected)
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        extensions = entry.get("extensions")
        if not isinstance(extensions, dict):
            continue
        refs = extensions.get("source_refs")
        if not isinstance(refs, list) or not refs or not isinstance(refs[0], dict):
            continue
        title = refs[0].get("source_title")
        if not isinstance(title, str) or title not in selected:
            continue
        if title in missing:
            missing.remove(title)
        found.append(title)
        uid = str(entry.get("uid") or ascii_slug(title))
        entry["comment"] = f"P4 expanded bridge: {clean_title(title)}"
        entry["content"] = build_content(title, uid)
        keys = list(dict.fromkeys([*(entry.get("key") or []), "expanded bridge", "story log anchor", "route pressure"]))
        entry["key"] = keys
        for ref in refs:
            if not isinstance(ref, dict):
                continue
            ref["evidence_kind"] = "page_info_manifest"
            ref["claim_status"] = "expanded_bridge"
            ref["expanded_at"] = now
            ref["expansion_version"] = version
            ref["expansion_basis"] = "title_taxonomy_manifest_no_article_text"
        extensions["rp_scope"] = "fanon_expanded_bridge"
        extensions["copyright_mode"] = "original_route_bridge_no_article_text"
        extensions["review_status"] = "expanded_bridge_needs_article_review"
        extensions["expansion_version"] = version
        extensions["expanded_at"] = now
        extensions["expansion_basis"] = "title_taxonomy_manifest_no_article_text"
    data["description"] = (
        "Broad RP support pack for remaining canon-index terms. Some high-impact entries are expanded "
        "from title taxonomy and page metadata for denser route use; they remain separate from hand-reviewed lore packs."
    )
    total_expanded_count = count_expanded_bridge_entries(entries)
    write_json(path, data)
    return {
        "path": str(path),
        "selected_count": len(selected),
        "expanded_count": len(found),
        "total_expanded_count": total_expanded_count,
        "total_unexpanded_count": len(entries) - total_expanded_count,
        "missing_count": len(missing),
        "missing_titles": missing,
        "expanded_titles": sorted(clean_title(title) for title in found),
        "_expanded_source_titles": sorted(found),
    }


def update_queue(path: Path, expanded_titles: set[str], version: str, now: str, worldbook_path: str) -> dict[str, Any]:
    queue = load_json(path)
    items = queue.get("items")
    if not isinstance(items, list):
        raise ValueError(f"{path} does not contain an items list")
    changed = 0
    for item in items:
        if not isinstance(item, dict) or item.get("title") not in expanded_titles:
            continue
        item["status"] = item.get("status") or "source_backed_p4_bridge_written"
        item["target_artifact"] = "expanded_bridge_worldbook_entry"
        item["copyright_mode"] = "original_route_bridge_no_article_text"
        item["covered_by"] = [worldbook_path]
        item["review_status"] = "expanded_bridge_needs_article_review"
        item["expansion_status"] = "expanded_bridge_written"
        item["expansion_version"] = version
        item["expanded_at"] = now
        item["expansion_basis"] = "title_taxonomy_manifest_no_article_text"
        changed += 1
    queue["status_summary"] = dict(sorted(Counter(str(item.get("status") or "unknown") for item in items if isinstance(item, dict)).items()))
    queue["review_status_summary"] = dict(sorted(Counter(str(item.get("review_status") or "unknown") for item in items if isinstance(item, dict)).items()))
    queue["expansion_status_summary"] = dict(sorted(Counter(str(item.get("expansion_status") or "not_expanded") for item in items if isinstance(item, dict)).items()))
    queue["p4_expanded_bridge_updated_at"] = now
    write_json(path, queue)
    return {
        "path": str(path),
        "changed_count": changed,
        "review_status_summary": queue["review_status_summary"],
        "expansion_status_summary": queue["expansion_status_summary"],
    }


def update_status_json(path: Path, expanded_count: int, version: str, now: str, report_path: str) -> None:
    status = load_json(path)
    status["status_scope"] = f"{version} narrative coverage audit"
    based_on = status.setdefault("based_on", [])
    if report_path not in based_on:
        based_on.append(report_path)
    deep = status.setdefault("deep_write_coverage", {})
    deep["p4_expanded_bridge_entry_count"] = expanded_count
    deep["p4_unexpanded_bridge_entry_count"] = int(deep.get("p4_manifest_bridge_entry_count", 1882)) - expanded_count
    deep["expanded_bridge_claim_allowed"] = "Expanded P4 bridge entries are denser original RP prompts built from page-title taxonomy and manifest metadata."
    deep["expanded_bridge_claim_not_allowed"] = "They are not raw article paraphrases and do not increase the deep source-backed title count."
    new = (
        f"The P4 bridge layer has 1882 entries; {expanded_count} are expanded bridge prompts, "
        "but they are still title-taxonomy/metadata based rather than article-level paraphrases."
    )
    reasons = status.setdefault("why_full_restoration_cannot_be_claimed", [])
    replaced = False
    updated_reasons: list[str] = []
    for item in reasons:
        if isinstance(item, str) and (
            item == "The P4 bridge layer has 1882 entries built from title taxonomy and metadata, not deep hand-written article paraphrases."
            or item.startswith("The P4 bridge layer has 1882 entries;")
        ):
            if not replaced:
                updated_reasons.append(new)
                replaced = True
            continue
        updated_reasons.append(item)
    if not replaced:
        updated_reasons.append(new)
    status["why_full_restoration_cannot_be_claimed"] = updated_reasons
    status["p4_expanded_bridge_iteration"] = {
        "version": version,
        "updated_at": now,
        "expanded_entry_count": expanded_count,
        "report": report_path,
        "claim_status": "expanded_bridge_not_deep_article_restoration",
    }
    if "v1_0_9_acceptance" in status:
        status["v1_0_10_acceptance"] = status.pop("v1_0_9_acceptance")
    write_json(path, status)


def main() -> int:
    parser = argparse.ArgumentParser(description="Expand selected P4 manifest bridge entries into denser RP-ready bridge prompts.")
    parser.add_argument("--worldbook", default="worldbooks/albina_p4_manifest_bridge_worldbook.json")
    parser.add_argument("--queue", default="docs/limbus_lore_rewrite_queue.json")
    parser.add_argument("--status-json", default="docs/narrative-system-status.json")
    parser.add_argument("--report", default="docs/p4-expanded-bridge-report.json")
    parser.add_argument("--version", default="v1.0.16")
    parser.add_argument("--title", action="append", default=[])
    parser.add_argument("--auto-count", type=int, default=0, help="Auto-select this many unexpanded high-impact P4 titles from the queue.")
    parser.add_argument("--reconcile-only", action="store_true", help="Only refresh cumulative counts in the report and status JSON.")
    args = parser.parse_args()

    now = datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    if args.reconcile_only:
        data = load_json(Path(args.worldbook))
        entries = data.get("entries")
        if not isinstance(entries, list):
            raise ValueError(f"{args.worldbook} does not contain a top-level entries list")
        total_expanded_count = count_expanded_bridge_entries(entries)
        report_path = Path(args.report)
        report = load_json(report_path) if report_path.exists() else {"version": args.version, "worldbook": {}}
        report["version"] = args.version
        report["reconciled_at"] = now
        report["selection_mode"] = report.get("selection_mode") or "reconcile_only"
        worldbook_report = report.setdefault("worldbook", {})
        worldbook_report["path"] = args.worldbook
        worldbook_report["total_expanded_count"] = total_expanded_count
        worldbook_report["total_unexpanded_count"] = len(entries) - total_expanded_count
        write_json(report_path, report)
        update_status_json(Path(args.status_json), total_expanded_count, args.version, now, args.report)
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 0

    if args.title:
        selected = set(args.title)
        selection_mode = "explicit_titles"
    elif args.auto_count > 0:
        selected = set(select_auto_titles(Path(args.queue), args.auto_count))
        selection_mode = f"auto_high_impact_top_{args.auto_count}"
    else:
        selected = set(DEFAULT_SELECTED_TITLES)
        selection_mode = "default_seed_titles"
    worldbook_report = update_worldbook(Path(args.worldbook), selected, args.version, now)
    expanded_titles = set(worldbook_report.pop("_expanded_source_titles", worldbook_report["expanded_titles"]))
    queue_report = update_queue(Path(args.queue), expanded_titles, args.version, now, args.worldbook)
    report = {
        "generated_at": now,
        "version": args.version,
        "selection_mode": selection_mode,
        "policy": "expanded_bridge_not_article_level_paraphrase",
        "worldbook": worldbook_report,
        "queue": queue_report,
    }
    write_json(Path(args.report), report)
    update_status_json(Path(args.status_json), int(worldbook_report["total_expanded_count"]), args.version, now, args.report)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if not worldbook_report["missing_titles"] else 2


if __name__ == "__main__":
    raise SystemExit(main())
