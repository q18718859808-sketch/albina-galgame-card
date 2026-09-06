#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { WisArtApiError, WisArtImageClient } from '../media/dist/src/provider-clients.js';

const client = new WisArtImageClient(process.env);
let buffer = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { buffer += chunk; drain(); });

function drain() {
  for (;;) {
    const newline = buffer.indexOf('\n');
    if (newline < 0) return;
    const line = buffer.slice(0, newline).trim();
    buffer = buffer.slice(newline + 1);
    if (!line) continue;
    try { void handle(JSON.parse(line)); } catch { reply(null, undefined, { code: -32700, message: 'Parse error' }); }
  }
}

async function handle(message) {
  if (message.method === 'initialize') return reply(message.id, { protocolVersion: '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'albina-wisart', version: '1.0.0' } });
  if (message.method === 'notifications/initialized') return;
  if (message.method === 'tools/list') return reply(message.id, { tools: toolDefinitions() });
  if (message.method !== 'tools/call') return reply(message.id, undefined, { code: -32601, message: 'Method not found' });
  try {
    const result = await callTool(message.params?.name, message.params?.arguments ?? {});
    return reply(message.id, { content: [{ type: 'text', text: JSON.stringify(result) }] });
  } catch (error) {
    return reply(message.id, { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: safeError(error) }) }] });
  }
}

function toolDefinitions() {
  return [
    { name: 'wisart_status', description: 'Check WisArt API availability and model metadata without exposing credentials.', inputSchema: { type: 'object', properties: {} } },
    { name: 'wisart_generate', description: 'Generate one image through WisArt gpt-image-2. Defaults to dry-run; execute=true sends a paid request. Never promotes output.', inputSchema: { type: 'object', required: ['prompt', 'width', 'height'], properties: { model: { const: 'gpt-image-2' }, prompt: { type: 'string', minLength: 1, maxLength: 20000 }, width: { type: 'integer', minimum: 1, maximum: 4096 }, height: { type: 'integer', minimum: 1, maximum: 4096 }, execute: { type: 'boolean' } } } },
    { name: 'wisart_edit', description: 'Edit one PNG/JPEG/WebP image through WisArt gpt-image-2. Defaults to dry-run; execute=true sends a paid request. Never promotes output.', inputSchema: { type: 'object', required: ['prompt', 'imageBase64', 'width', 'height'], properties: { model: { const: 'gpt-image-2' }, prompt: { type: 'string', minLength: 1, maxLength: 20000 }, imageBase64: { type: 'string', minLength: 16 }, width: { type: 'integer', minimum: 1, maximum: 4096 }, height: { type: 'integer', minimum: 1, maximum: 4096 }, execute: { type: 'boolean' } } } },
  ];
}

async function callTool(name, args) {
  if (name === 'wisart_status') return status();
  if (name === 'wisart_generate') {
    const input = { model: 'gpt-image-2', prompt: validatePrompt(args.prompt), width: validateDimension(args.width), height: validateDimension(args.height) };
    if (args.execute !== true) return { dryRun: true, request: input, promotionAllowed: false };
    return summarizeArtifact(await client.generateImage(input));
  }
  if (name === 'wisart_edit') {
    const input = { model: 'gpt-image-2', prompt: validatePrompt(args.prompt), image: decodeBase64(args.imageBase64), width: validateDimension(args.width), height: validateDimension(args.height) };
    if (args.execute !== true) return { dryRun: true, request: { ...input, image: '[provided image]' }, promotionAllowed: false };
    return summarizeArtifact(await client.editImage(input));
  }
  throw new Error('unknown_tool');
}

async function status() {
  const key = process.env.WISART_API_KEY;
  if (!key) return { configured: false, error: 'missing_api_key' };
  const response = await fetch(`${client.baseUrl}/models`, { headers: { authorization: `Bearer ${key}` } });
  if (!response.ok) throw new WisArtApiError(response.status);
  const body = await response.json();
  return { configured: true, reachable: true, models: Array.isArray(body?.data) ? body.data.map((item) => typeof item?.id === 'string' ? item.id : null).filter(Boolean) : [] };
}

function validatePrompt(value) {
  if (typeof value !== 'string' || value.length < 1 || value.length > 20000) throw new Error('invalid_prompt');
  return value;
}

function validateDimension(value) {
  if (!Number.isInteger(value) || value < 1 || value > 4096) throw new Error('invalid_dimension');
  return value;
}

function decodeBase64(value) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/u.test(value) || value.length % 4 !== 0) throw new Error('invalid_image_base64');
  const bytes = Buffer.from(value, 'base64');
  if (bytes.byteLength < 12 || bytes.byteLength > 20 * 1024 * 1024) throw new Error('invalid_image_size');
  const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const jpeg = bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]));
  const webp = bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP';
  if (!png && !jpeg && !webp) throw new Error('unsupported_image_format');
  return new Uint8Array(bytes);
}

function summarizeArtifact(artifact) {
  return {
    kind: artifact.kind,
    provider: artifact.provider,
    model: artifact.model,
    mimeType: artifact.mimeType ?? null,
    sourceUrl: artifact.sourceUrl ?? null,
    bytes: artifact.bytes?.byteLength ?? null,
    sha256: artifact.bytes ? createHash('sha256').update(artifact.bytes).digest('hex') : null,
    metadata: artifact.metadata ?? {},
    promotionAllowed: false,
  };
}

function safeError(error) {
  if (error instanceof WisArtApiError) return `http_${error.status}`;
  return error instanceof Error && /^[a-z0-9_-]+$/u.test(error.message) ? error.message : 'tool_failed';
}

function reply(id, result, error) { process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, ...(error ? { error } : { result }) })}\n`); }
