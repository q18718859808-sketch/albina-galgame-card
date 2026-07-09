/* ============================================================
 * Albina Bridge - PIXI Effects Engine v1.0.42
 * 借鉴 bigmalove/galgame v1.2 src/effects/ 的架构:
 *   - pixi-loader.js: 多 CDN 候选加载 PIXI 6.5.10
 *   - registry.js: 8 种特效 + canvas 程序化纹理
 *   - pixi-effect-manager.js: bg/fg 双层 + 质量档位 + ticker
 * ============================================================ */
(function () {
  'use strict';

  const PIXI_CANDIDATES = [
    'https://cdn.jsdelivr.net/npm/pixi.js@6.5.10/dist/browser/pixi.min.js',
    'https://gcore.jsdelivr.net/npm/pixi.js@6.5.10/dist/browser/pixi.min.js',
    'https://unpkg.com/pixi.js@6.5.10/dist/browser/pixi.min.js',
  ];

  const SUPPORTED_EFFECTS = ['rain', 'snow', 'heavySnow', 'cherryBlossoms', 'fog', 'fireflies', 'embers', 'screenFlash'];
  const EFFECT_FIXED_LAYER = {
    rain: 'fg', snow: 'fg', heavySnow: 'fg', cherryBlossoms: 'fg',
    fog: 'bg', fireflies: 'fg', embers: 'fg', screenFlash: 'fg',
  };

  const QUALITY_PROFILES = {
    mobile:   { density: 0.62, speed: 0.86, targetFps: 28 },
    balanced: { density: 1.0,  speed: 1.0,  targetFps: 42 },
    high:     { density: 1.35, speed: 1.08, targetFps: 60 },
  };

  let _pixi = null;
  let _loadPromise = null;
  let _bgApp = null;
  let _fgApp = null;
  let _activeEffects = new Map();
  let _quality = 'balanced';
  let _effectsEnabled = true;
  let _maxActive = 2;

  function loadPixi() {
    if (_pixi) return Promise.resolve(_pixi);
    if (_loadPromise) return _loadPromise;
    _loadPromise = new Promise(function (resolve) {
      let idx = 0;
      function tryNext() {
        if (idx >= PIXI_CANDIDATES.length) { resolve(null); return; }
        const url = PIXI_CANDIDATES[idx++];
        const s = document.createElement('script');
        s.src = url;
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.onload = function () {
          if (window.PIXI && window.PIXI.Application && window.PIXI.Graphics) {
            _pixi = window.PIXI;
            console.log('[AlbinaPixi] loaded from', url);
            resolve(_pixi);
          } else { tryNext(); }
        };
        s.onerror = function () { tryNext(); };
        document.head.appendChild(s);
      }
      tryNext();
    });
    return _loadPromise;
  }

  function getQualityProfile() { return QUALITY_PROFILES[_quality] || QUALITY_PROFILES.balanced; }

  function ensureHosts() {
    if (!_pixi) return false;
    let bgHost = document.querySelector('.albina-pixi-bg');
    let fgHost = document.querySelector('.albina-pixi-fg');
    if (!bgHost) {
      bgHost = document.createElement('div');
      bgHost.className = 'albina-pixi-host albina-pixi-bg';
      bgHost.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483638;';
      document.body.appendChild(bgHost);
    }
    if (!fgHost) {
      fgHost = document.createElement('div');
      fgHost.className = 'albina-pixi-host albina-pixi-fg';
      fgHost.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483640;';
      document.body.appendChild(fgHost);
    }
    if (!_bgApp && bgHost) {
      try {
        _bgApp = new _pixi.Application({
          width: window.innerWidth, height: window.innerHeight,
          backgroundAlpha: 0, antialias: true,
          resolution: Math.min(2, window.devicePixelRatio || 1), autoDensity: true,
        });
        bgHost.appendChild(_bgApp.view);
      } catch (e) { console.warn('[AlbinaPixi] bg app failed:', e); }
    }
    if (!_fgApp && fgHost) {
      try {
        _fgApp = new _pixi.Application({
          width: window.innerWidth, height: window.innerHeight,
          backgroundAlpha: 0, antialias: true,
          resolution: Math.min(2, window.devicePixelRatio || 1), autoDensity: true,
        });
        fgHost.appendChild(_fgApp.view);
      } catch (e) { console.warn('[AlbinaPixi] fg app failed:', e); }
    }
    return !!(_bgApp && _fgApp);
  }

  function resizeApps() {
    if (_bgApp) _bgApp.renderer.resize(window.innerWidth, window.innerHeight);
    if (_fgApp) _fgApp.renderer.resize(window.innerWidth, window.innerHeight);
  }

  // ---- 程序化纹理生成 (借鉴 registry.js) ----
  function makeRainTexture(PIXI) {
    const c = document.createElement('canvas');
    c.width = 24; c.height = 128;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 12, 128);
    grad.addColorStop(0, 'rgba(170,200,230,0)');
    grad.addColorStop(0.5, 'rgba(170,200,230,0.7)');
    grad.addColorStop(1, 'rgba(170,200,230,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(12, 0); ctx.lineTo(18, 128); ctx.lineTo(12, 128); ctx.closePath(); ctx.fill();
    return _pixi.Texture.from(c);
  }

  function makeSnowTexture(PIXI) {
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 14);
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 32, 32);
    return _pixi.Texture.from(c);
  }

  function makePetalTexture(PIXI) {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(255,180,200,0.85)';
    ctx.beginPath();
    ctx.moveTo(32, 4);
    ctx.bezierCurveTo(56, 16, 56, 48, 32, 60);
    ctx.bezierCurveTo(8, 48, 8, 16, 32, 4);
    ctx.fill();
    return _pixi.Texture.from(c);
  }

  function makeFogTexture(PIXI) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 256;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    grad.addColorStop(0, 'rgba(180,190,210,0.3)');
    grad.addColorStop(0.5, 'rgba(180,190,210,0.15)');
    grad.addColorStop(1, 'rgba(180,190,210,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
    return _pixi.Texture.from(c);
  }

  function makeFireflyTexture(PIXI) {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(232,213,160,0.9)');
    grad.addColorStop(0.3, 'rgba(232,213,160,0.4)');
    grad.addColorStop(1, 'rgba(232,213,160,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 64, 64);
    return _pixi.Texture.from(c);
  }

  function makeEmberTexture(PIXI) {
    const c = document.createElement('canvas');
    c.width = 72; c.height = 72;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(36, 36, 0, 36, 36, 30);
    grad.addColorStop(0, 'rgba(255,140,60,0.9)');
    grad.addColorStop(0.4, 'rgba(255,100,30,0.5)');
    grad.addColorStop(1, 'rgba(255,60,0,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 72, 72);
    return _pixi.Texture.from(c);
  }

  function makeFlashTexture(PIXI) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 256;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,255,240,0.95)');
    grad.addColorStop(0.4, 'rgba(255,240,200,0.5)');
    grad.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
    return _pixi.Texture.from(c);
  }

  const TEXTURE_FACTORIES = {
    rain: makeRainTexture, snow: makeSnowTexture, heavySnow: makeSnowTexture,
    cherryBlossoms: makePetalTexture, fog: makeFogTexture,
    fireflies: makeFireflyTexture, embers: makeEmberTexture, screenFlash: makeFlashTexture,
  };

  // ---- 粒子特效工厂 ----
  function createParticleEffect(name, width, height, quality) {
    const PIXI = _pixi;
    if (!PIXI) return null;
    const tex = TEXTURE_FACTORIES[name] ? TEXTURE_FACTORIES[name](PIXI) : makeSnowTexture(PIXI);
    const container = new PIXI.Container();
    const baseCount = {
      rain: 100, snow: 86, heavySnow: 148, cherryBlossoms: 72,
      fog: 15, fireflies: 26, embers: 46, screenFlash: 1,
    }[name] || 50;
    const count = Math.floor(baseCount * quality.density);
    const isHeavy = name === 'heavySnow';
    const particles = [];

    for (let i = 0; i < count; i++) {
      const s = new PIXI.Sprite(tex);
      s.x = Math.random() * width;
      s.y = Math.random() * height - 100;
      s.anchor.set(0.5);
      s.alpha = 0.3 + Math.random() * 0.5;
      s._vy = ((name === 'rain' ? 6 : isHeavy ? 3 : 2) + Math.random() * 2) * quality.speed;
      s._vx = (Math.random() - 0.5) * (name === 'rain' ? 2 : 1) * quality.speed;
      s._phase = Math.random() * Math.PI * 2;
      s._flipSpeed = 0.5 + Math.random() * 1.5;
      s.scale.set(0.5 + Math.random() * 0.8);
      container.addChild(s);
      particles.push(s);
    }

    let done = false;
    let progress = 0;

    return {
      displayObject: container,
      persistent: name !== 'screenFlash',
      get done() { return done; },
      update: function (delta, size) {
        if (name === 'screenFlash') {
          progress += delta * 0.04;
          const alpha = 0.86 * Math.exp(-progress * 2);
          container.alpha = alpha;
          if (alpha < 0.01) done = true;
          return;
        }
        for (const p of particles) {
          p.y += p._vy * delta;
          p.x += p._vx * delta + Math.sin(p._phase) * 0.3;
          p._phase += 0.02 * delta;
          p.rotation = Math.sin(p._phase * p._flipSpeed) * 0.3;
          if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        }
      },
      onResize: function (w, h) { width = w; height = h; },
      destroy: function () {
        particles.forEach(function (p) { p.destroy(); });
        container.destroy({ children: true });
        tex.destroy();
      },
    };
  }

  // ---- 公共 API ----
  function isSupported(name) { return SUPPORTED_EFFECTS.indexOf(name) >= 0; }

  async function trigger(name, duration) {
    if (!_effectsEnabled || !isSupported(name)) return false;
    if (!_pixi) { await loadPixi(); }
    if (!ensureHosts()) return false;
    const layer = EFFECT_FIXED_LAYER[name];
    const app = layer === 'bg' ? _bgApp : _fgApp;
    if (!app) return false;
    const quality = getQualityProfile();
    const inst = createParticleEffect(name, window.innerWidth, window.innerHeight, quality);
    if (!inst) return false;
    const key = name + '_' + Date.now();
    _activeEffects.set(key, { key, layer, name, instance: inst });
    app.stage.addChild(inst.displayObject);
    const tickerCb = function (delta) { inst.update(delta, { width: window.innerWidth, height: window.innerHeight }); if (inst.done) { app.ticker.remove(tickerCb); } };
    app.ticker.add(tickerCb);
    if (duration && duration > 0 && inst.persistent) {
      setTimeout(function () {
        app.stage.removeChild(inst.displayObject);
        inst.destroy();
        _activeEffects.delete(key);
        app.ticker.remove(tickerCb);
      }, duration);
    }
    prunePersistent();
    return true;
  }

  function prunePersistent() {
    const persistent = [];
    _activeEffects.forEach(function (e) { if (e.instance.persistent) persistent.push(e); });
    persistent.sort(function (a, b) { return a.key < b.key ? -1 : 1; });
    while (persistent.length > _maxActive) {
      const e = persistent.shift();
      const app = e.layer === 'bg' ? _bgApp : _fgApp;
      if (app) { app.stage.removeChild(e.instance.displayObject); e.instance.destroy(); }
      _activeEffects.delete(e.key);
    }
  }

  function clearAll() {
    _activeEffects.forEach(function (e) {
      const app = e.layer === 'bg' ? _bgApp : _fgApp;
      if (app) { app.stage.removeChild(e.instance.displayObject); e.instance.destroy(); }
    });
    _activeEffects.clear();
  }

  function pauseAll() {
    if (_bgApp) _bgApp.ticker.stop();
    if (_fgApp) _fgApp.ticker.stop();
  }

  function resumeAll() {
    if (_bgApp) _bgApp.ticker.start();
    if (_fgApp) _fgApp.ticker.start();
  }

  function setQuality(q) { _quality = q; }
  function setEnabled(v) { _effectsEnabled = v; if (!v) clearAll(); }
  function setMaxActive(n) { _maxActive = n; }

  window.addEventListener('resize', resizeApps);

  window.AlbinaPixiEffects = {
    SUPPORTED_EFFECTS, EFFECT_FIXED_LAYER, QUALITY_PROFILES,
    loadPixi, trigger, clearAll, pauseAll, resumeAll,
    setQuality, setEnabled, setMaxActive,
    isSupported,
    _state: { get pixi() { return _pixi; }, get bgApp() { return _bgApp; }, get fgApp() { return _fgApp; }, get activeCount() { return _activeEffects.size; } },
  };
})();
