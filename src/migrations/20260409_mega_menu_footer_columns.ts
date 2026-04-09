import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // =========================================================================
  // HEADER: Add mega menu support (style, label, description, directLink, children)
  // =========================================================================

  // New enums
  await db.execute(sql`
    CREATE TYPE "public"."enum_header_nav_items_style" AS ENUM('dropdown', 'link');
    CREATE TYPE "public"."enum_header_nav_items_direct_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  `)

  // Add new columns to header_nav_items
  await db.execute(sql`
    ALTER TABLE "header_nav_items" ADD COLUMN "style" "enum_header_nav_items_style" DEFAULT 'dropdown';
    ALTER TABLE "header_nav_items" ADD COLUMN "label" varchar;
    ALTER TABLE "header_nav_items" ADD COLUMN "description" varchar;
    ALTER TABLE "header_nav_items" ADD COLUMN "direct_link_type" "enum_header_nav_items_direct_link_type" DEFAULT 'reference';
    ALTER TABLE "header_nav_items" ADD COLUMN "direct_link_new_tab" boolean;
    ALTER TABLE "header_nav_items" ADD COLUMN "direct_link_url" varchar;
    ALTER TABLE "header_nav_items" ADD COLUMN "direct_link_label" varchar;
  `)

  // Create children table for dropdown items
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "header_nav_items_children" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL,
      "description" varchar
    );

    CREATE INDEX IF NOT EXISTS "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");

    ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // =========================================================================
  // FOOTER: Replace flat navItems with columns + bottomLinks + copyright
  // =========================================================================

  // New enums
  await db.execute(sql`
    CREATE TYPE "public"."enum_footer_columns_nav_items_link_type" AS ENUM('reference', 'custom');
    CREATE TYPE "public"."enum_footer_bottom_links_link_type" AS ENUM('reference', 'custom');
  `)

  // Create columns table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");

    ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // Create columns nav_items table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer_columns_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_footer_columns_nav_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "footer_columns_nav_items_order_idx" ON "footer_columns_nav_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_columns_nav_items_parent_id_idx" ON "footer_columns_nav_items" USING btree ("_parent_id");

    ALTER TABLE "footer_columns_nav_items" ADD CONSTRAINT "footer_columns_nav_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // Create bottom_links table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer_bottom_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_footer_bottom_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");

    ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // Add copyright column to footer
  await db.execute(sql`
    ALTER TABLE "footer" ADD COLUMN "copyright" varchar;
  `)

  // Drop old footer_nav_items (data will be re-seeded)
  await db.execute(sql`
    DROP TABLE IF EXISTS "footer_nav_items" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_footer_nav_items_link_type";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Restore footer_nav_items
  await db.execute(sql`
    CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
    CREATE TABLE "footer_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL
    );
    ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
    CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  `)

  // Drop new footer tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "footer_bottom_links" CASCADE;
    DROP TABLE IF EXISTS "footer_columns_nav_items" CASCADE;
    DROP TABLE IF EXISTS "footer_columns" CASCADE;
    ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright";
    DROP TYPE IF EXISTS "public"."enum_footer_columns_nav_items_link_type";
    DROP TYPE IF EXISTS "public"."enum_footer_bottom_links_link_type";
  `)

  // Drop new header tables and columns
  await db.execute(sql`
    DROP TABLE IF EXISTS "header_nav_items_children" CASCADE;
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "style";
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "label";
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "direct_link_type";
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "direct_link_new_tab";
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "direct_link_url";
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "direct_link_label";
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_style";
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_direct_link_type";
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_children_link_type";
  `)
}
