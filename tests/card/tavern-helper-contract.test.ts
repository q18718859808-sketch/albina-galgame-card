import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { readCharacterCardPng } from '../../scripts/lib/character-card-png.mjs';

const projectRoot = process.cwd();
const canonicalPath = join(projectRoot, 'card/albina.card.json');
const templatePath = join(projectRoot, 'card/character-card.template.json');
const pngPath = join(projectRoot, 'card/albina.card.png');
const sourcePath = join(projectRoot, 'content/tavern-helper-v1.json');

interface TavernHelper {
  scripts: Array<{
    type: string;
    enabled: boolean;
    name: string;
    id: string;
    content: string;
    info: string;
    button: { enabled: boolean; buttons: Array<{ name: string; visible: boolean }> };
    data: Record<string, unknown>;
  }>;
  variables: Record<string, unknown>;
}

interface Card {
  data: { extensions: { tavern_helper: TavernHelper } };
}

interface TavernHelperSource {
  releaseVersion: string;
  cdnUrl: string;
  script: Omit<TavernHelper['scripts'][number], 'content'>;
  optionalIntegrations: Array<{
    id: string;
    enabled: boolean;
    name: string;
    releaseVersion: string;
    cdnUrl: string;
    role: string;
    capabilities: string[];
    fallback: string;
    scope: string;
  }>;
  variables: Record<string, unknown>;
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T;
}

describe('Tavern Helper card embedding contract', () => {
  it('keeps canonical JSON, template JSON, and canonical PNG on the proven static-import shape', async () => {
    const [canonical, template, png, source] = await Promise.all([
      readJson<Card>(canonicalPath),
      readJson<Card>(templatePath),
      readFile(pngPath).then((bytes) => readCharacterCardPng(bytes) as Card),
      readJson<TavernHelperSource>(sourcePath),
    ]);

    expect(source.releaseVersion).toMatch(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u);
    expect(source.cdnUrl).toMatch(
      /^https:\/\/cdn\.jsdelivr\.net\/gh\/q18718859808-sketch\/albina-galgame-card@v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?\/dist\/albina-galgame-card\/source\/albina-classic-loader\.js$/u,
    );
    expect(source.cdnUrl).toContain(`@v${source.releaseVersion}/`);

    expect(source.script.name).toBe('Albina');
    expect(source.script.id).toMatch(/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/iu);
    expect(source.script.button.buttons[0]?.name.trim()).not.toBe('');

    const expected: TavernHelper = {
      scripts: [{
        type: 'script',
        enabled: true,
        name: source.script.name,
        id: source.script.id,
        content: `import '${source.cdnUrl}'\n`,
        info: '',
        button: {
          enabled: true,
          buttons: [{ name: source.script.button.buttons[0]!.name, visible: true }],
        },
        data: {},
      }, ...source.optionalIntegrations.filter((integration) => integration.enabled).map((integration) => ({
        type: 'script',
        enabled: true,
        name: integration.name,
        id: `albina-integration-${integration.id}-v${integration.releaseVersion}`,
        content: `import '${integration.cdnUrl}'\n`,
        info: integration.role,
        button: { enabled: false, buttons: [] },
        data: {
          integration_id: integration.id,
          capabilities: integration.capabilities,
          fallback: integration.fallback,
          scope: integration.scope,
        },
      }))],
      variables: {},
    };

    const helpers = [
      canonical.data.extensions.tavern_helper,
      template.data.extensions.tavern_helper,
      png.data.extensions.tavern_helper,
    ];
    expect(helpers[1]).toEqual(helpers[0]);
    expect(helpers[2]).toEqual(helpers[0]);
    for (const helper of helpers) expect(helper).toEqual(expected);

    for (const script of helpers[0]!.scripts) {
      expect(script.content.match(/\n/gu)).toHaveLength(1);
      expect(script.content).not.toContain('\r');
      expect(script.content.endsWith('\n')).toBe(true);
    }
    expect(source.optionalIntegrations.find((integration) => integration.id === 'lorebook-tool-call')).toMatchObject({ enabled: false });
    expect(helpers[0]!.scripts.some((script) => script.data.integration_id === 'lorebook-tool-call')).toBe(false);
  });
});
