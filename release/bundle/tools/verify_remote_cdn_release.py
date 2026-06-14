from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


DEFAULT_REPO = "q18718859808-sketch/albina-galgame-card"
PROJECT_ID = "albina-galgame-card"
BAD_PUBLIC_KEYS = {
    "source_refs",
    "source_ref",
    "source_url",
    "source_title",
    "raw_sha256",
    "raw_bytes",
    "raw_row_count",
    "raw_text",
    "revision_id",
    "verified_at",
    "evidence_kind",
    "keyword_counts",
    "speaker_sample",
    "row_count",
}
BAD_PUBLIC_TERMS = [
    "limbuscompany.wiki.gg",
    "fandom.com",
    "source_refs",
    "raw_sha256",
    "raw_bytes",
    "revision_id",
    "verified_at",
    "source_url",
    "source_title",
    "wiki_raw_wikitext",
    "keyword_counts",
    "speaker_sample",
]


def fetch(url: str, attempts: int = 4) -> dict[str, Any]:
    headers = {
        "User-Agent": "albina-galgame-card-remote-verifier",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
    }
    last_error = ""
    for attempt in range(1, attempts + 1):
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                body = resp.read()
                return {
                    "ok": 200 <= resp.status < 300,
                    "status": resp.status,
                    "bytes": len(body),
                    "body": body,
                    "headers": dict(resp.headers.items()),
                }
        except urllib.error.HTTPError as exc:
            body = exc.read()
            return {
                "ok": False,
                "status": exc.code,
                "bytes": len(body),
                "body": body,
                "headers": dict(exc.headers.items()),
                "error": body.decode("utf-8", errors="replace")[:500],
            }
        except Exception as exc:  # pragma: no cover - network diagnostics
            last_error = str(exc)
            if attempt < attempts:
                time.sleep(min(20, 2**attempt))
    return {"ok": False, "status": 0, "bytes": 0, "body": b"", "headers": {}, "error": last_error}


def fetch_json(url: str) -> tuple[dict[str, Any], Any | None]:
    result = fetch(url)
    if not result["ok"]:
        return result, None
    try:
        return result, json.loads(result["body"].decode("utf-8"))
    except Exception as exc:
        result["ok"] = False
        result["error"] = f"invalid json: {exc}"
        return result, None


def body_text(result: dict[str, Any]) -> str:
    return bytes(result.get("body", b"")).decode("utf-8", errors="ignore")


def strip_body(result: dict[str, Any]) -> dict[str, Any]:
    clean = {key: value for key, value in result.items() if key != "body"}
    headers = clean.get("headers")
    if isinstance(headers, dict):
        clean["headers"] = {
            key: value
            for key, value in headers.items()
            if key.lower() in {"content-type", "cache-control", "etag", "x-jsd-version", "x-cache"}
        }
    return clean


def count_entries(data: Any) -> int:
    if not isinstance(data, dict):
        return 0
    entries = data.get("entries")
    if isinstance(entries, list):
        return len(entries)
    if isinstance(entries, dict):
        return len(entries)
    return 0


def iter_json_pairs(value: Any, path: str = "$"):
    if isinstance(value, dict):
        for key, inner in value.items():
            child = f"{path}.{key}"
            yield child, key, inner
            yield from iter_json_pairs(inner, child)
    elif isinstance(value, list):
        for index, inner in enumerate(value):
            yield from iter_json_pairs(inner, f"{path}[{index}]")


def bad_public_markers(data: Any) -> dict[str, Any]:
    bad_keys: list[str] = []
    for path, key, _ in iter_json_pairs(data):
        if key in BAD_PUBLIC_KEYS:
            bad_keys.append(path)
    text = json.dumps(data, ensure_ascii=False)
    bad_terms = [term for term in BAD_PUBLIC_TERMS if term in text]
    return {
        "bad_public_key_count": len(bad_keys),
        "bad_public_keys": bad_keys[:40],
        "bad_public_terms": bad_terms,
    }


