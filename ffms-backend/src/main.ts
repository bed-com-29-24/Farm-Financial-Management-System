import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // =========================
  // ENABLE CORS
  // =========================
  app.enableCors({
    origin: '*', // later you can restrict to frontend URL
    credentials: true,
  });

  // =========================
  // GLOBAL VALIDATION PIPE
  // =========================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes extra fields
      forbidNonWhitelisted: true, // rejects unknown fields
      transform: true, // auto convert types
    }),
  );

  // =========================
  // START SERVER
  // =========================
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log();
}
bootstrap();