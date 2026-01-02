import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Pastikan URL database terbaca dengan aman dari .env
  private prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_URL!,
      },
    },
  });

  // Inject JwtService ke dalam constructor
  constructor(private readonly jwtService: JwtService) {}

  async login(email: string, pass: string) {
    // 1. Cari user untuk ambil password (verifikasi)
    const userWithPassword = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userWithPassword) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    // 2. Bandingkan password input dengan hash di database
    const isMatch = await bcrypt.compare(pass, userWithPassword.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password salah');
    }

    // 3. Ambil data user tanpa password
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // 4. Buat Payload untuk Token
    const payload = { sub: user?.id, email: user?.email };

    // 5. Kembalikan data user beserta Access Token
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
