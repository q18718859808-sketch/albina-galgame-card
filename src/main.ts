import { createPinia } from 'pinia';
import { createApp, type App as VueApplication } from 'vue';

import App from './App.vue';
import './styles.css';

import { ALBINA_CDN_BASE, ALBINA_RELEASE_VERSION } from './runtime/asset-resolver';
import { isPersistedPagehide, resolveAlbinaLifecycleWindow } from './runtime/lifecycle';

export type AlbinaLauncherState = 'loading' | 'ready' | 'open' | 'error' | 'closed';

export interface AlbinaInstallation {
  readonly document: Document;
  readonly launcher: HTMLButtonElement;
  readonly state: AlbinaLauncherState;
  open(): void;
  close(): void;
  uninstall(): void;
}

interface AlbinaHostWindow extends Window {
  __ALBINA_INSTALLATION__?: AlbinaInstallation;
}

interface InstallOptions {
  sourceUrl?: string;
  mount?: typeof mountAlbinaApplication;
}

export function mountAlbinaApplication(target: Element | string): VueApplication {
  const application = createApp(App);
  application.use(createPinia());
  application.mount(target);
  return application;
}

export function resolveAlbinaHostDocument(currentWindow: Window = window): Document {
  return resolveAlbinaLifecycleWindow(currentWindow).document;
}

/**
 * pagehide belongs to the document that owns the launcher. In a TavernHelper
 * iframe the child window can be torn down independently, but registering the
 * same lifecycle callback on both windows creates duplicate teardown paths.
 */
export function resolveAlbinaPagehideWindow(currentWindow: Window, hostWindow: Window): Window {
  return hostWindow === currentWindow ? currentWindow : hostWindow;
}

/**
 * The frontend boots inside a dedicated fullscreen iframe owned by the host
 * page (the proven v1 console architecture). Hosting the app in its own
 * document isolates it from SillyTavern styles, stacking contexts, and layout
 * — a shell appended to the host body can be clipped or covered there, which
 * is exactly the "launcher click does nothing" failure mode observed in the
 * real host. The DOM launcher stays as a visible toggle; the frontend itself
 * auto-opens on install (bootstrap), matching the v1 behavior.
 */
