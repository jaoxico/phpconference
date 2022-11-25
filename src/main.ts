import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuilder = new DocumentBuilder()
    .setTitle('PHP Conference')
    .setDescription('PHP conference - Brasil')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(3000);
}

bootstrap();
