from __future__ import annotations

import argparse
import json
import sys
import urllib.parse
import urllib.request
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


API_URL = "https://limbuscompany.wiki.gg/api.php"

DEFAULT_TITLES = [
    "Albina",
    "Albina/Enemy",
    "Albina/Sprites",
    "The Ring",
    "The House of Spiders",
    "Callisto",
    "Fascia",
    "Canto IX: The Unsevering",
    "Limbus Company",
    "The City",
    "Backstreets",
    "Five Fingers",
    "Dante",
    "Vergilius",
    "Charon",
    "Faust",
    "Yi Sang",
]


def fetch_json(params: dict[str, str]) -> dict[str, Any]:
    query = urllib.parse.urlencode(params)
    request = urllib.request.Request(
        f"{API_URL}?{query}",
        headers={
            "Accept": "application/json",
            "User-Agent": "albina-galgame-card-source-metadata/1.0",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def chunks(items: list[str], size: int) -> list[list[str]]:
    return [items[index : index + size] for index in range(0, len(items), size)]


def collect_titles(titles: list[str]) -> tuple[list[dict[str, Any]], list[str]]:
    pages: list[dict[str, Any]] = []
    missing: list[str] = []
    seen_page_keys: set[str] = set()

    for batch in chunks(titles, 40):
        payload = fetch_json(
            {
                "action": "query",
                "format": "json",
                "titles": "|".join(batch),
                "prop": "info",
                "inprop": "url",
                "redirects": "1",
            }
        )
        query = payload.get("query", {})
        normalized = {
            item.get("to", ""): item.get("from", "")
            for item in query.get("normalized", [])
            if isinstance(item, dict)
        }
        redirected = {
            item.get("to", ""): item.get("from", "")
            for item in query.get("redirects", [])
            if isinstance(item, dict)
        }
        for page in query.get("pages", {}).values():
            title = page.get("title", "")
            requested = redirected.get(title) or normalized.get(title) or title
            if "missing" in page:
                missing.append(requested)
                continue
            page_key = str(page.get("pageid") or title)
            if page_key in seen_page_keys:
                continue
            seen_page_keys.add(page_key)
            pages.append(
                {
                    "requested_title": requested,
                    "title": title,
                    "pageid": page.get("pageid"),
                    "length": page.get("length"),
                    "lastrevid": page.get("lastrevid"),
                    "touched": page.get("touched"),
                    "fullurl": page.get("fullurl"),
                    "canonicalurl": page.get("canonicalurl"),
                }
            )

    pages.sort(key=lambda item: str(item.get("title", "")).casefold())
    missing = sorted(set(missing), key=str.casefold)
    return pages, missing


def collect_allpage_titles(namespace: int, max_pages: int | None = None) -> list[str]:
    titles: list[str] = []
    seen_titles: set[str] = set()
    params = {
        "action": "query",
        "format": "json",
        "list": "allpages",
        "apnamespace": str(namespace),
        "aplimit": "max",
    }
    while True:
        payload = fetch_json(params)
        for page in payload.get("query", {}).get("allpages", []):
            title = page.get("title")
            if isinstance(title, str) and title and title not in seen_titles:
                seen_titles.add(title)
                titles.append(title)
                if max_pages is not None and len(titles) >= max_pages:
                    return titles
        continuation = payload.get("continue", {})
        apcontinue = continuation.get("apcontinue")
        if not apcontinue:
            return titles
        params["apcontinue"] = apcontinue


def collect_siteinfo() -> dict[str, Any]:
    payload = fetch_json(
        {
            "action": "query",
            "format": "json",
            "meta": "siteinfo",
            "siprop": "general|statistics",
        }
    )
    query = payload.get("query", {})
    return {
        "general": query.get("general", {}),
        "statistics": query.get("statistics", {}),
    }


def build_manifest(
    titles: list[str],
    *,
    collection_mode: str = "explicit_titles",
    namespace: int | None = None,
) -> dict[str, Any]:
    pages, missing = collect_titles(titles)
    return {
        "generated_at": datetime.now(UTC).isoformat(),
        "source_api": API_URL,
        "siteinfo": collect_siteinfo(),
        "policy": "metadata_only_no_article_text_saved",
        "collection_mode": collection_mode,
        "namespace": namespace,
        "requested_titles": titles,
        "pages": pages,
        "missing_titles": missing,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Collect Limbus Company wiki page metadata without storing article text."
    )
    parser.add_argument("titles", nargs="*", help="Page titles to query. Defaults to the Albina scope.")
    parser.add_argument("--allpages", action="store_true", help="Enumerate page titles from the wiki first.")
    parser.add_argument("--namespace", type=int, default=0, help="Namespace for --allpages. Default: 0 articles.")
    parser.add_argument("--max-pages", type=int, help="Limit --allpages collection for smoke tests.")
    parser.add_argument("--out", required=True, help="Output JSON path.")
    args = parser.parse_args()

    if args.allpages:
        if args.titles:
            raise SystemExit("--allpages cannot be combined with explicit titles")
        titles = collect_allpage_titles(args.namespace, args.max_pages)
        collection_mode = "allpages"
        namespace = args.namespace
    else:
        titles = args.titles or DEFAULT_TITLES
        collection_mode = "explicit_titles"
        namespace = None

    manifest = build_manifest(titles, collection_mode=collection_mode, namespace=namespace)
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "out": str(out),
                "pages": len(manifest["pages"]),
                "missing_titles": manifest["missing_titles"],
                "policy": manifest["policy"],
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
