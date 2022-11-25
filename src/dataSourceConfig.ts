import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'mariadb',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'phpconference',
  entities: [join(__dirname, '**', '*.entity.{js,ts}')],
  synchronize: false,
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
};
