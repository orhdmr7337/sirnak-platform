import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0f0a] px-6 text-center text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-[#c9a96e]">404</p>
        <h1 className="mt-4 text-4xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
          Bu sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[#8a9a8a]">
          Aradığınız sayfa taşınmış veya silinmiş olabilir.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex bg-[#6b8f71] px-6 py-3 font-semibold text-white rounded-lg hover:bg-[#5a7d60] transition-colors"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
