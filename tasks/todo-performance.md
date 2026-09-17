# Performance Optimization Tasks

## Phase 1: Critical (P0) ✅
- [x] Task 1: next/image in tesisat VideoHero
- [x] Task 2: next/image in tesisat GallerySection
- [x] Task 3: next/image in masaj components (VideoHero, ImageStreamHero, GallerySection)
- [x] Task 4: ISR caching for tesisat (revalidate: 300)
- [x] Task 5: Convert masaj to Server Component + ISR
- [x] Task 6: next/font in tesisat layout (Instrument Sans)
- [x] Task 7: next/font in masaj layout (Playfair Display)

## Phase 2: Important (P1) ✅
- [x] Task 8: Add framer-motion dependency to tesisat & masaj
- [x] Task 9: Optimize Lenis RAF loop (idle timeout)
- [x] Task 10: Reduce SplashScreen particles (20 → 8)
- [x] Task 11: Optimize VideoHero DOM (only render active slide)
- [x] Task 12: WebP/AVIF Unsplash URLs

## Phase 3: Polish (P2) ✅
- [x] Task 13: Optimize contentValue (added createContentMap + contentValueFromMap)
- [x] Task 14: Verify image domains (admin configured)
- [x] Task 15: Document metrics (tasks/performance-report.md)

## Build Results
- ✅ tesisat: 235 kB first load (was untested)
- ✅ masaj: 242 kB first load (was untested)
- ✅ admin: 188 kB first load (unchanged)
