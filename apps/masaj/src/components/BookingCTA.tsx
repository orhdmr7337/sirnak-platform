"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal, useParallax } from "@/hooks/useScrollAnimation";
import { useSiteConfig, useServices, useDistricts, submitContact } from "@sirnak/shared";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export function BookingCTA() {
  const site = useSiteConfig();
  const services = useServices();
  const districts = useDistricts();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    district: "",
    service_slug: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Ad ve telefon zorunludur.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const result = await submitContact({
        site_id: site?.id || "",
        ...form,
      });
      if (result.error) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      } else {
        setSent(true);
        setForm({ name: "", phone: "", email: "", district: "", service_slug: "", message: "" });
      }
    } catch {
      setError("Bir hata oluştu.");
    } finally {
      setSending(false);
    }
  };

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();
  const { ref: formRef, opacity: formOpacity, y: formY } = useParallax(20);

  return (
    <section id="iletisim" className="py-20 md:py-28 bg-gradient-to-b from-[#0a0f0a] via-[#0d140d] to-[#0a0f0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            İletişim
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Randevu <span className="text-[#6b8f71]">Alın</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-2 space-y-5"
          >
            <motion.div
              whileHover={{ x: 5 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <Phone className="w-5 h-5 text-[#6b8f71] mt-1 flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Telefon</div>
                <a href={`tel:${site?.phone}`} className="text-[#c9a96e] text-sm">
                  {site?.phone || "0555 123 45 67"}
                </a>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <Mail className="w-5 h-5 text-[#6b8f71] mt-1 flex-shrink-0" />
              <div>
                <div className="text-white font-medium">E-posta</div>
                <a href={`mailto:${site?.email}`} className="text-gray-400 text-sm">
                  {site?.email || "info@dogaldokunus.com"}
                </a>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <MapPin className="w-5 h-5 text-[#6b8f71] mt-1 flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Adres</div>
                <span className="text-gray-400 text-sm">
                  {site?.address || "Şırnak Merkez"}
                </span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <Clock className="w-5 h-5 text-[#6b8f71] mt-1 flex-shrink-0" />
              <div>
                <div className="text-white font-medium">Çalışma Saatleri</div>
                <span className="text-gray-400 text-sm">
                  {site?.working_hours || "Her gün 09:00 - 21:00"}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            ref={formRef}
            style={{ opacity: formOpacity, y: formY }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CheckCircle className="w-16 h-16 text-[#6b8f71] mx-auto mb-4" />
                </motion.div>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Talebiniz Alındı!
                </h3>
                <p className="text-gray-400 mb-6">
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-3 border border-[#6b8f71]/50 text-white rounded-xl hover:bg-[#6b8f71]/20 transition-colors"
                >
                  Yeni Talep Gönder
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#1a231a] border border-[#2a3a2a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6b8f71] transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Telefon Numaranız *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#1a231a] border border-[#2a3a2a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6b8f71] transition-colors"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="E-posta (opsiyonel)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#1a231a] border border-[#2a3a2a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6b8f71] transition-colors"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <select
                    value={form.service_slug}
                    onChange={(e) => setForm({ ...form, service_slug: e.target.value })}
                    className="w-full bg-[#1a231a] border border-[#2a3a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6b8f71] transition-colors"
                  >
                    <option value="">Hizmet Seçin</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full bg-[#1a231a] border border-[#2a3a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6b8f71] transition-colors"
                  >
                    <option value="">İlçe Seçin</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Mesajınız (opsiyonel)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[#1a231a] border border-[#2a3a2a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6b8f71] transition-colors resize-none"
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#c9a96e] text-[#0a0f0a] font-semibold rounded-xl
                    hover:bg-[#dbc28e] transition-all duration-300 flex items-center justify-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {sending ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
