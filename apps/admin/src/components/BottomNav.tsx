"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const items = [
  {
    label: "Siteler",
    href: "/dashboard",
    match: (p: string) => p === "/dashboard" || p.startsWith("/dashboard/"),
    icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  },
  {
    label: "Bildirimler",
    href: "/notifications",
    match: (p: string) => p.startsWith("/notifications"),
    icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0",
  },
];

/**
 * Mobil alt gezinme çubuğu (lg ve üzerinde gizli).
 * Başparmakla erişilebilir, safe-area (çentik / ev çubuğu) uyumlu.
 */
export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <nav
      aria-label="Ana gezinme"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-surface-200 pb-safe"
    >
      <ul className="grid grid-cols-3 h-16">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <button
                onClick={() => router.push(item.href)}
                aria-current={active ? "page" : undefined}
                className={`w-full h-full flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors active:bg-surface-100 ${
                  active ? "text-brand-600" : "text-surface-500"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={signOut}
            className="w-full h-full flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-surface-500 active:bg-danger-50 active:text-danger-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Çıkış
          </button>
        </li>
      </ul>
    </nav>
  );
}
