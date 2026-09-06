import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  buildKrea2RegionalCompositeWorkflow,
  getKrea2StyleLoraContract,
  loadVerifiedKrea2Baseline,
  validateKrea2ProductionStyleChain,
} from '../../scripts/lib/krea2-comfyui.mjs';
import { makeWorkflow, parseArgs, stageGeometry, stages } from '../../scripts/run-krea2-albina-staged-regional.mjs';

const scriptPath = resolve(process.cwd(), 'scripts/run-krea2-albina-staged-regional.mjs');

describe('Albina staged regional Krea2 workflow', () => {
  it('declares exactly four sequential stages and forbids batch execution', async () => {
    const source = await readFile(scriptPath, 'utf8');
    expect(source).toContain("'01-canonical-preserve-base'");
    expect(source).toContain("'02-face-eye-region'");
    expect(source).toContain("'03-clothing-mechanical-region'");
    expect(source).toContain("'04-local-repair-mask-composite'");
    expect(source).toContain('single-canonical only; batch arguments are forbidden');
    expect(source).toContain('continuous multi-stage execution is forbidden');
    expect(source).toContain("promotion: { allowed: false }");
  });

  it('requires one explicit stage for GPU execution', () => {
    expect(() => parseArgs(['--execute'])).toThrow(/exactly one --stage/i);
    expect(parseArgs(['--execute', '--stage=2'])).toMatchObject({ execute: true, stage: 2 });
    expect(() => parseArgs(['--execute', '--stage=5'])).toThrow(/between 1 and 4/i);
  });

  it('keeps the locked six-LoRA order and weights in every generative stage', async () => {
    const { workflow: baseline } = await loadVerifiedKrea2Baseline();
    const contract = getKrea2StyleLoraContract();
    expect(stages).toHaveLength(4);
    const preserve = stages[0]!;
    expect(preserve.preserveOnly).toBe(true);
    expect(() => makeWorkflow(baseline, preserve, 'albina-stage-input.png', 4, 'test-stage-0', 'albina-canonical.png')).toThrow(/must not invoke ComfyUI/i);
    for (const [index, stage] of stages.slice(1).entries()) {
      const workflow = makeWorkflow(baseline, stage, 'albina-stage-input.png', 4 + index, `test-stage-${index}`, 'albina-canonical.png');
      expect(validateKrea2ProductionStyleChain(workflow)).toEqual(contract.map(({ name, strength }) => ({ name, strength })));
      expect(Object.values(workflow).filter((node: any) => node.class_type === 'SaveImage')).toHaveLength(1);
      expect(Object.values(workflow).filter((node: any) => node.class_type === 'ImageCompositeMasked')).toHaveLength(stage.mask ? 1 : 0);
      if (stage.mask) expect(JSON.stringify(workflow)).toContain('albina-canonical.png');
    }
    expect(stageGeometry).toEqual({ width: 768, height: 1368 });
  });

  it('builds an explicit regional mask composite over the repaired image', () => {
    const workflow = buildKrea2RegionalCompositeWorkflow({
      repairWorkflow: { '1': { class_type: 'SaveImage', inputs: { images: ['7', 0], filename_prefix: 'old' } } },
      repairImage: ['7', 0], baseImage: 'stage-03.png', x: 0, y: 0,
      maskDimensions: { width: 588, height: 882 },
      maskRegions: [
        { label: 'face-eyes', x: 100, y: 80, width: 380, height: 280 },
        { label: 'mechanical-forearm', x: 345, y: 495, width: 215, height: 350 },
      ], filenamePrefix: 'stage-04',
    });
    const nodes = Object.values(workflow);
    expect(nodes.filter((node: any) => node.class_type === 'SolidMask')).toHaveLength(3);
    expect(nodes.filter((node: any) => node.class_type === 'MaskComposite')).toHaveLength(2);
    expect(nodes.filter((node: any) => node.class_type === 'ImageCompositeMasked')).toHaveLength(1);
    expect(nodes.filter((node: any) => node.class_type === 'SaveImage')).toHaveLength(1);
    expect(JSON.stringify(workflow)).toContain('stage-03.png');
  });

  it('rejects missing or out-of-bounds regional masks', () => {
    expect(() => buildKrea2RegionalCompositeWorkflow({
      repairImage: ['1', 0], baseImage: 'stage.png', x: 0, y: 0,
      maskDimensions: { width: 100, height: 100 }, maskRegions: [], filenamePrefix: 'x',
    })).toThrow(/explicit mask regions/i);
    expect(() => buildKrea2RegionalCompositeWorkflow({
      repairImage: ['1', 0], baseImage: 'stage.png', x: 0, y: 0,
      maskDimensions: { width: 100, height: 100 }, maskRegions: [{ x: 90, y: 0, width: 20, height: 20 }], filenamePrefix: 'x',
    })).toThrow(/outside/i);
  });
});
