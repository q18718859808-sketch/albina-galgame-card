#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageOps, ImageStat


ROOT = Path(__file__).resolve().parents[1]
GENERATED_DIR = Path(
    "C:/Users/\u5f20\u4e00\u5e06/.codex/generated_images/"
    "019e4bbf-027f-7ec3-acc8-a3720b1859e7"
)
CHROMA_HELPER = Path(
    "C:/Users/\u5f20\u4e00\u5e06/.codex/skills/.system/imagegen/scripts/remove_chroma_key.py"
)


@dataclass(frozen=True)
class Sheet:
    key: str
    cols: int
    rows: int
    kind: str


SHEET_ORDER = [
    Sheet("albina_01_v2", 3, 2, "sprite"),
    Sheet("albina_02_v2", 3, 2, "sprite"),
    Sheet("albina_03_v2", 3, 2, "sprite"),
    Sheet("protagonist_01_v2", 3, 2, "sprite"),
    Sheet("protagonist_02_v2", 3, 2, "sprite"),
    Sheet("supporting_v2", 4, 3, "sprite"),
    Sheet("cg_01_v2", 3, 2, "panel"),
    Sheet("cg_02_v2", 3, 2, "panel"),
    Sheet("cg_03_v2", 3, 2, "panel"),
    Sheet("cg_04_v2", 3, 2, "panel"),
    Sheet("bg_01_v2", 3, 2, "panel"),
    Sheet("bg_02_v2", 3, 2, "panel"),
]

ALBINA_NAMES = [
    "normal",
    "smile",
    "surgical",
    "combat",
    "armored",
    "unarmored",
    "shy",
    "amused",
    "focused",
    "wounded",
    "furious",
    "fascia-open",
    "maestro",
    "white-canvas",
    "golden-bough",
    "ring-conspiracy",
    "endgame",
    "rain",
]

PROTAGONIST_NAMES = [
    "normal",
    "smile",
    "serious",
    "injured",
    "coat",
    "formal",
    "battle",
    "tender",
    "shadow",
    "profile",
    "resolve",
    "wet-hair",
]

SUPPORTING = [
    ("dante", "normal"),
    ("vergilius", "normal"),
    ("charon", "normal"),
    ("faust", "normal"),
    ("yi_sang", "normal"),
    ("lcd_captain", "normal"),
    ("callisto", "normal"),
    ("ren", "normal"),
    ("lce_doctor", "normal"),
    ("fixer_informant", "normal"),
    ("golden_apparition", "normal"),
    ("ring_agent", "normal"),
]

BG_NAMES = [
    "backstreets_rain",
    "spider_gallery",
    "lce_lab",
    "golden_bough",
    "limbus_bus",
    "ring_atelier",
    "city_rooftop",
    "mirror_corridor",
    "outskirts_dawn",
    "nest_station",
    "rain_room",
    "white_canvas",
]

CG_NAMES = [
    "opening_rain",
    "first_gallery",
    "fascia_heartbeat",
    "white_canvas_choice",
    "backstreet_pursuit",
    "lce_raid",
    "golden_bough_rebuild",
    "ring_invitation",
    "trust_threshold",
    "danger_threshold",
    "art_resonance",
    "maestro_shadow",
    "ren_interruption",
    "araya_rooftop",
    "sinclair_flash",
    "limbus_bus_night",
    "surgery_of_memory",
    "hollow_torso_reveal",
    "rain_confession",
    "conspiracy_contract",
    "rebuild_awakening",
    "white_canvas_ending",
    "golden_bough_ending",
    "ring_conspiracy_ending",
]


def clean_dir(path: Path, suffixes: tuple[str, ...]) -> None:
    path.mkdir(parents=True, exist_ok=True)
    for file in path.rglob("*"):
        if file.is_file() and file.suffix.lower() in suffixes:
            file.unlink()


def clean_previous_outputs() -> None:
    for rel, suffixes in [
        ("assets/characters", (".png", ".webp", ".jpg", ".jpeg")),
        ("assets/cg", (".png", ".webp", ".jpg", ".jpeg")),
        ("assets/bg", (".png", ".webp", ".jpg", ".jpeg")),
        ("assets/generated", (".png", ".webp", ".jpg", ".jpeg", ".json")),
    ]:
        clean_dir(ROOT / rel, suffixes)
    avatar = ROOT / "assets" / "avatar" / "albina-avatar.png"
    if avatar.exists():
        avatar.unlink()


