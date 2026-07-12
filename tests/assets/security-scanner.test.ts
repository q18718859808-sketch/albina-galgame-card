import { expect, it } from 'vitest';

import { scanText } from '../../scripts/lib/security-scanner.mjs';

it('detects credential-shaped values anywhere while allowing provider endpoints only in offline tools', () => {
  const secret = ['sk', 'fixturecredential0123456789'].join('-');
  expect(scanText('tools/media/fixture.py', `API_KEY = "${secret}"`)).toEqual(['tools/media/fixture.py: credential-shaped value']);
  expect(scanText('tools/media/client.ts', 'const endpoint = "https://api.pie-xian.com/v1/videos";')).toEqual([]);
  expect(scanText('src/runtime-client.ts', 'const endpoint = "https://api.pie-xian.com/v1/videos";')).toEqual(['src/runtime-client.ts: runtime provider endpoint']);
});
