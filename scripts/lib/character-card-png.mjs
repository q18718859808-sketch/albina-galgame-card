const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function keywordFor(type, data) {
  if (type !== 'tEXt') return undefined;
  const separator = data.indexOf(0);
  return separator > 0 ? data.subarray(0, separator).toString('latin1') : undefined;
}

export function parsePngChunks(input) {
  const bytes = Buffer.from(input);
  if (bytes.length < PNG_SIGNATURE.length || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error('Invalid PNG signature');
  }
  const chunks = [];
  let offset = PNG_SIGNATURE.length;
  let foundIend = false;
  while (offset < bytes.length) {
    if (bytes.length - offset < 12) throw new Error('Truncated PNG chunk');
    const length = bytes.readUInt32BE(offset);
    const end = offset + 12 + length;
    if (end > bytes.length) throw new Error('Truncated PNG chunk data');
    const type = bytes.subarray(offset + 4, offset + 8).toString('ascii');
    if (!/^[A-Za-z]{4}$/u.test(type)) throw new Error(`Invalid PNG chunk type at ${offset}`);
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    const raw = bytes.subarray(offset, end);
    const actualCrc = crc32(Buffer.concat([Buffer.from(type, 'ascii'), data]));
    if (raw.readUInt32BE(raw.length - 4) !== actualCrc) throw new Error(`Invalid PNG CRC for ${type}`);
    chunks.push({ type, data, raw, keyword: keywordFor(type, data) });
    offset = end;
    if (type === 'IEND') {
      if (length !== 0) throw new Error('Invalid PNG IEND length');
      if (offset !== bytes.length) throw new Error('PNG contains data after IEND');
      foundIend = true;
    }
  }
  if (!foundIend) throw new Error('PNG is missing IEND');
  return chunks;
}

function characterChunk(chunks) {
  const matches = chunks.filter((chunk) => chunk.type === 'tEXt' && chunk.keyword === 'chara');
  if (matches.length === 0) throw new Error('PNG is missing chara metadata');
  if (matches.length > 1) throw new Error('PNG contains duplicate chara metadata');
  return matches[0];
}

function decodeCard(data) {
  const separator = data.indexOf(0);
  const payload = data.subarray(separator + 1).toString('ascii');
  if (payload.length === 0 || payload.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/u.test(payload)) {
    throw new Error('Invalid chara base64 payload');
  }
  const decoded = Buffer.from(payload, 'base64');
  if (decoded.toString('base64') !== payload) throw new Error('Invalid chara base64 payload');
  return JSON.parse(decoded.toString('utf8'));
}

function makeChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const raw = Buffer.allocUnsafe(data.length + 12);
  raw.writeUInt32BE(data.length, 0);
  typeBytes.copy(raw, 4);
  data.copy(raw, 8);
  raw.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), raw.length - 4);
  return raw;
}

function encodedCardData(card) {
  const payload = Buffer.from(JSON.stringify(card), 'utf8').toString('base64');
  return Buffer.from(`chara\0${payload}`, 'latin1');
}

export function readCharacterCardPng(input) {
  const chunk = characterChunk(parsePngChunks(input));
  return decodeCard(chunk.data);
}

export function syncCharacterCardPng(input, card) {
  const bytes = Buffer.from(input);
  const chunks = parsePngChunks(bytes);
  const current = characterChunk(chunks);
  const data = encodedCardData(card);
  if (current.data.equals(data)) return bytes;
  const output = chunks.map((chunk) => chunk === current ? makeChunk('tEXt', data) : chunk.raw);
  return Buffer.concat([PNG_SIGNATURE, ...output]);
}
