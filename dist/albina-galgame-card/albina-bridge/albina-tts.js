/* ============================================================
 * Albina Bridge - TTS Adapter v1.0.42
 * 借鉴 bigmalove/galgame v1.2 src/audio/edge-tts-direct.js 的思路
 * 简化版: 直接使用浏览器内置 SpeechSynthesis API (零依赖)
 * + 可选 edge-tts 直连 (需 WebSocket, 受 CSP 限制)
 * ============================================================ */
(function () {
  'use strict';

  let _enabled = false;
  let _autoPlay = true;
  let _currentUtterance = null;
  let _voiceMap = {};
  let _defaultVoice = null;

  const FALLBACK_VOICES = [
    { name: 'zh-CN-Xiaoxiao', lang: 'zh-CN', gender: 'female' },
    { name: 'zh-CN-Yunxi', lang: 'zh-CN', gender: 'male' },
    { name: 'ja-JP-Nanami', lang: 'ja-JP', gender: 'female' },
    { name: 'en-US-Jenny', lang: 'en-US', gender: 'female' },
  ];

  function init() {
    if (!('speechSynthesis' in window)) {
      console.warn('[AlbinaTTS] SpeechSynthesis API not available');
      return false;
    }
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    console.log('[AlbinaTTS] initialized with', Object.keys(_voiceMap).length, 'voices');
    return true;
  }

  function loadVoices() {
    const voices = speechSynthesis.getVoices();
    _voiceMap = {};
    voices.forEach(function (v) {
      const key = v.lang + ':' + v.name;
      _voiceMap[key] = v;
      if (!_defaultVoice && v.lang.startsWith('zh')) _defaultVoice = v;
      if (!_defaultVoice && v.lang.startsWith('ja')) _defaultVoice = v;
      if (!_defaultVoice) _defaultVoice = v;
    });
  }

  function getVoice(characterId) {
    const stored = localStorage.getItem('albina_tts_voice_' + characterId);
    if (stored && _voiceMap[stored]) return _voiceMap[stored];
    return _defaultVoice;
  }

  function setVoice(characterId, voiceKey) {
    localStorage.setItem('albina_tts_voice_' + characterId, voiceKey);
  }

  function speak(text, characterId) {
    if (!_enabled || !text || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = getVoice(characterId);
    if (voice) { utter.voice = voice; utter.lang = voice.lang; }
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.volume = 1.0;
    _currentUtterance = utter;
    utter.onstart = function () {
      window.dispatchEvent(new CustomEvent('albina:tts-start', { detail: { characterId } }));
    };
    utter.onend = function () {
      _currentUtterance = null;
      window.dispatchEvent(new CustomEvent('albina:tts-end', { detail: { characterId } }));
    };
    utter.onerror = function (e) {
      console.warn('[AlbinaTTS] error:', e.error);
      _currentUtterance = null;
    };
    speechSynthesis.speak(utter);
  }

  function stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    _currentUtterance = null;
  }

  function toggle() {
    _enabled = !_enabled;
    if (!_enabled) stop();
    localStorage.setItem('albina_tts_enabled', _enabled ? '1' : '0');
    return _enabled;
  }

  function isEnabled() { return _enabled; }
  function setEnabled(v) { _enabled = v; localStorage.setItem('albina_tts_enabled', v ? '1' : '0'); }
  function isAutoPlay() { return _autoPlay; }
  function setAutoPlay(v) { _autoPlay = v; }

  _enabled = localStorage.getItem('albina_tts_enabled') === '1';

  function listVoices() {
    return Object.keys(_voiceMap).map(function (k) {
      const v = _voiceMap[k];
      return { key: k, name: v.name, lang: v.lang, voiceURI: v.voiceURI };
    });
  }

  window.AlbinaTTS = {
    init, speak, stop, toggle,
    isEnabled, setEnabled, isAutoPlay, setAutoPlay,
    getVoice, setVoice, listVoices,
    get currentUtterance() { return _currentUtterance; },
  };
})();
