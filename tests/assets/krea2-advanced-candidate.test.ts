import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

import {
  assertKrea2AdvancedCandidateContract,
  buildKrea2AdvancedWorkflowDescription,
  detectKrea2AdvancedReadiness,
  inspectKrea2AdvancedWeightPaths,
} from '../../scripts/lib/krea2-advanced-candidate.mjs';

const fixedLoras = [
  ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
  ['Krea2Rella_c1-st8000.safetensors', 0.65],
  ['onineko_k2_v1.safetensors', 0.45],
  ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
  ['masterpieces-v51.safetensors', 0.45],
  ['ichika-k2_c1-st5000.safetensors', 0.35],
];

describe('Krea2 Advanced candidate adapter', () => {
  it('blocks the known current runtime and declares the current production fallback', () => {
    const readiness = detectKrea2AdvancedReadiness();
    expect(readiness.ready).toBe(false);
    expect(readiness.fallback?.adapter).toBe('scripts/lib/krea2-comfyui.mjs');
    expect(readiness.checks).toEqual({ diffusersApi: false, transformersApi: false, nodePack: false, rawWeights: false, turboWeights: false });
  });

  it('describes the candidate without changing the six-LoRA contract', () => {
    const description = buildKrea2AdvancedWorkflowDescription({ readiness: detectKrea2AdvancedReadiness({
      diffusersVersion: '0.40.0', hasKrea2Pipeline: true, transformersVersion: '4.55.0', hasQwen3VLModel: true,
      candidateNodePackPresent: true, weights: { raw: true, turbo: true },
    }) });
    expect(description.status).toBe('candidate-description-ready');
    expect(description.invariants.fixedStyleLoras.map(({ name, strength }) => [name, strength])).toEqual(fixedLoras);
    expect(description.invariants.loraMutationAllowed).toBe(false);
    expect(description.invariants.noGenerationByAdapter).toBe(true);
    expect(assertKrea2AdvancedCandidateContract(description)).toBe(true);
  });

  it('checks weight paths without starting a ComfyUI request', async () => {
    const result = await inspectKrea2AdvancedWeightPaths({ raw: 'D:/missing/krea-raw', turbo: '' });
    expect(result).toEqual({ raw: { present: false, path: 'D:/missing/krea-raw' }, turbo: { present: false, path: '' } });
  });

  it('records the JSON contract with the same six fixed LoRAs and blocked gates', async () => {
    const contract = JSON.parse(await readFile('content/media-production/krea2-advanced-adapter-v1.json', 'utf8'));
    expect(contract.status).toBe('blocked-pending-dependency-and-weight-gates');
    expect(contract.fixedStyleLoras.map(({ name, strength }: { name: string; strength: number }) => [name, strength])).toEqual(fixedLoras);
    expect(contract.installGates.mustPassBeforeAnyGeneration).toBe(true);
    expect(contract.fallback.adapter).toBe('scripts/lib/krea2-comfyui.mjs');
  });
});
