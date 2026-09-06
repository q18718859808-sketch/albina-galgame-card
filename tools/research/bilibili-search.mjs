import { chromium } from 'playwright';

const query = process.argv.slice(2).join(' ').trim();
if (!query) throw new Error('Usage: node tools/research/bilibili-search.mjs <query>');

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.RESEARCH_BROWSER ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  proxy: { server: process.env.RESEARCH_PROXY ?? 'http://127.0.0.1:7897' },
});

try {
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36',
  });
  const url = `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  const links = await page.locator('a[href*="/video/"]').evaluateAll((elements) => (
    [...new Map(elements.map((element) => [
      element.href,
      (element.textContent ?? '').trim().replace(/\s+/gu, ' '),
    ])).entries()].slice(0, 30).map(([href, title]) => ({ href, title }))
  ));
  process.stdout.write(`${JSON.stringify({ query, pageTitle: await page.title(), links }, null, 2)}\n`);
} finally {
  await browser.close();
}
