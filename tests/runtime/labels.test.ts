import { describe, expect, it } from 'vitest';

import { chapterLabel, formatSaveTime, LOCATION_LABELS, locationLabel, TONE_LABELS, toneLabel } from '../../src/runtime/labels';

describe('display labels for locations and tones', () => {
  it('covers every authored location id with a Chinese label', () => {
    expect(Object.keys(LOCATION_LABELS).sort()).toEqual([
      'backstreets_rain',
      'city_rooftop',
      'golden_bough_fault',
      'lce_lab',
      'lce_research_hallway',
      'lce_research_lab',
      'limbus_bus',
      'mirror_corridor',
      'nest_station',
      'outskirts_dawn',
      'rain_room',
      'ring_atelier',
      'ring_corridor',
      'spider_gallery',
      'white_canvas_room',
    ]);
    expect(locationLabel('lce_research_hallway')).toBe('LCE 研究走廊');
    expect(locationLabel('rain_room')).toBe('雨室');
  });

  it('covers every authored tone id with a Chinese label', () => {
    expect(Object.keys(TONE_LABELS).sort()).toEqual([
      'AU-boundary',
      'canon-recap',
      'canon-recap-outcome',
      'gallery',
      'golden',
      'quiet',
      'rain',
      'threat',
    ]);
    expect(toneLabel('threat')).toBe('威胁');
    expect(toneLabel('quiet')).toBe('静谧');
  });

  it('falls back to the raw id for unmapped identifiers', () => {
    expect(locationLabel('brand_new_area')).toBe('brand_new_area');
    expect(toneLabel('brand_new_tone')).toBeUndefined();
  });

  it('formats ISO save timestamps as compact MM-DD HH:mm and keeps unparseable values', () => {
    // Round-trip through local time so the assertion is timezone-independent.
    const local = new Date(2026, 7, 30, 22, 17, 50).toISOString();
    expect(formatSaveTime(local)).toMatch(/^\d{2}-\d{2} \d{2}:\d{2}$/);
    expect(formatSaveTime(local)).toBe('08-30 22:17');
    expect(formatSaveTime('not-a-date')).toBe('not-a-date');
  });

  it('labels numeric chapters as 序章 / 第n章 and falls back to CH.n for unknown values', () => {
    expect(chapterLabel(0)).toBe('序章');
    expect(chapterLabel(1)).toBe('第一章');
    expect(chapterLabel(10)).toBe('第十章');
    expect(chapterLabel(12)).toBe('第十二章');
    expect(chapterLabel(20)).toBe('第二十章');
    expect(chapterLabel(101)).toBe('第101章');
    expect(chapterLabel(undefined)).toBe('CH.?');
    expect(chapterLabel(-3)).toBe('CH.-3');
  });
});
