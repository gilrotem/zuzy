import canUseDOM from './canUseDOM'

/**
 * Normalize a base URL coming from an environment variable.
 *
 * Env stores happily accept trailing whitespace, and a stray newline is invisible in
 * every UI that displays the value. Because this base URL is concatenated directly into
 * sitemap <loc> entries, robots.txt `Sitemap:` directives, canonicals and OG tags, a
 * single trailing "\n" silently corrupts every URL the site publishes.
 *
 * That is not hypothetical: on 2026-09-10 the Vercel *Production* value of
 * NEXT_PUBLIC_SERVER_URL carried a trailing newline while the Development value did not,
 * so local builds looked correct while production emitted
 * `https://www.zuzy.co.il\n/design-system` for all 57 sitemap URLs and both Sitemap:
 * lines in robots.txt. Google could not parse any of them.
 *
 * Sanitizing here makes that class of defect unrepresentable, regardless of what the
 * env store contains.
 */
const normalizeBaseURL = (value: string | undefined): string => {
  if (!value) return ''
  // Strip all surrounding whitespace (including \r and \n), then any trailing slashes,
  // so callers can always safely do `${base}${path}`.
  return value.trim().replace(/\/+$/, '')
}

export const getServerSideURL = () => {
  const fromEnv = normalizeBaseURL(process.env.NEXT_PUBLIC_SERVER_URL)
  if (fromEnv) return fromEnv

  const vercelURL = normalizeBaseURL(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  if (vercelURL) return `https://${vercelURL}`

  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  const vercelURL = normalizeBaseURL(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  if (vercelURL) return `https://${vercelURL}`

  return normalizeBaseURL(process.env.NEXT_PUBLIC_SERVER_URL)
}
