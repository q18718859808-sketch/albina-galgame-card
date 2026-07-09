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

  function getAllInstances() { return Array.from(_instances.values()); }
  function getById(id) { return _instances.get(id); }

  window.AlbinaSpriteAtlas = {
    SHEET_WIDTH, SHEET_HEIGHT, COLS, ROWS, FRAME_WIDTH, FRAME_HEIGHT,
    ROW_NAMES, ROW_INDEX, STATE_MAP,
    createSpriteAtlas, loadSpritesheet, loadFromPetJson,
    play, stop, setState, playOnce, setFps, destroy, resize,
    createFloatingPet,
    getAllInstances, getById,
  };
})();
