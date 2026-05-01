import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes
  // app.setGlobalPrefix('api/v1');

  // CORS — allow frontend origin
  app.enableCors({ origin: process.env.CORS_ORIGIN, credentials: true });

  // Global validation pipe — rejects unknown fields, applies class-validator rules
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // auto-converts types (string -> number, etc.)
    }),
  );

  // Swagger API docs (development only)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('FFMS API')
      .setDescription('Farm Financial Management System REST API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    SwaggerModule.setup(
      'api/docs',
      app,
      SwaggerModule.createDocument(app, config),
    );
  }

  await app.listen(process.env.PORT ?? 3000);
  console.log(`FFMS backend running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
