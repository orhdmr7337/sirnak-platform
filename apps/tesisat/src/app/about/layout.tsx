'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Hakkımızda', href: '#about' },
  { name: 'Hikayemiz', href: '#story' },
  { name: 'Değerlerimiz', href: '#values' },
  { name: 'Ekibimiz', href: '#team' },
  { name: 'İletişim', href: '#contact' },
];

export default function AboutLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-[#f97316] hover:bg-[#ea580c] transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block fixed md:relative w-full md:w-64 h-screen md:h-auto bg-[#0f0f0f] border-r border-[#222] pt-20 md:pt-0 md:sticky md:top-0 z-40`}
        >
          <nav className="p-6 space-y-2">
            <h3 className="text-sm font-semibold text-[#f97316] uppercase tracking-widest mb-6">
              İçerik
            </h3>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-[#f97316]/10 hover:text-[#f97316] text-[#999]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#222]">
            <div className="text-xs text-[#666] space-y-2">
              <p>📞 +90 500 123 4567</p>
              <p>📧 iletisim@cozumnoktasi.com</p>
              <p>📍 Şırnak, Türkiye</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full md:w-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
