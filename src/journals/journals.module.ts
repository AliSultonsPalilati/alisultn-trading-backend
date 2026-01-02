import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { PrismaService } from '../prisma.service'; // Tambahkan import ini

@Module({
  providers: [JournalsService, PrismaService], // Masukkan PrismaService ke sini
  controllers: [JournalsController],
})
export class JournalsModule {}
