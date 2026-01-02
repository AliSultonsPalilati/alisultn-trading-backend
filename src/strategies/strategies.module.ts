import { Module } from '@nestjs/common';
import { StrategiesService } from './strategies.service';
import { StrategiesController } from './strategies.controller';
import { PrismaService } from '../prisma.service'; // Sesuaikan path jika berbeda

@Module({
  controllers: [StrategiesController],
  // Tambahkan PrismaService ke dalam array providers di bawah ini
  providers: [StrategiesService, PrismaService],
})
export class StrategiesModule {}
