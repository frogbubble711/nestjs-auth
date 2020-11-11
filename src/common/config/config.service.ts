import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { DatabaseType } from 'typeorm';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Environment configuration
   */

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get port(): number {
    return +this.envConfig.PORT;
  }

  /**
   * Application
   */

  get appName(): string {
    return this.envConfig.APP_NAME;
  }

  get swaggerPrefix(): string {
    return this.envConfig.SWAGGER_PREFIX;
  }

  /**
   * Auth
   */

  get jwksUrl(): string {
    return this.envConfig.OAUTH_JWKS_URL;
  }

  get tokenUrl(): string {
    return this.envConfig.OAUTH_TOKEN_URL;
  }

  /**
   * Database configuration
   */

  get databaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }

  get databaseUser(): string {
    return this.envConfig.DATABASE_USER;
  }

  get databasePassword(): string {
    return this.envConfig.DATABASE_PASSWORD;
  }

  get databasePort(): number {
    return +this.envConfig.DATABASE_PORT;
  }

  get databaseName(): string {
    return this.envConfig.DATABASE_NAME;
  }

  get databaseType(): DatabaseType {
    return this.envConfig.DATABASE_TYPE as DatabaseType;
  }

  get databaseSynchronize(): boolean {
    return Boolean(this.envConfig.DATABASE_SYNCHRONIZE);
  }

  /**
   * Employee API
   */

  get employeeApiUrl(): string {
    return this.envConfig.EMPLOYEE_API_URL;
  }

  get employeeApiClientId(): string {
    return this.envConfig.EMPLOYEE_API_CLIENT_ID;
  }

  get employeeApiClientSecret(): string {
    return this.envConfig.EMPLOYEE_API_CLIENT_SECRET;
  }

  /**
   * Mail API
   */

  get mailApiUrl(): string {
    return this.envConfig.MAIL_API_URL;
  }

  get mailApiVersion(): number {
    return +this.envConfig.MAIL_API_VERSION;
  }

  get mailApiSender(): string {
    return this.envConfig.MAIL_API_SENDER;
  }

  get mailApiClientId(): string {
    return this.envConfig.MAIL_API_CLIENT_ID;
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      APP_NAME: Joi.string().required(),
      SWAGGER_PREFIX: Joi.string().default('swagger'),
      OAUTH_JWKS_URL: Joi.string().required(),
      OAUTH_TOKEN_URL: Joi.string().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_TYPE: Joi.string().default('mysql'),
      DATABASE_PORT: Joi.number().default(3306),
      DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
      EMPLOYEE_API_URL: Joi.string().required(),
      EMPLOYEE_API_CLIENT_ID: Joi.string().required(),
      EMPLOYEE_API_CLIENT_SECRET: Joi.string().required(),
      MAIL_API_URL: Joi.string().required(),
      MAIL_API_VERSION: Joi.number().required(),
      MAIL_API_CLIENT_ID: Joi.string().required(),
      MAIL_API_SENDER: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
