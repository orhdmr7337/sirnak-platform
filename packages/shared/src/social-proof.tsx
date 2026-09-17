"use client";

import { useState, useEffect, useRef } from "react";

interface SocialProofProps {
  instagramUsername: string;
  testimonialCount: number;
  customerCount: number;
  primaryColor: string;
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export function SocialProof({
  instagramUsername,
  testimonialCount,
  customerCount,
  primaryColor,
}: SocialProofProps) {
  const { count: followerCount, ref: followerRef } = useCountUp(
    Math.floor(customerCount * 1.5),
    2500
  );
  const { count: reviewCount, ref: reviewRef } = useCountUp(
    testimonialCount,
    2000
  );

  return (
    <div className="w-full">
      <style>{`
        @keyframes socialProofSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .social-proof-item {
          animation: socialProofSlide 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          opacity: 0;
        }
        .social-proof-item:nth-child(1) { animation-delay: 0s; }
        .social-proof-item:nth-child(2) { animation-delay: 0.15s; }
        .social-proof-item:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        {/* Instagram Followers */}
        <div ref={followerRef} className="social-proof-item flex items-center gap-3 rounded-xl bg-white/[0.03] px-5 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {followerCount.toLocaleString("tr-TR")}
            </p>
            <p className="text-xs text-white/50">
              Instagram&apos;da takipçimiz var
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div ref={reviewRef} className="social-proof-item flex items-center gap-3 rounded-xl bg-white/[0.03] px-5 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${primaryColor}20` }}>
            <svg className="h-5 w-5" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{reviewCount}+</p>
            <p className="text-xs text-white/50">5 yıldız değerlendirme</p>
          </div>
        </div>

        {/* Customer Badge */}
        <div className="social-proof-item flex items-center gap-3 rounded-xl bg-white/[0.03] px-5 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {customerCount.toLocaleString("tr-TR")}+
            </p>
            <p className="text-xs text-white/50">Mutlu müşteri</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialProof;
