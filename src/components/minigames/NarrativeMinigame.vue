<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { gsap } from 'gsap';

import {
  seededOrder,
  type MinigameAttempt,
  type MinigameDefinition,
  type SceneMinigameChallenge,
} from '../../domain/minigame';

const props = defineProps<{
  definition: MinigameDefinition;
  challenge: SceneMinigameChallenge;
  reducedMotion: boolean;
  busy?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  resolve: [attempt: MinigameAttempt];
}>();

const assisted = ref(false);
const selectedMirrorIds = ref<string[]>([]);
const selectedCipherIds = ref<string[]>([]);
const activeResonanceIds = ref<string[]>([]);

/** Press feedback on option toggles, killed together on unmount and skipped in reduced motion. */
const optionTweens = new Set<gsap.core.Tween>();
function optionFeedback(event: Event | undefined): void {
  const target = event?.currentTarget;
  if (!(target instanceof HTMLButtonElement) || props.reducedMotion || props.busy) return;
  let tween: gsap.core.Tween;
  tween = gsap.fromTo(target, { scale: 1 }, {
    scale: 1.035,
    duration: .12,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out',
    onComplete: () => { optionTweens.delete(tween); },
  });
  optionTweens.add(tween);
}
onBeforeUnmount(() => { optionTweens.forEach((tween) => tween.kill()); optionTweens.clear(); });

const mirrorAnchors = computed(() => props.definition.puzzle.kind === 'mirror_thread'
  ? seededOrder(props.definition.puzzle.anchors, props.challenge.seed)
  : []);
const cipherFragments = computed(() => props.definition.puzzle.kind === 'testimony_cipher'
  ? seededOrder(props.definition.puzzle.fragments, props.challenge.seed)
  : []);
const resonanceNodes = computed(() => props.definition.puzzle.kind === 'boundary_resonance'
  ? seededOrder(props.definition.puzzle.nodes, props.challenge.seed)
  : []);

function toggleValue(target: { value: string[] }, id: string, maximum?: number): void {
  if (target.value.includes(id)) {
    target.value = target.value.filter((item) => item !== id);
    return;
  }
  target.value = maximum && target.value.length >= maximum
    ? [...target.value.slice(1), id]
    : [...target.value, id];
}

function toggleMirror(id: string, event?: Event): void { toggleValue(selectedMirrorIds, id, 2); optionFeedback(event); }
function toggleResonance(id: string, event?: Event): void { toggleValue(activeResonanceIds, id); optionFeedback(event); }
function toggleCipher(id: string, event?: Event): void { toggleValue(selectedCipherIds, id); optionFeedback(event); }
function moveCipher(id: string, direction: -1 | 1): void {
  const index = selectedCipherIds.value.indexOf(id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= selectedCipherIds.value.length) return;
  const next = [...selectedCipherIds.value];
  [next[index], next[nextIndex]] = [next[nextIndex]!, next[index]!];
  selectedCipherIds.value = next;
}

/**
 * Assist hints are derived from the authored solution, never invented.
 * Turning assist on caps the reward at `assisted` (60) instead of `perfect` (100).
 */
function mirrorAssist(id: string): 'keep' | 'drop' | undefined {
  if (!assisted.value || props.definition.puzzle.kind !== 'mirror_thread') return undefined;
  return props.definition.puzzle.correctPair.includes(id) ? 'keep' : 'drop';
}

function cipherAssistRank(id: string): number | undefined {
  if (!assisted.value || props.definition.puzzle.kind !== 'testimony_cipher') return undefined;
  const rank = props.definition.puzzle.solutionOrder.indexOf(id);
  return rank < 0 ? undefined : rank + 1;
}

function resonanceAssist(id: string): 'keep' | 'drop' | undefined {
  if (!assisted.value || props.definition.puzzle.kind !== 'boundary_resonance') return undefined;
  return props.definition.puzzle.targetActiveIds.includes(id) ? 'keep' : 'drop';
}

const requiredCipherCount = computed(() => props.definition.puzzle.kind === 'testimony_cipher'
  ? props.definition.puzzle.solutionOrder.length
  : 0);

/** Undefined means the current selection can be submitted. */
const blockingReason = computed<string | undefined>(() => {
  if (props.definition.puzzle.kind === 'mirror_thread') {
    return selectedMirrorIds.value.length === 2 ? undefined : '请选择两个锚点后再提交。';
  }
  if (props.definition.puzzle.kind === 'testimony_cipher') {
    const remaining = requiredCipherCount.value - selectedCipherIds.value.length;
    return remaining === 0 ? undefined : `还需要排入 ${remaining} 段证词。`;
  }
  return activeResonanceIds.value.length === 0 ? '请至少点亮一个条款节点。' : undefined;
});

function resolve(): void {
  if (props.busy || blockingReason.value) return;
  if (props.definition.puzzle.kind === 'mirror_thread') {
    emit('resolve', { kind: 'mirror_thread', selectedAnchorIds: selectedMirrorIds.value, assisted: assisted.value });
    return;
  }
  if (props.definition.puzzle.kind === 'testimony_cipher') {
    emit('resolve', { kind: 'testimony_cipher', orderedFragmentIds: selectedCipherIds.value, assisted: assisted.value });
    return;
  }
  emit('resolve', { kind: 'boundary_resonance', activeNodeIds: activeResonanceIds.value, assisted: assisted.value });
}

