/**
 * Standalone brand asset seeder — run with:
 *   pnpm seed:brand-assets
 *
 * Uploads brand images to Payload Media (Supabase S3), sets SiteSettings
 * logo/favicon, and updates all pages with hero backgrounds + app icons.
 *
 * Safe to run multiple times — skips assets that already exist (by alt text).
 * Runs locally via `payload run` — no Vercel timeout constraints.
 */
import path from 'path'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'
import type { Payload, File } from 'payload'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readLocalFile(relativePath: string): File {
  const absolutePath = path.resolve(process.cwd(), relativePath)
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`)
  }
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

async function uploadIfNotExists(
  payload: Payload,
  filePath: string,
  alt: string,
): Promise<Media> {
  // Deduplicate by alt text
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    payload.logger.info(`  Skip (exists): ${alt}`)
    return existing.docs[0] as Media
  }

  const file = readLocalFile(filePath)
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file,
  }) as Media
  payload.logger.info(`  Uploaded: ${alt} (ID: ${doc.id})`)
  return doc
}

// ─── Asset Definitions ────────────────────────────────────────────────────────

const APP_ICONS = [
  { path: 'public/media/app-icons/01_seo_rank_tracker.png', alt: 'SEO Rank Tracker' },
  { path: 'public/media/app-icons/02_content_domination.png', alt: 'Content Domination' },
  { path: 'public/media/app-icons/03_geo_strategy_maker.png', alt: 'Geo Strategy Maker' },
  { path: 'public/media/app-icons/04_crm.png', alt: 'CRM' },
  { path: 'public/media/app-icons/05_smart_agent_bot.png', alt: 'Smart Agent Bot' },
  { path: 'public/media/app-icons/06_social_lead_generator.png', alt: 'Social Lead Generator' },
  { path: 'public/media/app-icons/07_business_strategy_planner.png', alt: 'Business Strategy Planner' },
  { path: 'public/media/app-icons/08_bottleneck_identifier.png', alt: 'Bottleneck Identifier' },
]

const HEROES = [
  { path: 'public/brand/heroes/hero-home.svg', alt: 'ZUZY Hero — Home' },
  { path: 'public/brand/heroes/hero-services.svg', alt: 'ZUZY Hero — Services' },
  { path: 'public/brand/heroes/hero-solutions.svg', alt: 'ZUZY Hero — Solutions' },
  { path: 'public/brand/heroes/hero-platform.svg', alt: 'ZUZY Hero — Platform' },
]

const BRANDING = [
  { path: 'public/brand/logo-horizontal-purple.svg', alt: 'ZUZY Logo — Purple Horizontal' },
  { path: 'public/favicon.svg', alt: 'ZUZY Favicon' },
]

// ─── Page Update Logic ────────────────────────────────────────────────────────

async function updatePagesWithAssets(payload: Payload): Promise<number> {
  const findMedia = async (alt: string): Promise<Media | undefined> => {
    const r = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return r.docs[0] as Media | undefined
  }

  const heroes = {
    home: await findMedia('ZUZY Hero — Home'),
    services: await findMedia('ZUZY Hero — Services'),
    solutions: await findMedia('ZUZY Hero — Solutions'),
    platform: await findMedia('ZUZY Hero — Platform'),
  }

  const appIcons = {
    rankTracker: await findMedia('SEO Rank Tracker'),
    geoStrategy: await findMedia('Geo Strategy Maker'),
    bottleneck: await findMedia('Bottleneck Identifier'),
    contentDomination: await findMedia('Content Domination'),
    businessStrategy: await findMedia('Business Strategy Planner'),
    smartAgent: await findMedia('Smart Agent Bot'),
  }

  const allPages = await payload.find({ collection: 'pages', limit: 200, depth: 0 })
  let pagesUpdated = 0

  // Slug sets for hero assignment
  const platformSlugs = new Set(['platform', 'rank-tracker', 'site-audit', 'copilot', 'content-editor', 'keyword-research', 'analytics', 'reports', 'pages'])
  const servicesSlugs = new Set(['services', 'seo-strategy', 'content-optimization', 'technical-audit', 'local-seo', 'link-building'])
  const solutionsSlugs = new Set(['solutions', 'ecommerce', 'startups', 'agencies', 'enterprise'])

  for (const page of allPages.docs) {
    const slug = page.slug || ''
    const layout = (page as any).layout as any[] | undefined
    if (!layout || layout.length === 0) continue

    let updated = false
    const updatedLayout = layout.map((block: any) => {
      // Inject hero backgrounds
      if (block.blockType === 'heroBlock' && !block.backgroundImage) {
        let heroId: number | undefined
        if (platformSlugs.has(slug)) heroId = heroes.platform?.id
        else if (servicesSlugs.has(slug)) heroId = heroes.services?.id
        else if (solutionsSlugs.has(slug)) heroId = heroes.solutions?.id
        else if (slug === 'home') heroId = heroes.home?.id

        if (heroId) {
          updated = true
          return { ...block, backgroundImage: heroId }
        }
      }

      // Inject app icons into homepage features
      if (block.blockType === 'featuresBlock' && slug === 'home' && block.features) {
        const iconOrder = [
          appIcons.rankTracker, appIcons.geoStrategy, appIcons.bottleneck,
          appIcons.contentDomination, appIcons.businessStrategy, appIcons.smartAgent,
        ]
        const updatedFeatures = block.features.map((f: any, idx: number) => {
          if (!f.image && iconOrder[idx]) {
            updated = true
            return { ...f, image: iconOrder[idx]!.id }
          }
          return f
        })
        return { ...block, features: updatedFeatures }
      }

      // Inject hero into homepage CTA
      if (block.blockType === 'ctaBlock' && !block.backgroundImage && slug === 'home' && heroes.home) {
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
        context: { disableRevalidate: true },
      })
      pagesUpdated++
      payload.logger.info(`  Updated page: ${slug}`)
    }
  }

  return pagesUpdated
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('=== Brand Asset Seeder (standalone) ===')
  payload.logger.info('')

  // Phase 1: Upload all assets
  payload.logger.info('Phase 1: Uploading app icons...')
  for (const icon of APP_ICONS) {
    await uploadIfNotExists(payload, icon.path, icon.alt)
  }

  payload.logger.info('Phase 2: Uploading hero backgrounds...')
  for (const hero of HEROES) {
    await uploadIfNotExists(payload, hero.path, hero.alt)
  }

  payload.logger.info('Phase 3: Uploading logo + favicon...')
  const logoResults: Record<string, Media> = {}
  for (const item of BRANDING) {
    logoResults[item.alt] = await uploadIfNotExists(payload, item.path, item.alt)
  }

  // Phase 2: Update SiteSettings
  payload.logger.info('Phase 4: Setting SiteSettings logo + favicon...')
  const logo = logoResults['ZUZY Logo — Purple Horizontal']
  const favicon = logoResults['ZUZY Favicon']
  if (logo && favicon) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: { logo: logo.id, favicon: favicon.id } as any,
      depth: 0,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`  SiteSettings updated (logo: ${logo.id}, favicon: ${favicon.id})`)
  }

  // Phase 3: Update pages with brand assets
  payload.logger.info('Phase 5: Updating pages with brand assets...')
  const pagesUpdated = await updatePagesWithAssets(payload)
  payload.logger.info(`  ${pagesUpdated} pages updated`)

  payload.logger.info('')
  payload.logger.info('=== Brand asset seeding complete! ===')

  process.exit(0)
}

await run()
