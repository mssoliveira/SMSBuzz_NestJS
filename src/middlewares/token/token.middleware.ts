import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  private accessKey: string;
  constructor(configService: ConfigService) {
    this.accessKey = configService.get('API_ACCESS_KEY');
  }
  use(req: Request, res: Response, next: NextFunction) {
    const headerApiAccessKey = req.headers['api-access-key'];
    if (headerApiAccessKey !== this.accessKey) {
      throw new ForbiddenException('Acesso Negado, verifique suas credencias');
    }
    next();
  }
}