def ensure_dirs() -> None:
    for rel in [
        "assets/generated/source-sheets",
        "assets/generated/alpha-sheets",
        "assets/generated/audit",
        "assets/characters/albina",
        "assets/characters/protagonist",
        "assets/bg",
        "assets/cg",
        "assets/avatar",
    ]:
        (ROOT / rel).mkdir(parents=True, exist_ok=True)
    for cid, _ in SUPPORTING:
        (ROOT / "assets" / "characters" / cid).mkdir(parents=True, exist_ok=True)


def latest_generated(limit: int) -> list[Path]:
    files = sorted(GENERATED_DIR.glob("*.png"), key=lambda p: p.stat().st_mtime)
    if len(files) < limit:
        raise SystemExit(f"Need at least {limit} generated PNG files in {GENERATED_DIR}, found {len(files)}.")
    return files[-limit:]


def load_mapping(args: argparse.Namespace) -> dict[str, Path]:
    if args.map:
        raw = json.loads(Path(args.map).read_text(encoding="utf-8"))
        return {key: Path(value) for key, value in raw.items()}
    files = latest_generated(len(SHEET_ORDER))
    return {sheet.key: file for sheet, file in zip(SHEET_ORDER, files)}


def copy_source_sheets(mapping: dict[str, Path]) -> dict[str, Path]:
    copied: dict[str, Path] = {}
    for sheet in SHEET_ORDER:
        src = mapping[sheet.key]
        if not src.exists():
            raise FileNotFoundError(src)
        dst = ROOT / "assets" / "generated" / "source-sheets" / f"{sheet.key}.png"
        shutil.copy2(src, dst)
        copied[sheet.key] = dst
    return copied


def remove_chroma(sheet_path: Path, key: str) -> Path:
    out = ROOT / "assets" / "generated" / "alpha-sheets" / f"{key}.png"
    subprocess.check_call(
        [
            "python",
            str(CHROMA_HELPER),
            "--input",
            str(sheet_path),
            "--out",
            str(out),
            "--auto-key",
            "border",
            "--soft-matte",
            "--transparent-threshold",
            "12",
            "--opaque-threshold",
            "220",
            "--despill",
            "--force",
        ]
    )
    return out


def crop_grid(image: Image.Image, cols: int, rows: int) -> list[Image.Image]:
    cells: list[Image.Image] = []
    width, height = image.size
    for row in range(rows):
        for col in range(cols):
            left = round(width * col / cols)
            right = round(width * (col + 1) / cols)
            top = round(height * row / rows)
            bottom = round(height * (row + 1) / rows)
            cells.append(image.crop((left, top, right, bottom)))
    return cells


def trim_alpha(image: Image.Image, padding: int = 16) -> Image.Image:
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return rgba
    left, top, right, bottom = bbox
    left = max(left - padding, 0)
    top = max(top - padding, 0)
    right = min(right + padding, rgba.width)
    bottom = min(bottom + padding, rgba.height)
    return rgba.crop((left, top, right, bottom))


