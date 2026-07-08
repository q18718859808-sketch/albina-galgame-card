// Albina OpeningMovie / EndingMovie Video Injector
// v1.0.40 — 用真实 OP/ED 视频替换默认的静态 CG 序列
// 通过 postMessage 接管 bootPhase=opening_movie，播放完毕后切回 title
(async function () {
  const VERSION = 'v1.0.40';
  const CDN_BASE = `https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@${VERSION}/dist/albina-galgame-card`;
  const OP_URL = `${CDN_BASE}/assets/videos/op.mp4`;
  const ED_URL = `${CDN_BASE}/assets/videos/ed.mp4`;

  // 等待 iframe 加载（同 SFE/Cinema 的模式）
  function waitIframe(t = 30000) {
    return new Promise((r, j) => {
      const e = document.querySelector('iframe[script_id]');
      if (e) return r(e);
      const tm = setTimeout(() => j(new Error('iframe timeout')), t);
      const o = new MutationObserver(() => {
        const f = document.querySelector('iframe[script_id]');
        if (f) { clearTimeout(tm); o.disconnect(); r(f); }
      });
      o.observe(document.body, { childList: true, subtree: true });
    });
  }

  // 在 iframe 内部插入 video 容器并播放
  function mountVideo(iframe, url, opts) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (!doc) return false;
    if (doc.getElementById('albina-video-layer')) return true;

    const layer = doc.createElement('div');
    layer.id = 'albina-video-layer';
    Object.assign(layer.style, {
      position: 'fixed', inset: '0', zIndex: '99999',
      background: '#000', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    });

    const video = doc.createElement('video');
    video.src = url;
    video.playsInline = true;
    video.controls = false;
    video.preload = 'auto';
    Object.assign(video.style, {
      width: '100%', height: '100%',
      objectFit: 'contain', background: '#000'
    });
    layer.appendChild(video);

    // 跳过按钮
    const skip = doc.createElement('button');
    skip.textContent = '跳过 ▶';
    Object.assign(skip.style, {
      position: 'absolute', bottom: '32px', right: '32px',
      padding: '10px 24px', background: 'rgba(20,20,20,0.7)',
      color: '#e8e8e8', border: '1px solid #666', borderRadius: '4px',
      cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '14px',
      zIndex: '100000'
    });
    skip.onclick = () => { video.pause(); finish(); };
    layer.appendChild(skip);

    function finish() {
      layer.remove();
      // 通知 Galgame 前端进入下一阶段
      try {
        iframe.contentWindow.postMessage({
          __albinaVideo: true,
          event: opts.onCompleteEvent || 'video_complete',
          phase: opts.phase
        }, '*');
      } catch (e) {}
      // 同时向父窗口广播
      window.postMessage({
        __albinaVideo: true,
        event: opts.onCompleteEvent || 'video_complete',
        phase: opts.phase
      }, '*');
    }

    video.onended = finish;
    layer.dataset.phase = opts.phase;

    doc.body.appendChild(layer);
    video.play().catch(() => {
      // 自动播放被阻止时，显示点击播放提示
      const hint = doc.createElement('div');
      Object.assign(hint.style, {
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        color: '#fff', fontSize: '18px', cursor: 'pointer',
        fontFamily: 'sans-serif'
      });
      hint.textContent = '▶ 点击播放 OP';
      hint.onclick = () => { hint.remove(); video.play(); };
      layer.appendChild(hint);
    });

    return true;
  }

  // 监听 bootPhase 切换事件
  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || !d.__albinaBoot) return;
    if (d.phase === 'opening_movie') {
      const f = document.querySelector('iframe[script_id]');
      if (f) mountVideo(f, OP_URL, {
        phase: 'opening_movie',
        onCompleteEvent: 'opening_complete'
      });
    } else if (d.phase === 'ending_movie') {
      const f = document.querySelector('iframe[script_id]');
      if (f) mountVideo(f, ED_URL, {
        phase: 'ending_movie',
        onCompleteEvent: 'ending_complete'
      });
    }
  });

  // 启动时如果已经在 OP 阶段，直接挂载
  try {
    const f = await waitIframe(15000);
    setTimeout(() => {
      try {
        const w = f.contentWindow;
        // 默认播放 OP（如果当前 phase 是 opening 或 splash）
        mountVideo(f, OP_URL, {
          phase: 'opening_movie',
          onCompleteEvent: 'opening_complete'
        });
      } catch (e) {
        console.warn('[AlbinaVideo] 自动挂载失败', e);
      }
    }, 800);
  } catch (e) {
    console.warn('[AlbinaVideo] iframe 未就绪，等待 bootPhase 事件', e);
  }

  console.log('[AlbinaVideo] OP/ED 视频注入器已就绪 @', VERSION);
})();
