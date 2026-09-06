/**
 * Player-facing display labels for location and tone identifiers.
 *
 * Scene cues author raw machine ids (`lce_research_hallway`, `threat`, ...).
 * These tables map them to the Chinese display labels shown in the HUD
 * scene badge and the save-slot cards. Unknown ids fall back to the raw id
 * so content additions never crash the renderer.
 */

export const LOCATION_LABELS: Readonly<Record<string, string>> = {
  backstreets_rain: '雨幕后街',
  city_rooftop: '城市天台',
  golden_bough_fault: '金枝断层',
  lce_lab: 'LCE 实验室',
  lce_research_hallway: 'LCE 研究走廊',
  lce_research_lab: 'LCE 研究实验室',
  limbus_bus: '巴士车厢',
  mirror_corridor: '镜之回廊',
  nest_station: '巢站',
  outskirts_dawn: '郊外黎明',
  rain_room: '雨室',
  ring_atelier: '环指工坊',
  ring_corridor: '环指回廊',
  spider_gallery: '蛛画廊',
  white_canvas_room: '白画布之屋',
};

export const TONE_LABELS: Readonly<Record<string, string>> = {
  'AU-boundary': '世界线边界',
  'canon-recap': '正史复盘',
  'canon-recap-outcome': '复盘结果',
  gallery: '画廊',
  golden: '金色时刻',
  quiet: '静谧',
  rain: '雨夜',
  threat: '威胁',
};

/** Display label for a location id; falls back to the raw id when unmapped. */
export function locationLabel(locationId: string): string {
  return LOCATION_LABELS[locationId] ?? locationId;
}

/**
 * Display label for a tone id. Returns undefined when the tone is not in the
 * table so callers can hide the badge instead of rendering a raw id.
 */
export function toneLabel(tone: string): string | undefined {
  return TONE_LABELS[tone];
}

/**
 * Compact save timestamp: `MM-DD HH:mm`. Falls back to the raw ISO string
 * when the value is not parseable (e.g. legacy fixtures).
 */
export function formatSaveTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const pad = (value: number): string => String(value).padStart(2, '0');
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Display label for a numeric chapter index: 0 renders as 序章, positive
 * integers as 第n章, and undefined/unknown values fall back to CH.n / CH.?
 * so legacy slots never render a raw blank.
 */
function chineseChapterNumber(value: number): string {
  const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (value < 10) return digits[value] ?? String(value);
  if (value < 20) return value === 10 ? '十' : `十${digits[value - 10]}`;
  if (value < 100) {
    const tens = Math.floor(value / 10);
    const units = value % 10;
    return `${digits[tens]}十${units === 0 ? '' : digits[units]}`;
  }
  return String(value);
}

export function chapterLabel(chapter: number | undefined): string {
  if (chapter === 0) return '序章';
  if (chapter !== undefined && Number.isInteger(chapter) && chapter > 0) return `第${chineseChapterNumber(chapter)}章`;
  return chapter === undefined ? 'CH.?' : `CH.${chapter}`;
}
