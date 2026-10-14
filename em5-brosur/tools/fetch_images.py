"""Migros katalogundan beyaz zeminli HD (1650px) ürün fotoğrafı bulur/indirir.
Ara:    python3 fetch_images.py search "<sorgu>"
İndir:  python3 fetch_images.py get "<sorgu>" <sira> <cikti.jpg>
"""
import json, sys, urllib.parse, urllib.request

UA = {"User-Agent": "Mozilla/5.0"}

def search(q):
    url = "https://www.migros.com.tr/rest/search/screens/products?" + urllib.parse.urlencode({"q": q})
    d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=20))
    return [p for p in d["data"]["searchInfo"]["storeProductInfos"] if p.get("images")]

cmd, q = sys.argv[1], sys.argv[2]
res = search(q)
if cmd == "search":
    for i, p in enumerate(res[:8]):
        print(i, p["name"])
else:
    p = res[int(sys.argv[3])]
    img = p["images"][0]["urls"]["PRODUCT_HD"]
    data = urllib.request.urlopen(urllib.request.Request(img, headers=UA), timeout=30).read()
    open(sys.argv[4], "wb").write(data)
    print("OK", p["name"], "->", sys.argv[4])
