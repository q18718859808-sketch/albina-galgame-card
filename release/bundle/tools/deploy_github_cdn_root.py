from __future__ import annotations

import argparse
import base64
import hashlib
import http.client
import json
import os
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


API = "https://api.github.com"


def git_credential_token() -> str | None:
    try:
        proc = subprocess.run(
            ["git", "credential", "fill"],
            input="protocol=https\nhost=github.com\n\n",
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    except OSError:
        return None
    token = None
    for line in proc.stdout.splitlines():
        if line.startswith("password="):
            token = line.split("=", 1)[1].strip()
    return token or None


def load_token() -> str:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or git_credential_token()
    if not token:
        raise SystemExit("No GitHub token available from GITHUB_TOKEN/GH_TOKEN or git credential manager.")
    return token


TRANSIENT_HTTP_STATUSES = {429, 502, 503, 504}


def request_json(method: str, path: str, token: str, body: Any | None = None, attempts: int = 5) -> Any:
    data = None
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "User-Agent": "albina-galgame-card-deployer",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(f"{API}{path}", data=data, headers=headers, method=method)
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                raw = resp.read().decode("utf-8")
                return json.loads(raw) if raw else None
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            retry_after = exc.headers.get("Retry-After")
            if exc.code in TRANSIENT_HTTP_STATUSES and attempt < attempts:
                delay = int(retry_after) if retry_after and retry_after.isdigit() else min(45, 2 ** attempt)
                print(f"GitHub API {method} {path} transient HTTP {exc.code}; retry {attempt}/{attempts} in {delay}s", file=sys.stderr, flush=True)
                time.sleep(delay)
                continue
            raise RuntimeError(f"GitHub API {method} {path} failed: HTTP {exc.code}: {detail}") from exc
        except (TimeoutError, urllib.error.URLError, http.client.RemoteDisconnected, ConnectionError, ssl.SSLError) as exc:
            if attempt < attempts:
                delay = min(45, 2 ** attempt)
                print(f"GitHub API {method} {path} transient network error; retry {attempt}/{attempts} in {delay}s: {exc}", file=sys.stderr, flush=True)
                time.sleep(delay)
                continue
            raise RuntimeError(f"GitHub API {method} {path} failed: {exc}") from exc
    raise RuntimeError(f"GitHub API {method} {path} failed after {attempts} attempts")


def collect_files(root: Path) -> list[Path]:
    return sorted(path for path in root.rglob("*") if path.is_file())


def git_blob_sha(raw: bytes) -> str:
    return hashlib.sha1(b"blob " + str(len(raw)).encode("ascii") + b"\0" + raw).hexdigest()


def current_tree_blobs(repo: str, token: str, tree_sha: str) -> dict[str, str]:
    tree = request_json("GET", f"/repos/{repo}/git/trees/{tree_sha}?recursive=1", token)
    blobs: dict[str, str] = {}
    for item in tree.get("tree", []):
        if item.get("type") == "blob" and item.get("path") and item.get("sha"):
            blobs[str(item["path"])] = str(item["sha"])
    return blobs


def create_blob(repo: str, token: str, path: Path, blob_cache: dict[str, str]) -> str:
    raw = path.read_bytes()
    digest = git_blob_sha(raw)
    if digest in blob_cache:
        return blob_cache[digest]
    content = base64.b64encode(raw).decode("ascii")
    try:
        blob = request_json("POST", f"/repos/{repo}/git/blobs", token, {"content": content, "encoding": "base64"})
    except RuntimeError as exc:
        raise RuntimeError(f"failed while uploading blob for {path}") from exc
    blob_cache[digest] = str(blob["sha"])
    return blob_cache[digest]


def deploy(root: Path, repo: str, branch: str, tag: str, message: str, json_out: Path) -> dict[str, Any]:
    token = load_token()
    files = collect_files(root)
    ref = request_json("GET", f"/repos/{repo}/git/ref/heads/{branch}", token)
    parent_sha = ref["object"]["sha"]
    parent_commit = request_json("GET", f"/repos/{repo}/git/commits/{parent_sha}", token)
    existing_blobs = current_tree_blobs(repo, token, str(parent_commit["tree"]["sha"]))

    tree_entries = []
    blob_cache: dict[str, str] = {}
    reused_count = 0
    uploaded_count = 0
    for index, file_path in enumerate(files, start=1):
        rel = file_path.relative_to(root).as_posix()
        raw = file_path.read_bytes()
        digest = git_blob_sha(raw)
        if existing_blobs.get(rel) == digest:
            sha = digest
            reused_count += 1
        else:
            if index == 1 or index % 25 == 0 or file_path.stat().st_size >= 1_000_000:
                print(f"uploading {index}/{len(files)} {rel}", flush=True)
            sha = create_blob(repo, token, file_path, blob_cache)
            uploaded_count += 1
        if existing_blobs.get(rel) == digest and (index == 1 or index % 50 == 0):
            print(f"reusing {index}/{len(files)} {rel}", flush=True)
        elif index == 1 or index % 50 == 0:
            print(f"uploading {index}/{len(files)} {rel}", flush=True)
        tree_entries.append(
            {
                "path": rel,
                "mode": "100644",
                "type": "blob",
                "sha": sha,
            }
        )
    tree = request_json("POST", f"/repos/{repo}/git/trees", token, {"tree": tree_entries})
    commit = request_json(
        "POST",
        f"/repos/{repo}/git/commits",
        token,
        {
            "message": message,
            "tree": tree["sha"],
            "parents": [parent_commit["sha"]],
        },
    )
    commit_sha = commit["sha"]
    request_json("PATCH", f"/repos/{repo}/git/refs/heads/{branch}", token, {"sha": commit_sha, "force": False})

    tag_ref_path = f"/repos/{repo}/git/refs/tags/{tag}"
    try:
        request_json("GET", tag_ref_path, token)
    except RuntimeError as exc:
        if "HTTP 404" not in str(exc):
            raise
        request_json("POST", f"/repos/{repo}/git/refs", token, {"ref": f"refs/tags/{tag}", "sha": commit_sha})
    else:
        request_json("PATCH", tag_ref_path, token, {"sha": commit_sha, "force": True})

    owner_repo = repo
    cdn_url = f"https://cdn.jsdelivr.net/gh/{owner_repo}@{commit_sha}/dist/albina-galgame-card/console/index.js"
    tag_cdn_url = f"https://cdn.jsdelivr.net/gh/{owner_repo}@{tag}/dist/albina-galgame-card/console/index.js"
    report = {
        "generated_at": datetime.now(UTC).isoformat(),
        "repo": f"https://github.com/{owner_repo}",
        "branch": branch,
        "commit": commit_sha,
        "tag": tag,
        "files": len(files),
        "reused_files": reused_count,
        "uploaded_files": uploaded_count,
        "cdn_url": cdn_url,
        "tag_cdn_url": tag_cdn_url,
        "cdn_import": f"import '{cdn_url}'",
    }
    json_out.parent.mkdir(parents=True, exist_ok=True)
    json_out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description="Deploy the minimized GitHub CDN root using the GitHub Git Data API.")
    parser.add_argument("--root", default="release/github-cdn-root")
    parser.add_argument("--repo", default="q18718859808-sketch/albina-galgame-card")
    parser.add_argument("--branch", default="main")
    parser.add_argument("--tag", default="v1.0.22")
    parser.add_argument("--message", default="release: albina galgame card v1.0.22")
    parser.add_argument("--json-out", default="docs/github-deploy-result.json")
    args = parser.parse_args()

    report = deploy(Path(args.root).resolve(), args.repo, args.branch, args.tag, args.message, Path(args.json_out))
    print(json.dumps({k: report[k] for k in ["repo", "commit", "tag", "files", "cdn_url"]}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())

