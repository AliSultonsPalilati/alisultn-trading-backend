import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JournalsService } from './journals.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Interface diperbarui: id adalah number sesuai hasil JwtStrategy baru
interface RequestWithUser extends Request {
  user: { id: number; email: string };
}

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: RequestWithUser,
    @Body() createJournalDto: CreateJournalDto,
  ) {
    // req.user.id sekarang sudah memiliki nilai dari JwtStrategy
    return await this.journalsService.create(req.user.id, createJournalDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: RequestWithUser) {
    return await this.journalsService.findAll(req.user.id);
  }
}
