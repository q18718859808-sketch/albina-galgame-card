import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('save-tools panel structure and styling contract', () => {
  it('keeps the export and import surfaces as ordered, labelled groups', async () => {
    const app = await readFile('src/App.vue', 'utf8');
    expect(app).toContain('<details class="save-tools" data-testid="save-tools">');
    expect(app).toContain('<div class="save-tools__export">');
    expect(app).toContain('<div class="save-tools__import">');
    // Export button precedes its textarea; import textarea precedes its button.
    // Anchors carry the opening tag: bare 'save-tools__export' also prefix-matches
    // 'save-tools__export-actions' and would truncate the block.
    const exportBlock = app.split('save-tools__export">')[1]?.split('save-tools__import">')[0] ?? '';
    expect(exportBlock.indexOf('导出当前存档')).toBeLessThan(exportBlock.indexOf('导出存档'));
    const importBlock = app.split('save-tools__import">')[1] ?? '';
    expect(importBlock.indexOf('导入存档')).toBeLessThan(importBlock.indexOf('@click="importCurrentSave"'));
    // Bindings survive the regroup: same refs, same handlers.
    expect(app).toContain('v-model="exportText"');
    expect(app).toContain('v-model="importText"');
    expect(app).toContain('@click="exportCurrentSave"');
    expect(app).toContain('@click="importCurrentSave"');
  });

  it('preflights pasted SaveV2 JSON with a live import state', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('const importPreview = computed(');
    expect(app).toContain(":data-import-state=\"importState\"");
    expect(app).toContain(":disabled=\"importState !== 'valid'\"");
    expect(app).toContain('data-testid="import-error"');
    expect(app).toContain('class="save-tools__import-error"');
    expect(styles).toContain("textarea[data-import-state='invalid'] { border-color: rgb(201 85 85 / 72%); }");
    expect(styles).toContain('.save-tools__import-error {');
    expect(styles).toContain('.save-tools__import button:disabled {');
  });

  it('styles the panel, the golden summary and the mono-spaced text areas', async () => {
    const styles = await readFile('src/styles.css', 'utf8');
    expect(styles).toContain('.save-tools { position: absolute; right: 1rem; top: 4.5rem;');
    expect(styles).toContain('border: 1px solid rgb(215 175 70 / 26%); border-radius: 6px;');
    expect(styles).toContain('.save-tools summary {');
    expect(styles).toContain('.save-tools__export, .save-tools__import { display: grid;');
    expect(styles).toContain('font-family: ui-monospace, "Cascadia Code", Consolas, monospace;');
    expect(styles).toContain('.save-tools textarea:focus {');
    expect(styles).toContain('justify-self: end;');
  });

  it('copies the exported save with a transient copied state on the copy button', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('const copiedExport = ref(false);');
    expect(app).toContain('async function copyExport(): Promise<void>');
    expect(app).toContain('navigator.clipboard?.writeText');
    expect(app).toContain("document.execCommand('copy')");
    expect(app).toContain('window.clearTimeout(copiedExportTimer)');
    expect(app).toContain('class="save-tools__export-actions"');
    expect(app).toContain('@click="copyExport"');
    expect(app).toContain(':disabled="!exportText"');
    expect(app).toContain(":data-copied=\"copiedExport ? 'true' : 'false'\"");
    expect(app).toContain("{{ copiedExport ? '已复制' : '复制' }}");
    expect(app).toContain('ref="exportTextarea"');
    expect(styles).toContain('.save-tools__export-actions {');
    expect(styles).toContain(".save-tools__copy[data-copied='true'] {");
  });

  it('acknowledges a successful import with a transient ok badge', async () => {
    const [app, styles] = await Promise.all([
      readFile('src/App.vue', 'utf8'),
      readFile('src/styles.css', 'utf8'),
    ]);
    expect(app).toContain('const importedSave = ref(false);');
    expect(app).toContain('let importedSaveTimer: ReturnType<typeof setTimeout> | undefined;');
    expect(app).toContain('async function importCurrentSave(): Promise<void> {');
    expect(app).toContain('if (await game.importSave(text)) {');
    expect(app).toContain("importText.value = '';");
    expect(app).toContain('importedSave.value = true;');
    expect(app).toContain('window.clearTimeout(importedSaveTimer)');
    expect(app).toContain('setTimeout(() => { importedSave.value = false; }, 2000)');
    expect(app).toContain('class="save-tools__import-ok"');
    expect(app).toContain('data-testid="import-ok"');
    expect(app).toContain('aria-live="polite"');
    expect(app).toContain('已导入');
    expect(app).toContain('clearTimeout(importedSaveTimer)');
    expect(styles).toContain('.save-tools__import-ok { margin: 0; color: #8fd0c8; font-size: .68rem; letter-spacing: .08em; }');
  });
});
