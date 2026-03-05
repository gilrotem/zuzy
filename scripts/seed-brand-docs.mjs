/**
 * Seed 9 BrandDocs via Payload REST API.
 *
 * Usage:
 *   1. Start dev server: pnpm dev
 *   2. Run: node scripts/seed-brand-docs.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const API_URL = process.env.API_URL || 'http://localhost:3000'
const EMAIL = 'GPR@GILROTEM.COM'
const PASSWORD = 'Admin123!'

// Brand docs metadata
const BRAND_DOCS = [
  { docType: 'essence', icon: 'dna', sortOrder: 1, file: 'essence.txt', titleHe: 'מהות ו-DNA של זוזי', summaryHe: 'הפילוסופיה, הראייה והערכים שמנחים כל מה שאנחנו עושים', titleEn: 'ZUZY Essence & DNA', summaryEn: 'The philosophy, vision and values that guide everything we do' },
  { docType: 'brand-voice', icon: 'mic', sortOrder: 2, file: 'brand-voice.txt', titleHe: 'שפה וטון של המותג', summaryHe: 'DNA המותג – איך מדברים, כותבים ונראים בכל נקודת מגע', titleEn: 'Brand Voice & Tone', summaryEn: 'Brand DNA – how we speak, write and appear at every touchpoint' },
  { docType: 'differentiation', icon: 'target', sortOrder: 3, file: 'differentiation.txt', titleHe: 'בידול ומיצוב', summaryHe: 'מה מבדיל אותנו מכלי אוטומציה, סוכנויות טכנולוגיה, יועצים ו-CRM מדף', titleEn: 'Differentiation & Positioning', summaryEn: 'What sets us apart from automation tools, tech agencies, consultants and off-the-shelf CRMs' },
  { docType: 'business-model', icon: 'briefcase', sortOrder: 4, file: 'business-model.txt', titleHe: 'מודל עסקי', summaryHe: 'הכנסות, סוגי מוצרים, מחירים, ותמהיל מדף מול תפירה', titleEn: 'Business Model', summaryEn: 'Revenue, product types, pricing, and off-the-shelf vs. custom mix' },
  { docType: 'solutions', icon: 'puzzle', sortOrder: 5, file: 'solutions.txt', titleHe: 'פתרונות ושירותים', summaryHe: 'ארבע קטגוריות פתרונות שמכסות את כל הצרכים הטכנולוגיים של העסק', titleEn: 'Solutions & Services', summaryEn: 'Four solution categories covering all business technology needs' },
  { docType: 'sales', icon: 'chart', sortOrder: 6, file: 'sales.txt', titleHe: 'אסטרטגיית מכירה', summaryHe: 'מי הלקוח הראשוני, איך מתחילים למכור, ואיך מוכיחים ערך מהר', titleEn: 'Sales Strategy', summaryEn: 'Early adopter profile, first sales approach, and fast value proof' },
  { docType: 'process', icon: 'gear', sortOrder: 7, file: 'process.txt', titleHe: 'תהליך עבודה', summaryHe: 'חמישה שלבים מתודולוגיים שמבטיחים תוצאה איכותית', titleEn: 'Work Process', summaryEn: 'Five methodological steps ensuring quality outcomes' },
  { docType: 'faq', icon: 'question', sortOrder: 8, file: 'faq.txt', titleHe: 'שאלות ותשובות', summaryHe: 'תשובות לשאלות הנפוצות ביותר על ZUZY', titleEn: 'FAQ', summaryEn: 'Answers to the most frequently asked questions about ZUZY' },
  { docType: 'case-studies', icon: 'clipboard', sortOrder: 9, file: 'case-studies.txt', titleHe: 'מקרי בוחן', summaryHe: 'דוגמאות לפרויקטים שביצענו ותוצאות שהשגנו', titleEn: 'Case Studies', summaryEn: 'Project examples and results we achieved' },
]

// Content directory
const CONTENT_DIR = path.join(process.env.USERPROFILE || process.env.HOME || '', 'zuzy-migration', 'knowledge', 'cleaned')

/** Convert plain text into Lexical JSON rich text format */
function textToLexical(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim())
  const children = []

  for (const line of lines) {
    const trimmed = line.trim()

    // Skip icon-like single words (star, build, handshake, verified, etc.)
    if (/^[a-z_]+$/i.test(trimmed) && trimmed.length < 20) continue

    // Skip lines that are just "AI & דיגיטל" credits
    if (trimmed.includes('ארכיטקטורה ופיתוח:')) continue

    // Detect markdown-style headings
    const h2Match = trimmed.match(/^##\s+(.+)/)
    const h1Match = trimmed.match(/^#\s+(.+)/)

    // Detect lines that look like headings (short, no period, possibly bold)
    const boldMatch = trimmed.match(/^\*\*(.+)\*\*$/)
    const isShortHeading = !trimmed.includes('.') && trimmed.length < 80 && !trimmed.startsWith('"') && !trimmed.startsWith('—')

    if (h1Match) {
      children.push(makeHeading(h1Match[1], 'h2'))
    } else if (h2Match) {
      children.push(makeHeading(h2Match[1], 'h3'))
    } else if (boldMatch) {
      children.push(makeParagraph(boldMatch[1], true))
    } else if (isShortHeading && children.length > 0 && lines.indexOf(line) > 2) {
      // Lines after the first few that are short and don't end with period = subheading
      children.push(makeHeading(trimmed, 'h3'))
    } else if (trimmed.startsWith('"') || trimmed.startsWith('״')) {
      // Quote
      children.push(makeQuote(trimmed))
    } else if (trimmed.startsWith('—') || trimmed.startsWith('–')) {
      // Attribution (append to previous if it's a quote)
      children.push(makeParagraph(trimmed, true))
    } else {
      children.push(makeParagraph(trimmed))
    }
  }

  // Ensure at least one paragraph
  if (children.length === 0) {
    children.push(makeParagraph(''))
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'rtl',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function makeHeading(text, tag = 'h2') {
  return {
    type: 'heading',
    children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'rtl',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

function makeParagraph(text, bold = false) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', detail: 0, format: bold ? 1 : 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'rtl',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

function makeQuote(text) {
  return {
    type: 'quote',
    children: [{ type: 'text', detail: 0, format: 2, mode: 'normal', style: '', text, version: 1 }],
    direction: 'rtl',
    format: '',
    indent: 0,
    version: 1,
  }
}

async function login() {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.token
}

async function deleteExistingBrandDocs(token) {
  const res = await fetch(`${API_URL}/api/brand-docs?limit=100`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  if (data.docs?.length) {
    console.log(`  Deleting ${data.docs.length} existing brand docs...`)
    for (const doc of data.docs) {
      await fetch(`${API_URL}/api/brand-docs/${doc.id}`, {
        method: 'DELETE',
        headers: { Authorization: `JWT ${token}` },
      })
    }
  }
}

async function createBrandDoc(token, docData) {
  const res = await fetch(`${API_URL}/api/brand-docs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(docData),
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Failed to create brand doc: ${res.status} ${errText}`)
  }
  return await res.json()
}

async function main() {
  console.log('🌱 Seeding Brand Docs...')
  console.log(`  API: ${API_URL}`)
  console.log(`  Content dir: ${CONTENT_DIR}`)

  // Login
  console.log('  Logging in...')
  const token = await login()
  console.log('  ✓ Logged in')

  // Delete existing
  await deleteExistingBrandDocs(token)

  // Create each brand doc
  for (const meta of BRAND_DOCS) {
    const filePath = path.join(CONTENT_DIR, meta.file)
    let contentText = ''
    try {
      contentText = fs.readFileSync(filePath, 'utf-8')
    } catch {
      console.warn(`  ⚠ File not found: ${filePath}, creating with empty content`)
    }

    const lexicalContent = textToLexical(contentText)

    const docData = {
      title: meta.titleHe,
      docType: meta.docType,
      icon: meta.icon,
      sortOrder: meta.sortOrder,
      summary: meta.summaryHe,
      content: lexicalContent,
      slug: meta.docType,
      _status: 'published',
      publishedAt: new Date().toISOString(),
    }

    try {
      const result = await createBrandDoc(token, docData)
      console.log(`  ✓ Created: ${meta.titleHe} (${meta.docType}) → id=${result.doc?.id}`)
    } catch (err) {
      console.error(`  ✗ Failed: ${meta.titleHe} — ${err.message}`)
    }
  }

  console.log('\n✅ Brand docs seeding complete!')
}

main().catch(console.error)
