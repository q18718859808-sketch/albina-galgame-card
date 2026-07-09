#!/usr/bin/env python3
"""Albina hatch-pet 工作流入口

全量复现 Codex hatch-pet 的完整工作流:
1. 生成 9 行精灵图条带 (调用 daydream/gpt-image-2 API)
2. 切片成帧
3. 打包成 1536x1872 精灵图表 (调用 pack_codex_pet.py)
4. 验证 (调用 validate_codex_pet.py)
5. 生成 pet.json

用法:
  python hatch_pet_workflow.py generate <character_name> <output_dir> [--api-url URL] [--api-key KEY]
  python hatch_pet_workflow.py pack <rows_root> <output_dir>
  python hatch_pet_workflow.py validate <spritesheet_path>
  python hatch_pet_workflow.py full <character_name> <output_dir> [--api-url URL] [--api-key KEY]
"""
import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

ROW_SEMANTICS = [
    {"name": "idle", "index": 1, "desc": "平静循环，一次态度变化", "prompt_suffix": "gentle breathing loop, one small head tilt or eye slide, calm and restful"},
    {"name": "running-right", "index": 2, "desc": "向右移动循环", "prompt_suffix": "cyclical rightward motion, body leaning right, clear leg separation"},
    {"name": "running-left", "index": 3, "desc": "向左移动循环", "prompt_suffix": "cyclical leftward motion, body leaning left, clear leg separation"},
    {"name": "waving", "index": 4, "desc": "打招呼/交流", "prompt_suffix": "waving or beckoning gesture, strong hand-state contrast open to closed"},
    {"name": "jumping", "index": 5, "desc": "跳跃循环", "prompt_suffix": "anticipation lift apex descent impact recovery loop, readable compression"},
    {"name": "failed", "index": 6, "desc": "失败/出错", "prompt_suffix": "unmistakable failure loop, stuck or jammed state, deadpan recoil"},
    {"name": "waiting", "index": 7, "desc": "等待/不耐烦", "prompt_suffix": "impatient idle, foot tap or weight shift, narrowed eyes"},
    {"name": "running", "index": 8, "desc": "活跃奔跑", "prompt_suffix": "active energetic sprint loop, distinct from directional rows"},
    {"name": "review", "index": 9, "desc": "审查/思考", "prompt_suffix": "reading or inspecting, chunky clear props like book or device"},
]

CHARACTER_PROMPTS = {
    "albina": "silver-white long hair, pale skin, black and gold gothic nun habit with white wimple, golden eye accents, anime galgame character, full body visible, facing viewer, transparent background, exactly two arms two legs, no cropped body parts",
}


def build_row_prompt(character_name, row_semantic, style_hint=""):
    char_desc = CHARACTER_PROMPTS.get(character_name, character_name)
    return (
        f"Sprite sheet row strip, 8 sequential frames left to right, "
        f"character: {char_desc}. "
        f"Action: {row_semantic['desc']}. {row_semantic['prompt_suffix']}. "
        f"Frame 8 must hand off cleanly to frame 1. "
        f"Same character, same camera, same scale across all 8 frames. "
        f"Flat #00ff00 chroma key background, no shadows, no gradients. "
        f"Style: {style_hint or 'clean anime illustration, bold silhouette, tiny-UI readable'}. "
        f"Output: horizontal strip, 8 equal columns."
    )


def call_image_api(prompt, output_path, api_url=None, api_key=None, model="gpt-image-2", size="1536x208"):
    api_url = api_url or os.environ.get("DAYDREAM_API_URL", "https://api.pie-xian.com/v1/images/generations")
    api_key = api_key or os.environ.get("DAYDREAM_API_KEY", "")
    if not api_key:
        print(f"[WARN] No API key - skipping generation for {output_path}")
        print(f"       Prompt: {prompt[:100]}...")
        return False
    import urllib.request
    body = json.dumps({"model": model, "prompt": prompt, "size": size, "n": 1}).encode()
    req = urllib.request.Request(api_url, data=body, headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    })
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read())
        if "data" in result and len(result["data"]) > 0:
            img_url = result["data"][0].get("url") or result["data"][0].get("b64_json")
            if img_url and img_url.startswith("http"):
                urllib.request.urlretrieve(img_url, output_path)
            elif img_url:
                import base64
                with open(output_path, "wb") as f:
                    f.write(base64.b64decode(img_url))
            print(f"[OK] Generated: {output_path}")
            return True
        else:
            print(f"[FAIL] No image in response: {result}")
            return False
    except Exception as e:
        print(f"[FAIL] API call failed: {e}")
        return False


