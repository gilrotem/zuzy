import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "ga4_measurement_id" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "gtm_container_id" varchar;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_pages_fk";
  
  DROP INDEX "search_rels_pages_id_idx";
  ALTER TABLE "search_rels" DROP COLUMN "pages_id";
  ALTER TABLE "site_settings" DROP COLUMN "ga4_measurement_id";
  ALTER TABLE "site_settings" DROP COLUMN "gtm_container_id";`)
}
