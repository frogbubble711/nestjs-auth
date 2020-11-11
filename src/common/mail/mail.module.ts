import { Module, HttpModule } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MailService],
})
export class MailModule {}
