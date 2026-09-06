import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image


def inspect_image(path: Path) -> dict:
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        alpha = rgba.getchannel("A")
        bbox = alpha.getbbox()
        if bbox is None:
            raise ValueError(f"Image has no visible subject: {path}")
        left, top, right, bottom = bbox
        width, height = rgba.size
        return {
            "path": str(path.resolve()),
            "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "canvas": {"width": width, "height": height, "hasAlpha": image.mode in {"RGBA", "LA", "PA"}},
            "subjectBounds": {
                "x": left,
                "y": top,
                "width": right - left,
                "height": bottom - top,
                "normalized": {
                    "x": left / width,
                    "y": top / height,
                    "width": (right - left) / width,
                    "height": (bottom - top) / height,
                },
            },
        }


def verify(reference: dict, candidate: dict) -> list[str]:
    issues = []
    if not candidate["canvas"]["hasAlpha"]:
        issues.append("candidate has no alpha channel")
    bounds = candidate["subjectBounds"]["normalized"]
    if bounds["height"] < 0.9:
        issues.append("candidate subject is an inset or loses full-height occupancy")
    if bounds["width"] < 0.75:
        issues.append("candidate subject is too narrow or centered as a thumbnail")
    if bounds["y"] > 0.05:
        issues.append("candidate head begins too far below the canvas top")
    if bounds["y"] + bounds["height"] < 0.95:
        issues.append("candidate feet end too far above the canvas bottom")
    if candidate["canvas"] != reference["canvas"]:
        issues.append("candidate canvas dimensions or alpha state differ from canonical")
    return issues


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("reference", type=Path)
    parser.add_argument("candidate", type=Path, nargs="?")
    parser.add_argument("--out", type=Path)
    args = parser.parse_args()
    report = {"schemaVersion": 1, "reference": inspect_image(args.reference)}
    if args.candidate:
        report["candidate"] = inspect_image(args.candidate)
        report["issues"] = verify(report["reference"], report["candidate"])
        report["passed"] = not report["issues"]
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if args.candidate and not report["passed"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
