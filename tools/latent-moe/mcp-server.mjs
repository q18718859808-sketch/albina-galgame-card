#!/usr/bin/env node
import { LatentMoeClient, LatentMoeError } from '../media/dist/src/latent-moe-client.js';

const client = new LatentMoeClient();
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
    try {
      void handle(JSON.parse(line));
    } catch {
      reply(null, undefined, { code: -32700, message: 'Parse error' });
    }
  }
}

async function handle(message) {
  if (message.method === 'initialize') return reply(message.id, { protocolVersion: '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'albina-latent-moe', version: '1.0.0' } });
  if (message.method === 'notifications/initialized') return;
  if (message.method === 'tools/list') return reply(message.id, { tools: toolDefinitions() });
  if (message.method !== 'tools/call') return reply(message.id, undefined, { code: -32601, message: 'Method not found' });
  try { return reply(message.id, { content: [{ type: 'text', text: JSON.stringify(await callTool(message.params?.name, message.params?.arguments ?? {})) }] }); }
  catch (error) { const safe = error instanceof LatentMoeError ? error.code : 'tool_failed'; return reply(message.id, { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: safe }) }] }); }
}

function toolDefinitions() { return [
  { name: 'latent_status', description: 'Check Latent.moe workers and queue without exposing credentials.', inputSchema: { type: 'object', properties: {} } },
  { name: 'latent_generate', description: 'Validate a Latent.moe request; defaults to dry-run. Set execute=true to submit after worker preflight.', inputSchema: { type: 'object', required: ['prompt'], properties: { prompt: { type: 'string' }, negativePrompt: { type: 'string' }, seed: { type: 'integer', minimum: 0 }, resolution: { enum: ['square', 'portrait', 'landscape'] }, steps: { type: 'integer', minimum: 8, maximum: 16 }, sampler: { enum: ['euler', 'euler_ancestral', 'dpmpp_2s_ancestral', 'dpmpp_2m', 'dpmpp_sde', 'dpmpp_2m_sde', 'ddim'] }, scheduler: { enum: ['karras', 'beta', 'normal', 'simple', 'exponential'] }, execute: { type: 'boolean' } } } },
  { name: 'latent_poll', description: 'Poll one user-supplied Latent.moe generation job.', inputSchema: { type: 'object', required: ['jobId'], properties: { jobId: { type: 'string', minLength: 8 } } } },
  { name: 'latent_cancel', description: 'Cancel one active Latent.moe generation job.', inputSchema: { type: 'object', required: ['jobId'], properties: { jobId: { type: 'string', minLength: 8 } } } },
  { name: 'latent_fetch_media', description: 'Download a successful Latent.moe artwork into memory and return its hash.', inputSchema: { type: 'object', required: ['artworkId'], properties: { artworkId: { type: 'string', minLength: 8 }, size: { enum: ['preview', 'original'] } } } },
  { name: 'latent_resolve_public', description: 'Find public SFW reference metadata; never promotes or downloads an asset.', inputSchema: { type: 'object', required: ['tags'], properties: { tags: { type: 'array', minItems: 1, maxItems: 12, items: { type: 'string' } }, source: { type: 'string' }, model: { type: 'string' }, rank: { type: 'integer', minimum: 1 }, size: { enum: ['thumb', 'preview', 'original'] } } } },
]; }

async function callTool(name, args) {
  if (name === 'latent_status') return client.status();
  if (name === 'latent_generate') { const { execute, ...input } = args; return client.generate(input, { execute: execute === true }); }
  if (name === 'latent_poll') return client.poll(args.jobId);
  if (name === 'latent_cancel') return client.cancel(args.jobId);
  if (name === 'latent_fetch_media') { const media = await client.fetchMedia(args.artworkId, args.size); return { artworkId: media.artworkId, mimeType: media.mimeType, sha256: media.sha256, bytes: media.bytes.byteLength, promotionAllowed: false }; }
  if (name === 'latent_resolve_public') return client.resolvePublic(args);
  throw new LatentMoeError('unknown_tool');
}

function reply(id, result, error) { process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, ...(error ? { error } : { result }) })}\n`); }