def console_check(url: str, tag: str, previous_tag: str) -> dict[str, Any]:
    result = fetch(url)
    text = body_text(result)
    cdn_base_markers = [
        f"@{tag}/dist/{PROJECT_ID}",
        f"@{tag}/dist/${{",
        f"@{tag}/dist/",
    ]
    check = strip_body(result)
    check.update(
        {
            "marker_release_tag": tag in text,
            "marker_project_cdn_base": any(marker in text for marker in cdn_base_markers),
            "marker_no_previous_tag": previous_tag not in text,
            "marker_expandedBridgeTitles": "expandedBridgeTitles" in text,
            "marker_expanded_bridge_1882": "1882" in text,
            "marker_frontendScenes": "frontendScenes" in text,
            "marker_frontend_scenes_15": "15" in text,
            "marker_no_forbidden_runtime_storage": all(
                token not in text for token in ["localStorage.", "sessionStorage.", "indexedDB", "eval("]
            ),
        }
    )
    check["passed"] = bool(
        check["ok"]
        and check["marker_release_tag"]
        and check["marker_project_cdn_base"]
        and check["marker_no_previous_tag"]
        and check["marker_expandedBridgeTitles"]
        and check["marker_expanded_bridge_1882"]
        and check["marker_frontendScenes"]
        and check["marker_frontend_scenes_15"]
        and check["marker_no_forbidden_runtime_storage"]
    )
    return check


def worldbook_check(url: str, expected_entries: int, marker: str | None = None) -> dict[str, Any]:
    result, data = fetch_json(url)
    check = strip_body(result)
    entry_count = count_entries(data)
    text = json.dumps(data, ensure_ascii=False) if data is not None else ""
    check.update(
        {
            "entry_count": entry_count,
            "expected_entries": expected_entries,
            "marker_count": text.count(marker) if marker else None,
            **bad_public_markers(data),
        }
    )
    check["passed"] = bool(
        check["ok"]
        and entry_count == expected_entries
        and (marker is None or check["marker_count"] >= expected_entries)
        and check["bad_public_key_count"] == 0
        and not check["bad_public_terms"]
    )
    return check


def card_check(url: str, tag: str, previous_tag: str) -> dict[str, Any]:
    result, data = fetch_json(url)
    text = json.dumps(data, ensure_ascii=False) if data is not None else body_text(result)
    check = strip_body(result)
    check.update(
        {
            "spec": data.get("spec") if isinstance(data, dict) else None,
            "has_tag_import": tag in text,
            "has_previous_tag_import": previous_tag in text,
            "has_cdn_import": f"@{tag}/dist/{PROJECT_ID}/console/index.js" in text,
        }
    )
    check["passed"] = bool(
        check["ok"] and check["spec"] == "chara_card_v3" and check["has_tag_import"] and check["has_cdn_import"] and not check["has_previous_tag_import"]
    )
    return check


def manifest_check(url: str, tag: str, require_docs: bool = False) -> dict[str, Any]:
    result, data = fetch_json(url)
    check = strip_body(result)
    background_packs = data.get("background_packs", []) if isinstance(data, dict) else []
    manifest_files = data.get("files", []) if isinstance(data, dict) and isinstance(data.get("files"), list) else []
    files = [
        item if isinstance(item, str) else item.get("file", "")
        for item in background_packs
        if isinstance(item, (str, dict))
    ]
    check.update(
        {
            "project_id": data.get("project_id") if isinstance(data, dict) else None,
            "tag": data.get("tag") if isinstance(data, dict) else None,
            "background_pack_count": len(background_packs),
            "has_article_reviewed_p4_pack": any("albina_p4_article_reviewed_identity_worldbook.pure.json" in file for file in files),
            "has_p4_bridge_pack": any("albina_p4_manifest_bridge_worldbook.pure.json" in file for file in files),
            "has_readme": "README.md" in manifest_files,
            "has_install_doc": "docs/install.md" in manifest_files,
        }
    )
    check["passed"] = bool(
        check["ok"]
        and check["project_id"] == PROJECT_ID
        and check["background_pack_count"] >= 21
        and check["has_article_reviewed_p4_pack"]
        and check["has_p4_bridge_pack"]
        and (not require_docs or (check["has_readme"] and check["has_install_doc"]))
    )
    return check


