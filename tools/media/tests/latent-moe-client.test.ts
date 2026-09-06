import { describe, expect, it } from 'vitest';
import { LatentMoeClient } from '../src/latent-moe-client.js';

function response(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });
}

describe('Latent.moe client', () => {
  it('does not contact the API or need a key in dry-run mode', async () => {
    let calls = 0;
    const client = new LatentMoeClient({ env: {}, fetcher: async () => { calls += 1; return response({}); } });
    await expect(client.generate({ prompt: 'test', steps: 8 })).resolves.toEqual({ dryRun: true, request: { prompt: 'test', resolution: 'portrait', steps: 8, sampler: 'euler', scheduler: 'normal' } });
    expect(calls).toBe(0);
  });

  it('blocks execution before submit when no worker is online', async () => {
    const urls: string[] = [];
    const client = new LatentMoeClient({ env: { LATENT_MOE_API_KEY: 'redacted-test-token' }, fetcher: async (url) => { urls.push(String(url)); return response({ workersOnline: 0, queued: 0 }); } });
    await expect(client.generate({ prompt: 'test' }, { execute: true })).rejects.toMatchObject({ code: 'no_workers' });
    expect(urls).toHaveLength(1);
    expect(urls[0]).toContain('/api/generate/status');
  });

  it('rejects invalid step counts and never leaks the token in errors', async () => {
    const client = new LatentMoeClient({ env: { LATENT_MOE_API_KEY: 'redacted-test-token' } });
    await expect(client.generate({ prompt: 'test', steps: 17 })).rejects.toMatchObject({ code: 'steps_out_of_range' });
    try { await client.status(); } catch (error) { expect(String(error)).not.toContain('redacted-test-token'); }
  });

  it('polls a completed job and hashes downloaded PNG bytes', async () => {
    let calls = 0;
    const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
    const client = new LatentMoeClient({ env: { LATENT_MOE_API_KEY: 'redacted-test-token' }, sleep: async () => undefined, fetcher: async (url) => { calls += 1; return String(url).includes('/api/media/') ? new Response(png, { headers: { 'content-type': 'image/png' } }) : response({ id: 'job-12345678', status: 'succeeded', artworkId: 'art-12345678' }); } });
    const job = await client.poll('job-12345678');
    const media = await client.fetchMedia(job.artworkId as string);
    expect(job.status).toBe('succeeded');
    expect(media.mimeType).toBe('image/png');
    expect(media.sha256).toHaveLength(64);
    expect(calls).toBe(2);
  });

  it('uses no authorization header for public resolver requests', async () => {
    let headers: Headers | undefined;
    const client = new LatentMoeClient({ env: {}, fetcher: async (_url, init) => { headers = new Headers(init?.headers); return response({ data: { id: 'public-12345678' } }); } });
    await client.resolvePublic({ tags: ['albina'] });
    expect(headers?.has('authorization')).toBe(false);
  });
});