def generate_rows(character_name, output_dir, api_url=None, api_key=None):
    rows_dir = Path(output_dir) / "rows"
    rows_dir.mkdir(parents=True, exist_ok=True)
    for row in ROW_SEMANTICS:
        row_dir = rows_dir / f"{row['index']:02d}-{row['name']}"
        row_dir.mkdir(exist_ok=True)
        prompt = build_row_prompt(character_name, row)
        strip_path = rows_dir / f"strip_{row['index']:02d}-{row['name']}.png"
        success = call_image_api(prompt, str(strip_path), api_url, api_key, size="1536x208")
        if success:
            print(f"  Row {row['index']}/9 ({row['name']}): generated strip")
            print(f"  -> Manual slice into 8 frames in {row_dir}/")
        else:
            print(f"  Row {row['index']}/9 ({row['name']}): SKIPPED (no API key or failed)")
    print(f"\n[DONE] Rows generated in {rows_dir}")
    print(f"Next: manually slice each strip into 8 frames, then run 'pack' command")
    return rows_dir


def pack_rows(rows_root, output_dir):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    pack_script = Path(__file__).parent / "pack_codex_pet.py"
    output_path = output_dir / "spritesheet.webp"
    result = subprocess.run([
        sys.executable, str(pack_script), str(rows_root), str(output_path), "--padding", "10"
    ], capture_output=True, text=True)
    print(result.stdout)
    if result.returncode != 0:
        print(f"[FAIL] Pack failed: {result.stderr}")
        return None
    print(f"[OK] Packed: {output_path}")
    return output_path


def validate_sheet(spritesheet_path):
    validate_script = Path(__file__).parent / "validate_codex_pet.py"
    result = subprocess.run([
        sys.executable, str(validate_script), str(spritesheet_path)
    ], capture_output=True, text=True)
    print(result.stdout)
    if result.returncode != 0:
        print(f"[FAIL] Validation errors: {result.stderr}")
    return result.returncode == 0


def generate_pet_json(output_dir, pet_id, display_name, description):
    pet_json_path = Path(output_dir) / "pet.json"
    pet_data = {
        "id": pet_id,
        "displayName": display_name,
        "description": description,
        "spritesheetPath": "spritesheet.webp",
    }
    with open(pet_json_path, "w", encoding="utf-8") as f:
        json.dump(pet_data, f, ensure_ascii=False, indent=2)
    print(f"[OK] pet.json: {pet_json_path}")
    return pet_json_path


def full_workflow(character_name, output_dir, api_url=None, api_key=None):
    output_dir = Path(output_dir)
    print(f"=== hatch-pet Full Workflow for '{character_name}' ===\n")
    print("Step 1/5: Generate 9 row strips...")
    rows_dir = generate_rows(character_name, str(output_dir), api_url, api_key)
    print("\nStep 2/5: Manual slicing required")
    print("  -> Slice each strip in rows/ into 8 frames per row directory")
    print("  -> Run 'python hatch_pet_workflow.py pack <rows_dir> <output_dir>' after slicing")
    print("\nStep 3-5: After packing, run validate + pet.json generation")
    print("  -> python hatch_pet_workflow.py validate <spritesheet.webp>")
    print("  -> pet.json will be auto-generated")


def main():
    parser = argparse.ArgumentParser(description="Albina hatch-pet workflow")
    sub = parser.add_subparsers(dest="command")

    p_gen = sub.add_parser("generate", help="Generate 9 row strips via image API")
    p_gen.add_argument("character", help="Character name (albina, or custom description)")
    p_gen.add_argument("output_dir", help="Output directory")
    p_gen.add_argument("--api-url", default=None)
    p_gen.add_argument("--api-key", default=None)

    p_pack = sub.add_parser("pack", help="Pack sliced frames into spritesheet")
    p_pack.add_argument("rows_root", help="Directory with 9 row folders")
    p_pack.add_argument("output_dir", help="Output directory")

    p_val = sub.add_parser("validate", help="Validate spritesheet")
    p_val.add_argument("spritesheet", help="Path to spritesheet.webp or .png")

    p_pet = sub.add_parser("petjson", help="Generate pet.json")
    p_pet.add_argument("output_dir")
    p_pet.add_argument("--id", required=True)
    p_pet.add_argument("--name", required=True)
    p_pet.add_argument("--desc", default="Custom Albina pet")

    p_full = sub.add_parser("full", help="Run full workflow")
    p_full.add_argument("character")
    p_full.add_argument("output_dir")
    p_full.add_argument("--api-url", default=None)
    p_full.add_argument("--api-key", default=None)

    args = parser.parse_args()
    if args.command == "generate":
        generate_rows(args.character, args.output_dir, args.api_url, args.api_key)
    elif args.command == "pack":
        pack_rows(args.rows_root, args.output_dir)
    elif args.command == "validate":
        validate_sheet(args.spritesheet)
    elif args.command == "petjson":
        generate_pet_json(args.output_dir, args.id, args.name, args.desc)
    elif args.command == "full":
        full_workflow(args.character, args.output_dir, args.api_url, args.api_key)
    else:
        parser.print_help()


if __name__ == "__main__":
    raise SystemExit(main())
