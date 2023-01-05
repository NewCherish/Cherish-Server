import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSwagger } from './config/swagger';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setUpSwagger(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
