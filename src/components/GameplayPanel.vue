<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { gsap } from 'gsap';

import type { GameplayStatEffects, GameplaySystems } from '../domain/gameplay';
import type { LayeredWorldbookPresetId } from '../domain/layered-worldbooks';
import type { SaveV2 } from '../domain/save';
import { createLayeredWorldbookCatalog } from '../runtime/layered-worldbooks';

type TabId = 'status' | 'objectives' | 'challenges' | 'loadout' | 'progression' | 'codex' | 'worldbook-packages';
type StoryValueKey = 'affectionAlbina' | 'trust' | 'danger' | 'artResonance';

const props = defineProps<{
  gameplay: GameplaySystems;
  save: SaveV2;
  effectiveValues: Pick<SaveV2['values'], StoryValueKey>;
  interactionError: string | undefined;
  reducedMotion: boolean;
}>();

const emit = defineEmits<{
  close: [];
  equip: [equipmentId: string];
  wearOutfit: [outfitId: string];
  selectProfession: [professionId: string];
  selectWorldbookPreset: [presetId: LayeredWorldbookPresetId];
}>();

const tabs = [
  { id: 'worldbook-packages', label: '世界书包' },
  { id: 'status', label: '状态' },
  { id: 'objectives', label: '任务与冲突' },
  { id: 'challenges', label: '叙事挑战' },
  { id: 'loadout', label: '背包与装配' },
  { id: 'progression', label: '职业与成就' },
  { id: 'codex', label: '资料库' },
] as const;

const panel = ref<HTMLElement>();
const tabsNav = ref<HTMLElement>();
const tabIndicator = ref<HTMLElement>();
let panelContext: gsap.Context | undefined;
let tabTween: gsap.core.Tween | gsap.core.Timeline | undefined;
let indicatorTween: gsap.core.Tween | undefined;
/** Value-change pulse tweens, killed together on unmount or reduced motion. */
const statTweens = new Set<gsap.core.Tween>();
const activeTab = ref<TabId>('status');

/** Slide the active-tab indicator under the newly selected tab. */
function syncTabIndicator(tab: TabId, animate: boolean): void {
  const nav = tabsNav.value;
  const indicator = tabIndicator.value;
  if (!nav || !indicator) return;
  const button = nav.querySelector<HTMLElement>(`#gameplay-tab-${tab}`);
  if (!button) return;
  const { offsetLeft, offsetWidth } = button;
  indicatorTween?.kill();
  if (!animate || props.reducedMotion) {
    gsap.set(indicator, { left: offsetLeft, width: offsetWidth });
    return;
  }
  indicatorTween = gsap.to(indicator, { left: offsetLeft, width: offsetWidth, duration: .3, ease: 'power2.inOut' });
}
const worldbookCatalog = createLayeredWorldbookCatalog();
const selectedWorldbookPreset = computed(() => props.save.worldbook.presetId);
const selectedWorldbookPackageIds = computed(() => new Set(props.save.worldbook.packageIds));
const storyValues = [
  { key: 'affectionAlbina', label: '好感' },
  { key: 'trust', label: '信任' },
  { key: 'danger', label: '危险' },
  { key: 'artResonance', label: '共鸣' },
] as const;
const economyValues = [
  { key: 'composure', label: '镇定' },
  { key: 'materials', label: '材料' },
  { key: 'leverage', label: '筹码' },
  { key: 'exposure', label: '暴露' },
] as const;
const masteryValues = [
  { key: 'blade', label: '刃术' },
  { key: 'boundary', label: '边界' },
  { key: 'analysis', label: '解析' },
  { key: 'resonance', label: '共振' },
] as const;
const modifierLabels: Record<string, string> = {
  affectionAlbina: '好感', trust: '信任', danger: '危险', artResonance: '共鸣',
  composure: '镇定', materials: '材料', leverage: '筹码', exposure: '暴露',
};

