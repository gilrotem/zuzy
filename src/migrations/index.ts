import * as migration_20260311_085325_initial from './20260311_085325_initial';
import * as migration_20260327_214619 from './20260327_214619';

export const migrations = [
  {
    up: migration_20260311_085325_initial.up,
    down: migration_20260311_085325_initial.down,
    name: '20260311_085325_initial',
  },
  {
    up: migration_20260327_214619.up,
    down: migration_20260327_214619.down,
    name: '20260327_214619'
  },
];
