// Albina CinematicEngine — 天之杯电影化演出引擎 v1.0.40
// Provides letterbox bars, screen flash, color tint, vignette, and title cards
// for Heaven's Feel grade cinematic moments during galgame play
(function () {
  const Cinema = {
    overlay: null,
    flash: null,
    tint: null,
    vignette: null,
    glow: null,
    titleCard: null,
    active: false
  };

  function ensureDOM() {
    if (Cinema.overlay) return true;
    const el = document.createElement('div');
    el.className = 'albina-cinema-overlay';
    el.id = 'albina-cinema-overlay';

    const lt = document.createElement('div');
    lt.className = 'albina-cinema-letterbox-top';
    el.appendChild(lt);

    const lb = document.createElement('div');
    lb.className = 'albina-cinema-letterbox-bottom';
    el.appendChild(lb);

    const v = document.createElement('div');
    v.className = 'albina-cinema-vignette';
    el.appendChild(v);
    Cinema.vignette = v;

    const t = document.createElement('div');
    t.className = 'albina-cinema-tint';
    el.appendChild(t);
    Cinema.tint = t;

    const g = document.createElement('div');
    g.className = 'albina-cinema-glow';
    el.appendChild(g);
    Cinema.glow = g;

    const f = document.createElement('div');
    f.className = 'albina-cinema-flash';
    f.id = 'albina-cinema-flash';
    el.appendChild(f);
    Cinema.flash = f;

    document.body.appendChild(el);
    Cinema.overlay = el;
    return true;
  }

  Cinema.mount = function () {
    ensureDOM();
    Cinema.active = true;
    console.log('[Cinema] mounted');
    return Cinema;
  };

  Cinema.showLetterbox = function () {
    if (!ensureDOM()) return;
    Cinema.overlay.classList.add('active');
    Cinema.active = true;
  };

  Cinema.hideLetterbox = function () {
    if (Cinema.overlay) Cinema.overlay.classList.remove('active');
  };

  Cinema.flashScreen = function (duration) {
    if (!ensureDOM()) return;
    const d = duration || 150;
    Cinema.flash.classList.remove('fade');
    Cinema.flash.classList.add('flash');
    setTimeout(function () {
      Cinema.flash.classList.remove('flash');
      Cinema.flash.classList.add('fade');
    }, d);
  };

  Cinema.setTint = function (mode) {
    if (!ensureDOM()) return;
    Cinema.tint.className = 'albina-cinema-tint';
    if (mode) Cinema.tint.classList.add(mode);
  };

  Cinema.clearTint = function () {
    if (Cinema.tint) Cinema.tint.className = 'albina-cinema-tint';
  };

  Cinema.pulseGlow = function (enable) {
    if (!ensureDOM()) return;
    if (enable) Cinema.glow.classList.add('pulse');
    else Cinema.glow.classList.remove('pulse');
  };

  Cinema.showTitle = function (text, holdDuration) {
    if (!ensureDOM()) return;
    if (!Cinema.titleCard) {
      const tc = document.createElement('div');
      tc.className = 'albina-cinema-title-card';
      Cinema.overlay.appendChild(tc);
      Cinema.titleCard = tc;
    }
    Cinema.titleCard.textContent = text;
    Cinema.showLetterbox();
    setTimeout(function () {
      Cinema.titleCard.classList.add('visible');
    }, 100);
    if (holdDuration) {
      setTimeout(function () {
        Cinema.titleCard.classList.remove('visible');
        setTimeout(Cinema.hideLetterbox, 800);
      }, holdDuration);
    }
  };

  Cinema.hideTitle = function () {
    if (Cinema.titleCard) Cinema.titleCard.classList.remove('visible');
  };

  Cinema.cinematicSequence = function (opts) {
    if (!ensureDOM()) return;
    Cinema.showLetterbox();
    if (opts.tint) Cinema.setTint(opts.tint);
    if (opts.glow) Cinema.pulseGlow(true);
    setTimeout(function () { Cinema.flashScreen(opts.flashDuration || 120); }, 200);
    if (opts.titleText) {
      setTimeout(function () {
        Cinema.showTitle(opts.titleText);
      }, 400);
    }
    const total = opts.duration || 3000;
    setTimeout(function () {
      Cinema.pulseGlow(false);
      Cinema.clearTint();
      Cinema.hideTitle();
      setTimeout(Cinema.hideLetterbox, 500);
    }, total);
    if (opts.onComplete) setTimeout(opts.onComplete, total + 500);
  };

  window.AlbinaCinema = Cinema;
})();
