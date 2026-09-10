import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { getServerSideURL } from '@/utilities/getURL'

/**
 * Regression tests for the 2026-09-10 sitemap corruption incident.
 *
 * The Vercel Production value of NEXT_PUBLIC_SERVER_URL carried a trailing newline.
 * Because getServerSideURL() is concatenated straight into sitemap <loc> entries and
 * robots.txt Sitemap: directives, every published URL became
 * `https://www.zuzy.co.il\n/path` — unparseable by Google. The Development value was
 * clean, so nothing reproduced locally.
 */
describe('getServerSideURL', () => {
  const ENV_KEYS = ['NEXT_PUBLIC_SERVER_URL', 'VERCEL_PROJECT_PRODUCTION_URL'] as const
  let saved: Record<string, string | undefined> = {}

  beforeEach(() => {
    saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]))
    ENV_KEYS.forEach((k) => delete process.env[k])
  })

  afterEach(() => {
    ENV_KEYS.forEach((k) => {
      const v = saved[k]
      if (v === undefined) delete process.env[k]
      else process.env[k] = v
    })
  })

  it('returns a clean URL unchanged', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.zuzy.co.il'
    expect(getServerSideURL()).toBe('https://www.zuzy.co.il')
  })

  it('strips a trailing newline (the production defect)', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.zuzy.co.il\n'
    expect(getServerSideURL()).toBe('https://www.zuzy.co.il')
  })

  it('strips CRLF and surrounding whitespace', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = '  https://www.zuzy.co.il\r\n '
    expect(getServerSideURL()).toBe('https://www.zuzy.co.il')
  })

  it('strips trailing slashes so `${base}${path}` never double-slashes', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.zuzy.co.il///'
    expect(getServerSideURL()).toBe('https://www.zuzy.co.il')
  })

  it('produces a parseable absolute URL when concatenated with a path', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.zuzy.co.il\n'
    const loc = `${getServerSideURL()}/design-system`
    expect(loc).toBe('https://www.zuzy.co.il/design-system')
    expect(() => new URL(loc)).not.toThrow()
    expect(loc).not.toContain('\n')
  })

  it('falls back to the Vercel production URL, also sanitized', () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'www.zuzy.co.il\n'
    expect(getServerSideURL()).toBe('https://www.zuzy.co.il')
  })

  it('falls back to localhost when nothing is set', () => {
    expect(getServerSideURL()).toBe('http://localhost:3000')
  })

  it('treats a whitespace-only value as unset', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = '   \n  '
    expect(getServerSideURL()).toBe('http://localhost:3000')
  })
})
