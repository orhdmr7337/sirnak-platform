"""Yandex görsel aramasından aday ürün fotoğraflarını indirir ve numaralı bir önizleme tablosu yapar.
Kullanım: python3 yandex_candidates.py <klasor> <slug> "<sorgu>" [adet]
"""
import html, io, os, re, sys, urllib.parse, urllib.request
from PIL import Image, ImageDraw

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"}
out, slug, q = sys.argv[1], sys.argv[2], sys.argv[3]
n = int(sys.argv[4]) if len(sys.argv) > 4 else 8
os.makedirs(out, exist_ok=True)
h = urllib.request.urlopen(urllib.request.Request(
    "https://yandex.com/images/search?" + urllib.parse.urlencode({"text": q}), headers=UA), timeout=25).read()
h = html.unescape(h.decode("utf-8", "ignore"))
urls = list(dict.fromkeys(re.findall(r'"(?:img_href|origUrl)":"(https?://[^"]+)', h)))
got = []
for u in urls:
    if len(got) >= n:
        break
    try:
        data = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=15).read()
        im = Image.open(io.BytesIO(data)).convert("RGB")
    except Exception:
        continue
    if min(im.size) < 400:
        continue
    p = f"{out}/{slug}_{len(got)}.jpg"
    im.save(p, quality=95)
    got.append((p, im.size, u))
    print(p, im.size, u[:100])
# önizleme
T = 260
sheet = Image.new("RGB", (T * 4, T * ((len(got) + 3) // 4 or 1)), (200, 200, 200))
d = ImageDraw.Draw(sheet)
for i, (p, size, _) in enumerate(got):
    im = Image.open(p); im.thumbnail((T - 10, T - 30))
    x, y = (i % 4) * T, (i // 4) * T
    sheet.paste(im, (x + 5, y + 25))
    d.text((x + 6, y + 4), f"{i}  {size[0]}x{size[1]}", fill=(0, 0, 0))
sheet.save(f"{out}/_{slug}_sheet.jpg", quality=85)
