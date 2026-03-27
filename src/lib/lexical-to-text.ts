/**
 * Extract plain text from Lexical richtext JSON.
 * Used for generating JSON-LD structured data from richtext fields.
 */
export function lexicalToPlainText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''

  const root = (data as { root?: unknown }).root
  if (!root || typeof root !== 'object') return ''

  return extractText(root)
}

function extractText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''

  const n = node as { type?: string; text?: string; children?: unknown[] }

  // Text node
  if (n.text) return n.text

  // Recurse into children
  if (Array.isArray(n.children)) {
    return n.children.map(extractText).filter(Boolean).join(' ')
  }

  return ''
}
