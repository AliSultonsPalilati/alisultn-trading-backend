import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJournalDto } from './dto/create-journal.dto';

@Injectable()
export class JournalsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateJournalDto) {
    return await this.prisma.journal.create({
      data: {
        ticker: dto.ticker,
        type: dto.type,
        price: dto.price,
        lots: dto.lots,
        notes: dto.notes,
        imageUrl: dto.imageUrl,
        userId: userId, // Langsung gunakan userId karena sudah berbentuk number
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.journal.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
