# Admin Redesign Tasks

- [x] Task: Read current `apps/admin` code and write redesign spec
  - Acceptance: Spec saved to `tasks/SPEC-admin-redesign.md`
  - Verify: Read spec file

- [ ] Task: Set up shared UI primitives and design tokens
  - Acceptance: `globals.css` updated, `components/ui/*` created (Button, Input, Textarea, Select, Badge, Card, Table, Modal, Skeleton, EmptyState, Toast)
  - Verify: Build passes after each batch

- [ ] Task: Redesign login page
  - Acceptance: Centered clean card, logo, focus states, error messages, functional submit
  - Verify: Build passes

- [ ] Task: Redesign dashboard (site selector)
  - Acceptance: Grid of site cards with icon/name/status/Yönet button, clean layout
  - Verify: Build passes

- [ ] Task: Build dashboard layout shell (sidebar, header, mobile menu)
  - Acceptance: Persistent dark sidebar on desktop, hamburger on mobile, page header with site name and toast status
  - Verify: Build passes

- [ ] Task: Extract and redesign General tab
  - Acceptance: Consistent forms, site settings + hero + about content, save actions work
  - Verify: Build passes

- [ ] Task: Extract and redesign Services tab
  - Acceptance: List with edit/delete, modal form, empty state
  - Verify: Build passes

- [ ] Task: Extract and redesign Gallery & Media tab
  - Acceptance: Upload area with drag hint, preview grid, video section, empty state
  - Verify: Build passes

- [ ] Task: Extract and redesign FAQs, Process, Trust tabs
  - Acceptance: Consistent list UI, modals, save/delete actions work
  - Verify: Build passes

- [ ] Task: Extract and redesign Testimonials tab
  - Acceptance: Table with status badges, approve/delete actions
  - Verify: Build passes

- [ ] Task: Extract and redesign Messages tab
  - Acceptance: Table with status badges, status select, readable on mobile
  - Verify: Build passes

- [ ] Task: Redesign Instagram tab
  - Acceptance: Clean form, queue/table, empty state
  - Verify: Build passes

- [ ] Task: Final build and QA
  - Acceptance: `npm run build --workspace=apps/admin` passes with zero errors
  - Verify: Run build command and fix any errors
