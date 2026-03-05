# ZUZY Ground Zero — Project Brief for Fresh Session

> **Purpose:** This document is a complete briefing for a new Claude Code session.
> Read it fully before touching any code. It replaces all previous context.

---

## 1. Project Overview

**ZUZY** is a brand website built with **Payload CMS v3.78.0** + **Next.js 15** + **PostgreSQL** + **Lexical rich text editor**.

- **Repo:** `https://github.com/gilrotem/zuzy.git`
- **Framework:** Payload CMS 3.78 (latest v3), Next.js 15.4, React 19
- **Database:** PostgreSQL via `@payloadcms/db-postgres`
- **Rich Text:** Lexical (`@payloadcms/richtext-lexical`)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript, Hebrew-first UI (RTL), multi-locale content (he, en, ru, ar, fr, es)
- **Deploy:** Vercel (auto-deploy from git) + local dev

---

## 2. Project Structure

```
src/
├── app/(frontend)/          # Next.js frontend pages
│   ├── posts/[slug]/        # Individual post pages
│   ├── [slug]/              # Dynamic pages
│   ├── products/[slug]/     # Product pages
│   └── brand/[slug]/        # Brand doc pages
├── app/(payload)/           # Payload admin panel
├── blocks/                  # Content blocks (14 blocks)
│   ├── RawHTML/             # ⚠️ HTML rendering block — BROKEN on frontend
│   ├── Code/                # Syntax-highlighted code display
│   ├── HeroBlock/
│   ├── FeaturesBlock/
│   ├── CTABlock/
│   ├── FAQBlock/
│   ├── PricingBlock/
│   ├── RichContentBlock/
│   ├── ProcessStepsBlock/
│   ├── TestimonialsBlock/
│   ├── Banner/
│   ├── Content/
│   ├── MediaBlock/
│   ├── CallToAction/
│   ├── ArchiveBlock/
│   └── RenderBlocks.tsx     # Block renderer for Pages (layout field)
├── collections/
│   ├── Posts/index.ts       # Blog posts — uses Lexical richtext with inline blocks
│   ├── Pages/index.ts       # Site pages — uses layout blocks field
│   ├── Products.ts          # Product catalog
│   ├── BrandDocs.ts         # Brand knowledge base documents
│   ├── Media.ts
│   ├── Categories.ts
│   ├── ProductCategories.ts
│   └── Users/
├── components/
│   └── RichText/index.tsx   # ⚠️ Lexical → JSX converter — MISSING rawHtml block
├── fields/
│   └── defaultLexical.ts    # Default editor (basic: bold, italic, link, paragraph)
├── heros/                   # Hero section variants
├── plugins/index.ts         # SEO, forms, redirects, search, nested-docs
└── payload.config.ts        # Main config
```

---

## 3. Critical Bugs to Fix

### BUG #1 — RawHTML block doesn't render on post frontend (CRITICAL)

**Symptom:** User adds a RawHTML block inside a Post's rich text content. It saves fine in the admin, but on the frontend the HTML is not rendered at all — it's invisible.

**Root cause:** The file `src/components/RichText/index.tsx` converts Lexical blocks to JSX for frontend rendering. It has converters for `banner`, `mediaBlock`, `code`, and `cta` — but **`rawHtml` is missing**.

**Fix:** In `src/components/RichText/index.tsx`, add to the `blocks` object inside `jsxConverters`:

```typescript
rawHtml: ({ node }) => (
  <div className="col-start-2 my-4" dangerouslySetInnerHTML={{ __html: node.fields.html || '' }} />
),
```

Also add `RawHTMLBlock` type to the `NodeTypes` union if needed for type safety.

### BUG #2 — Code block vs RawHTML confusion

**Symptom:** User pastes HTML into the Code block expecting it to render as a page element. Instead it displays as syntax-highlighted source code (like a code snippet).

**This is not a bug — it's a UX confusion.** The Code block (`src/blocks/Code/`) is designed to DISPLAY code with syntax highlighting (using prism-react-renderer). The RawHTML block (`src/blocks/RawHTML/`) is designed to RENDER HTML on the page.

