import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SmsbuzzModule } from './smsbuzz/smsbuzz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SmsbuzzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
