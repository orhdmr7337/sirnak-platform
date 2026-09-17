# Spec: Tesisat Premium Redesign

## Objective
Redesign `apps/tesisat` into a premium, trustworthy local tradesman website for plumbing + electrician services in Şırnak. Eliminate the AI-generated aesthetic while preserving all Supabase data connections and existing routes.

## Design Direction
- **Background:** dark `#0a0a0a` to `#0f0f0f`, no busy gradients.
- **Accents:** orange `#f97316` and sky `#0ea5e9` used sparingly.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- **Radius scale:** sm 4px, md 8px, lg 12px, xl 16px. Avoid `rounded-3xl` except avatars.
- **Typography:** h1 page title, h2 section, h3 card title, body, small caption.
- **No AI look:** no purple gradients, no excessive rounding, no stock hero layouts, no oversize padding, no generic icon grids.

## Key Changes
1. **Header:** transparent glass `bg-black/20 backdrop-blur-xl border-b border-white/5`, logo left, nav center, phone CTA right. Mobile sheet menu.
2. **Hero:** strong headline + subheadline + one primary CTA. Video background with subtle dark overlay. Trust badges below headline.
3. **Services:** subtle cards with `bg-white/5`, `border-white/10`, hover lift 4px, hover border `orange/30`. Icon in muted circle. 1/2/3 col grid. No 3D tilt.
4. **Process:** horizontal timeline on desktop, vertical on mobile. Numbered steps with thin line.
5. **TrustStrip:** 4 compact stat/trust items in a row with subtle dividers.
6. **Gallery/Certificates/Documents:** consistent grid, `rounded-lg`, hover overlay with title. Lightbox with ESC and outside click.
7. **Districts:** clean grid of cards with subtle hover.
8. **FAQ:** accordion with +/- icon, clean spacing.
9. **Testimonials:** quote cards with large quotation mark, 5-star rating, name, district, service.
10. **ContactCTA:** form only, one submit button.
11. **Instagram:** two-column latest post + CTA, clean.
12. **Footer:** 4-column clean footer.
13. **MouseFollower:** removed.
14. **FloatingTools/SplashScreen/AmbientVideo:** removed.

## Critical Rules
- Only ONE fixed contact element on desktop: WhatsApp button bottom-right (z-40).
- Only ONE fixed contact element on mobile: MobileActionBar at bottom (z-40).
- No duplicate phone/WhatsApp CTAs in content sections.
- All buttons have clear hover/focus states.
- All form inputs have visible focus rings.
- z-index: header z-50, modals z-50, fixed buttons z-40.
- `scroll-mt-24` on all anchored sections.
- Keep all data fetching from `@sirnak/shared` intact.

## Commands
- Build: `npm run build --workspace=apps/tesisat`
- Dev: `npm run dev --workspace=apps/tesisat`

## Boundaries
- Only modify files under `apps/tesisat/`.
- Do not change shared package code.
- Preserve existing routes and metadata.

## Success Criteria
- Build succeeds with no errors.
- All existing sections remain functional and connected to Supabase data.
- No duplicate CTAs.
- Visual design matches premium, human-designed direction.
