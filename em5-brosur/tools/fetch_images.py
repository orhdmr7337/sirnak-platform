"""Market kataloglarından (Migros, Şok) beyaz zeminli ürün fotoğrafı bulur/indirir.
Ara:    python3 fetch_images.py search "<sorgu>"
İndir:  python3 fetch_images.py get "<sorgu>" <kaynak:sira> <cikti.jpg>   (ör. m:0, s:2)
"""
import html, json, re, sys, urllib.parse, urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36"}


def fetch(url, timeout=25):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout).read()


def migros(q):
    url = "https://www.migros.com.tr/rest/search/screens/products?" + urllib.parse.urlencode({"q": q})
    try:
        d = json.loads(fetch(url))
    except Exception:
        return []
    return [(p["name"], p["images"][0]["urls"]["PRODUCT_HD"])
            for p in d["data"]["searchInfo"]["storeProductInfos"] if p.get("images")]


def sok(q):
    try:
        h = fetch("https://www.sokmarket.com.tr/arama?" + urllib.parse.urlencode({"q": q})).decode("utf-8", "ignore")
    except Exception:
        return []
    cards = re.findall(r'<img src="https://images\.ceptesok\.com/cdn-cgi/image/[^/]+/(product-assets/[^"]+)" alt="product-thumb".*?'
                       r'<h2 class="CProductCard-module_title[^"]*">(.*?)</h2>', h, re.S)
    return [(html.unescape(t), "https://images.ceptesok.com/" + p) for p, t in cards]


SOURCES = {"m": migros, "s": sok}

cmd, q = sys.argv[1], sys.argv[2]
if cmd == "search":
    for key, fn in SOURCES.items():
        for i, (name, _) in enumerate(fn(q)[:5]):
            print(f"{key}:{i}", name)
else:
    key, idx = sys.argv[3].split(":")
    name, img = SOURCES[key](q)[int(idx)]
    open(sys.argv[4], "wb").write(fetch(img))
    print("OK", name, "->", sys.argv[4])
