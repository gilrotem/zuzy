import { describe, expect, it } from 'vitest'

import redirects from '../../redirects'

type Redirect = { source: string; destination: string; permanent?: boolean; has?: unknown }

/**
 * Guards for the redirect table. These are cheap and catch the two mistakes that are
 * expensive in SEO terms: a chain (A→B→C wastes crawl budget and dilutes the signal) and
 * a duplicate source (only the first ever fires, so the second is silently dead config).
 */
describe('redirects', () => {
  const load = async (): Promise<Redirect[]> =>
    (await redirects()).filter((r: Redirect) => typeof r.source === 'string' && !r.has)

  it('has no duplicate sources', async () => {
    const rules = await load()
    const seen = new Map<string, number>()
    for (const r of rules) seen.set(r.source, (seen.get(r.source) ?? 0) + 1)
    const dupes = [...seen.entries()].filter(([, n]) => n > 1).map(([s]) => s)
    expect(dupes).toEqual([])
  })

  it('has no redirect chains — no destination is itself a source', async () => {
    const rules = await load()
    const sources = new Set(rules.map((r) => r.source))
    const chained = rules
      .filter((r) => sources.has(r.destination))
      .map((r) => `${r.source} → ${r.destination} (which also redirects)`)
    expect(chained).toEqual([])
  })

  it('never redirects a path to itself', async () => {
    const rules = await load()
    expect(rules.filter((r) => r.source === r.destination)).toEqual([])
  })

  it('uses permanent (308) redirects for moved pages', async () => {
    const rules = await load()
    const temporary = rules.filter((r) => r.permanent !== true).map((r) => r.source)
    expect(temporary).toEqual([])
  })

  it('covers every page that moved out of a flat top-level slug', async () => {
    const rules = await load()
    const bySource = new Map(rules.map((r) => [r.source, r.destination]))
    // Verified live 2026-09-10: each source 404s, each destination 200s.
    const expected: Record<string, string> = {
      '/contact': '/support/contact',
      '/status': '/support/status',
      '/docs': '/support/docs',
      '/help-center': '/support/help-center',
      '/guides': '/resources/guides',
      '/glossary': '/resources/glossary',
      '/webinars': '/resources/webinars',
      '/api-docs': '/resources/api-docs',
      '/changelog': '/resources/changelog',
      '/security': '/legal/security',
      '/cookies': '/legal/cookies',
      '/design-system': '/brand-docs/design-system',
    }
    for (const [source, destination] of Object.entries(expected)) {
      expect(bySource.get(source), `redirect missing for ${source}`).toBe(destination)
    }
  })
})
