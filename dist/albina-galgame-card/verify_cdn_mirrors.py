#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
verify_cdn_mirrors.py
====================

CDN 镜像兜底检测脚本（GitHub raw 主路径 + jsDelivr 镜像路径）。

用途：
- 列出 dist/albina-galgame-card/assets/ 下所有图片资源
- 对每个资源同时检测 GitHub raw 与 jsDelivr 两条 URL 是否返回 HTTP 200
- 生成 JSON 报告（含 primary/mirror 双字段结构）+ 控制台摘要
- 当主路径不可达时，提示使用 jsDelivr 镜像作为兜底

URL 模板：
- jsDelivr (mirror):   https://cdn.jsdelivr.net/gh/<user>/<repo>@<tag>/<path>
- GitHub raw (primary): https://raw.githubusercontent.com/<user>/<repo>/<tag>/<path>

base URL 来源：release/github-cdn-root/dist/albina-galgame-card/manifest.json 的 "base" 字段
（默认 jsDelivr 路径，从中解析出 user/repo/tag/path-prefix，再构造 GitHub raw 对应路径）

用法：
    python verify_cdn_mirrors.py [--limit N] [--timeout T] [--no-network]
                                 [--manifest <path>] [--assets-dir <path>]
                                 [--out <path>]

参数：
    --limit N       仅检测前 N 个资源（用于快速测试）
    --timeout T     每个请求的超时秒数（默认 10）
    --no-network    仅生成 URL 列表，不发起网络请求（用于离线审计）
    --manifest      manifest.json 路径（默认自动探测）
    --assets-dir    资源根目录（默认自动探测）
    --out           报告输出路径（默认 verify_cdn_mirrors_report.json）
    --workers       并发线程数（默认 8）

退出码：
    0 = 全部资源双路径可达
    1 = 至少一条路径不可达
    2 = 脚本初始化失败（无 manifest / 无 assets）
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

# --- 常量 ----------------------------------------------------------------

IMAGE_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".bmp", ".avif"
}

# jsDelivr base URL 正则：抓取 user/repo@tag 与 path 前缀
# 例：https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v1.0.37/dist/albina-galgame-card
JSDELIVR_RE = re.compile(
    r"^https?://cdn\.jsdelivr\.net/gh/"
    r"(?P<user>[^/]+)/(?P<repo>[^/@]+)"
    r"@(?P<tag>[^/]+)"
    r"(?:/(?P<prefix>.*))?$"
)

# 默认 manifest 候选路径（按优先级）
DEFAULT_MANIFEST_CANDIDATES = [
    "release/github-cdn-root/dist/albina-galgame-card/manifest.json",
    "dist/albina-galgame-card/assets/manifest.json",
]

# 默认 assets 目录候选
DEFAULT_ASSETS_CANDIDATES = [
    "dist/albina-galgame-card/assets",
    "release/github-cdn-root/dist/albina-galgame-card/assets",
]

USER_AGENT = "albina-cdn-verify/1.0 (+https://github.com/q18718859808-sketch/albina-galgame-card)"


# --- 工具函数 ------------------------------------------------------------


def find_project_root(start: Optional[Path] = None) -> Path:
    """从 start 向上查找包含 dist/ 或 release/ 的项目根。"""
    p = (start or Path(__file__).resolve()).resolve()
    for candidate in [p, *p.parents]:
        if (candidate / "dist").exists() or (candidate / "release").exists():
            return candidate
    return p


def load_manifest(manifest_path: Path) -> Dict[str, Any]:
    """读取 manifest.json，返回字典。"""
    with manifest_path.open("r", encoding="utf-8") as f:
        return json.load(f)


