# Admin Redesign Spec

## Objective
Redesign `apps/admin` into a modern, premium SaaS admin dashboard without the generic AI aesthetic. Preserve all existing Supabase auth, data connections, server actions, and routes. The redesign must feel human-designed: clear hierarchy, consistent spacing, accessible forms, readable tables, and polished empty/loading states.

## Scope
- Only modify files inside `apps/admin/`.
- Do not change `actions.ts`, `types.ts`, `@/lib/auth-context.tsx`, or `@/lib/supabase-client.ts` except for minor type-safe adjustments if required by the build.
- Keep all existing server action imports and calls functional.

## Design Direction
- Theme: dark sidebar (`#0f172a`) + light content (`#f8fafc`).
- Accent: indigo (`#4f46e5`) for focus rings, primary buttons, active states.
- Neutrals: slate palette for text, borders, surfaces.
- Radius: `rounded-md` (6px) and `rounded-lg` (8px) only; avoid `rounded-2xl`/excessive rounding.
- No purple gradients, no glassmorphism, no generic AI card grids.
- Real spacing scale via Tailwind defaults (4, 6, 8, 12, 16, 20, 24, 32 px increments).

## Required Changes
1. **Login page**: centered card, logo, email/password inputs with focus rings, clear submit button, inline error messages.
2. **Dashboard (site selector)**: grid of site cards with icon, name, domain, status badge, "Yönet" button.
3. **Site management layout (`/dashboard/[site]`)**:
   - Persistent dark sidebar on desktop, hamburger drawer on mobile.
   - Sections: Genel, Hizmetler, Galeri & Medya, SSS, Süreç, Güven, Yorumlar, Mesajlar, Instagram.
   - Page header with site name, back button, save status/toast.
4. **Forms**: consistent labels, inputs, focus rings, error helpers.
5. **Tables/lists**: Yorumlar, Mesajlar, Instagram queue — clean tables with status badges, actions.
6. **Media upload**: drag-and-drop hint upload area, preview grid, loading state.
7. **Empty states**: friendly empty state with icon and add action.
8. **Loading states**: skeletons for async data.
9. **Toasts/notifications**: simple inline status messages after save actions.
10. **Mobile responsive**: hamburger sidebar, responsive tables (horizontal scroll), stacked forms.

## Commands
```
Build: npm run build --workspace=apps/admin
Dev:   npm run dev:admin
```

## Project Structure
```
apps/admin/src/
  app/
    globals.css               # design tokens + base styles
    layout.tsx                # keep AuthProvider wrapper
    login/page.tsx            # redesigned login
    dashboard/page.tsx        # redesigned site selector
    dashboard/[site]/
      page.tsx                # shell with sidebar + tab routing
      actions.ts              # unchanged
      types.ts                # unchanged
      InstagramTab.tsx        # redesigned
  components/
    ui/                       # Button, Input, Textarea, Select, Badge, Card, Table, Modal, Skeleton, EmptyState, Toast
    dashboard/
      site-sidebar.tsx        # persistent sidebar
      mobile-menu.tsx         # mobile drawer
      page-header.tsx         # header with back/logout/status
      tabs/
        general-tab.tsx
        services-tab.tsx
        gallery-tab.tsx
        faqs-tab.tsx
        process-tab.tsx
        trust-tab.tsx
        testimonials-tab.tsx
        messages-tab.tsx
```

## Boundaries
- Always: run `npm run build --workspace=apps/admin` after changes.
- Ask first: changes outside `apps/admin/`.
- Never: break auth, server actions, or Supabase connections.

## Success Criteria
- `npm run build --workspace=apps/admin` passes with zero errors.
- All routes (`/login`, `/dashboard`, `/dashboard/[site]`) render without crashes.
- Auth flow (redirect when unauthenticated, logout) still works.
- All forms remain functional and submit to the same server actions.
- Tables are readable on desktop and horizontally scrollable on mobile.
- Empty and loading states are present for every data list.