def place_sprite(cell: Image.Image, out_path: Path, canvas_size: tuple[int, int] = (900, 1200)) -> None:
    sprite = trim_alpha(cell, padding=18)
    max_w = canvas_size[0] - 54
    max_h = canvas_size[1] - 34
    scale = min(max_w / sprite.width, max_h / sprite.height)
    new_size = (max(1, round(sprite.width * scale)), max(1, round(sprite.height * scale)))
    sprite = sprite.resize(new_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    x = (canvas_size[0] - sprite.width) // 2
    y = canvas_size[1] - sprite.height - 6
    canvas.alpha_composite(sprite, (x, y))
    canvas.save(out_path)


def save_panel(cell: Image.Image, out_path: Path, size: tuple[int, int] = (1280, 720)) -> None:
    rgb = cell.convert("RGB")
    crop_margin_x = max(0, round(rgb.width * 0.025))
    crop_margin_y = max(0, round(rgb.height * 0.025))
    if rgb.width > crop_margin_x * 2 and rgb.height > crop_margin_y * 2:
        rgb = rgb.crop((crop_margin_x, crop_margin_y, rgb.width - crop_margin_x, rgb.height - crop_margin_y))
    panel = ImageOps.fit(rgb, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    panel.save(out_path, quality=93, optimize=True)


def make_avatar() -> None:
    sprite = Image.open(ROOT / "assets" / "characters" / "albina" / "normal.png").convert("RGBA")
    alpha = sprite.getchannel("A")
    bbox = alpha.getbbox() or (0, 0, sprite.width, sprite.height)
    crop = sprite.crop(bbox)
    crop = ImageOps.contain(crop, (760, 900), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (768, 1024), (6, 8, 13, 255))
    for y in range(canvas.height):
        tone = int(44 + 52 * y / canvas.height)
        for x in range(canvas.width):
            if (x * 3 + y * 5) % 11 == 0:
                canvas.putpixel((x, y), (tone, tone + 10, tone + 20, 255))
    canvas.alpha_composite(crop, ((canvas.width - crop.width) // 2, canvas.height - crop.height - 16))
    canvas.save(ROOT / "assets" / "avatar" / "albina-avatar.png")


def build_manifest() -> dict:
    bg = {name: f"bg/{name}.jpg" for name in BG_NAMES}
    manifest = {
        "style_lock": {
            "name": "CG battle narrative illustration",
            "notes": [
                "cold lethal battlefield-ruin mood",
                "hard cinematic contrast",
                "sharp combat dynamics",
                "dark cold palette",
                "film storyboard framing",
                "Albina costume/equipment calibrated from reference research, not packed from official art",
                "V2 screening rejects SVG placeholders and generic soft fantasy sprites",
            ],
        },
        "bg": bg,
        "backgrounds": dict(bg),
        "characters": {
            "albina": {name: f"characters/albina/{name}.png" for name in ALBINA_NAMES},
            "protagonist": {name: f"characters/protagonist/{name}.png" for name in PROTAGONIST_NAMES},
        },
        "cg": {name: f"cg/{name}.jpg" for name in CG_NAMES},
        "ui": {
            "textbox": "ui/textbox.svg",
            "choice_button": "ui/choice_button.svg",
            "status_panel": "ui/status_panel.svg",
            "gallery_frame": "ui/gallery_frame.svg",
            "menu_plate": "ui/menu_plate.svg",
            "scanline_mask": "ui/scanline_mask.svg",
        },
        "audio": {},
    }
    for cid, sprite in SUPPORTING:
        manifest["characters"][cid] = {sprite: f"characters/{cid}/{sprite}.png"}
    return manifest


def write_manifest() -> None:
    manifest = build_manifest()
    for target in [ROOT / "assets" / "manifest.json", ROOT / "assets" / "manifest.template.json"]:
        target.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def make_contact_sheet(title: str, paths: list[Path], out_path: Path, thumb_size: tuple[int, int]) -> None:
    cols = 4
    rows = (len(paths) + cols - 1) // cols
    label_h = 46
    margin = 16
    sheet = Image.new(
        "RGB",
        (cols * (thumb_size[0] + margin) + margin, rows * (thumb_size[1] + label_h + margin) + margin + 50),
        (8, 10, 14),
    )
    draw = ImageDraw.Draw(sheet)
    draw.text((margin, 14), title, fill=(225, 230, 238))
    for idx, path in enumerate(paths):
        row, col = divmod(idx, cols)
        x = margin + col * (thumb_size[0] + margin)
        y = margin + 50 + row * (thumb_size[1] + label_h + margin)
        im = Image.open(path).convert("RGBA")
        bg = Image.new("RGBA", im.size, (20, 24, 30, 255))
        checker = Image.new("RGBA", im.size, (0, 0, 0, 0))
        cd = ImageDraw.Draw(checker)
        step = 32
        for yy in range(0, im.height, step):
            for xx in range(0, im.width, step):
                if (xx // step + yy // step) % 2 == 0:
                    cd.rectangle((xx, yy, xx + step - 1, yy + step - 1), fill=(34, 38, 45, 255))
        bg.alpha_composite(checker)
        bg.alpha_composite(im)
        thumb = ImageOps.contain(bg.convert("RGB"), thumb_size, Image.Resampling.LANCZOS)
        frame = Image.new("RGB", thumb_size, (14, 16, 20))
        frame.paste(thumb, ((thumb_size[0] - thumb.width) // 2, (thumb_size[1] - thumb.height) // 2))
        sheet.paste(frame, (x, y))
        label = path.stem[:34]
        draw.text((x, y + thumb_size[1] + 8), label, fill=(205, 212, 220))
    sheet.save(out_path, quality=92)


def final_asset_paths() -> dict[str, list[Path]]:
    return {
        "albina": [ROOT / "assets" / "characters" / "albina" / f"{name}.png" for name in ALBINA_NAMES],
        "protagonist": [ROOT / "assets" / "characters" / "protagonist" / f"{name}.png" for name in PROTAGONIST_NAMES],
        "supporting": [ROOT / "assets" / "characters" / cid / f"{sprite}.png" for cid, sprite in SUPPORTING],
        "cg": [ROOT / "assets" / "cg" / f"{name}.jpg" for name in CG_NAMES],
        "bg": [ROOT / "assets" / "bg" / f"{name}.jpg" for name in BG_NAMES],
    }


def alpha_bbox_fraction(path: Path) -> float:
    im = Image.open(path).convert("RGBA")
    bbox = im.getchannel("A").getbbox()
    if not bbox:
        return 0.0
    area = (bbox[2] - bbox[0]) * (bbox[3] - bbox[1])
    return area / float(im.width * im.height)


def image_stddev(path: Path) -> float:
    im = Image.open(path).convert("RGB").resize((64, 36), Image.Resampling.BILINEAR)
    return sum(ImageStat.Stat(im).stddev) / 3


def technical_audit(source_sheets: dict[str, Path]) -> dict:
    result: dict[str, object] = {
        "source_sheets": {k: str(v.relative_to(ROOT)) for k, v in source_sheets.items()},
        "counts": {},
        "issues": [],
    }
    issues: list[str] = result["issues"]  # type: ignore[assignment]
    groups = final_asset_paths()
    for key, paths in groups.items():
        result["counts"][key] = len(paths)  # type: ignore[index]
        for path in paths:
            if not path.exists():
                issues.append(f"missing: {path.relative_to(ROOT)}")
                continue
            im = Image.open(path)
            if key in {"albina", "protagonist", "supporting"}:
                if im.size != (900, 1200) or im.mode != "RGBA":
                    issues.append(f"bad sprite geometry: {path.relative_to(ROOT)} {im.mode} {im.size}")
                frac = alpha_bbox_fraction(path)
                if frac < 0.08 or frac > 0.92:
                    issues.append(f"suspicious sprite alpha coverage: {path.relative_to(ROOT)} {frac:.3f}")
            else:
                if im.size != (1280, 720):
                    issues.append(f"bad panel geometry: {path.relative_to(ROOT)} {im.size}")
                if image_stddev(path) < 10:
                    issues.append(f"low visual variance: {path.relative_to(ROOT)}")
    return result


def write_docs(source_sheets: dict[str, Path], audit: dict) -> None:
    source_lines = "\n".join(
        f"- `{key}` -> `{path.relative_to(ROOT).as_posix()}`" for key, path in source_sheets.items()
    )
    lines = [
        "# Raster Asset Generation V2",
        "",
        "All primary character sprites, CGs, backgrounds, and the avatar in this pass are generated raster assets.",
        "Official/wiki art was used only to calibrate costume and equipment; no official image file is packaged.",
        "",
        "## Prompt Style Lock",
        "",
        "- CG illustration.",
        "- Fully restored costume and equipment cues for Albina, with Fascia and white-gold mechanical body language.",
        "- High-end urban combat narrative illustration energy: cold, lethal, hard light, ruins, wet neon, film storyboard framing.",
        "- No text, watermark, logo, nudity, explicit gore, chibi, school-age, soft moe, or generic fantasy-princess replacement.",
        "",
        "## Source Sheets",
        "",
        source_lines,
        "",
        "## Final Counts",
        "",
        f"- Albina sprites: {len(ALBINA_NAMES)} transparent PNG.",
        f"- Protagonist sprites: {len(PROTAGONIST_NAMES)} transparent PNG.",
        f"- Supporting character sprites: {len(SUPPORTING)} transparent PNG.",
        f"- CG: {len(CG_NAMES)} JPG panels.",
        f"- Backgrounds: {len(BG_NAMES)} JPG panels.",
        "",
        "## Technical Audit",
        "",
        f"- Issues: {len(audit.get('issues', []))}",
        "- Contact sheets: `docs/visual-audit-albina-v2.png`, `docs/visual-audit-protagonist-v2.png`, `docs/visual-audit-supporting-v2.png`, `docs/visual-audit-cg-v2.png`, `docs/visual-audit-bg-v2.png`.",
    ]
    (ROOT / "docs" / "asset-generation-v2.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (ROOT / "docs" / "asset-technical-audit-v2.json").write_text(
        json.dumps(audit, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def process(mapping: dict[str, Path]) -> None:
    clean_previous_outputs()
    ensure_dirs()
    source_sheets = copy_source_sheets(mapping)
    alpha_sheets = {
        sheet.key: remove_chroma(source_sheets[sheet.key], sheet.key)
        for sheet in SHEET_ORDER
        if sheet.kind == "sprite"
    }

    albina_cells: list[Image.Image] = []
    for key in ["albina_01_v2", "albina_02_v2", "albina_03_v2"]:
        sheet = next(item for item in SHEET_ORDER if item.key == key)
        albina_cells.extend(crop_grid(Image.open(alpha_sheets[key]).convert("RGBA"), sheet.cols, sheet.rows))
    for name, cell in zip(ALBINA_NAMES, albina_cells):
        place_sprite(cell, ROOT / "assets" / "characters" / "albina" / f"{name}.png")

    protagonist_cells: list[Image.Image] = []
    for key in ["protagonist_01_v2", "protagonist_02_v2"]:
        sheet = next(item for item in SHEET_ORDER if item.key == key)
        protagonist_cells.extend(crop_grid(Image.open(alpha_sheets[key]).convert("RGBA"), sheet.cols, sheet.rows))
    for name, cell in zip(PROTAGONIST_NAMES, protagonist_cells):
        place_sprite(cell, ROOT / "assets" / "characters" / "protagonist" / f"{name}.png")

    support_sheet = next(item for item in SHEET_ORDER if item.key == "supporting_v2")
    support_cells = crop_grid(Image.open(alpha_sheets["supporting_v2"]).convert("RGBA"), support_sheet.cols, support_sheet.rows)
    for (cid, sprite), cell in zip(SUPPORTING, support_cells):
        place_sprite(cell, ROOT / "assets" / "characters" / cid / f"{sprite}.png")

    cg_cells: list[Image.Image] = []
    for key in ["cg_01_v2", "cg_02_v2", "cg_03_v2", "cg_04_v2"]:
        sheet = next(item for item in SHEET_ORDER if item.key == key)
        cg_cells.extend(crop_grid(Image.open(source_sheets[key]), sheet.cols, sheet.rows))
    for name, cell in zip(CG_NAMES, cg_cells):
        save_panel(cell, ROOT / "assets" / "cg" / f"{name}.jpg")

    bg_cells: list[Image.Image] = []
    for key in ["bg_01_v2", "bg_02_v2"]:
        sheet = next(item for item in SHEET_ORDER if item.key == key)
        bg_cells.extend(crop_grid(Image.open(source_sheets[key]), sheet.cols, sheet.rows))
    for name, cell in zip(BG_NAMES, bg_cells):
        save_panel(cell, ROOT / "assets" / "bg" / f"{name}.jpg")

    write_manifest()
    make_avatar()

    groups = final_asset_paths()
    make_contact_sheet("Albina V2 Sprites", groups["albina"], ROOT / "docs" / "visual-audit-albina-v2.png", (220, 294))
    make_contact_sheet(
        "Protagonist V2 Sprites",
        groups["protagonist"],
        ROOT / "docs" / "visual-audit-protagonist-v2.png",
        (220, 294),
    )
    make_contact_sheet(
        "Supporting V2 Sprites",
        groups["supporting"],
        ROOT / "docs" / "visual-audit-supporting-v2.png",
        (220, 294),
    )
    make_contact_sheet("CG V2 Panels", groups["cg"], ROOT / "docs" / "visual-audit-cg-v2.png", (320, 180))
    make_contact_sheet("Background V2 Panels", groups["bg"], ROOT / "docs" / "visual-audit-bg-v2.png", (320, 180))

    audit = technical_audit(source_sheets)
    write_docs(source_sheets, audit)
    print(json.dumps(audit, ensure_ascii=False, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--map", help="JSON object mapping V2 sheet keys to generated PNG paths.")
    args = parser.parse_args()
    process(load_mapping(args))


if __name__ == "__main__":
    main()
