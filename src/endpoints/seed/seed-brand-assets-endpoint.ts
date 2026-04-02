import type { Payload, PayloadRequest, File } from 'payload'
import type { Media } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * Non-destructive brand asset seeder.
 * Fetches brand images via HTTP (works on Vercel serverless),
 * uploads to Media collection, sets SiteSettings logo/favicon,
 * and updates ALL existing pages with hero backgrounds and feature images.
 * Does NOT delete any existing content.
 */

async function fetchFileFromPublic(publicPath: string): Promise<File> {
  const baseURL = getServerSideURL()
  const url = `${baseURL}${publicPath}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`)
  }

  const data = await res.arrayBuffer()
  const filename = publicPath.split('/').pop() || `file-${Date.now()}`
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const mimeMap: Record<string, string> = {
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    ico: 'image/x-icon',
  }

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: mimeMap[ext] || 'application/octet-stream',
    size: data.byteLength,
  }
}

async function uploadIfNotExists(
  payload: Payload,
  publicPath: string,
  alt: string,
): Promise<Media> {
  // Check if already uploaded by alt text
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    payload.logger.info(`  Skipping (exists): ${alt}`)
    return existing.docs[0] as Media
  }

  const file = await fetchFileFromPublic(publicPath)
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file,
  })
  payload.logger.info(`  Uploaded: ${alt}`)
  return doc as Media
}

export async function seedBrandAssetsNonDestructive({
  payload,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ uploaded: number; pagesUpdated: number }> {
  payload.logger.info('=== Brand Asset Seeder (non-destructive) ===')

  // 1. Upload app icons (sequentially to avoid overwhelming S3)
  payload.logger.info('Uploading app icons...')
  const appIcons = []
  const iconFiles = [
    { path: '/media/app-icons/01_seo_rank_tracker.png', alt: 'SEO Rank Tracker' },
    { path: '/media/app-icons/02_content_domination.png', alt: 'Content Domination' },
    { path: '/media/app-icons/03_geo_strategy_maker.png', alt: 'Geo Strategy Maker' },
    { path: '/media/app-icons/04_crm.png', alt: 'CRM' },
    { path: '/media/app-icons/05_smart_agent_bot.png', alt: 'Smart Agent Bot' },
    { path: '/media/app-icons/06_social_lead_generator.png', alt: 'Social Lead Generator' },
    { path: '/media/app-icons/07_business_strategy_planner.png', alt: 'Business Strategy Planner' },
    { path: '/media/app-icons/08_bottleneck_identifier.png', alt: 'Bottleneck Identifier' },
  ]
  for (const icon of iconFiles) {
    appIcons.push(await uploadIfNotExists(payload, icon.path, icon.alt))
  }

  // 2. Upload hero backgrounds
  payload.logger.info('Uploading hero backgrounds...')
  const heroes = {
    home: await uploadIfNotExists(payload, '/brand/heroes/hero-home.svg', 'ZUZY Hero — Home'),
    services: await uploadIfNotExists(payload, '/brand/heroes/hero-services.svg', 'ZUZY Hero — Services'),
    solutions: await uploadIfNotExists(payload, '/brand/heroes/hero-solutions.svg', 'ZUZY Hero — Solutions'),
    platform: await uploadIfNotExists(payload, '/brand/heroes/hero-platform.svg', 'ZUZY Hero — Platform'),
  }

  // 3. Upload logo and favicon
  payload.logger.info('Uploading logo and favicon...')
  const logo = await uploadIfNotExists(payload, '/brand/logo-horizontal-purple.svg', 'ZUZY Logo — Purple Horizontal')
  const favicon = await uploadIfNotExists(payload, '/favicon.svg', 'ZUZY Favicon')

  // 4. Set SiteSettings logo + favicon
  payload.logger.info('Setting SiteSettings logo and favicon...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      logo: logo.id,
      favicon: favicon.id,
    } as any,
  })

  // 5. Update ALL pages with brand assets
  payload.logger.info('Updating pages with brand assets...')
  let pagesUpdated = 0

  const appIconMap = {
    rankTracker: appIcons[0],
    contentDomination: appIcons[1],
    geoStrategy: appIcons[2],
    crm: appIcons[3],
    smartAgent: appIcons[4],
    socialLead: appIcons[5],
    businessStrategy: appIcons[6],
    bottleneck: appIcons[7],
  }

  // Fetch all pages
  const allPages = await payload.find({
    collection: 'pages',
    limit: 200,
    depth: 0,
  })

  for (const page of allPages.docs) {
    const slug = page.slug || ''
    const layout = (page as any).layout as any[] | undefined
    if (!layout || layout.length === 0) continue

    let updated = false
    const updatedLayout = layout.map((block: any) => {
      // Add hero backgrounds to HeroBlocks
      if (block.blockType === 'heroBlock' && !block.backgroundImage) {
        let heroId: number | undefined

        if (slug === 'platform' || ['rank-tracker', 'site-audit', 'copilot', 'content-editor', 'keyword-research', 'analytics', 'reports', 'pages'].includes(slug)) {
          heroId = heroes.platform.id
        } else if (slug === 'services' || ['seo-strategy', 'content-optimization', 'technical-audit', 'local-seo', 'link-building'].includes(slug)) {
          heroId = heroes.services.id
        } else if (slug === 'solutions' || ['ecommerce', 'startups', 'agencies', 'enterprise'].includes(slug)) {
          heroId = heroes.solutions.id
        } else if (slug === 'home') {
          heroId = heroes.home.id
        }

        if (heroId) {
          updated = true
          return { ...block, backgroundImage: heroId }
        }
      }

      // Add app icon images to FeaturesBlocks on homepage
      if (block.blockType === 'featuresBlock' && slug === 'home' && block.features) {
        const iconOrder = [
          appIconMap.rankTracker,
          appIconMap.geoStrategy,
          appIconMap.bottleneck,
          appIconMap.contentDomination,
          appIconMap.businessStrategy,
          appIconMap.smartAgent,
        ]
        const updatedFeatures = block.features.map((feature: any, idx: number) => {
          if (!feature.image && iconOrder[idx]) {
            updated = true
            return { ...feature, image: iconOrder[idx].id }
          }
          return feature
        })
        return { ...block, features: updatedFeatures }
      }

      // Add hero background to CTABlocks on homepage
      if (block.blockType === 'ctaBlock' && !block.backgroundImage && slug === 'home') {
        updated = true
        return { ...block, backgroundImage: heroes.home.id }
      }

      return block
    })

    if (updated) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: { layout: updatedLayout } as any,
        depth: 0,
      })
      pagesUpdated++
      payload.logger.info(`  Updated page: ${slug}`)
    }
  }

  const totalUploaded = appIcons.length + Object.keys(heroes).length + 2
  payload.logger.info(`=== Done! ${totalUploaded} assets, ${pagesUpdated} pages updated ===`)

  return { uploaded: totalUploaded, pagesUpdated }
}
