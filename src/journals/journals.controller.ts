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

interface RequestWithUser extends Request {
  user: { id: string };
}

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: RequestWithUser, @Body() dto: CreateJournalDto) {
    return await this.journalsService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: RequestWithUser) {
    return await this.journalsService.findAll(req.user.id);
  }
}
