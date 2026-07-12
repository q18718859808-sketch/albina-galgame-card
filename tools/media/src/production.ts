import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

type RecordValue = Record<string, any>;

const voices: Record<string, string> = {
  '阿尔比娜': 'nova', '叙事记录': 'onyx', '旁白': 'onyx', '法西娅': 'shimmer', '浮士德': 'shimmer',
  '维吉利乌斯': 'echo', '但丁': 'alloy', '卡利斯托': 'fable', 'LCE 医师': 'echo', '环指代理人': 'fable', '金色幻影': 'shimmer',
};
const palette = ['#11131a', '#6f7587', '#b9c2d0', '#d8bb72', '#7c2638', '#dbe4ea'];
const routeNames = ['white_canvas', 'golden_bough_rebuild', 'ring_conspiracy'];
const musicCues = ['main_menu','title_theme','backstreets_rain','between_two_worlds','boss_kromer','opening_rain','white_canvas','golden_bough','ring_conspiracy','lce_lab','limbus_bus','mirror_corridor','nest_station','outskirts_dawn','rain_room','ring_atelier','spider_gallery','city_rooftop','trust_threshold','art_resonance','surgery_of_memory','rebuild_awakening','ending_gate','op','ed_white_canvas','ed_golden_bough','ed_ring_conspiracy'];

