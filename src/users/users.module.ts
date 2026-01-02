import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'KODE_RAHASIA_ALISULTN_2026', // Ganti dengan kata rahasia Anda sendiri
      signOptions: { expiresIn: '1d' }, // Token berlaku selama 1 hari
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
