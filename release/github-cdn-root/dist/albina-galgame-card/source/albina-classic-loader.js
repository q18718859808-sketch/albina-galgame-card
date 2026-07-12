(function loadAlbinaSourceFromClassicScript() {
  var globalKey = '__albinaV2SourcePromise__';
  var fallbackSourceUrl = 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card/source/albina-source.js';
  var currentScript = document.currentScript;
  var configuredBase = window.__ALBINA_BASE_URL__;
  var sourceUrl = configuredBase
    ? new URL('source/albina-source.js', configuredBase.endsWith('/') ? configuredBase : configuredBase + '/').href
    : currentScript && currentScript.src
    ? new URL('./albina-source.js', currentScript.src).href
    : fallbackSourceUrl;
  var existing = window[globalKey];
  if (existing) return;

  var loading = import(sourceUrl);
  window[globalKey] = loading;
  loading.catch(function reportAndAllowRetry(error) {
    delete window[globalKey];
    console.error('[Albina] failed to load the v2 source module.', error);
  });
}());
