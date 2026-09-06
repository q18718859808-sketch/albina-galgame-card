import { mkdir, open, rename, stat } from 'node:fs/promises';
import { dirname } from 'node:path';

import type { FetchLike } from './pie-client.js';
import { assertHttpsArtifactUrl, ProviderContractError } from './provider.js';
import { retry } from './retry.js';

interface DownloadOptions {
  fetcher?: FetchLike;
  attempts?: number;
}

export async function downloadResumable(url: string, destination: string, options: DownloadOptions = {}): Promise<void> {
  assertHttpsArtifactUrl(url);
  await mkdir(dirname(destination), { recursive: true });
  const partial = `${destination}.part`;
  const offset = await fileSize(partial);
  const fetcher = options.fetcher ?? fetch;
  const response = await retry(
    async () => {
      const headers = new Headers();
      if (offset > 0) headers.set('range', `bytes=${offset}-`);
      const result = await fetchWithValidatedRedirects(fetcher, url, headers);
      if (!result.ok) throw Object.assign(new Error(`Download failed with HTTP ${result.status}`), { status: result.status });
      if (result.url) assertHttpsArtifactUrl(result.url);
      return result;
    },
    { attempts: options.attempts ?? 4 },
  );
  const append = offset > 0 && response.status === 206;
  const handle = await open(partial, append ? 'a' : 'w');
  try {
    await handle.writeFile(Buffer.from(await response.arrayBuffer()));
  } finally {
    await handle.close();
  }
  await rename(partial, destination);
}

async function fetchWithValidatedRedirects(fetcher: FetchLike, initialUrl: string, headers: Headers): Promise<Response> {
  let url = assertHttpsArtifactUrl(initialUrl).href;
  for (let redirects = 0; redirects <= 5; redirects += 1) {
    const response = await fetcher(url, { headers, redirect: 'manual' });
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get('location');
    if (!location) throw new ProviderContractError('Artifact redirect is missing a Location header');
    url = assertHttpsArtifactUrl(new URL(location, url).href).href;
  }
  throw new ProviderContractError('Artifact download exceeded the redirect limit');
}

async function fileSize(path: string): Promise<number> {
  try {
    return (await stat(path)).size;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return 0;
    throw error;
  }
}
