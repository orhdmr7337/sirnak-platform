"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import type { InstagramPost } from "./supabase";

interface InstagramFeedProps {
  siteId: string;
  InstagramUsername: string;
  primaryColor: string;
  secondaryColor: string;
  maxPosts?: number;
}

export function InstagramFeed({
  siteId,
  InstagramUsername,
  primaryColor,
  secondaryColor,
  maxPosts = 12,
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const PAGE_SIZE = 8;

  const fetchPosts = useCallback(
    async (pageNum: number, append = false) => {
      const from = pageNum * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("instagram_posts")
        .select("*")
        .eq("site_id", siteId)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .range(from, to);

      if (!error && data) {
        const typed = data as InstagramPost[];
        if (append) {
          setPosts((prev) => [...prev, ...typed]);
        } else {
          setPosts(typed);
        }
        setHasMore(typed.length === PAGE_SIZE);
      }
      setLoading(false);
      setLoadingMore(false);
    },
    [siteId]
  );

  useEffect(() => {
    fetchPosts(0);
  }, [fetchPosts]);

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, true);
  };

  const close = () => setSelectedPost(null);

  const mockLikes = (id: string) => {
    const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (hash % 200) + 50;
  };

  const mockComments = (id: string) => {
    const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (hash % 30) + 5;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`,
              animation: `igPulse 1.5s ease-in-out infinite ${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg className="mb-4 h-16 w-16 opacity-30" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
        <p className="text-sm text-white/40">Henüz paylaşım yok</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes igPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes igHeartBeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1); }
          75% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .ig-grid-item:hover .ig-heart-icon {
          animation: igHeartBeat 0.6s ease-in-out;
        }
        .ig-overlay {
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ig-grid-item:hover .ig-overlay {
          opacity: 1;
        }
        .ig-grid-item img {
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ig-grid-item:hover img {
          transform: scale(1.08);
        }
      `}</style>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {posts.slice(0, maxPosts).map((post, index) => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="ig-grid-item group relative aspect-square overflow-hidden rounded-lg"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.caption || "Instagram post"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}30, ${secondaryColor}30)`,
                }}
              />
            )}

            <div className="ig-overlay absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <div className="flex items-center gap-4 text-white">
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <svg className="ig-heart-icon h-5 w-5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {mockLikes(post.id)}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  {mockComments(post.id)}
                </span>
              </div>
              {post.caption && (
                <p className="mt-2 line-clamp-2 max-w-[90%] px-4 text-center text-xs text-white/80">
                  {post.caption}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {hasMore && posts.length < maxPosts && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            {loadingMore ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              "Daha Fazla"
            )}
          </button>
        </div>
      )}

      {selectedPost && (
        <InstagramModal post={selectedPost} onClose={close} mockLikes={mockLikes} mockComments={mockComments} />
      )}
    </>
  );
}

function InstagramModal({
  post,
  onClose,
  mockLikes,
  mockComments,
}: {
  post: InstagramPost;
  onClose: () => void;
  mockLikes: (id: string) => number;
  mockComments: (id: string) => number;
}) {
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
        .ig-modal-content {
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

      <div
        className="ig-modal-content mx-4 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] md:flex-row"
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
            <button className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span className="text-sm font-medium">{mockLikes(post.id)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
              </svg>
              <span className="text-sm font-medium">{mockComments(post.id)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {post.caption && (
              <p className="text-sm leading-relaxed text-white/80">{post.caption}</p>
            )}
            {!post.caption && (
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

export default InstagramFeed;
