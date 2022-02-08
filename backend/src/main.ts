/* istanbul ignore file */
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: 'Content-Type, Authorization, Accept',
    origin: [
      'http://127.0.0.1',
      'http://localhost',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://rpvi-6-front.vercel.app',
    ],
    methods: 'GET, PUT, POST, DELETE, PATCH',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
