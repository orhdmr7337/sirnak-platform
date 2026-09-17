"use client";

import { useState, useEffect } from "react";

interface SocialFloatProps {
  socialLinks: Array<{ platform: string; url: string; username?: string }>;
  whatsapp?: string;
  primaryColor: string;
}

const PLATFORM_ICONS: Record<string, { label: string; color: string; path: string }> = {
  instagram: {
    label: "Instagram",
    color: "from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  tiktok: {
    label: "TikTok",
    color: "from-[#00f2ea] to-[#ff0050]",
    path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13.2a8.16 8.16 0 005.58 2.19v-3.45a4.85 4.85 0 01-3.58-1.46V6.69h3.58z",
  },
  facebook: {
    label: "Facebook",
    color: "from-[#1877f2] to-[#0d47a1]",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  youtube: {
    label: "YouTube",
    color: "from-[#ff0000] to-[#cc0000]",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
};

export function SocialFloat({ socialLinks, whatsapp, primaryColor }: SocialFloatProps) {
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const filteredLinks = socialLinks.filter(
    (link) => PLATFORM_ICONS[link.platform.toLowerCase()]
  );

  const allItems: Array<{
    platform: string;
    url: string;
    isWhatsApp?: boolean;
  }> = [...filteredLinks];

  if (whatsapp) {
    const cleanPhone = whatsapp.replace(/[^0-9]/g, "");
    allItems.push({
      platform: "whatsapp",
      url: `https://wa.me/${cleanPhone}?text=Merhaba%2C%20bilgi%20almak%20istiyorum.`,
      isWhatsApp: true,
    });
  }

  if (allItems.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes floatSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(37, 211, 102, 0); }
        }
        .float-item {
          animation: floatSlideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          opacity: 0;
        }
        .float-whatsapp {
          animation: floatSlideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards,
                     floatPulse 2s ease-in-out infinite 1.5s;
          opacity: 0;
        }
        .float-label {
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .float-item:hover .float-label,
        .float-whatsapp:hover .float-label {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div className="fixed right-4 bottom-28 z-50 flex flex-col gap-2 md:bottom-12 md:right-6">
        {allItems.map((item, index) => {
          const isWA = item.isWhatsApp;
          const platform = item.platform.toLowerCase();
          const iconData = PLATFORM_ICONS[platform];

          return (
            <div key={item.platform} className="flex items-center justify-end gap-2">
              <span className="float-label pointer-events-none text-xs font-medium text-white/80 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 backdrop-blur-sm">
                {isWA ? "WhatsApp" : iconData?.label || item.platform}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={isWA ? "float-whatsapp" : "float-item"}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div
                  className="relative flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
                  style={{
                    animationDelay: `${0.1 + index * 0.1}s`,
                    background: isWA
                      ? "#25D366"
                      : `linear-gradient(135deg, ${primaryColor}ee, ${primaryColor}aa)`,
                  }}
                >
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    {isWA ? (
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    ) : (
                      <path d={iconData?.path || ""} />
                    )}
                  </svg>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SocialFloat;
