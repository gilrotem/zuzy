import * as migration_20260303_161746_brand_docs_init from './20260303_161746_brand_docs_init';
import * as migration_20260308_120000_media_prefix_fix from './20260308_120000_media_prefix_fix';

export const migrations = [
  {
    up: migration_20260303_161746_brand_docs_init.up,
    down: migration_20260303_161746_brand_docs_init.down,
    name: '20260303_161746_brand_docs_init'
  },
  {
    up: migration_20260308_120000_media_prefix_fix.up,
    down: migration_20260308_120000_media_prefix_fix.down,
    name: '20260308_120000_media_prefix_fix'
  },
];
