import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigModule } from './common/config/config.module';
import { ConfigService } from './common/config/config.service';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });

  const loggerService = app.get<LoggerService>(LoggerService);

  const configService = app
    .select(ConfigModule)
    .get(ConfigService, { strict: true });

  const options = new DocumentBuilder().setTitle(configService.appName).build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(configService.swaggerPrefix, app, document);

  app.useLogger(loggerService);
  app.use(compression());
  app.use(helmet());
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
    }),
  );

  app.setGlobalPrefix('/api');

  await app.listen(configService.port);
}
bootstrap();
