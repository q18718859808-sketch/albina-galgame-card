/* ============================================================
 * Albina Galgame Card - Bridge Layer v1.0.41
 * 融合自 bigmalove/galgame v1.2 的核心架构思想
 * 通过 DOM 注入 + postMessage 桥接 albina React 主体
 * ============================================================ */
(function () {
  'use strict';

  const BRIDGE_VERSION = '1.0.41';
  const SCRIPT_ID = 'albina-bridge';
  const STATE = {
    mounted: false,
    history: [],
    historyOpen: false,
    choicesActive: false,
    bgmPlaying: false,
    bgmMode: 'local',
    bgmCurrent: null,
    lastSpokenAt: 0,
    scenes: [],
    parserTags: [],
  };

  const CDN_BASE = (function () {
    const m = /\/dist\/albina-galgame-card\//.exec(location.pathname);
    if (!m) return 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card';
    return location.protocol + '//' + location.host + location.pathname.split('/dist/albina-galgame-card/')[0] + '/dist/albina-galgame-card';
  })();

  // ---- 工具函数 ----
  function log() { try { console.log.apply(console, ['%c[albina-bridge ' + BRIDGE_VERSION + ']', 'color:#e8d5a0;font-weight:600;'].concat([].slice.call(arguments))); } catch (e) {} }
  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'style') e.style.cssText = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k.slice(0, 5) === 'data-') e.setAttribute(k, attrs[k]);
      else if (k === 'on') for (const ev in attrs.on) e.addEventListener(ev, attrs.on[ev]);
      else e.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(function (k) {
      if (k == null) return;
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    });
    return e;
  }
  function injectCSS(href) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.dataset.albinaBridge = '1';
    document.head.appendChild(l);
    return l;
  }
  function injectJS(src, onload, onerror) {
    const s = document.createElement('script');
    s.src = src;
    s.dataset.albinaBridge = '1';
    s.async = false;
    if (onload) s.onload = onload;
    if (onerror) s.onerror = onerror;
    document.head.appendChild(s);
    return s;
  }
  function toast(msg, ms) {
    let t = document.querySelector('.albina-bridge-hotkey-toast');
    if (!t) {
      t = el('div', { class: 'albina-bridge-hotkey-toast' });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.setAttribute('data-show', 'true');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.setAttribute('data-show', 'false'); }, ms || 1800);
  }

  // ============================================================
  // 模块 1: 富标签解析器 (Tag Parser)
  // 借鉴 bigmalove/galgame parser.js 的标签语法:
  //   <p>对话</p>  <sprite id="albina" expr="smile">  <maintext>旁白</maintext>
  //   <background>id</background>  <bgm>keyword</bgm>
  //   <pixiPerform type="rain">  <pixiInit>  <弹窗一>...</弹窗一>
  // 在 albina React 主体不识别这些标签时, 桥接层兜底解析
  // ============================================================
  const Parser = {
    RE_TAGS: /<(p|sprite|maintext|background|bgm|pixiPerform|pixiInit|弹窗一|弹窗二|option|bgimg|whimg|bnimg)([^>]*)>([\s\S]*?)<\/\1>/g,
    RE_ATTR: /(\w+)="([^"]*)"/g,
    parse(text) {
      const out = { dialogs: [], sprites: [], mainTexts: [], backgrounds: [], bgms: [], effects: [], popups: [], options: [] };
      if (!text) return out;
      let m;
      Parser.RE_TAGS.lastIndex = 0;
      while ((m = Parser.RE_TAGS.exec(text)) !== null) {
        const tag = m[1], attrStr = m[2] || '', inner = (m[3] || '').trim();
        const attrs = {};
        let am;
        Parser.RE_ATTR.lastIndex = 0;
        while ((am = Parser.RE_ATTR.exec(attrStr)) !== null) attrs[am[1]] = am[2];
        switch (tag) {
          case 'p': out.dialogs.push({ speaker: attrs.speaker || '', text: inner }); break;
          case 'sprite': out.sprites.push({ id: attrs.id, expr: attrs.expr || 'normal', x: attrs.x || 'auto' }); break;
          case 'maintext': out.mainTexts.push(inner); break;
          case 'background': out.backgrounds.push(inner); break;
          case 'bgm': out.bgms.push(inner); break;
          case 'pixiPerform': out.effects.push({ type: attrs.type || 'rain', duration: parseFloat(attrs.duration) || 0 }); break;
          case 'pixiInit': out.effects.push({ type: 'init', config: inner }); break;
          case '弹窗一': out.popups.push({ slot: 1, text: inner }); break;
          case '弹窗二': out.popups.push({ slot: 2, text: inner }); break;
          case 'option': out.options.push(inner); break;
        }
      }
      return out;
    },
    observe(target) {
      if (!target || target._albinaParserBound) return;
      target._albinaParserBound = true;
      const mo = new MutationObserver(function (muts) {
        for (const mu of muts) {
          for (const node of mu.addedNodes) {
            if (node.nodeType !== 1) continue;
            const text = node.textContent || '';
            if (text.indexOf('<sprite') >= 0 || text.indexOf('<p ') >= 0 || text.indexOf('<pixi') >= 0) {
              const parsed = Parser.parse(text);
              if (parsed.sprites.length) Parser.dispatchSprites(parsed.sprites);
              if (parsed.bgms.length) Parser.dispatchBGM(parsed.bgms[0]);
              if (parsed.effects.length) Parser.dispatchEffect(parsed.effects[0]);
              if (parsed.options.length) Choices.render(parsed.options);
              Parser.hint('桥接解析 ' + (parsed.dialogs.length + parsed.sprites.length + parsed.bgms.length + parsed.effects.length + parsed.options.length) + ' 项');
            }
          }
        }
      });
      mo.observe(target, { childList: true, subtree: true });
    },
    hint(msg) {
      let h = document.querySelector('.albina-bridge-tag-hint');
      if (!h) { h = el('div', { class: 'albina-bridge-tag-hint' }); document.body.appendChild(h); }
      h.textContent = msg;
      h.setAttribute('data-show', 'true');
      clearTimeout(h._t);
      h._t = setTimeout(function () { h.setAttribute('data-show', 'false'); }, 1400);
    },
    dispatchSprites(sprites) {
      sprites.forEach(function (sp) {
        const ev = new CustomEvent('albina:sprite-set', { detail: sp });
        window.dispatchEvent(ev);
      });
    },
    dispatchBGM(keyword) {
      BGMHybrid.playByKeyword(keyword);
    },
    dispatchEffect(eff) {
      PixiEffects.trigger(eff.type, eff.duration || 4000);
    },
  };

  // ============================================================
  // 模块 2: GSAP 立绘动画 (Sprite Animation)
  // 借鉴 bigmalove/galgame animation/sprite-animation.js
  // 为 albina 立绘添加呼吸/聚焦/淡入淡出/淡入入场动画
  // ============================================================
  const SpriteAnim = {
    gsapLoaded: false,
    init() {
      if (window.gsap) { SpriteAnim.gsapLoaded = true; SpriteAnim.bindSprites(); return; }
      injectJS('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', function () {
        SpriteAnim.gsapLoaded = !!window.gsap;
        log('GSAP loaded:', SpriteAnim.gsapLoaded);
        SpriteAnim.bindSprites();
      }, function () { log('GSAP load failed, fallback to CSS'); SpriteAnim.bindSprites(); });
    },
    bindSprites() {
      // 监听 albina React 主体渲染的立绘 img 节点
      const apply = function (img) {
        if (img.dataset.albinaAnimBound) return;
        img.dataset.albinaAnimBound = '1';
        img.classList.add('albina-bridge-sprite-anim');
        img.setAttribute('data-anim', 'breathing');
        if (SpriteAnim.gsapLoaded) {
          gsap.fromTo(img, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        }
      };
      // 已存在的
      document.querySelectorAll('img[alt="albina"], img[alt="protagonist"], img[src*="characters/"]').forEach(apply);
      // 动态注入的
      const mo = new MutationObserver(function (muts) {
        for (const mu of muts) for (const n of mu.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (n.tagName === 'IMG' && (n.alt === 'albina' || n.alt === 'protagonist' || (n.src || '').indexOf('characters/') >= 0)) apply(n);
          n.querySelectorAll && n.querySelectorAll('img[alt="albina"], img[alt="protagonist"], img[src*="characters/"]').forEach(apply);
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });

      // 焦点切换：监听 albina 主体说话者
      window.addEventListener('albina:speaker-change', function (e) {
        const speaking = e.detail && e.detail.id;
        document.querySelectorAll('img[alt]').forEach(function (img) {
          const isSpeaking = img.alt === speaking;
          img.setAttribute('data-focused', isSpeaking ? 'true' : 'false');
          img.setAttribute('data-dimmed', isSpeaking ? 'false' : 'true');
        });
      });
    },
  };

  // ============================================================
  // 模块 3: BGM 混合模式 (Hybrid BGM)
  // 借鉴 bigmalove/galgame audio/bgm-manager.js 在线搜索思路
  // 模式 A: 本地静态 5 首 (albina TONE_BGM_MAP)
  // 模式 B: 在线兜底 (用户自定义 URL 或 web search API)
  // ============================================================
  const BGMHybrid = {
    audio: null,
    LOCAL_MAP: {
      main_menu: 'assets/audio/bgm/main_menu.mp3',
      title_theme: 'assets/audio/bgm/title_theme.mp3',
      backstreets_rain: 'assets/audio/bgm/backstreets_rain.mp3',
      between_two_worlds: 'assets/audio/bgm/between_two_worlds.mp3',
      boss_kromer: 'assets/audio/bgm/boss_kromer.mp3',
    },
    init() {
      BGMHybrid.audio = new Audio();
      BGMHybrid.audio.loop = true;
      BGMHybrid.audio.volume = 0.55;
      BGMHybrid.audio.addEventListener('play', function () { BGMHybrid.updateStatus(true); });
      BGMHybrid.audio.addEventListener('pause', function () { BGMHybrid.updateStatus(false); });
      BGMHybrid.renderStatus();
      // 监听 Cinema 桥接的 tone 变化
      window.addEventListener('albina:cinema-tone', function (e) {
        const tone = e.detail && e.detail.tone;
        if (tone && BGMHybrid.LOCAL_MAP[tone]) BGMHybrid.playLocal(tone);
      });
    },
    renderStatus() {
      let s = document.querySelector('.albina-bridge-bgm-status');
      if (!s) {
        s = el('div', { class: 'albina-bridge-bgm-status', 'data-playing': 'false', on: { click: BGMHybrid.toggle } },
          [el('span', { class: 'bgm-icon' }), el('span', { class: 'bgm-label' }, 'BGM 静默')]);
        document.body.appendChild(s);
      }
      BGMHybrid.updateStatus(BGMHybrid.audio && !BGMHybrid.audio.paused);
    },
    updateStatus(playing) {
      STATE.bgmPlaying = !!playing;
      const s = document.querySelector('.albina-bridge-bgm-status');
      if (s) {
        s.setAttribute('data-playing', playing ? 'true' : 'false');
        const label = s.querySelector('.bgm-label');
        if (label) label.textContent = playing ? ('BGM ' + (STATE.bgmCurrent || '')) : 'BGM 静默';
      }
    },
    toggle() {
      if (!BGMHybrid.audio) return;
      if (BGMHybrid.audio.paused) BGMHybrid.audio.play().catch(function () { toast('BGM 自动播放被浏览器拦截，请点击页面任意处激活'); });
      else BGMHybrid.audio.pause();
    },
    playLocal(tone) {
      const url = BGMHybrid.LOCAL_MAP[tone];
      if (!url) return;
      const full = CDN_BASE + '/' + url;
      if (BGMHybrid.audio.src !== full) {
        BGMHybrid.audio.src = full;
        STATE.bgmCurrent = tone;
        STATE.bgmMode = 'local';
      }
      BGMHybrid.audio.play().catch(function (e) { log('BGM play blocked:', e); toast('BGM 静音 — 点击右下角激活'); });
    },
    playByKeyword(keyword) {
      // 优先匹配本地曲名，否则提示用户该功能需要在线搜索 API
      if (BGMHybrid.LOCAL_MAP[keyword]) { BGMHybrid.playLocal(keyword); return; }
      const alias = {
        '主菜单': 'main_menu', '标题': 'title_theme', '雨夜': 'backstreets_rain',
        '雨': 'backstreets_rain', '两个世界': 'between_two_worlds', 'boss': 'boss_kromer',
      };
      if (alias[keyword] && BGMHybrid.LOCAL_MAP[alias[keyword]]) { BGMHybrid.playLocal(alias[keyword]); return; }
      log('BGM keyword not in local map:', keyword, '(需要在线搜索 API 兜底)');
      toast('BGM「' + keyword + '」需要在线搜索 API');
    },
  };

  // ============================================================
  // 模块 4: 历史日志 (History LOG)
  // 借鉴 bigmalove/galgame ui/history.js
  // 通过 MutationObserver 监听对话节点, 自动累积历史
  // ============================================================
  const History = {
    init() {
      // 浮层 DOM
      const overlay = el('div', { class: 'albina-bridge-history', 'data-open': 'false' }, [
        el('div', { class: 'history-header' }, [
          el('span', {}, '历史回溯 — Albina Bridge'),
          el('button', { class: 'history-close', on: { click: History.close } }, '关闭 (H)'),
        ]),
        el('div', { class: 'history-body' }),
      ]);
      document.body.appendChild(overlay);
      // 监听 albina 主体对话容器
      const tryBind = function () {
        const candidates = [
          document.querySelector('[class*="dialog"]'),
          document.querySelector('[class*="Dialog"]'),
          document.querySelector('[class*="message"]'),
          document.querySelector('[class*="Message"]'),
          document.querySelector('[class*="text-box"]'),
        ].filter(Boolean);
        if (candidates.length === 0) {
          setTimeout(tryBind, 1500);
          return;
        }
        const target = candidates[0];
        const mo = new MutationObserver(function (muts) {
          for (const mu of muts) {
            for (const n of mu.addedNodes) {
              if (n.nodeType !== 1) continue;
              const text = (n.textContent || '').trim();
              if (text.length < 2) continue;
              History.push({ ts: Date.now(), text: text });
            }
          }
        });
        mo.observe(target, { childList: true, subtree: true });
        log('History bound to:', target.className || target.tagName);
      };
      tryBind();
    },
    push(entry) {
      STATE.history.push(entry);
      if (STATE.history.length > 200) STATE.history.shift();
      if (STATE.historyOpen) History.render();
    },
    render() {
      const body = document.querySelector('.albina-bridge-history .history-body');
      if (!body) return;
      if (STATE.history.length === 0) {
        body.innerHTML = '<div class="history-empty">尚无对话记录，开始游戏后这里会自动累积...</div>';
        return;
      }
      body.innerHTML = '';
      STATE.history.slice().reverse().forEach(function (e) {
        const d = new Date(e.ts);
        const ts = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');
        body.appendChild(el('div', { class: 'history-entry' }, [
          el('div', { class: 'meta' }, ts),
          el('div', {}, e.text),
        ]));
      });
    },
    open() {
      STATE.historyOpen = true;
      const o = document.querySelector('.albina-bridge-history');
      if (o) o.setAttribute('data-open', 'true');
      History.render();
    },
    close() {
      STATE.historyOpen = false;
      const o = document.querySelector('.albina-bridge-history');
      if (o) o.setAttribute('data-open', 'false');
    },
    toggle() { STATE.historyOpen ? History.close() : History.open(); },
  };

  // ============================================================
  // 模块 5: 动态选项面板 (Choices Panel)
  // 借鉴 bigmalove/galgame ui/choices.js
  // 从富标签 <option> 或 postMessage albina:choices 渲染选项
  // ============================================================
  const Choices = {
    init() {
      const panel = el('div', { class: 'albina-bridge-choices', 'data-active': 'false' });
      document.body.appendChild(panel);
      window.addEventListener('albina:choices', function (e) {
        const list = (e.detail && e.detail.options) || [];
        Choices.render(list);
      });
    },
    render(options) {
      let panel = document.querySelector('.albina-bridge-choices');
      if (!panel) return;
      panel.innerHTML = '';
      if (!options || options.length === 0) {
        panel.setAttribute('data-active', 'false');
        return;
      }
      options.forEach(function (opt, i) {
        const text = typeof opt === 'string' ? opt : (opt.text || opt.label || ('选项 ' + (i + 1)));
        const btn = el('button', { class: 'choice-btn', on: { click: function () { Choices.choose(i, opt); } } }, text);
        panel.appendChild(btn);
      });
      panel.setAttribute('data-active', 'true');
    },
    choose(i, opt) {
      const ev = new CustomEvent('albina:choice-made', { detail: { index: i, option: opt } });
      window.dispatchEvent(ev);
      Choices.render([]);
      toast('已选择: ' + (typeof opt === 'string' ? opt : (opt.text || opt.label || '#' + i)));
    },
  };

  // ============================================================
  // 模块 6: PIXI 特效引擎 (PIXI Effects)
  // 借鉴 bigmalove/galgame effects/pixi-effect-manager.js
  // 加载 PIXI.js + 内置 rain/snow/sparkle/petal 四种特效
  // ============================================================
  const PixiEffects = {
    app: null,
    loaded: false,
    particles: [],
    init() {
      if (window.PIXI) { PixiEffects.loaded = true; PixiEffects.setup(); return; }
      injectJS('https://cdn.jsdelivr.net/npm/pixi.js@7.4.0/dist/pixi.min.js', function () {
        PixiEffects.loaded = !!window.PIXI;
        log('PIXI loaded:', PixiEffects.loaded);
        if (PixiEffects.loaded) PixiEffects.setup();
      }, function () { log('PIXI load failed, effects disabled'); });
    },
    setup() {
      const canvas = el('canvas', { class: 'albina-bridge-pixi-canvas' });
      document.body.appendChild(canvas);
      try {
        PixiEffects.app = new PIXI.Application({ view: canvas, width: window.innerWidth, height: window.innerHeight, backgroundAlpha: 0, antialias: true, resolution: window.devicePixelRatio || 1, autoDensity: true });
        window.addEventListener('resize', function () {
          if (PixiEffects.app) PixiEffects.app.renderer.resize(window.innerWidth, window.innerHeight);
        });
      } catch (e) { log('PIXI setup failed:', e); }
    },
    trigger(type, duration) {
      if (!PixiEffects.loaded || !PixiEffects.app) { toast('特效「' + type + '」需要 PIXI 支持'); return; }
      const stage = PixiEffects.app.stage;
      // 简易粒子: 50 个圆点下落
      const colorMap = { rain: 0x88aacc, snow: 0xffffff, sparkle: 0xe8d5a0, petal: 0xff9999 };
      const color = colorMap[type] || 0xe8d5a0;
      const particles = [];
      for (let i = 0; i < 60; i++) {
        const g = new PIXI.Graphics();
        g.beginFill(color, 0.7);
        g.drawCircle(0, 0, type === 'rain' ? 1.5 : 3);
        g.endFill();
        g.x = Math.random() * window.innerWidth;
        g.y = -Math.random() * 200;
        g._vy = (type === 'rain' ? 6 : 2) + Math.random() * 2;
        g._vx = (Math.random() - 0.5) * 1;
        stage.addChild(g);
        particles.push(g);
      }
      PixiEffects.app.ticker.add(function () {
        for (const p of particles) {
          p.y += p._vy;
          p.x += p._vx;
          if (p.y > window.innerHeight + 20) { p.y = -20; p.x = Math.random() * window.innerWidth; }
        }
      });
      setTimeout(function () {
        for (const p of particles) stage.removeChild(p);
      }, duration || 4000);
      log('PIXI effect:', type, 'duration', duration);
    },
  };

  // ============================================================
  // 模块 7: 浮窗菜单 (Menu Dock)
  // 借鉴 bigmalove/galgame ui/menu-button.js + galgame-mode.js
  // 右侧浮动按钮: 历史 / BGM / 特效 / 皮肤 / 全屏
  // ============================================================
  const MenuDock = {
    init() {
      const dock = el('div', { class: 'albina-bridge-menu-dock' });
      const btns = [
        { label: 'H', title: '历史回溯 (H)', on: { click: History.toggle } },
        { label: '♪', title: 'BGM 切换 (M)', on: { click: BGMHybrid.toggle } },
        { label: '✦', title: '特效演示 (E)', on: { click: function () { PixiEffects.trigger('sparkle', 4000); } } },
        { label: '⤢', title: '全屏切换 (F)', on: { click: MenuDock.toggleFullscreen } },
      ];
      btns.forEach(function (b) {
        dock.appendChild(el('button', { class: 'dock-btn', title: b.title, on: b.on }, b.label));
      });
      document.body.appendChild(dock);
    },
    toggleFullscreen() {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
      else document.exitFullscreen && document.exitFullscreen();
    },
  };

  // ============================================================
  // 模块 8: 快捷键 (Hotkeys)
  // 借鉴 bigmalove/galgame settings.js spaceKeyNext/enterKeyNext/ctrlKeySkip
  // H=历史, M=BGM, F=全屏, E=特效, Ctrl+=快进
  // ============================================================
  const Hotkeys = {
    init() {
      document.addEventListener('keydown', function (e) {
        if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
        const k = e.key.toLowerCase();
        if (k === 'h') { History.toggle(); e.preventDefault(); }
        else if (k === 'm') { BGMHybrid.toggle(); e.preventDefault(); }
        else if (k === 'f') { MenuDock.toggleFullscreen(); e.preventDefault(); }
        else if (k === 'e') { PixiEffects.trigger('sparkle', 4000); e.preventDefault(); }
        else if (e.ctrlKey && e.key === 'ArrowRight') { toast('快进中...'); }
      });
    },
  };

  // ============================================================
  // 主入口
  // ============================================================
  function mount() {
    if (STATE.mounted) return;
    STATE.mounted = true;
    injectCSS(CDN_BASE + '/albina-bridge/albina-bridge.css');
    log('Bridge mounting at CDN_BASE=', CDN_BASE);
    // 启动水印
    const stamp = el('div', { class: 'albina-bridge-bootstamp' }, 'albina-bridge v' + BRIDGE_VERSION);
    document.body.appendChild(stamp);
    // 模块依次初始化
    Parser.observe(document.body);
    SpriteAnim.init();
    BGMHybrid.init();
    History.init();
    Choices.init();
    PixiEffects.init();
    MenuDock.init();
    Hotkeys.init();
    toast('Albina Bridge v' + BRIDGE_VERSION + ' 已激活 — H 历史 / M BGM / F 全屏 / E 特效', 3600);
    // 监听 albina React 主体的 postMessage
    window.addEventListener('message', function (e) {
      const d = e.data || {};
      if (d.__albinaCinema && d.event) {
        // 场景切换时同步触发 BGM/Cinema
        if (d.tone) window.dispatchEvent(new CustomEvent('albina:cinema-tone', { detail: { tone: d.tone, sceneId: d.sceneId } }));
        History.push({ ts: Date.now(), text: '[场景切换] ' + (d.sceneId || d.event) });
      }
      if (d.__albinaBoot) {
        History.push({ ts: Date.now(), text: '[启动阶段] ' + (d.phase || 'unknown') });
      }
    });
    log('Bridge mounted successfully');
  }

  // 自动挂载
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(mount, 0);
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
  // 兜底：5s 后强制挂载
  setTimeout(mount, 5000);

  // 暴露 API
  window.AlbinaBridge = {
    version: BRIDGE_VERSION,
    state: STATE,
    Parser: Parser,
    SpriteAnim: SpriteAnim,
    BGMHybrid: BGMHybrid,
    History: History,
    Choices: Choices,
    PixiEffects: PixiEffects,
    MenuDock: MenuDock,
    Hotkeys: Hotkeys,
    mount: mount,
  };
})();
