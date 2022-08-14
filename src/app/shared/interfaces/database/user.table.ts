import { Table } from '@shared/interfaces/database/table';

export interface UserTable extends Table{
  _id: `user_${string}`;
  username: string;
  password: string;
  role: number;
}
