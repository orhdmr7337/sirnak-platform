"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useFaqs, useSiteContent } from "@sirnak/shared";

const FALLBACK_FAQS = [
  { id: "1", question: "Su kaçağı tespiti nasıl yapılıyor?", answer: "Termal kamera ve akustik dinleme cihazları ile duvarları kırmadan su kaçağını tespit ediyoruz. Bu yöntem %99 doğru sonuç verir ve evinizi tahrip etmez. Kaçağın konumunu tam belirledikten sonra, gerekli tamiratleri yapıyoruz." },
  { id: "2", question: "Garanti veriyor musunuz?", answer: "Evet, tüm işçilik hizmetlerimiz 1-2 yıl arasında garantili. Yapılan işten memnun değilseniz, geri gelip ücretsiz olarak düzeltiyoruz. Yedek parçaların garantisi ise sağlayıcının belirlendiği süredir geçerli." },
  { id: "3", question: "Acil durumlarda ne kadar sürede geliyorsunuz?", answer: "7/24 hizmet vermekteyiz. Patlayan boru, su taşması gibi acil durumlarda, çağrıdan itibaren maksimum 30 dakika içinde adresinizdeyiz. Gece çağrıları için ek ücret olmaz." },
  { id: "4", question: "Hangi bölgelere hizmet veriyorsunuz?", answer: "Şırnak merkez ve tüm ilçelere (Cizre, İdil, Silopi, Beytüşşebap vb.) hizmet veriyoruz. Belirttiğiniz adrese giderek hizmet sunuyoruz. Sınır dışındaki bölgeler için özel tarifeler uygulanır." },
  { id: "5", question: "Ödeme seçenekleri nelerdir?", answer: "Nakit, kredi kartı (taksit seçeneği ile), banka havale ve EFT ile ödeme yapabilirsiniz. Belirli işler için taksit imkanı vardır. Finansal ürünler için kredi kartı faizi müşteri tarafından ödenir." },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const faqs = useFaqs();
  const { get } = useSiteContent();

  const items = faqs.length > 0 ? faqs : FALLBACK_FAQS;
  const title = get("faq", "title", "Sıkça Sorulan Sorular");
  const subtitle = get("faq", "subtitle", "Merak ettiklerinizin cevapları");

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  return (
    <section id="sss" className="sc-section">
      <div className="sc-wrap">
        <div className="mx-auto max-w-3xl">
          <motion.div
            ref={titleRef}
            style={{ opacity: titleOpacity, y: titleY }}
            className="mb-12 text-center"
          >
            <p className="sc-label mb-3 text-primary">{title}</p>
            <h2
              className="sc-display sc-display--md text-white"
              style={{ fontFamily: "var(--sc-font-display)" }}
            >
              {subtitle}
            </h2>
          </motion.div>

          <div className="space-y-3">
            {items.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 text-sm font-medium text-white">
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-5 w-5 shrink-0 text-[#9a9ba1]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#9a9ba1]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
