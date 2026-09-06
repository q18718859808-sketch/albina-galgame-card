import { describe, expect, it, vi } from 'vitest';

import { createVfxInteractionChannel } from '../../src/runtime/vfx-interaction';

describe('VFX interaction channel', () => {
  it('maps committed scene changes to one semantic transition', () => {
    const sink = vi.fn();
    const channel = createVfxInteractionChannel(sink);

    channel.commitScene({
      route: 'golden_bough_rebuild',
      sceneId: 'golden_bough_001',
      chapter: 1,
      previousRoute: 'white_canvas',
      previousSceneId: 'opening_001',
      previousChapter: 0,
    });

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink).toHaveBeenCalledWith({ kind: 'route-transition' });
  });

  it('rejects malformed cues and becomes inert after disposal', () => {
    const sink = vi.fn();
    const channel = createVfxInteractionChannel(sink);

    channel.emit({ kind: 'choice-confirm' });
    channel.emit({ kind: 'not-a-cue' } as never);
    channel.dispose();
    channel.emit({ kind: 'ending' });
    channel.commitScene({ route: 'white_canvas', sceneId: 'white_canvas_001', tone: 'threat' });

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink).toHaveBeenCalledWith({ kind: 'choice-confirm' });
  });

  it('deduplicates rapid interaction pulses of the same kind within the cooldown window', () => {
    const sink = vi.fn();
    let clock = 0;
    const channel = createVfxInteractionChannel(sink, () => clock);

    channel.emit({ kind: 'choice-confirm' });
    clock += 80;
    channel.emit({ kind: 'choice-confirm' });
    clock += 120;
    channel.emit({ kind: 'dialogue-emphasis' });

    // First choice-confirm passes; the second is inside the 180ms window; the
    // different kind is a separate bucket and is not suppressed.
    expect(sink).toHaveBeenCalledTimes(2);
    expect(sink).toHaveBeenCalledWith({ kind: 'choice-confirm' });
    expect(sink).toHaveBeenCalledWith({ kind: 'dialogue-emphasis' });
  });

  it('lets the same pulse kind through again once the cooldown window has elapsed', () => {
    const sink = vi.fn();
    let clock = 0;
    const channel = createVfxInteractionChannel(sink, () => clock);

    channel.emit({ kind: 'choice-confirm' });
    clock += 250;
    channel.emit({ kind: 'choice-confirm' });

    expect(sink).toHaveBeenCalledTimes(2);
  });

  it('never rate-limits authored transition beats such as impact or route transitions', () => {
    const sink = vi.fn();
    let clock = 0;
    const channel = createVfxInteractionChannel(sink, () => clock);

    channel.emit({ kind: 'impact' });
    clock += 40;
    channel.emit({ kind: 'impact' });
    clock += 40;
    channel.emit({ kind: 'route-transition' });
    clock += 40;
    channel.emit({ kind: 'route-transition' });

    expect(sink).toHaveBeenCalledTimes(4);
  });
});