def parse_jsdelivr_base(base_url: str) -> Dict[str, str]:
    """
    解析 jsDelivr base URL，返回 {user, repo, tag, prefix}。
    若不是 jsDelivr URL，抛出 ValueError。
    """
    m = JSDELIVR_RE.match(base_url.rstrip("/"))
    if not m:
        raise ValueError(f"base URL 不是 jsDelivr 格式: {base_url}")
    return {
        "user": m.group("user"),
        "repo": m.group("repo"),
        "tag": m.group("tag"),
        "prefix": (m.group("prefix") or "").rstrip("/"),
    }


def build_url_pair(base_info: Dict[str, str], relative_path: str) -> Dict[str, str]:
    """
    根据解析后的 base 信息与相对路径，构造 primary（GitHub raw）和 mirror（jsDelivr）URL。

    relative_path 形如 "assets/bg/rain_room.jpg"
    """
    rel = relative_path.lstrip("/")
    user = base_info["user"]
    repo = base_info["repo"]
    tag = base_info["tag"]
    prefix = base_info["prefix"]

    # jsDelivr: https://cdn.jsdelivr.net/gh/<user>/<repo>@<tag>/<prefix>/<rel>
    jsdelivr_path = f"{prefix}/{rel}" if prefix else rel
    mirror_url = f"https://cdn.jsdelivr.net/gh/{user}/{repo}@{tag}/{jsdelivr_path}"

    # GitHub raw: https://raw.githubusercontent.com/<user>/<repo>/<tag>/<prefix>/<rel>
    # 注意：raw URL 使用 / 而非 @ 作为 tag 分隔符
    raw_path = jsdelivr_path  # 与 jsDelivr 路径相同
    primary_url = f"https://raw.githubusercontent.com/{user}/{repo}/{tag}/{raw_path}"

    return {"primary": primary_url, "mirror": mirror_url}


def walk_image_assets(assets_dir: Path) -> List[str]:
    """
    递归遍历 assets_dir 下所有图片文件，返回相对 assets_dir 的相对路径列表，
    并在路径前加上 "assets/" 前缀，使其与 manifest.json 中的路径格式一致
    （manifest 路径形如 "assets/bg/rain_room.png"，与 CDN 实际请求路径对应）。

    跳过 .gitkeep、.bak、.backup 等非资源文件。
    """
    results: List[str] = []
    if not assets_dir.exists() or not assets_dir.is_dir():
        return results

    for root, dirs, files in os.walk(assets_dir):
        dirs[:] = [d for d in dirs if d not in {"__pycache__", ".cache", "node_modules"}]
        for fname in files:
            ext = os.path.splitext(fname)[1].lower()
            if ext not in IMAGE_EXTENSIONS:
                continue
            if fname.endswith((".bak", ".backup")):
                continue
            if fname == ".gitkeep":
                continue
            full = Path(root) / fname
            rel = full.relative_to(assets_dir).as_posix()
            # 加上 "assets/" 前缀，使路径与 manifest.json 格式一致
            # （assets_dir 通常是 dist/albina-galgame-card/assets，
            #   而 CDN URL 需要 dist/albina-galgame-card/assets/... 完整路径）
            results.append(f"assets/{rel}")

    results.sort()
    return results


def collect_manifest_paths(manifest: Dict[str, Any]) -> List[str]:
    """
    从 manifest.json 中递归收集所有字符串值（资源相对路径）。
    跳过 base / metadata 等非资源字段。
    """
    skip_keys = {"base", "style_lock", "bgm_metadata", "official", "source", "notes"}
    paths: List[str] = []

    def _walk(obj: Any, key: Optional[str] = None) -> None:
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k in skip_keys and not isinstance(v, (dict, list)):
                    continue
                _walk(v, k)
        elif isinstance(obj, list):
            for item in obj:
                _walk(item, None)
        elif isinstance(obj, str) and key not in skip_keys:
            if obj.startswith("assets/") or obj.startswith("bg/") or obj.startswith("cg/"):
                paths.append(obj)

    _walk(manifest)
    seen = set()
    deduped: List[str] = []
    for p in paths:
        if p not in seen:
            seen.add(p)
            deduped.append(p)
    return deduped


# --- HTTP 检测 -----------------------------------------------------------


