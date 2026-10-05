Hizmet sayfalarının varsayılan uzun metinleri ve SSS'leri `build_service_content.py` ile üretilir
ve `apps/<site>/src/content/service-content.json` dosyalarına yazılır:

    python3 - <<'PY'
    import sys, json; sys.path.insert(0, "supabase/content")
    import build_service_content as b
    for site, rows, fn in [("tesisat", b.T, b.tesisat), ("masaj", b.M, b.masaj)]:
        data = {s["slug"]: {"content": fn(s), "faqs": [{"q": q, "a": a} for q, a in s["faqs"]]} for s in rows}
        json.dump(data, open(f"apps/{site}/src/content/service-content.json", "w"), ensure_ascii=False, indent=1)
    PY

Admin panelinden `services.content` / `services.faqs` doldurulursa sayfada o metin kullanılır.
