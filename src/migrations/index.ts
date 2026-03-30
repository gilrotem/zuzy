import * as migration_20260311_085325_initial from './20260311_085325_initial';
import * as migration_20260327_214619 from './20260327_214619';
import * as migration_20260330_005511_add_comparison_table_block from './20260330_005511_add_comparison_table_block';

export const migrations = [
  {
    up: migration_20260311_085325_initial.up,
    down: migration_20260311_085325_initial.down,
    name: '20260311_085325_initial',
  },
  {
    up: migration_20260327_214619.up,
    down: migration_20260327_214619.down,
    name: '20260327_214619',
  },
  {
    up: migration_20260330_005511_add_comparison_table_block.up,
    down: migration_20260330_005511_add_comparison_table_block.down,
    name: '20260330_005511_add_comparison_table_block'
  },
];
