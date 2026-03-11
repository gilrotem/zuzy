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

const s3Endpoint = process.env.S3_ENDPOINT?.trim()
const s3Bucket = process.env.S3_BUCKET?.trim()

const s3PublicBaseURL =
  s3Endpoint && s3Bucket
    ? `${s3Endpoint.replace(/\/s3\/?$/, '/object/public')}/${s3Bucket}`
    : undefined

const buildSupabasePublicURL = ({
  filename,
  prefix,
}: {
  filename?: string | null
  prefix?: string | null
}) => {
  if (!s3PublicBaseURL || !filename) {
    return undefined
  }

  const normalizedPrefix = prefix?.replace(/^\/+|\/+$/g, '')
  const encodedFilename = encodeURIComponent(filename)

  return normalizedPrefix
    ? `${s3PublicBaseURL}/${normalizedPrefix}/${encodedFilename}`
    : `${s3PublicBaseURL}/${encodedFilename}`
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
    afterRead: [
      ({ doc }) => {
        if (!s3PublicBaseURL || !doc || typeof doc !== 'object') {
          return doc
        }

        const mediaDoc = doc as {
          filename?: string | null
          prefix?: string | null
          url?: string | null
          thumbnailURL?: string | null
          sizes?: Record<string, { url?: string | null; filename?: string | null } | null> | null
        }

        if (typeof mediaDoc.url === 'string' && mediaDoc.url.startsWith('/api/media/file/')) {
          mediaDoc.url =
            buildSupabasePublicURL({ filename: mediaDoc.filename, prefix: mediaDoc.prefix }) ||
            mediaDoc.url
        }

        if (
          typeof mediaDoc.thumbnailURL === 'string' &&
          mediaDoc.thumbnailURL.startsWith('/api/media/file/')
        ) {
          const thumbnail = mediaDoc.sizes?.thumbnail

          mediaDoc.thumbnailURL =
            buildSupabasePublicURL({ filename: thumbnail?.filename, prefix: mediaDoc.prefix }) ||
            mediaDoc.thumbnailURL
        }

        if (mediaDoc.sizes && typeof mediaDoc.sizes === 'object') {
          Object.values(mediaDoc.sizes).forEach((size) => {
            if (!size || typeof size !== 'object') return
            if (typeof size.url === 'string' && size.url.startsWith('/api/media/file/')) {
              size.url =
                buildSupabasePublicURL({ filename: size.filename, prefix: mediaDoc.prefix }) ||
                size.url
            }
          })
        }

        return mediaDoc
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
