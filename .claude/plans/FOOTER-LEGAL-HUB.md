# Phase 9 — Footer + Legal Hub (one-hub model)

> **Status: SPEC / brief — awaiting a zuzy-website session to plan Phase 1 (plan-first, Gil approval gate).**
> Written 2026-06-11 by the seohub GSC-verification session, on Gil's explicit instruction, after the one-hub
> decision was made with him in chat. This file is the SSOT brief: a fresh session months from now must be able
> to execute from this file + the live code alone.

---

## 1. The locked decision — ONE legal hub (Gil, 2026-06-11)

**All legal/compliance pages live ONLY at `www.zuzy.co.il/legal/*`. Every other system (core.zuzy.co.il
and any future subdomain/product) links INTO the hub from its own footer. No system ever hosts its own
copy of a legal page.**

Why (agreed with Gil, who explicitly rejected the per-subdomain-copies model after discussion):

- **Legal safety**: duplicated policies drift and end up contradicting each other. This is not hypothetical —
  it has already happened: core.zuzy.co.il has 6 legal pages, www has 4, and the texts differ.
- **SEO**: legal pages are trust surfaces, not ranking assets. Per-subdomain copies create cross-domain
  duplicate content for zero gain; Google keeps one version and ignores the rest anyway.
- **Scaling**: a new product gets full legal coverage by adding three footer links — not by inheriting a
  6-page content-maintenance obligation. This is the Google/Microsoft/Stripe/Atlassian pattern
  (`policies.google.com`, `atlassian.com/legal`, …).
- If a product ever needs distinct terms, that is a **new document inside the hub**
  (e.g. `/legal/terms-core`), never a parallel hub on the subdomain.

A matching lock should be added to this workspace's CLAUDE.md LOCKED ARCHITECTURE section
(proposed to Gil 2026-06-11, pending his confirmation).

## 2. Verified current state (live probes, 2026-06-11)

| URL (www.zuzy.co.il) | Status |
|---|---|
| `/legal` (index) | 200 |
| `/legal/privacy` | 200 |
| `/legal/terms` | 200 |
| `/legal/cookies` | 200 |
| `/legal/security` | 200 |
| `/legal/gdpr` | **404** — page exists on core.zuzy.co.il, missing here |
| `/legal/accessibility` | **404** — page exists on core.zuzy.co.il, missing here |
| `/accessibility` | 308 → `/legal/security` — **misredirect**: an accessibility statement pointing at a security page (bad semantically, and Israeli accessibility regulations expect a reachable הצהרת נגישות) |

- **The Footer global is empty.** `src/Footer/config.ts` defines `columns` (≤6 × ≤10 links),
  `bottomLinks` (≤8), `copyright`; `src/Footer/Component.tsx` renders all three plus the logo column,
  with `revalidateFooter` afterChange revalidation. The rendered live footer today contains only the theme
  picker + fallback copyright — nobody ever filled the global. **No schema change is needed for Phase 0;
  whether Phase 1 needs one is a planning question.**
- core.zuzy.co.il serves `/legal/privacy|terms|cookies|gdpr|security|accessibility` — all 200. These are the
  duplicate set that the hub model eventually absorbs (core-side work happens in the **seohub** workspace,
  NOT here — see §5).
- Context that triggered this now: Google OAuth app verification (seohub phase #3) requires the homepage to
  link the privacy policy; the consent screens declare `https://www.zuzy.co.il/legal/privacy` + `/legal/terms`.

## 3. Phase 0 — immediate Google-OAuth unblock (minutes, no plan needed)

Goal: the live homepage footer links the privacy policy + terms.

1. **Check first whether it is already done** — Gil may have added the links via the Payload admin before
   this session runs. Probe: homepage HTML contains `legal/privacy`. If present → Phase 0 is done, skip.
2. Preferred path (zero code): Payload admin → Globals → Footer → **Bottom Bar Links** → two Custom-URL
   links: `מדיניות פרטיות` → `/legal/privacy`, `תנאי שימוש` → `/legal/terms` (same-domain relative URLs).
   Save → `revalidateFooter` updates the live site immediately.
3. Fallback if admin access is broken: set the same two `bottomLinks` via a one-off Local API script
   (pattern: `src/scripts/seed-nav.ts`). That is a code path — follow the workspace git rules.
4. Verify: fetch `https://www.zuzy.co.il` and confirm both hrefs render in the footer HTML.

## 4. Phase 1 — the full footer + legal-hub completion (PLAN FIRST — hard gate)

**Deliverable of the first session: a plan, not code.** Per the workspace "סע" protocol: write the
implementation plan in `.claude/plans/` (this file may grow a PLAN section), get Gil's explicit approval,
only then implement. Gil is a perfectionist on link architecture — a previous footer attempt died of
unplanned complexity. Plan small, plan exact.

Scope to plan:

1. **Footer columns = top-of-silo entries ONLY.** Columns mirror the site's primary silos (Platform,
   Solutions, Services, Resources, Company — final set is a planning decision from the live URL
   architecture: note Pattern A vs Pattern B coexistence documented in CLAUDE.md §URL Architecture).
   **Anti-goal, from Gil explicitly: the footer must NOT deep-link every page — sitewide deep links
   flatten the silo hierarchy. Top-level entries only; deep linking lives inside the silos.**
2. **Bottom bar**: the legal links (full set once the silo is complete) + copyright.
3. **Legal silo completion on www**:
   - Add `/legal/gdpr` + `/legal/accessibility` pages (source text exists on core — see next item).
   - Fix the `/accessibility` redirect → `/legal/accessibility` (currently → `/legal/security`).
     Redirect changes require Gil's explicit approval per SEO Safety rules — list them in the plan.
   - `/legal` index lists all six.
4. **Content reconciliation (www text vs core text)**: the two sets differ. Compare per page, propose the
   canonical text (core's set is newer and complete — 6 pages), Gil/Tair approve. One source going forward.
5. **Localization**: the site runs 6 locales (he default). Footer labels + legal pages follow the existing
   localization pattern — decide deliberately what is localized vs Hebrew-only, don't improvise.
6. **SEO guardrails**: footer edits are sitewide; run the workspace SEO Safety checklist (canonicals,
   robots, sitemap untouched unless planned; JSON-LD unaffected). The full Post-Phase Protocol applies.

## 5. Out of scope here (tracked in the seohub workspace)

- core.zuzy.co.il footer linking out to the hub (`www.zuzy.co.il/legal/*`).
- Eventual 301s `core.zuzy.co.il/legal/*` → `www.zuzy.co.il/legal/*` after the hub is complete.
- The Google OAuth console work itself (seohub TASKS #3 Track A).
- **WordPress — entirely.** This phase has ZERO WordPress surface: the footer is a Payload Global, the
  legal pages are Payload pages, all on www. If the plan finds itself touching `wp.zuzy.co.il`, `/blog`
  redirect logic, or `src/lib/wp-*` — it is off the rails; STOP and re-read LOCKED ARCHITECTURE in
  CLAUDE.md. (Past agents have hallucinated blog/WP involvement into unrelated tasks under long context.)

## 6. Acceptance criteria

- Phase 0: homepage footer links privacy + terms (live HTML verified) — unblocks the Google submission.
- Phase 1: approved plan executed; all six legal pages live on www; `/accessibility` redirect fixed;
  footer columns reflect the approved silo map; core's duplicates ready to be absorbed (redirects queued
  in the seohub workspace); no SEO Safety rule violated without listed approval.
