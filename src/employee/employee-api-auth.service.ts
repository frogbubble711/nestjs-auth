import { Injectable, Logger, HttpService } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { getUnixTime } from 'date-fns';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConfigService } from '../common/config/config.service';

@Injectable()
export class EmployeeApiAuthService {
  private token: string;

  private readonly logger = new Logger(EmployeeApiAuthService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getToken(): Promise<string> {
    if (!this.token || !this.isTokenAlive) {
      return this.fetchToken();
    }
    return Promise.resolve(this.token);
  }

  private async fetchToken(): Promise<string> {
    const options: AxiosRequestConfig = {
      auth: {
        username: this.configService.employeeApiClientId,
        password: this.configService.employeeApiClientSecret,
      },
      params: {
        grant_type: 'client_credentials',
      },
    };

    const response: AxiosResponse<{
      access_token: string;
    }> = await this.httpService
      .post(this.configService.tokenUrl, {}, options)
      .toPromise();

    const accessToken = response.data.access_token;

    this.token = accessToken;
    return accessToken;
  }

  private get isTokenAlive(): boolean {
    const decoded = decode(this.token);
    const now = getUnixTime(new Date());
    if (typeof decoded === 'string') {
      return false;
    }

    if (+decoded.exp <= now) {
      this.logger.warn('Employee API Token has expired');
      return false;
    }
    return true;
  }
}
