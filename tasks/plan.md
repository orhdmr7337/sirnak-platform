# Comprehensive 3-Site Redesign Plan

## Goal
Transform the current admin, masaj, and tesisat apps into a polished, premium, human-designed product. Eliminate the AI-generated look, fix visual/logic clutter, and create a consistent, modern experience across all three apps.

## Architecture Decisions
- Keep Supabase data layer and existing types in `@sirnak/shared` untouched.
- Keep existing site structure and SEO routes.
- Establish a shared visual language (glass cards, refined spacing, premium typography, consistent shadows/borders) without forcing identical components.
- Each site keeps its own color identity: tesisat (orange + sky), masaj (green + gold), admin (neutral slate + indigo accent).
- No duplicate floating CTAs. One fixed WhatsApp button on desktop, one mobile action bar, one contact form per site.
- All interactive states must be visible and accessible (hover, focus, active).

## Task List

### Phase 1: Shared Foundation
- [ ] Audit existing shared package and app globals.css files.
- [ ] Create shared CSS utility tokens for spacing, radius, shadows, transitions.
- [ ] Create premium glass card utility class used by all apps.

### Phase 2: Tesisat Redesign
- [ ] Redesign Header (cleaner transparent glass, better mobile menu).
- [ ] Redesign Hero / video overlay for premium service-business feel.
- [ ] Redesign Services cards (real 3D tilt, gradient border, icon glow, no generic look).
- [ ] Redesign Process steps as a true timeline.
- [ ] Redesign Trust items as subtle stat badges.
- [ ] Redesign Testimonials (quote cards with avatars, ratings).
- [ ] Redesign Gallery / Certificates / Documents with consistent masonry/lightbox.
- [ ] Redesign ContactCTA (form only, no duplicate buttons).
- [ ] Add tasteful tesisat-specific background effects (subtle floating tools/particles).
- [ ] Verify scroll anchors, z-index, and footer spacing.

### Phase 3: Masaj Redesign
- [ ] Apply same structural improvements as tesisat.
- [ ] Use spa/wellness aesthetic (soft gradients, organic shapes, calm motion).
- [ ] Redesign About section with premium stats.
- [ ] Redesign BookingCTA (form only, no duplicate buttons).

### Phase 4: Admin Redesign
- [ ] Redesign login page (centered card, clean branding).
- [ ] Redesign dashboard site selector (card grid with previews).
- [ ] Redesign site management layout (better sidebar/tabs, clear hierarchy).
- [ ] Improve form inputs, tables, media upload UX.
- [ ] Add loading states and empty states.

### Phase 5: QA & Polish
- [ ] Cross-app consistency review.
- [ ] Build all three apps individually.
- [ ] Verify no visual overlap, no broken links, forms submit correctly.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Subagents produce inconsistent design | High | Provide detailed shared constraints; review each app |
| Over-design (too many effects) | Medium | Require subtlety; no more than one background effect per section |
| Build failures from shared package changes | Medium | Build each app after changes |
| Scope too large for one session | High | Prioritize tesisat and masaj; admin second pass |

## Open Questions
- None — user instructed autonomous execution.
