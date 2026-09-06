import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  buildKrea2Workflow,
  buildKrea2ImageEditWorkflow,
  buildKrea2ReferenceConditioningWorkflow,
  buildKrea2TextOverlayWorkflow,
  validateKrea2ProductionStyleChain,
  validateKrea2CanonicalLatentRestyle,
  makeKrea2Receipt,
  recordKrea2Failure,
  sha256,
  workflowTopology,
  workflowTopologySha256,
} from '../../scripts/lib/krea2-comfyui.mjs';
import { assertKrea2CharacterProductionGate, buildKrea2Review, krea2ReviewPath, prepareKrea2Landscape, validateKrea2Candidate, validateKrea2CandidateBindings, validateKrea2CharacterGateCertificate, validateKrea2ProductionBaseline, validateKrea2Review, validateKrea2ReviewBindings, validatePairedImageBinding } from '../../scripts/lib/krea2-delivery.mjs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const proofScriptPath = `${process.cwd()}/scripts/run-krea2-corrected-baseline-proof.mjs`;
const textProofScriptPath = `${process.cwd()}/scripts/run-krea2-text-overlay-proof.mjs`;
const textComposeScriptPath = `${process.cwd()}/scripts/compose-krea2-image-text.mjs`;
const textReviewScriptPath = `${process.cwd()}/scripts/review-krea2-image-text.mjs`;
const textRoiVerifierPath = `${process.cwd()}/scripts/verify-image-roi.py`;
const productionBaselineContractPath = `${process.cwd()}/content/media-production/krea2-img2img-baseline-v1.json`;
const productionWorkflowPath = `${process.cwd()}/staging/media/embedded-baseline/embedded-production-baseline.api.json`;
const textCapabilityContractPath = `${process.cwd()}/content/media-production/krea2-text-capability-v1.json`;
const pureAlbinaScriptPath = `${process.cwd()}/scripts/run-krea2-albina-pure-baseline.mjs`;

function baseline() {
  return {
    '1': { class_type: 'CLIPTextEncode', inputs: { text: 'old prompt', clip: ['2', 0] } },
    '2': { class_type: 'RandomNoise', inputs: { noise_seed: 1 } },
    '3': { class_type: 'SaveImage', inputs: { filename_prefix: 'old', images: ['4', 0] } },
    '4': { class_type: 'ResolutionSelector', inputs: { aspect_ratio: '1:1', megapixels: 1, preserved: true } },
    '5': { class_type: 'UNETLoader', inputs: { unet_name: 'redcraft23FP8_30Krea2.safetensors', weight_dtype: 'default' } },
  };
}

function terminalStyleModel(workflow: Record<string, any>): [string, number] {
  const loaders = Object.entries(workflow).filter(([, node]) => node.class_type === 'LoraLoaderModelOnly');
  const loaderIds = new Set(loaders.map(([id]) => id));
  const terminal = loaders.find(([id]) => !loaders.some(([, node]) => node.inputs?.model?.[0] === id));
  if (!terminal || !loaderIds.has(terminal[0])) throw new Error('Missing terminal style LoRA model');
  return [terminal[0], 0];
}

