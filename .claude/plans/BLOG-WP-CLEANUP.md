# Blog / WP Architecture Cleanup — End-The-Saga Plan

> **Status:** DRAFT. Awaiting user approval. **No code or doc changes will be made until each phase is approved.**
> **Created:** 2026-04-29
> **Trigger:** User asked for a deep, no-shortcuts cleanup so the recurring blog/WP conflicts stop, and so future agents do not get lost.

---

## 1. Why this keeps happening (root cause)

The recurring spaghetti is **layer-on-layer drift**, not a one-off bug:

| Phase | What was added | What was NOT removed | Result |
|---|---|---|---|
| Phase 1 (2026-03-08) | Payload starter `Posts` collection + `/posts/*` routes (template default) | — | Initial duplicate system seeded. |
| Phase 1.4 (~2026-03-25) | `/blog` PROXY rewrite to `wp.zuzy.co.il` in `next.config.js` | Payload `Posts` left wired | Two blog systems now coexist. |
| Phase 4 (2026-03-28) | Replaced proxy with Next.js fetching WP REST API at `/blog/*`, deleted the proxy rewrite | (a) WP-side guardrails (noindex / redirect) never added on the WP server. (b) `/posts/*` routes still wired. (c) `OVERVIEW.md` still says "proxy". (d) `SYNC-LOG.md` still shows the old proxy entry as ✅ active. (e) `ZUZY-PROJECT-BRIEF.md` still describes `/posts/[slug]` as the blog. | Duplicate content surface live on TWO domains. Docs say one thing, code says another. |

So the rule going forward: **when an architecture changes, the previous layer must die in the same PR — collection, routes, plugin entries, seed, navigation, docs, sync-log, brief, memory.** This plan does that retroactively.

---

## 2. Confirmed reality (snapshot 2026-04-29)

### 2.1 Live SEO surface (verified via WebFetch)

