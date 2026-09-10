const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const legalRedirects = [
    {
      source: '/privacy',
      destination: '/legal/privacy',
      permanent: true,
    },
    {
      source: '/terms',
      destination: '/legal/terms',
      permanent: true,
    },
    {
      source: '/accessibility',
      destination: '/legal/security',
      permanent: true,
    },
  ]

  // Pages that moved from a flat top-level slug into a section (2026-09-10).
  //
  // The move to /support/*, /resources/*, /legal/* and /brand-docs/* happened without
  // redirects, so every one of these returned a hard 404 while still being advertised in
  // sitemap.xml. Verified live on 2026-09-10: each `source` 404s, each `destination` 200s.
  //
  // /privacy, /terms and /accessibility are already handled above.
  const movedPageRedirects = [
    // → /support
    { source: '/contact', destination: '/support/contact', permanent: true },
    { source: '/status', destination: '/support/status', permanent: true },
    { source: '/docs', destination: '/support/docs', permanent: true },
    { source: '/help-center', destination: '/support/help-center', permanent: true },
    // → /resources
    { source: '/guides', destination: '/resources/guides', permanent: true },
    { source: '/glossary', destination: '/resources/glossary', permanent: true },
    { source: '/webinars', destination: '/resources/webinars', permanent: true },
    { source: '/api-docs', destination: '/resources/api-docs', permanent: true },
    { source: '/changelog', destination: '/resources/changelog', permanent: true },
    // → /legal
    { source: '/security', destination: '/legal/security', permanent: true },
    { source: '/cookies', destination: '/legal/cookies', permanent: true },
    // → /brand-docs
    { source: '/design-system', destination: '/brand-docs/design-system', permanent: true },
  ]

  return [internetExplorerRedirect, ...legalRedirects, ...movedPageRedirects]
}

export default redirects
