import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Konfigurasi CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // 2. Global Validation Pipe
  // Ini yang akan memvalidasi decorator di DTO kita
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Membuang properti yang tidak ada dekoratornya
      forbidNonWhitelisted: true, // Memberikan error jika ada properti ilegal
      transform: true, // Otomatis mengubah tipe data (contoh: string ke number)
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});
