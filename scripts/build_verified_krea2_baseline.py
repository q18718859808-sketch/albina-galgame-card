#!/usr/bin/env python3
"""Build and verify the Albina Krea2 production baseline record.

This script is the authoritative, language-independent gate for the local Krea2
production baseline. It re-derives every identity fact from the on-disk workflow
and the live ComfyUI instance instead of trusting prior notes:

* the verified workflow file hash and its runtime topology hash
* the mandatory six production style LoRAs, in order, at their exact strengths
* the optional post-style identity edit LoRA at strength exactly 1.0
* presence of the diffusion model, text encoder and VAE weights in ComfyUI
* the hybrid (txt2img + img2img) node capabilities actually installed

It writes ``content/media-production/krea2-verified-baseline-v1.json``.

Usage::

    python scripts/build_verified_krea2_baseline.py
    python scripts/build_verified_krea2_baseline.py --no-probe
    python scripts/build_verified_krea2_baseline.py --candidate <png> --candidate-reviewed

Exit code 0 means the baseline record was written and every structural
invariant held. Exit code 1 means an invariant failed; the record is still
written so the failure is auditable.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parents[1]
# The workflow embedded in the user-supplied PNG is the active production
# baseline. The older sibling-directory snapshot is historical evidence only.
DEFAULT_WORKFLOW = PROJECT_ROOT / "staging" / "media" / "embedded-baseline" / "embedded-production-baseline.api.json"
DEFAULT_EVIDENCE = PROJECT_ROOT / "staging" / "media" / "embedded-baseline" / "embedded-production-baseline-evidence.json"
DEFAULT_OUTPUT = PROJECT_ROOT / "content" / "media-production" / "krea2-verified-baseline-v1.json"
DEFAULT_COMFY_URL = "http://127.0.0.1:8199"

# Mandatory production style chain. Order and strength are contractual: the six
# LoRAs must load model-only, head to tail, before any identity or control
# extension. Nothing may be inserted between them.
REQUIRED_STYLE_LORAS: list[tuple[str, float]] = [
    ("z3zz4-k2-4_c1-st5000.safetensors", 0.55),
    ("Krea2Rella_c1-st8000.safetensors", 0.65),
    ("onineko_k2_v1.safetensors", 0.45),
    ("meion_krea2_style_v7.0_c1-st4000.safetensors", 0.45),
    ("masterpieces-v51.safetensors", 0.45),
    ("ichika-k2_c1-st5000.safetensors", 0.35),
]

# The only extension permitted after the style chain, and only at full strength.
IDENTITY_EDIT_LORA = ("krea2_identity_edit_v1_2.safetensors", 1.0)

# Runtime topology hashing must match scripts/lib/krea2-comfyui.mjs
# `workflowTopology`, which drops per-invocation fields so that prompt, seed,
# filename and resolution changes do not move the topology hash.
TOPOLOGY_VOLATILE_INPUT_KEYS = frozenset(
    {"text", "noise_seed", "filename_prefix", "aspect_ratio", "megapixels"}
)

EXPECTED_WORKFLOW_SHA256 = "5cb911318da9ce1fff4c5550e86c0338b9d937a1460c3222b0a7541d5aa755a9"
EXPECTED_TOPOLOGY_SHA256 = "76851b2eec0bdd0b733dfc6fb73b0c5f886f92b672a869ad818f70f59f3bad81"

REQUIRED_WEIGHTS = {
    "diffusion_models": "redcraft23FP8_30Krea2.safetensors",
    "text_encoders": "qwen3vl_4b_fp8_scaled.safetensors",
    "vae": "qwen_image_vae.safetensors",
}

# Nodes that make the hybrid pipeline (txt2img baseline + img2img canonical
# grounding + structural control) actually executable on this install.
HYBRID_NODE_EXPECTATIONS = {
    "txt2img": [
        "UNETLoader",
        "CLIPLoader",
        "CLIPTextEncode",
        "LoraLoaderModelOnly",
        "SamplerCustomAdvanced",
        "VAEDecode",
        "SaveImage",
    ],
    "img2img": ["LoadImage", "VAEEncode", "ImageCompositeMasked", "LoadImageMask"],
    "identityEdit": ["Krea2EditModelPatch", "Krea2EditGroundedEncode"],
    "structuralControl": ["ImageScale", "ImageCrop"],
}

# Krea2StyleReferenceNode is present on this installation, but its output is
# a remote Krea API handle consumed by Krea2ImageNode. It is not a local
# MODEL/CONDITIONING/LATENT edge and must never be reported as a local style
# reference production path for the six-LoRA sampler graph.
STYLE_REFERENCE_NODE = "Krea2StyleReferenceNode"
STYLE_REFERENCE_LOCAL_CONSUMER = "Krea2ImageNode"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def js_json(value: Any) -> str:
    """Serialize like ``JSON.stringify`` so hashes match the Node helpers.

    The only divergence that matters here is numeric: JavaScript renders an
    integral double as ``1`` while Python renders ``1.0``. Everything else in
    these workflow graphs is a string, int, list or dict.
    """

    def normalize(node: Any) -> Any:
        if isinstance(node, bool):
            return node
        if isinstance(node, float) and node.is_integer():
            return int(node)
        if isinstance(node, dict):
            return {key: normalize(item) for key, item in node.items()}
        if isinstance(node, list):
            return [normalize(item) for item in node]
        return node

    # The Node implementation hashes stableJson(), which sorts object keys at
    # every level. Preserve that ordering here so the language-independent
    # verifier computes the same topology digest as the production adapters.
    return json.dumps(
        normalize(value), separators=(",", ":"), ensure_ascii=False, sort_keys=True
    )


def workflow_topology(workflow: dict[str, Any]) -> dict[str, Any]:
    return {
        node_id: {
            "class_type": node.get("class_type"),
            "inputs": {
                key: item
                for key, item in (node.get("inputs") or {}).items()
                if key not in TOPOLOGY_VOLATILE_INPUT_KEYS
            },
        }
        for node_id, node in workflow.items()
    }


def collect_style_chain(workflow: dict[str, Any]) -> list[dict[str, Any]]:
    """Walk the model graph from the UNet loader through model-only LoRAs."""
    unet_ids = [nid for nid, node in workflow.items() if node.get("class_type") == "UNETLoader"]
    if len(unet_ids) != 1:
        raise ValueError(f"expected exactly one UNETLoader, found {len(unet_ids)}")

    consumers: dict[str, list[str]] = {}
    for node_id, node in workflow.items():
        if node.get("class_type") != "LoraLoaderModelOnly":
            continue
        model_link = (node.get("inputs") or {}).get("model")
        if isinstance(model_link, list) and model_link:
            consumers.setdefault(str(model_link[0]), []).append(node_id)

    chain: list[dict[str, Any]] = []
    cursor = unet_ids[0]
    seen: set[str] = set()
    while True:
        following = consumers.get(cursor, [])
        if not following:
            break
        if len(following) > 1:
            raise ValueError(f"model output of node {cursor} feeds multiple LoRA loaders: {following}")
        nxt = following[0]
        if nxt in seen:
            raise ValueError("LoRA chain contains a cycle")
        seen.add(nxt)
        inputs = workflow[nxt].get("inputs") or {}
        chain.append(
            {
                "nodeId": nxt,
                "name": inputs.get("lora_name"),
                "strength": inputs.get("strength_model"),
            }
        )
        cursor = nxt
    return chain


def verify_style_chain(chain: list[dict[str, Any]]) -> list[str]:
    issues: list[str] = []
    if len(chain) < len(REQUIRED_STYLE_LORAS):
        issues.append(
            f"style chain has {len(chain)} LoRA(s); the six-LoRA production baseline is mandatory"
        )
    for index, (name, strength) in enumerate(REQUIRED_STYLE_LORAS):
        if index >= len(chain):
            issues.append(f"style chain position {index + 1} is missing {name}")
            continue
        actual = chain[index]
        if actual["name"] != name:
            issues.append(
                f"style chain position {index + 1} is {actual['name']!r}, expected {name!r}"
            )
        elif actual["strength"] != strength:
            issues.append(f"{name} loads at strength {actual['strength']}, expected {strength}")

    extensions = chain[len(REQUIRED_STYLE_LORAS) :]
    if len(extensions) > 1:
        issues.append(
            "only a single post-style identity extension is permitted, found: "
            + ", ".join(str(item["name"]) for item in extensions)
        )
    for extension in extensions:
        name, strength = IDENTITY_EDIT_LORA
        if extension["name"] != name:
            issues.append(
                f"post-style extension {extension['name']!r} is not the approved identity edit LoRA"
            )
        elif extension["strength"] != strength:
            issues.append(
                f"identity edit LoRA must load at strength {strength}, found {extension['strength']}"
            )
    return issues


def fetch_json(url: str, timeout: float) -> Any:
    request = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(request, timeout=timeout) as response:  # noqa: S310 - loopback only
        return json.loads(response.read().decode("utf-8"))


def normalize_loopback(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme != "http" or parsed.hostname not in {"127.0.0.1", "localhost", "::1"}:
        raise ValueError("ComfyUI endpoint must be a local loopback HTTP URL")
    return url.rstrip("/")


def probe_comfyui(base_url: str, timeout: float) -> dict[str, Any]:
    probe: dict[str, Any] = {"url": base_url, "reachable": False, "issues": []}
    try:
        stats = fetch_json(f"{base_url}/system_stats", timeout)
    except (urllib.error.URLError, OSError, ValueError, TimeoutError) as error:
        probe["issues"].append(f"system_stats unreachable: {error}")
        return probe

    probe["reachable"] = True
    system = stats.get("system") or {}
    devices = stats.get("devices") or []
    probe["version"] = system.get("comfyui_version")
    probe["pythonVersion"] = system.get("python_version")
    probe["device"] = devices[0].get("name") if devices else None

    try:
        queue = fetch_json(f"{base_url}/queue", timeout)
        probe["queue"] = {
            "running": len(queue.get("queue_running") or []),
            "pending": len(queue.get("queue_pending") or []),
        }
    except (urllib.error.URLError, OSError, ValueError, TimeoutError) as error:
        probe["issues"].append(f"queue unreachable: {error}")

    try:
        object_info = fetch_json(f"{base_url}/object_info", timeout)
    except (urllib.error.URLError, OSError, ValueError, TimeoutError) as error:
        probe["issues"].append(f"object_info unreachable: {error}")
        return probe

    installed = set(object_info)
    hybrid: dict[str, Any] = {}
    for capability, nodes in HYBRID_NODE_EXPECTATIONS.items():
        missing = [node for node in nodes if node not in installed]
        hybrid[capability] = {"required": nodes, "missing": missing, "available": not missing}
        if missing and capability in {"txt2img", "img2img"}:
            probe["issues"].append(
                f"{capability} capability is incomplete; missing nodes: {', '.join(missing)}"
            )
    probe["hybridPipeline"] = hybrid

    probe["weights"] = inspect_weight_lists(object_info)
    for slot, detail in probe["weights"].items():
        if not detail.get("present"):
            probe["issues"].append(
                f"{slot} weight {detail.get('expected')!r} is not visible to ComfyUI"
            )

    probe["loras"] = inspect_lora_availability(object_info)
    for entry in probe["loras"]["missing"]:
        probe["issues"].append(f"LoRA {entry!r} is not installed in ComfyUI")
    style_reference_present = STYLE_REFERENCE_NODE in installed
    local_style_consumer_present = STYLE_REFERENCE_LOCAL_CONSUMER in installed
    probe["styleReference"] = {
        "node": STYLE_REFERENCE_NODE,
        "present": style_reference_present,
        "outputType": "KREA_STYLE_REF" if style_reference_present else None,
        "consumer": STYLE_REFERENCE_LOCAL_CONSUMER if local_style_consumer_present else None,
        "consumerIsRemoteApiNode": local_style_consumer_present,
        "compatibleWithLocalSixLoraSamplerGraph": False,
        "decision": "blocked-from-local-six-lora-graph",
        "reason": "KREA_STYLE_REF is consumed by the remote Krea2ImageNode API node, not by the local MODEL/CONDITIONING/LATENT sockets.",
    }
    return probe


def enum_options(object_info: dict[str, Any], node: str, field: str) -> list[str]:
    spec = ((object_info.get(node) or {}).get("input") or {}).get("required") or {}
    entry = spec.get(field)
    if isinstance(entry, list) and entry and isinstance(entry[0], list):
        return [str(item) for item in entry[0]]
    return []


def inspect_weight_lists(object_info: dict[str, Any]) -> dict[str, Any]:
    lookups = {
        "diffusion_models": ("UNETLoader", "unet_name"),
        "text_encoders": ("CLIPLoader", "clip_name"),
        "vae": ("VAELoader", "vae_name"),
    }
    result: dict[str, Any] = {}
    for slot, expected in REQUIRED_WEIGHTS.items():
        node, field = lookups[slot]
        options = enum_options(object_info, node, field)
        result[slot] = {
            "expected": expected,
            "present": expected in options,
            "candidateCount": len(options),
        }
    return result


def inspect_lora_availability(object_info: dict[str, Any]) -> dict[str, Any]:
    options = set(enum_options(object_info, "LoraLoaderModelOnly", "lora_name"))
    wanted = [name for name, _ in REQUIRED_STYLE_LORAS]
    missing = [name for name in wanted if name not in options]
    identity_name = IDENTITY_EDIT_LORA[0]
    return {
        "styleChain": wanted,
        "missing": missing,
        "identityEdit": {"name": identity_name, "present": identity_name in options},
        "installedCount": len(options),
    }


def inspect_candidate(path: Path) -> dict[str, Any]:
    detail: dict[str, Any] = {"path": str(path), "exists": path.exists()}
    if not path.exists():
        return detail
    data = path.read_bytes()
    detail["bytes"] = len(data)
    detail["sha256"] = sha256_bytes(data)
    try:
        from PIL import Image  # noqa: PLC0415 - optional dependency
    except ImportError:
        detail["inspection"] = "pillow-unavailable"
        return detail
    with Image.open(path) as image:
        detail["resolution"] = list(image.size)
        detail["mode"] = image.mode
        detail["hasAlpha"] = image.mode in {"RGBA", "LA", "PA"}
    return detail


def build_record(args: argparse.Namespace) -> tuple[dict[str, Any], list[str]]:
    workflow_path = Path(args.workflow).resolve()
    workflow_bytes = workflow_path.read_bytes()
    workflow = json.loads(workflow_bytes.decode("utf-8"))

    workflow_hash = sha256_bytes(workflow_bytes)
    topology = workflow_topology(workflow)
    topology_hash = sha256_bytes(js_json(topology).encode("utf-8"))

    issues: list[str] = []
    if workflow_hash != EXPECTED_WORKFLOW_SHA256:
        issues.append(
            f"workflow sha256 {workflow_hash} does not match the pinned baseline {EXPECTED_WORKFLOW_SHA256}"
        )
    if topology_hash != EXPECTED_TOPOLOGY_SHA256:
        issues.append(
            f"topology sha256 {topology_hash} does not match the pinned baseline {EXPECTED_TOPOLOGY_SHA256}"
        )

    chain = collect_style_chain(workflow)
    issues.extend(verify_style_chain(chain))

    evidence_path = Path(args.evidence).resolve()
    evidence: dict[str, Any] = {}
    if evidence_path.exists():
        evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
        if evidence.get("workflow", {}).get("sha256") != workflow_hash:
            issues.append("evidence file workflow hash disagrees with the workflow on disk")
        if evidence.get("runtime", {}).get("topologySha256") != topology_hash:
            issues.append("evidence file topology hash disagrees with the recomputed topology")
    else:
        issues.append(f"baseline evidence file is missing: {evidence_path}")

    probe: dict[str, Any] = {"performed": False}
    if args.probe:
        probe = probe_comfyui(normalize_loopback(args.comfy_url), args.timeout)
        probe["performed"] = True
        issues.extend(probe.get("issues", []))

    candidate = inspect_candidate(Path(args.candidate).resolve()) if args.candidate else None

    if candidate and args.candidate_reviewed:
        gate_status = "canonical-candidate-directly-reviewed"
        gate_reason = (
            "A candidate passed direct visual review recorded by the operator; "
            "batch character production may proceed against this anchor."
        )
    elif candidate:
        gate_status = "blocked-pending-direct-image-review"
        gate_reason = (
            "A candidate was supplied without a recorded direct visual review. "
            "Automated hashing and geometry checks never substitute for reading the image."
        )
    else:
        gate_status = "blocked-pending-direct-image-review"
        gate_reason = (
            "No Albina canonical candidate has been directly reviewed and promoted yet, "
            "so batch character production stays gated."
        )

    record = {
        "schemaVersion": 1,
        "id": "albina-krea2-verified-baseline-v1",
        "generatedBy": "scripts/build_verified_krea2_baseline.py",
        "purpose": "albina-local-krea2-production-baseline",
        "workflow": {
            "path": str(workflow_path),
            "sha256": workflow_hash,
            "expectedSha256": EXPECTED_WORKFLOW_SHA256,
            "nodeCount": len(workflow),
        },
        "runtime": {
            "topologySha256": topology_hash,
            "expectedTopologySha256": EXPECTED_TOPOLOGY_SHA256,
            "volatileInputKeys": sorted(TOPOLOGY_VOLATILE_INPUT_KEYS),
        },
        "model": REQUIRED_WEIGHTS["diffusion_models"],
        "textEncoder": REQUIRED_WEIGHTS["text_encoders"],
        "vae": REQUIRED_WEIGHTS["vae"],
        "styleLoraChain": [
            {"name": name, "strength": strength} for name, strength in REQUIRED_STYLE_LORAS
        ],
        "observedStyleLoraChain": chain,
        "identityEdit": {
            "name": IDENTITY_EDIT_LORA[0],
            "strength": IDENTITY_EDIT_LORA[1],
            "placement": "immediately after the sixth production style LoRA, never before or between them",
        },
        "hybridPipeline": {
            "authorized": True,
            "modes": ["txt2img", "img2img"],
            "rule": "img2img may add canonical source, identity edit, style reference and depth/canny/pose/segmentation control, but never bypasses or reweights the six-LoRA chain",
            "reviewApi": "GCLI Gemini 3 Flash for source analysis, reverse prompting and paired review; advisory only",
            "styleReferenceLocalCompatibility": {
                "node": STYLE_REFERENCE_NODE,
                "consumer": STYLE_REFERENCE_LOCAL_CONSUMER,
                "compatible": False,
                "decision": "do-not-use-in-local-six-lora-production",
            },
        },
        "comfyui": probe,
        "evidenceFile": {
            "path": str(evidence_path),
            "exists": evidence_path.exists(),
            "verified": bool(evidence.get("verified")) if evidence else False,
        },
        "candidate": candidate,
        "characterIdentityGate": {
            "status": gate_status,
            "reason": gate_reason,
            "directImageReviewRequired": True,
            "automatedVisionIsAdvisoryOnly": True,
        },
        "issues": issues,
        "verified": not issues,
    }
    return record, issues


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Build and verify the Albina Krea2 production baseline record."
    )
    parser.add_argument("--workflow", default=str(DEFAULT_WORKFLOW))
    parser.add_argument("--evidence", default=str(DEFAULT_EVIDENCE))
    parser.add_argument("--out", default=str(DEFAULT_OUTPUT))
    parser.add_argument("--comfy-url", default=DEFAULT_COMFY_URL)
    parser.add_argument("--timeout", type=float, default=20.0)
    parser.add_argument(
        "--no-probe", dest="probe", action="store_false", help="skip the live ComfyUI probe"
    )
    parser.add_argument("--candidate", help="optional staging candidate PNG to record")
    parser.add_argument(
        "--candidate-reviewed",
        action="store_true",
        help="assert the operator directly viewed the candidate at original resolution",
    )
    parser.set_defaults(probe=True)
    args = parser.parse_args()

    record, issues = build_record(args)

    out_path = Path(args.out).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"wrote {out_path}")
    print(f"workflow sha256 : {record['workflow']['sha256']}")
    print(f"topology sha256 : {record['runtime']['topologySha256']}")
    print(f"style chain     : {len(record['observedStyleLoraChain'])} loader(s)")
    print(f"identity gate   : {record['characterIdentityGate']['status']}")
    if issues:
        print(f"issues          : {len(issues)}")
        for issue in issues:
            print(f"  - {issue}")
        return 1
    print("issues          : none")
    return 0


if __name__ == "__main__":
    sys.exit(main())
