# ZUZY — Tasks & Progress

> Living document. Status: ⬜ Not started | 🔄 In progress | ✅ Complete
> Phase history below. Find `🔜 Next Phase` for current work.
> Last updated: 2026-04-29

---

## ✅ Phase 6 — Brand Alignment Update: Colors + SVG Logo Kit (2026-03-31)

**Source**: Brand Hub `specs/DESIGN-ALIGNMENT-PLAN.md` (2026-03-31)
**Context**: seohub confirmed as color authority. Brand Hub updated. zuzy-website needs to follow.

### 6.1 — Color Token Update ✅
> Primary: `#7354C4` → `#7C3AED` | Accent: `#06B6D4` → `#0D9488`

- [x] Update `globals.css` — all `#7354C4` → `#7C3AED`, all `#06B6D4` → `#0D9488`
- [x] Update `.docs/brand/zuzy-design-tokens.css` — same replacements
- [x] Update `src/app/(frontend)/zuzy-design-tokens.css` — same replacements
- [x] Update `SiteSettings/config.ts` — default color fallback values
- [x] Update `layout.tsx` / `InitTheme/index.tsx` — any hardcoded fallbacks
- [x] Update `seed/index.ts` — seed data color values
- [x] Update `--state-layer` rgba values to match new primary (`rgba(124, 58, 237, 0.08)`)
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success

### 6.2 — SVG Logo Migration ✅
> Professional SVG kit delivered 2026-03-31. Files already in `public/brand/`.

**Available SVGs (15 files):**
- `logo-horizontal-purple.svg` / `logo-horizontal-white.svg` — header, footer, nav
- `icon-dark.svg` / `icon-white.svg` — favicons
- `logo-vertical-purple.svg` / `logo-vertical-white.svg` — full page contexts
- Plus: gradient, cyan, black variants

- [x] Update Logo component (`src/components/Logo/Logo.tsx`) — uses SVGs from `public/brand/` (purple for light, white for dark), CMS upload as override
- [x] Replace `favicon.svg` — Payload CMS default bolt icon → ZUZY brand icon with light/dark mode support
- [x] JSON-LD logo — uses `orgLogo` from SEO Settings (CMS-managed, no code change needed)
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success

### Phase 6 Verification (2026-03-31)
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (all static pages generated)
- [x] No migration needed — SiteSettings defaults are code-level only, existing DB values preserved

---

## ✅ Phase 7 — Brand Portal: Design System Showcase (2026-03-31)

**Depends on**: Phase 6 ✅ (colors + SVGs)
**Source**: Brand Hub app (`zuzy-brand-hub/app/src/`), brand strategy docs (`zuzy-brand-hub/brand/`)
**Scope**: Transform basic BrandDocs collection into a professional, public-facing brand portal at `/brand-docs/`

