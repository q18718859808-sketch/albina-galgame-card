import { createPinia } from 'pinia';
import { createApp, type App as VueApplication } from 'vue';

import App from './App.vue';
import './styles.css';

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
