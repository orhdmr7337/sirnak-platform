"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export const SPRING_PRESS = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.6,
} as const;

export const SPRING_SWAP = {
  type: "spring",
  stiffness: 460,
  damping: 30,
  mass: 0.55,
} as const;

const NOT_FOUND_DEFAULTS = {
  code: "404",
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
  homeHref: "/dashboard",
  homeLabel: "Ana Sayfaya Dön",
  browseHref: "/dashboard",
  browseLabel: "Sayfaları Keşfet",
};

export interface NotFoundProps {
  className?: string;
  code?: string;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  browseHref?: string;
  browseLabel?: string;
}

interface NotFoundStageProps {
  className?: string;
  children: ReactNode;
}

function NotFoundStage({ className, children }: NotFoundStageProps) {
  return (
    <section
      className={cn(
        "flex min-h-[520px] w-full flex-col items-center justify-center gap-8 px-6 py-20 text-center",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface NotFoundActionsProps {
  homeHref?: string;
  homeLabel?: string;
  browseHref?: string;
  browseLabel?: string;
}

function NotFoundActions({
  homeHref = NOT_FOUND_DEFAULTS.homeHref,
  homeLabel = NOT_FOUND_DEFAULTS.homeLabel,
  browseHref = NOT_FOUND_DEFAULTS.browseHref,
  browseLabel = NOT_FOUND_DEFAULTS.browseLabel,
}: NotFoundActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href={homeHref}
        className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-600 px-6 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.97] shadow-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        {homeLabel}
      </a>

      <a
        href={browseHref}
        className="inline-flex h-11 items-center justify-center rounded-xl border border-surface-200 bg-white px-6 text-sm font-medium text-surface-700 transition-all hover:bg-surface-50 active:scale-[0.97]"
      >
        {browseLabel}
      </a>
    </div>
  );
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/\\";
const SCRAMBLE_MS = 700;
const TICK_MS = 45;

function Scramble({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    const chars = text.split("");
    const start = performance.now();
    let raf = 0;
    let last = 0;

    const loop = (now: number) => {
      if (now - last >= TICK_MS) {
        last = now;

        const progress = Math.min((now - start) / SCRAMBLE_MS, 1);
        const settled = Math.floor(progress * chars.length);

        setDisplay(
          chars
            .map((ch, i) =>
              i < settled || ch === " "
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            )
            .join(""),
        );
      }

      if (now - start < SCRAMBLE_MS) {
        raf = requestAnimationFrame(loop);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [text, reduce]);

  return <span className="tabular-nums">{display}</span>;
}

export function NotFoundGlitch({
  className,
  code = NOT_FOUND_DEFAULTS.code,
  title = NOT_FOUND_DEFAULTS.title,
  description = NOT_FOUND_DEFAULTS.description,
  homeHref,
  homeLabel,
  browseHref,
  browseLabel,
}: NotFoundProps) {
  return (
    <NotFoundStage className={className}>
      <div className="group relative select-none font-mono font-bold leading-none tracking-tighter text-surface-900 [font-size:clamp(5rem,18vw,11rem)]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-[#ff0040] opacity-0 mix-blend-screen transition-[transform,opacity] duration-150 ease-out group-hover:translate-x-[3px] group-hover:opacity-70 motion-reduce:hidden"
        >
          <Scramble text={code} />
        </span>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-[#00e5ff] opacity-0 mix-blend-screen transition-[transform,opacity] duration-150 ease-out group-hover:-translate-x-[3px] group-hover:opacity-70 motion-reduce:hidden"
        >
          <Scramble text={code} />
        </span>

        <h1 className="relative">
          <Scramble text={code} />
        </h1>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-surface-900">{title}</p>
        <p className="max-w-sm text-sm text-surface-500">{description}</p>
      </div>

      <NotFoundActions
        homeHref={homeHref}
        homeLabel={homeLabel}
        browseHref={browseHref}
        browseLabel={browseLabel}
      />
    </NotFoundStage>
  );
}
