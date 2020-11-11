import { Scope } from '@nestjs/common';
import { EmployeeApiAuthService } from './employee-api-auth.service';

/**
 * Provides access token for fetching employee api
 * @scope Request (calls getToken() on every request)
 */
export const employeeAccessTokenFactory = {
  scope: Scope.REQUEST,
  provide: 'EMPLOYEE_ACCESS_TOKEN',
  useFactory: (
    employeeApiAuthService: EmployeeApiAuthService,
  ): Promise<string> => {
    return employeeApiAuthService.getToken();
  },
  inject: [EmployeeApiAuthService],
};
