import { Module, HttpModule } from '@nestjs/common';
import { EmployeeApiAuthService } from './employee-api-auth.service';
import { employeeAccessTokenFactory } from './employee-access-token.factory';
import { ConfigModule } from '../common/config/config.module';
import { EmployeeService } from './employee.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    EmployeeApiAuthService,
    employeeAccessTokenFactory,
    EmployeeService,
  ],
  exports: [
    EmployeeApiAuthService,
    employeeAccessTokenFactory,
    EmployeeService,
  ],
})
export class EmployeeModule {}
