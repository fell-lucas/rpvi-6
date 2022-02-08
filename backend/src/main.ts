/* istanbul ignore file */
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    preflightContinue: true,
    origin: [
      'http://127.0.0.1',
      'http://localhost',
      'https://rpvi-6-front.vercel.app/',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
// please deploy
