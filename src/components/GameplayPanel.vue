<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import type { GameplayStatEffects, GameplaySystems } from '../domain/gameplay';
import type { SaveV2 } from '../domain/save';

type TabId = 'status' | 'objectives' | 'loadout' | 'progression' | 'codex';
type StoryValueKey = 'affectionAlbina' | 'trust' | 'danger' | 'artResonance';

const props = defineProps<{
  gameplay: GameplaySystems;
  save: SaveV2;
  effectiveValues: Pick<SaveV2['values'], StoryValueKey>;
  interactionError: string | undefined;
}>();

const emit = defineEmits<{
  close: [];
  equip: [equipmentId: string];
  wearOutfit: [outfitId: string];
  selectProfession: [professionId: string];
}>();

const tabs = [
  { id: 'status', label: '状态' },
  { id: 'objectives', label: '任务与冲突' },
  { id: 'loadout', label: '背包与装配' },
  { id: 'progression', label: '职业与成就' },
  { id: 'codex', label: '资料库' },
] as const;

const panel = ref<HTMLElement>();
const activeTab = ref<TabId>('status');
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
const items = computed(() => props.gameplay.items.filter((entry) => routeMatches(entry.route) && props.save.inventory.ownedIds.includes(entry.id)));
const equipment = computed(() => props.gameplay.equipment.filter((entry) => routeMatches(entry.route)));
const outfits = computed(() => props.gameplay.outfits.filter((entry) => routeMatches(entry.route)));
const professions = computed(() => props.gameplay.professions.filter((entry) => routeMatches(entry.route)));
const achievements = computed(() => props.gameplay.achievements.filter((entry) => routeMatches(entry.route)));

onMounted(() => panel.value?.focus());

function selectTab(tab: TabId): void {
  activeTab.value = tab;
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
  activeTab.value = tab.id;
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

      <nav class="gameplay-tabs" role="tablist" aria-label="状态档案分页">
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
          <div class="gameplay-split-grid">
            <section>
              <div class="gameplay-section-heading"><h3>路线任务</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="quest in quests" :key="quest.id" :class="questState(quest.id)" :data-quest-id="quest.id">
                  <header><strong>{{ quest.label }}</strong><span>{{ questStateLabel(quest.id) }}</span></header>
                  <p>{{ quest.description }}</p>
                </article>
                <p v-if="quests.length === 0" class="gameplay-empty">当前尚未进入路线任务。</p>
              </div>
            </section>
            <section>
              <div class="gameplay-section-heading"><h3>冲突记录</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="battle in battles" :key="battle.id" :class="battleState(battle.id)" :data-battle-id="battle.id">
                  <header><strong>{{ battle.label }}</strong><span>{{ battleStateLabel(battle.id) }}</span></header>
                  <p>{{ battle.description }}</p>
                  <small>推荐专精：{{ masteryValues.find((entry) => entry.key === battle.recommendedMastery)?.label }}</small>
                </article>
                <p v-if="battles.length === 0" class="gameplay-empty">当前尚无路线冲突。</p>
              </div>
            </section>
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
          <div class="gameplay-split-grid">
            <section>
              <div class="gameplay-section-heading"><h3>职业</h3></div>
              <div class="gameplay-entry-list">
                <article v-for="profession in professions" :key="profession.id" :class="{ active: save.professions.activeId === profession.id }" :data-profession-id="profession.id">
                  <header><strong>{{ profession.label }}</strong><span>Lv.{{ professionProgress(profession.id).level }}</span></header>
                  <p>{{ formatModifiers(profession.modifiersPerLevel) }} / 等级</p>
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
      </div>
    </section>
  </div>
</template>
