# Agent Skills (OpenCode)

This workspace uses the `addyosmani/agent-skills` skill pack installed globally under `~/.config/opencode/skills/`.

## Core Rules

- If a task matches a skill, invoke it with the `skill` tool before acting.
- Skills are located in `~/.config/opencode/skills/<skill-name>/SKILL.md`.
- Follow the skill workflow strictly; do not partially apply it.
- Never skip required steps such as spec, plan, or test when a skill demands them.
- Always prefer skills over ad-hoc execution when there is any overlap.

## Intent → Skill Mapping

Map the user's intent to the matching skill automatically:

### Define Phase
- Don't know what you want yet? → `interview-me`
- Have a rough concept, need variants? → `idea-refine`
- New project / feature / change → `spec-driven-development`
- No quality bar written down? → `constraint-driven-development`

### Plan Phase
- Planning / breakdown → `planning-and-task-breakdown`

### Build Phase
- Implementing code → `incremental-implementation`
- UI / frontend work → `frontend-ui-engineering`
- API or interface design → `api-and-interface-design`
- Need better context? → `context-engineering`
- Need doc-verified code? → `source-driven-development`
- Stakes high / unfamiliar code? → `doubt-driven-development`

### Verify Phase
- Writing / running tests → `test-driven-development`
- Testing with DevTools → `browser-testing-with-devtools`
- Bug / failure / unexpected behavior → `debugging-and-error-recovery`

### Review Phase
- Code review / quality check → `code-review-and-quality`
- Too complex? → `code-simplification`
- Security concerns? → `security-and-hardening`
- Performance concerns? → `performance-optimization`

### Ship Phase
- Committing / branching → `git-workflow-and-versioning`
- CI/CD / automation → `ci-cd-and-automation`
- Deprecating / migrating → `deprecation-and-migration`
- Writing docs / ADRs → `documentation-and-adrs`
- Adding logs / metrics / alerts → `observability-and-instrumentation`
- Deploying / launching → `shipping-and-launch`

## Execution Model

For every request:

1. Determine if any skill applies (even a small chance).
2. Load the skill with `skill({ name: "<skill-name>" })`.
3. Follow the skill workflow exactly.
4. Only proceed to implementation once required steps are complete.
5. Keep responses concise and action-oriented.

## Project Context

- This is a Turkish local-business platform with three Next.js apps under `apps/`:
  - `admin` — internal admin panel (port 3000)
  - `tesisat` — plumbing & electrician site (port 3001)
  - `masaj` — massage therapy site (port 3002)
- All apps share a single Supabase backend.
- Shared package: `packages/shared`.
- Run individual app builds with `npm run build --workspace=apps/<name>`.
- Avoid running `npm run build:all` because concurrent Next.js builds can race on the shared module cache.