/** The submission is actionable right now; the button breathes to signal it. */
const canSubmit = computed(() => !props.busy && blockingReason.value === undefined);

function skip(): void { emit('resolve', { kind: 'skip', assisted: true }); }
</script>

<template>
  <section
    class="minigame-panel"
    :class="`minigame-panel--${definition.puzzle.kind}`"
    :data-minigame-id="definition.id"
    :data-minigame-kind="definition.puzzle.kind"
    :data-assisted="assisted"
    :data-can-submit="canSubmit ? 'true' : 'false'"
    aria-labelledby="minigame-title"
  >
    <header class="minigame-panel__header">
      <div>
        <p>叙事介入 · 可跳过</p>
        <h3 id="minigame-title">{{ definition.label }}</h3>
      </div>
      <span>{{ busy ? '结算中' : '剧情挑战' }}</span>
      <button type="button" class="minigame-panel__close" aria-label="关闭挑战" :disabled="busy" @click="emit('close')">关闭</button>
    </header>
    <p class="minigame-panel__description">{{ challenge.prompt }}</p>

    <div v-if="definition.puzzle.kind === 'mirror_thread'" class="minigame-mirror" aria-label="镜面连线选择">
      <button
        v-for="anchor in mirrorAnchors"
        :key="anchor.id"
        type="button"
        class="minigame-mirror__anchor"
        :data-anchor-id="anchor.id"
        :class="{ 'is-selected': selectedMirrorIds.includes(anchor.id) }"
        :aria-pressed="selectedMirrorIds.includes(anchor.id)"
        :data-assist="mirrorAssist(anchor.id)"
        :disabled="busy"
        @click="toggleMirror(anchor.id, $event)"
      >
        <strong>{{ anchor.label }}</strong><span>{{ anchor.description }}</span>
        <em v-if="mirrorAssist(anchor.id)" class="minigame-hint-tag">{{ mirrorAssist(anchor.id) === 'keep' ? '应当保留' : '不应连入' }}</em>
      </button>
      <p class="minigame-panel__hint" aria-live="polite">已选择 {{ selectedMirrorIds.length }} / 2 个锚点。</p>
    </div>

    <div v-else-if="definition.puzzle.kind === 'testimony_cipher'" class="minigame-cipher">
      <div class="minigame-cipher__pool" aria-label="待排序证词">
        <button
          v-for="fragment in cipherFragments"
          :key="fragment.id"
          type="button"
          :data-fragment-id="fragment.id"
          :class="{ 'is-selected': selectedCipherIds.includes(fragment.id) }"
          :aria-pressed="selectedCipherIds.includes(fragment.id)"
          :data-assist-rank="cipherAssistRank(fragment.id)"
          :disabled="busy"
          @click="toggleCipher(fragment.id, $event)"
        >
          {{ fragment.text }}
          <em v-if="cipherAssistRank(fragment.id)" class="minigame-hint-tag">建议第 {{ cipherAssistRank(fragment.id) }} 位</em>
        </button>
      </div>
      <ol class="minigame-cipher__sequence" aria-label="证词顺序">
        <li v-for="(id, index) in selectedCipherIds" :key="id">
          <span>{{ index + 1 }}</span>
          <strong>{{ definition.puzzle.fragments.find((fragment) => fragment.id === id)?.text }}</strong>
          <button type="button" aria-label="上移" :disabled="busy || index === 0" @click="moveCipher(id, -1)">↑</button>
          <button type="button" aria-label="下移" :disabled="busy || index === selectedCipherIds.length - 1" @click="moveCipher(id, 1)">↓</button>
        </li>
        <li v-if="selectedCipherIds.length === 0" class="minigame-cipher__placeholder">从左侧选择证词，按顺序排入这一栏。</li>
      </ol>
    </div>

    <div v-else class="minigame-resonance" aria-label="反制条款共振">
      <button
        v-for="node in resonanceNodes"
        :key="node.id"
        type="button"
        :data-node-id="node.id"
        :class="{ 'is-active': activeResonanceIds.includes(node.id) }"
        :aria-pressed="activeResonanceIds.includes(node.id)"
        :data-assist="resonanceAssist(node.id)"
        :disabled="busy"
        @click="toggleResonance(node.id, $event)"
      >
        <span aria-hidden="true" />{{ node.label }}
        <em v-if="resonanceAssist(node.id)" class="minigame-hint-tag">{{ resonanceAssist(node.id) === 'keep' ? '应点亮' : '应关闭' }}</em>
      </button>
    </div>

    <label class="minigame-panel__assist">
      <input v-model="assisted" type="checkbox" :disabled="busy">
      <span>{{ challenge.assistLabel }}。可完成挑战，但不会获得完美结算。</span>
    </label>
    <footer class="minigame-panel__actions">
      <p v-if="blockingReason" class="minigame-panel__blocked" aria-live="polite" data-testid="minigame-blocked">{{ blockingReason }}</p>
      <button type="button" data-testid="minigame-submit" :class="{ 'is-ready': canSubmit }" :disabled="busy || Boolean(blockingReason)" @click="resolve">提交介入</button>
      <button v-if="challenge.allowSkip" type="button" class="minigame-panel__skip" data-testid="minigame-skip" :disabled="busy" @click="skip">跳过并继续剧情</button>
    </footer>
  </section>
</template>
