import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SmsbuzzService } from './smsbuzz.service';
import { SmsbuzzController } from './smsbuzz.controller';
import { TokenMiddleware } from 'src/middlewares/token/token.middleware';

@Module({
  controllers: [SmsbuzzController],
  providers: [SmsbuzzService],
})
export class SmsbuzzModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('smsbuzz');
  }
}
