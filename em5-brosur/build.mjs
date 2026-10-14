// EM5 AVM broşür üretici: data.json -> Instagram sayfaları (1080x1350, 2x master)
// Kullanım: node build.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'out');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data.json'), 'utf8'));

const num = (s) => parseFloat(s.replace('.', '').replace(',', '.'));
const pct = (p) => Math.round((1 - num(p.yeni) / num(p.eski)) * 100);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function price(s, cls = '') {
  const [lira, kurus = '00'] = s.split(',');
  return `<span class="price ${cls}"><span class="lira">${lira}</span><span class="kurus">,${kurus}<i>₺</i></span></span>`;
}

const ICON = {
  phone: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  insta: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
  truck: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 5h11v9h1.5V8H19l3 4v5h-2a2.5 2.5 0 0 1-5 0H9a2.5 2.5 0 0 1-5 0H3zm14.5 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-11 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM17 10v2h3l-1.5-2z"/></svg>',
  card: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 4v2h16V9zm0 5v3h5v-3z"/></svg>',
  park: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4 4v10h2.4v-3.2H13a3.4 3.4 0 0 0 0-6.8zm2.4 2.1H13a1.3 1.3 0 0 1 0 2.6h-1.6z"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l9 5v10l-9 5-9-5V7zm0 2.3L6.2 7.5 12 10.7l5.8-3.2zM5 9.2v6.6l6 3.3v-6.6zm14 0l-6 3.3v6.6l6-3.3z"/></svg>',
};

const K = data.kampanya;
const tag = (p) => (p.eski ? `<div class="badge">-%${pct(p)}</div>` : `<div class="tag">${esc(K.ozel)}</div>`);

function card(p) {
  return `
  <div class="card">
    ${tag(p)}
    <div class="shot">
      <img src="../../img/png/${p.img}.png" alt="">
      <div class="new">${p.eski ? `<s>${p.eski} ₺</s>` : ''}${price(p.yeni)}</div>
    </div>
    <div class="meta">
      <div class="brand"${p.en ? ' lang="en"' : ''}>${esc(p.marka)}</div>
      <div class="name">${esc(p.ad)} <span>${esc(p.miktar)}</span></div>
    </div>
  </div>`;
}

function hero(p) {
  return `
  <div class="card hero">
    <div class="ribbon">${p.eski ? 'EN BÜYÜK İNDİRİM' : 'KAMPANYANIN YILDIZI'}</div>
    <div class="hero-shot"><div class="glow"></div><img src="../../img/png/${p.img}.png" alt=""></div>
    <div class="hero-info">
      <div class="brand"${p.en ? ' lang="en"' : ''}>${esc(p.marka)}</div>
      <div class="hero-name">${esc(p.ad)}</div>
      <div class="hero-qty">${esc(p.miktar)}</div>
      ${p.eski ? `<div class="hero-old"><small>YERİNE</small><s>${p.eski} ₺</s></div>` : ''}
      <div class="hero-new"><small>SADECE</small>${price(p.yeni, 'xl')}</div>
    </div>
  </div>`;
}

const footer = (no, total) => `
  <footer>
    <div class="services">
      <span>${ICON.truck}Ücretsiz Servis</span>
      <span>${ICON.card}Kredi Kartı Geçerli</span>
      <span>${ICON.park}Ücretsiz Otopark</span>
    </div>
    <div class="contact">
      <div class="phones">${ICON.phone}${data.iletisim.telefonlar.join('<em>•</em>')}</div>
      <div class="insta">${ICON.insta}${data.iletisim.instagram}</div>
    </div>
    <div class="addr">${ICON.pin}${esc(data.iletisim.adres)}</div>
    <div class="legal">Fiyatlara KDV dahildir. Kampanya stoklarla sınırlıdır. Görseller temsilidir.<b>${no}/${total}</b></div>
  </footer>`;

const shell = (cls, body) => `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,800;1,900&family=Inter:wght@400;500;600;700;800&display=block" rel="stylesheet">
<link rel="stylesheet" href="../../style.css"></head>
<body><main class="page ${cls}"><div class="bg"></div>${body}</main></body></html>`;

const days = `<div class="days">${K.gunler.map((g) => `<span>${esc(g)}</span>`).join('')}</div>`;

const promo = `
  <div class="card promo">
    <img class="promo-cart" src="../../logo/em5-araba.png" alt="">
    <div class="promo-text">
      <small>SİPARİŞİNİZ KAPINIZDA</small>
      <b>ÜCRETSİZ<br>SERVİS</b>
      <span>${ICON.phone}${data.iletisim.telefonlar[1]}</span>
    </div>
  </div>`;

// 4 sütunlu ızgara; boş kalan hücreye servis kartı konur
function grid(cells, capacity) {
  if (cells.length < capacity) cells = [...cells, promo];
  return cells.join('');
}

function coverPage(h, items, total) {
  return shell('cover', `
  <header class="top">
    <img class="logo" src="../../logo/em5-yazi.png" alt="EM5 AVM">
    ${days}
  </header>
  <section class="title">
    <div class="kicker">${esc(K.ust)}</div>
    <h1>${esc(K.baslik)}</h1>
  </section>
  <section class="grid g4 r3">${hero(h)}${grid(items.map(card), COVER_N)}</section>
  ${footer(1, total)}`);
}

function gridPage(items, no, total) {
  return shell('inner', `
  <header class="bar">
    <img class="logo" src="../../logo/em5-yazi.png" alt="EM5 AVM">
    <div class="bar-title"><span>${esc(K.ust)}</span>${esc(K.baslik)}</div>
    ${days}
  </header>
  <section class="grid g4 r4">${grid(items.map(card), PAGE_N)}</section>
  ${footer(no, total)}`);
}

// Kapak: 4x3 ızgara, yıldız ürün 2 hücre kaplar -> 10 ürün daha. İç sayfalar: 4x4 = 16 ürün.
const COVER_N = 10, PAGE_N = 16;
const list = [...data.urunler];
const star = list.findIndex((p) => p.yildiz);
const heroIdx = star >= 0 ? star : list.every((p) => p.eski) ? list.reduce((b, p, i) => (pct(p) > pct(list[b]) ? i : b), 0) : 0;
const [heroItem] = list.splice(heroIdx, 1);
const coverItems = list.splice(0, COVER_N);
const chunks = [];
while (list.length) chunks.push(list.splice(0, PAGE_N));
const total = 1 + chunks.length;

const pages = [coverPage(heroItem, coverItems, total), ...chunks.map((c, i) => gridPage(c, i + 2, total))];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'html'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'master'), { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
for (const [i, html] of pages.entries()) {
  const name = `em5-${String(i + 1).padStart(2, '0')}`;
  const file = path.join(OUT, 'html', `${name}.html`);
  fs.writeFileSync(file, html);
  const page = await ctx.newPage();
  await page.goto('file://' + file, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(OUT, 'master', `${name}.png`) });
  await page.close();
  console.log('ok', name);
}
await browser.close();
