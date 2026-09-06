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

export function installAlbinaOneClick(options: InstallOptions = {}): AlbinaInstallation | undefined {
  if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;
  const hostWindow = resolveAlbinaLifecycleWindow(window) as AlbinaHostWindow;
  const hostDocument = hostWindow.document;
  if (hostWindow.__ALBINA_INSTALLATION__) return hostWindow.__ALBINA_INSTALLATION__;

  let state: AlbinaLauncherState = 'loading';
  let disposed = false;
  let shell: HTMLElement | undefined;
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
    shell?.remove();
    shell = undefined;
    if (!disposed) setState('closed');
  };

  const open = (): void => {
    if (disposed || state === 'loading' || state === 'error' || shell?.isConnected) return;
    try {
      shell = hostDocument.createElement('section');
      shell.dataset.albinaShell = 'v2';
      Object.assign(shell.style, { position: 'fixed', inset: '0', zIndex: '2147483647', background: '#020308' });
      const closeButton = hostDocument.createElement('button');
      closeButton.type = 'button';
      closeButton.textContent = '关闭';
      closeButton.dataset.albinaClose = 'v2';
      Object.assign(closeButton.style, { position: 'absolute', right: '12px', top: '12px', zIndex: '4' });
      const root = hostDocument.createElement('div');
      root.id = 'albina-v2-root';
      shell.append(root, closeButton);
      hostDocument.body.append(shell);
      closeButton.addEventListener('click', close, { once: true });
      application = mount(root);
      setState('open');
    } catch (error) {
      application?.unmount();
      application = undefined;
      shell?.remove();
      shell = undefined;
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
  let installation: AlbinaInstallation;
  const uninstall = (): void => {
    if (disposed) return;
    disposed = true;
    close();
    listeners.splice(0).forEach(([target, name, listener]) => target.removeEventListener(name, listener));
    launcher.removeEventListener('click', open);
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
  launcher.addEventListener('click', open);
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
