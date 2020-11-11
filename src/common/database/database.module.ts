import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.databaseType,
          host: configService.databaseHost,
          port: configService.databasePort,
          username: configService.databaseUser,
          password: configService.databasePassword,
          database: configService.databaseName,
          entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
          synchronize: configService.databaseSynchronize,
        } as Partial<TypeOrmModuleOptions>;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
