import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Pool } from 'mysql2/promise';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DB_CONNECTION } from 'src/constants';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(DB_CONNECTION)
    private readonly pool: Pool,
    private authService: AuthService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userId } = payload;
    const user: User = await this.authService.getUserInfo(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      nickname: user.nickname,
      current: user.current,
      provider: user.provider,
    };
  }
}
