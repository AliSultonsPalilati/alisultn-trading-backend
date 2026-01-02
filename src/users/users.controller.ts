import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto'; // Import DTO yang baru dibuat

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    // Sekarang TypeScript tahu body punya email dan password sebagai string
    return this.usersService.login(body.email, body.password);
  }
}
