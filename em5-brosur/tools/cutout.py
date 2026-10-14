"""Beyaz zeminli ürün fotoğrafını şeffaf PNG'ye çevirir ve kırpar.
Sadece kenarlara bağlı beyaz bölge silinir; ürün içindeki beyazlar korunur.
Kullanım: python3 cutout.py <girdi.jpg> <cikti.png>
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

im = Image.open(sys.argv[1]).convert("RGB")
a = np.asarray(im).astype(int)
near_white = (a.min(axis=2) > 236) & (a.max(axis=2) - a.min(axis=2) < 14)
lab, _ = ndimage.label(near_white)
edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
bg = np.isin(lab, edge[edge > 0])
alpha = Image.fromarray(((~bg) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
out = im.convert("RGBA")
out.putalpha(alpha)
box = alpha.point(lambda v: 255 if v > 20 else 0).getbbox()
out.crop(box).save(sys.argv[2])
print(sys.argv[2], out.crop(box).size)
