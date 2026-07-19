import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '..');
const researchRoot = resolve(projectRoot, 'staging/research/canon-visual/wiki-game-assets');
const outputPath = resolve(projectRoot, 'content/media-production/canon-visual-sources-v1.json');
const checkedAt = '2026-07-17';
const wikiImage = (name, revision) => `https://limbuscompany.wiki.gg/images/${encodeURIComponent(name).replaceAll('%2F', '/')}${revision ? `?${revision}` : ''}`;

const records = [
  source('9-14-s908.png', 'canon.visual.canto-ix.9-14.s908', 'canto-ix-9-14', 'story-frame', 'S908.png', '3652da', ['source.official.canto-ix.9-14', 'source.wiki.canto-ix-part-i.172275'], true),
  source('9-14-s914.png', 'canon.visual.canto-ix.9-14.s914', 'canto-ix-9-14', 'story-frame', 'S914.png', 'a3d292', ['source.official.canto-ix.9-14', 'source.wiki.canto-ix-part-i.172275']),
  source('9-18-lce-lab-bg.png', 'canon.visual.canto-ix.9-18.lce-lab-bg', 'canto-ix-9-18', 'background', 'Story_LCE_Research_Team_Laboratory_BG.png', '4ef42a', ['source.official.canto-ix.9-18', 'source.wiki.canto-ix-part-i.172275'], true),
  source('9-18-s909-1.png', 'canon.visual.canto-ix.9-18.s909-1', 'canto-ix-9-18', 'story-frame', 'S909_1.png', '81025b', ['source.official.canto-ix.9-18', 'source.wiki.canto-ix-part-i.172275']),
  source('9-18-s909-2.png', 'canon.visual.canto-ix.9-18.s909-2', 'canto-ix-9-18', 'story-frame', 'S909_2.png', '681612', ['source.official.canto-ix.9-18', 'source.wiki.canto-ix-part-i.172275']),
  source('9-18-s918.png', 'canon.visual.canto-ix.9-18.s918', 'canto-ix-9-18', 'story-frame', 'S918.png', 'a818c0', ['source.official.canto-ix.9-18', 'source.wiki.canto-ix-part-i.172275']),
  source('9-37-s937.png', 'canon.visual.canto-ix.9-37.s937', 'canto-ix-9-37', 'story-frame', 'S937.png', 'e2c855', ['source.official.canto-ix.9-37', 'source.wiki.canto-ix-part-iii.177602']),
  source('alyssa-9-37-story-icon.png', 'canon.visual.alyssa.story-icon', 'alyssa', 'story-icon', 'Alyssa_Story_Icon.png', 'e84737', ['source.official.canto-ix.9-37', 'source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602'], true),
  source('9-43-ring-corridor-bg.png', 'canon.visual.canto-ix.9-43.ring-corridor-bg', 'canto-ix-9-43', 'background', 'Story_Corridor_of_the_Ring_2_BG.png', '8c9ac7', ['source.official.canto-ix.9-37', 'source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602'], true),
  source('9-43-s929-1.png', 'canon.visual.canto-ix.9-43.s929-1', 'canto-ix-9-43', 'story-frame', 'S929_1.png', '580107', ['source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602']),
  source('9-43-s929-2.png', 'canon.visual.canto-ix.9-43.s929-2', 'canto-ix-9-43', 'story-frame', 'S929_2.png', '3788c1', ['source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602']),
  source('9-43-s930-1.png', 'canon.visual.canto-ix.9-43.s930-1', 'canto-ix-9-43', 'story-frame', 'S930_1.png', 'ac201d', ['source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602']),
  source('9-43-s930-2.png', 'canon.visual.canto-ix.9-43.s930-2', 'canto-ix-9-43', 'story-frame', 'S930_2.png', 'cae026', ['source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602']),
  source('9-43-s943-1.png', 'canon.visual.canto-ix.9-43.s943-1', 'canto-ix-9-43', 'story-frame', 'S943_1.png', 'a6fb1d', ['source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602']),
  source('9-43-s943-2.png', 'canon.visual.canto-ix.9-43.s943-2', 'canto-ix-9-43', 'story-frame', 'S943_2.png', 'f4016b', ['source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602']),
  source('sinclair-smoke-war-9-43-story-icon.png', 'canon.visual.sinclair.smoke-war-story-icon', 'sinclair-smoke-war', 'story-icon', 'A_Certain_Sinclair_Story_Icon.png', 'c06458', ['source.official.canto-ix.9-43', 'source.wiki.canto-ix-part-iii.177602'], true),
  source('albina-armored-standing.png', 'canon.visual.albina.armored-standing', 'albina', 'standing', 'Albina_Armored_StandingSprite.png', '30f3e9', ['source.official.canto-ix.9-18', 'source.wiki.albina.173286'], true),
  source('albina-armored-story-icon.png', 'canon.visual.albina.armored-story-icon', 'albina', 'story-icon', 'Albina_Armored_Story_Icon.png', '130725', ['source.official.canto-ix.9-18', 'source.wiki.albina.173286']),
  source('albina-armored-storylog.png', 'canon.visual.albina.armored-storylog', 'albina', 'storylog', 'Albina_Armored_StoryLog.png', '516764', ['source.official.canto-ix.9-18', 'source.wiki.albina.173286']),
  source('albina-story-icon.png', 'canon.visual.albina.story-icon', 'albina', 'story-icon', 'Albina_Story_Icon.png', 'a8d005', ['source.wiki.albina.173286']),
  source('albina-unarmored-standing.png', 'canon.visual.albina.unarmored-standing', 'albina', 'standing', 'Albina_StandingSprite.png', 'e94e59', ['source.official.canto-ix.9-18', 'source.wiki.albina.173286'], true),
  source('albina-unarmored-storylog.png', 'canon.visual.albina.unarmored-storylog', 'albina', 'storylog', 'Albina_StoryLog.png', 'eed576', ['source.wiki.albina.173286']),
  source('callisto-standing.png', 'canon.visual.callisto.standing', 'callisto', 'standing', 'Callisto_StandingSprite.png', 'e77e0e', ['source.official.canto-ix.9-43', 'source.wiki.callisto.177757'], true),
  source('callisto-story-icon.png', 'canon.visual.callisto.story-icon', 'callisto', 'story-icon', 'Callisto_Story_Icon.png', '4fe4d4', ['source.wiki.callisto.177757']),
  source('callisto-storylog.png', 'canon.visual.callisto.storylog', 'callisto', 'storylog', 'Callisto_StoryLog.png', 'fab487', ['source.wiki.callisto.177757']),
  source('dante-9-18-story-icon.png', 'canon.visual.dante.story-icon', 'dante', 'story-icon', 'Dante_Story_Icon.png', '3ac73e', ['source.official.canto-ix.9-18']),
  source('dante-standing.png', 'canon.visual.dante.standing', 'dante', 'standing', 'Dante_StandingSprite.png', 'f24be4', ['source.official.canto-ix.9-18'], true),
  source('dante-storylog.png', 'canon.visual.dante.storylog', 'dante', 'storylog', 'Dante_StoryLog.png', '1d4799', ['source.official.canto-ix.9-18']),
  source('faust-9-37-9-43-story-icon.png', 'canon.visual.faust.story-icon', 'faust', 'story-icon', 'Faust_Story_Icon.png', 'b19ff2', ['source.official.canto-ix.9-37', 'source.official.canto-ix.9-43']),
  source('faust-promotional.jpg', 'canon.visual.faust.promotional', 'faust', 'promotional', 'Faustpromo.jpg', 'ca4179', ['source.official.canto-ix.9-37']),
  source('faust-standing.png', 'canon.visual.faust.standing', 'faust', 'standing', 'Faust_StandingSprite.png', '92a087', ['source.official.canto-ix.9-37', 'source.official.canto-ix.9-43'], true),
  source('faust-storylog.png', 'canon.visual.faust.storylog', 'faust', 'storylog', 'Faust_StoryLog.png', 'f2b18e', ['source.official.canto-ix.9-37', 'source.official.canto-ix.9-43']),
  source('ren-9-18-story-icon.png', 'canon.visual.ren.story-icon', 'ren', 'story-icon', 'Ren_Story_Icon.png', 'ef6b39', ['source.official.canto-ix.9-18']),
  source('ren-standing.png', 'canon.visual.ren.standing', 'ren', 'standing', 'Ren_StandingSprite.png', 'b1a3e4', ['source.official.canto-ix.9-18'], true),
  source('ren-storylog.png', 'canon.visual.ren.storylog', 'ren', 'storylog', 'Ren_StoryLog.png', '37f508', ['source.official.canto-ix.9-18']),
  source('vergilius-standing.png', 'canon.visual.vergilius.standing', 'vergilius', 'standing', 'Vergilius_StandingSprite.png', '9c8166', ['source.official.canto-ix.9-37'], true),
  source('vergilius-storylog.png', 'canon.visual.vergilius.storylog', 'vergilius', 'storylog', 'Vergilius_StoryLog.png', 'a2fe59', ['source.official.canto-ix.9-37']),
];

