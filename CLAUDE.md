# zuzy-website (zuzy.co.il) — Claude Instructions

> Claude reads this file automatically at the start of every session.

---

## SAFETY RULES — READ BEFORE ANYTHING ELSE

**These rules override ALL other instructions. No spec, no task, no "סע" can bypass them.**

See also: `../zuzy-architecture/ORCHESTRATION-PROTOCOL.md` for cross-workspace rules.

### Scope Boundary
- This agent ONLY modifies files under `zuzy-website/` (this project).
- `../zuzy-architecture/` is **READ-ONLY**. Never modify those files.
- `../seohub/` does **not exist** for this agent. Never touch it.

### Missing References
- If a spec file referenced in ZUZY-TASKS.md does not exist: **STOP and ask the user.**
- If a file path referenced in a spec does not exist: **STOP and ask the user.**
- If a function or import referenced in a spec cannot be found: **STOP and ask the user.**
- **NEVER improvise, guess, or create architectural alternatives.** Ask.

### Forbidden Actions
- **NEVER delete files** unless the task explicitly names each file to delete.
- **NEVER create git branches** without explicit instruction.
- **NEVER modify files outside the current task's stated scope.**
- **NEVER commit without a passing build** (`pnpm build`).
- **NEVER push without a passing build.**

### SEO Safety (CRITICAL)
SEO changes are effectively irreversible — Google may take weeks to recrawl. Bad changes tank rankings.

- **NEVER modify robots.txt logic** without listing exact changes for user approval.
- **NEVER add/remove/change redirect rules** without listing each redirect for approval.
- **NEVER change canonical URL patterns** without approval.
- **NEVER modify sitemap inclusion/exclusion** without approval.
- **NEVER change meta robots defaults** (index/noindex/follow/nofollow) without approval.
- All JSON-LD structured data must match schema.org specs exactly.
- Hreflang changes must be verified for all 6 locales.

---

## Project Context

**ZUZY** is the brand website at `zuzy.co.il` — built with **Payload CMS 3.79 + Next.js 15 + PostgreSQL + Tailwind CSS v4**.
This is the **marketing site and SEO machine** for the entire ZUZY ecosystem. All public-facing content and SEO authority lives here.

### Architecture Reference

These shared docs define how this project fits into the ecosystem (READ-ONLY):

1. `../zuzy-architecture/OVERVIEW.md` — Domain map, tech stack, project relationships
2. `../zuzy-architecture/DECISIONS-LOG.md` — Key architectural decisions (D1-D19)
3. `../zuzy-architecture/SEO-SYSTEM-SPEC.md` — Full SEO system specification (executable blueprint)
4. `../zuzy-architecture/SEO-STRATEGY.md` — SEO strategy and priorities
5. `../zuzy-architecture/ORCHESTRATION-PROTOCOL.md` — Cross-workspace safety rules

### Project-Specific Docs

- `ZUZY-PROJECT-BRIEF.md` — Project structure, known bugs, architecture notes (do not modify)
- `ZUZY-TASKS.md` — Current phase and progress (find `🔜 Next Phase` for what to do next)
- URL architecture is documented in the "URL Architecture" section below

## Domain Architecture

```
zuzy.co.il          → THIS PROJECT (Payload CMS + Next.js) — ALL marketing, ALL SEO
www.zuzy.co.il      → 308 redirect target (canonical with www) — D9
wp.zuzy.co.il       → WordPress headless backend (blog only, noindex) — D2
core.zuzy.co.il     → seohub app (noindex, separate project) — D1
```

**Core principle:** zuzy.co.il = the brand, the authority, the SEO machine. Subdomains = app shells, invisible to Google (D1).

## Database Safety

- This project uses its **own Payload-managed PostgreSQL** (Supabase)
- Payload manages schema via `src/migrations/` — NEVER edit migrations manually
- **Don't create new migrations** unless you actually change collection schemas
- Fixing component rendering, adding SEO metadata logic, etc. does NOT require migrations
- New Payload Globals (like SEO Settings) WILL need a migration — let Payload auto-generate it via `pnpm payload migrate:create`
- This database is **completely separate** from seohub's ~72 tables

