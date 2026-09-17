import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-center text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-400">404</p>
        <h1 className="mt-4 text-4xl font-bold">Bu sayfa bulunamadı</h1>
        <p className="mx-auto mt-4 max-w-md text-gray-400">
          Aradığınız sayfa taşınmış veya silinmiş olabilir.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex bg-orange-500 px-6 py-3 font-semibold text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
