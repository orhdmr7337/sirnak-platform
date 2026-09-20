"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { telHref } from "@sirnak/shared";
import type { Site, CertificateItem, TeamMember, ValueItem } from "@sirnak/shared";

interface Props {
  site: Site;
  about: Record<string, string>;
  values: ValueItem[];
  team: TeamMember[];
  certificates: CertificateItem[];
}

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
const serif = { fontFamily: "Georgia, serif" };

export default function BelgelerView({ site, about, values, team, certificates }: Props) {
  const stats = [1, 2, 3]
    .map((n) => ({ value: about[`stat${n}_value`], label: about[`stat${n}_label`] }))
    .filter((s) => s.value && s.label);
  const tel = telHref(site);
  const contact = [
    site.phone && { icon: "📞", label: "Telefon", value: site.phone, href: tel ?? undefined },
    site.email && { icon: "📧", label: "E-posta", value: site.email, href: `mailto:${site.email}` },
    site.address && { icon: "📍", label: "Adres", value: site.address },
    site.working_hours && { icon: "⏰", label: "Çalışma Saatleri", value: site.working_hours },
  ].filter(Boolean) as { icon: string; label: string; value: string; href?: string }[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0a] via-[#050505] to-[#0a0f0a]">
      <div className="border-b border-[#6b8f71]/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-white transition-colors hover:text-[#c9a96e]">
            {site.name}
          </Link>
          <Link href="/" className="text-sm text-[#999] transition-colors hover:text-[#c9a96e]">
            ← Ana Sayfa
          </Link>
        </div>
      </div>

      {/* Hakkımızda */}
      <motion.section {...fade} className="border-b border-[#6b8f71]/20 px-6 py-16 text-center md:px-12 md:py-24">
        <h1 className="mb-6 text-4xl font-bold text-[#f4f2ef] md:text-5xl" style={serif}>
          {about.title || about.label || site.name}
        </h1>
        {[about.paragraph1, about.paragraph2].filter(Boolean).map((p) => (
          <p key={p} className="mx-auto mb-3 max-w-2xl text-lg text-[#999]">
            {p}
          </p>
        ))}
      </motion.section>

      {stats.length > 0 && (
        <section className="border-b border-[#6b8f71]/20 px-6 py-12 md:px-12">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="mb-2 text-3xl font-bold text-[#c9a96e]">{s.value}</p>
                <p className="text-sm text-[#999]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {values.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#f4f2ef]" style={serif}>Değerlerimiz</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((v) => (
              <motion.div key={v.title} {...fade} className="rounded-lg border border-[#6b8f71]/20 bg-gradient-to-br from-[#6b8f71]/10 to-transparent p-8">
                <h3 className="mb-2 text-xl font-semibold text-[#f4f2ef]">{v.title}</h3>
                {v.description && <p className="text-[#999]">{v.description}</p>}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {certificates.length > 0 && (
        <section className="mx-auto max-w-6xl border-t border-[#6b8f71]/20 px-6 py-16 md:px-12">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#f4f2ef]" style={serif}>Belgeler & Sertifikalar</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => (
              <motion.div key={c.title} {...fade} className="overflow-hidden rounded-lg border border-[#6b8f71]/20 bg-[#0f140f]">
                {c.image_url && <img src={c.image_url} alt={c.title} className="h-40 w-full object-cover" loading="lazy" />}
                <div className="p-6">
                  {c.year && <span className="mb-3 inline-block rounded-full bg-[#c9a96e]/10 px-3 py-1 text-xs font-semibold text-[#c9a96e]">{c.year}</span>}
                  <h3 className="text-lg font-semibold text-[#f4f2ef]">{c.title}</h3>
                  {c.issuer && <p className="mt-1 text-sm text-[#999]">{c.issuer}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="mx-auto max-w-6xl border-t border-[#6b8f71]/20 px-6 py-16 md:px-12">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#f4f2ef]" style={serif}>Ekibimiz</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <motion.div key={m.name} {...fade} className="text-center">
                {m.image_url && <img src={m.image_url} alt={m.name} className="mb-4 aspect-square w-full rounded-lg object-cover" loading="lazy" />}
                <h3 className="mb-1 text-lg font-semibold text-[#f4f2ef]">{m.name}</h3>
                {m.role && <p className="mb-1 text-sm text-[#c9a96e]">{m.role}</p>}
                {m.specialty && <p className="text-xs text-[#999]">{m.specialty}</p>}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {contact.length > 0 && (
        <section className="border-t border-[#6b8f71]/20 px-6 py-16 text-center md:px-12">
          <h2 className="mb-8 text-3xl font-bold text-[#f4f2ef]" style={serif}>Bize Ulaşın</h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            {contact.map((c) => (
              <div key={c.label} className="rounded-lg border border-[#6b8f71]/20 bg-[#6b8f71]/10 p-6">
                <p className="mb-3 text-2xl">{c.icon}</p>
                <p className="mb-2 font-semibold text-[#f4f2ef]">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="text-sm text-[#999] hover:text-[#c9a96e]">{c.value}</a>
                ) : (
                  <p className="text-sm text-[#999]">{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
