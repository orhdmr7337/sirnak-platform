'use client';

import { motion } from 'framer-motion';
import { Heart, Droplets, Wind, Zap, Leaf } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Keyif Masajı',
    description: 'Sadece yorgunluk giderici',
    price: '₺1.500',
    duration: '60 dk',
    icon: Heart,
    color: 'from-pink-500/20 to-red-500/20'
  },
  {
    id: 2,
    name: 'Sıcak Taş Masajı',
    description: 'Kas gevşetme ve relaksasyon',
    price: '₺1.800',
    duration: '75 dk',
    icon: Droplets,
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 3,
    name: 'Aromaterapi Masajı',
    description: 'Doğal yağlarla terapötik masaj',
    price: '₺2.000',
    duration: '90 dk',
    icon: Wind,
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 4,
    name: 'Derin Doku Masajı',
    description: 'Kronik kas gerginliği için',
    price: '₺2.200',
    duration: '90 dk',
    icon: Zap,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 5,
    name: 'İsveç Masajı',
    description: 'Klasik rahatlama masajı',
    price: '₺1.600',
    duration: '75 dk',
    icon: Leaf,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 6,
    name: 'Anti-Stres Masajı',
    description: 'Stres ve anksiyete giderici',
    price: '₺2.000',
    duration: '90 dk',
    icon: Heart,
    color: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    id: 7,
    name: 'Refleksoloji',
    description: 'Ayak refleks terapisi',
    price: '₺1.200',
    duration: '60 dk',
    icon: Leaf,
    color: 'from-teal-500/20 to-green-500/20'
  },
  {
    id: 8,
    name: 'Meridyen Masajı',
    description: 'Enerji meridyenlerini dengele',
    price: '₺2.500',
    duration: '90 dk',
    icon: Zap,
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  {
    id: 9,
    name: 'Fitoterapi + Masaj',
    description: 'Bitkisel tedavi kombinasyonu',
    price: '₺3.000',
    duration: '120 dk',
    icon: Leaf,
    color: 'from-lime-500/20 to-green-500/20'
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

export default function HizmetlerPage() {
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
          Hizmetlerimiz & Fiyatlandırma
        </h1>
        <p className="text-lg text-[#999] max-w-2xl mx-auto">
          Doğal ve profesyonel masaj terapileri ile kendinizi yenileyin.
          Her hizmet uzman terapistler tarafından sunulmaktadır.
        </p>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 md:px-12 py-12 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`group bg-gradient-to-br ${service.color} backdrop-blur border border-[#222] rounded-lg p-6 hover:border-[#f97316]/50 transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#f97316]/10 group-hover:bg-[#f97316]/20 transition-colors">
                    <Icon className="text-[#f97316]" size={24} />
                  </div>
                  <span className="text-sm font-semibold text-[#f97316] px-3 py-1 rounded-full bg-[#f97316]/10">
                    {service.duration}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#f4f2ef] mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-[#999] mb-4">
                  {service.description}
                </p>

                <div className="flex items-end justify-between pt-4 border-t border-[#222]">
                  <div>
                    <p className="text-xs text-[#666] mb-1">Başlangıç Fiyatı</p>
                    <p className="text-2xl font-bold text-[#f97316]">
                      {service.price}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-[#f97316]/20 text-[#f97316] rounded-lg font-semibold hover:bg-[#f97316]/30 transition-colors text-sm"
                  >
                    Randevu
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-6 md:px-12 py-16 max-w-4xl mx-auto"
      >
        <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#f4f2ef] mb-6">
            ℹ️ Önemli Bilgiler
          </h2>
          <ul className="space-y-4 text-[#999]">
            <li className="flex gap-3">
              <span className="text-[#f97316] font-bold">✓</span>
              <span>Tüm masajlar uzman terapistler tarafından uygulanmaktadır</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f97316] font-bold">✓</span>
              <span>100% doğal ve organik ürünler kullanılmaktadır</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f97316] font-bold">✓</span>
              <span>Ilk ziyaretinizde konsültasyon ücretsizdir</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f97316] font-bold">✓</span>
              <span>Paket alımında %10-20 indirim yapılmaktadır</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#f97316] font-bold">✓</span>
              <span>Özel koşullar için müşterimiz ile anlaşılabilir</span>
            </li>
          </ul>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 md:px-12 py-16 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#f4f2ef] mb-4">
            Randevu Almak İçin
          </h2>
          <p className="text-[#999] mb-8">
            Telefonla arayarak veya WhatsApp üzerinden hemen randevu alabilirsiniz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+905442167009"
              className="px-8 py-3 bg-[#f97316] text-[#050505] rounded-lg font-semibold hover:bg-[#ea580c] transition-colors"
            >
              📞 Hemen Ara
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/905442167009"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-[#f97316] text-[#f97316] rounded-lg font-semibold hover:bg-[#f97316]/10 transition-colors"
            >
              💬 WhatsApp
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
