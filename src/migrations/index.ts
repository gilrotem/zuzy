import * as migration_20260311_085325_initial from './20260311_085325_initial';

export const migrations = [
  {
    up: migration_20260311_085325_initial.up,
    down: migration_20260311_085325_initial.down,
    name: '20260311_085325_initial'
  },
];