export function installAlbinaOneClick(options: InstallOptions = {}): AlbinaInstallation | undefined {
  if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;
  const hostWindow = resolveAlbinaLifecycleWindow(window) as AlbinaHostWindow;
  const hostDocument = hostWindow.document;
  if (hostWindow.__ALBINA_INSTALLATION__) return hostWindow.__ALBINA_INSTALLATION__;

  let state: AlbinaLauncherState = 'loading';
  let disposed = false;
  let frame: HTMLIFrameElement | undefined;
  let application: VueApplication | undefined;
  let style: HTMLLinkElement | undefined;
  const sourceUrl = options.sourceUrl ?? import.meta.url;
  const mount = options.mount ?? mountAlbinaApplication;
  const launcher = hostDocument.createElement('button');
  launcher.type = 'button';
  launcher.dataset.albinaLauncher = 'v2';
  launcher.setAttribute('aria-live', 'polite');
  Object.assign(launcher.style, { position: 'fixed', right: '18px', bottom: '18px', zIndex: '2147483646' });

  const setState = (next: AlbinaLauncherState, message?: string): void => {
    state = next;
    launcher.dataset.albinaState = next;
    launcher.disabled = next === 'loading';
    launcher.textContent = message ?? (next === 'loading' ? 'Albina frontend loading...' : next === 'error' ? 'Albina frontend failed to load' : next === 'open' ? 'Albina frontend open' : 'Open Albina frontend');
    launcher.title = message ?? '';
  };

  const close = (): void => {
    application?.unmount();
    application = undefined;
    frame?.remove();
    frame = undefined;
    if (!disposed) setState('closed');
  };

  /** Globals the runtime expects from the TavernHelper script frame. */
  const bridgeFrameGlobals = (frameWindow: Window): void => {
    const scriptWindow = window as unknown as Window & Record<string, unknown>;
    for (const key of ['TavernHelper', 'eventOn', 'eventEmit', 'eventOnce', 'eventOff', 'tavern_events', 'getScriptId', 'getIframeName', 'triggerSlash', 'replaceScriptButtons', 'getButtonEvent']) {
      const value = scriptWindow[key];
      if (value !== undefined) {
        try { (frameWindow as unknown as Window & Record<string, unknown>)[key] = value; } catch { /* cross-origin frame: ignore */ }
      }
    }
  };

  const onFrameLoad = (): void => {
    if (disposed || !frame?.contentDocument?.body) return;
    try {
      const frameDocument = frame.contentDocument;
      const root = frameDocument.createElement('div');
      root.id = 'albina-v2-root';
      frameDocument.body.append(root);
      const frameStyle = frameDocument.createElement('style');
      frameStyle.textContent = 'html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#020308}#albina-v2-root{width:100%;height:100%}';
      frameDocument.head.append(frameStyle);
      const appCssHref = hostDocument.querySelector('link[data-albina-style]')?.getAttribute('href');
      if (appCssHref) {
        const appCss = frameDocument.createElement('link');
        appCss.rel = 'stylesheet';
        appCss.href = appCssHref;
        frameDocument.head.append(appCss);
      }
      if (frame.contentWindow) bridgeFrameGlobals(frame.contentWindow);
      application = mount(root);
      setState('open');
    } catch (error) {
      application?.unmount();
      application = undefined;
      frame?.remove();
      frame = undefined;
      const reason = error instanceof Error ? error.message : String(error);
      setState('error', `Albina frontend startup failed: ${reason}`);
      console.error('[Albina] application mount failed.', error);
    }
  };

  const open = (): void => {
    if (disposed || state === 'error') return;
    if (frame?.isConnected) { close(); return; }
    try {
      frame = hostDocument.createElement('iframe');
      frame.title = 'Albina frontend';
      frame.dataset.albinaShell = 'v2';
      Object.assign(frame.style, {
        position: 'fixed',
        inset: '0',
        width: '100vw',
        height: '100dvh',
        zIndex: '2147483647',
        border: 'none',
        background: '#020308',
      });
      frame.addEventListener('load', onFrameLoad, { once: true });
      hostDocument.body.append(frame);
      // about:blank same-origin frames usually fire load before this listener
      // attaches; mount directly when the document is already interactive.
      if (frame.contentDocument?.body) onFrameLoad();
    } catch (error) {
      application?.unmount();
      application = undefined;
      frame?.remove();
      frame = undefined;
      const reason = error instanceof Error ? error.message : String(error);
      setState('error', `Albina frontend startup failed: ${reason}`);
      console.error('[Albina] application mount failed.', error);
    }
  };

  const onStyleLoad = (): void => { if (!disposed && state === 'loading') setState('ready'); };
  const onStyleError = (): void => { if (!disposed) setState('error', 'Albina stylesheet failed to load. Check the CDN or network.'); };
  const listeners: Array<[Window, string, EventListener]> = [];
  const listen = (target: Window, name: string, listener: EventListener): void => {
    target.addEventListener(name, listener);
    listeners.push([target, name, listener]);
  };
  const onLauncherClick = (): void => {
    if (state === 'open' && frame?.isConnected) { close(); return; }
    open();
  };
  let installation: AlbinaInstallation;
  const uninstall = (): void => {
    if (disposed) return;
    disposed = true;
    close();
    listeners.splice(0).forEach(([target, name, listener]) => target.removeEventListener(name, listener));
    launcher.removeEventListener('click', onLauncherClick);
    launcher.remove();
    style?.removeEventListener('load', onStyleLoad);
    style?.removeEventListener('error', onStyleError);
    style?.remove();
    style = undefined;
    if (hostWindow.__ALBINA_INSTALLATION__ === installation) delete hostWindow.__ALBINA_INSTALLATION__;
  };
  installation = {
    document: hostDocument,
    launcher,
    get state() { return state; },
    open,
    close,
    uninstall,
  };
  hostWindow.__ALBINA_INSTALLATION__ = installation;
  launcher.addEventListener('click', onLauncherClick);
  setState('loading');
  hostDocument.body.append(launcher);

  if (sourceUrl.endsWith('/albina-source.js') && !hostDocument.querySelector('link[data-albina-style]')) {
    style = hostDocument.createElement('link');
    style.rel = 'stylesheet';
    style.dataset.albinaStyle = 'v2';
    style.href = new URL(/* @vite-ignore */ './albina-source.css', sourceUrl).href;
    style.addEventListener('load', onStyleLoad, { once: true });
    style.addEventListener('error', onStyleError, { once: true });
    hostDocument.head.append(style);
  } else {
    setState('ready');
  }

  // Bootstrap: open the frontend immediately after install, like the v1
  // console. Independent of stylesheet readiness so slow networks cannot
  // leave the user stuck on a launcher that never opens; the launcher
  // remains as a manual toggle for the session.
  open();

  const lifecycleUnmount = (event?: Event): void => {
    if (isPersistedPagehide(event)) return;
    uninstall();
  };
  listen(window, 'albina:unmount', lifecycleUnmount);
  listen(resolveAlbinaPagehideWindow(window, hostWindow), 'pagehide', lifecycleUnmount);
  if (hostWindow !== window) {
    listen(hostWindow, 'albina:unmount', lifecycleUnmount);
  }
  return installation;
}

export function uninstallAlbinaOneClick(): void {
  if (typeof window === 'undefined') return;
  const hostWindow = resolveAlbinaLifecycleWindow(window) as AlbinaHostWindow;
  hostWindow.__ALBINA_INSTALLATION__?.uninstall();
}

export { ALBINA_CDN_BASE, ALBINA_RELEASE_VERSION };

if (typeof window !== 'undefined' && !window.__ALBINA_DISABLE_AUTOINSTALL__) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { installAlbinaOneClick(); }, { once: true });
  else installAlbinaOneClick();
}
