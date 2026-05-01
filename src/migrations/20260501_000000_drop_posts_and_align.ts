import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Phase 8 — Blog/WP Architecture Cleanup (2026-05-01)
 *
 * Drops the legacy Payload `Posts` collection and the `archive` block (Pages),
 * realigns polymorphic `*_rels` tables to the new `relationTo: ['pages', 'products', 'brand-docs']`
 * shape used by `link.ts`, `defaultLexical.ts`, and the Pages link/richText fields.
 *
 * Schema changes:
 *  - Drops 12 tables: posts*, _posts_v*, pages_blocks_archive, _pages_v_blocks_archive
 *  - Drops 11 enums (posts statuses, archive populate-by/relation-to, version locales)
 *  - Drops `posts_id` column from 7 surviving *_rels tables
 *  - Adds `products_id` + `brand_docs_id` (with FK + index) to header_rels, footer_rels,
 *    pages_rels, _pages_v_rels (where they were missing — link fields now reference
 *    products and brand-docs collections)
 *
 * Data impact: 3 demo posts ("Digital Horizons", "Global Gaze", "Dollar and Sense")
 * are deleted. They were Payload starter-template seed data, not production content.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Drop Posts and Archive block tables (CASCADE removes FK constraints in other rels tables)
    DROP TABLE IF EXISTS
      "posts",
      "posts_locales",
      "posts_rels",
      "posts_meta_robots_override",
      "posts_populated_authors",
      "_posts_v",
      "_posts_v_locales",
      "_posts_v_rels",
      "_posts_v_version_meta_robots_override",
      "_posts_v_version_populated_authors",
      "pages_blocks_archive",
      "_pages_v_blocks_archive"
    CASCADE;

    -- 2. Drop now-orphan posts_id columns (CASCADE drops their indexes)
    ALTER TABLE "header_rels"                    DROP COLUMN IF EXISTS "posts_id" CASCADE;
    ALTER TABLE "footer_rels"                    DROP COLUMN IF EXISTS "posts_id" CASCADE;
    ALTER TABLE "pages_rels"                     DROP COLUMN IF EXISTS "posts_id" CASCADE;
    ALTER TABLE "_pages_v_rels"                  DROP COLUMN IF EXISTS "posts_id" CASCADE;
    ALTER TABLE "redirects_rels"                 DROP COLUMN IF EXISTS "posts_id" CASCADE;
    ALTER TABLE "search_rels"                    DROP COLUMN IF EXISTS "posts_id" CASCADE;
    ALTER TABLE "payload_locked_documents_rels"  DROP COLUMN IF EXISTS "posts_id" CASCADE;

    -- 3. Drop unused enums
    DROP TYPE IF EXISTS
      "public"."enum_posts_status",
      "public"."enum_posts_meta_robots_override",
      "public"."enum_posts_meta_json_ld_type",
      "public"."enum__posts_v_published_locale",
      "public"."enum__posts_v_version_status",
      "public"."enum__posts_v_version_meta_robots_override",
      "public"."enum__posts_v_version_meta_json_ld_type",
      "public"."enum_pages_blocks_archive_populate_by",
      "public"."enum_pages_blocks_archive_relation_to",
      "public"."enum__pages_v_blocks_archive_populate_by",
      "public"."enum__pages_v_blocks_archive_relation_to";

    -- 4. Add products_id + brand_docs_id columns where missing
    -- (link fields' relationTo went from ['pages', 'posts'] to ['pages', 'products', 'brand-docs'])

    ALTER TABLE "header_rels" ADD COLUMN "products_id"   integer;
    ALTER TABLE "header_rels" ADD COLUMN "brand_docs_id" integer;
    ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_products_fk"
      FOREIGN KEY ("products_id")   REFERENCES "public"."products"("id")    ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_brand_docs_fk"
      FOREIGN KEY ("brand_docs_id") REFERENCES "public"."brand_docs"("id")  ON DELETE CASCADE ON UPDATE NO ACTION;
    CREATE INDEX "header_rels_products_id_idx"   ON "header_rels" USING btree ("products_id");
    CREATE INDEX "header_rels_brand_docs_id_idx" ON "header_rels" USING btree ("brand_docs_id");

    ALTER TABLE "footer_rels" ADD COLUMN "products_id"   integer;
    ALTER TABLE "footer_rels" ADD COLUMN "brand_docs_id" integer;
    ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_products_fk"
      FOREIGN KEY ("products_id")   REFERENCES "public"."products"("id")    ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_brand_docs_fk"
      FOREIGN KEY ("brand_docs_id") REFERENCES "public"."brand_docs"("id")  ON DELETE CASCADE ON UPDATE NO ACTION;
    CREATE INDEX "footer_rels_products_id_idx"   ON "footer_rels" USING btree ("products_id");
    CREATE INDEX "footer_rels_brand_docs_id_idx" ON "footer_rels" USING btree ("brand_docs_id");

    ALTER TABLE "pages_rels" ADD COLUMN "products_id"   integer;
    ALTER TABLE "pages_rels" ADD COLUMN "brand_docs_id" integer;
    ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk"
      FOREIGN KEY ("products_id")   REFERENCES "public"."products"("id")    ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_brand_docs_fk"
      FOREIGN KEY ("brand_docs_id") REFERENCES "public"."brand_docs"("id")  ON DELETE CASCADE ON UPDATE NO ACTION;
    CREATE INDEX "pages_rels_products_id_idx"   ON "pages_rels" USING btree ("products_id");
    CREATE INDEX "pages_rels_brand_docs_id_idx" ON "pages_rels" USING btree ("brand_docs_id");

    ALTER TABLE "_pages_v_rels" ADD COLUMN "products_id"   integer;
    ALTER TABLE "_pages_v_rels" ADD COLUMN "brand_docs_id" integer;
    ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk"
      FOREIGN KEY ("products_id")   REFERENCES "public"."products"("id")    ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_brand_docs_fk"
      FOREIGN KEY ("brand_docs_id") REFERENCES "public"."brand_docs"("id")  ON DELETE CASCADE ON UPDATE NO ACTION;
    CREATE INDEX "_pages_v_rels_products_id_idx"   ON "_pages_v_rels" USING btree ("products_id");
    CREATE INDEX "_pages_v_rels_brand_docs_id_idx" ON "_pages_v_rels" USING btree ("brand_docs_id");
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error(
    'drop_posts_and_align is not reversible — Posts collection schema and Archive block schema would need to be recreated from scratch, and the demo post data is permanently lost. To revert, restore from a Supabase backup taken before this migration applied.',
  )
}
