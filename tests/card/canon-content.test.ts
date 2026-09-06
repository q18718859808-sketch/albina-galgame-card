import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

const execute = promisify(execFile);
const projectRoot = process.cwd();
const sourcePath = join(projectRoot, 'content/albina-card-canon-v1.json');
const canonSourcesPath = join(projectRoot, 'content/canon-sources-v1.json');
const canonClaimsPath = join(projectRoot, 'content/canon-claims-v1.json');
const cardPath = join(projectRoot, 'card/albina.card.json');
const templatePath = join(projectRoot, 'card/character-card.template.json');
const worldbookPath = join(
  projectRoot,
  'dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json',
);
const playerProfileRuntimePath = join(projectRoot, 'content/worldbook/player-profile-runtime-v1.json');

async function json<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T;
}

interface CanonEntry {
  id: string;
  content: string;
  claimIds: string[];
}

interface CanonProfile {
  card: Record<string, unknown> & {
    first_mes: string;
    creator_notes: string;
    character_book: { entries: CanonEntry[] };
  };
}

interface CanonSourceLedger { sources: Array<{ id: string }> }
interface CanonClaimLedger {
  claims: Array<{ id: string; classification: string; evidence: Array<{ sourceId: string }> }>;
}

interface CardEntry {
  content: string;
  extensions: {
    entry_id: string;
    content_classification: string;
    claim_ids: string[];
    source_refs: string[];
  };
}

interface Card {
  description: string;
  personality: string;
  scenario: string;
  first_mes: string;
  mes_example: string;
  data: Record<string, unknown> & {
    extensions: {
      tavern_helper: {
        scripts: Array<{
          type: string;
          enabled: boolean;
          name: string;
          id: string;
          content: string;
          info: string;
          button: { enabled: boolean; buttons: Array<{ name: string; visible: boolean }> };
          data: Record<string, unknown>;
        }>;
        variables: Record<string, unknown>;
      };
    };
    character_book: { entries: CardEntry[] };
  };
}

interface Worldbook {
  generatedFrom: string;
  entries: Array<{ uid: string; content: string; extensions: CardEntry['extensions'] }>;
}

interface PlayerProfileRuntime {
  id: string;
  content: string;
}

const legacyFields = ['description', 'personality', 'scenario', 'first_mes', 'mes_example'] as const;
const dataFields = [
  ...legacyFields,
  'system_prompt',
  'post_history_instructions',
  'creator_notes',
  'alternate_greetings',
] as const;

