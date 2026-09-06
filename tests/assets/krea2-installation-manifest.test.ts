import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('installed Krea2 community routes', () => {
  it('records fixed commits and object-info verified nodes for independent routes', async () => {
    const manifest = JSON.parse(await readFile('content/media-production/krea2-installation-manifest-v1.json', 'utf8'));
    expect(manifest.comfyui.objectInfoVerification).toBe(true);
    expect(manifest.routes.length).toBeGreaterThanOrEqual(5);
    for (const route of manifest.routes) {
      expect(route.commit).toMatch(/^[a-f0-9]{40}$/u);
      expect(route.license).toBeTruthy();
      expect(route.loadStatus).toBe('verified-object-info');
      expect(route.loadedNodes.length).toBeGreaterThan(0);
      expect(route.installedDirectory).toBeTruthy();
    }
    const style = manifest.routes.find((route: { id: string }) => route.id === 'krea2-style-transfer-community');
    expect(style.routePurpose).toMatch(/style/i);
  });
});
