"use client";

import { useState, FormEvent } from "react";
import { useSiteConfig, submitContact } from "@sirnak/shared";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const site = useSiteConfig();

  // Abonelik, `contact_submissions` tablosuna yazılır; admin panelinde "Mesajlar" altında görünür.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (!site?.id) {
      setError("Şu anda abonelik alınamıyor. Lütfen daha sonra tekrar deneyin.");
      return;
    }

    setSending(true);
    const { error: submitError } = await submitContact({
      site_id: site.id,
      name: "Bülten Aboneliği",
      phone: "-",
      email,
      message: "Bülten aboneliği talebi",
    });
    setSending(false);

    if (submitError) {
      setError(submitError.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      return;
    }
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <section className="border-t border-white/5 bg-[#0a0a0a] py-16">
        <div className="sc-wrap text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-4 text-4xl">✓</div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Aboneliğiniz Alındı!
            </h3>
            <p className="text-sm text-[#9a9ba1]">
              En güncel haberler ve fırsatlardan haberdar olacaksınız.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-white/5 bg-[#0a0a0a] py-16">
      <div className="sc-wrap">
        <div className="mx-auto max-w-md text-center">
          <h3 className="mb-2 text-xl font-semibold text-white">
            Bültenimize Katılın
          </h3>
          <p className="mb-6 text-sm text-[#9a9ba1]">
            Güncel kampanyalar, indirimler ve sektörel haberler için e-posta
            listemize katılın.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#6a6b71] outline-none transition-colors focus:border-[#4a90d9]/50"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-lg bg-[#4a90d9] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3a7bc8]"
            >
              Katıl
            </button>
          </form>
          {error && (
            <p className="mt-2 text-xs text-red-400">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}