describe('source-backed Albina card canon', () => {
  it('passes the default drift check without writing', async () => {
    const result = await execute(process.execPath, [join(projectRoot, 'scripts/sync-canon-card.mjs')], {
      cwd: projectRoot,
    });
    expect(result.stdout).toContain('are synchronized');
    expect(result.stderr).toBe('');
  });

  it('derives every card entry from the single canonical source and claim graph', async () => {
    const [profile, sources, claims] = await Promise.all([
      json<CanonProfile>(sourcePath),
      json<CanonSourceLedger>(canonSourcesPath),
      json<CanonClaimLedger>(canonClaimsPath),
    ]);
    const sourceIds = new Set(sources.sources.map((item) => item.id));
    const claimsById = new Map(claims.claims.map((item) => [item.id, item]));
    expect(profile.card.character_book.entries.length).toBeGreaterThanOrEqual(10);
    expect(new Set(profile.card.character_book.entries.map((entry) => entry.id))).toHaveLength(
      profile.card.character_book.entries.length,
    );
    for (const claim of claims.claims) {
      expect(claim.evidence.length).toBeGreaterThan(0);
      expect(claim.evidence.every((item) => sourceIds.has(item.sourceId))).toBe(true);
    }
    for (const entry of profile.card.character_book.entries) {
      const entryClaims = entry.claimIds.map((id) => claimsById.get(id));
      expect(entryClaims.every(Boolean), entry.id).toBe(true);
      expect(new Set(entryClaims.map((claim) => claim?.classification)).size, entry.id).toBe(1);
      expect(entryClaims.some((claim) => claim?.classification === 'rejected'), entry.id).toBe(false);
    }
  });

  it('projects the same canon fields and provenance into both cards and the standalone worldbook', async () => {
    const [source, card, template, worldbook, playerProfileRuntime] = await Promise.all([
      json<CanonProfile>(sourcePath),
      json<Card>(cardPath),
      json<Card>(templatePath),
      json<Worldbook>(worldbookPath),
      json<PlayerProfileRuntime>(playerProfileRuntimePath),
    ]);
    for (const target of [card, template]) {
      for (const field of legacyFields) expect(target[field]).toBe(source.card[field]);
      for (const field of dataFields) expect(target.data[field]).toEqual(source.card[field]);
      expect(target.data.character_book.entries).toHaveLength(source.card.character_book.entries.length + 1);
    }
    expect(template.data.character_book).toEqual(card.data.character_book);
    expect(worldbook.generatedFrom).toBe('content/albina-card-canon-v1.json + content/canon-claims-v1.json + content/worldbook/player-profile-runtime-v1.json');
    expect(worldbook.entries.map((entry) => entry.uid)).toEqual(
      [...source.card.character_book.entries.map((entry) => entry.id), playerProfileRuntime.id],
    );
    for (const entry of card.data.character_book.entries) {
      expect(entry.extensions.content_classification).toMatch(
        /^(?:canon_exact|canon_paraphrase|supported_inference|AU_extension)$/u,
      );
      const isRuntimeEntry = entry.extensions.entry_id === playerProfileRuntime.id;
      expect(entry.extensions.claim_ids.length).toBeGreaterThanOrEqual(isRuntimeEntry ? 0 : 1);
      expect(entry.extensions.source_refs.length).toBeGreaterThanOrEqual(isRuntimeEntry ? 0 : 1);
      expect(worldbook.entries.find((item) => item.uid === entry.extensions.entry_id)?.extensions).toEqual(
        entry.extensions,
      );
    }
    const runtimeEntry = card.data.character_book.entries.find((entry) => entry.extensions.entry_id === playerProfileRuntime.id);
    expect(runtimeEntry?.content).toBe(playerProfileRuntime.content);
    expect(runtimeEntry?.extensions).toMatchObject({
      content_classification: 'AU_extension',
      review_status: 'ejs-source-checked',
      variable_source: 'TavernHelper.setVariables(chat)',
    });
  });

  it('preserves the approved Tavern Helper loader and card extensions', async () => {
    const [card, template] = await Promise.all([json<Card>(cardPath), json<Card>(templatePath)]);
    const cardHelper = card.data.extensions.tavern_helper;
    const templateHelper = template.data.extensions.tavern_helper;
    expect(cardHelper).toEqual(templateHelper);
    expect(cardHelper.variables).toEqual({});
    expect(cardHelper.scripts[0]).toEqual({
      type: 'script',
      enabled: true,
      name: 'Albina',
      id: '7f664fa2-7123-484f-bafb-bc812ae1103f',
      content: "import 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.4/dist/albina-galgame-card/source/albina-classic-loader.js'\n",
      info: '',
      button: {
        enabled: true,
        buttons: [{ name: '打开阿尔比娜前端', visible: true }],
      },
      data: {},
    });
    expect(cardHelper.scripts).toHaveLength(1);
    expect(cardHelper.scripts.some((script) => script.data.integration_id === 'lorebook-tool-call')).toBe(false);
  });

  it('covers the 9-18, 9-37, and 9-43 canon chain and marks all routes and endings as AU/IF', async () => {
    const source = await json<CanonProfile>(sourcePath);
    expect(source.card.first_mes).toContain('9-18');
    expect(source.card.first_mes).toContain('9-37');
    expect(source.card.first_mes).toContain('9-43');
    expect(source.card.first_mes).toContain('Fascia');
    expect(source.card.first_mes).toContain('杀死阿尔比娜');
    expect(source.card.first_mes).toContain('AU/IF');
    expect(source.card.creator_notes).toContain('三条路线、九个结局');
    expect(source.card.creator_notes).toContain('原创 AU/IF');
  });

  it('excludes known fabricated quotes, appearance errors, and unsupported lore expansions', async () => {
    const [source, card, template, worldbook] = await Promise.all([
      readFile(sourcePath, 'utf8'),
      readFile(cardPath, 'utf8'),
      readFile(templatePath, 'utf8'),
      readFile(worldbookPath, 'utf8'),
    ]);
    const activeCanon = `${source}\n${card}\n${template}\n${worldbook}`;
    const forbidden = [
      '【阿尔比娜官方台词与核心设定整合】',
      'LCA（Limbus Company Administration',
      '但丁作为执行经理被视为"第10号罪人"',
      '十号罪人：辛克莱',
      '核心哲学：禁忌与交换',
      'Non è bello',
      'chiaroscuro',
      '左眼银',
      '默认玩家 {{user}} 是成年男性',
      '法西娅是她的身体、孩子和另一个自我',
      'LCE实验室',
      '9-37 的正史结果是 Future Sinclair',
      '9-37 的既定结果是 Future Sinclair',
    ];
    for (const phrase of forbidden) expect(activeCanon, phrase).not.toContain(phrase);
  });
});
