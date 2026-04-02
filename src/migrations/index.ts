import * as migration_20260311_085325_initial from './20260311_085325_initial';
import * as migration_20260327_214619 from './20260327_214619';
import * as migration_20260330_005511_add_comparison_table_block from './20260330_005511_add_comparison_table_block';
import * as migration_20260331_182150_add_brand_docs_design_types from './20260331_182150_add_brand_docs_design_types';
import * as migration_20260401_120445 from './20260401_120445';
import * as migration_20260401_124257 from './20260401_124257';
import * as migration_20260401_151243 from './20260401_151243';

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
    name: '20260330_005511_add_comparison_table_block',
  },
  {
    up: migration_20260331_182150_add_brand_docs_design_types.up,
    down: migration_20260331_182150_add_brand_docs_design_types.down,
    name: '20260331_182150_add_brand_docs_design_types',
  },
  {
    up: migration_20260401_120445.up,
    down: migration_20260401_120445.down,
    name: '20260401_120445',
  },
  {
    up: migration_20260401_124257.up,
    down: migration_20260401_124257.down,
    name: '20260401_124257',
  },
  {
    up: migration_20260401_151243.up,
    down: migration_20260401_151243.down,
    name: '20260401_151243'
  },
];