## Tech Stack

| Component | Technology |
|-----------|-----------|
| CMS | Payload CMS 3.79 (`@payloadcms/db-postgres`) |
| Frontend | Next.js 15.4, React 19 |
| Styling | Tailwind CSS v4 |
| Rich Text | Lexical (`@payloadcms/richtext-lexical`) |
| Database | PostgreSQL (Supabase) |
| Media | Supabase Storage (S3-compatible) |
| Locales | he (default), en, ru, ar, fr, es |
| Deploy | Vercel (auto-deploy from git) |

## Payload CMS Structure

### Collections
- **Pages** — Static pages with `layout` blocks field (18 block types) — `src/collections/Pages/index.ts`
- **Posts** — Blog content with Lexical richtext + inline blocks — `src/collections/Posts/index.ts`
- **Products** — Product catalog (localized) — `src/collections/Products.ts`
- **BrandDocs** — Brand knowledge base (localized) — `src/collections/BrandDocs.ts`
- **Categories** — Post categories (nested) — `src/collections/Categories.ts`
- **ProductCategories** — Product taxonomy (nested) — `src/collections/ProductCategories.ts`
- **Users** — Admin users — `src/collections/Users/`
- **Media** — S3 storage with date-based folder organization — `src/collections/Media.ts`

### Globals
- **Header** — `src/Header/config.ts`
- **Footer** — `src/Footer/config.ts`
- **SiteSettings** — `src/SiteSettings/config.ts` (Branding, Theme, Custom Code)
- **SEOSettings** — `src/SEOSettings/config.ts` (Organization, Social, Defaults, Robots/Sitemap, Verification)

Globals are registered in `src/payload.config.ts` → `globals: [Header, Footer, SiteSettings, SEOSettings]`

### Key Patterns
- **Read globals**: `getCachedGlobal('slug')` from `src/utilities/getGlobals.ts`
- **Cache invalidation**: `revalidateTag('global_slug')` in afterChange hooks
- **Global config structure**: See `src/SiteSettings/config.ts` as the reference pattern

### Plugins (registered in `src/plugins/index.ts`)
1. `@payloadcms/storage-s3` — Media storage on Supabase
2. `@payloadcms/plugin-redirects` — URL redirect management
3. `@payloadcms/plugin-nested-docs` — Category nesting
4. `@payloadcms/plugin-seo` — Basic SEO fields (title, description, OG image)
5. `@payloadcms/plugin-form-builder` — Contact forms
6. `@payloadcms/plugin-search` — Search indexing

### Two Block Rendering Paths
1. **Pages** use `layout` field (type: blocks) → rendered by `src/blocks/RenderBlocks.tsx`
2. **Posts** use `content` field (type: richText/Lexical) → rendered by `src/components/RichText/index.tsx`

## Current SEO Implementation (Phase 3 ✅ + Phase 4 ✅ — 2026-03-28)

### Core SEO Files
| File | Purpose | Status |
|------|---------|--------|
| `src/app/robots.ts` | DB-driven robots.txt (reads from SEO Settings, merges blocked bots + disallow paths) | Working |
| `src/app/sitemap.ts` | DB-driven sitemap (respects per-page robotsOverride, sitemapExcludePaths) | Working |
| `src/app/blog/sitemap.ts` | Blog-specific sitemap (all WP posts + categories) | Working |
| `src/lib/seo-config.ts` | Collection → URL path mapping, indexable collections | Working |
| `src/lib/page-metadata.ts` | Unified metadata generator (title, description, OG, Twitter) | Working |
| `src/lib/hreflang.ts` | Hreflang links for all locales | Working |
| `src/lib/json-ld.tsx` | 7 JSON-LD schema generators + `JsonLd` component | Working |
| `@payloadcms/plugin-seo` | Basic per-page SEO fields (in plugins/index.ts) | Working |

