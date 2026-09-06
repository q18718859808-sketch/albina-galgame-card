#!/usr/bin/env python3
"""Build a geometry-authoritative Albina plate from a reviewed Krea2 material pass.

The canonical source owns alpha, silhouette, dark structural lines, and all
authored geometry. The reviewed Krea2 plate contributes only restrained colour
and material variation inside the canonical subject mask.
"""
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("usage: compose-albina-krea2-material.py canonical.png krea2.png output.png")
    canonical_path, material_path, output_path = map(Path, sys.argv[1:])
    canonical = Image.open(canonical_path).convert("RGBA")
    material = Image.open(material_path).convert("RGB").resize(canonical.size, Image.Resampling.LANCZOS)

    base_rgb = canonical.convert("RGB")
    gray = base_rgb.convert("L")
    # Preserve authored dark construction lines and mechanical boundaries.
    line_mask = gray.point(lambda value: 255 if value < 105 else 0, mode="L")
    line_mask = ImageEnhance.Contrast(line_mask).enhance(1.35)

    # Keep the Krea2 pass deliberately subordinate to canonical geometry.
    blended = Image.blend(base_rgb, material, 0.34)
    rgb = Image.composite(base_rgb, blended, ImageChops.invert(line_mask))
    result = rgb.convert("RGBA")
    result.putalpha(canonical.getchannel("A"))
    result.save(output_path)
    print({"width": result.width, "height": result.height, "bytes": output_path.stat().st_size})


if __name__ == "__main__":
    main()
