import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TAMBAHKAN BARIS INI:
  // Ini mengizinkan frontend (port 3001) untuk mengakses API ini
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
