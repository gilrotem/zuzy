import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_block_style" AS ENUM('default', 'centered', 'withImage', 'fullScreen');
  CREATE TYPE "public"."enum_pages_blocks_features_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_features_block_style" AS ENUM('cards', 'list', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_style" AS ENUM('default', 'bold', 'minimal', 'withBackground');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_block_style" AS ENUM('cards', 'carousel', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_faq_block_style" AS ENUM('accordion', 'list', 'twoColumns');
  CREATE TYPE "public"."enum_pages_blocks_pricing_block_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_pricing_block_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_rich_content_block_image_position" AS ENUM('right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_block_style" AS ENUM('timeline', 'numbered', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_block_style" AS ENUM('default', 'centered', 'withImage', 'fullScreen');
  CREATE TYPE "public"."enum__pages_v_blocks_features_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_features_block_style" AS ENUM('cards', 'list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_style" AS ENUM('default', 'bold', 'minimal', 'withBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_block_style" AS ENUM('cards', 'carousel', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_block_style" AS ENUM('accordion', 'list', 'twoColumns');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_block_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_block_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_content_block_image_position" AS ENUM('right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_block_style" AS ENUM('timeline', 'numbered', 'cards');
  CREATE TYPE "public"."enum_brand_docs_doc_type" AS ENUM('essence', 'brand-voice', 'business-model', 'differentiation', 'process', 'sales', 'solutions', 'faq', 'case-studies');
  CREATE TYPE "public"."enum_brand_docs_icon" AS ENUM('dna', 'mic', 'briefcase', 'target', 'gear', 'chart', 'puzzle', 'question', 'clipboard');
  CREATE TYPE "public"."enum_brand_docs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__brand_docs_v_version_doc_type" AS ENUM('essence', 'brand-voice', 'business-model', 'differentiation', 'process', 'sales', 'solutions', 'faq', 'case-studies');
  CREATE TYPE "public"."enum__brand_docs_v_version_icon" AS ENUM('dna', 'mic', 'briefcase', 'target', 'gear', 'chart', 'puzzle', 'question', 'clipboard');
  CREATE TYPE "public"."enum__brand_docs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__brand_docs_v_published_locale" AS ENUM('he', 'en', 'ru', 'ar', 'fr', 'es');
  CREATE TABLE "pages_blocks_hero_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_block_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"style" "enum_pages_blocks_hero_block_style" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_features_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_features_block_features_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_features_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_features_block_columns" DEFAULT '3',
  	"style" "enum_pages_blocks_features_block_style" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_block_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"style" "enum_pages_blocks_cta_block_style" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_block_locales" (
  	"heading" varchar,
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_block_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_image_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "pages_blocks_testimonials_block_testimonials_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"author_company" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_testimonials_block_style" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_block_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_block_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_faq_block_style" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_block_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "pages_blocks_pricing_block_plans_features_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_block_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_pricing_block_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_pricing_block_plans_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_pricing_block_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing_block_plans_locales" (
  	"name" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_rich_content_block_image_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_content_block_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps_block_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_number" numeric,
  	"icon" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_process_steps_block_steps_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_process_steps_block_style" DEFAULT 'timeline',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_block_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"style" "enum__pages_v_blocks_hero_block_style" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_features_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_block_features_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_features_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__pages_v_blocks_features_block_columns" DEFAULT '3',
  	"style" "enum__pages_v_blocks_features_block_style" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_block_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"style" "enum__pages_v_blocks_cta_block_style" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block_locales" (
  	"heading" varchar,
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_block_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_image_id" integer,
  	"rating" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_block_testimonials_locales" (
  	"quote" varchar,
  	"author_name" varchar,
  	"author_title" varchar,
  	"author_company" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_testimonials_block_style" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_block_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_faq_block_style" DEFAULT 'accordion',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_block_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"included" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_block_plans_features_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_block_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_pricing_block_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_pricing_block_plans_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_block_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"price" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_block_plans_locales" (
  	"name" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_rich_content_block_image_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_content_block_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_block_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step_number" numeric,
  	"icon" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_block_steps_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_process_steps_block_style" DEFAULT 'timeline',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "brand_docs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_type" "enum_brand_docs_doc_type",
  	"icon" "enum_brand_docs_icon",
  	"sort_order" numeric DEFAULT 0,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_brand_docs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "brand_docs_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_brand_docs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_doc_type" "enum__brand_docs_v_version_doc_type",
  	"version_icon" "enum__brand_docs_v_version_icon",
  	"version_sort_order" numeric DEFAULT 0,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__brand_docs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__brand_docs_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_brand_docs_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "redirects_rels" ADD COLUMN "brand_docs_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "brand_docs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "brand_docs_id" integer;
  ALTER TABLE "pages_blocks_hero_block_links" ADD CONSTRAINT "pages_blocks_hero_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block_locales" ADD CONSTRAINT "pages_blocks_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_block_features" ADD CONSTRAINT "pages_blocks_features_block_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_block_features" ADD CONSTRAINT "pages_blocks_features_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_block_features_locales" ADD CONSTRAINT "pages_blocks_features_block_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_block_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_block" ADD CONSTRAINT "pages_blocks_features_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_block_locales" ADD CONSTRAINT "pages_blocks_features_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block_links" ADD CONSTRAINT "pages_blocks_cta_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block_locales" ADD CONSTRAINT "pages_blocks_cta_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_block_testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_block_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_block_testimonials_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_block_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block" ADD CONSTRAINT "pages_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block_locales" ADD CONSTRAINT "pages_blocks_testimonials_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block_items" ADD CONSTRAINT "pages_blocks_faq_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block_items_locales" ADD CONSTRAINT "pages_blocks_faq_block_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block" ADD CONSTRAINT "pages_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block_locales" ADD CONSTRAINT "pages_blocks_faq_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_block_plans_features" ADD CONSTRAINT "pages_blocks_pricing_block_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_block_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_block_plans_features_locales" ADD CONSTRAINT "pages_blocks_pricing_block_plans_features_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_block_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_block_plans_links" ADD CONSTRAINT "pages_blocks_pricing_block_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_block_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_block_plans" ADD CONSTRAINT "pages_blocks_pricing_block_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_block_plans_locales" ADD CONSTRAINT "pages_blocks_pricing_block_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_block_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_block" ADD CONSTRAINT "pages_blocks_pricing_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_block_locales" ADD CONSTRAINT "pages_blocks_pricing_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_content_block" ADD CONSTRAINT "pages_blocks_rich_content_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_content_block" ADD CONSTRAINT "pages_blocks_rich_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_content_block_locales" ADD CONSTRAINT "pages_blocks_rich_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_block_steps" ADD CONSTRAINT "pages_blocks_process_steps_block_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_block_steps" ADD CONSTRAINT "pages_blocks_process_steps_block_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_block_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_block_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps_block_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_block" ADD CONSTRAINT "pages_blocks_process_steps_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_block_locales" ADD CONSTRAINT "pages_blocks_process_steps_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block_links" ADD CONSTRAINT "_pages_v_blocks_hero_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block_locales" ADD CONSTRAINT "_pages_v_blocks_hero_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_block_features" ADD CONSTRAINT "_pages_v_blocks_features_block_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_block_features" ADD CONSTRAINT "_pages_v_blocks_features_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_block_features_locales" ADD CONSTRAINT "_pages_v_blocks_features_block_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_block_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_block" ADD CONSTRAINT "_pages_v_blocks_features_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_block_locales" ADD CONSTRAINT "_pages_v_blocks_features_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block_links" ADD CONSTRAINT "_pages_v_blocks_cta_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block_locales" ADD CONSTRAINT "_pages_v_blocks_cta_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_testimonials_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_block_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block_items" ADD CONSTRAINT "_pages_v_blocks_faq_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_block_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD CONSTRAINT "_pages_v_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block_locales" ADD CONSTRAINT "_pages_v_blocks_faq_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_block_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_block_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_features_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_block_plans_features_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_block_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_links" ADD CONSTRAINT "_pages_v_blocks_pricing_block_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_block_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_block_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_block_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_block_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_block" ADD CONSTRAINT "_pages_v_blocks_pricing_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_block_locales" ADD CONSTRAINT "_pages_v_blocks_pricing_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_content_block" ADD CONSTRAINT "_pages_v_blocks_rich_content_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_content_block" ADD CONSTRAINT "_pages_v_blocks_rich_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_content_block_locales" ADD CONSTRAINT "_pages_v_blocks_rich_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_block_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_block_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_block_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_block_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_block_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_block_steps_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps_block_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_block" ADD CONSTRAINT "_pages_v_blocks_process_steps_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_block_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_docs_locales" ADD CONSTRAINT "brand_docs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_docs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brand_docs_v" ADD CONSTRAINT "_brand_docs_v_parent_id_brand_docs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."brand_docs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_brand_docs_v_locales" ADD CONSTRAINT "_brand_docs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brand_docs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_block_links_order_idx" ON "pages_blocks_hero_block_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_block_links_parent_id_idx" ON "pages_blocks_hero_block_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_block_order_idx" ON "pages_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_block_parent_id_idx" ON "pages_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_block_path_idx" ON "pages_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_block_background_image_idx" ON "pages_blocks_hero_block" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_block_locales_locale_parent_id_unique" ON "pages_blocks_hero_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_block_features_order_idx" ON "pages_blocks_features_block_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_block_features_parent_id_idx" ON "pages_blocks_features_block_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_block_features_image_idx" ON "pages_blocks_features_block_features" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_features_block_features_locales_locale_parent_i" ON "pages_blocks_features_block_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_block_order_idx" ON "pages_blocks_features_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_block_parent_id_idx" ON "pages_blocks_features_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_block_path_idx" ON "pages_blocks_features_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_features_block_locales_locale_parent_id_unique" ON "pages_blocks_features_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_block_links_order_idx" ON "pages_blocks_cta_block_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_links_parent_id_idx" ON "pages_blocks_cta_block_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_block_order_idx" ON "pages_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_parent_id_idx" ON "pages_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_block_path_idx" ON "pages_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_block_background_image_idx" ON "pages_blocks_cta_block" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_block_locales_locale_parent_id_unique" ON "pages_blocks_cta_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_testimonials_order_idx" ON "pages_blocks_testimonials_block_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_block_testimonials_parent_id_idx" ON "pages_blocks_testimonials_block_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_testimonials_author_imag_idx" ON "pages_blocks_testimonials_block_testimonials" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_block_testimonials_locales_locale_" ON "pages_blocks_testimonials_block_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_order_idx" ON "pages_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_block_parent_id_idx" ON "pages_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_path_idx" ON "pages_blocks_testimonials_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_block_locales_locale_parent_id_uni" ON "pages_blocks_testimonials_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_block_items_order_idx" ON "pages_blocks_faq_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_items_parent_id_idx" ON "pages_blocks_faq_block_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_block_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_block_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_block_order_idx" ON "pages_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_parent_id_idx" ON "pages_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_path_idx" ON "pages_blocks_faq_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_block_locales_locale_parent_id_unique" ON "pages_blocks_faq_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_block_plans_features_order_idx" ON "pages_blocks_pricing_block_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_block_plans_features_parent_id_idx" ON "pages_blocks_pricing_block_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_block_plans_features_locales_locale_par" ON "pages_blocks_pricing_block_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_block_plans_links_order_idx" ON "pages_blocks_pricing_block_plans_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_block_plans_links_parent_id_idx" ON "pages_blocks_pricing_block_plans_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_block_plans_order_idx" ON "pages_blocks_pricing_block_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_block_plans_parent_id_idx" ON "pages_blocks_pricing_block_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_block_plans_locales_locale_parent_id_un" ON "pages_blocks_pricing_block_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pricing_block_order_idx" ON "pages_blocks_pricing_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_block_parent_id_idx" ON "pages_blocks_pricing_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_block_path_idx" ON "pages_blocks_pricing_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_pricing_block_locales_locale_parent_id_unique" ON "pages_blocks_pricing_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_content_block_order_idx" ON "pages_blocks_rich_content_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_content_block_parent_id_idx" ON "pages_blocks_rich_content_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_content_block_path_idx" ON "pages_blocks_rich_content_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_content_block_image_idx" ON "pages_blocks_rich_content_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_rich_content_block_locales_locale_parent_id_uni" ON "pages_blocks_rich_content_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_block_steps_order_idx" ON "pages_blocks_process_steps_block_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_block_steps_parent_id_idx" ON "pages_blocks_process_steps_block_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_block_steps_image_idx" ON "pages_blocks_process_steps_block_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_block_steps_locales_locale_parent" ON "pages_blocks_process_steps_block_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_block_order_idx" ON "pages_blocks_process_steps_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_block_parent_id_idx" ON "pages_blocks_process_steps_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_block_path_idx" ON "pages_blocks_process_steps_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_block_locales_locale_parent_id_un" ON "pages_blocks_process_steps_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_links_order_idx" ON "_pages_v_blocks_hero_block_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_block_links_parent_id_idx" ON "_pages_v_blocks_hero_block_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_order_idx" ON "_pages_v_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_block_parent_id_idx" ON "_pages_v_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_path_idx" ON "_pages_v_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_block_background_image_idx" ON "_pages_v_blocks_hero_block" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_block_features_order_idx" ON "_pages_v_blocks_features_block_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_block_features_parent_id_idx" ON "_pages_v_blocks_features_block_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_block_features_image_idx" ON "_pages_v_blocks_features_block_features" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_block_features_locales_locale_paren" ON "_pages_v_blocks_features_block_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_block_order_idx" ON "_pages_v_blocks_features_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_block_parent_id_idx" ON "_pages_v_blocks_features_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_block_path_idx" ON "_pages_v_blocks_features_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_block_locales_locale_parent_id_uniq" ON "_pages_v_blocks_features_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_links_order_idx" ON "_pages_v_blocks_cta_block_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_block_links_parent_id_idx" ON "_pages_v_blocks_cta_block_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_order_idx" ON "_pages_v_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_block_parent_id_idx" ON "_pages_v_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_path_idx" ON "_pages_v_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_block_background_image_idx" ON "_pages_v_blocks_cta_block" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_block_testimonials_order_idx" ON "_pages_v_blocks_testimonials_block_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_block_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_block_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_block_testimonials_author_i_idx" ON "_pages_v_blocks_testimonials_block_testimonials" USING btree ("author_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_block_testimonials_locales_loca" ON "_pages_v_blocks_testimonials_block_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_block_order_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_block_parent_id_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_block_path_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_block_locales_locale_parent_id_" ON "_pages_v_blocks_testimonials_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_items_order_idx" ON "_pages_v_blocks_faq_block_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_items_parent_id_idx" ON "_pages_v_blocks_faq_block_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_block_items_locales_locale_parent_id_uni" ON "_pages_v_blocks_faq_block_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_order_idx" ON "_pages_v_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_parent_id_idx" ON "_pages_v_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_path_idx" ON "_pages_v_blocks_faq_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_block_plans_features_order_idx" ON "_pages_v_blocks_pricing_block_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_block_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_block_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_block_plans_features_locales_locale_" ON "_pages_v_blocks_pricing_block_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_block_plans_links_order_idx" ON "_pages_v_blocks_pricing_block_plans_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_block_plans_links_parent_id_idx" ON "_pages_v_blocks_pricing_block_plans_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_block_plans_order_idx" ON "_pages_v_blocks_pricing_block_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_block_plans_parent_id_idx" ON "_pages_v_blocks_pricing_block_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_block_plans_locales_locale_parent_id" ON "_pages_v_blocks_pricing_block_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_block_order_idx" ON "_pages_v_blocks_pricing_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_block_parent_id_idx" ON "_pages_v_blocks_pricing_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_block_path_idx" ON "_pages_v_blocks_pricing_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_pricing_block_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_pricing_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_content_block_order_idx" ON "_pages_v_blocks_rich_content_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_content_block_parent_id_idx" ON "_pages_v_blocks_rich_content_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_content_block_path_idx" ON "_pages_v_blocks_rich_content_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_content_block_image_idx" ON "_pages_v_blocks_rich_content_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_content_block_locales_locale_parent_id_" ON "_pages_v_blocks_rich_content_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_block_steps_order_idx" ON "_pages_v_blocks_process_steps_block_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_block_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_block_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_block_steps_image_idx" ON "_pages_v_blocks_process_steps_block_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_block_steps_locales_locale_par" ON "_pages_v_blocks_process_steps_block_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_block_order_idx" ON "_pages_v_blocks_process_steps_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_block_parent_id_idx" ON "_pages_v_blocks_process_steps_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_block_path_idx" ON "_pages_v_blocks_process_steps_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_block_locales_locale_parent_id" ON "_pages_v_blocks_process_steps_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "brand_docs_slug_idx" ON "brand_docs" USING btree ("slug");
  CREATE INDEX "brand_docs_updated_at_idx" ON "brand_docs" USING btree ("updated_at");
  CREATE INDEX "brand_docs_created_at_idx" ON "brand_docs" USING btree ("created_at");
  CREATE INDEX "brand_docs__status_idx" ON "brand_docs" USING btree ("_status");
  CREATE UNIQUE INDEX "brand_docs_locales_locale_parent_id_unique" ON "brand_docs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_brand_docs_v_parent_idx" ON "_brand_docs_v" USING btree ("parent_id");
  CREATE INDEX "_brand_docs_v_version_version_slug_idx" ON "_brand_docs_v" USING btree ("version_slug");
  CREATE INDEX "_brand_docs_v_version_version_updated_at_idx" ON "_brand_docs_v" USING btree ("version_updated_at");
  CREATE INDEX "_brand_docs_v_version_version_created_at_idx" ON "_brand_docs_v" USING btree ("version_created_at");
  CREATE INDEX "_brand_docs_v_version_version__status_idx" ON "_brand_docs_v" USING btree ("version__status");
  CREATE INDEX "_brand_docs_v_created_at_idx" ON "_brand_docs_v" USING btree ("created_at");
  CREATE INDEX "_brand_docs_v_updated_at_idx" ON "_brand_docs_v" USING btree ("updated_at");
  CREATE INDEX "_brand_docs_v_snapshot_idx" ON "_brand_docs_v" USING btree ("snapshot");
  CREATE INDEX "_brand_docs_v_published_locale_idx" ON "_brand_docs_v" USING btree ("published_locale");
  CREATE INDEX "_brand_docs_v_latest_idx" ON "_brand_docs_v" USING btree ("latest");
  CREATE INDEX "_brand_docs_v_autosave_idx" ON "_brand_docs_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_brand_docs_v_locales_locale_parent_id_unique" ON "_brand_docs_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_brand_docs_fk" FOREIGN KEY ("brand_docs_id") REFERENCES "public"."brand_docs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_brand_docs_fk" FOREIGN KEY ("brand_docs_id") REFERENCES "public"."brand_docs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brand_docs_fk" FOREIGN KEY ("brand_docs_id") REFERENCES "public"."brand_docs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "redirects_rels_brand_docs_id_idx" ON "redirects_rels" USING btree ("brand_docs_id");
  CREATE INDEX "search_rels_brand_docs_id_idx" ON "search_rels" USING btree ("brand_docs_id");
  CREATE INDEX "payload_locked_documents_rels_brand_docs_id_idx" ON "payload_locked_documents_rels" USING btree ("brand_docs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_block_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_block_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_block_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_block_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_block_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_block_plans_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_block_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_block_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_block_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_content_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_block_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_block_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_block_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_block_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_block_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_block_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_content_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_block_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_block_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_docs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_docs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brand_docs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brand_docs_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_block_links" CASCADE;
  DROP TABLE "pages_blocks_hero_block" CASCADE;
  DROP TABLE "pages_blocks_hero_block_locales" CASCADE;
  DROP TABLE "pages_blocks_features_block_features" CASCADE;
  DROP TABLE "pages_blocks_features_block_features_locales" CASCADE;
  DROP TABLE "pages_blocks_features_block" CASCADE;
  DROP TABLE "pages_blocks_features_block_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_block_links" CASCADE;
  DROP TABLE "pages_blocks_cta_block" CASCADE;
  DROP TABLE "pages_blocks_cta_block_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_block_items" CASCADE;
  DROP TABLE "pages_blocks_faq_block_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_block" CASCADE;
  DROP TABLE "pages_blocks_faq_block_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_block_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_block_plans_features_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_block_plans_links" CASCADE;
  DROP TABLE "pages_blocks_pricing_block_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing_block_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_block" CASCADE;
  DROP TABLE "pages_blocks_pricing_block_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_content_block" CASCADE;
  DROP TABLE "pages_blocks_rich_content_block_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps_block_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps_block_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps_block" CASCADE;
  DROP TABLE "pages_blocks_process_steps_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_block_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features_block_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_block" CASCADE;
  DROP TABLE "_pages_v_blocks_features_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_block_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_block_plans_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_block_plans_links" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_block_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_block_plans_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_block" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_content_block" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_content_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_block_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_block_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_block" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_block_locales" CASCADE;
  DROP TABLE "brand_docs" CASCADE;
  DROP TABLE "brand_docs_locales" CASCADE;
  DROP TABLE "_brand_docs_v" CASCADE;
  DROP TABLE "_brand_docs_v_locales" CASCADE;
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_brand_docs_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_brand_docs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_brand_docs_fk";
  
  DROP INDEX "redirects_rels_brand_docs_id_idx";
  DROP INDEX "search_rels_brand_docs_id_idx";
  DROP INDEX "payload_locked_documents_rels_brand_docs_id_idx";
  ALTER TABLE "redirects_rels" DROP COLUMN "brand_docs_id";
  ALTER TABLE "search_rels" DROP COLUMN "brand_docs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "brand_docs_id";
  DROP TYPE "public"."enum_pages_blocks_hero_block_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_block_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_block_style";
  DROP TYPE "public"."enum_pages_blocks_features_block_columns";
  DROP TYPE "public"."enum_pages_blocks_features_block_style";
  DROP TYPE "public"."enum_pages_blocks_cta_block_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_block_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_block_style";
  DROP TYPE "public"."enum_pages_blocks_testimonials_block_style";
  DROP TYPE "public"."enum_pages_blocks_faq_block_style";
  DROP TYPE "public"."enum_pages_blocks_pricing_block_plans_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_block_plans_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_rich_content_block_image_position";
  DROP TYPE "public"."enum_pages_blocks_process_steps_block_style";
  DROP TYPE "public"."enum__pages_v_blocks_hero_block_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_block_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_block_style";
  DROP TYPE "public"."enum__pages_v_blocks_features_block_columns";
  DROP TYPE "public"."enum__pages_v_blocks_features_block_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_style";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_block_style";
  DROP TYPE "public"."enum__pages_v_blocks_faq_block_style";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_block_plans_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_block_plans_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_rich_content_block_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_block_style";
  DROP TYPE "public"."enum_brand_docs_doc_type";
  DROP TYPE "public"."enum_brand_docs_icon";
  DROP TYPE "public"."enum_brand_docs_status";
  DROP TYPE "public"."enum__brand_docs_v_version_doc_type";
  DROP TYPE "public"."enum__brand_docs_v_version_icon";
  DROP TYPE "public"."enum__brand_docs_v_version_status";
  DROP TYPE "public"."enum__brand_docs_v_published_locale";`)
}
