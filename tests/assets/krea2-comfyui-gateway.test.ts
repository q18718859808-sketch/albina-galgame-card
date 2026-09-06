import { describe, expect, it, vi } from 'vitest';

import {
  enqueueKrea2Job,
  getKrea2ComfyGatewayConfig,
  getKrea2GatewayQueue,
  getKrea2GatewayRecoverySnapshot,
  getKrea2GatewayStatus,
  interruptKrea2Gateway,
  normalizeKrea2ComfyGatewayUrl,
} from '../../scripts/lib/krea2-comfyui.mjs';

const jsonResponse = (value: unknown, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { 'content-type': 'application/json' },
});

describe('Krea2 ComfyuiGW optional boundary', () => {
  it('documents gateway health as operational-only, outside fidelity and review acceptance', async () => {
    const { readFile } = await import('node:fs/promises');
    const policy = await readFile('docs/KREA2_COMFYUI_GATEWAY.md', 'utf8');
    expect(policy).toContain('Gateway health is operational evidence only.');
    expect(policy).toContain('cannot improve, measure, or certify image fidelity');
    expect(policy).toContain('cannot replace a hash-bound direct review');
  });

  it('is disabled by default and performs no request', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('must not fetch'));
    expect(getKrea2ComfyGatewayConfig({})).toMatchObject({ enabled: false, port: 5050 });
    await expect(getKrea2GatewayStatus({ env: {} })).resolves.toMatchObject({ enabled: false, status: 'disabled' });
    await expect(getKrea2GatewayQueue({ env: {} })).resolves.toMatchObject({ enabled: false, status: 'disabled' });
    expect(fetchMock).not.toHaveBeenCalled();
    fetchMock.mockRestore();
  });

  it('requires explicit loopback port-5050 opt-in', () => {
    expect(getKrea2ComfyGatewayConfig({ ALBINA_COMFY_GATEWAY_ENABLED: '1' })).toMatchObject({
      enabled: true, url: 'http://127.0.0.1:5050', port: 5050,
    });
    expect(() => normalizeKrea2ComfyGatewayUrl('http://example.test:5050')).toThrow(/loopback/);
    expect(() => normalizeKrea2ComfyGatewayUrl('http://127.0.0.1:8199')).toThrow(/port 5050/);
    expect(() => normalizeKrea2ComfyGatewayUrl('https://127.0.0.1:5050')).toThrow(/loopback HTTP/);
  });

  it('uses only monitoring/recovery endpoints and no raw workflow payload', async () => {
    const calls: Array<{ url: string; init: RequestInit | undefined }> = [];
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      calls.push({ url: String(input), init });
      return jsonResponse({ ok: true });
    });
    const env = { ALBINA_COMFY_GATEWAY_ENABLED: 'true', ALBINA_COMFY_GATEWAY_URL: 'http://127.0.0.1:5050' };
    await getKrea2GatewayStatus({ env });
    await getKrea2GatewayQueue({ env });
    await interruptKrea2Gateway({ env });
    expect(calls.map((call) => call.url)).toEqual([
      'http://127.0.0.1:5050/system_stats', 'http://127.0.0.1:5050/queue', 'http://127.0.0.1:5050/interrupt',
    ]);
    expect(calls[0]?.init?.method).toBeUndefined();
    expect(calls[2]?.init?.method).toBe('POST');
    expect(calls.every((call) => !call.url.endsWith('/prompt'))).toBe(true);
    expect(calls[2]?.init?.body).toBeUndefined();
    fetchMock.mockRestore();
  });

  it('keeps direct prompt submission on 8199 even when the gateway is enabled', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(jsonResponse({ prompt_id: 'direct-1', number: 1 }));
    const result = await enqueueKrea2Job({ '1': { class_type: 'SaveImage', inputs: {} } }, {
      comfyUrl: 'http://127.0.0.1:8199',
      env: { ALBINA_COMFY_GATEWAY_ENABLED: '1', ALBINA_COMFY_GATEWAY_URL: 'http://127.0.0.1:5050' },
    });
    expect(result.promptId).toBe('direct-1');
    expect(fetchMock.mock.calls[0]?.[0]).toBe('http://127.0.0.1:8199/prompt');
    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toHaveProperty('prompt.1');
    fetchMock.mockRestore();
  });

  it('combines reads and rejects generation-shaped interrupt input', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => jsonResponse({ ok: true }));
    const env = { ALBINA_COMFY_GATEWAY_ENABLED: '1' };
    await expect(getKrea2GatewayRecoverySnapshot({ env })).resolves.toMatchObject({ enabled: true });
    await expect(interruptKrea2Gateway({ env, workflow: { '1': {} } })).rejects.toThrow(/generation payloads/);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    fetchMock.mockRestore();
  });
});
