import { z } from 'zod';

export const CanonClassificationSchema = z.enum([
  'canon_exact',
  'canon_paraphrase',
  'supported_inference',
  'AU_extension',
  'rejected',
]);

export const CanonClaimScopeSchema = z.enum([
  'terminology',
  'profile',
  'appearance',
  'personality',
  'story',
  'combat',
  'boundary',
  'production',
]);

const CanonSourceKindSchema = z.enum([
  'official-game',
  'community-transcript',
  'community-reference',
  'gameplay-recording',
  'project-artifact',
]);

const RedistributionPolicySchema = z.enum([
  'metadata-only',
  'no-reprint',
  'project-internal',
]);

export const CanonSourceSchema = z
  .object({
    id: z.string().min(1),
    kind: CanonSourceKindSchema,
    title: z.string().min(1),
    url: z.string().url().optional(),
    localPath: z.string().min(1).optional(),
    locator: z.string().min(1),
    language: z.string().min(1),
    checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
    revisionId: z.number().int().positive().optional(),
    revisionTimestamp: z.string().min(1).optional(),
    redistribution: RedistributionPolicySchema,
    note: z.string().min(1).optional(),
  })
  .strict()
  .refine((source) => Boolean(source.url) !== Boolean(source.localPath), {
    message: 'Canon source must declare exactly one of url or localPath',
  });

const CanonEvidenceSchema = z
  .object({
    sourceId: z.string().min(1),
    locator: z.string().min(1),
  })
  .strict();

