#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageChops, ImageOps


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
    name: str
    filename: str
    cols: int
    rows: int


SHEETS = {
    "albina_01": Sheet("albina_01", "ig_0bcdc843c19217df016a0f619bc0cc8191be60b0d333e86cd1.png", 3, 2),
    "albina_02": Sheet("albina_02", "ig_0bcdc843c19217df016a0f62403508819181716f1a919bed70.png", 3, 2),
    "albina_03": Sheet("albina_03", "ig_0bcdc843c19217df016a0f62dd3e608191a289507f59e120d6.png", 3, 2),
    "protagonist_01": Sheet("protagonist_01", "ig_0bcdc843c19217df016a0f6378f874819182c21de7f6c3db0f.png", 3, 2),
    "protagonist_02": Sheet("protagonist_02", "ig_0bcdc843c19217df016a0f6413b494819185fdafb74d8dd538.png", 3, 2),
    "supporting": Sheet("supporting", "ig_0bcdc843c19217df016a0f64f618b081918135aa88d7bacf65.png", 4, 3),
    "cg_01": Sheet("cg_01", "ig_0bcdc843c19217df016a0f65a51ca08191ac182933f7308913.png", 3, 2),
    "cg_02": Sheet("cg_02", "ig_0bcdc843c19217df016a0f66604108819180fddf2ae0359c27.png", 3, 2),
    "cg_03": Sheet("cg_03", "ig_0bcdc843c19217df016a0f66acbf208191983f1654fed82637.png", 3, 2),
    "cg_04": Sheet("cg_04", "ig_0bcdc843c19217df016a0f6748e2b08191a1664b3712862169.png", 3, 2),
    "cg_05": Sheet("cg_05", "ig_0bcdc843c19217df016a0f67e831688191a1f87e8654e8286a.png", 3, 2),
    "bg_01": Sheet("bg_01", "ig_0bcdc843c19217df016a0f6894b0588191801d6e9f7e2ffda8.png", 3, 2),
    "bg_02": Sheet("bg_02", "ig_0bcdc843c19217df016a0f68e7c924819190abf9bb3a6f3c1c.png", 3, 2),
}

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
    "combat_transition_01",
    "combat_transition_02",
    "combat_transition_03",
    "combat_transition_04",
    "combat_transition_05",
    "combat_transition_06",
]


def ensure_dirs() -> None:
    for rel in [
        "assets/generated/source-sheets",
        "assets/generated/alpha-sheets",
        "assets/characters/albina",
        "assets/characters/protagonist",
        "assets/bg",
        "assets/cg",
    ]:
        (ROOT / rel).mkdir(parents=True, exist_ok=True)
    for cid, _ in SUPPORTING:
        (ROOT / "assets" / "characters" / cid).mkdir(parents=True, exist_ok=True)


