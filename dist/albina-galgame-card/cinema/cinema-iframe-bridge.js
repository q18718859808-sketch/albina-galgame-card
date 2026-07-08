// Albina Cinema iframe-bridge v1.0.40
// Injects into galgame iframe so postMessage events from the frontend trigger cinematic effects
// Inside the iframe, this script listens for {__albinaCinema:true, event, phase, route, tone}
(function () {
  if (window.__albinaCinemaBridge) return;
  window.__albinaCinemaBridge = true;

  // Route → tint color mapping
  const TINT_BY_ROUTE = {
    white_canvas: 'warm',
    golden_bough_rebuild: 'cold',
    ring_conspiracy: 'crimson'
  };

  // Trigger sceneId → cinematic preset
  const CINEMATIC_TRIGGERS = {
    opening_001: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'cold', glow: true, flashDuration: 200,
        titleText: ' canti IX', duration: 2800
      });
    },
    trust_threshold: function () {
      window.AlbinaCinema.cinematicSequence({ tint: 'warm', glow: true, duration: 2200 });
    },
    danger_threshold: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'crimson', flashDuration: 300, duration: 2400
      });
    },
    hollow_torso_reveal: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'cold', flashDuration: 400, glow: false, duration: 3000,
        titleText: '那不是人。'
      });
    },
    surgery_of_memory: function () {
      window.AlbinaCinema.cinematicSequence({ tint: 'cold', glow: true, duration: 2600 });
    },
    white_canvas_010: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'warm', glow: true, duration: 3500,
        titleText: '白色画布 · 终幕'
      });
    },
    golden_bough_rebuild_010: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'cold', glow: true, duration: 3500,
        titleText: '金枝重构 · 终幕'
      });
    },
    ring_conspiracy_010: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'crimson', glow: false, flashDuration: 380, duration: 3500,
        titleText: '环指共谋 · 终幕'
      });
    },
    battle_climax_cg: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'crimson', flashDuration: 450, duration: 2800
      });
    },
    hell_gate_cg: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'crimson', glow: true, flashDuration: 350, duration: 3200,
        titleText: '地狱之门'
      });
    },
    albina_debut: function () {
      window.AlbinaCinema.cinematicSequence({
        tint: 'cold', glow: true, flashDuration: 200, duration: 2600,
        titleText: '阿尔比娜'
      });
    }
  };

  window.addEventListener('message', function (e) {
    const d = e.data;
    if (!d || !d.__albinaCinema) return;
    if (typeof window.AlbinaCinema === 'undefined') return;

    const phase = d.phase;
    const sceneId = d.sceneId || d.event;
    const route = d.route;
    const tone = d.tone;

    console.log('[Cinema Bridge] event', sceneId, 'phase', phase, 'route', route);

    if (phase === 'route_select' && route) {
      window.AlbinaCinema.cinematicSequence({
        tint: TINT_BY_ROUTE[route] || 'warm',
        glow: true,
        flashDuration: 300,
        duration: 2400
      });
      return;
    }

    if (phase === 'scene_change') {
      // Set ambient tint for the route
      if (route && TINT_BY_ROUTE[route]) {
        window.AlbinaCinema.setTint(TINT_BY_ROUTE[route]);
      }
      // Trigger specific cinematic sequences
      const trigger = CINEMATIC_TRIGGERS[sceneId];
      if (trigger) trigger();
      else if (tone === 'ending') {
        window.AlbinaCinema.cinematicSequence({
          tint: route ? TINT_BY_ROUTE[route] : 'warm',
          glow: true, duration: 3000
        });
      }
    }
  });

  console.log('[Cinema Bridge] ready, monitoring', Object.keys(CINEMATIC_TRIGGERS).length, 'trigger scenes');
})();
