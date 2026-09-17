'use client';

import { motion } from 'framer-motion';
import { Award, Wrench, Zap, Shield, BookOpen, Users } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'Lisanlı Tesisatçı',
    issuer: 'Ticaret Bakanlığı',
    year: '2015',
    icon: Wrench,
    color: 'from-blue-500/20 to-cyan-500/20',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Su Kaçağı Tespiti Uzmanı',
    issuer: 'Mühendisler Odası',
    year: '2016',
    icon: Shield,
    color: 'from-cyan-500/20 to-blue-500/20',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Elektrik İstasyonları Sertifikası',
    issuer: 'İSKİ (İstanbul Su)',
    year: '2017',
    icon: Zap,
    color: 'from-yellow-500/20 to-orange-500/20',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Ülke Standartları Uyum',
    issuer: 'TSE (Türk Standardları Enstitüsü)',
    year: '2018',
    icon: Award,
    color: 'from-red-500/20 to-pink-500/20',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: 'Kombi & Kalorifer Teknisyeni',
    issuer: 'Kombi Üreticileri Birliği',
    year: '2019',
    icon: Shield,
    color: 'from-orange-500/20 to-red-500/20',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    title: 'İş Güvenliği & Sağlığı',
    issuer: 'Çalışma Bakanlığı',
    year: '2020',
    icon: Users,
    color: 'from-green-500/20 to-emerald-500/20',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=300&fit=crop'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function BelgelerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-24 px-6 md:px-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#f4f2ef] mb-6">
          Belgeler & Sertifikalar
        </h1>
        <p className="text-lg text-[#999] max-w-2xl mx-auto">
          Çözüm Noktası olarak, tüm teknisyenlerimiz resmi belge ve sertifikalara sahiptir.
          Profesyonal ve güvenli hizmet almanın garantisi budur.
        </p>
      </motion.section>

      {/* Certificates Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 md:px-12 py-12 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group relative bg-gradient-to-br ${cert.color} backdrop-blur border border-[#222] rounded-lg overflow-hidden hover:border-[#f97316]/50 transition-all`}
              >
                {/* Image Background */}
                <div className="relative h-40 overflow-hidden bg-[#0f0f0f]">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-[#f97316]/10 group-hover:bg-[#f97316]/20 transition-colors">
                      <Icon className="text-[#f97316]" size={24} />
                    </div>
                    <span className="text-xs font-semibold text-[#f97316] px-3 py-1 rounded-full bg-[#f97316]/10">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#f4f2ef] mb-1 group-hover:text-[#f97316] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[#999]">
                    {cert.issuer}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#222]/50">
                    <p className="text-xs text-[#666]">✓ Resmi Belge</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* About Technicians Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 md:px-12 py-16 max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-[#f97316]/10 to-[#0f0f0f] border border-[#f97316]/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#f4f2ef] mb-6 flex items-center gap-3">
            <span className="text-3xl">👷</span>
            Teknisyenlerimiz Hakkında
          </h2>

          <div className="space-y-4 text-[#999]">
            <p>
              Çözüm Noktası olarak, 30+ deneyimli ve sertifikalı teknisyen ekibimiz vardır.
              Her teknisyen, yıllık eğitim alır ve resmi belgelere sahiptir. Güvenle hizmet alabilirsiniz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#0f0f0f]/50 rounded-lg border border-[#222]">
                <p className="text-sm font-semibold text-[#f4f2ef] mb-2">✓ Tecrübe</p>
                <p className="text-xs text-[#666]">15+ yıl profesyonel tesisat ve elektrik</p>
              </div>
              <div className="p-4 bg-[#0f0f0f]/50 rounded-lg border border-[#222]">
                <p className="text-sm font-semibold text-[#f4f2ef] mb-2">✓ Sertifikalar</p>
                <p className="text-xs text-[#666]">TSE, Mühendisler Odası onaylı belgeler</p>
              </div>
              <div className="p-4 bg-[#0f0f0f]/50 rounded-lg border border-[#222]">
                <p className="text-sm font-semibold text-[#f4f2ef] mb-2">✓ Teknoloji</p>
                <p className="text-xs text-[#666]">Modern araçlar ve tanı teknolojileri</p>
              </div>
              <div className="p-4 bg-[#0f0f0f]/50 rounded-lg border border-[#222]">
                <p className="text-sm font-semibold text-[#f4f2ef] mb-2">✓ Garantili</p>
                <p className="text-xs text-[#666]">Tüm işlerde yazılı garanti verilir</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Trust Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-6 md:px-12 py-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-[#f4f2ef] mb-8">Neden Bize Güvenebilirsiniz?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0f0f0f] border border-[#222] rounded-lg">
            <p className="text-3xl mb-3">🏆</p>
            <p className="font-semibold text-[#f4f2ef] mb-2">Sertifikalı</p>
            <p className="text-sm text-[#666]">Resmi belgelerle onaylı profesyoneller</p>
          </div>
          <div className="p-6 bg-[#0f0f0f] border border-[#222] rounded-lg">
            <p className="text-3xl mb-3">⚡</p>
            <p className="font-semibold text-[#f4f2ef] mb-2">Hızlı</p>
            <p className="text-sm text-[#666]">24/7 acil müdahale ve hızlı çözüm</p>
          </div>
          <div className="p-6 bg-[#0f0f0f] border border-[#222] rounded-lg">
            <p className="text-3xl mb-3">✅</p>
            <p className="font-semibold text-[#f4f2ef] mb-2">Garantili</p>
            <p className="text-sm text-[#666]">Yazılı garanti ve memnuniyet garantisi</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
