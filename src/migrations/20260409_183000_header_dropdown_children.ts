import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_header_nav_items_style" AS ENUM('link', 'dropdown');
    CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');

    ALTER TABLE "header_nav_items" ADD COLUMN "style" "enum_header_nav_items_style" DEFAULT 'link' NOT NULL;

    CREATE TABLE "header_nav_items_children" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL
    );

    CREATE TABLE "header_nav_items_children_locales" (
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "header_nav_items_children_locales" ADD CONSTRAINT "header_nav_items_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_children"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
    CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "header_nav_items_children_locales_locale_parent_id" ON "header_nav_items_children_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "header_nav_items_children_locales" CASCADE;
    DROP TABLE IF EXISTS "header_nav_items_children" CASCADE;
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "style";
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_children_link_type";
    DROP TYPE IF EXISTS "public"."enum_header_nav_items_style";
  `)
}
