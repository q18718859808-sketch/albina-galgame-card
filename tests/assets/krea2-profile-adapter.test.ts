import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import {
  buildKrea2ProfileWorkflow,
  getKrea2ProfileAdapter,
  loadKrea2ProfileAdapterContract,
} from '../../scripts/lib/krea2-profile-adapter.mjs';
import { validateCanonicalControlRepairWorkflow, validateKrea2ReferenceStyleWorkflow } from '../../scripts/lib/krea2-restyle.mjs';

const baselinePath = 'staging/media/embedded-baseline/embedded-production-baseline.api.json';

describe('Krea2 profile adapter contract', () => {
  it('classifies every catalog candidate and exposes only explicit builders', async () => {
    const adapter = await loadKrea2ProfileAdapterContract();
    const candidateProfiles = adapter.profiles.filter((profile: any) => profile.adapterKind === 'candidate');
    expect(candidateProfiles.length).toBeGreaterThanOrEqual(20);
    expect(getKrea2ProfileAdapter(adapter, 'baseline-six-lora').implementationStatus).toBe('implemented');
    expect(getKrea2ProfileAdapter(adapter, 'krea2-edit-grounded').implementationStatus).toBe('implemented');
    expect(getKrea2ProfileAdapter(adapter, 'albina-reference-style').implementationStatus).toBe('implemented');
    expect(getKrea2ProfileAdapter(adapter, 'albina-community-style-transfer').implementationStatus).toBe('implemented');
    expect(getKrea2ProfileAdapter(adapter, 'albina-community-dype-raw').implementationStatus).toBe('implemented');
    expect(getKrea2ProfileAdapter(adapter, 'albina-community-two-stage').implementationStatus).toBe('implemented');
    expect(getKrea2ProfileAdapter(adapter, 'krea2-dype').implementationStatus).toBe('nodes-required');
    expect(getKrea2ProfileAdapter(adapter, 'official-krea2').implementationStatus).toBe('research-only');
  });

  it('dispatches baseline and grounded edit through different builders', async () => {
    const adapter = await loadKrea2ProfileAdapterContract();
    const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
    const common = {
      prompt: 'preserve the supplied subject design', seed: 7, filenamePrefix: 'adapter_smoke',
      aspectRatio: '9:16 (Portrait Widescreen)', megapixels: 1,
    };
    const native = buildKrea2ProfileWorkflow(adapter, 'baseline-six-lora', baseline, common);
    const edit = buildKrea2ProfileWorkflow(adapter, 'krea2-edit-grounded', baseline, {
      ...common, subjectImage: 'canonical.png', subjectReferenceBoost: 4,
    });
    expect(native.profile.builderId).toBe('native-baseline');
    expect(edit.profile.builderId).toBe('grounded-image-edit');
    expect(Object.values(native.workflow).some((node: any) => node.class_type === 'Krea2EditModelPatch')).toBe(false);
    expect(Object.values(edit.workflow).some((node: any) => node.class_type === 'Krea2EditModelPatch')).toBe(true);
  });

  it('dispatches canonical control through the repair graph with canonical latent origin', async () => {
    const adapter = await loadKrea2ProfileAdapterContract();
    const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
    const result = buildKrea2ProfileWorkflow(adapter, 'albina-canonical-control', baseline, {
      prompt: 'preserve the supplied adult Albina design exactly', negativePrompt: 'blank, redesign, blur',
      seed: 9, filenamePrefix: 'canonical-control-repair', sourceFilename: 'albina.png',
      width: 592, height: 1768, targetSize: { width: 592, height: 1768 },
    });
    expect(result.profile.builderId).toBe('canonical-control-repair');
    const entries = Object.entries(result.workflow) as Array<[string, any]>;
    const source = entries.find(([, node]) => node.class_type === 'LoadImage')![0];
    const encode = entries.find(([, node]) => node.class_type === 'VAEEncode')![0];
    const sampler = entries.find(([, node]) => node.class_type === 'SamplerCustomAdvanced')![1];
    expect(sampler.inputs.latent_image).toEqual([encode, 0]);
    expect(entries.find(([, node]) => node.class_type === 'ImageScale')![1].inputs.image).toEqual([source, 0]);
    expect(entries.some(([, node]) => node.class_type === 'EmptyLatentImage')).toBe(false);
    expect(entries.filter(([, node]) => node.class_type === 'KGTextEncodeKreaImageReferencesV10')).toHaveLength(2);
    expect(entries.some(([, node]) => node.class_type === 'DepthAnythingV2Preprocessor')).toBe(true);
    expect(validateCanonicalControlRepairWorkflow(result.workflow, { denoise: 0.24, steps: 20 })).toBe(true);
  });

  it('rejects unimplemented candidates instead of silently reusing baseline', async () => {
    const adapter = await loadKrea2ProfileAdapterContract();
    const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
    expect(() => buildKrea2ProfileWorkflow(adapter, 'krea2-dype', baseline, {
      prompt: 'x', seed: 1, filenamePrefix: 'x',
    })).toThrow(/nodes-required/);
    expect(() => buildKrea2ProfileWorkflow(adapter, 'official-krea2', baseline, {
      prompt: 'x', seed: 1, filenamePrefix: 'x',
    })).toThrow(/research-only/);
  });

  it('dispatches the role-separated reference route without geometry guidance from the style card', async () => {
    const adapter = await loadKrea2ProfileAdapterContract();
    const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
    const result = buildKrea2ProfileWorkflow(adapter, 'albina-reference-style', baseline, {
      prompt: 'preserve the supplied adult Albina design exactly and change rendering only',
      negativePrompt: 'redesign, blur, crop, watermark', seed: 11, filenamePrefix: 'reference-style',
      sourceFilename: 'albina.png', styleFilename: 'style.jpg', width: 592, height: 1768,
      targetSize: { width: 592, height: 1768 },
    });
    expect(result.profile.builderId).toBe('reference-style-role-separated');
    const entries = Object.entries(result.workflow) as Array<[string, any]>;
    expect(entries.filter(([, node]) => node.class_type === 'LoadImage')).toHaveLength(2);
    const cards = entries.filter(([, node]) => node.class_type === 'KGKrea2ImageGuideCardV10');
    expect(cards).toHaveLength(2);
    const style = cards.find(([, node]) => node.inputs['Use image for'] === 'suggest the visual style')![1];
    expect(style.inputs['Shape copied']).toBe(0);
    expect(style.inputs['Early layout guidance']).toBe(0);
    expect(validateKrea2ReferenceStyleWorkflow(result.workflow)).toBe(true);
  });

  it('builds community routes without silently retaining the historical six-LoRA chain', async () => {
    const adapter = await loadKrea2ProfileAdapterContract();
    const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
    const common = {
      prompt: 'preserve the supplied adult Albina design', negativePrompt: 'redesign, blur', seed: 12,
      filenamePrefix: 'community-route', width: 592, height: 1768, targetSize: { width: 592, height: 1768 },
      sourceFilename: 'albina.png', styleImage: 'style.jpg',
    };
    const style = buildKrea2ProfileWorkflow(adapter, 'albina-community-style-transfer', baseline, common);
    const dype = buildKrea2ProfileWorkflow(adapter, 'albina-community-dype-raw', baseline, common);
    const stage = buildKrea2ProfileWorkflow(adapter, 'albina-community-two-stage', baseline, common);
    for (const result of [style, dype, stage]) {
      expect(Object.values(result.workflow).filter((node: any) => node.class_type === 'LoraLoaderModelOnly')).toHaveLength(0);
    }
    expect(Object.values(style.workflow).some((node: any) => node.class_type === 'Krea2StyleTransfer')).toBe(true);
    expect(Object.values(dype.workflow).some((node: any) => node.class_type === 'DyPE_FLUX')).toBe(true);
    expect(Object.values(stage.workflow).some((node: any) => node.class_type === 'KreaTwoStageSampler')).toBe(true);
  });
});
