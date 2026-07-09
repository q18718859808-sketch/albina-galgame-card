/* ============================================================
 * Albina Bridge - Rich Tag Parser v1.0.42
 * 借鉴 bigmalove/galgame v1.2 src/logic/parser.js 的完整标签语法
 * 支持 12 种富标签: <p> <sprite> <maintext> <background>
 *   <bgm> <pixiPerform> <pixiInit> <弹窗一> <弹窗二> <option>
 *   <bgimg> <whimg>
 * + COT 模板注入 (借鉴 cot-template.js)
 * ============================================================ */
(function () {
  'use strict';

  const RE_TAGS = /<(p|sprite|maintext|background|bgm|pixiPerform|pixiInit|弹窗一|弹窗二|option|bgimg|whimg|bnimg)([^>]*)>([\s\S]*?)<\/\1>/gi;
  const RE_ATTR = /(\w+)="([^"]*)"/g;
  const RE_CLOSED_P = /<\/p>/i;
  const PARSE_CACHE_MAX = 30;
  const _cache = new Map();

  // 表情映射 (借鉴 bigmalove EXPRESSION_LIST 10 种)
  const EXPRESSION_LIST = ['默认', '微笑', '生气', '难过', '惊讶', '嘲讽', '害羞', '思考', '大笑', '搞怪'];
  const EXPRESSION_TAG_MAP = {
    '默认': 'neutral', '微笑': 'smile', '生气': 'angry', '难过': 'sad',
    '惊讶': 'surprised', '嘲讽': 'sarcastic', '害羞': 'shy', '思考': 'think',
    '大笑': 'laugh', '搞怪': 'silly',
  };

  // Albina 现有立绘变体到标准表情的映射 (容错回退)
  const ALBINA_SPRITE_FALLBACK = {
    'angry': 'furious', 'surprised': 'amused', 'sarcastic': 'amused',
    'think': 'focused', 'laugh': 'smile', 'silly': 'amused',
    'normal': 'normal', 'smile': 'smile', 'sad': 'sad', 'shy': 'shy',
  };

  function parseAttrs(attrStr) {
    const attrs = {};
    let m;
    RE_ATTR.lastIndex = 0;
    while ((m = RE_ATTR.exec(attrStr)) !== null) attrs[m[1]] = m[2];
    return attrs;
  }

  function parse(text) {
    if (!text) return emptyResult();
    const cacheKey = text.length + ':' + text.slice(0, 64);
    if (_cache.has(cacheKey)) return _cache.get(cacheKey);
    const result = emptyResult();
    result.rawText = text;
    result.isStreaming = !RE_CLOSED_P.test(text);
    let m;
    RE_TAGS.lastIndex = 0;
    while ((m = RE_TAGS.exec(text)) !== null) {
      const tag = m[1].toLowerCase();
      const attrs = parseAttrs(m[2] || '');
      const inner = (m[3] || '').trim();
      switch (tag) {
        case 'p':
          result.segments.push({
            type: attrs.speaker ? 'dialogue' : 'narration',
            speaker: attrs.speaker || '',
            expression: attrs.expr || '',
            text: inner,
          });
          break;
        case 'sprite':
          result.sprites.push({
            action: attrs.action || 'enter',
            id: attrs.id || '',
            expr: attrs.expr || '默认',
            x: attrs.x || 'auto',
          });
          break;
        case 'maintext':
          result.mainTexts.push(inner);
          break;
        case 'background':
          result.backgrounds.push({ scene: attrs.scene || inner, transition: attrs.transition || 'fade' });
          break;
        case 'bgm':
          result.bgms.push(inner);
          break;
        case 'pixiperform':
          result.effects.push({ action: 'perform', name: attrs.type || 'rain', duration: parseFloat(attrs.duration) || 4000 });
          break;
        case 'pixiinit':
          result.effects.push({ action: 'init', config: inner });
          break;
        case '弹窗一':
          result.popups.push({ slot: 1, text: inner });
          break;
        case '弹窗二':
          result.popups.push({ slot: 2, text: inner });
          break;
        case 'option':
          result.options.push({ id: attrs.id || '', text: inner });
          break;
        case 'bgimg':
          result.bgImages.push(inner);
          break;
        case 'whimg':
          result.whImages.push(inner);
          break;
        case 'bnimg':
          result.bnImages.push(inner);
          break;
      }
    }
    if (result.segments.length === 0 && !result.isStreaming) {
      result.segments.push({ type: 'narration', speaker: '', expression: '', text: text.replace(RE_TAGS, '').trim() });
    }
    if (_cache.size >= PARSE_CACHE_MAX) {
      const firstKey = _cache.keys().next().value;
      _cache.delete(firstKey);
    }
    _cache.set(cacheKey, result);
    return result;
  }

  function emptyResult() {
    return {
      segments: [], sprites: [], mainTexts: [], backgrounds: [],
      bgms: [], effects: [], popups: [], options: [],
      bgImages: [], whImages: [], bnImages: [],
      rawText: '', isStreaming: false,
      currentBackground: null, bgm: null,
    };
  }

  function normalizeExpression(expr) {
    if (!expr) return 'normal';
    if (EXPRESSION_TAG_MAP[expr]) return EXPRESSION_TAG_MAP[expr];
    const lower = expr.toLowerCase();
    if (ALBINA_SPRITE_FALLBACK[lower]) return ALBINA_SPRITE_FALLBACK[lower];
    return expr;
  }

  function getAlbinaSpritePath(characterId, expression) {
    const normalized = normalizeExpression(expression);
    if (characterId === 'albina') {
      const variants = ['normal', 'smile', 'sad', 'shy', 'amused', 'focused', 'furious', 'armored', 'combat', 'maestro', 'surgical', 'unarmored', 'white-canvas', 'wounded', 'endgame', 'golden-bough', 'ring-conspiracy', 'rain', 'fascia-open'];
      if (variants.indexOf(normalized) >= 0) return 'assets/characters/albina/' + normalized + '.png';
      return 'assets/characters/albina/normal.png';
    }
    return 'assets/characters/' + characterId + '/' + normalized + '.png';
  }

  // ---- COT 模板 (借鉴 bigmalove cot-template.js) ----
  const COT_TEMPLATE = `[Galgame输出格式规范]
请严格按照以下格式输出 Galgame 内容，使用富标签:

<背景切换>
<background scene="场景ID" transition="fade">场景描述</background>

<立绘控制>
<sprite id="角色ID" expr="表情" action="enter|exit">
表情可选: 默认/微笑/生气/难过/惊讶/嘲讽/害羞/思考/大笑/搞怪

<对话段落>
<p speaker="角色名" expr="表情">对话内容</p>

<旁白>
<maintext>旁白文字</maintext>

<背景音乐>
<bgm>曲目关键词</bgm>

<PIXI特效>
<pixiPerform type="rain|snow|cherryBlossoms|fog|fireflies|embers|screenFlash" duration="4000">

<弹窗提示>
<弹窗一>提示文字</弹窗一>
<弹窗二>次要提示</弹窗二>

<选项>
<option id="opt1">选项文字</option>`;

  function injectCOT() {
    let existing = document.querySelector('#albina-cot-injection');
    if (existing) return;
    const style = document.createElement('style');
    style.id = 'albina-cot-injection';
    style.textContent = '';
    document.head.appendChild(style);
    console.log('[AlbinaParser] COT template ready for worldbook injection');
    window.dispatchEvent(new CustomEvent('albina:cot-ready', { detail: { template: COT_TEMPLATE } }));
  }

  // ---- 段落状态机 (借鉴 messageSegmentState) ----
  const _segmentStates = new Map();

  function getSegmentState(mesId) {
    if (!_segmentStates.has(mesId)) {
      _segmentStates.set(mesId, { mesId, currentIndex: 0, segments: [], renderToken: 0, lastAppliedEffectIndex: -1 });
    }
    return _segmentStates.get(mesId);
  }

  function advanceSegment(mesId) {
    const state = getSegmentState(mesId);
    state.renderToken++;
    if (state.currentIndex < state.segments.length - 1) {
      state.currentIndex++;
      return state.segments[state.currentIndex];
    }
    return null;
  }

  function rewindSegment(mesId) {
    const state = getSegmentState(mesId);
    state.renderToken++;
    if (state.currentIndex > 0) {
      state.currentIndex--;
      return state.segments[state.currentIndex];
    }
    return null;
  }

  function setSegments(mesId, segments) {
    const state = getSegmentState(mesId);
    state.segments = segments;
    state.currentIndex = 0;
    state.renderToken++;
    state.lastAppliedEffectIndex = -1;
  }

  function clearSegmentState(mesId) { _segmentStates.delete(mesId); }

  window.AlbinaRichParser = {
    parse, normalizeExpression, getAlbinaSpritePath,
    EXPRESSION_LIST, EXPRESSION_TAG_MAP, COT_TEMPLATE, injectCOT,
    getSegmentState, advanceSegment, rewindSegment, setSegments, clearSegmentState,
    RE_TAGS, RE_CLOSED_P,
  };
})();
