import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

const execute = promisify(execFile);
const projectRoot = process.cwd();
const sourcePath = join(projectRoot, 'content/albina-card-canon-v1.json');
const cardPath = join(projectRoot, 'card/albina.card.json');
const templatePath = join(projectRoot, 'card/character-card.template.json');
const worldbookPath = join(
  projectRoot,
  'dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json',
);

async function json<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T;
}

interface CanonEntry {
  id: string;
  content: string;
  contentClassification: string;
  claimIds: string[];
  sourceRefs: string[];
}

interface CanonSource {
  sources: Array<{ id: string }>;
  claims: Array<{ id: string; sourceRefs: string[] }>;
  card: Record<string, unknown> & {
    first_mes: string;
    creator_notes: string;
    character_book: { entries: CanonEntry[] };
  };
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
    extensions: { tavern_helper: { scripts: Array<{ content: string }> } };
    character_book: { entries: CardEntry[] };
  };
}

interface Worldbook {
  generatedFrom: string;
  entries: Array<{ uid: string; content: string; extensions: CardEntry['extensions'] }>;
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

  it('uses one referenced high-confidence source graph for exactly ten entries', async () => {
    const source = await json<CanonSource>(sourcePath);
    const sourceIds = new Set(source.sources.map((item) => item.id));
    const claimIds = new Set(source.claims.map((item) => item.id));
    expect(source.card.character_book.entries).toHaveLength(10);
    expect(new Set(source.card.character_book.entries.map((entry) => entry.id))).toHaveLength(10);
    for (const claim of source.claims) {
      expect(claim.sourceRefs.length).toBeGreaterThan(0);
      expect(claim.sourceRefs.every((id) => sourceIds.has(id))).toBe(true);
    }
    for (const entry of source.card.character_book.entries) {
      expect(['canon_exact', 'canon_paraphrase', 'supported_inference', 'AU_extension']).toContain(
        entry.contentClassification,
      );
      expect(entry.contentClassification).not.toBe('rejected');
      expect(entry.claimIds.every((id) => claimIds.has(id))).toBe(true);
      expect(entry.sourceRefs.every((id) => sourceIds.has(id))).toBe(true);
    }
  });

  it('projects the same canon fields and provenance into both cards and the standalone worldbook', async () => {
    const [source, card, template, worldbook] = await Promise.all([
      json<CanonSource>(sourcePath),
      json<Card>(cardPath),
      json<Card>(templatePath),
      json<Worldbook>(worldbookPath),
    ]);
    for (const target of [card, template]) {
      for (const field of legacyFields) expect(target[field]).toBe(source.card[field]);
      for (const field of dataFields) expect(target.data[field]).toEqual(source.card[field]);
      expect(target.data.character_book.entries).toHaveLength(10);
    }
    expect(template.data.character_book).toEqual(card.data.character_book);
    expect(worldbook.generatedFrom).toBe('content/albina-card-canon-v1.json');
    expect(worldbook.entries.map((entry) => entry.uid)).toEqual(
      source.card.character_book.entries.map((entry) => entry.id),
    );
    for (const entry of card.data.character_book.entries) {
      expect(entry.extensions.content_classification).toMatch(
        /^(?:canon_exact|canon_paraphrase|supported_inference|AU_extension)$/u,
      );
      expect(entry.extensions.claim_ids.length).toBeGreaterThan(0);
      expect(entry.extensions.source_refs.length).toBeGreaterThan(0);
      expect(worldbook.entries.find((item) => item.uid === entry.extensions.entry_id)?.extensions).toEqual(
        entry.extensions,
      );
    }
  });

  it('preserves the approved Tavern Helper loader and card extensions', async () => {
    const [card, template] = await Promise.all([json<Card>(cardPath), json<Card>(templatePath)]);
    const cardLoader = card.data.extensions.tavern_helper.scripts[0]?.content;
    const templateLoader = template.data.extensions.tavern_helper.scripts[0]?.content;
    expect(cardLoader).toBe(templateLoader);
    expect(cardLoader).toContain('@v2.0.0-rc.1/dist/albina-galgame-card/source/albina-classic-loader.js');
    expect(cardLoader).toContain('data-albina-classic-loader');
  });

  it('covers the 9-18, 9-37, and 9-43 canon chain and marks all routes and endings as AU/IF', async () => {
    const source = await json<CanonSource>(sourcePath);
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
