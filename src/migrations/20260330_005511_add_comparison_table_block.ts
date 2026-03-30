import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_comparison_table_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_comparison_table_block_columns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_table_block_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_table_block_rows_values_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_category" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_comparison_table_block_rows_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_comparison_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block_columns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block_rows_values_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_category" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block_rows_locales" (
  	"feature" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_block_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "primary_color" SET DEFAULT '#7354C4';
  ALTER TABLE "site_settings" ALTER COLUMN "accent_color" SET DEFAULT '#06B6D4';
  ALTER TABLE "pages_blocks_comparison_table_block_columns" ADD CONSTRAINT "pages_blocks_comparison_table_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_block_columns_locales" ADD CONSTRAINT "pages_blocks_comparison_table_block_columns_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_block_rows_values" ADD CONSTRAINT "pages_blocks_comparison_table_block_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_block_rows_values_locales" ADD CONSTRAINT "pages_blocks_comparison_table_block_rows_values_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_block_rows_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_block_rows" ADD CONSTRAINT "pages_blocks_comparison_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_block_rows_locales" ADD CONSTRAINT "pages_blocks_comparison_table_block_rows_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_block" ADD CONSTRAINT "pages_blocks_comparison_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_block_locales" ADD CONSTRAINT "pages_blocks_comparison_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_columns" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_columns_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_columns_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows_values" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows_values_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_rows_values_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_block_rows_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_rows_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_block_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_locales" ADD CONSTRAINT "_pages_v_blocks_comparison_table_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_comparison_table_block_columns_order_idx" ON "pages_blocks_comparison_table_block_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_block_columns_parent_id_idx" ON "pages_blocks_comparison_table_block_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_comparison_table_block_columns_locales_locale_p" ON "pages_blocks_comparison_table_block_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_block_rows_values_order_idx" ON "pages_blocks_comparison_table_block_rows_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_block_rows_values_parent_id_idx" ON "pages_blocks_comparison_table_block_rows_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_comparison_table_block_rows_values_locales_loca" ON "pages_blocks_comparison_table_block_rows_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_block_rows_order_idx" ON "pages_blocks_comparison_table_block_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_block_rows_parent_id_idx" ON "pages_blocks_comparison_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_comparison_table_block_rows_locales_locale_pare" ON "pages_blocks_comparison_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_block_order_idx" ON "pages_blocks_comparison_table_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_block_parent_id_idx" ON "pages_blocks_comparison_table_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_block_path_idx" ON "pages_blocks_comparison_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_comparison_table_block_locales_locale_parent_id" ON "pages_blocks_comparison_table_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_columns_order_idx" ON "_pages_v_blocks_comparison_table_block_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_columns_parent_id_idx" ON "_pages_v_blocks_comparison_table_block_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_table_block_columns_locales_local" ON "_pages_v_blocks_comparison_table_block_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_rows_values_order_idx" ON "_pages_v_blocks_comparison_table_block_rows_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_rows_values_parent_id_idx" ON "_pages_v_blocks_comparison_table_block_rows_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_table_block_rows_values_locales_l" ON "_pages_v_blocks_comparison_table_block_rows_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_rows_order_idx" ON "_pages_v_blocks_comparison_table_block_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_rows_parent_id_idx" ON "_pages_v_blocks_comparison_table_block_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_table_block_rows_locales_locale_p" ON "_pages_v_blocks_comparison_table_block_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_order_idx" ON "_pages_v_blocks_comparison_table_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_parent_id_idx" ON "_pages_v_blocks_comparison_table_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_block_path_idx" ON "_pages_v_blocks_comparison_table_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_comparison_table_block_locales_locale_parent" ON "_pages_v_blocks_comparison_table_block_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_comparison_table_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_block_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_block_rows_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_block_rows_values_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_comparison_table_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows_values_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_table_block_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_comparison_table_block_columns" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_block_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_block_rows_values" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_block_rows_values_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_block_rows" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_block_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_block" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block_rows_values" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block_rows_values_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_block_locales" CASCADE;
  ALTER TABLE "site_settings" ALTER COLUMN "primary_color" SET DEFAULT '#6750A4';
  ALTER TABLE "site_settings" ALTER COLUMN "accent_color" SET DEFAULT '#4CA3C7';`)
}
