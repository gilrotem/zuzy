# ZUZY — Tasks & Progress

> Living document. Status: ⬜ Not started | 🔄 In progress | ✅ Complete
> Phase history below. Find `🔜 Next Phase` for current work.
> Last updated: 2026-03-28

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

## 🔜 Next Phase: Phase 5c — W1-4: Pricing + W1-7: Legal Pages

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
- **Defaults:** primaryColor=#7354C4, accentColor=#06B6D4, defaultTheme=light, siteName=ZUZY