const routeMatches = (route: SaveV2['route'] | undefined): boolean => route === undefined || route === props.save.route;
const quests = computed(() => props.gameplay.quests.filter((entry) => routeMatches(entry.route)));
const battles = computed(() => props.gameplay.battles.filter((entry) => routeMatches(entry.route)));
const objectiveSummary = computed(() => ({
  questsDone: quests.value.filter((entry) => questState(entry.id) === 'completed').length,
  questsTotal: quests.value.length,
  victories: battles.value.filter((entry) => battleState(entry.id) === 'victory').length,
  battlesTotal: battles.value.length,
  challengesDone: minigames.value.filter((entry) => minigameState(entry.id) !== 'pending').length,
  challengesTotal: minigames.value.length,
}));
const minigames = computed(() => props.gameplay.minigames.filter((entry) => routeMatches(entry.route)));
const items = computed(() => props.gameplay.items.filter((entry) => routeMatches(entry.route) && props.save.inventory.ownedIds.includes(entry.id)));
const equipment = computed(() => props.gameplay.equipment.filter((entry) => routeMatches(entry.route)));
const outfits = computed(() => props.gameplay.outfits.filter((entry) => routeMatches(entry.route)));
const professions = computed(() => props.gameplay.professions.filter((entry) => routeMatches(entry.route)));
const achievements = computed(() => props.gameplay.achievements.filter((entry) => routeMatches(entry.route)));

/**
 * Real aggregate for the progression page. Every number is read straight from
 * the save or the authored catalogue, so nothing here estimates or projects
 * progress the player has not actually reached.
 */
const progressionSummary = computed(() => {
  const unlocked = new Set(props.save.achievements.unlockedIds);
  return {
    activeProfessionLabel: professions.value.find((entry) => entry.id === props.save.professions.activeId)?.label ?? '未选择',
    professionsTotal: professions.value.length,
    professionsAdvanced: professions.value.filter((entry) => professionProgress(entry.id).level > 1).length,
    professionLevels: professions.value.reduce((total, entry) => total + professionProgress(entry.id).level, 0),
    achievementsUnlocked: achievements.value.filter((entry) => unlocked.has(entry.id)).length,
    achievementsTotal: achievements.value.length,
  };
});

onMounted(() => {
  const root = panel.value;
  if (!root) return;
  root.focus();
  void nextTick(() => syncTabIndicator(activeTab.value, false));
  if (props.reducedMotion) return;
  const backdrop = root.closest<HTMLElement>('.gameplay-panel-backdrop') ?? root;
  panelContext = gsap.context(() => {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: .2 })
      .fromTo(root, { y: 28, scale: .975, autoAlpha: 0, filter: 'blur(8px)' }, { y: 0, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: .5 }, 0)
      .fromTo('.gameplay-panel__header, .gameplay-tabs', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .32, stagger: .07 }, .18);
  }, root);
});

/**
 * Pulse the stat cards that changed value. The panel can stay open across
 * dialogue beats, so an authored value shift must be readable at a glance
 * instead of silently updating. Reduced motion still publishes the observable
 * change marker, just without the tween.
 */
function publishStatChange(key: StoryValueKey, changed: boolean): void {
  const root = panel.value;
  if (!root || !changed) return;
  const stat = root.querySelector<HTMLElement>(`[data-stat-key="${key}"]`);
  if (!stat) return;
  stat.dataset.statChanged = 'true';
  if (props.reducedMotion) return;
  statTweens.forEach((tween) => tween.kill());
  statTweens.clear();
  statTweens.add(gsap.fromTo(stat, { scale: 1, filter: 'brightness(1)' }, {
    scale: 1.1,
    filter: 'brightness(1.45)',
    duration: .3,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1,
    onComplete: () => { stat.dataset.statChanged = 'false'; },
  }));
}
let previousEffectiveValues = { ...props.effectiveValues };
watch(() => props.effectiveValues, async (values) => {
  const previous = previousEffectiveValues;
  previousEffectiveValues = { ...values };
  await nextTick();
  for (const entry of storyValues) {
    publishStatChange(entry.key, values[entry.key] !== previous[entry.key]);
  }
}, { deep: true });
watch(() => props.reducedMotion, (reducedMotion) => {
  if (!reducedMotion) return;
  statTweens.forEach((tween) => tween.kill());
  statTweens.clear();
  panel.value?.querySelectorAll<HTMLElement>('[data-stat-key]').forEach((stat) => { stat.dataset.statChanged = 'false'; });
});
onBeforeUnmount(() => {
  tabTween?.kill();
  indicatorTween?.kill();
  statTweens.forEach((tween) => tween.kill());
  statTweens.clear();
  panelContext?.revert();
});

