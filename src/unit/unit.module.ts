import { Module, HttpModule } from '@nestjs/common';
import { UnitService } from './unit.service';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [EmployeeModule, HttpModule],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitModule {}
