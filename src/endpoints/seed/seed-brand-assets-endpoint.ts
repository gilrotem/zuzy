import type { Payload, PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'
import fs from 'fs'
import path from 'path'

/**
 * Non-destructive brand asset seeder.
 * Uploads brand images to Media, sets SiteSettings logo/favicon,
 * and updates ALL existing pages with hero backgrounds and feature images.
 * Does NOT delete any existing content.
 */

function readLocalFile(relativePath: string) {
  const absolutePath = path.resolve(process.cwd(), relativePath)
  const data = fs.readFileSync(absolutePath)
  const filename = path.basename(relativePath)
  const ext = path.extname(filename).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
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
  filePath: string,
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

  const file = readLocalFile(filePath)
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

  // 1. Upload app icons
  payload.logger.info('Uploading app icons...')
  const appIcons = await Promise.all([
    uploadIfNotExists(payload, 'public/media/app-icons/01_seo_rank_tracker.png', 'SEO Rank Tracker'),
    uploadIfNotExists(payload, 'public/media/app-icons/02_content_domination.png', 'Content Domination'),
    uploadIfNotExists(payload, 'public/media/app-icons/03_geo_strategy_maker.png', 'Geo Strategy Maker'),
    uploadIfNotExists(payload, 'public/media/app-icons/04_crm.png', 'CRM'),
    uploadIfNotExists(payload, 'public/media/app-icons/05_smart_agent_bot.png', 'Smart Agent Bot'),
    uploadIfNotExists(payload, 'public/media/app-icons/06_social_lead_generator.png', 'Social Lead Generator'),
    uploadIfNotExists(payload, 'public/media/app-icons/07_business_strategy_planner.png', 'Business Strategy Planner'),
    uploadIfNotExists(payload, 'public/media/app-icons/08_bottleneck_identifier.png', 'Bottleneck Identifier'),
  ])

  // 2. Upload hero backgrounds
  payload.logger.info('Uploading hero backgrounds...')
  const heroes = {
    home: await uploadIfNotExists(payload, 'public/brand/heroes/hero-home.svg', 'ZUZY Hero — Home'),
    services: await uploadIfNotExists(payload, 'public/brand/heroes/hero-services.svg', 'ZUZY Hero — Services'),
    solutions: await uploadIfNotExists(payload, 'public/brand/heroes/hero-solutions.svg', 'ZUZY Hero — Solutions'),
    platform: await uploadIfNotExists(payload, 'public/brand/heroes/hero-platform.svg', 'ZUZY Hero — Platform'),
  }

  // 3. Upload logo and favicon
  payload.logger.info('Uploading logo and favicon...')
  const logo = await uploadIfNotExists(payload, 'public/brand/logo-horizontal-purple.svg', 'ZUZY Logo — Purple Horizontal')
  const favicon = await uploadIfNotExists(payload, 'public/favicon.svg', 'ZUZY Favicon')

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

  // Map slugs to hero images
  const heroMap: Record<string, number> = {
    home: heroes.home.id,
  }

  // App icon map for features
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
        // Determine which hero to use based on page context
        let heroId: number | undefined

        // Platform pages
        if (slug === 'platform' || ['rank-tracker', 'site-audit', 'copilot', 'content-editor', 'keyword-research', 'analytics', 'reports', 'pages'].includes(slug)) {
          heroId = heroes.platform.id
        }
        // Services pages
        else if (slug === 'services' || ['seo-strategy', 'content-optimization', 'technical-audit', 'local-seo', 'link-building'].includes(slug)) {
          heroId = heroes.services.id
        }
        // Solutions pages
        else if (slug === 'solutions' || ['ecommerce', 'startups', 'agencies', 'enterprise'].includes(slug)) {
          heroId = heroes.solutions.id
        }
        // Homepage and others
        else if (slug === 'home') {
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

      // Add hero background to CTABlocks without one
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

  const totalUploaded = appIcons.length + Object.keys(heroes).length + 2 // +2 for logo and favicon
  payload.logger.info(`=== Done! ${totalUploaded} assets, ${pagesUpdated} pages updated ===`)

  return { uploaded: totalUploaded, pagesUpdated }
}
