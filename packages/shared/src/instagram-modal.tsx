"use client";

import { useEffect, useCallback } from "react";
import type { InstagramPost } from "./supabase";

interface InstagramModalProps {
  post: InstagramPost;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function InstagramModal({ post, onClose, onNext, onPrev }: InstagramModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const mockLikes = post.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 200 + 50;
  const mockComments = post.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 30 + 5;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <style>{`
        @keyframes igModalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ig-modal-anim {
          animation: igModalIn 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 z-10"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 z-10"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 z-10 md:right-16"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        className="ig-modal-anim mx-4 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {post.image_url && (
          <div className="relative w-full md:w-3/5">
            <img
              src={post.image_url}
              alt={post.caption || "Instagram post"}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex w-full flex-col p-6 md:w-2/5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]">
              <span className="text-sm font-bold text-white">I</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Instagram</p>
              <p className="text-xs text-white/50">Gönderi</p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-6 border-b border-white/10 pb-4">
            <button className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-red-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span className="text-sm font-medium">{mockLikes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
              </svg>
              <span className="text-sm font-medium">{mockComments}</span>
            </button>
            <button className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {post.caption ? (
              <p className="text-sm leading-relaxed text-white/80">{post.caption}</p>
            ) : (
              <p className="text-sm text-white/30">Açıklama yok</p>
            )}
          </div>

          {post.published_at && (
            <p className="mt-4 text-xs text-white/30">
              {new Date(post.published_at).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstagramModal;
