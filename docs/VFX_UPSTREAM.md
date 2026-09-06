# VFX upstream attribution and adaptation record

The VFX runtime in this card was authored for the Albina visual-novel surface. It adapts architectural ideas, not code or assets, from [ThreeJSVFX-Demo](https://github.com/2606360985/ThreeJSVFX-Demo), fixed at commit `63c07ef6ea31785eb3e86cadf1e646055b7a2463` under the MIT License.

The reviewed upstream snapshot is recorded in the local ThreeJSVFX skill research baseline. Its reusable ideas are explicit renderer ownership, shared frame-uniform boxes, quality profiles, procedural particle lifecycle, and deterministic GPU teardown. No upstream source files, models, HDRIs, textures, preview images, combat effects, UI, or other game assets are bundled in this project.

The card implementation keeps its own route palettes, shaders, cue meanings, static SVG fallback, and SillyTavern lifecycle integration. `SceneVfxCue` semantics are authored around atmosphere, dialogue emphasis, choice confirmation, chapter transitions, CG reveals, impacts, and endings; they are not a reproduction of the demo's combat vocabulary.
