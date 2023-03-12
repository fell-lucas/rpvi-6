import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/* istanbul ignore next */
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DBNAME,
  autoLoadEntities: true,

  ssl: true,
};
