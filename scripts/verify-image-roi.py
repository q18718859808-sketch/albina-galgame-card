import argparse
import json
from pathlib import Path

from PIL import Image, ImageChops


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Verify that image changes are confined to one ROI.")
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--source")
    parser.add_argument("--output")
    parser.add_argument("--x", type=int)
    parser.add_argument("--y", type=int)
    parser.add_argument("--width", type=int)
    parser.add_argument("--height", type=int)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.self_test:
        run_self_test()
        return
    if None in (args.source, args.output, args.x, args.y, args.width, args.height):
        raise SystemExit("source, output, x, y, width and height are required")
    source_path = Path(args.source).resolve()
    output_path = Path(args.output).resolve()
    with Image.open(source_path) as source_image, Image.open(output_path) as output_image:
        source = source_image.convert("RGBA")
        output = output_image.convert("RGBA")

    if source.size != output.size:
        raise SystemExit("source and output dimensions differ")

    canvas_width, canvas_height = source.size
    if args.x < 0 or args.y < 0 or args.width < 1 or args.height < 1:
        raise SystemExit("ROI values must be positive and non-empty")
    if args.x + args.width > canvas_width or args.y + args.height > canvas_height:
        raise SystemExit("ROI exceeds image bounds")

    difference = ImageChops.difference(source, output)
    changed_bounds = difference.convert("RGB").getbbox()
    if changed_bounds is None:
        raise SystemExit("output contains no changed pixels")

    roi = (args.x, args.y, args.x + args.width, args.y + args.height)
    outside_difference = difference.copy()
    outside_difference.paste((0, 0, 0, 0), roi)
    outside_changed_bounds = outside_difference.convert("RGB").getbbox()
    if outside_changed_bounds is not None:
        raise SystemExit(f"pixels changed outside ROI: {outside_changed_bounds}")

    changed_pixels = sum(1 for pixel in difference.getdata() if pixel != (0, 0, 0, 0))
    print(json.dumps({
        "status": "passed",
        "method": "pillow-rgba-exact-difference",
        "source": str(source_path),
        "output": str(output_path),
        "canvas": {"width": canvas_width, "height": canvas_height},
        "roi": {"x": args.x, "y": args.y, "width": args.width, "height": args.height},
        "changedPixelBounds": list(changed_bounds),
        "changedPixelCount": changed_pixels,
        "outsideRoiChangedPixelCount": 0,
    }, ensure_ascii=True))


def run_self_test() -> None:
    source = Image.new("RGBA", (8, 8), (10, 20, 30, 255))
    inside = source.copy()
    inside.putpixel((3, 3), (255, 255, 255, 255))
    outside = source.copy()
    outside.putpixel((0, 0), (255, 255, 255, 255))
    roi = (2, 2, 5, 5)
    inside_diff = ImageChops.difference(source, inside)
    inside_diff.paste((0, 0, 0, 0), roi)
    outside_diff = ImageChops.difference(source, outside)
    outside_diff.paste((0, 0, 0, 0), roi)
    if inside_diff.convert("RGB").getbbox() is not None or outside_diff.convert("RGB").getbbox() is None:
        raise SystemExit("ROI verifier self-test failed")
    print(json.dumps({"status": "passed", "insideAccepted": True, "outsideRejected": True}))


if __name__ == "__main__":
    main()
