"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { telHref } from "@sirnak/shared";
import type { Site, CertificateItem, TeamMember, ValueItem, TrustItem } from "@sirnak/shared";

interface Props {
  site: Site;
  about: Record<string, string>;
  values: ValueItem[];
  team: TeamMember[];
  certificates: CertificateItem[];
  trustItems: TrustItem[];
}

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

/**
 * Hakkımızda + Belgeler sayfası. Tüm veriler veritabanından gelir; boş olan bölüm gösterilmez.
 */
export default function BelgelerView({ site, about, values, team, certificates, trustItems }: Props) {
  const stats = [1, 2, 3]
    .map((n) => ({ value: about[`stat${n}_value`], label: about[`stat${n}_label`] }))
    .filter((s) => s.value && s.label);
  const tel = telHref(site);
  const contact = [
    site.phone && { label: "Telefon", value: site.phone, href: tel ?? undefined },
    site.email && { label: "E-posta", value: site.email, href: `mailto:${site.email}` },
    site.address && { label: "Adres", value: site.address },
    site.working_hours && { label: "Çalışma Saatleri", value: site.working_hours },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]">
      <div className="border-b border-[#222]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-[#f4f2ef] transition-colors hover:text-primary">
            {site.name}
          </Link>
          <Link href="/" className="text-sm text-[#999] transition-colors hover:text-primary">
            ← Ana Sayfa
          </Link>
        </div>
      </div>

      <motion.section {...fade} className="px-6 py-16 text-center md:px-12 md:py-24">
        <h1 className="mb-6 text-4xl font-bold text-[#f4f2ef] md:text-5xl">
          {about.title || about.label || site.name}
        </h1>
        {[about.paragraph1, about.paragraph2].filter(Boolean).map((p) => (
          <p key={p} className="mx-auto mb-3 max-w-2xl text-lg text-[#999]">
            {p}
          </p>
        ))}
      </motion.section>

      {stats.length > 0 && (
        <section className="border-y border-[#222] px-6 py-10 md:px-12">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">{s.value}</div>
                <p className="text-sm text-[#999]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {values.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:px-12">
          <h2 className="mb-8 text-3xl font-bold text-[#f4f2ef]">Değerlerimiz</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((v) => (
              <motion.div key={v.title} {...fade} className="rounded-lg border border-[#222] bg-[#0f0f0f] p-6 transition-colors hover:border-primary/50">
                <h3 className="mb-2 text-lg font-semibold text-[#f4f2ef]">{v.title}</h3>
                {v.description && <p className="text-[#999]">{v.description}</p>}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {certificates.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
          <h2 className="mb-8 text-3xl font-bold text-[#f4f2ef]">Belgeler & Sertifikalar</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => (
              <motion.div key={c.title} {...fade} className="overflow-hidden rounded-lg border border-[#222] bg-[#0f0f0f] transition-colors hover:border-primary/50">
                {c.image_url && <img src={c.image_url} alt={c.title} className="h-40 w-full object-cover" loading="lazy" />}
                <div className="p-6">
                  {c.year && <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{c.year}</span>}
                  <h3 className="text-lg font-semibold text-[#f4f2ef]">{c.title}</h3>
                  {c.issuer && <p className="mt-1 text-sm text-[#999]">{c.issuer}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:px-12">
          <h2 className="mb-8 text-3xl font-bold text-[#f4f2ef]">Ekibimiz</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {team.map((m) => (
              <motion.div key={m.name} {...fade} className="rounded-lg border border-[#222] bg-[#0f0f0f] p-6 text-center">
                {m.image_url && <img src={m.image_url} alt={m.name} className="mx-auto mb-4 h-24 w-24 rounded-full object-cover" loading="lazy" />}
                <h3 className="mb-1 text-lg font-semibold text-[#f4f2ef]">{m.name}</h3>
                {m.role && <p className="text-sm text-primary">{m.role}</p>}
                {m.specialty && <p className="mt-1 text-xs text-[#999]">{m.specialty}</p>}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {trustItems.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 text-center md:px-12">
          <h2 className="mb-8 text-2xl font-bold text-[#f4f2ef]">Neden Bize Güvenebilirsiniz?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustItems.map((t) => (
              <div key={t.id} className="rounded-lg border border-[#222] bg-[#0f0f0f] p-6">
                <p className="mb-2 font-semibold text-[#f4f2ef]">{t.title}</p>
                <p className="text-sm text-[#999]">{t.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {contact.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-20 md:px-12">
          <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-[#0f0f0f] p-8">
            <h2 className="mb-6 text-3xl font-bold text-[#f4f2ef]">İletişim Bilgileri</h2>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {contact.map((c) => (
                <div key={c.label}>
                  <p className="text-sm text-[#999]">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="font-semibold text-[#f4f2ef] hover:text-primary">{c.value}</a>
                  ) : (
                    <p className="font-semibold text-[#f4f2ef]">{c.value}</p>
                  )}
                </div>
              ))}
            </div>
            {tel && (
              <a href={tel} className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-[#050505] transition-colors hover:bg-primary-dark">
                Hemen Ara
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
