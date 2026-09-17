import { getSiteData, getBlogPosts } from "@sirnak/shared";
import { SiteProvider } from "@sirnak/shared";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Doğal Dokunuş Masaj",
  description: "Masaj, wellness ve sağlıklı yaşam hakkında faydalı bilgiler ve güncel yazılar.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const data = await getSiteData("masaj");
  const posts = data ? await getBlogPosts(data.site.id) : [];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f0a] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Blog</h1>
          <p className="text-gray-400">Site yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <SiteProvider data={data}>
      <Header />
      <main className="min-h-screen bg-[#0a0f0a] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <Link href="/" className="text-sm text-gray-500 hover:text-[#6b8f71] transition-colors mb-4 inline-block">
              &larr; Ana Sayfa
            </Link>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Blog
            </h1>
            <p className="text-gray-500 text-lg">
              Masaj, wellness ve sağlıklı yaşam hakkında faydalı bilgiler
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-xl bg-[#1a231a] border border-[#2a3a2a] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>Henüz Yazı Yok</h2>
              <p className="text-gray-500">Blog yazıları yakında burada olacak.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-[#1a231a]/50 border border-[#2a3a2a]/50 rounded-xl p-6 hover:border-[#6b8f71]/40 hover:bg-[#1a231a]/80 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-semibold text-white group-hover:text-[#c9a96e] transition-colors mb-2" style={{ fontFamily: "Georgia, serif" }}>
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <time>{new Date(post.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</time>
                        {post.district && (
                          <>
                            <span>&middot;</span>
                            <span>{post.district}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-[#c9a96e] transition-colors shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </SiteProvider>
  );
}
