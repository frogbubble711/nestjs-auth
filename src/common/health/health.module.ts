import { Module } from '@nestjs/common';
import { TerminusModule, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { TerminusOptionsService } from './terminus-options.service';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator],
      useClass: TerminusOptionsService,
    }),
  ],
})
export class HealthModule {}
