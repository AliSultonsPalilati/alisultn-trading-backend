import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';

@Injectable()
export class StrategiesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateStrategyDto) {
    return await this.prisma.strategy.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.strategy.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // FITUR BARU: Logika penghapusan di database Supabase
  async remove(id: number, userId: number) {
    return await this.prisma.strategy.delete({
      where: {
        id: id, // ID strategi yang dihapus
        userId: userId, // Pastikan strategi ini memang milik user yang login
      },
    });
  }
}
