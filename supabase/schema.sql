-- ============================================
-- Şırnak Platform - Supabase Multi-Tenant Schema
-- Admin panelden yönetilebilir tek kaynak.
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SITES (multi-tenant base)
-- ============================================
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL, -- 'tesisat' or 'masaj'
  name TEXT NOT NULL,
  domain TEXT,
  tagline TEXT,
  slogan TEXT,
  primary_color TEXT DEFAULT '#f97316',
  secondary_color TEXT DEFAULT '#0ea5e9',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  logo_url TEXT,
  favicon_url TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  working_hours TEXT DEFAULT '7/24',
  instagram_username TEXT,
  tiktok_username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default sites
INSERT INTO sites (
  slug, name, domain, tagline, slogan, primary_color, secondary_color,
  meta_title, meta_description, meta_keywords, phone, whatsapp, address, working_hours,
  instagram_username, tiktok_username
)
VALUES
  ('tesisat', 'Çözüm Noktası Tesisat & Elektrik', 'tesisat.com',
   'Tesisat & Elektrik', 'Baş düşerse dara, KONUM AT ustayı ara',
   '#f97316', '#0ea5e9',
   'Şırnak Tesisat & Elektrik | 7/24 Acil Çözüm Noktası',
   'Şırnak''da 7/24 acil tesisat ve elektrik hizmetleri. Tıkanıklık açma, su kaçağı, kombi bakımı.',
   'tesisatçı şırnak, elektrikçi şırnak, tıkanıklık açma, su kaçağı, kombi bakımı',
   '+905442167009', '+905442167009', 'Şırnak Merkez', '7/24', 'mahmut1331', 'dr.mahmut33'),
  ('masaj', 'Doğal Dokunuş Masaj', 'masaj.com',
   'Masaj & Wellness', 'Günlük gerginlikten uzaklaşmak için doğal dokunuş',
   '#6b8f71', '#c9a96e',
   'Doğal Dokunuş Masaj | Şırnak, Cizre, İdil, Silopi',
   'Şırnak''da doğal yöntemlerle profesyonel masaj hizmetleri. Aromaterapi, sıcak taş, spor masajı.',
   'masaj şırnak, doğal masaj şırnak, aromaterapi, sıcak taş masajı, spor masajı',
   '+905442167009', '+905442167009', 'Şırnak Merkez', '09:00 - 21:00', 'mahmut1331', 'dr.mahmut33');

-- ============================================
-- SOCIAL LINKS (per site)
-- ============================================
CREATE TABLE site_social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- instagram, tiktok, facebook, youtube, etc.
  url TEXT NOT NULL,
  username TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, platform)
);

INSERT INTO site_social_links (site_id, platform, url, username, sort_order)
SELECT s.id, v.platform, v.url, v.username, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('instagram', 'https://www.instagram.com/mahmut1331', 'mahmut1331', 1),
  ('tiktok', 'https://www.tiktok.com/@dr.mahmut33', 'dr.mahmut33', 2)
) v(platform, url, username, sort_order)
WHERE s.slug IN ('tesisat', 'masaj');

-- ============================================
-- SERVICES
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Lucide icon name or custom identifier
  svg_path TEXT, -- Optional inline SVG path
  image_url TEXT,
  price_info TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, slug)
);

-- Tesisat services
INSERT INTO services (site_id, title, slug, description, icon, sort_order)
SELECT s.id, v.title, v.slug, v.description, v.icon, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Tıkanıklık Açma', 'kaniklik-acma', 'Lavabo, tuvalet, kanal tıkanıklıklarını profesyonel ekipmanlarla açıyoruz.', 'Droplets', 1),
  ('Su Tesisatı', 'su-tesisati', 'Su kaçağı tespiti, boru döşeme, tesisat yenileme ve tamirat.', 'Wrench', 2),
  ('Elektrik Arızası', 'elektrik-arizasi', 'Elektrik kesintisi, kısa devre, sigorta arızası, kablo döşeme.', 'Zap', 3),
  ('Kombi Bakımı', 'kombi-bakimi', 'Kombi yıllık bakımı, petek temizliği, ısıtma sistemi kontrolü.', 'Thermometer', 4),
  ('Doğalgaz Tesisatı', 'dogalgaz-tesisati', 'Doğalgaz iç tesisatı, ocak ve soba bağlantısı, sızıntı kontrolü.', 'Flame', 5),
  ('Komple Tadilat', 'komple-tadilat', 'Banyo, mutfak komple yenileme, fayans, boya, komple tesisat yenileme.', 'ShieldCheck', 6)
) v(title, slug, description, icon, sort_order)
WHERE s.slug = 'tesisat';

