# ZUZY — Tasks & Progress

> Living document. Status: ⬜ Not started | 🔄 In progress | ✅ Complete
> Phase history below. Find `🔜 Next Phase` for current work.
> Last updated: 2026-03-27

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
- [ ] Local `pnpm build` — fails on `/brand/*` pages (pre-existing bug, see Bug #5 below)

---

## Known Bugs

### Bug #5 — Local build fails on `/brand/*` static page generation
- **Error**: `Failed query` on `brand_docs` table — Lexical `content` field schema mismatch
- **Impact**: Local `pnpm build` fails at "Generating static pages" for `/brand/essence`, `/brand/process`
- **Does NOT affect Vercel**: Production deploys successfully (uses ISR/SSR, not full static export)
- **Root cause**: `brand_docs` collection schema expects localized `content` column structure that doesn't match the current DB state
- **Fix**: Either run Payload migration to align schema, or republish brand_docs content in admin panel
- **Priority**: Low (production works), but should fix before Phase 3

---

## 🔜 Next Phase: Phase 3 — SEO System Build
- **Spec**: `../zuzy-architecture/SEO-SYSTEM-SPEC.md` (7-step build plan)
- **Scope**: Full RankMath-equivalent SEO control system
- **Dependency**: Phase 2 ✅
- **Note**: Fix Bug #5 first or confirm it doesn't block Phase 3 work

### Then: Phase 4 — Blog Architecture
- **Decision D10 must be resolved first** (blog SEO meta ownership)
- **Scope**: Replace `/blog` proxy with WP REST API fetch + Next.js rendering
- **Dependency**: Phase 3 ✅ + D10 resolved

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
- [x] FbCoherentiSans as primary Hebrew font
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
- **Defaults:** primaryColor=#6750A4, accentColor=#4CA3C7, defaultTheme=light, siteName=ZUZY
