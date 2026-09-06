#!/usr/bin/env node
/** Lightweight protocol check. It lists tools and performs no image generation. */
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const server = spawn('node', ['mcp-server.mjs'], { cwd: import.meta.dirname, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
let buffer = '';
let failed = false;
const timer = setTimeout(() => fail('mcp_smoke_timeout'), 10_000);
server.stdout.setEncoding('utf8');
server.stdout.on('data', (chunk) => {
  buffer += chunk;
  let index;
  while ((index = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, index).trim();
    buffer = buffer.slice(index + 1);
    if (!line) continue;
    const message = JSON.parse(line);
    if (message.id === 1) send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
    if (message.id === 2) {
      const names = message.result?.tools?.map((tool) => tool.name) ?? [];
      const required = ['albina_production_status', 'albina_list_jobs', 'albina_variant_production_contract', 'albina_latent_status', 'albina_run_krea2_job', 'albina_run_staged_variant', 'albina_run_reference_conditioned_pilot', 'albina_latent_generate', 'albina_latent_cancel', 'albina_record_direct_review', 'albina_promotion_check'];
      if (!required.every((name) => names.includes(name))) fail(`missing_tools:${required.filter((name) => !names.includes(name)).join(',')}`);
      clearTimeout(timer);
      console.log(JSON.stringify({ ok: true, toolCount: names.length, required }, null, 2));
      server.kill();
    }
  }
});
server.stderr.on('data', (chunk) => { if (!failed) process.stderr.write(chunk); });
server.on('error', (error) => fail(error.message));
server.on('close', (code) => { if (code && !failed) fail(`server_exit_${code}`); });
send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'albina-production-smoke', version: '1.0.0' } } });

function send(message) { server.stdin.write(`${JSON.stringify(message)}\n`); }
function fail(message) {
  if (failed) return;
  failed = true;
  clearTimeout(timer);
  server.kill();
  console.error(message);
  process.exitCode = 1;
}
