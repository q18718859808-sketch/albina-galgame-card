// Albina SFE Director — 场景镜头编排器 v1.0.40
// Maps sceneId → SFE shot definitions (image sequences with crossfades + captions)
// Triggered by postMessage {__albinaCinema:true, event, phase} from galgame frontend
(function () {
  const Director = {
    SHOT_MAP: {},
    engine: null
  };

  // CDN base for CG images — aligned with galgame frontend Ux() base
  const CDN = 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card/assets';

  function cg(name) { return `${CDN}/cg/${name}.jpg`; }
  function og(name) { return `${CDN}/original_cg/${name}.png`; }

  // ── 开场雨夜 ──
  Director.SHOT_MAP.opening_001 = {
    imageUrl: cg('opening_rain'),
    caption: '雨落在后巷，霓虹倒映在积水的路面。',
    duration: 3200,
    holdDuration: 800
  };

  // ── 白色画布路线 — 初始画廊 ──
  Director.SHOT_MAP.white_canvas_001 = {
    imageUrl: cg('first_gallery'),
    caption: '她推开画室的门，白色画布在等待。',
    duration: 3000
  };
  Director.SHOT_MAP.white_canvas_005 = {
    imageUrl: cg('white_canvas_choice'),
    caption: '第一幅白画即将完成——此刻，你做出了选择。',
    duration: 2800
  };
  Director.SHOT_MAP.white_canvas_010 = {
    imageUrl: cg('white_canvas_ending'),
    caption: '白色画布路线 · 终幕。',
    duration: 4000,
    holdDuration: 1500
  };

  // ── 金枝重构路线 ──
  Director.SHOT_MAP.golden_bough_rebuild_001 = {
    imageUrl: cg('golden_bough_rebuild'),
    caption: '金枝裂隙在镜廊深处展开。',
    duration: 3000
  };
  Director.SHOT_MAP.golden_bough_rebuild_006 = {
    imageUrl: cg('rebuild_awakening'),
    caption: '重构的黎明降临，她的义体在光芒中复苏。',
    duration: 3200
  };
  Director.SHOT_MAP.golden_bough_rebuild_010 = {
    imageUrl: cg('golden_bough_ending'),
    caption: '金枝重构路线 · 终幕。',
    duration: 4000,
    holdDuration: 1500
  };

  // ── 环指共谋路线 ──
  Director.SHOT_MAP.ring_conspiracy_001 = {
    imageUrl: cg('ring_invitation'),
    caption: '环指的邀请函在烛光中展开。',
    duration: 3000
  };
  Director.SHOT_MAP.ring_conspiracy_005 = {
    imageUrl: cg('conspiracy_contract'),
    caption: '契约核心被反写——蜘蛛巢的真相浮现。',
    duration: 2800
  };
  Director.SHOT_MAP.ring_conspiracy_010 = {
    imageUrl: cg('ring_conspiracy_ending'),
    caption: '环指共谋路线 · 终幕。',
    duration: 4000,
    holdDuration: 1500
  };

  // ── AI 原创CG 镜头 (v1.0.40 新增) ──
  Director.SHOT_MAP.canto_ix_opening = {
    imageUrl: og('canto_ix_opening'),
    caption: ' canti IX · 序章在灰烬中展开。',
    duration: 4000,
    holdDuration: 1200
  };
  Director.SHOT_MAP.albina_debut = {
    imageUrl: og('albina_debut'),
    caption: '她第一次出现在你面前——阿尔比娜。',
    duration: 3500
  };
  Director.SHOT_MAP.rain_confession_cg = {
    imageUrl: og('rain_confession'),
    caption: '雨夜告白 · 屋顶上的告白。',
    duration: 3200
  };
  Director.SHOT_MAP.battle_climax_cg = {
    imageUrl: og('battle_climax'),
    caption: '最终对峙 · 义体与巨剑的交锋。',
    duration: 3500,
    holdDuration: 1000
  };
  Director.SHOT_MAP.hell_gate_cg = {
    imageUrl: og('hell_gate'),
    caption: '地狱之门 · 她踏入那个不该存在的世界。',
    duration: 3800,
    holdDuration: 1200
  };

  // ── 信任/危险阈值 CG ──
  Director.SHOT_MAP.trust_threshold = {
    imageUrl: cg('trust_threshold'),
    caption: '信任阈值突破——她的目光不再是审视。',
    duration: 3000
  };
  Director.SHOT_MAP.danger_threshold = {
    imageUrl: cg('danger_threshold'),
    caption: '危险阈值告警——脉搏涌入红色。',
    duration: 2800
  };
  Director.SHOT_MAP.art_resonance = {
    imageUrl: cg('art_resonance'),
    caption: '艺术共鸣 · 她的画作开始回应你。',
    duration: 3200
  };

  // ── 角色flash CG ──
  Director.SHOT_MAP.maestro_shadow = {
    imageUrl: cg('maestro_shadow'),
    caption: '首席的阴影降临——艺术与权力的边界。',
    duration: 3000
  };
  Director.SHOT_MAP.fascia_heartbeat = {
    imageUrl: cg('fascia_heartbeat'),
    caption: '法西娅的心跳在远处回荡。',
    duration: 2800
  };
  Director.SHOT_MAP.hollow_torso_reveal = {
    imageUrl: cg('hollow_torso_reveal'),
    caption: '空洞的躯干被揭开——她不是人。',
    duration: 3500,
    holdDuration: 1000
  };
  Director.SHOT_MAP.surgery_of_memory = {
    imageUrl: cg('surgery_of_memory'),
    caption: '记忆手术 · 她用冰冷的义手剥离你的过往。',
    duration: 3200
  };

  Director.registerAll = function (engine) {
    Director.engine = engine;
    console.log('[SFE Director] registered', Object.keys(Director.SHOT_MAP).length, 'shots');
    return Director;
  };

  Director.triggerByMarker = function (engine, marker) {
    if (!engine || !engine.playShot) {
      console.warn('[SFE Director] engine not ready for marker', marker);
      return false;
    }
    const shot = Director.SHOT_MAP[marker];
    if (!shot) {
      console.log('[SFE Director] no shot for marker', marker);
      return false;
    }
    console.log('[SFE Director] triggering shot', marker);
    engine.playShot(shot);
    return true;
  };

  Director.hasShot = function (marker) {
    return !!Director.SHOT_MAP[marker];
  };

  window.AlbinaSFE = window.AlbinaSFE || {};
  window.AlbinaSFEDirector = Director;
})();
