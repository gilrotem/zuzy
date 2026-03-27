import { postgresAdapter } from '@payloadcms/db-postgres'
import { he } from '@payloadcms/translations/languages/he'
import { en } from '@payloadcms/translations/languages/en'
import { ar } from '@payloadcms/translations/languages/ar'
import { ru } from '@payloadcms/translations/languages/ru'
import { fr } from '@payloadcms/translations/languages/fr'
import { es } from '@payloadcms/translations/languages/es'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { ProductCategories } from './collections/ProductCategories'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { BrandDocs } from './collections/BrandDocs'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteSettings } from './SiteSettings/config'
import { SEOSettings } from './SEOSettings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    meta: {
      titleSuffix: '— ZUZY Admin',
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: (() => {
      const raw = process.env.DATABASE_URL || ''
      try {
        const u = new URL(raw)
        return {
          host: u.hostname,
          port: Number(u.port) || 5432,
          database: u.pathname.replace(/^\//, ''),
          user: decodeURIComponent(u.username),
          password: decodeURIComponent(u.password),
          ssl: { rejectUnauthorized: false },
        }
      } catch {
        return { connectionString: raw }
      }
    })(),
  }),
  collections: [Pages, Posts, Media, Categories, ProductCategories, Products, BrandDocs, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SiteSettings, SEOSettings],

  // ===== I18N — Admin Interface =====
  i18n: {
    supportedLanguages: { he, en, ar, ru, fr, es },
    fallbackLanguage: 'he',
  },

  // ===== LOCALIZATION — Content =====
  localization: {
    locales: [
      { label: 'עברית', code: 'he', rtl: true },
      { label: 'English', code: 'en' },
      { label: 'Русский', code: 'ru' },
      { label: 'العربية', code: 'ar', rtl: true },
      { label: 'Français', code: 'fr' },
      { label: 'Español', code: 'es' },
    ],
    defaultLocale: 'he',
    fallback: true,
  },

  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
