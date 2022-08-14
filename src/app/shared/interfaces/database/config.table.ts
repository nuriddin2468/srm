import { Table } from '@shared/interfaces/database/table';

export interface ConfigTable extends Table {
  _id: `config_${string}`;
  lastSyncDate: number | null;
}
