import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('layered worldbook package UI', () => {
  it('offers downloads without an unverified host import API', async () => {
    const source = await readFile('src/components/GameplayPanel.vue', 'utf8');
    expect(source).toContain('data-testid="worldbook-packages-page"');
    expect(source).toContain("{ id: 'worldbook-packages', label: '世界书包' }");
    expect(source).toContain('data-testid="worldbook-package-download"');
    expect(source).toContain('normal SillyTavern UI');
    expect(source).not.toContain('saveWorldInfo(');
    expect(source).not.toContain('registerFunctionTool');
  });
});
