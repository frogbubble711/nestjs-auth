import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Unit } from './unit.model';
import { AxiosRequestConfig } from 'axios';
import { Employee } from 'src/employee/employee.model';

@Injectable()
export class UnitService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('EMPLOYEE_ACCESS_TOKEN') private readonly accessToken: string,
  ) {}

  async find(searchQuery: string): Promise<Unit[]> {
    const options: AxiosRequestConfig = {
      url: '/units',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        fields: ['name', 'code'].join(','),
        search: searchQuery,
      },
    };

    const response = await this.httpService
      .request<Unit[]>(options)
      .toPromise();

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Received invalid payload from employee api');
    }

    return response.data;
  }

  async findOne(unitCode: string): Promise<Unit> {
    const options: AxiosRequestConfig = {
      url: `/units/${unitCode}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        fields: ['name', 'code'].join(','),
      },
    };

    const { data } = await this.httpService.request<Unit>(options).toPromise();
    return data;
  }

  async findEmployeesByUnit(
    unitCode: string,
    searchQuery?: string,
  ): Promise<Employee[]> {
    const options: AxiosRequestConfig = {
      url: `/units/${unitCode}/employees`,
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
}
