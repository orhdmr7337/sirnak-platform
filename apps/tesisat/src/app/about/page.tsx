'use client';

import Link from 'next/link';
import { Wrench, Zap, Heart, Award, Users, Phone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="p-6 md:p-12 max-w-4xl">
      {/* Hero Section */}
      <section id="about" className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#f4f2ef] mb-6">
          Çözüm Noktası<br />
          <span className="text-[#f97316]">Tesisat & Elektrik</span>
        </h1>
        <p className="text-lg text-[#999] leading-relaxed mb-6">
          Şırnak'ın en güvenilir tesisat ve elektrik hizmet sağlayıcısı olarak 15 yıldan fazla
          profesyonel deneyime sahipuz. Müşteri memnuniyeti ve kalite, biz için başka bir isim.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/hizmetler"
            className="px-6 py-3 bg-[#f97316] text-[#050505] rounded-lg font-semibold hover:bg-[#ea580c] transition-colors"
          >
            Hizmetlerimizi Keşfet
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 border border-[#f97316] text-[#f97316] rounded-lg font-semibold hover:bg-[#f97316]/10 transition-colors"
          >
            İletişime Geç
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 py-8 border-y border-[#222]">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#f97316] mb-2">15+</div>
          <p className="text-sm text-[#999]">Yıl Deneyim</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#f97316] mb-2">2000+</div>
          <p className="text-sm text-[#999]">Memnun Müşteri</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#f97316] mb-2">24/7</div>
          <p className="text-sm text-[#999]">Acil Servis</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#f97316] mb-2">100%</div>
          <p className="text-sm text-[#999]">Garantili</p>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="mb-16">
        <h2 className="text-3xl font-bold text-[#f4f2ef] mb-8">Hikayemiz</h2>
        <div className="space-y-6 text-[#999] leading-relaxed">
          <p>
            Çözüm Noktası, 2009 yılında küçük bir aile işletmesi olarak kuruldu. O zamanlar,
            kurucumuz Ahmet Bey sadece iki yardımcı ile başladığı bu macerada, Şırnak'ın en
            güvenilir hizmet sağlayıcı olmak için azimle çalışmaya başladı.
          </p>
          <p>
            Bugün, 30+ profesyonel teknisyenimiz ile günde ortalama 50+ iş talebi karşılıyoruz.
            Kalite ve güvenilirlik ilkelerimizden hiçbir zaman sapmadık ve müşterilerimizin
            güvenini kazanmaya devam ediyoruz.
          </p>
          <p>
            2020'de teknolojiye kucak açarak, çevrimiçi hizmet platformumuzu başlattık.
            Mobil uygulamamız aracılığıyla müşterilerimiz sadece bir tıkla acil servisimize
            ulaşabiliyor.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="mb-16">
        <h2 className="text-3xl font-bold text-[#f4f2ef] mb-8">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Heart,
              title: 'Müşteri Odaklılık',
              description: 'Her müşterimiz aile üyemiz. Onların ihtiyaçlarını önceleriz.'
            },
            {
              icon: Award,
              title: 'Kalite',
              description: 'Profesyonel ve standart malzemeleri kullanarak en iyi hizmeti sunarız.'
            },
            {
              icon: Zap,
              title: 'Hız & Güvenilirlik',
              description: 'Hızlı müdahale ve güvenilir çözümlerle sorunları çözeriz.'
            },
            {
              icon: Wrench,
              title: 'Profesyonellik',
              description: 'Sertifikalı teknisyenlerimiz her zaman eğitim alırlar.'
            },
          ].map((value, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#0f0f0f] border border-[#222] rounded-lg hover:border-[#f97316]/50 transition-colors"
            >
              <value.icon className="text-[#f97316] mb-4" size={32} />
              <h3 className="text-lg font-semibold text-[#f4f2ef] mb-2">{value.title}</h3>
              <p className="text-[#999]">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="mb-16">
        <h2 className="text-3xl font-bold text-[#f4f2ef] mb-8">Ekibimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ahmet Demir', role: 'Kurucusu & Başkan', icon: '👨‍💼' },
            { name: 'Fatih Yılmaz', role: 'Teknik Müdürü', icon: '🔧' },
            { name: 'Zeynep Kaya', role: 'Operasyon Müdürü', icon: '📋' },
            { name: 'Musa Çelik', role: 'Kıdemli Teknisyen', icon: '⚡' },
            { name: 'Salim Arslan', role: 'Teknisyen', icon: '🔨' },
            { name: 'Merve Şahin', role: 'Müşteri Hizmetleri', icon: '☎️' },
          ].map((member, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#0f0f0f] border border-[#222] rounded-lg text-center hover:border-[#f97316]/50 transition-colors"
            >
              <div className="text-4xl mb-4">{member.icon}</div>
              <h3 className="text-lg font-semibold text-[#f4f2ef] mb-1">{member.name}</h3>
              <p className="text-[#f97316] text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-16 p-8 bg-gradient-to-r from-[#f97316]/10 to-[#0f0f0f] border border-[#f97316]/20 rounded-lg">
        <h2 className="text-3xl font-bold text-[#f4f2ef] mb-6">İletişim Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center gap-4">
            <Phone className="text-[#f97316]" size={24} />
            <div>
              <p className="text-sm text-[#999]">Telefon (24/7)</p>
              <p className="text-[#f4f2ef] font-semibold">+90 500 123 4567</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <p className="text-sm text-[#999]">E-mail</p>
              <p className="text-[#f4f2ef] font-semibold">iletisim@cozumnoktasi.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-sm text-[#999]">Adres</p>
              <p className="text-[#f4f2ef] font-semibold">Şırnak, Türkiye</p>
            </div>
          </div>
        </div>
        <Link
          href="tel:+905001234567"
          className="inline-block px-8 py-3 bg-[#f97316] text-[#050505] rounded-lg font-semibold hover:bg-[#ea580c] transition-colors"
        >
          Hemen Ara
        </Link>
      </section>
    </div>
  );
}
