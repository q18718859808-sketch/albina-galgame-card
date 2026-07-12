import { createPinia } from 'pinia';
import { createApp, type App as VueApplication } from 'vue';

import App from './App.vue';
import './styles.css';

import { ALBINA_CDN_BASE, ALBINA_RELEASE_VERSION } from './runtime/asset-resolver';

export {
  CANONICAL_CDN_BASE,
  LEGACY_BUNDLE_PATH,
  LEGACY_BUNDLE_VERSION,
  resolveCanonicalCdnAsset,
} from './legacy/legacy-runtime';

export function mountAlbinaApplication(target: Element | string): VueApplication {
  const application = createApp(App);
  application.use(createPinia());
  application.mount(target);
  return application;
}

export function installAlbinaOneClick(): void {
  if (typeof document === 'undefined' || document.querySelector('[data-albina-launcher]')) return;
  if (import.meta.url.endsWith('/albina-source.js') && !document.querySelector('link[data-albina-style]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.dataset.albinaStyle = 'v2';
    style.href = new URL('./albina-source.css', import.meta.url).href;
    document.head.append(style);
  }
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.dataset.albinaLauncher = 'v2';
  launcher.textContent = '打开阿尔比娜前端';
  Object.assign(launcher.style, { position: 'fixed', right: '18px', bottom: '18px', zIndex: '2147483646' });
  launcher.addEventListener('click', () => {
    let shell = document.querySelector<HTMLElement>('[data-albina-shell]');
    if (!shell) {
      shell = document.createElement('section');
      shell.dataset.albinaShell = 'v2';
      Object.assign(shell.style, { position: 'fixed', inset: '0', zIndex: '2147483647', background: '#020308' });
      const close = document.createElement('button');
      close.type = 'button';
      close.textContent = '关闭';
      Object.assign(close.style, { position: 'absolute', right: '12px', top: '12px', zIndex: '4' });
      const root = document.createElement('div');
      root.id = 'albina-v2-root';
      shell.append(root, close);
      document.body.append(shell);
      const application = mountAlbinaApplication(root);
      close.addEventListener('click', () => { application.unmount(); shell?.remove(); });
    }
  });
  document.body.append(launcher);
}

export { ALBINA_CDN_BASE, ALBINA_RELEASE_VERSION };

if (typeof window !== 'undefined' && !window.__ALBINA_DISABLE_AUTOINSTALL__) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installAlbinaOneClick, { once: true });
  else installAlbinaOneClick();
}
