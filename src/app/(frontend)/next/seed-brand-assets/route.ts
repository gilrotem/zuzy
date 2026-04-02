import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import type { Media } from '@/payload-types'
import type { Payload, File } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

export const maxDuration = 60

async function fetchFileFromPublic(publicPath: string): Promise<File> {
  const baseURL = getServerSideURL()
  const url = `${baseURL}${publicPath}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const data = await res.arrayBuffer()
  const filename = publicPath.split('/').pop() || `file-${Date.now()}`
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const mimeMap: Record<string, string> = {
    png: 'image/png', svg: 'image/svg+xml', webp: 'image/webp',
    jpg: 'image/jpeg', ico: 'image/x-icon',
  }
  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: mimeMap[ext] || 'application/octet-stream',
    size: data.byteLength,
  }
}

async function uploadIfNotExists(payload: Payload, publicPath: string, alt: string): Promise<Media> {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })
  if (existing.docs.length > 0) return existing.docs[0] as Media

  const file = await fetchFileFromPublic(publicPath)
  return payload.create({ collection: 'media', data: { alt }, file }) as Promise<Media>
}

export async function POST(request: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })
  if (!user) return new Response('Forbidden', { status: 403 })

  // Parse step from URL: ?step=1, ?step=2, ?step=3
  const url = new URL(request.url)
  const step = parseInt(url.searchParams.get('step') || '1', 10)

  try {
    const req = await createLocalReq({ user }, payload)

    if (step === 1) {
      // Step 1: Upload app icons (8 files) + logo + favicon
      payload.logger.info('Step 1: Uploading app icons, logo, favicon...')
      const icons = []
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
        icons.push(await uploadIfNotExists(payload, icon.path, icon.alt))
        payload.logger.info(`  Done: ${icon.alt}`)
      }

      const logo = await uploadIfNotExists(payload, '/brand/logo-horizontal-purple.svg', 'ZUZY Logo — Purple Horizontal')
      const favicon = await uploadIfNotExists(payload, '/favicon.svg', 'ZUZY Favicon')

      // Set SiteSettings
      await payload.updateGlobal({
        slug: 'site-settings',
        data: { logo: logo.id, favicon: favicon.id } as any,
      })

      return Response.json({ success: true, step: 1, uploaded: icons.length + 2, message: 'App icons + logo + favicon uploaded. Run step=2 next.' })
    }

    if (step === 2) {
      // Step 2: Upload hero backgrounds (4 files)
      payload.logger.info('Step 2: Uploading hero backgrounds...')
      const heroes = {
        home: await uploadIfNotExists(payload, '/brand/heroes/hero-home.svg', 'ZUZY Hero — Home'),
        services: await uploadIfNotExists(payload, '/brand/heroes/hero-services.svg', 'ZUZY Hero — Services'),
        solutions: await uploadIfNotExists(payload, '/brand/heroes/hero-solutions.svg', 'ZUZY Hero — Solutions'),
        platform: await uploadIfNotExists(payload, '/brand/heroes/hero-platform.svg', 'ZUZY Hero — Platform'),
      }

      return Response.json({ success: true, step: 2, uploaded: 4, heroIds: {
        home: heroes.home.id,
        services: heroes.services.id,
        solutions: heroes.solutions.id,
        platform: heroes.platform.id,
      }, message: 'Hero backgrounds uploaded. Run step=3 next.' })
    }

    if (step === 3) {
      // Step 3: Update all pages with brand assets
      payload.logger.info('Step 3: Updating pages...')

      // Fetch uploaded assets by alt text
      const findMedia = async (alt: string) => {
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

      for (const page of allPages.docs) {
        const slug = page.slug || ''
        const layout = (page as any).layout as any[] | undefined
        if (!layout || layout.length === 0) continue

        let updated = false
        const updatedLayout = layout.map((block: any) => {
          if (block.blockType === 'heroBlock' && !block.backgroundImage) {
            let heroId: number | undefined
            if (slug === 'platform' || ['rank-tracker', 'site-audit', 'copilot', 'content-editor', 'keyword-research', 'analytics', 'reports', 'pages'].includes(slug)) {
              heroId = heroes.platform?.id
            } else if (slug === 'services' || ['seo-strategy', 'content-optimization', 'technical-audit', 'local-seo', 'link-building'].includes(slug)) {
              heroId = heroes.services?.id
            } else if (slug === 'solutions' || ['ecommerce', 'startups', 'agencies', 'enterprise'].includes(slug)) {
              heroId = heroes.solutions?.id
            } else if (slug === 'home') {
              heroId = heroes.home?.id
            }
            if (heroId) { updated = true; return { ...block, backgroundImage: heroId } }
          }

          if (block.blockType === 'featuresBlock' && slug === 'home' && block.features) {
            const iconOrder = [
              appIcons.rankTracker, appIcons.geoStrategy, appIcons.bottleneck,
              appIcons.contentDomination, appIcons.businessStrategy, appIcons.smartAgent,
            ]
            const updatedFeatures = block.features.map((f: any, idx: number) => {
              if (!f.image && iconOrder[idx]) { updated = true; return { ...f, image: iconOrder[idx]!.id } }
              return f
            })
            return { ...block, features: updatedFeatures }
          }

          if (block.blockType === 'ctaBlock' && !block.backgroundImage && slug === 'home' && heroes.home) {
            updated = true
            return { ...block, backgroundImage: heroes.home.id }
          }

          return block
        })

        if (updated) {
          await payload.update({ collection: 'pages', id: page.id, data: { layout: updatedLayout } as any, depth: 0 })
          pagesUpdated++
          payload.logger.info(`  Updated: ${slug}`)
        }
      }

      return Response.json({ success: true, step: 3, pagesUpdated, message: 'All pages updated with brand assets.' })
    }

    return Response.json({ error: 'Invalid step. Use ?step=1, ?step=2, or ?step=3' }, { status: 400 })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Brand asset seeder error' })
    return new Response(`Error: ${e instanceof Error ? e.message : 'unknown'}`, { status: 500 })
  }
}
