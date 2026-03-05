import * as migration_20260303_161746_brand_docs_init from './20260303_161746_brand_docs_init';

export const migrations = [
  {
    up: migration_20260303_161746_brand_docs_init.up,
    down: migration_20260303_161746_brand_docs_init.down,
    name: '20260303_161746_brand_docs_init'
  },
];
