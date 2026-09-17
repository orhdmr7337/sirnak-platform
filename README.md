# Şırnak Platform

3 modern web uygulamasını tek bir Supabase altyapısı ile yöneten profesyonel e-işletme platformu.

## 🚀 Uygulamalar

| Uygulama | Açıklama | Port | Teknoloji |
|----------|----------|------|-----------|
| **Tesisat** | Tesisat & Elektrik Hizmetleri | 3001 | 3D Hero (React Three Fiber) |
| **Masaj** | Doğal Dokunuş Masaj | 3002 | Video Hero |
| **Admin** | Yönetim & İşletme Paneli | 3000 | Mobil İlk Tasarım |

## 📋 Kurulum (Adım Adım)

### Ön Gereksinimler
- Node.js 18+ ve npm
- Git
- Supabase hesabı (ücretsiz)

### 1️⃣ Projeyi Klonla ve Yükle

```bash
# Projeyi klonla
git clone <repository-url>
cd sirnak-platform

# Bağımlılıkları kur
npm install
```

### 2️⃣ Supabase Ayarı

1. **Supabase Projesi Oluştur**
   - [supabase.com](https://supabase.com) adresine git
   - "New Project" butonuna tıkla
   - Proje adı: `sirnak-platform`
   - İstediğin region’u seç
   - Şifre (güçlü bir şifre seç)

2. **Veritabanı Şemasını İçe Aktar**
   - Supabase Dashboard’a git
   - Sol menüden "SQL Editor" seç
   - Sağ üstte "New Query" tıkla
   - `supabase/schema.sql` dosyasını aç ve içeriğini kopyala
   - SQL Editor’a yapıştır ve "Run" tıkla

3. **API Anahtarlarını Al**
   - Dashboard’un sol menüsünden "Settings" > "API" git
   - `Project URL` ve `anon public` key’i kopyala

### 3️⃣ Environment Dosyasını Oluştur

Proje root’unda `.env.local` dosyası oluştur:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Analytics (isteğe bağlı)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API Keys
NEXT_PUBLIC_MAPS_API_KEY=your_maps_key
```

### 4️⃣ Environment’ı Tüm Uygulamalara Dağıt

```bash
npm run setup
```

Bu komut `.env.local` dosyasını `apps/tesisat`, `apps/masaj` ve `apps/admin` dizinlerine kopyalar.

### 5️⃣ Geliştirme Sunucusunu Başlat

```bash
# Tüm uygulamaları aynı anda çalıştır
npm run dev:all

# Veya tek uygulamayı çalıştır:
npm run dev:tesisat  # http://localhost:3001
npm run dev:masaj    # http://localhost:3002
npm run dev:admin    # http://localhost:3000
```

### 6️⃣ Tarayıcıda Test Et

- Tesisat Sitesi: http://localhost:3001
- Masaj Sitesi: http://localhost:3002
- Admin Panel: http://localhost:3000

## 🔐 Güvenlik Notları

- ⚠️ `.env.local` dosyasını Git’e **ASLA** commit etme
- `.env.local` dosyasını server’a deploy etme öncesi kontrol et
- Production için Supabase Row Level Security (RLS) aktif et
- API anahtarlarını düzenli olarak rotate et

## 📄 Yeni Sayfalar & Özellikler

### 🧘 Masaj Sitesi
- **`/hizmetler`** — 9 masaj türü, fiyatlandırma, detaylar
- **`/belgeler`** — Terapist sertifikaları, uzmanlıklar
- Framer Motion animasyonları ile smooth geçişler

### 🔧 Tesisat Sitesi
- **`/about`** — Şirket hakkında, yan panellerle layout
- **`/belgeler`** — Teknisyen sertifikaları ve belgeler
- Scroll animasyonları ve hover efektleri

### ⚙️ Admin Paneli
- **`/dashboard/settings`** — Şirket bilgileri yönetimi
- **`/dashboard/certificates`** — Belgeler/Sertifikaları edit et
- **`/dashboard`** — Settings ve Belgeler butonları

## 🛠️ Supabase Veritabanı Şeması

`schema.sql` dosyası aşağıdaki tabloları içerir:

- **users** — Kullanıcı hesapları
- **services** — Hizmet katalog
- **bookings** — Hizmet rezervasyonları
- **reviews** — Müşteri yorumları
- **staff** — Çalışan bilgileri
- **service_areas** — Hizmet bölgeleri

Daha fazla bilgi için `supabase/schema.sql` dosyasını incele.

## ✨ Tasarım & Animasyonlar

- **Framer Motion** — Smooth sayfa geçişleri ve hover efektleri
- **Glassmorphism** — Modern backdrop blur efektleri
- **Gradient Backgrounds** — Dinamik renk geçişleri
- **Scroll Animations** — Sayfa kaydırıldığında otomatik animasyonlar
- **Responsive Design** — Mobil, tablet, desktop uyumlu
- **Dark Mode** — Şık koyu tema (#050505, #f97316)

## 🌐 Dış Hizmetler Entegrasyonu

### Google Analytics
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Harita API’si
```env
NEXT_PUBLIC_MAPS_API_KEY=your_maps_key
```

### E-posta Bildirimleri
Supabase Edge Functions kullanarak e-posta gönder (isteğe bağlı)

## Yapı

```
sirnak-platform/
├── apps/
│   ├── tesisat/      # tesisat.com (3D)
│   ├── masaj/        # masaj.com (Video)
│   └── admin/        # Admin panel
├── packages/
│   └── shared/       # Ortak tipler, Supabase client
└── supabase/
    └── schema.sql    # Veritabanı şeması
```

## Teknoloji

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- React Three Fiber (3D)
- Supabase (Auth + Database)
- Framer Motion (Animasyonlar)
- Lucide Icons
