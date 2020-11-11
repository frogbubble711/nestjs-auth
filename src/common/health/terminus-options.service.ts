import {
  TerminusOptionsFactory,
  TerminusEndpoint,
  TerminusModuleOptions,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(private readonly db: TypeOrmHealthIndicator) {}

  public createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.db.pingCheck('database', { timeout: 300 }),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
