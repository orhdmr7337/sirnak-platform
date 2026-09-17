"use client";

import { useState, FormEvent } from "react";

const NEWSLETTER_KEY = "newsletter-submitted";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem(NEWSLETTER_KEY) || "[]");
    if (existing.includes(email)) {
      setSubmitted(true);
      return;
    }

    existing.push(email);
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(existing));
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
