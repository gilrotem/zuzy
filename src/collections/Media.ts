import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import crypto from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const getYearMonthPath = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  return `${year}/${month}`
}

const getUploadPrefix = () => {
  const uniqueId = crypto.randomUUID().replace(/-/g, '').slice(0, 8)

  return `${getYearMonthPath()}/${uniqueId}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if (operation !== 'create' || !process.env.S3_BUCKET) {
          return args
        }

        if (args && typeof args === 'object') {
          const createArgs = args as { data?: Record<string, unknown> }

          if (!createArgs.data) {
            createArgs.data = {}
          }

          if (typeof createArgs.data.prefix !== 'string' || !createArgs.data.prefix) {
            createArgs.data.prefix = getUploadPrefix()
          }
        }

        return args
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // When S3 storage is configured, files are stored in Supabase Storage
    // Local fallback: public/media (used only if S3 env vars are missing)
    ...(process.env.S3_BUCKET
      ? { disableLocalStorage: true }
      : { staticDir: path.resolve(dirname, '../../public/media') }),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
