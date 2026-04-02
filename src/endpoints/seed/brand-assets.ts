import type { Payload, PayloadRequest, File } from 'payload'
import type { Media } from '@/payload-types'
import fs from 'fs'
import path from 'path'

export type BrandAssetMap = {
  appIcons: {
    rankTracker: Media
    contentDomination: Media
    geoStrategy: Media
    crm: Media
    smartAgent: Media
    socialLead: Media
    businessStrategy: Media
    bottleneck: Media
  }
  heroes: {
    home: Media
    services: Media
    solutions: Media
    platform: Media
  }
  logos: {
    horizontalPurple: Media
  }
  favicon: Media
}

function readLocalFile(relativePath: string): File {
  const absolutePath = path.resolve(process.cwd(), relativePath)
  const data = fs.readFileSync(absolutePath)
  const filename = path.basename(relativePath)
  const ext = path.extname(filename).toLowerCase()

  const mimeMap: Record<string, string> = {
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
  }

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: mimeMap[ext] || 'application/octet-stream',
    size: data.byteLength,
  }
}

async function uploadMedia(
  payload: Payload,
  filePath: string,
  alt: string,
): Promise<Media> {
  const file = readLocalFile(filePath)
  return payload.create({
    collection: 'media',
    data: { alt },
    file,
  }) as Promise<Media>
}

export async function seedBrandAssets(
  payload: Payload,
  req: PayloadRequest,
): Promise<BrandAssetMap> {
  payload.logger.info('— Seeding brand assets...')

  // Upload app icons
  const [
    rankTracker,
    contentDomination,
    geoStrategy,
    crm,
    smartAgent,
    socialLead,
    businessStrategy,
    bottleneck,
  ] = await Promise.all([
    uploadMedia(payload, 'public/media/app-icons/01_seo_rank_tracker.png', 'SEO Rank Tracker'),
    uploadMedia(payload, 'public/media/app-icons/02_content_domination.png', 'Content Domination'),
    uploadMedia(payload, 'public/media/app-icons/03_geo_strategy_maker.png', 'Geo Strategy Maker'),
    uploadMedia(payload, 'public/media/app-icons/04_crm.png', 'CRM'),
    uploadMedia(payload, 'public/media/app-icons/05_smart_agent_bot.png', 'Smart Agent Bot'),
    uploadMedia(payload, 'public/media/app-icons/06_social_lead_generator.png', 'Social Lead Generator'),
    uploadMedia(payload, 'public/media/app-icons/07_business_strategy_planner.png', 'Business Strategy Planner'),
    uploadMedia(payload, 'public/media/app-icons/08_bottleneck_identifier.png', 'Bottleneck Identifier'),
  ])

  // Upload hero backgrounds
  const [heroHome, heroServices, heroSolutions, heroPlatform] = await Promise.all([
    uploadMedia(payload, 'public/brand/heroes/hero-home.svg', 'ZUZY Hero Background — Home'),
    uploadMedia(payload, 'public/brand/heroes/hero-services.svg', 'ZUZY Hero Background — Services'),
    uploadMedia(payload, 'public/brand/heroes/hero-solutions.svg', 'ZUZY Hero Background — Solutions'),
    uploadMedia(payload, 'public/brand/heroes/hero-platform.svg', 'ZUZY Hero Background — Platform'),
  ])

  // Upload logo and favicon
  const [horizontalPurple, favicon] = await Promise.all([
    uploadMedia(payload, 'public/brand/logo-horizontal-purple.svg', 'ZUZY Logo — Purple Horizontal'),
    uploadMedia(payload, 'public/favicon.svg', 'ZUZY Favicon'),
  ])

  payload.logger.info('— Brand assets seeded successfully (22 assets)')

  return {
    appIcons: {
      rankTracker,
      contentDomination,
      geoStrategy,
      crm,
      smartAgent,
      socialLead,
      businessStrategy,
      bottleneck,
    },
    heroes: {
      home: heroHome,
      services: heroServices,
      solutions: heroSolutions,
      platform: heroPlatform,
    },
    logos: {
      horizontalPurple,
    },
    favicon,
  }
}