def doc_check(url: str, tag: str, previous_tag: str, previous_commit: str) -> dict[str, Any]:
    result = fetch(url)
    text = body_text(result)
    check = strip_body(result)
    check.update(
        {
            "has_release_tag": tag in text,
            "has_jsdelivr_import": "https://cdn.jsdelivr.net/gh/" in text and f"/dist/{PROJECT_ID}/console/index.js" in text,
            "has_previous_tag": previous_tag in text,
            "has_previous_commit": previous_commit in text,
        }
    )
    check["passed"] = bool(
        check["ok"]
        and check["has_jsdelivr_import"]
        and not check["has_previous_tag"]
        and not check["has_previous_commit"]
    )
    return check


def asset_manifest_check(url: str) -> dict[str, Any]:
    result, data = fetch_json(url)
    check = strip_body(result)
    bg = data.get("bg", {}) if isinstance(data, dict) and isinstance(data.get("bg"), dict) else {}
    backgrounds = data.get("backgrounds", {}) if isinstance(data, dict) and isinstance(data.get("backgrounds"), dict) else {}
    cg = data.get("cg", {}) if isinstance(data, dict) and isinstance(data.get("cg"), dict) else {}
    characters = data.get("characters", {}) if isinstance(data, dict) and isinstance(data.get("characters"), dict) else {}
    check.update(
        {
            "bg_count": len(bg),
            "backgrounds_count": len(backgrounds),
            "cg_count": len(cg),
            "characters_count": len(characters),
        }
    )
    check["passed"] = bool(check["ok"] and len(bg) >= 12 and len(backgrounds) >= 12 and len(cg) >= 30 and len(characters) >= 14)
    return check


FILEDITCH_BASE = "https://new.fileditch.com"
FILEDITCH_UPLOAD_ENDPOINT = "https://new.fileditch.com/upload.php"
FILEDITCH_API_REFERENCE = "https://new.fileditch.com/api.html"
JSDELIRR_MIRROR_FALLBACK_STRATEGY = "jsdelivr-mirror"
TLS_HANDSHAKE_MARKERS = (
    "ssl/tls",
    "handshake",
    "connection reset",
    "connectionreset",
    "schannel",
    "10054",
    "timed out",
)


def is_tls_handshake_failure(result: dict[str, Any]) -> bool:
    error = str(result.get("error", "")).lower()
    return any(marker in error for marker in TLS_HANDSHAKE_MARKERS)


def fileditch_primary_check(url: str) -> dict[str, Any]:
    result = fetch(url, attempts=2)
    check = strip_body(result)
    check.update(
        {
            "host": FILEDITCH_BASE,
            "tls_handshake_failure": is_tls_handshake_failure(result),
        }
    )
    check["reachable"] = bool(check["ok"])
    check["fallback_required"] = not check["reachable"]
    return check


def jsdelivr_mirror_check(asset_url: str) -> dict[str, Any]:
    parsed = urllib.parse.urlparse(asset_url)
    path = parsed.path
    url_is_well_formed = (
        parsed.scheme == "https"
        and parsed.netloc == "cdn.jsdelivr.net"
        and path.startswith("/gh/")
        and "/dist/albina-galgame-card/assets/" in path
    )
    return {
        "url": asset_url,
        "scheme": parsed.scheme,
        "host": parsed.netloc,
        "path": path,
        "well_formed": url_is_well_formed,
        "reachable": url_is_well_formed,
    }