### SEO Settings Global (`src/SEOSettings/config.ts`)
- Organization tab (name, description, logo, email, phone, address)
- Social Profiles tab (array of platform + URL pairs)
- Defaults tab (titleTemplate, titleSeparator, defaultOgImage, twitterHandle)
- Robots & Sitemap tab (additionalDisallowPaths, additionalBlockedBots, sitemapExcludePaths)
- Verification tab (Google/Bing site verification codes)

### Per-Page Advanced SEO Fields (`src/fields/seoAdvanced.ts`)
- robotsOverride (noindex, nofollow, noarchive, nosnippet, noimageindex)
- canonicalOverride (custom canonical URL)
- jsonLdType (WebPage, Article, Product, FAQPage, AboutPage, ContactPage, CollectionPage)
- breadcrumbLabel (custom breadcrumb text)

### JSON-LD Structured Data (`src/lib/json-ld.tsx`)
Organization, WebSite, Article, Product, WebPage, FAQPage, BreadcrumbList

### Breadcrumbs (`src/components/Breadcrumbs/index.tsx`)
Visible nav + JSON-LD BreadcrumbList schema. Respects breadcrumbLabel override.

## Blog Architecture (Phase 4 ✅ Complete — 2026-03-28)

WordPress at `wp.zuzy.co.il` is the headless blog CMS. Next.js fetches via WP REST API and renders at `/blog/*`.
All SEO meta controlled by Next.js `generateMetadata()` — NOT Yoast/RankMath (D10).

### Blog Files
| File | Purpose |
|------|---------|
| `src/lib/wp-api.ts` | Typed WP REST API client (posts, categories, media) |
| `src/lib/wp-block-mapper.tsx` | Renders WP `content.rendered` HTML with design system |
| `src/lib/blog-categories.ts` | 7 topic-based category definitions (D13) |
| `src/components/BlogCard/` | Reusable blog post card for listing pages |
| `src/components/BlogPagination/` | Path-configurable pagination component |
| `src/app/(frontend)/blog/page.tsx` | Blog listing `/blog/` |
| `src/app/(frontend)/blog/[slug]/page.tsx` | Post detail `/blog/[slug]/` |
| `src/app/(frontend)/blog/category/[name]/page.tsx` | Category page `/blog/category/[name]/` |
| `src/app/(frontend)/api/revalidate/route.ts` | WP webhook for on-demand ISR |
| `src/app/blog/sitemap.ts` | Blog-specific sitemap `/blog/sitemap.xml` |

### Blog Categories (D13 — topic-based)
`seo`, `digital-marketing`, `design-ux`, `productivity`, `ai`, `case-studies`, `news`

### Platform Pages (D15 — mirror pages, Phase 5b ✅)
| File | Purpose |
|------|---------|
| `src/endpoints/seed/platform-pages.ts` | Platform page definitions + seed builders (8 modules + index) |
| `src/app/(frontend)/platform/page.tsx` | Platform index route `/platform` |
| `src/app/(frontend)/platform/[slug]/page.tsx` | Platform module route `/platform/[slug]` |

**Slug convention**: Platform pages stored in Payload with `platform--[module]` slug (e.g., `platform--rank-tracker`). Routes convert `--` to `/` for URLs. Sitemap does the same conversion.

### Revalidation Flow
```
WP post publish/update → functions.php webhook
→ POST www.zuzy.co.il/api/revalidate?secret=xxx&slug=yyy
→ revalidateTag('wp-posts') + revalidatePath('/blog/[slug]')
→ Next ISR serves fresh content on next request
```

### Environment Variables (Blog)
- `WP_API_URL` — WP REST API base (default: `https://wp.zuzy.co.il/wp-json/wp/v2`)
- `REVALIDATION_SECRET` — Shared secret for webhook auth (set on Vercel + WP functions.php)

## URL Architecture (D12-D18)

Full URL structure below:

