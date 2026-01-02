import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJournalDto } from './dto/create-journal.dto';

@Injectable()
export class JournalsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateJournalDto) {
    return await this.prisma.journal.create({
      data: {
        ...dto,
        userId: Number(userId), // Konversi String ke Number
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.journal.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'desc' },
    });
  }
}
