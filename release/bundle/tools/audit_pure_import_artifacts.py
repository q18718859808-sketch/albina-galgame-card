from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


STRICT_FORBIDDEN_PATTERNS = [
    "\u6765\u6e90",
    "\u8d44\u6599\u6765\u6e90",
    "\u6e90\u6587\u4ef6",
    "\u5b98\u65b9\u8d44\u6599",
    "\u5ba1\u8ba1",
    "\u8ffd\u6eaf",
    "\u5236\u5361",
    "\u9875\u9762\u5143\u6570\u636e",
    "\u9875\u9762\u5143\u6570\u636e\u6807\u793a",
    "source_refs",
    "source_title",
    "source_url",
    "verified_at",
    "evidence_kind",
    "claim_status",
    "copyright_mode",
    "review_status",
    "source-backed",
    "Source-Backed",
    "source checked",
    "wiki page metadata",
    "wiki metadata",
    "wiki",
    "Wiki",
]

# These words are source-provenance risks in cards, lore JSON, docs, and
# manifests, but ordinary dependency code legitimately uses identifiers such as
# texture.source and metadata. Keep them out of JS/CSS vendor scans.
GENERIC_FORBIDDEN_PATTERNS = [
    "source",
    "Source",
    "SOURCE",
    "metadata",
]

TEXT_SUFFIXES = {
    ".json",
    ".md",
    ".txt",
    ".html",
    ".css",
    ".js",
    ".mjs",
    ".cjs",
    ".yaml",
    ".yml",
    ".toml",
}

GENERIC_TEXT_SUFFIXES = {
    ".json",
    ".md",
    ".txt",
    ".html",
    ".yaml",
    ".yml",
    ".toml",
}

QUESTION_RUN_RE = re.compile(r"\?{3,}")


def iter_text(value: Any, path: str = "$"):
    if isinstance(value, dict):
        for key, item in value.items():
            yield f"{path}.{key}", str(key)
            yield from iter_text(item, f"{path}.{key}")
    elif isinstance(value, list):
        for index, item in enumerate(value):
            yield from iter_text(item, f"{path}[{index}]")
    elif isinstance(value, str):
        yield path, value


def patterns_for_path(path: Path) -> list[str]:
    patterns = list(STRICT_FORBIDDEN_PATTERNS)
    if path.suffix.lower() in GENERIC_TEXT_SUFFIXES:
        patterns.extend(GENERIC_FORBIDDEN_PATTERNS)
    return patterns


def finding(path: Path, json_path: str, pattern: str, sample: str) -> dict[str, str]:
    return {
        "file": str(path),
        "path": json_path,
        "pattern": pattern,
        "sample": sample[:160],
    }


def audit_json_file(path: Path) -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    data = json.loads(path.read_text(encoding="utf-8"))
    for json_path, text in iter_text(data):
        for pattern in patterns_for_path(path):
            if pattern in text:
                findings.append(finding(path, json_path, pattern, text))
        if QUESTION_RUN_RE.search(text):
            findings.append(finding(path, json_path, "question_mark_run", text))
    return findings


def audit_text_file(path: Path) -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return findings

    for index, line in enumerate(text.splitlines(), 1):
        for pattern in patterns_for_path(path):
            if pattern in line:
                findings.append(finding(path, f"line:{index}", pattern, line))
        if path.suffix.lower() != ".js" and QUESTION_RUN_RE.search(line):
            findings.append(finding(path, f"line:{index}", "question_mark_run", line))
    return findings


def audit_path(path: Path) -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    path_text = str(path)
    for pattern in patterns_for_path(path):
        if pattern in path_text:
            findings.append(finding(path, "$path", pattern, path_text))

    if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
        return findings
    if path.suffix.lower() == ".json":
        try:
            return findings + audit_json_file(path)
        except json.JSONDecodeError as exc:
            findings.append(finding(path, "$", "json_decode_error", str(exc)))
            return findings
    return findings + audit_text_file(path)


def is_pure_import_root(root: Path) -> bool:
    return (
        (root / "manifest.json").exists()
        and (root / "card").exists()
        and (root / "worldbooks").exists()
        and (root / "dist").exists()
    )


def collect_targets(root: Path, explicit: list[str]) -> list[Path]:
    if explicit:
        return [Path(path) for path in explicit]
    if is_pure_import_root(root):
        return sorted(
            path
            for path in root.rglob("*")
            if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES
        )
    # Project-root mode audits the importable project-level artifacts only.
    # The raw static worldbook/template files intentionally keep engineering
    # provenance language and are sanitized into worldbooks/pure plus
    # release/pure-import before import.
    targets = [
        root / "card" / "albina.card.json",
        root / "cards" / "albina.card.json",
        root / "card" / "character-card.template.json",
    ]
    pure_dir = root / "worldbooks" / "pure"
    if pure_dir.exists():
        targets.extend(sorted(pure_dir.glob("*.json")))
    return [path for path in targets if path.exists()]


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit pure import artifacts for source-provenance metadata.")
    parser.add_argument("--root", default=".", help="Project root or pure-import root.")
    parser.add_argument("--json-out", help="Optional report path.")
    parser.add_argument("paths", nargs="*", help="Optional explicit text or JSON files to audit.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    targets = collect_targets(root, args.paths)
    findings: list[dict[str, str]] = []
    for path in targets:
        findings.extend(audit_path(path))
    report = {
        "generated_at": datetime.now(UTC).isoformat(),
        "target_count": len(targets),
        "targets": [str(path) for path in targets],
        "finding_count": len(findings),
        "findings": findings[:200],
        "passed": not findings,
    }
    if args.json_out:
        out = Path(args.json_out)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 2


if __name__ == "__main__":
    sys.exit(main())
