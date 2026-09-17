import { getSiteData, getBlogPostBySlug, getBlogPosts } from "@sirnak/shared";
import { SiteProvider } from "@sirnak/shared";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getSiteData("tesisat");
  if (!data) return {};
  const post = await getBlogPostBySlug(data.site.id, params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Çözüm Noktası Tesisat`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const data = await getSiteData("tesisat");
  if (!data) return [];
  const posts = await getBlogPosts(data.site.id);
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const data = await getSiteData("tesisat");
  if (!data) notFound();

  const post = await getBlogPostBySlug(data.site.id, params.slug);
  if (!post) notFound();

  return (
    <SiteProvider data={data}>
      <Header />
      <main className="min-h-screen bg-[#050505] pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="text-sm text-[#9a9ba1] hover:text-[#ff6b35] transition-colors mb-8 inline-block">
            &larr; Tüm Yazılar
          </Link>

          <header className="mb-10">
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--sc-font-display)" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-[#9a9ba1]/60">
              <time>{new Date(post.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</time>
              {post.district && (
                <>
                  <span>&middot;</span>
                  <span>{post.district}</span>
                </>
              )}
            </div>
          </header>

          {post.excerpt && (
            <div className="text-lg text-[#9a9ba1] mb-8 pb-8 border-b border-white/5 leading-relaxed">
              {post.excerpt}
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <div className="text-[#d1d0cc] leading-relaxed whitespace-pre-wrap text-base">
              {post.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <Link href="/blog" className="text-[#ff6b35] hover:text-[#ff8c5a] text-sm font-medium transition-colors">
              &larr; Tüm Yazılara Dön
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </SiteProvider>
  );
}
