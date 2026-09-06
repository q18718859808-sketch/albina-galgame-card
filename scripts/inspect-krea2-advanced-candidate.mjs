#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { buildKrea2AdvancedWorkflowDescription, detectKrea2AdvancedReadiness } from './lib/krea2-advanced-candidate.mjs';

const contract = JSON.parse(await readFile(new URL('../content/media-production/krea2-advanced-adapter-v1.json', import.meta.url), 'utf8'));
const readiness = detectKrea2AdvancedReadiness({
  diffusersVersion: contract.currentEnvironment.diffusers.version,
  hasKrea2Pipeline: contract.currentEnvironment.diffusers.hasKrea2Pipeline,
  transformersVersion: contract.currentEnvironment.transformers.version,
  hasQwen3VLModel: contract.currentEnvironment.transformers.hasQwen3VLModel,
  candidateNodePackPresent: contract.currentEnvironment.candidateNodePackPresent,
  weights: { raw: false, turbo: false },
});

console.log(JSON.stringify(buildKrea2AdvancedWorkflowDescription({ readiness }), null, 2));
