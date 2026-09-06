# Krea2 ComfyUI Gateway boundary

Krea2 generation remains a direct ComfyUI API operation on `http://127.0.0.1:8199`. `enqueueKrea2Job()` still posts the raw workflow only to `/prompt` on the selected direct ComfyUI URL. The optional gateway is never selected by that function and is not an image upload, preview, or prompt proxy.

The monitoring/recovery side channel is disabled unless both the caller explicitly opts in with `ALBINA_COMFY_GATEWAY_ENABLED=1` (accepted truthy values are `1`, `true`, `yes`, and `on`) and uses the gateway helpers. `ALBINA_COMFY_GATEWAY_URL` may select a loopback HTTP URL on port `5050`; when omitted, the opt-in default is `http://127.0.0.1:5050`. Remote hosts, HTTPS, other ports, and URL paths are rejected.

The helper contract is intentionally narrow: `getKrea2GatewayStatus()` performs `GET /system_stats`, `getKrea2GatewayQueue()` performs `GET /queue`, and `interruptKrea2Gateway()` performs an empty `POST /interrupt`. `getKrea2GatewayRecoverySnapshot()` combines status and queue reads. These paths follow the standard ComfyUI operational API shape; this repository contains no independent ComfyuiGW installation/API evidence, so reachability and gateway-specific compatibility must be verified against the deployed service. A disabled helper returns a structured `disabled` result without making a request.

Gateway health is operational evidence only. It cannot improve, measure, or certify image fidelity, identity preservation, mechanical-detail sharpness, or release readiness. The accepted two-pass high-frequency Albina staging anchor and the earlier rejected soft canonical RGB candidate are distinguished by their recorded workflow/receipt and direct original-resolution visual review, not by any 5050 status, queue, or interrupt response. Gateway availability therefore cannot replace a hash-bound direct review, alter an accepted/rejected verdict, or authorize promotion.

No helper accepts or forwards `prompt`, `workflow`, `images`, or `inputs` payloads. The interrupt helper rejects those fields if supplied. The implementation and its tests use mocked fetches only; they do not start GPU jobs or submit `/prompt` work through port `5050`.