| URL | Status | Problem |
|---|---|---|
| `https://www.zuzy.co.il/blog/hello-world/` | 200 — Next.js renders WP post correctly | ✅ correct |
| `https://wp.zuzy.co.il/hello-world/` | 200 — full Twenty Twenty-Five WP frontend | ❌ duplicate of canonical, no noindex, no redirect |
| `https://wp.zuzy.co.il/robots.txt` | Default WP robots — only `/wp-admin/` blocked | ❌ violates D2 ("wp.zuzy.co.il = noindex") |
| `https://wp.zuzy.co.il/wp-sitemap.xml` | Live, exposes posts/pages/categories/**users** sub-sitemaps | ❌ author archives indexable, full duplicate sitemap public |
| `https://www.zuzy.co.il/posts` | 200 — renders 3 demo posts ("Dollar and Sense", "Global Gaze", "Digital Horizons") | ❌ Payload starter seed data live; robots.txt Disallows but Google can still index URLs that have inbound links |
| `https://www.zuzy.co.il/robots.txt` | Has `Disallow: /posts` and `/posts/*` | ✅ defensive, but doesn't fix the real problem |
| `https://www.zuzy.co.il/sitemap.xml` | Excludes `/posts/*` | ✅ correct |
| `https://core.zuzy.co.il/` | Marketing landing page ("ZUZY4SEO") | ⚠️ CLAUDE.md says this should be the seohub app shell (noindex). **Needs user clarification — out of scope for this workspace.** |

### 2.2 Codebase wiring (Payload Posts duplicate system)

The duplicate `/posts/*` system is wired in **23+ locations**. Concrete inventory:

**Routes (3 files — all Payload-rendered, public, robots-Disallow only):**
- [src/app/(frontend)/posts/page.tsx](src/app/(frontend)/posts/page.tsx) — archive listing
- [src/app/(frontend)/posts/[slug]/page.tsx](src/app/(frontend)/posts/[slug]/page.tsx) — post detail
- [src/app/(frontend)/posts/page/[pageNumber]/page.tsx](src/app/(frontend)/posts/page/[pageNumber]/page.tsx) — paginated archive

**Collection (Payload):**
- [src/collections/Posts/index.ts](src/collections/Posts/index.ts) — collection definition + hooks
- [src/collections/Posts/hooks/revalidatePost.ts](src/collections/Posts/hooks/revalidatePost.ts:14) — revalidates `/posts/[slug]`

**Registered in:**
- [src/payload.config.ts:17,90](src/payload.config.ts:17) — imported and registered in `collections`
- [src/plugins/index.ts:14](src/plugins/index.ts:14) — `Post` type imported
- [src/plugins/index.ts:17,21](src/plugins/index.ts:17) — `Post` in `generateTitle` / `generateURL` union
- [src/plugins/index.ts:70](src/plugins/index.ts:70) — `redirectsPlugin` collections: `['pages', 'posts', ...]`
- [src/plugins/index.ts:126](src/plugins/index.ts:126) — `searchPlugin` collections: `['pages', 'posts', ...]`
- [src/search/beforeSync.ts](src/search/beforeSync.ts) — search sync handles Posts

**Seed (re-injects the duplicate system every reseed):**
- [src/endpoints/seed/post-1.ts](src/endpoints/seed/post-1.ts) — "Digital Horizons"
- [src/endpoints/seed/post-2.ts](src/endpoints/seed/post-2.ts) — "Global Gaze"
- [src/endpoints/seed/post-3.ts](src/endpoints/seed/post-3.ts) — "Dollar and Sense"
- [src/endpoints/seed/index.ts:9-11,18,159-211,242-249](src/endpoints/seed/index.ts:9) — imports, clears, creates, relates posts AND seeds Header nav with `Posts → /posts`

**Block / component dependents:**
- [src/blocks/RelatedPosts/Component.tsx](src/blocks/RelatedPosts/Component.tsx) — uses `relationTo="posts"`
- [src/blocks/ArchiveBlock/Component.tsx:29-44](src/blocks/ArchiveBlock/Component.tsx:29) — queries `collection: 'posts'` directly
- [src/components/Card/index.tsx:17,30](src/components/Card/index.tsx:17) — builds `/posts/[slug]` href
- [src/components/CollectionArchive/index.tsx:21](src/components/CollectionArchive/index.tsx:21) — passes `relationTo="posts"`
- [src/heros/PostHero/](src/heros/PostHero/) — Posts hero (only used by `/posts/[slug]`)

**Defensive plumbing (works around the duplicate but doesn't fix it):**
- [src/lib/seo-config.ts:9-13,30](src/lib/seo-config.ts:9) — `INDEXABLE_COLLECTIONS` excludes `posts`; `BLOCKED_PATHS` includes `/posts`
- [src/app/robots.ts:25-27](src/app/robots.ts:25) — `DEFAULT_DISALLOW` includes `/posts`, `/posts/*`, `/posts/page/*`

**Migrations:** posts table is in current schema; deleting the collection requires a new Payload migration.

### 2.3 Documentation drift

| File | Drift |
|---|---|
| [ZUZY-PROJECT-BRIEF.md:10](ZUZY-PROJECT-BRIEF.md:10) | Says Payload **v3.78** — actual is 3.79 |
| [ZUZY-PROJECT-BRIEF.md:28-30](ZUZY-PROJECT-BRIEF.md:28) | Lists `/posts/[slug]` as "Individual post pages" — implies Posts is the blog. No mention of `/blog/*`. |
| [ZUZY-PROJECT-BRIEF.md:32-48](ZUZY-PROJECT-BRIEF.md:32) | Lists 14 blocks — actual is 18 |
| [ZUZY-PROJECT-BRIEF.md:71-115](ZUZY-PROJECT-BRIEF.md:71) | Documents BUG #1, #3, #4 as PENDING — all closed in Phase 2 ✅ |
| [../zuzy-architecture/OVERVIEW.md:50](../zuzy-architecture/OVERVIEW.md:50) | "content served via zuzy.co.il/blog **proxy**" — proxy was removed in Phase 4 |
| [../zuzy-architecture/DECISIONS-LOG.md](../zuzy-architecture/DECISIONS-LOG.md) D2 | Says wp = noindex — reality contradicts (no noindex on WP) |
| [../zuzy-architecture/SYNC-LOG.md:14](../zuzy-architecture/SYNC-LOG.md:14) | D10-D18 sitemap entry still 🔄 In Progress — actually all completed in Phases 5-5f ✅ |
| [../zuzy-architecture/SYNC-LOG.md:23](../zuzy-architecture/SYNC-LOG.md:23) | "Blog proxy `/blog` → `wp.zuzy.co.il` ✅ Done" — proxy was reverted in Phase 4, entry should be marked deprecated |
| [../zuzy-architecture/SYNC-LOG.md:25](../zuzy-architecture/SYNC-LOG.md:25) | "robots.txt `Disallow: /` set on core.zuzy.co.il" — reality: core.zuzy.co.il now serves a marketing landing page. **User to clarify.** |
| [../zuzy-architecture/DNS-RECORDS.md](../zuzy-architecture/DNS-RECORDS.md) | Last updated 2026-03-19. **No `wp` or `core` records visible** in the file — both subdomains resolve and serve content, so file is incomplete |
| [CLAUDE.md URL Architecture](CLAUDE.md) | Documents `/support/help-center`, `/support/docs`, `/resources/guides`, `/resources/glossary` — but live sitemap shows them at root (`/help-center`, `/docs`, `/guides`, `/glossary`). **Either docs lie or pages were never nested.** Needs decision. |

### 2.4 Memory files

All memory files reviewed — clean, no stale conflicts with this plan, but one tension to surface:

- `feedback_no-redirects-fresh-site.md` says "never add redirects on a fresh site." User explicitly chose option B (308 redirect on the WP side). The memory's intent is about redirects on the Next.js side as band-aids for wrong URLs. The WP→canonical redirect serves a different purpose (preventing duplicate content on a separate subdomain). **Not a true conflict, but worth a one-line note in memory after this work.**

### 2.5 Cross-project boundary check

Per [../zuzy-architecture/ORCHESTRATION-PROTOCOL.md](../zuzy-architecture/ORCHESTRATION-PROTOCOL.md), this workspace can ONLY modify `zuzy-website/`. Cross-workspace impacts:

| Subdomain | Impact of this plan | Action |
|---|---|---|
| `wp.zuzy.co.il` | WP-server changes — Gil executes manually with snippets I provide | User executes |
| `core.zuzy.co.il` | None from this plan. But its current state (marketing landing) contradicts CLAUDE.md — flag only | User clarifies, no edits |
| `gpr-smart-agent`, `magnet`, `seo-rank-tracker`, `app`, `yaron`, `dagim`, `avi`, `sami-hacabai`, `effective`, `helga`, `gpa`, `links` | All Lovable.dev / external hosts. NOT touched by this plan. | None |
| Mail (Hostinger, Brevo records) | Not affected | None |
| `*.zuzy.co.il` wildcard? | DNS-RECORDS.md doesn't show one explicitly. Need user to confirm whether wp/core are CNAMEs to Vercel/elsewhere or wildcards | User to confirm and update DNS-RECORDS.md |

---

## 3. Cleanup phases (gated on approval)

Each phase is **independently approvable**. I will not start a phase without an explicit "yes" on that phase. Phase A is pure WP-side; Phase B is the big codebase change.

### Phase A — STOP THE LEAK on WP server (urgency: high, reversible)

**Goal:** wp.zuzy.co.il stops serving public, indexable content. User chose option B (308 redirect).

User executes on WP server. I provide the exact snippet. **NO code changes in this repo for Phase A.**

**Snippet 1 — single mu-plugin file `wp-content/mu-plugins/zuzy-headless-guardrails.php`:**

```php
<?php
/**
 * Plugin Name: ZUZY Headless Guardrails
 * Description: Forces wp.zuzy.co.il to behave as a headless backend.
 *              Blocks public frontend, disables WP sitemap, redirects to canonical.
 * Version: 1.0
 */

