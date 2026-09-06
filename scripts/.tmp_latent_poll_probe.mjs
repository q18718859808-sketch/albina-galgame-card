// Latent.moe 状态轮询探测（临时脚本，验证后删除）
import { setTimeout as sleep } from 'node:timers/promises';

const baseUrl = process.env.LATENT_PROBE_BASE ?? 'https://latent.moe';
const apiKey = process.env.LATENT_PROBE_KEY;

async function probe(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });
    const text = await response.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not json */ }
    return { http: response.status, json, text: text.slice(0, 1500), location: response.headers.get('location') };
  } finally {
    clearTimeout(timer);
  }
}

const report = { baseUrl, testedAt: new Date().toISOString() };

// 1) 提交探测任务（小尺寸 + 最小 steps）
const submit = await probe('/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    prompt: 'A minimal flat-color test swatch: solid gradient of cyan to magenta, no text, no person, abstract background, clean edges.',
    steps: 8,
    resolution: '512x512',
  }),
});
report.submit = { http: submit.http, body: submit.json ?? submit.text };
const jobId = submit.json?.id;
report.jobId = jobId;

if (jobId) {
  // 2) 试各种轮询路径
  for (const path of [
    `/api/generate/status?id=${jobId}`,
    `/api/generate/status/${jobId}`,
    `/api/generate/${jobId}`,
    `/api/generate/${jobId}/status`,
    `/api/job/${jobId}`,
    `/api/jobs/${jobId}`,
    `/api/v1/generate/${jobId}`,
  ]) {
    const r = await probe(path, { method: 'GET' });
    report[`poll:${path}`] = { http: r.http, body: r.json ?? r.text.slice(0, 300) };
  }

  // 3) 直接试 artworkId = jobId 拉图（如果 art 与 job 同号）
  const media = await probe(`/api/media/${jobId}`, { method: 'GET', headers: { Authorization: `Bearer ${apiKey}` } });
  if (media.http === 200) {
    report.mediaFetch = { http: 200, contentType: 'pending', bytes: 'pending' };
  } else {
    report.mediaFetch = { http: media.http, body: (media.json ?? media.text).slice(0, 300) };
  }

  // 4) 长间隔后再试 status 与 media
  await sleep(8_000);
  for (const path of [`/api/generate/${jobId}`, `/api/media/${jobId}`, `/api/v1/artworks/${jobId}`]) {
    const r = await probe(path, { method: 'GET' });
    report[`late:${path}`] = { http: r.http, body: r.json ?? r.text.slice(0, 300) };
  }
}

console.log(JSON.stringify(report, null, 2));