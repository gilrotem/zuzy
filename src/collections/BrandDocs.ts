import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const BrandDocs: CollectionConfig = {
  slug: 'brand-docs',
  labels: {
    singular: { he: 'מסמך מותג', en: 'Brand Document' },
    plural: { he: 'מסמכי מותג', en: 'Brand Documents' },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'docType', 'sortOrder', 'updatedAt'],
    useAsTitle: 'title',
    group: { he: 'מותג', en: 'Brand' },
  },
  defaultPopulate: {
    title: true,
    slug: true,
    docType: true,
    icon: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { he: 'כותרת', en: 'Title' },
    },
    {
      name: 'docType',
      type: 'select',
      required: true,
      label: { he: 'סוג מסמך', en: 'Document Type' },
      options: [
        { label: { he: 'מהות', en: 'Essence' }, value: 'essence' },
        { label: { he: 'טון מותג', en: 'Brand Voice' }, value: 'brand-voice' },
        { label: { he: 'מודל עסקי', en: 'Business Model' }, value: 'business-model' },
        { label: { he: 'בידול', en: 'Differentiation' }, value: 'differentiation' },
        { label: { he: 'תהליך', en: 'Process' }, value: 'process' },
        { label: { he: 'מכירות', en: 'Sales' }, value: 'sales' },
        { label: { he: 'פתרונות', en: 'Solutions' }, value: 'solutions' },
        { label: { he: 'שאלות נפוצות', en: 'FAQ' }, value: 'faq' },
        { label: { he: 'מקרי בוחן', en: 'Case Studies' }, value: 'case-studies' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: { he: 'אייקון', en: 'Icon' },
      options: [
        { label: '🧬', value: 'dna' },
        { label: '🎙️', value: 'mic' },
        { label: '💼', value: 'briefcase' },
        { label: '🎯', value: 'target' },
        { label: '⚙️', value: 'gear' },
        { label: '📈', value: 'chart' },
        { label: '🧩', value: 'puzzle' },
        { label: '❓', value: 'question' },
        { label: '📋', value: 'clipboard' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      label: { he: 'תקציר', en: 'Summary' },
      admin: {
        description: { he: 'תיאור קצר של המסמך', en: 'Short description of the document' },
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: { he: 'תוכן', en: 'Content' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: { he: 'סדר מיון', en: 'Sort Order' },
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 10,
  },
}
