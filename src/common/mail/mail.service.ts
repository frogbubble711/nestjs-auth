import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

export interface MailRequest {
  html: string;
  recipients: string[];
  subject: string;
  attachments?: Array<{ fileName: string; base64FileContent: string }>;
}

export interface MailApiPayload {
  to: string;
  from: string;
  html: string;
  subject: string;
  attachments?: Array<{ fileName: string; base64FileContent: string }>;
}

export interface MailApiRequestHeaders {
  client_id: string;
  'SCS-Version': number;
}

@Injectable()
export class MailService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async sendMail(mail: MailRequest): Promise<any> {
    const payload: MailApiPayload = {
      to: mail.recipients.join(';'),
      from: this.configService.mailApiSender,
      html: Buffer.from(mail.html).toString('base64'),
      subject: mail.subject,
      attachments: mail.attachments,
    };

    const headers: MailApiRequestHeaders = {
      client_id: this.configService.mailApiClientId, // tslint:disable-line
      'SCS-Version': this.configService.mailApiVersion,
    };

    return this.httpService
      .post(this.configService.mailApiUrl, payload, { headers })
      .toPromise();
  }
}
