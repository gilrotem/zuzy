import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

const DEFAULT_MALICIOUS_BOTS = [
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

const DEFAULT_DISALLOW = ['/admin', '/admin/*', '/api', '/api/*', '/_next', '/_vercel']

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getServerSideURL()

  let additionalDisallow: string[] = []
  let additionalBots: string[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const seoSettings = await payload.findGlobal({ slug: 'seo-settings' as any })

    if (seoSettings) {
      const settings = seoSettings as any
      additionalDisallow = (settings.additionalDisallowPaths || [])
        .map((item: any) => item.path)
        .filter(Boolean)
      additionalBots = (settings.additionalBlockedBots || [])
        .map((item: any) => item.userAgent)
        .filter(Boolean)
    }
  } catch {
    // Fallback to defaults if DB is unreachable
  }

  const allBlockedBots = [...DEFAULT_MALICIOUS_BOTS, ...additionalBots]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...DEFAULT_DISALLOW, ...additionalDisallow],
      },
      ...allBlockedBots.map((bot) => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/blog/sitemap.xml`],
  }
}
