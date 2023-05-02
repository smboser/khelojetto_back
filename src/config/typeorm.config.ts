import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const port: number = parseInt(<string>process.env.PORT) || 3306;

export const typeormConnectionConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1', //process.env.MYSQL_HOST,
  port: port,
  username: 'root', //process.env.MYSQL_USER,
  password: '', //process.env.MYSQL_PASSWORD,
  database: 'khelojetto', //process.env.MYSQL_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true
};