**Fix:** Make labels clearer in the admin so the user understands the difference:
- Code block: Already labeled "Code" — fine as is
- RawHTML block: Already labeled "HTML חופשי" — fine, but fixing Bug #1 will make it actually work

### BUG #3 — Autosave too aggressive → save errors

**Symptom:** Editor is sluggish, saves throw errors, every keystroke triggers a save cycle.

**Root cause:** All collections with drafts have `autosave.interval: 1500` (1.5 seconds). With a multi-locale PostgreSQL setup and 6 locales, this creates constant DB pressure.

**Fix:** In these files, change `interval: 1500` to `interval: 5000` (or remove autosave and rely on manual save):
- `src/collections/Posts/index.ts` — line with `interval: 1500`
- `src/collections/Pages/index.ts` — line with `interval: 1500`
- `src/collections/BrandDocs.ts` — line with `interval: 1500`
- `src/collections/Products.ts` — line with `interval: 1500`

### BUG #4 — Version bloat causing DB pressure

**Symptom:** Slow admin, database growing fast.

**Root cause:** `maxPerDoc: 50` across all collections. Combined with aggressive autosave, this creates massive version tables.

**Fix:** Change `maxPerDoc: 50` to `maxPerDoc: 10` in all 4 collections listed above.

---

## 4. After Fixing Bugs — Verify

Run these checks after applying fixes:

```bash
# 1. TypeScript check
npx tsc --noEmit

# 2. Regenerate types (if you changed any collection schemas)
pnpm generate:types

# 3. Regenerate import map (if you added/moved components)
pnpm generate:importmap

# 4. Dev server runs clean
pnpm dev
```

### Manual test checklist:
1. Create a new Post → add a RawHTML block → paste `<h2 style="color:red">Test</h2>` → publish → view on frontend → should render as red heading
2. Create a new Post → add a Code block → paste some code → publish → view on frontend → should show syntax-highlighted code
3. Edit an existing Page → add/remove blocks → save → no errors
4. Check the admin panel feels responsive (no constant save flicker)

---

## 5. Architecture Notes (for context, not for changes)

### Two different block rendering paths:
1. **Pages** use a `layout` field (type: blocks) → rendered by `src/blocks/RenderBlocks.tsx`
   - RenderBlocks.tsx already includes `rawHtml: RawHTMLBlock` ✅
2. **Posts** use a `content` field (type: richText/Lexical) with inline BlocksFeature → rendered by `src/components/RichText/index.tsx`
   - RichText/index.tsx is MISSING the rawHtml converter ❌ ← **This is Bug #1**

### Block availability:
- **Pages** have 15 block types in the layout field (all marketing blocks + RawHTML + Code)
- **Posts** have 4 block types in the rich text (Banner, Code, MediaBlock, RawHTML)

### Database:
- PostgreSQL via `@payloadcms/db-postgres`
- Migrations in `src/migrations/`
- Connection string from `DATABASE_URL` env var

### Plugins active:
- `@payloadcms/plugin-seo` — SEO fields on Posts, Pages, Products, BrandDocs
- `@payloadcms/plugin-form-builder` — Contact forms
- `@payloadcms/plugin-redirects` — URL redirects
- `@payloadcms/plugin-search` — Search indexing (posts, products, brand-docs)
- `@payloadcms/plugin-nested-docs` — Category nesting

---

## 6. Working Rules

- **Language:** Code in English, comments in English, UI labels in Hebrew+English (localized)
- **Don't touch** `ZUZY-PROJECT-BRIEF.md` unless the user explicitly asks — it's the project source of truth
- **Always run `npx tsc --noEmit`** after code changes before saying "done"
- **Always test in browser** after changes — don't assume it works
- **Don't create new migrations** unless you actually change collection schemas (field additions/removals). Fixing component rendering does NOT require a migration.
- **Git:** Commit with clear messages. Format: `fix: description` or `feat: description`

---

## 7. Priority Order

1. Fix Bug #1 (RawHTML in RichText converter) — this is the user's main blocker
2. Fix Bug #3 (autosave interval 1500→5000)
3. Fix Bug #4 (maxPerDoc 50→10)
4. Verify with `tsc --noEmit` + dev server + manual test
5. Git commit + push
