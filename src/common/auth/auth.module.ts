import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { publicKeyFactory } from './public-key.factory';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [JwtModule.register({}), HttpModule, ConfigModule],
  providers: [AuthService, JwtStrategy, publicKeyFactory],
  exports: [AuthService],
})
export class AuthModule {}
