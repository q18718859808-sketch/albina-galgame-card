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
const releaseJsonPath = join(projectRoot, 'release/github-cdn-root/card/albina.card.json');
const releasePngPath = join(projectRoot, 'release/github-cdn-root/card/albina.card.png');
const jsonPath = join(projectRoot, 'card/albina.card.json');

async function fixture(): Promise<{ card: unknown; png: Buffer }> {
  const [json, png] = await Promise.all([readFile(jsonPath, 'utf8'), readFile(pngPath)]);
  return { card: JSON.parse(json) as unknown, png };
}

const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = (value >>> 1) ^ (0xedb88320 & -(value & 1));
  return value >>> 0;
});

function crc32(bytes: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff]!;
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type: Buffer, data: Buffer, crcType = type): Buffer {
  const raw = Buffer.alloc(data.length + 12);
  raw.writeUInt32BE(data.length, 0);
  type.copy(raw, 4);
  data.copy(raw, 8);
  raw.writeUInt32BE(crc32(Buffer.concat([crcType, data])), raw.length - 4);
  return raw;
}

function replaceChara(png: Buffer, raw: Buffer): Buffer {
  const chunks = parsePngChunks(png);
  return Buffer.concat([
    png.subarray(0, 8),
    ...chunks.map((chunk) => chunk.keyword === 'chara' ? raw : chunk.raw),
  ]);
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

  it('embeds the proven Tavern Helper static-import protocol in canonical and release cards', async () => {
    const expectedContent = "import 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.4/dist/albina-galgame-card/source/albina-classic-loader.js'\n";
    const [canonicalJson, canonicalPng, releaseJson, releasePng] = await Promise.all([
      readFile(jsonPath, 'utf8').then((source) => JSON.parse(source) as Record<string, unknown>),
      readFile(pngPath).then(readCharacterCardPng),
      readFile(releaseJsonPath, 'utf8').then((source) => JSON.parse(source) as Record<string, unknown>),
      readFile(releasePngPath).then(readCharacterCardPng),
    ]);
    expect(canonicalPng).toEqual(canonicalJson);
    expect(releaseJson).toEqual(canonicalJson);
    expect(releasePng).toEqual(canonicalJson);

    const card = canonicalJson as {
      data: { extensions: { tavern_helper: { scripts: Array<Record<string, unknown>>; variables: Record<string, unknown> } } };
    };
    const helper = card.data.extensions.tavern_helper;
    expect(helper.variables).toEqual({});
    expect(helper.scripts).toHaveLength(1);
    expect(helper.scripts[0]).toMatchObject({
      type: 'script',
      enabled: true,
      name: 'Albina',
      id: '7f664fa2-7123-484f-bafb-bc812ae1103f',
      content: expectedContent,
      info: '',
      button: { enabled: true, buttons: [{ name: '打开阿尔比娜前端', visible: true }] },
      data: {},
    });
    expect(Object.keys(helper.scripts[0] ?? {}).sort()).toEqual(
      ['button', 'content', 'data', 'enabled', 'id', 'info', 'name', 'type'].sort(),
    );
  });

  it('is byte-idempotent when already synchronized', async () => {
    const { card, png } = await fixture();
    expect(syncCharacterCardPng(png, card).equals(png)).toBe(true);
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

    expect(afterNonChara).toHaveLength(beforeNonChara.length);
    for (const [index, raw] of afterNonChara.entries()) {
      expect(raw.equals(beforeNonChara[index]!), `non-chara chunk ${index}`).toBe(true);
    }
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

  it('checks CRC against the original four type bytes', async () => {
    const { png } = await fixture();
    const chara = parsePngChunks(png).find((chunk) => chunk.keyword === 'chara');
    expect(chara).toBeDefined();
    const rawType = Buffer.from([0xf4, 0x45, 0x58, 0x74]);
    const normalizedType = Buffer.from('tEXt', 'ascii');
    const forged = pngChunk(rawType, chara!.data, normalizedType);

    expect(() => parsePngChunks(replaceChara(png, forged))).toThrow(/CRC/iu);
  });

  it('rejects non-UTF-8 chara JSON instead of replacing invalid bytes', async () => {
    const { png } = await fixture();
    const invalidJson = Buffer.from([0x7b, 0x22, 0x78, 0x22, 0x3a, 0x22, 0xc0, 0xaf, 0x22, 0x7d]);
    const payload = Buffer.from(`chara\0${invalidJson.toString('base64')}`, 'latin1');
    const crafted = replaceChara(png, pngChunk(Buffer.from('tEXt', 'ascii'), payload));

    expect(() => readCharacterCardPng(crafted)).toThrow(/UTF-8/iu);
  });

  it('rejects high-bit bytes that Node ASCII decoding would alias into base64', async () => {
    const { png } = await fixture();
    const payload = Buffer.concat([Buffer.from('chara\0', 'latin1'), Buffer.from([0xe5]), Buffer.from('30=', 'latin1')]);
    const crafted = replaceChara(png, pngChunk(Buffer.from('tEXt', 'ascii'), payload));

    expect(() => readCharacterCardPng(crafted)).toThrow(/base64/iu);
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