function source(file, id, subject, role, sourceAssetName, revision, sourceIds, productionApproved = false) {
  return { file, id, subject, role, sourceAssetName, revision, sourceIds, productionApproved };
}

async function dimensions(path, bytes) {
  if (bytes.subarray(0, 8).toString('hex') === '89504e470d0a1a0a') return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  const ffprobe = process.env.FFPROBE_PATH || 'C:\\Program Files\\Kdenlive\\bin\\ffprobe.exe';
  const { stdout } = await runFile(ffprobe, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', path]);
  const stream = JSON.parse(stdout).streams?.[0];
  if (!stream) throw new Error(`Unable to inspect ${relative(projectRoot, path)}`);
  return { width: stream.width, height: stream.height };
}

async function build() {
  const actual = (await readdir(researchRoot)).filter((name) => /\.(?:jpg|jpeg|png)$/iu.test(name)).sort();
  const expected = records.map((record) => record.file).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Canon visual source surface changed: expected ${expected.length}, found ${actual.length}`);
  const assets = [];
  for (const record of records) {
    const path = resolve(researchRoot, record.file); const bytes = await readFile(path); const size = await dimensions(path, bytes);
    const sourcePage = record.sourceAssetName ? `https://limbuscompany.wiki.gg/wiki/File:${record.sourceAssetName}` : undefined;
    assets.push({
      id: record.id, subject: record.subject, role: record.role,
      localPath: relative(projectRoot, path).replaceAll('\\', '/'),
      sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length, ...size,
      ...(record.sourceAssetName ? { sourceAssetName: record.sourceAssetName, sourcePage, sourceUrl: wikiImage(record.sourceAssetName, record.revision) } : {}),
      sourceIds: record.sourceIds, checkedAt, usage: 'production-reference-only', redistribution: 'forbidden',
      reviewStatus: record.productionApproved ? 'source-identified' : 'evidence-only',
    });
  }
  return { version: 1, checkedAt, policy: { publishSourceFiles: false, usage: 'production-reference-only', redistribution: 'forbidden' }, assets };
}

const result = await build();
const serialized = `${JSON.stringify(result, null, 2)}\n`;
if (process.argv.includes('--write')) await writeFile(outputPath, serialized, 'utf8');
else if (await readFile(outputPath, 'utf8').catch(() => '') !== serialized) throw new Error('Canon visual source index is stale; run npm run canon-visual:index -- --write');
console.log(JSON.stringify({ assets: result.assets.length, sourceIdentified: result.assets.filter((asset) => asset.reviewStatus === 'source-identified').length }));