-- Masaj services
INSERT INTO services (site_id, title, slug, description, icon, sort_order, price_info)
SELECT s.id, v.title, v.slug, v.description, v.icon, v.sort_order, v.price_info
FROM sites s
CROSS JOIN (VALUES
  ('Boyun ve Sırt Masajı', 'boyun-sirt-masaji', 'Ofis hayatının ve günlük stresin yarattığı boyun ve sırt gerilimini hedefleyen rahatlatıcı masaj.', 'User', 1, '600 ₺'),
  ('İsveç Masajı', 'isvec-masaji', 'Klasik tekniklerle yapılan, kan dolaşımını artıran ve derinlemesine gevşeme sağlayan masaj.', 'Wind', 2, '700 ₺'),
  ('Kas Masajı', 'kas-masaji', 'Spor sonrası kas yorgunluğu ve ağrılarına yönelik, yoğunlaştırılmış teknikler.', 'Dumbbell', 3, '750 ₺'),
  ('Aromaterapi Masajı', 'aromaterapi', 'Doğal yağlarla yapılan, stresi azaltan ve zihni rahatlatan terapötik masaj.', 'Droplets', 4, '800 ₺'),
  ('Sıcak Taş Masajı', 'sicak-tas', 'Volkanik taşlarla uygulanan, kas gerilimini çözen derinlemesine terapi.', 'Flame', 5, '900 ₺'),
  ('Refleksoloji', 'refleksoloji', 'Ayak ve el noktalarına baskı uygulayarak vücut dengesini sağlayan teknik.', 'Wind', 6, '650 ₺'),
  ('Bitkisel Yağ Terapisi', 'bitkisel-yag', 'Özel bitkisel karışımlarla yapılan, iyileştirici ve dinlendirici masaj.', 'Flower2', 7, '850 ₺'),
  ('Spor Masajı', 'spor-masaji', 'Spor sonrası kas iyileşmesini hızlandıran, performans artıran masaj.', 'Dumbbell', 8, '800 ₺'),
  ('Derin Doku Masajı', 'derin-doku', 'Kasların derin tabakalarına etki eden, kronik ağrıları hafifleten teknik.', 'Sparkles', 9, '900 ₺')
) v(title, slug, description, icon, sort_order, price_info)
WHERE s.slug = 'masaj';

-- ============================================
-- DISTRICTS
-- ============================================
CREATE TABLE districts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  region TEXT DEFAULT 'Şırnak',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO districts (name, slug, description) VALUES
  ('Şırnak Merkez', 'merkez', 'Şırnak merkez ve çevre köylerinde 7/24 hizmet.'),
  ('Cizre', 'cizre', 'Cizre ilçesinde profesyonel ekiple hızlı müdahale.'),
  ('İdil', 'idil', 'İdil ilçesinde güvenilir ve konforlu hizmet.'),
  ('Silopi', 'silopi', 'Silopi ilçesinde zamanında ve kaliteli hizmet.'),
  ('Beytüşşebap', 'beytussebap', 'Beytüşşebap ilçesinde uzman kadroyla hizmet.'),
  ('Uludere', 'uludere', 'Uludere ilçesinde kesintisiz hizmet.');

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  district TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  content TEXT NOT NULL,
  service_slug TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tesisat testimonials
