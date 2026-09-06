import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputPath = resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json');
const promptPath = resolve(projectRoot, 'content/media-production/visual-prompts-v2.json');
const canonVisualSourcePath = resolve(projectRoot, 'content/media-production/canon-visual-sources-v1.json');
const canonClaimsPath = resolve(projectRoot, 'content/canon-claims-v1.json');
const providerProbePath = resolve(projectRoot, 'content/media-production/provider-probes-v1.json');
const productionProvider = 'wisart-openai-compatible';
const productionModel = 'gpt-image-2';

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function safe(value) {
  return value.replaceAll(/[^a-z0-9._-]/giu, '-');
}

function fileId(path) {
  return `file.${path.toLowerCase().replace(/[^a-z0-9]+/gu, '.').replace(/^\.|\.$/gu, '')}`;
}

function indexStoryUsage(story) {
  const usage = new Map();
  const add = (assetId, sceneId, text) => {
    if (!assetId) return;
    const current = usage.get(assetId) ?? { sceneIds: [], textHashes: [] };
    current.sceneIds.push(sceneId);
    current.textHashes.push(hash(text));
    usage.set(assetId, current);
  };
  for (const scene of story.scenes) {
    for (const id of [scene.backgroundAssetId, scene.cgAssetId]) add(id, scene.id, scene.text);
    for (const portrait of scene.portraits) add(portrait.portraitAssetId, scene.id, scene.text);
    for (const choice of scene.choices ?? []) for (const id of choice.effects.unlockCg ?? []) add(id, scene.id, choice.resultText ?? scene.text);
  }
  return usage;
}