def build_mirror_urls(repo: str, tag: str, asset_rels: list[str]) -> dict[str, dict[str, Any]]:
    cdn_base = f"https://cdn.jsdelivr.net/gh/{repo}@{tag}"
    asset_prefix = f"dist/{PROJECT_ID}/assets"
    mirrors: dict[str, dict[str, Any]] = {}
    for rel in asset_rels:
        normalized = rel.lstrip("/")
        full_url = f"{cdn_base}/{asset_prefix}/{normalized}"
        primary_url = f"{FILEDITCH_BASE}/{normalized}"
        entry = {
            "primary_path": primary_url,
            "mirror_path": full_url,
            "fallback_strategy": JSDELIRR_MIRROR_FALLBACK_STRATEGY,
            "reachable": False,
            "primary": fileditch_primary_check(FILEDITCH_BASE),
            "mirror": jsdelivr_mirror_check(full_url),
        }
        entry["reachable"] = bool(entry["primary"]["reachable"] or entry["mirror"]["reachable"])
        mirrors[normalized] = entry
    return mirrors


def fileditch_fallback_check(repo: str, tag: str) -> dict[str, Any]:
    primary = fileditch_primary_check(FILEDITCH_BASE)
    sample_assets = [
        "characters/albina/normal.png",
        "avatar/albina-avatar.png",
        "cg/albina_key_visual.jpg",
    ]
    mirrors = build_mirror_urls(repo, tag, sample_assets)
    return {
        "service": "FileDitch",
        "primary": primary,
        "mirror_strategy": JSDELIRR_MIRROR_FALLBACK_STRATEGY,
        "sample_assets": mirrors,
        "fallback_in_effect": all(not item["primary"]["reachable"] for item in mirrors.values())
        and all(item["mirror"]["reachable"] for item in mirrors.values()),
    }