INSERT INTO testimonials (site_id, customer_name, district, rating, content, service_slug, approved)
SELECT id, 'Ahmet Y.', 'Şırnak Merkez', 5, 'Su kaçağı sorunumu 30 dakikada çözdüler. Gerçekten profesyonel ekip.', 'su-tesisati', true FROM sites WHERE slug = 'tesisat'
UNION ALL
SELECT id, 'Elif S.', 'Cizre', 5, 'Kombi bakımı için geldiler, çok temiz ve düzenli çalıştılar.', 'kombi-bakimi', true FROM sites WHERE slug = 'tesisat'
UNION ALL
SELECT id, 'Mehmet A.', 'İdil', 5, 'Tıkanıklık açma konusunda gerçekten ustaymışlar. Tavsiye ederim.', 'kaniklik-acma', true FROM sites WHERE slug = 'tesisat'
UNION ALL
SELECT id, 'Ayşe K.', 'Silopi', 5, 'Elektrik arızası gece yarısıydı, hemen gelip hallettiler.', 'elektrik-arizasi', true FROM sites WHERE slug = 'tesisat';

-- Masaj testimonials
INSERT INTO testimonials (site_id, customer_name, district, rating, content, service_slug, approved)
SELECT id, 'Zeynep B.', 'Şırnak Merkez', 5, 'Aromaterapi masajı sonrası kendimi yenilenmiş hissettim.', 'aromaterapi', true FROM sites WHERE slug = 'masaj'
UNION ALL
SELECT id, 'Hakan T.', 'Cizre', 5, 'Sırt ağrılarım için kas masajı çok iyi geldi.', 'kas-masaji', true FROM sites WHERE slug = 'masaj'
UNION ALL
SELECT id, 'Merve D.', 'İdil', 5, 'Doğal yağlar ve sakin ortam mükemmeldi.', 'bitkisel-yag', true FROM sites WHERE slug = 'masaj'
UNION ALL
SELECT id, 'Canan Y.', 'Silopi', 5, 'Sıcak taş masajı ile tüm stresimden arındım.', 'sicak-tas', true FROM sites WHERE slug = 'masaj';

-- ============================================
-- CONTACT SUBMISSIONS
-- ============================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  district TEXT,
  service_slug TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  district TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, slug)
);

-- ============================================
-- FAQS
-- ============================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tesisat FAQs
INSERT INTO faqs (site_id, question, answer, sort_order)
SELECT s.id, v.question, v.answer, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Tıkanıklık açma ne kadar sürer?', 'Ortalama 15-45 dakika içinde müdahale ediyoruz. Tıkanıklığın yoğunluğuna göre değişebilir.', 1),
  ('Su kaçağı nasıl tespit edilir?', 'Termal kamera ve akustik dinleme cihazları ile kırmadan tespit ediyoruz.', 2),
  ('Elektrik arızasına ne kadar sürede geliyorsunuz?', 'Şırnak merkezde ortalama 20-30 dakika, ilçelerde maksimum 1 saat içinde ulaşıyoruz.', 3),
  ('Kombi bakımı fiyatları nedir?', 'Kombi bakımı ve petek temizliği için güncel fiyat bilgisi için bizi arayabilirsiniz.', 4)
) v(question, answer, sort_order)
WHERE s.slug = 'tesisat';

-- Masaj FAQs
INSERT INTO faqs (site_id, question, answer, sort_order)
SELECT s.id, v.question, v.answer, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Randevu almak için ne yapmalıyım?', 'WhatsApp veya telefon üzerinden kolayca randevu alabilirsiniz.', 1),
  ('Masaj seansları ne kadar sürer?', 'Seanslarımız genellikle 45-60 dakika sürmektedir.', 2),
  ('Hangi bölgelere hizmet veriyorsunuz?', 'Şırnak Merkez, Cizre, İdil, Silopi ve çevre bölgelere hizmet veriyoruz.', 3),
  ('Doğal yağlar alerji yapar mı?', 'Kullandığımız yağlar bitkisel ve doğaldır. Alerjiniz varsa lütfen önceden bildirin.', 4)
) v(question, answer, sort_order)
WHERE s.slug = 'masaj';

