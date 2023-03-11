import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { setUpSwagger } from './config/swagger';
import configuration from './config/configuration';
import { GlobalExceptionFilter } from './exceptions/global.exception';
import { ValidationPipe } from '@nestjs/common';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: configuration().sentryDsn,
  });
  app.useGlobalPipes(
    new ValidationPipe({ disableErrorMessages: false, transform: true }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  setUpSwagger(app);
  await app.listen(configuration().port || 3000);
}
bootstrap();