export async function prepareProduction(root: string, outputDirectory: string) {
  const manifest = await json(resolve(root, 'content/asset-manifest-v2.json'));
  const script = await json(resolve(root, 'content/game-script-v2.json'));
  const scenes = (await Promise.all(script.dialogueFiles.map((file: string) => json(resolve(root, 'content', file))))).flat();
  const assetPaths = new Map(manifest.assets.map((asset: RecordValue) => [asset.id, asset.path]));
  const textByVoice = new Map<string, { text: string; speaker: string }>();
  for (const scene of scenes) {
    textByVoice.set(scene.voiceAssetId, { text: scene.text, speaker: scene.speaker });
    for (const choice of scene.choices ?? []) textByVoice.set(choice.resultVoiceAssetId, { text: choice.resultText, speaker: scene.speaker });
  }
  const jobs: RecordValue[] = [];
  for (const pending of manifest.mediaJobs.filter((job: RecordValue) => job.kind === 'image-edit')) {
    const source = assetPaths.get(pending.inputAssetIds[0]);
    if (typeof source !== 'string') throw new Error(`Missing source asset for ${pending.id}`);
    jobs.push({ id: pending.id, kind: 'image', prompt: 'Edit the supplied canonical reference into one transparent horizontal strip of exactly eight equal square frames. Preserve identity, outfit, palette, silhouette and line style. Frames: neutral, blink, speak, smile, sad, tense, action, recovery. No text, no borders, no extra subjects.', width: 4096, height: 512, sourceImage: resolve(root, 'dist/albina-galgame-card/assets', source), output: resolve(root, 'staging/media', pending.outputPath), validation: { width: 4096, height: 512, alpha: true, frameCount: 8 } });
  }
  for (const pending of manifest.mediaJobs.filter((job: RecordValue) => job.kind === 'speech')) {
    const line = textByVoice.get(pending.assetId);
    if (!line) throw new Error(`Missing dialogue for ${pending.assetId}`);
    jobs.push({ id: pending.id, kind: 'speech', input: line.text, voice: voices[line.speaker] ?? 'alloy', output: resolve(root, 'staging/media', pending.outputPath), validation: { minDurationSeconds: 0.2, maxDurationSeconds: 60, minLoudnessDbfs: -30, maxLoudnessDbfs: -6 } });
  }
  const videoIds = ['prologue', ...routeNames.flatMap(route => [3,5,8,11,15].map(n => `${route}_scene_${n}`)), ...routeNames.flatMap(route => ['true','normal','bad'].map(end => `${route}_ending_${end}`)), 'op', ...routeNames.map(route => `ed_${route}`)];
  for (const id of videoIds) {
    const keyframeId = videoKeyframe(id);
    const keyframePath = assetPaths.get(keyframeId);
    if (typeof keyframePath !== 'string') throw new Error(`Missing approved keyframe ${keyframeId} for ${id}`);
    jobs.push({ id: `job.video.${id}`, kind: 'video', prompt: `Albina visual novel animated CG: ${id.replaceAll('_',' ')}. Use approved keyframe composition, restrained cinematic motion, preserve character identity and frozen palette, no text or logos.`, durationSeconds: id === 'op' || id.startsWith('ed_') ? 30 : 8, sourceImage: resolve(root, 'dist/albina-galgame-card/assets', keyframePath), output: resolve(root, 'staging/media/video', `${id}.mp4`), validation: { width: 1280, height: 720, fps: 24, durationSeconds: id === 'op' || id.startsWith('ed_') ? 30 : 8, tolerance: 1 } });
  }
  for (let i=1;i<=3;i++) jobs.push({ id: `job.music.probe.${i}`, kind: 'music', probe: true, prompt: 'Instrumental dark chamber-electronic visual novel underscore, stable form, clean ending, no vocals.', durationSeconds: 15, output: resolve(root, 'staging/media/music/probes', `probe-${i}.mp3`), validation: { minDurationSeconds: 12, maxDurationSeconds: 18, minLoudnessDbfs: -30, maxLoudnessDbfs: -6 } });
  for (const cue of musicCues) for (const variant of ['master','instrumental','loop']) jobs.push({ id: `job.music.${cue}.${variant}`, kind: 'music', prompt: `Albina visual novel cue ${cue.replaceAll('_',' ')}, ${variant}, instrumental dark chamber-electronic score, coherent motif, production ready, no spoken word.`, durationSeconds: variant === 'loop' ? 60 : 90, output: resolve(root, 'staging/media/music', cue, `${variant}.mp3`), validation: { minDurationSeconds: 50, maxDurationSeconds: 100, minLoudnessDbfs: -30, maxLoudnessDbfs: -6 } });
  jobs.sort((a,b) => a.id.localeCompare(b.id));
  const freeze = { version: 1, characters: ['阿尔比娜','法西娅','浮士德','维吉利乌斯','但丁','卡利斯托','LCE 医师','环指代理人','金色幻影'], palette, outfits: 'canonical source assets only; no redesign', expressions: ['neutral','blink','speak','smile','sad','tense','action','recovery'], voices, cueSheet: musicCues };
  const index = { version: 1, provider: 'Pie only', models: { image: 'gpt-image-2', speech: 'speech-2.8-hd', video: 'seedance-1.5-pro', music: 'music-2.6' }, freeze, jobs };
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(join(outputDirectory, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
  for (const job of jobs) await writeFile(join(outputDirectory, `${safe(job.id)}.json`), `${JSON.stringify(stripId(job), null, 2)}\n`);
  return { image: 8, speech: 154, video: 29, musicProbe: 3, music: 81, total: jobs.length };
}

async function json(path: string) { return JSON.parse(await readFile(path, 'utf8')); }
function safe(id: string) { return id.replaceAll(/[^a-z0-9.-]/giu, '-'); }
function stripId(job: RecordValue) { const { id: _id, ...spec } = job; return spec; }
function videoKeyframe(id: string): string {
  if (id === 'prologue' || id === 'op') return 'cg.opening_rain';
  if (id.includes('white_canvas')) return id.includes('ending') || id.startsWith('ed_') ? 'cg.white_canvas_ending' : 'cg.white_canvas_choice';
  if (id.includes('golden_bough')) return id.includes('ending') || id.startsWith('ed_') ? 'cg.golden_bough_ending' : 'cg.rebuild_awakening';
  if (id.includes('ring_conspiracy')) return id.includes('ending') || id.startsWith('ed_') ? 'cg.ring_conspiracy_ending' : 'cg.conspiracy_contract';
  throw new Error(`No approved keyframe mapping for ${id}`);
}
