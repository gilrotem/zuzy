import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_app_grid_block_apps" DROP COLUMN IF EXISTS "icon";
    ALTER TABLE "pages_blocks_app_grid_block_apps" ADD COLUMN "icon_id" integer;
    ALTER TABLE "_pages_v_blocks_app_grid_block_apps" DROP COLUMN IF EXISTS "icon";
    ALTER TABLE "_pages_v_blocks_app_grid_block_apps" ADD COLUMN "icon_id" integer;
    ALTER TABLE "pages_blocks_app_grid_block_apps" ADD CONSTRAINT "pages_blocks_app_grid_block_apps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_app_grid_block_apps" ADD CONSTRAINT "_pages_v_blocks_app_grid_block_apps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "pages_blocks_app_grid_block_apps_icon_idx" ON "pages_blocks_app_grid_block_apps" USING btree ("icon_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_app_grid_block_apps_icon_idx" ON "_pages_v_blocks_app_grid_block_apps" USING btree ("icon_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_app_grid_block_apps" DROP CONSTRAINT IF EXISTS "pages_blocks_app_grid_block_apps_icon_id_media_id_fk";
    ALTER TABLE "_pages_v_blocks_app_grid_block_apps" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_app_grid_block_apps_icon_id_media_id_fk";
    DROP INDEX IF EXISTS "pages_blocks_app_grid_block_apps_icon_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_app_grid_block_apps_icon_idx";
    ALTER TABLE "pages_blocks_app_grid_block_apps" DROP COLUMN IF EXISTS "icon_id";
    ALTER TABLE "_pages_v_blocks_app_grid_block_apps" DROP COLUMN IF EXISTS "icon_id";
    ALTER TABLE "pages_blocks_app_grid_block_apps" ADD COLUMN "icon" varchar NOT NULL;
    ALTER TABLE "_pages_v_blocks_app_grid_block_apps" ADD COLUMN "icon" varchar NOT NULL;
  `)
}
