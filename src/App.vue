<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';

import audioLicensesJson from '../content/audio-licenses-v1.json';
import PortraitStage from './components/PortraitStage.vue';
import { AudioLicenseRegistrySchema } from './domain/assets';
import { ALBINA_RELEASE_VERSION } from './runtime/asset-resolver';
import { useGameStore } from './stores/game';

const game = useGameStore();
const audioCredits = AudioLicenseRegistrySchema.parse(audioLicensesJson);
const importText = ref('');
const exportText = ref('');
const galleryAssets = computed(() => game.galleryIds.map((id) => ({ id, url: game.assetUrl(id) })).filter((asset) => asset.url));

function exportCurrentSave(): void { exportText.value = game.exportSave(); }
async function importCurrentSave(): Promise<void> { if (importText.value.trim()) await game.importSave(importText.value); }
onBeforeUnmount(() => { game.disposeUiListeners(); game.runtime.unmount(); });
</script>

<template>
  <main class="albina-app" data-albina-application :data-screen="game.screen">
    <section v-if="game.screen === 'title'" class="title-screen" data-testid="title-screen">
      <div class="title-screen__veil" />
      <div class="title-screen__content">
        <p class="eyebrow">Canto IX · 独立前端卡</p>
        <h1>ALBINA</h1>
        <p class="subtitle">白色画布上的残响</p>
        <nav class="title-actions" aria-label="主菜单">
          <button data-testid="new-game" @click="game.start">开始新篇</button>
          <button data-testid="continue-game" :disabled="game.loading" @click="game.continueGame">继续</button>
          <button data-testid="title-saves" @click="game.openSaves">存档</button>
          <button @click="game.openGallery">CG 图鉴</button>
          <button data-testid="title-settings" @click="game.screen = 'settings'">设置</button>
          <button data-testid="title-credits" @click="game.screen = 'credits'">版权与鸣谢</button>
        </nav>
        <p class="build-state">v{{ ALBINA_RELEASE_VERSION }} · 确定性主剧情 · 运行时零媒体 API</p>
      </div>
    </section>

    <section v-else-if="game.screen === 'saves'" class="panel-screen" data-testid="saves-screen">
      <header><button @click="game.screen = 'title'">返回</button><h2>存档管理</h2></header>
      <div class="slot-actions"><button data-testid="save-slot-1" @click="game.saveSlot(1)">保存到槽位 1</button><button @click="game.saveSlot(2)">保存到槽位 2</button><button @click="game.saveSlot(3)">保存到槽位 3</button></div>
      <div class="save-slot-grid">
        <article v-for="slot in game.saveSlots" :key="slot.id" class="save-slot" :data-save-id="slot.id">
          <img v-if="slot.thumbnailUrl" :src="slot.thumbnailUrl" alt="存档缩略图">
          <div><strong>{{ slot.id }}</strong><p>{{ slot.sceneId }}</p><time>{{ slot.updatedAt }}</time></div>
          <button @click="game.restoreSlot(slot.id)">读取</button><button @click="game.deleteSlot(slot.id)">删除</button>
        </article>
        <p v-if="game.saveSlots.length === 0">暂无普通存档。</p>
      </div>
    </section>

    <section v-else-if="game.screen === 'gallery'" class="panel-screen" data-testid="gallery-screen">
      <header><button @click="game.backToGame">返回</button><h2>CG 图鉴</h2></header>
      <div class="gallery-grid">
        <figure v-for="asset in galleryAssets" :key="asset.id"><img :src="asset.url" :alt="asset.id" crossorigin="anonymous"><figcaption>{{ asset.id }}</figcaption></figure>
        <p v-if="galleryAssets.length === 0">尚未解锁 CG。</p>
      </div>
    </section>

    <section v-else-if="game.screen === 'settings'" class="panel-screen" data-testid="settings-screen">
      <header><button @click="game.screen = 'title'">返回</button><h2>演出设置</h2></header>
      <label><input v-model="game.videoEnabled" type="checkbox"> 启用动画 CG（移动端可关闭）</label>
      <label><input v-model="game.reducedMotion" type="checkbox"> 减少动态效果</label>
      <label><input :checked="game.muted" type="checkbox" @change="game.toggleMute"> 静音</label>
      <button data-testid="autoplay-recovery" @click="game.recoverAutoplay">恢复音频播放</button>
      <button data-testid="settings-credits" @click="game.screen = 'credits'">查看版权与鸣谢</button>
      <p class="asset-status">运行时不请求媒体生成接口。包内配乐均已登记来源、文件校验值与再分发许可。</p>
    </section>

    <section v-else-if="game.screen === 'credits'" class="panel-screen credits-screen" data-testid="credits-screen">
      <header><button @click="game.screen = 'title'">返回</button><h2>版权与鸣谢</h2></header>
      <p class="credits-notice">{{ audioCredits.packagedNotice }}</p>
      <ol class="credits-list" aria-label="包内配乐">
        <li v-for="track in audioCredits.tracks" :key="track.assetId">
          <h3>{{ track.title }}</h3>
          <p>{{ track.creator }} · ISRC {{ track.isrc }} · cue: {{ track.cueAlias }}</p>
          <p>{{ track.attribution }}</p>
          <nav aria-label="曲目版权链接">
            <a :href="track.sourceUrl" target="_blank" rel="noopener noreferrer">曲目来源</a>
            <a :href="track.licenseUrl" target="_blank" rel="noopener noreferrer">CC BY 4.0 许可</a>
          </nav>
        </li>
      </ol>
      <section class="official-listening" aria-labelledby="official-soundtrack-title">
        <h3 id="official-soundtrack-title">ProjectMoon 官方 OST</h3>
        <p>{{ audioCredits.officialSoundtrack.notice }}</p>
        <nav aria-label="官方 OST 外部试听">
          <a v-for="link in audioCredits.officialSoundtrack.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
          <a :href="audioCredits.officialSoundtrack.termsUrl" target="_blank" rel="noopener noreferrer">ProjectMoon 服务条款</a>
        </nav>
      </section>
    </section>

    <section v-else class="game-screen" data-testid="game-screen" :data-scene-id="game.scene.id">
      <img v-if="game.media.backgroundUrl" class="game-screen__background" :src="game.media.backgroundUrl" alt="" crossorigin="anonymous">
      <video
        v-if="game.media.videoUrl"
        class="game-screen__video"
        :src="game.media.videoUrl"
        :poster="game.media.fallbackUrl"
        autoplay muted loop playsinline
        crossorigin="anonymous"
        data-testid="scene-video"
        @error="game.setVideoFailed"
      />
      <img v-else-if="game.media.fallbackUrl" class="game-screen__cg" :src="game.media.fallbackUrl" alt="剧情 CG" data-testid="static-fallback" crossorigin="anonymous">
      <PortraitStage :portraits="game.scene.portraits" :service="game.runtime.portraits" />

      <header class="game-hud">
        <span>CH.{{ game.scene.chapter }} · {{ game.scene.locationId }}</span>
        <span>信任 {{ game.save.values.trust }} / 危险 {{ game.save.values.danger }} / 共鸣 {{ game.save.values.artResonance }}</span>
        <nav><button @click="game.quickSave">快速存档</button><button data-testid="game-saves" @click="game.openSaves">存档</button><button @click="game.openGallery">图鉴</button><button data-testid="game-settings" @click="game.screen = 'settings'">设置</button><button @click="game.toggleMute">{{ game.muted ? '启音' : '静音' }}</button></nav>
      </header>

      <article class="dialogue-box" data-testid="dialogue-box" @click="game.completeText">
        <h2>{{ game.scene.speaker }}</h2>
        <p>{{ game.visibleText }}</p>
        <div v-if="game.resultText" class="result-overlay" data-testid="choice-result">
          <p>{{ game.resultText }}</p><button @click.stop="game.dismissResult">继续</button>
        </div>
        <div v-else class="choice-list">
          <button v-for="choice in game.choices" :key="choice.id" :data-choice-id="choice.id" @click.stop="game.choose(choice.id)">{{ choice.text }}</button>
          <p v-if="game.scene.ending" class="ending-mark">{{ game.scene.ending.route }} · {{ game.scene.ending.kind }} END</p>
        </div>
      </article>

      <details class="save-tools"><summary>存档导入 / 导出</summary>
        <button @click="exportCurrentSave">导出当前存档</button><textarea v-model="exportText" readonly aria-label="导出存档" />
        <textarea v-model="importText" aria-label="导入存档" placeholder="粘贴 SaveV2 JSON" /><button @click="importCurrentSave">导入</button>
      </details>
    </section>
  </main>
</template>
