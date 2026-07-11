import { mkdir, open, rename, stat } from 'node:fs/promises';
import { dirname } from 'node:path';

import type { FetchLike } from './pie-client.js';
import { retry } from './retry.js';

interface DownloadOptions {
  fetcher?: FetchLike;
  attempts?: number;
}

export async function downloadResumable(url: string, destination: string, options: DownloadOptions = {}): Promise<void> {
  await mkdir(dirname(destination), { recursive: true });
  const partial = `${destination}.part`;
  const offset = await fileSize(partial);
  const fetcher = options.fetcher ?? fetch;
  const response = await retry(
    async () => {
      const headers = new Headers();
      if (offset > 0) headers.set('range', `bytes=${offset}-`);
      const result = await fetcher(url, { headers });
      if (!result.ok) throw Object.assign(new Error(`Download failed with HTTP ${result.status}`), { status: result.status });
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

async function fileSize(path: string): Promise<number> {
  try {
    return (await stat(path)).size;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return 0;
    throw error;
  }
}
