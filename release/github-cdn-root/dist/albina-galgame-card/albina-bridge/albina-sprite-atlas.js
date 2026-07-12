/* ============================================================
 * Albina Bridge - Sprite Atlas Player v1.0.43
 * 借鉴 Codex hatch-pet 的 8x9 精灵图集格式
 * 在浏览器中播放 1536x1872 / 192x208-per-frame 帧动画
 * 支持 9 种状态: idle/running-right/running-left/waving/jumping/failed/waiting/running/review
 * 兼容 Codex pet.json 格式, 可直接加载 hatch-pet 产物
 * ============================================================ */
(function () {
  'use strict';

  const SHEET_WIDTH = 1536;
  const SHEET_HEIGHT = 1872;
  const COLS = 8;
  const ROWS = 9;
  const FRAME_WIDTH = SHEET_WIDTH / COLS;   // 192
  const FRAME_HEIGHT = SHEET_HEIGHT / ROWS;  // 208

  const ROW_NAMES = [
    'idle', 'running-right', 'running-left', 'waving', 'jumping',
    'failed', 'waiting', 'running', 'review',
  ];

  const ROW_INDEX = {};
  ROW_NAMES.forEach(function (name, i) { ROW_INDEX[name] = i; });

  // 状态映射: Albina 剧情状态 -> sprite atlas 行
  const STATE_MAP = {
    'idle': 'idle',
    'thinking': 'review',
    'processing': 'running',
    'complete': 'waving',
    'error': 'failed',
    'waiting': 'waiting',
    'enter': 'jumping',
    'exit': 'running-left',
    'dialogue': 'idle',
    'narration': 'review',
  };

  // CDN 基础路径 (v2.0.0)
  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card';

  // Strip 映射表: characterId -> expression -> strip 资源相对路径
  // 条带图为单行水平排列的 8 帧动画, 文件名 <expression>_strip.png
  const STRIP_MAP = {
    albina: {
      'amused': 'assets/sprite-atlas/albina/amused_strip.png',
      'armored': 'assets/sprite-atlas/albina/armored_strip.png',
      'combat': 'assets/sprite-atlas/albina/combat_strip.png',
      'endgame': 'assets/sprite-atlas/albina/endgame_strip.png',
      'fascia-open': 'assets/sprite-atlas/albina/fascia-open_strip.png',
      'focused': 'assets/sprite-atlas/albina/focused_strip.png',
      'furious': 'assets/sprite-atlas/albina/furious_strip.png',
      'golden-bough': 'assets/sprite-atlas/albina/golden-bough_strip.png',
      'maestro': 'assets/sprite-atlas/albina/maestro_strip.png',
      'normal': 'assets/sprite-atlas/albina/normal_strip.png',
      'rain': 'assets/sprite-atlas/albina/rain_strip.png',
      'ring-conspiracy': 'assets/sprite-atlas/albina/ring-conspiracy_strip.png',
      'shy': 'assets/sprite-atlas/albina/shy_strip.png',
      'smile': 'assets/sprite-atlas/albina/smile_strip.png',
      'surgical': 'assets/sprite-atlas/albina/surgical_strip.png',
      'unarmored': 'assets/sprite-atlas/albina/unarmored_strip.png',
      'white-canvas': 'assets/sprite-atlas/albina/white-canvas_strip.png',
      'wounded': 'assets/sprite-atlas/albina/wounded_strip.png',
    },
    protagonist: {
      'battle': 'assets/sprite-atlas/protagonist/battle_strip.png',
      'coat': 'assets/sprite-atlas/protagonist/coat_strip.png',
      'formal': 'assets/sprite-atlas/protagonist/formal_strip.png',
      'injured': 'assets/sprite-atlas/protagonist/injured_strip.png',
      'normal': 'assets/sprite-atlas/protagonist/normal_strip.png',
      'profile': 'assets/sprite-atlas/protagonist/profile_strip.png',
      'resolve': 'assets/sprite-atlas/protagonist/resolve_strip.png',
      'serious': 'assets/sprite-atlas/protagonist/serious_strip.png',
      'shadow': 'assets/sprite-atlas/protagonist/shadow_strip.png',
      'smile': 'assets/sprite-atlas/protagonist/smile_strip.png',
      'tender': 'assets/sprite-atlas/protagonist/tender_strip.png',
      'wet-hair': 'assets/sprite-atlas/protagonist/wet-hair_strip.png',
    },
  };

  const RUNTIME_LOOKUP_URL = CDN_BASE + '/assets/runtime-lookup.json';

  // Generated lookup also registers supporting casts and original CG strips,
  // for example portrait.original_cg.albina_debut.
  function registerRuntimeLookup(lookup) {
    const portraits = lookup && lookup.portraitsById ? lookup.portraitsById : {};
    Object.keys(portraits).forEach(function (id) {
      const match = id.match(/^portrait\.([^.]+)\.(.+)$/);
      const url = portraits[id];
      if (!match || typeof url !== 'string' || url.indexOf('/sprite-atlas/') < 0) return;
      STRIP_MAP[match[1]] = STRIP_MAP[match[1]] || {};
      STRIP_MAP[match[1]][match[2]] = url;
    });
    return STRIP_MAP;
  }

  async function loadRuntimeLookup() {
    const response = await fetch(RUNTIME_LOOKUP_URL);
    if (!response.ok) throw new Error('Runtime lookup HTTP ' + response.status);
    return registerRuntimeLookup(await response.json());
  }

  // 查表: 根据角色ID和表情返回完整 strip URL, 不存在返回 null
  function getStripUrl(characterId, expression) {
    const charMap = STRIP_MAP[characterId];
    if (!charMap) return null;
    const relPath = charMap[expression];
    if (!relPath) return null;
    return /^https?:\/\//.test(relPath) ? relPath : CDN_BASE + '/' + relPath;
  }

  const _instances = new Map();
  let _containerCounter = 0;

  function createSpriteAtlas(container, options) {
    options = options || {};
    const id = 'atlas_' + (++_containerCounter);
    const canvas = document.createElement('canvas');
    canvas.width = options.displayWidth || FRAME_WIDTH;
    canvas.height = options.displayHeight || FRAME_HEIGHT;
    canvas.style.cssText = 'image-rendering: pixelated; image-rendering: crisp-edges; ' + (options.style || '');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const instance = {
      id: id,
      container: container,
      canvas: canvas,
      ctx: ctx,
      image: null,
      spritesheetUrl: null,
      currentRow: 0,
      currentFrame: 0,
      fps: options.fps || 8,
      loop: true,
      playing: false,
      _timer: null,
      _onStateChange: options.onStateChange || null,
    };

    _instances.set(id, instance);
    return instance;
  }

  async function loadSpritesheet(instance, url) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        if (img.width !== SHEET_WIDTH || img.height !== SHEET_HEIGHT) {
          console.warn('[AlbinaSpriteAtlas] sheet size mismatch: expected ' + SHEET_WIDTH + 'x' + SHEET_HEIGHT + ', got ' + img.width + 'x' + img.height);
        }
        instance.image = img;
        instance.spritesheetUrl = url;
        renderFrame(instance);
        resolve(instance);
      };
      img.onerror = function () { reject(new Error('Failed to load spritesheet: ' + url)); };
      img.src = url;
    });
  }

  async function loadFromPetJson(instance, petJsonUrl) {
    try {
      const resp = await fetch(petJsonUrl);
      const petJson = await resp.json();
      const baseUrl = petJsonUrl.substring(0, petJsonUrl.lastIndexOf('/') + 1);
      const sheetUrl = baseUrl + petJson.spritesheetPath;
      instance.petJson = petJson;
      await loadSpritesheet(instance, sheetUrl);
      console.log('[AlbinaSpriteAtlas] loaded pet:', petJson.id, petJson.displayName);
      return instance;
    } catch (e) {
      console.error('[AlbinaSpriteAtlas] loadFromPetJson failed:', e);
      throw e;
    }
  }

  function renderFrame(instance) {
    if (!instance.image) return;
    const ctx = instance.ctx;
    ctx.clearRect(0, 0, instance.canvas.width, instance.canvas.height);
    const sx = instance.currentFrame * FRAME_WIDTH;
    const sy = instance.currentRow * FRAME_HEIGHT;
    ctx.drawImage(
      instance.image,
      sx, sy, FRAME_WIDTH, FRAME_HEIGHT,
      0, 0, instance.canvas.width, instance.canvas.height
    );
  }

  function play(instance, rowName, options) {
    options = options || {};
    const rowIndex = typeof rowName === 'number' ? rowName : (ROW_INDEX[rowName] || 0);
    if (instance.currentRow !== rowIndex) {
      instance.currentRow = rowIndex;
      instance.currentFrame = 0;
      if (instance._onStateChange) instance._onStateChange(ROW_NAMES[rowIndex], instance);
    }
    if (instance.playing) stop(instance);
    instance.loop = options.loop !== false;
    instance.fps = options.fps || instance.fps || 8;
    instance.playing = true;
    const frameDelay = 1000 / instance.fps;
    const maxFrames = options.frames || COLS;
    instance._timer = setInterval(function () {
      renderFrame(instance);
      instance.currentFrame++;
      if (instance.currentFrame >= maxFrames) {
        if (instance.loop) {
          instance.currentFrame = 0;
        } else {
          stop(instance);
          if (options.onComplete) options.onComplete(instance);
        }
      }
    }, frameDelay);
  }

  function stop(instance) {
    if (instance._timer) {
      clearInterval(instance._timer);
      instance._timer = null;
    }
    instance.playing = false;
  }

  function setState(instance, state) {
    const rowName = STATE_MAP[state] || 'idle';
    play(instance, rowName, { loop: true });
  }

  function playOnce(instance, rowName, onComplete) {
    play(instance, rowName, { loop: false, onComplete: onComplete });
  }

  function setFps(instance, fps) {
    instance.fps = fps;
    if (instance.playing) {
      const row = ROW_NAMES[instance.currentRow];
      play(instance, row, { loop: instance.loop });
    }
  }

  function destroy(instance) {
    stop(instance);
    if (instance.canvas && instance.canvas.parentNode) {
      instance.canvas.parentNode.removeChild(instance.canvas);
    }
    _instances.delete(instance.id);
  }

  function resize(instance, width, height) {
    instance.canvas.width = width;
    instance.canvas.height = height;
    renderFrame(instance);
  }

  // 从 Codex pet.json + spritesheet 创建一个完整的浮动宠物
  function createFloatingPet(parentEl, petJsonUrl, options) {
    options = options || {};
    const wrapper = document.createElement('div');
    wrapper.className = 'albina-sprite-pet';
    wrapper.style.cssText = 'position:fixed;' + (options.position || 'right:80px;bottom:80px') + ';z-index:2147483644;pointer-events:auto;cursor:grab;';
    const canvas = document.createElement('canvas');
    const scale = options.scale || 1.5;
    canvas.width = Math.floor(FRAME_WIDTH * scale);
    canvas.height = Math.floor(FRAME_HEIGHT * scale);
    canvas.style.cssText = 'image-rendering:pixelated;image-rendering:crisp-edges;display:block;';
    wrapper.appendChild(canvas);
    parentEl.appendChild(wrapper);

    const instance = {
      id: 'pet_' + (++_containerCounter),
      container: wrapper,
      canvas: canvas,
      ctx: canvas.getContext('2d'),
      image: null,
      currentRow: 0,
      currentFrame: 0,
      fps: 8,
      loop: true,
      playing: false,
      _timer: null,
      _onStateChange: options.onStateChange || null,
      _dragging: false,
      _dragX: 0,
      _dragY: 0,
    };
    _instances.set(instance.id, instance);

    // 拖拽支持
    wrapper.addEventListener('mousedown', function (e) {
      instance._dragging = true;
      instance._dragX = e.clientX - wrapper.offsetLeft;
      instance._dragY = e.clientY - wrapper.offsetTop;
      wrapper.style.cursor = 'grabbing';
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!instance._dragging) return;
      wrapper.style.left = (e.clientX - instance._dragX) + 'px';
      wrapper.style.top = (e.clientY - instance._dragY) + 'px';
      wrapper.style.right = 'auto';
      wrapper.style.bottom = 'auto';
    });
    document.addEventListener('mouseup', function () {
      if (instance._dragging) { instance._dragging = false; wrapper.style.cursor = 'grab'; }
    });
    // 点击切换状态
    wrapper.addEventListener('click', function () {
      const nextStates = ['idle', 'waving', 'jumping', 'review', 'failed'];
      const currentIdx = nextStates.indexOf(ROW_NAMES[instance.currentRow]);
      const nextState = nextStates[(currentIdx + 1) % nextStates.length];
      setState(instance, nextState);
      if (options.onStateChange) options.onStateChange(nextState, instance);
    });

    // 加载
    loadFromPetJson(instance, petJsonUrl).then(function () {
      setState(instance, 'idle');
    }).catch(function (e) {
      console.error('[AlbinaSpriteAtlas] floating pet load failed:', e);
    });

    return instance;
  }

  // ---- Strip 播放器: 水平条带图, 单行多帧 ----
  // 加载一张包含 frameCount 帧的水平条带图, 自动计算每帧宽度 = strip总宽 / frameCount
  async function loadFromStrip(instance, stripUrl, frameCount) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        const fw = Math.floor(img.width / frameCount);
        const fh = img.height;
        if (fw <= 0) { reject(new Error('Invalid frame width, strip too narrow: ' + stripUrl)); return; }
        instance.image = img;
        instance.stripUrl = stripUrl;
        instance.stripFrameCount = frameCount;
        instance.stripFrameWidth = fw;
        instance.stripFrameHeight = fh;
        instance.mode = 'strip';
        instance.currentFrame = 0;
        if (!instance.fps) instance.fps = 8;
        if (instance.loop === undefined) instance.loop = true;
        // canvas 默认按帧原始尺寸
        if (!instance._stripFixedSize) {
          instance.canvas.width = fw;
          instance.canvas.height = fh;
        }
        renderStripFrame(instance);
        resolve(instance);
      };
      img.onerror = function () { reject(new Error('Failed to load strip: ' + stripUrl)); };
      img.src = stripUrl;
    });
  }

  // 绘制 strip 的当前帧 (单行, 仅水平偏移)
  function renderStripFrame(instance) {
    if (!instance.image || instance.mode !== 'strip') return;
    const ctx = instance.ctx;
    ctx.clearRect(0, 0, instance.canvas.width, instance.canvas.height);
    const sx = instance.currentFrame * instance.stripFrameWidth;
    ctx.drawImage(
      instance.image,
      sx, 0, instance.stripFrameWidth, instance.stripFrameHeight,
      0, 0, instance.canvas.width, instance.canvas.height
    );
  }

  // 播放 strip 帧动画, 支持 loop 和 fps
  function playStrip(instance, options) {
    options = options || {};
    if (instance.playing) stop(instance);
    instance.loop = options.loop !== false;
    instance.fps = options.fps || instance.fps || 8;
    instance.playing = true;
    const frameDelay = 1000 / instance.fps;
    const maxFrames = instance.stripFrameCount || 8;
    instance._timer = setInterval(function () {
      renderStripFrame(instance);
      instance.currentFrame++;
      if (instance.currentFrame >= maxFrames) {
        if (instance.loop) {
          instance.currentFrame = 0;
        } else {
          stop(instance);
          if (options.onComplete) options.onComplete(instance);
        }
      }
    }, frameDelay);
  }

  // 便捷方法: 自动创建 canvas + instance, 加载 strip 并开始播放, 返回 instance
  function createStripPlayer(container, stripUrl, options) {
    options = options || {};
    const id = 'strip_' + (++_containerCounter);
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'image-rendering: pixelated; image-rendering: crisp-edges; ' + (options.style || '');
    if (options.className) canvas.className = options.className;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const instance = {
      id: id,
      container: container,
      canvas: canvas,
      ctx: ctx,
      image: null,
      stripUrl: null,
      stripFrameCount: 0,
      stripFrameWidth: 0,
      stripFrameHeight: 0,
      mode: 'strip',
      currentFrame: 0,
      fps: options.fps || 8,
      loop: options.loop !== false,
      playing: false,
      _timer: null,
      _stripFixedSize: false,
      _onStateChange: options.onStateChange || null,
    };
    _instances.set(id, instance);

    const frameCount = options.frameCount || 8;
    loadFromStrip(instance, stripUrl, frameCount).then(function () {
      // 应用显示缩放
      if (options.scale && options.scale !== 1) {
        instance.canvas.width = Math.floor(instance.stripFrameWidth * options.scale);
        instance.canvas.height = Math.floor(instance.stripFrameHeight * options.scale);
        renderStripFrame(instance);
      }
      // 自定义显示尺寸
      if (options.displayWidth || options.displayHeight) {
        instance._stripFixedSize = true;
        if (options.displayWidth) instance.canvas.width = options.displayWidth;
        if (options.displayHeight) instance.canvas.height = options.displayHeight;
        renderStripFrame(instance);
      }
      if (options.autoplay !== false) {
        playStrip(instance, { loop: instance.loop, fps: instance.fps });
      }
      if (options.onReady) options.onReady(instance);
    }).catch(function (e) {
      console.error('[AlbinaSpriteAtlas] createStripPlayer failed:', e);
      if (options.onError) options.onError(e);
    });

    return instance;
  }

  // ---- 自动替换静态立绘为 strip 帧动画 ----
  let _autoReplaceObserver = null;
  const DEFAULT_STRIP_SELECTOR = 'img[src*="characters/"]';

  // 从 img.src 解析 characterId + expression, 返回对应 strip URL (不存在则 null)
  function _parseImgToStripUrl(img) {
    const src = img.getAttribute('src') || img.src || '';
    const match = src.match(/characters\/([^\/]+)\/([^\/?#]+?)(?:\.[a-zA-Z0-9]+)?(?:[?#]|$)/);
    if (!match) return null;
    return getStripUrl(match[1], match[2]);
  }

  // 探测 strip 是否存在, 存在则用 canvas 替换 img 并播放
  function _replaceImgWithStrip(img, options) {
    if (!img || img.getAttribute('data-albina-strip-replaced')) return;
    const stripUrl = _parseImgToStripUrl(img);
    if (!stripUrl) return;

    const probe = new Image();
    probe.crossOrigin = 'anonymous';
    probe.onload = function () {
      // strip 存在, 执行替换
      img.setAttribute('data-albina-strip-replaced', '1');
      const parent = img.parentNode;
      if (!parent) return;

      const canvas = document.createElement('canvas');
      if (img.className) canvas.className = img.className;
      const inlineStyle = img.style.cssText || '';
      canvas.style.cssText = inlineStyle + 'image-rendering:pixelated;image-rendering:crisp-edges;';
      // 保留原始 width/height 属性 (可能是数字或 css 值)
      const wAttr = img.getAttribute('width');
      const hAttr = img.getAttribute('height');
      if (wAttr) canvas.style.width = /^\d+$/.test(String(wAttr)) ? (wAttr + 'px') : wAttr;
      if (hAttr) canvas.style.height = /^\d+$/.test(String(hAttr)) ? (hAttr + 'px') : hAttr;

      parent.replaceChild(canvas, img);

      const id = 'auto_' + (++_containerCounter);
      const instance = {
        id: id,
        container: parent,
        canvas: canvas,
        ctx: canvas.getContext('2d'),
        image: null,
        stripUrl: stripUrl,
        stripFrameCount: 0,
        stripFrameWidth: 0,
        stripFrameHeight: 0,
        mode: 'strip',
        currentFrame: 0,
        fps: (options && options.fps) || 8,
        loop: !(options && options.loop === false),
        playing: false,
        _timer: null,
        _stripFixedSize: true,
      };
      _instances.set(id, instance);

      loadFromStrip(instance, stripUrl, (options && options.frameCount) || 8).then(function () {
        playStrip(instance, { loop: instance.loop, fps: instance.fps });
      }).catch(function (e) {
        console.warn('[AlbinaSpriteAtlas] strip load failed, img already replaced:', stripUrl, e);
      });
    };
    probe.onerror = function () { /* strip 不存在, 保留原图 */ };
    probe.src = stripUrl;
  }

  // 扫描页面中的静态立绘 img, 替换为 strip 帧动画; 同时处理 albina 与 protagonist
  function autoReplaceStaticImages(options) {
    options = options || {};
    const selector = options.selector || DEFAULT_STRIP_SELECTOR;
    const list = document.querySelectorAll(selector);
    for (let i = 0; i < list.length; i++) {
      _replaceImgWithStrip(list[i], options);
    }
    if (options.observe !== false && typeof MutationObserver !== 'undefined' && !_autoReplaceObserver) {
      const observer = new MutationObserver(function (mutations) {
        for (let i = 0; i < mutations.length; i++) {
          const added = mutations[i].addedNodes;
          for (let j = 0; j < added.length; j++) {
            const node = added[j];
            if (node.nodeType !== 1) continue;
            if (node.tagName === 'IMG' && _parseImgToStripUrl(node)) {
              _replaceImgWithStrip(node, options);
            }
            if (node.querySelectorAll) {
              const nested = node.querySelectorAll(selector);
              for (let k = 0; k < nested.length; k++) {
                _replaceImgWithStrip(nested[k], options);
              }
            }
          }
        }
      });
      observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
      _autoReplaceObserver = observer;
    }
    return _autoReplaceObserver;
  }

  // 停止自动替换监听
  function stopAutoReplace() {
    if (_autoReplaceObserver) {
      _autoReplaceObserver.disconnect();
      _autoReplaceObserver = null;
    }
  }

  function getAllInstances() { return Array.from(_instances.values()); }
  function getById(id) { return _instances.get(id); }

  loadRuntimeLookup().then(function () {
    autoReplaceStaticImages({ observe: false });
  }).catch(function (error) {
    console.warn('[AlbinaSpriteAtlas] runtime lookup unavailable:', error);
  });

  window.AlbinaSpriteAtlas = {
    SHEET_WIDTH, SHEET_HEIGHT, COLS, ROWS, FRAME_WIDTH, FRAME_HEIGHT,
    ROW_NAMES, ROW_INDEX, STATE_MAP,
    CDN_BASE, STRIP_MAP, getStripUrl, registerRuntimeLookup, loadRuntimeLookup,
    createSpriteAtlas, loadSpritesheet, loadFromPetJson,
    play, stop, setState, playOnce, setFps, destroy, resize,
    loadFromStrip, renderStripFrame, playStrip, createStripPlayer,
    autoReplaceStaticImages, stopAutoReplace,
    createFloatingPet,
    getAllInstances, getById,
  };
})();
