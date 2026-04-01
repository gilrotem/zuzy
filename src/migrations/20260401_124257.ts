import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Drop the unique constraint on slug (needed for nested-docs parent-child hierarchy)
  await db.execute(sql`
   DROP INDEX IF EXISTS "pages_slug_idx";
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");`)

  // Step 2: Delete the template root "contact" page (conflicts with support--contact → contact)
  await db.execute(sql`
    DELETE FROM pages WHERE slug = 'contact' AND parent_id IS NULL
  `)

  // Step 3: Fix page hierarchy — set parent_id and strip -- prefix from slugs
  const sections = ['services', 'platform', 'legal', 'resources', 'support', 'solutions']

  for (const section of sections) {
    const indexResult = await db.execute(sql`
      SELECT id FROM pages WHERE slug = ${section} AND parent_id IS NULL LIMIT 1
    `)
    const indexPage = indexResult.rows?.[0]
    if (!indexPage) {
      console.log(`  Skipping section "${section}" — no index page found`)
      continue
    }
    const parentId = indexPage.id

    // Check if already migrated (child pages already have parent_id set)
    const alreadyDone = await db.execute(sql`
      SELECT COUNT(*) as cnt FROM pages WHERE parent_id = ${parentId}
    `)
    if (Number(alreadyDone.rows?.[0]?.cnt) > 0) {
      console.log(`  Section "${section}": already migrated, skipping`)
      continue
    }

    // Update child pages in pages table
    await db.execute(sql`
      UPDATE pages
      SET parent_id = ${parentId},
          slug = REPLACE(slug, ${section + '--'}, '')
      WHERE slug LIKE ${section + '--%'}
    `)

    // Update versions table
    await db.execute(sql`
      UPDATE _pages_v
      SET version_parent_id = ${parentId},
          version_slug = REPLACE(version_slug, ${section + '--'}, '')
      WHERE version_slug LIKE ${section + '--%'}
    `)

    console.log(`  Section "${section}": set parent_id=${parentId} on child pages`)
  }

  // Handle brand-docs section
  const brandDocsResult = await db.execute(sql`
    SELECT id FROM pages WHERE slug = 'brand-docs' AND parent_id IS NULL LIMIT 1
  `)
  if (brandDocsResult.rows?.[0]) {
    const brandDocsId = brandDocsResult.rows[0].id

    const alreadyDone = await db.execute(sql`
      SELECT COUNT(*) as cnt FROM pages WHERE parent_id = ${brandDocsId}
    `)
    if (Number(alreadyDone.rows?.[0]?.cnt) === 0) {
      await db.execute(sql`
        UPDATE pages
        SET parent_id = ${brandDocsId},
            slug = REPLACE(slug, 'brand-docs--', '')
        WHERE slug LIKE 'brand-docs--%'
      `)
      await db.execute(sql`
        UPDATE _pages_v
        SET version_parent_id = ${brandDocsId},
            version_slug = REPLACE(version_slug, 'brand-docs--', '')
        WHERE version_slug LIKE 'brand-docs--%'
      `)
      console.log(`  Section "brand-docs": set parent_id=${brandDocsId} on child pages`)
    }
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Restore unique index
  await db.execute(sql`
   DROP INDEX IF EXISTS "pages_slug_idx";
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");`)

  // Reverse: restore -- prefixed slugs and clear parent_id
  const sections = ['services', 'platform', 'legal', 'resources', 'support', 'solutions']

  for (const section of sections) {
    const indexResult = await db.execute(sql`
      SELECT id FROM pages WHERE slug = ${section} AND parent_id IS NULL LIMIT 1
    `)
    const indexPage = indexResult.rows?.[0]
    if (!indexPage) continue
    const parentId = indexPage.id

    await db.execute(sql`
      UPDATE pages
      SET slug = ${section + '--'} || slug,
          parent_id = NULL
      WHERE parent_id = ${parentId}
    `)
    await db.execute(sql`
      UPDATE _pages_v
      SET version_slug = ${section + '--'} || version_slug,
          version_parent_id = NULL
      WHERE version_parent_id = ${parentId}
    `)
  }

  // brand-docs
  const brandDocsResult = await db.execute(sql`
    SELECT id FROM pages WHERE slug = 'brand-docs' AND parent_id IS NULL LIMIT 1
  `)
  if (brandDocsResult.rows?.[0]) {
    const brandDocsId = brandDocsResult.rows[0].id
    await db.execute(sql`
      UPDATE pages
      SET slug = 'brand-docs--' || slug,
          parent_id = NULL
      WHERE parent_id = ${brandDocsId}
    `)
    await db.execute(sql`
      UPDATE _pages_v
      SET version_slug = 'brand-docs--' || version_slug,
          version_parent_id = NULL
      WHERE version_parent_id = ${brandDocsId}
    `)
  }
}
