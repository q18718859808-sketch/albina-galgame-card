import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

import { validateKrea2CanonicalControlRestyle, validateKrea2ProductionStyleChain } from '../../scripts/lib/krea2-comfyui.mjs';
import { ALBINA_CANONICAL_CONTROL_PROFILE, ALBINA_STRUCTURE_LOCK_PROFILE, buildCanonicalControlRestyleWorkflow, buildLatentRestyleWorkflow, resolveAlbinaStructureLock } from '../../scripts/lib/krea2-restyle.mjs';
import { JOBS } from '../../scripts/krea2-canonical-restyle-batch.mjs';

const productionWorkflowPath = `${process.cwd()}/staging/media/embedded-baseline/embedded-production-baseline.api.json`;

describe('Krea2 canonical latent restyle topology', () => {
  it('keeps pre-upscale batch parameters bound by names instead of positional slots', () => {
    const callisto = JOBS.find((job) => job.id === 'callisto');
    expect(callisto).toMatchObject({ steps: 24, structureLock: false, preUpscaleInputScale: 0.75 });
    expect(callisto?.preUpscaleModel).toBeTruthy();
    expect(typeof callisto?.preUpscaleModel).toBe('string');
    expect(JOBS.filter((job) => job.group === 'characters' && job.preUpscaleModel).every((job) => job.structureLock === false && job.steps === 24)).toBe(true);
    expect(JOBS.filter((job) => job.group === 'auxiliary').length).toBeGreaterThanOrEqual(16);
  });
  it('loads auxiliary canonical jobs with null targets without weakening original job constraints', () => {
    const auxiliary = JOBS.filter((job) => job.group === 'auxiliary');
    const original = JOBS.filter((job) => job.group !== 'auxiliary');

    expect(auxiliary.length).toBeGreaterThan(0);
    expect(auxiliary.every((job) => job.id && job.source && job.target === null)).toBe(true);
    expect(auxiliary.every((job) => Number.isSafeInteger(job.seed) && Number.isSafeInteger(job.steps))).toBe(true);
    expect(auxiliary.every((job) => typeof job.structureLock === 'boolean')).toBe(true);

    expect(original.length).toBeGreaterThan(0);
    expect(original.filter((job) => job.group === 'characters').every((job) => typeof job.target === 'string')).toBe(true);
    expect(original.filter((job) => job.group === 'characters' && job.preUpscaleModel).every((job) => job.structureLock === false && job.steps === 24)).toBe(true);
    expect(original.filter((job) => job.group === 'backgrounds').every((job) => job.steps === 20 && job.preUpscaleModel === '4x-UltraSharp.pth' && job.structureLock === false)).toBe(true);
    expect(original.filter((job) => job.structureLock).every((job) => job.preUpscaleModel === null && job.steps >= 16 && job.steps <= 28)).toBe(true);
  });
  it('provides a conservative Albina structure-lock profile', () => {
    expect(ALBINA_STRUCTURE_LOCK_PROFILE).toMatchObject({
      denoise: 0.10, steps: 24, vaeTiled: false, preUpscaleModel: null, depthControl: null,
    });
    expect(resolveAlbinaStructureLock({ structureLock: true })).toMatchObject({
      denoise: 0.10, steps: 24, vaeTiled: false, preserveAlpha: true,
    });
    expect(() => resolveAlbinaStructureLock({ structureLock: true, denoise: 0.46 })).toThrow(/denoise/);
    expect(() => resolveAlbinaStructureLock({ structureLock: true, depthControl: { strength: 0.5 } })).toThrow(/forbids/);
    expect(() => resolveAlbinaStructureLock({ structureLock: true, vaeTiled: true })).toThrow(/forbids/);
  });

  it('builds an Albina structure-lock graph from the canonical latent origin', async () => {
    const baseline = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const { workflow } = buildLatentRestyleWorkflow(baseline, {
      prompt: 'preserve the adult mechanical Albina design',
      negativePrompt: 'blurry, redesign, malformed anatomy',
      seed: 7, width: 672, height: 2016, filenamePrefix: 'albina-structure-lock',
      sourceFilename: 'albina.png', structureLock: true,
    });
    const sampler = Object.values(workflow).find((node: any) => node.class_type === 'SamplerCustomAdvanced') as any;
    const scheduler = Object.values(workflow).find((node: any) => node.class_type === 'BasicScheduler') as any;
    const encodedId = Object.entries(workflow).find(([, node]: any) => node.class_type === 'VAEEncode')?.[0];
    expect(sampler.inputs.latent_image).toEqual([encodedId, 0]);
    expect(scheduler.inputs).toMatchObject({ denoise: 0.10, steps: 24 });
    expect(Object.values(workflow).some((node: any) => ['Krea2EditModelPatch', 'ConditioningZeroOut', 'Krea2ControlApply', 'VAEEncodeTiled', 'ImageUpscaleWithModel'].includes(node.class_type))).toBe(false);
  });

  it('keeps all six style LoRAs active and uses one controlled model for scheduling and guidance', async () => {
    const baseline = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const { workflow, topology } = buildLatentRestyleWorkflow(baseline, {
      prompt: 'preserve the canonical design',
      negativePrompt: 'redesign, blur',
      seed: 7,
      width: 680,
      height: 2032,
      filenamePrefix: 'restyle-topology-test',
      sourceFilename: 'canonical.png',
      denoise: 0.38,
      steps: 20,
      preUpscaleModel: '4x_fatal_Anime_500000_G.pth',
      preUpscaleInputSize: { width: 592, height: 1768 },
      depthControl: { strength: 0.4 },
      vaeTiled: true,
    });

    expect(validateKrea2ProductionStyleChain(workflow)).toEqual([
      { name: 'z3zz4-k2-4_c1-st5000.safetensors', strength: 0.55 },
      { name: 'Krea2Rella_c1-st8000.safetensors', strength: 0.65 },
      { name: 'onineko_k2_v1.safetensors', strength: 0.45 },
      { name: 'meion_krea2_style_v7.0_c1-st4000.safetensors', strength: 0.45 },
      { name: 'masterpieces-v51.safetensors', strength: 0.45 },
      { name: 'ichika-k2_c1-st5000.safetensors', strength: 0.35 },
    ]);

    const nodeId = (type: string) => Object.entries(workflow)
      .find(([, node]: [string, any]) => node.class_type === type)?.[0];
    const sampler = workflow[nodeId('SamplerCustomAdvanced')!] as any;
    const scheduler = workflow[nodeId('BasicScheduler')!] as any;
    const guider = workflow[nodeId('CFGGuider')!] as any;
    const encoded = nodeId('VAEEncodeTiled');

    expect(topology.structuralControl).not.toBeNull();
    expect(sampler.inputs.latent_image).toEqual([encoded, 0]);
    expect(scheduler.inputs.model).toEqual([topology.structuralControl!.controlled, 0]);
    expect(guider.inputs.model).toEqual([topology.structuralControl!.controlled, 0]);
    expect(scheduler.inputs).toMatchObject({ steps: 20, denoise: 0.38 });
    expect(workflow[nodeId('VAEDecodeTiled')!] as any).toMatchObject({
      inputs: { samples: [nodeId('SamplerCustomAdvanced'), 0], tile_size: 1024, overlap: 128 },
    });
  });

  it('keeps an optional audited post-style LoRA after the six-node baseline', async () => {
    const baseline = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const { workflow } = buildLatentRestyleWorkflow(baseline, {
      prompt: 'preserve the canonical design',
      negativePrompt: 'redesign, blur',
      seed: 8,
      width: 680,
      height: 2032,
      filenamePrefix: 'restyle-post-style-test',
      sourceFilename: 'canonical.png',
      denoise: 0.12,
      steps: 8,
      postStyleLora: { name: 'detailed-manga-inkwork-comfy.safetensors', strength: 0.2 },
    });

    expect(validateKrea2ProductionStyleChain(workflow, { allowAuditedPostStyle: true })).toHaveLength(6);
    const extensions = Object.values(workflow).filter((node: any) => node.class_type === 'LoraLoaderModelOnly');
    expect(extensions.at(-1)).toMatchObject({
      inputs: { lora_name: 'detailed-manga-inkwork-comfy.safetensors', strength_model: 0.2 },
    });
  });

  it('builds a distinct canonical/control route from a fresh target latent', async () => {
    const baseline = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const workflow = buildCanonicalControlRestyleWorkflow(baseline, {
      prompt: 'adult Albina, preserve every canonical mechanical anchor and render with the Krea2 baseline',
      negativePrompt: 'loli, redesign, blur, malformed anatomy',
      seed: 19,
      width: 824,
      height: 2472,
      filenamePrefix: 'albina-canonical-control',
      sourceFilename: 'albina-canonical.png',
    });
    expect(validateKrea2CanonicalControlRestyle(workflow)).toBe(true);
    expect(ALBINA_CANONICAL_CONTROL_PROFILE).toEqual({ identityStrength: 0.95, promptStrength: 0.7, depthStrength: 0.85 });
    expect(validateKrea2ProductionStyleChain(workflow)).toHaveLength(6);
    const entries = Object.entries(workflow) as Array<[string, any]>;
    const sampler = entries.find(([, node]) => node.class_type === 'SamplerCustomAdvanced')![1];
    const latent = entries.find(([, node]) => node.class_type === 'EmptyLatentImage')![0];
    expect(sampler.inputs.latent_image).toEqual([latent, 0]);
    expect(entries.filter(([, node]) => node.class_type === 'VAEEncode')).toHaveLength(0);
    expect(entries.filter(([, node]) => node.class_type === 'KGTextEncodeKreaImageReferencesV10')).toHaveLength(2);
    expect(entries.find(([, node]) => node.class_type === 'KGKrea2ImageGuideCardV10')![1].inputs['Reference image']).toEqual([
      entries.find(([, node]) => node.class_type === 'LoadImage')![0], 0,
    ]);
    const controlLora = entries.find(([, node]) => node.class_type === 'Krea2ControlLoRALoader');
    const controlModelId = entries.find(([, node]) => node.class_type === 'Krea2ControlLoRALoader')?.[1].inputs.model?.[0];
    expect(controlLora?.[1].inputs).toMatchObject({
      model: [controlModelId, 0], lora_name: 'depth-control-lora.safetensors', strength: 0.85,
    });
  });

  it('rejects canonical/control graphs that silently fall back to latent-origin sampling', async () => {
    const baseline = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const workflow = buildCanonicalControlRestyleWorkflow(baseline, {
      prompt: 'adult Albina', seed: 20, width: 824, height: 2472,
      filenamePrefix: 'invalid-canonical-control', sourceFilename: 'albina-canonical.png',
    });
    const latent = Object.entries(workflow).find(([, node]: any) => node.class_type === 'EmptyLatentImage')![0];
    const source = Object.entries(workflow).find(([, node]: any) => node.class_type === 'LoadImage')![0];
    const encodeId = String(Math.max(...Object.keys(workflow).map(Number)) + 1);
    workflow[encodeId] = { class_type: 'VAEEncode', inputs: { pixels: [source, 0], vae: ['129', 0] } };
    (Object.values(workflow).find((node: any) => node.class_type === 'SamplerCustomAdvanced') as any).inputs.latent_image = [encodeId, 0];
    expect(latent).not.toBe(encodeId);
    expect(() => validateKrea2CanonicalControlRestyle(workflow)).toThrow(/fresh target EmptyLatentImage/);
  });
});
