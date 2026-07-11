<script setup lang="ts">
import {
  CANONICAL_CDN_BASE,
  LEGACY_BUNDLE_PATH,
  LEGACY_BUNDLE_VERSION,
} from './legacy/legacy-runtime';
</script>

<template>
  <main class="source-baseline" data-albina-application>
    <p class="source-baseline__eyebrow">Albina Galgame Card</p>
    <h1>Source recovery baseline</h1>
    <p>
      The recovered Vue application is ready while the v{{ LEGACY_BUNDLE_VERSION }}
      console remains the compatibility oracle.
    </p>
    <dl>
      <dt>Legacy bundle</dt>
      <dd>{{ LEGACY_BUNDLE_PATH }}</dd>
      <dt>Canonical CDN</dt>
      <dd>{{ CANONICAL_CDN_BASE }}</dd>
    </dl>
  </main>
</template>
