<script setup lang="ts">
import { nextTick, onBeforeUnmount, watch } from 'vue';

import type { PortraitCue } from '../domain/scene-cue';
import type { PortraitService } from '../runtime/portraits';

const props = defineProps<{ portraits: PortraitCue[]; service: PortraitService }>();
const canvases = new Map<string, HTMLCanvasElement>();

function canvasRef(id: string, element: unknown): void {
  if (element instanceof HTMLCanvasElement) canvases.set(id, element);
  else canvases.delete(id);
}

async function render(): Promise<void> {
  props.service.stopAll();
  await nextTick();
  await Promise.all(props.portraits.map(async (portrait) => {
    const canvas = canvases.get(portrait.characterId);
    if (canvas) await props.service.play(portrait.portraitAssetId, canvas);
  }));
}

watch(() => props.portraits, () => { void render(); }, { deep: true, immediate: true });
onBeforeUnmount(() => props.service.stopAll());
</script>

<template>
  <div class="portrait-stage" aria-label="角色立绘">
    <canvas
      v-for="portrait in portraits"
      :key="`${portrait.characterId}:${portrait.portraitAssetId}`"
      :ref="(element) => canvasRef(portrait.characterId, element)"
      class="portrait-stage__canvas"
      :class="[`portrait-stage__canvas--${portrait.position}`, { 'is-active': portrait.active }]"
      width="512"
      height="768"
      :style="{ transform: `translateX(-50%) scale(${portrait.scale})` }"
    />
  </div>
</template>
