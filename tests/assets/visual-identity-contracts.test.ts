import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

const characterBearingSourceRoles = new Set(['standing', 'story-icon', 'storylog', 'promotional']);

const bootstrapRoots = {
  'visual.image.portrait.golden_apparition.normal': {
    subject: 'golden_apparition',
    pointer: '#/characterBible/auSupportingCharacters/golden_apparition',
  },
  'visual.image.portrait.lce_doctor.normal': {
    subject: 'lce_doctor',
    pointer: '#/characterBible/auSupportingCharacters/lce_doctor',
  },
  'visual.image.portrait.protagonist.serious': {
    subject: 'protagonist',
    pointer: '#/characterBible/protagonist',
  },
  'visual.image.portrait.ring_agent.normal': {
    subject: 'ring_agent',
    pointer: '#/characterBible/auSupportingCharacters/ring_agent',
  },
} as const;

const cgIdentitySubjects = {
  'visual.image.cg.araya_rooftop': ['albina', 'protagonist', 'vergilius'],
  'visual.image.cg.art_resonance': ['albina', 'protagonist'],
  'visual.image.cg.backstreet_pursuit': ['albina', 'protagonist', 'ring_agent'],
  'visual.image.cg.canon_recap_9_14': [],
  'visual.image.cg.canon_recap_9_18': ['albina', 'dante', 'ren'],
  'visual.image.cg.canon_recap_9_37': ['albina', 'faust'],
  'visual.image.cg.canon_recap_9_37_battle': ['albina', 'alyssa', 'callisto'],
  'visual.image.cg.canon_recap_9_43_outcome': ['albina', 'callisto', 'sinclair-smoke-war'],
  'visual.image.cg.canon_recap_albina_fascia': ['albina'],
  'visual.image.cg.combat_transition_01': ['albina', 'protagonist', 'ring_agent'],
  'visual.image.cg.conspiracy_contract': ['albina', 'callisto', 'protagonist', 'ren'],
  'visual.image.cg.fascia_heartbeat': ['albina', 'protagonist'],
  'visual.image.cg.golden_bough_ending': ['albina', 'protagonist'],
  'visual.image.cg.golden_bough_rebuild': ['albina'],
  'visual.image.cg.hollow_torso_reveal': ['albina', 'lce_doctor', 'protagonist'],
  'visual.image.cg.lce_raid': ['albina', 'lce_doctor', 'protagonist'],
  'visual.image.cg.limbus_bus_night': ['albina', 'dante', 'protagonist'],
  'visual.image.cg.maestro_shadow': ['albina', 'callisto', 'protagonist', 'ren'],
  'visual.image.cg.opening_rain': ['albina', 'protagonist'],
  'visual.image.cg.rain_confession': ['albina', 'protagonist'],
  'visual.image.cg.rebuild_awakening': ['albina', 'protagonist'],
  'visual.image.cg.ren_interruption': ['albina', 'protagonist', 'ren'],
  'visual.image.cg.ring_conspiracy_ending': ['albina', 'protagonist'],
  'visual.image.cg.ring_invitation': ['albina', 'callisto', 'ren'],
  'visual.image.cg.surgery_of_memory': ['albina', 'faust', 'protagonist'],
  'visual.image.cg.trust_threshold': ['albina', 'protagonist'],
  'visual.image.cg.white_canvas_choice': ['albina', 'protagonist'],
  'visual.image.cg.white_canvas_ending': ['albina', 'protagonist'],
} as const;

async function json(path: string): Promise<any> {
  return JSON.parse(await readFile(path, 'utf8'));
}

function portraitSubject(jobId: string): string | undefined {
  return jobId.match(/^visual\.image\.portrait\.([^.]+)\./u)?.[1];
}

function sortedUnique(values: string[]): string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function referencedIdentitySubjects(prompt: any, sourceById: Map<string, any>): string[] {
  const parentSubjects = prompt.referenceJobIds.map((jobId: string) => portraitSubject(jobId)).filter(Boolean) as string[];
  const canonSubjects = (prompt.referenceSourceIds ?? [])
    .map((sourceId: string) => sourceById.get(sourceId))
    .filter((source: any) => characterBearingSourceRoles.has(source?.role))
    .map((source: any) => source.subject as string);
  return sortedUnique([...parentSubjects, ...canonSubjects]);
}

