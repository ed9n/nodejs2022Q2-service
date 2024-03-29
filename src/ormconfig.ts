import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export const dataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: [
    __dirname + '/migrations/**/*.ts',
    __dirname + '/migrations/**/*.js',
  ],
});

dataSource.initialize();