-- ============================================
-- PROCESS STEPS
-- ============================================
CREATE TABLE process_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tesisat process steps
INSERT INTO process_steps (site_id, title, description, icon, sort_order)
SELECT s.id, v.title, v.description, v.icon, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('İletişim', 'Telefon veya WhatsApp ile bize ulaşın, sorununuzu kısaca anlatın.', 'Phone', 1),
  ('Hızlı Müdahale', 'Ekibimiz en kısa sürede adresinize yönlendirilir.', 'Truck', 2),
  ('Tespit', 'Robot ve kamera ile arızanın kaynağı kırmadan belirlenir.', 'Search', 3),
  ('Çözüm', 'Profesyonel ekipmanlarla arıza giderilir ve garantili teslim edilir.', 'CheckCircle', 4)
) v(title, description, icon, sort_order)
WHERE s.slug = 'tesisat';

-- Masaj process steps
INSERT INTO process_steps (site_id, title, description, icon, sort_order)
SELECT s.id, v.title, v.description, v.icon, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Randevu', 'Size uygun saati seçin, WhatsApp veya telefonla onaylayalım.', 'Calendar', 1),
  ('Karşılama', 'Sessiz ve konforlu ortamda karşılanın, ihtiyacınızı dinleyelim.', 'Heart', 2),
  ('Terapi', 'Uzman terapistlerimizle kişiye özel masaj uygulaması.', 'Sparkles', 3),
  ('Yenilenme', 'Seans sonrası gevşemiş ve enerjik hissedin.', 'Sun', 4)
) v(title, description, icon, sort_order)
WHERE s.slug = 'masaj';

-- ============================================
-- TRUST STRIP ITEMS
-- ============================================
CREATE TABLE trust_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tesisat trust items
INSERT INTO trust_items (site_id, title, description, icon, sort_order)
SELECT s.id, v.title, v.description, v.icon, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('7/24 Acil', 'Gece gündüz kesintisiz servis hizmeti.', 'Clock', 1),
  ('Robot & Kamera', 'Kırmadan dökmeden modern ekipmanlarla tespit.', 'Camera', 2),
  ('Garantili İşçilik', 'Tüm tadilat ve tesisat işlerinde garanti.', 'ShieldCheck', 3),
  ('Şırnak Geneli', 'Merkez ve ilçelerde hızlı ulaşım ağı.', 'MapPin', 4)
) v(title, description, icon, sort_order)
WHERE s.slug = 'tesisat';

-- Masaj trust items
INSERT INTO trust_items (site_id, title, description, icon, sort_order)
SELECT s.id, v.title, v.description, v.icon, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Doğal Ürünler', 'Kimyasal içermeyen bitkisel yağlar.', 'Leaf', 1),
  ('Uzman Terapist', 'Deneyimli ve sertifikalı masaj terapistleri.', 'Award', 2),
  ('Konforlu Ortam', 'Sessiz, hijyenik ve rahatlatıcı mekan.', 'Home', 3),
  ('Kişiye Özel', 'İhtiyacınıza göre uyarlanan seanslar.', 'User', 4)
) v(title, description, icon, sort_order)
WHERE s.slug = 'masaj';

-- ============================================
-- GALLERY ITEMS
-- ============================================
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  label TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SERVICE FINDER OPTIONS
-- ============================================
CREATE TABLE service_finder_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  need_label TEXT NOT NULL,
  recommended_service_slug TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tesisat service finder
INSERT INTO service_finder_options (site_id, need_label, recommended_service_slug, sort_order)
SELECT s.id, v.need_label, v.recommended_service_slug, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Su veya gider sorunu', 'kaniklik-acma', 1),
  ('Sıcak su / ısıtma sorunu', 'kombi-bakimi', 2),
  ('Elektrik kesintisi veya arıza', 'elektrik-arizasi', 3),
  ('Doğalgaz veya ocak bağlantısı', 'dogalgaz-tesisati', 4)
) v(need_label, recommended_service_slug, sort_order)
WHERE s.slug = 'tesisat';

