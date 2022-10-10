import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { MyLogger } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/exception-filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });

  process
    .on('unhandledRejection', (reason, promise) => {
      console.error(reason, 'Unhandled Rejection', promise);
    })
    .on('uncaughtException', (err) => {
      console.error(err, 'Uncaught Exception');
    });

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

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