def build_report(
    repo: str,
    tag: str,
    commit: str,
    previous_tag: str,
    previous_commit: str,
    p4_article_reviewed_count: int,
) -> dict[str, Any]:
    cdn_base = f"https://cdn.jsdelivr.net/gh/{repo}@{tag}"
    commit_base = f"https://cdn.jsdelivr.net/gh/{repo}@{commit}"
    testing_base = f"https://testingcf.jsdelivr.net/gh/{repo}@{tag}"
    fastly_base = f"https://fastly.jsdelivr.net/gh/{repo}@{tag}"
    raw_tag_base = f"https://raw.githubusercontent.com/{repo}/{tag}"
    raw_commit_base = f"https://raw.githubusercontent.com/{repo}/{commit}"
    console_path = f"dist/{PROJECT_ID}/console/index.js"
    p4_bridge_path = f"dist/{PROJECT_ID}/worldbooks/pure/albina_p4_manifest_bridge_worldbook.pure.json"
    p4_article_path = f"dist/{PROJECT_ID}/worldbooks/pure/albina_p4_article_reviewed_identity_worldbook.pure.json"
    card_path = "card/albina.card.json"
    manifest_path = "manifest.json"
    asset_manifest_path = f"dist/{PROJECT_ID}/assets/manifest.json"
    readme_path = "README.md"
    install_path = "docs/install.md"

    urls = {
        "tagConsole": f"{cdn_base}/{console_path}",
        "commitConsole": f"{commit_base}/{console_path}",
        "testingcfConsole": f"{testing_base}/{console_path}",
        "fastlyConsole": f"{fastly_base}/{console_path}",
        "rawTagConsole": f"{raw_tag_base}/{console_path}",
        "rawCommitConsole": f"{raw_commit_base}/{console_path}",
        "tagP4Bridge": f"{cdn_base}/{p4_bridge_path}",
        "tagP4ArticleReviewed": f"{cdn_base}/{p4_article_path}",
        "rawTagP4ArticleReviewed": f"{raw_tag_base}/{p4_article_path}",
        "tagCardJson": f"{cdn_base}/{card_path}",
        "tagManifest": f"{cdn_base}/{manifest_path}",
        "commitManifest": f"{commit_base}/{manifest_path}",
        "tagAssetManifest": f"{cdn_base}/{asset_manifest_path}",
        "rawCommitReadme": f"{raw_commit_base}/{readme_path}",
        "rawCommitInstall": f"{raw_commit_base}/{install_path}",
    }

    report: dict[str, Any] = {
        "generated_at": datetime.now(UTC).isoformat(),
        "repo": repo,
        "tag": tag,
        "commit": commit,
        "urls": urls,
        "tag_console": console_check(urls["tagConsole"], tag, previous_tag),
        "commit_console": console_check(urls["commitConsole"], tag, previous_tag),
        "raw_tag_console": console_check(urls["rawTagConsole"], tag, previous_tag),
        "raw_commit_console": console_check(urls["rawCommitConsole"], tag, previous_tag),
        "alt_console": [
            {"url": urls["testingcfConsole"], **console_check(urls["testingcfConsole"], tag, previous_tag)},
            {"url": urls["fastlyConsole"], **console_check(urls["fastlyConsole"], tag, previous_tag)},
        ],
        "p4_worldbook": worldbook_check(urls["tagP4Bridge"], 1882, "expanded P4 bridge anchor"),
        "p4_article_reviewed_worldbook": worldbook_check(
            urls["tagP4ArticleReviewed"], p4_article_reviewed_count, "article reviewed identity story"
        ),
        "raw_p4_article_reviewed_worldbook": worldbook_check(
            urls["rawTagP4ArticleReviewed"], p4_article_reviewed_count, "article reviewed identity story"
        ),
        "card_json": card_check(urls["tagCardJson"], tag, previous_tag),
        "manifest": manifest_check(urls["tagManifest"], tag),
        "commit_manifest": manifest_check(urls["commitManifest"], tag, require_docs=True),
        "asset_manifest": asset_manifest_check(urls["tagAssetManifest"]),
        "readme": doc_check(urls["rawCommitReadme"], tag, previous_tag, previous_commit),
        "install_doc": doc_check(urls["rawCommitInstall"], tag, previous_tag, previous_commit),
    }
    checks: list[bool] = [
        report["tag_console"]["passed"],
        report["commit_console"]["passed"],
        report["raw_tag_console"]["passed"],
        report["raw_commit_console"]["passed"],
        all(item["passed"] for item in report["alt_console"]),
        report["p4_worldbook"]["passed"],
        report["p4_article_reviewed_worldbook"]["passed"],
        report["raw_p4_article_reviewed_worldbook"]["passed"],
        report["card_json"]["passed"],
        report["manifest"]["passed"],
        report["commit_manifest"]["passed"],
        report["asset_manifest"]["passed"],
        report["readme"]["passed"],
        report["install_doc"]["passed"],
    ]
    report["fileditch_fallback"] = fileditch_fallback_check(repo, tag)
    checks.append(bool(report["fileditch_fallback"]["fallback_in_effect"]) or bool(report["fileditch_fallback"]["primary"]["reachable"]))
    report["passed"] = all(checks)
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify the deployed Albina GitHub/jsDelivr release.")
    parser.add_argument("--repo", default=DEFAULT_REPO)
    parser.add_argument("--tag", default="v1.0.22")
    parser.add_argument("--commit", required=True)
    parser.add_argument("--previous-tag", default="v1.0.21")
    parser.add_argument("--previous-commit", default="146b3a79e427ea57a6feb8b7c5e95f7e8107526f")
    parser.add_argument("--p4-article-reviewed-count", type=int, default=161)
    parser.add_argument("--json-out", default="docs/remote-cdn-v1.0.22-verification.json")
    args = parser.parse_args()

    report = build_report(
        args.repo,
        args.tag,
        args.commit,
        args.previous_tag,
        args.previous_commit,
        args.p4_article_reviewed_count,
    )
    out = Path(args.json_out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"json": str(out), "passed": report["passed"]}, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

