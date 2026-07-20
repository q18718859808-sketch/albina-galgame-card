import { createPinia } from 'pinia';
import { createApp, type App as VueApplication } from 'vue';

import App from './App.vue';
import './styles.css';

import { ALBINA_CDN_BASE, ALBINA_RELEASE_VERSION } from './runtime/asset-resolver';

export function mountAlbinaApplication(target: Element | string): VueApplication {
  const application = createApp(App);
  application.use(createPinia());
  application.mount(target);
  return application;
}

function resolveHostDocument(): Document {
  if (typeof window === 'undefined' || window.parent === window) return document;
  try {
    return window.parent.document;
  } catch {
    return document;
  }
}

export function installAlbinaOneClick(): void {
  if (typeof document === 'undefined') return;
  const hostDocument = resolveHostDocument();
  if (hostDocument.querySelector('[data-albina-launcher]')) return;
  if (import.meta.url.endsWith('/albina-source.js') && !hostDocument.querySelector('link[data-albina-style]')) {
    const style = hostDocument.createElement('link');
    style.rel = 'stylesheet';
    style.dataset.albinaStyle = 'v2';
    style.href = new URL(/* @vite-ignore */ './albina-source.css', import.meta.url).href;
    hostDocument.head.append(style);
  }
  const launcher = hostDocument.createElement('button');
  launcher.type = 'button';
  launcher.dataset.albinaLauncher = 'v2';
  launcher.textContent = '打开阿尔比娜前端';
  Object.assign(launcher.style, { position: 'fixed', right: '18px', bottom: '18px', zIndex: '2147483646' });
  launcher.addEventListener('click', () => {
    let shell = hostDocument.querySelector<HTMLElement>('[data-albina-shell]');
    if (!shell) {
      shell = hostDocument.createElement('section');
      shell.dataset.albinaShell = 'v2';
      Object.assign(shell.style, { position: 'fixed', inset: '0', zIndex: '2147483647', background: '#020308' });
      const close = hostDocument.createElement('button');
      close.type = 'button';
      close.textContent = '关闭';
      Object.assign(close.style, { position: 'absolute', right: '12px', top: '12px', zIndex: '4' });
      const root = hostDocument.createElement('div');
      root.id = 'albina-v2-root';
      shell.append(root, close);
      hostDocument.body.append(shell);
      const application = mountAlbinaApplication(root);
      close.addEventListener('click', () => { application.unmount(); shell?.remove(); });
    }
  });
  hostDocument.body.append(launcher);
}

export { ALBINA_CDN_BASE, ALBINA_RELEASE_VERSION };

if (typeof window !== 'undefined' && !window.__ALBINA_DISABLE_AUTOINSTALL__) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installAlbinaOneClick, { once: true });
  else installAlbinaOneClick();
}
