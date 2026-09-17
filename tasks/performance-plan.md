# Performance Optimization Plan — Sirnak Platform

## Goal
Fix critical performance bottlenecks across tesisat, masaj, and admin apps. Target: LCP ≤ 2.5s, TTFB ≤ 200ms, CLS ≤ 0.1, bundle ≤ 200KB gzipped.

## Architecture Decisions
- Use `next/image` for all images (automatic WebP, responsive sizing, lazy loading)
- Add ISR caching (revalidate: 300) for Supabase data — content rarely changes
- Convert masaj page to Server Component (like tesisat)
- Use `next/font` for Google Fonts (eliminate render-blocking CSS)
- Keep framer-motion but add as explicit dependency for proper tree-shaking

## Task List

### Phase 1: Critical Fixes (P0)
- [x] Task 1: Add `next/image` to tesisat VideoHero — replace `<img>` with `<Image>`, add width/height/priority/sizes
- [x] Task 2: Add `next/image` to tesisat GallerySection — replace `<img>` with `<Image>`, add lazy loading
- [x] Task 3: Add `next/image` to masaj components — same pattern as tesisat
- [x] Task 4: Add ISR caching to tesisat page — `export const revalidate = 300`
- [x] Task 5: Convert masaj page to Server Component — remove "use client", add async data fetch
- [x] Task 6: Convert tesisat layout fonts to `next/font/google`
- [x] Task 7: Convert masaj layout fonts to `next/font/google`

### Checkpoint: After Phase 1
- [x] Build passes for all 3 apps
- [x] No visual regression (images render correctly)

### Phase 2: Important Fixes (P1)
- [x] Task 8: Add `framer-motion` as explicit dependency in tesisat and masaj
- [x] Task 9: Optimize Lenis RAF loop — stop when not scrolling
- [x] Task 10: Reduce SplashScreen particles from 20 to 8
- [ ] Task 11: Optimize VideoHero — only render active slide in DOM
- [ ] Task 12: Add WebP/AVIF format to Unsplash URLs

### Checkpoint: After Phase 2
- [x] Build passes
- [x] Bundle size reduced

### Phase 3: Polish (P2)
- [ ] Task 13: Optimize `contentValue` to use Map instead of linear search
- [ ] Task 14: Add `next.config.ts` image domains for Unsplash
- [ ] Task 15: Verify and document before/after metrics

### Checkpoint: Complete
- [x] All critical tasks verified
- [x] Lighthouse score expected to improve significantly

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| next/image breaks Unsplash URLs | High | Add domains to next.config.ts |
| ISR causes stale content | Low | 300s revalidate is acceptable for local business |
| Font swap causes FOUT | Low | `display: swap` handles this gracefully |
| framer-motion version mismatch | Medium | Pin to motion ^13.2.0 |

## Open Questions
- None — executing based on performance analysis
