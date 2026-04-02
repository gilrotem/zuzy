import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post, Product, BrandDoc } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page | Product | BrandDoc> = ({ doc }) => {
  return doc?.title ? `${doc.title} | ZUZY` : 'ZUZY'
}

const generateURL: GenerateURL<Post | Page | Product | BrandDoc> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

const s3Endpoint = process.env.S3_ENDPOINT?.trim()
const s3Bucket = process.env.S3_BUCKET?.trim()
const s3Region = process.env.S3_REGION?.trim()
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID?.trim()
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim()

const s3PublicBaseURL =
  s3Endpoint && s3Bucket
    ? `${s3Endpoint.replace(/\/s3\/?$/, '/object/public')}/${s3Bucket}`
    : undefined

const generateS3MediaURL = ({ filename, prefix }: { filename: string; prefix?: string }) => {
  if (!s3PublicBaseURL) {
    return `/api/media/file/${encodeURIComponent(filename)}`
  }

  const normalizedPrefix = prefix?.replace(/^\/+|\/+$/g, '')

  return normalizedPrefix
    ? `${s3PublicBaseURL}/${normalizedPrefix}/${encodeURIComponent(filename)}`
    : `${s3PublicBaseURL}/${encodeURIComponent(filename)}`
}

export const plugins: Plugin[] = [
  s3Storage({
    collections: {
      media: {
        prefix: '',
        generateFileURL: ({ filename, prefix }) => generateS3MediaURL({ filename, prefix }),
      },
    },
    bucket: s3Bucket || 'media',
    config: {
      endpoint: s3Endpoint,
      credentials: {
        accessKeyId: s3AccessKeyId || '',
        secretAccessKey: s3SecretAccessKey || '',
      },
      region: s3Region || 'ap-northeast-1',
      forcePathStyle: true,
    },
  }),
  redirectsPlugin({
    collections: ['pages', 'posts', 'products', 'brand-docs'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories', 'product-categories', 'pages'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['pages', 'posts', 'products', 'brand-docs'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
