import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, realpathSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve } from 'node:path';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '../..');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-v1');
const hashPattern = /^[a-f0-9]{64}$/u;
const requiredStyleLoras = [
  ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
  ['Krea2Rella_c1-st8000.safetensors', 0.65],
  ['onineko_k2_v1.safetensors', 0.45],
  ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
  ['masterpieces-v51.safetensors', 0.45],
  ['ichika-k2_c1-st5000.safetensors', 0.35],
];

export function validateKrea2ProductionBaseline(evidence, expected) {
  if (!evidence || evidence.verified !== true) throw new Error('Krea2 production baseline evidence is not verified');
  if (!expected || !hashPattern.test(expected.workflowSha256) || !hashPattern.test(expected.topologySha256)) throw new Error('Krea2 production baseline contract is invalid');
  if (evidence.workflow?.sha256 !== expected.workflowSha256) throw new Error('Krea2 production baseline workflow hash is not current');
  if (evidence.runtime?.topologySha256 !== expected.topologySha256) throw new Error('Krea2 production baseline topology is not current');
  return expected;
}

export function validateKrea2CharacterGateCertificate(certificate) {
  if (certificate?.schemaVersion !== 1 || certificate.status !== 'approved') throw new Error('Krea2 character gate certificate is not approved');
  for (const name of ['canonicalSourceSha256', 'canonicalOutputSha256', 'workflowSha256', 'topologySha256']) {
    if (!hashPattern.test(certificate[name] ?? '')) throw new Error(`Krea2 character gate certificate ${name} is invalid`);
  }
  if (JSON.stringify(certificate.styleLoras) !== JSON.stringify(requiredStyleLoras)) throw new Error('Krea2 character gate certificate does not retain the exact six-LoRA production chain');
  if (certificate.identityEdit?.name !== 'krea2_identity_edit_v1_2.safetensors' || certificate.identityEdit.strength !== 1) {
    throw new Error('Krea2 character gate certificate identity-edit configuration is invalid');
  }
  if (!Array.isArray(certificate.allowedScope) || !certificate.allowedScope.includes('single character asset per invocation')) {
    throw new Error('Krea2 character gate certificate does not enforce single-asset production');
  }
  if (!certificate.directImageReview?.artifactSha256 || certificate.directImageReview.artifactSha256 !== certificate.canonicalOutputSha256
    || typeof certificate.directImageReview.reviewer !== 'string' || certificate.directImageReview.reviewer.trim().length < 3
    || !Array.isArray(certificate.directImageReview.anchors) || certificate.directImageReview.anchors.length !== 6) {
    throw new Error('Krea2 character gate certificate direct image review is incomplete');
  }
  const paired = loadAndValidateGeminiPairedReview(certificate.externalPairedReview);
  if (paired.candidate.sha256 !== certificate.canonicalOutputSha256 || paired.reference.sha256 !== certificate.canonicalSourceSha256) {
    throw new Error('Krea2 character gate certificate paired review hashes do not match the canonical gate');
  }
  validateCharacterBaselineBinding(certificate);
  return certificate;
}

export function assertKrea2CharacterProductionGate(gate, job) {
  if (!job || !['characters', 'cg'].includes(job.category)) return;
  if (gate?.status !== 'approved') {
    throw new Error(`Krea2 character production gate is ${gate?.status ?? 'missing'}; ${gate?.reason ?? 'a verified canonical identity certificate is required'}`);
  }
  validateKrea2CharacterGateCertificate(gate.certificate);
}

export function krea2ReceiptPath(jobId, root = stagingRoot) {
  return resolve(root, `${safe(jobId)}.json`);
}

export function krea2ReviewPath(jobId, root = stagingRoot) {
  return resolve(root, 'reviews', `${safe(jobId)}.json`);
}

export function krea2DeliveryPath(jobId, extension, root = stagingRoot) {
  return resolve(root, 'delivery', `${safe(jobId)}.${extension}`);
}

