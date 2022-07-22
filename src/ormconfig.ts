import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['src/migrations/*.ts'],
});
