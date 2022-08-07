import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpExceptionFilter } from './exception-filter';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new MyLogger('HTTP');
  err = new HttpExceptionFilter();

  use(request: Request, response: Response, next: NextFunction) {
    response.on('close', () => {
      const message = `
      method: ${request.method}
      url: ${request.url}
      query: ${JSON.stringify(request.query)}
      body: ${JSON.stringify(request.body)}
      statusCode: ${response.statusCode}
      statusmessage: ${response.statusMessage}
      `;

      if (response.statusCode >= 500) {
        return this.logger.error(message);
      }

      if (response.statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    next();
  }
}
