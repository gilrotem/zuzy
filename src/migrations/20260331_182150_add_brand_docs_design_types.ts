import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_brand_docs_doc_type" ADD VALUE 'design-tokens';
  ALTER TYPE "public"."enum_brand_docs_doc_type" ADD VALUE 'logo-usage';
  ALTER TYPE "public"."enum_brand_docs_doc_type" ADD VALUE 'typography';
  ALTER TYPE "public"."enum_brand_docs_doc_type" ADD VALUE 'color-palette';
  ALTER TYPE "public"."enum_brand_docs_doc_type" ADD VALUE 'motion';
  ALTER TYPE "public"."enum_brand_docs_icon" ADD VALUE 'palette';
  ALTER TYPE "public"."enum_brand_docs_icon" ADD VALUE 'frame';
  ALTER TYPE "public"."enum_brand_docs_icon" ADD VALUE 'typography';
  ALTER TYPE "public"."enum_brand_docs_icon" ADD VALUE 'rainbow';
  ALTER TYPE "public"."enum_brand_docs_icon" ADD VALUE 'sparkles';
  ALTER TYPE "public"."enum__brand_docs_v_version_doc_type" ADD VALUE 'design-tokens';
  ALTER TYPE "public"."enum__brand_docs_v_version_doc_type" ADD VALUE 'logo-usage';
  ALTER TYPE "public"."enum__brand_docs_v_version_doc_type" ADD VALUE 'typography';
  ALTER TYPE "public"."enum__brand_docs_v_version_doc_type" ADD VALUE 'color-palette';
  ALTER TYPE "public"."enum__brand_docs_v_version_doc_type" ADD VALUE 'motion';
  ALTER TYPE "public"."enum__brand_docs_v_version_icon" ADD VALUE 'palette';
  ALTER TYPE "public"."enum__brand_docs_v_version_icon" ADD VALUE 'frame';
  ALTER TYPE "public"."enum__brand_docs_v_version_icon" ADD VALUE 'typography';
  ALTER TYPE "public"."enum__brand_docs_v_version_icon" ADD VALUE 'rainbow';
  ALTER TYPE "public"."enum__brand_docs_v_version_icon" ADD VALUE 'sparkles';
  CREATE TABLE "pages_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_grid_locales" (
  	"heading" varchar DEFAULT 'Logo Kit',
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_color_palette" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_color_palette_locales" (
  	"heading" varchar DEFAULT 'Color Palette',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_typography_specimen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_typography_specimen_locales" (
  	"heading" varchar DEFAULT 'Typography',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_grid_locales" (
  	"heading" varchar DEFAULT 'Logo Kit',
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_color_palette" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_color_palette_locales" (
  	"heading" varchar DEFAULT 'Color Palette',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_typography_specimen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_typography_specimen_locales" (
  	"heading" varchar DEFAULT 'Typography',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "primary_color" SET DEFAULT '#7C3AED';
  ALTER TABLE "site_settings" ALTER COLUMN "accent_color" SET DEFAULT '#0D9488';
  ALTER TABLE "pages_blocks_logo_grid" ADD CONSTRAINT "pages_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_grid_locales" ADD CONSTRAINT "pages_blocks_logo_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_color_palette" ADD CONSTRAINT "pages_blocks_color_palette_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_color_palette_locales" ADD CONSTRAINT "pages_blocks_color_palette_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_color_palette"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_typography_specimen" ADD CONSTRAINT "pages_blocks_typography_specimen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_typography_specimen_locales" ADD CONSTRAINT "pages_blocks_typography_specimen_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_typography_specimen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_grid" ADD CONSTRAINT "_pages_v_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_grid_locales" ADD CONSTRAINT "_pages_v_blocks_logo_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_color_palette" ADD CONSTRAINT "_pages_v_blocks_color_palette_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_color_palette_locales" ADD CONSTRAINT "_pages_v_blocks_color_palette_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_color_palette"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_typography_specimen" ADD CONSTRAINT "_pages_v_blocks_typography_specimen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_typography_specimen_locales" ADD CONSTRAINT "_pages_v_blocks_typography_specimen_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_typography_specimen"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_logo_grid_order_idx" ON "pages_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_grid_parent_id_idx" ON "pages_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_grid_path_idx" ON "pages_blocks_logo_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_logo_grid_locales_locale_parent_id_unique" ON "pages_blocks_logo_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_color_palette_order_idx" ON "pages_blocks_color_palette" USING btree ("_order");
  CREATE INDEX "pages_blocks_color_palette_parent_id_idx" ON "pages_blocks_color_palette" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_color_palette_path_idx" ON "pages_blocks_color_palette" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_color_palette_locales_locale_parent_id_unique" ON "pages_blocks_color_palette_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_typography_specimen_order_idx" ON "pages_blocks_typography_specimen" USING btree ("_order");
  CREATE INDEX "pages_blocks_typography_specimen_parent_id_idx" ON "pages_blocks_typography_specimen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_typography_specimen_path_idx" ON "pages_blocks_typography_specimen" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_typography_specimen_locales_locale_parent_id_un" ON "pages_blocks_typography_specimen_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_grid_order_idx" ON "_pages_v_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_grid_parent_id_idx" ON "_pages_v_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_grid_path_idx" ON "_pages_v_blocks_logo_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_logo_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_logo_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_color_palette_order_idx" ON "_pages_v_blocks_color_palette" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_color_palette_parent_id_idx" ON "_pages_v_blocks_color_palette" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_color_palette_path_idx" ON "_pages_v_blocks_color_palette" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_color_palette_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_color_palette_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_typography_specimen_order_idx" ON "_pages_v_blocks_typography_specimen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_typography_specimen_parent_id_idx" ON "_pages_v_blocks_typography_specimen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_typography_specimen_path_idx" ON "_pages_v_blocks_typography_specimen" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_typography_specimen_locales_locale_parent_id" ON "_pages_v_blocks_typography_specimen_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_color_palette" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_color_palette_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_typography_specimen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_typography_specimen_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_color_palette" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_color_palette_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_typography_specimen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_typography_specimen_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_logo_grid" CASCADE;
  DROP TABLE "pages_blocks_logo_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_color_palette" CASCADE;
  DROP TABLE "pages_blocks_color_palette_locales" CASCADE;
  DROP TABLE "pages_blocks_typography_specimen" CASCADE;
  DROP TABLE "pages_blocks_typography_specimen_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_color_palette" CASCADE;
  DROP TABLE "_pages_v_blocks_color_palette_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_typography_specimen" CASCADE;
  DROP TABLE "_pages_v_blocks_typography_specimen_locales" CASCADE;
  ALTER TABLE "brand_docs" ALTER COLUMN "doc_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_brand_docs_doc_type";
  CREATE TYPE "public"."enum_brand_docs_doc_type" AS ENUM('essence', 'brand-voice', 'business-model', 'differentiation', 'process', 'sales', 'solutions', 'faq', 'case-studies');
  ALTER TABLE "brand_docs" ALTER COLUMN "doc_type" SET DATA TYPE "public"."enum_brand_docs_doc_type" USING "doc_type"::"public"."enum_brand_docs_doc_type";
  ALTER TABLE "brand_docs" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_brand_docs_icon";
  CREATE TYPE "public"."enum_brand_docs_icon" AS ENUM('dna', 'mic', 'briefcase', 'target', 'gear', 'chart', 'puzzle', 'question', 'clipboard');
  ALTER TABLE "brand_docs" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_brand_docs_icon" USING "icon"::"public"."enum_brand_docs_icon";
  ALTER TABLE "_brand_docs_v" ALTER COLUMN "version_doc_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__brand_docs_v_version_doc_type";
  CREATE TYPE "public"."enum__brand_docs_v_version_doc_type" AS ENUM('essence', 'brand-voice', 'business-model', 'differentiation', 'process', 'sales', 'solutions', 'faq', 'case-studies');
  ALTER TABLE "_brand_docs_v" ALTER COLUMN "version_doc_type" SET DATA TYPE "public"."enum__brand_docs_v_version_doc_type" USING "version_doc_type"::"public"."enum__brand_docs_v_version_doc_type";
  ALTER TABLE "_brand_docs_v" ALTER COLUMN "version_icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__brand_docs_v_version_icon";
  CREATE TYPE "public"."enum__brand_docs_v_version_icon" AS ENUM('dna', 'mic', 'briefcase', 'target', 'gear', 'chart', 'puzzle', 'question', 'clipboard');
  ALTER TABLE "_brand_docs_v" ALTER COLUMN "version_icon" SET DATA TYPE "public"."enum__brand_docs_v_version_icon" USING "version_icon"::"public"."enum__brand_docs_v_version_icon";
  ALTER TABLE "site_settings" ALTER COLUMN "primary_color" SET DEFAULT '#7354C4';
  ALTER TABLE "site_settings" ALTER COLUMN "accent_color" SET DEFAULT '#06B6D4';`)
}
