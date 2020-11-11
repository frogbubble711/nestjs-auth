import { Injectable, HttpService, Inject } from '@nestjs/common';
import { Employee } from './employee.model';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('EMPLOYEE_ACCESS_TOKEN') private readonly accessToken: string,
  ) {}

  async find(searchQuery: string): Promise<Employee[]> {
    const options: AxiosRequestConfig = {
      url: '/employees',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        fields: [
          'firstname',
          'lastname',
          'ntlogin',
          'unit',
          'email',
          'languagecode',
          'employeenr',
        ].join(','),
        search: searchQuery,
      },
    };

    const response = await this.httpService
      .request<Employee[]>(options)
      .toPromise();

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Received invalid payload from employee api');
    }

    return response.data;
  }

  async findOne(employeeNr: string): Promise<Employee> {
    const options: AxiosRequestConfig = {
      url: `/employees/${employeeNr}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        fields: [
          'firstname',
          'lastname',
          'ntlogin',
          'unit',
          'email',
          'languagecode',
          'employeenr',
        ].join(','),
      },
    };

    const { data } = await this.httpService
      .request<Employee>(options)
      .toPromise();

    return data;
  }
}
