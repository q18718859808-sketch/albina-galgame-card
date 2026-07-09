#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch generate 8-frame animation strips via closeapi.top gpt-image-2.

For every source image under the albina-galgame-card assets tree, call the
/v1/images/edits endpoint to produce a single wide horizontal strip of 8
sequential animation frames, then save it under assets/sprite-atlas/.

Features:
  - Resume: skip outputs already present and larger than 10 KB
  - Retry: up to 3 attempts per image, 10 s apart
  - Progress log: assets/sprite-atlas/_progress.json
  - CLI: --test / --limit N / --retry-failed
"""

import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request
import uuid

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
OUTPUT_DIR = os.path.join(ASSETS_DIR, "sprite-atlas")
PROGRESS_PATH = os.path.join(OUTPUT_DIR, "_progress.json")

API_BASE = "https://sub2api.closeapi.top"
API_KEY = "sk-1tGwMq8QZNuC03TVVGjFDk4m1djRNgqi3F4wuul97CXlhS5g"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/126.0.0.0 Safari/537.36"
)
CLASH_PROXY = "http://127.0.0.1:7897"

PROMPT = (
    "Based on this anime character illustration, generate a horizontal strip "
    "of 8 sequential animation frames showing gentle breathing and subtle eye "
    "movement. The character must remain completely identical across all "
    "frames - same face, same hair, same clothing, same colors. Only subtle "
    "motion changes between frames (breathing, blinking, slight head "
    "movement). Frame 8 must hand off cleanly to frame 1 for seamless loop. "
    "Keep transparent or simple background. Output as a single wide "
    "horizontal image with 8 frames side by side."
)

MAX_RETRIES = 3
RETRY_DELAY = 10
SKIP_THRESHOLD = 10 * 1024

# Source scan roots (relative to ASSETS_DIR).
# Each entry maps a source directory to the output sub-directory name.
SCAN_RULES = [
    ("characters/albina", "albina"),
    ("characters/protagonist", "protagonist"),
    ("characters/callisto", "callisto"),
    ("characters/charon", "charon"),
    ("characters/dante", "dante"),
    ("characters/faust", "faust"),
    ("characters/ren", "ren"),
    ("characters/vergilius", "vergilius"),
    ("characters/yi_sang", "yi_sang"),
    ("characters/golden_apparition", "golden_apparition"),
    ("characters/lcd_captain", "lcd_captain"),
    ("characters/lce_doctor", "lce_doctor"),
    ("characters/fixer_informant", "fixer_informant"),
    ("characters/ring_agent", "ring_agent"),
    ("original_cg", "original_cg"),
    ("original_albina_sprites", "original_albina_sprites"),
]

IMAGE_EXTS = (".png", ".jpg", ".jpeg")

# ---------------------------------------------------------------------------
# Clash DNS bypass: route through the mixed-port proxy so Clash does the
# real DNS resolution instead of the hijacked 127.0.0.1 answer.
# ---------------------------------------------------------------------------
_proxy_handler = urllib.request.ProxyHandler({
    "http": CLASH_PROXY,
    "https": CLASH_PROXY,
})
_opener = urllib.request.build_opener(_proxy_handler)
urllib.request.install_opener(_opener)


# ---------------------------------------------------------------------------
# HTTP helpers (mirrors test_closeapi.py)
# ---------------------------------------------------------------------------

def build_multipart(fields, files):
    """Build multipart/form-data body with a random boundary."""
    boundary = uuid.uuid4().hex
    crlf = b"\r\n"
    body = b""

    for key, value in fields.items():
        body += f"--{boundary}".encode() + crlf
        body += f'Content-Disposition: form-data; name="{key}"'.encode() + crlf
        body += crlf
        body += str(value).encode("utf-8") + crlf

    for key, (filename, filedata, content_type) in files.items():
        body += f"--{boundary}".encode() + crlf
        body += (
            f'Content-Disposition: form-data; name="{key}"; '
            f'filename="{filename}"'
        ).encode() + crlf
        body += f"Content-Type: {content_type}".encode() + crlf
        body += crlf
        body += filedata + crlf

    body += f"--{boundary}--".encode() + crlf
    content_type = f"multipart/form-data; boundary={boundary}"
    return content_type, body


def extract_image_bytes(raw_bytes):
    """Return (image_bytes, info) from an API response.

    Handles: JSON with data[].b64_json / data[].url, top-level b64_json,
    and raw binary PNG.
    """
    # Raw PNG fallback.
    if raw_bytes[:4] == b"\x89PNG":
        return raw_bytes, "binary-png"

    text = raw_bytes.decode("utf-8", errors="replace")
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return None, f"non-JSON response (first 200 bytes): {raw_bytes[:200]!r}"

    # data array (standard OpenAI images response).
    if isinstance(data.get("data"), list):
        for item in data["data"]:
            if not isinstance(item, dict):
                continue
            if item.get("b64_json"):
                try:
                    return base64.b64decode(item["b64_json"]), "b64_json"
                except Exception:
                    continue
            if item.get("url"):
                url = item["url"]
                try:
                    ireq = urllib.request.Request(
                        url, headers={"User-Agent": USER_AGENT}
                    )
                    with urllib.request.urlopen(ireq, timeout=60) as ir:
                        return ir.read(), "url"
                except Exception:
                    continue

    # Top-level b64_json.
    if data.get("b64_json"):
        try:
            return base64.b64decode(data["b64_json"]), "b64_json-top"
        except Exception:
            pass

    if "error" in data:
        return None, f"API error: {json.dumps(data['error'], ensure_ascii=False)[:400]}"

    return None, f"unexpected response: {text[:400]}"


def call_image_edit(image_path):
    """Call /v1/images/edits for a single image.

    Returns (success: bool, image_bytes: bytes|None, message: str).
    """
    with open(image_path, "rb") as fh:
        image_bytes = fh.read()

    filename = os.path.basename(image_path)
    ext = os.path.splitext(filename)[1].lower()
    content_type = "image/jpeg" if ext in (".jpg", ".jpeg") else "image/png"

    ct, body = build_multipart(
        fields={
            "model": "gpt-image-2",
            "prompt": PROMPT,
            "size": "1024x1024",
            "n": "1",
        },
        files={
            "image": (filename, image_bytes, content_type),
        },
    )

    req = urllib.request.Request(
        f"{API_BASE}/v1/images/edits",
        data=body,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "User-Agent": USER_AGENT,
            "Content-Type": ct,
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=180) as resp:
        status = resp.status
        raw = resp.read()

    img, info = extract_image_bytes(raw)
    if img:
        return True, img, f"HTTP {status} via {info}, {len(img)} bytes"
    return False, None, f"HTTP {status}, {info}"


# ---------------------------------------------------------------------------
# Scan / path helpers
# ---------------------------------------------------------------------------

def scan_source_files():
    """Return a list of (source_abs_path, output_rel_dir, output_abs_path)."""
    results = []
    for src_rel, out_dir in SCAN_RULES:
        src_abs = os.path.join(ASSETS_DIR, src_rel.replace("/", os.sep))
        if not os.path.isdir(src_abs):
            continue
        for name in sorted(os.listdir(src_abs)):
            if not name.lower().endswith(IMAGE_EXTS):
                continue
            stem = os.path.splitext(name)[0]
            src_file = os.path.join(src_abs, name)
            out_file = os.path.join(
                OUTPUT_DIR, out_dir, f"{stem}_strip.png"
            )
            rel_key = f"{out_dir}/{stem}_strip.png"
            results.append((src_file, out_file, rel_key))
    return results


def should_skip(out_file):
    """Skip if output exists and is larger than SKIP_THRESHOLD."""
    if not os.path.isfile(out_file):
        return False
    if os.path.getsize(out_file) <= SKIP_THRESHOLD:
        return False
    return True


# ---------------------------------------------------------------------------
# Progress log
# ---------------------------------------------------------------------------

def load_progress():
    if os.path.isfile(PROGRESS_PATH):
        try:
            with open(PROGRESS_PATH, "r", encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            return {}
    return {}


def save_progress(progress):
    os.makedirs(os.path.dirname(PROGRESS_PATH), exist_ok=True)
    tmp = PROGRESS_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(progress, fh, ensure_ascii=False, indent=2)
    os.replace(tmp, PROGRESS_PATH)


# ---------------------------------------------------------------------------
# Main processing
# ---------------------------------------------------------------------------

def process_one(src_file, out_file, rel_key, progress):
    """Generate one strip with retries. Returns True on success."""
    os.makedirs(os.path.dirname(out_file), exist_ok=True)

    last_msg = ""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            ok, img, msg = call_image_edit(src_file)
            last_msg = msg
            if ok and img:
                with open(out_file, "wb") as fh:
                    fh.write(img)
                progress[rel_key] = {
                    "status": "done",
                    "source": os.path.relpath(src_file, BASE_DIR),
                    "output": os.path.relpath(out_file, BASE_DIR),
                    "size": len(img),
                    "attempts": attempt,
                    "timestamp": int(time.time()),
                }
                save_progress(progress)
                print(f"  [OK] {msg}")
                return True
            print(f"  [attempt {attempt}/{MAX_RETRIES}] failed: {msg}")
        except urllib.error.HTTPError as exc:
            try:
                err_body = exc.read().decode("utf-8", errors="replace")[:300]
            except Exception:
                err_body = ""
            last_msg = f"HTTP {exc.code}: {err_body}"
            print(f"  [attempt {attempt}/{MAX_RETRIES}] HTTPError: {last_msg}")
        except Exception as exc:
            last_msg = f"{type(exc).__name__}: {exc}"
            print(f"  [attempt {attempt}/{MAX_RETRIES}] {last_msg}")

        if attempt < MAX_RETRIES:
            time.sleep(RETRY_DELAY)

    progress[rel_key] = {
        "status": "failed",
        "source": os.path.relpath(src_file, BASE_DIR),
        "output": os.path.relpath(out_file, BASE_DIR),
        "error": last_msg,
        "attempts": MAX_RETRIES,
        "timestamp": int(time.time()),
    }
    save_progress(progress)
    return False


def main():
    parser = argparse.ArgumentParser(
        description="Batch generate 8-frame animation strips via gpt-image-2."
    )
    parser.add_argument(
        "--test", action="store_true",
        help="Only generate one strip (albina/normal.png).",
    )
    parser.add_argument(
        "--limit", type=int, default=0,
        help="Only process the first N pending images.",
    )
    parser.add_argument(
        "--retry-failed", action="store_true",
        help="Only retry images previously marked failed.",
    )
    args = parser.parse_args()

    print(f"[INFO] BASE_DIR   = {BASE_DIR}")
    print(f"[INFO] ASSETS_DIR = {ASSETS_DIR}")
    print(f"[INFO] OUTPUT_DIR = {OUTPUT_DIR}")
    print(f"[INFO] Proxy      = {CLASH_PROXY}")
    print()

    if not os.path.isdir(ASSETS_DIR):
        print(f"[FATAL] assets dir not found: {ASSETS_DIR}")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_jobs = scan_source_files()
    print(f"[INFO] Discovered {len(all_jobs)} source images.")

    progress = load_progress()

    # Build the working list.
    if args.test:
        test_jobs = [
            j for j in all_jobs
            if j[2] == "albina/normal_strip.png"
        ]
        if not test_jobs:
            print("[FATAL] --test target albina/normal.png not found.")
            sys.exit(1)
        jobs = test_jobs
        print("[INFO] --test mode: only albina/normal.png")
    elif args.retry_failed:
        jobs = [
            j for j in all_jobs
            if progress.get(j[2], {}).get("status") == "failed"
        ]
        print(f"[INFO] --retry-failed: {len(jobs)} previously failed images.")
        # Do not skip-by-size in retry-failed mode; force regen.
    else:
        jobs = []
        for src_file, out_file, rel_key in all_jobs:
            if should_skip(out_file):
                st = progress.get(rel_key, {}).get("status")
                if st != "done":
                    progress[rel_key] = {
                        "status": "done",
                        "source": os.path.relpath(src_file, BASE_DIR),
                        "output": os.path.relpath(out_file, BASE_DIR),
                        "size": os.path.getsize(out_file),
                        "attempts": 0,
                        "timestamp": int(time.time()),
                        "note": "pre-existing",
                    }
                continue
            if progress.get(rel_key, {}).get("status") == "done":
                continue
            jobs.append((src_file, out_file, rel_key))
        if args.limit > 0:
            jobs = jobs[:args.limit]
            print(f"[INFO] --limit {args.limit}: processing {len(jobs)} images.")

    if not jobs:
        print("[INFO] Nothing to do.")
        return

    print(f"[INFO] Will process {len(jobs)} images.\n")

    success = 0
    failed = 0
    for idx, (src_file, out_file, rel_key) in enumerate(jobs, 1):
        print(
            f"[{idx}/{len(jobs)}] {rel_key}\n"
            f"        src: {os.path.relpath(src_file, BASE_DIR)}"
        )
        if process_one(src_file, out_file, rel_key, progress):
            success += 1
        else:
            failed += 1

    print()
    print("=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"  Processed : {len(jobs)}")
    print(f"  Success   : {success}")
    print(f"  Failed    : {failed}")
    print(f"  Progress  : {PROGRESS_PATH}")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