function selectTab(tab: TabId): void {
  activeTab.value = tab;
  void nextTick(() => {
    syncTabIndicator(tab, true);
    if (!panel.value || props.reducedMotion) return;
    tabTween?.kill();
    const activePage = panel.value.querySelector<HTMLElement>(`#gameplay-page-${tab}`);
    const activeButton = panel.value.querySelector<HTMLElement>(`#gameplay-tab-${tab}`);
    tabTween = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(activeButton, { y: -2, filter: 'brightness(.88)' }, { y: 0, filter: 'brightness(1.15)', duration: .24 })
      .fromTo(activePage?.children ?? [], { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .34, stagger: .045 }, 0);
  });
}

function handleTabKey(event: KeyboardEvent, index: number): void {
  let target = index;
  if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
  else if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') target = 0;
  else if (event.key === 'End') target = tabs.length - 1;
  else return;
  event.preventDefault();
  const tab = tabs[target];
  if (!tab) return;
  selectTab(tab.id);
  requestAnimationFrame(() => document.getElementById(`gameplay-tab-${tab.id}`)?.focus());
}

function handleFocusTrap(event: KeyboardEvent): void {
  const focusable = Array.from(panel.value?.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ) ?? []).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first || !last) {
    event.preventDefault();
    return;
  }
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function signed(value: number): string {
  return `${value > 0 ? '+' : ''}${value}`;
}

function storyDelta(key: StoryValueKey): number {
  return props.effectiveValues[key] - props.save.values[key];
}

function formatModifiers(modifiers: GameplayStatEffects): string {
  const entries = Object.entries(modifiers).filter((entry): entry is [string, number] => typeof entry[1] === 'number');
  return entries.map(([key, value]) => `${modifierLabels[key] ?? key} ${signed(value)}`).join(' / ') || '无数值修正';
}

function questState(id: string): 'active' | 'completed' | 'locked' {
  if (props.save.quests.completedNodeIds.includes(id)) return 'completed';
  if (props.save.quests.activeNodeIds.includes(id)) return 'active';
  return 'locked';
}

function questStateLabel(id: string): string {
  return ({ active: '进行中', completed: '已完成', locked: '未开始' })[questState(id)];
}

function battleState(id: string): 'victory' | 'setback' | 'pending' {
  return props.save.battles.outcomes[id] ?? 'pending';
}

function battleStateLabel(id: string): string {
  return ({ victory: '胜利', setback: '受挫', pending: '未解决' })[battleState(id)];
}

function minigameState(id: string): 'completed' | 'assisted' | 'setback' | 'skipped' | 'pending' {
  const record = props.save.minigames.records[id];
  if (!record?.resolved || !record.lastOutcome) return 'pending';
  return record.lastOutcome === 'perfect' ? 'completed' : record.lastOutcome;
}

function minigameStateLabel(id: string): string {
  return ({ completed: '完美介入', assisted: '辅助完成', setback: '介入受挫', skipped: '已跳过', pending: '未触发' })[minigameState(id)];
}

function minigameRecord(id: string) { return props.save.minigames.records[id]; }

function minigameSourceScene(id: string): string | undefined {
  const entry = [...props.save.logs.story].reverse().find((log) => log.kind === 'minigame' && log.minigameId === id);
  return typeof entry?.sceneId === 'string' ? entry.sceneId : undefined;
}

function ownsEquipment(itemId: string): boolean {
  return props.save.inventory.ownedIds.includes(itemId);
}

function isEquipped(id: string): boolean {
  return Object.values(props.save.inventory.equipped).includes(id);
}

function professionProgress(id: string): { xp: number; level: number } {
  return props.save.professions.progress[id] ?? { xp: 0, level: 1 };
}

function nextProfessionThreshold(id: string): number | undefined {
  const definition = props.gameplay.professions.find((entry) => entry.id === id);
  const progress = professionProgress(id);
  return definition?.xpThresholds[progress.level];
}

function worldbookState(id: string): 'active' | 'seen' | 'locked' {
  if (props.save.worldbook.activeEntryIds.includes(id)) return 'active';
  if (props.save.worldbook.seenEntryIds.includes(id)) return 'seen';
  return 'locked';
}

function worldbookStateLabel(id: string): string {
  return ({ active: '当前激活', seen: '已阅', locked: '未阅' })[worldbookState(id)];
}

/**
 * Real aggregate for the codex page, mirroring the objectives and progression
 * summaries: counts come from the save so the numbers never imply an unlock
 * path the player has not actually walked.
 */
