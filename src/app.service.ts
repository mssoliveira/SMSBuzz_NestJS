import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private versionApi: string;

  constructor(configService: ConfigService) {
    this.versionApi = configService.get('VERSION_API');
  }

  getStatusApi() {
    return { timestamp: new Date().getTime(), version: this.versionApi };
  }
}
