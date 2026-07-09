/* ============================================================
 * Albina Bridge - IndexedDB Asset Store v1.0.42
 * 借鉴 bigmalove/galgame v1.2 src/db/ 的 6-store 架构
 * 为 Albina 卡提供本地化资产持久化能力
 * ============================================================ */
(function () {
  'use strict';
  const DB_NAME = 'AlbinaGalgameDB';
  const DB_VERSION = 1;
  const STORES = {
    SPRITES: 'sprites',
    BACKGROUNDS: 'backgrounds',
    MAP_IMAGES: 'mapImages',
    IMAGE_PACKS: 'imagePacks',
    UI_SKINS: 'uiSkins',
    SETTINGS: 'settings',
  };
  const DEFAULT_PACK_ID = 'pack_default';
  const DEFAULT_PACK_NAME = '默认包';

  let _db = null;
  const _spriteCache = new Map();
  const _bgCache = new Map();

  function openDB() {
    if (_db) return Promise.resolve(_db);
    return new Promise(function (resolve, reject) {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function (e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORES.SPRITES)) {
          const s = db.createObjectStore(STORES.SPRITES, { keyPath: 'id' });
          s.createIndex('characterId', 'characterId', { unique: false });
          s.createIndex('expression', 'expression', { unique: false });
          s.createIndex('packId', 'packId', { unique: false });
        }
        if (!db.objectStoreNames.contains(STORES.BACKGROUNDS)) {
          const s = db.createObjectStore(STORES.BACKGROUNDS, { keyPath: 'id' });
          s.createIndex('sceneName', 'sceneName', { unique: true });
          s.createIndex('packId', 'packId', { unique: false });
        }
        if (!db.objectStoreNames.contains(STORES.MAP_IMAGES)) {
          const s = db.createObjectStore(STORES.MAP_IMAGES, { keyPath: 'id' });
          s.createIndex('regionKey', 'regionKey', { unique: false });
          s.createIndex('packId', 'packId', { unique: false });
        }
        if (!db.objectStoreNames.contains(STORES.IMAGE_PACKS)) {
          db.createObjectStore(STORES.IMAGE_PACKS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.UI_SKINS)) {
          const s = db.createObjectStore(STORES.UI_SKINS, { keyPath: 'id' });
          s.createIndex('skinId', 'skinId', { unique: false });
          s.createIndex('elementId', 'elementId', { unique: false });
        }
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
        }
      };
      req.onsuccess = function (e) { _db = e.target.result; resolve(_db); };
      req.onerror = function (e) { reject(e.target.error); };
    });
  }

  function tx(db, store, mode) {
    return db.transaction(store, mode).objectStore(store);
  }

  function reqToPromise(request) {
    return new Promise(function (resolve, reject) {
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
  }

  // ---- 立绘 CRUD ----
  async function saveSprite(characterId, expression, blob, url, packId) {
    const db = await openDB();
    const id = characterId + '_' + expression;
    const record = { id, characterId, expression, imageBlob: blob, imageUrl: url, packId: packId || DEFAULT_PACK_ID, lastModified: Date.now() };
    if (_spriteCache.has(id)) { const old = _spriteCache.get(id); if (old && old.startsWith('blob:')) URL.revokeObjectURL(old); }
    const blobUrl = blob ? URL.createObjectURL(blob) : url;
    _spriteCache.set(id, blobUrl);
    await reqToPromise(tx(db, STORES.SPRITES, 'readwrite').put(record));
    return blobUrl;
  }

  async function getSprite(characterId, expression) {
    const id = characterId + '_' + expression;
    if (_spriteCache.has(id)) return _spriteCache.get(id);
    const db = await openDB();
    const record = await reqToPromise(tx(db, STORES.SPRITES, 'readonly').get(id));
    if (record) {
      const url = record.imageBlob ? URL.createObjectURL(record.imageBlob) : record.imageUrl;
      _spriteCache.set(id, url);
      return url;
    }
    const fallback = await reqToPromise(tx(db, STORES.SPRITES, 'readonly').get(characterId + '_normal'));
    if (fallback) {
      const url = fallback.imageBlob ? URL.createObjectURL(fallback.imageBlob) : fallback.imageUrl;
      _spriteCache.set(id, url);
      return url;
    }
    return null;
  }

  async function getAllSprites(packId) {
    const db = await openDB();
    const store = tx(db, STORES.SPRITES, 'readonly');
    const all = await reqToPromise(store.getAll());
    return packId ? all.filter(function (r) { return r.packId === packId; }) : all;
  }

  // ---- 背景 CRUD ----
  async function saveBackground(sceneName, blob, url, packId) {
    const db = await openDB();
    const record = { id: sceneName, sceneName: sceneName, imageBlob: blob, imageUrl: url, packId: packId || DEFAULT_PACK_ID, lastModified: Date.now() };
    if (_bgCache.has(sceneName)) { const old = _bgCache.get(sceneName); if (old && old.startsWith('blob:')) URL.revokeObjectURL(old); }
    const blobUrl = blob ? URL.createObjectURL(blob) : url;
    _bgCache.set(sceneName, blobUrl);
    await reqToPromise(tx(db, STORES.BACKGROUNDS, 'readwrite').put(record));
    return blobUrl;
  }

  async function getBackground(sceneName) {
    if (_bgCache.has(sceneName)) return _bgCache.get(sceneName);
    const db = await openDB();
    const record = await reqToPromise(tx(db, STORES.BACKGROUNDS, 'readonly').get(sceneName));
    if (record) {
      const url = record.imageBlob ? URL.createObjectURL(record.imageBlob) : record.imageUrl;
      _bgCache.set(sceneName, url);
      return url;
    }
    return null;
  }

  async function getAllBackgrounds(packId) {
    const db = await openDB();
    const all = await reqToPromise(tx(db, STORES.BACKGROUNDS, 'readonly').getAll());
    return packId ? all.filter(function (r) { return r.packId === packId; }) : all;
  }

  // ---- 图包 CRUD ----
  async function getAllPacks() {
    const db = await openDB();
    const all = await reqToPromise(tx(db, STORES.IMAGE_PACKS, 'readonly').getAll());
    if (all.length === 0) {
      const def = { id: DEFAULT_PACK_ID, name: DEFAULT_PACK_NAME, isDefault: true, createdAt: Date.now() };
      await reqToPromise(tx(db, STORES.IMAGE_PACKS, 'readwrite').put(def));
      return [def];
    }
    return all;
  }

  async function createPack(name) {
    const db = await openDB();
    const pack = { id: 'pack_' + Date.now().toString(36), name: name, isDefault: false, createdAt: Date.now() };
    await reqToPromise(tx(db, STORES.IMAGE_PACKS, 'readwrite').put(pack));
    return pack;
  }

  // ---- UI 皮肤 CRUD ----
  async function saveUiSkinAsset(skinId, elementId, blob, url, meta) {
    const db = await openDB();
    const id = skinId + ':' + elementId;
    const record = { id, skinId, elementId, imageBlob: blob, imageUrl: url, meta: meta || {}, updatedAt: Date.now() };
    await reqToPromise(tx(db, STORES.UI_SKINS, 'readwrite').put(record));
    return record;
  }

  async function getUiSkinAsset(skinId, elementId) {
    const db = await openDB();
    return reqToPromise(tx(db, STORES.UI_SKINS, 'readonly').get(skinId + ':' + elementId));
  }

  async function getUiSkinAssetsBySkin(skinId) {
    const db = await openDB();
    const idx = tx(db, STORES.UI_SKINS, 'readonly').index('skinId');
    return reqToPromise(idx.getAll(skinId));
  }

  // ---- 设置 CRUD ----
  async function getSetting(key) {
    const db = await openDB();
    const r = await reqToPromise(tx(db, STORES.SETTINGS, 'readonly').get(key));
    return r ? r.value : null;
  }

  async function setSetting(key, value) {
    const db = await openDB();
    await reqToPromise(tx(db, STORES.SETTINGS, 'readwrite').put({ key, value, updatedAt: Date.now() }));
  }

  // ---- 批量加载缓存 ----
  async function loadAllToCache() {
    const db = await openDB();
    const sprites = await reqToPromise(tx(db, STORES.SPRITES, 'readonly').getAll());
    sprites.forEach(function (r) {
      const url = r.imageBlob ? URL.createObjectURL(r.imageBlob) : r.imageUrl;
      _spriteCache.set(r.id, url);
    });
    const bgs = await reqToPromise(tx(db, STORES.BACKGROUNDS, 'readonly').getAll());
    bgs.forEach(function (r) {
      const url = r.imageBlob ? URL.createObjectURL(r.imageBlob) : r.imageUrl;
      _bgCache.set(r.sceneName, url);
    });
    return { sprites: sprites.length, backgrounds: bgs.length };
  }

  // ---- 导出 ----
  window.AlbinaAssetDB = {
    DB_NAME, DB_VERSION, STORES, DEFAULT_PACK_ID,
    openDB, loadAllToCache,
    saveSprite, getSprite, getAllSprites,
    saveBackground, getBackground, getAllBackgrounds,
    getAllPacks, createPack,
    saveUiSkinAsset, getUiSkinAsset, getUiSkinAssetsBySkin,
    getSetting, setSetting,
    _caches: { sprites: _spriteCache, backgrounds: _bgCache },
  };
})();
