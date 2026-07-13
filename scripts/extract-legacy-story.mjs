import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = resolve(projectRoot, 'dist/albina-galgame-card/console/index.js');
const contentRoot = resolve(projectRoot, 'content');

const routeConfig = {
  white_canvas: {
    file: 'dialogue/white-canvas.json',
    finalChoiceId: 'white_canvas_route_final',
    title: '白色画布',
    trueRules: [['trust', 'gte', 52], ['artResonance', 'gte', 44], ['danger', 'lte', 5]],
    badRules: [['trust', 'lte', 44], ['artResonance', 'lte', 38]],
    endingText: {
      true: '晨光落在未署名的白画上。阿尔比娜没有把你画成作品，而是把并肩离开的两道影子留在画框之外：这一次，完整与亲密同时成立。',
      normal: '展厅按约熄灯。你们保留了尚未说尽的话，也保留了随时重画的权利。阿尔比娜把空白画布卷好，约定下一场雨后再见。',
      bad: '白厅没有发生争吵，只剩一张过早完成的画。阿尔比娜礼貌地收回画笔与称呼；边界仍被守住，但你们没能把信任带到黎明。',
    },
  },
  golden_bough_rebuild: {
    file: 'dialogue/golden-bough-rebuild.json',
    finalChoiceId: 'golden_bough_route_final',
    title: '金枝重构',
    trueRules: [['trust', 'gte', 56], ['artResonance', 'gte', 50], ['danger', 'lte', 8]],
    badRules: [['trust', 'lte', 49], ['artResonance', 'lte', 44]],
    endingText: {
      true: '金枝残响终于与法西娅的心跳重合。阿尔比娜记得每一次称呼、暂停和重新确认；她以新的身体醒来，也完整记得是谁陪她走过重构。',
      normal: '重构在可控范围内结束。部分残响仍被封存在金色薄膜后，但阿尔比娜认得你，也认得自己。你们决定把余下修复交给时间。',
      bad: '稳定槽保住了身体，却没能保住全部连续性。阿尔比娜醒来时仍然礼貌，只把你当作可靠的见证者；被遗漏的称呼沉在金枝深处。',
    },
  },
  ring_conspiracy: {
    file: 'dialogue/ring-conspiracy.json',
    finalChoiceId: 'ring_conspiracy_route_final',
    title: '环指共谋',
    trueRules: [['trust', 'gte', 49], ['artResonance', 'gte', 49], ['danger', 'lte', 15]],
    badRules: [['trust', 'lte', 44], ['danger', 'gte', 18]],
    endingText: {
      true: '环指的目录里只剩一页无法归档的空白。阿尔比娜以自己的名字向你发出下一次邀请；你们不再是展品或棋子，而是彼此承认的共谋者。',
      normal: '你们离开了画廊，也留下了一条匿名记录作为制衡。危险没有消失，但契约已被改写；阿尔比娜把下一次会面留给更安全的夜晚。',
      bad: '追击停止时，代价已经写进彼此的沉默。你们逃出了装裱，却没能保住共同节奏；阿尔比娜独自带走那柄无锋画刀，没有约定再见。',
    },
  },
};

