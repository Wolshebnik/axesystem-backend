import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.setGlobalPrefix('api');
  const config = await app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
    .setTitle('Axesystem - BACKEND')
    .setDescription('Rest API Documentation')
    .setVersion('1.0.0')
    .addTag('Axesystem')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, document);

  const port = config.get('PORT');

  await app.listen(port || 5000, () =>
    console.log(`Started on the port:${port}`),
  );
}
bootstrap();
