import type { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

const MALICIOUS_BOTS = [
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'SearchmetricsBot',
  'PetalBot',
  'Bytespider',
  'GPTBot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getServerSideURL()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api', '/api/*', '/_next', '/_vercel'],
      },
      ...MALICIOUS_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
