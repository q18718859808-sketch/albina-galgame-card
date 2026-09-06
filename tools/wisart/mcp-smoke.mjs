#!/usr/bin/env node
/** Protocol check for WisArt tools; dry-run only, no API call. */
import { spawn } from 'node:child_process';

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
    let message;
    try { message = JSON.parse(line); } catch { fail('invalid_json_response'); return; }
    if (message.id === 1) send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
    if (message.id === 2) {
      const tools = message.result?.tools ?? [];
      const names = tools.map((tool) => tool.name);
      const required = ['wisart_status', 'wisart_generate', 'wisart_edit'];
      if (!required.every((name) => names.includes(name))) { fail(`missing_tools:${required.filter((name) => !names.includes(name)).join(',')}`); return; }
      const generate = tools.find((tool) => tool.name === 'wisart_generate');
      const edit = tools.find((tool) => tool.name === 'wisart_edit');
      if (!generate?.inputSchema?.properties?.execute || !edit?.inputSchema?.properties?.imageBase64) { fail('incomplete_schema'); return; }
      send({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'wisart_generate', arguments: { prompt: 'smoke', width: 64, height: 64 } } });
    }
    if (message.id === 3) {
      const text = message.result?.content?.[0]?.text ?? '';
      if (!text.includes('"dryRun":true') || !text.includes('"promotionAllowed":false')) { fail('dry_run_failed'); return; }
      clearTimeout(timer);
      console.log(JSON.stringify({ ok: true, toolCount: 3, required: ['wisart_status', 'wisart_generate', 'wisart_edit'], dryRun: true }, null, 2));
      server.kill();
    }
  }
});
server.stderr.on('data', (chunk) => { if (!failed) process.stderr.write(chunk); });
server.on('error', (error) => fail(error.message));
server.on('close', (code) => { if (code && !failed) fail(`server_exit_${code}`); });
send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'albina-wisart-smoke', version: '1.0.0' } } });

function send(message) { server.stdin.write(`${JSON.stringify(message)}\n`); }
function fail(message) {
  if (failed) return;
  failed = true;
  clearTimeout(timer);
  server.kill();
  console.error(message);
  process.exitCode = 1;
}