### 7.1 — New BrandDocs docTypes + Visual Blocks ✅
- [x] Add new `docType` options: `design-tokens`, `logo-usage`, `typography`, `color-palette`, `motion`
- [x] Add new `icon` options: `palette`, `frame`, `typography`, `rainbow`, `sparkles`
- [x] Create `LogoGrid` block — renders all 15 SVG variants from `public/brand/` grouped by type with download overlays
- [x] Create `ColorPalette` block — shows primary (#7C3AED), accent (#0D9488), neutrals with hex/rgb/cssVar values
- [x] Create `TypographySpecimen` block — IBM Plex Sans Hebrew showcase (5 weights, 7-step size scale, Hebrew + Latin samples)
- [x] Registered all 3 blocks in Pages collection config + RenderBlocks
- [x] SpacingScale block deferred — marginal value for brand portal
- [x] Migration `20260331_182150_add_brand_docs_design_types` created and applied

### 7.2 — Brand Strategy Content ✅
- [x] Seed 7 brand docs from Brand Hub markdown files:
  - Brand Philosophy → BrandDoc (essence)
  - Brand Voice → BrandDoc (brand-voice)
  - Products Overview → BrandDoc (solutions)
  - Competitive Landscape → BrandDoc (differentiation)
  - Customer Avatars → BrandDoc (sales)
  - Design System Overview → BrandDoc (design-tokens)
  - Logo Usage Guidelines → BrandDoc (logo-usage)
- [x] Seed file: `src/endpoints/seed/brand-docs-pages.ts`
- [x] Wired into main seed script (`src/endpoints/seed-zuzy/index.ts`)

### 7.3 — Brand Portal Landing Page ✅
- [x] `/brand-docs/` index page — HeroBlock + 2 FeaturesBlock grids (strategy 5-card + design system 3-card)
- [x] `/brand-docs/[slug]/` detail pages — title, summary, richText content with breadcrumbs
- [x] `/brand-docs/design-system` — HeroBlock + LogoGrid + ColorPalette + TypographySpecimen blocks
- [x] All pages include JSON-LD WebPage schema + breadcrumbs + generateMetadata

### 7.4 — Premium Components 🔄 In Progress (2026-04-01)
- [x] Port Brand Hub motion assets (ContentPipelineInfographic, PremiumMotionAssets) as page blocks
- [x] Port UI Kit showcase components for interactive demos
- [ ] Visual verification on dev server (pending)
- [ ] Seed `/brand-docs/design-system` via `/next/seed-brand-docs` endpoint in production

### Phase 7 Verification (2026-03-31)
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (91/91 static pages)
- [x] Migration applied successfully
- [x] Types regenerated (`pnpm generate:types`)
- [x] `seo-config.ts` updated: `brand-docs` path changed from `/brand` to `/brand-docs`

### New Files Created
- `src/blocks/LogoGrid/config.ts` + `Component.tsx`
- `src/blocks/ColorPalette/config.ts` + `Component.tsx`
- `src/blocks/TypographySpecimen/config.ts` + `Component.tsx`
- `src/endpoints/seed/brand-docs-pages.ts`
- `src/app/(frontend)/brand-docs/page.tsx` + `page.client.tsx`
- `src/app/(frontend)/brand-docs/[slug]/page.tsx` + `page.client.tsx`
- `src/app/(frontend)/brand-docs/design-system/page.tsx`

---

## ✅ Phase 8 — Blog/WP Architecture Cleanup (2026-04-29)

**Plan**: `.claude/plans/BLOG-WP-CLEANUP.md`
**Scope**: End the recurring blog/WP/Posts conflicts by enforcing a single architecture across all layers (WP server, Payload, Next.js, docs, memory).

### 8.A — WP-side guardrails ✅
- [x] Deployed `wp-content/mu-plugins/zuzy-headless-guardrails.php` on wp.zuzy.co.il:
  - 308 redirect every WP frontend URL → `www.zuzy.co.il/blog/...` (post slug, category, fallback to `/blog/`)
  - Allowlist: `/wp-admin`, `/wp-json`, `/wp-login.php`, `/wp-cron.php`, `/xmlrpc.php`, `/wp-content`, `/wp-includes`
  - X-Robots-Tag: noindex, nofollow on every frontend response
  - `wp_sitemaps_enabled` filter → false
  - RSS/Atom feed actions removed

### 8.B — Codebase deletion ✅
- [x] Deleted `src/app/(frontend)/posts/` (3 routes)
- [x] Deleted `src/collections/Posts/` (collection + revalidation hooks)
- [x] Deleted `src/blocks/RelatedPosts/`, `src/blocks/ArchiveBlock/`, `src/blocks/Banner/`
- [x] Deleted `src/components/Card/`, `src/components/CollectionArchive/`
- [x] Deleted `src/heros/PostHero/`
- [x] Deleted `src/utilities/formatAuthors.ts`
- [x] Deleted `src/endpoints/seed/post-1.ts`, `post-2.ts`, `post-3.ts`, `image-1.ts`
- [x] `src/payload.config.ts` — removed Posts import + registration
- [x] `src/plugins/index.ts` — removed Post type, removed `'posts'` from redirectsPlugin + searchPlugin collection arrays
- [x] `src/blocks/RenderBlocks.tsx` — removed ArchiveBlock import + registration
- [x] `src/collections/Pages/index.ts` — removed Archive from blocks array
- [x] `src/endpoints/seed/index.ts` — removed post imports + seeding + image-post fetches; replaced `Posts → /posts` Header nav with `Blog → /blog`
- [x] `src/lib/seo-config.ts` — removed `/posts` from BLOCKED_PATHS
- [x] `src/app/robots.ts` — removed `/posts*` from DEFAULT_DISALLOW
- [x] `src/fields/link.ts` — `relationTo: ['pages', 'products', 'brand-docs']` (was `['pages', 'posts']`)
- [x] `src/fields/defaultLexical.ts` — `enabledCollections: ['pages', 'products', 'brand-docs']`
- [x] `src/components/RichText/index.tsx` — dropped Banner import + converter; updated `internalDocToHref` to handle non-pages collections via prefix
- [x] `src/components/Link/index.tsx` — replaced `Page | Post` with `Page | Product | BrandDoc`
- [x] `src/components/PayloadRedirects/index.tsx` — same
- [x] `src/utilities/generateMeta.ts` — removed Post from union
- [x] `src/utilities/generatePreviewPath.ts` — removed `posts: '/posts'` from collectionPrefixMap
- [x] `src/app/(frontend)/search/page.tsx` — rewrote to use per-item `doc.relationTo` (Card+CollectionArchive replaced with inline simple results component)

### 8.C — Migration ⏳ (USER MUST RUN — interactive prompt cannot be automated)

The Payload schema diff is large (drop `posts` + sub-tables, drop `archive` block columns, drop `posts_id` from `*_rels` tables, add `products_id` + `brand_docs_id` columns). Drizzle prompts interactively to confirm "create new" vs "rename from existing" for each enum/column. The default answer is **always "create new"** — that's correct for every prompt in this migration.

**Steps:**
```bash
# In zuzy-website root (NOT worktree, OR worktree with .env present):
pnpm payload migrate:create drop_posts_and_align
# Press ENTER on every prompt (default = "create new"). Do NOT pick "rename from".

# This generates: src/migrations/YYYYMMDD_HHMMSS_drop_posts_and_align.ts (+ .json)

# Verify the SQL by inspecting the .ts file before applying.

# Apply locally:
pnpm payload migrate
# WARNING: .env DATABASE_URL points to production (Supabase) since it was pulled via `vercel env pull`.
# Running `pnpm payload migrate` in this state applies the migration to PRODUCTION.
# Plan accordingly: run during low traffic OR set up a separate dev DB.
```

**After migration is applied:**
- `pnpm build` passes (header_rels has the right columns)
- `posts` table is gone, demo posts deleted
- Production DB schema aligned with new code

**Deployment ordering note:** After the migration applies, the OLD code currently in production starts erroring (it queries `posts` which no longer exists). To avoid a long broken window, run the migration as close to the deploy as possible:
1. Push the code commit (Vercel starts building)
2. Run `pnpm payload migrate` while Vercel is mid-build
3. Vercel deploy completes → new code matches new schema

For a fresh low-traffic site, this brief inconsistency is acceptable. For higher traffic in the future, consider adding `payload migrate` to the `build` script in `package.json` so migrations and code deploy atomically.

### 8.D — Docs alignment ✅
- [x] Deleted stale `ZUZY-PROJECT-BRIEF.md`
- [x] `CLAUDE.md` — added LOCKED ARCHITECTURE block, removed Posts from Collections, fixed URL Architecture to match live state (Pattern A nesting + Pattern B flat slugs documented honestly)
- [x] `../zuzy-architecture/OVERVIEW.md` — fixed "proxy" → REST API, added redirect/noindex enforcement note, added Posts collection deletion note
- [x] `../zuzy-architecture/DECISIONS-LOG.md` D2 — appended 2026-04-29 enforcement details
- [x] `../zuzy-architecture/SYNC-LOG.md` — moved D10-D18 to Completed; deprecated old proxy entry; added 2026-04-29 entries; flagged core.zuzy.co.il drift + DNS-RECORDS gap as Active items for user
- [x] `../zuzy-architecture/DNS-RECORDS.md` — flagged file as incomplete (missing wp/core records)

### 8.E — Verification ⏳
- [x] `pnpm generate:types` — clean
- [x] `pnpm generate:importmap` — clean
- [x] `npx tsc --noEmit` — exit 0, zero errors
- [ ] `pnpm build` — currently fails on `column header_rels.products_id does not exist` (DB schema lags code). Will pass after 8.C migration applies.

### 8.F — Architecture lock ✅
- [x] Memory: `feedback_blog_arch_locked.md` — future Claude sessions see this in MEMORY.md index
- [x] CLAUDE.md LOCKED ARCHITECTURE block at top — STOP-and-ask rules for any future agent

### 8.G — Pending (user)
- [ ] **Deploy WP mu-plugin** (Phase 8.A) — `wp-content/mu-plugins/zuzy-headless-guardrails.php` on the WP server. Snippet provided in chat 2026-04-29.
- [ ] **Generate + apply Payload migration** (8.C) — run interactively, press Enter for all prompts.
- [ ] **Verify build passes** — `pnpm build` should succeed after migration.
- [ ] **Update `../zuzy-architecture/DNS-RECORDS.md`** — add `wp` and `core` records from Hostinger panel (DNS-RECORDS.md is flagged as incomplete).
- [ ] **Clarify `core.zuzy.co.il` actual purpose** — current state: marketing landing ("ZUZY4SEO"); D1 says: seohub app shell with `Disallow: /`. Either D1 changed or seohub robots config drifted.
- [ ] **Commit + push** — after build passes locally, push to trigger Vercel deploy.
- [ ] **Production smoke tests** (Phase D below) — after deploy.

---

## 🔜 Phase 9 — Footer + Legal Hub (one-hub model)

**Spec**: `.claude/plans/FOOTER-LEGAL-HUB.md` (brief written 2026-06-11 from the seohub GSC session, on Gil's instruction — contains the locked one-hub decision, live-probe state, and the phase structure).
**Trigger**: Google OAuth app verification needs the homepage to link the privacy policy; the footer global is empty; the legal silo is incomplete (`/legal/gdpr` + `/legal/accessibility` 404, `/accessibility` misredirects to `/legal/security`).
**Mode**: Phase 0 (two bottom-bar legal links — may already be done by Gil via admin; verify first) can execute immediately. Phase 1 (full footer + legal-silo completion) is **PLAN-FIRST**: produce the plan, get Gil's approval, only then implement.

- [ ] Phase 0 — homepage footer links privacy + terms (live HTML verified)
- [ ] Phase 1 plan written + approved by Gil
- [ ] Phase 1 implemented per approved plan (six legal pages live, redirect fixed, silo-mapped columns)

---

## ✅ Phase 3 — SEO System Build (2026-03-28)

**Scope**: Full RankMath-equivalent SEO control system — JSON-LD structured data, breadcrumbs, admin-controlled SEO settings, per-page robots/canonical overrides.

### 3.1 — SEO Settings Global ✅
- [x] Created `src/SEOSettings/config.ts` — new Payload Global with 5 tabs
- [x] **Organization tab**: orgName, orgDescription, orgLogo, orgEmail, orgPhone, orgAddress (street, city, region, postal, country)
- [x] **Social Profiles tab**: array of platform + URL pairs (Facebook, Twitter, LinkedIn, Instagram, YouTube, GitHub, TikTok)
- [x] **Defaults tab**: titleTemplate (`%s | ZUZY`), titleSeparator, defaultOgImage, twitterHandle
- [x] **Robots & Sitemap tab**: additionalDisallowPaths, additionalBlockedBots, sitemapExcludePaths
- [x] **Verification tab**: Google/Bing site verification codes
- [x] Registered in `payload.config.ts` globals array
- [x] Cache revalidation hook (`revalidateTag('global_seo-settings')`)

### 3.2 — Advanced SEO Fields on Collections ✅
- [x] Created shared `src/fields/seoAdvanced.ts` — DRY field group
- [x] **robotsOverride** — multi-select: noindex, nofollow, noarchive, nosnippet, noimageindex
- [x] **canonicalOverride** — text field for custom canonical URL
- [x] **jsonLdType** — select: WebPage, Article, Product, FAQPage, AboutPage, ContactPage, CollectionPage
- [x] **breadcrumbLabel** — text field for custom breadcrumb label
- [x] Added to Pages, Posts, Products SEO tabs (spread into existing `meta` tab)
- [x] Added full SEO tab to BrandDocs (previously had none — now has Overview, MetaTitle, MetaImage, MetaDescription, Preview + advanced fields)

### 3.3 — JSON-LD Structured Data ✅
- [x] Created `src/lib/json-ld.tsx` — 7 schema generators + `JsonLd` component
- [x] **Organization schema** — rendered in root layout from SEO Settings (name, url, logo, email, phone, address, sameAs)
- [x] **WebSite schema** — rendered in root layout with SearchAction
- [x] **Article schema** — rendered on post pages (headline, author, publisher, datePublished, image)
- [x] **Product schema** — rendered on product pages (name, offers with price/currency, seller)
- [x] **WebPage schema** — rendered on pages with jsonLdType override support
- [x] **FAQPage schema** — auto-detected from FAQ blocks in page layouts (extracts question/answer pairs)
- [x] **BreadcrumbList schema** — rendered via Breadcrumbs component

### 3.4 — Breadcrumbs Component ✅
- [x] Created `src/components/Breadcrumbs/index.tsx`
- [x] Renders both visible nav breadcrumbs and JSON-LD BreadcrumbList schema
- [x] `buildBreadcrumbs()` utility builds items from collection + slug
- [x] Respects `breadcrumbLabel` override from advanced SEO fields
- [x] Wired into Pages (non-home), Posts, Products, Brand Docs

### 3.5 — DB-Driven Robots.txt ✅
- [x] `src/app/robots.ts` now reads from SEO Settings global
- [x] Merges default malicious bots with `additionalBlockedBots` from admin
- [x] Merges default disallow paths with `additionalDisallowPaths` from admin
- [x] Graceful fallback if DB unreachable

### 3.6 — DB-Driven Sitemap ✅
- [x] `src/app/sitemap.ts` now respects per-page `robotsOverride` (noindex = excluded)
- [x] Reads `sitemapExcludePaths` from SEO Settings for manual exclusions
- [x] Selects `meta` field to check robotsOverride per doc

### 3.7 — Metadata Generator Enhancements ✅
- [x] `src/utilities/generateMeta.ts` now supports `robotsOverride` → `<meta name="robots">` directives
- [x] Supports `canonicalOverride` → `<link rel="canonical">` override
- [x] Verification meta tags (Google, Bing) rendered in root layout from SEO Settings

### 3.8 — Middleware Improvements ✅
- [x] Added security headers: X-Content-Type-Options, Referrer-Policy
- [x] Clean separation of concerns

### 3.9 — FAQ Schema Auto-Detection ✅
- [x] Created `src/lib/lexical-to-text.ts` — extracts plain text from Lexical richtext JSON
- [x] Pages with FAQ blocks automatically get FAQPage JSON-LD schema
- [x] Question text + answer plain text extracted from block data

### Phase 3 Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (all static pages generated)
- [x] Migration `20260327_214619` created and applied
- [x] Types regenerated (`pnpm generate:types`)
- [x] Import map regenerated (`pnpm generate:importmap`)

---

## ✅ Phase 4 — Blog Architecture (2026-03-28)

**Dependencies**: Phase 3 ✅ + D10 resolved ✅ (Option B — Next.js manages all SEO meta)
**Full spec**: URL architecture documented in CLAUDE.md (Blog section)
**Decisions**: D10 (meta ownership), D12 (flat URLs), D13 (topic categories)

### 4.1 — WP REST API Client ✅
- [x] Created `src/lib/wp-api.ts` — typed WP REST API client
- [x] `fetchPosts()`, `fetchPost()`, `fetchAllPostSlugs()` — post queries with pagination
- [x] `fetchCategories()`, `fetchCategory()` — category queries
- [x] Helper utilities: `stripHtml()`, `getPostFeaturedImage()`, `getPostAuthor()`, `getPostCategories()`, `getPostPrimaryCategory()`
- [x] ISR caching with `next: { revalidate: 3600, tags: ['wp-posts'] }`
- [x] Base URL configurable via `WP_API_URL` env var (default: `https://wp.zuzy.co.il/wp-json/wp/v2`)

### 4.2 — Gutenberg Block Mapper ✅
- [x] Created `src/lib/wp-block-mapper.tsx` — `WPContent` component
- [x] Renders WP `content.rendered` HTML with Tailwind prose classes
- [x] Image optimization: extracts `<img>` tags and replaces with Next.js `<Image>` components
- [x] Responsive sizing and lazy loading

### 4.3 — Blog Routes ✅
- [x] `/blog/` — Blog listing page with pagination (`src/app/(frontend)/blog/page.tsx`)
- [x] `/blog/page/[n]/` — Blog pagination pages (redirects page/1 → /blog/)
- [x] `/blog/[slug]/` — Individual post with hero, content, related posts
- [x] `/blog/category/[name]/` — Category page with H1 + intro text + post grid
- [x] `/blog/category/[name]/page/[n]/` — Category pagination
- [x] All routes use `generateMetadata()` — Next.js controls all SEO (D10)

### 4.4 — Blog SEO ✅
- [x] Article JSON-LD on every blog post (via existing `generateArticleJsonLd()`)
- [x] CollectionPage JSON-LD on category pages
- [x] Breadcrumbs with Schema.org on every blog page (Home > Blog > [Category] > Post)
- [x] Self-referencing canonical URLs on all blog pages
- [x] Pagination pages set `noindex, follow` (SEO best practice)
- [x] OG + Twitter Card meta on all blog pages
- [x] Featured image from WP used as OG image

### 4.5 — Blog Sitemap ✅
- [x] Created `/blog/sitemap.xml` (`src/app/blog/sitemap.ts`)
- [x] Includes blog listing, all 7 category pages, and all published posts
- [x] Separate from main Payload sitemap for faster blog discovery
- [x] Added to `robots.txt` output (both sitemaps now listed)

### 4.6 — Revalidation Webhook ✅
- [x] Created `POST /api/revalidate` (`src/app/(frontend)/api/revalidate/route.ts`)
- [x] Secret-based authentication via `REVALIDATION_SECRET` env var
- [x] Revalidates `wp-posts` cache tag + specific blog paths
- [x] Supports both post and category revalidation
- [x] GET endpoint for health check

### 4.7 — Blog Category Config ✅
- [x] Created `src/lib/blog-categories.ts` — 7 topic-based categories (D13)
- [x] Categories: seo, digital-marketing, design-ux, productivity, ai, case-studies, news
- [x] Each category has English + Hebrew names, descriptions, and related platform links

### 4.8 — Infrastructure Updates ✅
- [x] Removed `/blog` proxy rewrites from `next.config.js`
- [x] Added `wp.zuzy.co.il` to `images.remotePatterns` for Next.js Image optimization
- [x] `BlogCard` component (`src/components/BlogCard/`) — reusable post card
- [x] `BlogPagination` component (`src/components/BlogPagination/`) — configurable pagination

### Phase 4 Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (blog routes + sitemap generated)
- [x] Blog listing, post detail, category pages all built
- [x] Blog sitemap generated at `/blog/sitemap.xml`

### Required Environment Variables
```
WP_API_URL=https://wp.zuzy.co.il/wp-json/wp/v2    # (optional, this is the default)
REVALIDATION_SECRET=<secure-secret>                  # Required for webhook
```

### WordPress Webhook Setup (Manual Step)
Configure WP to call on post publish/update:
```
POST https://www.zuzy.co.il/api/revalidate?secret=<REVALIDATION_SECRET>&slug=<post-slug>&type=post
```

---

## ✅ Phase 5 — Recovery Plan: Track W2 + W1-1 (2026-03-30)

**Source**: `RECOVERY-PLAN.md` Phase 2 — zuzy-website recovery
**Scope**: Brand token alignment, font replacement, Login CTA, page block foundation

### 5.1 — W2-1: Token Alignment ✅
- [x] Replaced primary color `#6750A4` → `#7354C4` across all CSS, config, and fallback values
- [x] Replaced accent color `#4CA3C7` → `#06B6D4` across all CSS, config, and fallback values
- [x] Updated `--radius` from `0.75rem` → `0.5rem` (12px → 8px)
- [x] Updated `--state-layer` rgba values to match new primary
- [x] Files modified: `globals.css`, `zuzy-design-tokens.css`, `SiteSettings/config.ts`, `layout.tsx`, `InitTheme/index.tsx`, `seed/index.ts`, `.docs/brand/zuzy-design-tokens.css`
- [x] Source of truth: `zuzy-brand-hub/CLAUDE.md` — Primary #7354C4, Cyan #06B6D4

### 5.2 — W2-2: Font Replacement ✅
- [x] Replaced FbCoherentiSans (local font) → IBM Plex Sans Hebrew (Google Fonts)
- [x] Using `next/font/google` with subsets `hebrew` + `latin`, weights 300-700
- [x] Updated `.docs/brand/zuzy-design-tokens.css` font reference
- [x] Old font files remain in `src/fonts/` (can be deleted in cleanup phase)

### 5.3 — W2-3: Login CTA Button ✅
- [x] Added Login button to Header nav (`src/Header/Nav/index.tsx`)
- [x] Links to `https://core.zuzy.co.il/login`
- [x] Styled as primary button with brand colors

### 5.4 — W1-1: Reusable Page Blocks ✅
- [x] **7 blocks already exist**: HeroBlock, FeaturesBlock, PricingBlock, FAQBlock, CTABlock, TestimonialsBlock, FormBlock (Contact Form)
- [x] **Created ComparisonTableBlock** — new block with columns/rows structure, category headers, ✓/✗ value rendering, highlighted column support
- [x] Registered in `RenderBlocks.tsx` and `Pages` collection config
- [x] Migration `20260330_005511_add_comparison_table_block` created and applied
- [x] Types regenerated (`pnpm generate:types`)

### Phase 5 Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (all pages generated)
- [x] Migration applied successfully
- [x] Types regenerated

**Total blocks available for page building: 18** (Archive, CallToAction, Content, MediaBlock, FormBlock, HeroBlock, FeaturesBlock, CTABlock, TestimonialsBlock, FAQBlock, PricingBlock, RichContentBlock, ProcessStepsBlock, RawHTML, Code, AppCostCalculator, AppGridBlock, ComparisonTableBlock)

---

## ✅ Phase 5b — W1-2: Homepage + W1-3: Platform Pages (2026-03-30)

**Scope**: Rebuild homepage seed with polished marketing content + create 9 platform pages (1 index + 8 module pages).

### 5b.1 — Homepage Seed Update ✅
- [x] Updated hero CTAs: "התחל בחינם" → `core.zuzy.co.il/auth/signup`, "גלה את הפלטפורמה" → `/platform`
- [x] Updated features to match actual platform modules (Rank Tracker, Site Audit, Content Editor, etc.)
- [x] Updated CTA block with signup + pricing CTAs
- [x] Added `jsonLdType: 'WebPage'` to homepage meta

### 5b.2 — Platform Pages Seed ✅
- [x] Created `src/endpoints/seed/platform-pages.ts` — 8 module definitions + page builder functions
- [x] **Platform Index** (`/platform`) — Hero + 8-module feature grid (4 columns) + ComparisonTableBlock (ZUZY vs Semrush vs Ahrefs) + CTA
- [x] **8 Module Pages** — each with Hero + 4 features (2 columns) + CTA
  - `/platform/rank-tracker`, `/platform/site-audit`, `/platform/copilot`, `/platform/content-editor`
  - `/platform/keyword-research`, `/platform/analytics`, `/platform/reports`, `/platform/pages`
- [x] CTA deep-link pattern: `core.zuzy.co.il/auth/signup?redirect=/[module]/` (D15)
- [x] All pages use `jsonLdType: 'WebPage'`, custom `breadcrumbLabel`

### 5b.3 — Platform Routes ✅
- [x] Created `src/app/(frontend)/platform/page.tsx` — platform index route
- [x] Created `src/app/(frontend)/platform/[slug]/page.tsx` — module detail route
- [x] Slug convention: `platform--rank-tracker` in Payload DB → `/platform/rank-tracker` URL
- [x] Breadcrumbs: Home > הפלטפורמה > [Module Name]
- [x] `generateStaticParams()` for build-time generation
- [x] `generateMetadata()` for SEO on all platform pages

### 5b.4 — Sitemap & Routing Fixes ✅
- [x] Updated `src/app/sitemap.ts` — converts `--` slugs to `/` for correct URLs
- [x] Updated `src/app/(frontend)/[slug]/page.tsx` — excludes `--` slugs from `generateStaticParams`
- [x] Updated `src/endpoints/seed-zuzy/index.ts` — seeds all platform pages with upsert pattern

### Phase 5b Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (45/45 static pages, platform routes registered)
- [x] All 9 platform pages return HTTP 200
- [x] SEO verified: title, description, JSON-LD (4 schemas per page), breadcrumbs
- [x] Sitemap includes all 9 platform URLs with correct paths
- [x] Existing pages (homepage, blog, contact) unaffected

---

## ✅ Phase 5c — W1-4: Pricing + W1-7: Legal Pages (2026-03-30)

**Scope**: Pricing page with 3 plans + FAQ, 5 legal pages (index + 4 detail), D17 short URL redirects.

### 5c.1 — Pricing Page (D14) ✅
- [x] Created `/pricing` page with 4 blocks: HeroBlock + PricingBlock (3 plans) + FAQBlock (6 Q&A) + CTABlock
- [x] Plans: Free (₪0), Pro (₪199, highlighted), Agency (₪499)
- [x] FAQ covers billing, upgrades, refunds, annual discount
- [x] SEO: `jsonLdType: 'WebPage'`, 5 JSON-LD schemas (incl. FAQ auto-detection)
- [x] Single page with hash fragments per D14 — no per-product split

### 5c.2 — Legal Pages (D17) ✅
- [x] Created `src/endpoints/seed/pricing-legal-pages.ts` — all pricing + legal page definitions
- [x] **Legal Index** (`/legal`) — Hero + FeaturesBlock linking to 4 legal pages
- [x] **4 Legal Detail Pages** — each with RichContentBlock placeholder content:
  - `/legal/terms` — תנאי שימוש
  - `/legal/privacy` — מדיניות פרטיות
  - `/legal/cookies` — מדיניות עוגיות
  - `/legal/security` — אבטחה
- [x] SEO: `robotsOverride: ['noarchive']` on all legal pages
- [x] Same `legal--` slug convention as platform pages

### 5c.3 — Legal Routes ✅
- [x] Created `src/app/(frontend)/legal/page.tsx` — legal index route
- [x] Created `src/app/(frontend)/legal/[slug]/page.tsx` — legal detail route
- [x] Breadcrumbs: Home > מידע משפטי > [Page Title]

### 5c.4 — D17 Short URL Redirects ✅
- [x] Added 3 permanent redirects in `redirects.js` (next.config.js):
  - `/privacy` → 308 → `/legal/privacy`
  - `/terms` → 308 → `/legal/terms`
  - `/accessibility` → 308 → `/legal/security`
- [x] Both with and without trailing slash handled

### Phase 5c Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (59/59 static pages)
- [x] All 6 new routes return HTTP 200
- [x] All 3 redirects return 308 with correct destination
- [x] Sitemap includes pricing + 5 legal pages
- [x] SEO verified: title, description, JSON-LD (5 schemas on pricing incl. FAQ)

---

## ✅ Phase 5d — W1-5: Services Pages (2026-03-30)

**Scope**: 6 services pages (1 index + 5 done-for-you services per D16).

### 5d.1 — Services Pages Seed ✅
- [x] Created `src/endpoints/seed/services-pages.ts` — 5 service definitions + index builder
- [x] **Services Index** (`/services`) — Hero + 5-service grid (3 columns) + CTA
- [x] **5 Service Pages** — each with Hero + 4 features + 3-step process + bold CTA:
  - `/services/seo-strategy` — אסטרטגיית SEO
  - `/services/content-optimization` — אופטימיזציית תוכן
  - `/services/technical-audit` — ביקורת טכנית
  - `/services/local-seo` — SEO מקומי
  - `/services/link-building` — בניית קישורים
- [x] Each service page uses HeroBlock + FeaturesBlock + ProcessStepsBlock + CTABlock

### 5d.2 — Services Routes ✅
- [x] Created `src/app/(frontend)/services/page.tsx` — services index route
- [x] Created `src/app/(frontend)/services/[slug]/page.tsx` — service detail route
- [x] Breadcrumbs: Home > שירותים > [Service Title]
- [x] Same `services--` slug convention

### Phase 5d Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (59/59 static pages)
- [x] All 6 services routes return HTTP 200
- [x] Sitemap includes all 6 services pages

---

## ✅ Phase 5e — W1-6: Solutions Pages (2026-03-30)

**Scope**: 5 solutions pages (1 index + 4 vertical audience pages).

### 5e.1 — Solutions Pages ✅
- [x] Created `src/endpoints/seed/solutions-pages.ts`
- [x] **Solutions Index** (`/solutions`) — Hero + 4-solution grid + CTA
- [x] **4 Solution Pages** — each with Hero + 4 features + bold CTA:
  - `/solutions/ecommerce` — חנויות אונליין
  - `/solutions/startups` — סטארטאפים
  - `/solutions/agencies` — סוכנויות
  - `/solutions/enterprise` — ארגונים
- [x] Routes: `src/app/(frontend)/solutions/page.tsx` + `[slug]/page.tsx`
- [x] Breadcrumbs: Home > פתרונות > [Solution Title]

### Phase 5e Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (65/65 static pages)
- [x] All 5 solutions routes return HTTP 200
- [x] Sitemap includes all 5 solutions pages

---

## ✅ Phase 5f — W1-8: Resources + W1-9: Support Pages (2026-03-30)

**Scope**: 11 pages — 6 resources + 5 support (D18: subdirectory, not subdomain).

### 5f.1 — Resources Pages (W1-8) ✅
- [x] Created `src/endpoints/seed/resources-support-pages.ts`
- [x] **Resources Index** (`/resources`) — Hero + 5-resource grid
- [x] **5 Resource Pages**: guides, glossary, webinars, api-docs, changelog
- [x] Routes: `src/app/(frontend)/resources/page.tsx` + `[slug]/page.tsx`

### 5f.2 — Support Pages (W1-9, D18) ✅
- [x] **Support Index** (`/support`) — Hero + 4-support grid
- [x] **4 Support Pages**: help-center, docs, status, contact
- [x] Routes: `src/app/(frontend)/support/page.tsx` + `[slug]/page.tsx`

### Phase 5f Verification
- [x] `tsc --noEmit` — zero errors
- [x] `pnpm build` — success (71/71 static pages)
- [x] All 11 routes return HTTP 200
- [x] Sitemap includes all resources + support pages

---

## ✅ RECOVERY-PLAN W1 Complete — All ~29 Marketing Pages Built

**Total pages built across Phases 5-5f**: 38 pages seeded in Payload CMS
- Homepage (updated) + 9 platform + 1 pricing + 6 legal + 6 services + 5 solutions + 6 resources + 5 support

**All pages render correctly** with: breadcrumbs, JSON-LD, SEO metadata, block-based content.
**Sitemap** includes all pages with correct URLs.

---

## ✅ W3-2 — Verify www Canonical (D9) (2026-03-30)

- [x] `zuzy.co.il` → 308 → `https://www.zuzy.co.il/` confirmed via curl
- [x] `www.zuzy.co.il` → 200 OK confirmed
- [x] Redirect handled by Vercel (not Next.js middleware) — correct architecture

---

## ✅ Recovery Phase (seohub stability) — completed in seohub/ workspace (2026-03-30)

---

## ✅ Phase 2 — Critical SEO Fixes (2026-03-27)

**Scope**: Fix template artifacts, remove conflicting configs, add missing canonical tags, fix known bugs.

### 2.1 — Fix OG siteName default ✅
- [x] Found `siteName: 'Payload Website Template'` in `src/utilities/mergeOpenGraph.ts` + 3 page files
- [x] Replaced all with "ZUZY" branding (`mergeOpenGraph.ts`, `search/page.tsx`, `posts/page.tsx`, `posts/page/[pageNumber]/page.tsx`)
- [x] `src/plugins/index.ts` SEO plugin `generateTitle` already uses `| ZUZY` suffix — correct

### 2.2 — Delete dual sitemap ✅
- [x] Deleted `next-sitemap.config.cjs` from project root
- [x] Removed `next-sitemap` from `package.json` dependencies
- [x] Removed `postbuild` script referencing `next-sitemap`
- [x] Deleted legacy `src/app/(frontend)/(sitemaps)/` route handlers (pages-sitemap.xml, posts-sitemap.xml)
- [x] `src/app/sitemap.ts` is now the ONLY sitemap source

### 2.3 — Add self-referencing canonical tags ✅
- [x] `src/lib/page-metadata.ts` already generates canonical URLs for all collection pages
- [x] Added canonical URLs to search, posts index, and posts pagination pages
- [x] Uses `getServerSideURL()` as canonical base

### 2.4 — Fix RawHTML block rendering in Posts ✅
- [x] Already implemented — `rawHtml` converter exists in `src/components/RichText/index.tsx` (line 58)

### 2.5 — Fix autosave interval ✅
- [x] Already set to `interval: 5000` in all 4 collections (Posts, Pages, BrandDocs, Products)

### 2.6 — Fix version bloat ✅
- [x] Already set to `maxPerDoc: 10` in all 4 collections

### Phase 2 Verification
- [x] `tsc --noEmit` — zero errors
- [x] Vercel production deploy — READY (`dpl_42aFm8fLccdCB86Et6zh1yoQKGVR`)
- [x] Local `.env` created via `vercel env pull` (production vars)
- [x] Git commit + push (811c242)
- [x] Local `pnpm build` — passed (32/32 static pages, earlier failure was transient DB connection issue)

---

## ✅ Phase 1 — Infrastructure & SiteSettings (2026-03-08)

### 1.1 — Supabase Media Storage ✅
- [x] `@payloadcms/storage-s3` installed and configured
- [x] Payload upgraded 3.78 → 3.79.0
- [x] Media uploads organized by `YYYY/MM/<uuid>/` in Supabase Storage
- [x] Direct URLs to Supabase (no `/api/media/file/` proxy)

### 1.2 — SiteSettings Global ✅
- [x] `src/SiteSettings/config.ts` — Global with 3 tabs (Branding, Theme, Custom Code)
- [x] Branding: logo, favicon, siteName fields — wired to Header + Footer
- [x] Theme: defaultTheme, primaryColor, accentColor — wired to CSS variables
- [x] Custom Code: customCSS, customJS — injected into frontend layout

### 1.3 — Design System ✅
- [x] ~~FbCoherentiSans~~ IBM Plex Sans Hebrew as primary Hebrew font (updated Phase 5)
- [x] Design tokens and utilities
- [x] AppGrid block with 8 app icons

### 1.4 — Blog Proxy ✅
- [x] `/blog` rewrite to `wp.zuzy.co.il` in next.config.js

---

## Architecture Notes

- **SiteSettings** is a Payload Global (singleton, not collection)
- **Read via:** `getCachedGlobal('site-settings')` from `src/utilities/getGlobals.ts`
- **Cache:** `revalidateTag('global_site-settings')` in afterChange hook
- **Media:** Supabase Storage via `@payloadcms/storage-s3`
- **Defaults:** primaryColor=#7C3AED, accentColor=#0D9488, defaultTheme=light, siteName=ZUZY
