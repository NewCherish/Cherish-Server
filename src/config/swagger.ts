import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setUpSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Cherish API Docs')
    .setDescription('Cherish API 문서입니다.')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'accessToken',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'refreshToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
};