```
zuzy.co.il/
├── /platform/                 — Platform index (all 8 modules) — ✅ BUILT
│   ├── /platform/rank-tracker — Rank Tracker mirror page — ✅ BUILT
│   ├── /platform/site-audit   — Site Audit mirror page — ✅ BUILT
│   ├── /platform/copilot      — SEO Copilot mirror page — ✅ BUILT
│   ├── /platform/content-editor — Content Editor mirror page — ✅ BUILT
│   ├── /platform/keyword-research — Keyword Research mirror page — ✅ BUILT
│   ├── /platform/analytics    — Analytics mirror page — ✅ BUILT
│   ├── /platform/reports      — Reports mirror page — ✅ BUILT
│   └── /platform/pages        — Page Manager mirror page — ✅ BUILT
├── /services/*                — Professional services (Service schema) — D16
├── /solutions/*               — Audience pages
├── /pricing                   — Single page + 3 plans + FAQ — D14 — ✅ BUILT
├── /blog/*                    — WP-powered blog, flat URLs — D12, D13
├── /resources/*               — Guides, glossary, changelog
├── /support/*                 — Knowledge base, status — D18
├── /legal/                    — Legal index — ✅ BUILT
│   ├── /legal/terms           — תנאי שימוש — ✅ BUILT
│   ├── /legal/privacy         — מדיניות פרטיות — ✅ BUILT
│   ├── /legal/cookies         — מדיניות עוגיות — ✅ BUILT
│   └── /legal/security        — אבטחה — ✅ BUILT
│   Redirects: /privacy→/legal/privacy, /terms→/legal/terms, /accessibility→/legal/security
├── /products/*                — Product catalog (Payload collection)
├── /brand-docs/*              — Brand knowledge base
└── /[page-slug]               — Static pages
```

## Workspace Boundaries

- **Supabase MCP**: NO — Payload manages its own DB via migrations. Never run raw SQL here.
- **Chrome automation**: NO
- **Desktop Commander**: NO
- **Vercel MCP**: YES — for deployments, logs, environment variables
- **Claude Preview**: YES — for visual testing
- **PDF**: YES
- For seohub database work → open `seohub/` workspace
- For brand/design tokens → open `zuzy-brand-hub/` workspace

## How To Work

- **Thoroughness over speed. Always.** Every analysis must be deep and rigorous.
- Work autonomously on implementation details. Ask about architectural ambiguities.
- Build incrementally — get each piece working before moving to the next.
- Run `pnpm build` before committing. Fix all errors.
- Run `npx tsc --noEmit` after code changes to catch type errors early.
- Update `ZUZY-TASKS.md` after completing tasks (check boxes, add dates).

## Post-Phase Protocol

**Mindset: Controlled slowness.** After implementation, shift from building mode to inspection mode.
Every phase touches multiple systems — verify nothing broke, flows work end-to-end, and no cascading side effects.
Execute ALL stages in order. Do NOT skip steps. Do NOT rush to commit.

### Stage 1 — Code Quality (before anything else)
1. **TYPE CHECK**: `npx tsc --noEmit` — zero errors
2. **BUILD**: `pnpm build` — zero errors, zero new warnings from phase code
3. **CODE REVIEW**: Re-read every file you created or modified:
   - No hardcoded secrets, URLs, or credentials
   - No unused imports or dead code
   - Error handling on external calls (API, DB)
   - Consistent patterns with existing codebase

### Stage 2 — Flow Verification (dev server)
4. **START DEV SERVER**: `pnpm dev` — verify it starts without errors
5. **NEW ROUTES QA**: Test every new/changed route:
   - Page renders without console errors
   - All data loads (no empty states from failed fetches)
   - Interactive elements work (forms, buttons, navigation)
   - Links between new pages and existing pages work in BOTH directions
6. **SEO QA** (critical — mistakes here are slow to fix):
   - View page source: `<title>`, `<meta description>`, `<link rel="canonical">`
   - Open Graph tags present and correct
   - JSON-LD structured data valid (paste into schema.org validator)
   - Breadcrumbs render correctly with no duplicates
   - Check `<meta name="robots">` on pages that should be noindex