export const CanonClaimSchema = z
  .object({
    id: z.string().min(1),
    classification: CanonClassificationSchema,
    scope: CanonClaimScopeSchema,
    statement: z.string().min(1),
    recapText: z.string().min(1).optional(),
    evidence: z.array(CanonEvidenceSchema).min(1),
    reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
    rationale: z.string().min(1).optional(),
    rejectionReason: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((claim, context) => {
    if (claim.classification === 'rejected' && !claim.rejectionReason) {
      context.addIssue({ code: 'custom', path: ['rejectionReason'], message: 'Rejected claims require a rejection reason' });
    }
    if (claim.classification !== 'rejected' && claim.rejectionReason) {
      context.addIssue({ code: 'custom', path: ['rejectionReason'], message: 'Only rejected claims may declare a rejection reason' });
    }
  });

export const SceneProvenanceSchema = z
  .object({
    classification: CanonClassificationSchema,
    scope: z.enum(['canon_recap', 'AU_boundary', 'route']),
    claimIds: z.array(z.string().min(1)).min(1),
    sourceIds: z.array(z.string().min(1)).min(1),
    note: z.string().min(1),
  })
  .strict()
  .superRefine((provenance, context) => {
    if (provenance.classification === 'rejected') {
      context.addIssue({ code: 'custom', path: ['classification'], message: 'Rejected content cannot enter a published scene' });
    }
    if (provenance.scope === 'canon_recap' && provenance.classification !== 'canon_paraphrase') {
      context.addIssue({ code: 'custom', path: ['classification'], message: 'Canon recap scenes must be canon_paraphrase' });
    }
    if (provenance.scope !== 'canon_recap' && provenance.classification !== 'AU_extension') {
      context.addIssue({ code: 'custom', path: ['classification'], message: 'AU boundary and route scenes must be AU_extension' });
    }
  });

const StoryProvenanceEntrySchema = z
  .object({
    sceneIds: z.array(z.string().min(1)).min(1),
    provenance: SceneProvenanceSchema,
  })
  .strict();

const CanonCoverageEntrySchema = z
  .object({
    claimId: z.string().min(1),
    sceneIds: z.array(z.string().min(1)),
    worldbookEntryIds: z.array(z.string().min(1)),
    cardFields: z.array(z.string().min(1)),
    disposition: z.enum(['published', 'production-constraint', 'rejected']),
    note: z.string().min(1),
  })
  .strict()
  .superRefine((entry, context) => {
    const consumers = entry.sceneIds.length + entry.worldbookEntryIds.length + entry.cardFields.length;
    if (entry.disposition !== 'rejected' && consumers === 0) {
      context.addIssue({ code: 'custom', path: ['sceneIds'], message: 'Published claims require at least one consumer' });
    }
    if (entry.disposition === 'rejected' && consumers !== 0) {
      context.addIssue({ code: 'custom', path: ['sceneIds'], message: 'Rejected claims cannot have published consumers' });
    }
  });

function addDuplicateIssues(
  context: z.RefinementCtx,
  values: Array<{ id: string }>,
  pathKey: string,
): void {
  const ids = new Set<string>();
  values.forEach((value, index) => {
    if (ids.has(value.id)) context.addIssue({ code: 'custom', path: [pathKey, index, 'id'], message: `Duplicate id: ${value.id}` });
    ids.add(value.id);
  });
}

export const CanonSourceLedgerSchema = z
  .object({ version: z.literal(1), sources: z.array(CanonSourceSchema).min(1) })
  .strict()
  .superRefine((ledger, context) => addDuplicateIssues(context, ledger.sources, 'sources'));

export const CanonClaimLedgerSchema = z
  .object({ version: z.literal(1), claims: z.array(CanonClaimSchema).min(1) })
  .strict()
  .superRefine((ledger, context) => addDuplicateIssues(context, ledger.claims, 'claims'));

export const StoryProvenanceLedgerSchema = z
  .object({ version: z.literal(1), entries: z.array(StoryProvenanceEntrySchema).min(1) })
  .strict()
  .superRefine((ledger, context) => {
    const sceneIds = new Set<string>();
    ledger.entries.forEach((entry, entryIndex) => entry.sceneIds.forEach((sceneId, sceneIndex) => {
      if (sceneIds.has(sceneId)) {
        context.addIssue({ code: 'custom', path: ['entries', entryIndex, 'sceneIds', sceneIndex], message: `Duplicate scene provenance: ${sceneId}` });
      }
      sceneIds.add(sceneId);
    }));
  });

export const CanonCoverageLedgerSchema = z
  .object({
    version: z.literal(1),
    scope: z.string().min(1),
    exclusions: z.array(z.object({ scope: z.string().min(1), reason: z.string().min(1) }).strict()),
    entries: z.array(CanonCoverageEntrySchema).min(1),
  })
  .strict()
  .superRefine((ledger, context) => {
    const ids = new Set<string>();
    ledger.entries.forEach((entry, index) => {
      if (ids.has(entry.claimId)) context.addIssue({ code: 'custom', path: ['entries', index, 'claimId'], message: `Duplicate claim coverage: ${entry.claimId}` });
      ids.add(entry.claimId);
    });
  });

export type CanonClassification = z.infer<typeof CanonClassificationSchema>;
export type CanonSourceLedger = z.infer<typeof CanonSourceLedgerSchema>;
export type CanonClaimLedger = z.infer<typeof CanonClaimLedgerSchema>;
export type SceneProvenance = z.infer<typeof SceneProvenanceSchema>;
export type StoryProvenanceLedger = z.infer<typeof StoryProvenanceLedgerSchema>;
export type CanonCoverageLedger = z.infer<typeof CanonCoverageLedgerSchema>;

function validateClaimSources(claims: CanonClaimLedger, sources: CanonSourceLedger): void {
  const sourceIds = new Set(sources.sources.map((source) => source.id));
  for (const claim of claims.claims) {
    for (const evidence of claim.evidence) {
      if (!sourceIds.has(evidence.sourceId)) throw new Error(`Claim ${claim.id} references unknown source: ${evidence.sourceId}`);
    }
  }
}

function expectedSourceIds(claimIds: string[], claimsById: Map<string, CanonClaimLedger['claims'][number]>): string[] {
  const sourceIds = new Set<string>();
  for (const claimId of claimIds) {
    const claim = claimsById.get(claimId);
    if (!claim) throw new Error(`Scene provenance references unknown claim: ${claimId}`);
    claim.evidence.forEach((evidence) => sourceIds.add(evidence.sourceId));
  }
  return [...sourceIds].sort();
}

function validateSceneProvenance(
  provenance: SceneProvenance,
  claimsById: Map<string, CanonClaimLedger['claims'][number]>,
): void {
  const claims = provenance.claimIds.map((claimId) => {
    const claim = claimsById.get(claimId);
    if (!claim) throw new Error(`Scene provenance references unknown claim: ${claimId}`);
    return claim;
  });
  const mismatched = claims.find((claim) => claim.classification !== provenance.classification);
  if (mismatched) throw new Error(`Scene provenance classification does not match claim: ${mismatched.id}`);
  const expected = expectedSourceIds(provenance.claimIds, claimsById);
  const actual = [...new Set(provenance.sourceIds)].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error('Scene provenance sourceIds must exactly match claim evidence');
}

function expectedRecapText(
  provenance: SceneProvenance,
  claimsById: Map<string, CanonClaimLedger['claims'][number]>,
): string | undefined {
  if (provenance.scope !== 'canon_recap') return undefined;
  return provenance.claimIds.map((claimId) => {
    const claim = claimsById.get(claimId);
    if (!claim?.recapText) throw new Error(`Canon recap claim is missing recapText: ${claimId}`);
    return claim.recapText;
  }).join('\n\n');
}

function provenanceByScene(ledger: StoryProvenanceLedger): Map<string, SceneProvenance> {
  return new Map(ledger.entries.flatMap((entry) => entry.sceneIds.map((sceneId) => [sceneId, entry.provenance] as const)));
}

export function materializeSceneProvenance<T extends { id: string; text?: string }>(
  scenes: T[],
  sourceInput: unknown,
  claimInput: unknown,
  provenanceInput: unknown,
): Array<T & { provenance: SceneProvenance }> {
  const sources = CanonSourceLedgerSchema.parse(sourceInput);
  const claims = CanonClaimLedgerSchema.parse(claimInput);
  const ledger = StoryProvenanceLedgerSchema.parse(provenanceInput);
  validateClaimSources(claims, sources);
  const claimsById = new Map(claims.claims.map((claim) => [claim.id, claim]));
  ledger.entries.forEach((entry) => validateSceneProvenance(entry.provenance, claimsById));
  const byScene = provenanceByScene(ledger);
  const knownSceneIds = new Set(scenes.map((scene) => scene.id));
  const unknown = [...byScene.keys()].find((sceneId) => !knownSceneIds.has(sceneId));
  if (unknown) throw new Error(`Provenance references unknown scene: ${unknown}`);
  return scenes.map((scene) => {
    const provenance = byScene.get(scene.id);
    if (!provenance) throw new Error(`Scene is missing provenance: ${scene.id}`);
    const recapText = expectedRecapText(provenance, claimsById);
    if (recapText !== undefined && scene.text !== recapText) {
      throw new Error(`Canon recap scene text must exactly match reviewed claim text: ${scene.id}`);
    }
    return { ...scene, provenance };
  });
}
