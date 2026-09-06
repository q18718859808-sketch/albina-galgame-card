import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

type RecordValue = Record<string, any>;

const voices: Record<string, string> = {
  '阿尔比娜': 'nova', '叙事记录': 'onyx', '旁白': 'onyx', '法西娅': 'shimmer', '浮士德': 'shimmer',
  '维吉利乌斯': 'echo', '但丁': 'alloy', '卡利斯托': 'fable', 'LCE 医师': 'echo', '环指代理人': 'fable', '金色幻影': 'shimmer',
};
const palette = ['#11131a', '#6f7587', '#b9c2d0', '#d8bb72', '#7c2638', '#dbe4ea'];
const contracts = {
  image: { provider: 'wisart-openai-compatible', model: 'gpt-image-2', promptVersion: 'albina-image-v1' },
  speech: { provider: 'pie', model: 'speech-2.8-hd', promptVersion: 'albina-speech-v1' },
} as const;

export async function prepareProduction(root: string, outputDirectory: string) {
  const manifest = await json(resolve(root, 'content/asset-manifest-v2.json'));
  const pendingGallery = await json(resolve(root, 'content/pending-gallery-cgs.json'));
  const script = await json(resolve(root, 'content/game-script-v2.json'));
  const scenes = (await Promise.all(script.dialogueFiles.map((file: string) => json(resolve(root, 'content', file))))).flat();
  const assetPaths = new Map(manifest.assets.map((asset: RecordValue) => [asset.id, asset.path]));
  const galleryById = new Map((pendingGallery.assets as RecordValue[]).map((asset) => [asset.id, asset]));
  const speechLines = collectSpeechLines(scenes);
  const jobs: RecordValue[] = [];
  for (const pending of manifest.mediaJobs.filter((job: RecordValue) => job.kind === 'image-edit')) {
    const source = assetPaths.get(pending.inputAssetIds[0]);
    if (typeof source !== 'string') throw new Error(`Missing source asset for ${pending.id}`);
    const gallery = galleryById.get(pending.assetId);
    if (gallery) {
      jobs.push({ id: pending.id, kind: 'image', ...contracts.image, prompt: galleryCgPrompt(pending.assetId), width: gallery.width, height: gallery.height, sourceImage: resolve(root, 'dist/albina-galgame-card/assets', source), output: resolve(root, 'staging/media', pending.outputPath), validation: { width: gallery.width, height: gallery.height } });
    } else {
      jobs.push({ id: pending.id, kind: 'image', ...contracts.image, prompt: 'Edit the supplied canonical reference into one transparent horizontal strip of exactly eight equal square frames. Preserve identity, outfit, palette, silhouette and line style. Frames: neutral, blink, speak, smile, sad, tense, action, recovery. No text, no borders, no extra subjects.', width: 4096, height: 512, sourceImage: resolve(root, 'dist/albina-galgame-card/assets', source), output: resolve(root, 'staging/media', pending.outputPath), validation: { width: 4096, height: 512, alpha: true, frameCount: 8 } });
    }
  }
  for (const [assetId, line] of speechLines) {
    const outputPath = assetPaths.get(assetId);
    if (typeof outputPath !== 'string') throw new Error(`Missing approved voice asset for ${assetId}`);
    jobs.push({ id: `job.speech.${assetId}`, kind: 'speech', ...contracts.speech, input: line.text, voice: voices[line.speaker] ?? 'alloy', output: resolve(root, 'staging/media', outputPath), validation: { minDurationSeconds: 0.2, maxDurationSeconds: 60, minLoudnessDbfs: -30, maxLoudnessDbfs: -6 } });
  }
  jobs.sort((a,b) => a.id.localeCompare(b.id));
  const freeze = { version: 1, characters: ['阿尔比娜','法西娅','浮士德','维吉利乌斯','但丁','卡利斯托','LCE 医师','环指代理人','金色幻影'], palette, outfits: 'canonical source assets only; no redesign', expressions: ['neutral','blink','speak','smile','sad','tense','action','recovery'], voices, cueSheet: [] };
  const index = {
    version: 2,
    providerPolicy: { selected: { image: 'wisart-openai-compatible', speech: 'pie' }, candidates: { image: [] }, fallback: false },
    musicPolicy: { mode: 'official-soundtrack', generation: false, redistributionRequiresVerifiedLicense: true },
    freeze,
    jobs,
  };
  await mkdir(outputDirectory, { recursive: true });
  const currentJobFiles = new Set(jobs.map((job) => `${safe(job.id)}.json`));
  for (const file of await readdir(outputDirectory)) {
    if (file !== 'index.json' && file.endsWith('.json') && !file.startsWith('.') && !currentJobFiles.has(file)) {
      await rm(join(outputDirectory, file));
    }
  }
  await writeFile(join(outputDirectory, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
  for (const job of jobs) await writeFile(join(outputDirectory, `${safe(job.id)}.json`), `${JSON.stringify(stripId(job), null, 2)}\n`);
  return { image: jobs.filter((job) => job.kind === 'image').length, speech: jobs.filter((job) => job.kind === 'speech').length, video: jobs.filter((job) => job.kind === 'video').length, total: jobs.length };
}

async function json(path: string) { return JSON.parse(await readFile(path, 'utf8')); }
function collectSpeechLines(scenes: RecordValue[]): [string, { text: string; speaker: string }][] {
  const lines = new Map<string, { text: string; speaker: string }>();
  const add = (assetId: unknown, text: unknown, speaker: unknown) => {
    if (typeof assetId !== 'string' || typeof text !== 'string' || typeof speaker !== 'string') return;
    const next = { text, speaker };
    const current = lines.get(assetId);
    if (current && (current.text !== next.text || current.speaker !== next.speaker)) throw new Error(`Conflicting dialogue for ${assetId}`);
    lines.set(assetId, next);
  };
  for (const scene of scenes) {
    add(scene.voiceAssetId, scene.text, scene.speaker);
    for (const choice of scene.choices ?? []) add(choice.resultVoiceAssetId, choice.resultText, scene.speaker);
  }
  return [...lines.entries()].sort(([a], [b]) => a.localeCompare(b));
}
function safe(id: string) { return id.replaceAll(/[^a-z0-9.-]/giu, '-'); }
function stripId(job: RecordValue) { const { id: _id, ...spec } = job; return spec; }
function galleryCgPrompt(assetId: string): string {
  if (assetId === 'cg.mirror_broken') return 'Albina visual novel static CG: a fractured mirror reflecting Albina and Fascia in the Ring atelier. Preserve the supplied approved art identity, palette, linework, costume, composition language, and mature restrained horror mood. No text, no logo, no additional characters.';
  if (assetId === 'cg.rain_reflection') return 'Albina visual novel static CG: rain-soaked window reflection of Albina and Fascia after a quiet confession. Preserve the supplied approved art identity, palette, linework, costume, composition language, and subdued nocturnal mood. No text, no logo, no additional characters.';
  throw new Error(`Unknown pending gallery CG: ${assetId}`);
}