-- Masaj service finder
INSERT INTO service_finder_options (site_id, need_label, recommended_service_slug, sort_order)
SELECT s.id, v.need_label, v.recommended_service_slug, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Stres ve zihinsel yorgunluk', 'aromaterapi', 1),
  ('Kas ağrısı ve gerginlik', 'derin-doku', 2),
  ('Spor sonrası iyileşme', 'spor-masaji', 3),
  ('Rahatlama ve denge', 'isvec-masaji', 4)
) v(need_label, recommended_service_slug, sort_order)
WHERE s.slug = 'masaj';

-- ============================================
-- SITE CONTENT (flexible key-value for hero, about, footer, etc.)
-- ============================================
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  section TEXT NOT NULL, -- 'hero', 'about', 'footer', 'splash', 'cta', etc.
  key TEXT NOT NULL,
  value TEXT,
  value_type TEXT DEFAULT 'text', -- 'text', 'html', 'markdown', 'json'
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, section, key)
);

-- Tesisat site content
INSERT INTO site_content (site_id, section, key, value, value_type)
SELECT s.id, v.section, v.key, v.value, v.value_type
FROM sites s
CROSS JOIN (VALUES
  ('hero', 'badge', '7/24 Acil Servis', 'text'),
  ('hero', 'title_line1', 'Tesisat & Elektrik', 'text'),
  ('hero', 'title_line2', 'Çözüm Noktası', 'text'),
  ('hero', 'description', 'Şırnak genelinde robot ve kamera ile profesyonel tesisat, elektrik ve acil arıza hizmetleri.', 'text'),
  ('hero', 'slogan', 'Baş düşerse dara, KONUM AT ustayı ara', 'text'),
  ('hero', 'cta_call_label', 'Hemen Ara', 'text'),
  ('hero', 'cta_whatsapp_label', 'WhatsApp', 'text'),
  ('hero', 'cta_services_label', 'Hizmetlerimiz', 'text'),
  ('hero', 'scroll_indicator', 'Keşfet', 'text'),
  ('about', 'label', 'Hakkımızda', 'text'),
  ('about', 'title', 'Güvenilir Tesisat ve Elektrik Çözümleri', 'text'),
  ('about', 'paragraph1', 'Yılların verdiği tecrübe ile Şırnak ve çevre ilçelerinde 7/24 hizmet veriyoruz.', 'text'),
  ('about', 'paragraph2', 'Robot ve kamera destekli ekipmanlarımız sayesinde kırmadan dökmeden tespit ve onarım yapıyoruz.', 'text'),
  ('about', 'stat1_label', 'Yıllık Deneyim', 'text'),
  ('about', 'stat1_value', '10+', 'text'),
  ('about', 'stat2_label', 'Mutlu Müşteri', 'text'),
  ('about', 'stat2_value', '5000+', 'text'),
  ('about', 'stat3_label', '7/24 Hizmet', 'text'),
  ('about', 'stat3_value', 'Evet', 'text'),
  ('cta', 'badge', '7/24 Acil Servis', 'text'),
  ('cta', 'title', 'Acil Servis mi Gerekiyor?', 'text'),
  ('cta', 'description', 'Hemen bize ulaşın, ekibimiz en kısa sürede yanınızda olsun.', 'text'),
  ('cta', 'whatsapp_message', 'Merhaba Çözüm Noktası, acil tesisat/elektrik desteğine ihtiyacım var.', 'text'),
  ('footer', 'description', 'Şırnak genelinde 7/24 tesisat, elektrik, kaçak tespiti ve gider açma hizmetleri.', 'text'),
  ('splash', 'title', 'Çözüm Noktası', 'text'),
  ('splash', 'subtitle', 'Tesisat & Elektrik', 'text')
) v(section, key, value, value_type)
WHERE s.slug = 'tesisat';