export function validateKrea2Candidate(receipt, job, productionBaseline) {
  if (receipt?.provider !== 'comfyui-local-krea2' || receipt?.model !== 'redcraft23FP8_30Krea2.safetensors') throw new Error('Krea2 provider identity is invalid');
  if (receipt.status !== 'awaiting-review' || receipt.jobId !== job.id || !hashPattern.test(receipt.output?.sha256 ?? '')) throw new Error(`Krea2 artifact is not reviewable: ${job.id}`);
  if (receipt.resolution?.delivery?.format !== job.delivery.format || receipt.resolution.delivery.width !== job.delivery.width || receipt.resolution.delivery.height !== job.delivery.height) throw new Error(`Krea2 delivery contract mismatch: ${job.id}`);
  if (receipt.references?.sentToModel !== false) throw new Error(`Krea2 reference-input contract mismatch: ${job.id}`);
  if (!productionBaseline || receipt.workflow?.baselineSha256 !== productionBaseline.workflowSha256 || receipt.workflow?.topologySha256 !== productionBaseline.topologySha256) throw new Error(`Krea2 artifact does not use the verified production baseline: ${job.id}`);
  return receipt;
}

export async function validateKrea2CandidateBindings(receipt, job, productionBaseline, options = {}) {
  validateKrea2Candidate(receipt, job, productionBaseline);
  if (!hashPattern.test(receipt.promptSha256 ?? '') || hash(receipt.prompt ?? '') !== receipt.promptSha256) {
    throw new Error(`Krea2 prompt hash mismatch: ${job.id}`);
  }

  const outputPath = resolveBoundedArtifactPath(receipt.output?.path, options.artifactRoot ?? resolve(projectRoot, 'staging/media'));
  const output = await readRequiredFile(outputPath, `Krea2 output is unavailable: ${job.id}`);
  if (hash(output) !== receipt.output.sha256 || output.length !== receipt.output.bytes) {
    throw new Error(`Krea2 output hash or size mismatch: ${job.id}`);
  }

  const baselinePath = resolve(options.baselineWorkflowPath ?? receipt.workflow?.path ?? resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline.api.json'));
  const baselineBytes = await readRequiredFile(baselinePath, `Krea2 baseline workflow is unavailable: ${job.id}`);
  if (hash(baselineBytes) !== receipt.workflow.baselineSha256 || hash(baselineBytes) !== productionBaseline.workflowSha256) {
    throw new Error(`Krea2 baseline workflow hash mismatch: ${job.id}`);
  }
  if (receipt.workflow.evidencePath !== undefined || receipt.workflow.evidenceSha256 !== undefined) {
    if (typeof receipt.workflow.evidencePath !== 'string' || !hashPattern.test(receipt.workflow.evidenceSha256 ?? '')) {
      throw new Error(`Krea2 baseline evidence binding is incomplete: ${job.id}`);
    }
    const evidencePath = resolve(receipt.workflow.evidencePath);
    const evidenceBytes = await readRequiredFile(evidencePath, `Krea2 baseline evidence is unavailable: ${job.id}`);
    if (hash(evidenceBytes) !== receipt.workflow.evidenceSha256) {
      throw new Error(`Krea2 baseline evidence hash mismatch: ${job.id}`);
    }
  }
  const baselineWorkflow = parseJson(baselineBytes, `Krea2 baseline workflow is invalid JSON: ${job.id}`);
  if (!hashesMatchWorkflowTopology(baselineWorkflow, productionBaseline.topologySha256)) {
    throw new Error(`Krea2 baseline topology hash mismatch: ${job.id}`);
  }

  const invocationWorkflow = receipt.output?.history?.prompt?.[2];
  if (!invocationWorkflow || typeof invocationWorkflow !== 'object' || Array.isArray(invocationWorkflow)) {
    throw new Error(`Krea2 invocation workflow evidence is missing: ${job.id}`);
  }
  if (hash(stableJson(invocationWorkflow)) !== receipt.workflow.invocationSha256
    && hash(JSON.stringify(invocationWorkflow)) !== receipt.workflow.invocationSha256) {
    throw new Error(`Krea2 invocation workflow hash mismatch: ${job.id}`);
  }
  const invocationTopologySha256 = hashesMatchWorkflowTopology(invocationWorkflow, receipt.workflow.topologySha256)
    ? receipt.workflow.topologySha256
    : hash(stableJson(krea2WorkflowTopology(invocationWorkflow)));
  if (invocationTopologySha256 !== receipt.workflow.topologySha256 || invocationTopologySha256 !== productionBaseline.topologySha256) {
    throw new Error(`Krea2 invocation topology hash mismatch: ${job.id}`);
  }
  return receipt;
}

export function validateKrea2Review(review, receipt, criteria) {
  if (!review || review.version !== 1 || review.status !== 'approved' || review.jobId !== receipt.jobId) throw new Error(`Krea2 review is not approved: ${receipt.jobId}`);
  if (review.artifactSha256 !== receipt.output.sha256 || review.receiptSha256 !== krea2ReceiptSha256(receipt) || typeof review.reviewer !== 'string' || review.reviewer.trim().length < 3 || Number.isNaN(Date.parse(review.reviewedAt))) throw new Error(`Krea2 review identity is invalid: ${receipt.jobId}`);
  if (!Array.isArray(review.criteria) || review.criteria.length !== criteria.length) throw new Error(`Krea2 review criteria are incomplete: ${receipt.jobId}`);
  const expected = new Set(criteria);
  for (const item of review.criteria) {
    if (!expected.delete(item?.criterion) || item.status !== 'passed' || typeof item.note !== 'string' || !item.note.trim() || typeof item.evidence !== 'string' || !item.evidence.trim()) throw new Error(`Krea2 review evidence is invalid: ${receipt.jobId}`);
  }
  if (expected.size !== 0) throw new Error(`Krea2 review criteria are incomplete: ${receipt.jobId}`);
  return review;
}

export async function validateKrea2ReviewBindings(review, receipt, criteria, options = {}) {
  validateKrea2Review(review, receipt, criteria);
  await validateKrea2CandidateBindings(receipt, options.job, options.productionBaseline, options);
  const outputPath = resolveBoundedArtifactPath(receipt.output.path, options.artifactRoot ?? resolve(projectRoot, 'staging/media'));
  const output = await readRequiredFile(outputPath, `Krea2 reviewed artifact is unavailable: ${receipt.jobId}`);
  if (hash(output) !== review.artifactSha256) throw new Error(`Krea2 review artifact hash mismatch: ${receipt.jobId}`);
  if (options.reviewPath) {
    const expectedPath = krea2ReviewPath(receipt.jobId, options.stagingRoot);
    if (resolve(options.reviewPath) !== expectedPath) throw new Error(`Krea2 review path mismatch: ${receipt.jobId}`);
    const reviewBytes = await readRequiredFile(expectedPath, `Krea2 review file is unavailable: ${receipt.jobId}`);
    const persisted = parseJson(reviewBytes, `Krea2 review file is invalid JSON: ${receipt.jobId}`);
    if (canonicalJson(persisted) !== canonicalJson(review)) throw new Error(`Krea2 review file content mismatch: ${receipt.jobId}`);
  }
  return review;
}

export function buildKrea2Review(receipt, reviewer, criteriaEvidence, decision, options = {}) {
  if (!['approved', 'rejected'].includes(decision)) throw new Error('Krea2 review requires an explicit approved or rejected decision');
  if (!Array.isArray(criteriaEvidence) || criteriaEvidence.length === 0 || typeof reviewer !== 'string' || reviewer.trim().length < 3) throw new Error('Krea2 review requires a named reviewer and criterion evidence');
  for (const item of criteriaEvidence) {
    if (typeof item?.criterion !== 'string' || !item.criterion.trim() || typeof item.note !== 'string' || !item.note.trim() || typeof item.evidence !== 'string' || !item.evidence.trim()) {
      throw new Error('Krea2 review criterion evidence is invalid');
    }
  }
  const rejectReasons = options.rejectReasons;
  if (decision === 'rejected' && (!Array.isArray(rejectReasons) || rejectReasons.length === 0 || rejectReasons.some((reason) => typeof reason !== 'string' || !reason.trim()))) {
    throw new Error('Krea2 rejection requires at least one reject reason');
  }
  return {
    version: 1, provider: receipt.provider, jobId: receipt.jobId, artifactSha256: receipt.output.sha256,
    receiptSha256: krea2ReceiptSha256(receipt),
    status: decision, reviewer: reviewer.trim(), reviewedAt: options.reviewedAt ?? new Date().toISOString(),
    criteria: criteriaEvidence.map((item) => ({ criterion: item.criterion.trim(), status: decision === 'approved' ? 'passed' : 'reviewed', note: item.note.trim(), evidence: item.evidence.trim() })),
    ...(decision === 'rejected' ? { rejectReasons: rejectReasons.map((reason) => reason.trim()) } : {}),
  };
}

export function krea2ReceiptSha256(receipt) { return hash(canonicalJson(receipt)); }

export async function prepareKrea2Landscape(receipt, job, options = {}) {
  validateKrea2Candidate(receipt, job, options.productionBaseline);
  const artifactRoot = options.artifactRoot ?? resolve(projectRoot, 'staging/media');
  const source = resolveBoundedArtifactPath(receipt.output.path, artifactRoot);
  const bytes = await readFile(source);
  if (hash(bytes) !== receipt.output.sha256) throw new Error(`Krea2 source hash mismatch: ${job.id}`);
  const targetRoot = options.stagingRoot ?? stagingRoot;
  const target = resolveBoundedArtifactPath(krea2DeliveryPath(job.id, job.delivery.format, targetRoot), targetRoot);
  const filter = `scale=${job.delivery.width}:${job.delivery.height}:force_original_aspect_ratio=increase,crop=${job.delivery.width}:${job.delivery.height}`;
  await mkdir(dirname(target), { recursive: true });
  await runFile(options.ffmpegPath ?? 'ffmpeg', ['-v', 'error', '-y', '-i', source, '-vf', filter, '-frames:v', '1', '-q:v', '2', target]);
  const output = await readFile(target);
  return { path: relative(projectRoot, target).replaceAll('\\', '/'), bytes: output.length, sha256: hash(output), filename: basename(target), delivery: job.delivery };
}

export async function writeKrea2Review(jobId, review, options = {}) {
  const path = krea2ReviewPath(jobId, options.stagingRoot);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(review, null, 2)}\n`, 'utf8');
  return relative(projectRoot, path).replaceAll('\\', '/');
}

export async function loadKrea2Receipt(jobId, options = {}) {
  return JSON.parse((await readFile(krea2ReceiptPath(jobId, options.stagingRoot), 'utf8')).replace(/^\uFEFF/, ''));
}

export async function loadKrea2Review(jobId, options = {}) {
  return JSON.parse((await readFile(krea2ReviewPath(jobId, options.stagingRoot), 'utf8')).replace(/^\uFEFF/, ''));
}

function hash(value) { return createHash('sha256').update(value).digest('hex'); }
function safe(value) { return value.replaceAll(/[^a-z0-9._-]/giu, '-'); }

function canonicalJson(value) { return JSON.stringify(value); }

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function hashesMatchWorkflowTopology(workflow, expected) {
  return hash(stableJson(krea2WorkflowTopology(workflow))) === expected
    || hash(JSON.stringify(krea2WorkflowTopology(workflow))) === expected;
}

function krea2WorkflowTopology(workflow) {
  return Object.fromEntries(Object.entries(workflow).map(([id, node]) => [id, {
    class_type: node.class_type,
    inputs: Object.fromEntries(Object.entries(node.inputs ?? {}).filter(([key]) => ![
      'text', 'noise_seed', 'filename_prefix', 'aspect_ratio', 'megapixels',
    ].includes(key))),
  }]));
}

function parseJson(bytes, message) {
  try { return JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/u, '')); }
  catch { throw new Error(message); }
}

async function readRequiredFile(path, message) {
  try { return await readFile(path); }
  catch { throw new Error(message); }
}

function resolveBoundedArtifactPath(value, root) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Krea2 artifact path is missing');
  const absolute = isAbsolute(value) ? resolve(value) : resolve(projectRoot, value);
  const boundary = realpathSync(resolve(root));
  const candidate = realpathForBoundaryCheck(absolute);
  const local = relative(boundary, candidate).replaceAll('\\', '/');
  if (!local || local === '..' || local.startsWith('../') || isAbsolute(local)) throw new Error('Krea2 artifact path escaped the staging media boundary');
  return absolute;
}

function realpathForBoundaryCheck(path) {
  try {
    return realpathSync.native(path);
  } catch {
    const parent = dirname(path);
    if (parent === path) throw new Error('Krea2 artifact path does not have a resolvable parent');
    return resolve(realpathForBoundaryCheck(parent), basename(path));
  }
}

function loadAndValidateGeminiPairedReview(binding) {
  if (!binding || typeof binding.path !== 'string' || !hashPattern.test(binding.sha256 ?? '')) throw new Error('Krea2 character gate certificate paired review binding is incomplete');
  if (binding.path.includes('\\') || binding.path.includes(':') || binding.path.startsWith('/')) throw new Error('Krea2 character gate certificate paired review path is invalid');
  const path = resolve(projectRoot, binding.path);
  const local = relative(projectRoot, path).replaceAll('\\', '/');
  if (!local || local.startsWith('../') || !local.startsWith('staging/media/')) throw new Error('Krea2 character gate certificate paired review escaped staging media');
  let bytes;
  try { bytes = readFileSync(path); }
  catch { throw new Error('Krea2 character gate certificate paired review is unavailable'); }
  if (hash(bytes) !== binding.sha256) throw new Error('Krea2 character gate certificate paired review hash is invalid');
  const review = JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/u, ''));
  const isPass = /^\s*(?:\*\*)?DECISION(?:\*\*)?\s*:?\s*(?:\r?\n\s*)?(?:\*\*)?PASS(?:\*\*)?\b/iu.test(review.verdict ?? '');
  if (review?.schemaVersion !== 1 || review.status !== 'external-review-complete' || review.reviewer !== 'gemini-visual-review' || review.gateway !== 'https://gcli.ggchan.dev/v1' || review.model !== 'gemini-3-flash-preview' || !hashPattern.test(review.reference?.sha256 ?? '') || !hashPattern.test(review.candidate?.sha256 ?? '') || typeof review.prompt !== 'string' || !review.prompt.includes('DECISION (PASS or REJECT)') || Number.isNaN(Date.parse(review.reviewedAt)) || !isPass) throw new Error('Krea2 character gate certificate paired review record is invalid or not PASS');
  validatePairedImageBinding(review.reference, 'reference');
  validatePairedImageBinding(review.candidate, 'candidate');
  return review;
}

function validatePairedImageBinding(image, role) {
  if (typeof image?.path !== 'string') throw new Error(`Krea2 paired review ${role} image path is missing`);
  const path = resolveBoundedArtifactPath(image.path, resolve(projectRoot, 'staging/media'));
  let bytes;
  try { bytes = readFileSync(path); }
  catch { throw new Error(`Krea2 paired review ${role} image is unavailable`); }
  if (hash(bytes) !== image.sha256) throw new Error(`Krea2 paired review ${role} image hash is invalid`);
}

export { validatePairedImageBinding };

function validateCharacterBaselineBinding(certificate) {
  const baselinePath = resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline.api.json');
  let bytes;
  try { bytes = readFileSync(baselinePath); }
  catch { throw new Error('Krea2 character gate baseline workflow is unavailable'); }
  if (hash(bytes) !== certificate.workflowSha256) throw new Error('Krea2 character gate baseline workflow hash is invalid');
  const workflow = parseJson(bytes, 'Krea2 character gate baseline workflow is invalid JSON');
  if (hash(JSON.stringify(krea2WorkflowTopology(workflow))) !== certificate.topologySha256) {
    throw new Error('Krea2 character gate baseline topology hash is invalid');
  }
}
