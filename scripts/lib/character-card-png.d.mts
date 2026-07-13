export interface PngChunk {
  type: string;
  data: Buffer;
  raw: Buffer;
  keyword?: string;
}

export function parsePngChunks(input: Uint8Array): PngChunk[];
export function readCharacterCardPng(input: Uint8Array): unknown;
export function syncCharacterCardPng(input: Uint8Array, card: unknown): Buffer;
