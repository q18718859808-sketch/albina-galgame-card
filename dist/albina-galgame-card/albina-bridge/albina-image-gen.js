/* ============================================================
 * Albina Bridge - Image Generation Adapter v1.0.42
 * 借鉴 bigmalove/galgame v1.2 src/image-gen/ 的多后端策略
 * 适配 Wallhaven (免 API key 搜索) + 本地资产生成接口
 * Wallhaven 路径不依赖 SillyTavern, 可直接用
 * ============================================================ */
(function () {
  'use strict';

  const PROXY_FALLBACKS = [
    function (url) { return url; },
    function (url) { return 'https://corsproxy.io/?' + encodeURIComponent(url); },
    function (url) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url); },
    function (url) { return 'https://api.codetabs.com/v1/proxy/?quest=' + encodeURIComponent(url); },
  ];

  const TAG_MAPPING = {
    '教室': 'classroom', '学校': 'school', '图书馆': 'library', '书房': 'study',
    '书房': 'study', '教堂': 'church', '城堡': 'castle', '森林': 'forest',
    '雨夜': 'rain night', '后巷': 'alley', '街道': 'street', '室内': 'interior',
    '夜景': 'night', '天空': 'sky', '废墟': 'ruins', '地下室': 'dungeon',
    '中式': 'asian', '日式': 'asian', '古代': '', '传统': '',
  };

  const _cache = new Map();
  let _lastRequest = 0;
  const MIN_INTERVAL = 1400;

  function optimizeTags(rawTags) {
    if (!rawTags || !rawTags.length) return ['interior'];
    let tags = rawTags.map(function (t) {
      const mapped = TAG_MAPPING[t] !== undefined ? TAG_MAPPING[t] : t;
      return mapped;
    }).filter(function (t) { return t && t.length >= 3 && t.length <= 15; });
    tags = tags.filter(function (v, i, a) { return a.indexOf(v) === i; });
    if (tags.length > 4) tags = tags.slice(0, 4);
    if (tags.length < 2) tags.push('interior');
    return tags;
  }

  async function search(tags) {
    const now = Date.now();
    if (now - _lastRequest < MIN_INTERVAL) await new Promise(function (r) { setTimeout(r, MIN_INTERVAL - (now - _lastRequest)); });
    _lastRequest = Date.now();
    const cacheKey = tags.join(',');
    if (_cache.has(cacheKey)) return _cache.get(cacheKey);
    const query = encodeURIComponent(tags.join(' '));
    const apiUrl = 'https://wallhaven.cc/api/v1/search?q=' + query + '&categories=010&purity=100&sorting=favorites&order=desc';
    for (let i = 0; i < PROXY_FALLBACKS.length; i++) {
      try {
        const proxiedUrl = PROXY_FALLBACKS[i](apiUrl);
        const resp = await fetch(proxiedUrl, { method: 'GET', headers: { 'Accept': 'application/json' } });
        if (!resp.ok) continue;
        const data = await resp.json();
        if (data && data.data && data.data.length > 0) {
          const results = data.data.slice(0, 10).map(function (r) { return r.path; });
          _cache.set(cacheKey, results);
          return results;
        }
      } catch (e) { continue; }
    }
    return [];
  }

  function selectImage(urls) {
    if (!urls || urls.length === 0) return null;
    return urls[Math.floor(Math.random() * urls.length)];
  }

  async function searchAndSelect(tags) {
    const optimized = optimizeTags(tags);
    const results = await search(optimized);
    return selectImage(results);
  }

  // ---- 背景保存到 IndexedDB ----
  async function saveBackgroundToDB(sceneName, url) {
    if (!window.AlbinaAssetDB) return url;
    try {
      const resp = await fetch(url);
      const blob = await resp.blob();
      return await window.AlbinaAssetDB.saveBackground(sceneName, blob, url);
    } catch (e) {
      console.warn('[AlbinaImageGen] saveBackground failed:', e);
      return url;
    }
  }

  // ---- 综合背景获取 (IndexedDB 优先 -> Wallhaven 兜底) ----
  async function getOrGenerateBackground(sceneName, tags) {
    if (window.AlbinaAssetDB) {
      const cached = await window.AlbinaAssetDB.getBackground(sceneName);
      if (cached) return cached;
    }
    const url = await searchAndSelect(tags || [sceneName]);
    if (url) await saveBackgroundToDB(sceneName, url);
    return url;
  }

  // ---- 本地资产生成接口 (供 daydream/pie-xian API 调用) ----
  async function generateLocal(prompt, outputPath, model, size) {
    if (window.daydream_generate_image) {
      return await window.daydream_generate_image({
        prompt: prompt, output_path: outputPath,
        model: model || 'gpt-image-2', size: size || '1024x1024',
        quality: 'high', output_format: 'png',
      });
    }
    console.warn('[AlbinaImageGen] daydream_generate_image not available - API token may be expired');
    return null;
  }

  // ---- 4 后端路由 (借鉴 bigmalove settings.bgImageSource) ----
  const BACKENDS = {
    wallhaven: { name: 'Wallhaven 搜索', search: searchAndSelect, requiresApiKey: false },
    novelai: { name: 'NovelAI 生图', requiresApiKey: true, apiKeyField: 'novelaiApiKey' },
    comfyui: { name: 'ComfyUI 生图', requiresApiKey: false, requiresLocalServer: true },
    banana: { name: '大香蕉生图 (OpenAI 兼容)', requiresApiKey: true, apiKeyField: 'bananaProxyApiKey' },
  };

  function getBackend(name) { return BACKENDS[name] || BACKENDS.wallhaven; }
  function listBackends() { return Object.keys(BACKENDS).map(function (k) { return Object.assign({ id: k }, BACKENDS[k]); }); }

  window.AlbinaImageGen = {
    search, selectImage, searchAndSelect, optimizeTags, TAG_MAPPING,
    saveBackgroundToDB, getOrGenerateBackground, generateLocal,
    getBackend, listBackends, BACKENDS,
    clearCache: function () { _cache.clear(); },
  };
})();
