import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { GlobalExceptionFilter } from './exceptions/global.exception';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { WebhookInterceptor } from './interceptors/webhook.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: WebhookInterceptor,
    },
  ],
})
export class AppModule {}
