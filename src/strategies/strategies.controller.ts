import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete, // Tambahkan ini
  Param, // Tambahkan ini
} from '@nestjs/common';
import { StrategiesService } from './strategies.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: { id: number; email: string };
}

@Controller('strategies')
export class StrategiesController {
  constructor(private readonly strategiesService: StrategiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: RequestWithUser,
    @Body() dto: CreateStrategyDto,
  ) {
    return await this.strategiesService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: RequestWithUser) {
    return await this.strategiesService.findAll(req.user.id);
  }

  // FITUR BARU: Endpoint untuk menghapus strategi berdasarkan ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    // Konversi id string dari URL ke number, dan kirim user.id untuk keamanan
    return await this.strategiesService.remove(Number(id), req.user.id);
  }
}