def copy_source_sheets() -> dict[str, Path]:
    copied: dict[str, Path] = {}
    for key, sheet in SHEETS.items():
        src = GENERATED_DIR / sheet.filename
        if not src.exists():
            raise FileNotFoundError(src)
        dst = ROOT / "assets" / "generated" / "source-sheets" / f"{key}.png"
        shutil.copy2(src, dst)
        copied[key] = dst
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
    max_w = canvas_size[0] - 60
    max_h = canvas_size[1] - 40
    scale = min(max_w / sprite.width, max_h / sprite.height)
    new_size = (max(1, round(sprite.width * scale)), max(1, round(sprite.height * scale)))
    sprite = sprite.resize(new_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    x = (canvas_size[0] - sprite.width) // 2
    y = canvas_size[1] - sprite.height - 8
    canvas.alpha_composite(sprite, (x, y))
    canvas.save(out_path)


def save_panel(cell: Image.Image, out_path: Path, size: tuple[int, int] = (1280, 720)) -> None:
    rgb = cell.convert("RGB")
    crop_margin_x = max(0, round(rgb.width * 0.025))
    crop_margin_y = max(0, round(rgb.height * 0.025))
    if rgb.width > crop_margin_x * 2 and rgb.height > crop_margin_y * 2:
        rgb = rgb.crop((crop_margin_x, crop_margin_y, rgb.width - crop_margin_x, rgb.height - crop_margin_y))
    panel = ImageOps.fit(rgb, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    panel.save(out_path, quality=92, optimize=True)


def make_avatar() -> None:
    sprite = Image.open(ROOT / "assets" / "characters" / "albina" / "normal.png").convert("RGBA")
    alpha = sprite.getchannel("A")
    bbox = alpha.getbbox() or (0, 0, sprite.width, sprite.height)
    crop = sprite.crop(bbox)
    crop = ImageOps.contain(crop, (760, 900), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (768, 1024), (8, 11, 18, 255))
    grad = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    for y in range(canvas.height):
        a = int(120 * y / canvas.height)
        for x in range(canvas.width):
            if (x + y) % 5 == 0:
                grad.putpixel((x, y), (160, 190, 210, a // 3))
    canvas.alpha_composite(grad)
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


def write_docs(sheet_sources: dict[str, Path]) -> None:
    lines = [
        "# Raster Asset Generation Notes",
        "",
        "All primary character sprites, CGs, and backgrounds are generated raster assets. Official/wiki images were used only as visual reference for outfit and equipment checking; no official image file is packed as a released asset.",
        "",
        "## Style Lock",
        "",
        "- CG illustration, hard urban action battle narrative.",
        "- Cold, lethal battlefield-ruin atmosphere.",
        "- Stark cinematic light/shadow contrast.",
        "- Sharp combat dynamics and film storyboard composition.",
        "- Dark cold dominant palette.",
        "- Albina equipment target: white prosthetic body, black mechanical joints/wires, gold highlights, white iron-maiden armor, chained spiked headband, white mask with golden eye motifs, Fascia white-gold greatsword with skeletal interior hints.",
        "",
        "## Source Sheets",
        "",
    ]
    for key, path in sheet_sources.items():
        lines.append(f"- `{key}` -> `{path.relative_to(ROOT).as_posix()}`")
    lines.extend(
        [
            "",
            "## Final Counts",
            "",
            "- Albina sprites: 18 transparent PNG.",
            "- Protagonist sprites: 12 transparent PNG.",
            "- Supporting character sprites: 12 transparent PNG.",
            "- CG: 30 JPG panels, including 24 main route CGs and 6 extra combat transition panels.",
            "- Backgrounds: 12 JPG panels.",
        ]
    )
    (ROOT / "docs" / "asset-generation.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    ensure_dirs()
    source_sheets = copy_source_sheets()

    alpha_sheets = {
        key: remove_chroma(path, key)
        for key, path in source_sheets.items()
        if key.startswith("albina") or key.startswith("protagonist") or key == "supporting"
    }

    albina_cells: list[Image.Image] = []
    for key in ["albina_01", "albina_02", "albina_03"]:
        sheet = SHEETS[key]
        albina_cells.extend(crop_grid(Image.open(alpha_sheets[key]).convert("RGBA"), sheet.cols, sheet.rows))
    for name, cell in zip(ALBINA_NAMES, albina_cells):
        place_sprite(cell, ROOT / "assets" / "characters" / "albina" / f"{name}.png")

    protagonist_cells: list[Image.Image] = []
    for key in ["protagonist_01", "protagonist_02"]:
        sheet = SHEETS[key]
        protagonist_cells.extend(crop_grid(Image.open(alpha_sheets[key]).convert("RGBA"), sheet.cols, sheet.rows))
    for name, cell in zip(PROTAGONIST_NAMES, protagonist_cells):
        place_sprite(cell, ROOT / "assets" / "characters" / "protagonist" / f"{name}.png")

    support_sheet = SHEETS["supporting"]
    support_cells = crop_grid(Image.open(alpha_sheets["supporting"]).convert("RGBA"), support_sheet.cols, support_sheet.rows)
    for (cid, sprite), cell in zip(SUPPORTING, support_cells):
        place_sprite(cell, ROOT / "assets" / "characters" / cid / f"{sprite}.png")

    cg_cells: list[Image.Image] = []
    for key in ["cg_01", "cg_02", "cg_03", "cg_04", "cg_05"]:
        sheet = SHEETS[key]
        cg_cells.extend(crop_grid(Image.open(source_sheets[key]), sheet.cols, sheet.rows))
    for name, cell in zip(CG_NAMES, cg_cells):
        save_panel(cell, ROOT / "assets" / "cg" / f"{name}.jpg")

    bg_cells: list[Image.Image] = []
    for key in ["bg_01", "bg_02"]:
        sheet = SHEETS[key]
        bg_cells.extend(crop_grid(Image.open(source_sheets[key]), sheet.cols, sheet.rows))
    for name, cell in zip(BG_NAMES, bg_cells):
        save_panel(cell, ROOT / "assets" / "bg" / f"{name}.jpg")

    manifest = build_manifest()
    for target in [ROOT / "assets" / "manifest.json", ROOT / "assets" / "manifest.template.json"]:
        target.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    make_avatar()
    write_docs(source_sheets)
    print(
        json.dumps(
            {
                "albina_sprites": len(ALBINA_NAMES),
                "protagonist_sprites": len(PROTAGONIST_NAMES),
                "supporting_sprites": len(SUPPORTING),
                "cg": len(CG_NAMES),
                "backgrounds": len(BG_NAMES),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
