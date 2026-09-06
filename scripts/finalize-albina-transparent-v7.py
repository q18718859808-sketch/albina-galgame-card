import hashlib
import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "staging/media/krea2-reference-v6/albina-unarmored-reference-v10-v7.png"
CANONICAL = ROOT / "staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png"
OUTPUT = ROOT / "staging/media/krea2-reference-v6/albina-unarmored-reference-v10-v7-transparent.png"
RECEIPT = OUTPUT.with_suffix(".receipt.json")
CROP = (2, 1, 590, 1767)


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    with Image.open(SOURCE) as generated, Image.open(CANONICAL) as canonical:
        if generated.size != (592, 1768):
            raise ValueError(f"Unexpected generated canvas: {generated.size}")
        if canonical.size != (588, 1766) or canonical.mode != "RGBA":
            raise ValueError("Canonical alpha authority is not the locked 588x1766 RGBA source")
        rgb = generated.convert("RGB").crop(CROP)
        if rgb.size != canonical.size:
            raise ValueError("Fixed edge crop did not produce the canonical canvas")
        rgba = rgb.copy()
        rgba.putalpha(canonical.getchannel("A"))
        rgba.save(OUTPUT)
    receipt = {
        "schemaVersion": 1,
        "purpose": "albina-v7-transparent-canvas-finalization",
        "operations": [
            {"kind": "fixed-edge-crop", "box": list(CROP), "scaling": False},
            {"kind": "alpha-channel-assignment", "source": str(CANONICAL), "rgbReplacement": False},
        ],
        "input": {"path": str(SOURCE), "sha256": digest(SOURCE), "width": 592, "height": 1768, "mode": "RGB"},
        "alphaAuthority": {"path": str(CANONICAL), "sha256": digest(CANONICAL), "width": 588, "height": 1766, "mode": "RGBA"},
        "output": {"path": str(OUTPUT), "sha256": digest(OUTPUT), "bytes": OUTPUT.stat().st_size, "width": 588, "height": 1766, "mode": "RGBA"},
        "promotionAllowed": False,
        "review": "direct original-resolution and GCLI paired review required",
    }
    RECEIPT.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(receipt, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
