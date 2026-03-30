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

  // D17 — Legal short URL redirects
  const legalRedirects = [
    { source: '/privacy', destination: '/legal/privacy', permanent: true },
    { source: '/privacy/', destination: '/legal/privacy', permanent: true },
    { source: '/terms', destination: '/legal/terms', permanent: true },
    { source: '/terms/', destination: '/legal/terms', permanent: true },
    { source: '/accessibility', destination: '/legal/security', permanent: true },
    { source: '/accessibility/', destination: '/legal/security', permanent: true },
  ]

  const redirects = [internetExplorerRedirect, ...legalRedirects]

  return redirects
}

export default redirects
