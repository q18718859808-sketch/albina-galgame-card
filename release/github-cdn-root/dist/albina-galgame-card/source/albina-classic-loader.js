const globalKey = '__albinaV2SourcePromise__';
const sourceUrl = new URL('./albina-source.js', import.meta.url).href;

if (!window[globalKey]) {
  const loading = import(/* @vite-ignore */ sourceUrl);
  window[globalKey] = loading;
  loading.catch((error) => {
    delete window[globalKey];
    console.error('[Albina] failed to load the v2 source module.', error);
  });
}