-- Masaj site content
INSERT INTO site_content (site_id, section, key, value, value_type)
SELECT s.id, v.section, v.key, v.value, v.value_type
FROM sites s
CROSS JOIN (VALUES
  ('hero', 'badge', 'Doğal Yöntemlerle Masaj', 'text'),
  ('hero', 'title_line1', 'Doğal', 'text'),
  ('hero', 'title_line2', 'Dokunuş', 'text'),
  ('hero', 'title_line3', 'Masaj', 'text'),
  ('hero', 'description', 'Vücudunuzu ve ruhunuzu yenileyen, doğal yağlar ve geleneksel tekniklerle uygulanan terapötik masaj deneyimi.', 'text'),
  ('hero', 'slogan', 'Günlük gerginlikten uzaklaşmak için doğal dokunuş', 'text'),
  ('hero', 'cta_call_label', 'Randevu Al', 'text'),
  ('hero', 'cta_whatsapp_label', 'WhatsApp', 'text'),
  ('hero', 'cta_services_label', 'Hizmetlerimiz', 'text'),
  ('hero', 'scroll_indicator', 'Keşfet', 'text'),
  ('about', 'label', 'Hakkımızda', 'text'),
  ('about', 'title', 'Doğanın Gücüyle İyileşin', 'text'),
  ('about', 'paragraph1', 'Doğal yağlar ve geleneksel tekniklerle kişiye özel masaj deneyimi sunuyoruz.', 'text'),
  ('about', 'paragraph2', 'Şırnak ve çevre ilçelerinde profesyonel terapistlerimizle hizmetinizdeyiz.', 'text'),
  ('about', 'stat1_label', 'Yıl Deneyim', 'text'),
  ('about', 'stat1_value', '10+', 'text'),
  ('about', 'stat2_label', 'Mutlu Müşteri', 'text'),
  ('about', 'stat2_value', '5000+', 'text'),
  ('about', 'stat3_label', 'Masaj Çeşidi', 'text'),
  ('about', 'stat3_value', '9', 'text'),
  ('cta', 'badge', 'Randevu Alın', 'text'),
  ('cta', 'title', 'Doğal Masaj Deneyimi', 'text'),
  ('cta', 'description', 'Size özel bir seans için hemen iletişime geçin.', 'text'),
  ('cta', 'whatsapp_message', 'Merhaba Doğal Dokunuş, randevu almak istiyorum.', 'text'),
  ('footer', 'description', 'Şırnak''ta kişiye özel masaj ve wellness hizmetleri.', 'text'),
  ('splash', 'title', 'Doğal Dokunuş', 'text'),
  ('splash', 'subtitle', 'Masaj & Wellness', 'text')
) v(section, key, value, value_type)
WHERE s.slug = 'masaj';

-- ============================================
-- MEDIA FILES (videos, images, logos uploaded to Storage)
-- ============================================
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'video', 'image', 'logo', 'favicon', 'poster'
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NAV LINKS
-- ============================================
CREATE TABLE nav_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tesisat nav links
INSERT INTO nav_links (site_id, label, href, sort_order)
SELECT s.id, v.label, v.href, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Hizmetler', '#hizmetler', 1),
  ('Bölgeler', '#bolgeler', 2),
  ('Yorumlar', '#yorumlar', 3),
  ('İletişim', '#iletisim', 4)
) v(label, href, sort_order)
WHERE s.slug = 'tesisat';

-- Masaj nav links
INSERT INTO nav_links (site_id, label, href, sort_order)
SELECT s.id, v.label, v.href, v.sort_order
FROM sites s
CROSS JOIN (VALUES
  ('Hakkımızda', '#hakkimizda', 1),
  ('Hizmetler', '#hizmetler', 2),
  ('Ücretler', '#ucretler', 3),
  ('Yorumlar', '#yorumlar', 4),
  ('İletişim', '#iletisim', 5)
) v(label, href, sort_order)
WHERE s.slug = 'masaj';

