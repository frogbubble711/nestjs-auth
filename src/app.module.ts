import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from './common/config/config.module';
import { AuthModule } from './common/auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { HealthModule } from './common/health/health.module';
import { MailModule } from './common/mail/mail.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    AuthModule,
    EmployeeModule,
    HealthModule,
    MailModule,
    UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
