import { parseContentBlocks } from "@sirnak/shared";
import type { ServiceFaq } from "@sirnak/shared";

// Hizmet sayfasının uzun metni ve hizmete özel SSS (services.content / services.faqs).
export function ServiceContent({ content, faqs }: { content?: string | null; faqs?: ServiceFaq[] | null }) {
  const blocks = parseContentBlocks(content);
  const items = (faqs ?? []).filter((f) => f.q?.trim() && f.a?.trim());
  if (!blocks.length && !items.length) return null;

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      {blocks.length > 0 && (
        <article className="space-y-5 text-base leading-relaxed text-[#b4b5ba]">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="pt-6 text-2xl font-bold text-white">
                {b.text}
              </h2>
            ) : b.type === "ul" ? (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.text}</p>
            )
          )}
        </article>
      )}

      {items.length > 0 && (
        <div className="pt-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {items.map((f, i) => (
              <details key={i} className="glass-card group rounded-xl p-5" open={i === 0}>
                <summary className="cursor-pointer list-none font-semibold text-white">
                  <h3 className="inline">{f.q}</h3>
                </summary>
                <p className="mt-3 leading-relaxed text-[#b4b5ba]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/** Hizmete özel SSS için FAQPage JSON-LD; soru yoksa null. */
export function serviceFaqJsonLd(faqs?: ServiceFaq[] | null) {
  const items = (faqs ?? []).filter((f) => f.q?.trim() && f.a?.trim());
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
