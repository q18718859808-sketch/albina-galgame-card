// Albina SFE Engine — 序列帧CG演出引擎 v1.0.40
// Heaven's Feel grade cinematic CG animation system
// Provides frame-sequence playback, crossfades, captions, and skip for galgame CG sequences
(function () {
  const SFE = {
    iframe: null,
    doc: null,
    layer: null,
    caption: null,
    skipBtn: null,
    currentShot: null,
    playing: false,
    aborted: false,
    timers: []
  };

  function clearTimers() {
    SFE.timers.forEach((t) => clearTimeout(t));
    SFE.timers = [];
  }

  function ensureDOM() {
    const doc = SFE.doc;
    if (!doc) return false;
    if (doc.getElementById('albina-sfe-layer')) return true;

    const layer = doc.createElement('div');
    layer.id = 'albina-sfe-layer';
    layer.className = 'albina-sfe-layer';

    const vignette = doc.createElement('div');
    vignette.className = 'albina-sfe-vignette';
    layer.appendChild(vignette);

    const scanline = doc.createElement('div');
    scanline.className = 'albina-sfe-scanline';
    layer.appendChild(scanline);

    const frame = doc.createElement('div');
    frame.id = 'albina-sfe-frame';
    frame.className = 'albina-sfe-frame';
    layer.appendChild(frame);

    const caption = doc.createElement('div');
    caption.className = 'albina-sfe-caption';
    layer.appendChild(caption);
    SFE.caption = caption;

    const skip = doc.createElement('button');
    skip.className = 'albina-sfe-skip';
    skip.textContent = '跳过 ▶';
    skip.onclick = function () { SFE.abort(); };
    layer.appendChild(skip);
    SFE.skipBtn = skip;

    doc.body.appendChild(layer);
    SFE.layer = layer;
    return true;
  }

  function showLayer() {
    if (SFE.layer) SFE.layer.classList.add('visible');
  }

  function hideLayer() {
    if (SFE.layer) SFE.layer.classList.remove('visible');
    clearTimers();
    SFE.timers.push(setTimeout(function () {
      if (SFE.layer && SFE.layer.parentNode) SFE.layer.parentNode.removeChild(SFE.layer);
      SFE.layer = null;
    }, 600));
  }

  function setFrame(bgUrl) {
    const f = SFE.doc && SFE.doc.getElementById('albina-sfe-frame');
    if (!f) return;
    f.classList.remove('active');
    SFE.timers.push(setTimeout(function () {
      f.style.backgroundImage = `url("${bgUrl}")`;
      f.classList.add('active');
    }, 80));
  }

  function showCaption(text) {
    if (!SFE.caption || !text) return;
    SFE.caption.textContent = text;
    SFE.caption.classList.add('visible');
  }

  function hideCaption() {
    if (SFE.caption) SFE.caption.classList.remove('visible');
  }

  SFE.playShot = function (shot) {
    if (SFE.aborted) return;
    if (!ensureDOM()) return;
    SFE.playing = true;
    SFE.currentShot = shot;
    showLayer();

    if (shot.frames && shot.frames.length > 0) {
      let idx = 0;
      function nextFrame() {
        if (SFE.aborted || idx >= shot.frames.length) {
          if (shot.holdLast !== false) {
            SFE.timers.push(setTimeout(function () { SFE.finish(); }, shot.holdDuration || 1200));
          } else {
            SFE.finish();
          }
          return;
        }
        setFrame(shot.frames[idx].url);
        if (idx === 0 && shot.caption) showCaption(shot.caption);
        const dur = shot.frames[idx].duration || 120;
        SFE.timers.push(setTimeout(nextFrame, dur));
        idx++;
      }
      nextFrame();
    } else if (shot.imageUrl) {
      setFrame(shot.imageUrl);
      if (shot.caption) {
        SFE.timers.push(setTimeout(function () { showCaption(shot.caption); }, 400));
      }
      SFE.timers.push(setTimeout(function () { SFE.finish(); }, shot.duration || 3000));
    } else {
      SFE.finish();
    }
  };

  SFE.finish = function () {
    SFE.playing = false;
    if (SFE.currentShot && SFE.currentShot.onComplete) {
      try { SFE.currentShot.onComplete(); } catch (e) {}
    }
    hideCaption();
    SFE.timers.push(setTimeout(hideLayer, 500));
  };

  SFE.abort = function () {
    SFE.aborted = true;
    SFE.playing = false;
    clearTimers();
    hideCaption();
    hideLayer();
    if (SFE.currentShot && SFE.currentShot.onSkip) {
      try { SFE.currentShot.onSkip(); } catch (e) {}
    }
    SFE.aborted = false;
  };

  SFE.mount = function (iframe, opts) {
    SFE.iframe = iframe;
    SFE.doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
    if (!SFE.doc) {
      console.warn('[SFE] iframe document not accessible');
      return SFE;
    }
    console.log('[SFE] mounted on iframe', opts || {});
    return SFE;
  };

  SFE.isPlaying = function () { return SFE.playing; };

  window.AlbinaSFE = SFE;
})();
