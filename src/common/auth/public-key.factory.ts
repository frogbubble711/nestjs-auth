import { HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

/**
 * Fetches and provides public key from Json Web Key Set (jwks)
 */
export const publicKeyFactory = {
  provide: 'PUBLIC_KEY',
  useFactory: async (
    httpService: HttpService,
    configService: ConfigService,
  ): Promise<string> => {
    const { data } = await httpService.get(configService.jwksUrl).toPromise();

    return data.keys[0].value;
  },
  inject: [HttpService, ConfigService],
};