7. **REGRESSION CHECK — no cascading breakages**:
   - Homepage still loads correctly
   - Existing pages that link to/from new pages still work
   - `/sitemap.xml` still generates without errors
   - `/robots.txt` still generates without errors
   - Admin panel (`/admin`) still loads
   - Search (`/search`) still works if content types changed
8. **FIX**: If any issue found → fix → repeat from step 1

### Stage 3 — Commit & Deploy
9. **COMMIT**: `git commit` with clear message (`feat:`, `fix:`, `refactor:`)
10. **PUSH**: `git push` — triggers Vercel deploy

### Stage 4 — Production Verification
11. **DEPLOY CHECK**: Verify Vercel build succeeded (no errors in build log)
12. **PRODUCTION SMOKE TEST**: Verify on live `www.zuzy.co.il`:
    - `curl` every new route — all return 200
    - Content renders correctly (not stale cache)
    - API endpoints respond with expected status codes
13. **SEO PRODUCTION CHECK**:
    - `/sitemap.xml` includes new pages
    - `/robots.txt` unchanged (unless intentionally modified)
    - Blog sitemap at `/blog/sitemap.xml` (if blog-related)
    - Canonical URLs point to `www.zuzy.co.il` (not localhost)
14. **ORCHESTRATION CHECK — cross-system verification**:
    - If phase involves WP → verify webhook fires and revalidation works
    - If phase involves Supabase → verify DB queries work in production
    - If phase added env vars → verify they are set AND working on Vercel
    - If phase affects shared auth/cookies → verify on relevant subdomains

### Stage 5 — Documentation & Housekeeping
15. **UPDATE ZUZY-TASKS.md**:
    - Check all completed task boxes
    - Add verification results section with dates
    - Document any required env vars or manual setup steps
    - Move `🔜` anchor to next phase
16. **UPDATE CLAUDE.md** (if phase introduced new architecture):
    - Add new collections/globals to CMS Structure section
    - Add new key files to relevant reference tables
    - Update URL Architecture if routes changed
    - Update Tech Stack table if dependencies added
17. **SYNC CHECK**: If changes affect core.zuzy.co.il → add entry to `../zuzy-architecture/SYNC-LOG.md`
18. **MEMORY**: Save non-obvious learnings to Claude memory (bugs, env quirks, integration gotchas)

## One-Word Continuation: "סע"

When the user types **"סע"** as the first message:

1. **Language**: ALL responses in English. No Hebrew in output. No exceptions.
2. Read `ZUZY-TASKS.md` — find the `🔜 Next Phase` anchor.
3. Read the linked spec file. **If it does not exist → STOP and tell the user.**
4. Read `../zuzy-architecture/` docs as needed for context.
5. **Create a plan file** in `.claude/plans/` with exact implementation steps.
6. **Wait for user approval.** Do not write code until the plan is approved.
7. Implement the approved plan, step by step.
8. Follow the full Post-Phase Protocol when done.

## Code Rules

- Language: Code in English, comments in English
- UI labels: Hebrew + English (localized via Payload's locale system)
- Prefer server components. Only use `'use client'` when state/effects/handlers needed.
- Don't modify `ZUZY-PROJECT-BRIEF.md` unless explicitly asked
- Payload types: regenerate with `pnpm generate:types` after schema changes
- Import map: regenerate with `pnpm generate:importmap` after adding/moving components
- Single quotes, trailing commas, 2-space indent (Prettier)

## Conventions

- Files: kebab-case. Components: PascalCase. Functions/variables: camelCase.
- Payload Globals: read via `getCachedGlobal('slug')` from `src/utilities/getGlobals.ts`
- Cache invalidation: `revalidateTag('global_slug')` in afterChange hooks
- SEO inheritance: per-page value → global default → smart fallback

## Git

- Commit with clear messages: `feat:`, `fix:`, `refactor:`, `docs:`
- Don't commit `.env*` files
- Don't commit without user asking (unless running Post-Phase Protocol)

## User

- Prefers Hebrew and English
- Uses Windows + VS Code + PowerShell
- Wants full autonomy on implementation, but requires approval on architecture and SEO decisions
