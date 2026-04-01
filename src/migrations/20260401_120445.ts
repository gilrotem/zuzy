import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_content_pipeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_content_pipeline_locales" (
  	"heading" varchar DEFAULT 'Content Pipeline',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_motion_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_motion_showcase_locales" (
  	"heading" varchar DEFAULT 'Motion Assets',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_interactive_demo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_interactive_demo_locales" (
  	"heading" varchar DEFAULT 'Interactive Demos',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_pipeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_pipeline_locales" (
  	"heading" varchar DEFAULT 'Content Pipeline',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_motion_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_motion_showcase_locales" (
  	"heading" varchar DEFAULT 'Motion Assets',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_interactive_demo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_interactive_demo_locales" (
  	"heading" varchar DEFAULT 'Interactive Demos',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );

  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "parent_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_parent_id" integer;

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_content_pipeline" ADD CONSTRAINT "pages_blocks_content_pipeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_content_pipeline_locales" ADD CONSTRAINT "pages_blocks_content_pipeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_pipeline"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_motion_showcase" ADD CONSTRAINT "pages_blocks_motion_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_motion_showcase_locales" ADD CONSTRAINT "pages_blocks_motion_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_motion_showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_interactive_demo" ADD CONSTRAINT "pages_blocks_interactive_demo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_interactive_demo_locales" ADD CONSTRAINT "pages_blocks_interactive_demo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_interactive_demo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_content_pipeline" ADD CONSTRAINT "_pages_v_blocks_content_pipeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_content_pipeline_locales" ADD CONSTRAINT "_pages_v_blocks_content_pipeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_pipeline"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_motion_showcase" ADD CONSTRAINT "_pages_v_blocks_motion_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_motion_showcase_locales" ADD CONSTRAINT "_pages_v_blocks_motion_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_motion_showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_interactive_demo" ADD CONSTRAINT "_pages_v_blocks_interactive_demo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_interactive_demo_locales" ADD CONSTRAINT "_pages_v_blocks_interactive_demo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_interactive_demo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_content_pipeline_order_idx" ON "pages_blocks_content_pipeline" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_pipeline_parent_id_idx" ON "pages_blocks_content_pipeline" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_pipeline_path_idx" ON "pages_blocks_content_pipeline" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_content_pipeline_locales_locale_parent_id_uniqu" ON "pages_blocks_content_pipeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_motion_showcase_order_idx" ON "pages_blocks_motion_showcase" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_motion_showcase_parent_id_idx" ON "pages_blocks_motion_showcase" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_motion_showcase_path_idx" ON "pages_blocks_motion_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_motion_showcase_locales_locale_parent_id_unique" ON "pages_blocks_motion_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_interactive_demo_order_idx" ON "pages_blocks_interactive_demo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_interactive_demo_parent_id_idx" ON "pages_blocks_interactive_demo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_interactive_demo_path_idx" ON "pages_blocks_interactive_demo" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_interactive_demo_locales_locale_parent_id_uniqu" ON "pages_blocks_interactive_demo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_locale_idx" ON "pages_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_pipeline_order_idx" ON "_pages_v_blocks_content_pipeline" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_pipeline_parent_id_idx" ON "_pages_v_blocks_content_pipeline" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_pipeline_path_idx" ON "_pages_v_blocks_content_pipeline" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_content_pipeline_locales_locale_parent_id_un" ON "_pages_v_blocks_content_pipeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_motion_showcase_order_idx" ON "_pages_v_blocks_motion_showcase" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_motion_showcase_parent_id_idx" ON "_pages_v_blocks_motion_showcase" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_motion_showcase_path_idx" ON "_pages_v_blocks_motion_showcase" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_motion_showcase_locales_locale_parent_id_uni" ON "_pages_v_blocks_motion_showcase_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_interactive_demo_order_idx" ON "_pages_v_blocks_interactive_demo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_interactive_demo_parent_id_idx" ON "_pages_v_blocks_interactive_demo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_interactive_demo_path_idx" ON "_pages_v_blocks_interactive_demo" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_interactive_demo_locales_locale_parent_id_un" ON "_pages_v_blocks_interactive_demo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_locale_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");

  DO $$ BEGIN
    ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_pipeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_pipeline_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_motion_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_motion_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_interactive_demo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_interactive_demo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_pipeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_pipeline_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_motion_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_motion_showcase_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_interactive_demo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_interactive_demo_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_content_pipeline" CASCADE;
  DROP TABLE "pages_blocks_content_pipeline_locales" CASCADE;
  DROP TABLE "pages_blocks_motion_showcase" CASCADE;
  DROP TABLE "pages_blocks_motion_showcase_locales" CASCADE;
  DROP TABLE "pages_blocks_interactive_demo" CASCADE;
  DROP TABLE "pages_blocks_interactive_demo_locales" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v_blocks_content_pipeline" CASCADE;
  DROP TABLE "_pages_v_blocks_content_pipeline_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_motion_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_motion_showcase_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_interactive_demo" CASCADE;
  DROP TABLE "_pages_v_blocks_interactive_demo_locales" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_parent_id_pages_id_fk";

  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_parent_id_pages_id_fk";

  DROP INDEX "pages_parent_idx";
  DROP INDEX "_pages_v_version_version_parent_idx";
  ALTER TABLE "pages" DROP COLUMN "parent_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_parent_id";`)
}
