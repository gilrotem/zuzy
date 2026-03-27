import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum_pages_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum__pages_v_version_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum__pages_v_version_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum_posts_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum_posts_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum__posts_v_version_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum__posts_v_version_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum_products_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum_products_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum__products_v_version_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum__products_v_version_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum_brand_docs_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum_brand_docs_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum__brand_docs_v_version_meta_robots_override" AS ENUM('noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex');
  CREATE TYPE "public"."enum__brand_docs_v_version_meta_json_ld_type" AS ENUM('WebPage', 'Article', 'Product', 'FAQPage', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum_seo_settings_social_profiles_platform" AS ENUM('facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'github', 'tiktok');
  CREATE TABLE "pages_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_pages_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_version_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_posts_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__posts_v_version_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_products_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_products_v_version_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__products_v_version_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "brand_docs_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_brand_docs_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_brand_docs_v_version_meta_robots_override" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__brand_docs_v_version_meta_robots_override",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "seo_settings_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_seo_settings_social_profiles_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_additional_disallow_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_additional_blocked_bots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"user_agent" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_sitemap_exclude_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"org_name" varchar DEFAULT 'ZUZY',
  	"org_description" varchar DEFAULT 'ZUZY — פלטפורמת הפיתוח הישראלית',
  	"org_logo_id" integer,
  	"org_email" varchar,
  	"org_phone" varchar,
  	"org_address_street_address" varchar,
  	"org_address_city" varchar,
  	"org_address_region" varchar,
  	"org_address_postal_code" varchar,
  	"org_address_country" varchar DEFAULT 'IL',
  	"title_template" varchar DEFAULT '%s | ZUZY',
  	"title_separator" varchar DEFAULT '|',
  	"default_og_image_id" integer,
  	"twitter_handle" varchar DEFAULT '@zuzy',
  	"google_verification" varchar,
  	"bing_verification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages" ADD COLUMN "meta_canonical_override" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_json_ld_type" "enum_pages_meta_json_ld_type";
  ALTER TABLE "pages" ADD COLUMN "meta_breadcrumb_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_canonical_override" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_json_ld_type" "enum__pages_v_version_meta_json_ld_type";
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_breadcrumb_label" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_canonical_override" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_json_ld_type" "enum_posts_meta_json_ld_type";
  ALTER TABLE "posts" ADD COLUMN "meta_breadcrumb_label" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_canonical_override" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_json_ld_type" "enum__posts_v_version_meta_json_ld_type";
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_breadcrumb_label" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_canonical_override" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_json_ld_type" "enum_products_meta_json_ld_type";
  ALTER TABLE "products" ADD COLUMN "meta_breadcrumb_label" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_meta_canonical_override" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_meta_json_ld_type" "enum__products_v_version_meta_json_ld_type";
  ALTER TABLE "_products_v" ADD COLUMN "version_meta_breadcrumb_label" varchar;
  ALTER TABLE "brand_docs" ADD COLUMN "meta_canonical_override" varchar;
  ALTER TABLE "brand_docs" ADD COLUMN "meta_json_ld_type" "enum_brand_docs_meta_json_ld_type";
  ALTER TABLE "brand_docs" ADD COLUMN "meta_breadcrumb_label" varchar;
  ALTER TABLE "brand_docs_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "brand_docs_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "brand_docs_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_brand_docs_v" ADD COLUMN "version_meta_canonical_override" varchar;
  ALTER TABLE "_brand_docs_v" ADD COLUMN "version_meta_json_ld_type" "enum__brand_docs_v_version_meta_json_ld_type";
  ALTER TABLE "_brand_docs_v" ADD COLUMN "version_meta_breadcrumb_label" varchar;
  ALTER TABLE "_brand_docs_v_locales" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_brand_docs_v_locales" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_brand_docs_v_locales" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "pages_meta_robots_override" ADD CONSTRAINT "pages_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_meta_robots_override" ADD CONSTRAINT "_pages_v_version_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_meta_robots_override" ADD CONSTRAINT "posts_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_meta_robots_override" ADD CONSTRAINT "_posts_v_version_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_meta_robots_override" ADD CONSTRAINT "products_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_meta_robots_override" ADD CONSTRAINT "_products_v_version_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_docs_meta_robots_override" ADD CONSTRAINT "brand_docs_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."brand_docs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_docs_v_version_meta_robots_override" ADD CONSTRAINT "_brand_docs_v_version_meta_robots_override_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_brand_docs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_social_profiles" ADD CONSTRAINT "seo_settings_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_additional_disallow_paths" ADD CONSTRAINT "seo_settings_additional_disallow_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_additional_blocked_bots" ADD CONSTRAINT "seo_settings_additional_blocked_bots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_sitemap_exclude_paths" ADD CONSTRAINT "seo_settings_sitemap_exclude_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_org_logo_id_media_id_fk" FOREIGN KEY ("org_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_meta_robots_override_order_idx" ON "pages_meta_robots_override" USING btree ("order");
  CREATE INDEX "pages_meta_robots_override_parent_idx" ON "pages_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_robots_override_order_idx" ON "_pages_v_version_meta_robots_override" USING btree ("order");
  CREATE INDEX "_pages_v_version_meta_robots_override_parent_idx" ON "_pages_v_version_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "posts_meta_robots_override_order_idx" ON "posts_meta_robots_override" USING btree ("order");
  CREATE INDEX "posts_meta_robots_override_parent_idx" ON "posts_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_meta_robots_override_order_idx" ON "_posts_v_version_meta_robots_override" USING btree ("order");
  CREATE INDEX "_posts_v_version_meta_robots_override_parent_idx" ON "_posts_v_version_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "products_meta_robots_override_order_idx" ON "products_meta_robots_override" USING btree ("order");
  CREATE INDEX "products_meta_robots_override_parent_idx" ON "products_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_meta_robots_override_order_idx" ON "_products_v_version_meta_robots_override" USING btree ("order");
  CREATE INDEX "_products_v_version_meta_robots_override_parent_idx" ON "_products_v_version_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "brand_docs_meta_robots_override_order_idx" ON "brand_docs_meta_robots_override" USING btree ("order");
  CREATE INDEX "brand_docs_meta_robots_override_parent_idx" ON "brand_docs_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "_brand_docs_v_version_meta_robots_override_order_idx" ON "_brand_docs_v_version_meta_robots_override" USING btree ("order");
  CREATE INDEX "_brand_docs_v_version_meta_robots_override_parent_idx" ON "_brand_docs_v_version_meta_robots_override" USING btree ("parent_id");
  CREATE INDEX "seo_settings_social_profiles_order_idx" ON "seo_settings_social_profiles" USING btree ("_order");
  CREATE INDEX "seo_settings_social_profiles_parent_id_idx" ON "seo_settings_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_additional_disallow_paths_order_idx" ON "seo_settings_additional_disallow_paths" USING btree ("_order");
  CREATE INDEX "seo_settings_additional_disallow_paths_parent_id_idx" ON "seo_settings_additional_disallow_paths" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_additional_blocked_bots_order_idx" ON "seo_settings_additional_blocked_bots" USING btree ("_order");
  CREATE INDEX "seo_settings_additional_blocked_bots_parent_id_idx" ON "seo_settings_additional_blocked_bots" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_sitemap_exclude_paths_order_idx" ON "seo_settings_sitemap_exclude_paths" USING btree ("_order");
  CREATE INDEX "seo_settings_sitemap_exclude_paths_parent_id_idx" ON "seo_settings_sitemap_exclude_paths" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_org_logo_idx" ON "seo_settings" USING btree ("org_logo_id");
  CREATE INDEX "seo_settings_default_og_image_idx" ON "seo_settings" USING btree ("default_og_image_id");
  ALTER TABLE "brand_docs_locales" ADD CONSTRAINT "brand_docs_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_docs_v_locales" ADD CONSTRAINT "_brand_docs_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "brand_docs_meta_meta_image_idx" ON "brand_docs_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "_brand_docs_v_version_meta_version_meta_image_idx" ON "_brand_docs_v_locales" USING btree ("version_meta_image_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_docs_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brand_docs_v_version_meta_robots_override" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_social_profiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_additional_disallow_paths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_additional_blocked_bots" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_sitemap_exclude_paths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_meta_robots_override" CASCADE;
  DROP TABLE "_pages_v_version_meta_robots_override" CASCADE;
  DROP TABLE "posts_meta_robots_override" CASCADE;
  DROP TABLE "_posts_v_version_meta_robots_override" CASCADE;
  DROP TABLE "products_meta_robots_override" CASCADE;
  DROP TABLE "_products_v_version_meta_robots_override" CASCADE;
  DROP TABLE "brand_docs_meta_robots_override" CASCADE;
  DROP TABLE "_brand_docs_v_version_meta_robots_override" CASCADE;
  DROP TABLE "seo_settings_social_profiles" CASCADE;
  DROP TABLE "seo_settings_additional_disallow_paths" CASCADE;
  DROP TABLE "seo_settings_additional_blocked_bots" CASCADE;
  DROP TABLE "seo_settings_sitemap_exclude_paths" CASCADE;
  DROP TABLE "seo_settings" CASCADE;
  ALTER TABLE "brand_docs_locales" DROP CONSTRAINT "brand_docs_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "_brand_docs_v_locales" DROP CONSTRAINT "_brand_docs_v_locales_version_meta_image_id_media_id_fk";
  
  DROP INDEX "brand_docs_meta_meta_image_idx";
  DROP INDEX "_brand_docs_v_version_meta_version_meta_image_idx";
  ALTER TABLE "pages" DROP COLUMN "meta_canonical_override";
  ALTER TABLE "pages" DROP COLUMN "meta_json_ld_type";
  ALTER TABLE "pages" DROP COLUMN "meta_breadcrumb_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_canonical_override";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_json_ld_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_breadcrumb_label";
  ALTER TABLE "posts" DROP COLUMN "meta_canonical_override";
  ALTER TABLE "posts" DROP COLUMN "meta_json_ld_type";
  ALTER TABLE "posts" DROP COLUMN "meta_breadcrumb_label";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_canonical_override";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_json_ld_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_breadcrumb_label";
  ALTER TABLE "products" DROP COLUMN "meta_canonical_override";
  ALTER TABLE "products" DROP COLUMN "meta_json_ld_type";
  ALTER TABLE "products" DROP COLUMN "meta_breadcrumb_label";
  ALTER TABLE "_products_v" DROP COLUMN "version_meta_canonical_override";
  ALTER TABLE "_products_v" DROP COLUMN "version_meta_json_ld_type";
  ALTER TABLE "_products_v" DROP COLUMN "version_meta_breadcrumb_label";
  ALTER TABLE "brand_docs" DROP COLUMN "meta_canonical_override";
  ALTER TABLE "brand_docs" DROP COLUMN "meta_json_ld_type";
  ALTER TABLE "brand_docs" DROP COLUMN "meta_breadcrumb_label";
  ALTER TABLE "brand_docs_locales" DROP COLUMN "meta_title";
  ALTER TABLE "brand_docs_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "brand_docs_locales" DROP COLUMN "meta_description";
  ALTER TABLE "_brand_docs_v" DROP COLUMN "version_meta_canonical_override";
  ALTER TABLE "_brand_docs_v" DROP COLUMN "version_meta_json_ld_type";
  ALTER TABLE "_brand_docs_v" DROP COLUMN "version_meta_breadcrumb_label";
  ALTER TABLE "_brand_docs_v_locales" DROP COLUMN "version_meta_title";
  ALTER TABLE "_brand_docs_v_locales" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_brand_docs_v_locales" DROP COLUMN "version_meta_description";
  DROP TYPE "public"."enum_pages_meta_robots_override";
  DROP TYPE "public"."enum_pages_meta_json_ld_type";
  DROP TYPE "public"."enum__pages_v_version_meta_robots_override";
  DROP TYPE "public"."enum__pages_v_version_meta_json_ld_type";
  DROP TYPE "public"."enum_posts_meta_robots_override";
  DROP TYPE "public"."enum_posts_meta_json_ld_type";
  DROP TYPE "public"."enum__posts_v_version_meta_robots_override";
  DROP TYPE "public"."enum__posts_v_version_meta_json_ld_type";
  DROP TYPE "public"."enum_products_meta_robots_override";
  DROP TYPE "public"."enum_products_meta_json_ld_type";
  DROP TYPE "public"."enum__products_v_version_meta_robots_override";
  DROP TYPE "public"."enum__products_v_version_meta_json_ld_type";
  DROP TYPE "public"."enum_brand_docs_meta_robots_override";
  DROP TYPE "public"."enum_brand_docs_meta_json_ld_type";
  DROP TYPE "public"."enum__brand_docs_v_version_meta_robots_override";
  DROP TYPE "public"."enum__brand_docs_v_version_meta_json_ld_type";
  DROP TYPE "public"."enum_seo_settings_social_profiles_platform";`)
}