describe('Krea2 ComfyUI production adapter', () => {
  it('keeps pure Albina production on the immutable 20-node text baseline', async () => {
    const source = await readFile(pureAlbinaScriptPath, 'utf8');
    expect(source).toContain('Object.keys(workflow).length !== 20');
    expect(source).toContain("imageInputs: 0");
    expect(source).toContain("referenceNodes: 0");
    expect(source).toContain("editNodes: 0");
    expect(source).toContain("controlNodes: 0");
    expect(source).toContain("identityEdit: false");
    expect(source).toContain("postGenerationComposite: false");
    expect(source).toContain("injectedIntoWorkflow: false");
  });

  it('rejects a canonical restyle graph that only loads the source without using it as latent origin', async () => {
    const graph = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    graph['131'].inputs.latent_image = ['138', 0];
    expect(() => validateKrea2CanonicalLatentRestyle(graph)).toThrow(/VAEEncode latent origin/);
  });
  it('supports a direct tall full-canvas latent without a resolution-selector composite', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const workflow = buildKrea2ImageEditWorkflow(source, {
      prompt: 'faithful full-canvas canonical redraw', negativePrompt: 'inset, collage, redesign',
      systemPrompt: 'preserve the canonical design', seed: 7, filenamePrefix: 'albina-full-canvas-test',
      aspectRatio: '9:16 (Portrait Widescreen)', megapixels: 1, targetSize: { width: 512, height: 1536 },
      subjectImage: 'albina.png', subjectReferenceMask: 'alpha', subjectReferenceBoost: 5,
      fitMode: 'fit', groundingPixels: 1024,
      postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
    });
    const nodes = Object.values(workflow) as any[];
    expect(nodes.filter((node) => node.class_type === 'ResolutionSelector')).toHaveLength(0);
    expect(nodes.filter((node) => node.class_type === 'ImageCompositeMasked')).toHaveLength(0);
    expect(nodes.filter((node) => node.class_type === 'DepthAnythingPreprocessor')).toHaveLength(0);
    expect(nodes.filter((node) => node.class_type === 'SaveImage')).toHaveLength(1);
    expect(nodes.find((node) => node.class_type === 'EmptyLatentImage')?.inputs).toMatchObject({ width: 512, height: 1536 });
    expect(validateKrea2ProductionStyleChain(workflow)).toEqual([
      { name: 'z3zz4-k2-4_c1-st5000.safetensors', strength: 0.55 },
      { name: 'Krea2Rella_c1-st8000.safetensors', strength: 0.65 },
      { name: 'onineko_k2_v1.safetensors', strength: 0.45 },
      { name: 'meion_krea2_style_v7.0_c1-st4000.safetensors', strength: 0.45 },
      { name: 'masterpieces-v51.safetensors', strength: 0.45 },
      { name: 'ichika-k2_c1-st5000.safetensors', strength: 0.35 },
    ]);
  });

  it('keeps text generation as an audited ROI worker after the immutable Krea2 baseline', async () => {
    const contract = JSON.parse(await readFile(textCapabilityContractPath, 'utf8'));
    expect(contract.baseline.styleLoraOrder.map((name: string, index: number) => [name, contract.baseline.styleLoraWeights[index]])).toEqual([
      ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
      ['Krea2Rella_c1-st8000.safetensors', 0.65],
      ['onineko_k2_v1.safetensors', 0.45],
      ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
      ['masterpieces-v51.safetensors', 0.45],
      ['ichika-k2_c1-st5000.safetensors', 0.35],
    ]);
    expect(contract.policy.topologyRule).toContain('must-not-enter');
    expect(contract.policy.outsideRoiInvariant).toContain('byte-equivalent');
    expect(contract.proof.deterministicProof).toMatchObject({
      status: 'blocked-stale-baseline',
      artifactSha256: 'a80c20ac3d7b21c1065ddf9299d241efa53b852c4fe78734eab7edb511a3aa16',
      blockedReason: 'receipt baseline binding does not match the current embedded Krea2 baseline',
    });
    expect(contract.candidateIndex).toMatchObject({
      status: 'deterministic-approved-specialized-workers-blocked',
    });
    expect(contract.candidateIndex.remote.find((candidate: any) => candidate.id === 'anytext2-sd15-roi')).toMatchObject({
      installed: false,
      status: 'blocked-audit-gates-not-met',
      fixedCommit: '259ab7fa9b7a4f6f2ceedda2d14f57ac0041ff29',
      archiveSha256: 'd9ba31881bc44baec2aa532357d32ac1fe7885af805750036fe791cfe370fb68',
    });
    expect(contract.candidateIndex.remote.find((candidate: any) => candidate.id === 'anytext2-sd15-roi').auditBlockers).toHaveLength(7);
    expect(contract.candidateIndex.remote.find((candidate: any) => candidate.id === 'textflux')).toMatchObject({
      installed: false,
      status: 'blocked-by-resource-and-model-provenance-gate',
    });
    expect(contract.policy.protectedRegions).toEqual(expect.arrayContaining(['face', 'hands', 'identity-anchors']));
    expect(contract.acceptance.licenseRule).toContain('model weights');
    expect(contract.proof.deterministicProof.visibleText).toEqual(contract.acceptance.requiredSamples);
  });

  it('binds the approved deterministic typography proof to the actual artifact and review hashes', async () => {
    const contract = JSON.parse(await readFile(textCapabilityContractPath, 'utf8'));
    const proof = contract.proof.deterministicProof;
    const [artifact, receiptBytes, reviewBytes] = await Promise.all([
      readFile(`${process.cwd()}/${proof.artifact}`),
      readFile(`${process.cwd()}/${proof.receipt}`),
      readFile(`${process.cwd()}/${proof.review}`),
    ]);
    const receipt = JSON.parse(receiptBytes.toString('utf8'));
    const review = JSON.parse(reviewBytes.toString('utf8'));
    expect(sha256(artifact)).toBe(proof.artifactSha256);
    expect(receipt.output.sha256).toBe(proof.artifactSha256);
    expect(review.outputSha256).toBe(proof.artifactSha256);
    expect(review.status).toBe('approved');
    expect(receipt.baseline).not.toMatchObject({
      workflowSha256: contract.baseline.workflowSha256,
      topologySha256: '76851b2eec0bdd0b733dfc6fb73b0c5f886f92b672a869ad818f70f59f3bad81',
    });
  });

  it('keeps character production locked until the hybrid canonical certificate passes review', async () => {
    const contract = JSON.parse(await readFile(productionBaselineContractPath, 'utf8'));
    expect(contract.characterIdentityGate).toMatchObject({
      status: 'hybrid-canonical-certificate-pending',
      scope: expect.arrayContaining(['canonical characters', 'AU characters', 'protagonist portraits', 'character CG']),
      allowedProduction: expect.arrayContaining(['unoccupied environments']),
    });
    expect(contract.characterIdentityGate.unblockRequirement).toContain('hash-bound GCLI paired review and direct original-resolution review');
  });

  it('records unavailable or incompatible local identity controls instead of treating registered nodes as usable Krea2 production paths', async () => {
    const audit = JSON.parse(await readFile(`${process.cwd()}/content/media-production/krea2-identity-control-audit-v1.json`, 'utf8'));
    const faceId = audit.candidates.find((candidate: any) => candidate.id === 'ipadapter-faceid');
    expect(faceId).toMatchObject({ available: false, compatibleWithSixLoraKrea2: false });
    expect(faceId.missingLocalWeights).toEqual(expect.arrayContaining(['models/ipadapter', 'models/clip_vision', 'models/insightface']));
    expect(audit.candidates.find((candidate: any) => candidate.id === 'krea2-depth-control')).toMatchObject({
      available: true, compatibleWithSixLoraKrea2: true, status: 'available-structure-only',
    });
    expect(audit.candidates.find((candidate: any) => candidate.id === 'flux-kontext-fp8')).toMatchObject({
      available: true, compatibleWithSixLoraKrea2: false, status: 'installed-independent-research-path',
    });
  });

  it('requires a complete hash-bound certificate before character production can ever be enabled', () => {
    const certificate = {
      schemaVersion: 1, status: 'approved',
      canonicalSourceSha256: 'a'.repeat(64), canonicalOutputSha256: 'b'.repeat(64), workflowSha256: 'c'.repeat(64), topologySha256: 'd'.repeat(64),
      styleLoras: [
        ['z3zz4-k2-4_c1-st5000.safetensors', 0.55], ['Krea2Rella_c1-st8000.safetensors', 0.65], ['onineko_k2_v1.safetensors', 0.45],
        ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45], ['masterpieces-v51.safetensors', 0.45], ['ichika-k2_c1-st5000.safetensors', 0.35],
      ],
      identityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
      allowedScope: ['single character asset per invocation'],
      directImageReview: { artifactSha256: 'b'.repeat(64), reviewer: 'named visual reviewer', anchors: ['face', 'eyes', 'hair', 'tailoring', 'mechanical', 'body language'] },
      externalPairedReview: { path: 'staging/media/reviews/fabricated.json', sha256: 'e'.repeat(64) },
    };
    expect(() => validateKrea2CharacterGateCertificate(certificate)).toThrow(/paired review/);
    expect(() => validateKrea2CharacterGateCertificate({ ...certificate, status: 'blocked' })).toThrow(/not approved/);
    expect(() => validateKrea2CharacterGateCertificate({ ...certificate, canonicalOutputSha256: 'nope' })).toThrow(/canonicalOutputSha256/);
    expect(() => validateKrea2CharacterGateCertificate({ ...certificate, styleLoras: [] })).toThrow(/six-LoRA/);
    expect(() => validateKrea2CharacterGateCertificate({ ...certificate, externalPairedReview: { path: '../outside.json', sha256: 'e'.repeat(64) } })).toThrow(/paired review/);
    expect(() => assertKrea2CharacterProductionGate({ status: 'blocked', reason: 'canonical review failed' }, { category: 'characters' })).toThrow(/gate is blocked/);
  });

  it('changes only the approved invocation fields', () => {
    const source = baseline();
    const invocation = buildKrea2Workflow(source, {
      prompt: 'original industrial city background', seed: 42, filenamePrefix: 'pilot', aspectRatio: '16:9 (Widescreen)', megapixels: 2,
    });
    expect(source).toEqual(baseline());
    expect(invocation['1'].inputs.text).toBe('original industrial city background');
    expect(invocation['2'].inputs.noise_seed).toBe(42);
    expect(invocation['3'].inputs.filename_prefix).toBe('pilot');
    expect(invocation['4'].inputs).toMatchObject({ aspect_ratio: '16:9 (Widescreen)', megapixels: 2, preserved: true });
    expect(invocation['5']).toEqual(source['5']);
  });

  it('keeps the topology hash stable across permitted run parameters', () => {
    const first = buildKrea2Workflow(baseline(), { prompt: 'first', seed: 1, filenamePrefix: 'a', aspectRatio: '1:1', megapixels: 1 });
    const second = buildKrea2Workflow(baseline(), { prompt: 'second', seed: 2, filenamePrefix: 'b', aspectRatio: '16:9 (Widescreen)', megapixels: 2 });
    expect(sha256(JSON.stringify(workflowTopology(first)))).toBe(sha256(JSON.stringify(workflowTopology(second))));
  });

  it('builds image editing by extending, not replacing, the six-LoRA production baseline', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const edit = buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical subject at rest', seed: 7, filenamePrefix: 'canonical', subjectImage: 'subject.png', styleImage: 'style.png',
      allowDualReferenceExperimental: true,
    });
    const loaders = Object.entries(edit).filter(([, node]: any) => node.class_type === 'LoraLoaderModelOnly') as Array<[string, any]>;
    const loaderIds = new Set(loaders.map(([id]) => id));
    let current = loaders.find(([, node]) => !loaderIds.has(node.inputs.model?.[0]));
    const loras: Array<[string, number]> = [];
    while (current) {
      loras.push([current[1].inputs.lora_name, current[1].inputs.strength_model]);
      current = loaders.find(([, node]) => node.inputs.model?.[0] === current![0]);
    }
    expect(loras).toEqual([
      ['z3zz4-k2-4_c1-st5000.safetensors', 0.55], ['Krea2Rella_c1-st8000.safetensors', 0.65], ['onineko_k2_v1.safetensors', 0.45],
      ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45], ['masterpieces-v51.safetensors', 0.45], ['ichika-k2_c1-st5000.safetensors', 0.35],
    ]);
    expect(Object.values(edit).some((node: any) => node.class_type === 'Krea2EditModelPatch')).toBe(true);
    expect(Object.values(edit).some((node: any) => node.class_type === 'Krea2EditGroundedEncode')).toBe(true);
    const grounded = Object.values(edit).filter((node: any) => node.class_type === 'Krea2EditGroundedEncode') as any[];
    expect(grounded).toHaveLength(2);
    expect(grounded.every((node) => node.inputs.image_b)).toBe(true);
  });

  it('adds a single canonical reference conditioner without changing the six-LoRA model chain', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const reference = buildKrea2ReferenceConditioningWorkflow(source, {
      prompt: 'canonical adult subject', negativePrompt: 'text, watermark', seed: 7,
      filenamePrefix: 'reference-anchor', aspectRatio: '2:3 (Portrait Photo)', megapixels: 1,
      subjectImage: 'canonical.png', identityStrength: 0.9,
    });
    expect(validateKrea2ProductionStyleChain(reference)).toHaveLength(6);
    const guide = Object.entries(reference).find(([, node]: any) => node.class_type === 'KGKrea2ImageGuideCardV10') as [string, any];
    const encoders = Object.entries(reference).filter(([, node]: any) => node.class_type === 'KGTextEncodeKreaImageReferencesV10') as Array<[string, any]>;
    const guider = Object.values(reference).find((node: any) => node.class_type === 'CFGGuider') as any;
    expect(guide[1].inputs).toMatchObject({
      'Reference image': expect.any(Array),
      'Use image for': 'keep the same subject',
      'Subject copying': 'preserve same subject',
      'How strongly this image guides': 0.9,
    });
    expect(encoders).toHaveLength(2);
    const [positiveEncoder, negativeEncoder] = encoders;
    expect(positiveEncoder).toBeDefined();
    expect(negativeEncoder).toBeDefined();
    expect(guider.inputs.positive).toEqual([positiveEncoder![0], 0]);
    expect(guider.inputs.negative).toEqual([negativeEncoder![0], 0]);
    expect(() => buildKrea2ReferenceConditioningWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'invalid', subjectImage: 'canonical.png', styleImage: 'forbidden.png',
    })).toThrow(/exactly one canonical subject/i);
    const extended = structuredClone(source);
    extended['160'] = {
      class_type: 'LoraLoaderModelOnly',
      inputs: { model: terminalStyleModel(extended), lora_name: 'krea2_identity_edit_v1_2.safetensors', strength_model: 1 },
    };
    expect(() => buildKrea2ReferenceConditioningWorkflow(extended, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'invalid-extension', subjectImage: 'canonical.png',
    })).toThrow(/forbids the identity-edit extension/i);
  });

  it('combines Reference V10 conditioning with depth control after the exact six-LoRA chain', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const workflow = buildKrea2ReferenceConditioningWorkflow(source, {
      prompt: 'faithful adult Albina', negativePrompt: 'redesign', seed: 11,
      filenamePrefix: 'reference-depth-anchor', subjectImage: 'albina.png',
      identityStrength: 0.95, promptStrength: 0.7,
      targetSize: { width: 512, height: 1536 },
      krea2Control: { kind: 'depth', strength: 0.85 },
    });
    const entries = Object.entries(workflow) as Array<[string, any]>;
    const controlLoader = entries.find(([, node]) => node.class_type === 'Krea2ControlLoRALoader')!;
    const depth = entries.find(([, node]) => node.class_type === 'DepthAnythingV2Preprocessor')!;
    const controlEncode = entries.find(([, node]) => node.class_type === 'Krea2ControlImageEncode')!;
    const controlApply = entries.find(([, node]) => node.class_type === 'Krea2ControlApply');
    const sourceImage = entries.find(([, node]) => node.class_type === 'LoadImage' && node.inputs.image === 'albina.png')!;
    const guider = entries.find(([, node]) => node.class_type === 'CFGGuider')![1];
    const scheduler = entries.find(([, node]) => node.class_type === 'BasicScheduler')![1];
    const referenceEncoders = entries.filter(([, node]) => node.class_type === 'KGTextEncodeKreaImageReferencesV10');
    if (!controlApply || referenceEncoders.length !== 2) throw new Error('Reference V10 depth-control graph is incomplete');
    if (!controlLoader || !depth || !controlEncode || !sourceImage || !guider || !scheduler) throw new Error('Reference V10 depth-control nodes are incomplete');
    const [positiveReference, negativeReference] = referenceEncoders;
    if (!positiveReference || !negativeReference) throw new Error('Reference V10 conditioning nodes are incomplete');

    expect(validateKrea2ProductionStyleChain(workflow)).toEqual([
      { name: 'z3zz4-k2-4_c1-st5000.safetensors', strength: 0.55 },
      { name: 'Krea2Rella_c1-st8000.safetensors', strength: 0.65 },
      { name: 'onineko_k2_v1.safetensors', strength: 0.45 },
      { name: 'meion_krea2_style_v7.0_c1-st4000.safetensors', strength: 0.45 },
      { name: 'masterpieces-v51.safetensors', strength: 0.45 },
      { name: 'ichika-k2_c1-st5000.safetensors', strength: 0.35 },
    ]);
    expect(controlLoader[1].inputs).toEqual({
      model: terminalStyleModel(workflow), lora_name: 'depth-control-lora.safetensors', strength: 0.85,
    });
    expect(depth[1].inputs.image).toEqual([sourceImage[0], 0]);
    expect(controlEncode[1].inputs).toMatchObject({
      control_image: [depth[0], 0], vae: ['129', 0], latent: ['138', 0],
      resize: 'match_latent_size', crop: 'disabled', channel_mode: 'grayscale',
    });
    expect(controlApply[1].inputs).toEqual({
      model: [controlLoader[0], 0], control_latent: [controlEncode[0], 0],
    });
    expect(guider.inputs.model).toEqual([controlApply[0], 0]);
    expect(scheduler.inputs.model).toEqual([controlApply[0], 0]);
    expect(guider.inputs.positive).toEqual([positiveReference[0], 0]);
    expect(guider.inputs.negative).toEqual([negativeReference[0], 0]);
  });

  it('rejects unsupported depth thresholds and strengths outside the production range', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const baseOptions = {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'invalid-depth', subjectImage: 'canonical.png',
    };
    expect(() => buildKrea2ReferenceConditioningWorkflow(source, {
      ...baseOptions, krea2Control: { kind: 'depth', strength: -0.01 },
    })).toThrow(/strength must be between 0 and 1/i);
    expect(() => buildKrea2ReferenceConditioningWorkflow(source, {
      ...baseOptions, krea2Control: { kind: 'depth', strength: 1.01 },
    })).toThrow(/strength must be between 0 and 1/i);
    expect(() => buildKrea2ReferenceConditioningWorkflow(source, {
      ...baseOptions, krea2Control: { kind: 'depth', strength: 0.8, lowThreshold: 0.2 } as any,
    })).toThrow(/does not accept Canny threshold parameters/i);
    expect(() => buildKrea2ImageEditWorkflow(source, {
      ...baseOptions, krea2Control: { kind: 'depth', strength: 0.8, highThreshold: 0.6 } as any,
    })).toThrow(/does not accept Canny threshold parameters/i);
  });

  it('builds deterministic image text outside the diffusion graph', () => {
    const workflow = buildKrea2TextOverlayWorkflow({
      sourceImage: 'proof.png', font: 'Albina-NotoSansSC.otf', text: 'title',
      width: 1928, height: 1088, x: 80, y: 72, fontSize: 74, color: '#d8bb72', filenamePrefix: 'proof',
    });
    expect(workflow['2'].class_type).toBe('CreateTextMask');
    expect(workflow['3'].class_type).toBe('ImageCompositeMasked');
    expect(workflow['2'].inputs.text).toBe('title');
    expect(Object.values(workflow).some((node: any) => node.class_type === 'UNETLoader')).toBe(false);
    const proof = buildKrea2TextOverlayWorkflow({
      backgroundColor: 0x101216, font: 'Albina-NotoSansSC.otf', text: '阿尔比娜 / 第九章',
      width: 1928, height: 1088, x: 80, y: 72, fontSize: 74, color: '#d8bb72', filenamePrefix: 'proof-layer',
    });
    expect(proof['1']).toEqual({ class_type: 'EmptyImage', inputs: { width: 1928, height: 1088, batch_size: 1, color: 0x101216 } });
    expect(Object.values(proof).some((node: any) => node.class_type === 'LoadImage')).toBe(false);
    expect(() => buildKrea2TextOverlayWorkflow({ sourceImage: 'proof.png', font: 'font.otf', text: 'x', width: 1, height: 1088 })).toThrow(/dimensions/i);
    expect(() => buildKrea2TextOverlayWorkflow({ sourceImage: 'proof.png', backgroundColor: 0, font: 'font.otf', text: 'x', width: 1928, height: 1088 })).toThrow(/exactly one/i);
  });

  it('rejects a six-file baseline when its model connections do not preserve the production order', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    // Swapping two adjacent LoRA payloads keeps the chain linear, so the guard
    // must reject the wrong production order rather than only broken wiring.
    const swapped = source['147'].inputs.lora_name;
    source['147'].inputs.lora_name = source['149'].inputs.lora_name;
    source['149'].inputs.lora_name = swapped;
    expect(() => validateKrea2ProductionStyleChain(source)).toThrow(/orphaned LoRA|six-LoRA production baseline/i);
  });

  it('rejects a six-file baseline whose style chain forks into a branch', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    source['147'].inputs.model = ['146', 0];
    expect(() => validateKrea2ProductionStyleChain(source)).toThrow(/contains a branch/i);
  });

  it('rejects a baseline that adds an untracked CLIP LoRA strength override', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    source['147'].inputs.strength_clip = 1;
    expect(() => validateKrea2ProductionStyleChain(source)).toThrow(/CLIP strength override/i);
  });

  it('rejects an orphaned LoRA node instead of reporting only the traversed chain', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    source['160'] = { class_type: 'LoraLoaderModelOnly', inputs: { model: ['5', 0], lora_name: 'rogue.safetensors', strength_model: 1 } };
    expect(() => validateKrea2ProductionStyleChain(source)).toThrow(/orphaned LoRA/i);
  });

  it('rejects dual-reference editing unless explicitly marked experimental', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    expect(() => buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical subject', seed: 7, filenamePrefix: 'dual-reference', subjectImage: 'subject.png', styleImage: 'style.png',
    })).toThrow(/experimental/i);
  });

  it('persists a bounded, explicit execution failure without claiming output', () => {
    const receipt = makeKrea2Receipt({
      jobId: 'visual.image.bg.test', status: 'running', prompt: 'no text', promptSha256: 'a'.repeat(64),
      baselineWorkflowSha256: 'b'.repeat(64), invocationWorkflowSha256: 'c'.repeat(64), topologySha256: 'd'.repeat(64),
    });
    const failed = recordKrea2Failure(receipt, new Error('hostbuf_file_reader_read failed\nfull trace omitted'), {
      failedAt: '2026-08-09T05:00:00.000Z',
    });
    expect(failed).toMatchObject({
      status: 'failed', failedAt: '2026-08-09T05:00:00.000Z', output: null,
      failure: { kind: 'comfyui-execution', message: 'hostbuf_file_reader_read failed full trace omitted' },
    });
  });

  it('requires explicit, complete review evidence before a Krea2 delivery can proceed', () => {
    const job = { id: 'visual.image.bg.test', delivery: { format: 'jpg', width: 1280, height: 720 } };
    const receipt = makeKrea2Receipt({
      jobId: job.id, status: 'awaiting-review', prompt: 'no text', promptSha256: 'a'.repeat(64),
      baselineWorkflowSha256: 'b'.repeat(64), invocationWorkflowSha256: 'c'.repeat(64), topologySha256: 'd'.repeat(64),
      resolution: { delivery: job.delivery }, output: { sha256: 'e'.repeat(64), path: 'staging/source.png' },
    });
    const productionBaseline = { workflowSha256: 'b'.repeat(64), topologySha256: 'd'.repeat(64) };
    validateKrea2Candidate(receipt, job, productionBaseline);
    const evidence = [{ criterion: 'no readable text', note: 'Checked at 100% scale.', evidence: 'asset://review/krea2-test' }];
    expect(() => buildKrea2Review(receipt, 'visual-reviewer', evidence, undefined)).toThrow(/explicit approved or rejected decision/i);
    const review = buildKrea2Review(receipt, 'visual-reviewer', evidence, 'approved', { reviewedAt: '2026-08-09T08:00:00.000Z' });
    expect(validateKrea2Review(review, receipt, ['no readable text'])).toMatchObject({ status: 'approved', jobId: job.id });
    expect(() => validateKrea2Review({ ...review, criteria: [] }, receipt, ['no readable text'])).toThrow(/criteria/i);
    const rejected = buildKrea2Review(receipt, 'visual-reviewer', evidence, 'rejected', {
      rejectReasons: ['Visible anatomy artifact requires regeneration.'],
      reviewedAt: '2026-08-09T08:05:00.000Z',
    });
    expect(rejected).toMatchObject({
      status: 'rejected', artifactSha256: receipt.output.sha256,
      receiptSha256: expect.stringMatching(/^[a-f0-9]{64}$/),
      rejectReasons: ['Visible anatomy artifact requires regeneration.'],
      criteria: [{ criterion: 'no readable text', status: 'reviewed' }],
    });
    expect(() => validateKrea2Review(rejected, receipt, ['no readable text'])).toThrow(/not approved/i);
    expect(() => buildKrea2Review(receipt, 'visual-reviewer', evidence, 'rejected')).toThrow(/reject reason/i);
  });

  it('recomputes every candidate and review hash binding from real files', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-krea2-bindings-'));
    try {
      const artifactRoot = join(root, 'media');
      const stagingRoot = join(artifactRoot, 'krea2-v1');
      const baselinePath = join(root, 'baseline.json');
      const outputPath = join(stagingRoot, 'candidate.png');
      await mkdir(stagingRoot, { recursive: true });
      const workflow = baseline();
      const workflowBytes = Buffer.from(JSON.stringify(workflow));
      const output = Buffer.from('actual-image-bytes');
      await Promise.all([writeFile(baselinePath, workflowBytes), writeFile(outputPath, output)]);
      const topologySha256 = sha256(JSON.stringify(workflowTopology(workflow)));
      const productionBaseline = { workflowSha256: sha256(workflowBytes), topologySha256 };
      const job = { id: 'visual.image.bg.binding-test', delivery: { format: 'jpg', width: 1280, height: 720 } };
      const receipt = makeKrea2Receipt({
        jobId: job.id, status: 'awaiting-review', prompt: 'bound prompt', promptSha256: sha256('bound prompt'),
        baselineWorkflowSha256: productionBaseline.workflowSha256,
        invocationWorkflowSha256: sha256(JSON.stringify(workflow)), topologySha256,
        resolution: { delivery: job.delivery }, output: {
          sha256: sha256(output), bytes: output.length, path: outputPath, history: { prompt: [1, 'prompt-id', workflow] },
        },
      });
      const options = { artifactRoot, baselineWorkflowPath: baselinePath };
      await expect(validateKrea2CandidateBindings(receipt, job, productionBaseline, options)).resolves.toBe(receipt);

      await expect(validateKrea2CandidateBindings({ ...receipt, prompt: 'tampered' }, job, productionBaseline, options)).rejects.toThrow(/prompt hash mismatch/i);
      await expect(validateKrea2CandidateBindings({ ...receipt, output: { ...receipt.output, sha256: 'f'.repeat(64) } }, job, productionBaseline, options)).rejects.toThrow(/output hash or size mismatch/i);
      await expect(validateKrea2CandidateBindings({ ...receipt, workflow: { ...receipt.workflow, invocationSha256: 'f'.repeat(64) } }, job, productionBaseline, options)).rejects.toThrow(/invocation workflow hash mismatch/i);
      await expect(validateKrea2CandidateBindings({ ...receipt, workflow: { ...receipt.workflow, topologySha256: 'f'.repeat(64) } }, job, productionBaseline, options)).rejects.toThrow(/verified production baseline|topology hash mismatch/i);

      await writeFile(baselinePath, Buffer.from(`${JSON.stringify(workflow)}\n`));
      await expect(validateKrea2CandidateBindings(receipt, job, productionBaseline, options)).rejects.toThrow(/baseline workflow hash mismatch/i);
      await writeFile(baselinePath, workflowBytes);

      const criteria: [string] = ['no readable text'];
      const review = buildKrea2Review(receipt, 'visual-reviewer', [{ criterion: criteria[0], note: 'Opened at original resolution.', evidence: 'hash-bound direct inspection' }], 'approved', { reviewedAt: '2026-08-14T08:00:00.000Z' });
      const reviewPath = krea2ReviewPath(job.id, stagingRoot);
      await mkdir(join(stagingRoot, 'reviews'), { recursive: true });
      await writeFile(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
      await expect(validateKrea2ReviewBindings(review, receipt, criteria, {
        ...options, job, productionBaseline, stagingRoot, reviewPath,
      })).resolves.toBe(review);
      await expect(validateKrea2ReviewBindings({ ...review, artifactSha256: 'f'.repeat(64) }, receipt, criteria, {
        ...options, job, productionBaseline, stagingRoot, reviewPath,
      })).rejects.toThrow(/review identity|review artifact hash/i);
      await expect(validateKrea2ReviewBindings({ ...review, reviewer: 'different-reviewer' }, receipt, criteria, {
        ...options, job, productionBaseline, stagingRoot, reviewPath,
      })).rejects.toThrow(/review file content mismatch/i);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('rejects paired review images that escape staging media through traversal or junctions', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-krea2-paired-boundary-'));
    try {
      const media = join(root, 'staging', 'media');
      const outside = join(root, 'outside');
      await mkdir(media, { recursive: true });
      await mkdir(outside, { recursive: true });
      const outsideImage = join(outside, 'image.png');
      await writeFile(outsideImage, 'outside-image');
      await expect(Promise.resolve().then(() => validatePairedImageBinding({ path: outsideImage, sha256: sha256('outside-image') }, 'candidate'))).rejects.toThrow(/escaped .*staging media boundary/i);

      const linked = join(media, 'linked');
      await symlink(outside, linked, 'junction');
      await expect(Promise.resolve().then(() => validatePairedImageBinding({ path: join(linked, 'image.png'), sha256: sha256('outside-image') }, 'candidate'))).rejects.toThrow(/escaped .*staging media boundary/i);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('self-validates landscape source and delivery targets against realpath boundaries', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-krea2-landscape-boundary-'));
    try {
      const media = join(root, 'media');
      const staging = join(root, 'staging');
      const outside = join(root, 'outside');
      await Promise.all([mkdir(media, { recursive: true }), mkdir(staging, { recursive: true }), mkdir(outside, { recursive: true })]);
      const baselinePath = join(root, 'baseline.json');
      const workflow = baseline();
      const workflowBytes = Buffer.from(JSON.stringify(workflow));
      await writeFile(baselinePath, workflowBytes);
      const productionBaseline = { workflowSha256: sha256(workflowBytes), topologySha256: sha256(JSON.stringify(workflowTopology(workflow))) };
      const job = { id: 'visual.image.bg.boundary-test', delivery: { format: 'png', width: 2, height: 2 } };
      const outsideSource = join(outside, 'source.png');
      const source = Buffer.from('source');
      await writeFile(outsideSource, source);
      const receipt = makeKrea2Receipt({
        jobId: job.id, status: 'awaiting-review', prompt: 'boundary', promptSha256: sha256('boundary'),
        baselineWorkflowSha256: productionBaseline.workflowSha256, invocationWorkflowSha256: sha256(JSON.stringify(workflow)),
        topologySha256: productionBaseline.topologySha256, resolution: { delivery: job.delivery },
        output: { path: outsideSource, sha256: sha256(source), bytes: source.length },
      });
      await expect(prepareKrea2Landscape(receipt, job, { artifactRoot: media, stagingRoot: staging, productionBaseline, baselineWorkflowPath: baselinePath, ffmpegPath: 'ffmpeg' })).rejects.toThrow(/escaped .*staging media boundary/i);

      const safeSource = join(media, 'source.png');
      await writeFile(safeSource, source);
      const linkedDelivery = join(staging, 'delivery');
      await symlink(outside, linkedDelivery, 'junction');
      const safeReceipt = { ...receipt, output: { ...receipt.output, path: safeSource } };
      await expect(prepareKrea2Landscape(safeReceipt, job, { artifactRoot: media, stagingRoot: staging, productionBaseline, baselineWorkflowPath: baselinePath, ffmpegPath: 'ffmpeg' })).rejects.toThrow(/escaped .*staging media boundary/i);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('binds the Krea2 review command to the same verified baseline required by candidate validation', async () => {
    const script = await readFile(`${process.cwd()}/scripts/review-krea2-images.mjs`, 'utf8');
    expect(script).toContain('validateKrea2ProductionBaseline');
    expect(script).toContain('await validateKrea2CandidateBindings(await loadKrea2Receipt(id), job, productionBaseline)');
    expect(script).toContain("const decision = required('--decision')");
    expect(script).toContain("decision === 'rejected' ? await readRejectReasons(required('--reject-reasons'))");
  });

  it('binds corrected live evidence and receipts to the production baseline workflow and topology contract', async () => {
    const contract = JSON.parse(await readFile(productionBaselineContractPath, 'utf8'));
    const expected = contract.productionBaseline;
    const workflowBytes = await readFile(productionWorkflowPath);
    const workflow = JSON.parse(workflowBytes.toString('utf8'));
    const validEvidence = {
      verified: true,
      workflow: { sha256: sha256(workflowBytes) },
      runtime: { topologySha256: workflowTopologySha256(workflow) },
    };

    expect(validEvidence).toMatchObject({
      workflow: { sha256: expected.workflowSha256 },
      runtime: { topologySha256: expected.topologySha256 },
    });
    expect(validateKrea2ProductionBaseline(validEvidence, expected)).toEqual(expected);
    expect(() => validateKrea2ProductionBaseline({ ...validEvidence, verified: false }, expected)).toThrow(/not verified/i);
    expect(() => validateKrea2ProductionBaseline({ verified: true }, expected)).toThrow(/workflow hash is not current/i);
    expect(() => validateKrea2ProductionBaseline({ ...validEvidence, workflow: { sha256: 'a'.repeat(64) } }, expected)).toThrow(/workflow hash is not current/i);
    expect(() => validateKrea2ProductionBaseline({ ...validEvidence, runtime: { topologySha256: 'b'.repeat(64) } }, expected)).toThrow(/topology is not current/i);
    expect(() => validateKrea2ProductionBaseline(validEvidence, { workflowSha256: 'not-a-hash', topologySha256: expected.topologySha256 })).toThrow(/contract is invalid/i);

    const job = { id: 'visual.image.bg.test', delivery: { format: 'jpg', width: 1280, height: 720 } };
    const receipt = makeKrea2Receipt({
      jobId: job.id, status: 'awaiting-review', prompt: 'no text', promptSha256: 'a'.repeat(64),
      baselineWorkflowSha256: 'c'.repeat(64), invocationWorkflowSha256: 'c'.repeat(64), topologySha256: expected.topologySha256,
      resolution: { delivery: job.delivery }, output: { sha256: 'e'.repeat(64), path: 'staging/source.png' },
    });
    expect(() => validateKrea2Candidate(receipt, job, expected)).toThrow(/verified production baseline/i);
  });

  it('rejects character generation from the text-only Krea2 baseline', async () => {
    const run = promisify(execFile);
    await expect(run(process.execPath, ['scripts/produce-krea2-assets.mjs', '--ids', 'visual.image.portrait.albina.normal'], {
      cwd: process.cwd(), timeout: 20_000,
    })).rejects.toThrow(/character production gate is (?:blocked|hybrid-canonical-certificate-pending)|baseline evidence does not match/i);
  });

  it('keeps the corrected baseline proof as a single-image, review-required staging gate', async () => {
    const script = await readFile(proofScriptPath, 'utf8');
    expect(script).toContain("purpose: 'corrected-krea2-six-lora-baseline-proof'");
    expect(script).toContain("status: 'awaiting-human-image-review'");
    expect(script).toContain('validateKrea2ProductionStyleChain(baseline)');
    expect(script).toContain('Corrected baseline proof expected one image');
    expect(script).not.toContain('krea2_identity_edit_v1_2.safetensors');
  });

  it('uploads unique reference inputs to the selected ComfyUI instance before canonical sampling', async () => {
    const script = await readFile(`${process.cwd()}/scripts/run-krea2-albina-canonical-sample.mjs`, 'utf8');
    expect(script).toContain('uploadKrea2Image');
    expect(script).toContain('sourceUpload.filename');
    expect(script).toContain('uploadedSha256');
    expect(script).not.toContain('copyFile(source');
    expect(script).not.toContain('D:/ComfyUI-aki/ComfyUI-aki-v2/ComfyUI-aki-v2/ComfyUI');
  });

  it('uses exactly one canonical identity input after the rejected dual-reference tile failure', async () => {
    const script = await readFile(`${process.cwd()}/scripts/run-krea2-albina-canonical-sample.mjs`, 'utf8');
    expect(script).toContain('subjectImage: sourceUpload.filename');
    expect(script).not.toContain('styleImage: styleUpload.filename');
    expect(script).toContain('dualReferenceGrounding: false');
    expect(script).toContain('rejectedPriorExperiment');
  });

  it('keeps a single-reference edit graph on the final six-LoRA model without hidden second-reference wiring', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const edit = buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'single-reference', subjectImage: 'subject.png',
    });
    const patch = Object.values(edit).find((node: any) => node.class_type === 'Krea2EditModelPatch') as any;
    const grounded = Object.values(edit).filter((node: any) => node.class_type === 'Krea2EditGroundedEncode') as any[];
    expect(patch.inputs.model).toEqual(terminalStyleModel(edit));
    expect(patch.inputs).not.toHaveProperty('source_latent_b');
    expect(patch.inputs).not.toHaveProperty('source_image_b');
    expect(grounded).toHaveLength(2);
    expect(grounded.every((node) => !Object.hasOwn(node.inputs, 'image_b'))).toBe(true);
  });

  it('can focus the existing canonical subject through an alpha identity mask without changing the six-LoRA chain', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const edit = buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'masked-anchor', subjectImage: 'subject.png',
      subjectCrop: { width: 588, height: 990, x: 0, y: 70 }, subjectReferenceMask: 'alpha',
    });
    const patch = Object.values(edit).find((node: any) => node.class_type === 'Krea2EditModelPatch') as any;
    const crop = Object.entries(edit).find(([, node]: any) => node.class_type === 'ImageCrop') as [string, any];
    const sourceMask = Object.entries(edit).find(([, node]: any) => node.class_type === 'LoadImageMask') as [string, any];
    const mask = Object.entries(edit).find(([, node]: any) => node.class_type === 'CropMask') as [string, any];
    expect(crop[1].inputs).toMatchObject({ width: 588, height: 990, x: 0, y: 70 });
    expect(sourceMask[1].inputs).toEqual({ image: 'subject.png', channel: 'alpha' });
    expect(mask[1].inputs).toEqual({ mask: [sourceMask[0], 0], width: 588, height: 990, x: 0, y: 70 });
    expect(patch.inputs.source_image).toEqual([crop[0], 0]);
    expect(patch.inputs.ref_boost_mask).toEqual([mask[0], 0]);
    expect(patch.inputs.model).toEqual(terminalStyleModel(edit));
    expect(validateKrea2ProductionStyleChain(edit)).toHaveLength(6);
  });

  it('attaches only the local Krea2 depth control path after the terminal six-LoRA model', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const edit = buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'controlled-anchor', subjectImage: 'subject.png',
      subjectCrop: { width: 588, height: 882, x: 0, y: 70 }, krea2Control: { kind: 'depth', strength: 1 },
    });
    const loader = Object.entries(edit).find(([, node]: any) => node.class_type === 'Krea2ControlLoRALoader') as [string, any];
    const depth = Object.entries(edit).find(([, node]: any) => node.class_type === 'DepthAnythingV2Preprocessor') as [string, any];
    const encoder = Object.entries(edit).find(([, node]: any) => node.class_type === 'Krea2ControlImageEncode') as [string, any];
    const apply = Object.entries(edit).find(([, node]: any) => node.class_type === 'Krea2ControlApply') as [string, any];
    const patch = Object.values(edit).find((node: any) => node.class_type === 'Krea2EditModelPatch') as any;
    expect(loader[1].inputs).toEqual({ model: terminalStyleModel(edit), lora_name: 'depth-control-lora.safetensors', strength: 1 });
    const cropped = Object.entries(edit).find(([, node]: any) => node.class_type === 'ImageCrop') as [string, any];
    expect(depth[1].inputs).toEqual({ image: [cropped[0], 0], ckpt_name: 'depth_anything_v2_vitl.pth', resolution: 512 });
    expect(encoder[1].inputs).toMatchObject({ control_image: [depth[0], 0], latent: ['138', 0], channel_mode: 'grayscale' });
    expect(apply[1].inputs).toEqual({ model: [loader[0], 0], control_latent: [encoder[0], 0] });
    expect(patch.inputs.model).toEqual([apply[0], 0]);
    expect(validateKrea2ProductionStyleChain(edit)).toHaveLength(6);
  });

  it('can composite an RGBA canonical source over a neutral background before identity encoding', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const edit = buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'composite-anchor', subjectImage: 'subject.png',
      subjectCompositeBackground: { width: 588, height: 1766, color: 0xf1f2f0 }, subjectCrop: { width: 588, height: 882, x: 0, y: 70 },
    });
    const alpha = Object.entries(edit).find(([, node]: any) => node.class_type === 'LoadImageMask') as [string, any];
    const subject = Object.entries(edit).find(([, node]: any) => node.class_type === 'LoadImage' && node.inputs.image === 'subject.png') as [string, any];
    const background = Object.entries(edit).find(([, node]: any) => node.class_type === 'EmptyImage') as [string, any];
    const composite = Object.entries(edit).find(([, node]: any) => node.class_type === 'ImageCompositeMasked') as [string, any];
    const crop = Object.entries(edit).find(([, node]: any) => node.class_type === 'ImageCrop') as [string, any];
    const patch = Object.values(edit).find((node: any) => node.class_type === 'Krea2EditModelPatch') as any;
    expect(alpha[1].inputs).toEqual({ image: 'subject.png', channel: 'alpha' });
    expect(background[1].inputs).toEqual({ width: 588, height: 1766, batch_size: 1, color: 0xf1f2f0 });
    expect(composite[1].inputs).toEqual({ destination: [background[0], 0], source: [subject[0], 0], x: 0, y: 0, resize_source: false, mask: [alpha[0], 0] });
    expect(crop[1].inputs.image).toEqual([composite[0], 0]);
    expect(patch.inputs.source_image).toEqual([crop[0], 0]);
    expect(validateKrea2ProductionStyleChain(edit)).toHaveLength(6);
  });

  it('allows only the audited identity extension after the intact six-LoRA style chain', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const edit = buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'identity-anchor', subjectImage: 'subject.png',
      postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
    });
    const extension = Object.entries(edit).find(([, node]: any) => node.class_type === 'LoraLoaderModelOnly' && node.inputs.lora_name === 'krea2_identity_edit_v1_2.safetensors') as [string, any];
    const patch = Object.values(edit).find((node: any) => node.class_type === 'Krea2EditModelPatch') as any;
    expect(extension[1].inputs).toEqual({ model: terminalStyleModel(source), lora_name: 'krea2_identity_edit_v1_2.safetensors', strength_model: 1 });
    expect(patch.inputs.model).toEqual([extension[0], 0]);
    expect(validateKrea2ProductionStyleChain(edit)).toHaveLength(6);
    expect(() => buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'invalid-extension', subjectImage: 'subject.png',
      postStyleIdentityEdit: { name: 'other.safetensors', strength: 1 } as any,
    })).toThrow(/identity-edit extension/i);
  });

  it('keeps the Turbo canonical probe isolated while retaining the complete Krea2 production style chain', async () => {
    const script = await readFile(`${process.cwd()}/scripts/run-krea2-albina-turbo-canonical-probe.mjs`, 'utf8');
    expect(script).toContain("unet.inputs.unet_name = 'krea2_turbo_fp8_scaled.safetensors'");
    expect(script).toContain("postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 }");
    expect(script).toContain("dualReferenceGrounding: false");
    expect(script).toContain("controlPath: false");
    expect(script).toContain("'style reference', 'dual reference', 'depth control', 'crop or reference mask', 'failed generated image as reference'");
    expect(script).not.toContain('subjectCrop:');
    expect(script).not.toContain('subjectReferenceMask:');
    expect(script).not.toContain('krea2Control:');
    expect(script).toContain("'This is a staging probe only.");
  });

  it('uses only the documented regional attention-bias path for the Turbo identity-mask probe', async () => {
    const script = await readFile(`${process.cwd()}/scripts/run-krea2-albina-turbo-regional-mask-probe.mjs`, 'utf8');
    expect(script).toContain("unet.inputs.unet_name = 'krea2_turbo_fp8_scaled.safetensors'");
    expect(script).toContain("subjectReferenceMask: 'regions'");
    expect(script).toContain('subjectReferenceRegions');
    expect(script).toContain('subjectReferenceBoost: 12');
    expect(script).toContain("postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 }");
    expect(script).toContain("refBoostMask: 'SolidMask + MaskComposite union of named identity regions; Krea2Edit attention bias only'");
    expect(script).not.toContain('styleImage:');
    expect(script).not.toContain('krea2Control:');
  });

  it('builds a bounded regional reference mask instead of boosting the whole character silhouette', async () => {
    const source = JSON.parse(await readFile(productionWorkflowPath, 'utf8'));
    const edit = buildKrea2ImageEditWorkflow(source, {
      prompt: 'canonical adult subject', seed: 7, filenamePrefix: 'regional-anchor', subjectImage: 'subject.png',
      subjectCrop: { width: 588, height: 882, x: 0, y: 70 }, subjectReferenceMask: 'regions',
      subjectReferenceRegions: [{ x: 110, y: 80, width: 360, height: 300 }, { x: 100, y: 500, width: 390, height: 300 }],
    });
    const solids = Object.entries(edit).filter(([, node]: any) => node.class_type === 'SolidMask') as Array<[string, any]>;
    const composites = Object.entries(edit).filter(([, node]: any) => node.class_type === 'MaskComposite') as Array<[string, any]>;
    const patch = Object.values(edit).find((node: any) => node.class_type === 'Krea2EditModelPatch') as any;
    expect(solids.map(([, node]) => node.inputs)).toEqual([
      { value: 0, width: 588, height: 882 }, { value: 1, width: 360, height: 300 }, { value: 1, width: 390, height: 300 },
    ]);
    expect(composites).toHaveLength(2);
    expect(composites[0]![1].inputs).toMatchObject({ x: 110, y: 80, operation: 'add' });
    expect(composites[1]![1].inputs).toMatchObject({ x: 100, y: 500, operation: 'add' });
    expect(patch.inputs.ref_boost_mask).toEqual([composites[1]![0], 0]);
    expect(validateKrea2ProductionStyleChain(edit)).toHaveLength(6);
  });

  it('requires hash-bound source evidence and glyph review for deterministic image text', async () => {
    const [proof, compose, review, roiVerifier] = await Promise.all([
      readFile(textProofScriptPath, 'utf8'), readFile(textComposeScriptPath, 'utf8'), readFile(textReviewScriptPath, 'utf8'), readFile(textRoiVerifierPath, 'utf8'),
    ]);
    expect(proof).toContain('buildKrea2TextOverlayWorkflow');
    expect(proof).toContain("status: 'awaiting-human-glyph-review'");
    expect(proof).toContain('String.fromCodePoint');
    expect(compose).toContain('source receipt output hash does not match source image');
    expect(compose).toContain('receipt?.workflowSha256');
    expect(compose).toContain('sourceReceipt, source');
    expect(compose).toContain("status: 'awaiting-human-glyph-review'");
    expect(compose).toContain('deterministic-comfyui-text-mask');
    expect(compose).toContain('loadVerifiedKrea2Baseline');
    expect(compose).toContain('verifyPixelIsolation');
    expect(compose).toContain('outsideRoiChangedPixelCount');
    expect(compose).not.toMatch(/[\u4e00-\u9fff]/u);
    expect(review).toContain('Output image hash no longer matches its receipt');
    expect(review).toContain('no passing ROI pixel-isolation evidence');
    expect(review).toContain("const required = ['receipt', 'reviewer', 'result', 'evidence', 'review-width', 'review-height']");
    expect(review).toContain('direct-original-resolution-glyph-by-glyph');
    expect(review).not.toContain("args.evidence ??");
    expect(review).toContain("promotion: args.result === 'approved' ? 'eligible-for-explicit-promotion-only' : 'blocked'");
    expect(roiVerifier).toContain('ImageChops.difference');
    expect(roiVerifier).toContain('outsideRoiChangedPixelCount');
  });
});