-- ============================================
-- ADMIN USERS
-- ============================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INSTAGRAM POSTS (queue)
-- ============================================
CREATE TABLE instagram_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  caption TEXT,
  image_url TEXT,
  media_type TEXT DEFAULT 'IMAGE' CHECK (media_type IN ('IMAGE', 'CAROUSEL_ALBUM', 'VIDEO')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  instagram_post_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_finder_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_social_links ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read sites" ON sites FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (published = true);
CREATE POLICY "Public read districts" ON districts FOR SELECT USING (true);
CREATE POLICY "Public read approved testimonials" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (published = true);
CREATE POLICY "Public read process steps" ON process_steps FOR SELECT USING (published = true);
CREATE POLICY "Public read trust items" ON trust_items FOR SELECT USING (published = true);
CREATE POLICY "Public read gallery items" ON gallery_items FOR SELECT USING (published = true);
CREATE POLICY "Public read service finder options" ON service_finder_options FOR SELECT USING (published = true);
CREATE POLICY "Public read site content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read media files" ON media_files FOR SELECT USING (true);
CREATE POLICY "Public read nav links" ON nav_links FOR SELECT USING (published = true);
CREATE POLICY "Public read social links" ON site_social_links FOR SELECT USING (true);

-- Admin full access (service role key in admin panel)
CREATE POLICY "Admin full access sites" ON sites FOR ALL USING (true);
CREATE POLICY "Admin full access services" ON services FOR ALL USING (true);
CREATE POLICY "Admin full access districts" ON districts FOR ALL USING (true);
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (true);
CREATE POLICY "Admin full access contact submissions" ON contact_submissions FOR ALL USING (true);
CREATE POLICY "Admin full access blog posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Admin full access admin users" ON admin_users FOR ALL USING (true);
CREATE POLICY "Admin full access instagram posts" ON instagram_posts FOR ALL USING (true);
CREATE POLICY "Admin full access faqs" ON faqs FOR ALL USING (true);
CREATE POLICY "Admin full access process steps" ON process_steps FOR ALL USING (true);
CREATE POLICY "Admin full access trust items" ON trust_items FOR ALL USING (true);
CREATE POLICY "Admin full access gallery items" ON gallery_items FOR ALL USING (true);
CREATE POLICY "Admin full access service finder options" ON service_finder_options FOR ALL USING (true);
CREATE POLICY "Admin full access site content" ON site_content FOR ALL USING (true);
CREATE POLICY "Admin full access media files" ON media_files FOR ALL USING (true);
CREATE POLICY "Admin full access nav links" ON nav_links FOR ALL USING (true);
CREATE POLICY "Admin full access social links" ON site_social_links FOR ALL USING (true);

-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contacts" ON contact_submissions FOR INSERT WITH CHECK (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_services_site ON services(site_id);
CREATE INDEX idx_services_slug ON services(site_id, slug);
CREATE INDEX idx_testimonials_site ON testimonials(site_id);
CREATE INDEX idx_contact_site ON contact_submissions(site_id);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_blog_site ON blog_posts(site_id);
CREATE INDEX idx_instagram_site ON instagram_posts(site_id);
CREATE INDEX idx_instagram_status ON instagram_posts(status);
CREATE INDEX idx_faqs_site ON faqs(site_id);
CREATE INDEX idx_process_steps_site ON process_steps(site_id);
CREATE INDEX idx_trust_items_site ON trust_items(site_id);
CREATE INDEX idx_gallery_items_site ON gallery_items(site_id);
CREATE INDEX idx_service_finder_site ON service_finder_options(site_id);
CREATE INDEX idx_site_content_section ON site_content(site_id, section);
CREATE INDEX idx_media_files_site ON media_files(site_id);
CREATE INDEX idx_nav_links_site ON nav_links(site_id);
CREATE INDEX idx_social_links_site ON site_social_links(site_id);

-- ============================================
-- STORAGE SETUP (buckets)
-- Run these in Supabase Dashboard > Storage after applying schema:
-- CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
-- CREATE POLICY "Admin full access media" ON storage.objects FOR ALL USING (bucket_id = 'media');
-- ============================================
