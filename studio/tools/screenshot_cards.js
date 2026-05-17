/**
 * screenshot_cards.js
 * Opens pages in a REAL visible Chrome window so animations play,
 * scrolls through to trigger scroll-based animations, then captures.
 *
 * Usage: node internal/tools/screenshot_cards.js
 * Requires: npm install puppeteer sharp
 */

const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '../../');
const TN_ROOT = path.resolve(ROOT, '../triple-nickle/current');
const NC_ROOT = path.resolve(ROOT, '../ncrmpa');

const SITES = [
  {
    prefix: 'ncrmpa',
    outDir: path.join(ROOT, 'assets/images/portfolio/ncrmpa'),
    pages: [
      { file: path.join(NC_ROOT, 'index.html'),      slug: 'home'       },
      { file: path.join(NC_ROOT, 'about.html'),      slug: 'about'      },
      { file: path.join(NC_ROOT, 'events.html'),     slug: 'events'     },
      { file: path.join(NC_ROOT, 'membership.html'), slug: 'membership' },
    ],
  },
];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      const distance = 300;
      const delay = 80;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, delay);
    });
  });
  // Let everything settle after scroll
  await new Promise(r => setTimeout(r, 1500));
}

async function saveWebp(buf, outPath, opts = {}) {
  const { resize, quality = 78, maxHeight } = opts;
  let pipeline = sharp(buf);
  if (maxHeight) {
    // Scale down proportionally if too tall for WebP (max ~16k px)
    const meta = await sharp(buf).metadata();
    if (meta.height > maxHeight) {
      const scale = maxHeight / meta.height;
      pipeline = sharp(buf).resize(Math.round(meta.width * scale), maxHeight);
    }
  }
  if (resize) pipeline = pipeline.resize(resize.w, resize.h, { fit: 'cover', position: 'top' });
  await pipeline.webp({ quality }).toFile(outPath);
  const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`      ✅ ${kb} KB → ${path.basename(outPath)}`);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,         // REAL visible Chrome window so CSS animations run
    defaultViewport: null,   // let viewport be set per page
    args: [
      '--start-maximized',
      '--no-sandbox',
    ],
  });

  for (const site of SITES) {
    fs.mkdirSync(site.outDir, { recursive: true });
    console.log(`\n🗂️  ${site.prefix.toUpperCase()} — ${site.pages.length} pages`);

    for (const pg of site.pages) {
      console.log(`\n  📄 ${pg.slug}`);
      const fileUrl = `file:///${pg.file.replace(/\\/g, '/')}`;
      const base = `${site.prefix}-${pg.slug}`;

      // ── DESKTOP ──────────────────────────────────────────────
      const desktopPage = await browser.newPage();
      await desktopPage.setViewport({ width: 1920, height: 1080 });
      await desktopPage.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000)); // hero animations
      await autoScroll(desktopPage);
      const desktopBuf = await desktopPage.screenshot({ fullPage: true });
      await desktopPage.close();
      await saveWebp(desktopBuf, path.join(site.outDir, `${base}-desktop.webp`), { quality: 80 });

      // ── MOBILE ───────────────────────────────────────────────
      const mobilePage = await browser.newPage();
      await mobilePage.setViewport({ width: 375, height: 812 });
      await mobilePage.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      await autoScroll(mobilePage);
      const mobileBuf = await mobilePage.screenshot({ fullPage: true });
      await mobilePage.close();
      await saveWebp(mobileBuf, path.join(site.outDir, `${base}-mobile.webp`), { quality: 75, maxHeight: 14000 });

      // ── CARD (1200×800 crop from top, desktop) ───────────────
      const cardPage = await browser.newPage();
      await cardPage.setViewport({ width: 1200, height: 800 });
      await cardPage.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000)); // extra wait for hero
      // Hide scrollbar so it doesn't appear in the card crop
      await cardPage.evaluate(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      });
      const cardBuf = await cardPage.screenshot({ fullPage: false });
      await cardPage.close();
      await saveWebp(cardBuf, path.join(site.outDir, `${base}-card.webp`), {
        resize: { w: 1200, h: 800 },
        quality: 78,
      });
    }
  }

  await browser.close();
  console.log('\n✅ All screenshots complete!');
})();
