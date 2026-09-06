import { describe, expect, it } from 'vitest';

import { resolveAlbinaPagehideWindow } from '../../src/main';

describe('Albina launcher host lifecycle boundary', () => {
  it('registers pagehide on the selected host window only', () => {
    const iframeWindow = {} as Window;
    const hostWindow = {} as Window;

    expect(resolveAlbinaPagehideWindow(iframeWindow, hostWindow)).toBe(hostWindow);
    expect(resolveAlbinaPagehideWindow(hostWindow, hostWindow)).toBe(hostWindow);
  });
});