function imageJobs(manifest, usage, promptByJob) {
  const recordsByPath = new Map();
  for (const asset of manifest.assets.filter((asset) => asset.kind === 'image' && /^(?:bg|cg|characters)\//u.test(asset.path))) {
    const records = recordsByPath.get(asset.path) ?? [];
    records.push(asset);
    recordsByPath.set(asset.path, records);
  }
  const portraitByPath = new Map(manifest.portraits.map((portrait) => [portrait.path, portrait]));
  return [...recordsByPath.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([path, records]) => {
    const semantic = portraitByPath.get(path)?.id ?? records.find((record) => !record.id.startsWith('file.'))?.id ?? records[0].id;
    const category = path.split('/')[0];
    const context = usage.get(semantic) ?? { sceneIds: [], textHashes: [] };
    const id = `visual.image.${safe(semantic)}`;
    const prompt = promptByJob.get(id);
    if (!prompt) throw new Error(`Missing frozen visual prompt: ${id}`);
    return {
      id,
      assetId: semantic,
      receiptAssetId: category === 'characters' ? fileId(path) : semantic,
      ...(category === 'characters' ? { portraitAssetId: semantic } : {}),
      path,
      category,
      provider: productionProvider,
      model: productionModel,
      promptVersion: 'albina-visual-v2',
      inputMode: prompt.mode,
      referenceJobIds: prompt.referenceJobIds,
      referenceSourceIds: prompt.referenceSourceIds ?? [],
      styleReferenceMode: prompt.styleReferenceMode ?? 'input',
      identitySubjects: prompt.identitySubjects,
      identityBootstrap: prompt.identityBootstrap,
      canonClaimIds: prompt.canonClaimIds ?? [],
      // Produce a near-4K 2:3 portrait master or a 1080p 16:9 landscape master,
      // then derive the card's runtime-sized asset without changing its framing.
      // 3840x2160 is not requested: the WisArt gpt-image-2 channel times out at that size.
      generationSize: category === 'characters' ? '1024x1536' : '1920x1080',
      delivery: category === 'characters'
        ? { format: 'png', width: 1024, height: 1536, alpha: true }
        : { format: 'jpg', width: 1280, height: 720, alpha: false },
      sceneIds: [...new Set(context.sceneIds)].sort(),
      sourceTextHashes: [...new Set(context.textHashes)].sort(),
      status: 'authorized-prompt-frozen',
    };
  });
}

function canonRecapImageJobs(story, promptByJob) {
  const specifications = [
    ['canon_recap_9_14', 'cg.canon_recap_9_14', 'cg/canon_recap_9_14.jpg'],
    ['canon_recap_9_18', 'cg.canon_recap_9_18', 'cg/canon_recap_9_18.jpg'],
    ['canon_recap_9_37', 'cg.canon_recap_9_37', 'cg/canon_recap_9_37.jpg'],
    ['canon_recap_albina_fascia', 'cg.canon_recap_albina_fascia', 'cg/canon_recap_albina_fascia.jpg'],
    ['canon_recap_9_37_battle', 'cg.canon_recap_9_37_battle', 'cg/canon_recap_9_37_battle.jpg'],
    ['canon_recap_9_43_outcome', 'cg.canon_recap_9_43_outcome', 'cg/canon_recap_9_43_outcome.jpg'],
  ];
  const sceneById = new Map(story.scenes.map((scene) => [scene.id, scene]));
  return specifications.map(([sceneId, assetId, path]) => {
    const scene = sceneById.get(sceneId); const id = `visual.image.${assetId}`; const prompt = promptByJob.get(id);
    if (!scene || !prompt) throw new Error(`Missing canon recap visual contract: ${sceneId}`);
    const sceneClaimIds = scene.provenance?.claimIds ?? [];
    if (JSON.stringify(prompt.canonClaimIds ?? []) !== JSON.stringify(sceneClaimIds)) throw new Error(`Canon recap claim binding mismatch: ${sceneId}`);
    return {
      id, assetId, receiptAssetId: assetId, path, category: 'cg', provider: productionProvider, model: productionModel,
      promptVersion: 'albina-visual-v2', inputMode: prompt.mode,
      referenceJobIds: prompt.referenceJobIds, referenceSourceIds: prompt.referenceSourceIds ?? [], styleReferenceMode: prompt.styleReferenceMode ?? 'input',
      identitySubjects: prompt.identitySubjects, identityBootstrap: prompt.identityBootstrap,
      canonClaimIds: sceneClaimIds,
      generationSize: '1920x1080', delivery: { format: 'jpg', width: 1280, height: 720, alpha: false },
      sceneIds: [sceneId], sourceTextHashes: [hash(scene.text)], status: 'authorized-prompt-frozen',
    };
  });
}

const [manifest, story, promptFreeze, canonVisualSources, canonClaims, providerProbes] = await Promise.all([
  readFile(resolve(projectRoot, 'content/asset-manifest-v2.json'), 'utf8').then(JSON.parse),
  readFile(resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json'), 'utf8').then(JSON.parse),
  readFile(promptPath, 'utf8').then(JSON.parse),
  readFile(canonVisualSourcePath, 'utf8').then(JSON.parse),
  readFile(canonClaimsPath, 'utf8').then(JSON.parse),
  readFile(providerProbePath, 'utf8').then(JSON.parse),
]);
if (promptFreeze.version !== 2 || promptFreeze.promptVersion !== 'albina-visual-v2' || promptFreeze.prompts?.length !== 67) throw new Error('Invalid visual prompt freeze');
if (canonClaims.version !== 1 || !Array.isArray(canonClaims.claims)) throw new Error('Invalid canon claim ledger');
const knownClaimIds = new Set(canonClaims.claims.map((claim) => claim.id));
for (const prompt of promptFreeze.prompts) {
  const claimIds = prompt.canonClaimIds ?? [];
  if (!Array.isArray(claimIds) || new Set(claimIds).size !== claimIds.length || claimIds.some((id) => !knownClaimIds.has(id))) throw new Error(`Invalid canon claim reference: ${prompt.jobId}`);
  if (!Array.isArray(prompt.identitySubjects) || !Object.hasOwn(prompt, 'identityBootstrap')) throw new Error(`Invalid frozen identity contract: ${prompt.jobId}`);
}
const promptByJob = new Map(promptFreeze.prompts.map((prompt) => [prompt.jobId, prompt]));
const wisartProbe = providerProbes.probes?.find((probe) => probe.provider === productionProvider);
if (wisartProbe?.generation?.http !== 200 || wisartProbe.generation?.model !== productionModel
  || wisartProbe.generation?.artifactVerified !== true || wisartProbe.currentAvailability?.available !== true) {
  throw new Error('Invalid WisArt gpt-image-2 provider probe');
}
const images = [...imageJobs(manifest, indexStoryUsage(story), promptByJob), ...canonRecapImageJobs(story, promptByJob)].sort((left, right) => left.id.localeCompare(right.id));
if (images.length !== 67) throw new Error(`Unexpected visual rebuild surface: images=${images.length}`);
const authorizedContentSha256 = hash(JSON.stringify({ promptFreeze, imageJobs: images, canonVisualSources, canonClaims }));
const plan = {
  version: 2,
  projectId: 'albina-galgame-card',
  policy: {
    requiredImageProvider: productionProvider,
    pieImageAvailability: { model: productionModel, available: false, modelListCount: 0 },
    verifiedCandidate: {
      provider: productionProvider, model: productionModel, generationVerified: true,
      currentlyAvailable: true,
      availabilityCheckedAt: wisartProbe.testedAt,
      authorizedForProduction: true,
      authorization: {
        scope: 'albina-v2-image-batch', source: 'direct-user-instruction', recordedOn: '2026-07-21',
        authorizedContentSha256,
      },
      probeArtifactSha256: wisartProbe.generation.sha256,
    },
    runtimeGeneration: false,
    canonVisualSourceIndexSha256: hash(JSON.stringify(canonVisualSources)),
    canonClaimsSha256: hash(JSON.stringify(canonClaims)),
  },
  counts: { imageJobs: images.length },
  imageJobs: images,
};
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(plan, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(plan.counts));
