import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { generatePreviewPath } from '../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  labels: {
    singular: { he: 'מוצר', en: 'Product' },
    plural: { he: 'מוצרים', en: 'Products' },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    price: true,
    currency: true,
    featuredImage: true,
    productCategories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'productCategories', 'price', '_status'],
    group: { he: 'מוצרים', en: 'Products' },
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
  },
  versions: {
    drafts: {
      autosave: { interval: 5000 },
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { he: 'שם מוצר', en: 'Product Name' },
    },
    slugField({
      position: undefined,
    }),
    {
      type: 'tabs',
      tabs: [
        {
          label: { he: 'תוכן', en: 'Content' },
          fields: [
            {
              name: 'description',
              type: 'richText',
              localized: true,
              label: { he: 'תיאור', en: 'Description' },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: { he: 'תמונה ראשית', en: 'Featured Image' },
            },
          ],
        },
        {
          label: { he: 'פרטים', en: 'Details' },
          fields: [
            {
              name: 'productCategories',
              type: 'relationship',
              relationTo: 'product-categories',
              hasMany: true,
              label: { he: 'קטגוריות מוצר', en: 'Product Categories' },
            },
            {
              name: 'price',
              type: 'number',
              label: { he: 'מחיר', en: 'Price' },
            },
            {
              name: 'currency',
              type: 'select',
              defaultValue: 'ILS',
              label: { he: 'מטבע', en: 'Currency' },
              options: [
                { label: '₪ ILS', value: 'ILS' },
                { label: '$ USD', value: 'USD' },
                { label: '€ EUR', value: 'EUR' },
              ],
            },
            {
              name: 'growProductId',
              type: 'text',
              label: { he: 'GROW Product ID', en: 'GROW Product ID' },
              admin: {
                description: 'Product ID in GROW payment system',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}