if (!defined('ABSPATH')) exit;

// 1. Disable WP's own sitemap so Google only finds zuzy.co.il sitemaps.
add_filter('wp_sitemaps_enabled', '__return_false');

// 2. Send X-Robots-Tag: noindex on every frontend response (defence in depth).
add_action('send_headers', function () {
    if (is_admin()) return;
    header('X-Robots-Tag: noindex, nofollow', true);
});

// 3. 308 redirect every public frontend URL to the canonical zuzy.co.il/blog/ equivalent.
//    Keep /wp-admin, /wp-json, /wp-login.php, /wp-cron.php, /xmlrpc.php accessible.
add_action('template_redirect', function () {
    $req = $_SERVER['REQUEST_URI'] ?? '/';

    // Allowlist
    $allow_prefixes = ['/wp-admin', '/wp-json', '/wp-login.php', '/wp-cron.php', '/xmlrpc.php', '/wp-content', '/wp-includes'];
    foreach ($allow_prefixes as $p) {
        if (strpos($req, $p) === 0) return;
    }

    // Build canonical destination on zuzy.co.il/blog
    $canonical_base = 'https://www.zuzy.co.il/blog';

    // Single post: redirect /[slug]/ → /blog/[slug]/
    if (is_singular('post')) {
        $slug = get_post_field('post_name', get_queried_object_id());
        wp_redirect($canonical_base . '/' . $slug . '/', 308);
        exit;
    }

    // Category archive: /category/[name]/ → /blog/category/[name]/
    if (is_category()) {
        $term = get_queried_object();
        wp_redirect($canonical_base . '/category/' . $term->slug . '/', 308);
        exit;
    }

    // Anything else on frontend (homepage, author archives, tags, dates, search, pages):
    // bounce to /blog index.
    wp_redirect($canonical_base . '/', 308);
    exit;
});
```

**Why mu-plugin (not theme `functions.php`):**
- Survives theme switches.
- Cannot be deactivated from the admin UI by accident.
- Single self-documented file. Reversible by deleting it.

**Verification after Gil deploys it (I'll run via WebFetch):**
- `wp.zuzy.co.il/hello-world/` → 308 → `www.zuzy.co.il/blog/hello-world/`
- `wp.zuzy.co.il/wp-sitemap.xml` → 404 or empty
- `wp.zuzy.co.il/wp-json/wp/v2/posts` → 200 (still works, Next.js still gets data)
- `wp.zuzy.co.il/wp-admin/` → loads (admin still works)
- `www.zuzy.co.il/blog/hello-world/` → 200 (canonical render unchanged)

**Risk:** If the WP REST API path were `/wp-json/*` AND we accidentally caught it in the redirect, the Next.js blog would break. The allowlist above prevents this — verified by the order of checks. Reversible: delete the mu-plugin file.

---

### Phase B — DELETE THE DUPLICATE `/posts/*` SYSTEM from this repo (urgency: medium, harder to reverse — needs migration)

**Goal:** End the Payload Posts collection. `/blog/*` is the only blog. No more duplicate URL space.

**This phase is destructive — Payload migration drops the `posts` table.** Current data: only the 3 demo posts. User confirms loss is acceptable. (If user has any custom Payload Posts content, this phase pauses.)

**B.1 — Routes (delete):**
- `src/app/(frontend)/posts/page.tsx`
- `src/app/(frontend)/posts/page.client.tsx` (if exists)
- `src/app/(frontend)/posts/[slug]/page.tsx`
- `src/app/(frontend)/posts/[slug]/page.client.tsx` (if exists)
- `src/app/(frontend)/posts/page/[pageNumber]/page.tsx`
- Whole `src/app/(frontend)/posts/` directory removed.

**B.2 — Collection (delete + Payload migration):**
- Delete `src/collections/Posts/` (entire directory: `index.ts`, hooks, fields).
- Remove import + registration from `src/payload.config.ts`.
- Run `pnpm payload migrate:create drop_posts_collection` — Payload will auto-generate a migration that drops `posts`, `posts_blocks_*`, `posts_rels`, `_posts_v*` tables.
- Apply locally first, verify, then commit.

**B.3 — Plugins (edit):**
- `src/plugins/index.ts`:
  - Remove `Post` from `import { Page, Post, Product, BrandDoc } from '@/payload-types'`
  - Update `generateTitle` / `generateURL` generic unions to drop `Post`
  - Remove `'posts'` from `redirectsPlugin` collections array
  - Remove `'posts'` from `searchPlugin` collections array

**B.4 — Search sync (edit):**
- `src/search/beforeSync.ts` — remove any branch handling Posts. Verify it still compiles.

**B.5 — Blocks / components dependents:**
- `src/blocks/RelatedPosts/` — delete entire directory; remove from `RenderBlocks.tsx` and from any collection that includes it.
- `src/blocks/ArchiveBlock/` — Archive currently queries `collection: 'posts'`. Decision needed:
  - **Option B5a (recommended):** delete the block entirely. It was a Payload starter feature that no current page uses (verify via grep first).
  - **Option B5b:** keep it but rewire to query `pages` or `products`. Skip unless user wants archive functionality elsewhere.
- `src/components/Card/index.tsx` — remove the `'posts'` branch in `relationTo` typing and href construction. If Card is only used by Posts/RelatedPosts, delete it.
- `src/components/CollectionArchive/index.tsx` — delete if only used by ArchiveBlock.
- `src/heros/PostHero/` — delete (only used by `/posts/[slug]`).

**B.6 — Seed (edit):**
- `src/endpoints/seed/post-1.ts`, `post-2.ts`, `post-3.ts` — delete files.
- `src/endpoints/seed/index.ts`:
  - Remove imports of post1/2/3
  - Remove `'posts'` from `collections` clear array
  - Remove the entire posts seeding block (lines ~159-211)
  - Remove the `Posts → /posts` Header nav entry (lines ~242-249)
- `src/endpoints/seed/image-post1.ts`, `image-post2.ts` — delete if only used by post seeds.

**B.7 — SEO config (edit):**
- `src/lib/seo-config.ts`:
  - Remove `'/posts'` from `BLOCKED_PATHS`
- `src/app/robots.ts`:
  - Remove `'/posts'`, `'/posts/*'`, `'/posts/page/*'` from `DEFAULT_DISALLOW`

**B.8 — Header global default (Payload data):**
- The Posts nav entry is **stored in the Payload database** (Header global). After deleting the seed entry, Gil must also remove the entry from the live Header global in the admin (or run a one-off script). Otherwise the live nav will keep showing "Posts → /posts" pointing to a 404.

**B.9 — Regenerate:**
- `pnpm generate:types` — `Post` type disappears
- `pnpm generate:importmap` — drop removed components
- `npx tsc --noEmit` — must pass
- `pnpm build` — must pass

**B.10 — Verify:**
- `https://www.zuzy.co.il/posts/` → 404 (after deploy)
- `https://www.zuzy.co.il/posts/digital-horizons/` → 404
- `https://www.zuzy.co.il/sitemap.xml` → still excludes posts (now naturally)
- `https://www.zuzy.co.il/blog/` → unchanged
- Admin panel `/admin` → loads, no Posts in collections list

**Reversibility:** revert the commit before deploying the migration to production. After production migration runs, the `posts` table is gone — recoverable only from a Supabase backup.

---

### Phase C — DOCUMENTATION ALIGNMENT (urgency: medium, low risk)

**Goal:** Every doc reflects the current reality. Future agents read consistent truth.

**C.1 — `ZUZY-PROJECT-BRIEF.md`:**
- Two options:
  - **C1a (recommended):** **delete the file entirely.** Its content is mostly a stale snapshot; everything still relevant is already in `CLAUDE.md`. CLAUDE.md is the single source of truth.
  - C1b: rewrite top-to-bottom to reflect 2026-04-29 state. More work, more drift surface.
- Pick one. Default to C1a unless user disagrees.

**C.2 — `CLAUDE.md` (this project):**
- "URL Architecture" section: reconcile with reality. Live sitemap shows pages at root (`/help-center`, `/docs`, `/guides`) — either:
  - **C2a:** update CLAUDE.md to document the actual flat URLs, OR
  - **C2b:** decide nested URLs are correct and rebuild the pages (separate phase, NOT this plan).
  - Default: C2a (reflect reality).
- Add a one-line lock: "Blog architecture: `/blog/*` is rendered by Next.js from the WP REST API. There is **no** Payload `Posts` collection and **no** `/posts/*` routes. Do not re-add."
- Update "CMS Structure → Collections" section: remove Posts.
- Update "Two Block Rendering Paths" section: only one path now (Pages → blocks). Remove Posts/Lexical reference (or note it's used only by other collections like BrandDocs).

**C.3 — `../zuzy-architecture/OVERVIEW.md` (READ-ONLY for this workspace):**
- Line 50: change "via zuzy.co.il/blog **proxy**" → "via zuzy.co.il/blog (Next.js fetches WP REST API)".
- **I cannot edit this file** per ORCHESTRATION-PROTOCOL. **I will write the exact diff and ask Gil to apply it manually**, OR get explicit override permission for this one edit.

**C.4 — `../zuzy-architecture/DECISIONS-LOG.md` (READ-ONLY):**
- D2: append "**Implemented 2026-04-29**: WP-side mu-plugin (`zuzy-headless-guardrails`) now enforces noindex + 308 redirect to canonical. WP frontend no longer indexable."
- Same constraint — Gil applies, or override permission.

**C.5 — `../zuzy-architecture/SYNC-LOG.md` (READ-ONLY):**
- Move D10-D18 entry from Active → Completed (status ✅).
- Annotate "Blog proxy `/blog` → wp.zuzy.co.il" entry: "DEPRECATED 2026-03-28 (Phase 4 replaced proxy with REST API)".
- Add new completed entry: "2026-04-29 | zuzy + zuzy-website | wp.zuzy.co.il | WP headless guardrails mu-plugin deployed. Posts collection deleted from Payload. ✅".
- Same constraint — Gil applies, or override.

**C.6 — `../zuzy-architecture/DNS-RECORDS.md` (READ-ONLY):**
- Confirm wp/core records present. Currently the file does NOT show records for `wp`, `core`, or any wildcard. **Gil to verify in Hostinger DNS panel and update.** I cannot infer from local DNS (ISP hijacking returns same IP for everything).

**C.7 — `ZUZY-TASKS.md`:**
- Add Phase 8 entry covering this cleanup, with checkboxes per phase, dates, verification.
- Set 🔜 Next Phase pointer past Phase 8.

**C.8 — Memory:**
- Add a new feedback memory: "Blog architecture is locked: `/blog/*` rendered by Next.js from WP REST API. No `/posts/*`, no Payload Posts collection. WP frontend is 308-redirected + noindex via mu-plugin."
- Update or note in `feedback_no-redirects-fresh-site.md` that the WP→canonical redirect is allowed (it's not on zuzy.co.il itself, it's on a different subdomain to prevent duplicate content).

---

### Phase D — VERIFY (urgency: required before commit)

After Phases B + C in code:

1. `npx tsc --noEmit` — zero errors
2. `pnpm build` — zero errors, zero new warnings
3. `pnpm dev` — admin loads, all routes load, `/posts/*` returns 404
4. Local migration test — drop posts table, verify no orphan FKs
5. Production smoke test (after deploy):
   - `curl -sI https://www.zuzy.co.il/posts/` → 404
   - `curl -sI https://www.zuzy.co.il/blog/hello-world/` → 200
   - `curl -sI https://wp.zuzy.co.il/hello-world/` → 308, Location: `https://www.zuzy.co.il/blog/hello-world/`
   - `curl -sI https://wp.zuzy.co.il/wp-sitemap.xml` → 404 or empty
   - `curl -sI https://wp.zuzy.co.il/wp-json/wp/v2/posts` → 200
   - `curl -sI https://www.zuzy.co.il/sitemap.xml` → 200, no `/posts/` URLs
   - `curl -sI https://www.zuzy.co.il/robots.txt` → no `/posts` Disallow lines
6. Re-fetch with WebFetch and compare to expected — I'll run this and report.

---

### Phase E — LOCK THE ARCHITECTURE (urgency: long-term, prevents regression)

**Goal:** Future agents and future Claude sessions never re-introduce the `/posts/*` system or get confused about WP role.

**E.1 — `CLAUDE.md` lock section** (added in Phase C, restated here for clarity):
- Add a "LOCKED ARCHITECTURE" block near the top, above the URL Architecture section:
  ```
  ## LOCKED ARCHITECTURE — DO NOT MODIFY WITHOUT EXPLICIT USER OVERRIDE

  - The blog lives ONLY at /blog/*. Next.js fetches WP REST API and renders.
  - There is NO /posts/* route, NO Payload Posts collection. Do not re-create.
  - wp.zuzy.co.il serves only /wp-admin, /wp-json. All frontend URLs 308 to /blog/.
  - If you (the agent) think the user wants you to re-introduce Posts, STOP and ask.
  ```

**E.2 — Memory:**
- New feedback memory `feedback_blog_arch_locked.md` mirroring the lock block. Future Claude sessions see this in their MEMORY.md index immediately.

**E.3 — Optional regression guard (skip if user thinks it's overkill):**
- Add a tiny test in `tests/` that fails if anyone re-adds `posts` to the `INDEXABLE_COLLECTIONS` array, the `searchPlugin`/`redirectsPlugin` collections, or creates a file under `src/app/(frontend)/posts/`. The test runs in CI and on `pnpm build` via `pnpm test`.

---

## 4. Order of operations (recommended sequencing)

1. **Phase A** (WP-side mu-plugin) — Gil deploys; I verify via WebFetch. Closes the leak immediately, fully reversible.
2. **Phase B** (codebase deletion) — large diff, single PR. Includes migration. Verified by Phase D.
3. **Phase C** (docs) — same PR or follow-up commit. Mostly editing.
4. **Phase D** (verify) — runs at end of B+C, gates the commit/push.
5. **Phase E** (lock) — included in Phase C edits + memory write.

## 5. Risks and confirmations needed

| Risk | Mitigation |
|---|---|
| Gil has Posts content in production he wants to keep | Pause Phase B until confirmed. Currently DB only contains the 3 demo posts. |
| Live Header global has `Posts → /posts` nav entry stored in Payload DB | Phase B.8: Gil removes from admin or I provide a one-off seed-update script. |
| Other pages (Pages collection) might reference Posts via internal links | Grep before B; report any. |
| `core.zuzy.co.il` actual purpose unclear | NOT changed by this plan. Gil clarifies separately. |
| `zuzy-architecture/` is read-only for this workspace | Phase C.3-C.6 either need Gil to apply manually OR an explicit one-time override. |
| WP mu-plugin fights with a security plugin | Test: deploy mu-plugin in maintenance window, verify; if conflict, file is one delete away from rollback. |
| Vercel cache serves stale `/posts/*` after delete | After deploy, optionally `revalidatePath('/posts')` or wait 1 ISR cycle. 404 will eventually serve. |

## 6. Things I'm explicitly NOT doing in this plan

- Not touching seohub or core.zuzy.co.il code (out of workspace, per ORCHESTRATION-PROTOCOL).
- Not touching any Lovable.dev / external subdomains (`gpr-smart-agent`, `magnet`, etc.) — they're independent projects on different hosts.
- Not changing DNS records — Gil owns that.
- Not changing the URL nesting of `/help-center` etc. — that's a separate decision (C2 above).
- Not adding any new feature.

---

## 7. Approval gates

I will pause and wait for explicit "go" on each gate:

- [ ] Gate 1: Approve Phase A (WP mu-plugin snippet) — Gil deploys, I verify
- [ ] Gate 2: Approve Phase B (codebase deletion + migration) — confirms 3 demo posts are the only data
- [ ] Gate 3: Approve Phase C choices (C1a vs C1b for ZUZY-PROJECT-BRIEF, C2a vs C2b for URL nesting)
- [ ] Gate 4: Approve `zuzy-architecture/` edits — either Gil applies or grants one-time override
- [ ] Gate 5: Approve commit + push after Phase D verify

No work begins on any gate until that gate's approval is given.