describe('visual identity allowlist contracts', () => {
  it('freezes complete, canonical identity fields on all 67 prompts', async () => {
    const freeze = await json('content/media-production/visual-prompts-v2.json');
    expect(freeze.prompts).toHaveLength(67);
    for (const prompt of freeze.prompts) {
      expect(Object.hasOwn(prompt, 'identitySubjects'), `${prompt.jobId}: missing identitySubjects`).toBe(true);
      expect(Object.hasOwn(prompt, 'identityBootstrap'), `${prompt.jobId}: missing identityBootstrap`).toBe(true);
      expect(Array.isArray(prompt.identitySubjects), `${prompt.jobId}: identitySubjects`).toBe(true);
      expect(prompt.identitySubjects, `${prompt.jobId}: canonical identitySubjects`).toEqual(sortedUnique(prompt.identitySubjects));
    }
  });

  it('allows project-authored identity bootstrap on exactly four character-bible roots', async () => {
    const freeze = await json('content/media-production/visual-prompts-v2.json');
    const actualRoots = freeze.prompts
      .filter((prompt: any) => prompt.identityBootstrap != null)
      .map((prompt: any) => prompt.jobId)
      .sort();
    expect(actualRoots).toEqual(Object.keys(bootstrapRoots).sort());
    for (const [jobId, expected] of Object.entries(bootstrapRoots)) {
      const prompt = freeze.prompts.find((candidate: any) => candidate.jobId === jobId);
      expect(prompt.identitySubjects, jobId).toEqual([expected.subject]);
      expect(prompt.referenceJobIds, jobId).toEqual([]);
      expect(referencedIdentitySubjects(prompt, new Map()), jobId).toEqual([]);
      expect(prompt.identityBootstrap, jobId).toEqual({
        kind: 'project-authored-root',
        subject: expected.subject,
        authority: { kind: 'character-bible', pointer: expected.pointer },
        identityReferenceJobIds: [],
        identityReferenceSourceIds: [],
        requiresHumanIdentityApproval: true,
      });
    }
  });

  it('copies both identity fields exactly from every prompt into the authorized plan', async () => {
    const freeze = await json('content/media-production/visual-prompts-v2.json');
    const plan = await json('content/media-production/visual-rebuild-v2.json');
    const promptById = new Map<string, any>(freeze.prompts.map((prompt: any): [string, any] => [prompt.jobId, prompt]));
    expect(plan.imageJobs).toHaveLength(67);
    for (const job of plan.imageJobs) {
      const prompt = promptById.get(job.id);
      expect(Object.hasOwn(job, 'identitySubjects'), `${job.id}: missing plan identitySubjects`).toBe(true);
      expect(Object.hasOwn(job, 'identityBootstrap'), `${job.id}: missing plan identityBootstrap`).toBe(true);
      expect(job.identitySubjects, `${job.id}: identitySubjects binding`).toEqual(prompt.identitySubjects);
      expect(job.identityBootstrap, `${job.id}: identityBootstrap binding`).toEqual(prompt.identityBootstrap);
    }
  });

  it('derives portrait, CG, and background allowlists from identity-bearing inputs only', async () => {
    const freeze = await json('content/media-production/visual-prompts-v2.json');
    const sources = await json('content/media-production/canon-visual-sources-v1.json');
    const sourceById = new Map<string, any>(sources.assets.map((source: any): [string, any] => [source.id, source]));

    const promptsByCategory = {
      background: freeze.prompts.filter((prompt: any) => prompt.jobId.startsWith('visual.image.bg.')),
      cg: freeze.prompts.filter((prompt: any) => prompt.jobId.startsWith('visual.image.cg.')),
      portrait: freeze.prompts.filter((prompt: any) => prompt.jobId.startsWith('visual.image.portrait.')),
    };
    expect(Object.fromEntries(Object.entries(promptsByCategory).map(([key, value]) => [key, value.length]))).toEqual({
      background: 12,
      cg: 28,
      portrait: 27,
    });

    for (const prompt of promptsByCategory.background) {
      expect(referencedIdentitySubjects(prompt, sourceById), prompt.jobId).toEqual([]);
      expect(prompt.identitySubjects, prompt.jobId).toEqual([]);
      expect(prompt.identityBootstrap, prompt.jobId).toBeNull();
    }

    const actualCgContracts = Object.fromEntries(promptsByCategory.cg
      .map((prompt: any) => [prompt.jobId, prompt.identitySubjects])
      .sort(([left]: [string, unknown], [right]: [string, unknown]) => left.localeCompare(right)));
    expect(actualCgContracts).toEqual(cgIdentitySubjects);
    for (const prompt of promptsByCategory.cg) {
      expect(prompt.identitySubjects, prompt.jobId).toEqual(referencedIdentitySubjects(prompt, sourceById));
      expect(prompt.identityBootstrap, prompt.jobId).toBeNull();
    }

    for (const prompt of promptsByCategory.portrait) {
      const subject = portraitSubject(prompt.jobId);
      expect(subject, prompt.jobId).toBeTruthy();
      expect(prompt.identitySubjects, prompt.jobId).toEqual([subject]);
      if (Object.hasOwn(bootstrapRoots, prompt.jobId)) {
        expect(referencedIdentitySubjects(prompt, sourceById), prompt.jobId).toEqual([]);
      } else {
        expect(referencedIdentitySubjects(prompt, sourceById), prompt.jobId).toEqual([subject]);
        expect(prompt.identityBootstrap, prompt.jobId).toBeNull();
      }
    }

    for (const prompt of freeze.prompts) {
      expect(prompt.identitySubjects, prompt.jobId).not.toContain('albina-global-style-board');
      expect(prompt.identitySubjects, prompt.jobId).not.toContain('albina-reference-heroine');
      expect(prompt.identitySubjects.some((subject: string) => subject.startsWith('canto-ix-')), prompt.jobId).toBe(false);
    }
  });
});
