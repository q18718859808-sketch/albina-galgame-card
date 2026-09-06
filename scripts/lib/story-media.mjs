function bgmAssetIdForScene(scene) {
  if (scene.route === 'ring_conspiracy') return 'file.audio.bgm.boss.kromer.mp3';
  if (scene.route === 'golden_bough_rebuild') return 'file.audio.bgm.title.theme.mp3';
  if (scene.locationId === 'backstreets_rain') return 'file.audio.bgm.backstreets.rain.mp3';
  return 'file.audio.bgm.between.two.worlds.mp3';
}

function sfxAssetIdsForScene(scene) {
  if (scene.tone === 'threat') return ['file.audio.se.slash.heavy.wav'];
  if (scene.tone === 'gallery') return ['file.audio.se.glass.shatter.wav'];
  return undefined;
}

export function materializeStoryMedia(scenes) {
  return scenes.map((scene) => {
    const { videoAssetId: _videoAssetId, desktopVideoAssetId: _desktopVideoAssetId, ...staticScene } = scene;
    const bgmAssetId = bgmAssetIdForScene(scene);
    const sfxAssetIds = sfxAssetIdsForScene(scene);
    return {
      ...staticScene, bgmAssetId, ...(sfxAssetIds ? { sfxAssetIds } : {}),
    };
  });
}

export function collectStoryAssetReferences(scenes) {
  const references = new Set();
  for (const scene of scenes) {
    for (const key of ['backgroundAssetId', 'cgAssetId', 'voiceAssetId', 'bgmAssetId']) {
      if (scene[key]) references.add(scene[key]);
    }
    for (const portrait of scene.portraits) references.add(portrait.portraitAssetId);
    for (const id of scene.sfxAssetIds ?? []) references.add(id);
    for (const choice of scene.choices) {
      if (choice.resultVoiceAssetId) references.add(choice.resultVoiceAssetId);
      for (const id of choice.effects.unlockCg ?? []) references.add(id);
    }
  }
  return [...references].sort();
}

export function findUnresolvedStoryReferences(scenes, lookup) {
  const resolvable = new Set([
    ...Object.keys(lookup.assetsById),
    ...Object.keys(lookup.portraitsById),
    ...Object.keys(lookup.pendingById),
  ]);
  return collectStoryAssetReferences(scenes).filter((id) => !resolvable.has(id));
}
