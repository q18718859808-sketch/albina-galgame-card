"""Build side-by-side canonical-vs-restyle review sheets.

Run from the project root so no non-ASCII path segments are needed:
  python scripts/review-pairs.py <canonical_rel> <restyle_rel> <out_dir_rel> [--tall]
"""
import os
import sys

from PIL import Image

NEUTRAL = (34, 34, 38, 255)


def flatten(path):
    img = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", img.size, NEUTRAL)
    bg.alpha_composite(img)
    return bg.convert("RGB")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    tall = "--tall" in sys.argv[1:]
    canon_rel, out_rel, dir_rel = args[0], args[1], args[2]
    canon = flatten(canon_rel)
    out = flatten(out_rel)
    canon = canon.resize(out.size, Image.LANCZOS)
    w, h = out.size
    if tall:
        regions = {
            "face": (0.20, 0.00, 0.85, 0.16),
            "torso": (0.05, 0.14, 1.00, 0.44),
            "lower": (0.05, 0.42, 1.00, 0.76),
            "feet": (0.05, 0.74, 1.00, 1.00),
        }
    else:
        regions = {
            "full": (0.0, 0.0, 1.0, 1.0),
            "upperleft": (0.0, 0.0, 0.55, 0.55),
            "center": (0.22, 0.22, 0.78, 0.78),
            "lowerright": (0.45, 0.45, 1.0, 1.0),
        }
    os.makedirs(dir_rel, exist_ok=True)
    for name, (x0, y0, x1, y1) in regions.items():
        box = (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))
        a = canon.crop(box)
        b = out.crop(box)
        zoom = 2 if name == "face" else 1
        if zoom > 1:
            a = a.resize((a.width * zoom, a.height * zoom), Image.NEAREST)
            b = b.resize((b.width * zoom, b.height * zoom), Image.NEAREST)
        comp = Image.new("RGB", (a.width * 2 + 16, max(a.height, b.height)), (12, 12, 14))
        comp.paste(a, (0, 0))
        comp.paste(b, (a.width + 16, 0))
        target = os.path.join(dir_rel, "pair_%s.png" % name)
        comp.save(target)
        print(target, comp.size)


if __name__ == "__main__":
    main()
