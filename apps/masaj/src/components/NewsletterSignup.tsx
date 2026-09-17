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
      <section className="border-t border-[#2a3a2a]/50 bg-[#0a0f0a] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-4 text-4xl">✓</div>
            <h3
              className="mb-2 text-xl font-semibold text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Aboneliğiniz Alındı!
            </h3>
            <p className="text-sm text-gray-500">
              En güncel haberler ve fırsatlardan haberdar olacaksınız.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-[#2a3a2a]/50 bg-[#0a0f0a] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto max-w-md text-center">
          <h3
            className="mb-2 text-xl font-semibold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Bültenimize Katılın
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Güncel kampanyalar, indirimler ve sektörel haberler için e-posta
            listemize katılın.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="flex-1 rounded-xl border border-[#2a3a2a] bg-[#1a231a] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-[#6b8f71]/50"
              required
            />
            <button
              type="submit"
              className="rounded-xl bg-[#6b8f71] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5a7d60]"
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
