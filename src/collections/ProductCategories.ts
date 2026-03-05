import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: { he: 'קטגוריית מוצר', en: 'Product Category' },
    plural: { he: 'קטגוריות מוצרים', en: 'Product Categories' },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: { he: 'מוצרים', en: 'Products' },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { he: 'שם קטגוריה', en: 'Category Name' },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { he: 'תיאור', en: 'Description' },
    },
    slugField({
      position: undefined,
    }),
  ],
}
