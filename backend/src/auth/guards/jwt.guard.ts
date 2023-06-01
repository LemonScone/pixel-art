import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request
        .get('Authorization')
        .replace('Bearer', '')
        .trim();

      const user = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      const { sub, nickname, current, provider } = user;
      request.user = { id: sub, nickname, current, provider };

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
