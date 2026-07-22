# zuzy-website — LOCKED ARCHITECTURE (loaded via @import from CLAUDE.md)

## LOCKED ARCHITECTURE — DO NOT MODIFY WITHOUT EXPLICIT USER OVERRIDE

> Set 2026-04-29 to end recurring blog/WP/Posts conflicts. Future agents: STOP and ask before touching any of these. (Moved here from CLAUDE.md 2026-07-22 — same force, better packaging.)

**Three domains. Three roles. Zero overlap.**

**The mental model — reconstruct this before acting; every rule below derives from it:**
- **www = the face.** Payload + Next.js renders EVERYTHING Google sees — marketing pages AND the blog.
- **wp = the typewriter.** Writers (and seohub's content push) type there; it serves JSON to www and is invisible to the world.
- **core = the app.** A different project, a different workspace. Not yours.
- **Google sees exactly ONE site: `www.zuzy.co.il`.**

**Re-grounding rule:** before ANY change touching blog routes, redirects, robots, sitemap, nav, or URL structure — re-read this LOCKED ARCHITECTURE block in full. If you are unsure which system owns a URL: STOP and ask, never infer. The typical-Payload prior ("blog = a Payload Posts collection") is exactly the hallucination that repeatedly recreated deleted code here.

| Domain | Role | Indexed? |
|---|---|---|
| `zuzy.co.il` / `www.zuzy.co.il` | The public site (Payload + Next.js). Marketing pages + blog at `/blog/*`. | ✅ The only thing Google indexes |
| `wp.zuzy.co.il` | Headless WordPress backend. `/wp-admin/` for editors + `/wp-json/` for Next.js to fetch. Every other URL 308-redirects to `/blog/*` and serves `X-Robots-Tag: noindex`. | ❌ Invisible |
| `core.zuzy.co.il` | seohub SaaS app shell (separate project, separate workspace). | ❌ Invisible |

**Blog data flow** — single source of truth for blog content:
```
Editor → wp-admin → WP DB
       → WP webhook hits zuzy.co.il/api/revalidate
       → Next.js fetches wp.zuzy.co.il/wp-json/wp/v2/posts
       → Renders at zuzy.co.il/blog/[slug]
       → Google sees only zuzy.co.il/blog/[slug]
```

**Hard rules — DO NOT BREAK:**
1. The blog lives at exactly **one** URL space: `/blog/*`. Do NOT recreate `/posts/*`, do NOT add a Payload `Posts` collection. Both were deleted 2026-04-29 along with `RelatedPosts`, `ArchiveBlock`, `Card`, `CollectionArchive`, `PostHero`. They are not coming back.
2. `wp.zuzy.co.il` frontend is never user-facing. Guardrails enforced by `wp-content/mu-plugins/zuzy-headless-guardrails.php` (lives on the WP server, not in this repo).
3. Never modify `wp.zuzy.co.il/robots.txt`, `wp-sitemap.xml`, or the WP frontend redirect logic without explicit user approval. The WP-side mu-plugin owns this.
4. The OTHER subdomains visible in Hostinger DNS (`gpr-smart-agent`, `magnet`, `seo-rank-tracker`, `app`, `yaron`, `dagim`, `avi`, `sami-hacabai`, `effective`, `helga`, `gpa`, `links`) are **unrelated projects on Lovable.dev / external hosts**. They are not part of zuzy-website and must not be referenced or modified from this workspace.
5. **Legal pages: ONE hub (locked 2026-06-11).** All legal/compliance pages live ONLY at `www.zuzy.co.il/legal/*`. Subdomains and other systems link INTO the hub from their footers — never create a legal page on a subdomain or a second copy anywhere (drift already happened once: core had 6 pages, www had 4, texts diverged). core's `/legal/*` duplicates are scheduled to 301 into the hub (seohub workspace's job). If a product ever needs distinct terms, that is a new document inside the hub (e.g. `/legal/terms-core`), never a parallel hub.

If a future task seems to require violating any of these rules: **STOP and ask the user.** This is non-negotiable.

## Domain Architecture

```
zuzy.co.il          → 308 → www.zuzy.co.il (D9)
www.zuzy.co.il      → THIS PROJECT (Payload CMS + Next.js) — ALL marketing, ALL SEO
wp.zuzy.co.il       → WordPress headless backend (D2)
                      • /wp-admin/  → admin UI (editors only)
                      • /wp-json/   → REST API (Next.js fetches blog content)
                      • everything else → 308 → www.zuzy.co.il/blog/...
                      • X-Robots-Tag: noindex on all responses
                      • wp-sitemap.xml disabled
                      • Enforced by mu-plugin: wp-content/mu-plugins/zuzy-headless-guardrails.php
core.zuzy.co.il     → seohub app (separate project, separate workspace) — D1
                      • noindex
```

**Core principle:** www.zuzy.co.il = the brand, the authority, the SEO machine. Subdomains = backends/apps, invisible to Google (D1).

## URL Architecture (D12-D18) — current live state, verified 2026-04-29

Two patterns coexist (this is real, not a bug):

**Pattern A — Slug-prefix nesting** (`platform--rank-tracker` → `/platform/rank-tracker`):
- `/platform/`, `/platform/[module]/` — 1 index + 8 modules
- `/services/`, `/services/[slug]/` — 1 index + 5 services
- `/solutions/`, `/solutions/[slug]/` — 1 index + 4 solutions
- `/legal/`, `/legal/[slug]/` — 1 index + 4 legal pages

**Pattern B — Flat top-level Pages** (legacy seed, slugs without prefix):
- `/resources/`, `/support/` — index pages
- `/help-center`, `/docs`, `/guides`, `/glossary`, `/webinars`, `/api-docs`, `/changelog` — children of /resources and /support are at root, NOT nested. Live sitemap confirms.

**Other URL spaces:**
- `/` — homepage (Payload Page slug=`home`)
- `/pricing` — single pricing page (D14)
- `/blog/*` — WordPress-sourced blog (D2, D10, D12)
  - `/blog/`, `/blog/[slug]/`, `/blog/category/[name]/`, `/blog/page/[n]/`, `/blog/category/[name]/page/[n]/`
- `/products/[slug]` — Products collection (Payload, localized)
- `/brand-docs/[slug]` — Brand knowledge base (Payload, localized)
- `/brand-docs/design-system` — visual design system showcase
- `/contact`, `/design-system`, `/status` — Pages collection at root
- `/search` — site search (noindex)
- `/[slug]` — catch-all for any other Pages collection slug
- `/admin` — Payload admin (editor login, noindex)
- `/api/*` — Payload + Next API routes (noindex)

**Redirects** (in `redirects.js`, all 308):
- `/privacy` → `/legal/privacy`
- `/terms` → `/legal/terms`
- `/accessibility` → `/legal/security`

If pages need to migrate from Pattern B → Pattern A (e.g., `/help-center` → `/support/help-center`), that's a separate phase requiring SEO sign-off (URL change = redirect chain).
