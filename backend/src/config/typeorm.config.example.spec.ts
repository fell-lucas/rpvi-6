import { typeOrmConfig } from "./typeorm.config.example";

describe('typeOrmConfig', () => {
  it('should return correct value', () => {
    const expected = {
      type: 'mysql',
      host: '<host>',
      port: 3306,
      username: '<user>',
      password: '<password>',
      database: '<database>',
      autoLoadEntities: true,
      synchronize: true,
    }

    expect(typeOrmConfig).toEqual(expected);
  })
})