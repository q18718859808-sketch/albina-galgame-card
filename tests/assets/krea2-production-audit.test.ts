import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { auditReceipt, validateKrea2ProductionAuditWorkflow } from '../../scripts/audit-krea2-production.mjs';

describe('Krea2 production receipt audit', () => {
  const styleChain = [
    ['z3zz4-k2-4_c1-st5000.safetensors', 0.55], ['Krea2Rella_c1-st8000.safetensors', 0.65],
    ['onineko_k2_v1.safetensors', 0.45], ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
    ['masterpieces-v51.safetensors', 0.45], ['ichika-k2_c1-st5000.safetensors', 0.35],
  ];
  const productionWorkflow = () => Object.fromEntries([
    ...styleChain.map(([lora_name, strength_model], index) => [String(index + 1), {
      class_type: 'LoraLoaderModelOnly', inputs: { model: index ? [String(index), 0] : ['base', 0], lora_name, strength_model },
    }]),
    ['7', { class_type: 'VAEEncode', inputs: { pixels: ['image', 0], vae: ['vae', 0] } }],
    ['8', { class_type: 'SamplerCustomAdvanced', inputs: { latent_image: ['7', 0] } }],
  ]);

  it('requires the six-LoRA chain, VAEEncode sampler latent, and non-zeroed conditioning', () => {
    expect(validateKrea2ProductionAuditWorkflow(productionWorkflow())).toBe(true);

    const wrongLatent = productionWorkflow();
    wrongLatent['8'].inputs.latent_image = ['missing', 0];
    expect(() => validateKrea2ProductionAuditWorkflow(wrongLatent)).toThrow('latent_image must be connected to VAEEncode');

    const zeroedConditioning = productionWorkflow();
    zeroedConditioning['9'] = { class_type: 'ConditioningZeroOut', inputs: {} };
    expect(() => validateKrea2ProductionAuditWorkflow(zeroedConditioning)).toThrow('forbids ConditioningZeroOut');

    const seventhLora = productionWorkflow();
    seventhLora['9'] = { class_type: 'LoraLoaderModelOnly', inputs: { model: ['6', 0], lora_name: 'extra.safetensors', strength_model: 1 } };
    expect(() => validateKrea2ProductionAuditWorkflow(seventhLora)).toThrow('exact six-LoRA');
  });

  it('treats the flattened ComfyUI upload as a bound derivative of the canonical source', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-krea2-audit-upload-'));
    const source = join(root, 'source.png');
    const upload = join(root, 'upload.png');
    await writeFile(source, 'canonical-rgba');
    await writeFile(upload, 'flattened-rgb');
    const receiptPath = join(root, 'candidate.receipt.json');
    await writeFile(receiptPath, JSON.stringify({
      jobId: 'upload-binding', provider: 'comfyui-local-krea2', status: 'queued',
      references: { sentToModel: true, inputs: [{ role: 'canonical-latent-origin', sha256: 'a'.repeat(64), path: source }], uploadedCanonical: {
        sha256: 'b'.repeat(64), sourceSha256: 'a'.repeat(64), transform: 'flatten-alpha-over-neutral-field-34-34-38',
      } },
    }));
    const result = await auditReceipt(receiptPath);
    expect(result.issues.map(({ code }: { code: string }) => code)).not.toContain('uploaded-source-binding');
    expect(result.issues.map(({ code }: { code: string }) => code)).not.toContain('uploaded-transform');
  });
  it('fails closed when a receipt only declares the six-LoRA chain without invocation evidence', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-krea2-audit-'));
    const output = join(root, 'candidate.png');
    await writeFile(output, 'candidate');
    const receiptPath = join(root, 'candidate.receipt.json');
    await writeFile(receiptPath, JSON.stringify({
      jobId: 'candidate', provider: 'comfyui-local-krea2', status: 'completed',
      styleChain: [
        { name: 'z3zz4-k2-4_c1-st5000.safetensors', strength: 0.55 },
        { name: 'Krea2Rella_c1-st8000.safetensors', strength: 0.65 },
        { name: 'onineko_k2_v1.safetensors', strength: 0.45 },
        { name: 'meion_krea2_style_v7.0_c1-st4000.safetensors', strength: 0.45 },
        { name: 'masterpieces-v51.safetensors', strength: 0.45 },
        { name: 'ichika-k2_c1-st5000.safetensors', strength: 0.35 },
      ],
      references: { sentToModel: true, inputs: [{ role: 'canonical-latent-origin', sha256: 'a'.repeat(64), path: 'missing.png' }] },
      workflow: { path: 'missing-baseline.json', invocationPath: 'missing-workflow.json' },
      output: { path: output, sha256: 'b'.repeat(64), finalSha256: 'b'.repeat(64), bytes: 9 },
    }));
    const result = await auditReceipt(receiptPath);
    expect(result.pass).toBe(false);
    expect(result.issues.map(({ code }: { code: string }) => code)).toEqual(expect.arrayContaining([
      'prompt-hash', 'invocation-missing', 'baseline-missing', 'output-hash', 'execution-evidence', 'direct-review-missing',
    ]));
  });

  it('does not treat a history hash as sufficient when the stored history uses another invocation', async () => {
    const root = await mkdtemp(join(tmpdir(), 'albina-krea2-audit-history-'));
    const output = join(root, 'candidate.png');
    await writeFile(output, 'candidate');
    const workflow = { '1': { class_type: 'SaveImage', inputs: { images: ['2', 0] } } };
    const baseline = join(root, 'baseline.json');
    const invocation = join(root, 'invocation.json');
    await writeFile(baseline, JSON.stringify(workflow));
    await writeFile(invocation, JSON.stringify(workflow));
    const receiptPath = join(root, 'candidate.receipt.json');
    await mkdir(join(root, 'nested'), { recursive: true });
    await writeFile(receiptPath, JSON.stringify({
      jobId: 'candidate-history', provider: 'comfyui-local-krea2', status: 'completed',
      prompt: 'prompt', promptSha256: '0'.repeat(64),
      styleChain: [], references: { sentToModel: true, inputs: [] },
      workflow: { path: baseline, baselineSha256: '0'.repeat(64), invocationPath: invocation, invocationSha256: '0'.repeat(64), invocationFileSha256: '0'.repeat(64), topologySha256: '0'.repeat(64) },
      execution: { promptId: 'prompt-id', historySha256: '0'.repeat(64), history: { prompt: [1, 'prompt-id', { different: true }], outputs: {} }, outputBinding: { filename: 'other.png' } },
      output: { path: output, sha256: '0'.repeat(64), finalSha256: '0'.repeat(64), bytes: 9 },
    }));
    const result = await auditReceipt(receiptPath);
    expect(result.issues.map(({ code }: { code: string }) => code)).toEqual(expect.arrayContaining(['execution-history-hash', 'execution-invocation-binding', 'execution-output-binding']));
  });

  it('keeps direct review separate from release promotion', async () => {
    const script = await (await import('node:fs/promises')).readFile('scripts/record-restyle-review.mjs', 'utf8');
    expect(script).toContain('promotionAllowed: false');
    expect(script).toContain("releaseDecision = 'pending-explicit-release-policy'");
    expect(script).not.toContain('promotionAllowed: status === \'accepted\'');
  });
});
