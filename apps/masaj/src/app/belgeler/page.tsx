'use client';

import { motion } from 'framer-motion';
import { Heart, Leaf, Users, Shield, Award } from 'lucide-react';
import Image from 'next/image';

const values = [
  {
    id: 1,
    title: 'Doğallık',
    description: '100% organik ve sertifikalı doğal ürünler kullanıyoruz.',
    icon: Leaf,
    color: '#6b8f71'
  },
  {
    id: 2,
    title: 'Şefkat',
    description: 'Her masaj seansı, kişiye özel bakım ve ilgi ile yapılır.',
    icon: Heart,
    color: '#c9a96e'
  },
  {
    id: 3,
    title: 'Profesyonellik',
    description: 'Uzman terapistlerimiz uluslararası standartlarda eğitim almıştır.',
    icon: Award,
    color: '#8ab891'
  },
  {
    id: 4,
    title: 'Güvenlik',
    description: 'Hijyenik ortam ve steril ekipmanlar ile hizmet verilir.',
    icon: Shield,
    color: '#6b8f71'
  }
];

const team = [
  {
    id: 1,
    name: 'Ayşe Yılmaz',
    role: 'Masaj Terapisti - Kurucu',
    specialty: 'Thai Masaj & Derin Doku',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Fatma Kaya',
    role: 'Masaj Terapisti',
    specialty: 'Aromaterapi & Refleksoloji',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Merve Şahin',
    role: 'Masaj Terapisti',
    specialty: 'Sıcak Taş & Spor Masajı',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Zehra Demir',
    role: 'Receptionist',
    specialty: 'Randevu Yönetimi',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
  }
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0a] via-[#050505] to-[#0a0f0a]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 md:py-24 px-6 md:px-12 text-center border-b border-[#6b8f71]/20"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#f4f2ef] mb-6" style={{ fontFamily: "Georgia, serif" }}>
          Hakkımızda
        </h1>
        <p className="text-lg text-[#999] max-w-2xl mx-auto">
          Doğal Dokunuş Masaj, Şırnak'ta 15 yıldan fazla deneyimle hizmet veren,
          profesyonel ve uzman masaj terapistlerinin merkezi. Doğal ürünler,
          şefkatli eller, güvenli ortam.
        </p>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-12 px-6 md:px-12 border-b border-[#6b8f71]/20"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#c9a96e] mb-2">15+</p>
            <p className="text-sm text-[#999]">Yıllık Deneyim</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#c9a96e] mb-2">3000+</p>
            <p className="text-sm text-[#999]">Mutlu Müşteri</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#c9a96e] mb-2">4</p>
            <p className="text-sm text-[#999]">Uzman Terapist</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#c9a96e] mb-2">24/7</p>
            <p className="text-sm text-[#999]">Hizmet</p>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 md:px-12 py-16 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-[#f4f2ef] mb-12" style={{ fontFamily: "Georgia, serif" }}>
          Değerlerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-[#6b8f71]/10 to-transparent border border-[#6b8f71]/20 rounded-lg p-8 hover:border-[#c9a96e]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon size={40} style={{ color: value.color }} className="mt-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#f4f2ef] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-[#999]">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 md:px-12 py-16 max-w-6xl mx-auto border-b border-[#6b8f71]/20"
      >
        <h2 className="text-3xl font-bold text-center text-[#f4f2ef] mb-12" style={{ fontFamily: "Georgia, serif" }}>
          Ekibimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group text-center"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-semibold text-[#f4f2ef] mb-1">
                {member.name}
              </h3>
              <p className="text-[#c9a96e] text-sm mb-2">
                {member.role}
              </p>
              <p className="text-[#999] text-xs">
                {member.specialty}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-6 md:px-12 py-16 max-w-4xl mx-auto border-b border-[#6b8f71]/20"
      >
        <h2 className="text-3xl font-bold text-center text-[#f4f2ef] mb-8" style={{ fontFamily: "Georgia, serif" }}>
          Hikayemiz
        </h2>
        <div className="space-y-6 text-[#999] text-center">
          <p>
            Doğal Dokunuş Masaj, 2008 yılında Ayşe Yılmaz tarafından Şırnak'ta kurulmuştur.
            Başından beri amacımız, insanların fiziksel ve ruhsal sağlığını doğal yöntemlerle
            iyileştirmektir.
          </p>
          <p>
            Kuruluşundan bugüne, binlerce müşterimiz bize güvenmiş ve yaşamlarında olumlu değişiklikler
            yaşamıştır. Başarımızın sırrı, kaliteli hizmet, doğal ürünler ve profesyonel ekibimizdir.
          </p>
          <p>
            Bugün, Şırnak'ın en güvenilir masaj merkezi olarak, her gün yeni müşterileri mutlu etmeye
            ve sağlıklı bir yaşam için katkı sunmaya devam ediyoruz.
          </p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-6 md:px-12 py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-[#f4f2ef] mb-8" style={{ fontFamily: "Georgia, serif" }}>
          Bize Ulaşın
        </h2>
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#6b8f71]/10 border border-[#6b8f71]/20 rounded-lg">
            <p className="text-2xl mb-3">📞</p>
            <p className="font-semibold text-[#f4f2ef] mb-2">Telefon</p>
            <p className="text-[#999] text-sm">+90 555 123 4567</p>
          </div>
          <div className="p-6 bg-[#6b8f71]/10 border border-[#6b8f71]/20 rounded-lg">
            <p className="text-2xl mb-3">📍</p>
            <p className="font-semibold text-[#f4f2ef] mb-2">Adres</p>
            <p className="text-[#999] text-sm">Şırnak Merkez, Şırnak</p>
          </div>
          <div className="p-6 bg-[#6b8f71]/10 border border-[#6b8f71]/20 rounded-lg">
            <p className="text-2xl mb-3">⏰</p>
            <p className="font-semibold text-[#f4f2ef] mb-2">Çalışma Saatleri</p>
            <p className="text-[#999] text-sm">09:00 - 21:00</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
