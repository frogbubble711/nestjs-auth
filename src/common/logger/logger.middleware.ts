import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const format =
      this.configService.nodeEnv !== 'development' ? 'combined' : 'dev';
    return morgan(format, {
      stream: {
        write: this.logger.log.bind(this.logger),
      },
    })(req, res, next);
  }
}
