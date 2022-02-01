import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '<host>',
  port: 3306,
  username: '<user>',
  password: '<password>',
  database: '<database>',
  autoLoadEntities: true,
  synchronize: true,
}