function extractLegacyStory(source) {
  const start = source.indexOf('var El = "albina-galgame-card"');
  const end = source.indexOf('function Ml(e)', start);
  if (start < 0 || end <= start) throw new Error('Legacy config oracle not found');
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${source.slice(start, end)}\n;globalThis.__story = jl;`, context);
  return Object.values(context.__story);
}

function assetId(path) {
  return path.replace(/\.[^.]+$/u, '').replaceAll('/', '.');
}

function normalizeEffects(effects = {}) {
  const values = {};
  if (effects.affection !== undefined) values.affectionAlbina = effects.affection;
  for (const key of ['trust', 'danger', 'artResonance']) {
    if (effects[key] !== undefined) values[key] = effects[key];
  }
  return {
    ...(effects.route ? { route: effects.route } : {}),
    ...(Object.keys(values).length ? { values } : {}),
    ...(effects.flag ? { setFlags: [effects.flag] } : {}),
    ...(effects.unlockCg ? { unlockCg: [effects.unlockCg.startsWith('cg.') ? effects.unlockCg : `cg.${effects.unlockCg}`] } : {}),
  };
}

function resultText(choice, nextScene) {
  const response = nextScene ? `${nextScene.speaker}：${nextScene.text}` : '结局资格已写入权威状态。';
  return `你选择“${choice.text}”。${response}`;
}

function convertScene(scene, sceneById) {
  const config = routeConfig[scene.route];
  return {
    version: 2,
    id: scene.sceneId,
    chapter: scene.chapter,
    route: scene.route,
    locationId: scene.locationId,
    backgroundAssetId: assetId(scene.background),
    ...(scene.cg ? { cgAssetId: assetId(scene.cg) } : {}),
    tone: scene.tone,
    portraits: scene.characters.map((character) => ({
      characterId: character.id,
      portraitAssetId: `portrait.${character.id}.${character.sprite}`,
      position: character.position,
      active: character.active,
      scale: character.scale,
    })),
    speaker: scene.speaker,
    text: scene.text,
    voiceAssetId: `voice.scene.${scene.sceneId}`,
    choices: scene.choices.map((choice) => {
      const nextSceneId = choice.id === config.finalChoiceId ? `${scene.route}_ending_gate` : choice.nextSceneId;
      const fixedResult = choice.id === config.finalChoiceId
        ? `你选择“${choice.text}”。${config.title}路线终章已封存，进入固定结局资格判定。`
        : resultText(choice, sceneById.get(choice.nextSceneId));
      return {
        id: choice.id,
        text: choice.text,
        nextSceneId,
        resultText: fixedResult,
        resultVoiceAssetId: `voice.result.${choice.id}`,
        effects: normalizeEffects(choice.effects),
      };
    }),
  };
}

function predicates(rules) {
  return rules.map(([key, operator, value]) => ({ kind: 'value', key, operator, value }));
}

function eligibility(route, kind) {
  const config = routeConfig[route];
  const finalFlag = { kind: 'flag', flag: config.finalChoiceId, equals: true };
  if (kind === 'true') return { allOf: [finalFlag, ...predicates(config.trueRules)] };
  if (kind === 'bad') return { allOf: [finalFlag], anyOf: predicates(config.badRules) };
  return { allOf: [finalFlag], fallback: true };
}

function copyPresentation(scene, id, chapter) {
  return {
    version: 2,
    id,
    chapter,
    route: scene.route,
    locationId: scene.locationId,
    backgroundAssetId: scene.backgroundAssetId,
    ...(scene.cgAssetId ? { cgAssetId: scene.cgAssetId } : {}),
    tone: scene.tone,
    portraits: scene.portraits,
  };
}

function makeEndingGate(route, finalScene) {
  const config = routeConfig[route];
  const id = `${route}_ending_gate`;
  const choices = ['true', 'normal', 'bad'].map((kind) => ({
    id: `${route}_choose_${kind}_ending`,
    text: kind === 'true' ? '确认彼此共同抵达的真结局' : kind === 'normal' ? '接受仍留有余白的普通结局' : '承认这次未能跨过的坏结局',
    nextSceneId: `${route}_ending_${kind}`,
    resultText: `结局判定完成：${config.title}·${kind.toUpperCase()}。资格规则与选择记录已固定写入。`,
    resultVoiceAssetId: `voice.result.${route}.${kind}_ending`,
    availability: eligibility(route, kind),
    effects: { setFlags: [`ending_${route}_${kind}_qualified`] },
  }));
  return {
    ...copyPresentation(finalScene, id, 16),
    speaker: '叙事记录',
    text: `${config.title}的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。`,
    voiceAssetId: `voice.scene.${id}`,
    choices,
  };
}

function makeEnding(route, kind, finalScene) {
  const config = routeConfig[route];
  const id = `${route}_ending_${kind}`;
  return {
    ...copyPresentation(finalScene, id, 17),
    speaker: '阿尔比娜',
    text: config.endingText[kind],
    voiceAssetId: `voice.scene.${id}`,
    choices: [],
    ending: { route, kind, eligibility: eligibility(route, kind) },
  };
}

async function writeJson(relativePath, value) {
  const path = resolve(contentRoot, relativePath);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function generateContent() {
  const legacy = extractLegacyStory(await readFile(bundlePath, 'utf8'));
  const sceneById = new Map(legacy.map((scene) => [scene.sceneId, scene]));
  const converted = legacy.map((scene) => convertScene(scene, sceneById));
  await writeJson('dialogue/opening.json', converted.filter((scene) => scene.id === 'opening_001'));
  for (const [route, config] of Object.entries(routeConfig)) {
    const routeScenes = converted.filter((scene) => scene.route === route && scene.id !== 'opening_001');
    const finalScene = routeScenes.at(-1);
    if (!finalScene) throw new Error(`Missing final scene for ${route}`);
    const endings = ['true', 'normal', 'bad'].map((kind) => makeEnding(route, kind, finalScene));
    await writeJson(config.file, [...routeScenes, makeEndingGate(route, finalScene), ...endings]);
  }
  await writeJson('game-script-v2.json', {
    version: 2,
    projectId: 'albina-galgame-card',
    initialSceneId: 'opening_001',
    routeEntrySceneIds: {
      white_canvas: 'white_canvas_001',
      golden_bough_rebuild: 'golden_bough_001',
      ring_conspiracy: 'ring_conspiracy_001',
    },
    legacyOracle: { sceneAnchors: 46, choices: 87 },
    dialogueFiles: ['dialogue/opening.json', ...Object.values(routeConfig).map((config) => config.file)],
  });
}

await generateContent();
