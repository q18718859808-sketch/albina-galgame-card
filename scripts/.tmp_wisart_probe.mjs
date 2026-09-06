// WisArt gpt-image-2 通道探测（临时脚本，验证后删除）
// 目的：验证用户提供的新 key sk-b98695... 能否通过 https://wisart.kuaileshifu.com/v1 调通 gpt-image-2
import { createHash } from 'node:crypto';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const baseUrl = 'https://wisart.kuaileshifu.com/v1';
const apiKey = process.env.WISART_PROBE_KEY;
const projectRoot = resolve(import.meta.dirname, '..');

function inspectPng(buffer) {
  const signature = '89504e470d0a1a0a';
  if (buffer.length < 33 || buffer.subarray(0, 8).toString('hex') !== signature || buffer.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('Image response is not a valid PNG');
  }
  const colorType = buffer[25];
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), colorType, alphaCapable: colorType === 4 || colorType === 6 };
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function requestJson(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 300_000);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });
    const text = await response.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not json */ }
    return { http: response.status, json, text: text.slice(0, 2000) };
  } finally {
    clearTimeout(timer);
  }
}

const report = { provider: 'wisart-openai-compatible', baseUrl, testedAt: new Date().toISOString() };

// 1) 模型列表
const models = await requestJson('/models', { method: 'GET' });
report.modelListHttp = models.http;
if (models.json?.data) {
  report.modelCount = models.json.data.length;
  report.models = Object.fromEntries(
    [...new Set(models.json.data.map((m) => (typeof m === 'string' ? m : m.id)))].sort().map((id) => [id, id === 'gpt-image-2']),
  );
  report.gptImage2Listed = Boolean(report.models['gpt-image-2']);
} else {
  report.modelsError = models.text;
}

// 2) 实际生成（小尺寸、低花费的探测图）
if (models.http === 200) {
  const generation = await requestJson('/images/generations', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt: 'A simple flat-color test swatch: solid gradient of indigo to rose, no text, no person, minimal abstract background, clean edges.',
      size: '1024x1024',
      n: 1,
    }),
  });
  report.generationHttp = generation.http;
  report.generationError = generation.json?.error ?? (generation.http !== 200 ? generation.text : undefined);
  const data = generation.json?.data?.[0];
  if (data?.b64_json) {
    const buffer = Buffer.from(data.b64_json, 'base64');
    try {
      const info = inspectPng(buffer);
      report.artifact = { format: 'b64_json', ...info, bytes: buffer.length, sha256: sha256(buffer) };
      const outDir = resolve(projectRoot, 'staging/media/wisart-probe-v2');
      await mkdir(outDir, { recursive: true });
      await writeFile(resolve(outDir, 'probe.png'), buffer);
      report.artifactPath = 'staging/media/wisart-probe-v2/probe.png';
    } catch (error) {
      report.artifactError = error.message;
    }
  } else if (data?.url) {
    const imageResponse = await fetch(data.url, { signal: AbortSignal.timeout(120_000) });
    report.artifactUrlFetchHttp = imageResponse.status;
    if (imageResponse.ok) {
      const buffer = Buffer.from(await imageResponse.arrayBuffer());
      try {
        const info = inspectPng(buffer);
        report.artifact = { format: 'url', ...info, bytes: buffer.length, sha256: sha256(buffer) };
        const outDir = resolve(projectRoot, 'staging/media/wisart-probe-v2');
        await mkdir(outDir, { recursive: true });
        await writeFile(resolve(outDir, 'probe.png'), buffer);
        report.artifactPath = 'staging/media/wisart-probe-v2/probe.png';
      } catch (error) {
        report.artifactError = error.message;
      }
    }
  } else if (generation.http !== 200) {
    report.generationErrorBody = generation.text;
  }
}

console.log(JSON.stringify(report, null, 2));
