import { describe, expect, it } from 'vitest';

import claimsJson from '../../content/canon-claims-v1.json';
import provenanceJson from '../../content/story-provenance-v1.json';
import sourcesJson from '../../content/canon-sources-v1.json';
import {
  CanonClassificationSchema,
  CanonClaimLedgerSchema,
  CanonSourceLedgerSchema,
  materializeSceneProvenance,
  SceneProvenanceSchema,
  StoryProvenanceLedgerSchema,
} from '../../src/domain/canon';

describe('canon provenance domain', () => {
  it('locks the five content classifications without aliases', () => {
    expect(CanonClassificationSchema.options).toEqual([
      'canon_exact',
      'canon_paraphrase',
      'supported_inference',
      'AU_extension',
      'rejected',
    ]);
    const claims = CanonClaimLedgerSchema.parse(claimsJson);
    expect(new Set(claims.claims.map((claim) => claim.classification))).toEqual(new Set(CanonClassificationSchema.options));
  });

  it('parses the checked-in source, claim, and story ledgers', () => {
    expect(CanonSourceLedgerSchema.parse(sourcesJson).sources.length).toBeGreaterThan(0);
    expect(CanonClaimLedgerSchema.parse(claimsJson).claims.length).toBeGreaterThan(0);
    expect(StoryProvenanceLedgerSchema.parse(provenanceJson).entries.length).toBeGreaterThan(0);
  });

  it('anchors the fixed Albina outcome to 9-43 instead of 9-37', () => {
    const claims = CanonClaimLedgerSchema.parse(claimsJson);
    const outcome = claims.claims.find((claim) => claim.id === 'canon.9-43.outcome');
    expect(outcome?.statement).toContain('9-43');
    expect(outcome?.evidence.map((item) => item.sourceId).sort()).toEqual([
      'source.bilibili.BV1rsi8B5ED2.p43',
      'source.official.canto-ix.9-43',
      'source.wiki.canto-ix-part-iii.177602',
    ]);
    expect(claims.claims.some((claim) => claim.id === 'canon.9-37.outcome')).toBe(false);
  });

  it('refuses rejected content and invalid route/scope combinations', () => {
    const route = {
      classification: 'AU_extension',
      scope: 'route',
      claimIds: ['boundary.au'],
      sourceIds: ['source.project'],
      note: 'Explicit AU.',
    } as const;
    expect(SceneProvenanceSchema.parse(route)).toEqual(route);
    expect(SceneProvenanceSchema.parse({ ...route, scope: 'AU_boundary' })).toEqual({ ...route, scope: 'AU_boundary' });
    expect(() => SceneProvenanceSchema.parse({ ...route, classification: 'rejected' })).toThrow(/rejected content/i);
    expect(() => SceneProvenanceSchema.parse({ ...route, classification: 'canon_paraphrase' })).toThrow(/route scenes/i);
  });

  it('requires every authored scene to have exact claim and source coverage', () => {
    const sources = {
      version: 1,
      sources: [{
        id: 'source.official', kind: 'official-game', title: 'Scene', url: 'https://example.com',
        locator: '9-37', language: 'en', checkedAt: '2026-07-15', redistribution: 'metadata-only',
      }],
    };
    const claims = {
      version: 1,
      claims: [{
        id: 'canon.scene', classification: 'canon_paraphrase', statement: 'Short paraphrase.',
        evidence: [{ sourceId: 'source.official', locator: '9-37' }],
      }],
    };
    const provenance = {
      version: 1,
      entries: [{
        sceneIds: ['scene_001'],
        provenance: {
          classification: 'canon_paraphrase', scope: 'canon_recap', claimIds: ['canon.scene'],
          sourceIds: ['source.official'], note: 'Short paraphrase.',
        },
      }],
    };
    const result = materializeSceneProvenance([{ id: 'scene_001', text: '复盘' }], sources, claims, provenance);
    expect(result[0]?.provenance.claimIds).toEqual(['canon.scene']);
    expect(() => materializeSceneProvenance([{ id: 'missing' }], sources, claims, provenance)).toThrow(/unknown scene/i);
    const wrongSources = structuredClone(provenance);
    wrongSources.entries[0]!.provenance.sourceIds = ['source.other'];
    expect(() => materializeSceneProvenance([{ id: 'scene_001' }], sources, claims, wrongSources)).toThrow(/exactly match/i);
  });
});
