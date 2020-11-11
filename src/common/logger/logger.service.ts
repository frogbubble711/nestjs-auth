import { LoggerService as NestLoggerService, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: winston.Logger;
  constructor(private readonly configService: ConfigService) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          format:
            this.configService.nodeEnv !== 'development'
              ? winston.format.combine(winston.format.json())
              : winston.format.combine(
                  winston.format.colorize(),
                  winston.format.simple(),
                ),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.writeLog('info', message, context);
  }

  warn(message: string, context?: string) {
    this.writeLog('warn', message, context);
  }

  error(message: string, trace: any, context?: string) {
    this.writeLog('error', message, context, trace);
  }

  private writeLog(
    level: string,
    message: string,
    context?: string,
    ...args: any
  ) {
    if (context) {
      this.logger[level](`[${context}] ${message}`, args);
    } else {
      this.logger[level](message, args);
    }
  }
}
