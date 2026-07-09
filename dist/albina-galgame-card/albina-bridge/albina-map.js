/* ============================================================
 * Albina Bridge - Map System v1.0.42
 * 借鉴 bigmalove/galgame v1.2 src/map/ 的架构
 * 简化版: 基于 Albina 三路线的固定地图 + 可扩展地点
 * ============================================================ */
(function () {
  'use strict';

  // Albina 三路线的固定地图数据 (替代 AutoCardUpdaterAPI)
  const ALBINA_MAP = {
    regions: [
      {
        id: 'white_canvas',
        name: '白色画布',
        color: '#e8e8e8',
        locations: [
          { id: 'wc_start', name: '起始点', desc: '一切开始的地方', importance: 'high' },
          { id: 'wc_gallery', name: '第一画廊', desc: 'Albina 初次登场', importance: 'high' },
          { id: 'wc_choice', name: '选择十字路', desc: '路线分歧点', importance: 'critical' },
        ],
      },
      {
        id: 'golden_bough_rebuild',
        name: '黄金枝重建',
        color: '#d4af37',
        locations: [
          { id: 'gbr_awakening', name: '觉醒之地', desc: '主角觉醒', importance: 'high' },
          { id: 'gbr_rebuild', name: '重建现场', desc: '黄金枝重塑', importance: 'high' },
          { id: 'gbr_ending', name: '黄金结局', desc: '路线终点', importance: 'critical' },
        ],
      },
      {
        id: 'ring_conspiracy',
        name: '戒指阴谋',
        color: '#8b0000',
        locations: [
          { id: 'rc_invitation', name: '邀请之地', desc: '收到戒指', importance: 'high' },
          { id: 'rc_conspiracy', name: '阴谋核心', desc: '揭露真相', importance: 'high' },
          { id: 'rc_ending', name: '猩红结局', desc: '路线终点', importance: 'critical' },
        ],
      },
      {
        id: 'shared',
        name: '共同区域',
        color: '#4a90d9',
        locations: [
          { id: 'sh_rain', name: '雨夜后巷', desc: '雨中告白', importance: 'medium' },
          { id: 'sh_hell_gate', name: '地狱之门', desc: 'Boss 战', importance: 'high' },
          { id: 'sh_library', name: '图书馆', desc: '知识之地', importance: 'medium' },
        ],
      },
    ],
  };

  let _currentRegion = 'white_canvas';
  let _currentLocation = 'wc_start';
  let _explored = new Set();

  function getMapData() {
    return {
      regions: ALBINA_MAP.regions.map(function (r) {
        return {
          id: r.id, name: r.name, color: r.color,
          locations: r.locations.map(function (l) {
            return Object.assign({}, l, { explored: _explored.has(l.id) });
          }),
        };
      }),
      currentRegion: _currentRegion,
      currentLocation: _currentLocation,
    };
  }

  function travelTo(regionId, locationId) {
    const region = ALBINA_MAP.regions.find(function (r) { return r.id === regionId; });
    if (!region) return false;
    const loc = region.locations.find(function (l) { return l.id === locationId; });
    if (!loc) return false;
    _currentRegion = regionId;
    _currentLocation = locationId;
    _explored.add(locationId);
    saveState();
    window.dispatchEvent(new CustomEvent('albina:map-travel', {
      detail: { region: regionId, location: locationId, name: loc.name, desc: loc.desc },
    }));
    return true;
  }

  function getCurrentLocation() {
    const region = ALBINA_MAP.regions.find(function (r) { return r.id === _currentRegion; });
    if (!region) return null;
    return region.locations.find(function (l) { return l.id === _currentLocation; });
  }

  function getRegion(regionId) {
    return ALBINA_MAP.regions.find(function (r) { return r.id === regionId; });
  }

  function getExploredLocations() {
    return Array.from(_explored);
  }

  function saveState() {
    localStorage.setItem('albina_map_state', JSON.stringify({
      currentRegion: _currentRegion,
      currentLocation: _currentLocation,
      explored: Array.from(_explored),
    }));
  }

  function loadState() {
    const saved = localStorage.getItem('albina_map_state');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        _currentRegion = s.currentRegion || _currentRegion;
        _currentLocation = s.currentLocation || _currentLocation;
        _explored = new Set(s.explored || []);
      } catch (e) {}
    }
  }

  function resetMap() {
    _currentRegion = 'white_canvas';
    _currentLocation = 'wc_start';
    _explored.clear();
    saveState();
  }

  loadState();

  window.AlbinaMap = {
    getMapData, travelTo, getCurrentLocation, getRegion,
    getExploredLocations, resetMap, saveState, loadState,
    REGIONS: ALBINA_MAP.regions,
  };
})();