def check_url(url: str, timeout: float) -> Dict[str, Any]:
    """
    发起 HEAD 请求，失败时回退到 GET（不读取 body）。
    返回 {ok, status, error, elapsed_ms}。
    """
    result: Dict[str, Any] = {
        "url": url,
        "ok": False,
        "status": None,
        "error": None,
        "elapsed_ms": 0,
    }
    start = time.time()
    req = urllib.request.Request(
        url,
        method="HEAD",
        headers={"User-Agent": USER_AGENT, "Accept": "*/*"},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            result["status"] = resp.status
            result["ok"] = 200 <= resp.status < 400
    except urllib.error.HTTPError as e:
        # HEAD 不被支持时回退到 GET
        if e.code in (405, 403, 501):
            try:
                get_req = urllib.request.Request(
                    url,
                    method="GET",
                    headers={"User-Agent": USER_AGENT, "Accept": "*/*"},
                )
                with urllib.request.urlopen(get_req, timeout=timeout) as resp:
                    result["status"] = resp.status
                    result["ok"] = 200 <= resp.status < 400
            except Exception as ge:  # noqa: BLE001
                result["status"] = getattr(ge, "code", None)
                result["error"] = f"GET fallback failed: {ge}"
        else:
            result["status"] = e.code
            result["error"] = f"HTTP {e.code}: {e.reason}"
    except urllib.error.URLError as e:
        result["error"] = f"URLError: {e.reason}"
    except Exception as e:  # noqa: BLE001
        result["error"] = f"{type(e).__name__}: {e}"
    finally:
        result["elapsed_ms"] = round((time.time() - start) * 1000, 1)

    return result


def check_resource_pair(
    rel_path: str, urls: Dict[str, str], timeout: float
) -> Dict[str, Any]:
    """检测单个资源的两条 URL。"""
    primary = check_url(urls["primary"], timeout)
    mirror = check_url(urls["mirror"], timeout)
    status = "both_ok"
    if not primary["ok"] and not mirror["ok"]:
        status = "both_fail"
    elif not primary["ok"]:
        status = "primary_fail_mirror_ok"
    elif not mirror["ok"]:
        status = "mirror_fail_primary_ok"

    return {
        "path": rel_path,
        "primary": primary,
        "mirror": mirror,
        "status": status,
    }


# --- 主流程 --------------------------------------------------------------


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="检测 albina-galgame-card CDN 资源的双路径可达性（GitHub raw + jsDelivr）",
    )
    parser.add_argument("--limit", type=int, default=0,
                        help="仅检测前 N 个资源（0=全部）")
    parser.add_argument("--timeout", type=float, default=10.0,
                        help="每个请求超时秒数（默认 10）")
    parser.add_argument("--no-network", action="store_true",
                        help="仅生成 URL 列表，不发起网络请求")
    parser.add_argument("--manifest", type=str, default=None,
                        help="manifest.json 路径（默认自动探测）")
    parser.add_argument("--assets-dir", type=str, default=None,
                        help="资源根目录（默认自动探测）")
    parser.add_argument("--out", type=str, default="verify_cdn_mirrors_report.json",
                        help="报告输出路径")
    parser.add_argument("--workers", type=int, default=8,
                        help="并发线程数（默认 8）")
    args = parser.parse_args(argv)

    project_root = find_project_root()

    # --- 定位 manifest.json ---
    if args.manifest:
        manifest_path = Path(args.manifest).resolve()
    else:
        manifest_path = None
        for candidate in DEFAULT_MANIFEST_CANDIDATES:
            p = (project_root / candidate).resolve()
            if p.exists():
                try:
                    m = load_manifest(p)
                    if isinstance(m, dict) and "base" in m:
                        manifest_path = p
                        break
                except Exception:  # noqa: BLE001
                    continue
        if manifest_path is None:
            for candidate in DEFAULT_MANIFEST_CANDIDATES:
                p = (project_root / candidate).resolve()
                if p.exists():
                    manifest_path = p
                    break

    if not manifest_path or not manifest_path.exists():
        print("[ERROR] 未找到 manifest.json，请用 --manifest 指定", file=sys.stderr)
        return 2

    print(f"[INFO] 项目根: {project_root}")
    print(f"[INFO] manifest: {manifest_path}")

    manifest = load_manifest(manifest_path)
    base_url = manifest.get("base")
    if not base_url:
        print("[ERROR] manifest.json 中缺少 'base' 字段", file=sys.stderr)
        return 2

    try:
        base_info = parse_jsdelivr_base(base_url)
    except ValueError as e:
        print(f"[ERROR] {e}", file=sys.stderr)
        return 2

    print(f"[INFO] base URL: {base_url}")
    print(f"[INFO] 解析: user={base_info['user']} repo={base_info['repo']} "
          f"tag={base_info['tag']} prefix={base_info['prefix'] or '(root)'}")

    # --- 定位 assets 目录 ---
    if args.assets_dir:
        assets_dir = Path(args.assets_dir).resolve()
    else:
        assets_dir = None
        for candidate in DEFAULT_ASSETS_CANDIDATES:
            p = (project_root / candidate).resolve()
            if p.exists() and p.is_dir():
                assets_dir = p
                break
    if not assets_dir or not assets_dir.exists():
        print("[ERROR] 未找到 assets 目录，请用 --assets-dir 指定", file=sys.stderr)
        return 2

    print(f"[INFO] assets 目录: {assets_dir}")

    # --- 收集资源路径 ---
    fs_paths = walk_image_assets(assets_dir)
    manifest_paths = collect_manifest_paths(manifest)

    all_paths_set = set(fs_paths)
    manifest_only = [p for p in manifest_paths if p not in all_paths_set]
    all_paths = fs_paths + manifest_only
    print(f"[INFO] assets 目录图片: {len(fs_paths)} 个")
    print(f"[INFO] manifest 登记资源: {len(manifest_paths)} 个"
          f"（其中 {len(manifest_only)} 个未在 assets 目录找到）")
    print(f"[INFO] 合计待检测: {len(all_paths)} 个资源")

    if args.limit > 0:
        all_paths = all_paths[: args.limit]
        print(f"[INFO] --limit {args.limit} 已应用，仅检测前 {len(all_paths)} 个")

    # --- 构造 URL 列表 ---
    entries: List[Dict[str, Any]] = []
    for rel in all_paths:
        urls = build_url_pair(base_info, rel)
        entries.append({"path": rel, "urls": urls})

    # --- 离线模式 ---
    if args.no_network:
        report = {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "mode": "no-network",
            "base": base_url,
            "base_info": base_info,
            "manifest_path": str(manifest_path),
            "assets_dir": str(assets_dir),
            "total": len(entries),
            "entries": [
                {
                    "path": e["path"],
                    "primary": e["urls"]["primary"],
                    "mirror": e["urls"]["mirror"],
                }
                for e in entries
            ],
        }
        out_path = Path(args.out).resolve()
        with out_path.open("w", encoding="utf-8") as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        print(f"[INFO] 离线模式：已生成 URL 列表 -> {out_path}")
        print(f"[INFO] 共 {len(entries)} 个资源，未发起网络请求")
        return 0

    # --- 在线检测 ---
    print(f"[INFO] 开始检测（超时 {args.timeout}s，并发 {args.workers}）...")
    results: List[Dict[str, Any]] = []
    counters = {
        "both_ok": 0,
        "primary_fail_mirror_ok": 0,
        "mirror_fail_primary_ok": 0,
        "both_fail": 0,
    }

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        future_map = {
            pool.submit(check_resource_pair, e["path"], e["urls"], args.timeout): e
            for e in entries
        }
        for i, fut in enumerate(as_completed(future_map), start=1):
            res = fut.result()
            results.append(res)
            counters[res["status"]] = counters.get(res["status"], 0) + 1
            if i % 20 == 0 or i == len(entries):
                print(f"  进度: {i}/{len(entries)} "
                      f"(双通={counters['both_ok']} "
                      f"主挂镜像通={counters['primary_fail_mirror_ok']} "
                      f"镜像挂主通={counters['mirror_fail_primary_ok']} "
                      f"双挂={counters['both_fail']})")

    # --- 排序输出（失败优先） ---
    fail_priority = {
        "both_fail": 0,
        "primary_fail_mirror_ok": 1,
        "mirror_fail_primary_ok": 2,
        "both_ok": 3,
    }
    results.sort(key=lambda r: (fail_priority.get(r["status"], 9), r["path"]))

    # --- 生成报告 ---
    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "mode": "network",
        "base": base_url,
        "base_info": base_info,
        "manifest_path": str(manifest_path),
        "assets_dir": str(assets_dir),
        "total": len(results),
        "summary": {
            "both_ok": counters["both_ok"],
            "primary_fail_mirror_ok": counters["primary_fail_mirror_ok"],
            "mirror_fail_primary_ok": counters["mirror_fail_primary_ok"],
            "both_fail": counters["both_fail"],
            "primary_ok_rate": _rate(counters, "primary"),
            "mirror_ok_rate": _rate(counters, "mirror"),
        },
        "primary": {
            "label": "GitHub raw",
            "url_template": f"https://raw.githubusercontent.com/"
                            f"{base_info['user']}/{base_info['repo']}/{base_info['tag']}/<path>",
        },
        "mirror": {
            "label": "jsDelivr",
            "url_template": f"https://cdn.jsdelivr.net/gh/"
                            f"{base_info['user']}/{base_info['repo']}@{base_info['tag']}/<path>",
        },
        "results": results,
    }

    out_path = Path(args.out).resolve()
    with out_path.open("w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    # --- 控制台摘要 ---
    s = report["summary"]
    print()
    print("=" * 60)
    print("CDN 镜像兜底检测报告")
    print("=" * 60)
    print(f"资源总数:         {report['total']}")
    print(f"双路径均通:       {s['both_ok']}")
    print(f"主路径挂镜像通:   {s['primary_fail_mirror_ok']}  (兜底生效)")
    print(f"镜像挂主路径通:   {s['mirror_fail_primary_ok']}")
    print(f"双路径均挂:       {s['both_fail']}  (严重，需修复)")
    print(f"主路径可达率:     {s['primary_ok_rate']}")
    print(f"镜像路径可达率:   {s['mirror_ok_rate']}")
    print(f"报告文件:         {out_path}")
    print()
    print(f"primary (GitHub raw): {report['primary']['url_template']}")
    print(f"mirror  (jsDelivr):   {report['mirror']['url_template']}")
    print()

    failed = [r for r in results if r["status"] != "both_ok"]
    if failed:
        show = failed[:10]
        print(f"--- 失败/降级资源（前 {len(show)}/{len(failed)}） ---")
        for r in show:
            p_status = r["primary"]["status"] or f"ERR:{r['primary']['error']}"
            m_status = r["mirror"]["status"] or f"ERR:{r['mirror']['error']}"
            print(f"  [{r['status']}] {r['path']}")
            print(f"      primary: {p_status}  mirror: {m_status}")
        if len(failed) > len(show):
            print(f"  ... 另有 {len(failed) - len(show)} 个失败项见报告文件")
        print()
        return 1

    print("OK: 所有资源双路径均可达")
    return 0


def _rate(counters: Dict[str, int], which: str) -> str:
    total = sum(counters.values())
    if total == 0:
        return "0.0%"
    if which == "primary":
        ok = counters["both_ok"] + counters["mirror_fail_primary_ok"]
    else:
        ok = counters["both_ok"] + counters["primary_fail_mirror_ok"]
    return f"{ok / total * 100:.1f}%"


if __name__ == "__main__":
    sys.exit(main())