const codexSummary = computed(() => {
  const entries = props.gameplay.worldbookEntries;
  const states = entries.map((entry) => worldbookState(entry.id));
  return {
    total: entries.length,
    active: states.filter((state) => state === 'active').length,
    seen: states.filter((state) => state === 'seen').length,
    locked: states.filter((state) => state === 'locked').length,
  };
});
</script>

<template>
  <div class="gameplay-panel-backdrop" @click.self="emit('close')">
    <section
      ref="panel"
      class="gameplay-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gameplay-panel-title"
      tabindex="-1"
      data-testid="gameplay-panel"
      @keydown.esc.stop="emit('close')"
      @keydown.tab="handleFocusTrap"
    >
      <header class="gameplay-panel__header">
        <div>
          <p>ALBINA ARCHIVE</p>
          <h2 id="gameplay-panel-title">状态档案</h2>
        </div>
        <button type="button" aria-label="关闭状态档案" title="关闭" @click="emit('close')">关闭</button>
      </header>

      <p v-if="interactionError" class="gameplay-panel__error" role="alert" aria-live="assertive">{{ interactionError }}</p>

      <nav ref="tabsNav" class="gameplay-tabs" role="tablist" aria-label="状态档案分页" :data-active-tab="activeTab">
        <button
          v-for="(tab, index) in tabs"
          :id="`gameplay-tab-${tab.id}`"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`gameplay-page-${tab.id}`"
          :tabindex="activeTab === tab.id ? 0 : -1"
          :data-testid="`gameplay-tab-${tab.id}`"
          @click="selectTab(tab.id)"
          @keydown="handleTabKey($event, index)"
        >{{ tab.label }}</button>
        <span ref="tabIndicator" class="gameplay-tabs__indicator" aria-hidden="true" />
      </nav>

      <div class="gameplay-panel__content">
        <section
          v-show="activeTab === 'status'"
          id="gameplay-page-status"
          role="tabpanel"
          aria-labelledby="gameplay-tab-status"
          data-testid="gameplay-page-status"
        >
          <div class="gameplay-section-heading"><h3>权威数值</h3></div>
          <div class="gameplay-stat-grid">
            <article v-for="entry in storyValues" :key="entry.key">
              <span>{{ entry.label }}</span>
              <strong :data-stat-key="entry.key">{{ effectiveValues[entry.key] }}</strong>
              <small v-if="storyDelta(entry.key)">基础 {{ save.values[entry.key] }} · 修正 {{ signed(storyDelta(entry.key)) }}</small>
              <small v-else>基础值</small>
            </article>
          </div>

          <div class="gameplay-section-heading"><h3>关系向量</h3></div>
          <div class="gameplay-vector-list">
            <label v-for="track in gameplay.relationshipTracks" :key="track.id">
              <span>{{ track.label }}</span>
              <progress :value="save.values.relationshipVectors[track.id]" :min="track.minimum" :max="track.maximum" />
              <strong>{{ save.values.relationshipVectors[track.id] }}</strong>
            </label>
          </div>

          <div class="gameplay-split-grid">
            <section>
              <div class="gameplay-section-heading"><h3>路线资源</h3></div>
              <dl class="gameplay-definition-list"><template v-for="entry in economyValues" :key="entry.key"><dt>{{ entry.label }}</dt><dd>{{ save.values.routeEconomy[entry.key] }}</dd></template></dl>
            </section>
            <section>
              <div class="gameplay-section-heading"><h3>冲突专精</h3></div>
              <dl class="gameplay-definition-list"><template v-for="entry in masteryValues" :key="entry.key"><dt>{{ entry.label }}</dt><dd>{{ save.values.conflictMastery[entry.key] }}</dd></template></dl>
            </section>
          </div>
        </section>

        <section
          v-show="activeTab === 'objectives'"
          id="gameplay-page-objectives"
          role="tabpanel"
          aria-labelledby="gameplay-tab-objectives"
          data-testid="gameplay-page-objectives"
        >
          <div class="gameplay-objective-summary" data-objective-summary>
            <span>任务 {{ objectiveSummary.questsDone }} / {{ objectiveSummary.questsTotal }}</span>
            <span>冲突胜利 {{ objectiveSummary.victories }} / {{ objectiveSummary.battlesTotal }}</span>
            <span>挑战完成 {{ objectiveSummary.challengesDone }} / {{ objectiveSummary.challengesTotal }}</span>
          </div>
          <div class="gameplay-split-grid">
            <section>
              <div class="gameplay-section-heading"><h3>路线任务</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="quest in quests" :key="quest.id" :class="questState(quest.id)" :data-quest-id="quest.id" data-objective-kind="quest" :data-objective-state="questState(quest.id)" :data-quest-state="questState(quest.id)">
                  <header><strong>{{ quest.label }}</strong><span class="gameplay-state-badge" :aria-label="`任务状态：${questStateLabel(quest.id)}`">{{ questStateLabel(quest.id) }}</span></header>
                  <p>{{ quest.description }}</p>
                </article>
                <p v-if="quests.length === 0" class="gameplay-empty">当前尚未进入路线任务。</p>
              </div>
            </section>
            <section>
              <div class="gameplay-section-heading"><h3>冲突记录</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="battle in battles" :key="battle.id" :class="battleState(battle.id)" :data-battle-id="battle.id" data-objective-kind="battle" :data-objective-state="battleState(battle.id)" :data-battle-state="battleState(battle.id)">
                  <header><strong>{{ battle.label }}</strong><span class="gameplay-state-badge" :aria-label="`冲突状态：${battleStateLabel(battle.id)}`">{{ battleStateLabel(battle.id) }}</span></header>
                  <p>{{ battle.description }}</p>
                  <small>推荐专精：{{ masteryValues.find((entry) => entry.key === battle.recommendedMastery)?.label }}</small>
                </article>
                <p v-if="battles.length === 0" class="gameplay-empty">当前尚无路线冲突。</p>
              </div>
            </section>
          </div>
        </section>

        <section
          v-show="activeTab === 'challenges'"
          id="gameplay-page-challenges"
          role="tabpanel"
          aria-labelledby="gameplay-tab-challenges"
          data-testid="gameplay-page-challenges"
        >
          <div class="gameplay-section-heading">
            <h3>叙事挑战记录</h3>
            <p>完成、辅助、受挫和跳过均会写入当前 SaveV2。</p>
          </div>
          <div class="gameplay-entry-list gameplay-minigame-list">
            <article
              v-for="minigame in minigames"
              :key="minigame.id"
              :class="minigameState(minigame.id)"
              :data-minigame-id="minigame.id"
              :data-minigame-outcome="minigameRecord(minigame.id)?.lastOutcome ?? 'pending'"
            >
              <header><strong>{{ minigame.label }}</strong><span class="gameplay-state-badge">{{ minigameStateLabel(minigame.id) }}</span></header>
              <p>{{ minigame.description }}</p>
              <small v-if="minigameRecord(minigame.id)">尝试 {{ minigameRecord(minigame.id)?.attempts }} 次 · 最佳 {{ minigameRecord(minigame.id)?.bestScore }} 分 · {{ minigameRecord(minigame.id)?.assisted ? '已使用辅助' : '未使用辅助' }}</small>
              <small v-if="minigameSourceScene(minigame.id)">剧情来源：{{ minigameSourceScene(minigame.id) }}</small>
              <small v-if="!minigameRecord(minigame.id)">尚未在当前存档中进入对应剧情场景。</small>
            </article>
            <p v-if="minigames.length === 0" class="gameplay-empty">当前路线尚未配置叙事挑战。</p>
          </div>
        </section>

        <section
          v-show="activeTab === 'loadout'"
          id="gameplay-page-loadout"
          role="tabpanel"
          aria-labelledby="gameplay-tab-loadout"
          data-testid="gameplay-page-loadout"
        >
          <div class="gameplay-section-heading"><h3>已持有物品</h3></div>
          <div class="gameplay-entry-grid">
            <article v-for="item in items" :key="item.id" :data-item-id="item.id"><header><strong>{{ item.label }}</strong><span>已持有</span></header><p>{{ item.description }}</p></article>
            <p v-if="items.length === 0" class="gameplay-empty">当前背包为空。</p>
          </div>

          <div class="gameplay-split-grid gameplay-loadout-grid">
            <section>
              <div class="gameplay-section-heading"><h3>装备</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="entry in equipment" :key="entry.id" :class="{ active: isEquipped(entry.id), locked: !ownsEquipment(entry.itemId) }" :data-equipment-id="entry.id">
                  <header><strong>{{ entry.label }}</strong><span>{{ isEquipped(entry.id) ? '装备中' : ownsEquipment(entry.itemId) ? entry.slot : '未获得' }}</span></header>
                  <p>{{ formatModifiers(entry.modifiers) }}</p>
                  <button type="button" :disabled="!ownsEquipment(entry.itemId) || isEquipped(entry.id)" @click="emit('equip', entry.id)">{{ isEquipped(entry.id) ? '已装备' : '装备' }}</button>
                </article>
              </div>
            </section>
            <section>
              <div class="gameplay-section-heading"><h3>衣装</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="outfit in outfits" :key="outfit.id" :class="{ active: save.inventory.activeOutfitId === outfit.id, locked: !save.inventory.outfitIds.includes(outfit.id) }" :data-outfit-id="outfit.id">
                  <header><strong>{{ outfit.label }}</strong><span>{{ save.inventory.activeOutfitId === outfit.id ? '穿着中' : save.inventory.outfitIds.includes(outfit.id) ? '已解锁' : '未解锁' }}</span></header>
                  <button type="button" :disabled="!save.inventory.outfitIds.includes(outfit.id) || save.inventory.activeOutfitId === outfit.id" @click="emit('wearOutfit', outfit.id)">{{ save.inventory.activeOutfitId === outfit.id ? '穿着中' : '更换' }}</button>
                </article>
              </div>
            </section>
          </div>
        </section>

        <section
          v-show="activeTab === 'progression'"
          id="gameplay-page-progression"
          role="tabpanel"
          aria-labelledby="gameplay-tab-progression"
          data-testid="gameplay-page-progression"
        >
          <div
            class="gameplay-objective-summary gameplay-progression-summary"
            data-testid="progression-summary"
            data-progression-summary
            :data-professions-total="progressionSummary.professionsTotal"
            :data-professions-advanced="progressionSummary.professionsAdvanced"
            :data-profession-levels="progressionSummary.professionLevels"
            :data-achievements-unlocked="progressionSummary.achievementsUnlocked"
            :data-achievements-total="progressionSummary.achievementsTotal"
          >
            <span>当前职业 {{ progressionSummary.activeProfessionLabel }}</span>
            <span>已进阶 {{ progressionSummary.professionsAdvanced }} / {{ progressionSummary.professionsTotal }}</span>
            <span>职业等级合计 {{ progressionSummary.professionLevels }}</span>
            <span>成就 {{ progressionSummary.achievementsUnlocked }} / {{ progressionSummary.achievementsTotal }}</span>
          </div>
          <div class="gameplay-split-grid">
            <section>
              <div class="gameplay-section-heading"><h3>职业</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="profession in professions" :key="profession.id" :class="{ active: save.professions.activeId === profession.id }" :data-profession-id="profession.id">
                  <header><strong>{{ profession.label }}</strong><span>Lv.{{ professionProgress(profession.id).level }}</span></header>
                  <p>{{ formatModifiers(profession.modifiersPerLevel) }} / 等级</p>
                  <progress v-if="nextProfessionThreshold(profession.id) !== undefined" class="gameplay-xp-progress" :value="professionProgress(profession.id).xp" :max="nextProfessionThreshold(profession.id) ?? 0" :data-xp-level="professionProgress(profession.id).level" />
                  <small>XP {{ professionProgress(profession.id).xp }}<template v-if="nextProfessionThreshold(profession.id) !== undefined"> / {{ nextProfessionThreshold(profession.id) }}</template><template v-else> · MAX</template></small>
                  <button type="button" :disabled="save.professions.activeId === profession.id" @click="emit('selectProfession', profession.id)">{{ save.professions.activeId === profession.id ? '当前职业' : '设为当前' }}</button>
                </article>
              </div>
            </section>
            <section>
              <div class="gameplay-section-heading"><h3>成就</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="achievement in achievements" :key="achievement.id" :class="{ completed: save.achievements.unlockedIds.includes(achievement.id), locked: !save.achievements.unlockedIds.includes(achievement.id) }" :data-achievement-id="achievement.id">
                  <header><strong>{{ achievement.label }}</strong><span>{{ save.achievements.unlockedIds.includes(achievement.id) ? '已解锁' : '未解锁' }}</span></header>
                  <p>{{ achievement.description }}</p>
                  <small>{{ formatModifiers(achievement.reward.values ?? {}) }}</small>
                </article>
              </div>
            </section>
          </div>
        </section>

        <section
          v-show="activeTab === 'codex'"
          id="gameplay-page-codex"
          role="tabpanel"
          aria-labelledby="gameplay-tab-codex"
          data-testid="gameplay-page-codex"
        >
          <div
            class="gameplay-objective-summary gameplay-codex-summary"
            data-testid="codex-summary"
            data-codex-summary
            :data-codex-total="codexSummary.total"
            :data-codex-active="codexSummary.active"
            :data-codex-seen="codexSummary.seen"
            :data-codex-locked="codexSummary.locked"
            :data-codex-discovered="codexSummary.active + codexSummary.seen"
          >
            <span>已发现 {{ codexSummary.active + codexSummary.seen }} / {{ codexSummary.total }}</span>
            <span>当前激活 {{ codexSummary.active }}</span>
            <span>已阅 {{ codexSummary.seen }}</span>
            <span>未阅 {{ codexSummary.locked }}</span>
          </div>
          <div class="gameplay-section-heading"><h3>世界书状态</h3></div>
          <div class="gameplay-entry-list gameplay-codex-list">
            <article v-for="entry in gameplay.worldbookEntries" :key="entry.id" :class="worldbookState(entry.id)" :data-worldbook-id="entry.id">
              <header><strong>{{ entry.id }}</strong><span>{{ worldbookStateLabel(entry.id) }}</span></header>
              <p v-if="worldbookState(entry.id) !== 'locked'">{{ entry.content }}</p>
              <p v-else>该条目尚未在当前存档中解锁。</p>
              <small v-if="worldbookState(entry.id) !== 'locked'">{{ entry.constant ? '常驻' : entry.selective ? '场景选择性激活' : '已记录' }}</small>
            </article>
          </div>
        </section>

        <section
          v-show="activeTab === 'worldbook-packages'"
          id="gameplay-page-worldbook-packages"
          role="tabpanel"
          aria-labelledby="gameplay-tab-worldbook-packages"
          data-testid="worldbook-packages-page"
        >
          <div class="gameplay-section-heading"><h3>Layered worldbook packages</h3><p>Download and import through the normal SillyTavern UI.</p></div>
          <p class="gameplay-worldbook-note">{{ worldbookCatalog.l0.note }}</p>
          <ol class="gameplay-worldbook-steps"><li v-for="instruction in worldbookCatalog.installInstructions" :key="instruction">{{ instruction }}</li></ol>
          <div class="gameplay-worldbook-presets" role="radiogroup" aria-label="Worldbook package presets">
            <article v-for="preset in worldbookCatalog.presets" :key="preset.id" :class="{ active: selectedWorldbookPreset === preset.id, locked: !preset.installable }" :data-worldbook-preset="preset.id">
              <header><strong>{{ preset.label }}</strong><span>{{ preset.installable ? `${preset.packages.length} package(s)` : 'excluded' }}</span></header>
              <p v-if="preset.id === 'minimal'">{{ worldbookCatalog.l0.entryCount }} embedded card entries; no JSON import is needed.</p>
              <p v-else-if="preset.installable">{{ preset.packages.map((item) => item.entryCount).reduce((sum, count) => sum + count, 0) }} entries across the selected package set.</p>
              <p v-else>Audit-only material: never import or enable it at runtime.</p>
              <button v-if="preset.installable && preset.packages.length" type="button" role="radio" :aria-checked="selectedWorldbookPreset === preset.id" @click="emit('selectWorldbookPreset', preset.id)">{{ selectedWorldbookPreset === preset.id ? 'Selected' : 'Select preset' }}</button>
            </article>
          </div>
          <div class="gameplay-section-heading"><h3>Selected downloads</h3><p>Checksums remain visible for package verification.</p></div>
          <div class="gameplay-entry-list gameplay-worldbook-downloads">
            <article v-for="preset in worldbookCatalog.presets" v-show="selectedWorldbookPreset === preset.id" :key="preset.id">
              <template v-if="preset.packages.length"><div v-for="item in preset.packages" :key="item.id" :data-worldbook-package="item.id" :class="{ active: selectedWorldbookPackageIds.has(item.id) }"><header><strong>{{ item.id }}</strong><span>{{ item.entryCount }} entries</span></header><p>{{ item.contentCharacters.toLocaleString() }} UTF-16 content characters</p><small>SHA-256 {{ item.sha256 }}</small><a :href="item.downloadUrl" :download="item.downloadUrl.split('/').at(-1)" data-testid="worldbook-package-download">Download JSON</a></div></template>
              <p v-else>No download: this preset uses the embedded L0 card anchors only.</p>
            </article>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
