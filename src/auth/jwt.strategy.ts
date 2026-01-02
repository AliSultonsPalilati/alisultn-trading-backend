import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') || 'default-secret-key',
    });
  }

  validate(payload: { sub: number; email: string }) {
    if (!payload.sub) {
      throw new UnauthorizedException('Token tidak valid');
    }
    // PERBAIKAN: Ubah 'sub' menjadi 'id' agar sesuai dengan panggilan di Controller
    return { id: payload.sub, email: payload.email };
  }
}
