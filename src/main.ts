import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  new DocumentBuilder()
    .setTitle('Nodejs2022Q2-service')
    .setDescription('The Nodejs2022Q2-service API description')
    .setVersion('1.0')
    .build();
  const document = await readFile(
    join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  );
  SwaggerModule.setup('api', app, parse(document));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${process.env.PORT}
  `);
}

bootstrap();
