import hashlib
import json
import platform
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png"
CONTRACT = ROOT / "content/media-production/albina-canonical-design-contract-v1.json"
OUT = ROOT / "staging/media/krea2-v6-controls/albina"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write_image(path: Path, array: np.ndarray, mode: str) -> dict:
    Image.fromarray(array, mode=mode).save(path)
    with Image.open(path) as image:
        return {"path": str(path), "sha256": digest(path), "bytes": path.stat().st_size,
                "width": image.width, "height": image.height, "mode": image.mode}


def polyline(canvas: np.ndarray, points: list[tuple[int, int]], color: tuple[int, int, int], thickness: int = 8) -> None:
    cv2.polylines(canvas, [np.asarray(points, dtype=np.int32)], False, color, thickness, cv2.LINE_AA)


def topology_overlay(width: int, height: int) -> tuple[np.ndarray, dict]:
    canvas = np.zeros((height, width, 3), dtype=np.uint8)
    anchors = {
        "head": [(220, 230), (294, 182), (365, 236), (355, 342), (286, 395), (214, 336)],
        "imageLeftWhiteEye": [(231, 284), (268, 274), (282, 292), (247, 306)],
        "imageRightDarkEye": [(304, 284), (342, 275), (352, 294), (316, 306)],
        "rightConduit": [(359, 235), (435, 205), (516, 260), (494, 363), (426, 407), (393, 365)],
        "neckInterface": [(244, 405), (292, 390), (338, 410), (330, 466), (252, 468)],
        "leftShoulderToWrist": [(252, 481), (176, 520), (144, 663), (181, 791), (271, 845)],
        "rightShoulderToWrist": [(333, 485), (397, 526), (420, 650), (387, 785), (305, 842)],
        "chestShell": [(231, 471), (292, 456), (353, 482), (371, 640), (334, 738), (249, 735), (213, 635)],
        "openAbdomen": [(254, 720), (332, 718), (349, 884), (320, 988), (264, 990), (236, 878)],
        "crossedForearmsFront": [(181, 791), (239, 832), (325, 857), (387, 785)],
        "crossedForearmsBack": [(420, 650), (373, 744), (299, 823), (271, 845)],
        "hipBridge": [(244, 986), (292, 1012), (342, 986)],
        "leftLegAxis": [(275, 1010), (253, 1268), (235, 1531), (226, 1723)],
        "rightLegAxis": [(315, 1010), (334, 1265), (351, 1530), (367, 1723)],
        "leftFoot": [(207, 1722), (230, 1748), (257, 1748)],
        "rightFoot": [(342, 1748), (371, 1724), (394, 1749)],
    }
    colors = {
        "identity": (245, 245, 245), "conduit": (255, 196, 32), "shell": (52, 210, 255),
        "cavity": (245, 55, 75), "front": (75, 240, 105), "back": (190, 90, 255),
        "axis": (70, 145, 255), "ground": (220, 220, 220),
    }
    cv2.polylines(canvas, [np.asarray(anchors["head"], np.int32)], True, colors["identity"], 7, cv2.LINE_AA)
    cv2.polylines(canvas, [np.asarray(anchors["imageLeftWhiteEye"], np.int32)], True, colors["identity"], 8, cv2.LINE_AA)
    cv2.polylines(canvas, [np.asarray(anchors["imageRightDarkEye"], np.int32)], True, (80, 80, 80), 8, cv2.LINE_AA)
    for name in ("rightConduit",): polyline(canvas, anchors[name], colors["conduit"], 11)
    for name in ("neckInterface", "chestShell", "hipBridge"):
        cv2.polylines(canvas, [np.asarray(anchors[name], np.int32)], True, colors["shell"], 7, cv2.LINE_AA)
    cv2.polylines(canvas, [np.asarray(anchors["openAbdomen"], np.int32)], True, colors["cavity"], 9, cv2.LINE_AA)
    for name in ("leftShoulderToWrist", "rightShoulderToWrist", "crossedForearmsBack"):
        polyline(canvas, anchors[name], colors["back"], 7)
    polyline(canvas, anchors["crossedForearmsFront"], colors["front"], 11)
    for name in ("leftLegAxis", "rightLegAxis"): polyline(canvas, anchors[name], colors["axis"], 8)
    for name in ("leftFoot", "rightFoot"): polyline(canvas, anchors[name], colors["ground"], 8)
    return canvas, {
        "coordinateSystem": "canonical-unmirrored-image-pixels",
        "dimensions": {"width": width, "height": height},
        "anchors": anchors,
        "layerOrder": ["crossedForearmsBack", "crossedForearmsFront"],
        "imageLeftEye": "white-light-mechanical",
        "imageRightEye": "black-dark-mechanical",
        "forbidden": ["horizontal-flip", "closed-abdomen", "organic-arms", "skirt", "cropped-feet", "inset", "post-composite"],
    }


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE) as image:
        rgba = np.asarray(image.convert("RGBA"))
    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3]
    foreground = alpha >= 16

    alpha_record = write_image(OUT / "alpha-silhouette.png", alpha, "L")

    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 1.0)
    internal = cv2.Canny(blurred, 40, 120)
    internal[~foreground] = 0
    boundary = cv2.morphologyEx((alpha >= 192).astype(np.uint8) * 255, cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8))
    edge = np.maximum(internal, boundary)
    edge_record = write_image(OUT / "edge-canny.png", edge, "L")

    values = np.zeros_like(gray, dtype=np.uint16)
    visible_values = gray[foreground]
    low, high = np.percentile(visible_values, [1, 99])
    normalized = np.clip((gray.astype(np.float32) - low) / max(high - low, 1), 0, 1)
    values[foreground] = (normalized[foreground] * 65535).astype(np.uint16)
    value_record = write_image(OUT / "value-map.png", values, "I;16")

    # Locked canonical face crop. Coordinates are source pixels, never inferred from generated candidates.
    face_box = {"x": 166, "y": 196, "width": 256, "height": 300}
    face = rgba[face_box["y"]:face_box["y"] + face_box["height"], face_box["x"]:face_box["x"] + face_box["width"]]
    face_record = write_image(OUT / "face-eye-crop.png", face, "RGBA")
    face_metadata = {
        "coordinateSystem": "canonical-unmirrored-image-pixels",
        "crop": face_box,
        "imageLeftEye": {"value": "white-light", "side": "image-left"},
        "imageRightEye": {"value": "black-dark", "side": "image-right"},
        "horizontalFlipAllowed": False,
    }
    face_json = OUT / "face-eye-crop.json"
    face_json.write_text(json.dumps(face_metadata, indent=2) + "\n", encoding="utf-8")

    topology, topology_metadata = topology_overlay(rgba.shape[1], rgba.shape[0])
    topology_record = write_image(OUT / "topology-overlay.png", topology, "RGB")
    topology_json = OUT / "topology-overlay.json"
    topology_json.write_text(json.dumps(topology_metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    receipt = {
        "schemaVersion": 1,
        "purpose": "albina-krea2-v6-structure-controls",
        "source": {"path": str(SOURCE), "sha256": digest(SOURCE), "bytes": SOURCE.stat().st_size,
                   "width": rgba.shape[1], "height": rgba.shape[0], "mode": "RGBA"},
        "contract": {"path": str(CONTRACT), "sha256": digest(CONTRACT)},
        "controls": {
            "alphaSilhouette": alpha_record,
            "edgeCanny": edge_record,
            "valueMap": value_record,
            "faceEyeCrop": {**face_record, "metadataPath": str(face_json), "metadataSha256": digest(face_json)},
            "topologyOverlay": {**topology_record, "metadataPath": str(topology_json), "metadataSha256": digest(topology_json)},
        },
        "derivation": {
            "algorithm": "albina-v6-controls-v2",
            "parameters": {"alphaForeground": 16, "alphaSolid": 192, "gaussianKernel": 5,
                           "gaussianSigma": 1.0, "cannyLow": 40, "cannyHigh": 120,
                           "valuePercentiles": [1, 99]},
            "toolchain": {"python": platform.python_version(), "pillow": Image.__version__, "opencv": cv2.__version__},
        },
        "restrictions": {"sourceAuthority": "canonical-only", "v5AllowedAsControl": False,
                         "horizontalFlipAllowed": False, "postGenerationInsetCompositeAllowed": False},
    }
    receipt_path = OUT / "controls.receipt.json"
    receipt_path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"receipt": str(receipt_path), "sha256": digest(receipt_path), "controls": receipt["controls"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
