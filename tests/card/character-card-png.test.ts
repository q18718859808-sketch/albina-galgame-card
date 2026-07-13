import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  parsePngChunks,
  readCharacterCardPng,
  syncCharacterCardPng,
} from '../../scripts/lib/character-card-png.mjs';

const projectRoot = process.cwd();
const pngPath = join(projectRoot, 'card/albina.card.png');
const jsonPath = join(projectRoot, 'card/albina.card.json');

async function fixture(): Promise<{ card: unknown; png: Buffer }> {
  const [json, png] = await Promise.all([readFile(jsonPath, 'utf8'), readFile(pngPath)]);
  return { card: JSON.parse(json) as unknown, png };
}

function crc32(bytes: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

describe('character-card PNG metadata', () => {
  it('exposes card sync and check commands and gates verify on card drift', async () => {
    const packageJson = JSON.parse(await readFile(join(projectRoot, 'package.json'), 'utf8')) as { scripts: Record<string, string> };
    expect(packageJson.scripts['card:sync']).toContain('sync-character-card-png.mjs --write');
    expect(packageJson.scripts['card:check']).toContain('sync-character-card-png.mjs');
    expect(packageJson.scripts.verify).toContain('card:check');
  });

  it('deep-equals the canonical card JSON', async () => {
    const { card, png } = await fixture();
    expect(readCharacterCardPng(png)).toEqual(card);
  });

  it('is byte-idempotent when already synchronized', async () => {
    const { card, png } = await fixture();
    expect(syncCharacterCardPng(png, card)).toEqual(png);
  });

  it('writes valid CRCs and preserves every non-chara chunk byte-for-byte', async () => {
    const { card, png } = await fixture();
    const changed = structuredClone(card) as { name: string };
    changed.name = `${changed.name} fixture`;
    const output = syncCharacterCardPng(png, changed);
    const before = parsePngChunks(png);
    const after = parsePngChunks(output);
    const beforeNonChara = before.filter((chunk) => chunk.keyword !== 'chara').map((chunk) => chunk.raw);
    const afterNonChara = after.filter((chunk) => chunk.keyword !== 'chara').map((chunk) => chunk.raw);

    expect(afterNonChara).toEqual(beforeNonChara);
    expect(after.filter((chunk) => chunk.keyword === 'chara')).toHaveLength(1);
    expect(readCharacterCardPng(output)).toEqual(changed);
    for (const chunk of after) {
      const crcInput = Buffer.concat([Buffer.from(chunk.type, 'ascii'), chunk.data]);
      expect(chunk.raw.readUInt32BE(chunk.raw.length - 4), chunk.type).toBe(crc32(crcInput));
    }
  });

  it('rejects an invalid PNG signature', async () => {
    const { png } = await fixture();
    const invalid = Buffer.from(png);
    invalid[0] = invalid[0]! ^ 0xff;
    expect(() => parsePngChunks(invalid)).toThrow(/signature/iu);
  });

  it('rejects truncated PNG data', async () => {
    const { png } = await fixture();
    expect(() => parsePngChunks(png.subarray(0, png.length - 1))).toThrow(/truncat/iu);
  });

  it('rejects a chunk with a bad CRC', async () => {
    const { png } = await fixture();
    const invalid = Buffer.from(png);
    invalid[20] = invalid[20]! ^ 0x01;
    expect(() => parsePngChunks(invalid)).toThrow(/CRC/iu);
  });

  it('rejects a PNG without IEND', async () => {
    const { png } = await fixture();
    expect(() => parsePngChunks(png.subarray(0, png.length - 12))).toThrow(/IEND/iu);
  });

  it('rejects missing and duplicate chara chunks', async () => {
    const { png } = await fixture();
    const chunks = parsePngChunks(png);
    const signature = png.subarray(0, 8);
    const chara = chunks.find((chunk) => chunk.keyword === 'chara');
    expect(chara).toBeDefined();
    const withoutChara = Buffer.concat([signature, ...chunks.filter((chunk) => chunk.keyword !== 'chara').map((chunk) => chunk.raw)]);
    const duplicateChara = Buffer.concat([
      signature,
      ...chunks.flatMap((chunk) => chunk.type === 'IEND' && chara ? [chara.raw, chara.raw, chunk.raw] : chunk.keyword === 'chara' ? [] : [chunk.raw]),
    ]);

    expect(() => readCharacterCardPng(withoutChara)).toThrow(/missing.*chara/iu);
    expect(() => readCharacterCardPng(duplicateChara)).toThrow(/duplicate.*chara/iu);
    expect(() => syncCharacterCardPng(withoutChara, {})).toThrow(/missing.*chara/iu);
  });
});
